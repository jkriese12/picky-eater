// Main function to gather information from API
function getRecipeID() {
  var id = $("input").val().trim();
  var glutenCheck = $("#tinySwitch").is(":checked");
  var veganCheck = $("#tinySwitch2").is(":checked");
  var dairyCheck = $("#tinySwitch3").is(":checked");
  var weatherCheck = $("#tinySwitch4").is(":checked");
  // Function for getting current weather
  function getWeather() {
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
      var pic = $("<img>").attr("src", "");
      $(".renderedRecipe").append(title, temp, humid, wind, pic);
    });
  }
  // Only calling getWeather function if button is checked by user
  if (weatherCheck === true) {
    getWeather();
  }
  // Determining which API call to grab based on user choice for button selections
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
    // Getting specific ID of recipe to use in next AJAX call
  }).then(function (response) {
    console.log(response);
    // Only calling for recipe if there is a recipe available based on user search
    if (response.results.length > 0) {
      var storage = localStorage.getItem("lastSearched");
      var storageLink = localStorage.getItem("searchedUrl");
      // var storageTextContain = $("<div>").addClass("localContain");
      var storageText = $("<div>")
        .text(" You last searched for " + storage)
        .css({ "text-align": "center", "font-size": "25px", "margin-top": "25px" })
        .attr("href", storageLink)
        .attr("target", "blank")
        .addClass("local");
      $(".toggleHeader").append(storageText);
      // $(".localContain").append(storageText);
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
        localStorage.setItem("lastSearched", response.title);
        localStorage.setItem("searchedUrl", response.sourceUrl);

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
      // No results logic
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
// Main button click function
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
  $(".local").empty();
  $(".localContain").empty();
  getRecipeID();
});
var storage = localStorage.getItem("lastSearched");
var storageLink = localStorage.getItem("searchedUrl");
// var storageTextContain = $("<div>").addClass("localContain");
var storageText = $("<div>")
  .text(" You last searched for " + storage)
  .css({ "text-align": "center", "font-size": "25px", "margin-top": "25px" })
  .attr("href", storageLink)
  .attr("target", "blank")
  .addClass("local");
$(".toggleHeader").append(storageText);
// $(".localContain").append(storageText);
