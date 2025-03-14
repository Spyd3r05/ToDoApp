const task = document.getElementById("task");
      const tasks = document.getElementById("tasks");
      const taskDate = document.getElementById("taskDate");
      const displayTaskInput = document.getElementById("displayTaskInput");
      const taskInput = document.querySelector(".task-input");

      displayTaskInput.addEventListener("click", () => {
        taskInput.style.display = taskInput.style.display === "none" ? "flex" : "none";
      });

      function addTask() {
        if (task.value.trim() === "") {
          alert("Please enter a task.");
          return;
        }

        let newTask = document.createElement("li");
        newTask.innerHTML = `
          <span class="text" onclick= checked(this)>${task.value} (${taskDate.value})</span>
          <button class="edit" onclick="editTask(this)">✏️</button>
          <button class="delete" onclick="deleteTask(this)">❌</button>
        `;
        tasks.appendChild(newTask);

        task.value = "";
        taskDate.value = "";
        taskInput.style.display = "none";
        saveTasks();

      }

      
      function editTask(button) {
        let taskItem = button.parentElement;
        let taskText = taskItem.querySelector(".text").innerText.split(" (")[0];

        taskItem.innerHTML = `
          <input type="text" class="edit-input" value="${taskText}" />
          <button class="save" onclick="saveTask(this)">💾</button>
        `;

        taskItem.querySelector(".edit-input").focus();
      }

      function saveTask(button) {
        let taskItem = button.parentElement;
        let newText = taskItem.querySelector(".edit-input").value;

        taskItem.innerHTML = `
          <span class="text" onclick=checked(this)>${newText}</span>
          <button class="edit" onclick="editTask(this)">✏️</button>
          <button class="delete" onclick="deleteTask(this)">❌</button>
        `;
        saveTasks();
      }


      
      function checked(span, button){
       span.classList.toggle('checked');
       button.querySelector('button').classList.toggle('display');
       saveTasks();
      }
      function deleteTask(button) {
        button.parentElement.remove();
        saveTasks();
      }

      function saveTasks() {
        localStorage.setItem("tasks", tasks.innerHTML);
      }

      function displayTasks() {
        tasks.innerHTML = localStorage.getItem("tasks") || "";
      }

      displayTasks();
    