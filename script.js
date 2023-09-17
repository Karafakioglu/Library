const myLibrary = [];
const libraryElement = document.querySelector(".library");
const addNewBookModalBtn = document.getElementById("addNewBookModalBtn");
const addNewBookDialog = document.getElementById("addNewBookDialog");
const addNewBookBtn = document.getElementById("addNewBookBtn");
const inputs = document.querySelectorAll(".input");
const deleteBookBtn = document.querySelector("#deleteBookBtn");


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
        <button id= "deleteBookBtn">Delete Book</button>
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
    let lastId = myLibrary[myLibrary.length -1].id;
    let tempObject = {
        id: lastId + 1
    };
    e.preventDefault();
    addNewBookDialog.close();

    inputs.forEach(input => {
        tempObject[input.id] = input.value
    });
    addBook(tempObject);
    console.log(lastId);
})

//Removes the book
libraryElement.addEventListener("click", (e) =>{
    if(e.target.id == "deleteBookBtn"){
        let bookId = e.target.parentNode.dataset.id;
        console.log(bookId)
        e.target.parentNode.remove();
    }
})