

document.addEventListener('DOMContentLoaded', function () {
    const favoriteMealsContainer = document.getElementById('favoriteMeals');

    displayFavoriteMeals();

    function displayFavoriteMeals() {
        // Fetch favorites from local storage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.length > 0) {
            favorites.forEach(favorite => {
                fetchFavoriteMealDetails(favorite.idMeal);
            });
        } else {
            const noFavoritesMessage = document.createElement('p');
            noFavoritesMessage.textContent = 'No favorite meals yet.';
            favoriteMealsContainer.appendChild(noFavoritesMessage);
        }
    }

    function fetchFavoriteMealDetails(mealId) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    const favoriteMealCard = createFavoriteMealCard(data.meals[0]);
                    favoriteMealsContainer.appendChild(favoriteMealCard);
                } else {
                    console.error('No meal details found for favorite:', mealId);
                }
            })
            .catch(error => {
                console.error('Error fetching favorite meal details:', error);
            });
    }

    function createFavoriteMealCard(favoriteMeal) {
        const card = document.createElement('div');
        card.classList.add('favorite-card');

        const mealImage = document.createElement('img');
        mealImage.src = favoriteMeal.strMealThumb;
        mealImage.alt = favoriteMeal.strMeal;

        const mealName = document.createElement('p');
        mealName.textContent = favoriteMeal.strMeal;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFavoriteMeal(favoriteMeal.idMeal));

        card.appendChild(mealImage);
        card.appendChild(mealName);
        card.appendChild(removeButton);

        return card;
    }

    function removeFavoriteMeal(mealId) {
        // Fetch favorites from local storage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Remove the selected meal from favorites
        favorites = favorites.filter(favorite => favorite.idMeal !== mealId);

        // Update local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Refresh the displayed favorite meals
        favoriteMealsContainer.innerHTML = '';
        displayFavoriteMeals();
    }
});

