(function($) {
    
        var currentLink = "http://localhost:3000/hannibal/user/email/";
        user_id = "02";//change to the _id stored in users table in mongo
        const email ="";
        var requestConfig = {
          method: "GET",
          url: "http://localhost:3000/hannibal/user/email/"+user_id
        };
        $.ajax(requestConfig).then(function(result) {
          $("#contact_email").val(result);
        });
    
  })(jQuery);