$(()=>{
  $('#how-it-works').fadeOut();
  $('.how-it-works-btn button').on('click', e => {
    $('.social-media-btns').css('margin-bottom', '30%');
    $('#how-it-works').fadeIn();
    $('html, body').animate({
      scrollTop: $('#how-it-works').offset().top
    }, 600, 'linear', () => {
      $('#how-it-works').css('opacity', '1');
      $('#how-it-works div.col-md-4').addClass('bounceInRight animated');
      $('.testimonials').addClass('zoomIn animated');
    });
  });
  $('.back-button').on('click', e => {
    $('.social-media-btns').css('margin-bottom', '0%');
    $('#how-it-works').fadeOut();
    $('html, body').animate({
      scrollTop: -$('#how-it-works').offset().top
    }, 600, 'linear', () => {
    });
  });

});
