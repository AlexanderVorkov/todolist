function ViewAddFormTodoList() {
    ViewAddFormTodoList.superproto.constructor.call(this, $('#addFormTodoList'));
}

inherit(ViewAddFormTodoList, AbstractViewForm);

ViewAddFormTodoList.prototype.submitTaskHandler = function (e) {
    var val = $.trim(this.textTask.val());
    if (val != '') {
        eventBus.trigger(events['view-add-task'], val);
        this.clean();
    }
}

ViewAddFormTodoList.prototype.clean = function () {
    this.textTask.val('');
    this.submitTask.addClass('disabled');
}