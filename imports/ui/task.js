import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { Players } from '../api/players.js';
 
import './task.html';
import './player.html';
import './team.html';

 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
});

Template.player.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('players.setChecked', this._id, !this.checked);
    Meteor.call('players.RemoveMatches');    
    //console.log(!this.checked);
  },
  'click .delete'() {
    Meteor.call('alertdelete');
    Meteor.call('players.remove', this._id);
  },
});



Template.checkall.events ({
  'click .checkall'() {
    // Set all players to checked or unchecked
    Meteor.call('players.checkall', !this.IsChecked);
    Meteor.call('players.RemoveMatches');    
    //console.log("checkall ticked");
    //console.log(!this.IsChecked);
  },
}); 

Template.uncheckall.events ({
  'click .uncheckall'() {
    // Set all players to checked or unchecked
    Meteor.call('players.uncheckall', !this.IsChecked);
    Meteor.call('players.RemoveMatches');    
    //console.log("uncheckall ticked");
    //console.log(!this.IsChecked);
  },
});  


Template.GenerateTeamsRandom.events({
  'click .GenerateTeamsRandom'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsRandom1');
    Meteor.call('GenerateTeamsRandom2');
    Meteor.call('GenerateTeamsRandom3');
  },
});

Template.GenerateTeamsRandom1.events({
  'click .GenerateTeamsRandom1'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsRandom1');
  },
});

Template.GenerateTeamsRandom2.events({
  'click .GenerateTeamsRandom2'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsRandom2');
  },
});

Template.GenerateTeamsRandom3.events({
  'click .GenerateTeamsRandom3'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsRandom3');
  },
});



Template.GenerateTeamsSocial.events({
  'click .GenerateTeamsSocial'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsSocial1');
    Meteor.call('GenerateTeamsSocial2');
    Meteor.call('GenerateTeamsSocial3');
  },
});

Template.GenerateTeamsSocial1.events({
  'click .GenerateTeamsSocial1'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsSocial1');
  },
});

Template.GenerateTeamsSocial2.events({
  'click .GenerateTeamsSocial2'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsSocial2');
  },
});

Template.GenerateTeamsSocial3.events({
  'click .GenerateTeamsSocial3'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsSocial3');
  },
});


Template.GenerateTeamsComp.events({
  'click .GenerateTeamsComp'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsComp1');
    Meteor.call('GenerateTeamsComp2');
    Meteor.call('GenerateTeamsComp3');
  },
});

Template.GenerateTeamsComp1.events({
  'click .GenerateTeamsComp1'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsComp1');
  },
});

Template.GenerateTeamsComp2.events({
  'click .GenerateTeamsComp2'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsComp2');
  },
});

Template.GenerateTeamsComp3.events({
  'click .GenerateTeamsComp3'() {
    // Call the method to generate the random teams
    Meteor.call('GenerateTeamsComp3');
  },
});



Template.printmatches.events({
  'click .printmatches'() {
    // Call the method to generate the random teams
    Meteor.call('printmatches');
  },
});

Template.TeamsImages.events({
  'click .TeamsImages'() {
    // Call the method to generate the random teams
    Meteor.call('TeamsImages');
  },
});