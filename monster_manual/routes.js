Router.route('/monsters', { name: 'monstersList' });

Router.route('/monsters/:name', {
    name: 'monsterView',
    data: function () {
        var name = this.params.name;
        var query = {name: name.replace('_', ' ')};
        return Monsters.findOne(query);
    }
});
