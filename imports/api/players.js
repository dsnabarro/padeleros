import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Players = new Mongo.Collection('players');

var Schemas = {};

Schemas.Players = new SimpleSchema({
  name: {
    type: String,
    label: "name",
    max: 200,
    index: true,
    unique: true,
  },
  gender: {
    type: String,
    label: "gender",
    allowedValues: ['Male', 'male', 'Female', 'female'],
  },
  ability: {
    type: Number,
    label: "ability",
    min: 0,
    max: 6,
    decimal: true,
  },
  checked: {
    type: Boolean,
    optional: true,
  },
  random1: {
  type: Number,
  decimal: true,
  optional: true,
},
  random2: {
  type: Number,
  decimal: true,
  optional: true,
},
  random3: {
  type: Number,
  decimal: true,
  optional: true,
},
  bucket: {
  type: Number,
  decimal: true,
  optional: true,
},
  CompRand: {
  type: Number,
  decimal: true,
  optional: true,
},
});

Players.attachSchema(Schemas.Players);

Players.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});
  

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('players', function playersPublication() {
    return Players.find();
  });
}

Meteor.methods({
'players.insert'(name, gender, ability ) {

    Players.insert({
      name,
      gender,
      ability,
      });

  },
    
'players.remove'(taskId) {
    check(taskId, String);
    Players.remove(taskId);
    alert("It's too late now, but deleting a player is irreversible. You can add them again though");
    
  },
  
  'players.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Players.update(taskId, { $set:  {checked: setChecked }});
  },
  
  'players.checkall'(IsChecked) {
    
  const checkall2 = Players.find().fetch();
  checkall2.forEach(function(player) {
  Players.update(player._id, { $set: { checked: true } });
  });
},
  
  'players.uncheckall'(IsChecked) {
  
const checkall2 = Players.find().fetch();
checkall2.forEach(function(player) {
Players.update(player._id, { $set: { checked: false } });
});
},


  'GenerateTeamsRandom1'( ) {
  Players.update({}, {$set: {random1: 0}}, {multi: true});

  
  const teams1 = Players.find({checked: true}).fetch();
  teams1.forEach(function(player) {
  Players.update(player._id, {$set: {random1: Math.random()}});
  });
},

  'GenerateTeamsRandom2'( ) {
  Players.update({}, {$set: {random2: 0}}, {multi: true});

  const teams1 = Players.find({checked: true}).fetch();
  teams1.forEach(function(player) {
  Players.update(player._id, {$set: {random2: Math.random()}});
  });
},

  'GenerateTeamsRandom3'( ) {
  Players.update({}, {$set: {random3: 0}}, {multi: true});
  
  const teams1 = Players.find({checked: true}).fetch();
  teams1.forEach(function(player) {
  Players.update(player._id, {$set: {random3: Math.random()}});
  });
},



  'GenerateTeamsSocial1'( ) {
  // clear previous random numbers
  Players.update({}, {$set: {bucket: 0}}, {multi: true});
  Players.update({}, {$set: {random1: 0}}, {multi: true});

  
  //Teams1
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Find who is playing and rank by ability 1-6
  var teams1 = Players.find({checked: true}, { sort: { ability: 1 }}).fetch();

  
  //declare variables to be used in matching matchs
  var NumberPlayers = Players.find({checked: true}).count();
  var NumPlayersBucket = NumberPlayers / 2;

  // set bucket number ranked by ability
  teams1.forEach(function(player, i = 1) {
  Players.update(player._id, {$set: {bucket: i}});
  });
  
  // allocate players a bucket number up to No. of players
  teams1.forEach(function(player) {
  Players.update(player._id, {$inc: {bucket: 1}});
  });

  // Create new array for 1st bucket
  var teams1Bucket1 = Players.find({bucket: {$lt: NumPlayersBucket +0.1, $gt: 0.1}}, { sort: { bucket: 1 }}).fetch();
  var teams1Bucket2 = Players.find({bucket: {$gt: NumPlayersBucket +0.1 }}, { sort: { bucket: 1 }}).fetch();

  
  // set bucket number for first bucket
  teams1Bucket1.forEach(function(player) {
  Players.update(player._id, {$set: {bucket: 1}});
  });

  
  // set bucket number for second bucket
  teams1Bucket2.forEach(function(player) {
  Players.update(player._id, {$set: {bucket: 2}});
  });

  // set random number for bucket1
  teams1Bucket1.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {random1: Math.random()* (0.5 - 0) + 0}});
  });  
  
  // set random number for bucket2
  teams1Bucket2.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {random1: Math.random()* (1 - 0.5) + 0.5}});
  });  
},

  'GenerateTeamsSocial2'( ) {
  // clear previous random numbers
  Players.update({}, {$set: {bucket: 0}}, {multi: true});
  Players.update({}, {$set: {random2: 0}}, {multi: true});

  
  //Teams2
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Find who is playing and rank by ability 1-6
  var teams2 = Players.find({checked: true}, { sort: { ability: 1 }}).fetch();

  
  //declare variables to be used in matching matchs
  var NumberPlayers = Players.find({checked: true}).count();
  var NumPlayersBucket = NumberPlayers / 2;

  // set bucket number ranked by ability
  teams2.forEach(function(player, i = 1) {
  Players.update(player._id, {$set: {bucket: i}});
  });
  
  // allocate players a bucket number up to No. of players
  teams2.forEach(function(player) {
  Players.update(player._id, {$inc: {bucket: 1}});
  });

  // Create new array for 1st bucket
  var teams2Bucket1 = Players.find({bucket: {$lt: NumPlayersBucket +0.1, $gt: 0.1}}, { sort: { bucket: 1 }}).fetch();
  var teams2Bucket2 = Players.find({bucket: {$gt: NumPlayersBucket +0.1 }}, { sort: { bucket: 1 }}).fetch();

  
  // set bucket number for first bucket
  teams2Bucket1.forEach(function(player) {
  Players.update(player._id, {$set: {bucket: 1}});
  });

  
  // set bucket number for second bucket
  teams2Bucket2.forEach(function(player) {
  Players.update(player._id, {$set: {bucket: 2}});
  });

  // set random number for bucket1
  teams2Bucket1.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {random2: Math.random()* (0.5 - 0) + 0}});
  });  
  
  // set random number for bucket2
  teams2Bucket2.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {random2: Math.random()* (1 - 0.5) + 0.5}});
  });  
},

 'GenerateTeamsSocial3'( ) {
  // clear previous random numbers
  Players.update({}, {$set: {bucket: 0}}, {multi: true});
  Players.update({}, {$set: {random3: 0}}, {multi: true});

  
  //Teams3
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Find who is playing and rank by ability 1-6
  var teams3 = Players.find({checked: true}, { sort: { ability: 1 }}).fetch();

  
  //declare variables to be used in matching matchs
  var NumberPlayers = Players.find({checked: true}).count();
  var NumPlayersBucket = NumberPlayers / 2;

  // set bucket number ranked by ability
  teams3.forEach(function(player, i = 1) {
  Players.update(player._id, {$set: {bucket: i}});
  });
  
  // allocate players a bucket number up to No. of players
  teams3.forEach(function(player) {
  Players.update(player._id, {$inc: {bucket: 1}});
  });

  // Create new array for 1st bucket
  var teams3Bucket1 = Players.find({bucket: {$lt: NumPlayersBucket +0.1, $gt: 0.1}}, { sort: { bucket: 1 }}).fetch();
  var teams3Bucket2 = Players.find({bucket: {$gt: NumPlayersBucket +0.1 }}, { sort: { bucket: 1 }}).fetch();

  
  // set bucket number for first bucket
  teams3Bucket1.forEach(function(player) {
  Players.update(player._id, {$set: {bucket: 1}});
  });

  
  // set bucket number for second bucket
  teams3Bucket2.forEach(function(player) {
  Players.update(player._id, {$set: {bucket: 2}});
  });

  // set random number for bucket1
  teams3Bucket1.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {random3: Math.random()* (0.5 - 0) + 0}});
  });  
  
  // set random number for bucket2
  teams3Bucket2.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {random3: Math.random()* (1 - 0.5) + 0.5}});
  });  
},



  'GenerateTeamsComp1'( ) {
  // clear previous random numbers
  Players.update({}, {$set: {random1: 0}}, {multi: true});
  

  //Teams1
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Find who is playing and rank by ability 1-6
  var teams1 = Players.find({checked: true}).fetch();

  teams1.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {CompRand: Math.random()}});
  });  
  
  teams1 = Players.find({checked: true}, { sort: { ability: 1, CompRand: 1 }}).fetch();
  
  // now assign sequential number
  teams1.forEach(function(player, i =1) {
  Players.update(player._id, {$set: {random1: i}});
  });
  
  // increment random 1 so not zero based
  teams1.forEach(function(player) {
  Players.update(player._id, {$inc: {random1: 1}});
  });
},

  'GenerateTeamsComp2'( ) {
  // clear previous random numbers
  Players.update({}, {$set: {random2: 0}}, {multi: true});
  

  //Teams2
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Find who is playing and rank by ability 1-6
  var teams2 = Players.find({checked: true}).fetch();

  teams2.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {CompRand: Math.random()}});
  });  
  
  teams2 = Players.find({checked: true}, { sort: { ability: 1, CompRand: 1 }}).fetch();
  
  // now assign sequential number
  teams2.forEach(function(player, i =1) {
  Players.update(player._id, {$set: {random2: i}});
  });
  
  // increment random 1 so not zero based
  teams2.forEach(function(player) {
  Players.update(player._id, {$inc: {random2: 1}});
  });
},

  'GenerateTeamsComp3'( ) {
  // clear previous random numbers
  Players.update({}, {$set: {random3: 0}}, {multi: true});
  

  //Teams3
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Find who is playing and rank by ability 1-6
  var teams3 = Players.find({checked: true}).fetch();

  teams3.forEach(function(player, min, max) {
  Players.update(player._id, {$set: {CompRand: Math.random()}});
  });  
  
  teams3 = Players.find({checked: true}, { sort: { ability: 1, CompRand: 1 }}).fetch();
  
  // now assign sequential number
  teams3.forEach(function(player, i =1) {
  Players.update(player._id, {$set: {random3: i}});
  });
  
  // increment random 1 so not zero based
  teams3.forEach(function(player) {
  Players.update(player._id, {$inc: {random3: 1}});
  });
},

  'players.RemoveMatches'( ) {
  Players.update({}, {$set: {random1: 0}}, {multi: true});
  Players.update({}, {$set: {random2: 0}}, {multi: true});  
  Players.update({}, {$set: {random3: 0}}, {multi: true});  
},

  'printmatches'() {
    window.print();
},

  'TeamsImages'( ) {

},

});

