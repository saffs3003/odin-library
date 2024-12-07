const dialog = document.querySelector(".dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = dialog.querySelector("button");
const RemoveDialog=document.querySelector(".removeDialog");
const CloseRemoveDialog=RemoveDialog.querySelector("button");
// Show the dialog
showButton.addEventListener("click", () => {
  dialog.showModal();
  form.reset();
});

// Close the dialog
closeButton.addEventListener("click", (event) => {
  dialog.close();
  editingBookIndex = null;
 
});

// Get references to input elements
const book = document.querySelector("#book");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readBooks = document.querySelector("#read_books");

// Get reference to the form
const form = document.querySelector("#book-form");
const booksContainer = document.querySelector(".Books");


let Library=[
    { 
        bookName: "The Hobbit", 
        bookAuthor: "J.R.R. Tolkien", 
        totalPages: 310, 
        isRead: false
      },
      { 
        bookName: "1984", 
        bookAuthor: "George Orwell", 
        totalPages: 328, 
        isRead: false 
      },
   
];


form.addEventListener("submit",(event)=>{
    event.preventDefault();
 
    AddBooks();
    
   
});

function AddBooks() {
 
    let bookName = book.value;
    let bookAuthor = author.value;
    let totalPages = pages.value;
    let isRead = readBooks.checked;

    const newBook = { bookName, bookAuthor, totalPages, isRead };

    if (editingBookIndex !== null) {
        // Update the existing book in the Library array
        Library[editingBookIndex] = newBook;

        // Safely update the corresponding DOM element
        const bookElements = booksContainer.querySelectorAll(".info");
        if (bookElements[editingBookIndex]) {
            const bookElement = bookElements[editingBookIndex];
            bookElement.querySelector(".name").textContent = bookName;
            bookElement.querySelector(".author").textContent = bookAuthor;
            bookElement.querySelector(".pages").textContent = totalPages;
   
            bookElement.querySelector(".read-status").textContent = isRead ? "Yes" : "No";
        } else {
            console.error("Could not find corresponding book element in the DOM.");
        }

        editingBookIndex = null; // Reset after editing
    } else {
        // Add a new book
        Library.push(newBook);
        renderBook(newBook);
    }

    dialog.close();
}


function displayLibrary() {
    Library.forEach(book => renderBook(book));
    
}
function renderBook(book){
    let bookElement=document.createElement('div');
    bookElement.classList.add("info");

    bookElement.innerHTML = `
    <div class="ribbon tangerine-bold"></div>
    <p class="tangerine-bold" >Name: <span class="name tangerine-bold">${book.bookName}</span></p>
    <p class="tangerine-bold">Author: <span class="author tangerine-bold">${book.bookAuthor}</span></p>
    <p class="tangerine-bold">No. of pages: <span class="pages tangerine-bold">${book.totalPages}</span></p>

    <p class="tangerine-bold">Completed: <span class="read-status tangerine-bold">${book.isRead ? "Yes" : "No"}</span></p>
    <div class="button-group">
    <button class="read ">
  <i class="${book.isRead ? 'fi fi-ss-check-double' : 'fi fi-ss-pending'} read"></i>
 
</button>

    
    <button class="edit "><i
class=
"fi fi-ss-pencil edit " 
></i></button>
    <button class="remove "><i class="fi fi-ss-trash remove"></i></button>
    </div>
  `;
  booksContainer.appendChild(bookElement);
  

}


let editingBookIndex=null;

function Edit(bookElement) {
    const bookName = bookElement.querySelector(".name").textContent;
    editingBookIndex = Library.findIndex(book => book.bookName === bookName);



    if (editingBookIndex === -1) {
        console.error("Could not find the book in the Library array.");
        return;
    }

    // Populate the form fields
    const authorName = bookElement.querySelector(".author").textContent;
    const totalPages = bookElement.querySelector(".pages").textContent;
   
    const readStatus = bookElement.querySelector(".read-status").textContent;

    book.value = bookName;
    author.value = authorName;
    pages.value = totalPages;
    readBooks.checked = readStatus === "Yes";

    dialog.showModal();
}


   

function Remove(bookElement){
   
let name=bookElement.querySelector(".name").textContent;
  
    RemoveDialog.querySelector("#RemoveBookInfo").innerText=name
    RemoveDialog.showModal();
    const confirmRemove = RemoveDialog.querySelector(".ButtonGroup");


    confirmRemove.addEventListener("click",(event)=>{
       if(event.target.id=="yes"){
        booksContainer.removeChild(bookElement);
       }
       if(event.target.id=="yes"|| event.target.id=="no")
       RemoveDialog.close();
    })

    CloseRemoveDialog.addEventListener("click",()=>{
        RemoveDialog.close();
    })
        
    }
   


function ToggleRead(bookElement) {
    const icon=bookElement.querySelector("i")
            
            const readStatus = bookElement.querySelector(".read-status");
        
  

            
        const ribbon=bookElement.querySelector(".ribbon")

            if (readStatus.textContent === "Yes") {
                readStatus.textContent = "No"; // Not read
              
     
                icon.className = "fi fi-ss-pending";
                
                ribbon.style.setProperty("background-color", " maroon", "important");
                book.isRead = false;
                
                
            } else {
                readStatus.textContent = "Yes"; // Read
                icon.className = "fi fi-ss-check-double";
                

                ribbon.style.setProperty("background-color", "green", "important");
                book.isRead = true;
              

            } 
        }






document.addEventListener("DOMContentLoaded",()=>{ 
   
    displayLibrary()} );
    booksContainer.addEventListener("click",(event)=>{

let bookElement=event.target.closest(".info");
if(event.target.classList.contains("edit")){
Edit(bookElement)
}
else if(event.target.classList.contains("read")){
    ToggleRead(bookElement)

}
else if(event.target.classList.contains("remove")){
Remove(bookElement);
    }
});
