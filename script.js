const container = document.querySelector(".container");
generateDiv(16);

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function generateDiv(numberSquares) {
	removeAllChildNodes(container);
	for (let i = 0; i < numberSquares; i++) {
		for (let j = 0; j < numberSquares; j++) {
			let newDiv = document.createElement("div");
			newDiv.classList.add("square");
			container.style.gridTemplateColumns = `repeat(${numberSquares}, 1fr)`;
			container.appendChild(newDiv);
		}
	}
}
const gridElements = document.querySelectorAll(".square");

gridElements.forEach((element) => {
	element.addEventListener("mouseover", () => {
		element.style.backgroundColor = "red";
	});
});

const newGridBtn = document.querySelector(".newGrid");
newGridBtn.addEventListener("click", () => {
	let value = prompt("Input new grid value");
	generateDiv(value);
});
