function answerDate(date) {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    
    const d = new Date(date);
    if (d == "Invalid Date") {
        return "Invalid Date";
    }
    else {
        return days[d.getDay()];
    }
}

/* function secondAnswerDate(date) {
    const days = ["Sabtu", "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31];
    let numberOfDays = 0;

    const d = date.split("/");

    for (let i = 0; i < d.length; i++) {
        d[i] = parseInt(d[i], 10);
    }

    if (validateDate(d[0], d[1], d[2])) {
        // numberOfDays = d[2]*365;
        // for (i = 0; i < d[1]-1; i++) {
        //     numberOfDays += daysInMonth[i];
        // }

        // numberOfDays += d[0]-2;

        // numberOfDays += countLeapYear(d[2]-1);

        // if (isLeapYear(d[2]) && d[1] > 2) {
        //     numberOfDays++;
        // }
        numberOfDays += g(d[2], d[1], d[0]) - g(1, 1, 1);

        return days[numberOfDays % 7];
    }
    else {
        return "Invalid Date";
    }

} */

function validateDate(day, month, year) {
    if (day < 1 || day > 31) {
        return false;
    }
    else {
        if (month < 1 || month > 12) {
            return false;
        }
        else {
            if (year < 1) {
                return false;
            }
        }
    }

    if (month == 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                return false;
            }
        }
        else {
            if (day > 28) {
                return false;
            }
        }
    }
    else {
        if (month <= 7) {
            if (month % 2 == 0) {
                if (day > 30) {
                    return false;
                }
            }
        }
        else {
            if (month % 2 == 1) {
                if (day > 30) {
                    return false;
                }
            }
        }
    }

    return true;
}

function countLeapYear(year) {
    return Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
}

function isLeapYear(year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true;
            }
            else return false;
        }
        else return true;
    }
    else return false;
}

function g(y,m,d) {
    m = (m + 9) % 12
    y = y - Math.floor(m/10)
    return 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + Math.floor((m*366 + 5)/10) + ( d - 1 )
}
