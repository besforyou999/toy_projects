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

buildMatrix_addId();
