var $contactpanes = $('.contactpane');

function initContactPanes() {
  $.each($contactpanes, function() {
    var $contactpane = $(this);
    $contactpane.addClass('in-view');
  });
}
