let elList = document.querySelector("#list");
let elForm = document.querySelector("#form");

let todosArr = getLocalStoroge() || [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let { todo } = evt.target.elements;

  let newObj = {
    id: todosArr.length + 1,
    todo: todo.value.trim(),
    isComplate: false,
  };
  todosArr.unshift(newObj);
  saveLocalStoroge(todosArr);
  renderingFunc(todosArr, elList);
  todo.value = null;
});

function renderingFunc(array, element) {
  element.innerHTML = null;

  for (let i = 0; i < array.length; i++) {
    let newLi = document.createElement("li");
    let newCheckbox = document.createElement("input");
    let newP = document.createElement("p");
    let newBtn = document.createElement("button"); 

    if (array[i].isComplate) {
      newCheckbox.setAttribute("checked", "true");
   
    }

    newLi.setAttribute(
      "class",
      "flex w-[40%] bg-blue-200 py-3 px-2 rounded-lg justify-between gap-16 hover:bg-blue-400"
    );
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("class", "w-6 rounded-xl");
    newBtn.setAttribute(
      "class",
      "py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 bg-red-100"
    );
    newCheckbox.dataset.todoId = array[i].id;
    newBtn.dataset.todoId = array[i].id;    

    newBtn.addEventListener("click", (evt) => {
      let listItem = evt.target.parentNode;
      let listUl = listItem.parentNode;      
      let btnId = evt.target.dataset.todoId;
      let foundIndex = todosArr.findIndex((item) => item.id == btnId);
      todosArr.splice(foundIndex, 1);
      saveLocalStoroge(todosArr);
      listUl.removeChild(listItem);
      renderingFunc(todosArr, elList);
    });

    newCheckbox.addEventListener("click", (evt) => {
      let btnId = evt.target.dataset.todoId;
      let foundTodo = todosArr.find((item) => item.id == btnId);
      foundTodo.isComplate = !foundTodo.isComplate;
      saveLocalStoroge(todosArr);
      renderingFunc(todosArr, elList);
    });

    newP.textContent = array[i].todo;
    newBtn.textContent = "Delete";

    newLi.append(newCheckbox);
    newLi.append(newP);
    newLi.append(newBtn);

    element.append(newLi);
  }
}
renderingFunc(todosArr, elList);

function saveLocalStoroge(value) {
  window.localStorage.setItem("todos", JSON.stringify(value));
}

function getLocalStoroge(value) {
  return JSON.parse(window.localStorage.getItem("todos", JSON.stringify()));
}
