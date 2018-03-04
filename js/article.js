

function init() {
}

function OnCommentSubmit() {
	var comment = document.getElementById("comment").value
	console.log(comment);
	var container_block ;
	 
	var block_to_insert = document.createElement( 'div' );
	block_to_insert.className ="article-comment";
	block_to_insert.setAttribute('data-time', "1");

	var img_block = document.createElement( 'img' );
	img_block.className ="comment-profile";
	img_block.setAttribute('src', "img/anon_user.png");

	var user_block = document.createElement( 'div' );
	user_block.className ="comment-username";
	user_block.innerHTML = "Your UserName";

	var time_block = document.createElement( 'div' );
	time_block.className ="comment-time";
	time_block.innerHTML = "Within 1 hour";

	var comment_body = document.createElement( 'div' );
	comment_body.className ="comment-body";
	comment_body.innerHTML = comment;


	block_to_insert.appendChild( img_block );
	block_to_insert.appendChild( user_block );
	block_to_insert.appendChild( time_block );
	block_to_insert.appendChild( comment_body );
	 
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
	console.log("Filtering...")
	var x = document.getElementById("comment-filter").value
	var toSort = document.getElementById("comment-section").children;
	toSort = Array.prototype.slice.call(toSort, 0);
	sortAttribute = ""
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
	}
	
	var parent = document.getElementById("comment-section");
	parent.innerHTML = "";

	for(var i = 0, l = toSort.length; i < l; i++) {
	    parent.appendChild(toSort[i]);
	}
}

init();