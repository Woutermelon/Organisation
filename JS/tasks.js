//initialise and retrieve variables
const taskTypeInput = document.getElementById("taskType");
const taskNameInput = document.getElementById("taskName");
const taskDateInput = document.getElementById('taskDate')
const taskList = localStorage.getItem('saved-tasks') ? JSON.parse(localStorage.getItem('saved-tasks')) : [];
const newTaskButton = document.getElementById('confirmAddTask');
const clearAll = document.getElementById('clearAll');
const modal = document.querySelector('.modal');
const openModal = document.getElementById('new-task-button');
const closeModal = document.getElementById('cancel-new-task');



openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})



newTaskButton.addEventListener("click", e => {
    let newTaskName = taskNameInput.value.trim();
    let newTaskType = taskTypeInput.value;
    let newTaskDueDate = taskDateInput.value;
    let newTask = {
        taskName: newTaskName,
        taskType: newTaskType,
        taskStatus: "Backlog",
        taskDueDate: newTaskDueDate
    };
    console.log(newTask);
    taskList.push(newTask);
    localStorage.setItem("saved-tasks", JSON.stringify(taskList));
    showTasks();
    document.querySelector('#newTaskForm').reset()
});

clearAll.addEventListener('click', () => {
    taskList.splice(0, taskList.length);
    localStorage.setItem('saved-tasks', JSON.stringify(taskList));
    showTasks();
});


function deleteTask(deleteId) {
    taskList.splice(deleteId, 1);
    localStorage.setItem('saved-tasks', JSON.stringify(taskList));
    showTasks();
};

//hardcoded tasks to test showTask function
let testTasks = [{
    taskName: "quiz",
    taskType: "Economics",
    taskStatus: "Complete"
}, {
    taskName: "assignment",
    taskType: "Engineering",
    taskStatus: "In Progress"
}, {
    taskName: "task",
    taskType: "Personal",
    taskStatus: "Backlog"
}];
testTasks.forEach((testTask) => {
    taskList.push(testTask);
});


//showTask function
function showTasks() {
    let newTaskHTML = ``;
    let completeTasksHTML = ``;
    let backlogTasksHTML = ``;
    let inProgressTasksHTML = ``;
    numComplete = 0;
    numInProgress = 0;
    numBacklog = 0;
    if (taskList) {
        taskList.forEach((task, id) => {
            newTaskHTML = `
                <div class="box">
                    <div class="top-box">    
                        <span class="tag" id="${task.taskType}">${task.taskType}</span>
                        <i class="fa-solid fa-xmark" onclick="deleteTask(${id})"></i>
                    </div>
                    <p>${task.taskName}</p>
                    <div class="box-footer">
                        <div class="date">
                            <li><i class="fa-solid fa-calendar-days"></i></li>
                            <span>01/01/2001</span>
                        </div>
                        
                        <li class="comments"><i class="fa-solid fa-message"></i></li>
                    </div>
                </div>
            `;
            if (task.taskStatus === 'Complete') {
                completeTasksHTML += newTaskHTML;
                numComplete += 1;
            } else if (task.taskStatus === 'In Progress') {
                inProgressTasksHTML += newTaskHTML;
                numInProgress += 1;
            } else if (task.taskStatus === 'Backlog') {
                backlogTasksHTML += newTaskHTML;
                numBacklog += 1;
            }
        });
    }

    document.querySelector('.complete-tasks-column').innerHTML = completeTasksHTML;
    document.querySelector('.backlog-tasks-column').innerHTML = backlogTasksHTML;
    document.querySelector('.in-progress-tasks-column').innerHTML = inProgressTasksHTML;

    document.querySelector('.numBacklog').textContent = JSON.stringify(numBacklog);
    document.querySelector('.numInProgress').textContent = JSON.stringify(numInProgress);
    document.querySelector('.numComplete').textContent = JSON.stringify(numComplete);

}
showTasks();

console.log(taskList);

//begin task (set status to in progress)
function completeTask (taskId) {
    taskList[taskId].taskStatus = "Complete";
    showTasks();
};

function beginTask (taskId) {
    taskList[taskId].taskStatus = "In Progress";
    showTasks();
};



