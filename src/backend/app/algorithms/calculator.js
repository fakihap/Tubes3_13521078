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
    var result = [];

    var digit = '';
    for (let i = 0; i < expression.length-1; i++) {
        var exp = expression.charAt(i);
        if (exp == '+' || exp == '-' || exp == '*' || exp == '/' || exp == '(' || exp == ')') {
            result.push(exp);
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
            while (stack.length != 0 && precedence(expression[i]) <= precedence(stack[stack.length-1])) {
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
                    stack.push(n2 / n1);
                }
                else {
                    return 'Invalid Expression';
                }
            }
        }
    }

    if (stack.length == 1) {
        return stack.pop();
    }
    else {
        return 'Invalid Expression';
    }
}

const getMathAnswer = (expression) => {
    if (!expression) {
        return;
    }
    expression = expression.trim();
    return calculateExpression(convertToPostfix(convertToArray(expression)));
} 

module.exports = {
    getMathAnswer   
}
