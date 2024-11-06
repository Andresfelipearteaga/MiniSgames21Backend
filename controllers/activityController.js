import User from '../models/user.js';

// // Controlador para inicializar actividades
// export const initializeUserActivities = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         console.log('user', user)
//         if (!user) return { success: false, message: "Usuario no encontrado" };
//           // Definir la nueva actividad que quieres agregar
        
//         const newActivity = {
//             title: "Actividad Inicial", // Cambia esto al título que desees
//             activityInfo: {
//                 totalClicks: 0,
//                 incorrectPairs: 0,
//                 completionTime: 0,
//                 averagePairTime: 0,
//                 progress: 0,
//             }
//         };

//         // Agregar la nueva actividad al arreglo activityOne
//         user.activityOne.push(newActivity);

//         // Guardar el usuario actualizado en la base de datos
//         await user.save();

//         return { success: true, message: "Actividades inicializadas correctamente." };
   


//     } catch (error) {
//         console.error("Error inicializando actividades:", error);
//         return { success: false, message: "Error al inicializar actividades." };
//     }
// };

// Controlador para actualizar el campo `activityInfo`
export const updateActivityInfo = async (userId, activityNumber, activityInfo) => {
    try {
        console.log('activityNumber', activityNumber)
        const user = await User.findById(userId);
        if (!user) return { success: false, message: "Usuario no encontrado" };
        console.log(user)

        const keyActivity = `activity${activityNumber}`;
        console.log('keyActivity', keyActivity)
        console.log('activityInfo', activityInfo)

        // Condicional según el número de actividad
        if (activityNumber === 1) {
            user[keyActivity] = {
                title: activityInfo.title,
                totalClicks: activityInfo.totalClicks,
                incorrectPairs: activityInfo.incorrectPairs,
                completionTime: activityInfo.completionTime,
                averagePairTime: activityInfo.averagePairTime,
                progress: activityInfo.progress,
                completed: activityInfo.completed,
            };
        } else if (activityNumber === 2) {
            user[keyActivity] = {
                title: activityInfo.title,
                startTime: activityInfo.startTime,
                endTime: activityInfo.endTime,
                attempts: activityInfo.attempts,
                completed: activityInfo.completed,
                progress: activityInfo.progress,
                completionTime: activityInfo.completionTime,
            };
        } else if (activityNumber === 3) {
            user[keyActivity] = {
                title: activityInfo.title,
                timeTaken: activityInfo.timeTaken,
                correctAnswers: activityInfo.correctAnswers,
                incorrectAnswers: activityInfo.incorrectAnswers,
                completed: activityInfo.completed,
                progress: activityInfo.progress,
            };
        } else if (activityNumber === 4) {
            user[keyActivity] = {
                title: activityInfo.title,
                timeSpent: activityInfo.timeSpent,
                slidersMoved: activityInfo.slidersMoved,
                quizAnswers: activityInfo.quizAnswers,
                progress: activityInfo.progress,
                completed: activityInfo.completed,
            };
        } else if (activityNumber === 5) {
            user[keyActivity] = {
                title: activityInfo.title,
                topic: activityInfo.topic,
                arguments: activityInfo.arguments,
                duration: activityInfo.duration,
                completed: activityInfo.completed,
                progress: activityInfo.progress,
            }; 
        } else if (activityNumber === 6) {
            user[keyActivity] = {
                title: activityInfo.title,
                actions: activityInfo.actions,
                duration: activityInfo.duration,
                progress: activityInfo.progress,
                completed: activityInfo.completed,
            };}

        // Actualiza el campo `activityInfo` de la actividad
        await user.save();
        return { success: true, message: "Información de la actividad actualizada." };
    } catch (error) {
        console.error("Error actualizando actividad:", error);
        return { success: false, message: "Error al actualizar actividad." };
    }
};
export const getUserActivities = async (userId, activityNumber) => {
    try {
        const user = await User.findById(userId);
        if (!user) return { success: false, message: "Usuario no encontrado" };

        const keyActivity = `activity${activityNumber}`;
        const activities = user[keyActivity];
        console.log(activities)
        return { success: true, message: "Actividades obtenidas correctamente.", activities };
    } catch (error) {
        console.error("Error obteniendo actividades:", error);
        return { success: false, message: "Error al obtener actividades." };
    }
};

export const getUserAllActivities = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return { success: false, message: "Usuario no encontrado" }; 
        
        // Extraemos el campo 'completed' de cada actividad
        const activities = {
            activity1: user.activity1 ? user.activity1.completed : null,
            activity2: user.activity2 ? user.activity2.completed : null,
            activity3: user.activity3 ? user.activity3.completed : null,
            activity4: user.activity4 ? user.activity4.completed : null,
            activity5: user.activity5 ? user.activity5.completed : null,
            activity6: user.activity6 ? user.activity6.completed : null,
        };

        console.log(activities);
        return { success: true, message: "Actividades obtenidas correctamente.", activities };
    } catch (error) {
        console.error("Error obteniendo actividades:", error);
        return { success: false, message: "Error al obtener actividades." };
    }
};


