const todoContainer = document.getElementById('todo-list');
const totalCounter = document.getElementById('item-count');
const remainingCounter = document.getElementById('unchecked-count');

let currentId = 100;
let todosMap = {}
renderAll();

function newTodo() {
    const text = prompt('Введіть нову справу:');
    if (!text) return;

    const id = String(currentId++);
    todosMap[id] = {
        text: text.trim(),
        done: Math.random() < 0.5
    };

    renderAll();
}

function generateTodoHTML(id, todo) {
    const isChecked = todo.done ? 'checked' : '';
    const textClass = todo.done ? 'text-success text-decoration-line-through' : '';

    return `
        <li class="list-group-item">
            <input type="checkbox" class="form-check-input me-2" id="todo-${id}" ${isChecked} onchange="toggleTodo('${id}')">
            <label for="todo-${id}"><span class="${textClass}">${todo.text}</span></label>
            <button class="btn btn-danger btn-sm float-end" onclick="removeTodo('${id}')">Видалити</button>
        </li>
    `;
}

function renderAll() {
    const html = Object.entries(todosMap)
        .map(([id, todo]) => generateTodoHTML(id, todo))
        .join('');
    todoContainer.innerHTML = html;

    updateCounters();
}

function updateCounters() {
    const all = Object.keys(todosMap).length;
    const remaining = Object.values(todosMap).filter(t => !t.done).length;

    totalCounter.textContent = all;
    remainingCounter.textContent = remaining;
}

function removeTodo(id) {
    delete todosMap[id];
    renderAll();
}

function toggleTodo(id) {
    if (todosMap[id]) {
        todosMap[id].done = !todosMap[id].done;
        renderAll();
    }
}
