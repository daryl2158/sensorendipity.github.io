var socket=io.connect();

var values = [];
var total=0;
var counter = 0 ;
	socket.on('sendxytoall',function(data){

	values.push(data.data.linear[1]); //pushing values to array
	//console.log(values);
	});

	function gettotal()
	{
		for(var i = 0; i < values.length; i++)
	    {
	        var absvalue = Math.abs(values[i]);
	        total = total +  parseFloat(absvalue);
			showimage(total);
	    }
	    
	    
    }	
    var count=setInterval(function () {gettotal()}, 2000);

    function showimage(totalvalue) 
    {
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
		console.log(counter);

	if (counter<10)
 
    { 
    	document.getElementById("myImg").src = "/javascripts/COKE1.gif";
    	document.getElementById("myImg1").src = "/javascripts/EN1.gif";
    }
    

     if (counter>10 && counter<50)
 
    { 
    	document.getElementById("myImg").src = "/javascripts/COKE2.gif";
    	document.getElementById("myImg1").src = "/javascripts/EN2.gif";
    }


    if (counter>50 && counter<100)
 
    { 
    	document.getElementById("myImg").src = "/javascripts/COKE3.gif";
    	document.getElementById("myImg1").src = "/javascripts/EN3.gif";
    }



     if (counter>100)
     { 
     document.getElementById("myImg").src = "/javascripts/COKE4.gif";
     document.getElementById("myImg1").src = "/javascripts/EN4.gif"; 
     document.getElementById('restart').style.visibility = 'visible';
     document.getElementById("c_number").innerHTML = "score 100";
    /* setTimeout(function(){
     counter = 100 ;
	     if (counter>100) {
	     document.getElementById("myImg").src = "/javascripts/COKE5.png";
	     };
	 },100000);*/
     }

}

	function restart()
	{
		//repeat = setInterval(showimage, 200);
		showimage();
		counter = 0 ;
	 	document.getElementById("c_number").innerHTML = 0;
	    document.getElementById('c_number').style.visibility = '';
	}	
