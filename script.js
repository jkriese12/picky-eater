console.log("Test");
// API KEY : bead57aed9e1420dbed8834d45b0f26e
var id = function getRecipeID() {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=bead57aed9e1420dbed8834d45b0f26e",
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
};
getRecipeID();

// Recipe Name, Picture of recipe, Ingredient list, instructions, Time to cook
// Servings
// 1 recipe response
// How to get recipe instructions bullet pointed *
// Use general search to get an ID of what is needed
