const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // Import multer for file uploads
const path = require('path'); // Import path for handling file paths

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests to the backend

// Mongoose Schema for Inward Uploads
const inwardSchema = new mongoose.Schema({
    letterDate: String,
    receivedDate: String,
    subject: String,
    from: String,
    to: String,
    address: String,
    briefDescription: String,
    numberOfPages: Number,
    pdfPath: String,
    remark: String
});

// MongoDB Model
const Inward = mongoose.model('Inward', inwardSchema);

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Path to the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    },
});

const upload = multer({ storage: storage });

// POST Route to upload data
app.post('/api/inwards', upload.single('pdfPath'), async (req, res) => {
    try {
        const inwardData = {
            letterDate: req.body.letterDate,
            receivedDate: req.body.receivedDate,
            subject: req.body.subject,
            from: req.body.from,
            to: req.body.to,
            address: req.body.address,
            briefDescription: req.body.briefDescription,
            numberOfPages: req.body.numberOfPages,
            pdfPath: req.file.path, // Store the file path
            remark: req.body.remark
        };
        
        const inward = new Inward(inwardData);
        await inward.save();
        res.status(201).json({ message: 'Inward data uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload inward data' });
    }
});

// GET Route to fetch all uploaded inward data
app.get('/api/inwards', async (req, res) => {
    try {
        const inwards = await Inward.find();
        res.json(inwards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inward data' });
    }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/inwardUploads', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection failed:', err));

// Create the uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
