const getBorderFunction = (pattern) => {
    b = [];
    b[0] = 0;

    const n = pattern.length;
    let j = 0;
    let i = 1;

    while (i < n-1) {
        if (pattern.charAt(j) == pattern.charAt(i)) {
            b[i] = j + 1;
            i++;
            j++;
        }
        else if (j > 0) {
            j = b[j - 1];
        }
        else {
            b[i] = 0;
            i++;
        }
    }

    return b;
}

const kmpMatch = (text, pattern)  => {
    const lowerText = text.toLowerCase();
    const lowerPattern = pattern.toLowerCase();

    const n = lowerText.length;
    const m = lowerPattern.length;

    if (n != m) {
        return -1;
    }

    const border = getBorderFunction(lowerPattern);

    let i = 0;
    let j = 0;

    while (i < n) {
        if (lowerPattern.charAt(j) == lowerText.charAt(i)) {
            if (j == m-1) {
                return i - m + 1;
            }
            i++;
            j++;
        }
        else if (j > 0) {
            j = border[j - 1];
        }
        else {
            i++;
        }
    }
    return -1;
}

const buildLast = (pattern) => {
    last = [];

    for (let i = 0; i < 128; i++) {
        last[i] = -1;
    }

    for (i = 0; i < pattern.length; i++) {
        last[pattern.charCodeAt(i)] = i;
    }

    return last;
}

const bmMatch = (text, pattern) => {
    const lowerText = text.toLowerCase();
    const lowerPattern = pattern.toLowerCase();

    const last = buildLast(lowerPattern);
    const n = lowerText.length;
    const m = lowerPattern.length;
    
    let i = m - 1;

    if (n != m) {
        return -1;
    }

    if (i > n - 1) {
        return -1;
    }
    else {
        let j = m - 1;
        do {
            if (lowerPattern.charAt(j) == lowerText.charAt(i)) {
                if (j == 0) {
                    return i;
                }
                else {
                    i--;
                    j--;
                }
            }
            else {
                i = i + m - Math.min(j, 1 + last[lowerText.charCodeAt(i)]);
            }
        } while (i <= n - 1);
        return -1;
    }
}

const levenstheinDistance = (text, pattern) => {
    const lowerText = text.toLowerCase();
    const lowerPattern = pattern.toLowerCase();

    if (lowerPattern.length == 0) {
        return lowerText.length;
    }
    if (lowerText.length == 0) {
        return lowerPattern.length;
    }

    const matrix = [];
    for (let i = 0; i <= lowerText.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= lowerPattern.length; j++) {
        matrix[0][j] = j;
    }

    for (j = 1; j <= lowerPattern.length; j++) {
        for (i = 1; i <= lowerText.length; i++) {
            if (lowerPattern.charAt(j-1) == lowerText.charAt(i-1)) {
                subsCost = 0;
            }
            else {
                subsCost = 1;
            }
            matrix[i][j] = Math.min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i-1][j-1] + subsCost);
        }
    }

    return 1 - matrix[lowerText.length][lowerPattern.length] / lowerPattern.length;
}

const addDistance = (listOfQnA, pattern) => {
    temp = JSON.parse(JSON.stringify(listOfQnA));
    for (let i = 0; i < temp.length; i++) {
        temp[i].push(levenstheinDistance(temp[i][0], pattern));
    }
    return temp;
}

const noExactCase = (listOfQnA, pattern) => {
    const weightedQnA = addDistance(listOfQnA, pattern);

    const sortedWeightedQnA = weightedQnA.sort(function(a, b) {
        return b[2] - a[2];});

    if (sortedWeightedQnA[0][2] > 0.9) {
        return sortedWeightedQnA[0][1];
    }
    else {
        return "Pertanyaan tidak ditemukan di database. \nApakah maksud anda: \n" + "1. " + sortedWeightedQnA[0][0] + "\n2. " + sortedWeightedQnA[1][0] + "\n3. " + sortedWeightedQnA[2][0];
    }
}

const getAnswer = (listOfQnA, pattern, method) => {
    if (method == "kmp") {
        for (let i = 0; i < listOfQnA.length; i++) {
            if (kmpMatch(listOfQnA[i][0], pattern) != -1) {
                return listOfQnA[i][1];
            }
        }
    }
    else {
        for (let i = 0; i < listOfQnA.length; i++) {
            if (bmMatch(listOfQnA[i][0], pattern) != -1) {
                return listOfQnA[i][1];
            }
        }
    }
    return noExactCase(listOfQnA, pattern);
}

module.exports = {
    getAnswer,
    kmpMatch,
    bmMatch
}
// listOfQnA = [["siapa nama presiden indonesia", "jokowi"], ["siapa nama ibu kota indonesia", "jakarta"], ["siapa nama presiden amerika serikat", "donald trump"]]

// console.log(getAnswer(listOfQnA, "siapa nama presiden indonesa", "kmp"));
