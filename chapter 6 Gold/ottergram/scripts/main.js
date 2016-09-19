var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function setThumbImage(thumbnail, url) {
  'use strict';
  thumbnail.setAttribute('data-image-url', url);
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setThumbTitle(thumbnail, title) {
  'use strict';
  thumbnail.setAttribute('data-image-title', title);
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  'use strict';
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  var url = imageFromThumb(thumbnail);
  setDetails(url, titleFromThumb(thumbnail));
  if (url.includes('http'))
  {
    resetHackedItem();
    hackRandomItem();
  }
}

function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hackRandomItem() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  _hackedIndex = getRandomIntInclusive(0, 4);
  var thumb = thumbnails[_hackedIndex];
  console.log("hackIndex = " + _hackedIndex);
  _hackedOriginalTitle = titleFromThumb(thumb);
  _hackedOriginalUrl = imageFromThumb(thumb);
  setThumbImage(thumb, "http://www.catsvscancer.org/wp-content/uploads/2015/04/Taco-Cat-Spelled-Backwards-Is-Taco-Cat.1-1024x767.jpg");
  setThumbTitle(thumb, "Hacked!");
}

function resetHackedItem() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  var thumb = thumbnails[_hackedIndex];
  setThumbTitle(thumb, _hackedOriginalTitle);
  setThumbImage(thumb, _hackedOriginalUrl);
}

var _hackedIndex;
var _hackedOriginalUrl;
var _hackedOriginalTitle;

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(function (thumb) {
    addThumbClickHandler(thumb);
  });
  hackRandomItem();
}

initializeEvents();
