function ViewAddTask() {
    ViewAddTask.superproto.constructor.call(this, $('#addFormTodoList'));
}
define(['view/abstract-form'],function(){
    inherit(ViewAddTask, AbstractViewForm);

    ViewAddTask.prototype.submitTaskHandler = function (e) {
        var val = $.trim(this.textTask.val());
        if (val != '') {
            eventBus.trigger(events['VIEW_ADD_TASK'], val);
            this.clean();
        }
    }

    ViewAddTask.prototype.clean = function () {
        this.textTask.val('');
        this.submitTask.addClass('disabled');
    }
});
