const container = document.querySelector(".container");
let gridElements = document.querySelectorAll(".square");
const gridSlider = document.querySelector(".gridSlider");
const divDescription = document.querySelector(".divDescription");
const colorPicker = document.querySelector(".colorPicker");
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
			element.dataset.alpha = parseInt(element.dataset.alpha) + 1;
			element.style.backgroundColor = getRgb(colorPicker.value);
			element.style.backgroundColor =
				"rgba(" +
				15 +
				"," +
				221 +
				"," +
				42 +
				"," +
				parseInt(element.dataset.alpha) / 10 +
				")";
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
}
function getRgb(hex) {
	//converte uma cor no formato hexadecimal para rgb e retorna no formato rgba
	let r = parseInt(hex.slice(1, 3), 16);
	let g = parseInt(hex.slice(3, 5), 16);
	let b = parseInt(hex.slice(5), 16);
	return "rgb(" + r + "," + g + "," + b + "," + 1 + ")";
}
gridSlider.oninput = function () {
	divDescription.textContent = `Div ${gridSlider.value} x ${gridSlider.value}`;
};
gridSlider.onmouseup = function () {
	generateDiv(this.value);
};
