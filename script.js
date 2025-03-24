document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="checkbox" onclick="toggleTask(this)">
        <span>${taskText}</span> 
        <button class="delete-btn" onclick="removeTask(this)">Delete</button>`;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}

function toggleTask(checkbox) {
    let taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.classList.add("completed-task");
    } else {
        taskText.classList.remove("completed-task");
    }
    saveTasks();
}

function clearTasks() {
    document.getElementById("task-list").innerHTML = "";
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        let taskText = li.querySelector("span").innerText.trim();
        let isCompleted = li.querySelector(".checkbox").checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let taskList = document.getElementById("task-list");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="checkbox" onclick="toggleTask(this)" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed-task" : ""}">${task.text}</span> 
            <button class="delete-btn" onclick="removeTask(this)">Delete</button>`;
        taskList.appendChild(li);
    });
}
