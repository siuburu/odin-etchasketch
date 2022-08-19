const container = document.querySelector(".container");
let gridElements = document.querySelectorAll(".square");
const gridSlider = document.querySelector(".gridSlider");
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
	//função que atribui a mudança de backgroud para cada div ao acionar o mouseOver
	gridElements.forEach((element) => {
		element.addEventListener("mouseover", () => {
			element.style.backgroundColor = "red";
		});
	});
}
gridSlider.onmouseup = function () {
	generateDiv(this.value);
};
const newGridBtn = document.querySelector(".newGrid");
newGridBtn.addEventListener("click", () => {
	let value = prompt("Input new grid value");
	generateDiv(value);
});
