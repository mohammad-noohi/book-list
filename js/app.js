const $ = document;

const titleInput = $.querySelector("#book-title");
const authorInput = $.querySelector("#author-book");
const yearInput = $.querySelector("#year-book");
const addBookBtn = $.querySelector(".add-book-btn");
const booksTableBody = $.querySelector(".books-table-body");
const table = $.querySelector(".books-data");

let books_db = [];

window.addEventListener("load", (e) => {
  let books_db = JSON.parse(localStorage.getItem("books"));
  books_db.forEach(function (book) {
    creatBook(book);
  });
});

yearInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    addBook();
  }
});

addBookBtn.addEventListener("click", (e) => {
  addBook();
});

function addBook() {
  /* get data */
  let titleValue = titleInput.value;
  let authorValue = authorInput.value;
  let yearValue = yearInput.value;

  /* be sure user fill all fields */
  if(!isNaN(yearValue)){
    if (titleValue.trim() && authorValue.trim() && yearValue.trim()) {
      /* book data */
      let book = {
        title: titleValue,
        author: authorValue,
        year: yearValue,
      };
  
      /* save data in localStorage */
      books_db.push(book);
      localStorage.setItem("books", JSON.stringify(books_db));
  
      /* clear all inputs */
      clearFomr();
      creatBook(book);
      /* focus on title input after add a book to list */
      titleInput.focus();
    }else{
      window.alert('please fill all fields')
    }
  }else{
    window.alert('please Enter a number for year of book')
  }

  
}

function creatBook(book) {
  let newRow = $.createElement("tr");

  let titleCell = $.createElement("td");
  titleCell.textContent = book.title;

  let authorCell = $.createElement("td");
  authorCell.textContent = book.author;

  let yearCell = $.createElement("td");
  yearCell.textContent = book.year;

  let deletBtn = $.createElement("div");
  deletBtn.className = "delete-btn";
  deletBtn.textContent = "Delete";

  newRow.append(titleCell, authorCell, yearCell, deletBtn);
  booksTableBody.append(newRow);
}

function clearFomr() {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
}

table.addEventListener("click", (e) => {
  let books_db = JSON.parse(localStorage.getItem("books"));

  if (e.target.className === "delete-btn") {
    e.target.parentElement.remove();

    let bookTitle = e.target.parentElement.firstElementChild.textContent;
    removedBookIndex = books_db.findIndex(function (book) {
      return book.title === bookTitle;
    });
    books_db.splice(removedBookIndex, 1);
    localStorage.setItem("books", JSON.stringify(books_db));
  }
});
