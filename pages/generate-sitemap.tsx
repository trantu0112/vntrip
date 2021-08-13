import React from 'react'
import fs from 'fs'
import { convertUnicode, isMobileScreen } from '../utils/common'
import moment from 'moment'
import { list } from 'postcss'

const prettier = require('prettier')
const formatted = (sitemap: any) => prettier.format(sitemap, { parser: 'html' })

const TYPE_DOMESTIC = 'vn'
const TYPE_INTERNATIONAL = 'quocte'

const URL_API_DOMESTIC = 'https://services.vntrip.vn/vntrip/v2/seo_hotel_list/'
const URL_API_INTERNATIONAL = 'https://services.vntrip.vn/vntrip/v2/seo_international_hotel_list/'

const GenerateSitemap = () => {
    return <>Generated sitemap...</>
}

export const getServerSideProps = async ({ req }: any) => {
    /**
     * @param url string
     * @param params object
     */
    const fetchApi = async (url: any, params: {}) => {
        url = new URL(url)
        url.search = new URLSearchParams(params).toString()
        const responses = await fetch(url)
        return responses.json()
    }

    /**
     * @param type
     * type: TYPE_DOMESTIC || TYPE_INTERNATIONAL
     */
    const generateSitemapHotel = async (type: string) => {
        const urlApi = type === TYPE_DOMESTIC ? URL_API_DOMESTIC : URL_API_INTERNATIONAL
        const hotels = await fetchApi(urlApi, { page_size: 1 })
        const sitemapSize = 1000
        const hotelCount = hotels.data.count
        const SitemapFileCount = Math.ceil(hotelCount / sitemapSize)
        const totalPage = Math.ceil(hotelCount / 200)

        console.log(`+ Sitemap ${type} - Total hotels: `, hotelCount)
        console.log('+ SitemapFileCount: ', SitemapFileCount)
        console.log('+ totalPage: ', totalPage)

        let sitemapIndexItem = `
        <sitemap>
            <loc>https://www.vntrip.vn/sitemap/static.xml</loc>
            <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
        </sitemap>
        `
        for (let i = 1; i <= SitemapFileCount; i++) {
            console.log('===== Sitemap File: ', i)

            // Push sitemap_index items
            sitemapIndexItem += `
                <sitemap>
                    <loc>https://www.vntrip.vn/sitemap/hotel-${type}-${i}.xml</loc>
                    <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                </sitemap>
            `

            let hotelSitemapItem = ''
            let start = (i - 1) * 5 + 1
            for (let j = 0; j < 5; j++) {
                if (totalPage >= start + j) {
                    console.log('= Sitemap Page: ', start + j)
                    const hotels = await fetchApi(urlApi, { page: start + j, page_size: 200 })
                    hotels.data.results.forEach(function (hotel: any) {
                        // Push sitemap_hotel items
                        const urlHotel =
                            type === TYPE_DOMESTIC
                                ? `https://www.vntrip.vn/hotel/vn/${convertUnicode(hotel.name)}-${hotel.id}`
                                : `https://www.vntrip.vn/hotel/vn/${convertUnicode(hotel.name)}-${hotel.id}`
                        hotelSitemapItem += `
                            <url>
                                <loc>${urlHotel}</loc>
                                <changefreq>daily</changefreq>
                                <priority>0.6</priority>
                                <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                            </url>
                        `
                    })
                }
            }

            /**
             * Generate sitemap hotels
             */
            const generateSitemapHotel = `
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset
                  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
                >
                    ${hotelSitemapItem}
                </urlset>
            `
            const formatSitemapHotel: any = [formatted(generateSitemapHotel)]
            fs.writeFileSync(`public/sitemap/hotel-${type}-${i}.xml`, formatSitemapHotel, 'utf8')
        }

        /**
         * Hotel region + stars
         */
        const provinces = await fetchApi('https://services.vntrip.vn/vntrip/provinces/get-province', {
            page_size: 65,
        })
        const stars = ['1-sao', '2-sao', '3-sao', '4-sao', '5-sao']

        for (let i = 0; i < provinces.results.length; i++) {
            console.log('===== province: ', provinces.results[i].name)
            let province_code = provinces.results[i].code
            if (province_code === 'ba-ria---vung-tau') province_code = 'ba-ria-vung-tau'

            // Push sitemap_index items
            sitemapIndexItem += `
                <sitemap>
                    <loc>https://www.vntrip.vn/sitemap/hotel-region-vn-${i + 1}.xml</loc>
                    <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                </sitemap>
            `

            let hotelRegionSitemapItem = ''
            const extData = await fetchApi(
                'https://micro-services.vntrip.vn/search-engine/search/vntrip-hotel-availability',
                {
                    seo_code: province_code,
                    check_in_date: moment(new Date()).format('YYYYMMDD'),
                    nights: 1,
                    page_size: 1,
                    request_source: isMobileScreen() ? 'webmobile' : 'web_frontend',
                }
            )

            // add item hotel region: province
            hotelRegionSitemapItem += `
                <url>
                    <loc>https://www.vntrip.vn/khach-san/${province_code}</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                    <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                </url>
            `
            // add item hotel region: province + star
            for (let s = 0; s < stars.length; s++) {
                hotelRegionSitemapItem += `
                    <url>
                        <loc>https://www.vntrip.vn/khach-san/${province_code}/${stars[s]}</loc>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                        <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                    </url>
                `
            }

            // add item hotel region: city
            Object.keys(extData.ext_data.count_by_cities).forEach((key: any) => {
                const city = extData.ext_data.count_by_cities[key]
                console.log('= city: ', city.name)
                hotelRegionSitemapItem += `
                    <url>
                        <loc>https://www.vntrip.vn/khach-san/${city.seo_url}</loc>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                        <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                    </url>
                `
                // add item hotel region: city + star
                for (let s = 0; s < stars.length; s++) {
                    hotelRegionSitemapItem += `
                        <url>
                            <loc>https://www.vntrip.vn/khach-san/${city.seo_url}/${stars[s]}</loc>
                            <changefreq>weekly</changefreq>
                            <priority>0.8</priority>
                            <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                        </url>
                    `
                }
            })

            // add item hotel region: area
            Object.keys(extData.ext_data.count_by_area).forEach((key: any) => {
                const area = extData.ext_data.count_by_area[key]
                console.log('= area: ', area.name)
                hotelRegionSitemapItem += `
                    <url>
                        <loc>https://www.vntrip.vn/khach-san/${province_code}/${area.seo_code}</loc>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                        <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                    </url>
                `
                // add item hotel region: area + star
                for (let s = 0; s < stars.length; s++) {
                    hotelRegionSitemapItem += `
                        <url>
                            <loc>https://www.vntrip.vn/khach-san/${province_code}/${area.seo_code}/${stars[s]}</loc>
                            <changefreq>weekly</changefreq>
                            <priority>0.8</priority>
                            <lastmod>${moment(new Date()).format('YYYY-MM-DD')}</lastmod>
                        </url>
                    `
                }
            })

            /**
             * Generate sitemap hotel region
             */
            const contentSiteMapHotelRegion = `
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset
                  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
                >
                    ${hotelRegionSitemapItem}
                </urlset>
            `
            const formatSitemapHotelRegion: any = [formatted(contentSiteMapHotelRegion)]
            fs.writeFileSync(`public/sitemap/hotel-region-vn-${i + 1}.xml`, formatSitemapHotelRegion, 'utf8')
        }

        /**
         * Generate sitemap index
         * this file include all file sitemap hotels
         */
        const contentSiteMapIndex = `
            <?xml version="1.0" encoding="UTF-8"?>
            <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${sitemapIndexItem}
            </sitemapindex>
        `
        const formatSitemapIndex: any = [formatted(contentSiteMapIndex)]
        fs.writeFileSync('public/sitemap/sitemap_index.xml', formatSitemapIndex, 'utf8')
    }

    // Generate sitemap vietnam
    generateSitemapHotel(TYPE_DOMESTIC)

    // Generate sitemap quốc tế
    // Do url khách sạn có country_code mà API ko trả về nên không generate đc sitemap
    // generateSitemapHotel('quocte')

    return { props: {} }
}

export default GenerateSitemap
