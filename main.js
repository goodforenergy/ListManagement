$(function () {

	var searchListTemplate = $("#search-list-template").html(),
		generateSearchList = Handlebars.compile(searchListTemplate),

		// Just to toggle lists (demo purposes only)
		listSelected = true,

		leftTabSelected = true,

		listSelectionMenu,

		PLANT_LIST_ONE,
		PLANT_LIST_TWO;

	// TODO Need to figure out what to do on filter..
	function registerListKeyboardNav () {
		// Searchable list
		var listItems = $('.plant-selection-plant');

		listItems.keydown(function(e) {
			var index = listItems.index(e.target);

			switch(e.keyCode) {

				// User pressed "up" arrow
				case 38:
					console.log('up');
					e.preventDefault();
					if (index > 0) {
						console.log('up2');
						index -= 1;
						node = listItems.eq(index);
						node.focus();
					}
					break;

				// User pressed "down" arrow
				case 40:
					console.log('down');
					e.preventDefault();
					if (index < listItems.size() - 1) {
						console.log('down2');
						index += 1;
						node = listItems.eq(index);
						node.focus();
					}
					break;

				// User pressed "enter"
				case 13:
					e.preventDefault();
					alert('Selected!');
				break;
			}
		});
	}

	function handleListSelection (listName, plantList) {
		$(".selected-list").text('Currently selecting from the \'' + listName + '\' list.');

		// TODO: De-register event handlers?
		$(".plant-selection-plant").remove();
		$(".plant-selection-list").append(generateSearchList(plantList));
		registerListKeyboardNav();
	}

	$.getJSON( "plantList1.json", function(data) {
		PLANT_LIST_ONE = data;
	});

	$.getJSON( "plantList2.json", function(data) {
		PLANT_LIST_TWO = data;
	});

	// Menu
	listSelectionMenu = $(".list-selection-menu");
	listSelectionMenu.menu().menu({
		select: function(e, ui) {
			e.preventDefault();
			handleListSelection(ui.item.text(), listSelected ? PLANT_LIST_ONE : PLANT_LIST_TWO);
			listSelected = !listSelected;
		}
	});

	// Search for plant list
	$(".plant-selection-search").on("keyup click input", function () {
		if (this.value.length > 0) {
			$(".plant-selection-item").show().filter(function () {
				var val = $(".plant-selection-search").val().toLowerCase();
				return $(this).text().toLowerCase().indexOf(val) == -1;
			}).hide();
		} else {
			$(".plant-selection-item").show();
		}
	});

	// Tabs
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  	// e.target // activated tab
		// e.relatedTarget // previous tab
	})
});