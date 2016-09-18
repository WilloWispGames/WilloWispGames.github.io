var $contactpanes = $('.contactpane');

function initContactPane() {
  $.each($contactpanes, function() {
    var $contactpane = $(this);
    $contactpane.addClass('in-view');
  });
}
