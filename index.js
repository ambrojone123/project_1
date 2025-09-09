let tasks = [];
let isEditing = false;
let currentEditIndex = null;

function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class="bi bi-pencil-square" onclick="startEditTask(${index})" id="edit"></i>
                    <i class="bi bi-trash" onclick="deleteTask(${index})" id="delete"></i>
                </div>
            </div>
        `;

        listItem.querySelector('.checkbox').addEventListener('change', () => {
            toggleTaskComplete(index);
        });

        taskList.appendChild(listItem);
    });

    updateStats();
}

function addOrUpdateTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (!text) return;

    if (isEditing) {
        // Update existing task
        tasks[currentEditIndex].text = text;
        isEditing = false;
        currentEditIndex = null;
    } else {
        // Add new task
        tasks.push({ text: text, completed: false });
    }

    taskInput.value = '';
    taskInput.focus();
    updateTaskList();
}

function startEditTask(index) {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    taskInput.focus();

    isEditing = true;
    currentEditIndex = index;
}

function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function updateStats() {
    const numbers = document.getElementById('numbers');
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const progress = document.getElementById('progres');

    numbers.textContent = `${completed}/${total}`;
    progress.style.width = total ? `${(completed / total) * 100}%` : '0%';
}

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addOrUpdateTask();
});

