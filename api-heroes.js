
	let persoUser; // nom du héros rentré par l'utilisateur
	//var powers;
	var ListPowers=[];
	var listePowersTeam1=[];
	var listePowersTeam2=[];
	var nbentries;
	let winner;
	let nbHeroes = 0;
	console.log("api.js linked ");
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	const url = "https://superheroapi.com/api/";
	var start = document.getElementById('boutonStart');
	var superheroes = ["A-Bomb", "Abe Sapien", "Abin Sur", "Abomination", "Abraxas", "Absorbing Man", "Adam Monroe", "Adam Strange", "Agent Bob", "Agent Zero", "Air-Walker", "Ajax", "Alan Scott", "Alex Mercer", "Alfred Pennyworth", "Alien", "Amazo", "Angel", "Angel", "Angel Dust", "Angel Salvadore", "Animal Man", "Annihilus", "Ant-Man", "Ant-Man II", "Anti-Monitor", "Anti-Venom", "Apocalypse", "Aquababy", "Aqualad", "Aquaman", "Arachne", "Archangel", "Arclight", "Ardina", "Ares", "Ariel", "Armor", "Atlas", "Atlas", "Atom Girl", "Atom II", "Aurora", "Azazel", "Azrael", "Bane", "Banshee", "Bantam", "Batgirl", "Batgirl IV", "Batgirl VI", "Batman", "Batman", "Batman II", "Battlestar", "Batwoman V", "Beast", "Beast Boy", "Ben 10", "Beta Ray Bill", "Beyonder", "Big Barda", "Big Daddy", "Big Man", "Bill Harken", "Bionic Woman", "Bird-Brain", "Bishop", "Bizarro", "Black Adam", "Black Bolt", "Black Canary", "Black Canary", "Black Cat", "Black Flash", "Black Knight III", "Black Lightning", "Black Mamba", "Black Manta", "Black Panther", "Black Widow", "Blackout", "Blackwing", "Blackwulf", "Blade", "Bling!", "Blink", "Blizzard II", "Blob", "Bloodaxe", "Bloodhawk", "Blue Beetle III", "Boba Fett", "Boom-Boom", "Box IV", "Brainiac", "Brainiac 5", "Brundlefly", "Buffy", "Bullseye", "Bumblebee", "Bushido", "Cable", "Callisto", "Cameron Hicks", "Cannonball", "Captain America", "Captain Atom", "Captain Britain", "Captain Cold", "Captain Hindsight", "Captain Marvel", "Captain Marvel", "Captain Marvel II", "Captain Planet", "Carnage", "Catwoman", "Century", "Chamber", "Chameleon", "Changeling", "Cheetah", "Cheetah III", "Chuck Norris", "Citizen Steel", "Claire Bennet", "Cloak", "Clock King", "Colossus", "Copycat", "Cottonmouth", "Crystal", "Cyborg", "Cyborg Superman", "Cyclops", "Dagger", "Daphne Powell", "Daredevil", "Darkhawk", "Darkman", "Darkseid", "Darkstar", "Darth Maul", "Darth Vader", "Dash", "Data", "Dazzler", "Deadman", "Deadpool", "Deadshot", "Deathlok", "Deathstroke", "Demogoblin", "Destroyer", "Diamondback", "DL Hawkins", "Doc Samson", "Doctor Doom", "Doctor Fate", "Doctor Octopus", "Doctor Strange", "Domino", "Donatello", "Doomsday", "Doppelganger", "Dormammu", "Dr Manhattan", "Drax the Destroyer", "Ego", "Elastigirl", "Electro", "Elektra", "Elle Bishop", "Elongated Man", "Emma Frost", "Enchantress", "Ethan Hunt", "Etrigan", "Evil Deadpool", "Evilhawk", "Exodus", "Falcon", "Fallen One II", "Faora", "Feral", "Fin Fang Foom", "Firebird", "Firelord", "Firestar", "Firestorm", "Firestorm", "Flash", "Flash II", "Flash III", "Flash IV", "Forge", "Franklin Richards", "Franklin Storm", "Frenzy", "Galactus", "Gambit", "Gamora", "Gary Bell", "General Zod", "Ghost Rider", "Giganta", "Gladiator", "Goblin Queen", "Godzilla", "Gog", "Goku", "Gorilla Grodd", "Gravity", "Greedo", "Green Arrow", "Green Goblin", "Green Goblin II", "Groot", "Guy Gardner", "Hal Jordan", "Han Solo", "Hancock", "Harley Quinn", "Harry Potter", "Havok", "Hawk", "Hawkeye", "Hawkeye II", "Hawkgirl", "Heat Wave", "Hela", "Hellboy", "Hellcat", "Hercules", "Hit-Girl", "Hope Summers", "Hulk", "Human Torch", "Huntress", "Husk", "Hybrid", "Hydro-Man", "Hyperion", "Iceman", "Impulse", "Indiana Jones", "Indigo", "Ink", "Invisible Woman", "Iron Fist", "Iron Man", "Iron Monger", "Isis", "Jack of Hearts", "Jack-Jack", "James Bond", "James T. Kirk", "Jar Jar Binks", "Jason Bourne", "Jean Grey", "Jean-Luc Picard", "Jennifer Kale", "Jessica Cruz", "Jessica Jones", "Jim Powell", "JJ Powell", "John Constantine", "John Wraith", "Joker", "Jolt", "Jubilee", "Judge Dredd", "Juggernaut", "Junkpile", "Justice", "Kang", "Kathryn Janeway", "Katniss Everdeen", "Kevin 11", "Kick-Ass", "Kid Flash", "Killer Croc", "Killer Frost", "Kilowog", "King Kong", "King Shark", "Kingpin", "Klaw", "Kool-Aid Man", "Kraven II", "Kraven the Hunter", "Krypto", "Kyle Rayner", "Kylo Ren", "Lady Deathstrike", "Leader", "Leech", "Legion", "Leonardo", "Lex Luthor", "Light Lass", "Lightning Lad", "Lightning Lord", "Living Brain", "Living Tribunal", "Lizard", "Lobo", "Loki", "Longshot", "Luke Cage", "Luke Skywalker", "Luna", "Mach-IV", "Machine Man", "Magneto", "Magog", "Magus", "Man of Miracles", "Man-Bat", "Man-Thing", "Man-Wolf", "Mandarin", "Mantis", "Martian Manhunter", "Marvel Girl", "Master Chief", "Match", "Matt Parkman", "Maverick", "Maxima", "Maya Herrera", "Medusa", "Meltdown", "Mephisto", "Mera", "Metallo", "Metron", "Micah Sanders", "Michelangelo", "Micro Lad", "Mimic", "Misfit", "Miss Martian", "Mister Fantastic", "Mister Freeze", "Mister Knife", "Mister Mxyzptlk", "Mister Sinister", "Mister Zsasz", "Mockingbird", "MODOK", "Molten Man", "Monica Dawson", "Moon Knight", "Moonstone", "Morlun", "Moses Magnum", "Mr Immortal", "Mr Incredible", "Ms Marvel II", "Multiple Man", "Mysterio", "Mystique", "Namor", "Namora", "Namorita", "Naruto Uzumaki", "Nebula", "Negasonic Teenage Warhead", "Nick Fury", "Nightcrawler", "Nightwing", "Niki Sanders", "Nina Theroux", "Northstar", "Nova", "Nova", "Odin", "Offspring", "One Punch Man", "One-Above-All", "Onslaught", "Oracle", "Osiris", "Ozymandias", "Parademon", "Paul Blart", "Penguin", "Phantom Girl", "Phoenix", "Plantman", "Plastic Man", "Plastique", "Poison Ivy", "Polaris", "Power Girl", "Predator", "Professor X", "Professor Zoom", "Psylocke", "Punisher", "Purple Man", "Pyro", "Q", "Question", "Quicksilver", "Quill", "Ra's Al Ghul", "Rachel Pirzad", "Rambo", "Raphael", "Raven", "Ray", "Red Arrow", "Red Hood", "Red Hulk", "Red Mist", "Red Robin", "Red Skull", "Red Tornado", "Rey", "Rhino", "Rick Flag", "Riddler", "Rip Hunter", "Robin", "Robin II", "Robin III", "Robin V", "Robin VI", "Rocket Raccoon", "Rogue", "Ronin", "Rorschach", "Sabretooth", "Sage", "Sandman", "Sasquatch", "Sauron", "Savage Dragon", "Scarecrow", "Scarlet Spider", "Scarlet Spider II", "Scarlet Witch", "Scorpia", "Scorpion", "Sebastian Shaw", "Sentry", "Shadow King", "Shadow Lass", "Shadowcat", "Shang-Chi", "Shatterstar", "She-Hulk", "She-Thing", "Shocker", "Shriek", "Sif", "Silk", "Silver Surfer", "Silverclaw", "Simon Baz", "Sinestro", "Siren", "Siryn", "Skaar", "Snowbird", "Sobek", "Solomon Grundy", "Songbird", "Space Ghost", "Spawn", "Spectre", "Speedy", "Spider-Girl", "Spider-Gwen", "Spider-Man", "Spider-Woman", "Spider-Woman III", "Spock", "Spyke", "Star-Lord", "Stardust", "Starfire", "Stargirl", "Static", "Steel", "Stephanie Powell", "Steppenwolf", "Storm", "Stormtrooper", "Sunspot", "Superboy", "Superboy-Prime", "Supergirl", "Superman", "Swamp Thing", "Swarm", "Sylar", "Synch", "T-1000", "T-800", "T-850", "T-X", "Taskmaster", "Tempest", "Thanos", "The Cape", "The Comedian", "Thing", "Thor", "Thor Girl", "Thunderbird", "Thunderstrike", "Thundra", "Tiger Shark", "Tigra", "Tinkerer", "Toad", "Toxin", "Toxin", "Triplicate Girl", "Triton", "Two-Face", "Ultragirl", "Ultron", "Utgard-Loki", "Vanisher", "Vegeta", "Venom", "Venom II", "Venom III", "Venompool", "Vibe", "Vindicator", "Violet Parr", "Vision", "Vixen", "Vulture", "Walrus", "War Machine", "Warlock", "Warp", "Warpath", "Wasp", "Watcher", "White Canary", "Wildfire", "Winter Soldier", "Wolfsbane", "Wolverine", "Wonder Girl", "Wonder Man", "Wonder Woman", "Wyatt Wingfoot", "X-23", "X-Man", "Yellowjacket", "Yellowjacket II", "Ymir", "Yoda", "Zatanna", "Zoom"]



	// Ajouter un superhéro dans l'input
	function GetInput($this) {
		console.log("in getinput !");
		  var txt;
		  // récupére la valeur de l'input
			persoUser = $this.previousElementSibling.value;
		  console.log(persoUser);
		  /* récupére le nom des classes du container parent le plus proche de classe "team" de l'input */
		  var team = $this.closest(".team").className; 
		  console.log(team);
		  if (persoUser == null || persoUser == "") {
		    txt = alert("no input");
		  } else {
		    txt = alert("Your search is about " + persoUser);
		  }
		  //lancement de la recherche dans l'API
		  const responseAPI = userAction(persoUser, team);
	}

	// Appel de l'API
	async function userAction(query, team) {
		const token = '882791785790879';
		let obj;
		let search = "/search/";
		let options =  search + query;
		
	    const response = await fetch(proxyurl + url + token + options)
	  	const myJson = await response.json()
	  						.then((response) => {
  													obj = response.results;
													Isinteger = false;
													console.log('success!', response);
													showPersos(obj, team);
					 							})
							.catch((e) => {
					 								console.log('some error happened', e);
					 						});
	}


	PowersSomme = (perso) => {
		var powers = perso.powerstats;
		var sommePowers = 0;
		for(var value in powers)
		{
			var conversion = parseInt(powers[value]);
			sommePowers = sommePowers + conversion;
		}
		console.log("somme des pouvoirs : " + sommePowers);

		perso.sommePowers = sommePowers;
		return perso;
	}

	// Détermine la team gagnante selon la somme des pouvoirs de chaque héros de la team
	PowersFight = (listTeam1, listTeam2) => {
		var winner;
		var total1 = 0;
		var total2 = 0;
		for(var i=0;i<listTeam1.length;i++){
			total1 = total1 + listTeam1[i].sommePowers;
			console.log(listTeam1[i].sommePowers);
		}
		for(var i=0;i<listTeam2.length;i++){
			total2 = total2 + listTeam2[i].sommePowers;
			console.log(listTeam2[i].sommePowers);
		}
		if(total1 > total2){
			winner = listTeam1;
		}
		else{
			winner = listTeam2;
		}
		return winner;
	}

	showPersos = (persos, team) => {
		let charactersContainer; 
		let numeroTeam;
		ListPowers=[];
		// détermine de quelle équipe vient l'ajout du héros
		if(team == "team team1"){
			console.log("team1");
			 charactersContainer= document.querySelector('.team1 .heroes_name');
			 numeroTeam = "team1";
			 ListPowers = listePowersTeam1;
		}
	    else{
	    	console.log("team2");
	    	charactersContainer = document.querySelector('.team2 .heroes_name');
	    	numeroTeam = "team2";
	    	ListPowers = listePowersTeam2;
	    }
	    /* div dans le menu qui contiendra le nom du héro (h4) et un bouton supprimer (button)*/ 
	    const characterDiv = document.createElement('div');
	    const characterh4 = document.createElement('h4');
	    /* création du classe générale "name" et d'une seconde numérotée selon le nombre de héros ajoutés */
	    characterh4.className = "name name"+ nbHeroes;
	    const characterbutton = document.createElement('button');
	    characterbutton.innerHTML = '+';
	    charactersContainer.append(characterDiv);
	    characterDiv.append(characterh4);
	    characterDiv.append(characterbutton);
	  	
	  	/* L'API renvoie un tableau de un ou plusieurs héros selon la recherche */
  		persos.forEach(perso => {
  			/*si le nom du superhero rentré par l'utilisateur est strictement identique à un des noms du tableau de résultat alors affiche-le */
  			if(perso.name.toLowerCase() == persoUser.toLowerCase() ){
  				persoUser = "";
  				perso.team = numeroTeam;
  				// on insère dans le menu le nom du héros sélectionné
  				document.querySelector('.'+numeroTeam+' .name'+ nbHeroes).innerHTML = perso.name;
  				nbHeroes = nbHeroes + 1;
  				// on ajoute l'image du héros dans le champs de combat
  				const characterBattleField = document.querySelector('#combat_'+numeroTeam);
			    const characterImage = document.createElement('img');
			    characterImage.className = "heroesImg";
			    characterImage.setAttribute('src', perso.image.url);
				characterImage.setAttribute('alt', 'image du héros '+perso.name);
			    characterBattleField.append(characterImage);
			    //on ajoute dans le tableau des pouvoirs de l'équipe la somme des pouvoirs de chaque héros
			    nbentries = ListPowers.push(PowersSomme(perso));

			}else{
				console.log("nom pas strictement égal : " + perso.name);
			}
	  	});
  	}
		
	// Appui sur le bouton "LANCER LE MATCH"
	start.addEventListener('click', function(){
		console.log(listePowersTeam1);
		console.log(listePowersTeam2);
		winner = PowersFight(listePowersTeam1, listePowersTeam2);
		for(var i=0;i<winner.length;i++){
			console.log(winner[i].name);
		}
		// sélection des barres de vie de chaque team
		var lifebarG = document.querySelector('.lifebar.child.gauche');
		var lifebarD = document.querySelector('.lifebar.child.droit');
		// mise en place de l'animation des barres de vie selon la team gagnante
		if(winner[0].team == "team2"){
		    lifebarD.style.transition = 'transform ' + 7 +'s linear';
		    lifebarD.style.transform = 'scaleX(0)';
		    lifebarG.style.transition = 'transform ' + 5 +'s linear';
		    lifebarG.style.transform = 'scaleX(0)';
		    /* lorsque l'animation de la barre de la team perdante se termine
		    alors celle de la team gagnante s'arrête là où elle est */
		    lifebarG.addEventListener('transitionend', function(e) {
		    	console.log("stop lifebarD");
			  	lifebarD.style.transform = 'scaleX('+ 2/7 +')';
			});
		}
		else{
			lifebarG.style.transition = 'transform ' + 7 +'s linear';
		    lifebarG.style.transform = 'scaleX(0)';
		    lifebarD.style.transition = 'transform ' + 5 +'s linear';
		    lifebarD.style.transform = 'scaleX(0)';
		    lifebarD.addEventListener('transitionend', function(e) {
		    	console.log("stop lifebarG");
			  	lifebarG.style.transform = 'scaleX('+ 2/7 +')';
			});
		}
	},false); 


//-------------------------------------

      if (e.keyCode == 40) {