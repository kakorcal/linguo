$(()=>{
  var feedContainer = $('.feed');
  var learningContainers = feedContainer.find('.learning-languages');
  var teachingContainers = feedContainer.find('.teaching-languages');
  var feed = JSON.parse($('.json-users').text())
      // .forEach(user => {
        
      // });

  console.log(feed);
  // var learningContainer = $('.learning-languages');
  // var teachingContainer = $('.teaching-languages');
  // var languages = JSON.parse($('.json-languages').text())
  //     .forEach(lang => {
  //       var languageEntry = $('<p></p>');
  //       var language = $('<span></span>').text(lang.language + ' : ');
  //       var stars = $('<span class="stars"></span>');
  //       var deleteForm = $('<form class="language-delete-form" method="POST"></form>');
  //       var deleteBtn = $('<input class="btn btn-danger btn-delete" type="submit" value="REMOVE"/>');
  //       deleteForm.attr('action', '/languages/'+lang.id+'?_method=delete');
  //       for(var i = 0; i < 5; i++){
  //         var star = $('<i class="fa" aria-hidden="true">');
  //         if(lang.proficiency > i){
  //           star.addClass('fa-star');
  //         }else{
  //           star.addClass('fa-star-o');
  //         }
  //         stars.append(star);
  //       }
  //       if(lang.approach === 'Teaching'){
  //         teachingContainer.append('<hr>',
  //           languageEntry.append(
  //             language, stars, deleteForm.append(deleteBtn)
  //           )
  //         );
  //       }else if (lang.approach === 'Learning'){
  //         learningContainer.append('<hr>',
  //           languageEntry.append(
  //             language, stars, deleteForm.append(deleteBtn)
  //           )
  //         );
  //       }
  //     });
});