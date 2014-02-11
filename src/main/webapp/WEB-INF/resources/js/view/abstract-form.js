function AbstractViewForm(el) {
    this.formTask = el;
    this.textTask = this.formTask.find('textarea');
    this.submitTask = this.formTask.find('button[type=submit]');
    this.addHandlers();
}

AbstractViewForm.prototype.addHandlers = function () {
    this.textTask.on('keyup', $.proxy(this._keyUpHandler, this));
    this.submitTask.click($.proxy(this.submitTaskHandler, this));
};

AbstractViewForm.prototype._keyUpHandler = function () {
    if ($.trim(this.textTask.val()) != '') {
        this.submitTask.removeClass('disabled');
    } else {
        this.submitTask.addClass('disabled');
    }
};

AbstractViewForm.prototype.submitTaskHandler = function (e) {};
