'use strict';

let titles = searchContent.map((movie) => {
  return { title: movie.title};
});

$('.ui.search').search({
  source: titles
});