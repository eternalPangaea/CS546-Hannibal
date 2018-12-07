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

    $("#private").click(function(){
        let url = window.location.href;
        $.ajax({
            url : url,
            type : 'POST',
            dataType : 'json',
            data: {
                user_name : $('#user_name').val(),
                user_pass : $('#user_pass').val(),
                contact_email : $('#contact_email').val()
                },
            success:function(data){
                if(data.status){
                    alert("sucess");
                    $("#redirect")[0].click();
                }
                
            },
            error:function(){
            }
        });
    });
})(jQuery);