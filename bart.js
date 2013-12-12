$(document).ready(function(){

  my_departure = 'none';

  etd_num = 0;
  estimate_num = 0;


//work: auto detect nearest station = my current location
//work: choose from map
  $('#departure_stn').change(function() {
    my_departure = $('select#departure_stn').val();
    $('.train_map').html('');
    get_trains(my_departure);
  });
});


function get_trains(departure) { 
  if (my_departure!=='none') {

    $.ajax({
      type:"GET",
      url:"http://api.bart.gov/api/etd.aspx?cmd=etd&orig="+departure+"&key=YGKV-YKH5-YN5Q-KWMU",
      dataType:"xml",
      success: function(data){
        console.log(data);
        var all_trains = [];

        $(data).find('etd').each(function() {
          all_trains[etd_num] = {};

          all_trains[etd_num].dest = $(this).find('destination').text();
          all_trains[etd_num].trains = [];

          estimate_num=0;

          $(this).find('estimate').each(function () {
            console.log(estimate_num);
            all_trains[etd_num].trains[estimate_num] = {};

            all_trains[etd_num].trains[estimate_num].color = $(this).find('hexcolor').text();
            all_trains[etd_num].trains[estimate_num].waiting = $(this).find('minutes').text();

            estimate_num+=1;
            console.log(estimate_num);

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

//work: beautify the map with platform
//work: beautify the train
//work: beautify the lanes. Combine all trains into same lanes
function set_trains (myTrains) {
  for (var i = myTrains.length - 1; i >= 0; i--) {
    
    for (var j = myTrains[i].trains.length - 1; j >= 0; j--) {
      var thisTrainDest = myTrains[i].dest;
      var thisTrainID = 'train' + i + j;
      var thisTrainColor = myTrains[i].trains[j].color;
      var thisTrainTime = Number(myTrains[i].trains[j].waiting);
      var thisTrain = '<div class="each_train" id=' + thisTrainID + ">" + thisTrainDest +" Train</div>";
      $('.train_map').append(thisTrain);
      
      $('#'+thisTrainID).css('background-color', thisTrainColor);
      $('#'+thisTrainID).css('left', thisTrainTime*20);
      
      animate_train(thisTrainID,thisTrainTime);
      
    };
  };  
};

function animate_train(trainID,waiting) {
  var animateLength = waiting*20;
  var animateTime = waiting*1000;//should be *60
  //console.log(animateLength);

  $('#' + trainID).animate({
    left: "-=" + animateLength
  },animateTime);
}




