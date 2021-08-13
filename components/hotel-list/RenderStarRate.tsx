import React from 'react'
import { IconStar, IconHalfStar } from '../../constants/icons'

interface iProps {
    starRate: number
}

const RenderStarRate: React.FC<iProps> = ({ starRate }) => {
    switch (Number(starRate)) {
        case 1:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                </div>
            )
        case 1.5:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconHalfStar />
                </div>
            )
        case 2:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconStar />
                </div>
            )
        case 2.5:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconStar />
                    <IconHalfStar />
                </div>
            )
        case 3:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconStar />
                    <IconStar />
                </div>
            )
        case 3.5:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconHalfStar />
                </div>
            )
        case 4:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                </div>
            )
        case 4.5:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconHalfStar />
                </div>
            )
        case 5:
            return (
                <div className="rateStar rateStar_sm">
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                </div>
            )
        default:
            return null
    }
}

export default RenderStarRate
