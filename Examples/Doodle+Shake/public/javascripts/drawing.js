		socket.on('sendtodraw',function(data){
			console.log("PHONE SENSOR");
			console.log("send to draw "+data);
		});
	


			//to get all the client x,y coordinate and prints it

			socket.on('sendxytoall',function(data){
				console.log(data);
			});

  			



