const express = require('express');

const crud = require('../controllers/index.js');

module.exports = (app) => {
    const router = express.Router();

    router.get('/question', crud.get_question);
    router.get('/history', crud.get_history);
    router.post('/question', crud.post_question);
    router.post('/history', crud.post_history);
    router.delete('/history/:id', crud.del_history);
    router.delete('/question/:question', crud.del_question);
    router.delete('/history', crud.delete_history_all);
    router.delete('/question', crud.delete_question_all);
    router.get('/answer/:question', crud.get_answer);

    app.use("/", router);
}