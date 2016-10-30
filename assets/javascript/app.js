$(document).ready(function(){
//original array of reactions

var reactArray = ['Facepalm', 'FML', 'wow', 'LOL', 'Sassy', 'Eyeroll', 'Nope'];

//function to create buttons

	function createButtons(){
		//empty button divs so they don't 
		$('#reactButtonsDiv').empty();

		//loop to create buttons

		for (var i = 0; i < reactArray.length; i++) {
			var reactButton = $('<button>');
			reactButton.addClass('btn btn-info btn-md reactButtonClass');//css class
			reactButton.attr('data-reactname', reactArray[i]); //data attr for button
			
			reactButton.text(reactArray[i]);
			$('#reactButtonsDiv').append(reactButton);
		}
	}

	createButtons();

//on click to add new buttons

	$('#addReact').on('click', function(){

//takes input from the input box and pushes to the array
	var newReact = $('#react-input').val().trim();
		reactArray.push(newReact);

		createButtons();
		return false;

	
})
	$('#react-input').val(" ");
//on click for all buttons clicked

	$('body').on ('click', 'button', function(){

		$('#reactAppearDiv').empty();

		var reactName = $(this).data('reactname');

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reactName + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: 'GET'
		})

		.done(function(response){

			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var reactDiv = $('<div>');
				var p = $('<p>');

				if (results[i].rating == ""){
					p.text('none');
				} else {
					p.text('Rating: ' + results[i].rating);
				}

				//create new image and append data-state attributes

				var reactImage = $('<img>');				
				reactImage.attr('src', results[i].images.fixed_height_still.url);
				reactImage.attr('data-still', results[i].images.fixed_height_still.url);
				reactImage.attr('data-animate', results[i].images.fixed_height.url);
				reactImage.attr('data-state', 'still')

				//append rating to images

				reactDiv.append(p);
				reactDiv.append(reactImage);
				reactDiv.addClass('reactDiv');
				$('#reactAppearDiv').append(reactDiv);
			}
		});
	});

//click to change data state

	$('body').on('click', 'img', function(){
		var state = $(this).attr('data-state');

		if (state == 'still') {
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
	});
	})











