
/* Find any panes within the bounds of the window. */
var $panes = $('.pane');
var $window = $(window);

function initPanes() {
  $.each($panes, function() {
    var $pane = $(this);
    $pane.addClass('in-view');
  });
}

function isPaneVisible() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($panes, function() {
    var $pane = $(this);
    var pane_height = $pane.outerHeight();
    var pane_top_position = $pane.offset().top;
    var pane_bottom_position = (pane_top_position + pane_height);

    //check to see if this current container is within viewport
    if ((pane_bottom_position >= window_top_position) &&
      (pane_top_position <= window_bottom_position)) {
      $pane.addClass('in-view');
    } else {
      $pane.removeClass('in-view');
    }
  });
}
