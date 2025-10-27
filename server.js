const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://23eg106b30_db_user:Wgyi9OJ9HUTqmUh4@cluster0.tqwtezl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Import Routes
const riderRoutes = require('./routes/riders');
const teamRoutes = require('./routes/teams');
const rankingRoutes = require('./routes/rankings');
const sponsorRoutes = require('./routes/sponsors');

// Use Routes
app.use('/api/riders', riderRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/rankings', rankingRoutes);
app.use('/api/sponsors', sponsorRoutes);

// SPA fallback: Serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`MotoGP Hub server running on port ${PORT}`);
});
