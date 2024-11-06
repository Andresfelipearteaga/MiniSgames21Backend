import User from '../models/user.js';

export const getUserProfile = async (req, res) => {
    try {
        console.log(req.params);
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
                // Extraemos el campo 'completed' de cada actividad
        const activities = {
            activity1: user.activity1 ? user.activity1.completed : null,
            activity2: user.activity2 ? user.activity2.completed : null,
            activity3: user.activity3 ? user.activity3.completed : null,
            activity4: user.activity4 ? user.activity4.completed : null,
            activity5: user.activity5 ? user.activity5.completed : null,
            activity6: user.activity6 ? user.activity6.completed : null,
                };
        const activitiesProgress = {
            activity1: user.activity1 ? user.activity1.progress : null,
            activity2: user.activity2 ? user.activity2.progress : null,
            activity3: user.activity3 ? user.activity3.progress : null,
            activity4: user.activity4 ? user.activity4.progress : null,
            activity5: user.activity5 ? user.activity5.progress : null,
            activity6: user.activity6 ? user.activity6.progress : null,
        };
        console.log('user', user)
        console.log('activities', activities)
        res.json({ user, activities, activitiesProgress });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};
