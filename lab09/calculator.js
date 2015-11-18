"use strict";
var stack = [];
window.onload = function () {
    var displayVal = "0";
    var decFlag = 0;
    var operatorFlag = 0;
    var equalFlag = 0;
    var firstFlag = 0;
    var bracFlag = 0;
    var validation = true;
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = $(this).innerHTML;
            if (firstFlag) {
                decFlag = 0;
                operatorFlag = 0;
                equalFlag = 0;
                firstFlag = 0;
                validation = true;
                $('expression').innerHTML = "0";
            }
            if (value >= 0 && value <= 9 && validation) {
                operatorFlag = 0;
                if (displayVal == "0") {
                    displayVal = value;
                    $('result').innerHTML = displayVal;
                } else {
                    displayVal += value;
                    $('result').innerHTML = displayVal;
                }
            } else if (value == "AC") {
                decFlag = 0;
                operatorFlag = 0;
                equalFlag = 0;
                validation = true;
                displayVal = "0";
                stack = [];
                $('expression').innerHTML = "0";
                $('result').innerHTML = "0";
            } else if (value == "." && validation) {
                if (!decFlag) {
                    decFlag = 1;
                    displayVal += value;
                    $('result').innerHTML = displayVal;
                }
            } else if (validation) {
                if (displayVal == "0" && $('expression').innerHTML == "0" && value != "(" && value != "-") {
                    alert("At first, click numbers or opening bracket.");
                }
                else {
                    if (value == "=" && !equalFlag) {
                        equalFlag = 1;
                        if (isNaN(displayVal)) {
                            alert("Click a operator behind numbers.");
                        }
                        else {
                            if (stack.last() == ")" && !isNaN(displayVal) && displayVal != "0") {
                                stack.push("*", parseFloat(displayVal));
                                displayVal += value;
                            } else if (stack.last() == "(" && displayVal == "0") {
                                displayVal = value;
                            } else if (stack.last() != ")") {
                                stack.push(parseFloat(displayVal));
                                displayVal += value;
                            } else {
                                displayVal = value;
                            }
                            if ($('expression').innerHTML == "0") {
                                $('expression').innerHTML = displayVal;
                            }
                            else {
                                $('expression').innerHTML += displayVal;
                            }
                            if ((validation = isValidExpression(stack))) {
                                if (stack.last() == "(") {
                                    $('result').innerHTML = "ERROR";
                                    validation = false;
                                }
                                displayVal = postfixCalculate(infixToPostfix(stack));
                                if (isNaN(displayVal)) {
                                    $('result').innerHTML = "ERROR";
                                    validation = false;
                                } else {
                                    $('result').innerHTML = displayVal;
                                    stack = [];
                                    firstFlag = 1;
                                }
                            } else {
                                $('result').innerHTML = "ERROR";
                            }
                        }
                    } else {
                        if (stack.last() == ")" && !isNaN(displayVal) && displayVal != "0") {
                            stack.push("*");
                        }
                        if (value == "(") {
                            bracFlag = 1;
                            operatorFlag = 0;
                            if ((!isNaN(displayVal) && displayVal != "0")) {
                                stack.push(parseFloat(displayVal), "*");
                            } else if (displayVal == "0" && stack.last() == ")") {
                                stack.push("*");
                            }
                            stack.push("(");
                            if ($('expression').innerHTML == "0" && displayVal == "0") {
                                displayVal = value;
                            }
                            else if ($('expression').innerHTML != "0" && displayVal == "0") {
                                displayVal = value;
                            }
                            else {
                                displayVal += value;
                            }
                        } else if (value == ")") {
                            if (!bracFlag) {
                                validation = false;
                                $('result').innerHTML = "ERROR";
                            } else {
                                operatorFlag = 0;
                                if (isNaN(stack.last()) && stack.last() != ")" && stack.last() != "(" && displayVal == "0") {
                                    stack.push(0);
                                    displayVal += value;
                                } else if (stack.last() == "(" && displayVal == "0") {
                                    displayVal = value;
                                } else if (stack.last() == ")" && displayVal == "0") {
                                    displayVal = value;
                                } else {
                                    stack.push(parseFloat(displayVal));
                                    displayVal += value;
                                }
                                stack.push(")");
                            }
                        } else {
                            if (displayVal == "0" && isNaN(stack.last()) && stack.last() != ")") {
                                if (stack.last() != "(" && value != "-") {
                                    operatorFlag = 1;
                                } else {
                                    operatorFlag = 1;
                                    if (value == "-") {
                                        displayVal = value;
                                        $('result').innerHTML = displayVal;
                                    }
                                }
                            }
                            else {
                                decFlag = 0;
                                if (stack.last() == ")") {
                                    displayVal = value;
                                    stack.push(displayVal);
                                }
                                else if (!operatorFlag) {
                                    stack.push(parseFloat(displayVal), value);
                                    displayVal += value;
                                }
                            }
                        }
                    }
                    if (value != "=" && !operatorFlag && validation) {
                        if ($('expression').innerHTML == "0") {
                            $('expression').innerHTML = displayVal;
                        }
                        else {
                            $('expression').innerHTML += displayVal;
                        }
                        displayVal = "0";
                        $('result').innerHTML = "0";
                    }
                }
            }
        };
    }
};
function isValidExpression(s) {
    var openBrac = 0;
    var closeBrac = 0;
    for(var i = 0; i < s.length; i++) {
        if(s[i] === "(") {
            openBrac++;
        }
        else if (s[i] === ")") {
            closeBrac++;
        }
    }
    if (openBrac != closeBrac) {
        return false;
    }
    else {
        return true;
    }
}
function infixToPostfix(s) {
    var priority = {
        "+" : 0,
        "-" : 0,
        "*" : 1,
        "/" : 1
    };
    var tmpStack = [];
    var result = [];
    for (var i = 0; i < s.length; i++) {
        if (!isNaN(s[i])){
            result.push(s[i]);
        } else {
            if (tmpStack.length === 0) {
                tmpStack.push(s[i]);
            } else {
                if (s[i] === ")") {
                    while (true) {
                        if (tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if (s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for (var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}
function postfixCalculate(s) {
    var result = [];
    var former, latter;
    for (var i = 0; i < s.length ; i++) {
        if (!isNaN(s[i])) {
            result.push(s[i]);
        } else {
            if (s[i] === "+") {
                latter = result.pop();
                former = result.pop();
                result.push(former + latter);
            } else if (s[i] === "-") {
                latter = result.pop();
                former = result.pop();
                result.push(former - latter);
            } else if (s[i] === "/") {
                latter = result.pop();
                former = result.pop();
                result.push(former / latter);
            } else if (s[i] === "*") {
                latter = result.pop();
                former = result.pop();
                result.push(former * latter);
            }
        }
    }
    return result[0];
}
