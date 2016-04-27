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
    case 17: 
      $container.addClass('alert-success');
      $flash.addClass('flash animated');
      console.log('login success and profile is updated');
      break;
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
    case 69:
      $container.addClass('alert-danger');
      $flash.addClass('flash animated');
      console.log('cannot access thread if not participant');
  }

  var currentUserID = $('#current-user-id').text();

  $('#update').on('click', update);
  $('#search').on('click', search)

  function update(e)
  {
    e.preventDefault();
    var inputLocation = $('#locationInput').val();
    function updateCallback(location){
      
    var gender = $("#genderInput").val(),
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

    formatLocation(inputLocation, updateCallback);
  }
  function search(e)
  {
    e.preventDefault();

    var inputLocation = $('#locationInput').val();
    formatLocation(inputLocation, searchCallback);

    function searchCallback(location){
      var language = $('#languageInput').val();
      var searchData = {location, language};
      $.get( "/users", 
              searchData, 
              function(data){
                
                $('.list-group').remove()
                var $listGroup = $("<div/>")
                $listGroup.addClass('list-group');

                data.forEach((el)=>{
                  
                  var $h4 = $('<h4/>');
                  $h4.addClass("list-group-item-heading")
                  $h4.text(el.name);
                  
                  var $p = $('<p/>')
                  $p.addClass('list-group-item-text')
                  var $li = $('<li/>');
                  $li.text("Description: "+el.description);
                  $p.append($li);
                  
                  var $form = $('<form/>');
                  $form.attr("action", "/threads");
                  $form.attr("method", "POST")
                  
                  $('<input type = "text" name = "thread[subject]">'+
                    '<input type = "text" name = "message[message]">'+
                    '<input type = "hidden" name = "message[sender_id]" value ='+currentUserID+'>'+
                    '<input type = "hidden" name = "message[rec_id]" value = '+el.id+'>'+
                    '<input type = "submit" value = "Send Message!">').appendTo($form);

                  $($listGroup).append($h4);
                  $($listGroup).append($p);
                  $($listGroup).append($form);

                });

                $($listGroup).insertAfter('.header');

              }, 
              'json');

    }


  }


  function formatLocation(inputLocation, cb)
  {
    var geoCoder = new google.maps.Geocoder();
    geoCoder.geocode({address: inputLocation}, 
    (results, status)=>
    {
      if(status == google.maps.GeocoderStatus.OK)
      {
        cb(results[0].formatted_address);
      }
      else 
       { 
         alert("Geocode was not successful for the following reason: " + status);
       }

    })
  }
});