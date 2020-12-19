console.log("Test");
// API KEY : bead57aed9e1420dbed8834d45b0f26e
var queryURL =
  "https://api.spoonacular.com/recipes/76257/information?apiKey=bead57aed9e1420dbed8834d45b0f26e";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
