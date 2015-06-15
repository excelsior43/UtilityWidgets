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


$(function (){
	// startup
	$('#UpdateCustDtlsForm').validationEngine('attach');
	
	var calendar = $.calendars.instance('ummalqura','ar');
	$('#dateOfJoiningHj').calendarsPicker({calendar: calendar,dateFormat: 'dd/mm/yyyy', showOnFocus: true,showTrigger: '<img src="images/calendar.gif" alt="Popup" class="ui-datepicker-trigger">',
		onSelect: function (d){
			log ('onSelectHijraDate: d '+d);
			var iDate  = $('#dateOfJoiningHj').val();
			log ('iDate '+iDate);
			var date = iDate.split('/'); 
			var year = parseInt(date[2], 10); 
			var month = parseInt(date[1], 10); 
			var day = parseInt(date[0], 10); 
			var jDate = calendar.toJSDate(year, month, day);
			log ('jDate '+jDate);
			$("#dateOfJoiningGr" ).val(jDate.getDate() +'/'+ (jDate.getMonth()+1)+'/'+jDate.getFullYear());
		}
	});
		$("#dateOfJoiningGr" ).datepicker({
		  showOn: 'both',
		  buttonImage: 'images/calendar.gif',
		  buttonImageOnly: true,
		  dateFormat:'dd/mm/yy',
		  onSelect : function (jDate){
			try{
			log ('onSelectGregDate date '+jDate);
			//var iCal = $.calendars.instance('ummalqura','ar');
			var date = jDate.split('/'); 
			var year = parseInt(date[2], 10); 
			var month = parseInt(date[1], 10); 
			var day = parseInt(date[0], 10); 
			var isDate = calendar.fromJSDate(new Date(year,(month-1),day));
			
			log ('onSelectGregDate isDate '+isDate);
			
			$('#dateOfJoiningHj').val(calendar.formatDate('dd/mm/yyyy', isDate));
			}catch (e){
				log ('error '+e);
			}
		}
		});


var addressChanged = function (evnt)
{
	var addressValue = $(this).val();
	if (addressValue == '1')
	{
		$("#waselBuildingNo" ).attr("disabled", "disabled");
		$("#waselStreet" ).attr("disabled", "disabled");
		$("#waselCity" ).attr("disabled", "disabled");
		$("#waselCity").selectbox("disable");
		$("#waselDistrict" ).attr("disabled", "disabled");
		$("#waselUnitNo" ).attr("disabled", "disabled");
		$("#waselPostalCode" ).attr("disabled", "disabled");
		$("#waelAdditionalNo" ).attr("disabled", "disabled");
		
		$("#poBOX" ).removeAttr("disabled");
		$("#postalCode" ).removeAttr("disabled");
		$("#postalCity" ).removeAttr("disabled");
		$("#postalCity").selectbox("enable");
		$("#buildingNo" ).removeAttr("disabled");
		
	}
	else if (addressValue == '2')
	{
		$("#waselBuildingNo" ).removeAttr("disabled");
		$("#waselStreet" ).removeAttr("disabled");
		$("#waselDistrict" ).removeAttr("disabled");
		$("#waselUnitNo" ).removeAttr("disabled");
		$("#waselPostalCode" ).removeAttr("disabled");
		$("#waelAdditionalNo" ).removeAttr("disabled");
		$("#waselAddCode" ).removeAttr("disabled");
		$("#waselCity" ).removeAttr("disabled");
		$("#waselCity").selectbox("enable");
		
		$("#poBOX" ).attr("disabled","disabled");
		$("#postalCode" ).attr("disabled","disabled");
		$("#postalCity" ).attr("disabled", "disabled");
		$("#buildingNo" ).attr("disabled", "disabled");
		$("#postalCity").selectbox("disable");
	}
};
$("input[name='mailAddressType']").bind('click',addressChanged );	
	
	
});

function clearDisabledFields(){
	  $("#UpdateCustDtlsForm input[type=text]").each(function() {
			if ($(this).is('[readonly]'))
				$(this).val('');
        });
}

function clearInputFields(div){
	log ('clearInputFields-> '+$(div).attr('class'));
	$(div).find("input[type=text]").each(function() {
				$(this).val('');
        });
	$(div).find("select").each(function() {
				log ('clearInputFields nme-> '+$(this).attr('name'));
				$(this).val('');
				
        });	
	$(div).find(".btnRmvBnk").show();
}

function saveCustDtls (){
	hideContents($("#page-content"));
	clearDisabledFields();
	$("input[name='actionType']").val("S");
		$.post($('#UpdateCustDtlsForm').attr('action'),$('#UpdateCustDtlsForm').serialize(), function(data) {
				$("#page-content").html(data);
			}).fail(function(jqXHR, textStatus, errorThrown) { log(textStatus+ " "+errorThrown); });
	
}


function updateCustDtls (){
		clearDisabledFields();
		var theForm=$('#UpdateCustDtlsForm');
		theForm.validationEngine('hideAll');
		theForm.validationEngine('detach');
		theForm.validationEngine('attach');
		log ('validate ......'+ theForm.validationEngine('validate'));
		if ( theForm.validationEngine('validate') ===true) 
		{
			hideContents($("#page-content"));
			$.post(theForm.attr('action'),theForm.serialize(), function(data) {
					$("#page-content").html(data);
				}).fail(function(jqXHR, textStatus, errorThrown) { log(textStatus+ " "+errorThrown); });
		}
}



function cloneAdditionalLocalBanksDiv(){
	log ('cloneAdditionalLocalBanksDiv first ');
	var div = $(".additional_localBank_section_div").first().clone();
	clearInputFields(div);
	$("#additional_localBank_holder").append(div);
}

function removeAdditionalLocalBankDiv (obj){
	var tR = $(obj).parent().parent();
	log ('sib '+$(tR).siblings(".additionalHolderLocal").length);
	if ($(tR).siblings(".additionalHolderLocal").length > 0)
	$(tR).remove();
}
/*
function removeAdditionalLocalBanksDiv(self){
	log ('removing localbankinfo : ');
	$(this).parent().parent().remove();
}
*/
function removeAdditionalIncomeSourceDiv(obj){
	var tR = $(obj).parent().parent();
	log ('sib '+$(tR).siblings(".additionalHolder").length);
	if ($(tR).siblings(".additionalHolder").length > 0)
	$(tR).remove();
}

function cloneAdditionalIncomeDiv(){
	log ('cloneAdditionalIncomeDiv first ');
	$(".additional_additionalSourceOfIncome_section_div").first().find("select").each(function() {
//				log ('nme-> '+$(this).attr('name'));
				$(this).selectbox("detach");
        });
	var div = $(".additional_additionalSourceOfIncome_section_div").first().clone(true);
	clearInputFields(div);
	$("#additional_source_of_income_holder").append(div);
	
		$("#additional_source_of_income_holder").find("select").each(function() {
				log ('nme-> '+$(this).attr('name'));
				$(this).selectbox("attach");
        });
}

function cloneMostDespositorDiv (accountNo){
	log ('cloneMostDespositorDiv first ');
	var div = $("."+accountNo+"_additional_depositor_section_div").first().clone();
	clearInputFields(div);
	log ('cloneMostDespositorDiv first ');
	$("#"+accountNo+"_additional_mostDespoitors_holder").append(div);
}

function cloneMostBenLocalDiv (accountNo){
	log ('cloneMostBenLocalDiv first ');
	var div = $("."+accountNo+"_additional_mostBen_section_div").first().clone();
	clearInputFields(div);
	$("#"+accountNo+"_additional_mostBenLocal_holder").append(div);
}

function cloneIntlBenDiv (accountNo){
	log ('cloneIntlBenDiv first ');
	/*
	var div = $("."+accountNo+"_additional_intlBen_section_div").first().clone();
	clearInputFields(div);
	$("#"+accountNo+"_additional_mostBenIntl_holder").append(div);
	*/
	
	$("."+accountNo+"_additional_intlBen_section_div").first().find("select").each(function() {

				$(this).selectbox("detach");
        });
		
	var div = $("."+accountNo+"_additional_intlBen_section_div").first().clone(true);
	clearInputFields(div);
	$("#"+accountNo+"_additional_mostBenIntl_holder").append(div);
	
		$("#"+accountNo+"_additional_mostBenIntl_holder").find("select").each(function() {
				log ('nme-> '+$(this).attr('name'));
				$(this).selectbox("attach");
        });
		
		
}

function removeAdditionalDiv (obj){
	var tR = $(obj).parent().parent();
	log ('sib '+$(tR).siblings(".additionalHolderLocal").length);
	if ($(tR).siblings(".additionalHolderLocal").length > 0)
	$(tR).remove();
}


$(document).click(function(e) {
	try{

    var source =$(e.target);
	var parent = $(e.target).parent(); 

    if (!source.hasClass("is-calendarsPicker") && !parent.hasClass("is-calendarsPicker") 
		&& !parent.hasClass("ui-datepicker") && !parent.hasClass("calendars-month-header") && !parent.hasClass("calendars-month") && !source.hasClass("calendars-trigger") 
		) {
			$(".is-calendarsPicker").calendarsPicker("hide"); 
		}
	}catch(e){}
});
/***********************************************validation specific code begin  **********************************************/

$(function () {
	SelectorStack.initBuzRlsNFire(
	function () {
		setTimeout(function(){ SelectorStack.initializeMand_ActPlugin(); }, 1000);  
		}
	);
});  
/***********************************************validation specific code end************************************************/
