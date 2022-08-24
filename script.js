const DEFAULT_MODE = "color";

let currentMode = DEFAULT_MODE;
const container = document.querySelector(".containerGrid");
let gridElements = document.querySelectorAll(".square");
const gridSlider = document.querySelector(".gridSlider");
const divDescription = document.querySelector(".divDescription");
const colorPicker = document.querySelector(".colorPicker");

const setColorBtn = document.querySelector("#setColorBtn");
const shadeBtn = document.querySelector("#shadeBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");
const randomColorBtn = document.querySelector("#randomColorBtn");
function setCurrentMode(newMode) {
	currentMode = newMode;
	activateBtn(newMode);
}
activateBtn(DEFAULT_MODE);
function activateBtn(newMode) {
	setColorBtn.classList.remove("active");
	shadeBtn.classList.remove("active");
	eraserBtn.classList.remove("active");
	randomColorBtn.classList.remove("active");

	if (newMode === "color") {
		setColorBtn.classList.add("active");
	} else if (newMode === "random") {
		randomColorBtn.classList.add("active");
	} else if (newMode === "shade") {
		shadeBtn.classList.add("active");
	} else if (newMode === "eraser") {
		eraserBtn.classList.add("active");
	}
}

setColorBtn.onclick = () => setCurrentMode("color");
randomColorBtn.onclick = () => setCurrentMode("random");
shadeBtn.onclick = () => setCurrentMode("shade");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => generateDiv(gridSlider.value);
generateDiv(gridSlider.value);
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function generateDiv(numberSquares) {
	removeAllChildNodes(container); //Remove todas as divs do container para gerar um novo grid
	for (let i = 0; i < numberSquares; i++) {
		for (let j = 0; j < numberSquares; j++) {
			let newDiv = document.createElement("div");
			newDiv.classList.add("square");
			newDiv.setAttribute("data-alpha", "0");
			container.style.gridTemplateColumns = `repeat(${numberSquares}, 1fr)`;
			container.appendChild(newDiv);
		}
	}
	gridElements = document.querySelectorAll(".square");
	setMouseOverEvent();
}
function setMouseOverEvent() {
	//função que atribui a mudança de background para cada div ao acionar o mouseOver
	gridElements.forEach((element) => {
		element.addEventListener("mouseover", () => {
			switch (currentMode) {
				case "random":
					element.style.backgroundColor = getRandomColor();
					break;
				case "color":
					element.style.backgroundColor = getRgb(colorPicker.value);
					break;
				case "shade":
					element.dataset.alpha = parseInt(element.dataset.alpha) + 1;

					element.style.backgroundColor = setAlpha(
						getRgb(colorPicker.value),
						parseInt(element.dataset.alpha)
					);
					break;
				case "eraser":
					element.style.backgroundColor = "#FFFFFF";
			}
		});
	});
}

function getRandomColor() {
	//Retorna uma cor no formato rgb aleatória
	return `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${
		Math.random() * 256
	})`;
}

function setAlpha(color, alpha) {
	/*Definir o alpha dada uma cor no formato rgba */
	let bColorLength = color.length;
	a = color.slice(0, bColorLength - 4);
	return a + alpha / 10 + ")";
}
function getRgb(hex) {
	//converte uma cor no formato hexadecimal para rgb e retorna no formato rgba
	let r = parseInt(hex.slice(1, 3), 16);
	let g = parseInt(hex.slice(3, 5), 16);
	let b = parseInt(hex.slice(5), 16);
	return "rgba(" + r + "," + g + "," + b + "," + 0.99 + ")";
}
gridSlider.oninput = function () {
	divDescription.textContent = `${gridSlider.value} x ${gridSlider.value}`;
};
gridSlider.onmouseup = function () {
	generateDiv(this.value);
};
