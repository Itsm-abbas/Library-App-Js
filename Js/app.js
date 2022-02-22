// Selectors ****
let Bookname = document.getElementById("bookname");
let authorname = document.getElementById("author");
let submit = document.getElementById("submitbtn");
let Libraryform = document.getElementById("Libraryform");
let warningalert = document.getElementById("warning");
let successalert = document.getElementById("success");
let cooking = document.getElementById("cooking");
let programming = document.getElementById("programming");
let novel = document.getElementById("novel");
let bookstable = document.getElementById("bookscontainer");
let searchinput = document.getElementById('search');
bookstable.style.backgroundColor = "grey";
localstore();
// Add Event Listener ****
searchinput.addEventListener('input' ,filterbooks);
Libraryform.addEventListener("submit", addbook);
submit.addEventListener("click", changeColor);
// Functions ****

// Change color of table and button randomly...
function changeColor() {
  let color = ["rgb(163, 55, 66)",'rgb(110, 89, 54)', "rgb(15, 99, 6)", "rgb(66, 76, 168)", "grey"];
  let random = color[Math.floor(Math.random() * color.length)];
  submit.style.backgroundColor = random;
  submit.style.borderColor = random;
  bookstable.style.backgroundColor = random;
  successalert.style.backgroundColor = random;
  warningalert.style.backgroundColor = random;
}
// Add book to the table...
function addbook() {
  let bookname = Bookname.value;
  let author = authorname.value;
  let type;
  if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  if (novel.checked) {
    type = novel.value;
  }

  //Storing to Local Storage...
  let authors = localStorage.getItem("authorname");
  let books = localStorage.getItem("bookname");
  let types = localStorage.getItem("typename");
  if (books == null || authors == null || types == null) {
    bookobj = [];
    authorobj = [];
    typeobj = [];
  } else {
    bookobj = JSON.parse(books);
    authorobj = JSON.parse(authors);
    typeobj = JSON.parse(types);
  }
  bookobj.push(bookname);
  authorobj.push(author);
  typeobj.push(type);
  if (
    bookname != "" &&
    author != "" &&
    bookname.length > 2 &&
    author.length > 2
  ) {
    localStorage.setItem("bookname", JSON.stringify(bookobj));
    localStorage.setItem("authorname", JSON.stringify(authorobj));
    localStorage.setItem("typename", JSON.stringify(typeobj));
  }

  let tablebody = document.getElementById("tablebody");
  let UIstr = `
        <tr id='tablerow'>
            <td id='bookfiltring'>${bookname}</td>
            <td>${author}</td>
            <td>${type}</td>
            <td>
              <button class="btn btn-sm btn-danger" id="deletebtn" onclick ="deletebook()">
              Delete 
              </button> 
            </td>
        </tr>
    `;
  if (
    bookname != "" &&
    author != "" &&
    bookname.length > 2 &&
    author.length > 2
  ) {
    tablebody.innerHTML += UIstr;
    successalert.classList.add("show-success");
    setTimeout(() => {
      successalert.classList.remove("show-success");
    }, 3000);
    warningalert.classList.remove("show-warning");
    Bookname.classList.remove("error");
    authorname.classList.remove("error");
    resetinput();
  } else {
    warningalert.classList.add("show-warning");
    setTimeout(() => {
      warningalert.classList.remove("show-warning");
    }, 5000);
    successalert.classList.remove("show-success");
    Bookname.classList.add("error");
    authorname.classList.add("error");
  }
}
// LocalStorage
function localstore() {
  let type;
  if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  if (novel.checked) {
    type = novel.value;
  }

  let authors = localStorage.getItem("authorname");
  let books = localStorage.getItem("bookname");
  let types = localStorage.getItem("typename");

  if (books == null || authors == null) {
    bookobj = [];
    authorobj = [];
    typeobj = [];
  } else {
    bookobj = JSON.parse(books);
    authorobj = JSON.parse(authors);
    typeobj = JSON.parse(types);
  }
  bookobj.forEach((element, index) => {
    let tablebody = document.getElementById("tablebody");
    let UIstr = `
        <tr id='tablerow'>
            <td>${element}</td>
            <td>${authorobj[index]}</td>
            <td>${typeobj[index]}</td>
            <td>
              <button class="btn btn-sm btn-danger" onclick ="deletebook(this.id)">
              Delete 
              </button> 
            </td>
        </tr>
    `;
    tablebody.innerHTML += UIstr;
  });
}
// Resetting input values when form is submitted...
function resetinput() {
  Bookname.value = "";
  authorname.value = "";
}
// Function for deleting an item...
function deletebook(index) {
  //Deleting item from Local storage....
  let authors = localStorage.getItem("authorname");
  let books = localStorage.getItem("bookname");
  let types = localStorage.getItem("typename");

  if (books == null || authors == null) {
    bookobj = [];
    authorobj = [];
    typeobj = [];
  } else {
    bookobj = JSON.parse(books);
    authorobj = JSON.parse(authors);
    typeobj = JSON.parse(types);
  }
  bookobj.splice(index, 1);
  authorobj.splice(index, 1);
  typeobj.splice(index, 1);
  localStorage.setItem("bookname", JSON.stringify(bookobj));
  localStorage.setItem("authorname", JSON.stringify(authorobj));
  localStorage.setItem("typename", JSON.stringify(typeobj));

  // Deleting item from dom
  let deletemsg = document.querySelector(".deletemsg");
  let tablebody = document.getElementById("tablebody");
  let tablerow = document.getElementById("tablerow");
  tablebody.removeChild(tablerow);
  let deletetext = `
  <div class="container h-50">
      <div id="delete">
        <div class="alert alert-danger d-flex align-items-center p-0" role="alert ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
          <div>
            &nbsp Book have been deleted!
          </div>
        </div>
      </div>
  </div>
  `;
  deletemsg.innerHTML = deletetext;
  setTimeout(() => {
    deletemsg.innerHTML = "";
  }, 4000);
};

function filterbooks() {
  let searchinput = document.getElementById('search');
  let value = searchinput.value.toLowerCase();
  let tb = document.getElementById('tablebody');
  let tr = tb.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td')[0].innerText.toLowerCase();
    if (td.includes(value)) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
}
