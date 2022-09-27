wp.blocks.registerBlockType("codi-design/footer", {
	title: "CodiFooter",
	edit: function() {
		return wp.element.createElement("div", {className: "placeholder-block"}, "Footer Placeholder")
	},
	save: function() {
		return null
	}
})