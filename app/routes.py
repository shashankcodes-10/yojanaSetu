from flask import Blueprint, jsonify, render_template, request
from .schemes import find_matches, load_schemes

main = Blueprint("main", __name__)

# Yes/No follow-ups. Not asked (key missing) = False; asked but skipped (null/"") = None (unknown).
BOOL_KEYS = ["poor_household", "no_existing_lpg", "tax_payer", "social_security_member", "small_farmer",
             "traditional_trade", "first_formal_job", "bpl_household", "owns_roof_house", "income_under_15k"]


@main.get("/")
def home():
    return render_template("index.html")


@main.get("/api/schemes")
def schemes():
    return jsonify(load_schemes())


@main.post("/api/match")
def match():
    data = request.get_json(silent=True) or {}
    required = ["age", "state", "occupation", "income", "gender"]
    missing = [key for key in required if key not in data or data[key] in ("", None)]
    if missing:
        return jsonify({"error": "Please complete all required questions", "fields": missing}), 400

    try:
        profile = {
            "age": int(data["age"]),
            "state": str(data["state"]),
            "occupation": str(data["occupation"]),
            "income": float(data["income"]),
            "gender": str(data["gender"]),
            "category": str(data.get("category") or ""),
            "education_level": str(data.get("education_level") or "Not a student"),
            **{k: (None if k in data and data[k] in (None, "") else str(data.get(k, False)).lower() == "true") for k in BOOL_KEYS},
        }
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid profile values"}), 400

    if not 0 < profile["age"] <= 120 or profile["income"] < 0:
        return jsonify({"error": "Please enter valid age and income"}), 400

    results = find_matches(profile)
    return jsonify({"count": len(results), "profile": profile, "schemes": results})


@main.get("/health")
def health():
    return jsonify({"status": "ok", "service": "yojanasetu"})
