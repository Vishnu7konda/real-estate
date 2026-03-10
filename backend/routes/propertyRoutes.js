import express from 'express';
import { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController.js';

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(updateProperty)
  .delete(deleteProperty);

export default router;
