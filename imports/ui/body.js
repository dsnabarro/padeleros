import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { Players } from '../api/players.js';
import { teams1 } from '../api/players.js';

import './task.js';
import './body.html';

 
Meteor.subscribe('tasks');
Meteor.subscribe('players');
 
Template.body.helpers({
  tasks() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.NewPlayerForm.helpers({
    formCollection() {
        return Players;
    }
});

Template.GenerateTeamsRandom.helpers({
    GenerateTeamsRandom() {
    return Players;
    }
});


Template.body.helpers({
  players() {
    // Show newest tasks at the top
    return Players.find({}, { sort: { name: 1 }});
  },
});

Template.body.helpers({
  teams1() {
    // Sort teams1 by random number1 only where random number is set
    return Players.find({ random1: { $gt: 0.000 } }, { sort: { random1: 1 }});
  },
});

Template.body.helpers({
  teams2() {
    // Sort teams1 by random number1 only where random number is set
    return Players.find({ random2: { $gt: 0.000 } }, { sort: { random2: 1 } });
  },
});

Template.body.helpers({
  teams3() {
    // Sort teams1 by random number1 only where random number is set
    return Players.find({ random3: { $gt: 0.000 } }, { sort: { random3: 1 } });
  },
});

Template.Count.helpers({
  Count: function() {
    return Players.find({checked: true}).count();
  }
});



Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Meteor.call('tasks.insert', text);
 
    // Clear form
    target.text.value = '';
  },
});

Template.body.events({
  'submit .new-player'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const gender = target.gender.value;
    const ability = target.ability.value;
 
    // Insert a task into the collection
    Meteor.call('players.insert', name, gender, ability );
 
    // Clear form
    target.name.value = '';
    target.gender.value = '';
    target.ability.value = '';
  },

});

// Users may insert posts only if they are logged in
Players.permit('insert').ifLoggedIn();


