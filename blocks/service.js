import { useBlockProps, RichText, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, BlockControls } from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow, ToolbarGroup, ToolbarButton, ColorPalette } from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import { useEffect } from "@wordpress/element"

wp.blocks.registerBlockType("codi-design/service", {
	title: "CODI Service",
	supports: {
		align: ["full"],
		html:false,
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
		title: {type: "string", default: "Paslauga"},
		description: {type: "string", default: "Paslaugos aprasymas"},
		logoID: {type: "number"},
		logoURL: {type: "string"},
		bgColor: {type: "string"},
	},
	edit: EditComponent,
	save: SaveComponent
})

function EditComponent(props) {

	useEffect(function() {
		if (props.attributes.logoID) {
			async function go() {
				const response = await apiFetch({
					path: `/wp/v2/media/${props.attributes.logoID}`,
					method: "GET"
				})
				props.setAttributes({themeimage: "", logoURL: response.media_details.sizes.serviceLogo.source_url})
			}
			go()
		}
	}, [props.attributes.logoID])

	function onLogoSelect(x) {
		props.setAttributes({logoID: x.id})
	}
	function handleTitleChange(x) {
		props.setAttributes({ title: x })
	}
	function handleDescChange(x) {
		props.setAttributes({ description: x })
	}
	function handleBGColorChange(color) {
		props.setAttributes({bgColor: color})
	}

	return (
		<>
		<InspectorControls>
			<PanelBody title="Service Logo" initialOpen={true}>
				<PanelRow>
					<MediaUploadCheck>
						<MediaUpload 
							onSelect={onLogoSelect} 
							value={props.attributes.logoID} 
							render={({ open }) => {
								return <Button onClick={open}>Choose Service Logo</Button>
						}} />
					</MediaUploadCheck>
				</PanelRow>
			</PanelBody>
			<PanelBody title="Background Color" initialOpen={true}>
				<PanelRow>
					<ColorPalette clearable={false}  value={props.attributes.bgColor} onChange={handleBGColorChange} />
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div className="box" style={{ backgroundColor: `${props.attributes.bgColor}`, width: '100%' }}>
			<div className="box-image">
				<img src={props.attributes.logoURL} alt="" />
			</div>
			<div className="box-text">
				<RichText { ...useBlockProps() } tagName="h5" value={props.attributes.title} onChange={handleTitleChange} />
				<RichText { ...useBlockProps() } tagName="p" value={props.attributes.description} onChange={handleDescChange} />
			</div>
		</div>
		</>
	)
}

function SaveComponent(props) {
	return (
			<>
			<RichText.Content { ...useBlockProps.save() } tagName="h5" value={props.attributes.title} />
			<RichText.Content { ...useBlockProps.save() } tagName="p" value={props.attributes.description} />
			</>
		)

}