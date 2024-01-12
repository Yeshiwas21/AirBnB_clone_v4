$(document).ready(function () {
  const amenityIds = {};

  $('input[type="checkbox"]').change(function () {
    const checked = $(this).is(':checked');
    const amenityId = $(this).data('id');

    if (checked) {
      amenityIds[amenityId] = true;
    } else {
      delete amenityIds[amenityId];
    }

    const amenities = Object.keys(amenityIds).map(id => amenityIds[id]);
    const amenitiesStr = amenities.join(', ');
    $('.amenities h4').text(amenitiesStr);
  });
});
