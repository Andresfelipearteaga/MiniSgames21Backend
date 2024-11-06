import express from 'express';
import { updateActivityInfo, getUserActivities, getUserAllActivities } from '../controllers/activityController.js';


const router = express.Router();

// // Ruta para inicializar las actividades de un usuario
// router.post("/initialize/:userId", async (req, res) => {
//     const { userId } = req.params;
//     console.log('user', userId)
//     const response = await initializeUserActivities(userId);
//     res.json(response);
// });

// Ruta para actualizar `activityInfo` de una actividad específica
router.put("/update/:userId/:activityNumber", async (req, res) => {
    const { userId, activityNumber } = req.params;
    const activityInfo = req.body;
    console.log('user', userId);
    console.log('activity', activityNumber);
    console.log('info', activityInfo);
    const response = await updateActivityInfo(userId, Number(activityNumber), activityInfo);
    res.json(response);
});

router.get("/get/:userId/:activityNumber", async (req, res) => {
    const { userId, activityNumber } = req.params;
    console.log('user in get', userId);
    console.log('activity in get', activityNumber);
    const response = await getUserActivities(userId, Number(activityNumber));
    res.json(response);
});

router.get("/getAll/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log('user in getAll', userId);
    const response = await getUserAllActivities(userId);
    res.json(response);
});



export default router;
