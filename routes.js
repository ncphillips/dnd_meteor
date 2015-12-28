Router.configure({
    layoutTemplate: 'base'
});

Router.route('/', function(){
   this.render('homepage');
}, {name: 'homepage'});

Router.route('/monsters', function(){
    if (!Meteor.userId())
        return this.redirect('/');
    this.render('list_monster');
}, {name: 'monsters.list'});

Router.route('/monsters/:name', function(){
    if (!Meteor.userId())
        return this.redirect('/');

    var name = this.params.name;
    this.render('monster', {
        data: function () {
            var query = {name: name.replace('_', ' ')};
            var monster = Monsters.findOne(query);
            console.log(monster);
            return monster;

        }
    });
}, {name: 'monsters.view'});

Router.route('/encounters', function(){
    if (!Meteor.userId())
        return this.redirect('/');

    this.render('encounters_list');
}, {name: 'encounters.list'});

Router.route('/encounters/add', function(){
    this.render('encounters_add');
}, {name: 'encounters.add'});

Router.route('/encounters/:id', function(){
    renderEncounterIntoView.call(this, "encounters_view");
}, {name: 'encounters.view'});

Router.route('/encounters/:id/run', function () {
    renderEncounterIntoView.call(this, "encounters_run");
}, {name: 'encounters.run'});

function renderEncounterIntoView(view) {
    var userId = Meteor.userId();
    var encounterId = this.params.id;

    if (!userHasAccessToEncounter(userId, encounterId))
        return this.redirect('/');

    this.render(view, {data: getFindEncounterFunction(encounterId)});
}

function userHasAccessToEncounter(userId, encounterId) {
    var encounter = Encounters.findOne({_id: encounterId});
    return userId && encounter && (encounter.creator === userId || encounter.dungeonMaster === userId || encounter.players.indexOf(userId) >= 0);
}

function getFindEncounterFunction(id) {
    return function () {
        var encounter = Encounters.findOne({_id: id});
        Session.set("currentEncounter", encounter);
        return encounter;
    };
}
