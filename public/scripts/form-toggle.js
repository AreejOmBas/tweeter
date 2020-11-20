
/* script to add toggling functionality to navbar compose new tweet button  and focus the form upon showing*/

$(document).ready(function() {

  $('#compose-tweet-btn').on('click', function() {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  })

});