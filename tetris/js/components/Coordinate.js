export class Coordinate {
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
