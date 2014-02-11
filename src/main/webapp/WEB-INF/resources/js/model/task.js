function Task(task) {
    this.text = task.text;
    this.date = task.date;
    this.id = task.id;
    this.completed = task.completed || false;
    this.authorId = task.authorId;
}

Task.prototype.getCompleted = function () {
    return this.completed;
};

Task.prototype.setCompleted = function (is_completed) {
    this.completed = is_completed;
    app.eventBus.trigger(events['TASKS_COMPLETED'], [this]);
};

Task.prototype.setText = function(text){
    this.text = text;
    app.eventBus.trigger(events['TASK_TEXT_UPDATED'], [this]);
};

Task.prototype.getId = function () {
    return this.id;
};


Task.prototype.destroy = function () {
    app.eventBus.trigger(events['DELETED_TASK'], this.getId());
};
