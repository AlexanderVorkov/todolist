define(['model/task']);

function Tasks(eventBus) {
    this.tasks = [];
    this.eventBus = eventBus;
}

Tasks.prototype.getServerTasks = function (currentUser) {
    $.ajax({
        url: '/tasks/' + currentUser.id,
        success: $.proxy(function (data) {
            console.log(data);
            this.eventBus.trigger(events['ADD_TASKS'], [data]);
        },this)
    })
};

Tasks.prototype.addTask = function (task) {
    var _task = new Task(task);
    this.tasks.push(_task);
    this.eventBus.trigger(events['TASK_ADDED'], [_task])
};

Tasks.prototype.deleteTaskById = function (id) {
    this.tasks = _.filter(this.tasks, function (task) {
        if (task.getId() == id) {
            task.destroy();
            return false;
        }
        return true
    })
};

Tasks.prototype.completedTaskById = function (id, is_completed) {
    var task = this.getTaskById(id);
    task.setCompleted(is_completed);
};

Tasks.prototype.addTasks = function (list) {
    _.each(list, function (task) {
        this.addTask(task);
    }, this);
    this.eventBus.trigger('tasksAdded', [this.getTasks()]);
};

Tasks.prototype.getTasks = function () {
    return this.tasks;
};

Tasks.prototype.getTaskById = function (id) {
    return _.find(this.tasks, function (task) {
        return task.getId() == id;
    })
};
Tasks.prototype.generateTaskId = function () {
    return this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
};
Tasks.prototype.updateTextById = function (text, task_id) {
    var task = this.getTaskById(task_id);
    task.setText(text);
};