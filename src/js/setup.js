export const setupFrame = (frame) => {
  addFunctionalities(frame);
  addStyle(frame);
};

const addChilds = (frame) => {
  let button = document.createElement("button");
  frame.appendChild(button);
  button.innerHTML = "Click me";
  button.addEventListener("click", () => {
    console.log("button clicked");
  });
};

const addFunctionalities = (frame) => {
  // Expand the frame when hovering
  frame.addEventListener("click", () => {
    console.log("hello");
    addChilds(frame);
    frame.style.backgroundColor = "blue";
    frame.style.width = "300px";
    frame.style.height = "300px";
    frame.removeEventListener("click", () => {});
  });
  // click outside frame
  // collapse frame when mouse leaves
  frame.addEventListener("mouseout", () => {
    let child = frame.firstChild;
    while (child) {
      frame.removeChild(child);
      child = frame.firstChild;
    }
    frame.style.backgroundColor = "red";
    frame.style.width = "30px";
    frame.style.height = "30px";
  });
  // Move the position of the frame
  // TODO: Add persistence with local storage
  frame.addEventListener("mousedown", (e) => {
    const frameX = frame.offsetLeft;
    const mouseX = e.clientX;
    const moveAt = (e) => {
      frame.style.left = e.clientX - mouseX + frameX + "px";
    };
    document.addEventListener("mousemove", moveAt);
    frame.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveAt);
    });
  });

  document.body.appendChild(frame);
};

const addStyle = (frame) => {
  frame.style.width = "30px";
  frame.style.height = "30px";
  frame.style.backgroundColor = "red";
  frame.style.position = "absolute";
  frame.style.top = "0px";
  frame.style.right = "0px";
  frame.style.zIndex = "9999";
};
