import axios from 'axios'
var useXmlBuilder = function (images, path) {
    // Build XML file
    var builder = require('xmlbuilder')
    var root = builder
        .create('krpano', { version: '1.0', encoding: 'UTF-8' })
        .ele('include', { url: '%SWFPATH%/skin/vtourskin.xml' })
        .up()
        .ele('skin_settings', {
            maps: 'false',
            maps_type: 'google',
            maps_bing_api_key: '',
            maps_google_api_key: '',
            maps_zoombuttons: 'false',
            gyro: 'true',
            webvr: 'true',
            webvr_gyro_keeplookingdirection: 'false',
            webvr_prev_next_hotspots: 'true',
            littleplanetintro: 'false',
            title: 'true',
            thumbs: 'true',
            thumbs_width: '120',
            thumbs_height: '80',
            thumbs_padding: '10',
            thumbs_crop: '0|40|240|160',
            thumbs_opened: 'true',
            thumbs_text: 'false',
            thumbs_dragging: 'true',
            thumbs_onhoverscrolling: 'false',
            thumbs_scrollbuttons: 'false',
            thumbs_scrollindicator: 'false',
            thumbs_loop: 'false',
            tooltips_buttons: 'false',
            tooltips_thumbs: 'false',
            tooltips_hotspots: 'false',
            tooltips_mapspots: 'false',
            deeplinking: 'false',
            loadscene_flags: 'MERGE',
            loadscene_blend: 'OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)',
            loadscene_blend_prev: 'SLIDEBLEND(0.5, 180, 0.75, linear)',
            loadscene_blend_next: 'SLIDEBLEND(0.5, 0, 0.75, linear)',
            loadingtext: 'loading...',
            layout_width: '100%',
            layout_maxwidth: '814',
            controlbar_width: '-24',
            controlbar_height: '40',
            controlbar_offset: '20',
            controlbar_offset_closed: '-40',
            'controlbar_overlap.no-fractionalscaling': '10',
            'controlbar_overlap.fractionalscaling': '0',
            design_skin_images: 'vtourskin_light.png',
            design_bgcolor: '0x2D3E50',
            design_bgalpha: '0',
            design_bgborder: '0',
            design_bgroundedge: '1',
            design_bgshadow: '0',
            design_thumbborder_bgborder: '1 0xfab517 1.0',
            design_thumbborder_padding: '-1',
            design_thumbborder_bgroundedge: '0',
            design_text_css: 'color:#FFFFFF; font-family:Arial;',
            design_text_shadow: '1',
        })
        .up()
        .ele(
            'action',
            { name: 'startup', autorun: 'onstart' },
            'if(startscene === null OR !scene[get(startscene)], copy(startscene,scene[0].name); );\n' +
                ' loadscene(get(startscene), null, MERGE);\n' +
                ' if(startactions !== null, startactions() );'
        )
        .up()
        .ele('autorotate', { enabled: 'true', waittime: '2', accel: '1', speed: '2', horizon: '12' })
        .up()
    if (Array.isArray(images) && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            let item = i + 1,
                url_image = path + images[i].path_file
            root.ele('scene', {
                name: 'scene_s' + item,
                title: '',
                onstart: '',
                thumburl: url_image + 'thumb.jpg',
                lat: '',
                lng: '',
                heading: '',
            })
                .ele('view', {
                    hlookat: '2.0',
                    vlookat: '0.0',
                    fovtype: 'MFOV',
                    fov: '110',
                    maxpixelzoom: '2.0',
                    fovmin: '100',
                    fovmax: '120',
                    limitview: 'auto',
                })
                .up()
                .ele('preview', { url: url_image + 'preview.jpg' })
                .up()
                .ele('image')
                .ele('cube', { url: url_image + 'pano_%s.jpg' })
                .up()
                .up()
                .up()
        }
    }
    return root.root().end({ pretty: true })
}

export default async (req, res) => {
    res.statusCode = 200
    let hotel_id = req.query.hotel_id
    // Call API get data image 360 by hotel_id
    let ApiMicroService = axios.create({
        // baseURL: process.env.NEXT_PUBLIC_MICRO_API_URL,
        baseURL: 'https://micro-services.vntrip.vn/',
        responseType: 'json',
    })
    const result = await ApiMicroService.get(`v3/hotel/image/hotel360image/` + hotel_id, {})
    let images = result.data.data
    let path = result.data.ext_data.prefix
    res.setHeader('Content-Type', 'application/xml')
    res.end(useXmlBuilder(images, path))
}
