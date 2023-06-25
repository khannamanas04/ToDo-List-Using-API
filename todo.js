//REVEALING MODULE PATTERN IS USED
(function (){
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    
    
    console.log('Working');
    
    //API CALLS
    async function fetchTodos(){
        //GET request w/o async await
        // fetch("https://jsonplaceholder.typicode.com/todos")//this returns a promise so we can use then keyword
        // .then(function(response){
        //     return response.json(); //this will further return a promise
        // }).then(function(data){
        //     tasks = data.slice(0,10);
        //     renderList();
        // })
        // .catch(function(error){//if any promise shows error
        //     console.log('error',error);
        // })
    
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();
            tasks = data.slice(0,10);
            renderList();
        }
        catch(error){
            console.log(error);
        }
    }
    
    function addTaskToDOM(task){
        const li = document.createElement('li');
    
        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
              <label for="${task.id}">${task.title}</label>
              <img src="garbage-bin-10420.svg" class="delete" data-id="${task.id}" />
        `;
    
        tasksList.append(li);
    }
    
    function renderList () {
        tasksList.innerHTML = '';
    
        for(var i = 0;i<tasks.length ; i++){
            addTaskToDOM(tasks[i]);
        }
    
        tasksCounter.innerHTML = tasks.length;
    }
    
    function toggleTask(taskId) {
        const task = tasks.filter(task => task.id === Number(taskId));
        if(task.length>0){
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification("Task toggled");
            return;
        }
        showNotification("Could not toggle the task");
    }
    
    function deleteTask (taskId) {
        const newTasks = tasks.filter(function (task){
            return task.id !== Number(taskId);
        });
        //Also, can be written as 
        //const newTasks = task.filter(task => task.id !== taskId);
        tasks = newTasks ;
        renderList();
        showNotification("Task Deleted Successfully");
    }
    
    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList();
            showNotification("Task has been added");
            return;
        }
        showNotification("Task cannot be added");
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    //Handling keypress
    function handleInputKeypress(e) {
        if(e.key === 'Enter'){
            const text = e.target.value;
    
            //this is if the user does not type any text and just enters .
            if(!text){
                showNotification("Task text cannot be empty.");
                return;
            }
    
            const task = {
                title : text,
                id : Date.now(),
                completed : false
            }
    
            e.target.value = "";
            addTask(task);
        }
    }
    
    function handleClickEvent(event){
        const target = event.target;
    
        if(target.className === "delete"){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
        else if(target.className === "custom-checkbox"){
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }
    
    function initialiseApp(){
        fetchTodos();
        //Adding eventListeners to the input bar
        addTaskInput.addEventListener("keyup", handleInputKeypress);
        //EVENT DELEGATION FOR CLICKING EVENTS
        document.addEventListener('click', handleClickEvent);
    }

    initialiseApp();
})();

    
    
