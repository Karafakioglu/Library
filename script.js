const myLibrary = [];
const libraryElement = document.querySelector(".library");
const addNewBookModalBtn = document.getElementById("addNewBookModalBtn");
const addNewBookDialog = document.getElementById("addNewBookDialog");
const addNewBookBtn = document.getElementById("addNewBookBtn");
const inputs = document.querySelectorAll(".input");
const deleteBookBtn = document.querySelector(".deleteBookBtn");
const addBookForm = document.getElementById("addBookForm");
const closeNewBookBtn = document.getElementById("closeNewBookBtn");

class Book{
    constructor(id,title,author,pagesRead, isRead){
        this.id = id;
        this.title = title;
        this.author = author;
        this.pagesRead = pagesRead;
        this.isRead = isRead;
    }

    toggleReadStatus(){
        this.isRead = (this.isRead === "Read") ? "Not Read" : "Read";
    }
}


//Creating temp data
let book1 = new Book(1 ,"Test Book", "Test Author", "111", "Not Read");
let book2 = new Book(2 ,"Test Book", "Test Author", "111", "Not Read");

myLibrary.push(book1,book2);

function renderBook(book) {
    const bookElem = `
    <div class="book" data-id="${book.id}">
        <ol>
            <li>${book.title}</li>
            <li>${book.author}</li>
            <li>${book.pagesRead}</li>
            <li class="read-status">${book.isRead}</li>
        </ol>
        <button class = "deleteBookBtn">Delete Book</button>
        <button class = "changeReadStateBtn">Change Read Status</button>
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

//Updates only a specific book html
function updateBookDisplay(book){
    const bookElem = document.querySelector(`.book[data-id="${book.id}"]`);

    bookElem.querySelector(".read-status").textContent = book.isRead;
}


//Opens the modal window
addNewBookModalBtn.addEventListener("click", () =>{
    addNewBookDialog.showModal();
})

//handles the addnewbook or close button in modal
addNewBookBtn.addEventListener("click", (e) => {
    let lastId;
    let tempObject = {};
    if(myLibrary.length >0 ){ //if library is not empty 
        lastId = myLibrary[myLibrary.length -1].id + 1; //last id is the last id plus one (for the next books id)
        tempObject.id = lastId;
    }else{
        tempObject.id = 1; //if library empty, set the first id to 1
    }

    e.preventDefault();
    addNewBookDialog.close();

    inputs.forEach(input => {
        tempObject[input.id] = input.value
    });
    addBook(tempObject);

    addBookForm.reset(); //reset the form inputs
})

//reset the form inputs
closeNewBookBtn.addEventListener("click", () =>{
    addBookForm.reset();
})





//Removes the book
libraryElement.addEventListener("click", (e) =>{
    if(e.target.className == "deleteBookBtn"){
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
    if(e.target.className == "changeReadStateBtn") {
        let bookId = +e.target.parentNode.dataset.id;  // Using + to convert string to number
        let book = myLibrary.find(b => b.id === bookId);
        
        if (book) {
            book.toggleReadStatus();
        }

        updateBookDisplay(book);
    }
});
