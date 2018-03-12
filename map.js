const map = {
	territories: document.getElementsByClassName("territory"),
	activeTerritories: [],
	count: 0,
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
		}
	},
	checkActive(territory) {
		if (this.activeTerritories.includes(territory)) {
			if (territory.id === this.currentTerritory) {
				territory.style.fill = this.colorAssign();
				this.activeTerritories.splice(this.activeTerritories.indexOf(territory), 1);
				this.score.numerator += (3 - this.count);
				this.score.denominator += 3;
				this.score.update();
				(this.activeTerritories.length) ? this.random() : this.finish();
			} else {
				this.count++;
				this.notes.innerHTML = `That was ${this.keyMap[territory.id][this.type]}`;
				this.notes.style.transitionDuration = "2s";
				this.notes.style.opacity = 0;
				setTimeout( () => {
					this.notes.innerHTML = "";
					this.notes.style.transitionDuration = "0s";
					this.notes.style.opacity = 1;
				}, 2000);
				if (this.count === 3) this.checkActive(document.getElementById(this.currentTerritory));
			}
		}
	},
	finish() {
		this.current.innerHTML = "Done!";
	},
	random() {
		this.currentTerritory = this.activeTerritories[Math.floor(Math.random() * this.activeTerritories.length)].id;
		this.current.innerHTML = this.keyMap[this.currentTerritory][this.type];
		this.count = 0;
	},
	colorAssign() {
		return (this.count < 1) ? "#009900" : (this.count < 2) ? "#ff5400" : (this.count < 3) ? "#c60000" : "#111";
	},
	keyMap: {
		AL: {
			name: "ALABAMA",
			capital: "Montgomery",
			nicknames: []
		},
		AK: {
			name: "ALASKA",
			capital: "Juneau",
			nicknames: []
		},
		AZ: {
			name: "ARIZONA",
			capital: "Phoenix",
			nicknames: []
		}, 
		AR: {
			name: "ARKANSAS",
			capital: "Little Rock",
			nicknames: []
		},
		CA: {
			name: "CALIFORNIA",
			capital: "Sacramento",
			nicknames: []
		},
		CO: {
			name: "COLORADO",
			capital: "Denver",
			nicknames: []
		},
		CT: {
			name: "CONNECTICUT",
			capital: "Hartford",
			nicknames: []
		},
		DE: {
			name: "DELAWARE",
			capital: "Dover",
			nicknames: []
		},
		FL: {
			name: "FLORIDA",
			capital: "Tallahassee",
			nicknames: []
		},
		GA: {
			name: "GEORGIA",
			capital: "Atlanta",
			nicknames: []
		},
		HI: {
			name: "HAWAII",
			capital: "Honolulu",
			nicknames: []
		},
		ID: {
			name: "IDAHO",
			capital: "Boise",
			nicknames: []
		},
		IL: {
			name: "ILLINOIS",
			capital: "Springfield",
			nicknames: []
		},
		IN: {
			name: "INDIANA",
			capital: "Indianapolis",
			nicknames: []
		},
		IA: {
			name: "IOWA",
			capital: "Des Moines",
			nicknames: []
		},
		KS: {
			name: "KANSAS",
			capital: "Topeka",
			nicknames: []
		},
		KY: {
			name: "KENTUCKY",
			capital: "Frankfort",
			nicknames: []
		},
		LA: {
			name: "LOUISIANA",
			capital: "Baton Rouge",
			nicknames: []
		},
		ME: {
			name: "MAINE",
			capital: "Augusta",
			nicknames: []
		},
		MD: {
			name: "MARYLAND",
			capital: "Annapolis",
			nicknames: []
		},
		MA: {
			name: "MASSACHUSETTS",
			capital: "Boston",
			nicknames: []
		},
		MI: {
			name: "MICHIGAN",
			capital: "Lansing",
			nicknames: []
		},
		MN: {
			name: "MINNESOTA",
			capital: "St. Paul",
			nicknames: []
		},
		MS: {
			name: "MISSISSIPPI",
			capital: "St. Paul",
			nicknames: []
		},
		MO: {
			name: "MISSOURI",
			capital: "Jefferson City",
			nicknames: []
		},
		MT: {
			name: "MONTANA",
			capital: "Helena",
			nicknames: []
		},
		NE: {
			name: "NEBRASKA",
			capital: "Lincoln",
			nicknames: []
		},
		NV: {
			name: "NEVADA",
			capital: "Carson City",
			nicknames: []
		},
		NH: {
			name: "NEW HAMPSHIRE",
			capital: "Concord",
			nicknames: []
		},
		NJ: {
			name: "NEW JERSEY",
			capital: "Trenton",
			nicknames: []
		},
		NM: {
			name: "NEW MEXICO",
			capital: "Santa Fe",
			nicknames: []
		},
		NY: {
			name: "NEW YORK",
			capital: "Albany",
			nicknames: []
		},
		NC: {
			name: "NORTH CAROLINA",
			capital: "Raleigh",
			nicknames: []
		},
		ND: {
			name: "NORTH DAKOTA",
			capital: "Bismarck",
			nicknames: []
		},
		OH: {
			name: "OHIO",
			capital: "Columbus",
			nicknames: []
		},
		OK: {
			name: "OKLAHOMA",
			capital: "Oklahoma City",
			nicknames: []
		},
		OR: {
			name: "OREGON",
			capital: "Salem",
			nicknames: []
		},
		PA: {
			name: "PENNSYLVANIA",
			capital: "Harrisburg",
			nicknames: []
		},
		RI: {
			name: "RHODE ISLAND",
			capital: "Providence",
			nicknames: []
		},
		SC: {
			name: "SOUTH CAROLINA",
			capital: "Columbia",
			nicknames: []
		},
		SD: {
			name: "SOUTH DAKOTA",
			capital: "Pierre",
			nicknames: []
		},
		TN: {
			name: "TENNESSEE",
			capital: "Nashville",
			nicknames: []
		},
		TX: {
			name: "TEXAS",
			capital: "Austin",
			nicknames: []
		},
		UT: {
			name: "UTAH",
			capital: "Salt Lake City",
			nicknames: []
		},
		VT: {
			name: "VERMONT",
			capital: "Montpelier",
			nicknames: []
		},
		VA: {
			name: "VIRGINIA",
			capital: "Richmond",
			nicknames: []
		},
		WA: {
			name: "WASHINGTON",
			capital: "Olympia",
			nicknames: []
		},
		WV: {
			name: "WEST VIRGINIA",
			capital: "Charleston",
			nicknames: []
		},
		WI: {
			name: "WISCONSIN",
			capital: "Madison",
			nicknames: []
		},
		WY: {
			name: "WYOMING",
			capital: "Cheyenne",
			nicknames: []
		}
	}
};

map.activeTerritories.push(...map.territories);
map.random();

