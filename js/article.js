var ratings = {};
var initRatings = {};

function init() {
}

function OnCommentSubmit() {
	var comment = document.getElementById("comment").value
	console.log(comment);
	var container_block ;
	 
	var block_to_insert = document.createElement( 'div' );
	block_to_insert.className ="article-comment";
	block_to_insert.setAttribute('data-time', "1");
	block_to_insert.setAttribute('data-rating', "0");

	var img_block = document.createElement( 'img' );
	img_block.className ="comment-profile";
	img_block.setAttribute('src', "img/anon_user.png");

	var rest = document.createElement( 'div' );
	rest.className ="comment-rest";

	var user_block = document.createElement( 'div' );
	user_block.className ="comment-username";
	user_block.innerHTML = "Your UserName";

	var time_block = document.createElement( 'div' );
	time_block.className ="comment-time";
	time_block.innerHTML = "Within 1 hour";

	var rating = document.createElement( 'div' );
	rating.className ="comment-ratingYours";
	rating.innerHTML = "Rating: 0";

	var comment_body = document.createElement( 'div' );
	comment_body.className ="comment-body";
	comment_body.innerHTML = comment;


	block_to_insert.appendChild( img_block );
	rest.appendChild( user_block );
	rest.appendChild( time_block );
	rest.appendChild( rating );
	rest.appendChild( comment_body );
	block_to_insert.appendChild(rest);
	 
	container_block = document.getElementById( "comment-section" );
	container_block.appendChild( block_to_insert );
	onFilterSelect();
	OnCommentCancel();
}

function OnTextInput() {
	console.log("On Text input")
	var comment = document.getElementById("comment").value
	if (comment.length > 5) {
		document.getElementById("comment-submit-button").disabled = false;
	} else {
		document.getElementById("comment-submit-button").disabled = true;
	}
}

function OnCommentCancel() {
	document.getElementById("comment").value = "";
	document.getElementById("comment-submit-button").disabled = true;
}

function onFilterSelect() {
	var x = document.getElementById("comment-filter").value
	var toSort = document.getElementById("comment-section").children;
	toSort = Array.prototype.slice.call(toSort, 0);
	sortAttribute = ""
	console.log("Filtering..." + x);
	if (x == "Oldest First") {
		sortAttribute = "data-time"
		toSort.sort(function(a, b) {
			var aord = parseInt(a.getAttribute(sortAttribute));
			var bord = parseInt(b.getAttribute(sortAttribute));
			return bord - aord;
		});
	} else if (x == "Newest First") {
		sortAttribute = "data-time"
		toSort.sort(function(a, b) {
			var aord = Math.abs(parseInt(a.getAttribute(sortAttribute)));
			var bord = Math.abs(parseInt(b.getAttribute(sortAttribute)));
			return aord - bord;
		});
	} else if (x == "Lowest Rated") {
		sortAttribute = "data-rating"
		toSort.sort(function(a, b) {
			var aord = parseInt(a.getAttribute(sortAttribute));
			var bord = parseInt(b.getAttribute(sortAttribute));
			// console.log("s: " + a.getAttribute(sortAttribute) + " | " + aord + " : " + bord);
			return aord - bord;
		});
	} else if (x == "Highest Rated") {
		sortAttribute = "data-rating"
		toSort.sort(function(a, b) {
			var aord = parseInt(a.getAttribute(sortAttribute));
			var bord = parseInt(b.getAttribute(sortAttribute));
			// console.log("s: " + a.getAttribute(sortAttribute) + " | " + aord + " : " + bord);
			return bord - aord;
		});
	}
	
	var parent = document.getElementById("comment-section");
	parent.innerHTML = "";

	for(var i = 0, l = toSort.length; i < l; i++) {
	    parent.appendChild(toSort[i]);
	}
}

function onRatePositive(clicked_id)
{
    var id = clicked_id.substring(3,6);
    if (clicked_id in ratings) {
    	if (ratings[clicked_id] == 1) {
    		ratings[clicked_id] = 0;
    	} else {
    		ratings[clicked_id] = 1;
    	}
    } else {
    	ratings[clicked_id] = 1;
    	initRatings[clicked_id] = parseInt(document.getElementById("c-" + id).getAttribute("data-rating"));
    }
    var n = initRatings[clicked_id] + ratings[clicked_id];
    document.getElementById("r-"+id).innerHTML = "Rating: " + String(n);
    document.getElementById("c-"+id).setAttribute('data-rating', String(n));
}

function onRateNegative(clicked_id)
{
    var id = clicked_id.substring(3,6);
    if (clicked_id in ratings) {
    	if (ratings[clicked_id] == -1) {
    		ratings[clicked_id] = 0;
    	} else {
    		ratings[clicked_id] = -1;
    	}
    } else {
    	ratings[clicked_id] = -1;
    	initRatings[clicked_id] = parseInt(document.getElementById("c-" + id).getAttribute("data-rating"));
    }
    var n = initRatings[clicked_id] + ratings[clicked_id];
    document.getElementById("r-"+id).innerHTML = "Rating: " + String(n);
    document.getElementById("c-"+id).setAttribute('data-rating', String(n));
}

init();