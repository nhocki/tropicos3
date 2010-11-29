jQuery(function($){
  $(".destroy-link").live('click', function(event){
    $link = $(this);
    var obj_id = $link.attr("id").replace("cnt-", "");
    $.post($link.attr("href")+".json", {_method: "DELETE", id: obj_id, format: "json"}, function(data){
      if(data["result"] == "ok"){
        $("#alert").addClass('success').removeClass('failed').html("Resultado exitoso").slideDown('fast').delay(4000).fadeOut(1000);
        $link.parent().fadeOut("fast");
      }else{
        $("#alert").html.removeClass('success').addClass('failed').("Falló la operación. Intenta de nuevo").slideDown('fast').delay(4000).fadeOut(1000);
      }
    })
    return false;
  })
});