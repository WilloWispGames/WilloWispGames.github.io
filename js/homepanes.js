var $projpanes = $('.projpane');
var $panes = $('.pane');

function initHomePanes() {
  $.each($projpanes, function() {
    var $projpane = $(this);
    $projpane.addClass('in-view');
  });  
  $.each($panes, function() {
    var $pane = $(this);
    $pane.addClass('in-view');
  });
}
