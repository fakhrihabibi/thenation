require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const partnersRoutes = require('./routes/partnersRoutes');
const galleriesRoutes = require('./routes/galleriesRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const os = require('os');

// Ensure uploads directory exists
// Vercel/Render/Heroku often have read-only filesystems, so use /tmp for temp storage there.
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
let uploadsDir = isProduction ? path.join(os.tmpdir(), 'uploads') : path.join(__dirname, '../uploads');

console.log(`📂 Initializing uploads dir at: ${uploadsDir}`);

try {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('✅ Uploads directory created successfully');
    }
} catch (error) {
    console.error(`❌ Failed to create uploads directory at ${uploadsDir}:`, error.message);
    // Fallback to minimal temp dir if specific path fails
    uploadsDir = os.tmpdir();
    console.log(`⚠️ Falling back to: ${uploadsDir}`);
}

// CORS - allow multiple origins for dev + production
const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            return callback(null, true);
        }
        // Also allow any Vercel preview URLs
        if (origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        callback(null, false);
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
    });
});

// Root route for welcome message
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to The Nation API! 🚀',
        status: 'running',
        endpoints: {
            health: '/api/health',
            documentation: 'See frontend website'
        }
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/galleries', galleriesRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error.' });
});

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 The Nation API server running on port ${PORT}`);
        console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}

module.exports = app;
