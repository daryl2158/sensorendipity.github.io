function Plot_Its(db, STORE) 
{
   var d1 = [], d2 = [], s1 = [], s2 = [];

   var objectStore = db.transaction(STORE).objectStore(STORE); 

   var request = objectStore.openCursor();
   request.onsuccess = function() {

	//console.log("Plot_It: Working on ",STORE);
	var cursor = this.result;
	if(cursor) {
		//console.log("Plot_It: ",cursor.key, +cursor.value["angleLowerLimit"]);
		s1.push([cursor.key, 150]);
		d1.push([cursor.key, +cursor.value["angleLowerLimit"]]);
		d2.push([cursor.key, +cursor.value["angleUpperLimit"]]);
		s2.push([cursor.key, 180]);

		/*
		d1.push([1408569395643, 130]);
		d2.push([1408569395643, 150]);
		d1.push([1408569479922, 135]);
		d2.push([1408569479922, 175]);
		*/

		cursor.continue();
	}
/*
   	S1 = [[1408569395643, 150],[1408569479922, 150],[1410043968191, 150],[1410043986374, 150]];
   	S2 = [[1408569395643, 180],[1408569479922, 180],[1410043968191, 180],[1410043986374, 180]];
*/
	var d12 = [];
	d12 = {"SET LOW": s1, "Low_Angle": d1, "High_Angle": d2, "SET high": s2};

	/*d12 = {"D1":[[1408569395643, 130],[1408569479922, 135]],
		 "D2":[[1408569395643, 150],[1408569479922, 175]]
	};
	*/

	var data_series = [];
	$.each(d12, function (key, val) {
    		var data_val = {};
    		data_val.label = key;
    		data_val.data = val;
    		data_series.push(data_val);        
	}); 

	$.plot($("#placeholder"), data_series,
		{ series: {
			lines: { show: true },
			points: { show: true }
		}, 
		xaxis: { 
			mode: "time", timezone: "browser"
		}
	});
   }

}