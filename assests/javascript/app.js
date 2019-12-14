var topics = ["Food", "Cars", "Emotions", "Funny", "Sports"];

function displayGifs() {
    var x = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
     + "&api_key=GBMCno9kIpWmgFW5gSEbyt6cgbvluJii";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log("logging");
        console.log(response.data)
        var results = response.data;
        for (var i=0; i < results.length; i++) {
           if(results[i].rating !== "r" && results[i].rating !== "G"){
                var rating = results[i].rating;
                var p =$("<p>").text("Rating: " + rating);
                var gifDiv = $("<div class='gifs'>");
                var image = $("<img>");
                image.attr({
                    "src": results[i].images.fixed_height.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url
                })
                gifDiv.append(image);
                gifDiv.append(p);
                $("#display-gifs").prepend(gifDiv);
            };
        };
    });
}
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif btn btn-info");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    };
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var giphy = $("#gif-input").val().trim();
    topics.push(giphy);
    renderButtons();
});

$(document).on("click", ".gif", displayGifs);
renderButtons();

$(document).on("click", "img", function(){
    var state = $(this).attr("data-state");
    if (state ==="animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate")); 
        $(this).attr("data-state", "animate");
    }

});