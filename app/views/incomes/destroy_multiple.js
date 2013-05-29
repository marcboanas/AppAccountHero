function GetURLParameter(sParam)

{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

if (GetURLParameter('date') && GetURLParameter('duration')) {

var date = GetURLParameter('date');

var duration = GetURLParameter('duration');


$(".page").load('/tables?date=' + date + '&duration=' + duration, function(){
                
$("[name='client_edit_link']").click(function() {
                                                     
var client_id = $(this).attr('id')
                                                     
$(".page").load('/client_edit?id=' + client_id, function(){
                                                                     
});
                                     
});
                
                
$('input[type=checkbox]').attr('checked', false);
                
});
    
}

else {

$(".page").load('/tables', function(){
                
$("[name='client_edit_link']").click(function() {
                                                     
var client_id = $(this).attr('id')
                                                     
$(".page").load('/client_edit?id=' + client_id, function(){
                                                                     
});
                                                     
});
                    
                    
$('input[type=checkbox]').attr('checked', false);
                    
});
    
}
