const WIDTH = 18;
const HEIGHT = 27;
const UNSEENAREA_SIDE = 3;
const UNSEENAREA_TOP = 4;
const UNSEENAREA_BOTTOM = 3;
const BLOCK_TYPE_NUMBER = 7;
const GAME_END = false;
const NEXT_BOX_WIDTH = 5;
const NEXT_BOX_HEIGHT = 6;
const NEXT_BLOCK_HEADER = "next-block-";
const BLOCK_DROP_SPEED = 500;
let   SCORE = 0;

const create2DArray = (rows, columns) => {
	let arr = new Array(rows);
	for (let i = 0 ; i < rows ; i++) {
		arr[i] = new Array(columns);
	}
	return arr;
}

const initialize_matrix = () => {
	let block_occupied = new Array(HEIGHT);
	for (let i = 0 ; i < HEIGHT ; i++) {
		let temp = new Array(WIDTH);
		for (let j = 0 ; j < WIDTH ; j++) {
			temp[j] = false;
		}
		block_occupied[i] = temp;
	}
	return block_occupied;
}

class Coordinate {
	constructor(row, col) {
		this.row = row;
		this.col = col;
	}

	copy() {
		const row = this.row;
		const col = this.col;
		const newCopy = [row, col];
		return newCopy;
	}
}

class Block {
	constructor() {
		this.blockDir = 0;
		this.block;
		this.coloredBlock;
		this.blockBoxWidth = 3;
	}

	moveLeft() {
		// check validity
		if (this.block[0][0].col == 0) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.col <= UNSEENAREA_SIDE) return;
		}
		if (otherBlockIsBlockingPathAtLeft()) return;

		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0].col -= 1;
			this.block[i][1].col -= 1;
			this.block[i][2].col -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][2].col == WIDTH - 1) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.col == WIDTH - UNSEENAREA_SIDE - 1) return;
		}
		if (otherBlockIsBlockingPathAtRight()) return;

		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0].col += 1;
			this.block[i][1].col += 1;
			this.block[i][2].col += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[2][0].row == HEIGHT - 1) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.row >= HEIGHT - UNSEENAREA_BOTTOM - 1) return;
		}
		if (otherBlockIsBlockingPathAtBelow()) return;
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0].row += 1;
			this.block[i][1].row += 1;
			this.block[i][2].row += 1;
		}
	}

	boxShadedLengthAtSides() {
		// left
		if (this.block[0][0].col <= UNSEENAREA_SIDE){
			return UNSEENAREA_SIDE - this.block[0][0].col;
		} 
		// right
		if (this.block[0][this.blockBoxWidth - 1].col >= WIDTH - UNSEENAREA_SIDE - 1) { 
			return WIDTH - UNSEENAREA_SIDE - 1 - this.block[0][this.blockBoxWidth - 1].col;
		}
		return;
	}

	boxShadedLengthAtBelow() {
		// below
		if (this.block[this.blockBoxWidth - 1][0].row >= HEIGHT - UNSEENAREA_BOTTOM - 1) {
			return this.block[this.blockBoxWidth - 1][0].row - (HEIGHT - UNSEENAREA_BOTTOM - 1);
		}
		return;
	}

	moveBlocksCol(overed) {
		this.block.forEach( ele => {
			ele.forEach( coord => {
				coord.col += overed;
			})
		})
	}

	moveBlocksRow(overed) {
		this.block.forEach( ele => {
			ele.forEach( coord => {
				coord.row -= overed;
			})
		})
	}

	moveBlocksBeforeSpin() {
		const overedSide = this.boxShadedLengthAtSides();
		if (overedSide)
			this.moveBlocksCol(overedSide);
		const overedBelow = this.boxShadedLengthAtBelow();
		if (overedBelow)
			this.moveBlocksRow(overedBelow);
	}

	changeBackgroundColor(color) {
		this.coloredBlock.forEach(item => {
			const row = item.row;
			const col = item.col;
			const b = document.getElementById(`${row}-${col}`);
			b.style.backgroundColor = color;
		});
	}

}

class IBlock extends Block {
	constructor(startCol) {
		super();
		this.block = create2DArray(4, 4);
		this.coloredBlock = new Array(4);
		this.blockDir = 0;
		this.blockBoxWidth = 4;
		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0] = new Coordinate(i, startCol - 1);
			this.block[i][1] = new Coordinate(i, startCol);
			this.block[i][2] = new Coordinate(i, startCol + 1);
			this.block[i][3] = new Coordinate(i, startCol + 2);
			this.coloredBlock[i] = this.block[i][1];
		}
	}
	
	spinDir() {
		this.moveBlocksBeforeSpin();
		this.blockDir = this.blockDir + 1 > 3 ? 0 : this.blockDir + 1;
		switch(this.blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[2][1];
				this.coloredBlock[3] = this.block[3][1];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[1][0];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][2];
				this.coloredBlock[3] = this.block[1][3];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[0][2];
				this.coloredBlock[1] = this.block[1][2];
				this.coloredBlock[2] = this.block[2][2];
				this.coloredBlock[3] = this.block[3][2];
				break;
			} 
			case 3: {
				this.coloredBlock[1] = this.block[2][1];
				this.coloredBlock[2] = this.block[2][2];
				this.coloredBlock[3] = this.block[2][3];
				this.coloredBlock[0] = this.block[2][0];
				break;
			}
		}

	}

	moveLeft() {
		// check validity
		if (this.block[0][0].col == 0) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.col == UNSEENAREA_SIDE) return;
		}
		if (otherBlockIsBlockingPathAtLeft()) return;

		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0].col -= 1;
			this.block[i][1].col -= 1;
			this.block[i][2].col -= 1;
			this.block[i][3].col -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][3].col == WIDTH - 1) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.col == WIDTH - UNSEENAREA_SIDE - 1) return;
		}
		if (otherBlockIsBlockingPathAtRight()) return;

		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0].col += 1;
			this.block[i][1].col += 1;
			this.block[i][2].col += 1;
			this.block[i][3].col += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[3][0].row == HEIGHT - 1) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.row >= HEIGHT - UNSEENAREA_BOTTOM - 1) return;
		}
		if (otherBlockIsBlockingPathAtBelow()) return;

		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0].row += 1;
			this.block[i][1].row += 1;
			this.block[i][2].row += 1;
			this.block[i][3].row += 1;
		}
	}
}

class OBlock extends Block {
	block = create2DArray(2, 2);
	coloredBlock = new Array(4);
	blockDir = 0;
	startingRow = 2;
	constructor(startCol) {
		super();
		this.block[0][0] = this.coloredBlock[0] = new Coordinate(this.startingRow, startCol);
		this.block[0][1] = this.coloredBlock[1] = new Coordinate(this.startingRow, startCol + 1);
		this.block[1][0] = this.coloredBlock[2] = new Coordinate(this.startingRow + 1, startCol);
		this.block[1][1] = this.coloredBlock[3] = new Coordinate(this.startingRow + 1, startCol + 1);
	}

	spinDir() {
		// nothing to do
	}

	moveLeft() {
		// check validity
		if (this.block[0][0].col <= UNSEENAREA_SIDE) return;
		if (otherBlockIsBlockingPathAtLeft()) return;

		this.block[0][0].col -= 1;
		this.block[0][1].col -= 1;
		this.block[1][0].col -= 1;
		this.block[1][1].col -= 1;
	}
	
	moveRight() {
		if (this.block[0][1].col >= WIDTH - UNSEENAREA_SIDE - 1) return;
		if (otherBlockIsBlockingPathAtRight()) return;

		this.block[0][0].col += 1;
		this.block[0][1].col += 1;
		this.block[1][0].col += 1;
		this.block[1][1].col += 1;
	}

	moveDown() {
		if (this.block[1][0].row >= HEIGHT - UNSEENAREA_BOTTOM - 1) return;
		if (otherBlockIsBlockingPathAtBelow()) return;
		this.block[0][0].row += 1;
		this.block[0][1].row += 1;
		this.block[1][0].row += 1;
		this.block[1][1].row += 1;
	}
}

class ZBlock extends Block {
	constructor(startCol) {
		super();
		this.block = create2DArray(3, 3);
		this.coloredBlock = new Array(4);
		this.blockDir = 0;
		for (let i = 1 ; i <= 3 ; i++) {
			this.block[i - 1][0] = new Coordinate(i, startCol - 1);
			this.block[i - 1][1] = new Coordinate(i, startCol);
			this.block[i - 1][2] = new Coordinate(i, startCol + 1);
		}
		this.coloredBlock[0] = this.block[1][0];
		this.coloredBlock[1] = this.block[1][1];
		this.coloredBlock[2] = this.block[2][1];
		this.coloredBlock[3] = this.block[2][2];
	}
	
	spinDir() {
		this.moveBlocksBeforeSpin();
		this.blockDir = this.blockDir + 1 > 3 ? 0 : this.blockDir + 1;
		switch(this.blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[1][0];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[2][1];
				this.coloredBlock[3] = this.block[2][2];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][0];
				this.coloredBlock[3] = this.block[2][0];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[0][0];
				this.coloredBlock[1] = this.block[0][1];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[1][2];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[0][2];
				this.coloredBlock[1] = this.block[1][2];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[2][1];
				break;
			}
		}
	}
}

class SBlock extends Block {
	constructor(startCol) {
		super();
		this.block = create2DArray(3, 3);
		this.coloredBlock = new Array(4);
		this.blockDir = 0;
		for (let i = 1 ; i <= 3 ; i++) {
			this.block[i - 1][0] = new Coordinate(i, startCol - 1);
			this.block[i - 1][1] = new Coordinate(i, startCol);
			this.block[i - 1][2] = new Coordinate(i, startCol + 1);
		}
		this.coloredBlock[0] = this.block[2][0];
		this.coloredBlock[1] = this.block[2][1];
		this.coloredBlock[2] = this.block[1][1];
		this.coloredBlock[3] = this.block[1][2];
	}
	
	spinDir() {
		this.moveBlocksBeforeSpin();
		this.blockDir = this.blockDir + 1 > 3 ? 0 : this.blockDir + 1;
		switch(this.blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[2][0];
				this.coloredBlock[1] = this.block[2][1];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[1][2];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[0][0];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[2][1];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[0][2];
				this.coloredBlock[1] = this.block[0][1];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[1][0];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][2];
				this.coloredBlock[3] = this.block[2][2];
				break;
			}
		}
	}
}

class JBlock extends Block {
	constructor(startCol) {
		super();
		this.block = create2DArray(3, 3);
		this.coloredBlock = new Array(4);
		this.blockDir = 0;
		for (let i = 1 ; i <= 3 ; i++) {
			this.block[i - 1][0] = new Coordinate(i, startCol - 1);
			this.block[i - 1][1] = new Coordinate(i, startCol);
			this.block[i - 1][2] = new Coordinate(i, startCol + 1);
		}
		this.coloredBlock[0] = this.block[0][1];
		this.coloredBlock[1] = this.block[1][1];
		this.coloredBlock[2] = this.block[2][1];
		this.coloredBlock[3] = this.block[2][0];
	}
	
	spinDir() {
		this.moveBlocksBeforeSpin();
		this.blockDir = this.blockDir + 1 > 3 ? 0 : this.blockDir + 1;
		switch(this.blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[0][2];
				this.coloredBlock[1] = this.block[1][2];
				this.coloredBlock[2] = this.block[2][2];
				this.coloredBlock[3] = this.block[2][1];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[1][0];
				this.coloredBlock[1] = this.block[2][0];
				this.coloredBlock[2] = this.block[2][1];
				this.coloredBlock[3] = this.block[2][2];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[2][0];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[0][0];
				this.coloredBlock[3] = this.block[0][1];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[0][0];
				this.coloredBlock[1] = this.block[0][1];
				this.coloredBlock[2] = this.block[0][2];
				this.coloredBlock[3] = this.block[1][2];
				break;
			}
		}
	}

}

class LBlock extends Block {
	constructor(startCol) {
		super();
		this.block = create2DArray(3, 3);
		this.coloredBlock = new Array(4);
		this.blockDir = 0;
		for (let i = 1 ; i <= 3 ; i++) {
			this.block[i - 1][0] = new Coordinate(i, startCol - 1);
			this.block[i - 1][1] = new Coordinate(i, startCol);
			this.block[i - 1][2] = new Coordinate(i, startCol + 1);
		}
		this.coloredBlock[0] = this.block[0][1];
		this.coloredBlock[1] = this.block[1][1];
		this.coloredBlock[2] = this.block[2][1];
		this.coloredBlock[3] = this.block[2][2];
	}
	
	spinDir() {
		this.moveBlocksBeforeSpin();
		this.blockDir = this.blockDir + 1 > 3 ? 0 : this.blockDir + 1;
		switch(this.blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[0][0];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[2][0];
				this.coloredBlock[3] = this.block[2][1];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[1][0];
				this.coloredBlock[1] = this.block[0][0];
				this.coloredBlock[2] = this.block[0][1];
				this.coloredBlock[3] = this.block[0][2];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[0][2];
				this.coloredBlock[2] = this.block[1][2];
				this.coloredBlock[3] = this.block[2][2];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[2][0];
				this.coloredBlock[1] = this.block[2][1];
				this.coloredBlock[2] = this.block[2][2];
				this.coloredBlock[3] = this.block[1][2];
				break;
			}
		}
	}
}

class TBlock extends Block {
	constructor(startCol) {
		super();
		this.block = create2DArray(3, 3);
		this.coloredBlock = new Array(4);
		this.blockDir = 0;
		for (let i = 1 ; i <= 3 ; i++) {
			this.block[i - 1][0] = new Coordinate(i, startCol - 1);
			this.block[i - 1][1] = new Coordinate(i, startCol);
			this.block[i - 1][2] = new Coordinate(i, startCol + 1);
		}
		this.coloredBlock[0] = this.block[1][0];
		this.coloredBlock[1] = this.block[1][1];
		this.coloredBlock[2] = this.block[1][2];
		this.coloredBlock[3] = this.block[2][1];
	}
	
	spinDir() {
		this.moveBlocksBeforeSpin();
		this.blockDir = this.blockDir + 1 > 3 ? 0 : this.blockDir + 1;
		switch(this.blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[1][0];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][2];
				this.coloredBlock[3] = this.block[2][1];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[2][1];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[1][2];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][2];
				this.coloredBlock[3] = this.block[2][1];
				break;
			}
		}
	}
}

class CurrentBlock {
	constructor(blockType, blockCol) {
		this.blockType = blockType;
		switch(blockType) {
			case 0: {
				this.block = new IBlock(blockCol);
				this.backgroundColor = "skyblue";
				break;
			}
			case 1: {
				this.block = new OBlock(blockCol);
				this.backgroundColor = "yellow";
				break;
			}
			case 2: {
				this.block = new ZBlock(blockCol);
				this.backgroundColor = "red";
				break;
			}
			case 3: {
				this.block = new SBlock(blockCol);
				this.backgroundColor = "green";
				break;
			}
			case 4: {
				this.block = new JBlock(blockCol);
				this.backgroundColor = "blue";
				break;
			}
			case 5: {
				this.block = new LBlock(blockCol);
				this.backgroundColor = "orange";
				break;
			}
			case 6: {
				this.block = new TBlock(blockCol);
				this.backgroundColor = "purple";
				break;
			}
		}
	}
}

const arrowKeyHander = (key) => {
	const blockObj = currentBlock.block;
	deletePrevPos();
	switch(key) {
		case "ArrowLeft": {
			blockObj.moveLeft();
			break;
		}
		case "ArrowRight": {
			blockObj.moveRight();
			break;
		}
		case "ArrowDown": {
			blockObj.moveDown();
			break;
		}
		case "ArrowUp": {
			blockObj.spinDir();
			break;
		}
	}
	printCurrentBlockOnGraph();
}

const findBottomBlocks = () => {
	const bottomBlock = [];
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	
	let deepestRow = -10;
	coloredBlocks.forEach( coords => {
		const row = coords.row;
		if (deepestRow < row) deepestRow = row;
	});

	coloredBlocks.forEach( coords => {
		const row = coords.row;
		if (row == deepestRow) bottomBlock.push(coords);
	});

	return bottomBlock;
}

const findDepthToFall = (bottomBlocks) => {
	let result = 100;
	bottomBlocks.forEach( coord => {
		let row = coord.row;
		const col = coord.col;
		let depth = 0;
		while (row <= HEIGHT - UNSEENAREA_TOP - 1) {
			if (block_occupied[row + 1][col] == false) {
				depth += 1;
			}
			row += 1;
		}
		result = Math.min(result, depth);
	});
	return result;
}

const spacebarHander = () => {
	const bottomBlocks = findBottomBlocks();
	const depthToFall = findDepthToFall(bottomBlocks);
	deletePrevPos();
	moveBlockCoordsDown(depthToFall);
	printCurrentBlockOnGraph();

	clearInterval(blockDropIntervalId);
	intervalTasks();
	blockDropIntervalId = setInterval(intervalTasks, BLOCK_DROP_SPEED);
}

function dealWithKeyboard(event) {
	const key = event.key;
	if (key == "ArrowLeft" || key == "ArrowRight"
		|| key == "ArrowDown" || key == "ArrowUp")
			arrowKeyHander(key);
	if (key == " ") {
		spacebarHander();
	}
} 

function buildMatrix_addId() {
	const playground = document.querySelector(".playground > ul");
	for (let i = 0 ; i < HEIGHT + UNSEENAREA_BOTTOM ; i++) {
		const li = document.createElement("li");
		const ul = document.createElement("ul");
		for (let j = 0 ; j < WIDTH ; j++) {
			const matrix = document.createElement("li");
			matrix.id = `${i}-${j}`;
			if (j >= UNSEENAREA_SIDE && j < WIDTH - UNSEENAREA_SIDE) {
				if (i >= UNSEENAREA_TOP && i < HEIGHT - UNSEENAREA_BOTTOM) {
					matrix.style.outline = "1px solid #ccc";
				}
			}
			ul.append(matrix);
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
			matrix.id = NEXT_BLOCK_HEADER + String(id);
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

const clearNextBox = () => {
	let id = 0;
	for (let i = 0 ; i < NEXT_BOX_HEIGHT ; i++) {
		id = 5 * i;
		for (let j = 0 ; j < NEXT_BOX_WIDTH ; j++) {
			const mat = document.getElementById(NEXT_BLOCK_HEADER + String(id));
			mat.style.backgroundColor = "white";
			id += 1;
		}
	}
}

function makeRandomNumRange0_6() {
	return Math.floor(Math.random() * BLOCK_TYPE_NUMBER);
}
// 0: 막대기, 1: 사각형, 2: z , 3: s, 4: J, 5: L, 6: T
function selectBlockStartCol() {
	let col = 0;
	if (currentBlockType == 0) {
		col = Math.floor(Math.random() * 12);
	} else if (currentBlockType == 1) {
		col = Math.floor(Math.random() * 11);
	} else if (currentBlockType == 2) {
		col = Math.floor(Math.random() * 10) + 1;
	} else if (currentBlockType == 3) {
		col = Math.floor(Math.random() * 10) + 1;
	} else if (currentBlockType == 4) {
		col = Math.floor(Math.random() * 10) + 1;
	} else if (currentBlockType == 5) {
		col = Math.floor(Math.random() * 10) + 1;
	} else 
		col = Math.floor(Math.random() * 10) + 1;

	return col + UNSEENAREA_SIDE;
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
	const block1 = document.getElementById("next-block-7");
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

const deletePrevPos = function() {
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	coloredBlocks.forEach( coords => {
		const row = coords.row;
		const col = coords.col;
		const tmp = document.getElementById(`${row}-${col}`);
		tmp.style.backgroundColor = "white";
		block_occupied[row][col] = false;
	})
}

const moveBlockCoordsDown = function(depth) {
	const blockObj 			= currentBlock.block;
	const blocks			= blockObj.block;
	blocks.forEach( ele => { 
		ele.forEach( coord => {
			coord.row += depth;
		})
	});
}

const dropBlock = function() {
	// 1. 이전 위치 일괄 제거
	deletePrevPos();
	// 2. 이동
	moveBlockCoordsDown(1);
	// 3. 현재 블록 그래프에 그리기
	printCurrentBlockOnGraph();
}

const printCurrentBlockOnGraph = () => {
	const blockObj 			= currentBlock.block;
	const backgroundColor 	= currentBlock.backgroundColor;
	const coloredBlocks 	= blockObj.coloredBlock;
	coloredBlocks.forEach( coords => {
		const row = coords.row;
		if (row <= UNSEENAREA_BOTTOM) return;
		const col = coords.col;
		const tmp = document.getElementById(`${row}-${col}`);
		tmp.style.backgroundColor = backgroundColor;
		tmp.style.outline = "1px solid #ccc";
		block_occupied[row][col] = true;
	})

}

const checkIfBlockMetTheBottom = () => {
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	let result = false;
	coloredBlocks.forEach( coords => {
		const row = coords.row;
		if (row >= HEIGHT - UNSEENAREA_BOTTOM - 1) {
			result = true;
			return;
		}
	});
	return result;
}

const coordIsInSet = (set, coord) => {
	let result = false;
	set.forEach(item => {
		if (item.row == coord.row && item.col == coord.col) {
			result = true;
			return;
		}
	});
	return result;
}

const otherBlockIsBlockingPathAtBelow = () => {
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	let result = false;
	let coloredBlockCoordSet = new Set();
	coloredBlocks.forEach(coords => coloredBlockCoordSet.add(coords));
	coloredBlocks.forEach( coords => {
		const row = coords.row;
		const col = coords.col;
		const tmp = new Coordinate(row + 1, col);
		if (!coordIsInSet(coloredBlockCoordSet, tmp)) {
			if (block_occupied[row + 1][col]) {
				result = true;
				return;
			}
		}
	});

	return result;
}

const otherBlockIsBlockingPathAtLeft = () => {
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	let result = false;
	let coloredBlockCoordSet = new Set();
	coloredBlocks.forEach(coords => coloredBlockCoordSet.add(coords));
	coloredBlocks.forEach( coords => {
		const row = coords.row;
		const col = coords.col;
		const tmp = new Coordinate(row, col - 1);
		if (!coordIsInSet(coloredBlockCoordSet, tmp)) {
			if (block_occupied[row][col - 1]) {
				result = true;
				return;
			}
		}
	});
	return result;
}

const otherBlockIsBlockingPathAtRight = () => {
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	let result = false;
	let coloredBlockCoordSet = new Set();
	coloredBlocks.forEach(coords => coloredBlockCoordSet.add(coords));
	coloredBlocks.forEach( coords => {
		const row = coords.row;
		const col = coords.col;
		const tmp = new Coordinate(row, col + 1);
		if (!coordIsInSet(coloredBlockCoordSet, tmp)) {
			if (block_occupied[row][col + 1]) {
				result = true;
				return;
			}
		}
	});
	return result;
}

const deleteBlock = (row, col) => {
	const mat = document.getElementById(`${row}-${col}`);
	mat.style.backgroundColor = "white";
	block_occupied[row][col] = false;
}

const occupyBlock = (row, col) => {
	const mat = document.getElementById(`${row}-${col}`);
	mat.style.backgroundColor = "gray";
	block_occupied[row][col] = true;
}

const sleep = (num) => {
	let now = new Date();
	let stop = now.getTime() + num;
	while (now.getTime() < stop) {
		now = new Date();
	}
}

const clearRow = (rowNumber) => {
	for (let col = UNSEENAREA_SIDE ; col < WIDTH - UNSEENAREA_SIDE ; col++) {
		deleteBlock(rowNumber, col);
	}
}

const cannot_go_down_more = function() {
	let result = false;
	if (checkIfBlockMetTheBottom()) return true;
	if (otherBlockIsBlockingPathAtBelow()) return true;
	return result;
}

const switchNextBlockToCurblock = () => {
	currentBlockType = nextBlockType;
	nextBlockType = makeRandomNumRange0_6();
	currentBlock = new CurrentBlock(currentBlockType, selectBlockStartCol());
}

const deleteFullRow = () => {
	let clearedRowNumber = 0;
	for (let row = HEIGHT - UNSEENAREA_BOTTOM - 1 ; row >= UNSEENAREA_BOTTOM + 1; row--) {
		let rowFull = true;
		for (let col = UNSEENAREA_SIDE ; col < WIDTH - UNSEENAREA_SIDE ; col++) {
			if (block_occupied[row][col] == false) {
				rowFull = false;
				break;
			}
		}
		if (rowFull) {
			clearRow(row);
			clearedRowNumber += 1;
		}
	}
	return clearedRowNumber;
}

const pullDownGrayBlocks = (dropLength) => {
	for (let row = HEIGHT - UNSEENAREA_BOTTOM - 1 - dropLength; row >= UNSEENAREA_BOTTOM + 1; row--) {
		for (let col = UNSEENAREA_SIDE ; col < WIDTH - UNSEENAREA_SIDE ; col++) {
			if (block_occupied[row][col] == true) {
				deleteBlock(row, col);
				occupyBlock(row + dropLength , col);
			}
		}
	}
}

const updateScore = () => {
	const deletedRowNumber = deleteFullRow();
	if (deletedRowNumber > 0) {
		pullDownGrayBlocks(deletedRowNumber);
		SCORE += deletedRowNumber;
		changeScoreText();
	}
}


const changeScoreText = () => {
	const title = document.querySelector('.score > p');
	title.innerText = String(SCORE);
}

const intervalTasks = function() {
	if (cannot_go_down_more()) {
		currentBlock.block.changeBackgroundColor('gray');
		updateScore();
		switchNextBlockToCurblock();
		clearNextBox();
		printNextBlock();
		printCurrentBlockOnGraph();
	}
	dropBlock();
}

let block_occupied = initialize_matrix();
buildMatrix_addId();
buildNextBlockBox();

let currentBlockType = makeRandomNumRange0_6();
let currentBlock = new CurrentBlock(currentBlockType, selectBlockStartCol());
let nextBlockType = makeRandomNumRange0_6();

document.addEventListener("keydown", dealWithKeyboard, false);

printNextBlock();

printCurrentBlockOnGraph();

let blockDropIntervalId = setInterval(intervalTasks, BLOCK_DROP_SPEED);


/*
구현할 기능
1. 충돌 판단 	
	1. 바닥 				   - *
	2. 다른 블록				- *								
2. 일정시간 지나면 블록 하강 		- *
3. 블록 배치  					- *
4. 블록 회전					- *
5. 블록 프로토타입 구현			   - *
6. 키보드 입력에 따라 블록 이동	     - *
7. 블록 바닥에 닿을시 쌓아놓기		 - *
8. 넥스트 블록 -> 현재 블록, 새로운 넥스트 블록 - *
9. 스페이스바 기능				  - *
*/