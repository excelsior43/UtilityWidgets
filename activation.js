$.widget("ib.ibactivation", $.ib.genericDependency, {
    triggerChange: function () {
        this.revertBackToInitialValue();
        var elem = this.getElement();
        if (this._getType() === "select") {
            elem.selectbox("disable");
        } else {
            elem.prop("readonly", true);
        }
   },
    revertChange: function () {
        var elem = this.getElement();
        if (this._getType() === "select") {
            elem.selectbox("enable");
        } else {
            elem.prop("readonly", false);
        }
    }
});
