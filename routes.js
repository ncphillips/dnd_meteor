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
    var id = this.params.id;

    if(!Meteor.userId())
        return this.redirect('/');

    this.render('encounters_view', {
        data: function () {
            var query = {_id: id};
            var encounter = Encounters.findOne(query);
            Session.set("currentEncounter", encounter);
            return encounter;
        }
    });
}, {name: 'encounters.view'});
