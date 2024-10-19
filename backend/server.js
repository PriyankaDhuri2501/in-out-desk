const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend-backend communication

// Mongoose schema and model for inward data
const inwardSchema = new mongoose.Schema({
    letterDate: String,
    receivedDate: String,
    subject: String,
    from: String,
    to: String,
    address: String,
    briefDescription: String,
    language: String,
    numberOfPages: Number,
    pdfPath: String,
    remark: String,
    inwardType: String // Field to distinguish Internal or External
});

const Inward = mongoose.model('Inward', inwardSchema);

// Setup storage for file uploads using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});
const upload = multer({ storage: storage });

// API route for inward file upload (POST)
app.post('/api/internal/inward', upload.single('pdfPath'), async (req, res) => {
    try {
        const inwardData = {
            letterDate: req.body.letterDate,
            receivedDate: req.body.receivedDate,
            subject: req.body.subject,
            from: req.body.from,
            to: req.body.to,
            address: req.body.address,
            briefDescription: req.body.description,
            language: req.body.language,
            numberOfPages: req.body.pages,
            pdfPath: req.file.path,
            remark: req.body.remark,
            inwardType: req.body.inwardType // Expecting Internal or External from the frontend
        };

        // Save the inward data to MongoDB
        const inward = new Inward(inwardData);
        await inward.save();

        res.status(201).json({ message: 'Inward data uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading inward data', error });
    }
});

// API route to get all inward uploads (GET)
app.get('/api/internal/inward', async (req, res) => {
    try {
        const { inwardType } = req.query; // Get the inwardType from query parameters (Internal/External)
        
        // If inwardType is provided, filter by that, otherwise fetch all
        const filter = inwardType ? { inwardType } : {};
        
        const inwardUploads = await Inward.find(filter);
        res.status(200).json(inwardUploads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inward uploads', error });
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inwardUploads', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection failed:', err));

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Start server on port 5000
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
