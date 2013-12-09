//model currentUser
function ModelUser(name) {
    this.name = name;
}

//model currentUser
function ModelCurrentUser(name) {
    ModelUser.call(this, name);
}

inherit(ModelCurrentUser, ModelUser);
