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
	keyMap: {
		AL: {
			name: "ALABAMA",
			capital: "Montgomery",
			nicknames: ["Yellowhammer State", "Heart of Dixie", "Cotton State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		AK: {
			name: "ALASKA",
			capital: "Juneau",
			nicknames: ["The Last Frontier", "Land of the Midnight Sun"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		AZ: {
			name: "ARIZONA",
			capital: "Phoenix",
			nicknames: ["The Baby State", "Copper State", "Grand Canyon State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		}, 
		AR: {
			name: "ARKANSAS",
			capital: "Little Rock",
			nicknames: ["Land of Opportunity", "The Natural State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		CA: {
			name: "CALIFORNIA",
			capital: "Sacramento",
			nicknames: ["The Golden State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		CO: {
			name: "COLORADO",
			capital: "Denver",
			nicknames: ["Columbine State", "Centennial State", "Rocky Mountain Empire", "Mother of Rivers"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		CT: {
			name: "CONNECTICUT",
			capital: "Hartford",
			nicknames: ["Constitution State", "Provision State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		DE: {
			name: "DELAWARE",
			capital: "Dover",
			nicknames: ["The First State", "Diamond State", "Chemical Capital of the World", "Corporate Capital"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		FL: {
			name: "FLORIDA",
			capital: "Tallahassee",
			nicknames: ["Sunshine State", "Orange State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		GA: {
			name: "GEORGIA",
			capital: "Atlanta",
			nicknames: ["Peach State", "Empire State of the South","The Goober State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		HI: {
			name: "HAWAII",
			capital: "Honolulu",
			nicknames: ["Aloha State", "Pineapple State", "Paradise of the Pacific"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		ID: {
			name: "IDAHO",
			capital: "Boise",
			nicknames: ["Gem State", "Spud State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		IL: {
			name: "ILLINOIS",
			capital: "Springfield",
			nicknames: ["Land of Lincoln", "Prairie State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		IN: {
			name: "INDIANA",
			capital: "Indianapolis",
			nicknames: ["Hoosier State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		IA: {
			name: "IOWA",
			capital: "Des Moines",
			nicknames: ["Hawkeye State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		KS: {
			name: "KANSAS",
			capital: "Topeka",
			nicknames: ["Sunflower State", "Wheat State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		KY: {
			name: "KENTUCKY",
			capital: "Frankfort",
			nicknames: ["Bluegrass State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		LA: {
			name: "LOUISIANA",
			capital: "Baton Rouge",
			nicknames: ["Bayou State", "Sportsman's Paradise"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		ME: {
			name: "MAINE",
			capital: "Augusta",
			nicknames: ["Vacationland", "Pine Tree State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		MD: {
			name: "MARYLAND",
			capital: "Annapolis",
			nicknames: ["America in Miniature", "Old Line State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		MA: {
			name: "MASSACHUSETTS",
			capital: "Boston",
			nicknames: ["The Bay State", "The Spirit of America"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		MI: {
			name: "MICHIGAN",
			capital: "Lansing",
			nicknames: ["The Great Lakes State", "Water-Winter Wonderland"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		MN: {
			name: "MINNESOTA",
			capital: "St. Paul",
			nicknames: ["North Star State", "Land of 10,000 Lakes"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		MS: {
			name: "MISSISSIPPI",
			capital: "St. Paul",
			nicknames: ["Hospitality State", "The Birthplace of America's Music"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		MO: {
			name: "MISSOURI",
			capital: "Jefferson City",
			nicknames: ["Show-Me State", "Bullion State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		MT: {
			name: "MONTANA",
			capital: "Helena",
			nicknames: ["Treasure State", "The Last Best Place"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		NE: {
			name: "NEBRASKA",
			capital: "Lincoln",
			nicknames: ["Cornhusker State", "Beef State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		NV: {
			name: "NEVADA",
			capital: "Carson City",
			nicknames: ["Silver State","Battle Born State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		NH: {
			name: "NEW HAMPSHIRE",
			capital: "Concord",
			nicknames: ["Granite State", "The Live Free or Die State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		NJ: {
			name: "NEW JERSEY",
			capital: "Trenton",
			nicknames: ["The Crossroads of the Revolution", "Garden State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		NM: {
			name: "NEW MEXICO",
			capital: "Santa Fe",
			nicknames: ["Land of Enchantment"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		NY: {
			name: "NEW YORK",
			capital: "Albany",
			nicknames: ["Empire State", "Excelsior State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		NC: {
			name: "NORTH CAROLINA",
			capital: "Raleigh",
			nicknames: ["First in Flight State", "First in Freedom"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		ND: {
			name: "NORTH DAKOTA",
			capital: "Bismarck",
			nicknames: ["Peace Garden State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		OH: {
			name: "OHIO",
			capital: "Columbus",
			nicknames: ["The Heart Of It All", "Birthplace of Aviation"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		OK: {
			name: "OKLAHOMA",
			capital: "Oklahoma City",
			nicknames: ["Native America", "Sooner State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		OR: {
			name: "OREGON",
			capital: "Salem",
			nicknames: ["Beaver State", "Pacific Wonderland"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		PA: {
			name: "PENNSYLVANIA",
			capital: "Harrisburg",
			nicknames: ["Keystone State", "Quaker State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		RI: {
			name: "RHODE ISLAND",
			capital: "Providence",
			nicknames: ["Ocean State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		SC: {
			name: "SOUTH CAROLINA",
			capital: "Columbia",
			nicknames: ["The Palmetto State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		SD: {
			name: "SOUTH DAKOTA",
			capital: "Pierre",
			nicknames: ["The Mount Rushmore State", "Coyote State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		TN: {
			name: "TENNESSEE",
			capital: "Nashville",
			nicknames: ["Volunteer State", "The Mother of Southwestern Statesmen"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		TX: {
			name: "TEXAS",
			capital: "Austin",
			nicknames: ["Lone Star State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		UT: {
			name: "UTAH",
			capital: "Salt Lake City",
			nicknames: ["Beehive State", "Mormon State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		VT: {
			name: "VERMONT",
			capital: "Montpelier",
			nicknames: ["Green Mountain State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		VA: {
			name: "VIRGINIA",
			capital: "Richmond",
			nicknames: ["The Old Dominion", "Mother of States"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		WA: {
			name: "WASHINGTON",
			capital: "Olympia",
			nicknames: ["Evergreen State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		WV: {
			name: "WEST VIRGINIA",
			capital: "Charleston",
			nicknames: ["Mountain State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		WI: {
			name: "WISCONSIN",
			capital: "Madison",
			nicknames: ["America's Dairyland"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		},
		WY: {
			name: "WYOMING",
			capital: "Cheyenne",
			nicknames: ["Equality State", "Cowboy State"],
			nickname: function() {
				return this.nicknames[Math.floor(Math.random()* this.nicknames.length)];
			}
		}
	}
};

map.activeTerritories.push(...map.territories);
map.activeTerritories.forEach((territory) => territory.onclick = () => map.checkActive(territory));

map.random();

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


