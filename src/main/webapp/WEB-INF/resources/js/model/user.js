//model currentUser
function ModelUser(name, id, isOwner) {
    this.name = name;
    this.id = id;
    this.isOwner = isOwner;
}

//model currentUser
function ModelCurrentUser(name, id) {
    ModelCurrentUser.superproto.constructor.call(this, name, id);
}

inherit(ModelCurrentUser, ModelUser);
