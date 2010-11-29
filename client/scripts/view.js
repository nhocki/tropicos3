var plot_data = new Array();
jQuery.extend({
  View: function(){
    var $$this = $(this);
    var $this = this;
    var listeners = new Array();
    
    var $graphs = $("#graphs");
    
    /* Function that adds a listener */
    this.add_listener = function(lis){
      listeners.push(lis);
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
