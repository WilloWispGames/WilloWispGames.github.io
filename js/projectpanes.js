var $projectpanes = $('.projectpane');
var $body = $('body');

function initProjectPanes() {
  $body.addClass('fade-out');
  $.each($projectpanes, function() {
    var $projectpane = $(this);
    $projectpane.addClass('in-view');
  });
}
