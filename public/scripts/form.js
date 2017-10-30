'use strict';

$('select').dropdown();

// Use only if genres are already chosen
if (genres) {
  genres.forEach((genre) => {
    $('select').dropdown('set selected', genre);
  });
}