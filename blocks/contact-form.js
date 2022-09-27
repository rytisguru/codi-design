wp.blocks.registerBlockType("codi-design/contact-form", {
	title: "Codi Contact Form",
	edit: function() {
		return wp.element.createElement("div", {className: "placeholder-block"}, "Contact Form Placeholder")
	},
	save: function() {
		return null
	}
})