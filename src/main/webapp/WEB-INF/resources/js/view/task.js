function ViewTask(task) {
    this.templates = _.template($("#taskTemplate").text());
    this.id = task.getId();
    var viewTask = $.extend({viewDate: (new Date(task.date)).toDateString()},task);
    this.html = $(this.templates(viewTask));
    this.addHandlers()
}

ViewTask.prototype.addHandlers = function () {
    var deletedTaskHandlers = $.proxy(function (e, task_id) {
        task_id = task_id.id || task_id;
        if (this.id == task_id) {
            this.destroy(deletedTaskHandlers, updateText);
        }
    }, this);

    var updateText = $.proxy(function (e, task) {
        if(this.id == task.id){
            this.setText(task.text);
        }
    }, this);

    this.html.on('click', '[name=delete]', $.proxy(function () {
        eventBus.trigger(events['VIEW_DELETE_TASK'], [this.id]);
    }, this))
    this.html.on('click', '[name=completed]', $.proxy(function () {
        eventBus.trigger(events['VIEW_COMPLETED_TASK'], [this.id, true]);
    }, this))
    this.html.on('click', '[name=reopen]', $.proxy(function () {
        eventBus.trigger(events['VIEW_REOPEN_TASK'], [this.id, false]);
    }, this))
    eventBus.on(events['DELETED_TASK'], deletedTaskHandlers);
    eventBus.on(events['TASKS_COMPLETED'], deletedTaskHandlers);
    eventBus.on(events['TASK_TEXT_UPDATED'], updateText);
    new ViewEditTask(this.html);
}

ViewTask.prototype.destroy = function (deletedTaskHandlers, updateText) {
    eventBus.off(events['DELETED_TASK'], deletedTaskHandlers);
    eventBus.off(events['TASKS_COMPLETED'], deletedTaskHandlers);
    eventBus.off(events['TASK_TEXT_UPDATED'], updateText);
    this.html.off('click');
    this.html.remove();
}

ViewTask.prototype.setText = function (text) {
    this.html.find('.text,[name=text]').html(text);
}

ViewTask.prototype.getHtml = function () {
    return this.html;
}