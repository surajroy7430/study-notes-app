
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
        console.log(error);
        notesMsg.textContent = "Error fetching notes. Please try again later.";
        notesMsg.style.color = "red";
        return [];
    }
}