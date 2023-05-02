const db = require('../config/db.config.js');

db.query("USE stima3", function(err, result){
    if (err) throw err;
    console.log("Successfully connected to database!");
});


async function get_question(){
    try{
        const [rows, fields] = await db.promise().query("SELECT * FROM questions");
        return rows;
    } catch (err) {
        throw err;
    }
}

async function get_history(){
    try{
        const [rows, fields] = await db.promise().query("SELECT * FROM history");
        return rows;
    } catch (err) {
        throw err;
    }
}

async function add_question(question, answer){
    try{
        const [rows, fields] = await db.promise().query("INSERT INTO questions (question, answer) VALUES (?, ?)", [question, answer]);
    } catch (err) {
        throw err;
    }
}

async function add_history(question, answer){
    try{
        const [rows, fields] = await db.promise().query("INSERT INTO history (answer, question, time) VALUES(?, ?, ?)", [answer, question, new Date()]);
    } catch (err) {
        throw err;
    }
}

async function delete_history(id){
    try{
        const [rows, fields] = await db.promise().query("DELETE FROM history WHERE id = ?", [id]);
    } catch (err) {
        throw err;
    }
}

async function delete_question(question){
    try{
        const [rows, fields] = await db.promise().query("DELETE FROM questions WHERE question = ?", [question]);
    } catch (err) {
        throw err;
    }
}

async function clear_history(){
    try{
        const [rows, fields] = await db.promise().query("DELETE FROM history");
    } catch (err) {
        throw err;
    }
}

async function clear_question(){
    try{
        const [rows, fields] = await db.promise().query("DELETE FROM questions");
    } catch (err) {
        throw err;
    }
}

module.exports = {
    get_question,
    get_history,
    add_question,
    add_history,
    delete_history,
    delete_question,
    clear_history,
    clear_question
}