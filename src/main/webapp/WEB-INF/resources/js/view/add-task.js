function ViewAddTask(eventBus) {
    ViewAddTask.superproto.constructor.call(this, $('#addFormTodoList'));
    this.eventBus = eventBus;
}
define(['view/abstract-form'],function(){
    inherit(ViewAddTask, AbstractViewForm);

    ViewAddTask.prototype.submitTaskHandler = function () {
        var val = $.trim(this.textTask.val());
        if (val != '') {
            this.eventBus.trigger(events['VIEW_ADD_TASK'], val);
            this.clean();
        }
    };

    ViewAddTask.prototype.clean = function () {
        this.textTask.val('');
        this.submitTask.addClass('disabled');
    }
});
