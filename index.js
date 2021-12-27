showNotes();
let addbtn = document.getElementById("addbtn");

function notesObject(Title, Note) {
  this.Title = Title;
  this.Note = Note;
}
addbtn.addEventListener("click", function() {
  let addTitle = document.getElementById("title");
  let addTxt = document.getElementById("addtxt");
  let n1 = new notesObject(addTitle.value, addtxt.value);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(n1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = " ";
  addTxt.value = " ";
  showNotes();
})

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = " ";
  notesObj.forEach(function(element, index) {
    html += `<div class="note-card card my-3 mx-2" style="width: 18rem;">
     <div class="card-body">
           <h5 class="card-title">${element.Title}</h5>
           <p class="card-text my-4"> ${element.Note}</p>
           <button id = ${index} onclick="deleteNotes(this.id)" class="delete btn btn-warning text-white">Delete Note</button>
            <span class =  "mx-3 fav"></span>
         </div>
       </div>`
  });
  let notesContainer = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesContainer.innerHTML = html;
  } else {
    notesContainer.innerHTML = "Nothing to show!!"
  }
}

function deleteNotes(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("search_input");
search.addEventListener("input", function() {
  let inpValue = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("note-card");
  Array.from(noteCards).forEach(function(element) {
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    cardTxt = cardTxt.toLowerCase();
    cardTitle = cardTitle.toLowerCase();
    if (cardTxt.includes(inpValue) || cardTitle.includes(inpValue)) {
      element.style.display = "inline-block";
    } else {
      element.style.display = "none";
    }
  });
});
