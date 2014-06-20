//JQuery Twitter Feed. Coded by Tom Elliott @ www.webdevdoor.com (2013) based on https://twitter.com/javascripts/blogger.js
//Requires JSON output from authenticating script: http://www.webdevdoor.com/php/authenticating-twitter-feed-timeline-oauth/

jQuery(document).ready(function () {
    var displaylimit = 3;
    var twitterprofile = jQuery('#twitter-feed').attr('data-profile');
	var screenname = jQuery('#twitter-feed').attr('data-screenname');;
    var showdirecttweets = false;
    var showretweets = true;
    var showtweetlinks = true;
    var showprofilepic = true;
	var showtweetactions = true;
	var showretweetindicator = true;
	
	var headerHTML = '';
	var loadingHTML = '';
	headerHTML += '<div class="twitter-icon-count"><span class="tweeticon"><img src="images/twitter_white.png" /></span><span class="followers">';
	loadingHTML += '<div id="loading-container"><img src="images/ajax-loader.gif" width="32" height="32" alt="tweet loader" /></div>';

	jQuery('#twitter-feed').html(headerHTML + loadingHTML);
        
    jQuery.getJSON('twitterfeed.php', 
        function(feeds) { 
		   //alert(feeds);
            var feedHTML = '';
            var displayCounter = 1;   
           	var followers = feeds[0].user.followers_count;
            for (var i=0; i<feeds.length; i++) {
				var tweetscreenname = feeds[i].user.name;
                var tweetusername = feeds[i].user.screen_name;
                var profileimage = feeds[i].user.profile_image_url_https;
                var status = feeds[i].text; 
				var isaretweet = false;
				var isdirect = false;
				var tweetid = feeds[i].id_str;
				
				//If the tweet has been retweeted, get the profile pic of the tweeter
				if(typeof feeds[i].retweeted_status != 'undefined'){
				   profileimage = feeds[i].retweeted_status.user.profile_image_url_https;
				   tweetscreenname = feeds[i].retweeted_status.user.name;
				   tweetusername = feeds[i].retweeted_status.user.screen_name;
				   tweetid = feeds[i].retweeted_status.id_str;
				   status = feeds[i].retweeted_status.text; 
				   isaretweet = true;
				 };
				 
				 
				 //Check to see if the tweet is a direct message
				 if (feeds[i].text.substr(0,1) == "@") {
					 isdirect = true;
				 }
				 
				//console.log(feeds[i]);
				 
				 //Generate twitter feed HTML based on selected options
				 if (((showretweets == true) || ((isaretweet == false) && (showretweets == false))) && ((showdirecttweets == true) || ((showdirecttweets == false) && (isdirect == false)))) { 
					if ((feeds[i].text.length > 1) && (displayCounter <= displaylimit)) {             
						if (showtweetlinks == true) {
							status = addlinks(status);
						}
						 
						if (displayCounter == 1) {
							feedHTML += headerHTML;
							feedHTML += followers+'</span></div><div class="list"><div class="twitter-icon-name"><img src="'+profileimage+'"images/twitter-feed-icon.png" width="22" height="22" alt="twitter icon" /><a href="https://twitter.com/'+twitterprofile+'" target="_blank">@'+twitterprofile+'</a></div>';
						}
									 
						feedHTML += '<div class="twitter-article">'; 										                 
						feedHTML += '<div class="twitter-pic"><a href="https://twitter.com/'+tweetusername+'" target="_blank"><img src="'+profileimage+'"images/twitter-feed-icon.png" width="48" height="48" alt="twitter icon" /></a></div>';
						feedHTML += '<div class="twitter-text"><p><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+tweetusername+'" target="_blank">'+tweetscreenname+'</a></strong> <a href="https://twitter.com/'+tweetusername+'" target="_blank">@'+tweetusername+'</a></span><span class="tweet-time">, '+relative_time(feeds[i].created_at)+'</span><br/>'+status+'</p>';
						
						if ((isaretweet == true) && (showretweetindicator == true)) {
							feedHTML += '<div id="retweet-indicator"></div>';
						}						
						if (showtweetactions == true) {
							feedHTML += '<div id="twitter-actions"><div class="intent" id="intent-reply"><a href="https://twitter.com/intent/tweet?in_reply_to='+tweetid+'" title="Reply"></a></div><div class="intent" id="intent-retweet"><a href="https://twitter.com/intent/retweet?tweet_id='+tweetid+'" title="Retweet"></a></div><div class="intent" id="intent-fave"><a href="https://twitter.com/intent/favorite?tweet_id='+tweetid+'" title="Favourite"></a></div></div>';
						}
						
						feedHTML += '</div>';
						feedHTML += '</div>';
						if (displayCounter == feeds.length) { feedHTML += '</div>'; }
						displayCounter++;
					}   
				 }
            }
             
            jQuery('#twitter-feed').html(feedHTML);
			
			//Add twitter action animation and rollovers
			setInterval( function() {
				jQuery('#twitter-feed .list').find('.twitter-article:first').animate({
					'marginTop': '-75px'
				}, 500, function() {
					jQuery(this).detach().css('marginTop', '0').appendTo('#twitter-feed .list');
				});
			}, 3000);
			
    }).error(function(jqXHR, textStatus, errorThrown) {
		if (errorThrown == "Not Found") {
			errorThrown = "not found: tweets php script";	
		}
      // console.log(textStatus + " - " + errorThrown);
    });
    

    //Function modified from Stack Overflow
    function addlinks(data) {
        //Add link to all http:// links within tweets
         data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            return '<a href="'+url+'" >'+url+'</a>';
        });
             
        //Add link to @usernames used within tweets
        data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
            return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
		//Add link to #hastags used within tweets
        data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
            return '<a href="https://twitter.com/search?q='+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
        return data;
    }
     
     
    function relative_time(time_value) {
      var values = time_value.split(" ");
      time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
      var parsed_date = Date.parse(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	  var shortdate = time_value.substr(4,2) + " " + time_value.substr(0,3);
      delta = delta + (relative_to.getTimezoneOffset() * 60);
     
      if (delta < 60) {
        return '1m';
      } else if(delta < 120) {
        return '1m';
      } else if(delta < (60*60)) {
        return (parseInt(delta / 60)).toString() + 'm';
      } else if(delta < (120*60)) {
        return '1h';
      } else if(delta < (24*60*60)) {
        return (parseInt(delta / 3600)).toString() + 'h';
      } else if(delta < (48*60*60)) {
        //return '1 day';
		return shortdate;
      } else {
        return shortdate;
      }
    }
     
});