// bookTitle / bookAuthor / bookPages / bookRate / bookImg / bookAbout /bookRead / submitBtn
let form = document.getElementById("bookForm")
let title = document.getElementById("bookTitle")
let author = document.getElementById("bookAuthor")
let pages = document.getElementById("bookPages")
let rate = document.getElementById("bookRate")
let img = document.getElementById("bookImg")
let about = document.getElementById("bookAbout")
let read = document.getElementById("bookRead")
const button = document.getElementById("submitBtn")
let books = []
let id = 0

function formValidation(){
    console.log("validating...")
    addBook()
    clearForm()
}

function addBook(){
    books.push(new Book(id, title.value, author.value, pages.value, 
        rate.value, img.value, about.value, read.checked))
    id++
    console.log(books)
}

function clearForm(){
    form.reset()
}

function addCard(){

}

function Book(id, title, author, pages, rate, img, about, read){
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.rate = rate
    this.img = img
    this.about = about
    this.read = read
}