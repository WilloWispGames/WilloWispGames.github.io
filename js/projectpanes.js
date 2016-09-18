var $projectpanes = $('.projectpane');

function initProjectPane() {
  $.each($projectpanes, function() {
    var $projectpane = $(this);
    $projectpane.addClass('in-view');
  });
}
