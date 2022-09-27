import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import { useEffect } from "@wordpress/element"

wp.blocks.registerBlockType("codi-design/header", {
	title: "CodiHeader",
	attributes: {
		logoURL: {type: "string"},
		logoID: {type: "number"},
		bodyColor: {type: "string"}
	},
	edit: function(props) {
		useEffect(function() {
			if (props.attributes.logoID) {
				async function go() {
					const response = await apiFetch({
						path: `/wp/v2/media/${props.attributes.logoID}`,
						method: "GET"
					})
					props.setAttributes({logoURL: response.source_url})
					console.log(response.source_url)
				}
				go()
			}
		}, [props.attributes.logoID])

		function onLogoSelect(x) {
			props.setAttributes({logoID: x.id})
		}
		function handleBodyColorChange(color) {
			props.setAttributes({bodyColor: color})
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
					<PanelBody title="Body Color" initialOpen={true}>
						<PanelRow>
							<ColorPalette clearable={false}  value={props.attributes.bodyColor} onChange={handleBodyColorChange} />
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<header className="header" style={{ position: 'relative', padding: 0 }}>
					<div className="header-logo">
			        	<a href="#">
			          		<img class="codi-logo" src={props.attributes.logoURL} alt="Codi Design" /> 
			        	</a>
				    </div>
				    <div className="header-meniu">
				        <nav class="site-nav">
			              <a href="#about-us" class="active">Apie mus</a>
			              <a href="#projects">Projektai</a>
			              <a href="#services">Paslaugos</a>
			              <a href="#contacts">Kontaktai</a>
				        </nav>
				    </div>
				</header>
				</>
				)
	},
	save: function() {
		return <InnerBlocks.Content />
	}
})