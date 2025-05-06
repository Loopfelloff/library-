const dialog = document.querySelector('.dialog');
const submitButton = document.querySelector('.submit-button');
const addBook = document.querySelector('.add-book');
const books = document.querySelector('.books');
const authorName = document.querySelector('.author-name');
const bookNameValue = document.querySelector('.book-name-value');
const myLibrary = [];
function Book(bookName , id , bookAuthor){
    // constructor for book objects
    this.name = bookName;
    this.id = id;
    this.bookAuthor = bookAuthor;
    this.readOrNot = false;
}
function addBookToLibrary(bookName , bookAuthor){
    // take params , create a book then store it in the array
    const book = new Book(bookName , crypto.randomUUID() , bookAuthor);
    myLibrary.push(book);
}
function showBooks(){
    let htmlVal = '';
    myLibrary.forEach(element => {
        // readOrNot = (!readOrNot) ? ''
        htmlVal += `
         <div class="book-card">
            <div class="book-name">${element.name}</div>
            <div class="book-author">${element.bookAuthor}</div>
            <div class="read-or-not">${(!element.readOrNot) ? 'Not Read ' : 'Read'}<button data-id='${element.id}' class="change-status">Change</button><button class="remove-btn" data-id='${element.id}'>Remove</button></div>
        </div>
        
        `;
    });
    books.innerHTML = htmlVal;
    const remove = document.querySelectorAll('.remove-btn');
    remove.forEach(btn =>{
        btn.addEventListener('click' , function(){
            const dataset = this.dataset;
            removeItem(dataset.id);
        });
    });
    const readOrNot = document.querySelectorAll('.change-status');
    readOrNot.forEach(btn =>{
        btn.addEventListener('click' , function(){
            const dataset = this.dataset;
            console.log(dataset);
            updateItem(dataset.id);
        });
    })
}
function returnIndex(id)
{
    let idx;
    myLibrary.forEach((item , index)=>{
        if(item.id === id) idx = index;
    });
    return idx;
}
function updateItem(id)
{
    let idx = returnIndex(id);
    // console.log(id);
    // console.log(myLibrary);
    if(myLibrary[idx].readOrNot) myLibrary[idx].readOrNot = false;
    else myLibrary[idx].readOrNot = true;
    showBooks();
}
function removeItem(id)
{
    let idx =  returnIndex(id);
    myLibrary.splice(idx, 1);
    showBooks();
}
submitButton.addEventListener('click' , function(event){
event.preventDefault();
let author = authorName.value;
let book = bookNameValue.value;
addBookToLibrary(book , author);
showBooks();
}); 
addBook.addEventListener('click' , function(){
    dialog.showModal();
});