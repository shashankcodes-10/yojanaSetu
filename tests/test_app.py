import json
from urllib.parse import urlparse
from pathlib import Path

import pytest
from app import create_app
from app.schemes import load_schemes

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture
def client():
    app = create_app({"TESTING": True})
    return app.test_client()


def profile(**overrides):
    data = {
        "age": 28,
        "state": "Uttar Pradesh",
        "occupation": "Farmer",
        "income": 250000,
        "gender": "Male",
        "category": "General",
        "poor_household": False,
        "no_existing_lpg": False,
        "education_level": "Not a student",
    }
    data.update(overrides)
    return data


def ids(response):
    return {x["id"] for x in response.json["schemes"]}


def test_health(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json["status"] == "ok"


def test_farmer_gets_pm_kisan(client):
    r = client.post("/api/match", json=profile())
    assert r.status_code == 200
    assert "pm-kisan" in ids(r)


def test_missing_fields(client):
    r = client.post("/api/match", json={"age": 28})
    assert r.status_code == 400


def test_ujjwala_requires_adult_woman_poor_household_and_no_lpg(client):
    eligible = profile(gender="Female", poor_household=True, no_existing_lpg=True)
    assert "pmuy" in ids(client.post("/api/match", json=eligible))
    assert "pmuy" not in ids(client.post("/api/match", json=profile(gender="Female", poor_household=False, no_existing_lpg=True)))
    assert "pmuy" not in ids(client.post("/api/match", json=profile(gender="Female", poor_household=True, no_existing_lpg=False)))
    assert "pmuy" not in ids(client.post("/api/match", json=profile(gender="Male", poor_household=True, no_existing_lpg=True)))
    assert "pmuy" not in ids(client.post("/api/match", json=profile(age=17, gender="Female", poor_household=True, no_existing_lpg=True)))


def test_standup_india_is_not_present_as_active_scheme():
    assert "standup-india" not in {s["id"] for s in load_schemes()}


def test_svanidhi_requires_street_vendor(client):
    assert "pmsvanidhi" not in ids(client.post("/api/match", json=profile(occupation="Self-employed")))
    assert "pmsvanidhi" in ids(client.post("/api/match", json=profile(occupation="Street vendor")))


def test_pmjay_70_plus_only(client):
    assert "pmjay-70" not in ids(client.post("/api/match", json=profile(age=69, income=5000000)))
    assert "pmjay-70" in ids(client.post("/api/match", json=profile(age=70, income=5000000)))


def test_up_scholarship_is_state_scoped_and_income_limited(client):
    base = profile(age=16, occupation="Student", income=200000, state="Uttar Pradesh", education_level="Class 9")
    assert "up-general-pre-matric-scholarship" in ids(client.post("/api/match", json=base))
    assert "up-general-pre-matric-scholarship" not in ids(client.post("/api/match", json=profile(**{**base, "state":"Bihar"})))
    assert "up-general-pre-matric-scholarship" not in ids(client.post("/api/match", json=profile(**{**base, "income":300000})))
    assert "up-general-pre-matric-scholarship" not in ids(client.post("/api/match", json=profile(**{**base, "education_level":"College / University"})))


def test_scheme_data_has_required_fields_and_https_links():
    schemes = load_schemes()
    assert len(schemes) >= 9
    seen = set()
    for scheme in schemes:
        for key in ("id", "name", "name_hi", "benefit", "benefit_hi", "ministry", "ministry_hi", "documents", "documents_hi", "tags", "tags_hi", "official_url", "source_url"):
            assert key in scheme, f"{scheme.get('id', '<unknown>')} missing {key}"
        assert scheme["id"] not in seen
        seen.add(scheme["id"])
        assert urlparse(scheme["official_url"]).scheme == "https", scheme["id"]
        assert urlparse(scheme["source_url"]).scheme == "https", scheme["id"]
        assert scheme["documents_hi"]
        assert scheme["tags_hi"]


def test_conditional_questions_are_optional(client):
    base = {"age": 40, "state": "Bihar", "occupation": "Farmer", "income": 100000, "gender": "Male", "category": "General"}
    r = client.post("/api/match", json=base)
    assert r.status_code == 200 and "pmuy" not in ids(r)
    woman = {**base, "gender": "Female", "poor_household": True, "no_existing_lpg": True}
    assert "pmuy" in ids(client.post("/api/match", json=woman))


def post(client, **kw):
    return ids(client.post("/api/match", json=profile(**kw)))


def test_farmer_schemes_and_exclusions(client):
    base = dict(age=30, small_farmer=True)
    assert {"pmfby", "kcc", "pm-kmy"} <= post(client, **base)
    assert "pm-kmy" not in post(client, age=30, small_farmer=False)
    assert "pm-kmy" not in post(client, **base, tax_payer=True)
    assert "pm-kmy" not in post(client, **base, social_security_member=True)
    assert "pm-kmy" not in post(client, age=45, small_farmer=True)


def test_pension_schemes_use_tax_and_social_security_answers(client):
    emp = dict(age=30, occupation="Private employee")
    assert "apy" in post(client, **emp) and "apy" not in post(client, **emp, tax_payer=True)
    wk = dict(age=30, occupation="Informal / daily-wage worker")
    assert "pm-sym" in post(client, **wk, income_under_15k=True)
    assert "pm-sym" not in post(client, **wk, income_under_15k=False)
    assert "pm-sym" not in post(client, **wk, income_under_15k=True, social_security_member=True)


def test_other_new_schemes(client):
    w = dict(age=30, occupation="Self-employed")
    assert "pm-vishwakarma" in post(client, **w, traditional_trade=True) and "pm-vishwakarma" not in post(client, **w)
    assert "mudra" in post(client, **w)
    p = dict(age=24, occupation="Private employee")
    assert "pm-vbry" in post(client, **p, first_formal_job=True) and "pm-vbry" not in post(client, **p)
    assert "ignoaps" in post(client, age=65, bpl_household=True) and "ignoaps" not in post(client, age=65)
    assert "pm-surya-ghar" in post(client, age=40, owns_roof_house=True) and "pm-surya-ghar" not in post(client, age=40)


def test_up_scholarship_general_cap_is_two_lakh(client):
    kw = dict(age=15, state="Uttar Pradesh", occupation="Student", education_level="Class 10")
    assert "up-general-pre-matric-scholarship" in post(client, **kw, income=200000)
    assert "up-general-pre-matric-scholarship" not in post(client, **kw, income=210000)


def test_official_links_use_trusted_https_domains_and_are_unique():
    import json, pathlib
    from urllib.parse import urlparse
    data = json.loads((pathlib.Path(__file__).resolve().parents[1] / "data" / "schemes.json").read_text(encoding="utf-8"))
    extra = {"mudra.org.in", "www.mudra.org.in", "maandhan.in"}  # official, but not on a .gov.in domain
    for s in data:
        for key in ("official_url", "source_url"):
            u = urlparse(s[key])
            assert u.scheme == "https", (s["id"], key)
            assert u.hostname.endswith((".gov.in", ".nic.in")) or u.hostname in extra, (s["id"], u.hostname)
            assert "demo" not in u.hostname and "test" not in u.hostname, (s["id"], u.hostname)
    urls = [s["official_url"] for s in data]
    assert len(urls) == len(set(urls)), "two schemes share the same official link"


def test_skipped_questions_are_unknown_not_no(client):
    emp = dict(age=30, occupation="Private employee")
    assert "apy" in post(client, **emp, tax_payer=False)
    assert "apy" not in post(client, **emp, tax_payer=None)  # skipped: do not assume "not a taxpayer"
    assert "pm-kmy" not in post(client, age=30, small_farmer=None)


def test_category_not_required_and_other_gender_sees_pmuy(client):
    body = profile(age=30, gender="Other", poor_household=True, no_existing_lpg=True)
    body.pop("category")
    r = client.post("/api/match", json=body)
    assert r.status_code == 200 and "pmuy" in ids(r)
