let task = document.getElementById("task");
let tasks = document.getElementById("tasks");


function addTask(){
  if (task.value==="") {
    alert("Please enter a task.");
  } else {
    let newTask = document.createElement("li");
    newTask.innerHTML = task.value;
    tasks.appendChild(newTask);
    let cross = document.createElement('span');
    cross.innerHTML='X';
    newTask.appendChild(cross);
    saveTasks();
  }
  task.value = '';
}

tasks.addEventListener('click',function(e){
  if(e.target.tagName === 'LI'){
    e.target.classList.toggle('checked');
    saveTasks();
  }else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveTasks();
  }
},false)


// save tasks to localstorage
function saveTasks(){
  localStorage.setItem('tasks', tasks.innerHTML)
}
// display tasks when the app is loaded
function displayTasks(){
  tasks.innerHTML = localStorage.getItem('tasks');
}
displayTasks();