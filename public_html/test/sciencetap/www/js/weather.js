// JavaScript Document


// return info depending of the latitude and longiud

//http://api.wunderground.com/api/7486209354842c67/geolookup/q/39.9204611,-75.1738745.json
var longitude;
var latitude;
var type;
var country;
var state;
var city
var elevation;
var station_id;
var observation_time;
var weatherType;
var temp_f;
var temp_c;
var relative_humidity;
var wind_string;
var wind_dir;
var wind_degrees;
var pressure_mb;
var pressure_in;
var precip_1hr_metric;
var sunrise_hour;
var	sunrise_minute;
var	sunset_hour;
var	sunset_minute;




function geoloc(success, fail){
	
    var is_echo = false;
	
	
	
    if(navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          if (is_echo){ return; }
          is_echo = true;
		  latitude = pos.coords.latitude;
		  longitude = pos.coords.longitude;
		  
		  
		  window.localStorage.setItem('lat',latitude);
		  window.localStorage.setItem('lon',longitude);
	
			// $("#latitude").html(latitude);
			// $("#longitude").html(longitude);
			//alert(latitude);
			//alert(longitude);
          getInfoLocation(latitude,longitude);
        }, 
        function() {
          if (is_echo){ return; }
          is_echo = true;
          fail();
         }
       );
    } else {
      fail();
    }
  } // End geoloc function


  function fail(){
    alert("Fail to get the latituded and longitude");
  }

  
function getInfoLocation(latitude,longitude){
	
       $.ajax({
				  url : "http://api.wunderground.com/api/7486209354842c67/geolookup/q/"+latitude+","+longitude+".json",
				  dataType : "jsonp",
				  success : function(parsed_json) {
				  type = parsed_json['location']['type'];
				  country = parsed_json['location']['country'];
				  state = parsed_json['location']['state'];
				  city = parsed_json['location']['city'];
				
				document.getElementById("cityState").innerHTML = city + ", " + state ;
				
				//alert(state + " ," +city);
				getCityInfo(state, city);
			 	sunSet(state, city);
				  }
			
			});
			
    }





function getCityInfo(state, city){
  $.ajax({
	  
  url : "http://api.wunderground.com/api/7486209354842c67/geolookup/conditions/q/"+state+"/"+city+".json",
  dataType : "jsonp",
  success : function(parsed_json) {
	  
	
	  	elevation = parsed_json['current_observation']['elevation'];
	    station_id = parsed_json['current_observation']['station_id'];
	    observation_time = parsed_json['current_observation']['observation_time'];
	  
	    weatherType = parsed_json['current_observation']['weather'];
	    temp_f = parsed_json['current_observation']['temp_f'];
	    temp_c = parsed_json['current_observation']['temp_c'];
	    relative_humidity = parsed_json['current_observation']['relative_humidity'];
	    wind_string = parsed_json['current_observation']['wind_string'];
	  
	    wind_dir = parsed_json['current_observation']['wind_dir'];
	    wind_degrees = parsed_json['current_observation']['wind_degrees'];
	    pressure_mb = parsed_json['current_observation']['pressure_mb'];
	    pressure_in = parsed_json['current_observation']['pressure_in'];
	    precip_1hr_metric = parsed_json['current_observation']['precip_1hr_metric'];
	    precip_1hr_metric = parsed_json['current_observation']['precip_1hr_metric'];
		
		
	  /*
	  alert(" Weather Type:"+weatherType +" \n" 
	      + " temp_f:"+ temp_f   + " \n" 
		  + " temp_c:"+  temp_c   + "\n " 
		  + " relative_humidity:"+ relative_humidity  + "\n " 
		  + " wind_string:" +  wind_string  + "\n " 
		  + " weatherType:" +   weatherType);
		   */
		   
		 $("#weather").html(temp_f + "&deg;");
		 $("#weatherType").html(weatherType);
		 // $("#relative_humidity").html(relative_humidity);
		
	
		if(weatherType == "Chance of Flurries"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Chance of Rain"){
			document.getElementById('body').style.backgroundImage ="Images/Clouds/NoCloud.png";
		}else if(weatherType == "Chance Rain"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Chance of Freezing Rain"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Chance of Sleet"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Chance of Snow"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Chance of Thunderstorms"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Chance of a Thunderstorm"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Clear"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Cloudy"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Flurries"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Fog"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Haze"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Mostly Cloudy"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Mostly Sunny"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Partly Cloudy"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Partly Sunny"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Freezing Rain"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Rain"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Sleet"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Snow"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Sunny"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Thunderstorms"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Thunderstorm"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else if(weatherType == "Overcast"){
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}else{ // this is last one Scattered Clouds
			document.getElementById('body').style.backgroundImage = "Images/Clouds/NoCloud.png";
		}
		
		
  }
  });
};




function sunSet(state, city){
		
	 $.ajax({
	  
  url : "http://api.wunderground.com/api/7486209354842c67/astronomy/q/"+state+"/"+city+".json",
  dataType : "jsonp",
  success : function(parsed_json) {
	  
	
	  	sunrise_hour = parsed_json['moon_phase']['sunrise']['hour'];
	    sunrise_minute = parsed_json['moon_phase']['sunrise']['minute'];
	    sunset_hour = parsed_json['moon_phase']['sunset']['hour'];
		sunset_minute = parsed_json['moon_phase']['sunset']['minute'];
		
		
		
		

		var actualDate = new Date();
		var tActualDate = actualDate.getTime();
		
		var str1 = sunrise_hour+":"+sunrise_minute;
        var	str2 = sunset_hour+":"+sunset_minute;
		
	
		
		var sunRise = new Date (new Date().toDateString() + ' ' + sunrise_hour+':'+sunrise_minute );
		var t1=sunRise.getTime();
		
		var sunSet = new Date (new Date().toDateString() + ' ' + sunset_hour+':'+sunset_minute );
		var t2=sunSet.getTime();
		
	
		if( (tActualDate - t1) < (tActualDate - t2)){
		
			if ((tActualDate - t1) < 0 ){
				
				$('header').removeClass('sky-gradient-16');
				$('header').addClass('sky-gradient-16');
			
			}else {
				$('header').removeClass('sky-gradient-16');
				$('header').addClass('sky-gradient-03');
			}
		} // end if condition tActualDate
		else{
			
		    if ((tActualDate - t2) > 0 ){
				$('header').removeClass('sky-gradient-16');
				$('header').addClass('sky-gradient-03');
			}else{
				
				$('header').removeClass('sky-gradient-16');
				$('header').addClass('sky-gradient-16');
				}
			  
		} // End else of the if condition tActualDAte
		
	}


	 });
}