var $projareas = $('.projarea');
var $panes = $('.pane');

function initHomePanes() {
  $.each($projareas, function() {
    var $projarea = $(this);
    $projarea.addClass('in-view');
  });  
  $.each($panes, function() {
    var $pane = $(this);
    $pane.addClass('in-view');
  });
}
