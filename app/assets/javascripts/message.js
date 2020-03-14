$(function(){

  var buildHTML = function(message) {
    if (message.content && message.image) {

    var html = `<div class="MessageItems" data-message-id="${message.id}"> 
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
            <img src=${message.image} class="lower-message__image">
          </div>
        </div>
      </div>`
  return html;
  } else if (message.content) {

  var html = `<div class="MessageItems" data-message-id="${message.id}"> 
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
} else if (message.image) {

var html = `<div class="MessageItems" data-message-id="${message.id}"> 
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
        <img src=${message.image} class="lower-message__image">
      </div>
    </div>
  </div>`
return html;
}};


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

  var reloadMessages = function() {
    
    var last_message_id = $('.MessageItems:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
        $('.MainChat__Messages').append(insertHTML);
        $('.MainChat__Messages').animate({ scrollTop: $('.MainChat__Messages')[0].scrollHeight});
      });
     }
    })
    .fail(function() {
      alert('error');
    })
  } 

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  } 

});
