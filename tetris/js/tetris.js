const WIDTH = 10;
const HEIGHT = 25;

let block_occupied = new Array(WIDTH * HEIGHT);
block_occupied.fill(false);

class CurrentBlock {
	blockType = -1;
	block = [-1, -1, -1, -1];
	blockCol = -1;
	blockSpinDirection = 0;
	backgroundColor = "undefined";
	constructor(blockType, blockLeft) {
		this.blockType = blockType;
		this.blockCol = blockLeft;
		if (blockType == 0) {
			this.block[0] = -3;
			this.block[1] = -2;
			this.block[2] = -1;
			this.block[3] = blockLeft;
			this.backgroundColor = "skyblue";
		} else if (blockType == 1) {
			this.block[0] = -1;
			this.block[1] = -1;
			this.block[2] = blockLeft;
			this.block[3] = blockLeft + 1;
			this.backgroundColor = "yellow";
		} else if (blockType == 2) {
			this.block[0] = -1;
			this.block[1] = -1;
			this.block[2] = blockLeft;
			this.block[3] = blockLeft + 1;
			this.backgroundColor = "red";
		} else if (blockType == 3) {
			this.block[0] = blockLeft;
			this.block[1] = blockLeft + 1;
			this.block[2] = -1;
			this.block[3] = -1;
			this.backgroundColor = "green";
		} else if (blockType == 4) {
			this.block[0] = -2;
			this.block[1] = -1;
			this.block[3] = blockLeft;
			this.block[2] = blockLeft + 1;
			this.backgroundColor = "blue";
		} else if (blockType == 5) {
			this.block[0] = -2;
			this.block[1] = -1;
			this.block[2] = blockLeft;
			this.block[3] = blockLeft + 1;
			this.backgroundColor = "orange";
		} else if (blockType == 6) {
			this.block[0] = -1;
			this.block[1] = -1;
			this.block[2] = -1;
			this.block[3] = blockLeft;
			this.backgroundColor = "purple";
		}
	}
}

function dealWithKeyboard(event) {
	console.log(event.key);
	switch (event.key) {
		case "ArrowDown": {
			if (currentBlock.blockBottom < HEIGHT) {
				currentBlock.blockBottom += 1;
			}
			break;
		}
		case "ArrowLeft": {
			if (currentBlock.blockLeft > 0) {
				currentBlock.blockLeft -= 1;
			}
			break;
		}
		case "ArrowRight": {
			
		}
	}
}

function buildMatrix_addId() {
	const playground = document.querySelector(".playground > ul");
	let id = 0
	for (let i = 0 ; i < 20 ; i++) {
		id = 10 * i;
		const li = document.createElement("li");
		const ul = document.createElement("ul");
		for (let j = 0 ; j < 10 ; j++) {
			const matrix = document.createElement("li");
			matrix.id = id;
			ul.append(matrix);
			id += 1;
		}
		li.append(ul);
		playground.append(li);
	}
}

function buildNextBlockBox() {
	const block = document.querySelector(".nextBlockBox > ul");
	let id = 0;
	for (let i = 0 ; i < 6 ; i++) {
		id = 5 * i;
		const li = document.createElement("li");
		const ul = document.createElement("ul");
		for (let j = 0 ; j < 5 ; j++) {
			const matrix = document.createElement("li");
			matrix.id = "next-block-" + String(id);
			ul.append(matrix);
			id += 1;
		}
		li.append(ul);
		block.append(li);
	}

	const box_name = document.createElement("h3");
	box_name.textContent = "Next Box";
	box_name.style = "text-align: center; margin-bottom: 5px";

	block.prepend(box_name);
}

function makeRandomNumRange0_6() {
	return Math.floor(Math.random() * 7);
}
// 0: 막대기, 1: 사각형, 2: z , 3: s, 4: J, 5: L, 6: T
function selectBlockStartCol() {
	let col = 0;
	if (currentBlockType == 0) {
		col = Math.floor(Math.random() * 10);
	} else if (currentBlockType == 1) {
		col = Math.floor(Math.random() * 9);
	} else if (currentBlockType == 2) {
		col = Math.floor((Math.random() * 8) + 1);
	} else if (currentBlockType == 3) {
		col = Math.floor(Math.random() * 8);
	} else if (currentBlockType == 4) {
		col = Math.floor(Math.random() * 9);
	} else if (currentBlockType == 5) {
		col = Math.floor(Math.random() * 9);
	} else 
		col = Math.floor((Math.random() * 8) + 1);
	return col;
}

function printNextBlock() {
	switch(nextBlockType) {
		case 0: { 
			printStickBlock();
			break;
		}
		case 1: {
			printSquareBlock();
			break;
		}
		case 2: {
			printZBlock();
			break;
		}
		case 3: {
			printSBlock();
			break;
		}
		case 4: {
			printJBlock();
			break;
		}
		case 5: {
			printLBlock();
			break;
		}
		case 6: {
			printTBlock();
			break;
		}
	}

}

function printStickBlock() {
	for (let i = 0 ; i < 4 ; i++) {
		let blockNumber = 7 + i * 5;
		let nextBlock = document.getElementById(`next-block-${blockNumber}`);
		nextBlock.style.backgroundColor = "skyblue";
	}
}

function printSquareBlock() {
	const block1 = document.getElementById("next-block-6");
	block1.style.backgroundColor = "yellow";
	const block2 = document.getElementById("next-block-7");
	block2.style.backgroundColor = "yellow";
	const block3 = document.getElementById("next-block-11");
	block3.style.backgroundColor = "yellow";
	const block4 = document.getElementById("next-block-12");
	block4.style.backgroundColor = "yellow";
}

function printZBlock() {
	const block1 = document.getElementById("next-block-11");
	block1.style.backgroundColor = "red";
	const block2 = document.getElementById("next-block-12");
	block2.style.backgroundColor = "red";
	const block3 = document.getElementById("next-block-17");
	block3.style.backgroundColor = "red";
	const block4 = document.getElementById("next-block-18");
	block4.style.backgroundColor = "red";
}

function printSBlock() {
	const block1 = document.getElementById("next-block-12");
	block1.style.backgroundColor = "green";
	const block2 = document.getElementById("next-block-13");
	block2.style.backgroundColor = "green";
	const block3 = document.getElementById("next-block-16");
	block3.style.backgroundColor = "green";
	const block4 = document.getElementById("next-block-17");
	block4.style.backgroundColor = "green";
}

function printJBlock() {
	const block1 = document.getElementById("next-block-7");
	block1.style.backgroundColor = "blue";
	const block2 = document.getElementById("next-block-12");
	block2.style.backgroundColor = "blue";
	const block3 = document.getElementById("next-block-16");
	block3.style.backgroundColor = "blue";
	const block4 = document.getElementById("next-block-17");
	block4.style.backgroundColor = "blue";
}

function printLBlock() {
	const block1 = document.getElementById("next-block-11");
	block1.style.backgroundColor = "orange";
	const block2 = document.getElementById("next-block-12");
	block2.style.backgroundColor = "orange";
	const block3 = document.getElementById("next-block-17");
	block3.style.backgroundColor = "orange";
	const block4 = document.getElementById("next-block-18");
	block4.style.backgroundColor = "orange";
}

function printTBlock() {
	const block1 = document.getElementById("next-block-11");
	block1.style.backgroundColor = "purple";
	const block2 = document.getElementById("next-block-12");
	block2.style.backgroundColor = "purple";
	const block3 = document.getElementById("next-block-13");
	block3.style.backgroundColor = "purple";
	const block4 = document.getElementById("next-block-17");
	block4.style.backgroundColor = "purple";
}

const dropBlock = function() {
	for(let i = 0 ; i < 4 ; i++) {
		let blockIdx = currentBlock.block[i];
		if (blockIdx > 0) {
			// 원래 위치 지우기
			let block = document.getElementById(`${blockIdx}`);
			block.style.backgroundColor = "white";
			block.style.outline = "1px solid #ccc";
			block_occupied = false;
			
			blockIdx += WIDTH;
			currentBlock.block[i] += WIDTH;
			block = document.getElementById(`${blockIdx}`);
			block.style.backgroundColor = currentBlock.backgroundColor;
			block.style.outline = "1px solid #ccc";
			block_occupied = true;
		}
	}
	console.log("driop");
}

const printCurrentBlockOnGraph = () => {
	for(let i = 0 ; i < 4 ; i++) {
		let blockIdx = currentBlock.block[i];
		if (blockIdx > 0) {
			let block = document.getElementById(`${blockIdx}`);
			block.style.backgroundColor = currentBlock.backgroundColor;
			block_occupied[blockIdx] = true;
		}
	}
}

const intervalTasks = function() {
	dropBlock();
	console.log("task");
}

buildMatrix_addId();
buildNextBlockBox();

let currentBlockType = makeRandomNumRange0_6();
let currentBlock = new CurrentBlock(currentBlockType, selectBlockStartCol());
let nextBlockType = makeRandomNumRange0_6();

document.addEventListener("keydown", dealWithKeyboard, false);

printNextBlock();

printCurrentBlockOnGraph();

const blockDropIntervalId = setInterval(intervalTasks, 1000);




/*
구현할 기능
1. 충돌 판단
2. 일정시간 지나면 블록 하강
3. 블록 배치
4. 블록 회전
5. 넥스트 블록 -> 현재 블록 / 새로운 넥스트 블록
*/