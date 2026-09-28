let nextId = getNextId();

function getNextId() {
  return books.length ? Math.max(...books.map(book => book.id)) + 1 : 1;
}

function renderBooks() {
  const table = document.getElementById("bookTable");
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const filter = document.getElementById("statusFilter").value;

  const filtered = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);
    const matchesStatus = filter === "all" || book.status === filter;
    return matchesSearch && matchesStatus;
  });

  table.innerHTML = "";
  document.getElementById("emptyMessage").style.display =
    filtered.length ? "none" : "block";

  filtered.forEach(book => {
    const row = document.createElement("tr");
    const statusText = book.status === "available" ? "Có sẵn" : "Đang mượn";
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${escapeHtml(book.title)}</td>
      <td>${escapeHtml(book.author)}</td>
      <td><span class="badge ${book.status}">${statusText}</span></td>
      <td>
        <div class="actions">
          <button class="status" onclick="toggleStatus(${book.id})">Mượn/Trả</button>
          <button class="delete" onclick="deleteBook(${book.id})">Xóa</button>
        </div>
      </td>`;
    table.appendChild(row);
  });

  document.getElementById("bookCount").textContent =
    `${books.length} cuốn sách`;
}

function addBook() {
  const title = document.getElementById("titleInput").value.trim();
  const author = document.getElementById("authorInput").value.trim();

  if (!title || !author) {
    alert("Vui lòng nhập tên sách và tác giả.");
    return;
  }

  books.push({ id: nextId++, title, author, status: "available" });
  saveBooks();
  document.getElementById("titleInput").value = "";
  document.getElementById("authorInput").value = "";
  renderBooks();
}

function deleteBook(id) {
  books = books.filter(book => book.id !== id);
  saveBooks();
  renderBooks();
}

function toggleStatus(id) {
  const book = books.find(book => book.id === id);
  if (!book) return;
  book.status = book.status === "available" ? "borrowed" : "available";
  saveBooks();
  renderBooks();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[char]));
}

document.getElementById("addBtn").addEventListener("click", addBook);
document.getElementById("searchInput").addEventListener("input", renderBooks);
document.getElementById("statusFilter").addEventListener("change", renderBooks);

renderBooks();
