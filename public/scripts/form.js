'use strict';

$('select').dropdown();

// Use only if genres are already chosen
if (typeof genres !== 'undefined') {
  genres.forEach((genre) => {
    $('select').dropdown('set selected', genre);
  });
}