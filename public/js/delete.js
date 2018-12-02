(function($) {
    $("#delete").click(function(){
      $.ajax({
        type:"DELETE",
        url: "http://localhost:3000/hannibal/product/"+$("#product_id").val()+"."+$("#user_id").val(),
        dataType: "text",
        success: function(data,textStatus, xhr){
        	
          if(xhr.status == 200){
            alert("success");
        	window.location.assign("http://localhost:3000/hannibal/postItems/"+$("#user_id").val());
          }
          else
            alert("failed");
        },
      });
    });        
})(jQuery);