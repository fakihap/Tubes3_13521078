const db = require('../config/db.config.js');
const algo = require('../algorithms/query.js');
const mainAlgorithm = require('../algorithms/query.js');

async function read_question_all(){
    try{
        // select all tables
        const [rows, fields] = await db.promise().query("SELECT * FROM questions");
        return rows;
    } catch (err) {
        throw err;
    }
}

async function read_question(question){
    try{
        if (question == null){
            return read_question_all();
        }
        const [rows, fields] = await db.promise().query("SELECT * FROM questions WHERE question = ?", [question]);
        console.log(rows)
        return rows;
    } catch (err) {
        throw err;
    }
}

async function read_history_all(){
    try{
        console.log("read history")
        const [rows, fields] = await db.promise().query("SELECT * FROM history");
        console.log(rows)
        return rows;
    } catch (err) {
        throw err;
    }
}

async function read_history(id){
    try{
        if (id == null){
            return read_history_all();
        }
        const [rows, fields] = await db.promise().query("SELECT * FROM history WHERE id = ?", [id]);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function add_question(question, answer){
    try{
        // check if question not exists first
        let [rows, fields] = await db.promise().query("SELECT * FROM questions WHERE question = ?", [question]);
        if (rows.length > 0){
            update_question(question, answer);
            return;
        }
        [rows, fields] = await db.promise().query("INSERT INTO questions (question, answer) VALUES (?, ?)", [question, answer]);
    } catch (err) {
        throw err;
    }
}

async function update_question(question, answer){
    try{
        const [rows, fields] = await db.promise().query("UPDATE questions SET answer = ? WHERE question = ?", [answer, question]);
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

const get_question = async function(req, res){
    try{
        const question = await read_question();
        res.status(200).send(question);
    }
    catch(err){
        res.status(500).send("Failed to get question!");
    }
}

const get_history = async function(req, res){
    try{
        const history = await read_history();
        res.status(200).send(history);
    }
    catch(err){
        res.status(500).send("Failed to get history!");
    }
}

const post_question = async function(req, res){
    const question = req.body.question;
    const answer = req.body.answer;
    if (question == null || answer == null){
        res.status(400).send("Question or answer cannot be null!");
        return;
    }
    if (question == "" || answer == ""){
        res.status(400).send("Question or answer cannot be empty!");
        return;
    }
    try{
        await add_question(question, answer);
        res.status(200).send("Question added!");
    }
    catch(err){
        res.status(500).send("Failed to add question!");
    }
}

const post_history = async function(req, res){
    const question = req.body.question;
    const answer = req.body.answer;
    if (question == null || answer == null){
        res.status(400).send("Question or answer cannot be null!");
        return;
    }
    if (question == "" || answer == ""){
        res.status(400).send("Question or answer cannot be empty!");
        return;
    }
    try{
        await add_history(question, answer);
        res.status(200).send("History added!");
    }
    catch(err){
        res.status(500).send("Failed to add history!");
    }
}

const del_history = async function(req, res){
    const id = req.body.id;
    if (id == null){
        res.status(400).send("ID cannot be null!");
        return;
    }
    // if no id in the db
    if (await read_history(id) == null){
        res.status(400).send("ID not found!");
        return;
    }
    try{
        await delete_history(id);
        res.status(200).send("History deleted!");
    }
    catch(err){
        res.status(500).send("Failed to delete history!");
    }
}

const del_question = async function(req, res){
    const question = req.body.question;
    if (question == null){
        res.status(400).send("Question cannot be null!");
        return;
    }
    if (question == ""){
        res.status(400).send("Question cannot be empty!");
        return;
    }
    // if no question in the db
    if (await read_question(question) == null){
        res.status(400).send("Question not found!");
        return;
    }
    try{
        await delete_question(question);
        res.status(200).send("Question deleted!");
    }
    catch(err){
        res.status(500).send("Failed to delete question!");
    }
}

const delete_history_all = async function(req, res){
    try{
        if (req.body.id != null){
            del_history(req, res);
            return;
        }
        await clear_history();
        res.status(200).send("History cleared!");
    }
    catch(err){
        res.status(500).send("Failed to clear history!");
    }
}

const delete_question_all = async function(req, res){
    try{
        if (req.body.question != null){
            del_question(req, res);
            return;
        }
        await clear_question();
        res.status(200).send("Question cleared!");
    }
    catch(err){
        res.status(500).send("Failed to clear question!");
    }
}

const get_answer = async function(req, res){
    const question = req.query.question;
    const method = req.query.method;
    const listQnA = await read_question();
    console.log(listQnA)
    if (question == null){
        res.status(400).send("Question cannot be null!");
        return;
    }
    if (question == ""){
        res.status(400).send("Question cannot be empty!");
        return;
    }
    try{
        const answer = await mainAlgorithm(question, listQnA, method);
        console.log(answer)
        res.status(200).send(answer);   
    }
    catch(err){
        res.status(500).send("Failed to get answer!");
    }
}

module.exports = {
    get_question,
    get_history,
    post_question,
    post_history,
    del_history,
    del_question,
    delete_history_all,
    delete_question_all,
    get_answer
}