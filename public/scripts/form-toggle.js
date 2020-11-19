$(document).ready(function() {

  $('#compose-tweet-btn').on('click', function() {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  })

});