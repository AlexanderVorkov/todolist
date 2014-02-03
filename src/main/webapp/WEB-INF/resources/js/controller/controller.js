define(['model/collection-tasks', 'model/user', 'view/tasks', 'view/add-task', 'view/edit-task']);

var events = {
    'TASKS_COMPLETED': 'tasks-completed',
    'VIEW_TASK_UPDATE_TEXT': 'view-task-update-text',
    'VIEW_REOPEN_TASK': 'view-reopen-task',
    'VIEW_COMPLETED_TASK': 'view-completed-task',
    'VIEW_DELETE_TASK': 'view-delete-task',
    'TASK_ADDED': 'task-added',
    'VIEW_ADD_TASK': 'view-add-task',
    'ADD_TASKS': 'add-tasks',
    'DELETED_TASK': 'deleted-task',
    'TASK_TEXT_UPDATED': 'task-text-updated'
}

function ToDoListController() {
    this.currentUser;
    this.init();
}

ToDoListController.prototype.init = function () {
    this.tasks = new CollectionTasks();
    this.viewTasks = new ViewTasks();
    this.form = new ViewAddTask();

    eventBus.on(events['ADD_TASKS'], $.proxy(function (e, tasks) {
        this.addTasks(tasks);
    }, this.tasks));

    eventBus.on(events['VIEW_ADD_TASK'], $.proxy(function (e, val) {
        this.tasks.addTask({id: this.tasks.generateTaskId(), text: val, date: Date.now(), author: this.currentUser});
    }, this));

    eventBus.on(events['TASK_ADDED'], $.proxy(function (e, task) {
        var _viewTask = $.extend({
            authorIsMe: task.author == this.currentUser}, task);
        this.viewTasks.renderTask(_viewTask);
    }, this));

    eventBus.on(events['VIEW_DELETE_TASK'], $.proxy(function (e, task_id, is_completed) {
        var task = this.tasks.getTaskById(task_id);
        if (task.author == this.currentUser) {
            if (confirm("Are you sure you want to delete task")) {
                this.tasks.deleteTaskById(task_id);
            }
        }
    }, this));

    eventBus.on(events['VIEW_COMPLETED_TASK'], $.proxy(function (e, task_id, is_completed) {
        this.tasks.completedTaskById(task_id, is_completed);
    }, this));

    eventBus.on(events['VIEW_REOPEN_TASK'], $.proxy(function (e, task_id, is_completed) {
        this.tasks.completedTaskById(task_id, is_completed);
    }, this));

    eventBus.on(events['VIEW_TASK_UPDATE_TEXT'], $.proxy(function (e, val, task_id) {
        this.tasks.updateTextById(val, task_id);
        alert('task saved');
    }, this));

    eventBus.on(events['TASKS_COMPLETED'], $.proxy(function (e, task) {
        var _viewTask = $.extend({
            authorIsMe: task.author == this.currentUser}, task);
        this.viewTasks.renderTask(_viewTask);
    }, this));
}

//test
ToDoListController.prototype.testData = function () {
    this.currentUser = new ModelCurrentUser('TestUser');
    eventBus.trigger(events['ADD_TASKS'], [
        [
            {id: 1, text: 'test1', date: Date.now(), author: new ModelUser('Vasya')},
            {id: 2, text: 'test2', date: Date.now(), author: new ModelUser('Petya'), completed: true},
            {id: 3, text: 'test3', date: Date.now(), author: this.currentUser, completed: false},
            {id: 4, text: 'test4', date: Date.now(), author: new ModelUser('Vasy')},
            {id: 5, text: 'test5', date: Date.now(), author: this.currentUser, completed: true}
        ]
    ]);
}