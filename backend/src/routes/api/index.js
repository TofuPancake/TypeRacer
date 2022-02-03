import express from 'express';
import leaderboard from './leaderboard';
import matchHistory from './matchHistory';

const router = express.Router();

router.use('/leaderboard', leaderboard);
router.use('/match-history', matchHistory);

export default router;
