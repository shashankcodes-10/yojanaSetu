# YojanaSetu 🇮🇳

**Discover government schemes that you may be eligible for, without the
paperwork maze.**

YojanaSetu is a rule-based government scheme discovery application.
Users answer a short questionnaire, and the application compares their
answers against a curated set of central and state welfare schemes.
Potential matches include scheme benefits, document requirements, and
links to official sources.

> **Important:** YojanaSetu provides preliminary, rule-based matches for
> informational purposes. A match is not a guarantee of eligibility or
> approval. Always verify the latest rules and requirements with the
> relevant official government department.

## Table of contents

-   [Project overview](#project-overview)
-   [Features](#features)
-   [Technology stack](#technology-stack)
-   [How it works](#how-it-works)
-   [Repository structure](#repository-structure)
-   [Run with Docker](#run-with-docker)
-   [Run locally for development](#run-locally-for-development)
-   [Tests and CI](#tests-and-ci)
-   [Docker Hub image](#docker-hub-image)
-   [Deployment on AWS Elastic
    Beanstalk](#deployment-on-aws-elastic-beanstalk)
-   [Configuration and security](#configuration-and-security)
-   [Known limitations](#known-limitations)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [Disclaimer](#disclaimer)
-   [Links](#links)

## Project overview

Finding government welfare schemes can be difficult because information
is spread across different portals and eligibility requirements can
depend on age, state, occupation, income, gender, and category.
YojanaSetu aims to make the first step easier with a simple
questionnaire and a clear list of potential scheme matches.

This project was developed as part of the **Build on Elastic Beanstalk
Hackathon by TrainWithShubham**.

## Features

-   **Rule-based eligibility matching:** compares questionnaire answers
    against scheme rules rather than generating eligibility decisions
    with AI.
-   **19 government schemes:** a curated collection of central and state
    schemes.
-   **Two-step questionnaire:** collects basic profile details and
    optional follow-up answers.
-   **Potential match results:** shows matching schemes with benefit
    summaries, document requirements, and official links where
    available.
-   **Hindi and English:** language toggle for supported interface
    content.
-   **Dark and light themes:** switch between visual themes.
-   **Privacy-conscious questionnaire:** the landing page states that an
    Aadhaar number is not requested.
-   **Containerized application:** packaged as a Docker image for
    repeatable deployment.
-   **Automated checks:** GitHub Actions runs tests, builds the Docker
    image, smoke-tests the container, and scans the image for
    vulnerabilities.

Scheme details and eligibility rules can change. Users should check the
official scheme page before applying.

## Technology stack

  Area                  Technology
  --------------------- ------------------------------------------------
  Application           Python, Flask
  Containerization      Docker
  CI                    GitHub Actions
  Testing               pytest
  Container security    Image vulnerability scanning
  Cloud deployment      AWS Elastic Beanstalk
  Container registry    Docker Hub
  Infrastructure work   Terraform directory included in the repository

## How it works

1.  **Answer the questionnaire.** Provide basic details such as age,
    state or union territory, occupation, income, gender, and category,
    followed by relevant follow-up questions.
2.  **Compare answers with scheme rules.** The application uses its
    configured rule-based matching logic.
3.  **Review potential matches.** Results summarize the scheme, its
    benefits, document requirements, and an official website link where
    available.
4.  **Verify before applying.** Follow the official link and confirm
    current eligibility, required documents, deadlines, and application
    procedures with the responsible department.

## Repository structure

The repository includes these main directories and files:

``` text
yojanaSetu/
├── .ebextensions/       # Elastic Beanstalk environment configuration
├── .github/workflows/   # GitHub Actions workflows
├── app/                 # Application code
├── data/                # Scheme data
├── scripts/             # Helper scripts
├── terraform/           # Terraform-related files
├── tests/               # Automated tests
├── .dockerignore
├── .gitignore
├── Dockerfile
├── Procfile
├── README.md
└── requirements-dev.txt
```

The exact contents may evolve as the project changes.

## Run with Docker

### Prerequisites

-   Docker installed and running
-   Internet access to pull the public image from Docker Hub

### Pull the image

``` bash
docker pull shashank971/yojanasetu:latest
```

### Start the container

``` bash
docker run -d \\
  --name yojanasetu \\
  -p 8000:8000 \\
  shashank971/yojanasetu:latest
```

Open the application at `http://localhost:8000`.

### Check the health endpoint

``` bash
curl -f http://localhost:8000/health
```

A successful response indicates that the container's health endpoint is
reachable.

### View logs and stop the container

``` bash
docker logs yojanasetu
docker stop yojanasetu
docker rm yojanasetu
```

If port `8000` is already in use, change the host-side port, for example
`-p 8080:8000`, and open `http://localhost:8080`.

## Run locally for development

### Prerequisites

-   Python version compatible with the project's dependencies
-   Git
-   A virtual environment is recommended

Clone the repository:

``` bash
git clone https://github.com/shashankcodes-10/yojanaSetu.git
cd yojanaSetu
```

Create and activate a virtual environment on macOS or Linux:

``` bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the dependencies available in the repository:

``` bash
python -m pip install -r requirements-dev.txt
```

Use the startup command defined in the current `Dockerfile` or
`Procfile` to launch the app, as those files define how this version is
started. If `requirements-dev.txt` contains only development tools in
your checkout, install the runtime dependencies specified by the project
as well.

## Tests and CI

The GitHub Actions CI workflow is configured to:

1.  Check out the repository.
2.  Set up Python.
3.  Install dependencies.
4.  Run the automated test suite with `pytest`.
5.  Build the Docker image.
6.  Start the container and run a smoke test.
7.  Scan the image for vulnerabilities.

The vulnerability scan is configured as **report-only** in the workflow
version used for the current project update. Review the scan output and
remediate relevant findings; a passing workflow does not mean an image
has no vulnerabilities.

View workflow runs: [GitHub
Actions](https://github.com/shashankcodes-10/yojanaSetu/actions)

The current deployment process is manual through AWS Console or AWS CLI.
The CI workflow's deploy job may be skipped unless its required
configuration and conditions are satisfied. Do not assume that every
successful CI run automatically deploys a new image.

## Docker Hub image

The published image is available at **[shashank971/yojanasetu on Docker
Hub](https://hub.docker.com/r/shashank971/yojanasetu)**.

Pull the latest published tag:

``` bash
docker pull shashank971/yojanasetu:latest
```

### Build and publish an updated image

From the project root, after logging in to Docker Hub:

``` bash
docker login
docker buildx build \\
  --no-cache \\
  --platform linux/amd64,linux/arm64 \\
  -t shashank971/yojanasetu:latest \\
  --push .
```

This command builds and publishes images for both `linux/amd64` and
`linux/arm64`. Confirm that the build completes successfully before
updating the deployed environment.

## Deployment on AWS Elastic Beanstalk

YojanaSetu has been deployed to **AWS Elastic Beanstalk** using the
Docker image published on Docker Hub.

### Deployment overview

``` text
Developer
   |
   v
GitHub repository
   |
   v
GitHub Actions CI
   | tests, Docker build, smoke test, vulnerability scan
   v
Docker Hub image
   |
   | manual deployment / environment update
   v
AWS Elastic Beanstalk
   |
   v
YojanaSetu container
```

### Current deployment approach

-   **AWS service:** Elastic Beanstalk
-   **Platform:** Docker on Amazon Linux 2023
-   **Container image:** `shashank971/yojanasetu:latest`
-   **Container port:** `8000`
-   **Region used:** `us-west-2` (US West, Oregon)
-   **Deployment method:** Docker Hub image, deployed manually through
    AWS Console or CLI

The environment URL used during testing was:

`http://yojanasetu-prod.eba-m2gewtdb.us-west-2.elasticbeanstalk.com/`

This URL is a deployment reference and may not remain available
permanently. It uses HTTP, not HTTPS. Configure and verify HTTPS before
handling sensitive information or presenting the service as
production-secure.

### Deployment bundle

The single-container Docker deployment used a root-level
`Dockerrun.aws.json` file pointing to the Docker Hub image and exposing
container port `8000`.

When updating the environment, make sure the bundle references the
intended image tag. The `latest` tag can change over time, so verify
that the running environment is using the image you intended to release.

### Deployment verification

After each deployment: - Open the application and complete the
questionnaire. - Check the `/health` endpoint. - Review Elastic
Beanstalk environment health and application logs. - Verify the image
tag or digest being used. - Confirm that the latest changes are visible
in the running application.

## Configuration and security

-   **Do not commit secrets.** Never commit AWS access keys, Docker Hub
    credentials, API keys, passwords, or `.env` files.
-   **Use least privilege.** Grant AWS identities only the permissions
    required for their tasks.
-   **Review container scan results.** Address applicable critical and
    high-severity findings and keep dependencies updated.
-   **Use HTTPS for public use.** The documented Elastic Beanstalk URL
    is HTTP. Configure TLS and verify the final URL before users submit
    sensitive information.
-   **Avoid collecting sensitive personal information.** The app is
    intended to help users explore schemes, not to collect Aadhaar
    numbers, banking credentials, or other unnecessary sensitive
    details.
-   **Verify official scheme information.** Scheme rules, benefit
    amounts, required documents, and deadlines can change.
-   **Do not treat CI success as a security certification.** Automated
    tests and vulnerability scans are useful checks, not a complete
    security audit.

## Known limitations

-   Eligibility results are preliminary matches based on configured
    rules and user-provided answers.
-   The application cannot independently verify a person's documents or
    guarantee government approval.
-   Scheme information and official links need ongoing review to stay
    current.
-   Hindi translations and translated content may not cover every detail
    equally.
-   A successful build, smoke test, or vulnerability scan does not
    guarantee that the application is free of bugs or security issues.
-   HTTPS and production hardening must be verified separately from
    application health.

## Roadmap

-   [ ] Configure HTTPS with a suitable domain and AWS endpoint.
-   [ ] Review scheme data freshness and official-link verification.
-   [ ] Expand and verify Hindi translations.
-   [ ] Review accessibility, mobile responsiveness, and form
    validation.
-   [ ] Improve monitoring and alerting for deployment failures.
-   [ ] Review CI security findings and decide which findings should
    fail the workflow.
-   [ ] Document and automate a repeatable release process after the
    manual deployment workflow is stable.

## Contributing

Suggestions, bug reports, and improvements are welcome.

1.  Fork the repository.
2.  Create a branch for your change.
3.  Make your changes and add or update tests where appropriate.
4.  Run the tests and verify the Docker build locally.
5.  Open a pull request with a clear description of the change.

For scheme-related contributions, include an official government source
and the date on which the information was checked. Avoid submitting
private personal information.

## Disclaimer

YojanaSetu is an independent informational project built for learning
and demonstration purposes. It is not an official government website and
is not affiliated with or endorsed by any government department. Scheme
listings and rule-based matches are provided for convenience only. Users
must consult relevant official government sources to confirm eligibility
and application requirements.

## Links

-   **GitHub repository:**
    https://github.com/shashankcodes-10/yojanaSetu
-   **Docker Hub:** https://hub.docker.com/r/shashank971/yojanasetu
