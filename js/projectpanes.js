var $projectpanes = $('.projectpane');
//var $body = $('body');

function initProjectPanes() {
  //$body.addClass('fade-out');
  $.each($projectpanes, function() {
    var $projectpane = $(this);
    $projectpane.addClass('in-view');
  });
}

/*
function changeBackground() {
  $('intro').animate(
    {"opacity": 1}, 
    2000, function(){
      $('intro').css("opacity", 0);
    }
  );
}

//Auto change Background Image over time
$(window).load(function() {
    // Init sequence, loading the first image
    $('intro').css("opacity", 1);
    changeBackground();

    //setInterval(changeBackground, 3000);
});
*/
