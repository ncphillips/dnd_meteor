var encountersViewOptions = {
    name: 'encountersView',
    action: function(){
        this.render('encountersView', {data: getFindEncounterFunction(this.params.id)});
    }
};

var encountersRunOptions = {
    name: 'encountersRun',
    action: function(){
        this.render('encountersRun', {data: getFindEncounterFunction(this.params.id)});
    }
};

Router.route('/encounters',         {name: 'encountersList'});
Router.route('/encounters/add',     {name: 'encountersAdd'});
Router.route('/encounters/:id',     encountersViewOptions);
Router.route('/encounters/:id/run', encountersRunOptions);


Router.onBeforeAction(function(){
    if (encounterAccess(Meteor.userId(), this.params.id)) {
        this.next();
    } else {
        this.redirect('encountersList');
    }
}, {only: ['encountersView', 'encountersRun']});

// Helper Functions
function encounterAccess(userId, encounterId) {
    var encounter = Encounters.findOne({_id: encounterId});
    return encounter && (encounter.creator === userId || encounter.dungeonMaster === userId || encounter.players.indexOf(userId) >= 0);
}

function getFindEncounterFunction(id) {
    return function () {
        var encounter = Encounters.findOne({_id: id});
        Session.set("currentEncounter", encounter);
        return encounter;
    };
}

