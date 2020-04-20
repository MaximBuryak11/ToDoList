'use strict'

const todoControl = document.querySelector('.todo-control');
let    headerInput = document.querySelector('.header-input');
const    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
todoData = JSON.parse(localStorage.getItem('array'));

 
let arr = [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        //console.log(item);
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class = "text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

            if(item.completed) {
                todoCompleted.append(li);
            } else {
                  todoList.append(li);
            }

            const btnTodoCompleted = li.querySelector('.todo-complete');
            btnTodoCompleted.addEventListener('click', function(){
                item.completed = !item.completed;
                render();
                localStorage.setItem('array', JSON.stringify(todoData));
                              
            })
            const btnCancel = li.querySelector('.todo-remove');
            btnCancel.addEventListener('click', function(){
                let index = todoData.indexOf(item, 0);
                delete todoData[index];
                render();
                todoData.splice(index, 1);
                localStorage.setItem('array', JSON.stringify(todoData)); 
                
            })
             
    });
};


todoControl.addEventListener ('submit', function(event){
    event.preventDefault();

    const newToDo = {
        value: headerInput.value,
        completed: false  
    };

    if(newToDo.value !== ''){
        todoData.push(newToDo);
        //info.push(JSON.stringify(newToDo));
        localStorage.setItem('array', JSON.stringify(todoData));
        headerInput.value = '';
        render();    
    }

});

render();