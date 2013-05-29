// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require highcharts
//= require_tree .

$(function() {
  
  $("[name='client_edit_link']").click(function() {
                                       
  var client_id = $(this).attr('id')
                                       
  $(".page").load('/client_edit?id=' + client_id, function(){
                                                       
  });
                                       
  });
  
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
  

  $('.icon-tasks, a#sideDashboard').click(function() {
                                            
  $(".page").load('/dashboard', function(){
                                                            
  });
                                            
  });
  
  
  $('.icon-bar-chart, a#sideReports').click(function() {
  
  $(".page").load('/graphs', function(){                  
                  
  });

  });
  
  $('.icon-group, a#sideClients').click(function() {
                             
  $(".page").load('/clients', function(){
                  
  $("[name='client_edit_link']").click(function() {
                                                       
  var client_id = $(this).attr('id')
                                                       
  $(".page").load('/client_edit?id=' + client_id, function(){
                                                       
  });
                                                       
  });
                                             
  });
                             
  });
  
  
  
  $('.icon-credit-card, .icon-money, a#sideIncome, a#sideExpenses').click(function() {
                               
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
                         
  });
  
  
  $('.icon-edit.tableIcon').click(function() {
                                  
                                  $('.sidebarItem').removeClass('active');
                                  
                                  $('.side').css('z-index', '1')
                                  
                                  $('.side').removeClass('active');
                                  
                                  $('.side').addClass('nonactive');
                                  
                                  $('.sideNotes').css('z-index', '-1');
                                  
                                  $('#sideNotes').addClass('active');
                                  
                                  $('.sideNotes').addClass('active');
                                  
                                  $('.sideNotes').removeClass('nonactive');
                                  
                                  $('.active').animate({
                                                       
                                                       left: '0px'
                                                       
                                                       });
                                  
                                  $('.nonactive').animate({
                                                          
                                                          left: '-301px'
                                                          
                                                          });
                                  
                                  $('.tableRow').css('background', 'white');
                                  
                                  $('.tableRow').css('color', '#bebeb7');
                                  
                                  $('.noteSummary').css('background', 'white');
                                  
                                  if ($(this).hasClass('selected') != true) {
                                  
                                  $('.icon-edit.tableIcon').removeClass('selected');
                                  
                                  $(this).addClass('selected');
                                  
                                  var iconId = $(this).attr('id');
                                  
                                  var yOffset = $('div.noteSummary[id=' + iconId + ']').offset().top + $('div.sideNotes').scrollTop() - 123;
                                  
                                  $('div.sideNotes').animate({
                                                             
                                                             scrollTop: yOffset
                                                             
                                                             }, 'slow');
                                  
                                  $('.noteSummary[id=' + iconId + ']').css('background', '#d9f0d7');
                                  
                                  $('.noteSummary[id=' + iconId + ']').css('color', 'black');
                                  
                                  $(this).closest('.tableRow').css('background', '#d9f0d7');
                                  
                                  $(this).closest('.tableRow').css('color', 'black');
                                  
                                  }
                                  
                                  else {
                                  
                                  $('.icon-edit.tableIcon').removeClass('selected');
                                  }
                                  
                                  });
  
  
  $('.noteSummary').click(function() {
                          
                          $('.noteSummary').css('background', 'white');
                          
                          $('div.tableRow').css('background', 'white');
                          
                          $('div.tableRow').css('color', '#bebeb7');
                          
                          if ($(this).hasClass('selected') != true) {
                          
                          $('.noteSummary').removeClass('selected');
                          
                          $(this).addClass('selected');
                          
                          var id = $(this).attr('id');
                          
                          if ($('.icon-edit[id=' + id + ']').closest('.table').hasClass('incomeTable')) {
                          
                          var tableOffset = parseInt($('div.incomeTable').position().top);
                          
                          }
                          
                          else {
                          
                          var tableOffset = parseInt($('div.expenseTable').position().top);
                          
                          }
                          
                          var yOffset = parseInt($('.icon-edit[id=' + id + ']').closest('.tableRow').position().top);
                          
                          var totalOffset = tableOffset + yOffset
                          
                          $(this).css('background', '#d9f0d7');
                          
                          $('.icon-edit[id=' + id + ']').closest('.tableRow').css('background', '#d9f0d7');
                          
                          $('.icon-edit[id=' + id + ']').closest('.tableRow').css('color', 'black');
                          
                          $('div.mainWindow').animate({
                                                      
                                                      scrollTop: totalOffset
                                                      
                                                      }, 'slow');
                          
                          }
                          
                          else {
                          
                          $('.noteSummary').removeClass('selected');
                          
                          }
                          
                          });
  
  
  
  
  
  
  
  
  
  
  
  
  
  $('.icon-envelope.tableIcon').click(function() {
                                      
                                      $('.sidebarItem').removeClass('active');
                                      
                                      $('.side').css('z-index', '1')
                                      
                                      $('.side').removeClass('active');
                                      
                                      $('.side').addClass('nonactive');
                                      
                                      $('.sideInvoices').css('z-index', '-1');
                                      
                                      $('#sideInvoices').addClass('active');
                                      
                                      $('.sideInvoices').addClass('active');
                                      
                                      $('.sideInvoices').removeClass('nonactive');
                                      
                                      $('.active').animate({
                                                           
                                                           left: '0px'
                                                           
                                                           });
                                      
                                      $('.nonactive').animate({
                                                              
                                                              left: '-301px'
                                                              
                                                              });
                                      
                                      $('.tableRow').css('background', 'white');
                                      
                                      $('.tableRow').css('color', '#bebeb7');
                                      
                                      $('.invoiceSummary').css('background', 'white');
                                      
                                      if ($(this).hasClass('selected') != true) {
                                      
                                      $('.icon-envelope.tableIcon').removeClass('selected');
                                      
                                      $(this).addClass('selected');
                                      
                                      var tablerowName = $(this).closest('.tableRow').attr('name');
                                      
                                      var yOffset = $('.invoiceSummary[id=' + tablerowName + ']').offset().top + $('div.sideInvoices').scrollTop() - 123;
                                      
                                      $('div.sideInvoices').animate({
                                                                    
                                                                    scrollTop: yOffset
                                                                    
                                                                    }, 'slow');
                                      
                                      $('.invoiceSummary[id=' + tablerowName + ']').css('background', '#d9f0d7');
                                      
                                      $('.invoiceSummary[id=' + tablerowName + ']').css('color', 'black');
                                      
                                      $(this).closest('.tableRow').css('background', '#d9f0d7');
                                      
                                      $(this).closest('.tableRow').css('color', 'black');
                                      
                                      }
                                      
                                      else {
                                      
                                      $('.icon-envelope.tableIcon').removeClass('selected');		
                                      }
                                      
                                      });
  
  
  $('.invoiceSummary').click(function() {
                             
                             $('.invoiceSummary').css('background', 'white');
                             
                             $('div.tableRow').css('background', 'white');
                             
                             $('div.tableRow').css('color', '#bebeb7');
                             
                             if ($(this).hasClass('selected') != true) {
                             
                             $('.invoiceSummary').removeClass('selected');
                             
                             $(this).addClass('selected');
                             
                             var id = $(this).attr('id');
                             
                             var tableOffset = parseInt($('div.incomeTable').position().top);
                             
                             var yOffset = parseInt($('div.incomeTable .tableRow[name=' + id + ']').position().top);
                             
                             var totalOffset = tableOffset + yOffset
                             
                             $(this).css('background', '#d9f0d7');
                             
                             $('div.incomeTable .tableRow[name=' + id + ']').css('background', '#d9f0d7');
                             
                             $('div.incomeTable .tableRow[name=' + id + ']').css('color', 'black');
                             
                             $('div.mainWindow').animate({ 
                                                         
                                                         scrollTop: totalOffset
                                                         
                                                         }, 'slow');
                             
                             }
                             
                             else {
                             
                             $('.invoiceSummary').removeClass('selected');
                             
                             }
                             
                             });	
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  $('.icon-folder-open-alt.tableIcon').click(function() {
                                             
                                             $('.sidebarItem').removeClass('active');
                                             
                                             $('.side').css('z-index', '1')
                                             
                                             $('.side').removeClass('active');
                                             
                                             $('.side').addClass('nonactive');
                                             
                                             $('.sideReceipts').css('z-index', '-1');
                                             
                                             $('#sideReceipts').addClass('active');
                                             
                                             $('.sideReceipts').addClass('active');
                                             
                                             $('.sideReceipts').removeClass('nonactive');
                                             
                                             $('.active').animate({
                                                                  
                                                                  left: '0px'
                                                                  
                                                                  });
                                             
                                             $('.nonactive').animate({
                                                                     
                                                                     left: '-301px'
                                                                     
                                                                     });		
                                             
                                             $('.tableRow').css('background', 'white');
                                             
                                             $('.tableRow').css('color', '#bebeb7');
                                             
                                             $('.receiptSummary').css('background', 'white');
                                             
                                             if ($(this).hasClass('selected') != true) {
                                             
                                             $('.icon-folder-open-alt.tableIcon').removeClass('selected');
                                             
                                             $(this).addClass('selected');
                                             
                                             var tablerowName = $(this).closest('.tableRow').attr('name');
                                             
                                             var yOffset = $('.receiptSummary[id=' + tablerowName + ']').offset().top + $('div.sideReceipts').scrollTop() - 123;
                                             
                                             $('div.sideReceipts').animate({
                                                                           
                                                                           scrollTop: yOffset
                                                                           
                                                                           }, 'slow');
                                             
                                             $('.receiptSummary[id=' + tablerowName + ']').css('background', '#d9f0d7');
                                             
                                             $('.receiptSummary[id=' + tablerowName + ']').css('color', 'black');
                                             
                                             $(this).closest('.tableRow').css('background', '#d9f0d7');
                                             
                                             $(this).closest('.tableRow').css('color', 'black');
                                             
                                             }
                                             
                                             else {
                                             
                                             $('.icon-folder-open-alt.tableIcon').removeClass('selected');		
                                             }
                                             
                                             });
  
  
  $('.receiptSummary').click(function() {
                             
                             $('.receiptSummary').css('background', 'white');
                             
                             $('div.tableRow').css('background', 'white');
                             
                             $('div.tableRow').css('color', '#bebeb7');
                             
                             if ($(this).hasClass('selected') != true) {
                             
                             $('.receiptSummary').removeClass('selected');
                             
                             $(this).addClass('selected');
                             
                             var id = $(this).attr('id');
                             
                             var tableOffset = parseInt($('div.expenseTable').position().top);
                             
                             var yOffset = parseInt($('div.expenseTable .tableRow[name=' + id + ']').position().top);
                             
                             var totalOffset = tableOffset + yOffset
                             
                             $(this).css('background', '#d9f0d7');
                             
                             $('div.expenseTable .tableRow[name=' + id + ']').css('background', '#d9f0d7');
                             
                             $('div.expenseTable .tableRow[name=' + id + ']').css('color', 'black');
                             
                             $('div.mainWindow').animate({ 
                                                         
                                                         scrollTop: totalOffset
                                                         
                                                         }, 'slow');
                             
                             }
                             
                             else {
                             
                             $('.receiptSummary').removeClass('selected');
                             
                             }
                             
                             });
  
  $('.backtoTop').click(function() {
                        
                        $('.mainWindow').animate({ 
                                                 
                                                 scrollTop: 0
                                                 
                                                 }, 'slow');	
                        
                        });
  
  var posTop = parseInt($('.monthMenu').css("top"));
  
  $('.mainWindow').scroll(function() {
                          var scrollYpos = parseInt($('.mainWindow').scrollTop());
                          var newposTop = scrollYpos + posTop;
                          $(".monthMenu").css({
                                              top: newposTop
                                              });
                          
                          if (scrollYpos > 300) {
                          $('.backtoTop').fadeIn();
                          }
                          else {
                          $('.backtoTop').fadeOut();		
                          }
                          });
  
  $('.sidebarItem').hover(function() {
                          
                          $(this).children('.tooltip').toggle();
                          
                          });
  
  $('.sideBar i, .topnavTopics a').click(function() {
                                         
                                         var item = $(this).attr('id');
                                         
                                         $('.sidebarItem').removeClass('active');
                                         
                                         $('.side').css('z-index', '1')
                                         
                                         $('.side').removeClass('active');
                                         
                                         $('.side').addClass('nonactive');
                                         
                                         $('.sidebarItem[id=' + item + ']').addClass('active');
                                         
                                         $('.' + item).css('z-index', '-1');
                                         
                                         $('.' + item).addClass('active');
                                         
                                         $('.' + item).removeClass('nonactive');
                                         
                                         $('.active').animate({
                                                              
                                                              left: '0px'
                                                              
                                                              });
                                         
                                         $('.nonactive').animate({
                                                                 
                                                                 left: '-301px'
                                                                 
                                                                 });
                                         
                                         });
  
  $('.pageBefore').hover(function() {
                         $('.pageBefore .month').animate({
                                                         paddingLeft: '20px'
                                                         }, 500);
                         $('.pageBefore .monthMenu').animate({
                                                             width: '150px'
                                                             }, 500);
                         },
                         function() {
                         $('.pageBefore .month').animate({
                                                         paddingLeft: '60px'	
                                                         }, 500);
                         $('.pageBefore .monthMenu').animate({
                                                             width: '180px'
                                                             }, 500);
                         });
  
  $('.pageAfter').hover(function() {
                        $('.pageAfter .month').animate({
                                                       paddingRight: '20px'	
                                                       }, 500);
                        $('.pageAfter .monthMenu').animate({
                                                           width: '150px'
                                                           }, 500);
                        },
                        function() {
                        $('.pageAfter .month').animate({
                                                       paddingRight: '60px'	
                                                       }, 500);
                        $('.pageAfter .monthMenu').animate({
                                                           width: '180px'
                                                           }, 500);	
                        });
  
  $('.month').hover(function() {
                    $(this).parent('div').children('i').css('color', 'white');
                    $(this).prev('i').css('color', '#818180');
                    $(this).css('text-decoration', 'underline');	
                    },
                    function() {
                    $(this).prev('i').css('color', 'white');
                    $(this).css('text-decoration', 'none');
                    $(this).parent('div').children('i').first().css('color', '#818180');
                    });
  
  $('.tabTop, .textTop').click( function() {
                               
                               $('.dropMenu').toggle();
                               
                               });
  
  $('.settingsmenuOption').click( function() {
                                 
                                 $('.settingsmenuOption').removeClass('active');
                                 
                                 $('.settingsmenuOption').children('div').removeClass('active');
                                 
                                 $(this).addClass('active');
                                 
                                 $(this).children('div').addClass('active');
                                 
                                 });
  
  
  $('input[type=checkbox]').attr('checked', false);

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
  
var date = GetURLParameter('date');
  
  
var duration = GetURLParameter('duration');
  

});


