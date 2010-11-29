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
  
  // line1 = [["frogs",3], ["buzzards",7], ["deer",2.5], ['turkeys',6], ['moles',5], ['ground hogs',4]];
  //   
  //   plot = $.jqplot('tgraph', [line1], {
  //     title: '',
  //     seriesDefaults:{
  //       renderer:$.jqplot.PieRenderer,
  //       rendererOptions:{
  //         sliceMargin:8,
  //         diameter: 200,
  //         lineLabels: true,
  //         lineLabelsLineColor: '#777'
  //       }
  //     },
  //     highlighter: {sizeAdjust: 7.5},
  //     legend:{show:false},
  //     cursor: {  
  //       showCursorLegend:true,
  //       showTooltip: true,
  //       zoom:true
  //     }
  //   });
  
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
