document.addEventListener('DOMContentLoaded', function () {
    const mealDetailsContainer = document.getElementById('mealDetailsContainer');

    // Fetch the selected meal ID from local storage
    const selectedMealId = localStorage.getItem('selectedMealId');

    if (selectedMealId) {
        fetchMealDetails(selectedMealId);
    } else {
        console.error('No selected meal ID found.');
        // You can redirect to the home page or handle this situation as needed
    }

    function fetchMealDetails(mealId) {

        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    displayMealDetails(data.meals[0]);
                } else {
                    console.error('No meal details found for ID:', mealId);
                }
            })
            .catch(error => {
                console.error('Error fetching meal details:', error);
            });
    }

    function displayMealDetails(meal) {
        const detailsContent = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <ul>
                <li><strong>Category:</strong> ${meal.strCategory}</li>
                <li><strong>Area:</strong> ${meal.strArea}</li>
                <li><strong>Instructions:</strong> ${meal.strInstructions}</li>
            </ul>
        `;

        mealDetailsContainer.innerHTML = detailsContent;
    }
});
