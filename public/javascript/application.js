$(document).ready(function() {

  $("button#show-contacts").on("click", function() {
    $(".contacts-list").empty();
    $.getJSON('/contacts', function (contacts) {
      contacts.forEach(showContact);
    });
  });

  function showContact(contact) {
    // Should refactor to use template
    var showName = $("<h3>").appendTo(".contacts-list");
    showName.text(contact.first_name + " " + contact.last_name);
    var showDetails = $("<p>").appendTo(".contacts-list");
    showDetails.text(contact.email + " | " + contact.phone);
  }

});
