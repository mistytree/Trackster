var Trackster = {};
// My Last.fm account API Key (see https://www.last.fm/api/show/track.search)
const API_KEY = 'b092a55d500adbd222d9ba5186137ef6';

$(document).ready(function() {

  // 'Enter' keyboard key submit of text in search field.
  // User don't have to press search button, just hit 'Enter' key.
  var input = document.getElementById("search-input");
  input.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) { // Number 13 is the 'Enter' key on the keyboard.
          document.getElementById("search-button").click();
      }
  });

  $('#search-button').on('click', function() {  // When button is pressed...
    // Passing text string from search field to Trackster's method.
    Trackster.searchTracksByTitle($('#search-input').val());
    // console.log($('#search-input').val());  // Prints value from search field to console.
  });

  // Animation routine for 'trackster' logo. Animation styles in 'animation.css'.
  // see more at https://speckyboy.com/css-javascript-text-animation-snippets/
  $(function(){
    $('#search-button').click(function(){
        var classes =  $(this).closest('div.row.header').children('div.animate').attr('class');
        $(this).closest('div.row.header').children('div.animate').attr('class', 'animate');
        var indicator = $(this);
        setTimeout(function(){
            $(indicator).closest('div.row.header').children('div.animate').addClass(classes);
        }, 20);
    });
}); // End of animation routine.

  // Given an array of track data, create the HTML for a Bootstrap row for each
  // "row" to the container in the body to display all tracks.
  Trackster.renderTracks = function(tracks) {
    var $songs = $('#songs');

    $songs.empty(); // Clear HTML code with search result for the next search.

    var trackList = new Array(tracks.length); // Creates empty 'trackList' array (one dimensional).
    var x = 0;  // Sets index for 'trackList' to 0.

    // CREATING HTML CODE for search result and feeding values to 'trackList' array for later sorting.
    for (var index = 0; index < tracks.length; index++) {
      var track = tracks[index];
      var albumArt = track.image[1]['#text']; // Accessing Album Art medium size (1) image and its URL.

      // Converts number of listeners from returned 'string' format to 'number' using 'parseInt' and then
      // converting it to local format with thousand comma separator using 'toLocaleString('en')'.
      var listenersCount = parseInt(track.listeners).toLocaleString('en');
      // console.log(typeof track.listeners); // Logs type of variable to console (only to check variable type).

      // Creates multidimentional array filled with track information pulled from Last.fm (used later for sorting).
      trackList[x] = new Array(track.url, track.name, track.artist, albumArt, Number(track.listeners));
      // console.log(trackList[x]); // Lists 'trackList' array content at current index to console.
      x = x + 1;

      console.log(tracks[index]); // Lists value names (and their content) for all found tracks to console (in loop).

      // Generates HTML code with track values.
      var htmlSongRow =
        '<div class="row trackster-songs">' +
        '  <div class="col-xs-1 pulled-property"><a href="' + track.url + '"><i class="fa fa-play-circle-o"></i></a></div>' +
        '  <div class="col-xs-5 pulled-property">' + track.name + '</div>' +
        '  <div class="col-xs-2 pulled-property">' + track.artist + '</div>' +
        '  <div class="col-xs-2 pulled-property">' + '<img src="' + albumArt + '" alt="Album art">' + '</div>' + //
        '  <div class="col-xs-2 pulled-property">' + listenersCount + '</div>' +
        '</div>';

        $songs.append(htmlSongRow);
    }

    // SORTING ROUTINES (sort by Artist, Song, and Popularity).

    // FUTURE THINGS TO IMPROVE: sort both accending and descending,
    // minimize code by merging three routines in one and using if condition.

    // Sorting alphabetically (ascending) 'Song' track field.
    $('#sort-song').on('click', function() {

        $songs.empty(); // Clears HTML code with track list.

        trackList.sort(sortFunction);
        function sortFunction(track1, track2) { // Sorting 'Song' field.
            if (track1[1] === track2[1]) {
                return 0;
            }
            else {
                return (track1[1] < track2[1]) ? -1 : 1;
            }
        }

        // Creating HTML code with sorted by 'Song' list.
        for (var x = 0; x < trackList.length; x++) {

          var htmlSongRow =
            '<div class="row trackster-songs">' +
            '  <div class="col-xs-1 pulled-property"><a href="' + trackList[x][0] + '"><i class="fa fa-play-circle-o"></i></a></div>' +
            '  <div class="col-xs-5 pulled-property">' + trackList[x][1] + '</div>' +
            '  <div class="col-xs-2 pulled-property">' + trackList[x][2] + '</div>' +
            '  <div class="col-xs-2 pulled-property">' + '<img src="' + trackList[x][3] + '" alt="Album art">' + '</div>' + //
            '  <div class="col-xs-2 pulled-property">' + parseInt(trackList[x][4]).toLocaleString('en') + '</div>' +
            '</div>';

            $songs.append(htmlSongRow); // Creates in 'for' loop full sorted list.

        } // End of sorting routine for 'Song' field.

      });

    // Sorting alphabetically (ascending) 'Artist' track field.
    $('#sort-artist').on('click', function() {

        $songs.empty(); // Clears HTML code with track list.

        trackList.sort(sortFunction);
        function sortFunction(track1, track2) { // Sorting 'Artist' field.
            if (track1[2] === track2[2]) {
                return 0;
            }
            else {
                return (track1[2] < track2[2]) ? -1 : 1;
            }
        }

        // Creating HTML code with sorted by 'Artist' list.
        for (var x = 0; x < trackList.length; x++) {

          var htmlSongRow =
            '<div class="row trackster-songs">' +
            '  <div class="col-xs-1 pulled-property"><a href="' + trackList[x][0] + '"><i class="fa fa-play-circle-o"></i></a></div>' +
            '  <div class="col-xs-5 pulled-property">' + trackList[x][1] + '</div>' +
            '  <div class="col-xs-2 pulled-property">' + trackList[x][2] + '</div>' +
            '  <div class="col-xs-2 pulled-property">' + '<img src="' + trackList[x][3] + '" alt="Album art">' + '</div>' + //
            '  <div class="col-xs-2 pulled-property">' + parseInt(trackList[x][4]).toLocaleString('en') + '</div>' +
            '</div>';

            $songs.append(htmlSongRow); // Creates in 'for' loop full sorted list.

        } // End of sorting routine for 'Artist' field.

      });

      // Sorting alphabetically (ascending) 'Popularity' track field.
      $('#sort-popularity').on('click', function() {

          $songs.empty(); // Clears HTML code with track list.

          trackList.sort(sortFunction);
          function sortFunction(track1, track2) { // Sorting 'Popularity' field.
              if (track1[4] === track2[4]) {
                  return 0;
              }
              else {
                  return (track1[4] < track2[4]) ? -1 : 1;
              }
          }

          // Creating HTML code with sorted by 'Popularity' list.
          for (var x = 0; x < trackList.length; x++) {

            var htmlSongRow =
              '<div class="row trackster-songs">' +
              '  <div class="col-xs-1 pulled-property"><a href="' + trackList[x][0] + '"><i class="fa fa-play-circle-o"></i></a></div>' +
              '  <div class="col-xs-5 pulled-property">' + trackList[x][1] + '</div>' +
              '  <div class="col-xs-2 pulled-property">' + trackList[x][2] + '</div>' +
              '  <div class="col-xs-2 pulled-property">' + '<img src="' + trackList[x][3] + '" alt="Album art">' + '</div>' + //
              '  <div class="col-xs-2 pulled-property">' + parseInt(trackList[x][4]).toLocaleString('en') + '</div>' +
              '</div>';

              $songs.append(htmlSongRow); // Creates in 'for' loop full sorted list.

          } // End of sorting routine for 'Popularity' field.

        });

  };  // End of 'tracks' function.

  // Given a search term as a string, query the Last.fm API.
  // Render the tracks given in the API query response.
  // Last.fm API methods described at https://www.last.fm/api
  Trackster.searchTracksByTitle = function(title) {
    $.ajax({
      // url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=tiny&api_key=b092a55d500adbd222d9ba5186137ef6&format=json',
      url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
      success: function(response) {
        // Renders all tracks in HTML code to webpage.
        // 'trackmatches.track' from 'track.search' JSON file; go to URL commented on line #187 to see structure.
        Trackster.renderTracks(response.results.trackmatches.track);  // Implement as a last step after 'Trackster.renderTracks' finished.
        // Logs list of all tracks in raw format to console.
        // console.log(response.results.trackmatches.track); // Works from executed script, will not work manually from console.
      }
    });
  };

});
