const map = {
	territories: document.getElementsByClassName("territory"),
	activeTerritories: [],
	count: 0,
	last: null,
	notes: document.getElementById('notes'),
	type: "name",
	current: document.getElementById("current"),
	currentTerritory: null,
	score: {
		text: document.getElementById('score'),
		numerator: 0,
		denominator: 0,
		update() {
			this.text.innerHTML = `${((this.numerator / this.denominator) * 100).toFixed(2)}%`;
		},
		clear() {
			this.text.innerHTML = "";
		}
	},
	checkActive(territory) {
		if (this.activeTerritories.includes(territory) && this.last != territory) {
			this.last = territory
			if (territory.id === this.currentTerritory) {
				if (this.activeTerritories.length === 50) this.disableButtons();
				territory.classList.remove("basic");
				territory.classList.add(this.colorAssign());
				this.activeTerritories.splice(this.activeTerritories.indexOf(territory), 1);
				this.score.numerator += (3 - this.count);
				this.score.denominator += 3;
				this.score.update();
				(this.activeTerritories.length) ? this.random() : this.finish();
			} else {
				this.count++;
				this.updateNotes(((this.type === "nickname") ? this.keyMap[territory.id][this.type]() : this.keyMap[territory.id][this.type]));
				if (this.count === 3) this.checkActive(document.getElementById(this.currentTerritory));
			}
		} else {
			this.updateNotes(((this.type === "nickname") ? this.keyMap[territory.id][this.type]() : this.keyMap[territory.id][this.type]));
		}
	},
	updateNotes(text) {
		this.notes.innerHTML = `That one was ${text}`;
		this.notes.style.transitionDuration = "1s";
		this.notes.style.opacity = 0;
		setTimeout(() => {
			this.notes.innerHTML = "";
			this.notes.style.transitionDuration = "0s";
			this.notes.style.opacity = 1;
		}, 1000);
	},
	updateType(type) {
		this.type = type;
	},
	finish() {
		this.current.innerHTML = "Done!";
	},
	random() {
		this.currentTerritory = this.activeTerritories[Math.floor(Math.random() * this.activeTerritories.length)].id;
		this.current.innerHTML = (this.type == "nickname") ? this.keyMap[this.currentTerritory][this.type]() : this.keyMap[this.currentTerritory][this.type];
		this.count = 0;
	},
	colorAssign() {
		return (this.count < 1) ? "green" : (this.count < 2) ? "orange" : (this.count < 3) ? "red" : "black";
	},
	reset() {
		this.activeTerritories = [...this.territories];
		Array.from(document.getElementsByTagName('path')).forEach((territory) => {
			territory.classList.remove("green", "orange", "red", "black");
			territory.classList.add("basic");
			territory.mouseenter = () => {
				territory.classList.remove("basic");
				territory.classList.add("hovered");
			}
			territory.mouseleave = () => {
				territory.classList.remove("hovered");
				territory.classList.add("basic");
			};
		});
		this.score.clear();
		Array.from(document.getElementsByClassName("option")).forEach((btn) => btn.removeAttribute("disabled"));
	},
	disableButtons() {
		Array.from(document.getElementsByClassName("option")).forEach((btn) => btn.setAttribute("disabled", true));
	},
	keyMap: null
};

document.getElementById("type-names").onclick = () => {
	if (map.type != "name") map.updateType('name');
	map.random();
}
document.getElementById("type-capitals").onclick = () => {
	if (map.type != "capital") map.updateType('capital');
	map.random();
}
document.getElementById("type-nicknames").onclick = () => {
	if (map.type != "nickname") map.updateType('nickname');
	map.random();
}

document.getElementById("reset").onclick = () => {
	map.reset();
	map.random();
}

function getMapData() {
	console.log('called')
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			console.log(xhr.response)
			map.keyMap = JSON.parse(xhr.response)[0].region;
			map.random();
			for (var key in map.keyMap) {
				map.keyMap[key].nickname = function() {
			        return this.nicknames[Math.floor(Math.random() * this.nicknames.length)];
			    }.bind(map.keyMap[key]);
			}
		}
	}
	xhr.open("GET", "http://localhost:3000/us");
	xhr.send();
}

getMapData();

map.activeTerritories.push(...map.territories);
map.activeTerritories.forEach((territory) => territory.onclick = () => map.checkActive(territory));
