$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
          `<div class="MessageItems">
            <div class="Messages__Message">
              <div class="Message__Title">
                <div class="Title">
                  ${message.user_name}
                </div>
                <div class="Date">
                  ${message.created_at}
                </div>
              </div>
              <div class="Message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                <img src=${message.image} >
              </div>
            </div>
          </div>`
      return html;
    } else {
      let html =
          `<div class="MessageItems">
            <div class="Messages__Message">
              <div class="Message__Title">
                <div class="Title">
                  ${message.user_name}
                </div>
                <div class="Date">
                  ${message.created_at}
                </div>
              </div>
              <div class="Message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
            </div>
          </div>`
      return html;
      };
  }



  $('#new_message').on('submit', function(e){
    e.preventDefault();

    let formData = new FormData(this);
    let url      = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MainChat__Messages').append(html);
      $('#new_message')[0].reset();
      $('.MainChat__Messages').animate({ scrollTop: $('.MainChat__Messages')[0].scrollHeight});
      $('.NewMessage__SubmitBtn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});
