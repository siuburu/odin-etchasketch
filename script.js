const container = document.querySelector(".container");
let gridElements = document.querySelectorAll(".square");
const gridSlider = document.querySelector(".gridSlider");
const divDescription = document.querySelector(".divDescription");
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
			element.style.backgroundColor = getRandomColor();
		});
	});
}

function getRandomColor() {
	//Retorna uma cor no formato rgb aleatória
	return `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${
		Math.random() * 256
	}, 0.1)`;
}
gridSlider.onmouseup = function () {
	generateDiv(this.value);
	divDescription.textContent = `Div ${gridSlider.value} x ${gridSlider.value}`;
};
