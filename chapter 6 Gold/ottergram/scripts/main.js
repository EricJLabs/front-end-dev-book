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
    resetThumbnails();
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
  var thumbnails = getThumbnailsArray();
  var hackIndex = getRandomIntInclusive(0, 4);
  console.log("hackIndex = " + hackIndex);
  setThumbImage(thumbnails[hackIndex], "http://www.catsvscancer.org/wp-content/uploads/2015/04/Taco-Cat-Spelled-Backwards-Is-Taco-Cat.1-1024x767.jpg");
  setThumbTitle(thumbnails[hackIndex], "Hacked!");
}

function resetThumbnails() {
  var index = 0;
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(function (thumb) {
    setThumbTitle(thumb, _originalUrls[index]);
    setThumbImage(thumb, _originalUrls[index]);
    index = index + 1;
  });
}

var _originalUrls = [];
var _originalTitles = [];

function initializeEvents() {
  'use strict';
  var index = 0;
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(function (thumb) {
    _originalUrls.push(imageFromThumb(thumb));
    _originalTitles.push(titleFromThumb(thumb));
    addThumbClickHandler(thumb);
    index = index + 1;
  });
  hackRandomItem();
}

initializeEvents();
