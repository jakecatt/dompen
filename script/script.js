$(document).ready(function(){
	//navbar and scrolling fixed position
	$(window).scroll(function(e) {
		var scroll = $(this).scrollTop();
		if (scroll > 322) {
			$('header').addClass('fixed');
		} else {
			$('header').removeClass('fixed');
		}
	});

	//slow scrolling to section when clicking on navbar link
	$('a').on('click', function(e){
		e.preventDefault();
		var target = findTarget($(this));
		console.log(target)
    $('html, body').stop().animate({
    	scrollTop: target.offset().top
    }, 800);
	})

	//display locations stored in the locations.js file
	showLocationsList();

	//MAPBOX setup
	L.mapbox.accessToken = 'pk.eyJ1IjoicGFtLSIsImEiOiJNT09NSzgwIn0.AWl1AY_kO1HMnFHwxb9mww';
	var map = L.mapbox.map('map', 'pam-.d97b92e0')
  var geocoder = L.mapbox.geocoder('mapbox.places')
	geocoder.query('Los Angeles, CA', showMap);

	//getting the locations from the locations.js file and rendering them
	showMarkers();

	function showMap(err, data) {
	  if (data.lbounds) {
	  	var coords = latLng(data.lbounds)	
      map.setView(coords, 12)
	  }
	}

	function showMarkers() {
		//when you will have multiple locations uncomment line 43 and delete line 44
		// for (var i = 0; i < locations.length; i++) {
		for (var i = 0; i < 1; i++) {
			var location = locations[i];
			geocoder.query(location.area, renderMarkers)
		}
	}

	function renderMarkers(err, data) {
		var myLayer = L.mapbox.featureLayer().addTo(map);
		var lat = latLng(data.lbounds)[0]
		var lng = latLng(data.lbounds)[1]
		var geoJson = [{
	    "type": "Feature",
	    "geometry": {
	      "type": "Point",
        "coordinates": [lng, lat]
	    },
	    "properties": {
        "title": "DomPen",
        "icon": {
          "iconUrl": "images/logo.png", //INSERT PATH TO LOGO HERE
          "iconSize": [50, 50], // size of the icon
          "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
          // "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
          "className": "dot"
        }
    	}
		}]
		myLayer.on('layeradd', function(e) {
			var marker = e.layer,
    	feature = marker.feature;
			marker.setIcon(L.icon(feature.properties.icon));
		});

		// Add features to the map.
		myLayer.setGeoJSON(geoJson);		
	}
	//carousel for FAQ section
	$('.next p').on('click', function(){
		showNext();
	})
	$('.prev p').on('click', function(){
		showPrev();
	})	
})

var current_index = current_index || 0;
function offsetImages(container, idx) {
	var numImages = $('.faq .panel').length / 2;
  var numberOfFullPanes = Math.round(numImages / 3);
  var numberOfPartialPanes = (numImages % 3 > 0) ? 1 : 0;
  var totalPanes = numberOfFullPanes + numberOfPartialPanes;
  var boxWidth = $('.faq .panel').width();
  var paneWidth = container.width();
  var percentage;
  var offset;
  if (idx + 1 > totalPanes){ idx = 0; }
  if (idx < 0 ){ idx = totalPanes -1;}

  if (idx + 1 > numberOfFullPanes) {
    offset = (numberOfFullPanes * paneWidth - (boxWidth * (2.2 - numberOfPartialPanes)));
  } else {
    offset = idx * paneWidth;
  }
  $('.row').css("left", "-" + offset + "px");
  current_index = idx
}

function showPrev() {
	var prevIdx = current_index - 1;
	offsetImages($('.faq'), prevIdx);
}

function showNext() {
	var nextIdx = current_index + 1;
	offsetImages($('.faq'), nextIdx);
}
function latLng(data) {
	var lat = (data._southWest.lat + data._northEast.lat)/2;
  var lng = (data._southWest.lng + data._northEast.lng)/2;
  return [lat, lng];
}


function showLocationsList() {
	for (var i = 0; i < locations.length; i++) {
		var location = locations[i];
		var area = location.area;
		console.log(area, $('.' + area));
		$('.' + area).append(displayLocation(location.name, location.streetAddress, location.city, location.state, location.zip));
	};
}

function displayLocation(name, street, city, state, zip) {
	return '<div class="location"><h4>' 
					+ name + '</h4><p><span class="street">'
					+ street + '<span>'
					+ city + ', ' 
					+ state + ' ' + zip +
					'</p>'
}

function findTarget(element) {
	var name = element.attr('href').replace(/#/, '');
	return $('a[name="' + name + '"]')
}