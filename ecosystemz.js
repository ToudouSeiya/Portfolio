let width;
let height;
function setup() {
	width = windowWidth - 475;
	height = windowHeight;
	createCanvas(width, height);
}

//variables
let started = false;
let paused = false;
let speed = 100;
let lastSpeed = 100;

let waterPercent = 0;
let landTypeColors = {
	"grass" : "green",
	"sand" : "tan",
	"water" : "blue"
};
let land = [];
let rows = 60;
let cols = 40;
let squareWidth; 
let squareHeight; 

let season = "spring";
let seasonMod = 10;
let temp = 60;

let prey = [];
let pred = [];
let animalGrid = [];

//when start button is pressed, load in values and start drawing
function start() {
	squareWidth = width / rows;
	squareHeight = height / cols;

	let timeSlider = document.getElementById("time");
	timeSlider.oninput = function() {
		speed = Math.max(1, timeSlider.max - timeSlider.value);
	}
	
	waterPercent = document.getElementById("water").value / 600;

	createLandscape();

	let numPrey = document.getElementById("preyNum").value;
	//load in prey species
	for(let p = 1; p <= numPrey; p++) {
		let dna = "";
		let color = document.getElementById("color"+p).value;
		 dna+= red(color) + "R" + green(color)+"G" + blue(color)+"B";
		//console.log(dna);
		 dna+= document.getElementById("speed"+p).value + "S";
		 dna+= document.getElementById("size"+p).value + "S";
		 if(document.getElementById("swim"+p).checked) {dna+= "SS";}
		 else {dna+="ss";}
		 if(document.getElementById("cold"+p).checked) {dna+= "CC";}
		 else {dna+="cc";}
		 if(document.getElementById("sleep"+p).checked) {dna+= "HH";}
		 else {dna+="hh";}
		 for(let i=0; i <100; i++){prey.push(new Prey(dna, floor(random(0, rows)), floor(random(0, cols))));}
	}
	//load in predator species
	let numPredators = document.getElementById("predNum").value;
	for(let p = 1; p <= numPredators; p++) {
		let dna = "";
		let color = document.getElementById("colorP"+p).value;
		 dna+= red(color) + "R" + green(color)+"G" + blue(color)+"B";
		 dna+= document.getElementById("speedP"+p).value + "S";
		 dna+= document.getElementById("sizeP"+p).value + "S";
		//console.log(document.getElementById("swimP"+p).value);
		 if(document.getElementById("swimP"+p).checked) {dna+= "SS";}
		 else {dna+="ss";}
		 if(document.getElementById("coldP"+p).checked) {dna+= "CC";}
		 else {dna+="cc";}
		 if(document.getElementById("sleepP"+p).checked) {dna+= "HH";}
		 else {dna+="hh";}
		 for(let i=0; i <100; i++){pred.push(new Predator(dna, floor(random(0, rows)), floor(random(0, cols))));}
	}
	
	document.getElementById("startMenu").hidden =  true;
	document.getElementById("sideMenu").removeAttribute("hidden");
	background(255);

	started = true;
}

function pause(){
	pauseButton = document.getElementById("pause");
	header = document.getElementById("running");
	paused = !paused;
	if (paused){
		pauseButton.src = "unpause.png";
		header.innerHTML="Simulation Paused";
		lastSpeed = speed;
		speed = 0;
	}
	else {
		pauseButton.src = "pause.png";
		header.innerHTML="Simulation Running";
		speed = lastSpeed;
	}
}

function createLandscape() {
	let landPercs = new Map([[waterPercent, "water"],
					 [0.51, "sand"],
					 [1, "grass"]]);
	for(let r = 0; r < rows; r++) {
		land.push([]);
		animalGrid.push([]);
		for(let c=0; c < cols;c++) {
			let type;
			let chance = random();
			let chosen = false
			landPercs.forEach (function(value,key) {
				if(!chosen && chance < key) {
					type = value;
					chosen = true;
				}
			});

			land[r][c] = type;
			animalGrid[r].push([]);
			
		}
	}
	//console.log(animalGrid);
}

function updateLand() {
	for(let col=0; col < cols; col++){
		for(let row=0; row < rows; row++){
			if(land[row][col] == "sand") {
				if(row > 0 & row < rows - 1 & col > 0 & col < cols - 1) {
					let surroundingSpaces = [land[row][col + 1], land[row + 1][col], land[row][col-1], land[row -1][col-1], land[row+1][col+1], land[row-1][col-1], land[row+1][col-1], land[row-1][col+1]];
					if(surroundingSpaces.includes("water") && random() < 0.25) {
						land[row][col] = "grass";
					}	
				}
			}
		}
	}
}

function updateMenu() {
	document.getElementById("temperature").innerHTML = "Temperature: " + temp.toFixed(2) + " degrees";
	document.getElementById("season").innerHTML = season.toUpperCase();
	document.getElementById("numPrey").innerHTML = "Prey Alive: " + prey.length;
	document.getElementById("numPred").innerHTML = "Predators Alive: " + pred.length;
}

function draw() {
	if(started) {

		//change of season?
		if(frameCount % (speed * seasonMod) == 0) {
			//console.log("time to change seasons");
			if(season == "spring") {
				season = "summer";
				temp = 90;
				landTypeColors = {
					"grass" : color(100, 128, 0),
					"sand" : color(255, 180, 140),
					"water" : color(100, 0, 255)	
				};
			}
			else if (season == "summer") {
				season = "fall";
				temp = 60;
				landTypeColors = {
					"grass" : color(200, 75, 0),
					"sand" : color(254, 232, 176),
					"water" : color(124, 144, 112)	
				};
			}
			else if (season == "fall") {
				season = "winter";
				temp = 30;
				landTypeColors = {
					"grass" : color(240, 245, 237),
					"sand" : color(210, 180, 240),
					"water" : color(0, 100, 255)	
				};
			}
			else if (season == "winter") {
				season = "spring";
				temp = 60;
				landTypeColors = {
					"grass" : "green",
					"sand" : "tan",
					"water" : "blue"	
				};
			}
		}
		
		//if it's time, update things
		if(frameCount % speed == 0) {
			updateLand();
			temp += random(-5, 5);
			updateMenu();

			background(100);

			prey.forEach(function(currentValue) {
				currentValue.update();
			})
			pred.forEach(function(currentValue) {
				currentValue.update();
			})

			//draw the landscape
			for(let col=0; col < cols; col++){
				for(let row=0; row < rows; row++){
					push();
	
					landColor = landTypeColors[land[row][col]];
					translate(row * squareWidth, col * squareHeight);
					noStroke();
					fill(landColor);
					rect(0, 0, squareWidth, squareHeight);
	
					pop();
				}
			}
	
			//draw animals
			prey.forEach( function(currentValue) {
				currentValue.draw();
			})
			pred.forEach( function(currentValue) {
				currentValue.draw();
			})

		
		}
	}
}


//Classes
class Prey {
	constructor(dna, x, y) {
		//console.log(dna);
		//read in data from the dna string
		this.r = 0;
		this.g = 0;
		this.b = 0;
		
		let c = 0;
		let temp = dna[0];
		while(temp != "R") {
			this.r *= 10;
			this.r += (dna[c] * 10 / 10);
			//console.log(this.r);
			c++;
			temp = dna[c];
		}
		c++;
		temp = dna[c];
		while(temp != "G") {
			this.g *= 10;
			this.g += (dna[c] * 10 / 10);
			c++;
			temp = dna[c];
		}
		c++;
		temp = dna[c];
		while(temp != "B") {
			this.b *= 10;
			this.b += (dna[c] * 10 / 10);
			c++;
			temp = dna[c];
		}

		//console.log(this.r + " " + this.g + " " + this.b);
		this.color = color(this.r,this.g,this.b);

		c++;
		this.speed = dna[c];
		c++; //S
		c++;
		this.size = dna[c];
		c++; //S

		c++;
		temp = dna[c];
		c++;
		temp += dna[c];
		this.swimming = temp;
		c++;
		temp = dna[c];
		c++;
		temp += dna[c];
		this.coldblood = temp;
		c++;
		temp = dna[c];
		c++;
		temp += dna[c];
		this.hibernates = temp;

		//calculate other things
		this.drawSize = map(this.size, 1, 9, 10, squareHeight);
		
		this.metabolism = (this.speed * 2) / this.size;
			if(this.swimming == "SS") {
				this.metabolism *= 2;
			}
			if(this.coldblood == "CC") {
				this.metabolism /= 2;
			}
		this.lifespan = 100 / this.metabolism;
		this.babies = ceil(this.metabolism);

		//initialize non-dna variables
		this.hunger = 0;
		this.health = this.size * 2;
		this.age = 0;
		this.x = x;
		this.y = y;

		//console.log(this.x,this.y);
		animalGrid[this.x][this.y].push(this);

		// console.log("metabolism: " + this.metabolism + " lifespan:" + this.lifespan + " babies: " + this.babies);
		// console.log("size: " + this.size+ " speed: " + this.speed + " health: " + this.health);
		// console.log("x: " + this.x + " y: " + this.y);
		document.getElementById("preyDisplay").innerHTML = dna;
	}

	draw() {
	
		push();

		noStroke();
		fill(this.color);
		if(this.age < (this.lifespan / 4)) {
			translate(this.x * squareWidth + (squareWidth / 2 - this.drawSize / 4), this.y * squareHeight + (squareHeight / 2 - this.drawSize / 4));
			square(0,0,this.drawSize / 2);
		}
		else {
			translate(this.x * squareWidth + (squareWidth / 2 - this.drawSize / 2), this.y * squareHeight + (squareHeight / 2 - this.drawSize / 2));
			square(0,0,this.drawSize);
		}
		
		pop();
	}

	update() {
		this.age++;

		if(! (this.hibernates == "HH" && season == "winter")) { //if winter and this species hibernates, do nothing
			//change speed based on temperature
			if(this.coldblood == "CC") {
				this.actSpeed = this.speed * map(temp, 0, 120, 0.1, 2);
			}
			else {
				this.actSpeed = this.speed * map(temp, 0, 120, 2, 0.1);
			}
			//now update metabolism
			this.metabolism = (this.speed) / this.size;
				if(this.swimming == "SS") {
					this.metabolism *= 1.5;
				}
				if(this.coldblood == "CC") {
					this.metabolism *= 0.5;
				}

			//update hunger
			if(frameCount % (speed * (1/this.metabolism)) == 0) {
				//console.log("hungering " + this.hunger);
				this.hunger += 1;
			}
			if(this.hunger > this.size) {
				this.health -= 1;
			}
	
			//check for death
			if(this.age > this.lifespan | this.health <= 0) {
				this.die();
			}
	
			//eat?
			if(land[this.x][this.y] == "grass") {
				land[this.x][this.y] = "sand";
				this.hunger--;
			}
			
			//move?
			//console.log(speed * 4/floor(this.actSpeed));
			if(frameCount % (speed * (4/round(this.actSpeed))) == 0) {
				//console.log("moving");
				this.move();
			}
	
			//reproduce?
			if(this.age > this.lifespan / 4 && this.babies > 0) {
				let surroundingSpaces = this.getSurroundingSpaces();
				for(let i = 0; this.babies > 0 && i < surroundingSpaces.length; i++){
					let row = surroundingSpaces[i][0];
					let col = surroundingSpaces[i][1];
					if(animalGrid[row][col].length > 0) {
						for(let a = 0; this.babies > 0 && a < animalGrid[row][col].length; a++) {
							let potentialMate = animalGrid[row][col][a];
							if(!potentialMate.isPredator() && potentialMate.babies > 0 && potentialMate.age > potentialMate.lifespan / 4) {
								this.reproduce(potentialMate);
							}
						}
					}
				}
			}
		}
		
	}

	die() {
		let died = false;
		for(let i=0; ! died && i < prey.length; i++){
			if(prey[i] == this) {
				prey.splice(i, 1);
				died = true;
			}
		}
		for(let i = 0; i < animalGrid[this.x][this.y].length; i++) {
				if(animalGrid[this.x][this.y][i] == this) {
					animalGrid[this.x][this.y].splice(i, 1);
				}
			}

		console.log(this.hunger +" " + this.health + " " + this.age + " " + this.lifespan);
	}

	isPredator() {return false;}

	canMoveTo(space) {
			let row = space[0];
			let col = space[1];
			//if water, can you swim?
			if(land[row][col] == "water" && this.swimming != "SS") {
				return false;
			}
			//if other animal(s) there, can you fit?
			if(animalGrid[row][col].length > 0){
				let totalSize = this.size;
				for(let i = 0; i < animalGrid[row][col].length; i++) {
					totalSize += animalGrid[row][col][i].size;
				}
				if(totalSize > 9) {
					return false;
				}
			}
			return true;
		}

	move() {
		let surroundingSpaces = this.getSurroundingSpaces();

		let candidate = null;
		//if very hungry, prioritize food
			if(this.hunger > this.size) {
				for(let i = 0; candidate == null && i < surroundingSpaces.length; i++) {
					let row = surroundingSpaces[i][0];
					let col = surroundingSpaces[i][1];
					if(land[row][col] == "grass") {
						candidate = [row, col];
					}

					if(candidate !=null && ! this.canMoveTo(candidate)) {
						candidate = null;
					}
				}
			}
		//check for predators and run away
			for(let i = 0; candidate == null && i < surroundingSpaces.length; i++) {
					let row = surroundingSpaces[i][0];
					let col = surroundingSpaces[i][1];
					//console.log(row + " " + col);
					//console.log(animalGrid[row][col]);
					if(animalGrid[row][col].length > 0) {
						let predPresent = false;
						for(let a = 0; predPresent == false & a < animalGrid[row][col].length; a++) {
							if(animalGrid[row][col][a].isPredator()  && lookFor(animalGrid[row][col][a])) {
								predPresent = true;
							}
						}
						if(predPresent) {
							candidate = [this.x,this.y]
							if(row > this.x && this.x > 0) {
								candidate[0] -= 1;
							}
							else if(row < this.x && this.x < rows - 1) {
								candidate[0] += 1;
							}
							if(col > this.y && this.y > 0) {
								candidate[1] -= 1;
							}
							else if(col < this.y && this.y < cols - 1) {
								candidate[1] += 1;
							}
						
							if(! this.canMoveTo(candidate)) {
								candidate = null;
							}
						}

					}
			}				
		//go to food next
			for(let i = 0; candidate == null && i < surroundingSpaces.length; i++) {
					let row = surroundingSpaces[i][0];
					let col = surroundingSpaces[i][1];
					if(land[row][col] == "grass") {
						candidate = [row, col];
					}

					if(candidate != null && ! this.canMoveTo(candidate)) {
						candidate = null;
					}
				}

		//just go random
		if(candidate == null) {
			candidate = surroundingSpaces[floor(random(0,surroundingSpaces.length))];
			if(! this.canMoveTo(candidate)) {
				candidate = null;
			}
		}

		if(candidate != null) {
			for(let i = 0; i < animalGrid[this.x][this.y].length; i++) {
				if(animalGrid[this.x][this.y][i] == this) {
					animalGrid[this.x][this.y].splice(i, 1);
				}
			}
			this.x = candidate[0];
			this.y = candidate[1];
			animalGrid[this.x][this.y].push(this);
		}
	}

	getSurroundingSpaces() {
		let surroundingSpaces = [];
		if(this.x > 0) {
			surroundingSpaces.push([this.x - 1, this.y]);
			if(this.y > 0) {
				surroundingSpaces.push([this.x - 1, this.y - 1]);
			}
			if(this.y < cols - 1) {
				surroundingSpaces.push([this.x - 1, this.y + 1]);
			}
		}
		if(this.y > 0) {
			surroundingSpaces.push([this.x, this.y - 1]);
			if(this.x < rows - 1) {
				surroundingSpaces.push([this.x + 1, this.y - 1]);
			}
		}
		if(this.y < cols - 1) {
			surroundingSpaces.push([this.x, this.y + 1]);
			if(this.x < rows - 1) {
			surroundingSpaces.push([this.x + 1, this.y + 1]);
			}
		}
		if(this.x < rows - 1) {
			surroundingSpaces.push([this.x + 1, this.y]);
		}
		return surroundingSpaces;
	}

	reproduce(mate) {
		//console.log("making baby");
		let newDna = "";

		let newColor = lerpColor(this.color,mate.color, random(0,1));
		let newR = round(red(newColor));
		newR = mutate(newR,50);
		let newG = round(green(newColor));
		newG = mutate(newG,50);
		let newB = round(blue(newColor));
		newB = mutate(newB,50);

		//console.log(this.size + " " + mate.size);
		let newSize = random(this.size,mate.size);
		newSize = round(mutate(newSize,1));
		//console.log(newSize);
		let newSpeed = random(this.speed,mate.speed);
		newSpeed = round(mutate(newSpeed,1));

		let newSwimming = "";
		let rand = random();
		if(rand < 0.5) {
			newSwimming += this.swimming[0];
			newSwimming += mate.swimming[1];
		}
		else {
			newSwimming += this.swimming[1];
			newSwimming += mate.swimming[0];
		}
		let newColdblood = "";
		rand = random();
		if(rand < 0.5) {
			newColdblood += this.coldblood[0];
			newColdblood += mate.coldblood[1];
		}
		else {
			newColdblood += this.coldblood[1];
			newColdblood += mate.coldblood[0];
		}
		let newHibernates = "";
		rand = random();
		if(rand < 0.5) {
			newHibernates += this.hibernates[0];
			newHibernates += mate.hibernates[1];
		}
		else {
			newHibernates += this.hibernates[1];
			newHibernates += mate.hibernates[0];
		}

		newDna = newR + "R" + newG+"G"+newB+"B"+round(newSize)+"S"+round(newSpeed)+"S"+newSwimming+newColdblood+newHibernates;
		let newSpace = this.getSurroundingSpaces()[floor(random(0,this.getSurroundingSpaces().length))];
		prey.push(new Prey(newDna, newSpace[0], newSpace[1]));
		this.babies--;
		mate.babies--;
	}

}

class Predator {
	constructor(dna, x, y) {
		//console.log(dna);
		//read in data from the dna string
		this.r = 0;
		this.g = 0;
		this.b = 0;
		
		let c = 0;
		let temp = dna[0];
		while(temp != "R") {
			this.r *= 10;
			this.r += (dna[c] * 10 / 10);
			c++;
			temp = dna[c];
		}
		c++;
		temp = dna[c];
		while(temp != "G") {
			this.g *= 10;
			this.g += (dna[c] * 10 / 10);
			c++;
			temp = dna[c];
		}
		c++;
		temp = dna[c];
		while(temp != "B") {
			this.b *= 10;
			this.b += (dna[c] * 10 / 10);
			c++;
			temp = dna[c];
		}

		//console.log(this.r + " " + this.g + " " + this.b);
		this.color = color(this.r, this.g, this.b);

		c++;
		this.speed = dna[c];
		c++; //S
		c++;
		this.size = dna[c];
		c++; //S

		c++;
		temp = dna[c];
		c++;
		temp += dna[c];
		this.swimming = temp;
		c++;
		temp = dna[c];
		c++;
		temp += dna[c];
		this.coldblood = temp;
		c++;
		temp = dna[c];
		c++;
		temp += dna[c];
		this.hibernates = temp;

		//calculate other things
		//console.log(this.size);
		this.drawSize = map(this.size, 1, 9, 10, squareHeight);
		
		this.metabolism = (this.speed * 2) / this.size;
			if(this.swimming == "SS") {
				this.metabolism *= 2;
			}
			if(this.coldblood == "CC") {
				this.metabolism /= 2;
			}
		this.lifespan = 100 / this.metabolism;
		this.babies = ceil(this.metabolism);

		//initialize non-dna variables
		this.hunger = 0;
		this.health = this.size * 2;
		this.age = 0;
		this.x = x;
		this.y=y;

		animalGrid[this.x][this.y].push(this);
		//console.log("metabolism: " + this.metabolism + " lifespan:" + this.lifespan + " babies: " + this.babies);
		//console.log("size: " + this.size+ " speed: " + this.speed + " health: " + this.health);
		// console.log("x: " + this.x + " y: " + this.y);

		document.getElementById("predDisplay").innerHTML = dna;
	}

	draw() {
		push();

		noStroke();
		fill(this.color);
		if(this.age < (this.lifespan / 4)) {
			translate(this.x * squareWidth + (squareWidth / 2 - this.drawSize / 4), this.y * squareHeight + (squareHeight / 2 - this.drawSize / 4));
			square(0,0,this.drawSize / 2);
			fill("red");
			translate(this.drawSize / 8, this.drawSize / 8);
			square(0,0,this.drawSize / 4);
		}
		else {
			translate(this.x * squareWidth + (squareWidth / 2 - this.drawSize / 2), this.y * squareHeight + (squareHeight / 2 - this.drawSize / 2));
			square(0,0,this.drawSize);
			fill("red");
			translate(this.drawSize / 4, this.drawSize / 4);
			square(0,0,this.drawSize / 2);
		}
		
		pop();
	}

	update() {
		this.age++;
		if(! (this.hibernates == "HH" && season == "winter")) { //if winter and this species hibernates, do nothing
			//change speed based on temperature
			if(this.coldblood == "CC") {
				this.actSpeed = this.speed * map(temp, 0, 120, -3, 3);
			}
			else {
				this.actSpeed = this.speed * map(temp, 0, 120, 3, -3);
			}
			//now update metabolism
			this.metabolism = (this.speed * 2) / this.size;
				if(this.swimming == "SS") {
					this.metabolism *= 2;
				}
				if(this.coldblood == "CC") {
					this.metabolism /= 2;
				}
	
			//update hunger
			if(frameCount % (speed * floor(4/this.metabolism)) ==0) {
				this.hunger += 1;
			}
			if(this.hunger > this.size) {
				this.health -= 1;
			}
	
			//check for death
			if(this.age > this.lifespan | this.health <= 0) {
				this.die();
			}
			
			//eat?
			if(animalGrid[this.x][this.y].length > 0) {
				let predSize = 0;
				let preySize = 0;
				let target = null;
				for(let i = 0; i < animalGrid[this.x][this.y].length; i++) {
					if(animalGrid[this.x][this.y][i].isPredator()) {
						predSize += animalGrid[this.x][this.y][i].size;
					}
					else {
						preySize += animalGrid[this.x][this.y][i].size;
						target = animalGrid[this.x][this.y][i];
					}
				}
				if(target != null & predSize >= preySize) {
					this.hunger -= target.size;
					target.die();
				}
			}
			
			//move?
			if(frameCount % (speed * floor(1/this.actSpeed)) ==0) {
				this.move();
			}
	
			//reproduce?
			if(this.age > this.lifespan / 4 && this.babies > 0) {
				let surroundingSpaces = this.getSurroundingSpaces();
				for(let i = 0; this.babies > 0 && i < surroundingSpaces.length; i++){
					let row = surroundingSpaces[i][0];
					let col = surroundingSpaces[i][1];
					if(animalGrid[row][col].length > 0) {
						for(let a = 0; this.babies > 0 && a < animalGrid[row][col].length; a++) {
							let potentialMate = animalGrid[row][col][a];
							if(!potentialMate.isPredator() && potentialMate.babies > 0 && potentialMate.age > potentialMate.lifespan / 4) {
								this.reproduce(potentialMate);
							}
						}
					}
				}
			}
		}
		
	}

	die() {
		pred.forEach (function(index) {
			if(pred[index] == this) {
				pred.splice(index, 1);
			}
		})
		for(let i = 0; i < animalGrid[this.x][this.y].length; i++) {
				if(animalGrid[this.x][this.y][i] == this) {
					animalGrid[this.x][this.y].splice(i, 1);
				}
			}
	}

	isPredator() {return true;}

	canMoveTo(space) {
			let row = space[0];
			let col = space[1];
			//if water, can you swim?
			if(land[row][col] == "water" && this.swimming != "SS") {
				return false;
			}
			//if other animal(s) there, can you fit?
			if(animalGrid[row][col].length > 0){
				let totalSize = this.size;
				for(let i = 0; i < animalGrid[row][col].length; i++) {
					totalSize += animalGrid[row][col][i].size;
				}
				if(totalSize > 9) {
					return false;
				}
			}
			return true;
		}

	move() {
		let surroundingSpaces = this.getSurroundingSpaces();

		let candidate = null;
		//chase prey
			for(let i = 0; candidate == null && i < surroundingSpaces.length; i++) {
					let row = surroundingSpaces[i][0];
					let col = surroundingSpaces[i][1];
				//console.log(row + " " + col);
				//console.log(animalGrid[row][col]);
					if(animalGrid[row][col].length > 0) {
						let preyPresent = false;
						for(let a = 0; preyPresent == false & a < animalGrid[row][col].length; a++) {
							if(! animalGrid[row][col][a].isPredator() && lookFor(animalGrid[row][col][a])) {
								preyPresent = true;
								candidate = [row,col];
							}
						}
						
							if(candidate != null && ! this.canMoveTo(candidate)) {
								candidate = null;
							}
						}

					}

		//just go random
		if(candidate == null) {
			candidate = surroundingSpaces[floor(random(0,surroundingSpaces.length))];
			if(! this.canMoveTo(candidate)) {
				candidate = null;
			}
		}

		if(candidate != null) {
			for(let i = 0; i < animalGrid[this.x][this.y].length; i++) {
				if(animalGrid[this.x][this.y][i] == this) {
					animalGrid[this.x][this.y].splice(i, 1);
				}
			}
			this.x = candidate[0];
			this.y = candidate[1];
			animalGrid[this.x][this.y].push(this);
		}
	}

	getSurroundingSpaces() {
		let surroundingSpaces = [];
		if(this.x > 0) {
			surroundingSpaces.push([this.x - 1, this.y]);
			if(this.y > 0) {
				surroundingSpaces.push([this.x - 1, this.y - 1]);
			}
			if(this.y < cols - 1) {
				surroundingSpaces.push([this.x - 1, this.y + 1]);
			}
		}
		if(this.y > 0) {
			surroundingSpaces.push([this.x, this.y - 1]);
			if(this.x < rows - 1) {
				surroundingSpaces.push([this.x + 1, this.y - 1]);
			}
		}
		if(this.y < cols - 1) {
			surroundingSpaces.push([this.x, this.y + 1]);
			if(this.x < rows - 1) {
			surroundingSpaces.push([this.x + 1, this.y + 1]);
			}
		}
		if(this.x < rows - 1) {
			surroundingSpaces.push([this.x + 1, this.y]);
		}
		return surroundingSpaces;
	}

	reproduce(mate) {
		let newDna = "";

		let newColor = lerpColor(this.color,mate.color, random(0,1));
		let newR = round(red(newColor));
		newR = mutate(newR,50);
		let newG = round(green(newColor));
		newG = mutate(newG,50);
		let newB = round(blue(newColor));
		newB = mutate(newB,50);

		let newSize = random(this.size,mate.size);
		newSize = round(mutate(newSize,1));
		let newSpeed = random(this.speed,mate.speed);
		newSpeed = round(mutate(newSpeed,1));

		let newSwimming = "";
		let rand = random();
		if(rand < 0.5) {
			newSwimming += this.swimming[0];
			newSwimming += mate.swimming[1];
		}
		else {
			newSwimming += this.swimming[1];
			newSwimming += mate.swimming[0];
		}
		let newColdblood = "";
		rand = random();
		if(rand < 0.5) {
			newColdblood += this.coldblood[0];
			newColdblood += mate.coldblood[1];
		}
		else {
			newColdblood += this.coldblood[1];
			newColdblood += mate.coldblood[0];
		}
		let newHibernates = "";
		rand = random();
		if(rand < 0.5) {
			newHibernates += this.hibernates[0];
			newHibernates += mate.hibernates[1];
		}
		else {
			newHibernates += this.hibernates[1];
			newHibernates += mate.hibernates[0];
		}

		newDna = newR + "R" + newG+"G"+newB+"B"+round(newSize)+"S"+round(newSpeed)+"S"+newSwimming+newColdblood+newHibernates;
		let newSpace = this.getSurroundingSpaces()[floor(random(0,this.getSurroundingSpaces().length))];
		pred.push(new Predator(newDna, newSpace[0], newSpace[1]));
		this.babies--;
		mate.babies--;
	}
}

//a helper method for animals
function mutate(trait, range) {
	let r = random();
	if(r < 0.05) {
		return round(Math.max(trait + random(-range, range), 0));
	}
	return trait;
}

function lookFor(animal) {
	let spot = land[animal.x][animal.y];
	let spotColor = landTypeColors[spot];
	if(random() < 0.5 && abs(red(spotColor) - red(animal.color)) < 20 && abs(green(spotColor) - green(animal.color)) < 20 && abs(blue(spotColor) - blue(animal.color)) < 20) {
		return false;
	}
	return true;
}
