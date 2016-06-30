$(document).ready(function() {

  // Show contacts

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

  // Add contacts

  $(".contact-form").on("submit", function(evt) {
    // Prevent anything from acutally being submitted
    evt.preventDefault();
    // Get contact information from input fields
    var first_name = $("#first-name").val();
    var last_name = $("#last-name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    // If all information is present, use it to create new contact
    if (first_name && last_name && email && phone) {
        $.post('/contacts/create',
        {first_name: first_name, last_name: last_name, email: email, phone: phone},
        function(results) {
          var showMessage = $("<p>").appendTo(".message");
          if (results["result"]) { showMessage.text("Contact saved."); }
        }, "json" );
    } else {
      showMessage.text("Contact was not saved.");
    }
    // Clear form fields
    $(".contact-form input").val("");
  });

});
