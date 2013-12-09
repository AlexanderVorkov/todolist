function ViewTask(task) {
    this.templates = _.template($("#taskTemplate").text());
    this.id = task.getId();
    this.html = $(this.templates(task))
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
        eventBus.trigger(events['view-delete-task'], [this.id]);
    }, this))
    this.html.on('click', '[name=completed]', $.proxy(function () {
        eventBus.trigger(events['view-completed-task'], [this.id, true]);
    }, this))
    this.html.on('click', '[name=reopen]', $.proxy(function () {
        eventBus.trigger(events['view-reopen-task'], [this.id, false]);
    }, this))
    eventBus.on('deleted-task', deletedTaskHandlers);
    eventBus.on(events['tasks-completed'], deletedTaskHandlers);
    eventBus.on('task-text-updated', updateText);
    new ViewEditTask(this.html);
}

ViewTask.prototype.destroy = function (deletedTaskHandlers, updateText) {
    eventBus.off('deleted-task', deletedTaskHandlers);
    eventBus.off(events['tasks-completed'], deletedTaskHandlers);
    eventBus.off('task-text-updated', updateText);
    this.html.off('click');
    this.html.remove();
}

ViewTask.prototype.setText = function (text) {
    this.html.find('.text,[name=text]').html(text);
}

ViewTask.prototype.getHtml = function () {
    return this.html;
}