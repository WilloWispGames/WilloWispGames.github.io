var $projareas = $('.projarea');
var $homepanes = $('.homepane');
var $panes = $('.pane');

function initHomePanes() {
  $.each($projareas, function() {
    var $projarea = $(this);
    $projarea.addClass('in-view');
  }); 
  $.each($projpanes, function() {
    var $projpane = $(this);
    $projpane.addClass('in-view');
  });  
  $.each($panes, function() {
    var $pane = $(this);
    $pane.addClass('in-view');
  });
}
