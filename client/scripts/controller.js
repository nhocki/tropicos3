country = {};
national = {};

jQuery.extend({

  Controller: function(model, view){

    var vlist = $.ViewListener({
      view_get_all_data : function(key){
        model.get_country(key);
      }
    });

    function build_center(name, runner){
      var output = '<div class="center" id="' + name + '">';
      output +=   '<h3>Centro ' + name + '<span class="votes">' + sites[name][runner] + '</span></h3>';
      output +=   '<div class="tables">';
      for(t in sites[name]['tables']){
        var table_name = sites[name]['tables'][t];
        var table = sites[table_name];
        output += '<div class="table" id="' + table_name + '">';
        output += '<p><strong>' + table_name + '</strong> <span class="votes">' + table[runner] + '</span></p>';
        output += '</div>';
      }
      output +=   '</div>';
      output += '</div>';
      return output;
    }

    function build_city(name, runner){
      var output = '<div class="city" id="' + name + '">';
      output +=   '<h2>Ciudad ' + name + ' <span class="votes">' + sites[name][runner] + '</span></h2>';
      output +=   '<div class="centers">';
      for(c in sites[name]['centers']){
        var center_name = sites[name]['centers'][c];
        output += build_center(center_name, runner);
      }
      // build_center!!!!
      output +=   '</div>';
      output += '</div>';
      return output;
    }

    function build_depto(name, runner){
      view.build_single_overlay(name, runner);
      var output = '<div class="depto" id="' + name + '">';
      output +=   '<h1>Departamento ' + name + ' <span class="votes"> ' + sites[name][runner] + '</span></h1>';
      output +=   '<div class="cities">';
      for(c in sites[name]['cities']){
        var city_name = sites[name]['cities'][c];
        output += build_city(city_name, runner);
      }
      output +=   '</div>';
      output += '</div>';
      return output;
    }

    function build_country(runner){
      // TAB CON CADA MAN!!
      view.build_single_overlay('colombia', runner);
      var output = '<div class="cand"><h1 class="title">' + runner + '</h1>';
      for(t in sites['colombia']['deptos']){
        var depto_name = sites['colombia']['deptos'][t];
        output+= build_depto(depto_name, runner);
      }
      output+="</div>";
      return output;
    }

    function show_results(name){
      $p = sites[name]['piedad'];
      $j = sites[name]['jojoy'];
      $r = sites[name]['reyes'];
      
      $piedad = "<p><strong>Piedad: </strong>" + $p + "</p>";
      $jojoy  = "<p><strong>Jojoy:  </strong>" + $j + "</p>";
      $reyes  = "<p><strong>Reyes:  </strong>" + $r + "</p>";
      var results = "";
      if($p >= $j && $p >= $r){
        if($j >= $r){
          results = $piedad + $jojoy + $reyes;
        }else{
          results = $piedad + $reyes  + $jojoy;
        }
      }else if($j >= $p && $j >= $r){
        if($p >= $r){
          results = $jojoy + $piedad + $reyes;
        }else{
          results = $jojoy + $reyes + $piedad;
        }
      }else{
        if($p >= $j){
          results = $reyes + $piedad + $jojoy;
        }else{
          results = $reyes + $jojoy + $piedad;
        }
      }
      return results;
    }

    function build_country_center(name){
      var output = '<div class="center">';
          output +=   '<h2>Resultados de '+ name +'</h2>';
          output +=   '<div class="results">';
          output +=     show_results(name);
          output +=   '</div>'; // Cierra results
          output +=   '<div class="tables">';
          for(i in sites[name]['tables']){
            var table_name = sites[name]['tables'][i];
            output += "<div class='table'>";
            output +=   '<h3>Resultados de la '+ table_name +'</h3>';
            output +=   show_results(table_name);
            output += "</div>";
          }
          output +=   '</div>'; //Cierra tables
          output += '</div>'; // Cierra center
      return output;
    }
    
    function build_country_city(name){
      var output = '<div class="city">';
          output +=   '<h2>Resultados de '+ name +'</h2>';
          output +=   '<div class="results">';
          output +=     show_results(name);
          output +=   '</div>'; // Cierra results
          output +=  '<div class="centers">';
          for(i in sites[name]['centers']){
            var center_name = sites[name]['centers'][i];
            output +=   build_country_center(center_name);
          }
          output +=  '</div>'; //Cierra centers
          output += '</div>'; // Cierra city
      return output;
    }
    
    function build_country_depto(name){
      view.build_national_overlay(name);
      var output = '<div class="depto">';
          output +=   '<h2>Resultados de '+ name +'</h2>';
          output +=   '<div class="results">';
          output +=     show_results(name);
          output +=   '</div>'; // Cierra results
          output +=  '<div class="cities">';
          for(i in sites[name]['cities']){
            var city_name = sites[name]['cities'][i];
            output +=   build_country_city(city_name);
          }
          output +=  '</div>'; //Cierra cities
          output += '</div>'; // Cierra depto
      return output;
    }
    
    function build_country_tab(name){
      view.add_tab("colombia");
      view.build_national_overlay("colombia");
      
      var output = '<div class = "national">';
      output +=      '<h1 class="title">Consolidado Nacional</h1>';
      output +=      '<div class="results">';
      output +=         '<h2>Resultados Nacionales</h2>';
      output +=         show_results(name);
      output +=      '</div>'; // Cierra results
      output +=      '<div class="deptos">';
      for(i in sites[name]['deptos']){
        var depto_name = sites[name]['deptos'][i];
        output +=   build_country_depto(depto_name);
      }
      output +=   '</div>'; // End deptos
      output += '</div>';
      view.display_national(output);
    }

    function build_candidates_tabs(){
      $p = sites['piedad'];
      $j = sites['jojoy'];
      $r = sites['reyes'];
      view.add_graph_separator("<div style='clear:both;'><h2>Piedad</h2></div>");
      $piedad = build_country('piedad');
      view.add_graph_separator("<div style='clear:both;'><h2>Reyes</h2></div>");
      $reyes =  build_country('reyes');
      view.add_graph_separator("<div style='clear:both;'><h2>Jojoy</h2></div>");
      $jojoy =  build_country('jojoy');

      // SORT THE DATA, WELCOME BRUTE...
      if($p >= $j && $p >= $r){
        if($j >= $r){
          view.add_tab('piedad');
          view.add_tab('jojoy');
          view.add_tab('reyes');
          view.display_data($piedad,$jojoy,$reyes);
        }else{
          view.add_tab('piedad');
          view.add_tab('reyes');
          view.add_tab('jojoy');
          view.display_data($piedad,$reyes,$jojoy);
        }
      }else if($j >= $p && $j >= $r){
        if($p >= $r){
          view.add_tab('jojoy');
          view.add_tab('piedad');
          view.add_tab('reyes');
          view.display_data($jojoy,$piedad,$reyes);
        }else{
          view.add_tab('jojoy');
          view.add_tab('reyes');
          view.add_tab('piedad');
          view.display_data($jojoy,$reyes,$piedad);
        }
      }else{
        if($p >= $j){
          view.add_tab('reyes');
          view.add_tab('piedad');
          view.add_tab('jojoy');
          view.display_data($reyes,$piedad,$jojoy);
        }else{
          view.add_tab('reyes');
          view.add_tab('jojoy');
          view.add_tab('piedad');
          view.display_data($reyes,$jojoy,$piedad);
        }
      }
    }

    view.add_listener(vlist);
    
    var mlist = $.ModelListener({
      // Model Listener
      data_loaded : function(){
        //view.data_loaded();
        
        // view.add_graph_separator("<div style='clear:both;'><h1>Resultados Totales a Nivel Nacional</h1></div>");
        //         data = new Array();
        // 
        //         var piedad = sites['piedad'];
        //         var reyes = sites['reyes'];
        //         var jojoy = sites['jojoy'];
        // 
        //         data.push( [ 'piedad (' + piedad + ')', piedad ] );
        //         data.push( [ 'reyes (' + reyes + ')', reyes ] );
        //         data.push( [ 'jojoy (' + jojoy + ')', jojoy ] );
        //         var g_label = "resultados-nacionales";
        //         var g_name = "Resultados a Nivel Nacional";
        //         view.build_pie(data, g_label, g_name);
        //         view.add_graph_separator("<div style='clear:both;'><h1>Resultados Detallados Nivel Nacional</h1></div>");
        //         build_country_tab('colombia');
        //         view.add_graph_separator("<div style='clear:both;'><h1>Gráficos de candidatos</h1></div>");
        //         build_candidates_tabs();
        //         $("#panes, #nav").show();
        //         $("#nav ul").tabs("#panes > div", {effect: 'fade', fadeOutSpeed: 400});
      },

      depto_loaded : function(depto){

      },

      city_loaded : function(){ },

      center_loaded : function(){ },

      table_loaded : function(){ },

      on_load_begin : function(){ }
    });
    model.add_listener(mlist);
  }

});
