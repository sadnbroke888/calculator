const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const previousScreenTextElement = document.querySelector('[data-operand-previous]');
const currentScreenTextElement = document.querySelector('[data-operand-current]');

class Calculator{
    constructor(previousScreenTextElement, currentScreenTextElement){
        this.previousScreenTextElement = previousScreenTextElement;
        this.currentScreenTextElement = currentScreenTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.updateDisplay();
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
        this.updateDisplay();
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString()+number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return;
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = '';
        this.updateDisplay();
    }
    updateDisplay(){
        this.currentScreenTextElement.innerText = this.currentOperand;
        this.previousScreenTextElement.innerText = this.previousOperand;
    }
}

const calculator = new Calculator(previousScreenTextElement, currentScreenTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
    });
});
equalsButton.addEventListener('click', () => {
    calculator.compute();
});
deleteButton.addEventListener('click', () => {
    calculator.delete();
});
allClearButton.addEventListener('click', () => {
    calculator.clear();
});