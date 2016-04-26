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

  var currentUserID = $('#current-user-id').text();

  $('#update').on('click', formatLocation);

  function formatLocation(e)
  {
    e.preventDefault();
    var geoCoder = new google.maps.Geocoder();

    geoCoder.geocode({address: $('#locationInput').val()}, 
    (results, status)=>
    {
      
      if(status == google.maps.GeocoderStatus.OK)
       {
        $('#locationInput')[0].value = (results[0].geometry.location.lat()+','+results[0].geometry.location.lng());

        var location = $("#locationInput").val(),
            gender = $("#genderInput").val(),
            description = $("#descriptionInput").val(),
            age = $("#ageInput").val(),
            img_url = $("#imgInput").val(),
            user = {user: {location, gender, age, img_url, description}}

        $.ajax({
          type: "PUT",
          url: '/users/'+currentUserID,
          data: user,
          success: (data)=>{
            window.location.pathname = data;
          }
        });
       }
      else 
       { 
         alert("Geocode was not successful for the following reason: " + status);
       }

    })
  }
});