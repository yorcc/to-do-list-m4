document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority');
    const taskDateInput = document.getElementById('task-date'); // Ambil input tanggal
    const addTaskButton = document.getElementById('add-task');
    const todoTable = document.getElementById('todo-table').querySelector('tbody');
    const doneTable = document.getElementById('done-table').querySelector('tbody');
    const historyList = document.getElementById('history-list');
    const deleteAllButton = document.getElementById('delete-all');
    const deleteHistoryButton = document.getElementById('delete-history');

    const nameInput = document.getElementById('name-input');
    const positionInput = document.getElementById('position-input');
    const saveProfileButton = document.getElementById('save-profile');
    const nameDisplay = document.getElementById('name-display');
    const positionDisplay = document.getElementById('position-display');

    function saveProfile() {
        const name = nameInput.value.trim();
        const position = positionInput.value.trim();

        if (name === '' || position === '') {
            alert('Please enter both name and position.');
            return;
        }

        nameDisplay.textContent = name;
        positionDisplay.textContent = position;
    }

    saveProfileButton.addEventListener('click', saveProfile);

    function addTask() {
        const task = taskInput.value.trim();
        const priority = prioritySelect.value;
        const date = taskDateInput.value; // Ambil nilai tanggal dari input

        if (task === '') {
            alert('Please enter a task.');
            return;
        }

        if (date === '') {
            alert('Please select a date.');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task}</td>
            <td>${priority}</td>
            <td>${date}</td>
            <td><input type="checkbox" class="status-checkbox"></td>
            <td><input type="checkbox" class="progress-checkbox"></td>
            <td><input type="checkbox" class="delete-checkbox"></td>
        `;

        // Progress Checkbox Event
        row.querySelector('.progress-checkbox').addEventListener('change', function() {
            if (this.checked) {
                row.querySelector('.status-checkbox').disabled = false;
                this.disabled = true;
                row.style.backgroundColor = '#ffeb3b'; // Optional: Highlight row as in-progress
            }
        });

        // Status Checkbox Event
        row.querySelector('.status-checkbox').addEventListener('change', function() {
            if (this.checked) {
                const doneRow = document.createElement('tr');
                doneRow.innerHTML = `
                    <td style="text-decoration: line-through;">${task}</td>
                    <td style="text-decoration: line-through;">${priority}</td>
                    <td style="text-decoration: line-through;">${date}</td>
                    <td>Done</td>
                `;
                doneTable.appendChild(doneRow);
                todoTable.removeChild(row);
            }
        });

        // Delete Checkbox Event
        row.querySelector('.delete-checkbox').addEventListener('change', function() {
            if (this.checked) {
                const task = row.cells[0].innerText;
                const listItem = document.createElement('li');
                listItem.textContent = `${task} - ${priority} - ${date}`;
                historyList.appendChild(listItem);

                todoTable.removeChild(row);
            }
        });

        todoTable.appendChild(row);
        taskInput.value = '';
        prioritySelect.value = 'low';
        taskDateInput.value = ''; // Reset input tanggal setelah menambahkan tugas
    }

    function deleteAllTasks() {
        const rows = todoTable.querySelectorAll('tr');
        rows.forEach(row => {
            const task = row.cells[0].innerText;
            const listItem = document.createElement('li');
            listItem.textContent = task;
            historyList.appendChild(listItem);
            todoTable.removeChild(row);
        });
    }

    function deleteHistory() {
        historyList.innerHTML = '';
    }

    addTaskButton.addEventListener('click', addTask);
    deleteAllButton.addEventListener('click', deleteAllTasks);
    deleteHistoryButton.addEventListener('click', deleteHistory);
});
