from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)

# Allow requests from the main domain and all subdomains
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://skyconsults.in",
            "https://www.skyconsults.in",
            "https://interiors.skyconsults.in",
            "https://realestate.skyconsults.in",
            # For local development:
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
    }
})

# ─────────────────────────────────────────────────────────────────────────────
# VAULT CODE MAPPING
# Add or remove codes here. Each entry maps a numeric code to a specific URL.
# Codes WITHOUT an entry here but within 1001-1099 will unlock the generic
# "Proceed" button which links to a default URL you can set below.
# ─────────────────────────────────────────────────────────────────────────────
MAPPING_FILE = os.path.join(os.path.dirname(__file__), "mapping.json")

def load_mapping():
    """Load redirect mapping from mapping.json."""
    try:
        with open(MAPPING_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

# Default destination for valid codes that have no specific mapping
DEFAULT_REDIRECT = "https://realestate.skyconsults.in"

@app.route("/api/verify", methods=["POST"])
def verify_code():
    """
    POST /api/verify
    Body: { "code": 1051 }
    Returns:
      - { "valid": true, "redirect": "<url>" }   → specific redirect
      - { "valid": true, "redirect": null }       → unlock Proceed button (default)
      - { "valid": false }                        → invalid code
    """
    data = request.get_json(silent=True)
    if not data or "code" not in data:
        return jsonify({"valid": False, "error": "Missing code"}), 400

    try:
        code = int(data["code"])
    except (ValueError, TypeError):
        return jsonify({"valid": False, "error": "Code must be numeric"}), 400

    # Range check: 1001–1099
    if not (1001 <= code <= 1099):
        return jsonify({"valid": False}), 200

    # Check for a specific redirect
    mapping = load_mapping()
    specific_url = mapping.get(str(code))

    if specific_url:
        return jsonify({"valid": True, "redirect": specific_url}), 200
    else:
        return jsonify({"valid": True, "redirect": None}), 200


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
