var $aboutpanes = $('.aboutpane');

function initAboutPanes() {
  $.each($aboutpanes, function() {
    var $aboutpane = $(this);
    $aboutpane.addClass('in-view');
  });
}
