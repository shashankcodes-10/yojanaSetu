import json
from pathlib import Path

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "schemes.json"


def load_schemes():
    with DATA_FILE.open(encoding="utf-8") as f:
        return json.load(f)


def _basic_match(rule, profile):
    """Evaluate one rule group; all configured fields in a group are ANDed."""
    if profile["age"] < rule.get("min_age", 0) or profile["age"] > rule.get("max_age", 200):
        return False
    if "max_income" in rule and profile["income"] > rule["max_income"]:
        return False
    if "min_income" in rule and profile["income"] < rule["min_income"]:
        return False
    for field, profile_key in (("genders", "gender"), ("categories", "category"), ("occupations", "occupation"), ("states", "state"), ("education_levels", "education_level")):
        if rule.get(field) and profile[profile_key] not in rule[field]:
            return False
    if rule.get("poor_household") is True and profile.get("poor_household") is not True:
        return False
    if rule.get("no_existing_lpg") is True and profile.get("no_existing_lpg") is not True:
        return False
    for key, expected in rule.get("answers", {}).items():
        value = profile.get(key, False)  # None = the question was shown but skipped: unknown, so do not match
        if value is None or bool(value) is not expected:
            return False
    return True


def matches(scheme, profile):
    rules = scheme.get("eligibility", {})
    any_of = rules.get("any_of")
    if any_of is not None:
        return any(_basic_match(group, profile) for group in any_of)
    return _basic_match(rules, profile)


def find_matches(profile):
    return [scheme for scheme in load_schemes() if matches(scheme, profile)]
