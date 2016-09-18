var $contactpanes = $('.contactpane');
var $window = $(window);

function initContactPanes() {
  $.each($contactpanes, function() {
    var $contactpane = $(this);
    $contactpane.addClass('in-view');
  });
}
