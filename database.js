// Mô phỏng lớp dữ liệu cho project demo GitHub.
const seedBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", status: "available" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", status: "borrowed" },
  { id: 3, title: "Java: The Complete Reference", author: "Herbert Schildt", status: "available" }
];

let books = JSON.parse(localStorage.getItem("libraryBooks")) || seedBooks;

function saveBooks() {
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}
