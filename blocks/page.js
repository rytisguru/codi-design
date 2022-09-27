wp.blocks.registerBlockType("codi-design/page", {
	title: "Codi Single Page",
	edit: function() {
		return wp.element.createElement("div", {className: "placeholder-block"}, "Single Page Placeholder")
	},
	save: function() {
		return null
	}
})