const RESTAURANT = "/challenge/venue/9";
const MENU = "/challenge/menu";

function fetchRestaurants() {
   return new Promise((resolve, reject) => {
      fetch(RESTAURANT)
         .then(response => response.json())
         .then(res => resolve(res))
         .catch(err => reject(err))
   });
}

function fetchMenu() {
   return new Promise((resolve, reject) => {
      fetch(MENU)
         .then(response => response.json())
         .then(res => resolve(res))
         .catch(err => reject(err))
   });
}

export { fetchRestaurants, fetchMenu };