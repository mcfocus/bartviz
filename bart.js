$(document).ready(function() {

  var my_departure = 'none', my_arrival = 'none';

  $('#departure_stn').change(function() {
    my_departure = $('select#departure_stn').val();
  });
  $('#arrival_stn').change(function() {
    my_arrival = $('select#arrival_stn').val();
  });


  $('#view_map').click(function() {
    get_trains(my_departure, my_arrival);
    //alert(my_departure);
  });



  function get_trains(departure, arrival) { 
    if (my_departure==='none' | my_arrival==='none') {
      alert('Please select both the departure and arrival stations and try again');
    };

    $.ajax({
        type:"GET",
        url:"http://api.bart.gov/api/etd.aspx?cmd=etd&orig="+departure+"&dest="+arrival+"&key=YGKV-YKH5-YN5Q-KWMU&dir=n",
        dataType:"xml",
        success: function(data){
          //here we got all the data
          //and visualize them

          $(data).find('etd').each(function() {
            var dest = $(this).find('destination').text();

            alert('You can take ' + dest + ' Train');
          });

        }
    }); 

  };





});

