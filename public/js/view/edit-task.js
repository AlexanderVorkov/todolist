function ViewEditTask(el) {
    ViewEditTask.superproto.constructor.call(this, el);
}

inherit(ViewEditTask, AbstractViewForm);

ViewEditTask.prototype.submitTaskHandler = function (e) {
    var val = $.trim(this.textTask.val());
    if (val != '') {
        var id = this.formTask.attr('id');
        eventBus.trigger(events['view-task-update-text'], [val, id]);
    }
}