(function($) {
        var currentLink = "http://localhost:3000/hannibal/user/email/";
        const email ="";
        var requestConfig = {
          method: "GET",
          url: "http://localhost:3000/hannibal/user/email/"+$("#user_id").val(),
        };
        $.ajax(requestConfig).then(function(result) {
          $("#contact_email").val(result);
        });
    
  })(jQuery);
