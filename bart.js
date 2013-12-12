$(document).ready(function() {

  my_departure = 'none';

  etd_num = 0;
  estimate_num = 0;

  $('#departure_stn').change(function() {
    my_departure = $('select#departure_stn').val();
  });

  $('#view_map').click(function() {
    get_trains(my_departure);
    //alert(my_departure);
  });
});


function get_trains(departure) { 
  if (my_departure==='none') {
    alert('Please select a station');
  };

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
        $(this).find('estimate').each(function () {
          all_trains[etd_num].trains[estimate_num] = {};
          all_trains[etd_num].trains[estimate_num].color = $(this).find('color').text();
          all_trains[etd_num].trains[estimate_num].waiting = $(this).find('minutes').text();

          estimate_num=+1;
        });
        estimate_num=0;
        etd_num=+1;
      });
      console.log(all_trains);
    }
}); 

};
