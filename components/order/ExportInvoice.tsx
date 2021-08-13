import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Form, Input, AutoComplete, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { getFullName } from '../../utils/user'
import { getCompanyByTaxCode, getInvoiceByOrderToken, sendRequestInvoice } from '../../api/common-services'
import { DEFAULT_VALIDATION } from '../../constants/common'
import { RequestInvoice, ValidationForm } from '../../constants/interface'
import { showMessage } from '../../utils/common'

interface Props {
    orderId: number
    orderCode: string
    orderToken: string
    customerData: any
}

const ExportInvoice: React.FC<Props> = ({ orderId, orderCode, orderToken, customerData }) => {
    const { t } = useTranslation(['common', 'hotel', 'notification'])
    const [taxCode, setTaxCode] = useState<string>('')
    const [validateTaxCode, setValidateTaxCode] = useState<ValidationForm>(DEFAULT_VALIDATION)
    const [companyName, setCompanyName] = useState<string>('')
    const [validateCompanyName, setValidateCompanyName] = useState<ValidationForm>(DEFAULT_VALIDATION)
    const [companyAddress, setCompanyAddress] = useState<string>('')
    const [validateCompanyAddress, setValidateCompanyAddress] = useState<ValidationForm>(DEFAULT_VALIDATION)
    const [note, setNote] = useState<string>('')
    // const [searchSeleted, setSearchSeleted] = useState<any>(null)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const typingRef = useRef<any>(null)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isAllowInvoice, setIsAllowInvoice] = useState<boolean>(false)
    const [isDisable, setIsDisable] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData(order_token_invoice: string) {
            try {
                const resInvoice = await getInvoiceByOrderToken(order_token_invoice)
                setCompanyName(resInvoice?.data?.invoice_company_name)
                setTaxCode(resInvoice?.data?.invoice_customer_tax_code)
                setCompanyAddress(resInvoice?.data?.invoice_company_address)
                setNote(resInvoice?.data?.note)
                setIsDisable(resInvoice?.data?.invoice_status !== 0) // Điều kiện xuất hóa đơn là khác 0
                setIsAllowInvoice(resInvoice?.statusCode === 200 && resInvoice?.data?.allow_issue)
            } catch (e) {
                throw e
            }
        }
        if (orderToken || isOpen) {
            fetchData(orderToken)
        }
    }, [orderToken, isOpen])

    // handle search autocomplete
    const onSearch = (searchText: string) => {
        setTaxCode(searchText)
        setValidateTaxCode(DEFAULT_VALIDATION)
        if (typingRef.current) {
            clearTimeout(typingRef.current)
        }

        typingRef.current = setTimeout(() => {
            callApiSuggestion(searchText)
        }, 300)
    }

    // handle select item autocomplete
    const onSelect = (value: string) => {
        // clear error message
        setValidateTaxCode(DEFAULT_VALIDATION)
        setValidateCompanyName(DEFAULT_VALIDATION)
        setValidateCompanyAddress(DEFAULT_VALIDATION)
        // find item in search results
        const item = searchResults.find((item) => item.taxCode === value)
        if (item) {
            setTaxCode(value)
            setCompanyName(item.companyName)
            setCompanyAddress(item.address)
        }
    }

    // call api search company
    const callApiSuggestion = async (keyword: string) => {
        try {
            if (keyword.length >= 2) {
                const res = await getCompanyByTaxCode(keyword)
                if (res.Success && res.Data) {
                    const data = JSON.parse(res.Data)
                    setSearchResults([data])
                } else {
                    setSearchResults([])
                }
            } else {
                setSearchResults([])
            }
        } catch (e) {
            throw e
        }
    }

    // handle company name
    const onChangeCompanyName = (value: string) => {
        setCompanyName(value)
        setValidateCompanyName(DEFAULT_VALIDATION)
    }

    // handle company address
    const onChangeCompanyAddress = (value: string) => {
        setCompanyAddress(value)
        setValidateCompanyAddress(DEFAULT_VALIDATION)
    }

    // handle change note
    const onChangeNote = (value: string) => {
        setNote(value)
    }

    const openPopup = () => setIsOpen(true)

    const onCancel = () => {
        // clear data
        setNote('')
        setTaxCode('')
        setCompanyName('')
        setCompanyAddress('')
        // clear error message
        setValidateTaxCode(DEFAULT_VALIDATION)
        setValidateCompanyName(DEFAULT_VALIDATION)
        setValidateCompanyAddress(DEFAULT_VALIDATION)
        // clear search results
        setSearchResults([])
        // close popup
        setIsOpen(false)
    }

    const onOk = async () => {
        if (taxCode && !companyName) {
            setValidateCompanyName({ status: 'error', text: t('notification:Vui lòng tên công ty') })
            return
        }
        if (taxCode && !companyAddress) {
            setValidateCompanyAddress({ status: 'error', text: t('notification:Vui lòng địa chỉ công ty') })
            return
        }
        try {
            const data: RequestInvoice = {
                order_id: orderId,
                order_code: orderCode,
                order_token: orderToken,
                invoice_customer_tax_code: taxCode,
                invoice_company_name: companyName,
                invoice_company_address: companyAddress,
                note: note,
            }
            const res = await sendRequestInvoice(data)
            if (res.statusCode === 200) {
                showMessage('success', t('notification:Lưu thông tin hóa đơn thành công'))
                onCancel() // close popup and clear data
            } else {
                showMessage('error', t('notification:Lưu thông tin hóa đơn thất bại'))
            }
        } catch (e) {
            showMessage('error', t('notification:Lưu thông tin hóa đơn thất bại'))
            // throw e
        }
    }

    return (
        <>
            {isAllowInvoice ? (
                <Button type="primary" onClick={openPopup}>
                    {t('Thêm thông tin xuất hóa đơn VAT')}
                </Button>
            ) : (
                <Tooltip placement="topLeft" title={t('Đơn hàng này không được hỗ trợ xuất hóa đơn')}>
                    <Button type="primary" disabled={true}>
                        {t('Thêm thông tin xuất hóa đơn VAT')}
                    </Button>
                </Tooltip>
            )}

            <Modal
                visible={isOpen}
                title={t('Xuất hóa đơn')}
                cancelText={t('Hủy')}
                onCancel={onCancel}
                okText={'Gửi yêu cầu'}
                okButtonProps={{ disabled: isDisable }}
                onOk={onOk}
                maskClosable={false}
                width={650}
            >
                <div className="billGroup">
                    <Form layout="vertical" size="large">
                        <div className="billGroup__item">
                            <div className="billGroup__title">
                                <span className="size-16 semibold title">{t('Thông tin về hóa đơn')}</span>
                            </div>
                            <div className="billGroup__form">
                                <div className="form-search">
                                    <div className="form-group w100 mb0 mr15">
                                        <Form.Item
                                            label={
                                                <>
                                                    {t('Mã số thuế công ty')}&nbsp;<span className="red-1">*</span>
                                                </>
                                            }
                                            validateStatus={validateTaxCode.status}
                                            help={validateTaxCode.text}
                                        >
                                            <AutoComplete
                                                disabled={isDisable}
                                                onSearch={onSearch}
                                                onSelect={onSelect}
                                                value={taxCode}
                                            >
                                                {searchResults.map((item) => {
                                                    return (
                                                        <AutoComplete.Option key={item.taxCode} value={item.taxCode}>
                                                            {item.companyName}
                                                        </AutoComplete.Option>
                                                    )
                                                })}
                                            </AutoComplete>
                                        </Form.Item>
                                    </div>
                                    {/*<Form.Item>*/}
                                    {/*    <Button type="primary" className="btn">*/}
                                    {/*        {t('Tìm kiếm')}*/}
                                    {/*    </Button>*/}
                                    {/*</Form.Item>*/}
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        label={
                                            <>
                                                {t('Tên công ty, vui lòng điền đúng theo thông tin đăng ký thuế')}&nbsp;
                                                <span className="red-1">*</span>
                                            </>
                                        }
                                        validateStatus={validateCompanyName.status}
                                        help={validateCompanyName.text}
                                    >
                                        <Input
                                            disabled={isDisable}
                                            value={companyName}
                                            onChange={(event) => onChangeCompanyName(event.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        label={
                                            <>
                                                {t('Địa chỉ công ty, vui lòng điền đúng theo thông tin đăng ký thuế')}
                                                &nbsp;<span className="red-1">*</span>
                                            </>
                                        }
                                        validateStatus={validateCompanyAddress.status}
                                        help={validateCompanyAddress.text}
                                    >
                                        <Input
                                            value={companyAddress}
                                            disabled={isDisable}
                                            onChange={(event) => onChangeCompanyAddress(event.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item label={t('Ghi chú')}>
                                        <Input.TextArea
                                            disabled={isDisable}
                                            rows={3}
                                            value={note}
                                            onChange={(event) => onChangeNote(event.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className="billGroup__item">
                            <div className="billGroup__title">
                                <span className="size-16 semibold title">{t('Thông tin người nhận hóa đơn')}</span>
                            </div>
                            <div className="billGroup__form">
                                <div className="form-group">
                                    <Form.Item
                                        label={
                                            <>
                                                {t('Họ và tên người nhận hóa đơn')}&nbsp;
                                                <span className="red-1">*</span>
                                            </>
                                        }
                                    >
                                        <Input
                                            value={getFullName(customerData?.first_name, customerData?.last_name)}
                                            disabled={true}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        label={
                                            <>
                                                {t('Số điện thoại người nhận hóa đơn')}&nbsp;
                                                <span className="red-1">*</span>
                                            </>
                                        }
                                    >
                                        <Input value={customerData?.phone} disabled={true} />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        label={
                                            <>
                                                {t('Email người nhận hóa đơn')}&nbsp;<span className="red-1">*</span>
                                            </>
                                        }
                                    >
                                        <Input value={customerData?.email} disabled={true} />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default ExportInvoice
