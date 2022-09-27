import { InnerBlocks, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, PanelRow, ColorPalette, TextControl } from "@wordpress/components"

wp.blocks.registerBlockType("codi-design/scroll-block", {
	title: "CODI Scroll Block",
	supports: {
		align: ["full"],
		color: {
            text: true,
            background: false,
            default: "--wp--preset--color--white"
        }
	},
	attributes: {
		style: {
	      type: 'object',
	      default: {
	          color: {
	              text: '#ffffff',
	          }
	      }
	  	},
		align: {type: "string", default: "full"},
		id: {type: "string"}
	},
	edit: EditComponent,
	save: SaveComponent
})

function SaveComponent() {
	return <InnerBlocks.Content />
}

function EditComponent(props) {
	function handleIdChange(id) {
		props.setAttributes({id: id})
	}
	return (
		<>
		<InspectorControls>
			<PanelBody title="Section ID" initialOpen={true}>
				<PanelRow>
					<TextControl label="" value={props.attributes.id} onChange={handleIdChange} />
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div className="scroll-block group" style={{ padding: 0 }}>
			<InnerBlocks />
		</div>
		</>
	)
}