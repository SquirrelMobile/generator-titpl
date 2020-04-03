class RatingView {
	constructor(obj) {
		let that = this;
		this.parent = Ti.UI.createView(
			_.extend(obj, {
				layout: "horizontal",
				horizontalWrap: false,
				height: Ti.UI.SIZE,
			}),
		);

		this.activeColor = obj.activeColor || "green";
		this.color = obj.color || "gray";

		this.currentValue = obj.value || 0;
		this.ratingvalue = this.currentValue + 1;
		this.parent.addEventListener("touchstart", function(e) {
			var source = e.source;
			if (source.value > -1) {
				that.currentValue = source.value; //+ 1;
				that.ratingvalue = source.value + 1;

				for (var i = 0; i < that.lblViews.length; i++) {
					if (that.currentValue >= i) {
						var matrix = Ti.UI.create2DMatrix();
						var matrix2 = matrix.scale(1.12, 1.12);
						that.lblViews[i].animate({
							transform: matrix2,
							duration: 150,
						});
					} else {
						var matrix = Ti.UI.create2DMatrix();
						var matrix2 = matrix.scale(1, 1);
						that.lblViews[i].animate({
							transform: matrix2,
							duration: 150,
						});
					}

					that.lblViews[i].color = that.currentValue >= i ? this.activeColor : this.color;
				}
			}
		});
		this.nbRatingStart = obj.nbRatingStart || 5;
		this.createViewRating();
	}

	get value() {
		return this.ratingvalue;
	}

	createViewRating() {
		let that = this;
		that.lblViews = [];
		for (var i = 0; i < this.nbRatingStart; i++) {
			var view = Ti.UI.createLabel(
				_.extend(that.parent.label, {
					color: Alloy.CFG.COLORS.main,
					value: i,
					text: "\uf005",
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					touchEnabled: true,
					minimumFontSize: 9,
					font: { fontFamily: Alloy.CFG.FONTS.fa, fontSize: 25 },
					width: 100 / this.nbRatingStart + "%",
				}),
			);
			if (that.currentValue >= i) {
				var matrix = Ti.UI.create2DMatrix();
				var matrix2 = matrix.scale(1.12, 1.12);
				view.transform = matrix2;
			}

			view.color = that.currentValue >= i ? this.activeColor : this.color;
			that.lblViews.push(view);
			that.parent.add(view);
		}
	}
}

exports.RatingView = RatingView;

exports.createRatingView = e => {
	let rating = new RatingView(e);
	rating.parent.super = () => {
		return rating;
	};

	return rating.parent;
};
