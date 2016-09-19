var $panes = $('.pane');

function initPanes() {
  $.each($panes, function() {
    var $pane = $(this);
    $pane.addClass('in-view');
  });
}
