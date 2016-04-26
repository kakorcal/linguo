$(()=>{

  // LOGO ANIMATION MAYBE

  // var $logo = $('.logo-container');

  // $logo.hover(function(){
  //   $(this).addClass('pulse animated'); 
  // }, function () {
  //     $(this).removeClass('pulse animated');
  // });

  // FLASH MESSAGE

  var $flash = $('#flash-message');
  var $container = $('#flash-container');
  if($flash.text()){
    console.log($flash.length);
    $container.show();
  }

  switch($flash.text().length){
    case 77:
      $container.addClass('alert-danger');
      $flash.addClass('flash animated');
      console.log('login success');
      break;
    case 33:
      $container.addClass('alert-success');
      $flash.addClass('flash animated');
      console.log('logout success');
      break;
    case 41:
      $container.addClass('alert-warning');
      $flash.addClass('flash animated');
      console.log('not logged in');
      break;
    case 46: 
      $container.addClass('alert-danger');
      $flash.addClass('flash animated');
      console.log('not correct user');
      break;
  }

  $('#update').on('click', formatLocation);

  function formatLocation()
  {
    var geoCoder = new google.maps.Geocoder();
    var $location = $("#location");
    if(!$location.val())
    {
      alert("Some text for if nothing was entered");
      return;
    }

    geoCoder.geocode({address: $location.val(), 
                    componentRestrictions: {locality: "San Francisco"}}, 
    (results, status)=>
    {
      if(status == google.maps.GeocoderStatus.OK)
       {
        $location[0].value = (results[0].geometry.location.lat()+','+results[0].geometry.location.lng());
        var loc = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        debugger
        $.ajax({
          type: "PUT",
          url: '/users/ '+'1',
          data: loc,
          success: ()=>{}
        });
        return;
       }
      else 
       { 
         alert("Geocode was not successful for the following reason: " + status);
       }

    })
  }
});