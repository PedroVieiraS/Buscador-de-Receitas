// const url = (`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
const recipeItem = document.querySelector('.receita-in')

const recipeItem1 = document.querySelector('.receita-in1')

// vou ter que pegar o id atravez do localstorage

const DB_KEY = '@recipe.finder'
const apiKey = 'bcda7b34c8df4e54b35b63663942ac39'

if (window.location.pathname.includes('receitas.html')) {
    const storage = localStorage.getItem(DB_KEY)

    if (storage) {
        const recipes = JSON.parse(storage);

        // recipes.forEach(recipe => {
        //     console.log(recipe.id)
        // }) nao precisa pois ele retorna somente uma

 
        const recipeId = recipes.id;
        console.log(recipeId)

        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`).then((response) => {
            const recipe = response.data;
            console.log(recipe)

            // document.querySelector('.h2-titulo').textContent = recipe.title; 
            // document.querySelector('.receita-in img').src = recipe.image;
            // document.querySelector('.p1').textContent = recipe.extendedIngredients.map(ingredient => ingredient.name).join(', ');
            // document.querySelector('.p2').textContent = recipe.instructions.replace(/<\/?li>/g, '').replace(/<\/?ol>/g, '');;

            recipeItem1.innerHTML = ""
            recipeItem1.innerHTML =`
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><strong>Ingredients:</strong> ${recipe.extendedIngredients.map(ingredient=>ingredient.original).join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>`;


        }).catch(err => {console.error(err);});

        

        

    } else {
        recipeItem.innerHTML = ""
        recipeItem.innerHTML = '<p>Nenhum repositório selecionado.</p>';
    }
}
