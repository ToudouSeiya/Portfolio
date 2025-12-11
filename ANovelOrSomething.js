//set up grammar rules (could get nither RiTa's grammars nor json working, so made my own)
const person = "man,woman,person,girl,boy,kid".split(",");
const time = "daytime,morning,afternoon,early afternoon,late afternoon,evening,night,dawn,dusk,Sunday,Saturday,Monday,Tuesday,Wednesday,Thursday,Friday,3:00,midnight,twilight".split(",");
const place = "the library,the school,the garden,the house,the country,the kingdom,the world,a field,a forest,the woods,the swamp,the desert,the meadow,a cave,the bank,the riverside,the beach,the creek,the grocery store,the hardware store,the park,the gas station,the hotel,the apartment building,the race track,the movie theater,a bus stop,the intersection,another country,the house nextdoor,the backyard,a bar,a club,the middle of the ocean,a dumpster,a back alley,Fredericksburg,a bookstore,underneath the desk,a hot air balloon,a train,Budapest,somewhere else,the pool,under the sea,in a plane,the firehouse,the police station,the sewers,the hospital,the nursing home,the local animal shelter,nowhere in particular,the coffee shop,the bakery,the pizza place,the jewelry store,the prison,the museum,the airport".split(",");
const exclamation = "aha!,oh!,dagnabbit!,darn!,gosh!,oh my lord!,oh my goodness!,shit!,damn!,wow!,whoa!,hey!,by golly!,jeez louise!,oh fish!,aha!,hah!,blimey!,blast!".split(",");
const animal = "bear,cat,dog,owl,crow,caterpillar,pillbug,bluejay,deer,fish,elephant,flamingo,hedgehog,iguana,komodo dragon,dragon,unicorn,monkey,raccoon,squirrel,horse,pony,black cat,poodle,shark,parakeet,weasel,ferret,chinchilla,mouse,rat,buffalo,snake,spider,guinea pig,rabbit,turtle,cow,pig,sheep,chicken,goat,frog,salamander".split(",");
const hairStyle = "long,short,shoulder-length,mid-length,shaved,flowing,ponytailed,tied up,wavy,curly,straight,asymmetrical".split(",");
const hairColor = "brown,blonde,auburn,golden,black,dark,light,orange,red,dyed purple,dyed blue,dirty blonde,strawberry blonde".split(",");
const eyeColor = "brown,blue,green,hazel,gray,black,clear,dark,light,mulitcolored,hazy".split(",");
const height = "tall,short,average,above average,below average,middling,superior,inferior".split(",");
const greeting="hi,hello,howdy,wassup,my guy,good morning,good afternoon,good evening,good night,how are you?,yo".split(",");
const farewell="goodbye!,bye,see you later,see you next time,till we meet again,bye bye,farewell,fare thee well,see ya".split(",");
const oops="BAM!,BANG!,CLATTER!,SMASH!,SHATTER!,FLOP!,CRASH!,WHIZZ!,POP!,PING!".split(",");

function choose(list) {
	let i = floor(random(0, list.length));
	return list[i];
}

//make up a character
function character() {
	return RiTa.randomWord({maxLength: 6, pos:"jj"})+" "+RiTa.randomWord({maxLength: 6, pos:"nnp"})+" "+choose(person);
}

//make an animal
function pet() {
	return RiTa.randomWord({maxLength: 6, pos:"jj"})+" "+choose(animal);
}

//randomly describe someone's appearance
function appearance(person) {
	let ret = "";
	ret += "The "+person+" had "+choose(hairStyle)+" "+choose(hairColor)+" hair, and was of "+choose(height)+" stature." +
		" "+toTitleCase(their(person))+" eyes were "+choose(eyeColor)+", and many had likened them to the eyes of "+a(adj())+" "+choose(animal)+".";
	ret += " "+toTitleCase(they(person))+" liked to wear "+adj()+" clothes, except for "+choose(time)+"s, when "+they(person)+" preferred "+
		adj()+" clothes.";
	ret += " Overall, the "+person+" put people into mind of "+a(adj())+" "+noun()+".";
	return ret;
}

//a function to capitalize the first letter of words

function toTitleCase(text) {
	let words = text.split(" ");
	let ret = "";
	for(let i = 0; i < words.length; i++) {
		words[i] = words[i][0].toUpperCase() + words[i].slice(1);
		ret += words[i];
		if(i != words.length -1){
			ret += " ";
		}
	}
	return ret;
}

function capitalize(text) {
	return text[0].toUpperCase() + text.slice(1);
}

//a set of functions to return the correct pronoun for the context
function they(person) {
	if(person.includes("woman") | person.includes("girl")) {
		return "she";
	}
	else if(person.includes("man") | person.includes("boy")) {
		return "he";
	}
	return "they";
}

function them(person) {
	if(person.includes("woman") | person.includes("girl")) {
		return "her";
	}
	else if(person.includes("man") | person.includes("boy")) {
		return "him";
	}
	return "them";
}

function their(person) {
	if(person.includes("woman") | person.includes("girl")) {
		return "her";
	}
	else if(person.includes("man") | person.includes("boy")) {
		return "his";
	}
	return "their";
}

function theirs(person) {
	if(person.includes("woman") | person.includes("girl")) {
		return "hers";
	}
	else if(person.includes("man") | person.includes("boy")) {
		return "his";
	}
	return "theirs";
}

//switch between a and an
function a(word) {
	let ret = "a";
	if("aiueo".includes(word[0])) {
		ret += "n";
	}
	ret += " "+word;
	return ret;
}

function nth(n) {
	let ret = "then";
	if(n==1){
		ret = "first";
	}
	if(n==2){
		ret = "second";
	}
	if(n==3){
		ret = "third";
	}
	if(n==4){
		ret = "fourth";
	}
	if(n==5){
		ret = "fifth";
	}
	if(n==6){
		ret = "sixth";
	}
	return ret;
}

//quicker way to get random words
function adj() {
	return RiTa.randomWord({maxLength: 9, pos:"jj"});
}

function verb() {
	return RiTa.randomWord({maxLength: 9, pos:"vb"});
}

function verbs() {
	return RiTa.conjugate(RiTa.randomWord({maxLength: 9, pos:"vb"}),{"person" : RiTa.THIRD});
}

function verbed() {
	return RiTa.conjugate(RiTa.randomWord({maxLength: 9, pos:"vb"}),{"tense" : RiTa.PAST});
}

function verbing() {
	return RiTa.conjugate(verb(), {"form" : RiTa.GERUND});
}

function noun() {
	return RiTa.randomWord({maxLength: 9, pos:"nn"});
}

function nouns() {
	return RiTa.randomWord({maxLength: 9, pos:"nns"});
}

function adverb() {
	return RiTa.randomWord({maxLength: 11, pos:"rb"});
}

//chapter formats
function adventure(mc) {
	//since I need to get this done by the deadline, the other chapters repeat the little adventure 
		let verb2 = verb();
		let obj = noun();
		
		createElement("h2", toTitleCase("in which the "+mc+" "+RiTa.conjugate(verb2,{"person" : RiTa.THIRD})+" the "+obj));
	
		createP("As we all know, there is nothing nicer to "+verb2+" than "+a(obj)+".");
		createP("It was "+choose(time)+" in "+choose(place)+" when "+mc+" first saw the "+obj+".");
		createP("\""+capitalize(choose(exclamation))+"\" "+they(mc)+" cried. \"Is that "+a(obj)+"?\"");
		createP("And so it was. It was "+a(obj)+", and "+a(adj())+", "+adj()+", "+adj()+ " one at that! A "+obj+" that, clearly, needed to be " + RiTa.conjugate(verb2, {"tense" : RiTa.PAST})+".");
	
		createP("And so the "+mc+" embarked on trying to "+verb2+" the "+obj+".");
		for(let i =1; i<=10;i++){
			createP(toTitleCase(nth(i))+", the "+mc+" tried to "+verb2+" the "+obj+" by "+verbing()+" "+a(noun())+". " +
				   capitalize(choose(exclamation))+" "+capitalize(choose(exclamation))+" The "+adj()+" "+noun()+" was "+adverb()+" "+verbed()+
				   "! Alas, it didn't work... Not even when the "+mc+" tried it in "+choose(place)+"! "+toTitleCase(they(mc))+" wondered if it " +
				   "would have worked if they had done it during "+choose(time)+" instead.");
		}
		createP("By this time, it was already "+choose(time)+", and the "+mc+" was thoroughly "+adj()+". They took a break in "+choose(place)+
			   ", "+adverb()+" "+verbing()+". As they sat, they suddenly saw the "+obj+" right in front of their eyes!");
		createP("\"Ha!\" "+they(mc)+" cried. \"I'll "+verb2+" you now!\"");
		createP("And in one fell swoop, "+they(mc)+" gathered "+their(mc)+" strength and finally did "+verb2+" the "+obj+"!");
		createP("It truly was a thing to celebrate. And so the "+mc+" decided to do "+their(mc)+" victory dance.");
		for(let i = 1; i <= 10; i++){
			createP(toTitleCase(nth(i))+", the "+mc+" "+verbed()+" while "+verbing()+", doing a move called the "+adj()+" "+choose(animal)+" "+adj()+" "+noun()+
				   ". It looked "+adverb()+" "+adj()+". The move was finished by the "+mc+" "+adverb()+" "+verbing()+" "+their(mc)+" "+noun()+", leaving passersby "+adj()+"."+
				   " What a "+adj()+" "+noun()+"!");
		}
		createP("Twas "+adj()+", "+adverb()+". The "+mc+" returned home "+adj()+". That was enough adventure for the "+choose(time)+".");
}

function escape(mcPet,mc) {
	createElement("h2", toTitleCase("In which the "+mcPet+" goes missing!"));
	createP("It was like any other "+choose(time)+" in "+choose(place)+"... or was it?");
	createP("\""+capitalize(mcPet)+"!\" the "+mc+" cried "+adverb()+". \"Oh, "+mcPet+"! Where are you?\"");
	createP(capitalize(they(mc))+" had looked in "+choose(place)+", "+choose(place)+", even in "+choose(place)+"! The darned "+mcPet+" was nowhere to be found.");
	createP("\"Well, "+choose(exclamation)+" I think I'll have to set up a search team!\"");
	createP("And so the "+mc+" called everybody "+they(mc)+" knew to come and help search for the "+mcPet+".");
	for(let i = 1; i<=10; i++){
		createP("\"I'll start in "+choose(place)+"!\" the "+character()+" said.");
	}
	createP("And so the "+adj()+" hunt began! Everyone was all "+adj()+" and "+adj()+" all over the place. Boy, it was "+adj()+"!");
	createP("The "+mc+" began their side of the search in "+choose(place)+". "+capitalize(they(mc))+" looked under the "+noun()+", but the "+
		   mcPet+" was nowhere to be found. "+capitalize(they(mc))+" looked behind the "+adj()+" "+noun()+", but instead of the "+mcPet+
		   ", all they found was "+a(adj())+" "+noun()+".");
	createP("\""+capitalize(choose(exclamation))+"\" "+they(mc)+" said, "+adverb()+" "+verbing()+". \"Where could they have gone?\"");
	createP("It seemed that the "+mc+" would have to continue the search elsewhere.");
	for(let i = 1; i<10; i++){
		createP("The "+mc+" "+adverb()+" trekked to "+choose(place)+" to look for the "+mcPet+".");
		createP("\""+capitalize(mcPet)+"! Come out, "+mcPet+"!\" the "+mc+" called out. Alas, there was no response. The search continued.");
		createP("There was "+a(adj())+" "+noun()+" behind the "+noun()+", but no "+mcPet+". Underneath the "+adj()+" "+noun()+" was a pile of "+
			   nouns()+", but still, no "+mcPet+". The "+mc+" searched the "+noun()+", the "+noun()+", and even the "+noun()+"! But there was no "+
			   mcPet+" to be found.");

		createP("\"Oh, "+choose(exclamation)+"\" the "+mc+" "+verbed()+". \"Where did you go?\" And on the hunt went.");
	}
	createP("The "+mc+" was very near giving up, feeling utterly "+adj()+", when "+their(mc)+" phone rang.");
	createP("\""+capitalize(mc)+"?\" a voice crackled. \"I found your "+mcPet+"! Come quick, we're at "+choose(place)+"!\"");
	createP("The "+mc+" was "+adj()+". "+capitalize(they(mc))+" "+verbed()+" all the way to where the "+mcPet+" had been found.");
	createP("\"Oh, "+mcPet+"! I'm so "+adj()+" to see you!\"");
	createP("The "+mcPet+" "+verbed()+" "+adverb()+". The "+mc+" felt that perhaps the "+mc+" was trying to tell "+them(mc)+" that they "+
		   "were "+adj()+".");
	createP("\"Me too, "+mcPet+". Me too.\" The two embraced. \""+capitalize(choose(exclamation))+" You really stressed me out! Let's "+
		   "go home and relax now.\"");
	createP("And they did.");
} 

function date(mc, lover) {
	let t = choose(time);
	let p = choose(place);
	createElement("h2", toTitleCase("In which, one "+t+", the "+mc+" and the "+lover+" go to "+p));
	createP("It was "+a(t)+" in "+p+", and the "+mc+" found "+them(mc)+"self sitting "+adverb()+" across from the "+lover+".");
	createP("\"So, how have you been?\" the "+lover+" asked, "+verbing()+" "+a(noun())+".");
	createP("\"Oh,\" said the "+mc+". \"I've been "+adverb()+" "+adj()+", though not "+adverb()+" "+adj()+"."+
			   " I saw "+a(pet())+" "+verbing()+" the other "+choose(time)+"! That was "+adj()+"."+
				" Work has been "+adj()+", but at least we have "+nouns()+". All in all, I'm doing "+adj()+". And you?\"");
	createP("\"Mmm, I see,\" the "+lover+" responded. \"As for me, I've been "+adverb()+" "+adj()+", though not "+adverb()+" "+adj()+"."+
" My "+noun()+" has been "+adj()+", but it's not "+adj()+". Work has been "+adj()+", but at least we have "+nouns()+". All in all, I'm doing "+adj()+".\"");
	createP("\""+capitalize(adj())+" to hear it,\" the "+mc+" said. \"Shall we "+verb()+"?\"");
	createP("\"Sure!\"");
	createP("As they did so, they chatted to get to know each other better.");
	for(let i = 0; i < 20; i++){
		let r = floor(random(0,4));
		if(r == 0){
			createP("\"So,\" the "+mc+" asked the "+lover+", \"What's your favorite "+noun()+"?\"");
			createP("\"Hmmm,\" the "+lover+" thought "+adverb()+". \"My favorite is probably the "+adj()+" "+noun()+". But then again, the "+adj()+
				   " "+noun()+" is pretty "+adj()+". Hard to decide... What about you?\"");
			createP("\"Oh, my favorite is definitely the "+adj()+" "+noun()+"! Don't get me wrong, the "+nouns()+" are "+adj()+", but "+
				   "they're too "+adj()+" for my taste.\"");
			createP("\"Hmm, I see,\" the "+lover+" replied with "+a(adj())+" "+noun()+".");
		}
		else if(r == 1){
			createP("\"So,\" the "+lover+" asked the "+mc+", \"What's your favorite "+noun()+"?\"");
			createP("\"Hmmm,\" the "+mc+" thought "+adverb()+". \"My favorite is probably the "+adj()+" "+noun()+". But then again, the "+adj()+
				   " "+noun()+" is pretty "+adj()+". Hard to decide... What about you?\"");
			createP("\"Oh, my favorite is definitely the "+adj()+" "+noun()+"! Don't get me wrong, the "+nouns()+" are "+adj()+", but "+
				   "they're too "+adj()+" for my taste.\"");
			createP("\"Hmm, I see,\" the "+mc+" replied with "+a(adj())+" "+noun()+".");
		}
		else if(r == 2){
			createP("\"By the way, how are your "+nouns()+"?\" the "+mc+" asked the "+lover+".");
			createP("\"They're doing "+adverb()+" "+adj()+", thanks for asking! I think they're "+verbing()+" "+adverb()+", but that's "+
				   adj()+". What about your "+nouns()+"?\"");
			createP("\"Oh, "+adj()+", "+adj()+". Not too "+adj()+". You know, the other day they "+verbed()+"!\"");
			createP("\"Ha! Gotcha.\"");
		}
		else if(r == 3){
			createP("\"By the way, how are your "+nouns()+"?\" the "+lover+" asked the "+mc+".");
			createP("\"They're doing "+adverb()+" "+adj()+", thanks for asking! I think they're "+verbing()+" "+adverb()+", but that's "+
				   adj()+". What about your "+nouns()+"?\"");
			createP("\"Oh, "+adj()+", "+adj()+". Not too "+adj()+". You know, the other day they "+verbed()+"!\"");
			createP("\"Ha! Gotcha.\"");
		}
	}
	createP("By now it was "+choose(time)+", and the couple was quite "+adj()+".");
	createP("\"That was "+adj()+",\" the "+lover+" said with "+a(noun())+". \"We should do this again sometime.\"");
	createP("\"Agreed,\" the "+mc+" smiled. \"See you next time.\"");
	createP("The "+mc+" went home feeling quite "+adj()+".");
}

function attack(mc, enemy){
	let p = choose(place);
	createElement("h2", toTitleCase("in which the "+enemy+" ambushes the "+mc+" in "+p+"!"));

	createP("It was a "+choose(time)+" in "+p+" and the "+mc+" was "+adverb()+" "+verbing()+". As they did, they peacefully whistled the tune " +
		   toTitleCase("the "+pet()+" and the "+character())+". Everything was "+adj()+"!");
	createP("All of a sudden, the "+enemy+" appeared in front of them.");
	createP("\""+capitalize(mc)+"!\" they cried. \"Look me in the eyes and "+verb()+"!\"");
	createP("\"Um. What?\" the "+mc+" asked.");
	createP("\""+capitalize(choose(exclamation))+" Don't ignore me!\"");
	createP("The "+mc+" rolled "+their(mc)+" eyes.");
	createP("\"Grr... take this!\" The "+enemy+" "+verbed()+" "+a(noun())+" at the "+mc+".");
	createP("\""+capitalize(choose(exclamation))+"\" the "+mc+" cried "+adverb()+".");
	createP("The battle was on.");
	for(let i = 0; i < 20; i++) {
		createP("The "+enemy+" took a swing at the "+mc+", "+adverb()+" "+verbing()+". \"Take that!\" "+choose(oops));
		createP("The "+mc+" "+verbed()+" out of the way, "+adverb()+" dodging. "+capitalize(they(mc))+" ran to hide behind "+a(adj())+" "+
			   noun()+", "+verbing()+" "+adverb()+".");
		createP("\""+capitalize(choose(exclamation))+"\" the "+enemy+" growled. "+capitalize(they(enemy))+" looked here and there, finally finding "+
			   "the "+mc+".");
		createP("The "+mc+" lashed out with "+a(noun())+", "+adverb()+" "+verbing()+". "+choose(oops)+" Ouch! The tables were turned.");
	}
	createP("\""+capitalize(choose(exclamation))+" "+capitalize(choose(exclamation))+"\" the "+enemy+" shrieked "+adverb()+". \"I have had enough of this "+
		   adj()+" "+noun()+"! It's supposed to be me beating YOU, not the other way around!! Blast it! I'll get you next time, I swear!\"");
	createP("With that, the "+enemy+" "+verbed()+" "+their(enemy)+" "+noun()+" and "+verbed()+" away.");
	createP("\""+capitalize(choose(exclamation))+" I hope I don't see "+them(enemy)+" again!\" the "+mc+" muttered.");
}

//https://rednoise.org/rita/reference/postags.html
function setup() {
	noLoop();
	noCanvas();

	//recurring characters
	let mc = character();
	let lover = character();
	let enemy = character();
	let mcPet = pet();

	
	// set the book's title 
	createElement("h1", toTitleCase("the "+mc));
	createElement("h3","A Novel, or Something");

	//first chapter - introduction to character and setting
	createElement("h2", toTitleCase("in which we meet the "+mc));

	{createP("As any good novel begins, we too shall start with an introduction of our main character. The "+mc+" was "+a(adj())+", "+adj()+" person, though not very "+adj()+"." +
		   " "+toTitleCase(their(mc))+" friends thought of "+them(mc)+" as being "+adj()+", while "+their(mc)+" family called "+them(mc)+" "+adj()+", and at work people knew " +
		   "the "+mc+" to be fairly "+adj()+".");
	createP("The "+mc+"'s favorite activity was "+verbing()+", while "+they(mc)+" hated "+verbing()+"." +
		   " "+toTitleCase(they(mc))+" worked "+verbing()+" for "+a(adj())+" "+noun()+" company, a job that could be "+RiTa.randomWord({"pos":"jjr"})+", all things considered.");
	createP(toTitleCase(they(mc))+" had a pet, "+a(mcPet)+", "+a(adj())+" critter that "+they(mc)+ " adored. The "+mcPet+" loved to "+verb()+", especially while "+verbing()+" "+nouns()+"."+
		   " Together, the "+mc+" and the "+mcPet+" made "+a(adj())+" pair.");
	createP("This "+adj()+" "+choose(time)+", the "+mc+" "+adverb()+" got dressed in preparation for an outing. Standing in front of "+their(mc)+" mirror, " +
		   they(mc)+" took a moment to look "+them(mc)+"self over.");
	createP("\"Ah, yes,\" "+they(mc)+" murmured. \"The mirror, such "+a(adj())+" plot device.\"");
	createP(appearance(mc));
	createP("Preparing "+their(mc)+" things to leave, the "+mc+" turned "+their(mc)+" attention to the rest of "+their(mc)+" room. "+
		   toTitleCase(their(mc))+" bed was "+adj()+", "+their(mc)+" walls "+adj()+" but "+adj()+", and the furniture "+adj()+" and "+adj()+".");
	createP("Grabbing "+their(mc)+" "+noun()+" and "+their(mc)+" "+noun()+", the "+mc+" embarked. "+toTitleCase(they(mc))+" was going to meet " +
		their(mc)+" closest friend, the "+character()+"."+
		   " It was going to be "+a(adj())+" time.");
	createP("It was "+choose(time)+" by the time the "+mc+" made it to "+choose(place)+" where "+they(mc)+" were going to meet "+their(mc)+" friend.");
	createP("\"Dear friend, "+choose(greeting)+",\" the "+mc+" cried. \"And you've brought friends!\"");
	createP("And indeed they had. The "+mc+" turned "+their(mc)+" eyes to each friend in turn, familiarizing "+them(mc)+"self with the new faces.");
	for(let i = 0; i<5;i++){
		createP(appearance(character()));
	}
	createP("They took turns introducing themselves.");
	for(let i=1;i<=5;i++){
		createP("\"Why, "+choose(greeting)+",\" the "+nth(i)+" friend said while "+verbing()+". \"I like to "+verb()+" "+nouns()+", "+
			   "and I have a pet "+pet()+". Pleasure to meet you.\"");
	}
	createP("The group decided to go to "+choose(place)+" to "+verb()+" "+adverb()+". Along the way, they decided to stop to grab some things from the store.");
	let list = "";
	for(let i=0;i<10;i++) {
		if(i == 9){
		list+="and "
		}
		list+= a(adj())+" "+noun();
		if(i != 9){
			list+= ", ";
		}
	}
	createP("The "+mc+" decided to get "+list+". It cost "+random(1,100)+" dollars.");
	list = "";
	for(let i=0;i<10;i++) {
		if(i == 9){
		list+="and "
		}
		list+= a(adj())+" "+noun();
		if(i != 9){
			list+= ", ";
		}
	}
	createP(toTitleCase(their(mc))+" closest friend decided to get "+list+". It cost "+random(1,100)+" dollars.");
	for(let n = 1; n <=5; n++){
		list = "";
		for(let i=0;i<10;i++) {
			if(i == 9){
			list+="and "
			}
			list+= a(adj())+" "+noun();
			if(i != 9){
				list+= ", ";
			}
	}
	createP("The "+nth(n)+" other friend decided to get "+list+". It cost "+random(1,100)+" dollars.");
	}
	createP("The "+adj()+" group moved on. \"So,\" someone said. \"How has everyone been?\"");
	for(let n = 1; n <=5; n++){
		createP("\"Oh,\" said the "+nth(n)+" friend. \"I've been "+adverb()+" "+adj()+", though not "+adverb()+" "+adj()+"."+
			   " I saw "+a(pet())+" "+verbing()+" the other "+choose(time)+"! That was "+adj()+"."+
				" Work has been "+adj()+", but at least we have "+nouns()+". All in all, I'm doing "+adj()+".\"");
	}
	createP("In favor of their original plan, the group decided to stop at a movie theater to watch the newest movie, "+
			toTitleCase("\"The "+character()+" and The "+character()+" "+verb()+" the "+adj()+" "+noun()+".\"")+" They sat "+
		   adverb()+" as it began.");
	createP("The movie was interesting. It was about "+a(choose(person))+" and their "+adj()+" "+noun()+", and went about as follows:");
	let plot = "";
	for(let i =0; i <10; i++){
		plot+= "A "+choose(person)+" "+verbs()+" "+adj()+" "+noun()+", but then the "+noun()+" "+adverb()+" "+verbs()+" and "+verbs()+" "+adverb()+" until the "+
			adj()+" "+noun()+" "+verbs()+". "+capitalize(choose(exclamation))+" ";
	}
	createP(plot+" It was quite the movie.");
	createP("\"What did you think?\" the "+mc+" asked the others. \"Personally, I thought that the part with the "+adj()+" "+noun()+
		   " was "+adverb()+" "+adj()+"! And don't even get me started on that "+character()+"!\"");
	for(let i=1; i<=6; i++){
		createP("\"I know!\" the "+nth(i)+" friend replied. \"And what about that "+adj()+" "+choose(person)+"?"+
			   " It was so "+adj()+" when they "+verbed()+"! But I think my favorite part was when the "+adj()+
			   " "+noun()+" and the "+adj()+" "+noun()+" "+verbed()+ " and it made the "+noun()+" "+verb()+"!\"");
	}
	createP("They had all had a "+adverb()+" "+adj()+" time. Alas, it was time to say farewells.");
	for(let i=1; i<=6; i++){
		createP("\"Well, "+choose(farewell)+",\" said the "+nth(i)+" friend.");
	}
	createP("\"Yeah, "+choose(farewell)+",\" the "+mc+" replied. \"This was "+adj()+"!\"");
	createP("With that, "+they(mc)+" returned home. "+toTitleCase(they(mc))+" would sleep "+adverb()+" that night.");}
	
	
	// second chapter - a little adventure
	adventure(mc);
	
	//third chapter - introduction of the lover
	{createElement("h2", toTitleCase("In which the "+mc+" meets the "+lover));
	createP("The first time they met, it was "+a(choose(time))+" at "+choose(place)+". The "+mc+" had just finished "+verbing()+" "+their(mc)+" "+nouns()+", "+
		   " when the "+lover+" appeared in front of them. The "+mc+" was frankly taken away by their "+adj()+" looks, and began to feel quite "+adj()+".");
	createP(appearance(lover));
	createP("\""+capitalize(choose(exclamation))+"\" the "+mc+" thought. \"Who is that?\"");
	createP("To "+their(mc)+" embarrassment, the "+lover+" seemed to notice "+their(mc)+" "+adj()+" gaze.");
	createP("\""+capitalize(choose(greeting))+",\" the "+lover+" said with "+a(adj())+" "+verb()+" of "+their(lover)+" "+noun()+". \"Need something?\"");
	createP("The "+mc+" "+verbed()+" and looked away. The "+lover+" "+verbed()+" "+adverb()+" in response. The "+mc+" considered taking the chance and asking the "+
		   lover+" to go to "+choose(place)+" and "+verb()+" with "+them(mc)+", but found "+them(mc)+"self unable to "+verb()+" the courage. The "+lover+" shrugged and moved on.");

	for(let i = 2; i <=6; i++){
		createP("The "+nth(i)+" time that the "+mc+" saw the "+lover+" was at "+choose(place)+" one "+choose(time)+". The "+lover+" was "+adverb()+" "+
			   verbing()+", and looked quite "+adj()+", if the "+mc+" did say so "+them(mc)+"self. Surprised to see "+them(lover)+" again but "+adj()+
			   " at the good luck, the "+mc+" decided to approach.");
		createP("\"Excuse me,\" "+they(mc)+" "+verbed()+". \"But would you, perhaps, like to "+verb()+" "+nouns()+" "+adverb()+" in "+choose(place)+" "+
			   "some "+choose(time)+"?\"");
		createP("\"I don't see why not!\" the "+lover+" responded "+adverb()+". \"In fact, why not do so right now?\"");
		createP("Quite "+verbed()+", the "+mc+" agreed. \""+capitalize(choose(exclamation))+"\" "+they(mc)+" thought "+adverb()+". \"I sure am "+adj()+".\"");
		createP("And so the "+mc+" and the "+lover+" did just that. They had "+a(adverb())+" "+adj()+" time. "+capitalize(choose(time))+", when they were finished, "+
			   "they said their goodbyes "+adverb()+". The "+mc+" went home feeling quite "+adj()+".");
	}
	createP(capitalize(choose(exclamation))+" but it was one "+adj()+" time. The "+mc+" and the "+lover+" had truly grown quite close after all of these "+ 
		   adverb()+" "+adj()+" adventures. When "+they(mc)+" thought about it, "+they(mc)+" couldn't help but "+verb()+"!");
	createP("The "+mc+" was quite "+adj()+" to have met the "+lover+". It felt like fate, for "+adj()+"!");}

	//fourth chapter - the mc meets the enemy
	{createElement("h2", toTitleCase("In which the "+enemy+" makes an appearance"));
	createP("Meanwhile, in the shadows of "+choose(place)+"...");
	createP("\""+capitalize(choose(exclamation))+"\" the "+enemy+" "+verbed()+". \"I'll show you, "+mc+"!\"");
	createP("You see, the "+enemy+" was "+them(enemy)+"self in love with the "+lover+", and had grown quite "+adj()+" upon seeing the growing closeness between "+
		   "the "+mc+" and the "+lover+". And so, "+they(enemy)+" took it upon themself to "+verb()+" and "+verb()+" the "+mc+" until "+they(mc)+" was "+adj()+"!");
	createP("\""+capitalize(choose(exclamation))+" "+capitalize(choose(exclamation))+"\" the "+enemy+" said to "+them(enemy)+"self. \"Ohh, the things that I'll do...\"");
	for(let i = 1; i <= 10; i++){
		createP("\""+capitalize(nth(i))+", I'll "+verb()+" your "+adj()+" "+noun()+", and "+adverb()+" "+verb()+" your "+nouns()+". Oh, "+choose(exclamation)+" That'll get you "+
			   verbing()+", ey? You'll be "+a(adj())+" "+noun()+" by the time that I'm done!");
	}
	createP("\"And then... and then "+they(lover)+"'ll be mine! Mwahahaha!\"");
	createP("And so, the "+enemy+" got to work preparing this "+adj()+" plan.");
	createP("\"Aha, yes! "+capitalize(a(adj()))+" "+noun()+" potion will do just the "+adj()+" trick! Now, how do I make that again?\" The "+enemy+" consulted "+
		   their(enemy)+" evil recipe book.");
	createP("\"Let's see... ah, here we are.");
	for(let i = 1; i<=10; i++){
		createP("\""+capitalize(nth(i))+", combine "+adj()+" "+noun()+" with "+nouns()+", and "+verb()+" the two "+adverb()+" until they have become "+
			   adj()+". To properly complete this step, make sure that you "+verb()+" the "+noun()+" "+adverb()+"! You'll know that you've done it when the "+
			   noun()+" begins to "+verb()+".");
	}
	createP("\"Finally, pour all of the above into one giant "+noun()+" and wait until it begins to "+verb()+". Mmhmm, yes, I see!"+
			" Quite convoluted, no? So many ingredients! Ah, well.\" And so the "+enemy+" "+adverb()+"began the process.");
	for(let i = 1; i<=10; i++){
		createP("\"So, "+nth(i)+" I- "+capitalize(choose(exclamation))+"\" "+choose(oops)+" "+choose(oops)+" \""+capitalize(choose(exclamation))+"\"");
		createP("Drat! The "+enemy+" sure did "+verb()+" that step. But maybe it'll work out?")
	}
	createP("In the end, all that the "+enemy+" was left with was "+a(adj())+" mess of "+noun()+". "+capitalize(they(enemy))+" sighed.");
	createP("\"Next time, "+mc+"... Next time...\"");}

	//another little adventure to fill space
	adventure(mc);
	
	//6th chapter - pet throwback
	escape(mcPet, mc);

	//mc and lover go on a date
	date(mc, lover);

	//another little adventure
	adventure(mc);

	//the enemy attacks
	attack(mc, enemy);

	//randomize the rest of the chapters until we have enough words
	for(let ch = 0; ch < 30; ch++){
		let r = floor(random(0, 6));
		if(r == 0){
			adventure(mc);
		}
		else if (r == 1) {
			escape(mcPet, mc);
		}
		else if (r == 2){
			date(mc, lover);
		}
		else if (r == 3){
			attack(mc, enemy);
		}
		else if (r == 4){
			adventure(lover);
		}
		else if (r == 5){
			adventure(enemy);
		}
	}

	//a concluding chapter
	createElement("h2", toTitleCase("In which the "+mc+" lives happily ever after"));
	createP("Wow, what a bunch of adventure. The "+mc+" was growing "+adverb()+" tired of all these schenanigans. I mean, geez, how many times "+
			"can one "+mcPet+" go missing? And how come that weird "+enemy+" keeps showing up and trying to attack "+them(mc)+"? It was really "+
			"getting ridiculous! It was nice to go on so many dates with the "+lover+", but the "+mc+" was thinking it might be time to progress "+
			"things a bit. You could only ask so many questions so many times, after all.");
	createP("\"Yep, I've decided,\" the "+mc+" declared. \"We're bringing an end to all this!\"");
	createP("First, the "+mc+" called "+a(adj())+" fence installer that "+they(mc)+" knew, and had them install some fencing around the "+adj()+
		   " backyard. Then "+they(mc)+" got a new and improved leash, and installed a new "+adj()+" lock on the front door. The "+mcPet+" "+verbed()+
		   " "+adverb()+".");
	createP("\"No whining from you, "+mcPet+"!\" the "+mc+" "+verbed()+". \"You are NOT getting out again!\"");
	let weapon = adj()+ " "+noun();
	createP("Next, the "+mc+" grabbed their trusty "+weapon+" and went out into "+choose(place)+", making sure to look as vulnerable as possible.");
	createP("Suddenly, the "+enemy+" appeared!");
	createP("\"Ha! I've got you now, you--");
	createP(choose(oops));
	createP("The "+mc+"hit the "+enemy+" over the head with "+their(mc)+" "+weapon+". "+capitalize(they(enemy))+" were out like a light.");
	createP("\"That'll show "+them(enemy)+",\" the "+mc+" muttered. They left a note on the unconscious body saying, \"AND DON'T COME BACK!\"");
	createP("Finally, the "+mc+" got all dressed up in "+their(mc)+" nicest "+adj()+" clothes and called the "+lover+".");
	createP("\"Will you meet me at "+choose(place)+"?\" "+they(mc)+" asked.");
	createP("When the two were together, the "+mc+" got down on one knee.");
	createP("\"You're the most "+adj()+" person I've ever met.\" "+they(mc)+" declared. \"Every moment with you is "+adverb()+" "+
		   adj()+". I'd rather "+verb()+" with you than "+verb()+" "+adverb()+". Will you marry me?\"");
	createP("\"Oh, yes!\" The "+lover+" was overjoyed. "+capitalize(they(lover))+" "+verbed()+" "+adverb()+". The two kissed.");
	createP("And so, as it goes, the two got married, and lived "+adverb()+" together in "+choose(place)+" with the "+mcPet+", who never "+
		   "did escape again. And the "+enemy+", having at last given up on the "+lover+", left them alone.");

	//the end
	createElement("h1","THE END");
	
	
	// this will trigger Paged.js to parse the HTML and render it the book-like layout
	window.PagedPolyfill.preview();
}

