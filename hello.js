Test = new Mongo.Collection("test");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
  Template.body.helpers({
    tests: function () {

      return Test.find({}, {sort: {createdAt: -1}});

    }
  })

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.events({

    "submit .new-test": function (event) {

      // Prevent default browser form submit

      event.preventDefault();



      // Get value from form element

      var text = event.target.text.value;



      // Insert a task into the collection

      Test.insert({

        text: text,

        createdAt: new Date() // current time

      });



      // Clear form

      event.target.text.value = "";

    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
