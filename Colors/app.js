const cols = document.querySelectorAll(".col");
const copyText = document.querySelector(".copy-text");

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    setRandomColors();
  }
});

function generateRandomColor() {
  const hexCodes = "123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
    copyTextText();
  }
});

function setRandomColors() {
  cols.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = chroma.random();

    if (isLocked) {
      return;
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function copyTextText() {
  copyText.classList.add("open");
  var myfunc = setInterval(function () {
    copyText.classList.remove("open");
  }, 3000);
}

setRandomColors();
