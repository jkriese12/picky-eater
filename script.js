// API KEY : bead57aed9e1420dbed8834d45b0f26e
// change
var check = $("#tinySwitch");
console.log(check.checked);
function getRecipeID() {
  var id = $("input").val().trim();
  var glutenCheck = $("#tinySwitch").is(":checked");
  var veganCheck = $("#tinySwitch2").is(":checked");
  var dairyCheck = $("#tinySwitch3").is(":checked");
  console.log(glutenCheck, veganCheck, dairyCheck);
  if (glutenCheck === true) {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=bead57aed9e1420dbed8834d45b0f26e&diet=gluten-free&addRecipeInformation=true&query=" +
        id,
      method: "GET",
    }).then(function (response) {
      console.log(response.results[0].id);
      console.log(response);
      var foodID = response.results[0].id;
      var urlID =
        "https://api.spoonacular.com/recipes/" +
        foodID +
        "/information?apiKey=bead57aed9e1420dbed8834d45b0f26e";
      $.ajax({
        url: urlID,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        $("#ingredients").text(response.title);
        $("#img").attr("src", response.image);
        // var listItems = $("<li>").text(response.extendedIngredients[i].name);
        for (var i = 0; i < response.extendedIngredients.length; i++) {
          JSON.stringify(response.extendedIngredients[i].name);
          var listItem = $("<li>");
          listItem.text(response.extendedIngredients[i].name);
          $("#ingredients").append(listItem);
        }
        for (var i = 0; i < response.analyzedInstructions[0].steps.length; i++) {
          var instructionItem = $("<li>");
          JSON.stringify(response.analyzedInstructions[0].steps[i].step);
          instructionItem.text(response.analyzedInstructions[0].steps[i].step);
          $("#instructionsList").append(instructionItem);
        }
      });
    });
  } else if (glutenCheck === false && veganCheck === false && dairyCheck === false) {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=bead57aed9e1420dbed8834d45b0f26e&addRecipeInformation=true&query=" +
        id,
      method: "GET",
    }).then(function (response) {
      console.log(response.results[0].id);
      console.log(response);
      var foodID = response.results[0].id;
      var urlID =
        "https://api.spoonacular.com/recipes/" +
        foodID +
        "/information?apiKey=bead57aed9e1420dbed8834d45b0f26e";
      $.ajax({
        url: urlID,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        $("#ingredients").text(response.title);
        $("#img").attr("src", response.image);
        // var listItems = $("<li>").text(response.extendedIngredients[i].name);
        for (var i = 0; i < response.extendedIngredients.length; i++) {
          JSON.stringify(response.extendedIngredients[i].name);
          var listItem = $("<li>");
          listItem.text(response.extendedIngredients[i].name);
          $("#ingredients").append(listItem);
        }
        for (var i = 0; i < response.analyzedInstructions[0].steps.length; i++) {
          var instructionItem = $("<li>");
          JSON.stringify(response.analyzedInstructions[0].steps[i].step);
          instructionItem.text(response.analyzedInstructions[0].steps[i].step);
          $("#instructionsList").append(instructionItem);
        }
      });
    });
  }
}

$("button").on("click", function () {
  $("#instructionsList").empty();
  getRecipeID();
});
// Recipe Name, Picture of recipe, Ingredient list, instructions, Time to cook
// Servings
// 1 recipe response
// How to get recipe instructions bullet pointed *
// Use general search to get an ID of what is needed
