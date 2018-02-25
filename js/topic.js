

function init() {
}

function onFilterSelect() {
	var x = document.getElementById("topic-filter").value
	var columns = ["left-column", "center-column", "right-column"]
	for (var c = columns.length - 1; c >= 0; c--) {
		var cName = columns[c];
		var toSort = document.getElementById(cName).children;
		toSort = Array.prototype.slice.call(toSort, 0);
		sortAttribute = ""
		if (x == "Most Recent") {
			sortAttribute = "data-date"
			toSort.sort(function(a, b) {
				var aord = parseInt(a.getAttribute(sortAttribute));
				var bord = parseInt(b.getAttribute(sortAttribute));
				return bord - aord;
			});
		} else if (x == "Most Extreme") {
			sortAttribute = "data-score"
			toSort.sort(function(a, b) {
				var aord = Math.abs(parseInt(a.getAttribute(sortAttribute)));
				var bord = Math.abs(parseInt(b.getAttribute(sortAttribute)));
				return bord - aord;
			});
		} else if (x == "Most Neutral") {
			sortAttribute = "data-score"
			toSort.sort(function(a, b) {
				var aord = -Math.abs(parseInt(a.getAttribute(sortAttribute)));
				var bord = -Math.abs(parseInt(b.getAttribute(sortAttribute)));
				return bord - aord;
			});
		} else if (x == "Most Rated" ) {
			sortAttribute = "data-ratings"
			toSort.sort(function(a, b) {
				var aord = parseInt(a.getAttribute(sortAttribute));
				var bord = parseInt(b.getAttribute(sortAttribute));
				return bord - aord;
			});
		}
		
		var parent = document.getElementById(cName);
		parent.innerHTML = "";

		for(var i = 0, l = toSort.length; i < l; i++) {
		    parent.appendChild(toSort[i]);
		}
	}
}

init();