var that;
sap.ui.controller("zcoronadashb.main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zcoronadashb.main
*/
	onInit: function() {
		

		var oModel = new sap.ui.model.json.JSONModel();
		that = this;
		var aData = jQuery.ajax({
		type: "GET",
		contentType: "application/json",
		url: "https://api.covid19api.com/summary",
		dataType: "json",
		async: false,
		success: function(data, textStatus, jqXHR) {
			debugger;
		oModel.setData(data);
		
		var vbi = that.getView().byId("vbi");
		var v;
	
		
		var len = oModel.oData.Countries.length;
		
		for( v = 0 ;v <= len ;v++ ) {
			
			var j=v;
			
			var TotalConfirmed = oModel.oData.Countries[j].TotalConfirmed;
			
			if (TotalConfirmed > 100000){
			var region = new sap.ui.vbm.Region({
				color: "rgba(92,186,230,0.6)",
				code :  oModel.oData.Countries[j].CountryCode,
			})
			
			
			vbi.addRegion(region);
			} 
//			else if (TotalConfirmed > 100000)
//				{
//				var region = new sap.ui.vbm.Region({
//					color: "rgb(0, 51, 153)",
//					code :  oModel.oData.Countries[j].CountryCode,
//				})
//				
//				
//				vbi.addRegion(region);
//				
//				} else if (TotalConfirmed > 10000){
//					
//					var region = new sap.ui.vbm.Region({
//						color: "rgb(102, 153, 255)",
//						code :  oModel.oData.Countries[j].CountryCode,
//					})
//					
//					
//					vbi.addRegion(region);
//					
//				}
				
				
		
		}
		
		
		
		
		
		
		}
		});
		this.getView().setModel(oModel);
		
		
		
		
			
			
			
			
	
		
		
		
		
		
		
		
		
		
		

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zcoronadashb.main
*/
//	onBeforeRendering: function() {
//
//	},
	
	onRegionClick : function(event) {
		debugger;
		
		var dialog = that.getView().byId("dialog");
		var omodel = that.getView().getModel();
		var totalConfirmed = that.getView().byId("totalConfirmed");
		var totalDeath = that.getView().byId("totalDeath");
		var totalRecovered = that.getView().byId("totalRecovered");
		
		var code = event.mParameters.code;
		var i;
		var length = omodel.oData.Countries.length;

		for( i = 0 ;i <= length ;i++ ) {
			var n = i;
			
			if (length != n ){
			var CountryCode = omodel.oData.Countries[n].CountryCode;
			}
			if ( CountryCode == code){
				debugger;
				
				
				dialog.setTitle(omodel.oData.Countries[n].Country);
				totalConfirmed.setValue(omodel.oData.Countries[n].TotalConfirmed);
				totalDeath.setValue(omodel.oData.Countries[n].TotalDeaths);
				totalRecovered.setValue(omodel.oData.Countries[n].TotalRecovered);

				
				
			}
			
		}
		
		
//		var table = that.getView().byId("table");
//		
//		var listitem = new sap.m.ColumnListItem();
//		
//		var country = new sap.m.Text({
//			text : "{CountryCode}"
//		})
//		
//		listitem.addCell(country);
//		
//		table.bindAggregation("items",
//				"/Countries",
//				listitem);

		
		
	
		dialog.open();

		
		
	},
	
	closeDialog : function () {
		
		var dialog = that.getView().byId("dialog");
		dialog.close();
		
	},
	

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zcoronadashb.main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zcoronadashb.main
*/
//	onExit: function() {
//
//	}

});