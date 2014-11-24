function ShowAll(db, STORE) 
{
 var objectStore = db.transaction(STORE).objectStore(STORE); 
 var request = objectStore.openCursor();
      var result = document.getElementById("table_head");
      result.innerHTML = "";
      var s = Array(5).join("&nbsp;") + "date/Time" + Array(10).join("&nbsp;") + "Exercise name" + Array(5).join("&nbsp;") + "Time of hold" + Array(3).join("&nbsp;") + "Angle (lower limit)" + Array(3).join("&nbsp;") + "Angle (upper limit)" + Array(3).join("&nbsp;") + "Quantity (lower limit)" + Array(3).join("&nbsp;") + "Quantity (upper limit)<br/>";
      s+= Array(146).join("=") + "<br/>";
      var objectStore = db.transaction(STORE).objectStore(STORE); 
      var request = objectStore.openCursor();
      request.onsuccess = function() {
      //console.log("ShowALL: Working on ",STORE);
      var cursor = this.result;
      //var c=0;
      if(cursor) {
      for(var field in cursor.value) {  
   //console.log("Key", cursor.key, "S/E:", cursor.value["DataType"], JSON.stringify(cursor.value));
  //console.log(c,field);
  //c+=1;
               var d = new Date(cursor.key);
               var hr = ("0" + d.getHours()).slice(-2); // Leading "0" 8 -> 08
               var min = ("0" + d.getMinutes()).slice(-2);
               var sec = ("0" + d.getSeconds()).slice(-2);
              var yr = d.getFullYear();
              var mth = ("0" + (d.getMonth()+1)).slice(-2);
             var day = ("0" + d.getDate()).slice(-2);    
     }  
     s+= day + '/' + mth + '/' + yr+" "+hr + ":" + min + ":" + sec + Array(4).join("&nbsp;"); 
     // trailing space;  &nbsp; -> space; Array(4).join("&nbsp;") -> 3 spaces
     s+= cursor.value["exercisename"] + Array(23-cursor.value["exercisename"].length).join("&nbsp;") + Array(3-cursor.value["timeOfHold"].length).join("&nbsp;");
     s+= cursor.value["timeOfHold"] + Array(14).join("&nbsp;");
     s+= cursor.value["angleLowerLimit"] + Array(19).join("&nbsp;");
     s+= cursor.value["angleUpperLimit"] + Array(22).join("&nbsp;");
     s+= cursor.value["quantityLowerLimit"] + Array(24).join("&nbsp;");
     s+= cursor.value["quantityUpperLimit"] + Array(14).join("&nbsp;");
     if (cursor.value["DataType"] == "E") { 
  s+= cursor.value["DataType"] + " - Ex Data..." + "<br/>";
     } else if (cursor.value["DataType"] == "S") { 
  s+= cursor.value["DataType"] + " - Target!" + "<br/>";
     } else {
      s+= "...<br/>";
     }
     //console.log("ShowALL: ",cursor.key,cursor.value["angleLowerLimit"]);
            cursor.continue();
         }
        document.querySelector("#table_head").innerHTML = s;
      }             
}