require('./patternMatch.js')();

const splitQuestion = (query) => {
    return query.split(/[!?,]+/g).filter(function (el) {return el != "";});
}

const classifyQuestion = (listOfQuestions) => {
    var classifiedQuestions = [];
    const regexDelete = /[Hh]apus pertanyaan.+/g;
    const regexAdd = /[Tt]ambah pertanyaan.+dengan jawaban.+/g;
    const regexDate = /[0-9]+\/[0-9]+\/[0-9]+/g;
    const regexMath = /[Bb]erapa|[Hh]itung|=/g;
    for (let i = 0; i < listOfQuestions.length; i++) {
        let temp = listOfQuestions[i].trim();
        if (regexDelete.test(temp)) {
            temp.replace(/[Hh]apus pertanyaan/g, "");
            classifiedQuestions.push([temp, "delete"]);//delete question
        }
        else if (regexAdd.test(temp)) {
            classifiedQuestions.push([temp, "add"]);//add question
        }
        else if (regexDate.test(temp)) {
            classifiedQuestions.push([temp, "date"]);//date
        }
        else if (regexMath.test(temp)) {
            temp.replace(/[Bb]erapa/i, "");
            classifiedQuestions.push([temp, "math"]);//math
        }
        else {
            classifiedQuestions.push([temp, "search"]);//search question
        }
    }
    return classifiedQuestions;
}

const createAnswer = (listOfQuestions, listOfQnA, method) => {
    var classifiedQuestions = classifyQuestion(listOfQuestions);
    var answer = [];

    for (let i = 0; i < classifiedQuestions.length; i++) {
        if (classifiedQuestions[i][1] == "delete") {
            answer.push(deleteQuestion(listOfQnA, classifiedQuestions[i][0], method));
        }
        else if (classifiedQuestions[i][1] == "add") {
            answer.push(addQuestion(listOfQnA, classifiedQuestions[i][0], method));
        }
        else if (classifiedQuestions[i][1] == "date") {
            answer.push(getDate(classifiedQuestions[i][0]));
        }
        else if (classifiedQuestions[i][1] == "math") {
            answer.push(getMathAnswer(classifiedQuestions[i][0]));
        }
        else {
            answer.push(getAnswer(listOfQnA, classifiedQuestions[i][0], method));
        }
    }
    return answer;
}

console.log(classifyQuestion(splitQuestion("Berapa 2+5")));


// console.log(splitQuestion("Siapa nama presiden indonesia! Siapa nama! Siapa? siapa, siapa?"))

// console.log(classifyQuestion(splitQuestion("Tambah pertanyaan Siapa nama presiden indonesia dengan jawaban aaaaa! Hari apa 2/21/2020? Hapus pertanyaan x! Berapa 2+2?")))

// console.log("dnkdnak\nndniwdnwa")

// var arr = [[2],[3],[4],[5]]
// arr.splice(2,1)
// console.log(arr)