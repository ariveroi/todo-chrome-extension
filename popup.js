const addStyles = import(chrome.extension.getURL("src/addStyles.js"));
// import { addContainerStyle } from addStyles;

document.addEventListener("DOMContentLoaded", async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: testDiv,
  });
});

function testDiv() {
  console.log("hello");
  let form = document.createElement("div");
  addStyles.addContainerStyle(form);
  form.innerHTML = `
      <div class="container">
      <form id="new-todo-form">
        <label for="new-todo-input">New todo:</label>
        <input type="text" name="new-todo-input" id="new-todo-input" />
        <input type="submit" value="Add" />
      </form>
      <div class="todos-container">
        <ul id="todo-list"></ul>
      </div>
      <button id="tst">Click</button>
      <script src="popup.js"></script>
    </div>
  `;
  document.body.appendChild(form);
}

let myTodos = [];

// localStorage todo list
chrome.storage.sync.get("toDoList", ({ toDoList }) => {
  myTodos = toDoList;
  toDoList.forEach((item, idx) => {
    addToDo(item, idx);
  });
});

// submit handler
document
  .querySelector("#new-todo-form")
  .addEventListener("submit", async () => {
    let item = {
      name: document.querySelector("#new-todo-input").value,
      done: false,
    };
    addToDo(item);
    myTodos.push(item);
    chrome.storage.sync.set({ toDoList: myTodos });
  });

// add todo
const addToDo = (item, idx) => {
  let toDoList = document.querySelector("#todo-list");
  let listItem = document.createElement("li");
  listItem.setAttribute("id", "li-element-" + idx);
  let text = document.createElement("span");
  let button = document.createElement("button");
  button.setAttribute("id", "done-button-" + idx);
  button.classList.add("complete-todo");
  button.innerText = "Done";
  button.addEventListener("click", () => {
    removeElement(idx);
  });
  text.innerText = item.name;
  listItem.appendChild(text);
  listItem.appendChild(button);
  toDoList.appendChild(listItem);
};

const removeElement = (idx) => {
  myTodos.splice(idx, 1);
  chrome.storage.sync.set({ toDoList: myTodos });
  let element = document.querySelector("#li-element-" + idx);
  element.remove();
};
