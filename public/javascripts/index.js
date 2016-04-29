$(()=>{
  var users = JSON.parse($('#json-users').text());
  var teachers = JSON.parse($('#json-teachers').text());
  var learners = JSON.parse($('#json-learners').text());
  var userIds = $('.user-id');
  
  userIds.each((idx, elem) => {
    teachers.forEach(function(teacher){
      if($(this).data('id') === teacher.user_id){
        var languageEntry = $('<p></p>');
        var language = $('<span></span>').text(teacher.language + ' : ');
        var stars = $('<span class="stars"></span>');
        for(var i = 0; i < 5; i++){
          var star = $('<i class="fa" aria-hidden="true">');
          if(teacher.proficiency > i){
            star.addClass('fa-star');
          }else{
            star.addClass('fa-star-o');
          }
          stars.append(star);
        }
        $(this).siblings('.teaching-languages').append('<hr>',
          languageEntry.append(
            language, stars
          )
        );
      }
    }, elem);

    learners.forEach(function(learner){
      if($(this).data('id') === learner.user_id){
        var languageEntry = $('<p></p>');
        var language = $('<span></span>').text(learner.language + ' : ');
        var stars = $('<span class="stars"></span>');
        for(var i = 0; i < 5; i++){
          var star = $('<i class="fa" aria-hidden="true">');
          if(learner.proficiency > i){
            star.addClass('fa-star');
          }else{
            star.addClass('fa-star-o');
          }
          stars.append(star);
        }
        $(this).siblings('.learning-languages').append('<hr>',
          languageEntry.append(
            language, stars
          )
        );
      }
    }, elem);
  });

});