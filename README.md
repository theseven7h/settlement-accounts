# VitalSwap Settlement Accounts

A full-stack application for managing settlement accounts, built for the VitalSwap Full-Stack Developer assessment.

## Live Demo

- **Frontend**: https://settlement-accounts.vercel.app/

> **Note**: Backend hosted on Render's free tier may take 30-60 seconds to wake up on first request after inactivity.

## Tech Stack

**Frontend**: React 18, React Router, Lucide Icons, React Toastify  
**Backend**: Node.js, Express, CORS  
**Deployment**: Vercel (Frontend), Render (Backend)

## Project Structure

```
vitalswap-assessment/
├── frontend/              # React application
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── pages/
│   └── package.json
├── backend/               # Express API
│   ├── server.js
│   ├── data/
│   │   └── accounts.json
│   └── package.json
└── README.md
```

## Key Features

### Frontend
- Pixel-accurate UI
- Dark mode toggle
- Expandable navigation menu
- Account number masking for international accounts
- Copy to clipboard functionality
- Loading and error states
- Toast notifications

### Backend
- RESTful API endpoint returning settlement accounts
- CORS enabled for frontend consumption
- Error handling and validation
- Health check endpoint

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Setup

**1. Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/vitalswap-assessment.git
cd vitalswap-assessment
```

**2. Run Backend**
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3001
```

**3. Run Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

## API Endpoints

**Base URL**: `https://settlement-accounts.onrender.com`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/accounts` | GET | Get all settlement accounts |

**Sample Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "bankName": "GTBank Plc",
      "accountHolder": "Akinsola Jegede Enterprises",
      "accountNumber": "0123456789",
      "isPrimary": true,
      "isVerified": true,
      "settlementType": "NGN Settlement",
      "currency": "NGN",
      "icon": "bank"
    }
  ],
  "count": 3
}
```

## Security Features

### Account Number Masking
International accounts (USD) are masked on the frontend for security:
- **Backend**: Stores full account number (`1234567888821`)
- **Frontend**: Displays masked format (`**** 8821`)
- **Copy function**: Copies full account number

This maintains data integrity while providing presentation-layer security.

## Deployment

### Frontend (Vercel)
- Framework: Create React App
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `build`

### Backend (Render)
- Environment: Node
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

## Assessment Requirements

**React frontend** - Built with React, replicates UI design  
**Node.js/Express backend** - Exposes JSON endpoint  
**Frontend consumes backend** - Fetches and displays data from API  
**Deployed and accessible** - Both frontend and backend live

## Design Decisions

### Why Monorepo?
Keeps frontend and backend together for easy review and demonstrates full-stack architecture.

### Why This Stack?
- **React**: Industry standard for modern UIs
- **Express**: Lightweight, perfect for RESTful APIs
- **Vercel/Render**: Free tier hosting with minimal configuration

## Notes

- The backend uses a JSON file for data storage (suitable for demo/assessment)
- For production, this would use a proper database (PostgreSQL/MongoDB)
- No authentication required for this assessment version
- CORS is open for development (would be restricted in production)

## Contact

For questions about this project, contact: jamestauri123@gmail.com

---
