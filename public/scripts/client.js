/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];
  $('form').submit(event => {
    event.preventDefault();

    if ($('#tweet-text').val().length > 140) {
      $('#error-msg').html('&#9940 ERROR: Tweet Exceed Length!! &#9940').slideDown( "slow");;
      return;
    } else if ($('#tweet-text').val().length === 0) {
      $('#error-msg').html(' &#9940 ERROR: No Tweet Found!! &#9940').slideDown( "slow");
      return;
    } else {
      $('#error-msg').hide();

      const tweet = $('#tweet-text').val();
      console.log('this is the tweet ', tweet);
      $
        .ajax({
          url: "/tweets",
          type: "POST",
          data: $('form').serialize()
        })
        .then((res) => submitTweet(res))
        .catch(err => console.log(err))
    }


  });

  const submitTweet = function () {
    $
      .ajax('/tweets')
      .then(tweets => {
        addLatestTweet(tweets);
      })
      .catch(err => console.log(err))

  }
  const addLatestTweet = function (tweets) {
    const tweet = Object.values(tweets).pop()
    const newTweetElement = createTweetElement(tweet);

    $('#tweets-container').prepend(newTweetElement);

  }

  const loadTweets = function () {
    $
      .ajax('/tweets')
      .then(tweets => {
        renderTweets(tweets);
      })
      .catch(err => console.log(err))

  }

  const renderTweets = function (tweets) {

    for (let tweet of tweets) {

      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function (tweetObj) {

    const userAvatar = $(`<img src="${tweetObj.user.avatars}" alt="user-avatar">`);
    const username = $('<span>').addClass("user-name").text(`${tweetObj.user.name}`);
    const userHandle = $('<span>').addClass("handle").text(`${tweetObj.user.handle}`);
    const tweetContent = $('<p>').addClass("content").text(`${tweetObj.content.text}`);
    const date = $('<span>').addClass("date-created").text(` ${tweetObj.created_at} `);
    const icons = $(`<span> <i class="fas fa-flag"></i>  <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i> </span>`);
    const footer = $('<footer>').append(date, icons);
    const div = $('<div>').append(userAvatar, username);
    const header = $('<header>').append(div, userHandle);
    const article = $('<article>').addClass('tweet').append(header, tweetContent, footer);

    return article;

  }

  loadTweets();


});
