document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");
  
    const categoryDropdown = document.getElementById("categoryDropdown");
    const postContainer = document.getElementById("post-container");
  
    //Function to fetch data by category
    function fetchData(category) {
      //clear existing content in the postContainer
      postContainer.innerHTML = '';
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => {
          console.log(response.data.meals);
          const meals = Array.isArray(response.data.meals) ? response.data.meals: [{}];
  
       
          meals.forEach((meal) => {
//Fetch detailed information for each meal
axios
.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
.then((detailedResponse) => {
    const detailedMeal = detailedResponse.data.meals[0];
    console.log("Detailed Meal details:", detailedMeal);



            const card = document.createElement("div");
            card.className = "card";
            card.style = "width: 18rem";
  
            const cardImg = document.createElement("img");
            cardImg.className = "card-img-top";
            cardImg.src = detailedMeal.strMealThumb;
            cardImg.alt = detailedMeal.strMeal;
  
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
  
            const cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.textContent = detailedMeal.strMeal;

            const cardInstructions = document.createElement("p");
            cardInstructions.className = "card-text";
            cardInstructions.textContent = detailedMeal.strInstructions;
  
  
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardInstructions);
            card.appendChild(cardImg);
            card.appendChild(cardBody);
  
            postContainer.appendChild(card);
          });
        });
    });
    }
  
    //Event listener for the select element
    categoryDropdown.addEventListener('change', function () {
      const selectedCategory = categoryDropdown.value;
      console.log("Selected Category:", selectedCategory);
      fetchData(selectedCategory);
    });
    
    fetchData(categoryDropdown.value);
  });
  