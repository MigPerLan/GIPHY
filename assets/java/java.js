// start variables
$(document).ready(function () {
    var starter = ["MonsterHunter", "SmashBros.", "MTG"];
    var btn = $("#starters");
    
    //Grabs the value from limit dropdown menu and stores it in var
     var limit = 5
    $("#limitMenu").click(function () {
        limit = $(this).val();
    });
    function showGifs(topic) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=rZ5nKA692Fno9BTCKyRpJWVqcCPBAugt&limit="+limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
        //   shows only the gif topic you picked
            $("#body").empty();
        //    loops through the images in the api
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var img = results[i];
                var gifs = $("<img class='gif'>");
                gifs.attr("src", img.images.fixed_height.url);

               
                gifDiv.prepend(gifs);

                $("#body").append(gifDiv);
            }

        });

    };
    function makebtns() {
        // stops repeat buttons
        btn.empty();
        //    loops through the starter array
        for (var i = 0; i < starter.length; i++) {

            // makes everything into a button
            var a = $("<button class='pick'>");
            // adds a class to the buttons made
            a.addClass("value");
            // Added a data-attribute
            a.attr("data-name", starter[i]);
            // adds text to the new button
            a.text(starter[i]);
            // Added the button to the buttons-view div
            $("#starters").append(a);
        };
    };

    $(document).on("click", '.value', function () {
        // grabing value of data-name
        var cat = $(this).attr("data-name");
        console.log(cat);
        showGifs(cat);

    })


    $("#searchBtn").click(function (event) {
        event.preventDefault();
        var topic = $("#value").val().trim();
        starter.push(topic);
        makebtns();
        console.log(topic);
        console.log(starter);
    });


    $(document).on("click", ".topic", showGifs);

    makebtns();




});
