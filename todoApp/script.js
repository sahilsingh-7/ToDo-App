document.addEventListener('DOMContentLoaded',()=>{
    let todoinp = document.getElementById('todo-input');
    const addbtn = document.getElementById('add-task-btn');
    const todolist = document.getElementById('todo-list');

    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.forEach(element => renderTask(element));

    addbtn.addEventListener('click',()=>{
        const text = todoinp.value.trim();
        if(text ==="") return;
        const newTask = {
            id: Date.now(),
            completed:false,
            content: text
        };
        taskList.push(newTask);
        saveTask();
        renderTask(newTask);
        todoinp.value = "";
    });

    function renderTask(task){
        const li = document.createElement('li');
        li.setAttribute('id',task.id);
        li.innerHTML = `
        <span>${task.content}</span>
        <button>Delete</button>
        `;
        todolist.appendChild(li);

        li.addEventListener('click',(event)=>{
            if(event.target.tagName ==='BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTask();
        });

        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation();
            taskList = taskList.filter((curtask)=> curtask.id !== task.id);
            li.remove();
            saveTask(); 
        })
    }

    function saveTask(){
        localStorage.setItem('tasks',JSON.stringify(taskList));
    }
});
