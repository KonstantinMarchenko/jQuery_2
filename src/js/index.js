// import '../styles/styles.css';

let userId = '48600090482%40N01';
let apiKey = 'f6146b5aea320305af01030c6fc04c59';
let dataUrl = 'https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key={0}&user_id={1}&format=json&nojsoncallback=1';
let photosUrl = 'https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={0}&photoset_id={1}&user_id={2}&format=json&nojsoncallback=1';
let singlePhotoUrl = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}_s.jpg';
let singlePhotoUrlOriginal = 'https://farm{0}.staticflickr.com/{1}/{2}_{3}.jpg';
let photoSetsArray;
let photosArray;
let pagesNumber;
let currentPage;
let curImgIndex;
let currentPhotoCount;
let titleAsc = true;
let defaultAsc = true;
let elementsPerPage = 10;
let dataSource;
let maxAmountOfPageButtons = 8;

if ($(window).width() <= 375) {
  maxAmountOfPageButtons = 5;
  elementsPerPage = 5;
}


String.prototype.format = function () {
  var string = this,
    i = arguments.length;
  while (i--) {
    string = string.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
  }
  return string;
};

function sortAndDisplayPhotoSetPage(sort, sortField, index, elPerPage) {
  currentPage = index;
  if (sort === 'asc') {
    dataSource.sort(function (a, b) {
      if (a[sortField] > b[sortField]) return 1;
      if (a[sortField] < b[sortField]) return -1;
      return 0;
    })
  } else if (sort === 'desc') {
    dataSource.sort(function (a, b) {
      if (a[sortField] < b[sortField]) return 1;
      if (a[sortField] > b[sortField]) return -1;
      return 0;
    })
  } else if (sort === 'default asc') {
    dataSource.sort(function (a, b) {
      return parseInt(a[sortField]) - parseInt(b[sortField]);
    })
  } else if (sort === 'default desc') {
    dataSource.sort(function (a, b) {
      return parseInt(b[sortField]) - parseInt(a[sortField]);
    })
  }
  let lowestIndex = (index - 1) * elPerPage;
  let highestIndex = (index) * elPerPage;
  $('.table__row').remove();
  for (let i = lowestIndex; i < highestIndex; i++) {
    if (typeof dataSource[i] !== 'undefined') {
      $('<tr id="tr_' + i + '" class="table__row"><td id="td_photo_set_title_' + i + '" class="table__cell">' + dataSource[i].title._content + '</td></tr>').appendTo('#table_1');
    }
  }
}

function createPages(elementsNumber) {
  if (elementsNumber % elementsPerPage !== 0) {
    pagesNumber = Math.trunc(elementsNumber / elementsPerPage) + 1;
  } else {
    pagesNumber = Math.trunc(elementsNumber / elementsPerPage);
  }
  $('.page-next').remove();
  if (pagesNumber > maxAmountOfPageButtons) {
    $('<button id="btn_next_0" class="page-next" disabled="true">&laquo;</button>').appendTo('#page_container_1');
    for (let i = 1; i <= maxAmountOfPageButtons; i++) {
      $('<button id="btn_next_' + i + '" class="page-next">' + i + '</button>').appendTo('#page_container_1');
    }
    $('<button id="btn_next_' + (maxAmountOfPageButtons + 1) + '" class="page-next">&raquo;</button>').appendTo('#page_container_1');
  } else if (pagesNumber <= maxAmountOfPageButtons) {
    for (let i = 1; i <= pagesNumber; i++) {
      $('<button id="btn_next_' + i + '" class="page-next">' + i + '</button>').appendTo('#page_container_1');
    }
  }
}

function filter() {
  let val = $.trim($('#search').val()).toUpperCase();
  if (val !== '') {
    let txtValue;
    let arrayWithFilter = [];
    $.each(photoSetsArray, function (index) {
      txtValue = photoSetsArray[index].photoSetTitle;
      if (txtValue.toUpperCase().indexOf(val) > -1) {
        arrayWithFilter.push(photoSetsArray[index]);
      }
    });
    createPages(arrayWithFilter.length);
    dataSource = arrayWithFilter;
    sortAndDisplayPhotoSetPage('', '', 1, elementsPerPage);
  } else {
    createPages(photoSetsArray.length);
    dataSource = photoSetsArray;
    sortAndDisplayPhotoSetPage('', '', 1, elementsPerPage);
  }
}

$(document).ready(function () {
  fetch(dataUrl.format(apiKey, userId))
    .then(response => {
      return response.json();
    }).then(data => {
    photoSetsArray = data.photosets.photoset;
    $('<div class="search-container"></div>').appendTo('body');
    $('<div class="text__field">All photo sets</div>').appendTo('.search-container');
    $('<input id="search" type="text" class="search-field" style="margin-bottom: 5px;">').appendTo('.search-container');
    $('<button id="btn_sort_default" class="button-back" style="display: inline-block">Sort by default</button>').appendTo('.search-container');
    $('<button id="btn_sort_title" class="button-back" style="display: inline-block;  margin-left: 0.5em;">Sort by title</button>').appendTo('.search-container');
    $('<table id="table_1" class="table"></table>').appendTo('body');
    $('<tr id="tr_header" class="table__row-header"></tr>').appendTo('#table_1');
    $('<th id="th_1" class="table__header">' + photoSetsArray[0].username + '\'s photo sets</th>').appendTo('#tr_header');
    $('<div id="page_container_1" class="page-container"></div>').appendTo('body');
    $('<div id="img_container_1" class="image-container image-container_hidden"></div>').appendTo('body');
    $.each(photoSetsArray, function (index) {
      photoSetsArray[index].defaultId = index;
      photoSetsArray[index].photoSetTitle = photoSetsArray[index].title._content;
    });
    dataSource = photoSetsArray;
    sortAndDisplayPhotoSetPage('', '', 1, elementsPerPage);
    createPages(photoSetsArray.length);
  })
    .catch(error => {
      console.log(error);
    })
});

$('body').on('click', '.page-next', function () {
  if ($(this).attr('id') !== 'btn_next_0' && $(this).attr('id') !== `btn_next_${maxAmountOfPageButtons + 1}`) {
    sortAndDisplayPhotoSetPage('', '', $(this).text(), elementsPerPage);
  }
  if ($(this).attr('id') === 'btn_next_0') {
    for (let i = 1; i <= maxAmountOfPageButtons; i++) {
      $(`#btn_next_${i}`).text($(`#btn_next_${i}`).text() - 1);
    }
    if ($('#btn_next_1').text() === '1') $('#btn_next_0').prop('disabled', true);
    $('#btn_next_' + (maxAmountOfPageButtons + 1)).prop('disabled', false);
  } else if ($(this).attr('id') === 'btn_next_' + (maxAmountOfPageButtons + 1)) {
    for (let i = 1; i <= maxAmountOfPageButtons; i++) {
      $(`#btn_next_${i}`).text(parseInt($(`#btn_next_${i}`).text()) + 1);
    }
    if (parseInt($(`#btn_next_${maxAmountOfPageButtons}`).text()) === pagesNumber) {
      $(`#btn_next_${maxAmountOfPageButtons + 1}`).prop('disabled', true);
    }
    $('#btn_next_0').prop('disabled', false);
  }
}).on('click', '.button-back', function () {
  $('#table_1').show();
  $('.search-container').show();
  $('#page_container_1').show();
  $('#img_container_1').removeClass('image-container_visible').addClass('image-container_hidden').empty();
}).on('click', '#btn_sort_default', function () {
  if (defaultAsc === true) {
    sortAndDisplayPhotoSetPage('default asc', 'defaultId', currentPage, elementsPerPage);
    defaultAsc = false;
  } else {
    sortAndDisplayPhotoSetPage('default desc', 'defaultId', currentPage, elementsPerPage);
    defaultAsc = true;
  }
}).on('click', '#btn_sort_title', function () {
  if (titleAsc === true) {
    sortAndDisplayPhotoSetPage('asc', 'photoSetTitle', currentPage, elementsPerPage);
    titleAsc = false;
  } else {
    sortAndDisplayPhotoSetPage('desc', 'photoSetTitle', currentPage, elementsPerPage);
    titleAsc = true;
  }
}).on('click', '.table__cell', function () {
  let rowId = $(this).closest('tr').attr('id').split('_');
  let currentId = rowId[1];
  let counterForDisplay = 0;
  currentPhotoCount = dataSource[currentId].count_photos;
  $('.table').hide();
  $('#page_container_1').hide();
  $('.search-container').hide();
  $('<div class="text__field" style="text-align: center; margin: auto; margin-bottom: 0.5em; ">Selected photo set</div>').appendTo('#img_container_1')
  $('<button id="btn_back" class="button-back">Back</button>').appendTo('#img_container_1');
  $('<div class="text__field">' + dataSource[currentId].title._content + '</div>').appendTo('#img_container_1');
  $('<div class="text__field" style="font-size: 1em">' + dataSource[currentId].description._content + '</div>').appendTo('#img_container_1');
  $('<div id="photo_count_' + dataSource[currentId].count_photos + '" class="text__field">Photos: ' + dataSource[currentId].count_photos + '</div>').appendTo('#img_container_1');
  fetch(photosUrl.format(apiKey, dataSource[currentId].id, dataSource[currentId].owner))
    .then(response => {
      return response.json();
    })
    .then(data => {
      photosArray = data.photoset.photo;
      $.each(photosArray, function (index) {
        $('<div id="img_cont_' + index + '" class="image-container-single"></div>').appendTo('#img_container_1');
        fetch(singlePhotoUrl.format(photosArray[index].farm, photosArray[index].server, photosArray[index].id, photosArray[index].secret))
          .then(response => {
            return response;
          })
          .then(data => {
            $('<img id="img_small_' + counterForDisplay + '" src="' + data.url + '" alt="image" class="image">').appendTo('#img_cont_' + index);
            counterForDisplay++;
            if (counterForDisplay === photosArray.length) {
              $('#img_container_1').removeClass('image-container_hidden').addClass('image-container image-container_visible');
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
    })
    .catch(error => {
      console.log(error);
    })
}).on('click', '.image-container-single', function () {
  showModal($(this).attr('id').split('_')[2]);
}).on('keyup', '#search', function () {
  filter();
});

function showModal(index) {
  curImgIndex = index;
  fetch(singlePhotoUrlOriginal.format(photosArray[curImgIndex].farm, photosArray[curImgIndex].server, photosArray[curImgIndex].id, photosArray[curImgIndex].secret))
    .then(response => {
      return response;
    })
    .then(data => {
      $('#modal_content_1').empty();
      $('<div id="btn_close_modal" class="div-close"><span class="div-close__button">&times;</span></div>').appendTo('#modal_content_1');
      $('<div id="btn_image_back" class="modal__content-forward">&laquo;</div>').appendTo('#modal_content_1');
      $('<div class="image-container-single_original-size"></div>').appendTo('#modal_content_1');
      $('<div id="btn_image_forward" class="modal__content-forward">&raquo;</div>').appendTo('#modal_content_1');
      $('<img id="img_original" src="' + data.url + '" alt="image of original size" class="image_original" style="width: 60%; height: auto">').appendTo('.image-container-single_original-size');
      $('<div class="text__field_image">' + photosArray[curImgIndex].title + '</div>').appendTo('.image-container-single_original-size');
      if (parseInt(curImgIndex) === 0) {
        $('#btn_image_back').hide();
      }
      if (parseInt(curImgIndex) === currentPhotoCount - 1) {
        $('#btn_image_forward').hide();
      }
      $('#modal_1').show();
    })
    .catch(error => {
      console.log(error);
    });
}

let modal = document.getElementById("modal_1");
window.onclick = function (event) {
  if (event.target === modal) {
    $('#modal_content_1').empty();
    $('#modal_1').hide();
  }
};

$('#modal_content_1').on('click', '#btn_close_modal', function () {
  $('#modal_content_1').empty();
  $('#modal_1').hide();
}).on('click', '#btn_image_back', function () {
  showModal(curImgIndex - 1);
}).on('click', '#btn_image_forward', function () {
  showModal(parseInt(curImgIndex) + 1);
});
