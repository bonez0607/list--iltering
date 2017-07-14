//Update 5-08-17 by Joseph Banegas
  /* 
  	- Can now And/Or filter with multiple sets of checkboxes
	- No results and Please make selection have been added
  */
$(document).ready(function() {
	var mainData = afWebinar;
	var tableCount = 0;
	//var webinarItem = [];
	/*
	|-----------------------------------------------------------
	|  Webinar Item Constructor
	|-----------------------------------------------------------
	|   * assigns the appropriate properties to each Webinar entry
	*/
	
	var webinarItem = mainData.map(function(webinar){
		return {
			title: webinar["WebinarTitle"],
			practice: webinar["AgroforestryPractice"],
			presenter: webinar["Presenter"],
			date: webinar["Date"],
			organization: webinar["WebinarHost"],
			url: webinar["Link"],
		};
	});
	
	/*
	|-----------------------------------------------------------
	|  Functions used to create Table
	|-----------------------------------------------------------
	| *Also sets dats-* properties for manipulation
	*/
	function rowData(webinarItem, e) {
		return "\
		<tr class='webinar stripe' data-category='" + webinarItem[e].date + " " + webinarItem[e].practice.toLowerCase().replace(/\s+/g, '-') + "'>\
			<td>" + webinarItem[e].practice + "</td>\
			<td><a href='" + webinarItem[e].url + "'>" + webinarItem[e].title + "</a></td>\
			<td>" + webinarItem[e].presenter + "</td>\
			<td>" + webinarItem[e].date + "</td>\
			<td>" + webinarItem[e].organization + "</td>\
		</tr>";
	}
	
	function addHeaders() {
		let regx = /([A-Z])/g;
		$.each(mainData[0], function(headers){
			if (headers !== "Link") {
				$('#headers').append('<th>' + headers.replace(regx, ' $1') + '</th>');
			}
		});
	}

	function addData(webinar) {
		webinar.forEach(function(_, index) {
			$('#webinar:last-child').append(rowData(webinar, index));
		});
	}

	function checkDefault() {
		var $checkBoxes = $("#checkboxes input[type='checkbox']");
		if (!$checkBoxes.is(":checked", false)) {
			$checkBoxes.prop("checked", true);
		}
	}

	function rowClick() {
		$('tbody tr').click(function() {
			window.location = $(this).find('a').prop('href');
		}).hover(function() {
			$(this).toggleClass('hover').css('cursor', 'pointer');
		});
	}
	/*
	|-----------------------------------------------------------
	|  Add Checkboxes
	|-----------------------------------------------------------
	*/
	function addChkBxDate() {
		var years = [];
		
		webinarItem.forEach(function(webinar) {
			years.push(webinar.date);
		});	
		
		var yearsFilter = years.filter(function(item, index, self){
				return self.indexOf(item) === index;
			}).sort();
			
		yearsFilter.forEach(function(year) {
			$('.fixed').prepend("<label><input type='checkbox' name='date' value='" + year + "'>" + year + "<span style='font-size: 10px;padding:0; margin:0'> (" + itemCount(years, year) + ")</span></label>");
		});
		$('.fixed').prepend("<h2 style='padding-top:25px;'>Filter by Date</h2>");
	}
	
	addChkBxDate();

	function addChkBxPrac() {
		var practices = [];
		webinarItem.forEach(function(webinar) {
			practices.push(webinar.practice);
		});
		var practicesFilter = practices.filter(function(item, index, self) {
			return self.indexOf(item) === index;
		}).reverse();
		practicesFilter.forEach(function(practice) {
			$('.fixed').prepend("<label><input type='checkbox' name='practice' value='" + practice.toLowerCase().replace(/\s+/g, '-') + "'>" + practice + "<span style='font-size:10px; padding:0; margin:0;'> (" + itemCount(practices, practice) + ")</span></label>");
		});
		$('.fixed').prepend("<h2>Filter by Practice</h2>");
	}
	addChkBxPrac();
	
	/*
	|-----------------------------------------------------------
	|  Counter Functions
	|-----------------------------------------------------------
	*/
	function addCounter() {
		tableCount = $("#webinar tr").length;
		$(".fixed").append("<span class='count'>Displaying " + tableCount + " of " + webinarItem.length + "</span>");	
	}
	
	function itemCount(arr, el) {
		var count = {};
		for (let i = 0; i < arr.length; i++) {
			var num = arr[i];
			count[num] = count[num] ? count[num] + 1 : 1;	
		}
		return count[el];
	}
	
	function counterChange() {
		tableCount = $("tbody tr:visible").length;
		$(".count").html("<span class='count'>Displaying " + tableCount + " of " + webinarItem.length + "</span>");
	}
	/*
|-----------------------------------------------------------
|  Table Style
|-----------------------------------------------------------
*/
	function tableStyle($class) {
		$($class + ':visible:odd').css('background', '#EFF3F9');
		$($class + ':visible:even').css('background', '#FFFFFF');
	}
	/*
	|-----------------------------------------------------------
	|  Filter Items From Table
	|-----------------------------------------------------------
	*/
	
	//Checkbox Change Function	
	var $filterCheckboxes = $("#checkboxes input[type='checkbox']");
	$filterCheckboxes.on('change', function() {
		// loop through checkboxes to see if one is checked
		var $checkedLength = $("#checkboxes input[type='checkbox']:checked").length;
		
		$filterCheckboxes.each(function(_, chkbx) {
			if ($checkedLength > 0) {
	
				var selectedFilters = {};
				$(".make-selection").hide();
				
				$filterCheckboxes.filter(':checked').each(function() {
					if (!selectedFilters.hasOwnProperty(this.name)) {
						selectedFilters[this.name] = [];
					}
					selectedFilters[this.name].push(this.value);
				});
				
				// create a collection containing all of the filterable elements
				var $filteredResults = $('.webinar');
				
				// loop over the selected filter name -> (array) values pairs
				$.each(selectedFilters, function(name, filterValues) {
					console.log(filterValues);
					// filter each .webinar element
					$filteredResults = $filteredResults.filter(function() {
						var matched = false,
							currentFilterValues = $(this).data('category').split(' ');
								console.log(filterValues);
				
						// loop over each category value in the current .webinar's data-category
						$.each(currentFilterValues, function(index, currentFilterValue) {
							// if the current category exists in the selected filters array
							// set matched to true, and stop looping. as we're ORing in each
							// set of filters, we only need to match once
							
							if ($.inArray(currentFilterValue, filterValues) !== -1) {
								matched = true;
								return false;
							}
						});
				
						// if matched is true the current .webinar element is returned
							return matched;
					});
				});
			
				$('.webinar').hide().filter($filteredResults).fadeIn(300);
				counterChange();
				tableStyle(".stripe");
				$(".webinar:visible").length === 0 ? $(".no-results").fadeIn(500) : $(".no-results").hide();
				return false;
			
			} else {
				$(".webinar").hide();
				$(".make-selection").fadeIn(500);	
			}	
		});
	});
	
	//CheckAll Button Function
	$(".uncheck").click(function() {
		if ($filterCheckboxes.is(":checked")) {
			$filterCheckboxes.prop("checked", false);
			$(".webinar, .no-results").hide();
			$(".make-selection").fadeIn(500);
		} else {
			$filterCheckboxes.prop("checked", true);
			$(".webinar").show();
			tableStyle(".stripe");
			$(".make-selection").fadeOut(200);
		}
		counterChange();
	});
	
	//Initial Running functions
	addData(webinarItem);
	addHeaders();
	checkDefault();
	rowClick();
	//!!	addCounter() should always be called last	!!
	addCounter();
	//!!	Table Sort should always be after headers have been called	!!
	$("table").tablesorter({
		sortList: [
			[0, 0]
		]
	});
});