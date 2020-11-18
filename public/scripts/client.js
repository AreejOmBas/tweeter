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
      $('#error-msg').text('ERROR: Tweet Exceed Length!!');
      return;
    } else if ($('#tweet-text').val().length === 0) {
      $('#error-msg').text('ERROR: No Tweet Found!!');
      return;
    } else {
      $('#error-msg').css('display', 'none');

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

    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src="${tweetObj.user.avatars}" alt="user-avatar">
            <span class="user-name"> ${tweetObj.user.name}</span> 
           </div>
          <span class="handle">${tweetObj.user.handle}</span>
        </header>
        <p class= "content"> ${tweetObj.content.text} </p>

        <footer> 
          <span class="date-created">  ${tweetObj.created_at} </span>
             <span>
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </span>
        </footer>
       </article>
`);

    return $tweet;
  }

  loadTweets();


});

