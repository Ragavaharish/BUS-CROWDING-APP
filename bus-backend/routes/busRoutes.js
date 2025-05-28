import express from 'express';
import { getBuses, updateBusData } from '../controllers/busController.js';

const router = express.Router();

router.get('/bus-status', getBuses);
router.post('/update', updateBusData);

export default router;
