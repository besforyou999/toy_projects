class Block {
	constructor(UNSEENAREA_SIDE, UNSEENAREA_BOTTOM, WIDTH, HEIGHT) {
		this.UNSEENAREA_SIDE = UNSEENAREA_SIDE;
        this.UNSEENAREA_BOTTOM = UNSEENAREA_BOTTOM;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
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
			if (coord.col <= this.UNSEENAREA_SIDE) return;
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
		if (this.block[0][2].col == this.WIDTH - 1) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.col == this.WIDTH - this.UNSEENAREA_SIDE - 1) return;
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
		if (this.block[2][0].row == this.HEIGHT - 1) return;
		for (let i = 0 ; i < 4 ; i++) {
			let coord = this.coloredBlock[i];
			if (coord.row >= this.HEIGHT - this.UNSEENAREA_BOTTOM - 1) return;
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
		if (this.block[0][0].col <= this.UNSEENAREA_SIDE){
			return this.UNSEENAREA_SIDE - this.block[0][0].col;
		} 
		// right
		if (this.block[0][this.blockBoxWidth - 1].col >= this.WIDTH - this.UNSEENAREA_SIDE - 1) { 
			return this.WIDTH - this.UNSEENAREA_SIDE - 1 - this.block[0][this.blockBoxWidth - 1].col;
		}
		return;
	}

	boxShadedLengthAtBelow() {
		// below
		if (this.block[this.blockBoxWidth - 1][0].row >= this.HEIGHT - this.UNSEENAREA_BOTTOM - 1) {
			return this.block[this.blockBoxWidth - 1][0].row - (this.HEIGHT - this.UNSEENAREA_BOTTOM - 1);
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