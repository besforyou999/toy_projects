const WIDTH = 18;
const HEIGHT = 27;
const UNSEENAREA_SIDE = 3;
const UNSEENAREA_TOP = 4;
const UNSEENAREA_BOTTOM = 3;

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

class Block {
	constructor() {
		this.blockDir = 0;
		this.block;
		this.coloredBlock;
	}
}

class IBlock {
	block = create2DArray(4, 4);
	coloredBlock = new Array(4);
	blockDir = 0;
	constructor(startCol) {
		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0] = [i, startCol - 1];
			this.block[i][1] = [i, startCol];
			this.block[i][2] = [i, startCol + 1];
			this.block[i][3] = [i, startCol + 2];
			this.coloredBlock[i] = [i, startCol];
		}
	}
	
	spinDir() {
		blockDir = blockDir + 1 > 3 ? 0 : blockDir + 1;
		switch(blockDir) {
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
				this.coloredBlock[0] = this.block[2][0];
				this.coloredBlock[1] = this.block[2][1];
				this.coloredBlock[2] = this.block[2][2];
				this.coloredBlock[3] = this.block[2][3];
				break;
			}
		}
	}

	moveLeft() {
		// check validity
		if (this.block[0][0][1] == 0) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == UNSEENAREA_SIDE) return;
		});

		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0][1] -= 1;
			this.block[i][1][1] -= 1;
			this.block[i][2][1] -= 1;
			this.block[i][3][1] -= 1;
			this.coloredBlock[i][1] -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][3][1] == WIDTH - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == WIDTH - UNSEENAREA_SIDE) return;
		});

		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0][1] += 1;
			this.block[i][1][1] += 1;
			this.block[i][2][1] += 1;
			this.block[i][3][1] += 1;
			this.coloredBlock[i][1] += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[3][0][0] == HEIGHT - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == HEIGHT - UNSEENAREA_BOTTOM) return;
		});
		for (let i = 0 ; i < 4 ; i++) {
			this.block[i][0][0] += 1;
			this.block[i][1][0] += 1;
			this.block[i][2][0] += 1;
			this.block[i][3][0] += 1;
			this.coloredBlock[i][0] += 1;
		}
	}
}

class OBlock {
	block = create2DArray(2, 2);
	coloredBlock = new Array(4);
	blockDir = 0;
	startingRow = 2;
	constructor(startCol) {
		this.block[0][0] = this.coloredBlock[0] = [this.startingRow, startCol];
		this.block[0][1] = this.coloredBlock[1] = [this.startingRow, startCol + 1];
		this.block[1][0] = this.coloredBlock[2] = [this.startingRow + 1, startCol];
		this.block[1][1] = this.coloredBlock[3] = [this.startingRow + 1, startCol + 1];
	}

	spinDir() {
		// nothing to do
	}

	moveLeft() {
		// check validity
		if (this.block[0][0][1] == UNSEENAREA_SIDE) return;
		this.block[0][0][1] -= 1;
		this.block[0][1][1] -= 1;
		this.block[1][0][1] -= 1;
		this.block[1][1][1] -= 1;
		this.coloredBlock[0] = this.block[0][0];
		this.coloredBlock[1] = this.block[0][1];
		this.coloredBlock[2] = this.block[1][0];
		this.coloredBlock[3] = this.block[1][1];
	}
	
	moveRight() {
		if (this.block[0][1][1] == WIDTH - UNSEENAREA_SIDE) return;
		this.block[0][0][1] += 1;
		this.block[0][1][1] += 1;
		this.block[1][0][1] += 1;
		this.block[1][1][1] += 1;
		this.coloredBlock[0] = this.block[0][0];
		this.coloredBlock[1] = this.block[0][1];
		this.coloredBlock[2] = this.block[1][0];
		this.coloredBlock[3] = this.block[1][1];
	}

	moveDown() {
		if (this.block[1][0][0] == HEIGHT - UNSEENAREA_BOTTOM) return;
		this.block[0][0][0] += 1;
		this.block[0][1][0] += 1;
		this.block[1][0][0] += 1;
		this.block[1][1][0] += 1;
		this.coloredBlock[0] = this.block[0][0];
		this.coloredBlock[1] = this.block[0][1];
		this.coloredBlock[2] = this.block[1][0];
		this.coloredBlock[3] = this.block[1][1];
	}
}

class ZBlock {
	block = create2DArray(3, 3);
	coloredBlock = new Array(4);
	blockDir = 0;
	constructor(startCol) {
		for (let i = 1 ; i <= 3 ; i++) {
			this.block[i - 1][0] = [i, startCol - 1];
			this.block[i - 1][1] = [i, startCol];
			this.block[i - 1][2] = [i, startCol + 1];
		}
		this.coloredBlock[0] = [2, startCol - 1];
		this.coloredBlock[1] = [2, startCol];
		this.coloredBlock[2] = [3, startCol];
		this.coloredBlock[3] = [3, startCol + 1];
	}
	
	spinDir() {
		blockDir = blockDir + 1 > 3 ? 0 : blockDir + 1;
		switch(blockDir) {
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
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][0];
				this.coloredBlock[3] = this.block[2][0];
				break;
			}
		}
	}

	moveLeft() {
		// check validity
		if (this.block[0][0][1] == 0) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] -= 1;
			this.block[i][1][1] -= 1;
			this.block[i][2][1] -= 1;
			this.coloredBlock[i][1] -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][2][1] == WIDTH - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == WIDTH - UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] += 1;
			this.block[i][1][1] += 1;
			this.block[i][2][1] += 1;
			this.coloredBlock[i][1] += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[2][0][0] == HEIGHT - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == HEIGHT - UNSEENAREA_BOTTOM) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][0] += 1;
			this.block[i][1][0] += 1;
			this.block[i][2][0] += 1;
			this.coloredBlock[i][0] += 1;
		}
	}
}

class SBlock {
	block = create2DArray(3, 3);
	coloredBlock = new Array(4);
	blockDir = 0;
	startingRow = 2;
	constructor(startCol) {
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0] = [i, startCol - 1];
			this.block[i][1] = [i, startCol];
			this.block[i][2] = [i, startCol + 1];
		}
		this.coloredBlock[0] = [this.startingRow, startCol];
		this.coloredBlock[1] = [this.startingRow, startCol + 1];
		this.coloredBlock[2] = [this.startingRow + 1, startCol - 1];
		this.coloredBlock[3] = [this.startingRow + 1, startCol];
	}
	
	spinDir() {
		blockDir = blockDir + 1 > 3 ? 0 : blockDir + 1;
		switch(blockDir) {
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
				this.coloredBlock[0] = this.block[2][0];
				this.coloredBlock[1] = this.block[2][1];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[1][2];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[0][0];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[2][1];
				break;
			}
		}
	}

	moveLeft() {
		// check validity
		if (this.block[0][0][1] == 0) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] -= 1;
			this.block[i][1][1] -= 1;
			this.block[i][2][1] -= 1;
			this.coloredBlock[i][1] -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][2][1] == WIDTH - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == WIDTH - UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] += 1;
			this.block[i][1][1] += 1;
			this.block[i][2][1] += 1;
			this.coloredBlock[i][1] += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[2][0][0] == HEIGHT - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == HEIGHT - UNSEENAREA_BOTTOM) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][0] += 1;
			this.block[i][1][0] += 1;
			this.block[i][2][0] += 1;
			this.coloredBlock[i][0] += 1;
		}
	}
}

class JBlock {
	block = create2DArray(3, 3);
	coloredBlock = new Array(4);
	blockDir = 0;
	startingRow = 1;
	constructor(startCol) {
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0] = [i, startCol - 1];
			this.block[i][1] = [i, startCol];
			this.block[i][2] = [i, startCol + 1];
		}
		this.coloredBlock[0] = [this.startingRow, startCol];
		this.coloredBlock[1] = [this.startingRow + 1, startCol];
		this.coloredBlock[2] = [this.startingRow + 2, startCol - 1];
		this.coloredBlock[3] = [this.startingRow + 2, startCol];
	}
	
	spinDir() {
		blockDir = blockDir + 1 > 3 ? 0 : blockDir + 1;
		switch(blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[2][1];
				this.coloredBlock[3] = this.block[2][0];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[0][0];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[1][2];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[0][2];
				this.coloredBlock[1] = this.block[0][1];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[2][1];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[1][0];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][2];
				this.coloredBlock[3] = this.block[2][2];
				break;
			}
		}
	}

	moveLeft() {
		// check validity
		if (this.block[0][0][1] == 0) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] -= 1;
			this.block[i][1][1] -= 1;
			this.block[i][2][1] -= 1;
			this.coloredBlock[i][1] -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][2][1] == WIDTH - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == WIDTH - UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] += 1;
			this.block[i][1][1] += 1;
			this.block[i][2][1] += 1;
			this.coloredBlock[i][1] += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[2][0][0] == HEIGHT - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == HEIGHT - UNSEENAREA_BOTTOM) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][0] += 1;
			this.block[i][1][0] += 1;
			this.block[i][2][0] += 1;
			this.coloredBlock[i][0] += 1;
		}
	}
}

class LBlock {
	block = create2DArray(3, 3);
	coloredBlock = new Array(4);
	blockDir = 0;
	startingRow = 1;
	constructor(startCol) {
		for (let i = 1 ; i <= 3 ; i++) {
			this.block[i - 1][0] = [i, startCol - 1];
			this.block[i - 1][1] = [i, startCol];
			this.block[i - 1][2] = [i, startCol + 1];
		}
		this.coloredBlock[0] = [this.startingRow, startCol];
		this.coloredBlock[1] = [this.startingRow + 1, startCol];
		this.coloredBlock[2] = [this.startingRow + 2, startCol];
		this.coloredBlock[3] = [this.startingRow + 2, startCol + 1];
	}
	
	spinDir() {
		blockDir = blockDir + 1 > 3 ? 0 : blockDir + 1;
		switch(blockDir) {
			case 0: {
				this.coloredBlock[0] = this.block[0][1];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[2][1];
				this.coloredBlock[3] = this.block[2][2];
				break;
			}
			case 1: {
				this.coloredBlock[0] = this.block[2][0];
				this.coloredBlock[1] = this.block[1][0];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[1][2];
				break;
			} 
			case 2: {
				this.coloredBlock[0] = this.block[0][0];
				this.coloredBlock[1] = this.block[0][1];
				this.coloredBlock[2] = this.block[1][1];
				this.coloredBlock[3] = this.block[2][1];
				break;
			} 
			case 3: {
				this.coloredBlock[0] = this.block[1][0];
				this.coloredBlock[1] = this.block[1][1];
				this.coloredBlock[2] = this.block[1][2];
				this.coloredBlock[3] = this.block[2][0];
				break;
			}
		}
	}

	moveLeft() {
		// check validity
		if (this.block[0][0][1] == 0) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] -= 1;
			this.block[i][1][1] -= 1;
			this.block[i][2][1] -= 1;
			this.coloredBlock[i][1] -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][2][1] == WIDTH - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == WIDTH - UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] += 1;
			this.block[i][1][1] += 1;
			this.block[i][2][1] += 1;
			this.coloredBlock[i][1] += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[2][0][0] == HEIGHT - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == HEIGHT - UNSEENAREA_BOTTOM) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][0] += 1;
			this.block[i][1][0] += 1;
			this.block[i][2][0] += 1;
			this.coloredBlock[i][0] += 1;
		}
	}
}

class TBlock {
	block = create2DArray(3, 3);
	coloredBlock = new Array(4);
	blockDir = 0;
	startingRow = 2;
	constructor(startCol) {
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0] = [i, startCol - 1];
			this.block[i][1] = [i, startCol];
			this.block[i][2] = [i, startCol + 1];
		}
		this.coloredBlock[0] = [this.startingRow, startCol - 1];
		this.coloredBlock[1] = [this.startingRow, startCol];
		this.coloredBlock[2] = [this.startingRow + 1, startCol];
		this.coloredBlock[3] = [this.startingRow, startCol + 1];
	}
	
	spinDir() {
		blockDir = blockDir + 1 > 3 ? 0 : blockDir + 1;
		switch(blockDir) {
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

	moveLeft() {
		// check validity
		if (this.block[0][0][1] == 0) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] -= 1;
			this.block[i][1][1] -= 1;
			this.block[i][2][1] -= 1;
			this.coloredBlock[i][1] -= 1;
		}
	}

	moveRight() {
		// check validity
		if (this.block[0][2][1] == WIDTH - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == WIDTH - UNSEENAREA_SIDE) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][1] += 1;
			this.block[i][1][1] += 1;
			this.block[i][2][1] += 1;
			this.coloredBlock[i][1] += 1;
		}
	}

	moveDown() {
		// check validity
		if (this.block[2][0][0] == HEIGHT - 1) return;
		this.coloredBlock.forEach(coord => {
			if (coord[1] == HEIGHT - UNSEENAREA_BOTTOM) return;
		});
		for (let i = 0 ; i < 3 ; i++) {
			this.block[i][0][0] += 1;
			this.block[i][1][0] += 1;
			this.block[i][2][0] += 1;
			this.coloredBlock[i][0] += 1;
		}
	}
}

class CurrentBlock {
	block;
	blockType = -1;
	blockSpinDirection = 0;
	backgroundColor = "undefined";
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

function dealWithKeyboard(event) {
	console.log(event.key);
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

const colorBlock = function(idx) {
	const block = document.getElementById(idx);
	block.style.backgroundColor = currentBlock.backgroundColor;
	block.style.outline = "1px solid #ccc";
	block_occupied[idx] = true;
}

const resetBlock = function(idx) {
	const block = document.getElementById(idx);
	block.style.backgroundColor = "white";
	block.style.outline = "1px solid #ccc";
	block_occupied[idx] = false;
}

const deletePrevPos = function() {
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	coloredBlocks.forEach( coords => {
		const row = coords[0];
		const col = coords[1];
		const tmp = document.getElementById(`${row}-${col}`);
		tmp.style.backgroundColor = "white";
		tmp.style.outline = "1px solid #ccc";
		block_occupied[row][col] = false;
	})
}

const moveBlockCoords = function() {
	const blockObj 			= currentBlock.block;
	const coloredBlocks 	= blockObj.coloredBlock;
	const blocks			= blockObj.block;

	coloredBlocks.forEach( coords => { coords[0] += 1; });
	blocks.forEach( coords => { coords[0] += 1; });
}

const dropBlock = function() {
	// 1. 이전 위치 일괄 제거
	deletePrevPos();
	// 2. 이동
	moveBlockCoords();
	// 3. 현재 블록 그래프에 그리기
	printCurrentBlockOnGraph();
}

const printCurrentBlockOnGraph = () => {
	const blockObj 			= currentBlock.block;
	const backgroundColor 	= currentBlock.backgroundColor;
	const coloredBlocks 	= blockObj.coloredBlock;

	coloredBlocks.forEach( coords => {
		const row = coords[0];
		const col = coords[1];
		const tmp = document.getElementById(`${row}-${col}`);
		tmp.style.backgroundColor = backgroundColor;
		tmp.style.outline = "1px solid #ccc";
		block_occupied[row][col] = true;
	})

}

const cannot_go_down_more = function() {
	// 1. check if coloredblock met the bottom
	
	
}

const intervalTasks = function() {
	dropBlock();
	/*
	if (cannot_go_down_more()) {
		clearInterval(blockDropIntervalId);
	}
	*/
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

const blockDropIntervalId = setInterval(intervalTasks, 3000);


/*
구현할 기능
1. 충돌 판단
2. 일정시간 지나면 블록 하강
3. 블록 배치
4. 블록 회전
5. 넥스트 블록 -> 현재 블록 / 새로운 넥스트 블록
*/