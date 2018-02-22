$(document).ready(function() {

  var Trackster = {};

  $('#search-button').on('click', function() {
    // Passing text string from search field to Trackster's method
    Trackster.searchTracksByTitle($('#search-input').val());
    // console.log($('#search-input').val());
  });


  /* Given an array of track data, create the HTML for a Bootstrap row for each.
    Append each "row" to the container in the body to display all tracks. */
  Trackster.renderTracks = function(tracks) {

  };

  /* Given a search term as a string, query the LastFM API.
    Render the tracks given in the API query response. */
  Trackster.searchTracksByTitle = function(title) {

  };

});
