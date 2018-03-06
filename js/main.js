var SLIDETIME = 4000;


function handleNextSlide() {

  var $radiosList = $('input[class*="slide-radio-input"]');
  var $activeRadio = $('input[class*="slide-radio-input"]:checked');

  var currentIndex = $activeRadio.index();
  var radiosListLength = $radiosList.length;

  $radiosList.attr('checked', false);

  if (currentIndex >= (radiosListLength - 1)) {
    $radiosList.first().attr('checked', true);
  } else {
    $activeRadio.next('input[class*="slide-radio-input"]').attr('checked', true);
  }

}

var interval = setInterval(handleNextSlide, SLIDETIME);


$('.slider-content-wrap').hover(
	function() {
		if (interval) {
			clearInterval(interval);
		}
	}, 
	function() {
		interval = setInterval(handleNextSlide, SLIDETIME);
	}
); 
