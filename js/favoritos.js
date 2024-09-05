const DB_KEY_FAV = '@fav.recipe';
const DB_KEY = '@recipe.finder'

function getRecipeFav() {
  const recipes = localStorage.getItem(DB_KEY_FAV);

  if (recipes) {
    const parsedRecipes = JSON.parse(recipes).recipes; 
    displayResults(parsedRecipes); 
  } else {
    displayResults([]); 
  }
}


function displayResults(recipes) {
  const results = document.querySelector('.results');

  results.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeItem = document.createElement('div');
    recipeItem.className = 'recipe-item';
    
    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = recipe.title;

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;

    const recipeLink = document.createElement('a');
    recipeLink.href = "/receitas.html";
    recipeLink.textContent = "Ver receita";
    recipeLink.onclick = () => {
      saveRepositoryInfo(recipe);
    };

    const recipeRemove = document.createElement('button');
    recipeRemove.textContent = "Remover dos Favoritos";
    recipeRemove.onclick = () => {
      removeRecipe(recipe.id); 
    };

    recipeItem.appendChild(recipeImage);
    recipeItem.appendChild(recipeTitle);
    recipeItem.appendChild(recipeLink);
    recipeItem.appendChild(recipeRemove);
    
    
    results.appendChild(recipeItem);
  });
}

function removeRecipe(recipeId) {
    const recipes = localStorage.getItem(DB_KEY_FAV);
  
    if (recipes) {
      const parsedRecipes = JSON.parse(recipes);
      const updatedRecipes = parsedRecipes.recipes.filter(recipe => recipe.id !== recipeId);
  
      localStorage.setItem(DB_KEY_FAV, JSON.stringify({ recipes: updatedRecipes }));
  
      displayResults(updatedRecipes);
    }
  }

function saveRepositoryInfo(repo) {
    localStorage.setItem(DB_KEY, JSON.stringify(repo));
  }


getRecipeFav();
