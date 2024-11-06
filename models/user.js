import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: true,
    },
    grade : {
        type: String,
        required: true,
    },
    age : {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    activity1: 
        {
            type: Object,
            default: {
                title: "Actividad 1 - Memory Game",
                totalClicks: 0,
                incorrectPairs: 0,
                completionTime: 0,
                averagePairTime: 0,
                progress: 0,
                completed: false
            }
       },
    activity2: {
        type: Object,
        default: {
            title: "Actividad 2 - Drag and Drop",
            startTime: 0,
            endTime: 0,
            attempts: [],
            completed: false,
            progress: 0,
            completionTime: 0
        }
    },
    activity3: {
        type: Object,
        default: {
            title: "Actividad 3 - True or False",
            timeTaken: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            completed: false,
            progress: 0,
        }
    },
    activity4: {
        type: Object,
        default: {
            title: "Actividad 4 - Climate Change Machine Time", 
            timeSpent: 0,
            slidersMoved: {},
            quizAnswers: {},
            completed: false,
            progress: 0,
        }    },
    activity5: {
        type: Object,
        default: {
            title: "Actividad 5 - Argument Climate Change",
            topic: null,
            arguments: [],
            duration: 0,
            completed: false,
            progress: 0,
        }
    },
    activity6: {
        type: Object,
        default: {
            title: "Actividad 6 - Que debo hacer",
            actions: [],
            duration: 0,
            progress: 0,
            completed: false,
        }
    },
});

export default mongoose.model('User', userSchema);
