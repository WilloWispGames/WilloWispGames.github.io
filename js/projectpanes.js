var $projectpanes = $('.projectpane');

function initProjectPanes() {
  $.each($projectpanes, function() {
    var $projectpane = $(this);
    $projectpane.addClass('in-view');
  });
}
