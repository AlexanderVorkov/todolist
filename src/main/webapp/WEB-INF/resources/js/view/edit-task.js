define(['view/abstract-form'],function(){
    inherit(ViewEditTask, AbstractViewForm);

    ViewEditTask.prototype.submitTaskHandler = function () {
        var val = $.trim(this.textTask.val());
        if (val != '') {
            var id = this.formTask.attr('id');
            app.eventBus.trigger(events['VIEW_TASK_UPDATE_TEXT'], [val, id]);
        }
    }
});
function ViewEditTask(el) {
    ViewEditTask.superproto.constructor.call(this, el);
}