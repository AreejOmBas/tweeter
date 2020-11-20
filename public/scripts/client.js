/*
 *Form submition  
 *
 */
$(document).ready(function() {
  // load tweet upon page load
  loadTweets();
  
  // form submition handler
   $('form').submit(event => {
    event.preventDefault();

   if (!tweetValidation()) {
    return ;
   } else {
    $
      .ajax({
        url: '/tweets',
        type: 'POST',
        data: $('form').serialize()
      })
      .then((res) => {
        resetForm();
        submitTweet(res);  
      })
      .catch(err => console.log(err));
    }
  });
});
