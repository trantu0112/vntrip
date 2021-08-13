import React, { useEffect, useState } from 'react'
import { useMounted } from '../../utils/custom-hook'
import { getUrl } from '../../utils/common'

const FacebookLikeShare = () => {
    const isMounted = useMounted()
    const [url, setUrl] = useState<string>('')
    useEffect(() => {
        if (isMounted) {
            // lấy url cho like share facebook
            setUrl(getUrl())
        }
    }, [isMounted])

    if (url) {
        return (
            <ul className="facebook__group">
                <li className="li_like">
                    <a>
                        <div
                            className="fb-like fb_iframe_widget"
                            data-ref=".Vqczq_tER6s.like"
                            data-layout="button_count"
                            data-show_faces="false"
                            data-share="false"
                            data-action="like"
                            data-width={90}
                            data-font="arial"
                            data-href={url}
                            data-send="false"
                            fb-xfbml-state="rendered"
                            fb-iframe-plugin-query={`action=like&app_id=&container_width=0&font=arial&href=${url}&layout=button_count&locale=vi_VN&ref=.Vqczq_tER6s.like&sdk=joey&send=false&share=false&show_faces=false&width=90`}
                        >
                            <span style={{ verticalAlign: 'bottom', width: '86px', height: '20px' }}>
                                <iframe
                                    name="f2ccd8bbd"
                                    width="90px"
                                    height="1000px"
                                    frameBorder={0}
                                    allowTransparency
                                    allowFullScreen
                                    scrolling="no"
                                    title="fb:like Facebook Social Plugin"
                                    src={`https://www.facebook.com/plugins/like.php?action=like&app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df273340658%26domain%3Dwww.vntrip.vn%26origin%3Dhttps%253A%252F%252Fwww.vntrip.vn%252Ff242e055ac%26relation%3Dparent.parent&container_width=0&font=arial&href=${url}&layout=button_count&locale=vi_VN&ref=.Vqczq_tER6s.like&sdk=joey&send=false&share=false&show_faces=false&width=90`}
                                    style={{
                                        border: 'none',
                                        visibility: 'visible',
                                        width: '86px',
                                        height: '20px',
                                    }}
                                ></iframe>
                            </span>
                        </div>
                    </a>
                </li>
                <li className="li_share">
                    <a>
                        <div
                            className="fb-share-button fb_iframe_widget"
                            data-ref=".Vqczq_BXgvk.share-button"
                            data-layout="button_count"
                            data-href={url}
                            fb-xfbml-state="rendered"
                            fb-iframe-plugin-query={`app_id=&container_width=0&href=${url}&layout=button_count&locale=vi_VN&ref=.Vqczq_BXgvk.share-button&sdk=joey`}
                        >
                            <span style={{ verticalAlign: 'bottom', width: '78px', height: '20px' }}>
                                <iframe
                                    name="f39d463118"
                                    width="1000px"
                                    height="1000px"
                                    frameBorder={0}
                                    allowTransparency
                                    allowFullScreen
                                    scrolling="no"
                                    title="fb:share_button Facebook Social Plugin"
                                    src={`https://www.facebook.com/plugins/share_button.php?app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df102bf8a74%26domain%3Dwww.vntrip.vn%26origin%3Dhttps%253A%252F%252Fwww.vntrip.vn%252Ff242e055ac%26relation%3Dparent.parent&container_width=0&href=${url}&layout=button_count&locale=vi_VN&ref=.Vqczq_BXgvk.share-button&sdk=joey`}
                                    style={{
                                        border: 'none',
                                        visibility: 'visible',
                                        width: '78px',
                                        height: '20px',
                                    }}
                                ></iframe>
                            </span>
                        </div>
                    </a>
                </li>
            </ul>
        )
    }
    return null
}
export default FacebookLikeShare
