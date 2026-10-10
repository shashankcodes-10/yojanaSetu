# YojanaSetu — Sarkari Yojana Finder 🇮🇳

A mobile-first government scheme discovery prototype for the DevOps & Cloud Hackathon.

## What it does

Users answer questions about age, state, occupation, income, gender, social category, household poverty declaration, existing LPG connection, and education level. The application matches answers against structured rules and shows potential matches, benefits, documents, official links, and extra checks that still need confirmation.

**Important:** This is a discovery prototype, not an official eligibility decision. Scheme conditions can change; applicants must verify details on the linked official portal. The app does not ask for Aadhaar numbers or bank details during discovery. The current dataset is deliberately conservative and does not claim to cover every Indian scheme.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
python -m pytest -q
flask --app app run --debug
```

Open http://127.0.0.1:5000

## Docker

```bash
docker build -t yojanasetu .
docker run --rm -p 8000:8000 yojanasetu
```

Open http://localhost:8000. The image runs as a non-root user and has a `/health` health check.

## AWS Elastic Beanstalk

Deploy using the **Docker** platform so the environment runs the same image tested locally. Create the application and environment in AWS, configure a suitable EC2 instance profile/service role, and deploy a source bundle containing the Dockerfile and application files. Verify `/health` and the public URL before configuring automated deployment.

Costs can include EC2, a load balancer, storage, and data transfer. Choose a minimal environment for the demo and terminate unused resources afterward.

## Architecture

Browser → Flask routes → deterministic eligibility engine → `data/schemes.json`

The core matching does not depend on an AI API. An AI explanation layer can be added later, but must explain existing results rather than determine eligibility.

## Data and matching notes

- Alternative rule paths use OR; fields within one path use AND.
- PMUY matching asks whether the applicant is an adult woman, qualifies as a poor household under the required declaration, and has no existing household LPG connection. The official application process makes the final decision.
- Stand-Up India is excluded from active recommendations because the original scheme ended in March 2025 and a revamped scheme was reported as under redrafting in March 2026.
- The Uttar Pradesh pre-matric scholarship result is only a potential match. Class, recognized-school status, residence, income, and other conditions must be confirmed on the official portal.
- PM-JAY is auto-matched only for the 70+ expansion; the wider beneficiary database cannot be inferred from income alone.
- State-specific coverage is currently limited; add further state schemes only after verifying official rules and collecting the questions needed to evaluate them.

## Tests

```bash
python -m pytest -q
```

Tests cover API validation, core matching edge cases, state/income scoping, scheme data fields, and HTTPS URLs.

## Automated deploy (GitHub Actions)

After the first manual Elastic Beanstalk deploy works, add these in the GitHub repo settings:

- Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (an IAM user limited to Elastic Beanstalk, S3 and `sts:GetCallerIdentity`)
- Variables: `AWS_REGION`, `EB_APP_NAME`, `EB_ENV_NAME`

Until `EB_ENV_NAME` exists, the deploy job is skipped and CI only tests and builds. `.ebextensions/healthcheck.config` points the load balancer health check at `/health`.
