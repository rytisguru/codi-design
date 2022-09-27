import { useBlockProps, RichText, InnerBlocks, InspectorControls, BlockControls } from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow, ToolbarGroup, ToolbarButton, ColorPalette } from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import { useEffect } from "@wordpress/element"
import { useSelect } from "@wordpress/data"

wp.blocks.registerBlockType("codi-design/work", {
	title: "CODI Work",
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
		title: {type: "string", default: "Darbas"},
		description: {type: "string", default: "Darbo aprasymas"},
		align: {type: "string", default: "full"},
		small_imgID: {type: "number"},
		small_imgURL: {type: "string"},
		big_imgID: {type: "number"},
		big_imgURL: {type: "string"},
		work_style: {type: "string", default: "first"},
		hrColor: {type: "string", default: "#fff"},
		workID: {type: "string"}
	},
	edit: EditComponent,
	save: SaveComponent
})

function EditComponent(props) {

	useEffect(function() {
		if (props.attributes.workID) {
			async function go() {
				const response = await apiFetch({
					path: `/wp/v2/work/${props.attributes.workID}`,
					method: "GET"
				})
				console.log(response)
				props.setAttributes({title: response.acf.work_title, description: response.acf.work_description, big_imgID: response.acf.big_image, small_imgID: response.acf.small_image})
			}
			go()
		}
	}, [props.attributes.workID])

	useEffect(function() {
		if (props.attributes.small_imgID) {
			async function go() {
				const response = await apiFetch({
					path: `/wp/v2/media/${props.attributes.small_imgID}`,
					method: "GET"
				})
				props.setAttributes({themeimage: "", small_imgURL: response.media_details.sizes.workImgSmall.source_url})
			}
			go()
		}
	}, [props.attributes.small_imgID])

	useEffect(function() {
		if (props.attributes.big_imgID) {
			async function go() {
				const response = await apiFetch({
					path: `/wp/v2/media/${props.attributes.big_imgID}`,
					method: "GET"
				})
				props.setAttributes({themeimage: "", big_imgURL: response.media_details.sizes.workImgBig.source_url})
			}
			go()
		}
	}, [props.attributes.big_imgID])

	const allWorks = useSelect(select => {
		return select("core").getEntityRecords("postType", "work", {per_page: -1})
	})

	const h5 = <RichText { ...useBlockProps() } tagName="h5" value={props.attributes.title} onChange={handleTitleChange} />
	const p = <RichText { ...useBlockProps() } tagName="p" value={props.attributes.description} onChange={handleDescChange} />

	if (allWorks == undefined) return <p>Loading...</p>

	function handleHrColorChange(color) {
		props.setAttributes({hrColor: color})
	}
	function handleTitleChange(x) {
		props.setAttributes({ title: x })
	}
	function handleDescChange(x) {
		props.setAttributes({ description: x })
	}

	return (
		<>
		<InspectorControls>
			<PanelBody title="Horizontal Line Color" initialOpen={true}>
				<PanelRow>
					<ColorPalette clearable={false}  value={props.attributes.hrColor} onChange={handleHrColorChange} />
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<BlockControls> 
			<ToolbarGroup>
				<ToolbarButton isPressed={props.attributes.work_style === "first"} onClick={() => props.setAttributes({work_style: "first"})}>First</ToolbarButton>
				<ToolbarButton isPressed={props.attributes.work_style === "second"} onClick={() => props.setAttributes({work_style: "second"})}>Second</ToolbarButton>
				<ToolbarButton isPressed={props.attributes.work_style === "third"} onClick={() => props.setAttributes({work_style: "third"})}>Third</ToolbarButton>
				<ToolbarButton isPressed={props.attributes.work_style === "forth"} onClick={() => props.setAttributes({work_style: "forth"})}>Forth</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>

		<div className="professor-select-container">
	        <select onChange={e => props.setAttributes({workID: e.target.value})}>
	          <option value="">Select a work</option>
	          {allWorks.map(work => {
	            return (
	              <option value={work.id} selected={props.attributes.workID == work.id}>
	                {work.title.rendered}
	              </option>
	            )
	          })}
	        </select>
	     </div>

		{(() => {
			if (props.attributes.workID != undefined) {
				return (
						<>
						<div className="work-content" style={{ margin: 0 }}>
							<div className={`work-content-text-${props.attributes.work_style}`}>
								{h5}
								<hr style={{ backgroundColor: `${props.attributes.hrColor}` }} />
								{p}
							</div>
							<div className={`work-content-image-big-${props.attributes.work_style}`}>
								<img src={props.attributes.big_imgURL} alt="" />
							</div>
							<div className={`work-content-image-small-${props.attributes.work_style}`}>
								<img src={props.attributes.small_imgURL} alt="" />
							</div>
						</div>
						</>
					)
			}
		})()}
		</>
	)
}

function SaveComponent(props) {
	return (
			<>
			<RichText.Content { ...useBlockProps.save() } tagName="h5" value={props.attributes.title} />
			<hr style={{ backgroundColor: `${props.attributes.hrColor}` }} />
			<RichText.Content { ...useBlockProps.save() } tagName="p" value={props.attributes.description} />
			</>
		)
}