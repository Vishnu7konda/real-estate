import express from 'express';
import { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(upload.array('images', 5), createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(upload.array('images', 5), updateProperty)
  .delete(deleteProperty);

export default router;
