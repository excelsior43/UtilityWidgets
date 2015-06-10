var emptyArrayValues = [undefined, "-1", ""];
$.widget("ib.ibmandatory", $.ib.genericDependency, {
    //$.ui.dialog.prototype._create.call(this);
    _pre_init: function () {
        this._setOption('emptyArray', emptyArrayValues);
    },
    triggerChange: function () {
        //log("mandatory triggering change in BEGIN");
        var theTranslatedId = this.getTranslatedId();
        var theElement = this.getElement();
        if (theElement.hasClass('ibmandatory') === false) {
            theElement.addClass('ibmandatory');
        }
        this.addStar();
        //log("mandatory triggering change in END");
        this.customValidate();
    },
    revertChange: function () {
        var theTranslatedId = this.getTranslatedId();
        //log("mandatoryPlugin reverting back changes revertChange() BEGIN");
        $("#" + theTranslatedId).validationEngine('hide');
        this.addInitialClasses();
        this.removeStar();
        //log("mandatoryPlugin reverting back changes revertChange() END");
    },
    hasEmptyValue: function (element_) {
        element_ = this.getElementIfUndefined(element_);
        var value = this._getValue(element_);
        return $.inArray(value, this.options.emptyArray);
    },
    customValidate: function () {
        var theTranslatedId = this.getTranslatedId();
        var theElement = this.getElement();
        if (this.hasEmptyValue() !== -1) {
            theElement.validationEngine('showPrompt', "mandatory", 'error', 'topLeft', true, $("#" + theTranslatedId));
            return false;
        } else {
            return true;
        }
    },
    addStar: function (label_) {
        if (typeof label_ === 'undefined') label_ = this.getNearestLabel();
        var theText = $.trim(label_.html());
        if (theText.slice(-1) !== '*') {
            theText = theText + " *";
            label_.html(theText);
        }
    },
    removeStar: function (label_) {
        if (typeof label_ === 'undefined') label_ = this.getNearestLabel();
        var theText = $.trim(label_.html());
        if (theText.slice(-1) === '*') {
            theText = theText.substr(0, theText.length - 1);
            label_.html(theText);
        }
    }
});
