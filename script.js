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
//Checks the read status and changes the status to the opposite
Book.prototype.toggleReadStatus = function() {
    this.isRead = (this.isRead === "Read") ? "Not Read" : "Read";
};

//Creating temp data
let book1 = new Book(1 ,"Test Book", "Test Author", "111", "Not Read");
let book2 = new Book(1 ,"Test Book", "Test Author", "111", "Not Read");

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
        <button id = "deleteBookBtn">Delete Book</button>
        <button id = "changeReadStateBtn">Change Read Status</button>
    </div>`;
    libraryElement.insertAdjacentHTML('beforeend', bookElem);
}


//Creating dynamic list of the books
myLibrary.forEach(book => {
    renderBook(book);
});


function addBook(book){
    myLibrary.push(new Book(book.id, book.title, book.author, book.pagesRead, book.isRead));
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
        const index = myLibrary.findIndex(element => element.id == bookId);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
    }
})


libraryElement.addEventListener("click", (e) => {
    if(e.target.id == "changeReadStateBtn") {
        let bookId = +e.target.parentNode.dataset.id;  // Using + to convert string to number
        let book = myLibrary.find(b => b.id === bookId);
        
        if (book) {
            book.toggleReadStatus();
        }

        // Re-render the library or just update the specific book's display.
        libraryElement.innerHTML = "";
        myLibrary.forEach(renderBook);
    }
});
