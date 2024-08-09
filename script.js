const addbtn = document.querySelector(".addicon");

const main = document.querySelector("#main");


addbtn.addEventListener("click",
    function () {
        addNote();
    }
)

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    }
    else { localStorage.setItem("notes", JSON.stringify(data)) }

}

const addNote = (text = " ") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `<div class="toolbar">
                    <img class="sav" src="diskette.png">
                    <img class="trash" src="bin.png">
                    </div>
                    <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener("click",
        function () {
            note.remove();
            saveNotes();
        }
    )

    note.querySelector(".sav").addEventListener("click",
        function () {
            saveNotes();
        }
    )

    note.querySelector("textarea").addEventListener("focusout",
        ()=>{
             saveNotes();
        }
    )

    main.appendChild(note);
    saveNotes();

}


(
    function () {
        const lsnotes = JSON.parse(localStorage.getItem("notes"))

        if (lsnotes === null) {
            addNote()
        }
        else {
            lsnotes.forEach(
                lsnote => {
                    addNote(lsnote)
                });
        }
    }
)()