import React from 'react'

function FlightLoading() {
    return (
        <div className="flightHoldPopup">
            <div className="flightHoldPopup__body">
                <div className="flightHoldPopup__img">
                    <svg
                        width={188}
                        height={91}
                        viewBox="0 0 188 91"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="air-plane"
                    >
                        <path
                            d="M17.6656 41.8826C19.5498 42.6733 22.8661 43.4096 26.7358 44.033C37.2343 45.7752 51.6785 46.8676 51.6785 46.8676C51.6785 46.8676 125.758 56.3399 182.504 35.8166C182.504 35.8166 190.805 31.9225 183.534 25.845C182.419 24.9314 181.221 24.1318 179.959 23.4277L179.866 23.3254C179.041 22.5031 178.154 21.737 177.205 21.0664C174.395 19.0758 169.627 16.6252 163.639 17.3811L16.2246 34.6299C16.2246 34.6299 10.6681 38.9207 17.6656 41.8826Z"
                            fill="#FDB913"
                        />
                        <path
                            d="M47.3067 32.4139L17.625 9.25608L4.01421 11.0095L16.2051 34.6488C16.2255 34.63 46.7845 36.2405 47.3067 32.4139Z"
                            fill="#FDB913"
                        />
                        <path
                            d="M125.024 22.5825L64.7619 2.70399L54.8193 4.32545L81.847 17.9965L90.0383 28.0431L125.024 22.5825Z"
                            fill="#FDB913"
                        />
                        <path
                            d="M26.7351 44.033C37.2335 45.7753 51.6777 46.8676 51.6777 46.8676C51.6777 46.8676 125.758 56.3399 182.504 35.8167C182.504 35.8167 190.804 31.9225 183.533 25.8451L183.509 25.9422C183.509 25.9422 171.127 33.564 113.359 37.8179L26.7351 44.033Z"
                            fill="#FFDFB8"
                        />
                        <path
                            d="M36.5495 43.9969L8.76745 53.9607L1.94062 52.8919L18.8077 41.3049C18.8272 41.3058 38.7558 37.9666 36.5495 43.9969Z"
                            fill="#FDB913"
                        />
                        <path
                            d="M173.547 26.6986C174.856 26.7763 177.925 24.7125 179.847 23.3246C179.021 22.5023 178.135 21.7363 177.185 21.0656C175.629 22.1555 172.888 23.8999 171.426 23.7565C169.279 23.5827 171.595 26.5727 173.547 26.6986Z"
                            fill="#FFDFB8"
                        />
                        <path
                            d="M46.8372 83.1474L64.3098 84.8454L115.043 53.724L124.465 47.9546L129.035 45.1521C121.021 37.7257 86.5785 45.9602 86.5785 45.9602C85.9091 46.4805 85.6533 47.3923 85.648 48.3938C85.6223 50.2979 86.4037 52.5521 86.7199 53.3714C86.7894 53.5709 86.8437 53.6715 86.8437 53.6715L46.8372 83.1474Z"
                            fill="#FDB913"
                        />
                    </svg>
                    <svg
                        width={90}
                        height={59}
                        viewBox="0 0 90 59"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cloud cloud1"
                    >
                        <path
                            d="M86.8702 25.5825L75.3196 32.9815L82.3245 20.2015C80.3125 18.632 77.8533 17.7352 75.3196 17.6604H75.0961C74.2764 17.6604 73.4566 17.5857 72.7114 17.5109L68.7619 19.9773L70.4759 16.9131C67.7187 15.9415 65.334 14.0731 63.6201 11.6815L56.6152 16.1657L61.0119 8.09412C56.9878 3.1615 51.3988 0.09729 45.3628 0.09729C38.0598 0.09729 31.5766 4.43202 27.4035 11.2331C24.8699 15.3436 20.3242 17.8099 15.4804 17.6604H15.1078C7.05966 17.6604 0.501953 26.853 0.501953 38.1383C0.501953 49.4235 7.05966 58.6162 15.1078 58.6162C16.8963 58.6162 18.6102 58.1677 20.1751 57.3456C25.6896 54.6551 32.1728 54.5056 37.8363 56.9719C42.6055 59.1393 48.0455 59.1393 52.8147 57.0467C58.4037 54.5804 64.8124 54.7298 70.3268 57.3456C71.8917 58.1677 73.6057 58.6162 75.3942 58.6162C83.4423 58.6162 90 49.4235 90 38.1383C89.9255 33.7288 88.8822 29.4688 86.8702 25.5825Z"
                            fill="#EFEFEF"
                        />
                        <path
                            opacity="0.03"
                            d="M65.1105 55.5517C60.9374 54.7296 56.5407 55.2528 52.5912 56.897C47.8219 59.0643 42.382 59.0643 37.6127 56.897C31.9492 54.4307 25.5405 54.5054 19.9516 57.2707C18.3867 58.0928 16.6727 58.5412 14.8842 58.5412C7.73035 58.5412 1.76879 51.2917 0.501953 41.8002C1.91783 40.7538 3.18465 39.4086 4.07889 37.9138C8.25199 31.1128 14.8097 26.7781 22.0381 26.7781C29.3411 26.7781 35.7497 31.0381 39.9228 37.7644C42.4565 41.8749 47.0022 44.4159 51.846 44.3412H52.0695C57.733 44.2665 62.6513 48.8254 65.1105 55.5517Z"
                            fill="black"
                        />
                    </svg>
                    <svg
                        width={90}
                        height={59}
                        viewBox="0 0 90 59"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cloud cloud2"
                    >
                        <path
                            d="M86.8702 25.5825L75.3196 32.9815L82.3245 20.2015C80.3125 18.632 77.8533 17.7352 75.3196 17.6604H75.0961C74.2764 17.6604 73.4566 17.5857 72.7114 17.5109L68.7619 19.9773L70.4759 16.9131C67.7187 15.9415 65.334 14.0731 63.6201 11.6815L56.6152 16.1657L61.0119 8.09412C56.9878 3.1615 51.3988 0.09729 45.3628 0.09729C38.0598 0.09729 31.5766 4.43202 27.4035 11.2331C24.8699 15.3436 20.3242 17.8099 15.4804 17.6604H15.1078C7.05966 17.6604 0.501953 26.853 0.501953 38.1383C0.501953 49.4235 7.05966 58.6162 15.1078 58.6162C16.8963 58.6162 18.6102 58.1677 20.1751 57.3456C25.6896 54.6551 32.1728 54.5056 37.8363 56.9719C42.6055 59.1393 48.0455 59.1393 52.8147 57.0467C58.4037 54.5804 64.8124 54.7298 70.3268 57.3456C71.8917 58.1677 73.6057 58.6162 75.3942 58.6162C83.4423 58.6162 90 49.4235 90 38.1383C89.9255 33.7288 88.8822 29.4688 86.8702 25.5825Z"
                            fill="#EFEFEF"
                        />
                        <path
                            opacity="0.03"
                            d="M65.1105 55.5517C60.9374 54.7296 56.5407 55.2528 52.5912 56.897C47.8219 59.0643 42.382 59.0643 37.6127 56.897C31.9492 54.4307 25.5405 54.5054 19.9516 57.2707C18.3867 58.0928 16.6727 58.5412 14.8842 58.5412C7.73035 58.5412 1.76879 51.2917 0.501953 41.8002C1.91783 40.7538 3.18465 39.4086 4.07889 37.9138C8.25199 31.1128 14.8097 26.7781 22.0381 26.7781C29.3411 26.7781 35.7497 31.0381 39.9228 37.7644C42.4565 41.8749 47.0022 44.4159 51.846 44.3412H52.0695C57.733 44.2665 62.6513 48.8254 65.1105 55.5517Z"
                            fill="black"
                        />
                    </svg>
                    <svg
                        width={90}
                        height={59}
                        viewBox="0 0 90 59"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cloud cloud3"
                    >
                        <path
                            d="M86.8702 25.5825L75.3196 32.9815L82.3245 20.2015C80.3125 18.632 77.8533 17.7352 75.3196 17.6604H75.0961C74.2764 17.6604 73.4566 17.5857 72.7114 17.5109L68.7619 19.9773L70.4759 16.9131C67.7187 15.9415 65.334 14.0731 63.6201 11.6815L56.6152 16.1657L61.0119 8.09412C56.9878 3.1615 51.3988 0.09729 45.3628 0.09729C38.0598 0.09729 31.5766 4.43202 27.4035 11.2331C24.8699 15.3436 20.3242 17.8099 15.4804 17.6604H15.1078C7.05966 17.6604 0.501953 26.853 0.501953 38.1383C0.501953 49.4235 7.05966 58.6162 15.1078 58.6162C16.8963 58.6162 18.6102 58.1677 20.1751 57.3456C25.6896 54.6551 32.1728 54.5056 37.8363 56.9719C42.6055 59.1393 48.0455 59.1393 52.8147 57.0467C58.4037 54.5804 64.8124 54.7298 70.3268 57.3456C71.8917 58.1677 73.6057 58.6162 75.3942 58.6162C83.4423 58.6162 90 49.4235 90 38.1383C89.9255 33.7288 88.8822 29.4688 86.8702 25.5825Z"
                            fill="#EFEFEF"
                        />
                        <path
                            opacity="0.03"
                            d="M65.1105 55.5517C60.9374 54.7296 56.5407 55.2528 52.5912 56.897C47.8219 59.0643 42.382 59.0643 37.6127 56.897C31.9492 54.4307 25.5405 54.5054 19.9516 57.2707C18.3867 58.0928 16.6727 58.5412 14.8842 58.5412C7.73035 58.5412 1.76879 51.2917 0.501953 41.8002C1.91783 40.7538 3.18465 39.4086 4.07889 37.9138C8.25199 31.1128 14.8097 26.7781 22.0381 26.7781C29.3411 26.7781 35.7497 31.0381 39.9228 37.7644C42.4565 41.8749 47.0022 44.4159 51.846 44.3412H52.0695C57.733 44.2665 62.6513 48.8254 65.1105 55.5517Z"
                            fill="black"
                        />
                    </svg>
                </div>
                <div className="flightHoldPopup__text">
                    <h5>Hệ thống đang tiến hành đặt chỗ!</h5>
                    <p>Tiến trình có thể mất vài phút</p>
                </div>
            </div>
        </div>
    )
}

export default FlightLoading
