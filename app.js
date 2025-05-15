import { doc, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { db } from './firebase.js';

async function rendertasks() {
  const tasklist = document.getElementById("tasklist");
  tasklist.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  let isEditing = false; 
  let editingTaskId = null;

  rendertasks();

  const addBtn = document.getElementById("add-btn");
  addBtn.addEventListener("click", async () => {
    const titleInput = document.getElementById("num1");
    const descInput = document.getElementById("num2");
    const tasklist = document.getElementById("tasklist");

    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title || !description) {
      alert("Please fill up  the both fields.");
      return;
    }

    // Add method Firebase db    
    if (isEditing && editingTaskId) {
      const taskRef = doc(db, "tasks", editingTaskId);
      try {
        await updateDoc(taskRef, {
          title,
          description,
          updatedAt: new Date(),
        });
        isEditing = false;
        editingTaskId = null;
        addBtn.textContent = "Add Task";
        console.log("Task updated successfully");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      try {
        await addDoc(collection(db, "tasks"), {
          title,
          description,
          createdAt: serverTimestamp(),
        });
        console.log("Task added successfully to Firestore");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }

    titleInput.value = "";
    descInput.value = "";


    const newElement = document.createElement("li");
    newElement.innerHTML = `


   <div class="list-item-container">
            <div class="list-item-content">
            <h2>${title}</h2>
             <p>${description}</p>
              </div>
              <div class="action">
              <h1>Action</h1>
              <span class="edit-button" data-id="${editingTaskId}"> <i class="fa-solid fa-pen-to-square"></i></span>
              <span class="delete-button" data-id="${editingTaskId}">
              <i class="fa-solid fa-trash"></i>
              </span>
              </div>                
              </div>
            `;


    titleInput.value = "";
    descInput.value = "";

    await rendertasks();

    console.log("Task added successfully to Firestore and UI.");

  });


  async function rendertasks() {
    const tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";


    // Get Method Firebase
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((docSnap) => {
      const tasksData = docSnap.data();
      const { title, description } = docSnap.data();
      const taskId = docSnap.id;


      const newElement = document.createElement("li");
      newElement.innerHTML = `

    <div class="list-item-container"></div>
            <div class="list-item-content">

            <h2>${title}</h2>
            <p>${description}</p>
            <div class ="footer-line">
            <hr>
            </div>
            </div>
            <div class="action">
                <span class="edit-button" data-id="${taskId}"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="delete-button" data-id="${taskId}"><i class="fa-solid fa-trash"></i></span>
            </div>
      
            `;


      // Delete Method 
      const deleteButton = newElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async () => {
        try {
          await deleteDoc(doc(db, "tasks", taskId));
          await rendertasks();
        } catch (error) {
          console.error("Error Deleting Task");
        }
      });



      // edit method
      const editButton = newElement.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        const titleInput = document.getElementById("num1");
        const descInput = document.getElementById("num2");
        titleInput.value = title;
        descInput.value = description
        isEditing = true;
        editingTaskId = taskId,
          addBtn.textContent = "Update Task";
      });


      tasklist.appendChild(newElement)
    });
  };

});