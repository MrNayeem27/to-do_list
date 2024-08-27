const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value;
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="deleteTask(this.parentNode)">Delete</button>
            <button onclick="toggleComplete(this.parentNode)">Complete</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = '';

        // Save the task to local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ taskText });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTask(taskItem) {
    taskList.removeChild(taskItem);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = Array.from(taskList.children).indexOf(taskItem);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleComplete(taskItem) {
    taskItem.classList.toggle('completed');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = Array.from(taskList.children).indexOf(taskItem);
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage on page load
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
storedTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${task.taskText}</span>
        <button onclick="deleteTask(this.parentNode)">Delete</button>
        <button onclick="toggleComplete(this.parentNode)">Complete</button>
    `;
    if (task.completed) {
        taskItem.classList.add('completed');
    }
    taskList.appendChild(taskItem);
});