import React from 'react'
import { Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setReceiverData } from '../../store/checkout/action'
import { convertFullNameToFirstLastName, getFullName } from '../../utils/user'
import { Receiver } from '../../constants/interface'
import ReceiverItem from './ReceiverItem'

interface Props {}

const ReceiverInfo: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const { bookerData, receiverData } = useSelector((state: any) => {
        return {
            bookerData: state.checkout.bookerData,
            receiverData: state.checkout.receiverData,
        }
    })

    const onChangeName = (index: number, full_name: string) => {
        const first_name = convertFullNameToFirstLastName(full_name, 'FIRST')
        const last_name = convertFullNameToFirstLastName(full_name, 'LAST')
        const receiver: Receiver[] = [...receiverData]
        receiver[index]['first_name'] = first_name
        receiver[index]['last_name'] = last_name
        receiver[index]['name_status'] = 'success'
        receiver[index]['name_text'] = ''
        dispatch(setReceiverData(receiver))
    }

    const onChangePhone = (index: number, phone: string) => {
        const receiver: Receiver[] = [...receiverData]
        receiver[index]['phone'] = phone
        receiver[index]['phone_status'] = 'success'
        receiver[index]['phone_text'] = ''
        dispatch(setReceiverData(receiver))
    }

    return (
        <div className={`checkoutInfo__in ${bookerData?.is_receiver ? '' : 'open'}`}>
            <Form layout="vertical" size={'large'}>
                <ul>
                    {Array.isArray(receiverData) &&
                        receiverData.map((item, index) => {
                            return (
                                <ReceiverItem
                                    key={`receiver-${index}`}
                                    index={index}
                                    fullName={getFullName(item.first_name, item.last_name)}
                                    phone={item.phone}
                                    onChangeName={onChangeName}
                                    onChangePhone={onChangePhone}
                                    name_status={item.name_status}
                                    name_text={item.name_text}
                                    phone_status={item.phone_status}
                                    phone_text={item.phone_text}
                                />
                            )
                        })}
                </ul>
            </Form>
        </div>
    )
}

export default ReceiverInfo
