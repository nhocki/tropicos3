$console = $("#console");

function elementSupportsAttribute(element, attribute){
  return (attribute in document.createElement(element));
}

function inputSupportsType(test){
  return (document.createElement('input').setAttribute('type', test) != 'text');
}

function log(msj){
  // $console.append("----------------- <br />");
  // $console.append(msj);
  // $console.append("<br />");
}

$(function(){
  $("label").inFieldLabels();
  $('input[type=text]').clearableTextField();
  $("#boton").css("cursor", "pointer").click(function(){
    $view.get_all_data_clicked($("#country-key").val());
  })
  $model = new $.Model();
  $view = new $.View();
  $controller = new $.Controller($model, $view);
  //$model.get_country("0Amhf1qkV0GFFdFBsMXRLLTBSVFZLN1BuRjVBbnFGc2c");
  $(".loader").ajaxStop(function(){
    $(this).hide();
  })
  $console.ajaxStop(function() {
    log("YA CARGÓ TODO!!");
    log(sites['colombia']['jojoy']);
    log(sites['colombia']['piedad']);
    log(sites['colombia']['reyes']);
  });
});
