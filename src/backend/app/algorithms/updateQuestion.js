require('./patternMatch.js')();

const searchQuestion = (listOfQnA, query, method) => {
    for (let i = 0; i < listOfQnA.length; i++) {
        if (method == "kmp") {
            if (kmpMatch(listOfQnA[i][0], query) != -1) {
                return i;
            }
        }
        else {
            if (bmMatch(listOfQnA[i][0], query) != -1) {
                return i;
            }
        }
    }
    return -1;
}

const addQuestion = (listOfQnA, query, method) => {
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

module.exports = function(listOfQnA, query, method) {
    this.addQuestion = addQuestion(listOfQnA, query, method);
    this.deleteQuestion = deleteQuestion(listOfQnA, query, method);
}
