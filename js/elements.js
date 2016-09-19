var $elements = $('.animation-element');

function initElements() {
  $.each($elements, function() {
    var $element = $(this);
    $element.addClass('in-view');
  });
}
