import { Button, Modal } from 'antd'

interface Props {
    isRegister: boolean
    phone: string
    emails: string[]
    onCancel?: (e: any) => void
    onRegister?: (e: any) => void
}

const PhoneNotVerifyPopup = ({ isRegister, phone, emails, onCancel, onRegister }: Props) => {
    return (
        <Modal
            className="modal-login"
            maskClosable={false}
            title={'Số điện thoại chưa xác thực'}
            visible={true}
            footer={null}
            onCancel={onCancel}
        >
            <div>
                <span>Số điện thoại </span>
                <span style={{ color: '#1890ff' }}>{phone}</span>
                <span> đã được liên kết với các tài khoản </span>
                <span style={{ color: '#1890ff' }}>{emails.join(', ')}</span>
                <span>
                    {' '}
                    chưa được xác thực. Vui lòng đăng nhập vào một trong các tài khoản trên để xác thực số điện thoại.{' '}
                </span>
                {isRegister ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button style={{ border: 'none' }} onClick={onCancel}>
                            Hủy
                        </Button>
                        <Button style={{ border: 'none', color: '#ff8917' }} onClick={onRegister}>
                            Tạo tài khoản mới
                        </Button>
                    </div>
                ) : null}
            </div>
        </Modal>
    )
}

export default PhoneNotVerifyPopup
