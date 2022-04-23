let initialToDoList = [
  //   { name: "Getting groceries", done: false },
  //   { name: "Getting trashcan paper", done: false },
  //   { name: "Play padel tomorrow", done: false },
];

chrome.runtime.onInstalled.addListener(async () => {
  console.log(chrome.storage);
  console.log(chrome);
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.runtime.sendMessage({
    type: "NEW_TAB",
    payload: {
      count: activeInfo.tabId,
    },
  });
});

function testDiv() {
  //   let form = document.createElement("div");
  //   form.setAttribute("class", "test-div");
  //   document.body.appendChild(form);
  console.log("hola amigos de youtube");
}

// chrome.runtime.onStartup.addListener(() => {
//   console.log("hello world");
// });
