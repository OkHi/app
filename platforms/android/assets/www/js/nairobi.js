var Nairobi = function () {


    return {
        //main function to initiate the module
        init: function () {
        	var gmapUrl;
            var gmapLink;
            var lat,lng;
            var mLat = localStorage.getItem("lat");
        	var mLng = localStorage.getItem("lng");
        	
            var onSuccess = function(position) {
            	lat = position.coords.latitude;
            	lng = position.coords.longitude;
            	var accuracy = Math.ceil(position.coords.accuracy * 100)/100;
            	gmapLink = '<a href="geo:'+lat+','+lng+'">View Maps</a>'; /* <img style="height:30px;width:30px;" alt="Open Map" src="img/map.jpeg" /> */
                data = (
                	  position.coords.latitude + ', ' + position.coords.longitude + 
                	  '<br> Accuracy of: '+ accuracy + 'm <br>'+
                      'GoogleMapsUrl: '+ gmapLink 
                );
                $("#geoData").html(data);
            };

            // onError Callback receives a PositionError object
            function onError(error) {
                alert(
                    'code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n'
                    );
            }

            //Set geo options
            var options = { maximumAge: 3000, timeout: 60000, enableHighAccuracy: true };
        	
            //Start watching gps sats
        	watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

            if(isNaN(mLat)==false && isNaN(mLng)==false && mLat!==null && mLng!==null) {
        		//Have valid geo location saved
        		$('#myGeoData').html(mLat+','+mLng);
        		$('#description').val(localStorage.getItem('description'));
        		gmapUrl = 'http://maps.google.com/maps?q='+mLat+','+mLng;
        	}else{
        	//just watch gps
        		gmapUrl = 'http://maps.google.com/maps?q='+lat+','+lng;
        	}
         	// share
            function share(subject,text) {
             var share = cordova.require("cordova/plugin/share");
             share.show({subject: subject, text: text},
              function() {
               //console.log("PhoneGap Plugin: Share: callback success");
              },
              function() {
               console.log("PhoneGap Plugin: Share: callback error");
              }
             );
            }

            //save on localstorage
         	function saveLoc(lat,lng,description){
         		localStorage["lat"] = lat;
         		localStorage["lng"] = lng;
         		localStorage["description"] = description;
         		$('#myGeoData').html(lat+','+lng);
        		$('#description').val(description)
        		//update gmap url
        		gmapUrl = 'http://maps.google.com/maps?q='+lat+','+lng;
         		alert('Saved');
         	}
             
            // event Listeners
            
            $('#share').click(function(event) {
            	share("Find me with OkHi", "Map: "+gmapUrl+"\n Directions: "+$('#description').val()+".");
			});

            $('#save').click(function(event) {
            	saveLoc(lat,lng,$('#description').val());
			});
            
        }

    };

}();