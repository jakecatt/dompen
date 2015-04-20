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
    }, 1000);
  })

  //display locations stored in the locations.js file
  showLocationsList();

  //MAPBOX setup
  L.mapbox.accessToken = 'pk.eyJ1IjoicGFtLSIsImEiOiJNT09NSzgwIn0.AWl1AY_kO1HMnFHwxb9mww';
  var map = L.mapbox.map('map', 'pam-.d97b92e0', {})



  map.scrollWheelZoom.disable();

  // Disable tap handler, if present.
  if (map.tap) map.tap.disable();

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
    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var address = location.streetAddress.replace(/ /g, '+');
      if (address.length > 1) { 
        var geocodeUrl = 'http://api.tiles.mapbox.com/v4/geocode/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicGFtLSIsImEiOiJNT09NSzgwIn0.AWl1AY_kO1HMnFHwxb9mww'
        $.ajax({
          type: "GET",
          url: geocodeUrl,
          success: function(result) {
            for (var i = 0; i < result.features.length; i++) {
              var coords = result.features[i]
              renderMarkers(coords)
            };
          }
        })
      }
    }
  }


  function renderMarkers(data) {
    var myLayer = L.mapbox.featureLayer().addTo(map);
    var lat = data.center[1]
    var lng = data.center[0]
    var geoJson = [{
      "type": "Feature",
      "geometry": {
	"type": "Point",

        "coordinates": [lng, lat]
      },
      "properties": {
        "title": "DomPen",
        "icon": {
          "iconUrl": "images/DomPen_Icons/DomPenLogo_forMap.png", //INSERT PATH TO LOGO HERE
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

  // Setting the number of slides shown in the carousel depending on screen size 
  // setting various heights and widths depending on screen size
  $('.panel').css({
    'height': $('.faq').height()/2 + "px"
  })

  if ($(document).width() > 1400) {
    $('li.left-header').css({
      "margin-left": "3em"
    })
  }

  if ($(document).width() < 1000) {
    //show to slides in carousel when screen is smaller
    slidesToShow = 2;
    $('.answer').addClass('show');
    $('video').hide();
    $('.home').addClass('small');
    $('.home, .product, .find-us, .faq, .contact, .more-info .faq .column').css({
      height: $(window).height() + "px"
    })
    $('.faq .column .panel').css({
      height: $(window).height() / 2 + "px"
    })
  } else if ($(document).width() > 1000 && $(document).width() < 1200) {
    //show to slides in carousel when screen is medium
    slidesToShow = 2;
    $('video').hide();
    $('.home').addClass('small');    
    $('.home, .product, .find-us, .faq, .contact, .more-info .faq .column').css({
      height: $(window).height() + "px"
    })
    $('.faq .column .panel').css({
      height: $(window).height() / 2 + "px"
    })    
  } else{
    // activate parallx when screen is reg sized or large
    $('.parallax').addClass('active');
    $('.product.parallax-layer, .faq.parallax-layer, .faq.parallax-layer .column, .find-us.parallax-layer, .contact.parallax-layer, .more-info, .faq .location-container').css({
      height: $(window).height() + "px"
    })
    $('.faq.parallax-layer .column .panel').css({
      height: $(window).height() / 2 + "px"
    })
    slidesToShow = 4;
  };

$('.responsive').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1040,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

});


function latLng(data) {
  var lat = (data._southWest.lat + data._northEast.lat)/2;
  var lng = (data._southWest.lng + data._northEast.lng)/2;
  return [lat, lng];
}


function showLocationsList() {
  for (var i = 0; i < locations.length; i++) {
    var location = locations[i];
    var area = location.area;
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
