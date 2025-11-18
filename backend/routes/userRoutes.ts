import { Router } from 'express';
import { signup, login, getUserProfile } from '../controllers/userController.ts';
import { authenticate } from '../middleware/auth.ts';
import { authorizeRoles } from '../middleware/roleMiddleware.ts';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/admin/dashboard', authenticate, authorizeRoles('ADMIN'), (req, res) => {
    res.json({ message: "Admin Dashboard - Welcome!" })
})
router.get('/:id', authenticate, getUserProfile);

export default router;
