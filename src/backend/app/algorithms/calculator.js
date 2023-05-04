const precedence = (operator) => {
    if (operator == '*' || operator == '/') {
        return 2;
    }
    else if (operator == '+' || operator == '-') {
        return 1;
    }
    else if(operator == '(') {
        return -1;
    }
    else if(operator == ')') {
        return -2;
    }
    return 0;
}

const convertToArray = (expression) => {
    let result = [];

    let digit = '';
    for (let i = 0; i < expression.length-1; i++) {
        let exp = expression.charAt(i);
        if (exp == '*' || exp == '/' || exp == '(' || exp == ')') {
            result.push(exp);
        }
        else if (exp == '+') {
            if (result[result.length-1] != '+' && result[result.length-1] != '-') {
                result.push(exp);
            }
        }
        else if (exp == '-') {
            if (i == 0 || expression.charAt(i-1) == '(' || expression.charAt(i-1) == '*' || expression.charAt(i-1) == '/') {
                digit += exp;
            }
            else {
                if (result[result.length-1] == '+') {
                    result[result.length-1] = '-';
                }
                else if (result[result.length-1] == '-') {
                    result[result.length-1] = '+';
                }
                else {
                    result.push(exp);
                }
            }
        }
        else {
            exp1 = expression.charAt(i+1);
            digit += exp;
            if (exp1 == '+' || exp1 == '-' || exp1 == '*' || exp1 == '/' || exp1 == '(' || exp1 == ')') {
                result.push(digit);
                digit = '';
            }
        }
    }
    if (digit != '') {
        digit += expression.charAt(expression.length-1);
        result.push(digit);
    }
    else {
        result.push(expression.charAt(expression.length-1));
    }

    return result;
}

const convertToPostfix = (expression) => {
    let stack = [];
    let result = [];

    for (let i = 0; i < expression.length; i    ++) {
        let temp = expression[i];

        if (precedence(temp) == 0) {
            result.push(temp);
        }
        else if (precedence(temp) == -1) {
            stack.push(temp);
        }
        else if (precedence(temp) == -2) {
            while (stack[stack.length-1] != '(') {
                result.push(stack.pop());
            }
            stack.pop();
        }
        else {
            while (stack.length != 0 && precedence(temp) <= precedence(stack[stack.length-1])) {
                result.push(stack.pop());
            }
            stack.push(temp);
        }
    }

    while (stack.length != 0) {
        result.push(stack.pop());
    }
    return result;
}

const calculateExpression = (expression) => {
    let stack = [];

    for (let i = 0; i < expression.length; i++) {
        let temp = expression[i];

        if (precedence(temp) == 0) {
            stack.push(Number(temp));
        }
        else {
            if (stack.length < 2) {
                return 'Invalid Expression';
            }
            else {
                let n1 = stack.pop();
                let n2 = stack.pop();

                if (temp == '+') {
                    stack.push(n2 + n1);
                }
                else if (temp == '-') {
                    stack.push(n2 - n1);
                }
                else if (temp == '*') {
                    stack.push(n2 * n1);
                }
                else if (temp == '/') {
                    if (n1 != 0) {
                        stack.push(n2 / n1);
                    }
                    else {
                        return 'Invalid Expression';
                    }
                }
                else {
                    return 'Invalid Expression';
                }
            }
        }
    }

    if (stack.length == 1) {
        if (stack[0] == Infinity || stack[0] == -Infinity || isNaN(stack[0])) {
            return 'Invalid Expression';
        }
        return "Hasilnya adalah " + stack.pop();
    }
    else {
        return 'Invalid Expression';
    }
}

const getMathAnswer = (expression) => {
    expression = expression.trim();
    return calculateExpression(convertToPostfix(convertToArray(expression)));
} 

module.exports = {
    getMathAnswer   
}
