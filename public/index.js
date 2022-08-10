
const get = document.getElementById("get")
const sug = document.getElementById("sug")
const result = document.getElementById("result")
const searchButton = document.getElementById("searchButton")
const grs = document.getElementById("grs")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const sButton = document.getElementById("sButton")
const allStars = document.querySelectorAll('.stars')

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchButton.addEventListener("click", () => {
    let userInp = document.getElementById("userInput").value;
    if (userInp.length == 0) {
      result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    } else {
      fetch(url + userInp)
        .then((response) => response.json())
        .then((data) => {
          let myDessert = data.meals[0];
          // console.log(myDessert);
          // console.log(myDessert.strMealThumb);
          // console.log(myDessert.strMeal);
          // console.log(myDessert.strArea);
          // console.log(myDessert.strInstructions);
          let count = 1;
          let ingredients = [];
          for (let i in myDessert) {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && myDessert[i]) {
              ingredient = myDessert[i];
              measure = myDessert[`strMeasure` + count];
              count += 1;
              ingredients.push(`${measure} ${ingredient}`);
            }
          }
          console.log(ingredients);
          result.innerHTML = `
      <img src=${myDessert.strMealThumb}>
      <div class="details">
          <h2>${myDessert.strMeal}</h2>
          <h4>${myDessert.strArea}</h4>
      </div>
      <div id="ingredient-con"></div>
      <div id="recipe">
          <button id="hide-recipe">X</button>
          <pre id="instructions">${myDessert.strInstructions}</pre>
      </div>
      <button id="show-recipe">View Recipe</button>
      `;
          let ingredientCon = document.getElementById("ingredient-con");
          let parent = document.createElement("ul");
          let recipe = document.getElementById("recipe");
          let hideRecipe = document.getElementById("hide-recipe");
          let showRecipe = document.getElementById("show-recipe");
          ingredients.forEach((i) => {
            let child = document.createElement("li");
            child.innerText = i;
            parent.appendChild(child);
            ingredientCon.appendChild(parent);
          });
          hideRecipe.addEventListener("click", () => {
            recipe.style.display = "none";
          });
          showRecipe.addEventListener("click", () => {
            recipe.style.display = "block";
          });
        })
        .catch(() => {
          result.innerHTML = `<h3>Invalid Input</h3>`;
        });
    }
  });
// test for console 



function recipeShow() {
    axios.get("http://localhost:4000/api/suggestion/")
    .then(res => {
        const data = res.data;
        
        let sugCard = `<div class="sugCard">
        <h3>${data}</h3>`

        grs.innerHTML = sugCard

        return
    })
}

    
    function loginF(e) {
        e.preventDefault()

        let body = {
            userEntered: usernameInput.value,
            passEntered: passwordInput.value
        }
        axios.post("http://localhost:4000/login", body)
        .then((res) => {
            console.log(res.data)
            return window.location.replace("./recipes.html")
            // alert(res.data)
        })
        .catch(err =>{
            console.log(err.data)
            return alert('wrong input')
        })
            
    }

allStars.forEach((stars, i) => {
  stars.onclick = function() {
    // console.log(stars)
    // console.log(i)position 0
    let currentStar = i + 1;

    allStars.forEach((stars,j) => {
      if(currentStar >=  j + 1) {
        stars.innerHTML = '&#9733';
      }else {
        stars.innerHTML = '&#9734';
      }
      
    })
        
  }
})




if(get) {
get.addEventListener('click', recipeShow )
}

if(sButton) {
sButton.addEventListener('click',loginF)
}