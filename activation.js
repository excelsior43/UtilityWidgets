/***********************************************validation specific code begin**********************************************/

var SelectorStack = function (selector, attributes) {
    if (typeof SelectorStack.counter === 'undefined') {
        SelectorStack.counter = 0;
        SelectorStack.fullStack = [];
    }
    SelectorStack.counter++;
    var attributHolder = new SelectorStack.AttributeHolder(selector, attributes);
    SelectorStack.fullStack.push(attributHolder);
    log(SelectorStack.counter + " --- " + attributHolder.toString());
};
SelectorStack.AttributeHolder = function (selector, attributes) {
    this.selector = selector;
    this.attributes = attributes;
    this.toString = function () {
        return "Recording ... : " + this.selector + " :: Attributes :: " + this.attributes;
    };
};
SelectorStack.execute = function () {
	log("Executing.....");
    $.each(SelectorStack.fullStack, function (indx, elem) {
        log("Adding... " + elem.toString());
		log(elem.attributes)
        if($(elem.selector).size() >0 ) 
			$(elem.selector).attr(elem.attributes); 
    });
};
SelectorStack.initBuzRlsNFire = function (callbackFunction) { 
    
	SelectorStack("#poBOX", { ibmandatory: '[{ "input[name=\'mailAddressType\']": ["1"] }]'  });
    /*SelectorStack("#postalCode", { ibmandatory: '[{ "input[name=\'mailAddressType\']": ["1"] }]' });
	SelectorStack("#buildingNo", {ibmandatory: '[{ "input[name=\'mailAddressType\']": ["1"] }]'}); // this field is added new during development, check with business if we need to make this mandatory?
	*/
	SelectorStack("#pobCity", {ibactivation: '[{ "#pobCountry": ["SA"] }]'});
	SelectorStack("#waselPostalCode", { ibmandatory: '[{ "input[name=\'mailAddressType\']": ["2"] }]'   });
    SelectorStack("#waselBuildingNo", {ibmandatory: '[{ "input[name=\'mailAddressType\']": ["2"] }]'   });
    SelectorStack("#waelAdditionalNo", {     ibmandatory: '[{ "input[name=\'mailAddressType\']": ["2"] }]'    });
    SelectorStack("#waselUnitNo", {        ibmandatory: '[{ "input[name=\'mailAddressType\']": ["2"] }]'    });
    SelectorStack("#originalCountry", {        ibmandatory: '[{"#nationalityCode":["NOT_SA"]}]'    });
    SelectorStack("#originalCity", {        ibmandatory: '[{"#nationalityCode":["NOT_SA"]}]'    });
    SelectorStack("#origianlPOBoxNo", {        ibmandatory: '[{"#nationalityCode":["NOT_SA"]}]'    });
    SelectorStack("#originalPostalCode", {        ibmandatory: '[{"#nationalityCode":["NOT_SA"]}]'   });
    SelectorStack("#originalPhoneNo", {        ibmandatory: '[{"#nationalityCode":["NOT_SA"]}]'    });
    SelectorStack("#originalMobileNo", {       ibmandatory: '[{"#nationalityCode":["NOT_SA"]}]'    });
    SelectorStack("#theNameOfTheEmployer", {        ibmandatory: '[{"#employmentStatus":["2","3","4","5","8","7"]}]'    });
    SelectorStack("#position", {        ibmandatory: '[{"#employmentStatus":["2","3","4","5","7"]}]'    }); // No retired "8"
    SelectorStack("#dateOfJoiningHj", {        ibmandatory: '[{"#employmentStatus":["2","3","4","5","7"]}]'    }); // No retired "8"
    SelectorStack("#dateOfJoiningGr", {        ibmandatory: '[{"#employmentStatus":["2","3","4","5","7"]}]'    }); // No retired "8"
    SelectorStack("#businessSector", { ibmandatory: '[{"#employmentStatus":["2","3","4","5","7"]}]'    }); // No retired "8"
    SelectorStack("#jobCity", { ibmandatory: '[{"#employmentStatus":["2","3","4","5","7"]}]'   }); // No retired "8"
    SelectorStack("#jobDistrict", { ibmandatory: '[{"#employmentStatus":["2","3","4","5","7"]}]'  }); // No retired "8"
    SelectorStack("#jobStreet", {ibmandatory: '[{"#employmentStatus":["2","3","4","5","7"]}]' }); // No retired "8"
    SelectorStack("#sourceOfIncome", {ibmandatory: '[{"#employmentStatus":["","2","3","4","5","7","8"]}]' }); // 
    SelectorStack("#monthlyIncomeAmount", { ibmandatory: '[{"#employmentStatus":["","2","3","4","5","7","8"]}]'}); // 
    SelectorStack("#methodOfRecIncome", {ibmandatory: '[{"#employmentStatus":["","2","3","4","5","7","8"]}]'   }); // 
    //SelectorStack("#additionalIncomeAmount", {ibmandatoryNor : '[{"#additionalSourceOfIncome":["NA"]}]'}); // to be implemented...
    //#additionalSourceOfIncome_0 select[name=\'additionalIncomeRecvMethod\']
    //#additionalSourceOfIncome_0 select[name=\'additionalIncomeRecvMethod\']
    SelectorStack("#specialCases", {ibmandatoryand: '[{"#nationalityCode":["SA"]},{"#residencyCountry":["SA"]}]',ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'}); // check if 'SA' value is correct
    SelectorStack("#specialCaseDetails", {ibactivation: '[{"#specialCases":["9"]}]',ibmandatory: '[{"#specialCases":["9"]}]'});
    SelectorStack("#localBankCode", {ibactivation: '[{"#qLocalBankDealing":["Y"]}]',ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]' });
    SelectorStack("#externalBankDetails", {ibactivation: '[{"#qDealingIntlbanks":["Y"]}]',ibmandatory: '[{"#qDealingIntlbanks":["Y"]}]' });
    SelectorStack("#actualBeneficiaryDetails", {ibactivation: '[{"#qActualBen":["N"]}]' ,ibmandatory: '[{"#qActualBen":["N"]}]'  });
    SelectorStack("#charityMembershipDetails", {ibactivation: '[{"#qMemChSocieties":["Y"]}]',ibmandatory: '[{"#qMemChSocieties":["Y"]}]' });
    SelectorStack("#govtJdcryMltryDetails", {ibactivation: '[{"#qHoldGJMsectors":["Y"]}]',ibmandatory: '[{"#qHoldGJMsectors":["Y"]}]' });
    SelectorStack("#taxCountry", {ibactivation: '[{"#qTaxResidentOutside":["Y"]}]',	ibmandatory: '[{"#qTaxResidentOutside":["Y"]}]' });
    SelectorStack("#taxTIN", {ibactivation: '[{"#taxCountry":["Y"]}]',ibmandatory: '[{"#taxCountry":["Y"]}]' });
	/****************************************************************************************/
	SelectorStack("#titleCode", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#pobCountry", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#martialStatus", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#educationalLevel", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#preferredDateType", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#preferredLang", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#typeOfResident", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#residencyType", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#typeOfOwnership", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#residencyCountry", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#residencyCity", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#residencyDistrict", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#residencyStreet", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#residencyPhone", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#employmentStatus", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#specialCases", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#qLocalBankDealing", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#qDealingIntlbanks", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#qActualBen", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#qMemChSocieties", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#qHoldGJMsectors", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#qTaxResidentOutside", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	SelectorStack("#qHoldGreencard", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	//SelectorStack("#accountPurpose", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  }); this is per account. waiting for ALI to finish.
	//SelectorStack("#idDetailsCode", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  });
	//SelectorStack("select[name='accountPurpose']", { ibmandatory: '[{"#someHiddenField":["ALWAYS_TRUE"]}]'  }); 
  

/*********************************************************************************************************/
	
	
    if (typeof callbackFunction !== 'undefined') {
		callbackFunction();
	}
};

SelectorStack.initializeMand_ActPlugin = function () {
	SelectorStack.execute();
    SelectorStack.runCustomWidget("ibmandatory");
    SelectorStack.runCustomWidget("ibactivation");
    SelectorStack.runCustomWidget("ibmandatoryand"); 
};
SelectorStack.runCustomWidget = function (cust_widgetName_) {
	if (typeof $("[" + cust_widgetName_ + "]") !== 'undefined') {
        $("[" + cust_widgetName_ + "]")[cust_widgetName_]();
		log("initializing widget :: "+cust_widgetName_);
        $.each($("[" + cust_widgetName_ + "]"), function (elem) {
            var thePlugin = $(this).data(cust_widgetName_);
            thePlugin._refresh();
        });
    }
};
/*
SelectorStack.theCustomeValidationMethod = function () {
    log("inside theCustomeValidationMethod");
    var retvalue = true;
    $(".ibmandatory").each(function () {
        if ($(this).data("ibmandatory").customValidate() === false) {
            retvalue = false;
        }
    });
    log("inside theCustomeValidationMethod Result :: " + retvalue);
    return retvalue;
};
*/ 
/***********************************************validation specific code end    **********************************************/
	);
});  
/***********************************************validation specific code end************************************************/
