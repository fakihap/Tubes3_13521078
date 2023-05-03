const pattern = require('./patternMatch.js');

const searchQuestion = (listOfQnA, query, method) => {
    for (let i = 0; i < listOfQnA?.length; i++) {
        if (method == "kmp") {
            if (pattern.kmpMatch(listOfQnA[i][0], query) != -1) {
                return i;
            }
        }
        else {
            if (pattern.bmMatch(listOfQnA[i][0], query) != -1) {
                return i;
            }
        }
    }
    return -1;
}

const addQuestion = (listOfQnA, query, method) => {
    query = query.replace(/[Tt]ambah pertanyaan/g, "");
    query = query.replace(/dengan jawaban/g, "#");

    const splitQuery = query.split("#");
    const question = splitQuery[0].trim();
    const answer = splitQuery[1].trim();
    const index = searchQuestion(listOfQnA, question, method);
    if (index == -1) {
        listOfQnA.push([question, answer]);
        return "Pertanyaan " + question +" berhasil ditambahkan!";
    }
    else {
        listOfQnA[index][1] = answer;
        return "Pertanyaan " + question +" sudah ada! Jawaban diupdate ke " + answer;
    }
}

const deleteQuestion = (listOfQnA, query, method) => {
    query = query.replace(/[Hh]apus pertanyaan/g, "");

    const question = query.trim();

    const index = searchQuestion(listOfQnA, question, method);
    if (index == -1) {
        return "Tidak ada pertanyaan " + question +" pada database!";
    }
    else {
        listOfQnA.splice(index, 1);
        return "Pertanyaan " + question +" telah dihapus";
    }
}

module.exports = {
    addQuestion,
    deleteQuestion
}
