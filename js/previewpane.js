var $prevs = $('.pane-right');

function initPostPane() {
  $.each($prevs, function() {
    var $prev = $(this);
    $prev.addClass('in-view');
  });
}
