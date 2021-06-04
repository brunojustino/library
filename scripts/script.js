// bookTitle / bookAuthor / bookPages / bookRate / bookImg / bookAbout /bookRead / submitBtn
let form = document.getElementById("bookForm")
let title = document.getElementById("bookTitle")
let author = document.getElementById("bookAuthor")
let pages = document.getElementById("bookPages")
let rate = document.getElementById("bookRate")
let about = document.getElementById("bookAbout")
let cards = document.querySelector(".cards")
let inputs = document.querySelectorAll("input")
const button = document.getElementById("submitBtn")
let books = []
let id = 0

// Array.from(inputs).forEach( (i) => {
//     i.addEventListener("input", (e) => console.log("e:" + e))
// })

populateBooks()

function validateInput(field){
    if (field.value.trim() === "") {
        this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error")
      } else {
        this.setStatus(field, null, "success")
      }
}


function formSend(){
    addBook()
    addCard(books[books.length-1])
    clearForm()
}

function populateBooks(){
    for(let i=0; i < localStorage.length; i++){
        if(!JSON.parse(localStorage.getItem(i)).deleted){
            books.push(JSON.parse(localStorage.getItem(i)))
            addCard(JSON.parse(localStorage.getItem(i)))
        }    
    }
    id = localStorage.length == 0 ? 0 : localStorage.length-1
}

function addBook(){
    let b = new Book(books.length, title.value, author.value, pages.value, 
        rate.value, about.value)
// let b = new Book(id, title.value, author.value, pages.value, 
//     rate.value, about.value)
    localStorage.setItem(id.toString(), JSON.stringify(b))
    books.push(b)
    id = books.length
}

function clearForm(){
    form.reset()
}

function addCard(book){
    let cardsItem = document.createElement("li")
    cardsItem.className = "cards__item"
    cardsItem.setAttribute("data-id", book.id)
    cards.appendChild(cardsItem)

    let card = document.createElement("div")
    card.className = "card"
    cardsItem.appendChild(card)

    let cardContent =  document.createElement("div")
    cardContent.className = "card__content"
    card.appendChild(cardContent)
    
    let cardTitle = document.createElement("div")
    cardTitle.className = "card__title"
    cardTitle.setAttribute("id", "titleDisplay")
    cardTitle.textContent = book.title
    cardContent.appendChild(cardTitle)

    let pAuthor = document.createElement("p")
    pAuthor.className = "card__text"
    pAuthor.setAttribute("id", "authorDisplay" )
    pAuthor.textContent = book.author
    cardContent.appendChild(pAuthor)
    
    let pPages = document.createElement("p")
    pPages.className = "card__text"
    pPages.setAttribute("id", "pagesDisplay" )
    pPages.textContent = "Pages: " + book.pages
    cardContent.appendChild(pPages)

    let pRate = document.createElement("p")
    pRate.className = "card__text"
    pRate.setAttribute("id", "rateDisplay" )
    pRate.textContent = "Rating: " + book.rate
    cardContent.appendChild(pRate)

    let pAbout = document.createElement("p")
    pAbout.className = "card__text"
    pAbout.setAttribute("id", "aboutDisplay" )
    pAbout.textContent = "About: " + book.about
    cardContent.appendChild(pAbout)

    let bottom = document.createElement("div")
    bottom.className = "bottom"
    cardContent.appendChild(bottom)

    let checkDiv = document.createElement("div")
    checkDiv.className = "checkDiv"
    bottom.appendChild(checkDiv)

    let pCompleted = document.createElement("p")
    pCompleted.textContent = "Completed?"
    checkDiv.appendChild(pCompleted)

    let lSwitch = document.createElement("label")
    lSwitch.className = "switch"
    checkDiv.appendChild(lSwitch)

    let inputCheckBox = document.createElement("input")
    inputCheckBox.setAttribute("type", "checkbox")
    if(book.read) inputCheckBox.checked = true;
    lSwitch.appendChild(inputCheckBox)
    
    inputCheckBox.addEventListener("click", () => {
        console.log("clicked")
        isRead(book.id)
        console.log(book)
    })

    let sSlider = document.createElement("span")
    sSlider.className = "slider round"
    lSwitch.appendChild(sSlider)

    let btnRemove = document.createElement("button")
    btnRemove.className = "btn btn--block card__btn"
    btnRemove.textContent = "X"
    checkDiv.appendChild(btnRemove)

    btnRemove.addEventListener("click", () => {
        deleteBook(book.id)
        deleteCard(book.id, cardsItem)
    })

}

function clearAll(){
    localStorage.clear()
    location.reload(); 
}

function deleteCard(id, card){
    document.querySelector(`[data-id="${id}"]`)
    cards.removeChild(card)
}

function deleteBook(id){
    books[id].deleted = true
    localStorage.setItem(id.toString(), JSON.stringify(books[id]))
}

function isRead(id){
    books[id].read = !books[id].read
    localStorage.setItem(id.toString(), JSON.stringify(books[id]))
}

function Book(id, title, author, pages, rate, about){
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.rate = rate
    this.about = about
    this.read = false
    this.deleted = false
}