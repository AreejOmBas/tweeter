$(document).ready(function () {

  // Update the char limit counter as user types
  $('#tweet-text').on('input', function() {
    if (this.value.length > 140) {
      $('.counter').addClass('exceeded-length');
    } else {
      $('.counter').removeClass('exceeded-length');
    }
    $('.counter').text(140 - this.value.length);
  })













});