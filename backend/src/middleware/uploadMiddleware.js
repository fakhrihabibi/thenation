const multer = require('multer');
const path = require('path');

// Configure storage - local storage with cloud-ready structure
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
        const uploadPath = isProduction
            ? path.join(require('os').tmpdir(), 'uploads')
            : path.join(__dirname, '../../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

module.exports = { upload };
