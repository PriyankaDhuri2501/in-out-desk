const mongoose = require('mongoose');

const inwardSchema = new mongoose.Schema({
    letterDate: { type: Date, required: true },
    receivedDate: { type: Date, required: true },
    subject: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    pdfPath: { type: String, required: true },
    remark: { type: String }
});

module.exports = mongoose.model('Inward', inwardSchema);
