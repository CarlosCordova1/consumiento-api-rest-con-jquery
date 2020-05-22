
/*
 * @package Carlos cordova	
 * @subpackage Carlos cordova
 * @since 1.0
 * @version 1.0
 * @ URL http://carloscordova.com
 */
 //let url='http://localhost/test1/developer/api-rest/?';
 let url='http://carloscordova.com/developer/api-rest/?';

$(document).ready(function(e) {
	getdata("all","GET","user");

 
$( "#content" ).on( "click", ".eliminar", function() {
 console.log( $( this ).data("id") );
 //$(this).parents("tr").hide("slow");
 deletedata("all","DELETE","user",$( this ).data("id"),$(this));
});

$( "#content" ).on( "dblclick", ".nombre,.apellido,.ciudad,.pais,.genero", function() {//editar
 console.log( $(this).parents("tr").data("id") );

 if ($(this).parents("td").find('.genero').is('.genero')) {
   $(this).parents("td").css("width","300px").find(".editado").html('<div class="input-group">'+
  '<select class="custom-select" >'+
    '<option value="0" selected>Choose...</option>'+
    '<option value="M">Mujer</option>'+
    '<option value="H">Hombre</option>'+
    
  '</select>'+
  '<div class="input-group-append">'+
  '<button class="btn btn-info updatesave" type="button" >Guardar</button>'+
  '</div></div>');

 }
  else
  {
 $(this).parents("td").css("width","300px").find(".editado").html('<div class="input-group">'+
  '<input type="text" value="'+$(this).text()+'" class="form-control" maxlength="10" size="10"'+
 ' aria-describedby="button-addon2">'+
  '<div class="input-group-append">'+
  '<button class="btn btn-info updatesave" type="button" >Guardar</button>'+
  '</div></div>');
 }
 //updatedata("all","POST","user",$( this ).data("id"),$(this));
});


$( "#content" ).on( "click", ".updatesave", function() { //actualizar
  console.log($(this));
 let id= $( this ).parents("tr").data("id") ;;
 //$(this).parents("tr").hide("slow");
 let nombre =($(this).parents("td").find('.nombre').is('.nombre'))? $(this).parents("td").find('input').val() : $(this).parents("tr").find('.nombre').text();
 //let apellido =$(this).parents("td").find('.apellido').text();
 let apellido =($(this).parents("td").find('.apellido').is('.apellido'))? $(this).parents("td").find('input').val() : $(this).parents("tr").find('.apellido').text();
 //let ciudad =$(this).parents("td").find('.ciudad').text();
 let ciudad =($(this).parents("td").find('.ciudad').is('.ciudad'))? $(this).parents("td").find('input').val() : $(this).parents("tr").find('.ciudad').text();
 //let pais =$(this).parents("td").find('.pais').text();
 let pais =($(this).parents("td").find('.pais').is('.pais'))? $(this).parents("td").find('input').val() : $(this).parents("tr").find('.pais').text();
 //let genero =$(this).parents("td").find('.genero').text();
 let genero =($(this).parents("td").find('.genero').is('.genero'))? $(this).parents("td").find('select').val() : $(this).parents("tr").find('.genero').text();


 //alert("nombre: "+nombre +" apellido: "+apellido + " ciudad: "+ciudad+ " pais: "+pais+ " genero: "+genero);
 let valor='{"id":"'+id+'","nombre":"'+nombre+'","apellido":"'+apellido+'","ciudad":"'+ciudad+'","pais":"'+pais+'","genero":"'+genero+'","action":"update"}';
 updatedata("POST","user",valor,$(this));
});

$( "#content" ).on( "click", ".nombre,.apellido,.ciudad,.pais,.genero", function() {
 console.log( $(this).parents("tr").data("id") );
 $(this).parents("td").css("width","0").find(".editado").html('');

});


$(".actualizar").click(function(event) {
	getdata("all","GET","user");
});
$(".agregar").click(function(event) {
      $("#exampleModal").find('input, select').val("");
            $(".msgnuevo").html('');
});
$(".nuevodato").click(function(event) {
  let nombre = $('.mnombre').val().trim();
   let apellido = $('.mapellido').val().trim();
 let pais = $('.mpais').val().trim();
  let ciudad = $('.mciudad').val().trim();
   let genero = $('.mgenero').val();
let valor='{"id":"1","nombre":"'+nombre+'","apellido":"'+apellido+'","ciudad":"'+ciudad+'","pais":"'+pais+'","genero":"'+genero+'","action":"insert"}';
 
 //console.log(valor);
if (nombre=="") {
  $('.mnombre').focus();
}
else if (apellido=="") {
  $('.mapellido').focus();
}
else if (pais=="") {
  $('.mpais').focus();
}
else if (ciudad=="") {
  $('.mciudad').focus();
}
else if (genero=="0") {
  $('.mgenero').focus();
}
else{
  nuevodata("POST","user",valor,$(this));
}

 
});

});



//http://localhost/test1/developer/api-rest/?user&unique=1

function getdata (all, type,  data){
 $.ajax({
 	      url : url+data,
    //data : {  conex : conex},
     type : type,
     dataType : 'JSON',
     beforeSend : function(xhr, status) {
      $("#content").html('buscando...');
       },
    success : function(json) {
    	if (json.conect) {
    		 $("#content").html('');
    		$.each( json.data, function( key, value ) {
  			console.log(  value );
  			 $("#content").append(
  			 	'<tr data-id="'+value.id+'">'+
      '<th scope="row">'+value.id+'</th>'+
      '<td><p class="nombre">'+value.nombre+'</p> <div class="editado"></div></td>'+
      '<td><p class="apellido">'+value.apellido+'</p> <div class="editado"></div></td>'+
      '<td><p class="pais">'+value.pais+'</p> <div class="editado"></div></td>'+
      '<td><p class="ciudad">'+value.ciudad+'</p> <div class="editado"></div></td>'+
      
      '<td><p class="genero">'+value.genero+'</p> <div class="editado"></div></td>'+
       '<td scope="col">'+value.useragente+'</td>'+
       '<td scope="col">'+value.remoteip+'</td>'+
       '<td scope="col">'+value.datein+'</td>'+
       '<td scope="col">'+value.dateupdate+'</td>'+
         '<td scope="col"><button type="button" class="btn btn-danger eliminar" data-id="'+value.id+'" >Eliminar</button></td>'+
       '</td>').show("slow");

			});
    	}
    
    
    // console.log(json);
    },
    error : function(xhr, status) {
      console.log(xhr);
       alert('Disculpe, existió un problema');
        $("#content").html('');
  
    },
     complete : function(xhr, status) {
        //alert('Petición realizada');
    }
});
}

function deletedata (all, type,  data,id, ev){
 $.ajax({
        url : url+data+"&unique="+id,
    //data : {  conex : conex},
     type : type,
     dataType : 'JSON',
     beforeSend : function(xhr, status) {
      ev.parents("tr").hide("slow");
       },
    success : function(json) {
      if (json.conect) {
        ev.parents("tr").hide("slow");
      }else{
         ev.parents("tr").show("slow");
      }
    
    },
    error : function(xhr, status) {
      console.log(xhr);
       alert('Disculpe, existió un problema al eliminar');
         ev.parents("tr").show("slow");
    },
     complete : function(xhr, status) {
        //alert('Petición realizada');
    }
});

}
function updatedata ( type,  data,vjson,ev){
console.log(vjson);
 $.ajax({
        url : url+data,
    data : {  "json" : vjson},
     type : type,
     dataType : 'JSON',
     beforeSend : function(xhr, status) {
      ev.parents("tr").hide("slow");
       },
    success : function(json) {
      console.log(json);
      if (json.conect) {
        ev.parents("tr").show("slow");
       
        ev.parents("td").find('p').html(ev.parents("td").find('input').val());
        ev.parents("td").find('p').html(ev.parents("td").find('select').val());
         ev.parents("td").find('div').html("");
      }else{
         ev.parents("tr").show("slow");
      }
    
    },
    error : function(xhr, status) {
      console.log(status);
       ev.parents("tr").show("slow");
       alert('Disculpe, existió un problema al actualizar');
        // ev.parents("tr").show("slow");
    },
     complete : function(xhr, status) {
        //alert('Petición realizada');
    }
});

}
function nuevodata ( type,  data,vjson,ev){
let d=JSON.parse(vjson);
 
 $.ajax({
        url : url+data,
    data : {  "json" : vjson},
     type : type,
     dataType : 'JSON',
     beforeSend : function(xhr, status) {
      $(".msgnuevo").html('<div class="alert alert-info" role="alert">...</div>');
       },
    success : function(json) {
      if (json.conect) {
 
            $("#exampleModal").find('input, select').val("");
            $(".msgnuevo").html('<div class="alert alert-success" role="alert">guardado correctamente </div>');
               $("#content").prepend(
          '<tr data-id="'+json.latest_id+'">'+
      '<th scope="row">'+json.latest_id+'</th>'+
      '<td><p class="nombre">'+d.nombre+'</p> <div class="editado"></div></td>'+
      '<td><p class="apellido">'+d.apellido+'</p> <div class="editado"></div></td>'+
      '<td><p class="pais">'+d.pais+'</p> <div class="editado"></div></td>'+
      '<td><p class="ciudad">'+d.ciudad+'</p> <div class="editado"></div></td>'+
      
      '<td><p class="genero">'+d.genero+'</p> <div class="editado"></div></td>'+
       '<td scope="col"> </td>'+
       '<td scope="col"> </td>'+
       '<td scope="col"> </td>'+
       '<td scope="col"> </td>'+
         '<td scope="col"><button type="button" class="btn btn-danger eliminar" data-id="'+json.latest_id+'" >Eliminar</button></td>'+
       '</td>').show("100");

         
      }else{
 
        $(".msgnuevo").html('<div class="alert alert-danger" role="alert">error</div>');
      }
    
    },
    error : function(xhr, status) {
      console.log(status);
     $(".msgnuevo").html('<div class="alert alert-warning" role="alert">Disculpe, existió un problema al insertar dato</div>');

    },
     complete : function(xhr, status) {
        //alert('Petición realizada');
    }
});

}
