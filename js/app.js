window.addEventListener("load", function () {
  // Khai báo biến
  const form = document.querySelector(".todo-form");
  const todoList = document.querySelector(".todo-list");
  let todos =
    localStorage.length > 0 ? JSON.parse(localStorage.getItem("todoList")) : [];
  if (Array.isArray(todos) && todos.length > 0) {
    [...todos].forEach((item) => createTodoItem(item));
  }
  function createTodoItem(title) {
    const template = `
    <div class="todo-item">
        <span class="todo-text">${title}</span>
        <i class="fa fa-trash todo-remove"></i>
    </div>
    `;
    todoList.insertAdjacentHTML("beforeend", template);
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoValue = this.elements["todo"].value;
    if (this.elements["todo"].value === "") return;
    createTodoItem(todoValue);
    todos.push(todoValue);
    localStorage && localStorage.setItem("todoList", JSON.stringify(todos));
    this.elements["todo"].value = "";
  });
  // remove
  todoList.addEventListener("click", function (e) {
    if (e.target.matches(".todo-remove")) {
      //remove trong DOM
      const todo = e.target.parentNode;
      todo.parentNode.removeChild(todo);
      //romove trong localStorage
      const todoText = e.target.previousElementSibling.textContent;
      const newTodo = todos.filter((item) => item !== todoText);
      localStorage.setItem("todoList", JSON.stringify(newTodo));
    }
  });
});
