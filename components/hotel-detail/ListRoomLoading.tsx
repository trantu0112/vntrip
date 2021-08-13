import React from 'react'

interface Props {
    showHeader?: boolean
}

const ListRoomLoading: React.FC<Props> = ({ showHeader }) => {
    return (
        <div className="roomAnimated">
            {showHeader && (
                <div className="roomAnimated__header">
                    <div className="roomAnimated__img animated-background" />
                    <div className="roomAnimated__info">
                        <div className="roomAnimated__line1 animated-background" />
                        <div className="roomAnimated__line2 animated-background" />
                        <div className="roomAnimated__line3 animated-background" />
                    </div>
                </div>
            )}

            <div className="roomAnimated__body">
                <div className="roomAnimated__item">
                    <div className="roomAnimated__flex">
                        <div className="roomAnimated__line7 animated-background" />
                        <div className="roomAnimated__line8 animated-background" />
                        <div className="roomAnimated__line9 animated-background" />
                        <div className="roomAnimated__line10 animated-background" />
                        <div className="roomAnimated__line11 animated-background" />
                    </div>
                </div>
                <div className="roomAnimated__item">
                    <div className="roomAnimated__flex">
                        <div className="roomAnimated__line7 animated-background" />
                        <div className="roomAnimated__line8 animated-background" />
                        <div className="roomAnimated__line9 animated-background" />
                        <div className="roomAnimated__line10 animated-background" />
                        <div className="roomAnimated__line11 animated-background" />
                    </div>
                </div>
                <div className="roomAnimated__item">
                    <div className="roomAnimated__flex">
                        <div className="roomAnimated__line7 animated-background" />
                        <div className="roomAnimated__line8 animated-background" />
                        <div className="roomAnimated__line9 animated-background" />
                        <div className="roomAnimated__line10 animated-background" />
                        <div className="roomAnimated__line11 animated-background" />
                    </div>
                </div>
                <div className="roomAnimated__item">
                    <div className="roomAnimated__flex">
                        <div className="roomAnimated__line7 animated-background" />
                        <div className="roomAnimated__line8 animated-background" />
                        <div className="roomAnimated__line9 animated-background" />
                        <div className="roomAnimated__line10 animated-background" />
                        <div className="roomAnimated__line11 animated-background" />
                    </div>
                </div>
                <div className="roomAnimated__item">
                    <div className="roomAnimated__flex">
                        <div className="roomAnimated__line7 animated-background" />
                        <div className="roomAnimated__line8 animated-background" />
                        <div className="roomAnimated__line9 animated-background" />
                        <div className="roomAnimated__line10 animated-background" />
                        <div className="roomAnimated__line11 animated-background" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListRoomLoading
