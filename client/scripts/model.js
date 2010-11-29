var results = {deptos: {} };
var types = {};
var sites = {};
var empty = {"jojoy": 0, "piedad": 0, "reyes": 0}

jQuery.extend({
  Model: function(){
    
    $console = $("#console");
    function log(msj){
      //$console.append("<br />----------------- <br />");
      //$console.append(msj);
    }
    
    var $this = this;
    var $$this = $(this);
    
    $$this.ajaxStop(function(){
      sites['colombia']['type']='country'; $this.data_loaded();
    });
    
    var listeners = new Array();
    this.add_listener = function(listener){
      listeners.push(listener);
    }

    /*
	*	Function that will be called from the controller
	*/
    this.get_country = function(key){
      fetch_country(key);
    }

    this.country_loaded = function(){ }

    this.data_loaded = function(){
      for(l in listeners){
        listeners[l].data_loaded();
      }
    }

    this.city_loaded = function(){ }

    this.center_loaded = function(){ }

    this.table_loaded = function(){ }

    this.on_load_begin = function(){ }

    $.Model.process_country = function(root){
      var rows = root.table.rows;
      var $country = rows[0].c[1].v.toLowerCase();
      rows.reverse();
      if(sites[$country] == undefined) sites[$country] = empty;
      sites[$country]['type'] = 'country';
      var first_blank = 0;
      sites[$country]['deptos'] = new Array();
      $.each(rows, function(index, value){
        if(value.c[0].v == ""){return false;}
        var dpto = value.c[0].v.toLowerCase();
        log("DEPTO => " + dpto);
        sites[$country]['deptos'].push(dpto);
        sites[ dpto ] = {};
        sites[ dpto ]['country'] = $country;
        fetch_depto(value.c[1].v);
      });
      
      $.Model.process_depto = function(root){
        var rows = root.table.rows;
        var real_data = 0;
        var $depto_name = rows[0].c[1].v.toLowerCase();
        if(sites[$depto_name] == undefined) sites[$depto_name] = empty;
        sites[$depto_name]['type'] = 'depto';
        sites[$depto_name]['cities'] = new Array();
        rows.reverse();
        $.each(rows, function(index, value){
          if(value.c[0].v == ""){return false;}
          var city = value.c[0].v.toLowerCase();
          sites[$depto_name]['cities'].push(city);
          sites[ city ] = {};
          sites[city]['depto'] = $depto_name;
          sites[city]['country'] = sites[$depto_name]['country'];
          fetch_city(value.c[1].v);
        });
        
        $.Model.process_city = function(root){
          var rows = root.table.rows;
          var $city_name = rows[0].c[1].v.toLowerCase();
          if(sites[$city_name] == undefined) sites[$city_name] = empty;
          sites[$city_name]['type'] = 'city';
          sites[$city_name]['centers'] = new Array();
          rows.reverse();
          $.each(rows, function(index, value){
            if(value.c[0].v == ""){return false;}
            var ctr = value.c[0].v.toLowerCase();
            sites[$city_name]['centers'].push(ctr);
            sites[ ctr ] = {};
            sites[ctr]['country'] = sites[$city_name]['country'];
            sites[ctr]['depto'] = sites[$city_name]['depto'];
            sites[ctr]['city'] = $city_name;
            fetch_center(value.c[1].v);
          });
          
          $.Model.process_center = function(root){
            var rows = root.table.rows;
            $center_name = rows[0].c[1].v.toLowerCase();
            if(sites[$center_name] == undefined) sites[$center_name] = empty;
            rows.reverse();
            sites[$center_name]['type'] = 'center';
            sites[$center_name]['tables'] = new Array();
            $.each(rows, function(index, value){
              if(value.c[0].v == ""){return false;}
              var msa = value.c[0].v.toLowerCase();
              sites[$center_name]['tables'].push(msa);
              sites[ msa ] = {};
              sites[msa]['country'] = sites[$center_name]['country'];
              sites[msa]['depto'] = sites[$center_name]['depto'];
              sites[msa]['city'] = sites[$center_name]['city'];
              sites[msa]['center'] = $center_name;
              fetch_table(value.c[1].v);
            });
            
            $.Model.process_table = function(root){
              var rows = root.table.rows;
              var cc = rows;
              $table_name = rows[0].c[0].v.toLowerCase() + " " + rows[0].c[1].v;
              if(sites[$table_name] == undefined) sites[$table_name] = empty;
              sites[$table_name]['type'] = 'table';
              rows.reverse();
              $.each(rows, function(index, value){
                if(value.c[0].v == ""){return false;}
                
                $runner = value.c[0].v.toLowerCase();
                $votes  = value.c[1].v;
                
                $pais = sites[$table_name]['country'];
                $depto = sites[$table_name]['depto'];
                $ciudad = sites[$table_name]['city'];
                $centro = sites[$table_name]['center'];
                
                if(sites[$pais]==undefined) sites[$pais] = {};
                if(sites[$depto]==undefined) sites[$depto] = {};
                if(sites[$ciudad]==undefined) sites[$ciudad] = {};
                if(sites[$centro]==undefined) sites[$centro] = {};
                
                if(sites[$runner] == undefined){
                  sites[$runner] = $votes;
                }else{
                  sites[$runner] += $votes;
                }
                
                if(sites[$pais][$runner] == undefined){
                  sites[$pais][$runner] = $votes;
                }else{
                  sites[$pais][$runner] += $votes;
                }
                
                if(sites[$depto][$runner] == undefined){
                  sites[$depto][$runner] = $votes;
                }else{
                  sites[$depto][$runner] += $votes;
                }
                
                if(sites[$ciudad][$runner] == undefined){
                  sites[$ciudad][$runner] = $votes;
                }else{
                  sites[$ciudad][$runner] += $votes;
                }
                
                if(sites[$centro][$runner] == undefined){
                  sites[$centro][$runner] = $votes;
                }else{
                  sites[$centro][$runner] += $votes;
                }
                
                if(sites[$table_name][$runner] == undefined){
                  sites[$table_name][$runner] = $votes;
                }else{
                  sites[$table_name][$runner] += $votes;
                }
              });
            } // End of process_table
            
          } // End of process_center
          
        } // End of process_city
        
      } // End pf process_depto
      
    } // End of process_depto


/*
*	Functions used to load information from
*	Google Spreadsheets.
*/
    function fetch_country(key){
      var url = "http://spreadsheets.google.com/tq?tqx=responseHandler:$.Model.process_country&tq=select%20A,B&key=" + key + "&pub=1";
      $.getScript(url);
    }

    function fetch_depto(key){
      var url = "http://spreadsheets.google.com/tq?tqx=responseHandler:$.Model.process_depto&tq=select%20A,B&key="+ key +"&pub=1";
      $.getScript(url);
    }

    function fetch_city(key){
      var url = "http://spreadsheets.google.com/tq?tqx=responseHandler:$.Model.process_city&tq=select%20A,B&key=" + key + "&pub=1";
      $.getScript(url);
    }

    function fetch_center(key){
      var url = "http://spreadsheets.google.com/tq?tqx=responseHandler:$.Model.process_center&tq=select%20A,B&key=" + key + "&pub=1";
      $.getScript(url);
    }

    function fetch_table(key){
      var url = "http://spreadsheets.google.com/tq?tqx=responseHandler:$.Model.process_table&key=" + key + "&pub=1";
      $.getScript(url);
    }
  }
});

jQuery.extend({
  ModelListener: function(listener) {
    if(!listener) listener = {};
    return $.extend(
      {
        data_loaded  : function() {}
      },
      listener);
    } // end of function
});