import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Button, Modal, Radio, Input, Tooltip, Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { getReasonCancelBooking, cancelTicket, cancelTicketByToken } from '../../api/order-services'
import { getBanks, getBranchsByBankId } from '../../api/common-services'
import { Bank, BankBranch, ValidationForm } from '../../constants/interface'
import { BANK, BANK_BRANCH, DEFAULT_VALIDATION } from '../../constants/common'
import { showMessage } from '../../utils/common'
import { useDispatch } from 'react-redux'
import { setRefreshTime } from '../../store/common/action'

interface Props {
    orderId: number
    roomName: string
    roomCount: number
    cancelPolicies: string
    orderStatus: string
    checkInDate: Date
    cancelOrderToken?: string
}

const CancelBooking: React.FC<Props> = ({
    orderId,
    cancelPolicies,
    roomName,
    roomCount,
    orderStatus,
    checkInDate,
    cancelOrderToken,
}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel', 'notification', 'payment'])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [listReason, setListReason] = useState<any[]>([])
    const [reasonSelected, setReasonSelected] = useState<any>(null)
    const [isShowOtherContent, setIsShowOtherContent] = useState<boolean>(false)
    const [otherContent, setOtherContent] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAllowCancel, setIsAllowCancel] = useState<boolean>(false)
    const [listBank, setListBank] = useState<Bank[]>([BANK])
    const [bankSelected, setBankSelected] = useState<Bank>(BANK)
    const [listBranchs, setListBranchs] = useState<BankBranch[]>([])
    const [branchSelected, setBranchSelected] = useState<BankBranch>(BANK_BRANCH)
    const [loadingBranch, setLoadingBranch] = useState<boolean>(false)
    const [bankAccountName, setBankAccountName] = useState<string>('')
    const [bankAccountNumber, setBankAccountNumber] = useState<string>('')
    const [validateBaName, setValidateBaName] = useState<ValidationForm>(DEFAULT_VALIDATION)
    const [validateBaNumber, setValidateBaNumber] = useState<ValidationForm>(DEFAULT_VALIDATION)

    useEffect(() => {
        async function fetchData() {
            try {
                const [resReasons, resBanks] = await Promise.all([getReasonCancelBooking(), getBanks()])
                if (Array.isArray(resReasons.data) && resReasons.data.length > 0) {
                    setListReason(resReasons.data)
                    setReasonSelected(resReasons.data[0])
                }
                if (Array.isArray(resBanks.data) && resBanks.data.length > 0) {
                    setListBank(resBanks.data)
                    setBankSelected(resBanks.data[0])
                }
            } catch (e) {
                throw e
            }
        }

        fetchData()
    }, [])

    // handle is show cancel booking
    useEffect(() => {
        setIsAllowCancel(orderStatus === 'order_success' && moment().isBefore(moment(checkInDate)))
    }, [orderStatus, checkInDate])

    // handle change bank: get bank branchs
    useEffect(() => {
        async function fetchBankBranchs(bankId: number) {
            try {
                setLoadingBranch(true)
                const res = await getBranchsByBankId(bankId)
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setListBranchs(res.data)
                    setBranchSelected(res.data[0])
                } else {
                    setListBranchs([])
                    setBranchSelected(BANK_BRANCH)
                }
                setLoadingBranch(false)
            } catch (e) {
                setLoadingBranch(false)
                throw e
            }
        }

        if (bankSelected?.id) {
            fetchBankBranchs(bankSelected.id)
        }
    }, [bankSelected])

    // handle change reason
    const onChangeReason = (reasonId: number) => {
        const reason = listReason.find((item) => item.id === reasonId)
        if (reason) {
            setReasonSelected(reason)
            setIsShowOtherContent(reason.code === 'CANCEL_REASON_5')
        }
    }

    // handle change content
    const onChangeOtherContent = (value: string) => {
        setOtherContent(value)
    }

    // handle change bank account name
    const onChangeBankAccountName = (value: string) => {
        setBankAccountName(value)
        setValidateBaName(DEFAULT_VALIDATION)
    }
    // handle change bank account number
    const onChangeBankAccountNumber = (value: string) => {
        setBankAccountNumber(value)
        setValidateBaNumber(DEFAULT_VALIDATION)
    }

    // handle change bank
    const onChangeBank = (value: number | string, option: any) => {
        setBankSelected(option.data)
    }

    // handle change branch
    const onChangeBranch = (value: number | string, option: any) => {
        setBranchSelected(option.data)
    }

    const openPopup = () => setIsOpen(true)

    const onCancel = () => setIsOpen(false)

    const onOk = async () => {
        if (!bankAccountName) {
            setValidateBaName({ status: 'error', text: t('notification:Vui l??ng nh???p th??ng tin') })
            return
        }
        if (!bankAccountNumber) {
            setValidateBaNumber({ status: 'error', text: t('notification:Vui l??ng nh???p th??ng tin') })
            return
        }
        const data: any = {
            order_id: orderId,
            reason: reasonSelected.code,
            action_type: 'create_cancel',
            reason_detail: otherContent,
            bank_account_name: bankAccountName,
            bank_account_id: bankAccountNumber,
            bank_id: bankSelected.id,
            bank_branch_id: branchSelected.id,
        }
        try {
            setIsLoading(true)

            let res
            if (cancelOrderToken) {
                data.cancel_order_token = cancelOrderToken
                res = await cancelTicketByToken(data)
            } else {
                res = await cancelTicket(data)
            }

            setIsLoading(false)
            if (res.status === 'success') {
                showMessage(
                    'success',
                    t(
                        'Vntrip.vn ???? nh???n ???????c th??ng tin t??? qu?? kh??ch, b??? ph???n Ch??m s??c kh??ch h??ng s??? x??? l?? v?? th??ng b??o t???i qu?? kh??ch'
                    )
                )
                onCancel()
                dispatch(setRefreshTime(+new Date()))
            } else {
                showMessage('error', res.message)
            }
        } catch (e) {
            setIsLoading(false)
            showMessage('error', 'G???i y??u c???u h???y th???t b???i')
            throw e
        }
    }

    return (
        <>
            {isAllowCancel ? (
                <Button type="primary" onClick={openPopup}>
                    {t('hotel:H???y ?????t ph??ng')}
                </Button>
            ) : (
                <Tooltip
                    placement="topLeft"
                    title={t('notification:Ch??? c?? th??? h???y ????n h??ng ???? th??nh c??ng v?? ch??a qua ng??y check-in')}
                >
                    <Button type="primary" disabled={true}>
                        {t('hotel:H???y ?????t ph??ng')}
                    </Button>
                </Tooltip>
            )}
            <Modal
                visible={isOpen}
                title={t('hotel:H???y ph??ng')}
                onCancel={onCancel}
                onOk={onOk}
                cancelText={t('H???y')}
                okText={t('Ti???p t???c')}
                maskClosable={false}
                width={800}
                confirmLoading={isLoading}
            >
                <div className="cancelPopup">
                    <div className="cancelPopup__cont pr15">
                        <div className="cancelPolicy">
                            <div className="cancelPopup__title">
                                <span className="semibold title">{t('hotel:Ch??nh s??ch h???y ph??ng')}</span>
                            </div>
                            <div className="cancelPolicy__room mb15">
                                <div className="roomName flexGroup mb5">
                                    <span className="semibold">{roomName}</span>
                                    <span>
                                        x {roomCount} {t(roomCount > 1 ? 'hotel:ph??ngs' : 'hotel:ph??ng')}
                                    </span>
                                </div>
                                <div className="roomDescription">
                                    <p>{cancelPolicies}</p>
                                </div>
                            </div>
                        </div>
                        <div className="cancelReason">
                            <div className="cancelPopup__title">
                                <span className="semibold title">{t('L?? do h???y ph??ng')}</span>
                            </div>
                            <div className="cancelReason__form">
                                <p className="semibold">{t('L?? do b???n y??u c???u h???y ????n ?????t ph??ng n??y l?? g??')}?</p>
                                <p>{t('Th??ng tin n??y c???n thi???t ????? ho??n th??nh y??u c???u h???y')}</p>
                                <form>
                                    <Radio.Group
                                        onChange={(event) => {
                                            onChangeReason(event.target.value)
                                        }}
                                        value={reasonSelected ? reasonSelected.id : ''}
                                    >
                                        {listReason.map((item) => {
                                            return (
                                                <div className="radio mb5" key={item.id}>
                                                    <Radio key={item.id} value={item.id}>
                                                        {item.content}
                                                    </Radio>
                                                </div>
                                            )
                                        })}
                                    </Radio.Group>
                                    {isShowOtherContent && (
                                        <Input.TextArea
                                            placeholder={t('L?? do b???n h???y ????n')}
                                            style={{ marginTop: 10 }}
                                            rows={4}
                                            value={otherContent}
                                            onChange={(event: any) => {
                                                onChangeOtherContent(event.target.value)
                                            }}
                                        />
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="cancelPopup__customer pl15">
                        <Form layout="vertical" size={'large'}>
                            <div className="cancelPopup__title">
                                <span className="semibold title">{t('Th??ng tin ng?????i nh???n ti???n ho??n tr???')}</span>
                            </div>
                            <div className="cancelPopup__form">
                                <Radio className="radio mb10" checked={true}>
                                    {t('Nh???n ti???n qua t??i kho???n ng??n h??ng')}
                                </Radio>

                                <div className="form-group">
                                    <Form.Item
                                        label={'T??n ch??? t??i kho???n'}
                                        validateStatus={validateBaName.status}
                                        help={validateBaName.text}
                                    >
                                        <Input
                                            value={bankAccountName}
                                            onChange={(event) => onChangeBankAccountName(event.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        label={t('payment:S??? t??i kho???n')}
                                        validateStatus={validateBaNumber.status}
                                        help={validateBaNumber.text}
                                    >
                                        <Input
                                            value={bankAccountNumber}
                                            onChange={(event) => onChangeBankAccountNumber(event.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item label={t('Ng??n h??ng')}>
                                        <Select
                                            placeholder={t('Ch???n ng??n h??ng')}
                                            value={bankSelected.id || t('Ch???n ng??n h??ng')}
                                            onChange={onChangeBank}
                                        >
                                            {listBank.map((bank) => (
                                                <Select.Option key={bank.id} value={bank.id} data={bank}>
                                                    <strong>{bank.short_name}</strong> ({bank.display_name})
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item label={t('Chi nh??nh')}>
                                        <Select
                                            placeholder={t('Ch???n chi nh??nh')}
                                            value={branchSelected.id || t('Ch???n chi nh??nh')}
                                            onChange={onChangeBranch}
                                            loading={loadingBranch}
                                        >
                                            {listBranchs.map((branch) => (
                                                <Select.Option key={branch.id} value={branch.id} data={branch}>
                                                    {branch.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CancelBooking
