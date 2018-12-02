(function($) {

    
    	var requestConfig1 = {
          method: "GET",
          url: "http://localhost:3000/hannibal/categories",
        };
        $.ajax(requestConfig1).then(function(result) {
           $.each(result, function(index) {
         		$('#category_id')
             	.append($("<option></option>")
                        .attr("value",result[index]._id)
                        .text(result[index].name)); 
			     });
        });


      

      $("#submit").click(function(){   
        $.ajax({
          type:"put",
          url: "http://localhost:3000/hannibal/product/"+$("#product_id").val(),
          dataType: "text",
          data: JSON.stringify({
            name: filterXSS($("#name").val()),
            price: filterXSS($("#price").val()),
            description: filterXSS($("#description").val()),
            contact_email: filterXSS($("#contact_email").val()),
            user_id: filterXSS($("#user_id").val()),
            category_id: filterXSS($("#category_id option:selected").val()),
            pics:$("#pic_b").val()
          }),
          contentType:"application/json",
          success: function(data,textStatus, xhr){
            if(xhr.status == 200){
              alert("success");
              location.reload(true);
            }
            else
              alert("failed")
          },
        });
      });  

  })(jQuery);
