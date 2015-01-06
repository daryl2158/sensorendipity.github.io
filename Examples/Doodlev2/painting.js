var DATA_POINT_NUMBER = 20;
var UPDATE_INTERVAL = 100;
var DATA_URL = "";

var dataType = "";

var graphs = [];
var sensorList = document.getElementById("data_type");
//

var results = [0,0,0];

var keys = {};
var data = {};
var availableSensors = [];

var canvas;
var ctx;
var rawData;
var sensororientation;
var sensoracc;
var proximitysensor;
var color;
var obj2 = {};
var xpos2={}; 
var ypos2={};



var WIDTH = 800;
var HEIGHT = 580; //400
var fcolor;
var flag;

var mul = 3;



var up_down = "";
var left_right = "";
var magx = 0;
var magy = 0;
 
var middle = 75; //compass 75
var n = 10;
var xv=0, yv=0;

//-----Initialize-----//
function connect()
{
    // Connect to server.
    xpos2[obj2] = 400;
	ypos2[obj2] = 275;
    setIP();

    // Try to get the initial data of the server. If the IP is incorrect, this gives a pop-up.
    try
    {
        var sensorJSON = JSON.parse(httpGet(DATA_URL)).sensors;
    } catch(e)
    {
        alert("Invalid IP address");
    }

    // If the connection succeeded, disable the connect button.
    if(sensorJSON != null){
      //  document.getElementById("button_connect").disabled = true;

        // Get the dropdown list to be filled.
        var dropdownList = document.getElementById("data_type");

    // Start plotting.
    setInterval(plot, UPDATE_INTERVAL);
   	
    }
}

function colortake()
{
	color = document.getElementById("favcolor").value;
	//console.log("new color picked"+color);
}

// Get the IP value from the textbox.
function setIP()
{
   // DATA_URL = document.getElementById("input_ip_address").value;
   DATA_URL = prompt("Enter your phone's IP \n eg. http://192.168.2.136:8765","http://10.52.68.136:8765");

}

// Get the string from the IP address.
function httpGet(theUrl)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function plot() {
    rawData = JSON.parse(httpGet(DATA_URL));
    
    for(var m=0;m<rawData.sensors.length; m++)
		{
		 	if (rawData.sensors[m].type == "orientation")
		 	{
		  		sensor = rawData.sensors[m].values;
		  		//console.log(sensor)
		  	}

		  	if (rawData.sensors[m].type == "linear_acceleration")
		 	{
		  		sensoracc = rawData.sensors[m].values;
		  		//console.log(sensoracc)
		  	}
		  	if (rawData.sensors[m].type == "proximity")
		 	{
		  		proximitysensor = rawData.sensors[m].values;
				//console.log(proximitysensor);
		  	}

		}

		obj2={sensorvalue:sensor,linear:sensoracc,proximity:proximitysensor};
	//	console.log(obj2);

			var sensor0 = obj2.sensorvalue[0];
			var sensor1 = obj2.sensorvalue[1];

			var sensor1norm = (sensor1/90);
			var dy = sensor1norm*mul;
			ypos2[obj2]+=dy;

			if (ypos2[obj2]>HEIGHT) 
					{
						ypos2[obj2]=HEIGHT;
					
					}
			if (ypos2[obj2]<0) 
					{
						ypos2[obj2]=0;
					
					}


			var dx = normaliserawvalue(sensor0);
			xpos2[obj2]+=dx;
	//		console.log("VALUE of DX"+dx);
			//console.log("color"+color);

			if (xpos2[obj2]<0) 
					{
						xpos2[obj2]=0;
									
					}
			if (xpos2[obj2]>WIDTH) 
			{
				xpos2[obj2]=WIDTH;
				
			}

			var user_id = obj2;

			var mag = Math.sqrt(dx*dx + dy*dy);

		for(var i in xpos2){ 
//      		console.log(xpos2[i]); 
      		xv=xpos2[i]
      	}

      	for(var j in ypos2){ 
   //   		console.log(ypos2[i]); 
      		yv=ypos2[i]
      	}

		canvas = document.getElementById("canvas");
		obj2 = canvas.getContext('2d');
		obj2.shadowBlur=20;
		obj2.beginPath();
      	obj2.arc(xv, yv, 5, 0, 2 * Math.PI, false);
  //    	console.log("Values")
    //  	console.log(xpos2);
      	obj2.fillStyle = color;
      	obj2.fill();
      	obj2.lineWidth=10;	
      	obj2.strokeStyle = color;
      	obj2.closePath();
      	obj2.stroke();
}
function normaliserawvalue(rawSensorValue)
{
	var norm180 = normalisex(rawSensorValue);
	//console.log("norm180 "+norm180);
	return MapLinear(norm180, -180, 180, -n, n);
}
function MapLinear(x, a1, a2, b1, b2)
{
	return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
}

function in_between ( val, low, high) 
{
	return (val > low && val < high);
}

function normalisex(i)
{
//for(var i = 0; i <= 360; i++)
//{
	var x = i-middle;
	if(x > 180)
	x = (x-360)%180;
	if(x <= -180)
	x = (x+360)%180;
	//console.log(x);
	return x;
//}
}





