define(['model/tasks', 'model/users', 'view/tasks', 'view/add-task', 'view/edit-task']);

function ToDoListController() {
    this.eventBus = $("body");
    this.init();
}

ToDoListController.prototype.init = function () {
    this.users = new Users(this.eventBus);
    this.tasks = new Tasks(this.eventBus);
    this.viewTasks = new ViewTasks(this.eventBus);
    new ViewAddTask(this.eventBus);

    this.eventBus.on(events['START_APP'], $.proxy(function (e, tasks) {
        this.users.getServerUsers();
    }, this));

    this.eventBus.on(events['ADDED_USERS'], $.proxy(function (e, tasks) {
        this.tasks.getServerTasks(this.users.getCurrentUser());
    }, this));

    this.eventBus.on(events['ADD_TASKS'], $.proxy(function (e, tasks) {
        this.tasks.addTasks(tasks);
    }, this));

    this.eventBus.on(events['VIEW_ADD_TASK'], $.proxy(function (e, val) {
        this.tasks.addTask({id: this.tasks.generateTaskId(), text: val, date: Date.now(), author: this.users.getCurrentUser()});
    }, this));

    this.eventBus.on(events['TASK_ADDED'], $.proxy(function (e, task) {
        var _viewTask = $.extend({
            authorIsMe: task.authorId == this.users.getCurrentUser().id,
            authorName: this.users.getUserNameById(task.authorId)
        }, task);
        this.viewTasks.renderTask(_viewTask);
    }, this));

    this.eventBus.on(events['VIEW_DELETE_TASK'], $.proxy(function (e, task_id) {
        var task = this.tasks.getTaskById(task_id);
        if (task.authorId == this.users.getCurrentUser().id) {
            if (confirm("Are you sure you want to delete task")) {
                this.tasks.deleteTaskById(task_id);
            }
        }
    }, this));

    this.eventBus.on(events['VIEW_COMPLETED_TASK'], $.proxy(function (e, task_id, is_completed) {
        this.tasks.completedTaskById(task_id, is_completed);
    }, this));

    this.eventBus.on(events['VIEW_REOPEN_TASK'], $.proxy(function (e, task_id, is_completed) {
        this.tasks.completedTaskById(task_id, is_completed);
    }, this));

    this.eventBus.on(events['VIEW_TASK_UPDATE_TEXT'], $.proxy(function (e, val, task_id) {
        this.tasks.updateTextById(val, task_id);
        alert('task saved');
    }, this));

    this.eventBus.on(events['TASKS_COMPLETED'], $.proxy(function (e, task) {
        var _viewTask = $.extend({
            authorIsMe: task.authorId == this.users.getCurrentUser().id}, task);
        this.viewTasks.renderTask(_viewTask);
    }, this));

    this.eventBus.trigger(events['START_APP']);
};

/*
//test
ToDoListController.prototype.testData = function () {
    eventBus.trigger(events['ADD_TASKS'], [
        [
            {id: 1, text: 'test1', date: Date.now(), author: new ModelUser('Vasya')},
            {id: 2, text: 'test2', date: Date.now(), author: new ModelUser('Petya'), completed: true},
            {id: 3, text: 'test3', date: Date.now(), author: this.users.getCurrentUser(), completed: false},
            {id: 4, text: 'test4', date: Date.now(), author: new ModelUser('Vasy')},
            {id: 5, text: 'test5', date: Date.now(), author: this.users.getCurrentUser(), completed: true}
        ]
    ]);
}*/
