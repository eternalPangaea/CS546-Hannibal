(function($) {
    $("#submit").click(function(){
      $.ajax({
        type:"POST",
        dataType: "JSON",
        url: "http://localhost:3000/hannibal/user",
        data: JSON.stringify({
          user_name: $("#user_name").val(),
          user_pass: $("#user_pass").val(),
          contact_email: $("#contact_email").val()
        }),
        contentType:"application/json",
        success: function(result){
           location.reload();
        }
        
      });
    });        
})(jQuery);