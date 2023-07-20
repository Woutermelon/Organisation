let taskTypeInput = document.getElementById("taskType");
let taskNameInput = document.getElementById("taskName");
let taskList = JSON.parse(localStorage.getItem("saved-tasks"));

function addTask(ev) {
    ev.preventDefault();
    newTaskName = taskNameInput.value.trim();
    newTaskType = taskTypeInput.value;
    let newTask = {
        taskName: newTaskName,
        taskType: newTaskType,
        taskStatus: "Backlog"
    }
    taskList.push(newTask);
    localStorage.setItem("saved-tasks", JSON.stringify(taskList));
    showTasks();
};

let testTasks = [{
    taskName: "quiz",
    taskType: "Economics",
    taskStatus: "Complete"
}, {
    taskName: "assignment",
    taskType: "Engineering",
    taskStatus: "In Progress"
}];
testTasks.forEach((testTask) =>{
    taskList.push(testTask);
});


document.getElementById("confirmAddTask").addEventListener('click', addTask);

let completeTasksHTML = '';

let backlogHTML = '';

let inProgressHTML = '';

function showTasks() {
    if (taskList) {
        taskList.forEach((task, id) => {
            if (task.taskStatus === "Complete") 
                completeTasksHTML += `
                    <div class="box">
                        <div class="top-box">    
                            <span class="tag" id="${task.taskType}">${task.taskType}</span>
                            <p>${task.taskName}</p>
                            <button onclick="statusComplete(this)" class="taskDeleteBtn" id="${id}">Delete</button>
                        </div>
                        <div class="box-footer">
                            <div class="date">
                                <li><i class="fa-solid fa-calendar-days"></i></li>
                                <span>01/01/2001</span>
                            </div>
                            
                            <li class="comments"><i class="fa-solid fa-message"></i></li>
                        </div>
                        <button id="${id}" class="completeTask">Complete</button>
                    </div>
                `;
            else if (task.taskStatus === "In Progress")
                inProgressHTML += `
                    <div class="box">
                        <div class="top-box">    
                            <span class="tag" id="${task.taskType}">${task.taskType}</span>
                            <p>${task.taskName}</p>
                            <button id="deleteTaskBtn">Delete</button>
                        </div>
                        <div class="box-footer">
                            <div class="date">
                                <li><i class="fa-solid fa-calendar-days"></i></li>
                                <span>01/01/2001</span>
                            </div>
                            
                            <li class="comments"><i class="fa-solid fa-message"></i></li>
                        </div>
                        <button id="taskCompleteBtn" data-task-name="${task.taskName}">Complete</button>
                    </div>
                `;
            else
                backlogHTML += `
                    <div class="box">
                        <div class="top-box">    
                            <span class="tag" id="${task.taskType}">${task.taskType}</span>
                            <p>${task.taskName}</p>
                            <button id="deleteTaskBtn">Delete</button>
                        </div>
                        <div class="box-footer">
                            <div class="date">
                                <li><i class="fa-solid fa-calendar-days"></i></li>
                                <span>01/01/2001</span>
                            </div>
                            
                            <li class="comments"><i class="fa-solid fa-message"></i></li>
                        </div>
                        <button id="taskCompleteBtn" data-task-name="${task.taskName}">Complete</button>
                    </div>
                `;
        });
    }
}
showTasks();

document.querySelector('.complete-tasks-column').innerHTML = completeTasksHTML;

document.querySelector('.backlog-tasks-column').innerHTML = backlogHTML;

document.querySelector('.in-progress-tasks-column').innerHTML = inProgressHTML;

const statusComplete = (selectedTask) => {
    taskList[selectedTask.id].taskStatus = "Complete";
    showTasks();
    localStorage.setItem("saved-tasks", JSON.stringify(taskList));
};

console.log(taskList);