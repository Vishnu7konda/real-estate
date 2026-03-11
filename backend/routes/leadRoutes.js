import express from 'express';
import { createLead, getLeads, updateLeadStatus, deleteLead } from '../controllers/leadController.js';

const router = express.Router();

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id/status')
  .put(updateLeadStatus);

router.route('/:id')
  .delete(deleteLead);

export default router;
