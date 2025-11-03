import { Router } from 'express';
import { signup, login, getUserProfile } from '../controllers/userController.ts';
import { ortentikate } from '../middleware/auth.ts';
import { authorizeRoles } from '../middleware/roleMiddleware.ts';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/admin/dashboard', ortentikate, authorizeRoles('ADMIN'), (req, res) => {
    res.json({ message: "Admin Dashboard - Welcome!" })
})
router.get('/:id', ortentikate, getUserProfile);

export default router;
