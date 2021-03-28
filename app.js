const today = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = document.querySelector('.day');
day.innerText = days[today.getDay()];
const date =  document.querySelector('.date');
date.innerText = today.toDateString().substring(4);

const toDoList = [];
const addButton = document.querySelector('.add');

function addToDo(e){
    e.preventDefault();
    const inputText = document.querySelector('input');
    if(inputText.value.length > 0) {
        const toDoItem = {
        text: inputText.value,
        isCompleted: false,
    }
    toDoList.push(toDoItem);
    inputText.value = null;
    populateToDo();
    }
}

function populateToDo() {
    const container = document.querySelector('.to-do-container');
    container.innerHTML = null;
    toDoList.forEach((item, index) => {
        container.appendChild(createToDoElement(item, index));
    });
}

function createToDoElement(item, index) {
    const newItem = document.createElement('div');
    const newInputItem = document.createElement('div');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('name', index.toString());
    checkBox.style.cursor = 'pointer';
    checkBox.addEventListener('click', ()=> {
        toDoList[index].isCompleted = !toDoList[index].isCompleted;
        populateToDo();
    });
    const toDoLabel = document.createElement('label');
    toDoLabel.setAttribute('for', index.toString());
    toDoLabel.innerText = item.text;
    if(item.isCompleted){
        checkBox.setAttribute('checked', item.isCompleted);
        toDoLabel.style['text-decoration'] = 'line-through';
    }
    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far', 'fa-trash-alt');
    deleteItem.addEventListener('click', () => {
        toDoList.splice(index, 1);
        populateToDo();
    });
    newInputItem.appendChild(checkBox);
    newInputItem.appendChild(toDoLabel);
    newItem.appendChild(newInputItem);
    newItem.appendChild(deleteItem);
    newItem.classList.add('to-do-item');
    return newItem;
}