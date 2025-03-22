const form = document.getElementById("todoform");
const tasklist = document.getElementById("tasklist");


function addTask() {

  const input = document.getElementById("num1");
  const input2 = document.getElementById("num2");

  if (input.value === "" || input2.value === "") {
    alert("Please Fill the Task")
    return;
  }

  let newElement = document.createElement("li");
  newElement.innerHTML = `
  <div class = "list-content">
 <div class = "title">${input.value}</div>
  <div class = "list-item-description">${input2.value}</div>
  <div class = "action"
     <span class="edit-button"><i class="fa-solid fa-pen-to-square"></i></span>
    <span class="delete-button"><i class="fa-solid fa-trash"></i></span>
  </div>
 </div>
  `;

  tasklist.appendChild(newElement);

  input.value = "";
  input2.value = "";

}

