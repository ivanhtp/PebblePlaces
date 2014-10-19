/**
 * Pebble Places
 * v0.0.1
 * Developed by Ivan Henrique Tavares Pauletti
 * ivanpauletti@gmail.com.br | @ivanhtp
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');


// Main menu
var main = new UI.Menu({
    sections: [{
      items: [{
        title: 'Restaurants',
        icon: 'images/restaurant.png',
        subtitle: 'Find nearby restaurants.'
      }, {
        title: 'Movies',
        icon: 'images/cinema.png',
        subtitle: 'Search for cinemas.'
      },{
        title: 'Shoppings',
        icon: 'images/shopping.png',
        subtitle: 'Shopping centers.'
      },{
        title: 'Hotels',
        icon: 'images/hotel.png',
        subtitle: 'Places to rest.'
      }]
    }]
  });

main.show();

// Listing Places of type...
main.on('select', function(e) {
    var loading = new UI.Window();
    var textfield = new UI.Text({
      position: new Vector2(0, 50),
      size: new Vector2(144, 30),
      font: 'gothic-24-bold',
      text: 'Searching...',
      textAlign: 'center'
    });
    loading.add(textfield);
    loading.show();   
  
    var foursquareURI = "https://api.foursquare.com/v2/venues/search?";
    foursquareURI += "client_id=LIK1ATUFCZDW3KVWBJDCFPDIYIWECW10LUNDMR1D2TYJT2TD&client_secret=H1ZAKUDN5CUWYP5SF1G31OG4EVJ4SZATWRFTYRIC10DG1JOR&";
    foursquareURI += "v=20130815%20&ll=-23.6,-46.6&";
    foursquareURI += "limit=10";
  foursquareURI += "query=";
  
    ajax(
      {
        url: foursquareURI,
        type: 'json'
      },
      function(data) {
        var placeList = new UI.Menu({
          
          // Show top 5 places
          sections: [{
            items: [{
              title: data.response.venues[0].name,
              subtitle: data.response.venues[0].location.distance+' meters away.'
            }, {
              title: data.response.venues[1].name,
              subtitle: data.response.venues[1].location.distance+' meters away.'
            },{
              title: data.response.venues[2].name,
              subtitle: data.response.venues[2].location.distance+' meters away.'
            },{
              title: data.response.venues[3].name,
              subtitle: data.response.venues[3].location.distance+' meters away.'
            },{
              title: data.response.venues[4].name,
              subtitle: data.response.venues[4].location.distance+' meters away.'
            },{
              title: data.response.venues[5].name,
              subtitle: data.response.venues[5].location.distance+' meters away.'
            }]
          }]
          
        });
        
        // Change view
        loading.show();   
        placeList.show();
      },
      function(error) {
        textfield.text = "Connection problem. Please try again later";
        loading.add(textfield);
        loading.show();   
      }
    );
  
});

/*
main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});
*//*
main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/
