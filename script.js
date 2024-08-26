document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('new-task');
    const prioritySelect = document.getElementById('priority');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        const priority = prioritySelect.value;
        if (taskText !== '') {
            addTask(taskText, priority);
            input.value = '';
        }
    });

    function addTask(text, priority) {
        const li = document.createElement('li');
        li.classList.add(`priority-${priority}`);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
                todoList.appendChild(li);
            } else {
                li.classList.remove('completed');
                sortTasks();
            }
        });

        const span = document.createElement('span');
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');

        deleteBtn.addEventListener('click', () => {
            li.classList.add('removing');
            li.addEventListener('animationend', () => {
                li.remove();
            });
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        sortTasks();
    }

    function sortTasks() {
        const tasks = Array.from(todoList.children);
        tasks.sort((a, b) => {
            const priorityA = a.classList.contains('priority-high') ? 1 : a.classList.contains('priority-medium') ? 2 : 3;
            const priorityB = b.classList.contains('priority-high') ? 1 : b.classList.contains('priority-medium') ? 2 : 3;

            if (a.classList.contains('completed') && !b.classList.contains('completed')) {
                return 1;
            } else if (!a.classList.contains('completed') && b.classList.contains('completed')) {
                return -1;
            } else {
                return priorityA - priorityB;
            }
        });

        tasks.forEach(task => todoList.appendChild(task));
    }
});
