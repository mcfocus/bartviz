$(document).ready(function(){

  my_departure = 'none';
  etd_num = 0;
  estimate_num = 0;

  map = new L.Map('map');
  var layer = new L.TileLayer('http://mt1.google.com/vt/lyrs=m@121,transit|vm:1&hl=en&opts=r&x={x}&y={y}&z={z}', {
    attribution: 'Map data &copy;2013 Google',
    maxZoom: 14
  });
  var sf = new L.LatLng(37.779224, -122.313831);
  map.setView(sf, 10).addLayer(layer);

  // var map = L.map('map').setView([37.803664, -122.271604], 10);
  // L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {attribution: false}).addTo(map);


  var stations = 
    [
      {
        name: "12th St. Oakland City Center",
        code: "12TH",
        latlng: [37.803664, -122.271604]
      },
      {
        name: "16th St. Mission",
        code: "16TH",
        latlng: [37.765062, -122.419694]
      },
      {
        name: "19th St. Oakland",
        code: "19TH",
        latlng: [37.80787,-122.269029]
      },
      {
        name: "24th St. Mission",
        code: "24TH",
        latlng: [37.752254, -122.418466]
      },
      {
        name: "Ashby",
        code: "ASHB",
        latlng : [37.853024, -122.26978]
      },
      {
        name: "Balboa Park",
        code: "BALB",
        latlng: [37.72198087, -122.4474142]
      },
      {
        name: "Bay Fair",
        code: "BAYF",
        latlng: [37.697185,-122.126871]
      },
      {
        name: "Castro Valley",
        code: "CAST",
        latlng: [37.690754,-122.075567]
      },
      {
        name: "Civic Center/UN Plaza",
        code: "CIVC",
        latlng: [37.779528,-122.413756]
      },
      {
        name: "Coliseum/Oakland Airport",
        code: "COLS",
        latlng: [37.754006, -122.197273]
      },
      {
        name: "Colma",
        code: "COLM",
        latlng: [37.684638, -122.466233]
      },
      {
        name: "Concord",
        code: "CONC",
        latlng: [37.973737, -122.029095]
      },
      {
        name: "Daly City",
        code: "DALY",
        latlng: [37.70612055, -122.4690807]
      },
      {
        name: "Downtown Berkeley",
        code: "DBRK",
        latlng: [37.869867, -122.268045]
      },
      {
        name: "Dublin/Pleasanton",
        code: "DUBL",
        latlng: [37.701695, -121.900367]
      },
      {
        name: "El Cerrito del Norte",
        code: "DELN",
        latlng: [37.925655, -122.317269]
      },
      {
        name: "El Cerrito Plaza",
        code: "PLZA",
        latlng: [37.9030588, -122.2992715]
      },
      {
        name: "Embarcadero",
        code: "EMBR",
        latlng: [37.792976, -122.396742]
      },
      {
        name: "Fremont",
        code: "FRMT",
        latlng: [37.557355, -121.9764]
      },
      {
        name: "Fruitvale",
        code: "FTVL",
        latlng: [37.774963, -122.224274]
      },
      {
        name: "Glen Park",
        code: "GLEN",
        latlng: [37.732921, -122.434092]
      },
      {
        name: "Hayward",
        code: "HAYW",
        latlng: [37.670399, -122.087967]
      },
      {
        name: "Lafayette",
        code: "LAFY",
        latlng: [37.893394, -122.123801]
      },
      {
        name: "Lake Merritt",
        code: "LAKE",
        latlng: [37.797484, -122.265609]
      },
      {
        name: "MacArthur",
        code: "MCAR",
        latlng: [37.828415, -122.267227]
      },
      {
        name: "Millbrae",
        code: "MLBR",
        latlng: [37.599787, -122.38666]
      },
      {
        name: "Montgomery St.",
        code: "MONT",
        latlng: [37.789256, -122.401407]
      },
      {
        name: "North Berkeley",
        code: "NBRK",
        latlng: [37.87404, -122.283451]
      },
      {
        name: "North Concord/Martinez",
        code: "NCON",
        latlng: [38.003275, -122.024597]
      },
      {
        name: "Orinda",
        code: "ORIN",
        latlng: [37.87836087, -122.1837911]
      },
      {
        name: "Pittsburg/Bay Point",
        code: "PITT",
        latlng: [38.018914, -121.945154]
      },
      {
        name: "Pleasant Hill/Contra Costa Centre",
        code: "PHIL",
        latlng: [37.928403, -122.056013]
      },
      {
        name: "Powell St.",
        code: "POWL",
        latlng: [37.784991, -122.406857]
      },
      {
        name: "Richmond",
        code: "RICH",
        latlng: [37.936887, -122.353165]
      },
      {
        name: "Rockridge",
        code: "ROCK",
        latlng: [37.844601, -122.251793]
      },
      {
        name: "San Bruno",
        code: "SBRN",
        latlng: [37.637753, -122.416038]
      },
      {
        name: "San Francisco Int'l Airport",
        code: "SFIA",
        latlng: [37.616035, -122.392612]
      },
      {
        name: "San Leandro",
        code: "SANL",
        latlng: [37.72261921, -122.1613112]
      },
      {
        name: "South Hayward",
        code: "SHAY",
        latlng: [37.63479954, -122.0575506]
      },
      {
        name: "South San Francisco",
        code: "SSAN",
        latlng: [37.664174, -122.444116]
      },
      {
        name: "Union City",
        code: "UCTY",
        latlng: [37.591208, -122.017867]
      },
      {
        name: "Walnut Creek",
        code: "WCRK",
        latlng: [37.905628, -122.067423]
      },
      {
        name: "West Dublin/Pleasanton",
        code: "WDUB",
        latlng: [37.699759, -121.928099]
      },
      {
        name: "West Oakland",
        code: "WOAK",
        latlng: [37.80467476, -122.2945822]
      },
    ];



  stations.forEach(function (station) {

    var circMarker = L.circle((station.latlng), 300, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.8
    }).addTo(map);

    circMarker.code = station.code;

    circMarker.on('click', function(e) {

      my_departure = $(this)[0].code;
      get_trains(my_departure);

    });
  })



  $('.departure_stn').change(function() {

    my_departure = $('.departure_stn').val();
    get_trains(my_departure);

  });
});



function get_trains(departure) {
  $('.train_map').html('');
  $('.train_map').html('<div class="myStation"><p>Currently at ' + my_departure + '</p></div>');  

  if (my_departure!=='none') {

    $.ajax({
      type:"GET",
      url:"http://api.bart.gov/api/etd.aspx?cmd=etd&orig="+departure+"&key=YGKV-YKH5-YN5Q-KWMU",
      dataType:"xml",
      success: function(data){

        var all_trains = [];

        $(data).find('etd').each(function() {

          all_trains[etd_num] = {};
          all_trains[etd_num].dest = $(this).find('destination').text();
          all_trains[etd_num].trains = [];

          estimate_num=0;

          $(this).find('estimate').each(function() {

            all_trains[etd_num].trains[estimate_num] = {};

            all_trains[etd_num].trains[estimate_num].color = $(this).find('hexcolor').text();
            all_trains[etd_num].trains[estimate_num].waiting = $(this).find('minutes').text();

            estimate_num+=1;

          });

          estimate_num=0;
          etd_num+=1;

        });

        //console.log(all_trains);
        etd_num=0;
        set_trains(all_trains);

      }
    });
  };
};



//done: beautify the map with platform
//done: beautify the train
//done: beautify the lanes. Combine all trains into same lanes
function set_trains (myTrains) {

  for (var i = myTrains.length - 1; i >= 0; i--) {

    thisDestHTML = '<div class="each_dest"> <div class="dest_name">' + myTrains[i].dest + '</div><div class="dest_lane"><div class="dest_upcoming" id="dest' + i + '"></div></div></div>';
    $('.train_map').append(thisDestHTML);
    
    for (var j = myTrains[i].trains.length - 1; j >= 0; j--) {

      //var thisTrainDest = myTrains[i].dest;
      var thisTrainID = 'train' + i + j;
      var thisTrainColor = myTrains[i].trains[j].color;
      var thisTrainTime = Number(myTrains[i].trains[j].waiting);
      var thisTrainHTML = '<div class="each_train" id=' + thisTrainID + "></div>";

      $('#dest' + i).append(thisTrainHTML);
      $('#'+thisTrainID).css({

        'background-color': thisTrainColor,
        'left': thisTrainTime*20
      });
      
      animate_train(thisTrainID,thisTrainTime);
      
    };
  };  

  $('.axis_map').css('height', $('.train_map').height());
  $('.axis_map').show();
};



function animate_train(trainID,waiting) {

  var animateLength = waiting*20;
  var animateTime = waiting*2500;//should be *60000
  //console.log(animateLength);

  $('#' + trainID).animate({

    left: "-=" + animateLength

  },animateTime, function() {
    
    $(this).addClass('boarding_train');
    $(this).html('<p>Boarding</p>');
    $(this).blink({delay:600}).delay(15000).fadeOut(500); 

  });

}




