
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

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var superheroes = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the superheroes array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), superheroes);
