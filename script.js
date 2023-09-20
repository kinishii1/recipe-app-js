const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const input = document.querySelector('#user-inp')
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener('click', () => {
  input.style.borderBottom = '2px solid black'
  input.style.color = 'black'
  const userInput = input.value;
  fetch(`${url}${userInput}`)
    .then(res => res.json())
    .then(dataRes => {
      console.log(dataRes)
      const data = dataRes.meals[0]
      result.innerHTML = `
      <div class='hide-result'>
        <img src='${data.strMealThumb}' class='result-image'>
        <div class="details">
          <h2>${data.strMeal}</h2>
          <h4>${data.strArea}</h4>
        </div>
        <div id="ingredient-con">
        </div>
      </div>
        <div id="recipe">
          <button id="hide-recipe"><i class="fa fa-times"></i></button>
          <p id="instructions">
            ${data.strInstructions}
          </p>
        </div>
      `;

      let count = 1;
      let ingredients = [];
      for (let i in data) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && data[i]) {
          ingredient = data[i];
          measure = data[`strMeasure` + count];
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      let ingredientCon = document.getElementById("ingredient-con");
      let parent = document.createElement("ul");
      let recipe = document.getElementById("recipe");
      let hideRecipe = document.getElementById("hide-recipe");
      let showRecipe = document.getElementById("show-recipe"); 
      let hideResult = document.querySelector('.hide-result')
      let searchContainer = document.querySelector('.search-container')
      ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
        ingredientCon.appendChild(parent);
      });

      showRecipe.style.display = 'block';

      hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
        searchContainer.style.display = 'flex'
        hideRecipe.style.display = 'none'
        hideResult.style.display = 'block'
        showRecipe.style.display = 'block'
      });
      showRecipe.addEventListener("click", () => {
        hideResult.style.display = 'none'
        showRecipe.style.display = 'none'
        hideRecipe.style.display = 'block'
        searchContainer.style.display = 'none'
        recipe.style.display = "block";
      });
    }).catch(()=>{
      let showRecipe = document.getElementById("show-recipe"); 
      showRecipe.style.display = 'none';
      input.style.borderBottom = 'red 2px solid'
      input.style.color = 'red'
      result.innerHTML = `<h3>Meal not found</h3>`
    })
})

