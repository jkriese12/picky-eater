console.log("Test");
// API KEY : bead57aed9e1420dbed8834d45b0f26e
var id =

var queryURL =
  "https://api.spoonacular.com/recipes/search?apiKey=bead57aed9e1420dbed8834d45b0f26e&number=1&query=" + userChoice;

function getRecipeID() {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=bead57aed9e1420dbed8834d45b0f26e",
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
getRecipeID();

// Recipe Name, Picture of recipe, Ingredient list, instructions, Time to cook
// Servings
// 1 recipe response
// How to get recipe instructions bullet pointed *
