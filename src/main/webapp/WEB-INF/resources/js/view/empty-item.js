function ViewEmptyItem() {
    this.templates = _.template($("#emptyListTemplate").text());
    this.html = $(this.templates());
}

ViewEmptyItem.prototype.getHtml = function () {
    return this.html;
};