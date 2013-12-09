function ToDoListController() {
    this.currentUser;
    this.init();
}

ToDoListController.prototype.init = function () {
    this.tasks = new CollectionTasks();
    this.viewTasks = new ViewTasks();
    this.form = new ViewAddFormTodoList();

    eventBus.on(events['add-tasks'], $.proxy(function (e, tasks) {
        this.addTasks(tasks);
    }, this.tasks));

    eventBus.on(events['view-add-task'], $.proxy(function (e, val) {
        this.tasks.addTask({id: this.tasks.generateTaskId(), text: val, date: Date.now(), author: this.currentUser});
    }, this));

    eventBus.on(events['task-added'], $.proxy(function (e, task) {
        var _viewTask = $.extend({
            viewDate: (new Date(task.date)).toDateString(),
            authorIsMe: task.author == this.currentUser}, task);
        this.viewTasks.renderTask(_viewTask);
    }, this));

    eventBus.on(events['view-delete-task'], $.proxy(function (e, task_id, is_completed) {
        var task = this.tasks.getTaskById(task_id);
        if (task.author == this.currentUser) {
            if (confirm("Are you sure you want to delete task")) {
                this.tasks.deleteTaskById(task_id);
            }
        }
    }, this));

    eventBus.on(events['view-completed-task'], $.proxy(function (e, task_id, is_completed) {
        this.tasks.completedTaskById(task_id, is_completed);
    }, this));

    eventBus.on(events['view-reopen-task'], $.proxy(function (e, task_id, is_completed) {
        this.tasks.completedTaskById(task_id, is_completed);
    }, this));

    eventBus.on(events['view-task-update-text'], $.proxy(function (e, val, task_id) {
        this.tasks.updateTextById(val, task_id);
        alert('task saved');
    }, this));

    eventBus.on(events['tasks-completed'], $.proxy(function (e, task) {
        var _viewTask = $.extend({
            viewDate: (new Date(task.date)).toDateString(),
            authorIsMe: task.author == this.currentUser}, task);
        this.viewTasks.renderTask(_viewTask);
    }, this));

    //TODO: delete test
    this.test();
}
//test
ToDoListController.prototype.test = function () {
    this.currentUser = new ModelCurrentUser('TestUser');
    eventBus.trigger(events['add-tasks'], [
        [
            {id: 1, text: 'test1', date: Date.now(), author: new ModelUser('Vasya')},
            {id: 2, text: 'test2', date: Date.now(), author: new ModelUser('Petya'), completed: true},
            {id: 3, text: 'test3', date: Date.now(), author: this.currentUser, completed: false},
            {id: 4, text: 'test4', date: Date.now(), author: new ModelUser('Vasy')},
            {id: 5, text: 'test5', date: Date.now(), author: this.currentUser, completed: true}
        ]
    ]);
}

var toDoListController;
var eventBus;
var events = {
    'tasks-completed': 'tasks-completed',
    'view-task-update-text': 'view-task-update-text',
    'view-reopen-task': 'view-reopen-task',
    'view-completed-task': 'view-completed-task',
    'view-delete-task': 'view-delete-task',
    'task-added': 'task-added',
    'view-add-task': 'view-add-task',
    'add-tasks': 'add-tasks'
}

$(function () {
    eventBus = $("body");
    toDoListController = new ToDoListController();
});