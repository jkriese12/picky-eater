// API KEY : bead57aed9e1420dbed8834d45b0f26e
// change
// change again
var check = $("#tinySwitch");
console.log(check.checked);
function getRecipeID() {
  var id = $("input").val().trim();
  var glutenCheck = $("#tinySwitch").is(":checked");
  var veganCheck = $("#tinySwitch2").is(":checked");
  var dairyCheck = $("#tinySwitch3").is(":checked");
  console.log(glutenCheck, veganCheck, dairyCheck);
  var dietChoice = "";
  if (glutenCheck === true && veganCheck === false && dairyCheck === false) {
    var dietChoice = "&diet=gluten-free";
  } else if (glutenCheck === true && veganCheck === true && dairyCheck === false) {
    var dietChoice = "&diet=vegan&intolerances=gluten";
    alert("ok");
  } else if (glutenCheck === true && veganCheck === true && dairyCheck === true) {
    var dietChoice = "&diet=gluten-free,vegan&intolerances=dairy";
  } else if (glutenCheck === true && veganCheck === false && dairyCheck === true) {
    var dietChoice = "&diet=gluten-free&intolerances=dairy";
  } else if (glutenCheck === false && veganCheck === true && dairyCheck === false) {
    var dietChoice = "&diet=vegan";
  } else if (glutenCheck === false && veganCheck === true && dairyCheck === true) {
    var dietChoice = "&diet=vegan&intolerances=dairy";
  } else if (glutenCheck === false && veganCheck === false && dairyCheck === true) {
    var dietChoice = "&intolerances=dairy";
  } else {
    var dietChoice = "";
  }
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=d62f94a01ecd492192a2ac5bb4bf78f9" +
      dietChoice +
      "&addRecipeInformation=true&query=" +
      id,
    method: "GET",
  }).then(function (response) {
    console.log(response.results[0].id);
    console.log(response);
    var foodID = response.results[0].id;
    var urlID =
      "https://api.spoonacular.com/recipes/" +
      foodID +
      "/information?apiKey=d62f94a01ecd492192a2ac5bb4bf78f9";
    $.ajax({
      url: urlID,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(response.sourceUrl);
      $("#ingredients").text("Recipe Ingredients:");
      $("#instructions").text("Recipe Instructions:");
      $("#recipeName").text(response.title);
      $("#img").attr("src", response.image);
      var a = $("<a>");
      a.attr("href", response.sourceUrl);
      a.text(response.sourceUrl);
      $(".tipsPanel").append(a);

      // var listItems = $("<li>").text(response.extendedIngredients[i].name);
      for (var i = 0; i < response.extendedIngredients.length; i++) {
        JSON.stringify(response.extendedIngredients[i].name);
        var listItem = $("<li>");
        listItem.text(response.extendedIngredients[i].name);
        $(".ingredientsList").append(listItem);
      }
      for (var i = 0; i < response.analyzedInstructions[0].steps.length; i++) {
        var instructionItem = $("<li>");
        JSON.stringify(response.analyzedInstructions[0].steps[i].step);
        instructionItem.text(response.analyzedInstructions[0].steps[i].step);
        $(".instructionsList").append(instructionItem);
      }
    });
  });
}

$("button").on("click", function () {
  $(".ingredientsList").empty();
  $(".instructionsList").empty();
  getRecipeID();
});
// Recipe Name, Picture of recipe, Ingredient list, instructions, Time to cook
// Servings
// 1 recipe response
// How to get recipe instructions bullet pointed *
// Use general search to get an ID of what is needed
