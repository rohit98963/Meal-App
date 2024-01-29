

document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const homeButton = document.getElementById('homeButton');
    const favouriteButton = document.getElementById('favouriteButton');
    const mealResultsContainer = document.getElementById('mealResults');
    const mealDetailsContainer = document.getElementById('mealDetails');

    // Add event listener for the "Home" button
    homeButton.addEventListener('click', function () {
        // Navigate to the home page
        window.location.href = 'index.html';
    });

    // Add event listener for the "Favourite" button
    favouriteButton.addEventListener('click', function () {
        // Navigate to the favorites page
        window.location.href = 'favorites.html';
    });

    // Add event listener for the "Search" button
    searchButton.addEventListener('click', function () {
        // Perform search when the button is clicked
        performSearch();
    });

    // Add event listener for the "Add to Favorite" and "More Details" buttons in meal cards
    mealResultsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('favorite-button')) {
            // Add the selected meal to favorites
            const mealId = event.target.dataset.mealId;
            if (mealId) {
                addToFavorites(mealId);
            } else {
                console.error('No meal ID found.');
            }
        }

        if (event.target.classList.contains('details-button')) {
            // Store selected meal ID in local storage and navigate to details page
            const mealId = event.target.dataset.mealId;
            if (mealId) {
                localStorage.setItem('selectedMealId', mealId);
                window.location.href = 'details.html';
            } else {
                console.error('No meal ID found.');
            }
        }
    });

    // Add event listener for the input event on the search bar
    searchBar.addEventListener('input', function () {
        // Perform search as the user types in the search bar
        performSearch();
    });

    // Function to initiate the meal search based on the entered term
    function performSearch() {
        const searchTerm = searchBar.value.trim();

        if (searchTerm !== '') {
            // Fetch meal data from the API based on the search term
            fetchMealData(searchTerm);
        } else {
            // Clear the results if the search term is empty
            clearMealResults();
        }
    }

    // Function to fetch meal data from the API
    function fetchMealData(searchTerm) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;


        fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.meals) {
                            displayMeals(data.meals);
                        } else {
                            // Clear the results if no meals are found
                            clearMealResults();
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching meal data:', error);
                    });
            }
        
            function clearMealResults() {
                mealResultsContainer.innerHTML = ''; 
            }
        
            function displayMeals(meals) {
                clearMealResults();
        
                meals.forEach(meal => {
                    const mealCard = createMealCard(meal);
                    mealResultsContainer.appendChild(mealCard);
                });
            }
        
            function createMealCard(meal) {
                const card = document.createElement('div');
                card.classList.add('meal-card');
        
                const mealImage = document.createElement('img');
                mealImage.src = meal.strMealThumb;
                mealImage.alt = meal.strMeal;
        
                const mealName = document.createElement('p');
                mealName.textContent = meal.strMeal;
        
                const addToFavoriteButton = document.createElement('button');
                addToFavoriteButton.textContent = 'Add to Favorite';
                addToFavoriteButton.classList.add('favorite-button');
                addToFavoriteButton.dataset.mealId = meal.idMeal;
        
                const moreDetailsButton = document.createElement('button');
                moreDetailsButton.textContent = 'More Details';
                moreDetailsButton.classList.add('details-button');
                moreDetailsButton.dataset.mealId = meal.idMeal;
        
                card.appendChild(mealImage);
                card.appendChild(mealName);
                card.appendChild(addToFavoriteButton);
                card.appendChild(moreDetailsButton);
        
                return card;
            }
        
            function addToFavorites(mealId) {
                // Fetch existing favorites from local storage
                const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
                // Check if the meal is already in favorites
                const isMealInFavorites = existingFavorites.some(favorite => favorite.idMeal === mealId);
        
                if (!isMealInFavorites) {
                    // Add the meal to favorites
                    existingFavorites.push({ idMeal: mealId });
                    
                    // Save the updated favorites to local storage
                    localStorage.setItem('favorites', JSON.stringify(existingFavorites));
        
                    // Inform the user that the meal has been added to favorites (you can use a more sophisticated notification)
                    alert('Meal added to favorites!');
                } else {
                    // Inform the user that the meal is already in favorites (you can use a more sophisticated notification)
                    alert('Meal is already in favorites.');
                }
            }
        });
        
        