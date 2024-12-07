const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = dialog.querySelector("button");

// Show the dialog
showButton.addEventListener("click", () => {
  dialog.showModal();
  form.reset();
});

// Close the dialog
closeButton.addEventListener("click", (event) => {
  dialog.close();
 
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


let Library=[
    { 
        bookName: "The Hobbit", 
        bookAuthor: "J.R.R. Tolkien", 
        totalPages: 310, 
        readPagesValue: 310, 
        isRead: false
      },
      { 
        bookName: "1984", 
        bookAuthor: "George Orwell", 
        totalPages: 328, 
        readPagesValue: 200, 
        isRead: false 
      },
   
];


form.addEventListener("submit",(event)=>{
    event.preventDefault();
 
    AddBooks();
    
   
});

function AddBooks(){
  console.log("AddBooks called");
    let bookName=book.value;
    let bookAuthor=author.value;
    let totalPages=pages.value;
    let readPagesValue =readPages.value;
    let isRead = readBooks.checked;
const newBook={bookName,
    bookAuthor,totalPages,readPagesValue,isRead
}
Library.push(newBook);
console.log("LIB");
    renderBook(newBook);
    console.log("Render");

console.log("book");
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
    <p class="tangerine-bold">Pages Read: <span class="read-pages tangerine-bold">${book.readPagesValue}</span></p>
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




function Edit(bookElement){


    
      
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


function Remove(bookElement){
    console.log("remove")
        booksContainer.removeChild(bookElement);
    }
   


function ToggleRead(bookElement) {
    
            
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
