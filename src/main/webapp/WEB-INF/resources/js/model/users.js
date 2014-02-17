define(['model/user']);

function Users(eventBus) {
    this.eventBus = eventBus;
    this.users = {};
    this.currentUser = '';
}

Users.prototype.getServerUsers = function () {
    $.ajax({
        url: '/users/',
        success: $.proxy(function (data) {
            console.log(data);
            this.setUsers(data);
        }, this)
    });
};

Users.prototype.setUsers = function(data){
    this.users = _.map(data, function(user){
        return new User(user.name, user.id, !!user.isOwner);
    });
    this.currentUser = _.find(this.users, function (user) {
        return user.isOwner;
    }, this);

    this.eventBus.trigger(events['ADDED_USERS']);
};

Users.prototype.getCurrentUser = function () {
    return this.currentUser;
};

Users.prototype.getUserById = function (user_id) {
    return this.users[user_id];
};

Users.prototype.getUserNameById = function (user_id) {
    return this.getUserById(user_id).name;
};