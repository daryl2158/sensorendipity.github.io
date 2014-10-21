var x;
var socket=io.connect();	
var rgb = [];
var url = [];
function emitxy(event)
{
   	var data;
   	var val;
	//var url = ["http://192.168.2.71:8765","http://192.168.3.16:8765"];
			
	function getRandomColor() {
		for(var i = 0; i < 3; i++)
		    rgb.push(Math.floor(Math.random() * 255));
	   	}

   	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    rgb.push(color);
	}

	//create an httpGet request
	httpGet = function(theUrl,thergb,callback) 
	{ //	console.log(rgb[i])
		var xhr = new XMLHttpRequest();
		function onready() {
	        if (xhr.readyState == 4) 
	        {
	        //    console.log("ready state = 4");
	           	callback(xhr.responseText,theUrl,thergb);

	        } else {
	        	console.log("woopee teong is cool" + xhr.readyState)
	        }		
	    };					

	    xhr.onreadystatechange = onready;


		xhr.open("GET", theUrl, true);
		//xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhr.timeout = 2000; //2000
		
		function timey () 
		{ 
			console.error("The request for " + theUrl + " timed out.");
			//url.pop();				    	
		}
		xhr.ontimeout = timey;
		xhr.send(null);
	}

	function mycallback(responseText,url2,rgb2) {
	  	
	  	sensordata = JSON.parse(responseText);
	  	var sensor={};
       	for(var m=0;m<sensordata.sensors.length; m++)
		{
		 	if (sensordata.sensors[m].type == "orientation")
		 	{
		  		sensor = sensordata.sensors[m].values;
		  	}

		  	if (sensordata.sensors[m].type == "linear_acceleration")
		 	{
		  		var sensoracc = sensordata.sensors[m].values;
		  	}
		  	if (sensordata.sensors[m].type == "proximity")
		 	{
		  		var proximitysensor = sensordata.sensors[m].values;
		  	}

		}
		/*for(var n=0;n<sensordata.sensors.length; n++)
		{
		 	if (sensordata.sensors[n].type == "linear_acceleration")
		 	{
		  		var sensoracc = sensordata.sensors[n].values;
		  	}
		}*/

			data={ip:url2,sensorvalue:sensor,linear:sensoracc,proximity:proximitysensor,color:rgb2};
		//console.log(data);
		socket.emit('sendxy',data);

	}
		   	for (var i = 0; i < url.length; i++) 
		   	{
		   		
		   		if (url.indexOf(url[i])!=rgb.indexOf(rgb[i])) 
		   		{
		   			getRandomColor();
		   		};
				httpGet(url[i],rgb[i],mycallback);
		   	};
 		setInterval('emitxy();', 2500); //1500   
		}		
