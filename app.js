const addTodo = document.querySelector(".add__todo");
const todo__form = document.getElementById('todo__form');
const close = document.querySelector(".close");

addTodo.onclick = function() {
    todo__form.classList.add("is-show");
}


close.onclick = function() {
    todo__form.classList.remove("is-show");
}


function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }

    return element;
}

function createTodoItem(title) {
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
    const check = createElement('label', { className: 'check' }, checkbox);
    const label = createElement('label', { className: 'title' }, title);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Edit');
    const deleteButton = createElement('button', { className: 'delete' }, 'Delete');
    const listItem = createElement('li', { className: 'todo__item' }, check, label, editInput, editButton, deleteButton);

    bindEvents(listItem);

    return listItem;
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}

function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value === '') {
        return alert('Not todo value.');
    }

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
    todo__form.classList.remove("is-show");
    
}

function toggleTodoItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Edit';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Save';
    }

    listItem.classList.toggle('editing');
}

function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}

const todoForm = document.getElementById('todo__form');
const addInput = document.getElementById('add__input');
const todoList = document.getElementById('todo__list');
const todoItems = document.querySelectorAll('.todo__item');

function main() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
}

main();