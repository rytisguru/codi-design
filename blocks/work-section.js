import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor"

wp.blocks.registerBlockType("codi-design/work-section", {
	title: "CODI Work Section",
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
		title: {type: "string", default: "Projektai"}
	},
	edit: EditComponent,
	save: SaveComponent
})

function SaveComponent(props) {
	return (
			<>
			<div className="main-heading">
				<RichText.Content { ...useBlockProps.save() } tagName="h1" value={props.attributes.title} />
			</div>
			<div className="work-section group">
				<InnerBlocks.Content />
			</div>
			<div class="work-section-more">
				<a href="/gallery"><button><span>DAUGIAU...</span></button></a>
			</div>
			</>
		)
}

function EditComponent(props) {
	function handleTitleChange(title) {
		props.setAttributes({title: title})
	}
	return (
		<>
		<div className="main-heading">
			<RichText { ...useBlockProps() } tagName="h1" value={props.attributes.title} onChange={handleTitleChange} />
		</div>
		<div className="work-section group" style={{ padding: 0, margin: 0 }}>
			<InnerBlocks allowedBlocks={["codi-design/work"]} />
		</div>
		<div className="work-section-more" style={{ padding: 0, margin: 0 }}>
    		<button role="button"><span>DAUGIAU...</span></button>
  		</div>
		</>
	)
}