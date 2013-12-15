function ModelTask(task) {
    this.text = task.text;
    this.date = task.date;
    this.id = task.id;
    this.completed = task.completed || false;
    this.author = task.author;
}

ModelTask.prototype.getCompleted = function () {
    return this.completed;
}

ModelTask.prototype.setCompleted = function (is_completed) {
    this.completed = is_completed;
    eventBus.trigger(events['TASKS_COMPLETED'], [this]);
}

ModelTask.prototype.setText = function(text){
    this.text = text;
    eventBus.trigger(events['TASK_TEXT_UPDATED'], [this]);
}

ModelTask.prototype.getId = function () {
    return this.id;
}


ModelTask.prototype.destroy = function () {
    eventBus.trigger(events['DELETED_TASK'], this.getId());
}
