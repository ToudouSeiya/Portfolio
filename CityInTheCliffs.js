//Disclaimer and artist statement in html section
//possible things to add: waterfall(s), different direction for flags, more human structure visible(wooden platforms?, tower?), nighttime, moving sun/move

//changes in v3:
//fixed how flags are generated, no more overlapping flags
//added curly braces around large sections of code that could be condensed to increase ease of reading
//added fish (still not totally happy with their movement)
//added the tower

//declare global variables 
{
//ridge colors
colorA = null;
colorB = null;
colorC = null;

backgroundColor = null;

numberRidges= null;
ridgeNoises = [null, null, null, null];
ridgeHeights = [null, null, null, null];
numberWindows = [null, null, null, null, null];

waterA = null;
waterB = null;

flagA = null;
flagB = null;
flagNoise = null;
flagPositions = [null, null, null, null];
	
towerColor = null;
towerLevel = null;
towerHeight = null;
towerX = null;

moonX = null;
moonY = null;
moonR = null;

ridgeLevel = 0;
waterLevel = 999999;
waterLevelMin = 0;

lake = false;
waterLeft = 0;
waterRight = 0;

boatX = 0;
lastY = 0;

numFish = 0;
fishColor = null;
fishXs = [];
fishYs = [];
}
	
function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	
	resetVariables();

} //end setup()

function resetVariables() {
	//randomize background color in a range of light blues
	backgroundColor = color(random(150, 200), random(200, 255), random(200, 255));
	
	//decide flag colors and noise for deciding which templates to use
	flagA = color(random(0, 255), random(0, 255), random(0, 255));
	flagB = color(random(0, 255), random(0, 255), random(0, 255));
	flagNoise = random(0, 1000);
	
	//decide canyon colors
	colorA = color(random(200, 250), random(125, 175), random(0, 50));
	colorB = color(random(100, 150), random(25, 75), 0);
	
	//decide number of ridges and noise seeds for each, as well as distances between each ridge layer and num of windows
	numRidges = random(2, 4);
	for(let i = 0; i < numRidges; i++){
		ridgeNoises[i] = random(0, 1000);
		ridgeHeights[i] = random(25, 90);
		numberWindows[i] = random(50, 200);
		
		//flag positions for this ridge
		let numFlags = random([0, 1, 1, 2, 2, 3]);
		let flagXs = [];
		for(let x = 0; x < numFlags; x++){
			flagXs[x] = (floor(random(0, windowWidth)));
		} 
		flagPositions[i] = flagXs;
	}
	numberWindows[4] = random(50, 100);
	
	//determine where tower goes and how it looks
	towerColor = lerpColor(colorB, flagA, 0.25);
	towerHeight = random(50, 100);
	towerLevel = round(random(2, numRidges));
	towerX = random(0, windowWidth);
	
	//decide water color
	waterA = color(random(0, 50), random(50, 100), random(100, 150), random(200, 255));
	waterB = color(random(0, 50), random(50, 100), random(100, 150), random(100, 150));
		
	//decide if it's a lake or sea
	lake = random([true, false]);
	if(lake) {
		//decide water cut-off position
		waterLeft = windowWidth / 3 + random(-15, 15);
		waterRight = windowWidth / 3 * 2 + random(-15, 15);
	}
	else {
		//set to corners of screen
		waterLeft = 0;
		waterRight = windowWidth;
	}
	
	boatX = floor(waterLeft);
	
	moonX = random(0, windowWidth);
	moonY = random(0, windowHeight / 5);
	moonR = random(15, 75);

	//decide num of fishes and base color, and starting positions
	numFish = random(0, 20);
	fishColor = color(random(0, 150), random(0, 150), random(0, 150), 100);
	for(let i = 0; i < numFish; i++) {
		fishXs[i] = random(0, windowWidth);
		fishYs[i] = random(windowHeight / 5 * 4, windowHeight);
	}
}

function draw() {	
	//clear
	background(backgroundColor);

	//draw background again 
	createBackground();

	//draw sea-level windows that change based on the current water level
	{
	noStroke();
	for(let window = 0; window < numberWindows[4]; window++) {
		push();
		let noiseLevel = windowHeight / 3;
		let noiseScale = 0.05;
		let nx = windowWidth * window;

		let x = windowWidth * noise(nx);
		let y = (windowHeight / 5 * 4) - (noiseLevel * noise(nx + 10000));

		//draw window - if below water level, turn off the lights
		if(waterLevel <= y - 10) {
			fill(76, 67, 30);
		}
		else{
			fill(255, 222, 89);
		}
		rect(x + 3, y + 3, 5, 5);
		
		pop();
	}
	}
	
	//draw water (and boat)
	{
	strokeWeight(5);
	stroke(waterA);
	fill(waterB);
	waterLevel = 99999;
	
	// set the noise level and scale
  let noiseLevel = windowHeight / 3;
  let noiseScale = 0.001;
	
	//begin shape at either bottom left corner or bottom middle for lake setting
	beginShape();
	vertex(waterLeft, windowHeight);

  //iterate from left to right.
  for (let x = 0; x < windowWidth; x++) {
		push();
    let nx = noiseScale * x;
    let nt = noiseScale * frameCount;

    let y = windowHeight - (noiseLevel * noise(nx, nt)) - 100;
		
		//keep track of how high the water is
		if(y < waterLevel) {
			waterLevel = y;
		}
		if(y > waterLevelMin) {
			waterLevelMin = y;
		}

    vertex(x, y);
		
		//draw boat if this spot is its current position
		if(x == floor(boatX)) {
			push();
			//temporarily center screen to this spot to draw the boat
			translate(x, y);
			
			let slope = lastY - y;
			rotate(slope * 30);

			//draw boat
			fill(61, 44, 19);
			strokeWeight(0);
			arc(-20, 0, 100, 40, 0, 270, OPEN);
			
			//draw sail
			fill(flagA);
			rect(0, -150, 100, 130);
			fill(flagB);
			circle(50, -75, 50);			
			
			// //draw net - an idea I didn't keep that would catch fish and keep them near the boat
			// stroke(227, 209, 159);
			// strokeWeight(2.5);
			// line(-70, 0, -100, 75);
			// line(-70, 0, -75, 50);
			// line(-70, 0, -150, 100);
			// line(-70, 0, -175, 75);
			
			// line(-80, 25, -72, 20);
			// line(-80, 25, -110, 50);
			// line(-110, 50, -105, 25);
			
			// line(-90, 50, -74, 40);
			// line(-90, 50, -130, 75);
			// line(-130, 75, -140, 50);
			
			// line(-100, 75, -75, 50);
			// line(-100, 75, -150, 100);
			// line(-150, 100, -175, 75);
			
			pop();
		}
		//store for calculating slope
		lastY = y;
		pop();
  }
	
	//close shape at either bottom right corner or bottom middle for lake setting
	vertex(waterRight, windowHeight);
	endShape(CLOSE);
}
	
	//draw fishes - iterate through each fish
	for(let i = 0; i < numFish; i++) {
		let x = fishXs[i];
		let y = fishYs[i];
		
		//determine where the fish will be going next to determine where it should be facing
		let angle = 360 * noise(i * frameCount * 0.002 + i); 
		
		//decide color, using noise so it's consistent
		let noiseLevel = 100;
		let noiseScale = 1;
		let ni = noiseScale * i;
		let n = noise(ni) * noiseLevel;
		
		let r = constrain(red(fishColor) + n, 0, 255);
		let g = constrain(green(fishColor) + n, 0, 255);
		let b = constrain(blue(fishColor) + n, 0, 255);
		fill(r, g, b, 100);
		
		//properly center and rotate for this fish
		push();
		translate(x, y);
		rotate(angle);
		
		//draw fish
		noStroke();
		ellipse(0, 0, 17, 10);
		triangle(0, 0, -15, -5, -15, 5);
		triangle(0, 0, -5, 0, -5, 7);
		triangle(0, 0, 3, -5, -3, -5);
		//eye
		fill(0, 0, 0, 150);
		circle(5, -1, 3);
		fill(255, 255, 255, 150);
		circle(5, -1, 2);
		
		pop();
		
		//determine where to move to next
		fishXs[i] = constrain(fishXs[i] + (cos(angle) * 0.5), 0, windowWidth);
		fishYs[i] = constrain(fishYs[i] + (sin(angle) * 0.5), waterLevelMin, windowHeight);
	}
	
	//draw foreground, if lake
	{
	strokeWeight(0);
	fill(colorB);
	triangle(0, windowHeight, 0, windowHeight / 3 * 2 - 50, waterLeft, windowHeight);
	triangle(windowWidth, windowHeight, windowWidth, windowHeight / 3 * 2 - 50, waterRight, windowHeight); }
	
	boatX += 0.5;
	if(keyIsDown(RIGHT_ARROW)) {
		boatX += 4;
	}
	
	//if we've reached the end of this animation, automatically move on to a new one
	if(boatX >= waterRight) {
		resetVariables();
	}
} //end draw()

function drawMoon(){
	//make sun/moon in a random position at the top of the drawing
	push();
	
	fill(255, 255, 255);
	noStroke();
	
	circle(moonX, moonY, moonR);
	pop();
}

function drawFlagpost(x, y) {
	push();			
	
	//make flagpost
	fill(76, 67, 30);
	rect(x - 1, y - 5, 2, 5);
				
	//make flag from three available templates
	let r = noise(flagNoise);
	//first color, solid
	if (r >= 0.666) {
			fill(flagA);
			rect(x - 2, y - 15, 20, 10);
	}
	//second color, solid
	else if (r >= 0.333) {
			fill(flagB);
			rect(x - 2, y - 15, 20, 10);
	}
	//striped
	else {
		fill(flagA);
		rect(x - 2, y - 15, 5, 10);
		fill(flagB);
		rect(x + 3, y - 15, 5, 10);
		fill(flagA);
		rect(x + 8, y - 15, 5, 10);
		fill(flagB);
		rect(x + 13, y - 15, 5, 10);
	}
	pop();
}

function createBackground() {
	push();
	
	drawMoon();
	
	noStroke();
	
	//make ridges
	let noiseLevel = windowHeight / 3;
	let noiseScale = 0.01;
	ridgeLevel = 0;
	
	for(let ridge = 0; ridge < numRidges; ridge++) {
		//change noise so that all the ridges look different
		noiseSeed(ridgeNoises[ridge]);
		
		//decide random vertical distance from last ridge
		let d = ridgeHeights[ridge];
		
		//decide color based on which ridge this is
		colorC = lerpColor(colorA, colorB, (0.25 * ridge));
		fill(colorC);

		//begin shape, make bottom left vertex
		beginShape();
		vertex(0, windowHeight);

		//randomize vertices
		for(let x = 0; x < windowWidth; x++) {	
			let nx = noiseScale * x;
			let y = noiseLevel * noise(nx) + (d * ridge);
			
			//keep track of how low the ridges go
			if((y) > ridgeLevel) {
				ridgeLevel = y;
			}

			vertex(x, y);
			
			//if this is a flag position, draw a flag
			for(let i = 0; i < flagPositions[ridge].length; i++) {
				if(flagPositions[ridge][i] == x){
					drawFlagpost(x, y);
				}
			}
			
			//if this is where the tower goes, draw it
			push();
			translate(x, y);
			if((towerLevel == ridge + 1) && (x == floor(towerX))) {
				fill(towerColor);
				rect(-10, -towerHeight + 20, 20, towerHeight);
				drawFlagpost(-8, -towerHeight + 20);
				rect(-10, -towerHeight + 15, 5, 5);
				rect(5, -towerHeight + 15, 5, 5);
				
				for(let window = 0; window < towerHeight - 20; window = window + 10) {
					fill(255, 222, 89);
					square(-2.5, -window, 5);
				}
			}
			pop();
		}

		//make bottom right vertex, close shape
		vertex(windowWidth, windowHeight);
		endShape(CLOSE);	
		
		//make windows with opacity based on foreground/background position
		fill(255, 222, 89, 255 * (0.25 * (ridge + 1)));
		strokeWeight(0);
	
		for(let window = 0; window < numberWindows[ridge]; window++) {
			let noiseLevel = windowHeight / 4;
			let noiseScale = 0.05;
			let nx = windowWidth * window;

			let x = windowWidth * noise(nx);
			let y = ((ridgeLevel + windowHeight/5) - (noiseLevel * noise(nx + 10000)));

			rect(x, y, 5, 5);
		}
		
	}	//end ridge loop

	pop();
} //end createBackground()
