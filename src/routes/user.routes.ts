import { Router } from "express";

const userRoutes = Router();


userRoutes.get('', (req , res) => {
    res.json({
        message : "data"
    })
});

userRoutes.post('', (req, res) => {
    res.json({
        message : "data"
    })
});

userRoutes.put('/:id', (req, res) => {
    res.json({
        messageId : req.params.id
    })
});


userRoutes.delete('/:id', (req, res) => {
    res.json({
        messageId : req.params.id
    })
});

export default userRoutes;