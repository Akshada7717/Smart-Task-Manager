// script.js

const API_URL = "https://smart-task-func.azurewebsites.net/api/TaskFunction?code=https://smart-task-func.azurewebsites.net/api/TaskFunction?"; // Replace with your actual Function URL

// Function to fetch all tasks
async function getTasks() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const tasks = await response.json();
        displayTasks(tasks); // Call a function to display tasks in the UI
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Function to add a new task
async function addTask(taskData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData), // Example: { userId: "1", task: "New task", dueDate: "2025-04-01", completed: false }
        });
        const result = await response.json();
        console.log("Task added:", result);
        getTasks(); // Refresh the task list
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Function to update a task (e.g., mark as completed)
async function updateTask(taskId, updatedData) {
    try {
        const response = await fetch(`${API_URL}?id=${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData), // Example: { completed: true }
        });
        const result = await response.json();
        console.log("Task updated:", result);
        getTasks(); // Refresh the task list
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

// Function to delete a task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}?id=${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log("Task deleted:", result);
        getTasks(); // Refresh the task list
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// Function to display tasks in the UI
function displayTasks(tasks) {
    const taskList = document.getElementById("taskList"); // Assuming you have a <ul> or <div> with this ID in your HTML
    taskList.innerHTML = ""; // Clear the current list
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            ${task.task} (Due: ${task.dueDate}) - ${task.completed ? "Completed" : "Pending"}
            <button onclick="updateTask('${task.id}', { completed: ${!task.completed} })">Toggle Complete</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Event listener for adding a task (assuming you have a form in your HTML)
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.getElementById("taskInput").value;
    const dueDate = document.getElementById("dueDateInput").value;
    const taskData = {
        userId: "1", // Replace with actual user ID if needed
        task: task,
        dueDate: dueDate,
        completed: false,
    };
    addTask(taskData);
});

// Load tasks when the page loads
window.onload = getTasks;
