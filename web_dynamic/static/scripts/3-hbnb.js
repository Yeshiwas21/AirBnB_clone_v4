$(document).ready(function () {
  const urlStatus = 'http://0.0.0.0:5001/api/v1/status/';
  const urlPlacesSearch = 'http://0.0.0.0:5001/api/v1/places_search/';

  function updateApiStatus() {
    $.getJSON(urlStatus, function (data) {
      if (data.status === "OK") {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  function createPlaceElement(place) {
    const article = $('<article>');
    const title = $('<div class="title">').append($('<h2>').text(place.name));
    const information = $('<div class="information">').append($('<div class="price_by_night">').text('$' + place.price_by_night));
    const guest = $('<div class="max_guest">').text(place.max_guest + ' Guest');
    const bedroom = $('<div class="number_rooms">').text(place.number_rooms + ' Bedroom');
    const bathroom = $('<div class="number_bathrooms">').text(place.number_bathrooms + ' Bathroom');
    const description = $('<div class="description">').text(place.description);
    const user = $('<div class="user">');
    const name = $('<strong>').text('Owner: ');
    user.append(name).append(place.user_first_name + ' ' + place.user_last_name);
    article.append(title)
           .append(information)
           .append($('<div class="description">').append(guest)
                                                   .append(bedroom)
                                                   .append(bathroom))
           .append(description)
           .append(user);
    return article;
  }

  function updatePlacesList(places) {
    const section = $('section.places');
    section.empty();
    if (places.length > 0) {
      for (const place of places) {
        section.append(createPlaceElement(place));
      }
    } else {
      section.append('<p>No places available at the moment</p>');
    }
  }

  function searchPlaces() {
    $.ajax({
      url: urlPlacesSearch,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType: 'json',
      success: function (data) {
        updatePlacesList(data);
      }
    });
  }

  updateApiStatus();

  setInterval(updateApiStatus, 5000);

  searchPlaces();

  $('button').click(function () {
    searchPlaces();
  });
});
