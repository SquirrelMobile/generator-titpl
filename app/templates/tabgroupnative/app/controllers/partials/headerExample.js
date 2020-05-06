var champs = $.form.getChamps();

champs.filter.faketextField.addEventListener("change", function(e) {
	e.row["id"] = "filter";
	var data = e;
	$.trigger("change", data);
});
champs.style.faketextField.addEventListener("change", function(e) {
	e.row["id"] = "style";
	var data = e;
	$.trigger("change", data);
});
