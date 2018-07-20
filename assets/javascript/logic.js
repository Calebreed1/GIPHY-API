$( document ).ready(function() {
    var emotions = ["Happy", "Sad", "Angry", "Depressed", "Frustrated", "Annoyed", "Humorous", "Cheerful", "Giddy", "Loving","Joyful", "Mellow", "Flirty", "Ecstatic" ];
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < emotions.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("emotion");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", emotions[i]);
            gifButton.text(emotions[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    function addNewButton(){
        $("#addGif").on("click", function(){
        var emotion = $("#emotion-input").val().trim();
        if (emotion == ""){
          return false; 
        }
        emotions.push(emotion);
    
        displayGifButtons();
        return false;
        });
    }
    function removeLastButton(){
        $("removeGif").on("click", function(){
        emotions.pop(emotion);
        displayGifButtons();
        return false;
        });
    }
    function displayGifs(){
        var emotion = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=uhyHRv7lxrZrxl7qeuY7ILSQnOWCyNnW&limit=10";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    $(document).on("click", ".emotion", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });