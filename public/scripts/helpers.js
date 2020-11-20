

/* function to validate a tweet before posting return true if no error found , false otherwise */
const tweetValidation = function () {

  if ($('#tweet-text').val().length > 140) {
    $('#error-msg').html('&#9940 ERROR: Tweet Exceed Length!! &#9940').slideDown('slow');
    return false;
  } else if ($('#tweet-text').val().length === 0) {
    $('#error-msg').html(' &#9940 ERROR: Plz enter a valid Tweet!! &#9940').slideDown('slow');
    return false;
  } else {
    $('#error-msg').slideUp('slow');
    return true;
  }
}
const resetForm = function() {

  $('#tweet-text').val(''); // clear textare
  $('.counter').text(140);//reset counter

}

// tweet submition handler
const submitTweet = function() {

  $
    .ajax('/tweets')
    .then(tweets => {
      addLatestTweet(tweets);
    })
    .catch(err => console.log(err))

}
// adding latest tweet
const addLatestTweet = function(tweets) {
  const tweet = Object.values(tweets).pop()
  const newTweetElement = createTweetElement(tweet);

  $('#tweets-container').prepend(newTweetElement);

};

//loading all tweets in server
const loadTweets = function() {
  $
    .ajax('/tweets')
    .then(tweets => {
      renderTweets(tweets);
    })
    .catch(err => console.log(err))

};

const renderTweets = function(tweets) {

  for (let tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

// construct a tweet box elements
const createTweetElement = function(tweetObj) {
  // header elements
  const userAvatar = $(`<img src='${tweetObj.user.avatars}' alt='user-avatar'>`);
  const username = $('<span>').addClass('user-name').text(`${tweetObj.user.name}`);
  const userHandle = $('<span>').addClass('handle').text(`${tweetObj.user.handle}`);
  const div = $('<div>').append(userAvatar, username);
  const header = $('<header>').append(div, userHandle);

  // tweet content
  const tweetContent = $('<p>').addClass('content').text(`${tweetObj.content.text}`);
  
  // footer elements
  const date = $('<span>').addClass('date-created').text(` ${moment().startOf('hour').fromNow(tweetObj.created_at)} ago`);
  const icons = $(`<span> <i class='fas fa-flag'></i>  <i class='fas fa-retweet'></i> <i class='fas fa-heart'></i> </span>`);
  const footer = $('<footer>').append(date, icons);

  // the container of the all the elements
  const article = $('<article>').addClass('tweet').append(header, tweetContent, footer);

  return article;

};

