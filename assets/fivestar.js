$(document).ready(function(){
  $('input').click(function(){
    console.log('function called');
    var data = $(this).attr('value');
    console.log(data);
    $.ajax({
      data: data,
      type:"POST",
      url: '/',
      error: function(jqXHR, textStatus, errorThrown){
        console.log("Ajax error");
      },
      success: function(data, textStatus, jqXHR){
        console.log("sucess");
        location.reload(true);
      }
    });
  });
});
