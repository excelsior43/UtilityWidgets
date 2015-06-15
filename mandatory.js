/**************************************************************VALIDATION UTIL BEGIN****************************************/
var ValidationUtil = function (fullClzStr, operation, clz) {
    var options={
      classList : [],
      validationClassIndex : -1,
      classesInsideValidate : [],
      ValidationSubClassIndex : -1
    };

    var trim= function (stringToTrim) {
        return stringToTrim.replace(/^\s+|\s+$/g,"");
    };
    var checkIfValidateClassExist = function (theClassName) {
      theClassName=trim(theClassName);
      if(theClassName.match(/validate\[/)!==null){
          return true;
      }
    };
  var readClassesinsideValidate=function(theClass){
      var theLen="validate[".length;
       var lastIndex= theClass.lastIndexOf("]")  ;
      var valclass=theClass.substr(theLen , lastIndex -theLen);
      options.classesInsideValidate=valclass.split(",");
       var strLen = options.classesInsideValidate.length;
       for (i = 0; i < strLen; i++) {
       options.classesInsideValidate[i]=trim(options.classesInsideValidate[i]);
        if(options.clasws===options.classesInsideValidate[i]){
            options.ValidationSubClassIndex=i;
         }
        }
      
  };
  var processClassesForValidation = function (fullClzStr) {
        //options.classList = fullClzStr.split(/\s+/);
		options.classList=fullClzStr;
        var strLen=options.classList.length;
        var flag=true;
        for (i = 0; i < strLen && flag===true; i++) {
			options.classList[i]=trim(options.classList[i]);
            if (checkIfValidateClassExist(options.classList[i]) === true) {
                options.validationClassIndex=i;
                readClassesinsideValidate(options.classList[i]);
                flag=false;
            }
        }
        
    };
    var makeValidationClasses = function(){
      var res="";
      if(options.classesInsideValidate.length>0 ){
        res=options.classesInsideValidate.join(",");
        res="validate["+res+"]";
      }
      if(options.validationClassIndex===-1 && options.classesInsideValidate.length>0 ){
        options.classList.push(res);
      }else if(options.validationClassIndex >-1 && options.classesInsideValidate.length === 0){
        options.classList[options.validationClassIndex]="";
      }else{
        options.classList[options.validationClassIndex]=res;
      }
    };
    this.process = function (fullClassString, operation, clasws) {
        options.clasws=trim(clasws);
        //fullClassString = fullClassString.replace(/\s\s+/g, ' ');
        processClassesForValidation(fullClassString);
        this.processOperation(operation);
        makeValidationClasses();
        if(options.classList.length>0)
          return options.classList;
        else return [];
    };
    var addValidationClass = function(){
      if(options.ValidationSubClassIndex===-1){
        options.classesInsideValidate.push(options.clasws);
      }
    };
    var removeValidationClass=function(){
      if(options.ValidationSubClassIndex!==-1){
        options.classesInsideValidate.splice(options.ValidationSubClassIndex, 1);
      }
    };
    this.processOperation=function(operation){
      if(operation==="ADD"){
        addValidationClass();
      }else if(operation==="REMOVE"){
        removeValidationClass();
      }
    };
  return this.process(fullClzStr, operation, clz);
};

/**************************************************************VALIDATION UTIL END  ****************************************/


$.widget("ib.ibmandatory", $.ib.genericDependency, {
	getNearestLabel: function () {
        var theElement = this.getElement();
		var label_ =null;
		log("inspection : "+theElement.attr("id")); 
		if(theElement.parent().find(".lbl_idfy_clz:first-child").size()===1){
			label_=theElement.parent().find(".lbl_idfy_clz:first-child");
			log("found in first level "); 
		}else if(theElement.parent().parent().find(".lbl_idfy_clz:first-child").size()===1){
			label_=theElement.parent().parent().find(".lbl_idfy_clz:first-child");
			log("found in second level "); 
		}else if(theElement.parent().parent().parent().find(".lbl_idfy_clz:first-child").size()===1){
			label_=theElement.parent().parent().parent().find(".lbl_idfy_clz:first-child");
			log("found in third level "); 
		}else{
				log("LABEL NOT FOUND"); 
				log(theElement); 
		}
		/*if(label_===null){
			if(theElement.parent().hasClass("info_content") === true){
				log("log 1");
				if(theElement.parent().find(".asterix:first-child").size()===0){
					label_=theElement.parent().parent().find(".asterix:first-child");
				}else{
					label_=theElement.parent().find(".asterix:first-child");
				}
			}else if(theElement.parent().hasClass("section_div") === true){
				log("log 2");
				label_ = theElement.parent().children("asterix:first-child");
			}else{
				log("log 3");
				label_ = theElement.closest('.section_div').children("asterix:first-child"); 
				log("log 4");
				//if(typeof label_.find(".asterix").first() === 'undefined'){
				//	label_ = label_.find(".asterix").first();
				//}
			}
		}*/
		return label_;
    },
    _pre_init: function () {
        this._setOption('theLogicalOperator', "OR");
    },
	addTheseClasses : function(theElement,allClasses){
		theElement.removeClass();
		$.each(allClasses,function(index,elem){
			theElement.addClass(elem);
		});
		var theForm=$('#UpdateCustDtlsForm');
		/***********remove this section in production begin************/ 
		theForm.validationEngine('detach');
		theForm.validationEngine('attach');
		/***********remove this section in production end *************/
	},
    triggerChange: function () {
		log("inside triggerChange... ");
        //var theTranslatedId = this.getTranslatedId();
        var theElement = this.getElement();
		if (theElement.hasClass('ibmandatory') === false) {
			var allClasses=this._getAllClasses(theElement);
			allClasses=new ValidationUtil(allClasses, "ADD", "required"); 
			allClasses.push('ibmandatory');
			this.addTheseClasses(theElement,allClasses);
			this.addMandatory();
			//this.isInValidState();
        }
        
    },
    revertChange: function () {
		log("inside revertChange... ");
		var theElement = this.getElement();
		if (theElement.hasClass('ibmandatory') === true){
			theElement.removeClass('ibmandatory');
			/*var allClasses=this._getAllClasses(theElement);
			allClasses=new ValidationUtil(allClasses, "REMOVE", "required");*/
			//var theTranslatedId = this.getTranslatedId();
			//$("#" + theTranslatedId).validationEngine('hide');
			this.addInitialClasses();
			this.removeMandatory();
		}
    },
    hasEmptyValue: function (element_) {
        element_ = this.getElementIfUndefined(element_);
        var value = this._getValue(element_);
        return $.inArray(value, this.options.emptyArray);
    },
    isInValidState: function () {
        //var theTranslatedId = this.getTranslatedId(); 
        var theElement = this.getElement();
        if (this.hasEmptyValue() !== -1) {
            return false;
        } else {
            return true;
        }
    },
    addMandatory: function (label_) {
        if (typeof label_ === 'undefined') 
			label_ = this.getNearestLabel();
		if(label_!==null && label_.hasClass("mandatoryAtx")===false){
			label_.addClass("mandatoryAtx");
		}
    },
    removeMandatory: function (label_) {
        if (typeof label_ === 'undefined') 
			label_ = this.getNearestLabel();
		if(label_!==null &&  label_.hasClass("mandatoryAtx")===true){
			label_.removeClass("mandatoryAtx");
		}
    }
});
$.widget("ib.ibactivation", $.ib.genericDependency, {
	_pre_init: function () {
        this._setOption('theLogicalOperator', "OR");
    },
    triggerChange: function () {
        var elem = this.getElement();
		if (this._getType() === "select") {
            elem.selectbox("enable");
        } else {
            elem.prop("readonly", false);
			if(elem.hasClass('DsbInput')===true){
				elem.removeClass("DsbInput");
			}
        }
    },
    revertChange: function () {
		this.revertBackToInitialValue();
        var elem = this.getElement();
		if (this._getType() === "select") {
            elem.selectbox("disable");
        } else {
            elem.prop("readonly", true);
			if(elem.hasClass('DsbInput')===false){
				elem.addClass("DsbInput");
			}
			
        }
    }
});
$.widget("ib.ibmandatoryand", $.ib.ibmandatory, {
    _pre_init: function () {
        this._setOption('theLogicalOperator', "AND");
    }
});
