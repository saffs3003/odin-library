const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = dialog.querySelector("button");

// Show the dialog
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// Close the dialog
closeButton.addEventListener("click", (event) => {
  dialog.close();
  console.log("close")
});

// Get references to input elements
const book = document.querySelector("#book");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readPages = document.querySelector("#read_pages");
const readBooks = document.querySelector("#read_books");

// Get reference to the form
const form = document.querySelector("#book-form");
const booksContainer = document.querySelector(".Books");


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    AddBooks();
    Edit();
    Remove();
    ToggleRead();
});

function AddBooks(){
    let bookName=book.value;
    let bookAuthor=author.value;
    let totalPages=pages.value;
    let readPagesValue =readPages.value;
    let isRead = readBooks.checked;

    let bookElement=document.createElement('div');
    bookElement.classList.add("info");

    bookElement.innerHTML = `
    <p>Name: <span class="name">${bookName}</span></p>
    <p>Author: <span class="author">${bookAuthor}</span></p>
    <p>No. of pages: <span class="pages">${totalPages}</span></p>
    <p>Pages Read: <span class="read-pages">${readPagesValue}</span></p>
    <p>Completed: <span class="read-status">${isRead ? "Yes" : "No"}</span></p>
    <button class="read">${isRead ? "Mark As Not Read" : "Mark As Read"}</button>
    <button class="edit">Edit</button>
    <button class="remove">Remove</button>
  `;
  booksContainer.appendChild(bookElement)
  dialog.close();
  form.reset();
    
}

function Edit(){
booksContainer.addEventListener("click",(event)=>{

    if (event.target.classList.contains("edit")){
        const bookElement = event.target.closest(".info");
        const bookName=bookElement.querySelector(".name");
        const authorName=bookElement.querySelector(".author");
        const totalPages=bookElement.querySelector(".pages");
        const readPages=bookElement.querySelector(".read-pages");
        const readStatus=bookElement.querySelector(".read-status");
       book.value=bookName.textContent;
    author.value=authorName.textContent;
     pages.value=totalPages.textContent;
       readPages.value=readPages.textContent;
       readBooks.checked=readStatus.textContent;
dialog.showModal();
    }
})

}

function Remove(){
    booksContainer.addEventListener("click",(event)=>{
        if (event.target.classList.contains("remove")){
        const bookElement=event.target.closest(".info");
        booksContainer.removeChild(bookElement)}
    })
}

function ToggleRead() {
    booksContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("read")) {
            const bookElement = event.target.closest(".info");
            const toggleRead = bookElement.querySelector(".read");
            const readStatus = bookElement.querySelector(".read-status");

            if (toggleRead.textContent === "Mark As Not Read") {
                toggleRead.textContent = "Mark As Read";
                readStatus.textContent = "No"; // Not read
            } else {
                toggleRead.textContent = "Mark As Not Read";
                readStatus.textContent = "Yes"; // Read
            }
        }
    });
}




