$(document).ready(function(){

  // FANCYBOX TEST
  $('.fancybox-media').on("click", function(e){
    console.log("FOOBAR")
  })


  //NAVBAR TO FIXED
  $(window).scroll(function(e) {
    var scroll = $(this).scrollTop();
    if (scroll > 322) {
      $('header').addClass('fixed');
    } else {
      $('header').removeClass('fixed');
    }
  });


  function findTarget(element) {
    var name = element.attr('href').replace(/#/, '');
    return $('a[name="' + name + '"]')
  }

  //SCROLL TO SECTION
  $('a').on('click', function(e){
    e.preventDefault();
    var target = findTarget($(this));
    console.log(target)
    $('html, body').stop().animate({
      scrollTop: target.offset().top - 60
    }, 1000);
  })



  // PANEL HEIGHT
  $('.panel').css({
    'height': $('.faq').height()/2 + "px"
  })

  // ?
  if ($(document).width() > 514) {
    $('li.left-header').css({
      "margin-left": "3em"
    })
  }

  
  if ($(document).width() > 1400) {
    $('li.left-header').css({
      "margin-left": "3em"
    })
  }

  // BREAK 1000
  if ($(document).width() < 1000) {

    // CAROUSEL NUMBER/HEIGHTS/WIDTHS RESPONSIVE
    slidesToShow = 2;
    $('.answer').addClass('show');
    $('.home').addClass('small');

    // HOME HEIGHT
    $('.home').css({
      height: $(window).height() + "px"
    })

    // SUBTRACT NAV HEIGHT
    $('.product, .info, .faq, .contact, .more-info .faq .column').css({
      height: $(window).height() - 60 + "px"
    })

    // SPLIT SCREEN IN TWO ON FAQ
    $('.faq .column .panel').css({
      height: $(window).height() / 2 - 60 + "px"
    })

    // BREAK 1000-1200
  } else if ($(document).width() > 1000 && $(document).width() < 1200) {

    // CAROUSEL NUMBER OF SLIDES
    slidesToShow = 2; 

    // HOME HEIGHT
    $('.home').css({
      height: $(window).height() + "px"
    })

    // SUBTRACT NAV HEIGHT
    $('.product, .info, .faq, .contact, .more-info .faq .column').css({
      height: $(window).height() - 60 + "px"
    })

    // SPLIT SCREEN IN TWO ON FAQ
    $('.faq .column .panel').css({
      height: $(window).height() / 2 - 60 + "px"
    }) 

    // BREAK 1200<
  } else{
    // CAROUSEL NUMBER OF SLIDES
    slidesToShow = 4;
  };


  // CAROUSEL RESPONSIVE
  $('.responsive').slick({
    dots: true,
    infinite: false,
    speed: 300,
    // BREAK 1150+
    slidesToShow: 4,
    slidesToScroll: 4,
    // BREAK POINTS
    responsive: [
      {
        breakpoint: 1150,
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
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });






  //FORM SUBMITION
  $(".signup").on("submit", function(e){
    e.preventDefault()

    //EMAIL VALIDATION
    if (  $('.email').val() !== "" ){

      //EMAIL MATCH VALIDATION
      if ($('.email').val() === $(".confirm-email").val() ){
        
        $.ajax({ 
          url: '/signup',
          type: 'POST',
          data:{"email": $('.email').val(),
                "first_name":  $('.first-name').val(),
                "company":  $('.company').val(),
                "city":  $('.city').val(),
                "phone":  $('.phone').val(),
                "confirm_email":  $('.confirm-email').val(),
                "last_name":  $('.last-name').val(),
                "address":  $('.address').val(),
                "state":  $('.state').val(),
                "zip":  $('.zip').val(),
                "comment":  $('.comment').val(),
               },

          error: function(jqXHR, textStatus, err){
            console.log("FAILURE.")
          }
        })
        
        // ?
          .done( function(data){
            
          })

        // SAY THANKS!
        $('.s-submit').attr("class", "green-submit").val("Thanks!")

        //CLEAR FIELDS AFTER SUBMIT
        $('.email').val("")
        $('.first-name').val("")
        $('.last-name').val("")
        $('.company').val("")
        $('.city').val("")
        $('.phone').val("")
        $('.confirm-email').val("")
        $('.address').val("")
        $('.state').val("")
        $('.zip').val("")
        $('.comment').val("")    

      } else {
        // IF EMAILS DON'T MATCH
        console.log("emails don't match")
      }
    }

  });
});

// START MAPBOX ======================================

//display locations stored in the locations.js file
// showLocationsList();

// //MAPBOX setup
// L.mapbox.accessToken = 'pk.eyJ1IjoicGFtLSIsImEiOiJNT09NSzgwIn0.AWl1AY_kO1HMnFHwxb9mww';
// var map = L.mapbox.map('map', 'pam-.d97b92e0', {})


// // if you're on mobile, make it so that you can't drag the map
// if ($(document).width() < 600) {
//   map.dragging.disable();
// }

// //disables scrolling as zoom on the map so that when you are scrolling
// //down the page you don't zoom in on the map
// map.scrollWheelZoom.disable();


// if (map.tap) {
//   map.tap.disable();
// }

// // location where the map renders
// var geocoder = L.mapbox.geocoder('mapbox.places')
// geocoder.query('Los Angeles, CA', showMap);

// //getting the locations from the locations.js file and rendering them
// showMarkers();


// function showMap(err, data) {
//   if (data.lbounds) {
//     var coords = latLng(data.lbounds)  
//     // the second argument of setView is how far the map is zoomed in
//     map.setView(coords, 10)

//   }
// }

// //loops through all of the locations in locations.js and shows the markers for each one
// function showMarkers() {
//   for (var i = 0; i < locations.length; i++) {
//     var location = locations[i];
//     var name = location.name;
//     var address = location.streetAddress.replace(/ /g, '+');
//     var area = location.zip;
//     var phone = location.phone;
//     if (address.length > 1) { 
//       var validAddress = address;
//     } else { 
//       validAddress = area 
//     }
//     var geocodeUrl = 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places/'+ validAddress +'.json?access_token=pk.eyJ1IjoicGFtLSIsImEiOiJNT09NSzgwIn0.AWl1AY_kO1HMnFHwxb9mww'
//     $.ajax({
//       type: "GET",
//       url: geocodeUrl,
//       "name": name,
//       "phone": phone,
//       success: function(result) {
//         var coords = result.features[0]
//         renderMarkers(coords, this.name, this.phone)
//       }
//     })
//   }
// }


// function renderMarkers(data, collectiveName, phoneNumber) {
//   var myLayer = L.mapbox.featureLayer().addTo(map);
//   var lat = data.center[1]
//   var lng = data.center[0]

//   var geoJson = [{
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",

//       "coordinates": [lng, lat]
//     },
//     "properties": {
//       "title": collectiveName +  " <br> " + data.place_name + "<br>" + phoneNumber,
//       "icon": {
//         "iconUrl": "images/DomPen_Icons/DomPenLogo_forMap.png", //INSERT PATH TO LOGO HERE
//         "iconSize": [50, 50], // size of the icon
//         "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
//         // "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
//         "className": "dot"
//       }
//     }
//   }]
//   myLayer.on('layeradd', function(e) {
//     var marker = e.layer,
//      feature = marker.feature;
//     marker.setIcon(L.icon(feature.properties.icon));
//   });

//   // Add features to the map.
//   myLayer.setGeoJSON(geoJson);   
// }

// ----------- END MAPBOX ------------------

// BEGIN MORE MAPBOX
// function latLng(data) {
//   var lat = (data._southWest.lat + data._northEast.lat)/2;
//   var lng = (data._southWest.lng + data._northEast.lng)/2;
//   return [lat, lng];
// }

// //shows a list of the locations on the sidebar
// function showLocationsList() {
//   for (var i = 0; i < locations.length; i++) {
//     var location = locations[i];
//     var area = location.area;
//     $('.' + area).append(displayLocation(location.name, location.streetAddress, location.city, location.state, location.zip, location.phone));
//   };
// }

// function displayLocation(name, street, city, state, zip, phone) {
//   return '<div class="location"><h4>' 
//     + name + '</h4><p><span class="street">'
//     + street + '<span>'
//     + city + ', ' 
//     + state + ' ' + zip +
//     ' ' + '<br>' + phone
//   '</p>'
// }



// END MORE MAPBOX


