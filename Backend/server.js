import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;



// Define a schema and model for disaster reports
const reportSchema = new mongoose.Schema({
  location: String,
  disaster: String,
  status: String,
  description: String
});

const Report = mongoose.model('Report', reportSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission (POST request)
app.post('/report', (req, res) => {
  const { location, disaster, status, description } = req.body;

  const newReport = new Report({
    location,
    disaster,
    status,
    description
  });

  newReport.save()
    .then(() => res.status(201).json(newReport))
    .catch((err) => res.status(500).json({ message: 'Error saving report', error: err }));
});

// Route to fetch disaster reports
app.get('/reports', (req, res) => {
  Report.find()
    .then((reports) => res.json(reports))
    .catch((err) => res.status(500).json({ message: 'Error fetching reports', error: err }));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
