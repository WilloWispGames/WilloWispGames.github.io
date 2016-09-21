var $homepanes = $('.homepane');
var $panes = $('.pane');

function initHomePanes() {
  $.each($homepanes, function() {
    var $homepane = $(this);
    $homepane.addClass('in-view');
  });  
  $.each($panes, function() {
    var $pane = $(this);
    $pane.addClass('in-view');
  });
}
