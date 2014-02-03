define(['model/task']);

function CollectionTasks() {
    this.tasks = [];
}

CollectionTasks.prototype.getServerTasks = function(){
    $.ajax({
        url: '/tasks/0',
        success:function(data){
            console.log(data);
            eventBus.trigger(events['ADD_TASKS'], [data]);
        }
    })
}

CollectionTasks.prototype.addTask = function (task) {
    var _task = new ModelTask(task);
    this.tasks.push(_task);
    eventBus.trigger(events['TASK_ADDED'], [_task])
};

CollectionTasks.prototype.deleteTaskById = function (id) {
    this.tasks = _.filter(this.tasks, function (task) {
        if (task.getId() == id) {
            task.destroy();
            return false;
        }
        return true
    })
};

CollectionTasks.prototype.completedTaskById = function (id, is_completed) {
    var task = this.getTaskById(id);
    task.setCompleted(is_completed);
}

CollectionTasks.prototype.addTasks = function (list) {
    _.each(list, function (task) {
        this.addTask(task);
    }, this);
    eventBus.trigger('tasksAdded', [this.getTasks()]);
}

CollectionTasks.prototype.getTasks = function () {
    return this.tasks;
}

CollectionTasks.prototype.getTaskById = function (id) {
    return _.find(this.tasks, function (task) {
        return task.getId() == id;
    })
}
CollectionTasks.prototype.generateTaskId = function () {
    return this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
}
CollectionTasks.prototype.updateTextById = function (text, task_id) {
    var task = this.getTaskById(task_id);
    task.setText(text);
}