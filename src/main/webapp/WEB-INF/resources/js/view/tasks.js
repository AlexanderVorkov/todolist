define(['view/task','view/empty-item']);
function ViewTasks(eventBus) {
    this.tasksArea = $('#tasksArea');
    this.tasks = [];
    this.emptyList();
    this.eventBus = eventBus;
}

ViewTasks.prototype.renderTask = function (task) {
    var _task = new ViewTask(task, this.eventBus);
    if (!this.tasks.length) {
        this.tasksArea.html('');
    }
    this.tasks.push(_task);
    if (task.getCompleted()) {
        this.tasksArea.append(_task.getHtml());
    } else {
        this.tasksArea.prepend(_task.getHtml());
    }
};

ViewTasks.prototype.emptyList = function () {
    var _task = new ViewEmptyItem();
    this.tasksArea.prepend(_task.getHtml());
};