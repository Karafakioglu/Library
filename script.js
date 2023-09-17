const myLibrary = [];
const libraryElement = document.querySelector(".library");
const addNewBookModalBtn = document.getElementById("addNewBookModalBtn");
const addNewBookDialog = document.getElementById("addNewBookDialog");
const addNewBookBtn = document.getElementById("addNewBookBtn");
const inputs = document.querySelectorAll(".input");


//Book constructor
function Book(id, title, author, pagesRead, isRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pagesRead = pagesRead;
    this.isRead = isRead;
}

//Creating temp data
let book1 = new Book(1 ,"First Book", "Some Author", "112", "Not read");
let book2 = new Book(2, "Second Book", "Another Author", "0", "Not read");

myLibrary.push(book1,book2);

function renderBook(book) {
    const bookElem = `
    <div class="book" data-id="${book.id}">
        <ol>
            <li>${book.title}</li>
            <li>${book.author}</li>
            <li>${book.pagesRead}</li>
            <li>${book.isRead}</li>
        </ol>
    </div>`;
    libraryElement.insertAdjacentHTML('beforeend', bookElem);
}


//Creating dynamic list of the books
myLibrary.forEach(book => {
    renderBook(book);
});


function addBook(book){
    myLibrary.push(book);
    renderBook(book);  // Render the new book after adding
}


//Opens the modal window
addNewBookModalBtn.addEventListener("click", () =>{
    addNewBookDialog.showModal();
})

//handles the addnewbook or close button in modal
addNewBookBtn.addEventListener("click", (e) => {
    let tempObject = {};
    e.preventDefault();
    addNewBookDialog.close();

    inputs.forEach(input => {
        tempObject[input.id] = input.value
    });
    addBook(tempObject);
})
