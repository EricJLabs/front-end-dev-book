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

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var _hackIndex = getRandomIntInclusive(0, 4);
var _lastHackThumbnail;

function setDetailsFromThumb(thumbnail, index) {
  'use strict';
  if (_lastHackThumbnail != null) {
    _hackIndex = getRandomIntInclusive(0, 4);
    setDetails(imageFromThumb(_lastHackThumbnail), titleFromThumb(_lastHackThumbnail));
    _lastHackThumbnail = null;
  }

  console.log("index = " + index + " hackIndex = " + _hackIndex);
  if (index == _hackIndex){
    _lastHackThumbnail = thumbnail;
    setDetails("http://www.catsvscancer.org/wp-content/uploads/2015/04/Taco-Cat-Spelled-Backwards-Is-Taco-Cat.1-1024x767.jpg", "hacked");
  }
  else {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
  }
}

function addThumbClickHandler(thumb, index){
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb, index);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  var index = 0;
  thumbnails.forEach(function (thumb) {
    addThumbClickHandler(thumb, index);
    index = index + 1;
  });
}

initializeEvents();
