import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor"

wp.blocks.registerBlockType("codi-design/services-section", {
	title: "CODI Services Section",
	supports: {
		align: ["full"],
		html:false,
        color: {
            text: true,
            background: false
        }
	},
	attributes: {
		align: {type: "string", default: "full"},
		title: {type: "string", default: "Paslaugos"},
	},
	edit: EditComponent,
	save: SaveComponent
})

function SaveComponent(props) {
	return (
			<>
			<div className="row">
				<div className="main-heading">
					<RichText.Content { ...useBlockProps.save() } tagName="h1" value={props.attributes.title} />
				</div>
			</div>
			<div className="row">
				<InnerBlocks.Content />
			</div>
			</>
		)
}

function EditComponent(props) {
	function handleTitleChange(x) {
		props.setAttributes({title: x})
	}
	return (
		<>
		<div className="service-section group" style={{ padding: 0, margin: 0, width: '100%' }}> 
			<div className="row">
				<div className="main-heading">
					<RichText { ...useBlockProps() } tagName="h1" value={props.attributes.title} onChange={handleTitleChange} />
				</div>
			</div>
			<div className="row">
				<InnerBlocks allowedBlocks={["codi-design/service"]} />
			</div>
		</div>
		</>
	)
}