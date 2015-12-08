document.observe("dom:loaded", function() {
	$("b_xml").observe("click", function(){
		//construct a Prototype Ajax.request object
		new Ajax.Request("songs_xml.php", {
			method: "get",
			parameters: {top: $F("top")},
			onSuccess: showSongs_XML,
			onFailure: ajaxFailed,
			onException: ajaxFailed
		});
	});
	$("b_json").observe("click", function(){
		//construct a Prototype Ajax.request object
		new Ajax.Request("songs_json.php", {
			method: "get",
			parameters: {top: $F("top")},
			onSuccess: showSongs_JSON,
			onFailure: ajaxFailed,
			onException: ajaxFailed
		});
	});
});

function showSongs_XML(ajax) {
	//alert(ajax.responseText);
	while($("songs").firstChild) {
		$("songs").removeChild($("songs").firstChild);
	}
	var song = ajax.responseXML.getElementsByTagName("song");
	for (var i = 0; i < song.length; i++) {
		var title = song[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var artist = song[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
		var genre = song[i].getElementsByTagName("genre")[0].firstChild.nodeValue;
		var time = song[i].getElementsByTagName("time")[0].firstChild.nodeValue;
		var li = $(document.createElement("li"));
		li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
		$("songs").appendChild(li);
	}
}

function showSongs_JSON(ajax) {
	//alert(ajax.responseText);
	while($("songs").firstChild) {
		$("songs").removeChild($("songs").firstChild);
	}
	var song = JSON.parse(ajax.responseText);
	for (var i = 0; i < song.songs.length; i++) {
		var li = $(document.createElement("li"));
		li.innerHTML = song.songs[i].title + " - " + song.songs[i].artist + " [" + song.songs[i].genre + "] (" + song.songs[i].time + ")";
		$("songs").appendChild(li);
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
										"\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
