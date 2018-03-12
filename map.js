const map = {
	states: document.getElementsByClassName("state"),
	activeStates: [],
	count: 0,
	current: document.getElementById("current"),
	currentState: null,
	checkActive(state) {
		if (state.id === this.currentState) {
				state.style.fill = this.colorAssign();
				this.activeStates.splice(this.activeStates.indexOf(state), 1);
				(this.activeStates.length) ? this.random() : this.finish();
		} else {
			this.count++;
		}
	},
	finish() {
		this.current.innerHTML = "Done!";
	},
	random() {
		this.currentState = this.activeStates[Math.floor(Math.random() * this.activeStates.length)].id;
		this.current.innerHTML = "FIND :   " + this.keyMap[this.currentState];
		this.count = 0;
	},
	colorAssign() {
		return (this.count < 1) ? "#009900" : (this.count < 2) ? "#CC8800" : (this.count < 3) ? "#CC4400" : "#000000";
	},
	keyMap: {
		"AL": "ALABAMA",
		"AK": "ALASKA",
		"AZ": "ARIZONA",
		"AR": "ARKANSAS",
		"CA": "CALIFORNIA",
		"CO": "COLORADO",
		"CT": "CONNECTICUT",
		"DE": "DELAWARE",
		"FL": "FLORIDA",
		"GA": "GEORGIA",
		"HI": "HAWAII",
		"ID": "IDAHO",
		"IL": "ILLINOIS",
		"IN": "INDIANA",
		"IA": "IOWA",
		"KS": "KANSAS",
		"KY": "KENTUCKY",
		"LA": "LOUISIANA",
		"ME": "MAINE",
		"MD": "MARYLAND",
		"MA": "MASSACHUSETTS",
		"MI": "MICHIGAN",
		"MN": "MINNESOTA",
		"MS": "MISSISSIPPI",
		"MO": "MISSOURI",
		"MT": "MONTANA",
		"NE": "NEBRASKA",
		"NV": "NEVADA",
		"NH": "NEW HAMPSHIRE",
		"NJ": "NEW JERSEY",
		"NM": "NEW MEXICO",
		"NY": "NEW YORK",
		"NC": "NORTH CAROLINA",
		"ND": "NORTH DAKOTA",
		"OH": "OHIO",
		"OK": "OKLAHOMA",
		"OR": "OREGON",
		"PA": "PENNSYLVANIA",
		"RI": "RHODE ISLAND",
		"SC": "SOUTH CAROLINA",
		"SD": "SOUTH DAKOTA",
		"TN": "TENNESSEE",
		"TX": "TEXAS",
		"UT": "UTAH",
		"VT": "VERMONT",
		"VA": "VIRGINIA",
		"WA": "WASHINGTON",
		"WV": "WEST VIRGINIA",
		"WI": "WISCONSIN",
		"WY": "WYOMING"
	}
};

map.activeStates.push(...map.states);
map.random();

