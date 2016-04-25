$(()=>{
  $('#how-it-works').css('opacity', '0');
  $('.how-it-works-btn button').on('click', e => {
    $('html, body').animate({
      scrollTop: $('#how-it-works').offset().top
    }, 600, 'linear', () => {
      $('#how-it-works').css('opacity', '1');
      $('#how-it-works div.col-md-4').addClass('bounceInRight animated');
      $('.testimonials').addClass('zoomIn animated');
    });
  });
});