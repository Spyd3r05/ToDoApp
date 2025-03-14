let task = document.getElementById("task");
let tasks = document.getElementById("tasks");
let taskDate = document.getElementById('taskDate');
const displayTaskInput = document.getElementById('displayTaskInput');
const taskInput = document.querySelector('.task-input');


displayTaskInput.addEventListener('click', ()=>{
    taskInput.style.display = taskInput.style.display === 'none' ? 'flex' : 'none';
})


function addTask(){
  if (task.value==="") {
    alert("Please enter a task.");
  } else {
    let newTask = document.createElement("li");
    let spanText = document.createElement('span');
    spanText.innerHTML = task.value;
    spanText.classList.add('text')
    newTask.appendChild(spanText);
    tasks.appendChild(newTask);
    let cross = document.createElement('button');
    cross.classList.add('delete')
    let button = document.createElement('button');
    button.classList.add('edit')
    button.innerHTML = '✏️';
    button.addEventListener('click', function() {
        editTask(button);
    });
    cross.innerHTML='❌';
    newTask.appendChild(button);
    newTask.appendChild(cross);
    taskInput.style.display = 'none';
    saveTasks();
  }
  task.value = '';
}



// Function to edit a task
function editTask(button) {
  let taskItem = button.parentElement;
  let taskText = taskItem.querySelector('span').innerText.trim(); // Get current text

  // Create input field
  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = taskText;
  inputField.classList.add("edit-input");

  // Create Save button
  let saveButton = document.createElement("button");
  saveButton.innerText = "💾";
  saveButton.onclick = function() {
      saveTask(taskItem, inputField.value);
  };

  // Clear and add new elements
  taskItem.innerHTML = "";
  taskItem.appendChild(inputField);
  taskItem.appendChild(saveButton);

  inputField.focus(); // Auto-focus the input field

  // Allow pressing 'Enter' to save
  inputField.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          saveTask(taskItem, inputField.value);
      }
  });
}

// Function to save the edited task
function saveTask(taskItem, newText) {
  taskItem.innerHTML = `
      <span class = "text">${newText}</span>
      <button onclick="editTask(this)" class="edit">✏️</button>
      <button onclick="deleteTask(this)" class='delete'>❌</button>
  `;
  saveTasks(); // Save tasks to local storage after editing
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