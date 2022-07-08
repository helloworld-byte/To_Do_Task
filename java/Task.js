// Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', handleClearAll);
document.querySelector('input').addEventListener('click', handleDescription);
const tt = document.querySelector('.total-tasks span');
const ct = document.querySelector('.completed-tasks span');
const rt = document.querySelector('.remaining-tasks span');
var totalTasks = 0;
var completedTasks = 0;
var remainingTasks = 0;
// Event Handlers
function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    let text = document.querySelector('textarea')
    if (input.value != '')
        addTodo(input.value, text.value);
    input.value = '';
    text.value = '';
    totalTasks = totalTasks + 1;
    remainingTasks = totalTasks - completedTasks;
    countTasks();
}

function handleClickDeleteOrCheck(e) {
    if(e.target.name == "Task")
        ShowDescription(e);

    if(e.target.name == 'checkButton')
        checkTodo(e);

    if (e.target.name == 'deleteButton')
        deleteTodo(e);
}

function handleClearAll(e) {
    document.querySelector('ul').innerHTML = '';
    totalTasks = 0;
    completedTasks = 0;
    remainingTasks = 0;
    countTasks();
}

function  handleDescription(e) {
    if(document.getElementById('Description').style.display == "block")
        document.getElementById('Description').style.display = "none";
    else
        document.getElementById('Description').style.display = "block";
}

// Helpers
function addTodo(todo, description) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `
       
        <button name="Task" class="todo-item">${todo}<span name="hidden-description" id="description">${description}</span></button>    
        <button name="checkButton"><i class="fas fa-check-square"></i></button>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
        
    
        
    `;
    
    li.classList.add('todo-list-item');
    ul.appendChild(li);
}

function checkTodo(e) {
    let item = e.target.parentNode;
    if (item.style.textDecoration == 'line-through'){
        item.style.textDecoration = 'none';
        completedTasks = completedTasks - 1;
        remainingTasks = (totalTasks - completedTasks);
    }
    else {
        item.style.textDecoration = 'line-through';
        completedTasks = completedTasks + 1;
        remainingTasks = (totalTasks - completedTasks);
    }
    countTasks();
}

function deleteTodo(e) {
    let item = e.target.parentNode;
    
    item.addEventListener('transitionend', function () {
        item.remove();
    }) 

    item.classList.add('todo-list-item-fall');
    if (item.style.textDecoration == 'line-through'){
        totalTasks = totalTasks - 1;
        completedTasks = completedTasks - 1;
    }
    else {
        totalTasks = totalTasks - 1;
        remainingTasks = remainingTasks -1;
    }
    
    countTasks();
}

function ShowDescription(e) {
    let citem = e.target.parentNode;
    const litem = citem.children;
    const item = litem[0].children;
    if (item[0].style.display == 'block')
        item[0].style.display = 'none';
    else
        item[0].style.display = 'block';
}

function countTasks() {
    tt.textContent = totalTasks;
    ct.textContent = completedTasks;
    rt.textContent = remainingTasks;
}