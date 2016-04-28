$(()=>{
    //  IN PROGRESS COMING SOON
  // // initialize language profile
  // var users = JSON.parse($('#json-users').text());
  // var teachers = JSON.parse($('#json-teachers').text());
  // var learners = JSON.parse($('#json-learners').text());
  // var userIds = $('.user-id');
  
  // userIds.each((idx, elem) => {
  //   var teachingContainer = $(this).siblings('.teaching-languages');
  //   var learningContainer = $(this).siblings('.learning-languages');
  //   teachers.forEach(function(teacher){
  //     if($(this).data('id') === teacher.user_id){
  //       var languageEntry = $('<p></p>');
  //       var language = $('<span></span>').text(teacher.language + ' : ');
  //       var stars = $('<span class="stars"></span>');
  //       for(var i = 0; i < 5; i++){
  //         var star = $('<i class="fa" aria-hidden="true">');
  //         if(teacher.proficiency > i){
  //           star.addClass('fa-star');
  //         }else{
  //           star.addClass('fa-star-o');
  //         }
  //         stars.append(star);
  //       }
  //       teachingContainer.append('<hr>',
  //         languageEntry.append(
  //           language, stars
  //         )
  //       );
  //     }
  //   }, elem);
  // });

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