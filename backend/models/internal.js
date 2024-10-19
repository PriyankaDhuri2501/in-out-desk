const express = require('express');
const mongoose = require('mongoose');

// Define common schema structure for both inward and outward
const internalSchema = new mongoose.Schema({
    type: { type: String, required: true }, // 'Inward' or 'Outward'
    letterDate: { type: Date, required: true },
    receivedDate: { type: Date, required: true },
    subject: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    address: { type: String, required: true },
    briefDescription: { type: String, required: true },
    numberOfPages: { type: Number, required: true },
    pdfPath: { type: String, required: true },
    remark: { type: String }
});

// Mongoose model for both Inward and Outward
const Internal = mongoose.model('Internal', internalSchema);

// Create a router
const router = express.Router();

// POST Route for uploading Inward or Outward data
router.post('/:type', (upload.single('pdfPath')), async (req, res) => {
    try {
        const { type } = req.params; // 'inward' or 'outward'

        // Ensure valid type is provided
        if (type !== 'inward' && type !== 'outward') {
            return res.status(400).json({ error: 'Invalid type. Use either "inward" or "outward".' });
        }

        const internalData = {
            type: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize 'inward' or 'outward'
            letterDate: req.body.letterDate,
            receivedDate: req.body.receivedDate,
            subject: req.body.subject,
            from: req.body.from,
            to: req.body.to,
            address: req.body.address,
            briefDescription: req.body.briefDescription,
            numberOfPages: req.body.numberOfPages,
            pdfPath: req.file.path, // Store file path
            remark: req.body.remark
        };

        const internal = new Internal(internalData);
        await internal.save();

        res.status(201).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} data uploaded successfully!` });
    } catch (error) {
        res.status(500).json({ error: `Failed to upload ${type} data` });
    }
});

// GET Route for fetching all Inward or Outward data
router.get('/:type', async (req, res) => {
    try {
        const { type } = req.params; // 'inward' or 'outward'

        // Ensure valid type is provided
        if (type !== 'inward' && type !== 'outward') {
            return res.status(400).json({ error: 'Invalid type. Use either "inward" or "outward".' });
        }

        const data = await Internal.find({ type: type.charAt(0).toUpperCase() + type.slice(1) });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch ${type} data` });
    }
});

module.exports = (upload) => router;
