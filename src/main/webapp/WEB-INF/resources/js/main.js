requirejs.config({
    baseUrl: 'js',
    paths: {
        model: 'model',
        view: 'view',
        controller: 'controller',
        jquery: 'lib/jquery-2.0.3.min',
        underscore: 'lib/underscore-min',
        util: 'helper/util'
    }
});

var eventBus;

requirejs(['jquery', 'underscore', 'util', 'controller/controller'], function () {
    $(function () {
        eventBus = $("body");
        var toDoListController = new ToDoListController();
        toDoListController.testData();
    });
})
