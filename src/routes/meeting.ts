import express from 'express';
import multer from 'multer';
import { processMeetingNotes } from '../services/meetingService';
import { AppError } from '../utils/AppError';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    let text = '';
    if (req.file) {
        // Only allow .txt files
      if (req.file.mimetype !== 'text/plain') {
        throw new AppError('Only .txt files are allowed', 400);
      }
      const fs = require('fs');
      text = fs.readFileSync(req.file.path, 'utf-8');
      fs.unlinkSync(req.file.path);
    } else if (req.body.text) {
      text = req.body.text;
    } else {
      throw new AppError('No input provided. Please send raw text or a .txt file.', 400);
    }

    const result = await processMeetingNotes(text);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
