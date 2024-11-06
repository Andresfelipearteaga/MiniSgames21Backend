import express from 'express';


const router = express.Router();

router.get("/", async (req, res) => {
    const response = {
        message: "Hello World",
    };
    res.json(response);
});
export default router;