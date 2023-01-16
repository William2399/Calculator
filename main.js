const numbers = document.querySelectorAll('[data-number]');
const decimal = document.querySelector('[data-decimal]')
const operations = document.querySelectorAll('[data-operation]');
const button_clear = document.querySelector('[data-clear]');
const button_delete = document.querySelector('[data-delete]');
const button_sign = document.querySelector('[data-number-sign]');
const equals = document.querySelector('[data-equals]');
const previous_expressionText = document.querySelector('[data-previous-expression]');
const current_expressionText = document.querySelector('[data-current-expression]');

class Calculator {

    constructor(previous_expressionText, current_expressionText){
        this.previous_expressionText = previous_expressionText;
        this.current_expressionText = current_expressionText;
        this.resetCalculator();
    }

    resetCalculator(){
        this.previous_expression = '';
        this.current_expression = '';
        this.operation = null;
    }

    delete(){
        this.current_expression = this.current_expression.toString().slice(0, -1);
    }

    changeSign(){
        if (this.current_expression !== ''){
            let temp = parseFloat(this.current_expression) * -1;
            this.current_expression = temp;
        }
    }

    addNumber(number){
        this.current_expression = this.current_expression + number;
    }

    addDecimal(){
        if (this.current_expression.toString().includes('.')){return;}
        this.current_expression = this.current_expression + '.';
    }

    selectOperator(operation){
        if (this.current_expression === '' || this.current_expression === '.'){return;}
        if (this.previous_expression !== ''){
            this.calculate();
        }
        this.operation = operation;
        this.previous_expression = this.current_expression;
        this.current_expression = '';
    }

    calculate(){
        let previous = parseFloat(this.previous_expression);
        let current = parseFloat(this.current_expression)
        let result;
        if (this.operation === null){return;}
        switch(this.operation){
            case '÷':
                if (current == 0){
                    this.current_expression = '';
                    return
                }
                result = previous/current;
                break;
            case '×':
                result = previous*current;
                break;
            case '–':
                result = previous-current;
                break;
            case '+':
                result = previous+current;
                break;
            default:
                return;
        }
        let sections = result.toString().split('.');
        let length = sections[1] ? sections[1].length : 0;
        if (length > 4){result = result.toFixed(3);}
        this.current_expression = result;
        this.previous_expression = '';
        this.operation = null;
    }

    updateCalculator(){
        this.current_expressionText.innerText = this.current_expression;
        if (this.operation !== null){
            this.previous_expressionText.innerText = 
            `${this.previous_expression} ${this.operation}`;
        } else {
            this.previous_expressionText.innerText = '';
        }
    }
}

const calculator = new Calculator(previous_expressionText, current_expressionText);

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.addNumber(number.innerText);
        calculator.updateCalculator();
    })
})

decimal.addEventListener('click', () => {
    calculator.addDecimal();
    calculator.updateCalculator();
})

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.selectOperator(operation.innerText);
        calculator.updateCalculator();
    })
})

button_delete.addEventListener('click', () => {
    calculator.delete();
    calculator.updateCalculator();
});

equals.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateCalculator();
})


button_clear.addEventListener('click', () => {
    calculator.resetCalculator();
    calculator.updateCalculator();
})

button_sign.addEventListener('click', () => {
    calculator.changeSign();
    calculator.updateCalculator();
})