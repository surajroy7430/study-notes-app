
let firebaseUrl = "https://study-notes-8a3b1-default-rtdb.asia-southeast1.firebasedatabase.app";

let studyNotes = [];
document.addEventListener("DOMContentLoaded", async () => {
    let studyNotes = await fetchNotes();
    console.log(studyNotes);
});

async function fetchNotes() {
    try {
        let res = await fetch(`${firebaseUrl}/notes.json`);
        let notes = await res.json();

        studyNotes = Object.entries(notes).map(([id, note]) => ({ id, ...note }));

        let notesMsg = document.getElementById("notesMsg");
        if (!studyNotes || studyNotes.length === 0) {
            notesMsg.textContent = "No notes added yet!";
            notesMsg.style.color = "red";
            return [];
        }

        return studyNotes;
    } catch (error) {
        notesMsg.textContent = "Error fetching notes. Please try again later.";
        notesMsg.style.color = "red";
        return [];
    }
}

function displayNotes() {
    let notesToDisplay = document.getElementById("display-notes");

    notesToDisplay.innerHTML = "";
    studyNotes.forEach(note => {
        notesToDisplay.innerHTML += `
            <div class="notes-card">
                <p>${note.title}</p>
                <p>${note.description}</p>
                <div class="topicAndPriority">
                    <p>Topic Name: ${note.topic}</p>
                    <p>Priority: ${note.priority}</p>
                </div>
                <p class="topicDate">Date Created: ${note.createdAt}</p>
                <div class="notes-action-btns">
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            </div>
        `;
    });
}

async function createNewNotes() {
    let titleInput = document.getElementById("title-input");
    let notesDescp = document.getElementById("content-input");
    let selectTopic = document.getElementById("topic-selection").value;
    let selectPriority = document.getElementById("priority-selection").value;
    let imageInput = document.getElementById("notes-image-input");
    let formMsg = document.getElementById("formMsg");

    let titleValue = titleInput.value;
    let descpValue = notesDescp.value;
    let imageValue = imageInput.value;

    if (!titleValue && !descpValue && selectTopic === "" && selectPriority === "") {
        formMsg.textContent = "All fields are required!";
        formMsg.style.color = "red";
    }

    let formData = {
        title: titleValue,
        description: descpValue,
        imageUrl: imageValue,
        topic: selectTopic,
        priority: selectPriority,
        createdAt: new Date(),
    }

    try {
        await fetch(`${firebaseUrl}/notes.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
    } catch (error) {
        formMsg.textContent = "error adding new notes";
        formMsg.style.color = "red";
    }
}
