function hasIOSNotch() {
	if (
		// iPhone X/Xs/XR
		Ti.Platform.displayCaps.platformWidth === 375 &&
		Ti.Platform.displayCaps.platformHeight === 812 &&
		(Ti.Platform.displayCaps.logicalDensityFactor === 3 ||
			Ti.Platform.displayCaps.logicalDensityFactor === 2)
	) {
		return true;
	}
	if (
		// iPhone XR/XS max
		Ti.Platform.displayCaps.platformWidth === 414 &&
		Ti.Platform.displayCaps.platformHeight === 896 &&
		(Ti.Platform.displayCaps.logicalDensityFactor === 2 ||
			Ti.Platform.displayCaps.logicalDensityFactor === 3)
	) {
		return true;
	}
}
export const hasNotch = Ti.Platform.osname === "iphone" && hasIOSNotch();
export const statusBarHeight = hasNotch ? 44 : 20;
