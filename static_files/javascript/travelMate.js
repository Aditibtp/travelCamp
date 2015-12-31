  var places = [];
  $(document).ready(function(){
  });
  function getCities(){
    $( "#travelPlace" ).keydown (function() {
      var typedText = $("#travelPlace").val();
      if(typedText.length >= 1)
      {
         $.post('/getCities', { sentText: typedText}).then(function(data) {
           console.log(data);
           var data = JSON.parse(data);
          for(var i=0; i<data.length; i++){
            console.log(data[i].city);
            places[i] = {
              "value" : data[i].city
            };
          }
          console.log(places);
           //console.log(cityNames);
           //console.log(places);
          $("#travelPlace").autocomplete({
            minLength: 1,
            lookup: places,
              onSelect: function (event, ui) {
              alert("hello");
          }
         });
        })
      }
    });
  }
