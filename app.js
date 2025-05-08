import { doc, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { db } from './firebase.js';


// async function rendertasks() {
//   const tasklist = document.getElementById("tasklist");
//   tasklist.innerHTML = "";
// }

document.addEventListener("DOMContentLoaded", () => {
  rendertasks();
  const addBtn = document.getElementById("add-btn");
  addBtn.addEventListener("click", async () => {
    const titleInput = document.getElementById("num1");
    const descInput = document.getElementById("num2");
    const tasklist = document.getElementById("tasklist");

    const title = titleInput.value.trim();
    const description = descInput.value.trim();


    if (!title || !description) {
      alert("Please Fill The Task");
      return;
    }

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        createdAt: serverTimestamp(),
      });


      const newElement = document.createElement("li");
      newElement.innerHTML = `
                <div class="list-item-title">${title}</div>
                <div class="list-item-description">${description}</div>
                <div class="action">
                    <span class="edit-button"><i class="fa-solid fa-pen-to-square"></i></span>
                    <span class="delete-button"><i class="fa-solid fa-trash"></i></span>
                </div>
            `;

      tasklist.appendChild(newElement);

      titleInput.value = "";
      descInput.value = "";



      await rendertasks();

      console.log("Task added successfully to Firestore and UI.");
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
      //

      const newElement = document.createElement("li");
      newElement.innerHTML = `
            <div class="list-item-title">${title}</div>
            <div class="list-item-description">${description}</div>
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




      // Edit Method
      const editButton = newElement.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        // titleInput.value = title;
        // descInput.value = description;

        // isEditing = true;  

        addBtn.textContent = "Update Task"
        


      })


      tasklist.appendChild(newElement)
    });
  };

});