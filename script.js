const myLibrary = [];
const libraryElement = document.querySelector(".library");

//Book constructor
function Book(title, author, pagesRead, isRead){
    this.title = title;
    this.author = author;
    this.pagesRead = pagesRead;
    this.isRead = isRead;
}

//Creating temp data
let book1 = new Book("First Book", "Some Author", "112", "Not read");
let book2 = new Book("Second Book", "Another Author", "0", "Not read");

myLibrary.push(book1,book2);

//Creating dynamic list of the books
myLibrary.forEach(book => {
    const bookElem = `
    <div class="book">
        <ol>
            <li>${book.title}</li>
            <li>${book.author}</li>
            <li>${book.pagesRead}</li>
            <li>${book.isRead}</li>
        </ol>
    </div>`;
    console.log(bookElem)
    libraryElement.insertAdjacentHTML('beforeend', bookElem)
});

function addBook(){

}