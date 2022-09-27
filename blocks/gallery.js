import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { PanelBody, PanelRow, Button } from "@wordpress/components"
import { useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"

wp.blocks.registerBlockType("codi-design/gallery", {
	title: "CODI Gallery Section",
	supports: {
		align: ["full"]
	},
	attributes: {
		logoID: {type: "number" },
		logoURL: {type: "string" }
	},
	edit: EditComponent,
	save: SaveComponent
})

function SaveComponent() {
	return <InnerBlocks.Content />
}

function EditComponent(props) {

	useEffect(function() {
		if (props.attributes.logoID) {
			async function go() {
				const response = await apiFetch({
					path: `/wp/v2/media/${props.attributes.logoID}`,
					method: "GET"
				})
				props.setAttributes({themeimage: "", logoURL: response.media_details.sizes.galleryLogo.source_url})
			}
			go()
		}
	}, [props.attributes.logoID])

	function onLogoSelect(x) {
		props.setAttributes({logoID: x.id})
	}

	return (
		<>
		<InspectorControls>
			<PanelBody title="Logo Image" initialOpen={true}>
				<PanelRow>
					<MediaUploadCheck>
						<MediaUpload 
							onSelect={onLogoSelect} 
							value={props.attributes.logoID} 
							render={({ open }) => {
								return <Button onClick={open}>Choose Logo Image</Button>
						}} />
					</MediaUploadCheck>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div className="placeholder-block" style={{ color: '#000' }}>Gallery PlaceHolder</div>
		</>
	)
}