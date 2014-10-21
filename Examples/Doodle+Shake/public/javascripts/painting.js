var canvas;
var ctx;

var dx1 = 1;
var dy1 = 1;
var dx2 = 2;
var dy2 = 2;
var dx3 = 3;
var dy3 = 3;
var dx4 = 4;
var dy4 = 4;
var dx5 = 5;
var dy5 = 5;

var WIDTH = 800;
var HEIGHT = 580; //400
var fcolor;
var flag;
var a;
var obj = {};
var xpos = {};
var ypos = {};
var mul = 3;

function in_between ( val, low, high) {
	return (val > low && val < high);
}
var up_down = "";
var left_right = "";
var magx = 0;
var magy = 0;
 
var middle = 75; //compass 75
var n = 10;

function normalisex(i)
{
//for(var i = 0; i <= 360; i++)
//{
	var x = i-middle;
	if(x > 180)
	x = (x-360)%180;
	if(x <= -180)
	x = (x+360)%180;
	console.log(x);
	return x;
//}
}


function normaliserawvalue(rawSensorValue)
{
	//console.log("raw "+rawSensorValue);
	var norm180 = normalisex(rawSensorValue);
	console.log("norm180 "+norm180);
	return MapLinear(norm180, -180, 180, -n, n);
}

function MapLinear(x, a1, a2, b1, b2)
{
	return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
}

socket.on('sendxytoall',function(data) {
				
	var sensor0 = data.data.sensorvalue[0];
	var sensor1 = data.data.sensorvalue[1];


	//console.log("updown " + sensor1);
	//console.log("LR " + sensor0);

	var sensor1norm = (sensor1/90);
	var dy = sensor1norm*mul;
	ypos[data.data.color]+=dy;

	if (ypos[data.data.color]>HEIGHT) 
			{
				ypos[data.data.color]=HEIGHT;
			
			}
	if (ypos[data.data.color]<0) 
			{
				ypos[data.data.color]=0;
			
			}


	var dx = normaliserawvalue(sensor0); //mobile
	xpos[data.data.color]+=dx;
	console.log("VALUE of DX"+dx);

	//right
	/*if(sensor0<165 && sensor0>middle)
	{
			var sensor0norm = (sensor0/90);
			dx = sensor0norm*mul;
			xpos[data.data.color]+=dx;
			
	}*/
	//left

	/*else if (sensor0>345 && sensor0<360)
	{
			var sensor0norm = ((sensor0-360)/15);
			dx = sensor0norm*(mul*(15/90));
			xpos[data.data.color]+=dx;
			
	} else if (sensor0>0 && sensor0<middle) {
		var sensor0norm = sensor0 - middle;
			dx = sensor0norm*(mul*(75/90));
			xpos[data.data.color]+=dx;

	}*/


	if (xpos[data.data.color]<0) 
			{
				xpos[data.data.color]=0;
			
			}
	if (xpos[data.data.color]>WIDTH) 
	{
		xpos[data.data.color]=WIDTH;
	
	}


	//console.log("dir " + up_down + left_right + magx);

	var user_id = data.data.color;

	var mag = Math.sqrt(dx*dx + dy*dy);



	if(obj[data.data.color])
	{	
		//console.log("OLD");
		console.log(data.data.proximity[0]);
		obj[data.data.color].beginPath();
		obj[data.data.color].arc(xpos[data.data.color], ypos[data.data.color], 5, 0, 2 * Math.PI, false);
		obj[data.data.color].shadowBlur = 20;
      	obj[data.data.color].fill();
		obj[data.data.color].lineWidth=mag;	
		if (data.data.proximity[0]<2) {
			obj[data.data.color].strokeStyle = "white";
			obj[data.data.color].shadowColor = "white";
		}
		else{
			obj[data.data.color].strokeStyle = data.data.color;
			obj[data.data.color].shadowColor = data.data.color;
		}
      	
      	obj[data.data.color].stroke();
		obj[data.data.color].globalAlpha = 1;
		obj[data.data.color].closePath();
		console.log(obj[data.data.color]);

	}
	else
	{
		xpos[data.data.color] = 400;
		ypos[data.data.color] = 275;//200
		
		//console.log("NEW");
		a = data.data.color;
		console.log(a);
		canvas = document.getElementById("canvas");
		obj[data.data.color] = canvas.getContext('2d');
		obj[data.data.color].beginPath();
      	obj[data.data.color].arc(xpos[data.data.color], ypos[data.data.color], 5, 0, 2 * Math.PI, false);
      	obj[data.data.color].shadowBlur=20;
      	obj[data.data.color].fillStyle = data.data.color;
      	obj[data.data.color].fill();
      	obj[data.data.color].lineWidth=mag;	

      	obj[data.data.color].strokeStyle = data.data.color;
      	obj[data.data.color].closePath();
      	obj[data.data.color].stroke();
	}
					
					
					

});



											
