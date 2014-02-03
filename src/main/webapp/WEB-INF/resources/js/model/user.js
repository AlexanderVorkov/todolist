//model currentUser
function ModelUser(name) {
    this.name = name;
}

//model currentUser
function ModelCurrentUser(name) {
    ModelCurrentUser.superproto.constructor.call(this, name);
}

inherit(ModelCurrentUser, ModelUser);
