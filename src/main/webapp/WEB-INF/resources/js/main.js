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

requirejs(['jquery', 'underscore', 'util', 'controller/controller', 'controller/events'], function () {
    $(function () {
        window.app = new ToDoListController();
        /*toDoListController.testData();*/
    });
});
