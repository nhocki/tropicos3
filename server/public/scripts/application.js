jQuery(function($){
  
  $(".editable").inlineEdit({ 
    buttons: '<button class="save">save</button>',
    cancelOnBlur: true
  });
  
  $(".destroy-link").live('click', function(event){
    $link = $(this);
    var obj_id = $link.attr("id").replace("cnt-", "");
    $.post($link.attr("href")+".json", {_method: "DELETE", id: obj_id, format: "json"}, function(data){
      if(data["result"] == "ok"){
        $("#alert").addClass('success').removeClass('failed').html("Resultado exitoso").slideDown('fast').delay(4000).fadeOut(1000);
        $link.parents(".centre").fadeOut("fast");
      }else{
        $("#alert").html.removeClass('success').addClass('failed').("Falló la operación. Intenta de nuevo").slideDown('fast').delay(4000).fadeOut(1000);
      }
    })
    return false;
  });
    
  $("#add_centre").live('submit', function(event){
    $form = $(this);
    $.post($form.attr("action")+".json", $form.serialize(), function(data){
      if(data["centre"] != undefined && !isNaN(data["centre"]["id"])){
        $("#alert").addClass('success').removeClass('failed').html("Resultado exitoso").slideDown('fast').delay(4000).fadeOut(1000);
        var ht = '<div class="centre">';
      		  ht += '<h4>'+data["centre"]["name"]+'</h4>';
      		  ht += '<p>';
      		  ht += '  <a href="/centres/'+data["centre"]["id"]+'">View</a>';
      		  ht += '  <a href="/centres/'+data["centre"]["id"]+'/edit">Edit</a>';
      		  ht += '  <a href="/centres/'+data["centre"]["id"]+'" class="destroy-link">Destroy</a>';
      		  ht += '</p>';
      	    ht += '</div>';
        $("#centres").append(ht);
        $("#new-centre-name").val("");
      }else{
        $("#alert").html.removeClass('success').addClass('failed').("Falló la operación. Intenta de nuevo").slideDown('fast').delay(4000).fadeOut(1000);
      }
    })
    return false;
  });
  
  $("#add_table").live('submit', function(event){
    $form = $(this);
    $.post($form.attr("action")+".json", $form.serialize(), function(data){
      if(data["table"] != undefined && !isNaN(data["table"]["id"])){
        $("#alert").addClass('success').removeClass('failed').html("Resultado exitoso").slideDown('fast').delay(4000).fadeOut(1000);
        var ht = '<div class="table">';
      		  ht += '  <strong>'+data["table"]["name"]+'</strong>';
      		  ht += '  <a href="/tables/'+data["table"]["id"]+'">View</a>';
      		  ht += '  <a href="/tables/'+data["table"]["id"]+'/edit">Edit</a>';
      		  ht += '  <a href="/tables/'+data["table"]["id"]+'" class="destroy-link">Destroy</a>';
      	    ht += '</div>';
        $("#tables").append(ht);
        $(".runn").val("");
      }else{
        $("#alert").html.removeClass('success').addClass('failed').("Falló la operación. Intenta de nuevo").slideDown('fast').delay(4000).fadeOut(1000);
      }
    })
    return false;
  });
  
  
});