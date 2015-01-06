var DATA_POINT_NUMBER = 20;
var UPDATE_INTERVAL = 100;
var DATA_URL = "";

var dataType = "";

var graphs = [];
var sensorList = document.getElementById("data_type");

var values = [];
var total=0;
var counter = 0 ;



//-----Initialize-----//
function connect()
{
    // Connect to server.
   
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
		 	/*if (rawData.sensors[m].type == "orientation")
		 	{
		  		sensor = rawData.sensors[m].values;
		  		//console.log(sensor)
		  	}*/

		  	if (rawData.sensors[m].type == "linear_acceleration")
		 	{
		  		sensoracc = rawData.sensors[m].values[0];
		  		//console.log(sensoracc)
		  		values.push(sensoracc);
		  	//	console.log(values)
		  	}
		  	/*if (rawData.sensors[m].type == "proximity")
		 	{
		  		proximitysensor = rawData.sensors[m].values;
				console.log(proximitysensor);
		  	}*/
		  	

		}


}

	var count=setInterval(function () {gettotal()}, 2000);

	function gettotal()
	{
		for(var i = 0; i < values.length; i++)
	    {
	        var absvalue = Math.abs(values[i]);
	        total = total +  parseFloat(absvalue);
			showimage(total);
	    }
	    
    }	

   function showimage(totalvalue) 
    {
    	console.log(counter);
		if (totalvalue<6) {
			counter += 0; 
		  	document.getElementById("c_number").innerHTML = "score "+counter;
		};

		if (totalvalue>6 && totalvalue<12) {
			counter += 1;
		  document.getElementById("c_number").innerHTML = "score "+counter;
		};

		if (totalvalue>12 && totalvalue<18) {
			counter += 2;
		  document.getElementById("c_number").innerHTML = "score "+counter;
		};

		if (totalvalue>18 && totalvalue<50) {
			counter += 3;
		  document.getElementById("c_number").innerHTML = "score "+counter;
		};



		var reset=setInterval(function () 
		{
			while(values.length){
	    	values.pop();
	    	total=0;
		}}, 1000);
//		console.log(counter);

	if (counter<10)
 
    { 
    	document.getElementById("myImg").src = "COKE1.gif";
    	document.getElementById("myImg1").src = "EN1.gif";
    }
    

     if (counter>10 && counter<50)
 
    { 
    	document.getElementById("myImg").src = "COKE2.gif";
    	document.getElementById("myImg1").src = "EN2.gif";
    }


    if (counter>50 && counter<100)
 
    { 
    	document.getElementById("myImg").src = "COKE3.gif";
    	document.getElementById("myImg1").src = "EN3.gif";
    }



     if (counter>100)
     { 
     document.getElementById("myImg").src = "COKE4.gif";
     document.getElementById("myImg1").src = "EN4.gif"; 
     document.getElementById("c_number").innerHTML = "score 100";
    /* setTimeout(function(){
     counter = 100 ;
	     if (counter>100) {
	     document.getElementById("myImg").src = "/javascripts/COKE5.png";
	     };
	 },100000);*/
     }

}
