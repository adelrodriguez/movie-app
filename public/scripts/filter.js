'use strict';

$('.selection.dropdown').dropdown({
  action: 'activate',
  onChange: function(text, value) {
    filterTable(value, $(this).dropdown('get default text'));
  }
});

// CLEAR BUTTON
$('#clear').click(function() {
  $('.selection.dropdown').dropdown('clear');
  $('tbody > tr').show();
});

// Input is either the genre, the director or the actor chosen
// Type is the filter type
function filterTable(input, type) {
  let length = $('tbody > tr').length;
  let cell;

  // Specify cell acording to the filter type
  switch(type) {
    case 'Genre':
      cell = 3;
      break;
    case 'Director':
      cell = 4;
      break;
    case 'Actor':
      cell = 5;
      break;
  }
  // Hide all table body rows
  $('tbody > tr').hide();

  for (let i = 1; i <= length; i++) {
    let str = $(`tbody > tr:nth-child(${i})>td:nth-child(${cell})`).text();
    
    // If selected row has the specified input, show it
    if (~str.indexOf(input)) {
      $(`tbody > tr:nth-child(${i})`).show();
    }
  }
}