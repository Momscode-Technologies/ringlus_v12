
frappe.ui.form.on('Salary Slip',{
   
	refresh: function(frm) {
		frm.toggle_display("payment_days", false);
		frm.toggle_display("total_working_days", false);
	},

	employee: function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
        frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_casual_leave",
            args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date}, 
                doctype:"Attendance",
            callback: function(r) { 
				var a=r.message[0]['count(leave_type)']
				
                frappe.model.set_value(d.doctype, d.name,"casual_leave",a)
			}
		});



		frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_compensatory_off",
            args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date}, 
                doctype:"Attendance",
            callback: function(r) { 
				var a=r.message[0]['count(leave_type)']
				
                frappe.model.set_value(d.doctype, d.name,"compensatory_off",a)
			}
		});


		frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_holidays",
            args: { "from_date": d.start_date,
					"to_date": d.end_date}, 
                doctype:"Holiday List",
            callback: function(r) { 
				var a=r.message[0]['count(holiday_date)']
				
                frappe.model.set_value(d.doctype, d.name,"hollidays",a)
			}
		});


        frappe.call({
            method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
            args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date},
                doctype:"Attendance",
            callback: function(r) { 
				var a=r.message[0]['count(attendance_date)']
				
                frappe.model.set_value(d.doctype, d.name,"present_days",a)
			}
		});
    	if(d.employment_type=="Contract")
	    {



			frappe.call({
				method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
				args: {"employee":d.employee,
					"from_date": d.start_date,
						"to_date": d.end_date},

					doctype:"Attendance",
				callback: function(r) { 
					var a=r.message[0]['count(attendance_date)']
		   
		
		   frappe.model.set_value(d.doctype, d.name,"payment_days_on",a)
				}
			});

	    }
	    else
	    {
	       var payment=(30-d.leave_without_pay);
	       frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)

	   }



    },



end_date: function(frm,cdt,cdn){
	var d = locals[cdt][cdn];
	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_casual_leave",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Attendance",
		callback: function(r) { 
			var a=r.message[0]['count(leave_type)']
			
			frappe.model.set_value(d.doctype, d.name,"casual_leave",a)
		}
	});



	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_compensatory_off",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Attendance",
		callback: function(r) { 
			var a=r.message[0]['count(leave_type)']
		
			frappe.model.set_value(d.doctype, d.name,"compensatory_off",a)
		}
	});


	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_holidays",
		args: { "from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Leave Application",
		callback: function(r) { 
			var a=r.message[0]['count(holiday_date)']
			
			frappe.model.set_value(d.doctype, d.name,"hollidays",a)
		}
	});


	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date},
			doctype:"Attendance",
		callback: function(r) { 
			var a=r.message[0]['count(attendance_date)']
		
			frappe.model.set_value(d.doctype, d.name,"present_days",a)
		}
	});

	if(d.employment_type == "Contract")
	{
		
		
		frappe.call({
			method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
			args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date},
					
				doctype:"Attendance",
			callback: function(r) { 
				var a=r.message[0]['count(attendance_date)']
				frappe.model.set_value(d.doctype, d.name,"payment_days_on",a)
				}
			});
		      
		    
	}
	else
	{
	  var payment=(30-d.leave_without_pay);
	  frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)

	}

},


validate: function(frm,cdt,cdn){
	var d = locals[cdt][cdn];
	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_casual_leave",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Attendance",
		callback: function(r) { 
			var a=r.message[0]['count(leave_type)']
			
			frappe.model.set_value(d.doctype, d.name,"casual_leave",a)
		}
	});



	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_compensatory_off",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Attendance",
		callback: function(r) { 
			var a=r.message[0]['count(leave_type)']
		
			frappe.model.set_value(d.doctype, d.name,"compensatory_off",a)
		}
	});


	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_holidays",
		args: { "from_date": d.start_date,
				"to_date": d.end_date}, 
			doctype:"Leave Application",
		callback: function(r) { 
			var a=r.message[0]['count(holiday_date)']
			
			frappe.model.set_value(d.doctype, d.name,"hollidays",a)
		}
	});


	frappe.call({
		method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
		args: {"employee":d.employee,
			"from_date": d.start_date,
				"to_date": d.end_date},
			doctype:"Attendance",
		callback: function(r) { 
			var a=r.message[0]['count(attendance_date)']
		
			frappe.model.set_value(d.doctype, d.name,"present_days",a)
		}
	});

	if(d.employment_type == "Contract")
	{
		
		
		frappe.call({
			method:"ringlus.ringlus.doctype.sales_order.sales_order.get_present_days",
			args: {"employee":d.employee,
				"from_date": d.start_date,
					"to_date": d.end_date},
					
				doctype:"Attendance",
			callback: function(r) { 
				var a=r.message[0]['count(attendance_date)']
				frappe.model.set_value(d.doctype, d.name,"payment_days_on",a)
				}
			});
		      
		    
	}
	else
	{
	  var payment=(30-d.leave_without_pay);
	  frappe.model.set_value(d.doctype, d.name,"payment_days_on",payment)

	}

},











































































































});



