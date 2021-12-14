'use strict';

const books = JSON.parse(localStorage.getItem('books') || '[]');

// SELECTORS
const form = document.getElementById('form');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const category = document.getElementById('category');
const priority = document.getElementById('priority');
const tableBody = document.getElementById('table-body');
const clearListButton = document.getElementById('clear-list-btn');

// VALIDATION
const validateInputs = () => {

  if (bookTitle.value == '') {
    window.alert('Book title is required');
    return false;
  } else if(bookTitle.value.length < 1) {
    window.alert('Book title must be at least 1 character.');
    return false;
  }

  if (bookAuthor.value == '') {
    window.alert('Book author is required');
    return false;
  } else if(bookAuthor.value.length < 3) {
    window.alert('Book author must be at least 3 character.');
    return false;
  }

  if (priority.value == '') {
    window.alert('Priority is required');
    return false;
  } else if (typeof priority.value == Number) {
    window.alert('Priority must be a number.');
    return false;
  } else if (priority.value < 1) {
    window.alert('Priority can not be smaller then 1.');
    return false;
  } else if (priority.value > 5) {
    window.alert('Priority can not be bigger then 5.');
    return false;
  }
  return true;
};

// ADD BOOK
const addBook = () => {
  const uuid = Math.random().toString(36).slice(-6);

  const book = {
    id: uuid,
    bookTitle: bookTitle.value,
    bookAuthor: bookAuthor.value,
    category: category.value,
    priority: priority.value,
  };

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  bookTitle.value = '';
  bookAuthor.value = '';
  category.value = 'Sci-Fi';
  priority.value = 1;
};

// RENDER BOOKS
const renderBooks = () => {
  tableBody.innerHTML = '';

  books.forEach(item => {
    const tableRow = document.createElement('tr');
    tableBody.appendChild(tableRow);
    tableRow.innerHTML = `<td>${item.id}</td>
                          <td>${item.bookTitle}</td>
                          <td>${item.bookAuthor}</td>
                          <td>${item.category}</td>
                          <td>${item.priority}</td>`;
  });
};

// SUBMIT HANDLER
const submitHandler = (e) => {
  e.preventDefault();
  validateInputs();
  addBook();
  renderBooks();
  clearListButton.classList.remove('hidden');
};

// CLEAR LIST
const clearListHandler = () => {
  localStorage.clear();
  location.reload(true);
  tableBody.innerHTML = '';
  clearListButton.classList.add('hidden');
};

renderBooks();
books.length && clearListButton.classList.remove('hidden');

form.addEventListener('submit', submitHandler);
clearListButton.addEventListener('click', clearListHandler);
