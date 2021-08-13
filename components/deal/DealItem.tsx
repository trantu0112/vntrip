import React from 'react'
import Link from 'next/link'
import DisplayPrice from '../common/DisplayPrice'
import { HOTEL_NO_IMAGE, PATH_DEAL_LIST, STATIC2_VNTRIP, STATIC_VNTRIP } from '../../constants/common'
import { convertUnicode } from '../../utils/common'
import { useTranslation } from 'react-i18next'
import { router } from 'next/client'

interface Props {
    data: any
    isHideDetail?: boolean
}

const DealItem: React.FC<Props> = ({ data, isHideDetail }) => {
    const { t } = useTranslation(['common'])

    const getPrice = (dataDeal: any) => {
        const sellPrice = dataDeal.price_deal?.[0]?.sell_price
        const adultCount = dataDeal.flights[0]?.adult_number || 1
        const type = dataDeal.deal_type
        return type === 'combo' ? sellPrice / adultCount : sellPrice
    }

    const renderThumbImg = (dataDeal: any) => {
        const { image_deal } = dataDeal
        if (Array.isArray(image_deal) && image_deal.length > 0) {
            const _default = image_deal.find((item) => item.is_default)
            const _dealImg = _default ? _default : image_deal[0]
            return `${STATIC2_VNTRIP}/260x150/smart/${_dealImg.image}`
        }
        return HOTEL_NO_IMAGE
    }

    return (
        <div className="listDeal__item">
            <Link href={`${router.pathname}/${convertUnicode(data.name)}-${data.id}`}>
                <a className="dealItem">
                    <div className="dealItem__img">
                        <img src={renderThumbImg(data)} alt={data.name} />
                    </div>
                    <div className="dealItem__cont">
                        <p className="dealItem__title bold">{data.name}</p>
                        {!isHideDetail && data.details && (
                            <p className="dealItem__text" dangerouslySetInnerHTML={{ __html: data.details }} />
                        )}
                        <div className="dealItem__type mb5">
                            {Array.isArray(data.package_services) && data.package_services.length > 0 && (
                                <>
                                    <span className="mr5">Combo:</span>
                                    <span className="yellow-1">
                                        {data.package_services.map((service: any, index: number) => {
                                            // console.log(t(`common:${service}`))
                                            return (!index ? '' : ' + ') + t(`common:${service}`)
                                        })}
                                        {/*{data.package_services.join(' + ')}*/}
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="dealItem__type">
                            {Array.isArray(data.package_addons) && data.package_addons.length > 0 && (
                                <>
                                    <span className="mr5">{t('Bao gồm')}:</span>
                                    <span className="green-1">
                                        {data.package_addons.map((addon: any, index: number) => {
                                            // console.log(t(`common:${addon}`))
                                            return (!index ? '' : ', ') + t(`common:${addon}`)
                                        })}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="dealItem__price mt10">
                            <span className="yellow-1 bold">
                                <DisplayPrice price={getPrice(data)} />
                            </span>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default DealItem
