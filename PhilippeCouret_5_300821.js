showRecipes(recipes);/*on appelle la fonction "showrecipes" créée ci-dessous pour afficher les recettes avec la constante "recipes" deja créée dans le fichier js recipes*/


/** Fonction pour afficher toutes les recettes en paramètre
* @param recipeTab: le tableau contenant les recettes à afficher
*/
function showRecipes(recipeTab) { /*fonction qui contient:*/

    let recipeList = document.getElementById("recipeList"); /*cette div est déjà créée dans fichier html*/   
        recipeList.innerHTML = "";

        /*on lance une boucle pour afficher toutes les recettes en répétant le code en partant de index 0 et on l'implemente autant de fois jusque indice soit égal à recipeTab.length (cad aller jusque à la fin du tableau des recettes*/
        for (let i = 0; i < recipeTab.length; i++) {

        /*on crée la div generale vide qui va contenir tous les objects nécessaire constituant la boite recette*/
        let newRecipe = document.createElement("a");
        newRecipe.setAttribute("class", "recipe");
        // newRecipe.setAttribute("href", "newRecipe.html"); *************    A REMETTRE QD CSS TERMINE   ***************
        newRecipe.setAttribute("id", i + 1);

        /*on crée une image*/
        let recipePhoto = document.createElement("img");
        recipePhoto.setAttribute("class", "recipePhoto");
        recipePhoto.setAttribute("alt", "photo recipe");

        /*on met l'objet image dans l'objet div:*/
        newRecipe.appendChild(recipePhoto);

        /*on crée la div recipeInfo*/
        let recipeInfo = document.createElement("div");
        recipeInfo.setAttribute("class", "recipeInfo");

        /*on met l'objet recipeInfo dans l'objet div generale:*/
        newRecipe.appendChild(recipeInfo);

        /*on crée la div recipeHeader*/
        let recipeHeader = document.createElement("div");
        recipeHeader.setAttribute("class", "recipeHeader");

        /*on met l'objet recipeHeader dans l'objet div recipeInfo:*/
        recipeInfo.appendChild(recipeHeader);

        /*on crée les objets name + icon + time qui sont dans la div recipeHeader*/
        let recipeName = document.createElement("h1");
        recipeName.setAttribute("class", "name");
        recipeName.innerHTML = recipeTab[i]["name"];  /*on va chercher l'intitulé de la recette*/

        let timeIcon = document.createElement("i");
        timeIcon.setAttribute("class", "far fa-clock");

        let recipeTime = document.createElement("h1");
        recipeTime.setAttribute("class", "time");
        recipeTime.innerHTML = recipeTab[i]["time"] + " min";  /*on va chercher le temps de la recette avec + " min" pour avoir espace entre time et min*/

        /*on met les objets name + icon + time dans l'objet div recipeHeader:*/
        recipeHeader.appendChild(recipeName);
        recipeHeader.appendChild(timeIcon);
        recipeHeader.appendChild(recipeTime);

        /*on crée la div recipeDetails*/
        let recipeDetails = document.createElement("div");
        recipeDetails.setAttribute("class", "recipeDetails");

        /*on met l'objet recipeDetails dans l'objet div generale:*/
        newRecipe.appendChild(recipeDetails);

        /* on va chercher une partie des info contenues dans le tab recipes, soit la partie "description" et on limite son visuel à 300 caractères */
        let instructions = recipeTab[i]["description"];
        const maxLength = 300;

        /*on crée la div recipeDescription*/
        let recipeDescription = document.createElement("div");
        recipeDescription.setAttribute("class", "recipeDescription");
        recipeDescription.innerHTML = instructions.length>maxLength ? instructions.substring(0, maxLength) + "..." : instructions;  /*on va chercher les instructions de la recette*/
            /* instructions ternaires: ? => if // ":" =>else*/

        // to be deleted (replaced by line85 all in 1):
        //   if (instructions.length > maxLength) {
        //     recipeDescription.innerHTML = instructions.substring(0, maxLength) + "..."; /*pour limiter la longueur des instructions - si trop long; ...*/
        // }

        /*on met l'objet recipeDescription dans l'objet div generale recipe:*/
        recipeDetails.appendChild(recipeDescription);

        /*on crée la liste ul des recipeIngredients*/
        let recipeIngredients = document.createElement("ul");
        recipeIngredients.setAttribute("class", "ingredients");

        /*on met l'objet recipeIngredients dans l'objet div generale recipe:*/
        recipeDetails.appendChild(recipeIngredients);

        let ingredientsTab = recipeTab[i]["ingredients"];

        for (let j = 0; j < ingredientsTab.length; j++) {
            /*pour FOR we need 3 info: 1) initialisation (i=xx) 2) condition pour continuer à faire tourner le code 3) l'incrément (savoir comment évolue la variable quand on fait le tour du code)*/

            /* on va chercher les informations contenues dans le tableau ingrédients*/
            let ingredientData = ingredientsTab[j];

            /*on crée un élément li qui contiendra les info ingredient+quantity+unit si existant*/
            let ingredientInfoList = document.createElement("li");
            ingredientInfoList.innerHTML = `<b>${ingredientData.ingredient}</b>: `
            // "<b>" + ingredientData["ingredient"] + "</b>:  "; /*on a des paires clé/valeurs; on va chercher la valeur de la clé "ingredient"*/

           /* OU BIEN ECRIRE: ingredientInfoList.innerHTML = ingredientData.ingredient + " "*/

            /*dans le cas où seul l'ingrédient apparait sans qty ni unit (par exemple le sel)*/
            if (ingredientData.hasOwnProperty("quantity") == true) { /*dans js possible de ne pas mettre ==true (true est implicite)*/
                ingredientInfoList.innerHTML += ingredientData["quantity"] + " "; /* += pour dire que le texte est, en plus de ingredient, la quantité (si il y a une clé quantity)*/
            }
            if (ingredientData.hasOwnProperty("quantite") == true) { /*dans js possible de ne pas mettre ==true (true est implicite)*/
                ingredientInfoList.innerHTML += ingredientData["quantite"] + " "; /* += pour dire que le texte est, en plus de ingredient, la quantité (si il y a une clé quantity)*/
            }
            if (ingredientData.hasOwnProperty("unit") == true) {
                ingredientInfoList.innerHTML += ingredientData["unit"];/*pour dire qu'on rajoute au texte, l'unité (si il y a une clé unit)*/
            }
            if (ingredientData.hasOwnProperty("unite") == true) {
                ingredientInfoList.innerHTML += ingredientData["unit"];/*pour dire qu'on rajoute au texte, l'unité (si il y a une clé unit)*/
            }
            
            /*on met l'objet li ingredient+qty+unit dans l'objet ul recipeIngredients*/
            recipeIngredients.appendChild(ingredientInfoList);
        }

        /*on ajoute le tout au fichier html*/
        recipeList.appendChild(newRecipe);
    }
}

/*SEARCH BAR*/

const searchinput = document.getElementById("searchInput");
searchinput.addEventListener("keyup", function(){

  const input = searchinput.value;

  /* filter to get all words in title or description of the recipe containing caracters entered in search bar in lowercase or uppercase. */
  const result = recipes.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())||item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
  showRecipes(result);
  let suggestion = "";

  if (input !=""){  /*if field input is not empty show result if not show nothing*/
    result.forEach(resultItem => 
      suggestion += `
      <div class="suggSearch">${resultItem.name}</div>`
    )
  }

  document.getElementById("suggSearch").innerHTML = suggestion;
  
})

/*INGREDIENT TAB*/

/*on crée le tableau vide où seront stockés ensuite tous les ingrédients*/
let tabIngredients = getAllIngr();
/*on écoute ce qui est dans le tableau*/
const searchIngr = document.getElementById("userIngr"); /*on dit ce que l'on va écouter i.e. l'input du user, i.e. userIngr*/

searchIngr.addEventListener("keyup", function(){

    const input = searchIngr.value;

    const resultIngr = recipes.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())||item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    showRecipes(resultIngr);
    let suggestion = "";

    if (input !=""){ /*if input is not empty */
    
       tabIngredients.forEach(currentIngredient=>{ /*on parcourt tout le tableau */

        if (currentIngredient.toLocaleLowerCase().includes(input.toLocaleLowerCase())){ /*et on verifie pour chaque ingredient si il correspond à la recherche et on part sur le principe qu'un même mot ecrit en min puis illeurs en maj va etre considéré les 2 fois en min pour comparer et ne le garder qu'une fois*/

        suggestion += `
        <div class="suggIngr" onclick = "addTag(this,'ingredient')">${currentIngredient}</div>` /* test est la fonction et this est l'argument ou paramètre cad soit l'élement html représenté par <div class="suggIngr" onclick = "addTag(this,'ingrédient')"*/
            
        }  
    }) 
    }
    
    document.getElementById("suggIngr").innerHTML = suggestion;
})

function getAllIngr(){

    let tabAllIngr = []; /*on crée un tableau vide contenant tous les ingredients*/

    recipes.forEach(recette=>{ /*=on parcourt les recettes 1 à 1 avec la variable "recette" qui représente la recette courante en commencant par la recette indice 0 puis indice 1 etc... jusque fin du tableau*/

        recette.ingredients.forEach(currentIngredient=>{   /*current ingredient représente chaque pavé ingredient+qty+unit dans le tableau général des ingrédients d'une recette donnéee*/
        /*currentIngredient n'existe que pour cette boucle: c'est une variable locale donc on peut réutliser le terme dans une autre boucle, fonction etc...*/

        let ingr = currentIngredient.ingredient; /*variable pour éviter les répétitions de currentingredient.infgredient dans cette même boucle locale*/

            if (!tabAllIngr.includes(ingr.toLowerCase())){  /*si un ingrédient d'une des recettes n'est pas déjà (négation traduite par !) listé dans le tableau des ingrédients, on l'affiche*/
                /* quelque soit la facon dont est écrit le mot dans la recette, on le fait remonter en tout en miniscules; on utilise CSS text transorm capitalize pour afficher mots avec 1ère lettre en majuscule*/
            
                tabAllIngr.push(ingr.toLowerCase()); /*push: à chaque boucle, on ajoute l' ingrédient si correspondant à la recherche*/ 
            } 
        })   
    }) 

    return tabAllIngr;
}


/*APPAREILS TAB*/

/*on crée le tableau vide où seront stockés ensuite tous les appareils*/
let tabAppareils = getAllApp();

/*on écoute ce qui est dans le tableau*/

const searchApp = document.getElementById("userApp"); /*on dit ce que l'on va écouter i.e. l'input du user, soit userApp*/

searchApp.addEventListener("keyup", function(){

    const inputApp = searchApp.value;

    /*const resultApp = recipes.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())||item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    showRecipes(resultApp);*/
    let suggestion = "";

    if (inputApp !=""){ /*if input is not empty */
    
       tabAppareils.forEach(currentAppareil=>{ /*on parcourt tout le tableau */

        if (currentAppareil.toLocaleLowerCase().includes(inputApp.toLocaleLowerCase())){ /*et on verifie pour chaque appareil si il correspond à la recherche et on part sur le principe qu'un même mot ecrit en min puis ailleurs en maj va etre considéré les 2 fois en min pour comparer et ne le garder qu'une fois*/

        suggestion += `
        <div class="suggApp" onclick = "addTag(this,'appareil')">${currentAppareil}</div>` /* test est la fonction et this est l'argument ou paramètre cad soit l'élement html représenté par <div class="suggApp" onclick = "addTag(this,'appareil')"*/
            
        }  
    }) 
    }
    
    document.getElementById("suggApp").innerHTML = suggestion;
})

function getAllApp(){

    let tabAllApp = []; /*on crée un tableau vide contenant tous les appareils*/

    recipes.forEach(recette=>{ /*=on parcourt les recettes 1 à 1 avec la variable "recette" qui représente la recette courante en commencant par la recette indice 0 puis indice 1 etc... jusque fin du tableau*/

        let app = recette.appliance; /*variable pour aller chercher l'info appareil dans chaque recette*/

            if (!tabAllApp.includes(app.toLowerCase())){  /*si un ingrédient d'une des recettes n'est pas déjà (négation traduite par !) listé dans le tableau des ingrédients, on l'affiche*/
                /* quelque soit la facon dont est écrit le mot dans la recette, on le fait remonter en tout en miniscules; on utilise CSS text transorm capitalize pour afficher mots avec 1ère lettre en majuscule*/
            
                tabAllApp.push(app.toLowerCase()); /*push: à chaque boucle, on ajoute l' appareil si correspondant à la recherche*/ 
            }   
    }) 

    return tabAllApp;
}

/*USTENSILES TAB*/

/*on crée le tableau vide où seront stockés ensuite tous les ingrédients*/
let tabUstensiles = getAllUst();

/*on écoute ce qui est dans le tableau*/

const searchUst = document.getElementById("userUst"); /*on dit ce que l'on va écouter i.e. l'input du user, soit userUst*/

searchUst.addEventListener("keyup", function(){

    const input = searchUst.value;

    const resultUst = recipes.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())||item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    showRecipes(resultUst);
    let suggestion = "";

    if (input !=""){ /*if input is not empty */
    
       tabUstensiles.forEach(currentUstensile=>{ /*on parcourt tout le tableau */

        if (currentUstensile.toLocaleLowerCase().includes(input.toLocaleLowerCase())){ /*et on verifie pour chaque ingredient si il correspond à la recherche et on part sur le principe qu'un même mot ecrit en min puis illeurs en maj va etre considéré les 2 fois en min pour comparer et ne le garder qu'une fois*/

        suggestion += `
        <div class="suggUst" onclick = "addTag(this,'ustensils')">${currentUstensile}</div>` /* test est la fonction et this est l'argument ou paramètre cad soit l'élement html représenté par <div class="suggIngr" onclick = "addTag(this,'ingrédient')"*/
            
        }  
    }) 
    }
    
    document.getElementById("suggUst").innerHTML = suggestion;
})

function getAllUst(){

    let tabAllUst = []; /*on crée un tableau vide contenant tous les ustensiles*/

    recipes.forEach(recette=>{ /*=on parcourt les recettes 1 à 1 avec la variable "recette" qui représente la recette courante en commencant par la recette indice 0 puis indice 1 etc... jusque fin du tableau*/

        recette.ustensils.forEach(currentUstensile=>{   /*current ingredient représente chaque pavé ingredient+qty+unit dans le tableau général des ingrédients d'une recette donnéee*/
        /*currentIngredient n'existe que pour cette boucle: c'est une variable locale donc on peut réutliser le terme dans une autre boucle, fonction etc...*/

        let ust = currentUstensile; /*variable pour éviter les répétitions de currentingredient.infgredient dans cette même boucle locale*/

            if (!tabAllUst.includes(ust.toLowerCase())){  /*si un ingrédient d'une des recettes n'est pas déjà (négation traduite par !) listé dans le tableau des ingrédients, on l'affiche*/
                /* quelque soit la facon dont est écrit le mot dans la recette, on le fait remonter en tout en minuscules; on utilise CSS text transform capitalize pour afficher mots avec 1ère lettre en majuscule*/
            
                tabAllUst.push(ust.toLowerCase()); /*push: à chaque boucle, on ajoute l' ingrédient si correspondant à la recherche*/ 
            } 
        })   
    }) 

    return tabAllUst;
}


/*Add Tags*/

function addTag(element,type){
    if(type=='ingredient'){
        let tagIngr = document.getElementById('tagIngr'); /*on va chercher le tag qui correspond au type ingredient sur lequel on a cliqué dans les suggestions  */
        tagIngr.style.display = 'block'; /* on fait apparaitre le tag pour annuler le display none du CSS*/

        let label = tagIngr.getElementsByTagName('label')[0]; /*on va chercher le label cad l'élément qui contient le nom de l'ingredient sélectionné*/
        label.innerHTML = element.innerHTML; /*ceci permet de faire remonter le texte du label cad le contenu du label prend pour valeur le contenu de l'élément*/
    }
    else if(type=='appareil'){
        let tagApp = document.getElementById('tagApp'); /*on va chercher le tag qui correspond au type appareil sur lequel on a cliqué dans les suggestions  */
        tagApp.style.display = 'block'; /* on fait apparaitre le tag pour annuler le display none du CSS*/

        let label = tagApp.getElementsByTagName('label')[0]; /*on va chercher le label cad l'élément qui contient le nom de l'ingredient sélectionné*/
        label.innerHTML = element.innerHTML; /*ceci permet de faire remonter le texte du label cad le contenu du label prend pour valeur le contenu de l'élément*/
    }   
    else if(type=='ustensils'){
        let tagUst = document.getElementById('tagUst'); /*on va chercher le tag qui correspond au type appareil sur lequel on a cliqué dans les suggestions  */
        tagUst.style.display = 'block'; /* on fait apparaitre le tag pour annuler le display none du CSS*/

        let label = tagUst.getElementsByTagName('label')[0]; /*on va chercher le label cad l'élément qui contient le nom de l'ingredient sélectionné*/
        label.innerHTML = element.innerHTML; /*ceci permet de faire remonter le texte du label cad le contenu du label prend pour valeur le contenu de l'élément*/
    }   
} 

/*Close Tag*/

function closeTag(tag){
    tag.parentNode.style.display = 'none'; 
  }