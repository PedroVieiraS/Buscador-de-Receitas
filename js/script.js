const form = document.querySelector('#search-form');
const query = document.querySelector('#search')
const DB_KEY = '@recipe.finder'
const apiKey = 'bcda7b34c8df4e54b35b63663942ac39'

const DB_KEY_FAV = '@fav.recipe'


form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(`${query.value}`);

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query.value}`)
    .then((response) => {
        const recipes = response.data.results;
        console.log(response.data)
        displayResults(recipes);
        recipes.forEach(recipe => {
            console.log(`ID: ${recipe.id}`);
        });
    })
    .catch(error => console.error('Erro ao buscar receitas: ',error )
    )


    function displayResults(recipes) {
        const results = document.querySelector('.results')

        query.value = ""

        results.innerHTML = ''

        recipes.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            
            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.title;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;

            const recipeLink = document.createElement('a');
            recipeLink.href = "/receitas.html"
            recipeLink.textContent = "Ver receita";
            recipeLink.onclick = () => {
                saveRepositoryInfo(recipe)
            };

            const recipeFavorite = document.createElement('p');
            recipeFavorite.textContent = "Favoritar receita";
            recipeFavorite.onclick = () => {
                favRecipes(recipe)
                console.log(recipe)
            };

            recipeItem.appendChild(recipeImage); 
            recipeItem.appendChild(recipeTitle);
            recipeItem.appendChild(recipeLink);
            recipeItem.appendChild(recipeFavorite);
            results.appendChild(recipeItem);
        })
    }
});


function saveRepositoryInfo(repo) {
    localStorage.setItem(DB_KEY, JSON.stringify(repo));
  }

function favRecipes(recipe) {
    const storage = localStorage.getItem(DB_KEY_FAV);

    const newRecipe = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      };


    if (storage) {
    const storageParsed = JSON.parse(storage);

    const recipeExists = storageParsed.recipes.some(r => r.id === newRecipe.id);

    if (recipeExists) {
        console.log("A receita já está salva.");
        return;
      }

    const recipes = [...storageParsed.recipes, newRecipe];

    return localStorage.setItem(DB_KEY_FAV, JSON.stringify({ recipes: recipes }));
    }

    return localStorage.setItem(DB_KEY_FAV, JSON.stringify({ recipes: [newRecipe] }));

    
}


