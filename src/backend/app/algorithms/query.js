const pattern = require('./patternMatch.js');
const question = require('./updateQuestion.js');
const calc = require('./calculator.js');
const date = require('./date.js');

const splitQuestion = (query) => {
    temp = query.toLowerCase();
    temp = temp.replace(/pak ustadz/g, "").trim();
    temp = temp.split(/[!?,]+/g).filter(function (el) {return el != "";});

    return temp;
}

const classifyQuestion = (listOfQuestions) => {
    let classifiedQuestions = [];
    const regexDelete = /[Hh]apus pertanyaan.+/g;
    const regexAdd = /[Tt]ambah pertanyaan.+dengan jawaban.+/g;
    const regexDate = /[0-9]+\/[0-9]+\/[0-9]+/g;
    const regexMath = /[Bb]erapa|[Hh]itung|=/g;
    for (let i = 0; i < listOfQuestions.length; i++) {
        let temp = listOfQuestions[i].trim();
        if (temp.search(regexDelete) != -1) {
            classifiedQuestions.push([temp, "delete"]);//delete question
        }
        else if (temp.search(regexAdd) != -1) {
            classifiedQuestions.push([temp, "add"]);//add question
        }
        else if (temp.search(regexDate) != -1) {
            classifiedQuestions.push([temp, "date"]);//date
        }
        else if (temp.search(regexMath) != -1) {
            temp = temp.replace(/[Bb]erapa|[Hh]itung|=/i, "");
            classifiedQuestions.push([temp, "math"]);//math
        }
        else {
            classifiedQuestions.push([temp, "search"]);//search question
        }
    }
    return classifiedQuestions;
}

const createAnswer = (listOfQuestions, listOfQnA, method) => {
    const classifiedQuestions = classifyQuestion(listOfQuestions);
    let answer = [];

    for (let i = 0; i < classifiedQuestions.length; i++) {
        let temp = classifiedQuestions[i][0];
        if (classifiedQuestions[i][1] == "delete") {
            answer.push(question.deleteQuestion(listOfQnA, classifiedQuestions[i][0], method));
        }
        else if (classifiedQuestions[i][1] == "add") {
            answer.push(question.addQuestion(listOfQnA, temp, method));
        }
        else if (classifiedQuestions[i][1] == "date") {
            answer.push(date.getDateAnswer(classifiedQuestions[i][0]));
        }
        else if (classifiedQuestions[i][1] == "math") {
            answer.push(calc.getMathAnswer(classifiedQuestions[i][0]));
        }
        else {
            answer.push(pattern.getAnswer(listOfQnA, classifiedQuestions[i][0], method));
        }
    }
    return answer;
}

const mainAlgorithm = (query, listOfQnA, method) => {
    const result = createAnswer(splitQuestion(query), listOfQnA, method);
    return result;
}

/* q = "Pak ustadz Hitung 1+2+3+4? Hitung 1+2! Tambah pertanyaan x dengan jawaban y! 5/4/2023? Pak ustadz siapa nama presiden indonesia" 
l = [["siapa nama presiden indonesia", "jokowi"], ["siapa nama ibu kota indonesia", "jakarta"], ["siapa nama presiden amerika serikat", "donald trump"]]
m = "kmp"
const t = createAnswer(splitQuestion(q), l, m);

console.log(t); */

/* console.log(main("Pak ustadz Hitung 1+2+3+4? Hitung 1+2! Tambah pertanyaan x dengan jawaban y! 5/4/2023? Pak ustadz siapa nama", [["siapa nama presiden indonesia", "jokowi"], ["siapa nama ibu kota indonesia", "jakarta"], ["siapa nama presiden amerika serikat", "donald trump"]], "bm")); */

let qna = [{question: "siapa nama presiden indonesia", answer: "jokowi"}, {question: "siapa nama ibu kota indonesia", answer: "jakarta"}, {question: "siapa nama presiden amerika serikat", answer: "donald trump"}];

let a = mainAlgorithm("Pak ustadz Hitung 1+2+3+4? Hitung 1+2! Tambah pertanyaan x dengan jawaban y! 5/4/2023? Pak ustadz siapa nama", qna, "bm");

for (let i = 0; i < a.length; i++) {
    console.log(a[i] + "\n");
}

console.log(qna);

/* let as = [{question: "a", answer: "b"}, {question: "c", answer: "d"}];
as.push({question: "e", answer: "f"});
console.log(as); */
// console.log(splitQuestion("Siapa nama presiden indonesia! Siapa nama! Siapa? siapa, siapa?"))

// console.log(classifyQuestion(splitQuestion("Tambah pertanyaan Siapa nama presiden indonesia dengan jawaban aaaaa! Hari apa 2/21/2020? Hapus pertanyaan x! Berapa 2+2?")))

// console.log("dnkdnak\nndniwdnwa")

// var arr = [[2],[3],[4],[5]]
// arr.splice(2,1)
// console.log(arr)

module.exports = mainAlgorithm;