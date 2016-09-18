var $aboutpanes = $('.aboutpane');

function initAboutPane() {
  $.each($aboutpanes, function() {
    var $aboutpane = $(this);
    $aboutpane.addClass('in-view');
  });
}
