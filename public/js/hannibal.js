(function($) {
    
        var currentLink = "http://localhost:3000/hannibal/user/email/";
        user_id = "21301e81-10ee-4afd-8baf-71f9b9a48dc9";//change to the _id stored in users table in mongo
        const email ="";
        var requestConfig = {
          method: "GET",
          url: "http://localhost:3000/hannibal/user/email/"+user_id
        };
        $.ajax(requestConfig).then(function(result) {
          $("#contact_email").val(result);
        });
    
  })(jQuery);
