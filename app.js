const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");
const darkModeToggle = document.getElementById("darkModeToggle");
const filterButtons = document.querySelectorAll(".filter-btn");

// Single source of truth for all tasks.
let todos = [];
let currentFilter = "all";
let isDarkMode = false;

function saveToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromStorage() {
    const stored = localStorage.getItem("todos");

    if (!stored) {
        todos = [];
        return;
    }

    try {
        const parsed = JSON.parse(stored);
        todos = Array.isArray(parsed) ? parsed : [];
    } catch {
        todos = [];
    }
}

function generateId() {
    return Date.now();
}

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        return;
    }

    const newTask = {
        id: generateId(),
        text,
        completed: false,
    };

    todos.push(newTask);
    saveToStorage();
    taskInput.value = "";
    renderTodos();
}

function getFilteredTodos() {
    if (currentFilter === "pending") {
        return todos.filter((todo) => !todo.completed);
    }
    if (currentFilter === "completed") {
        return todos.filter((todo) => todo.completed);
    }
    return todos;
}

function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    renderTodos();
}

function toggleComplete(id) {
    todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveToStorage();
    renderTodos();
}

//function for rendering the to-do list based on the current filter and dark mode state.
function renderTodos() {
    todoList.innerHTML = "";
    const visibleTodos = getFilteredTodos();

    visibleTodos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        const itemText = document.createElement("span");
        itemText.textContent = todo.text;
        itemText.className = "todo-text";

        if (todo.completed) {
            itemText.classList.add("completed");
        }

        const controls = document.createElement("div");
        controls.className = "todo-controls";

        const completeBtn = document.createElement("button");
        completeBtn.type = "button";
        completeBtn.textContent = todo.completed ? "Undo" : "Complete";
        completeBtn.className = "complete-btn todo-action-btn";
        completeBtn.dataset.id = String(todo.id);

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn todo-action-btn";
        editBtn.dataset.id = String(todo.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn todo-action-btn";
        deleteBtn.dataset.id = String(todo.id);

        controls.append(completeBtn, editBtn, deleteBtn);
        li.append(itemText, controls);
        todoList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

todoList.addEventListener("click", (e) => {
    const target = e.target;

    if (!(target instanceof HTMLButtonElement)) {
        return;
    }

    const id = Number(target.dataset.id);

    if (!id) {
        return;
    }

    if (target.classList.contains("complete-btn")) {
        toggleComplete(id);
        return;
    }
    if (target.classList.contains("edit-btn")) {
        editTask(id);
        return;
    }
    if (target.classList.contains("delete-btn")) {
        deleteTask(id);
        return;
    }
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
    });
});

darkModeToggle.addEventListener("click", toggleDarkMode);

function editTask(id) {
    const taskToEdit = todos.find((todo) => todo.id === id);

    if (!taskToEdit) {
        return;
    }

    const updatedText = window.prompt("Edit your task:", taskToEdit.text);

    if (updatedText === null) {
        return;
    }

    const trimmedText = updatedText.trim();

    if (!trimmedText) {
        return;
    }

    todos = todos.map((todo) => {
        if (todo.id !== id) {
            return todo;
        }

        return {
            ...todo,
            text: trimmedText,
        };
    });

    saveToStorage();
    renderTodos();
}

function deleteTask(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveToStorage();
    renderTodos();
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    darkModeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
}

loadFromStorage();
renderTodos();
