var $aboutpanes = $('.aboutpane');
var $window = $(window);

function initAboutPanes() {
  $.each($aboutpanes, function() {
    var $aboutpane = $(this);
    $aboutpane.addClass('in-view');
  });
}
