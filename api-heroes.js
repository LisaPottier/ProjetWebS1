
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


	// Ajouter un superhéro dans l'input
	function GetInput($this) {
		console.log("in getinput !");
		  var txt;
		  // récupére la valeur de l'input
		  persoUser = $this.previousElementSibling.value;
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
  			var lowercase = perso.name.toLowerCase();
  			/*si le nom du superhero rentré par l'utilisateur est strictement identique à un des noms du tableau de résultat alors affiche-le */
  			if(perso.name == persoUser || lowercase == persoUser){
  				
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
			  	alert("The winner is team 2 !");
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
			  	alert("The winner is team 1 !");
			});
		}
	},false); 


