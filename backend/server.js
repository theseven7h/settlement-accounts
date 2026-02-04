const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all settlement accounts
app.get('/api/accounts', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'accounts.json');
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      return res.status(500).json({
        success: false,
        error: 'Data file not found',
        message: 'Unable to retrieve accounts data'
      });
    }

    // Read and parse the JSON file
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Validate data structure
    if (!data.accounts || !Array.isArray(data.accounts)) {
      return res.status(500).json({
        success: false,
        error: 'Invalid data structure',
        message: 'Accounts data is malformed'
      });
    }

    // Return successful response
    res.json({
      success: true,
      data: data.accounts,
      count: data.accounts.length
    });

  } catch (error) {
    console.error('Error reading accounts:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Settlement Accounts API running on http://localhost:${PORT}`);
  console.log(`Accounts endpoint: http://localhost:${PORT}/api/accounts`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
