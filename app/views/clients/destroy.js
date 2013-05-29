$(".page").load('/clients', function(){
	
  $("[name='client_edit_link']").click(function() {

  var client_id = $(this).attr('id')

  $(".page").load('/client_edit?id=' + client_id, function(){

  });

  });
                    
});

$("#incomeform").load('/incomeform', function(){
                      
});
