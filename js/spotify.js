// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/

function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
  return url;
}

// The provided URL was grabbing any song with the keyword in the album, too, so I looked at the API documentation and they were using this URL instead
function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
  return url;
}

$("#search").on("submit", function(e){
  e.preventDefault();
  e.stopPropagation();

  var keyword = $("#search-keyword").val().toLowerCase();
  if ($("#search-type").val() === "artist") {
    var url = searchByArtist(keyword);
  } else {
    var url = searchByTrack(keyword);
  }

  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    console.log("Ajax request success!");
    console.log(response);

    $("#results").empty();

    if (response.artists) {
      for (var i = 0; i < response.artists.length; i++) {
        $("#results").append("<li><a href=" + response.artists[i].href + ">" + response.artists[i].name + "</a></li>");
      }
    }

    else {
      for (var i = 0; i < response.tracks.length; i++) {
        var trackToCheck = response.tracks[i].name;
        if (trackToCheck.toLowerCase().indexOf(keyword) != -1) {
          $("#results").append("<li><a href=" + response.tracks[i].href + ">" + trackToCheck + "</a></li>");
        }
      }

    }

  }).fail(function(){
    console.log("Ajax request fails!");
  }).always(function(){
    console.log("Something happened.");
  })
})
