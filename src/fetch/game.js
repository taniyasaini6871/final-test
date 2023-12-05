// require("dotenv").config()
const weatherApi = {

    getProducts: async function () {

        const url = 'https://mmo-games.p.rapidapi.com/game?id=452';
        const options = {
            method: 'GET',
            headers: { 
                'X-RapidAPI-Key': "",   
                'X-RapidAPI-Host': "", 
            }
        };

        try {

            let response = await fetch(url, options);
            let result = await response.json();
            console.log(result);
            this.displaygameDetails(result);


        } catch (error) {

            console.error(error);
        }
    },

    displaygameDetails: function displayGameDetails(game) {

        const gameDetailsContainer = document.getElementById('game-details');

        gameDetailsContainer.innerHTML = `
    
        <img src="${game.thumbnail}" alt="${game.title} Thumbnail" class="mb-4 w-full h-auto">
        <h2 class="text-2xl font-bold mb-2">${game.title}</h2>
        <p class="text-gray-700 font-semibold mb-2">Status: ${game.status}</p>
        <p class="text-gray-700 font-semibold  mb-2">Genre: ${game.genre}</p>
        <p class="text-gray-700 font-semibold mb-2">Developer: ${game.developer}</p>
        <p class="text-gray-700 font-semibold mb-2">Publisher: ${game.publisher}</p>
        <p class="text-gray-700 font-semibold mb-4">Release Date: ${game.release_date}</p>
        
        <a href="${game.game_url}" target="_blank" class="bg-blue-500 text-white py-2 px-4 rounded-md inline-block">Play Now</a>
    `;
    }

}
weatherApi.getProducts();

