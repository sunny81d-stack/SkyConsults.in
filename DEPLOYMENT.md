# SkyConsults.in — Deployment Guide
## cPanel / WebHostMost / LiteSpeed

---

## Project Structure

```
skyconsults/
├── backend/
│   ├── app.py              ← Flask API
│   ├── mapping.json        ← Code → URL mapping (edit this to add new codes)
│   ├── passenger_wsgi.py   ← cPanel Passenger entry point
│   └── requirements.txt    ← Python dependencies
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js          ← Main React component
    │   └── index.js
    ├── .htaccess           ← Apache/LiteSpeed routing rules
    └── package.json
```

---

## Part 1 — Deploy the Flask Backend

### Step 1: Upload backend files
Upload the entire `backend/` folder to your cPanel home directory, e.g.:
```
/home/<cpanel_user>/skyconsults_api/
```

### Step 2: Set up a Python App in cPanel
1. Go to **cPanel → Setup Python App**
2. Click **Create Application**
3. Fill in:
   - **Python Version**: 3.11 (or latest available)
   - **Application Root**: `skyconsults_api`
   - **Application URL**: `skyconsults.in/api`
   - **Application Startup File**: `passenger_wsgi.py`
   - **Application Entry Point**: `application`
4. Click **Create**

### Step 3: Install dependencies
In the cPanel Python App interface, click **Open Terminal** (or SSH in) and run:
```bash
cd /home/<cpanel_user>/skyconsults_api
pip install -r requirements.txt
```

### Step 4: Restart the app
Click **Restart** in the cPanel Python App panel.

---

## Part 2 — Deploy the React Frontend

### Step 1: Build the React app locally
```bash
cd frontend/
npm install
npm run build
```
This creates a `build/` folder.

### Step 2: Upload to cPanel
Upload the **contents** of `frontend/build/` to `public_html/` (the web root for skyconsults.in).

Also upload `.htaccess` to `public_html/`.

Your `public_html/` should look like:
```
public_html/
├── index.html
├── static/
│   ├── css/
│   └── js/
└── .htaccess
```

---

## Part 3 — Configure the API URL in React

Before building, open `frontend/src/App.js` and confirm this line:
```js
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://skyconsults.in/api"   // ← Your live domain
    : "http://localhost:5000/api";
```

---

## Part 4 — Adding New Vault Codes

Open `backend/mapping.json`. Add entries in this format:

```json
{
  "1051": "https://realestate.skyconsults.in/Godrej-Bannerghatta.htm",
  "1052": "https://realestate.skyconsults.in/Another-Property.htm",
  "1063": "https://interiors.skyconsults.in/project-showcase.html"
}
```

**Rules:**
- Keys must be strings (`"1052"` not `1052`)
- Codes must be between **1001–1099**
- Codes with no entry in `mapping.json` will unlock the generic **Proceed** button
- No Flask restart needed — the file is read on every request

---

## Part 5 — CORS Configuration

The Flask app (`app.py`) already allows:
- `https://skyconsults.in`
- `https://www.skyconsults.in`
- `https://interiors.skyconsults.in`
- `https://realestate.skyconsults.in`
- `http://localhost:3000` (local dev)

To add more allowed origins, edit the `origins` list in `app.py`.

---

## Local Development

### Backend
```bash
cd backend/
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend/
npm install
npm start
# Runs on http://localhost:3000
# The "proxy" in package.json forwards /api/* to localhost:5000
```

---

## Vault Logic Summary

| Code entered | In range 1001–1099? | In mapping.json? | Result |
|---|---|---|---|
| Any invalid code | No | — | Error state, no unlock |
| 1001–1099 (no mapping) | Yes | No | Unlocks "Proceed" → default URL |
| 1051 | Yes | Yes | Immediate redirect to Godrej-Bannerghatta.htm |
| Any mapped code | Yes | Yes | Immediate redirect to mapped URL |
