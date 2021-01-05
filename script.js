// API KEY : bead57aed9e1420dbed8834d45b0f26e
// change
// change again

function getRecipeID() {
  var id = $("input").val().trim();
  var glutenCheck = $("#tinySwitch").is(":checked");
  var veganCheck = $("#tinySwitch2").is(":checked");
  var dairyCheck = $("#tinySwitch3").is(":checked");
  var weatherCheck = $("#tinySwitch4").is(":checked");

  var dietChoice = "";
  if (glutenCheck === true && veganCheck === false && dairyCheck === false) {
    var dietChoice = "&diet=gluten-free";
  } else if (glutenCheck === true && veganCheck === true && dairyCheck === false) {
    var dietChoice = "&diet=vegan&intolerances=gluten";
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
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=bead57aed9e1420dbed8834d45b0f26e" +
      dietChoice +
      "&addRecipeInformation=true&query=" +
      id,
    method: "GET",
  }).then(function (response) {
    // console.log(response.results[0].id);
    console.log(response);
    if (response.results.length > 0) {
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
        console.log(response.sourceUrl);
        $("#ingredients").text("Recipe Ingredients:");
        $("#instructions").text("Recipe Instructions:");
        $("#recipeName").text(response.title);
        $("#img").attr("src", response.image);
        var a = $("<a>");
        a.attr("href", response.sourceUrl);
        a.attr("target", "blank");
        a.text(response.sourceUrl);

        $(".tipsPanel").append(a);

        var city = "tahiti";
        var currentDate = moment().format(" L");
        var APIKey = "11c1419085b8b8abf0e987d8580426ea";
        var queryURL =
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          APIKey;
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (response) {
          console.log(response);
          // var date = $("<div>")
          //   .text(response.name + currentDate)
          //   .addClass("weather")
          //   .css({ "text-align": "center", "font-size": "20px" });
          var temp = $("<div>")
            .text("Temperature: " + response.main.temp.toFixed(0) + " F")
            .addClass("weather")
            .css({ "text-align": "center", "font-size": "20px" });
          var humid = $("<div>")
            .text("Humidity: " + response.main.humidity + "%")
            .addClass("weather")
            .css({ "text-align": "center", "font-size": "20px" });
          var wind = $("<div>")
            .text("Wind Speed: " + response.wind.speed.toFixed(1) + " MPH")
            .addClass("weather")
            .css({ "text-align": "center", "font-size": "20px" });
          var title = $("<div>")
            .text("Here is the weather in Tahiti today - " + currentDate)
            .addClass("weather")
            .css({ "text-align": "center", "font-size": "30px" });
          $(".renderedRecipe").append(title, temp, humid, wind);
        });

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
    } else {
      $("#noResult").removeAttr("style");
      $("#noResult").css("text-align", "center");
      $("#noResult").css("font-size", "46px");
      $("#noResult").text(
        "Uh oh! Looks like your search didn't bring back any results. Try again!"
      );
    }
  });
}

$("#searchBtn").on("click", function () {
  $(".ingredientsList").empty();
  $(".instructionsList").empty();
  $(".tipsPanel").empty();
  $("#ingredients").text("");
  $("#instructions").text("");
  $("#recipeName").text("");
  $("#img").attr("src", "");
  $("#noResult").text("");
  $(".weather").text("");

  getRecipeID();
});
$(".tipsPanel").on("click", function () {});

// Recipe Name, Picture of recipe, Ingredient list, instructions, Time to cook
// Servings
// 1 recipe response
// How to get recipe instructions bullet pointed *
// Use general search to get an ID of what is needed
