var args = $.args;
var currentData = [
	{
		title: "title1",
	},
	{
		title: "title2",
	},
	{
		title: "title3",
	},
	{
		title: "title4",
	},
	{
		title: "title5",
	},
];
var data = args.data;
populateData(data && data.itemIndex);
function populateData(itemIndex) {
	var items = _.chain(currentData)
		.map(function(obj, i) {
			return {
				properties: OS_IOS
					? _.extend(obj, {
							accessoryType:
								itemIndex === i
									? Titanium.UI.LIST_ACCESSORY_TYPE_CHECKMARK
									: Titanium.UI.LIST_ACCESSORY_TYPE_NONE,
							selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.NONE,
					  })
					: _.extend(obj, {
							accessoryType:
								itemIndex === i
									? Titanium.UI.LIST_ACCESSORY_TYPE_CHECKMARK
									: Titanium.UI.LIST_ACCESSORY_TYPE_NONE,
					  }),
				template: "photo",
				image: {
					visible: false,
					width: 0,
				},
				title: {
					text: obj.title,
				},
			};
		})
		.value();

	$.list.load([Ti.UI.createListSection({ items: items })]);
}

function handleClick(ev) {
	$.trigger("select", ev);
}
