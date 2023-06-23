const tasks = [];
const addTask = (ev) => {
    ev.preventDefault();
    let task = {
        taskName: getElementById('taskName').value,
        taskType: getElementById('taskType').value
    }
    tasks.push(task);
    document.querySelector('form').reset();
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('confirm').addEventListener('click', addTask);
});