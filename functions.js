// If you see 'function' it is a definition
// Internally all functions & variables 'hoisted'/moved to top of current scope/file

// 1. function definition - has keyword 'function'
function add(a, b) {
    return a + b;
}

// 2. function expression - variable assigned the function
// 'function' has name 'sub'
var subtract = function sub(a, b) {
    return a - b;
};

// 3. function expression 
// anonymous function - no name after 'function'
var multiply = function (a, b) {
    return a * b;
};

// 4. New syntax ES6 for anonymous functions, arrow syntax
var divide = (a, b) => {
    return a / b;
};


// Arithmetic functions
var x = 5;
var y = 3;
console.log('x=' + x);
console.log('y=' + y);
console.log('add = ' + add(x, y));
console.log('subtract = ' + subtract(x, y));
console.log('multiply = ' + multiply(x, y));
console.log('divide = ' + divide(x, y));
console.log('');


function callbackExpression() {
    console.log('1 callbackExpression');
    console.log('Hello after a small callbackExpression wait\n');
}

// 3 ways to write a callback functions

console.log('START');

// 1. callback functions - function that is executed after event
setTimeout( callbackExpression, 2000);
console.log('After 1 (2000)');

// 2. callback functions - function that is executed after event
setTimeout( function callbackFunction() {
    console.log('2 callbackFunction');
    console.log('Hello after a small callbackFunction wait\n');
}, 1000);
console.log('After 2 (1000)');

// 3. callback functions - function that is executed after event
setTimeout( function() {
    console.log('3 anonymous');
    console.log('Hello after a small anonymous wait\n');
}, 1500);
console.log('After 3 (1500)');

console.log('END\n');