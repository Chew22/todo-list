const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');

// Function to create a new task element
function createTaskElement(title, description, priority) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Priority: ${priority}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    return taskElement;
}

// Function to add a new task
function addTask(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;

    if (title.trim() && description.trim()) {
        const taskElement = createTaskElement(title, description, priority);
        taskList.appendChild(taskElement);
        taskForm.reset();
    } else {
        alert('Please enter both title and description for the task.');
    }
}

// Function to delete a task
function deleteTask(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
    }
}

// Function to edit a task
function editTask(event) {
    if (event.target.classList.contains('edit-btn')) {
        const taskElement = event.target.parentElement;
        const title = taskElement.querySelector('h3').textContent;
        const description = taskElement.querySelector('p').textContent;
        const priority = taskElement.querySelector('p:nth-child(3)').textContent.split(': ')[1];

        // Create an edit form
        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <input type="text" value="${title}" id="edit-title" required>
            <textarea id="edit-description" required>${description}</textarea>
            <select id="edit-priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" class="cancel-btn">Cancel</button>
        `;

        // Set priority value in the edit form
        editForm.querySelector(`#edit-priority option[value="${priority}"]`).selected = true;

        // Replace task element with edit form
        taskElement.replaceWith(editForm);

        // Add event listener for edit form submission
        editForm.addEventListener('submit', saveEditedTask);

        // Add event listener for cancel button
        editForm.querySelector('.cancel-btn').addEventListener('click', () => {
            editForm.replaceWith(taskElement);
        });
    }
}

// Function to save edited task
function saveEditedTask(event) {
    event.preventDefault();
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;
    const priority = document.getElementById('edit-priority').value;

    if (title.trim() && description.trim()) {
        const updatedTaskElement = createTaskElement(title, description, priority);
        event.target.replaceWith(updatedTaskElement);
    } else {
        alert('Please enter both title and description for the task.');
    }
}

// Event listener for adding a new task
taskForm.addEventListener('submit', addTask);

// Event listener for deleting a task
taskList.addEventListener('click', deleteTask);

// Event listener for editing a task
taskList.addEventListener('click', editTask);
