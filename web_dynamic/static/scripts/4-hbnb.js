$(document).ready(function () {
  let amenityIds = [];

  $('input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
      amenityIds.push($(this).attr('data-id'));
    } else {
      amenityIds.splice(amenityIds.indexOf($(this).attr('data-id')), 1);
    }
  });

  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds }),
      success: function (data) {
        $('section.places').empty();
        for (let place of data) {
          let article = $('<article>');
          let titleBox = $('<div class="title_box">');
          let title = $('<h2>').text(place.name);
          let price = $('<div class="price_by_night">').text(`$${place.price_by_night}`);
          titleBox.append(title, price);
          article.append(titleBox);

          let information = $('<div class="information">');
          let maxGuest = $('<div class="max_guest">').text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`);
          let numberRooms = $('<div class="number_rooms">').text(`${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`);
          let numberBathrooms = $('<div class="number_bathrooms">').text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`);
          information.append(maxGuest, numberRooms, numberBathrooms);
          article.append(information);

          let description = $('<div class="description">').text(place.description);
          article.append(description);

          $('section.places').append(article);
        }
      }
    });
  });
});
