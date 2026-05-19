const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const statusInput = document.getElementById("status");
const noteInput = document.getElementById("note");

const toReadList = document.getElementById("to-read-list");
const readingList = document.getElementById("reading-list");
const readList = document.getElementById("read-list");
const coverInput = document.getElementById("cover");
const searchInput = document.getElementById("search-input");
const totalBooks = document.getElementById("total-books");
const readingBooks = document.getElementById("reading-books");
const readBooks = document.getElementById("read-books");
const themeToggle = document.getElementById("theme-toggle");


let books = JSON.parse(localStorage.getItem("books")) || [];

displayBooks();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newBook = {
    id: Date.now(),
    title: titleInput.value,
    author: authorInput.value,
    note: noteInput.value,
    cover: coverInput.value,
    status: statusInput.value,
  };

  books.push(newBook);

  saveBooks();

  form.reset();

  displayBooks();
});

function displayBooks() {
  toReadList.innerHTML = "";
  readingList.innerHTML = "";
  readList.innerHTML = "";
  totalBooks.textContent = `📚 ${books.length} livres`;

const readingCount = books.filter(
  (book) => book.status === "reading"
).length;

const readCount = books.filter(
  (book) => book.status === "read"
).length;

readingBooks.textContent = `📖 ${readingCount} en cours`;
readBooks.textContent = `✅ ${readCount} lus`;

 const searchValue = searchInput.value.toLowerCase();

books
  .filter(function (book) {
    return (
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue)
    );
  })
  .forEach(function (book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

bookCard.innerHTML = `
  ${
    book.cover
      ? `<img src="${book.cover}" alt="${book.title}" class="book-cover">`
      : ""
  }

  <h3>${book.title}</h3>

  <p>${book.author}</p>

  ${book.note ? `<p class="note">"${book.note}"</p>` : ""}

  <button class="modify-btn" onclick="editBook(${book.id})">
  Modifier
</button>

  <button class="edit-btn" onclick="changeStatus(${book.id})">
  Changer de statut
</button>

  <button class="delete-btn" onclick="deleteBook(${book.id})">
    Supprimer
  </button>
`;

    if (book.status === "to-read") {
      toReadList.appendChild(bookCard);
    } else if (book.status === "reading") {
      readingList.appendChild(bookCard);
    } else if (book.status === "read") {
      readList.appendChild(bookCard);
    }
  });
}

function deleteBook(id) {
  books = books.filter(function (book) {
    return book.id !== id;
  });

  saveBooks();

  displayBooks();
}

function changeStatus(id) {
  books = books.map(function (book) {
    if (book.id === id) {
      if (book.status === "to-read") {
        book.status = "reading";
      } else if (book.status === "reading") {
        book.status = "read";
      } else {
        book.status = "to-read";
      }
    }

    return book;
  });

  saveBooks();
  displayBooks();
}

function editBook(id) {
  const book = books.find(function (book) {
    return book.id === id;
  });

  const newTitle = prompt("Modifier le titre :", book.title);
  const newAuthor = prompt("Modifier l'auteur :", book.author);
  const newNote = prompt("Modifier la note :", book.note);
  const newCover = prompt("Modifier la couverture :", book.cover);

  if (newTitle !== null) {
    book.title = newTitle;
  }

  if (newAuthor !== null) {
    book.author = newAuthor;
  }

  if (newNote !== null) {
    book.note = newNote;
  }

  if (newCover !== null) {
    book.cover = newCover;
  }

  saveBooks();
  displayBooks();
}

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}
searchInput.addEventListener("input", function () {
  displayBooks();
});

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Mode clair";
  } else {
    themeToggle.textContent = "🌙 Mode sombre";
  }
});