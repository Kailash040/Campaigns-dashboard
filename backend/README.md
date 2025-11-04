# Avidion Campaign Manager - Backend API

A standalone Express.js backend API for the Avidion Campaign Manager application.

## Features

- RESTful API endpoints for campaign management
- JSON file-based data persistence
- Input validation and error handling
- CORS enabled for frontend integration
- Request logging middleware
- Health check endpoint

## Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── repositories/     # Data access layer
│   └── utils/            # Utility functions (validation, etc.)
├── data/                 # JSON data storage (auto-created)
├── server.js             # Application entry point
├── package.json          # Dependencies
└── README.md
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get a specific campaign
- `POST /api/campaigns` - Create a new campaign
- `PUT /api/campaigns/:id` - Update a campaign
- `DELETE /api/campaigns/:id` - Delete a campaign

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3001`

## Environment Variables

You can set the following environment variables:

- `PORT` - Server port (default: 3001)

Example:
```bash
PORT=3001 npm start
```

## API Usage Examples

### Get all campaigns
```bash
curl http://localhost:3001/api/campaigns
```

### Create a campaign
```bash
curl -X POST http://localhost:3001/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Campaign",
    "type": "Email",
    "description": "This is a new email campaign"
  }'
```

### Get a specific campaign
```bash
curl http://localhost:3001/api/campaigns/1
```

### Update a campaign
```bash
curl -X PUT http://localhost:3001/api/campaigns/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Paused"
  }'
```

### Delete a campaign
```bash
curl -X DELETE http://localhost:3001/api/campaigns/1
```

## Data Storage

Campaigns are stored in `backend/data/campaigns.json`. This file is automatically created with default data if it doesn't exist.

## Validation

The API validates:
- Campaign name: minimum 3 characters
- Campaign type: must be "Email" or "WhatsApp"
- Description: minimum 10 characters
- Status: must be "Active", "Paused", or "Completed"
- Sent and Replies: must be non-negative numbers

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## CORS

CORS is enabled to allow requests from the frontend running on `http://localhost:3000`.

## License

ISC

