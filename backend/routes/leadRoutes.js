import express from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/leadController.js';

const router = express.Router();

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id/status')
  .put(updateLeadStatus);

export default router;
