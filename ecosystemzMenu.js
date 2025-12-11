let waterSlider = document.getElementById("water");
let waterOutput = document.getElementById("waterP");
waterOutput.innerHTML = waterSlider.value + "%";
waterSlider.oninput = function() {
  waterOutput.innerHTML = this.value + "%";
}

let preySlider = document.getElementById("preyNum");
let preyOutput = document.getElementById("preyO");
preyOutput.innerHTML = preySlider.value;
document.getElementById("preySpecies4").hidden = "true";
document.getElementById("preySpecies3").hidden = "true";
document.getElementById("preySpecies2").hidden = "true";
preySlider.oninput = function() {
  preyOutput.innerHTML = this.value;
	if(this.value < 4) {document.getElementById("preySpecies4").hidden = "true";}
	else {document.getElementById("preySpecies4").removeAttribute("hidden")}
	if(this.value < 3) {document.getElementById("preySpecies3").hidden = "true";}
	else{document.getElementById("preySpecies3").removeAttribute("hidden")}
	if(this.value < 2) {document.getElementById("preySpecies2").hidden = "true";}
	else{document.getElementById("preySpecies2").removeAttribute("hidden")}
}
let predatorSlider = document.getElementById("predNum");
let predatorOutput = document.getElementById("predO");
predatorOutput.innerHTML = predatorSlider.value;
document.getElementById("predatorSpecies4").hidden = "true";
document.getElementById("predatorSpecies3").hidden = "true";
document.getElementById("predatorSpecies2").hidden = "true";
predatorSlider.oninput = function() {
predatorOutput.innerHTML = this.value;
	if(this.value < 4) {document.getElementById("predatorSpecies4").hidden = "true";}
	else {document.getElementById("predatorSpecies4").removeAttribute("hidden")}
	if(this.value < 3) {document.getElementById("predatorSpecies3").hidden = "true";}
	else{document.getElementById("predatorSpecies3").removeAttribute("hidden")}
	if(this.value < 2) {document.getElementById("predatorSpecies2").hidden = "true";}
	else{document.getElementById("predatorSpecies2").removeAttribute("hidden")}
}
