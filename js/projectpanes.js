var $projectpanes = $('.projectpane');
var $window = $(window);

function initProjectPanes() {
  $.each($projectpanes, function() {
    var $projectpane = $(this);
    $projectpane.addClass('in-view');
  });
}
