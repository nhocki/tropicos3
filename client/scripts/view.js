var plot_data = new Array();
country = {};
national = {};
jQuery.extend({
  View: function(){
    var $$this = $(this);
    var $this = this;
    var listeners = new Array();
    var view = $this;
    
    
    var $graphs = $("#graphs");
    
    /* Function that adds a listener */
    this.add_listener = function(lis){
      listeners.push(lis);
    }
    
    this.data_loaded = function(){
      view.add_graph_separator("<div style='clear:both;'><h1>Resultados Totales a Nivel Nacional</h1></div>");
      data = new Array();
      
      var piedad = sites['piedad'];
      var reyes = sites['reyes'];
      var jojoy = sites['jojoy'];
      
      data.push( [ 'piedad (' + piedad + ')', piedad ] );
      data.push( [ 'reyes (' + reyes + ')', reyes ] );
      data.push( [ 'jojoy (' + jojoy + ')', jojoy ] );
      var g_label = "resultados-nacionales";
      var g_name = "Resultados a Nivel Nacional";
      view.build_pie(data, g_label, g_name);
      view.add_graph_separator("<div style='clear:both;'><h1>Resultados Detallados Nivel Nacional</h1></div>");
      build_country_tab('colombia');
      view.add_graph_separator("<div style='clear:both;'><h1>Gráficos de candidatos</h1></div>");
      build_candidates_tabs();
      $("#panes, #nav").show();
      $("#nav ul").tabs("#panes > div", {effect: 'fade', fadeOutSpeed: 400});
    }
    
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

    /* Function to notify all my listeners that the user is asking for the data */
    this.get_all_data_clicked = function(country_key){
      $(".loader").show();
      $("#nav ul").html("");
      var sites = {};
      for(i in listeners){
        listeners[i].view_get_all_data(country_key);
      }
    }
    
    this.add_tab = function(name){
      var li = $("<li class='"+name+"'>").html($("<img />").attr("src", "images/"+name+".jpg"));
      $("#nav ul").append(li);
    }
    
    this.add_graphs_as_tab = function(){
      $this.add_tab("Gráficas");
      $graphs.clone().appendTo("#panes").show();
    }
    
    /* Function that adds a department */    
    this.display_data = function(first, second, third){
      $panes = $("#panes");
      $panes.append(first).append(second).append(third);
    }
    
    this.display_national = function(data){
      $panes = $("#panes");
      $panes.append(data);
    }
    
    this.add_graph_separator = function(msj){
      if(msj == undefined) msj = "<hr>"
      $("html #graphs").append(msj);
    }
    
    this.build_pie = function(data, label, name){
      $("html #graphs").append('<div id="'+label+'" class="graph" style="height:400px; width: 300px;"> </div>');
      p1 = $.jqplot(label, [data], {
        title: name,
        seriesDefaults:{renderer:$.jqplot.PieRenderer},
        legend:{show:true}
      });
    }
    
    this.build_national_overlay = function(place){
      var type = sites[place]['type'];
      if(type == 'country'){
        // Get every depto and make its graph
        for(d in sites[place]['deptos']){
          plot_data = new Array();
          var dep_name = sites[place]['deptos'][d];
          var label = "national-"+dep_name;
          var g_name = "Resultado Nacional en " + dep_name;
          var piedad = sites[dep_name]['piedad'];
          var jojoy = sites[dep_name]['jojoy'];
          var reyes = sites[dep_name]['reyes'];
          plot_data.push( [ 'piedad (' + piedad + ')', piedad ] );
          plot_data.push( [ 'reyes (' + reyes + ')', reyes ] );
          plot_data.push( [ 'jojoy (' + jojoy + ')', jojoy ] );
          $this.build_pie(plot_data, label, g_name);
        }
      }  else // Create the national graphs for the cities in that depto
        if(type == 'depto'){
          for(c in sites[place]['cities']){
            plot_data = new Array();
            var city_name = sites[place]['cities'][c];
            var label = "national-"+city_name;
            var g_name = "Resultado Nacional en " + city_name;
            var piedad = sites[city_name]['piedad'];
            var jojoy = sites[city_name]['jojoy'];
            var reyes = sites[city_name]['reyes'];
            plot_data.push( [ 'piedad (' + piedad + ')', piedad ] );
            plot_data.push( [ 'reyes (' + reyes + ')', reyes ] );
            plot_data.push( [ 'jojoy (' + jojoy + ')', jojoy ] );
            $this.build_pie(plot_data, label, g_name);
          }
        }
    }
    
    this.build_single_overlay = function(place, runner){
      var label = "single-"+runner+"-"+place;
      var g_name = "Resultados de " + runner + " en " + place;
      log(g_name);
      log(label);
      $("html #graphs").append('<div id="'+label+'" class="graph" style="height:400px; width: 300px;"> </div>');
      var type = sites[place]['type'];
      log(type);
      plot_data = new Array();
      // Create the depto graph for runner
      if( type == 'country'){
        for(d in sites[place]['deptos']){
          var dp = sites[place]['deptos'][d];
          var votes = sites[dp][runner];
          var dep_name = sites[place]['deptos'][d] + " (" + votes + ")";
          plot_data.push( [ dep_name, votes ] );
        }
      }else // Create the graphs for all the cities inside place for runner
      if(type == 'depto'){
        for(c in sites[place]['cities']){
          var city_name = sites[place]['cities'][c];
          var votes = sites[city_name][runner];
          log("Pushing [" + city_name + " , " + votes + "]");
          plot_data.push( [ city_name, votes ] );
        }
      }
      p1 = $.jqplot(label, [plot_data], {
        title: g_name,
        seriesDefaults:{renderer:$.jqplot.PieRenderer},
        legend:{show:true}
      });
    }
    
  }, // End of view!
  
  
  
  
  
  ViewListener: function(listener){
    return $.extend(
      {
        view_get_all_data : function(){alert("Not implemented here!");}
      },
      listener
    )
  } // End of viewListener
});
