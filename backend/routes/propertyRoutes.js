import express from 'express';
import multer from 'multer';
import { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

const mUpload = upload.array('images', 7);
const handleUpload = (req, res, next) => {
  mUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    } else if (err) {
      return res.status(400).json({ message: "Unknown upload error", error: err.message });
    }
    next();
  });
};

router.route('/')
  .get(getProperties)
  .post(handleUpload, createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(handleUpload, updateProperty)
  .delete(deleteProperty);

export default router;
