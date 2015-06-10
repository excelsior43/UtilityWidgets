var theElementState_ = function () {};
theElementState_.prototype.theValue = null;
theElementState_.prototype.theStatus = null;
theElementState_.prototype.theClasses = [];
theElementState_.prototype.theType = null;
theElementState_.prototype.theText = null;

$.fn.observe = function (eventName, callback) {
    return this.each(function () {
        var el = this;
        $(document).on(eventName, function () {
            callback.apply(el, arguments);
        });
    });
};



$.widget("ib.genericDependency", {
    _create: function () {
        this._initialize();
    },
    getElement: function () {
        return this.element;
    },
    processDependencies: function () {
        
        if (this.checkCondition() === true) {
            this.triggerChange();
        } else {
            this.revertChange();
        }
        this.notifyOthers();
    },
    checkCondition: function () {
        var me = this;
        var theConditionCheckValue = false;
        $.each(this.options.conditions, function (index, item) {
            $.each(item, function (selector_, permittedValues_) {
                var theValue = me._getValue($(selector_));
                if ($.inArray(me.options.ALWAYS_FALSE, permittedValues_) > -1) {
                    theConditionCheckValue = false;
                } else if ($.inArray(me.options.ALWAYS_TRUE, permittedValues_) > -1) {
                    theConditionCheckValue = true;
                } else if ($.inArray(me.options.NOT_EMPTY, permittedValues_) > -1 ) {
                    var trimmedValue= $.trim(theValue);
                    if(trimmedValue.length>0){
                        theConditionCheckValue = true;
                    }
                }else {
                    $.each(permittedValues_, function (indx, value_) {
                        if (theValue === value_) {
                            theConditionCheckValue = true;
                        }
                    });
                }
            });
        });
        return theConditionCheckValue;
    },
    _getAllClasses: function (element_) {
        var theClasses = [];
        element_ = this.getElementIfUndefined(element_);
        var classList = element_.attr('class').split(/\s+/);
        $.each(classList, function (index, item) {
            theClasses.push(item);
        });
        return theClasses;
    },
    _preserveInitialState: function () {
        var initialState = new theElementState_();
        initialState.theType = this._getType();
        initialState.theValue = this._getValue();
        initialState.theStatus = this._getStatus();
        initialState.theClasses = this._getAllClasses();
        initialState.theText=this._getText();
        return initialState;
    },
    _initialize: function () {
        this._pre_init();
        this._setOption('_initialState', this._preserveInitialState());
        this._setOption('ALWAYS_TRUE', "ALWAYS_TRUE");
        this._setOption('ALWAYS_FALSE', "ALWAYS_FALSE");
        this._setOption('NOT_EMPTY', "NOT_EMPTY");
        this.captureAllConditions();
        this.bindCustomEventToMyself();
        this._print();
    },
    bindCustomEventToMyself: function () {
        var me = this;
        var thePluginName = me.widgetName;
        this.getElement().observe('changedMe' + thePluginName + me.getUniqueId() + 'Event', function (e) {
            var thePlugin = $(this).data(thePluginName);
            thePlugin._refresh();
        });
    },
    observeEventsOn: function (selector_, permittedValues_) {
        var me = this;
        var thePluginName = me.widgetName;
        $(selector_).on('change', function (e) {
            $(this).trigger('changedMe' + thePluginName + me.getUniqueId() + 'Event');
        });
    },
    captureAllConditions: function () {
        var conditions = $.parseJSON(this.getElement().attr(this.widgetName));
        this._setOption('conditions', conditions);
        var me = this;
        $.each(conditions, function (index, item) {
            $.each(item, function (selector_, permittedValues_) {
                me.observeEventsOn(selector_, permittedValues_);
            });
        });
    },
    _pre_init: function () {
    },
    _print: function () {
    },
    _getValue: function (element_) {
        element_ = this.getElementIfUndefined(element_);
        return element_.val();
    },
    _getText: function (element_) {
        element_ = this.getElementIfUndefined(element_);
        var theText="";
        if (this._getType() === 'select') {
          theText= $("#"+element_.attr("id")+" :selected").text();  
        }
        return theText;
    },
    _getType: function (element_) {
        element_ = this.getElementIfUndefined(element_)[0];

        return element_.tagName.toLowerCase() === "input" ? element_.type.toLowerCase() : element_.tagName.toLowerCase();
    },
    _getStatus: function (element_) {
        if (typeof element_ === 'undefined') element_ = this.getElement();
        var typ = null;
        if (this._getType() === 'select') {
            var theId = element_.attr('sb');
            if (typeof theId !== 'undefined') {
                typ = !($("#sbHolder_" + theId).hasClass('sbHolderDisabled'));
            }
        }
        if (null === typ) typ = element_.is(':enabled');

        return typ === true ? 'enabled' : 'disabled';
    },
    _refresh: function () {
        this.processDependencies();
    },
    addInitialClasses: function () {
        var element_ = this.getElement();
        var preservedClasses = this.options._initialState.theClasses;
        var currentClasses = this._getAllClasses();
        var removeClasses = $(currentClasses).not(preservedClasses).get();
        $.each(removeClasses, function (index, classs) {
            element_.removeClass(classs);
        });
    },
    getTranslatedId: function (element_) {
        element_ = this.getElementIfUndefined(element_);
        if (this._getType() === 'select') {
            var theId = element_.attr('sb');
            return "sbHolder_" + theId;
        } else {
            return element_.attr('id');
        }

    },
    revertStatus: function () {
        var preservedStatus = this.options._initialState.theStatus;
        var element_ = this.getElement();
        if (preservedStatus !== this._getStatus()) {
            var theTranslatedId = this.getTranslatedId();
            if (this._getType() === 'select') {
                if (preservedStatus === 'enabled') {
                    $("#" + theTranslatedId).addClass('sbHolderDisabled');
                } else {
                    $("#" + theTranslatedId).removeClass('sbHolderDisabled');
                }
            } else {
                if (preservedStatus === 'enabled') {
                    $("#" + theTranslatedId).prop("disabled", true);
                } else {
                    $("#" + theTranslatedId).prop("disabled", false);
                }
            }
        }
    },
    revertChange: function () {
    },
    getNearestLabel: function () {
        var theElement = this.getElement();
        var label_ = theElement.closest('.section_div').children("label").first();
        return label_;
    },
    enableMyself: function (element_) {
        element_ = this.getElementIfUndefined(element_);
    },
    disableMyself: function (element_) {
        element_ = this.getElementIfUndefined(element_);
    },
    getElementIfUndefined: function (element_) {
        if (typeof element_ === 'undefined') {
            element_ = this.getElement();
        }
        return element_;
    },
    getUniqueId: function () {
        var uid = this.options.uniqueId;
        if (typeof uid === 'undefined') {
            var num = Math.floor((Math.random() * 10000) + 1);
            uid = this.getElement().attr("id") + num;
            this._setOption('uniqueId', uid);
        }
        return uid;
    },
    revertBackToInitialValue:function(){
        var preservedValue = this.options._initialState.theValue;
        var element_ = this.getElement();
        if (preservedValue !== this._getValue()) {
            if (this._getType() === 'select') {
                element_.selectbox("change",preservedValue,this.options._initialState.theText);
            } else {
                element_.val(preservedValue);
            }
          }
        },
        notifyOthers:function(element_){
            element_=this.getElementIfUndefined();
            element_.trigger('change');
        }
        
});
