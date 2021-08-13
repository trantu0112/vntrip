import React from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const OperationRegulations = () => {
    const { t } = useTranslation(['common'])
    return (
        <Layout>
            <section className="termOfUse">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">
                                <a>
                                    <span>{t('common:Trang chủ')}</span>
                                </a>
                            </Link>
                        </li>
                        <li className="active">{t('common:Quy chế hoạt động')}</li>
                    </ul>
                    <div className="termOfUse__body">
                        <h2 className="size-24 mb5 uppercase text-center">QUY CHẾ HOẠT ĐỘNG</h2>
                        <p className="semibold size-22 uppercase text-center mb15">
                            WEBSITE CUNG CẤP DỊCH VỤ THƯƠNG MẠI ĐIỆN TỬ VNTRIP.VN
                        </p>
                        <div className="termOfUse__cont">
                            <p>
                                <strong>I. Nguy&ecirc;n tắc chung</strong>
                            </p>

                            <p>
                                Website cung cấp dịch vụ thương mại điện tử Vntrip.vn được thiết lập dưới h&igrave;nh
                                thức S&agrave;n Giao dịch thương mại điện tử. S&agrave;n Giao dịch thương mại điện tử
                                Vntrip.vn (sau đ&acirc;y gọi l&agrave; S&agrave;n Giao dịch TMĐT Vntrip.vn hoặc
                                Vntrip.vn) do C&ocirc;ng ty tr&aacute;ch nhiệm hữu hạn VNTRIP OTA l&agrave;m chủ sở hữu.
                                Th&agrave;nh vi&ecirc;n tr&ecirc;n S&agrave;n Giao dịch TMĐT Vntrip.vn l&agrave;
                                c&aacute;c thương nh&acirc;n, tổ chức v&agrave; c&aacute; nh&acirc;n đ&atilde; đăng
                                k&yacute; th&agrave;nh vi&ecirc;n v&agrave; c&oacute; nhu cầu đăng tin hoặc t&igrave;m
                                th&ocirc;ng tin về kh&aacute;ch sạn tr&ecirc;n khắp cả nước, được S&agrave;n Giao dịch
                                TMĐT Vntrip.vn c&ocirc;ng nhận v&agrave; sử dụng dịch vụ do S&agrave;n GD TMĐT Vntrip.vn
                                v&agrave; c&aacute;c b&ecirc;n li&ecirc;n quan cung cấp.
                            </p>

                            <p>
                                Tổ chức, c&aacute; nh&acirc;n tham gia giao dịch S&agrave;n Giao dịch TMĐT Vntrip.vn tự
                                do thoả thuận tr&ecirc;n cơ sở t&ocirc;n trọng quyền v&agrave; lợi &iacute;ch hợp
                                ph&aacute;p của nhau th&ocirc;ng qua hợp đồng dịch vụ v&agrave; kh&ocirc;ng tr&aacute;i
                                quy định ph&aacute;p luật.
                                <br />
                                - Chức năng của Vntrip.vn l&agrave; tổ chức thực hiện c&aacute;c giao dịch đặt
                                ph&ograve;ng giữa kh&aacute;ch h&agrave;ng v&agrave; kh&aacute;ch sạn,
                                <br />
                                - S&agrave;n GD TMĐT Vntrip.vn đăng th&ocirc;ng tin kh&aacute;ch sạn l&ecirc;n Vntrip.vn
                                dựa tr&ecirc;n c&aacute;c th&ocirc;ng tin được c&aacute;c kh&aacute;ch sạn cung cấp để
                                th&ocirc;ng tin c&oacute; thể dễ d&agrave;ng tiếp cận đến kh&aacute;ch h&agrave;ng.
                                <br />- Vntrip.vn sẽ trực tiếp hoặc y&ecirc;u cầu c&aacute;c kh&aacute;ch sạn
                                th&agrave;nh vi&ecirc;n giải quyết tất cả c&aacute;c y&ecirc;u cầu của kh&aacute;ch
                                h&agrave;ng khi đặt ph&ograve;ng.
                            </p>

                            <p>
                                C&aacute;c th&ocirc;ng tin được đăng tải tr&ecirc;n S&agrave;n Giao dịch TMĐT Vntrip.vn
                                phải đ&aacute;p ứng đầy đủ quy định của ph&aacute;p luật c&oacute; li&ecirc;n quan,
                                kh&ocirc;ng thuộc c&aacute;c trường hợp cấm kinh doanh, cấm quảng c&aacute;o theo quy
                                định của ph&aacute;p luật.
                            </p>

                            <p>
                                Hoạt động cung cấp dịch vụ, trao đổi th&ocirc;ng tin về kh&aacute;ch sạn qua S&agrave;n
                                Giao dịch TMĐT Vntrip.vn phải được thực hiện c&ocirc;ng khai, minh bạch, đảm bảo quyền
                                lợi của Th&agrave;nh vi&ecirc;n v&agrave; người d&ugrave;ng.
                            </p>

                            <p>
                                <br />
                                <strong>II. Quy định chung</strong>
                                <br />
                                - Người d&ugrave;ng: l&agrave; người truy cập v&agrave;o Vntrip.vn.
                                <br />
                                - Th&agrave;nh vi&ecirc;n: l&agrave; c&aacute;c kh&aacute;ch sạn được Vntrip.vn đăng
                                k&yacute; th&agrave;nh vi&ecirc;n hoặc kh&aacute;ch h&agrave;ng đ&atilde; ho&agrave;n
                                th&agrave;nh quy tr&igrave;nh đăng k&yacute; th&agrave;nh vi&ecirc;n tr&ecirc;n
                                Vntrip.vn
                                <br />
                                - Kh&aacute;ch sạn: l&agrave; c&aacute;c kh&aacute;ch sạn tr&ecirc;n cả nước hợp
                                t&aacute;c với Vntrip.vn, được đăng tin tr&ecirc;n Vntrip.vn.
                                <br />
                                - Kh&aacute;ch h&agrave;ng l&agrave; những người sử dụng dịch vụ tr&ecirc;n Vntrip.vn
                                <br />
                                &nbsp;
                            </p>

                            <p>
                                <strong>III. Quy tr&igrave;nh giao dịch</strong>
                                <br />
                                S&agrave;n GD TMĐT Vntrip.vn được x&acirc;y dựng nhằm hỗ trợ tối đa cho kh&aacute;ch
                                h&agrave;ng c&oacute; nhu cầu t&igrave;m ph&ograve;ng kh&aacute;ch sạn để thu&ecirc; tại
                                tất cả c&aacute;c tỉnh th&agrave;nh trong cả nước,
                                <br />
                                Quy tr&igrave;nh đăng k&yacute; t&agrave;i khoản:
                                <br />
                                Kh&aacute;ch h&agrave;ng v&agrave;o trang Vntrip.vn sau đ&oacute; chọn mục &ldquo;Đăng
                                k&yacute;&rdquo; ở g&oacute;c tr&ecirc;n, b&ecirc;n phải m&agrave;n h&igrave;nh, sau
                                đ&oacute; kh&aacute;ch h&agrave;ng đăng k&yacute; t&agrave;i khoản bằng c&aacute;c
                                c&aacute;ch sau:
                                <br />
                                - Nhập email v&agrave;o &ocirc; Email, nhập mật khẩu v&agrave;o &ocirc; &ldquo;Mật
                                khẩu&rdquo; v&agrave; nhập lại mật khẩu một lần nữa ở &ocirc; &ldquo;Nhập lại mật
                                khẩu&rdquo; v&agrave; ho&agrave;n th&agrave;nh quy tr&igrave;nh đăng k&yacute;.
                                <br />- Kh&aacute;ch h&agrave;ng cũng c&oacute; thể đăng k&yacute; t&agrave;i khoản
                                th&ocirc;ng qua mạng x&atilde; hội Facebook v&agrave; Google.
                            </p>

                            <p>
                                <strong>1. Quy tr&igrave;nh d&agrave;nh cho người mua:</strong>
                                <br />
                                Kh&aacute;ch h&agrave;ng điền v&agrave;o mẫu th&ocirc;ng tin c&aacute; nh&acirc;n
                                c&oacute; sẵn tr&ecirc;n website của Vntrip.vn để đăng k&yacute; th&agrave;nh
                                vi&ecirc;n.
                                <br />
                                Hoặc kh&aacute;ch h&agrave;ng chỉ cần lựa chọn kh&aacute;ch sạn v&agrave; để lại
                                th&ocirc;ng tin theo mẫu c&oacute; sẵn tr&ecirc;n Vntrip.vn để c&oacute; thể bắt đầu
                                tiến h&agrave;nh đặt h&agrave;ng tr&ecirc;n Vntrip.vn. C&oacute; thể li&ecirc;n hệ trực
                                tiếp Call Center qua Customer service 1800-2032 để được hỗ trợ nếu cần thiết.
                                <br />
                                Sau khi đăng k&yacute; th&agrave;nh vi&ecirc;n th&agrave;nh c&ocirc;ng, Kh&aacute;ch
                                h&agrave;ng đăng nhập để xem c&aacute;c dịch vụ ưu đ&atilde;i đang c&oacute; tại website
                                Vntrip.vn.
                                <br />
                                Kh&aacute;ch h&agrave;ng c&oacute; thể lựa chọn thanh to&aacute;n trực tuyến bằng thẻ
                                thanh to&aacute;n quốc tế (Visa, Master Card, JCB...), thẻ ATM nội địa, chuyển khoản
                                ng&acirc;n h&agrave;ng, thanh to&aacute;n theo h&igrave;nh thức Li&ecirc;n hệ với
                                nh&agrave; cung cấp hoặc thanh to&aacute;n tiền mặt. Sau khi lựa chọn h&igrave;nh thức
                                thanh to&aacute;n xong, kh&aacute;ch h&agrave;ng sẽ nhận được email của website
                                Vntrip.vn.
                                <br />
                                Sau khi mua h&agrave;ng v&agrave; thanh to&aacute;n th&agrave;nh c&ocirc;ng,
                                kh&aacute;ch h&agrave;ng sẽ nhận được một email bao gồm th&ocirc;ng tin đơn h&agrave;ng
                                v&agrave; m&atilde; code để sử dụng dịch vụ khi đến sử dụng dịch vụ tại đối t&aacute;c
                                của Vntrip.vn hoặc khi mua h&agrave;ng từ đối t&aacute;c.
                                <br />
                                Cụ thể: Khi đặt ph&ograve;ng tr&ecirc;n Vntrip.vn người mua thực hiện theo c&aacute;c
                                bước sau đ&acirc;y:
                                <br />
                                - Bước 1 : Truy cập v&agrave;o website Vntrip.vn
                                <br />
                                - Bước 2 : Đăng nhập nếu đ&atilde; l&agrave; th&agrave;nh vi&ecirc;n của Vntrip.vn
                                <br />
                                - Bước 3 : T&igrave;m hiểu v&agrave; lựa chọn dịch vụ tr&ecirc;n website
                                <br />
                                - Bước 4 : Chọn dịch vụ với số lượng, th&ocirc;ng tin cụ thể, website Vntrip.vn sẽ hiển
                                thị c&aacute;c g&oacute;i dịch vụ của c&aacute;c b&ecirc;n cung cấp để người mua dễ
                                d&agrave;ng so s&aacute;nh v&agrave; lựa chọn. Người mua h&agrave;ng chọn g&oacute;i
                                dịch vụ mong muốn v&agrave; điền th&ocirc;ng tin cụ thể của người mua nếu chưa đăng
                                nhập, đặt lệnh mua h&agrave;ng.
                                <br />- Bước 5 : Thanh to&aacute;n v&agrave; nhận h&agrave;ng, phản hồi về chất lượng
                                dịch vụ tr&ecirc;n Vntrip.vn
                            </p>

                            <p>
                                <strong>2. Quy tr&igrave;nh d&agrave;nh cho người b&aacute;n:</strong>
                                <br />
                                Người b&aacute;n h&agrave;ng được đăng tin tr&ecirc;n website Vntrip.vn th&ocirc;ng qua
                                việc k&yacute; kết hợp đồng hợp t&aacute;c hoặc hợp đồng dịch vụ khuyến mại với
                                C&ocirc;ng ty tr&aacute;ch nhiệm hữu hạn VNTRIP OTA &ndash; đơn vị chủ quản của website
                                Vntrip.vn. Website Vntrip.vn chỉ l&agrave; trung gian giữa người mua v&agrave; người
                                b&aacute;n, kh&ocirc;ng trực tiếp cung cấp dịch vụ tới kh&aacute;ch h&agrave;ng.
                                <br />
                                Sau khi k&yacute; kết hợp đồng với đối t&aacute;c, Vntrip.vn sẽ cung cấp một t&agrave;i
                                khoản (Account) cho Đối t&aacute;c để đối t&aacute;c đăng h&igrave;nh ảnh, th&ocirc;ng
                                tin về dịch vụ, video quảng c&aacute;o về c&aacute;c hoạt động, th&ocirc;ng tin về sản
                                phẩm dịch vụ v&agrave; bảng gi&aacute; l&ecirc;n website Vntrip.vn để tiếp cận
                                kh&aacute;ch h&agrave;ng. Đối t&aacute;c c&oacute; thể linh hoạt trong việc chỉnh sửa,
                                hiệu đ&iacute;nh c&aacute;c th&ocirc;ng tin đ&atilde; đăng.
                                <br />
                                - Hoạt động b&aacute;n h&agrave;ng: C&aacute;c đối t&aacute;c c&oacute; thể giới thiệu
                                c&aacute;c g&oacute;i dịch vụ kh&aacute;ch sạn tr&ecirc;n Vntrip.vn. Kh&aacute;ch
                                h&agrave;ng c&oacute; thể trực tiếp xem x&eacute;t c&aacute;c g&oacute;i dịch vụ: nội
                                dung, chất lượng, gi&aacute; cả...v&agrave; c&oacute; thể tự m&igrave;nh so s&aacute;nh
                                với c&aacute;c g&oacute;i dịch vụ/sản phẩm tương tự để lựa chọn được dịch vụ ưng
                                &yacute; nhất. Sau đ&oacute;, kh&aacute;ch h&agrave;ng chọn n&uacute;t &ldquo;Đặt
                                ph&ograve;ng&rdquo; v&agrave; thực hiện c&aacute;c quy tr&igrave;nh theo phần 1<br />
                                - Giao h&agrave;ng v&agrave; Phương thức thanh to&aacute;n:
                                <br />
                                - Giao h&agrave;ng:
                                <br />
                                Website Vntrip.vn l&agrave; nơi cung cấp địa điểm, m&ocirc;i trường cho c&aacute;c đối
                                t&aacute;c l&agrave; c&aacute;c nh&agrave; cung cấp sản phẩm, dịch vụ được giới thiệu
                                sản phẩm, dịch vụ của m&igrave;nh tới c&aacute;c th&agrave;nh vi&ecirc;n, người
                                d&ugrave;ng l&agrave; kh&aacute;ch h&agrave;ng c&oacute; nhu cầu sử dụng sản phẩm, dịch
                                vụ. Th&ocirc;ng qua trang web, nh&agrave; cung cấp c&oacute; thể tiếp cận tới người sử
                                dụng dịch vụ, cung cấp dịch vụ ph&ograve;ng kh&aacute;ch sạn; Vntrip.vn sẽ chỉ
                                đ&oacute;ng vai tr&ograve; trung gian, giới thiệu tới kh&aacute;ch h&agrave;ng, tạo ra
                                m&ocirc;i trường giao dịch c&aacute;c g&oacute;i dịch vụ/giữa kh&aacute;ch h&agrave;ng
                                v&agrave; đối t&aacute;c, để từ đ&oacute; kh&aacute;ch h&agrave;ng v&agrave; người sử
                                dụng c&oacute; đặt ph&ograve;ng kh&aacute;ch sạn v&agrave; sử dụng dịch vụ với mức
                                gi&aacute; tốt nhất của nh&agrave; cung cấp. Vntrip.vn kh&ocirc;ng trực tiếp cung cấp
                                bất kỳ sản phẩm, dịch vụ n&agrave;o đến kh&aacute;ch h&agrave;ng.
                                <br />
                                C&aacute;c sản phẩm tr&ecirc;n Vntrip.vn l&agrave; dịch vụ v&ocirc; h&igrave;nh
                                n&ecirc;n sẽ kh&ocirc;ng được giao nhận tới kh&aacute;ch h&agrave;ng. Vntrip.vn sẽ cung
                                cấp m&atilde; đơn h&agrave;ng th&ocirc;ng qua Email hoặc số điện thoại của kh&aacute;ch
                                h&agrave;ng đ&atilde; đăng k&yacute; tr&ecirc;n Vntrip.vn. Kh&aacute;ch h&agrave;ng
                                d&ugrave;ng m&atilde; đơn h&agrave;ng với c&aacute;c th&ocirc;ng tin chi tiết đ&atilde;
                                đăng k&yacute; để tới sử dụng dịch vụ tại trụ sở c&aacute;c nh&agrave; cung cấp dịch vụ
                                tương ứng.
                                <br />
                                - Phương thức thanh to&aacute;n:
                                <br />
                                Thanh to&aacute;n: Kh&aacute;ch h&agrave;ng thanh to&aacute;n trực tuyến hoặc thanh
                                to&aacute;n tại trụ sở đối t&aacute;c.
                                <br />
                                Kh&aacute;ch h&agrave;ng c&oacute; thể thanh to&aacute;n bằng:
                                <br />
                                - Thẻ t&iacute;n dụng quốc tế (Visa, Master Card, JCB...)
                                <br />
                                - Chuyển khoản ng&acirc;n h&agrave;ng
                                <br />
                                - Thanh to&aacute;n theo h&igrave;nh thức Li&ecirc;n hệ với nh&agrave; cung cấp.
                                <br />
                                <strong>3. Quy tr&igrave;nh x&aacute;c nhận/hủy, đổi đơn h&agrave;ng</strong>
                                <br />
                                3.1. X&aacute;c nhận đơn h&agrave;ng:
                                <br />
                                Ngay sau khi ho&agrave;n tất thủ tục thanh to&aacute;n đơn h&agrave;ng tr&ecirc;n
                                website Vntrip.vn, kh&aacute;ch h&agrave;ng sẽ nhận được 1 email th&ocirc;ng b&aacute;o
                                về th&ocirc;ng tin đơn h&agrave;ng.
                                <br />
                                Khi nhận được đơn đặt h&agrave;ng hoặc y&ecirc;u cầu li&ecirc;n hệ từ kh&aacute;ch
                                h&agrave;ng, trong v&ograve;ng 48h, Vntrip.vn c&oacute; nghĩa vụ li&ecirc;n hệ với
                                kh&aacute;ch h&agrave;ng để x&aacute;c nhận đơn h&agrave;ng v&agrave; l&agrave;m thủ
                                tục.
                            </p>

                            <p>
                                3.2. Hủy, đổi đơn h&agrave;ng:
                                <br />
                                Ch&iacute;nh s&aacute;ch huỷ, đổi đơn h&agrave;ng tuỳ thuộc v&agrave;o ch&iacute;nh
                                s&aacute;ch ri&ecirc;ng của từng nh&agrave; cung cấp đăng b&aacute;n sản phẩm tr&ecirc;n
                                Vntrip.vn v&agrave; &aacute;p dụng với từng sản phẩm. Ch&iacute;nh s&aacute;ch
                                n&agrave;y được c&ocirc;ng khai trong nội dung th&ocirc;ng tin sản phẩm khi kh&aacute;ch
                                h&agrave;ng xem th&ocirc;ng tin sản phẩm trước khi mua h&agrave;ng tại website
                                Vntrip.vn.
                                <br />
                                Qua việc thực hiện đặt ph&ograve;ng với 1 nh&agrave; cung cấp chỗ ở, kh&aacute;ch
                                h&agrave;ng đ&atilde; chấp nhận v&agrave; đồng &yacute; ch&iacute;nh s&aacute;ch huỷ
                                ph&ograve;ng v&agrave; vắng mặt tương ứng của chỗ ở đ&oacute;, v&agrave; về bất kỳ điều
                                khoản v&agrave; điều kiện (cung cấp dịch vụ) bổ sung n&agrave;o của chỗ ở đ&oacute;
                                m&agrave; c&oacute; thể &aacute;p dụng cho đặt ph&ograve;ng của kh&aacute;ch h&agrave;ng
                                hoặc trong thời gian kh&aacute;ch h&agrave;ng lưu tr&uacute;, bao gồm c&aacute;c dịch vụ
                                được cung cấp v&agrave;/ hoặc c&aacute;c sản phẩm được cung cấp bởi kh&aacute;ch sạn
                                đ&oacute; (kh&aacute;ch h&agrave;ng c&oacute; thể y&ecirc;u cầu đơn vị chỗ nghỉ cung cấp
                                c&aacute;c điều khoản v&agrave; điều kiện cung cấp dịch vụ của họ).&nbsp;
                            </p>

                            <p>
                                Ch&iacute;nh s&aacute;ch huỷ ph&ograve;ng v&agrave; vắng mặt chung của mỗi kh&aacute;ch
                                sạn được đăng tr&ecirc;n trang web của Vntrip ở c&aacute;c trang th&ocirc;ng tin
                                kh&aacute;ch sạn, trong quy tr&igrave;nh đặt ph&ograve;ng v&agrave; trong email
                                x&aacute;c nhận. Vui l&ograve;ng lưu &yacute; rằng một số gi&aacute; ph&ograve;ng hoặc
                                ưu đ&atilde;i đặc biệt kh&ocirc;ng được huỷ bỏ hoặc thay đổi. Vui l&ograve;ng kiểm tra
                                to&agrave;n bộ c&aacute;c chi tiết ph&ograve;ng nghỉ để biết r&otilde; bất kỳ điều kiện
                                n&agrave;o như vậy trước khi thực hiện đặt ph&ograve;ng của kh&aacute;ch h&agrave;ng.
                                Vui l&ograve;ng lưu &yacute; rằng một đặt ph&ograve;ng trong đ&oacute; cần đặt cọc hoặc
                                thanh to&aacute;n trước (to&agrave;n bộ hoặc một phần) c&oacute; thể bị hủy (m&agrave;
                                kh&ocirc;ng cần th&ocirc;ng b&aacute;o hoặc cảnh b&aacute;o trước l&agrave; việc thanh
                                to&aacute;n chưa được thực hiện) trong trường hợp (c&aacute;c) khoản tiền tương ứng
                                (c&ograve;n lại) kh&ocirc;ng thể được thu đầy đủ v&agrave;o ng&agrave;y thanh
                                to&aacute;n đ&atilde; định theo ch&iacute;nh s&aacute;ch thanh to&aacute;n được
                                &aacute;p dụng bởi chỗ nghỉ v&agrave; đặt ph&ograve;ng. Việc thanh to&aacute;n trễ, sai
                                ng&acirc;n h&agrave;ng, chi tiết thẻ t&iacute;n dụng hoặc thẻ ghi nợ, thẻ t&iacute;n
                                dụng/ thẻ ghi nợ kh&ocirc;ng c&oacute; hiệu lực hoặc kh&ocirc;ng c&oacute; đủ tiền trong
                                t&agrave;i khoản l&agrave; tr&aacute;ch nhiệm của kh&aacute;ch h&agrave;ng v&agrave; sẽ
                                dẫn tới rủi ro, v&agrave; kh&aacute;ch h&agrave;ng sẽ kh&ocirc;ng c&oacute; quyền được
                                ho&agrave;n lại cho bất kỳ khoản tiền n&agrave;o đ&atilde; trả trước (kh&ocirc;ng
                                ho&agrave;n lại) trừ khi chỗ nghỉ đồng &yacute; hoặc cho ph&eacute;p kh&aacute;c đi theo
                                ch&iacute;nh s&aacute;ch hủy đặt ph&ograve;ng v&agrave; thanh to&aacute;n (trước) của
                                chỗ nghỉ.
                                <br />
                                Nếu kh&aacute;ch h&agrave;ng muốn xem lại, chỉnh sửa hoặc huỷ đặt ph&ograve;ng, vui
                                l&ograve;ng quay lại email x&aacute;c nhận v&agrave; theo hướng dẫn trong đ&oacute;. Xin
                                lưu &yacute; rằng kh&aacute;ch h&agrave;ng c&oacute; thể bị t&iacute;nh ph&iacute; về
                                việc huỷ đặt ph&ograve;ng theo ch&iacute;nh s&aacute;ch hủy ph&ograve;ng, thanh
                                to&aacute;n (trước) v&agrave; vắng mặt của nh&agrave; cung cấp chỗ ở hoặc kh&ocirc;ng
                                c&oacute; quyền được ho&agrave;n lại bất kỳ khoản tiền n&agrave;o đ&atilde; trả (trước).
                                Vntrip khuyến kh&iacute;ch kh&aacute;ch h&agrave;ng n&ecirc;n đọc ch&iacute;nh
                                s&aacute;ch hủy ph&ograve;ng, thanh to&aacute;n (trước) hoặc vắng mặt của nh&agrave;
                                cung cấp chỗ ở kỹ c&agrave;ng trước khi thực hiện đặt ph&ograve;ng của m&igrave;nh
                                v&agrave; lưu &yacute; lu&ocirc;n thực hiện thanh to&aacute;n đ&uacute;ng thời hạn như
                                được y&ecirc;u cầu cho đặt ph&ograve;ng tương ứng. Kh&aacute;ch h&agrave;ng c&oacute;
                                thể chỉnh sửa th&ocirc;ng tin c&aacute; nh&acirc;n tr&ecirc;n đơn h&agrave;ng bằng
                                c&aacute;ch li&ecirc;n hệ trực tiếp Call Center qua Customer service 1800- 2032.
                                Nh&acirc;n vi&ecirc;n tư vấn sẽ hỗ trợ kh&aacute;ch h&agrave;ng thay đổi th&ocirc;ng tin
                                theo y&ecirc;u cầu.
                                <br />
                                Nếu kh&aacute;ch h&agrave;ng đến trễ v&agrave;o ng&agrave;y nhận ph&ograve;ng hoặc đến
                                v&agrave;o ng&agrave;y h&ocirc;m sau, h&atilde;y th&ocirc;ng b&aacute;o (kịp thời/ngay)
                                với chỗ nghỉ để họ biết khi n&agrave;o kh&aacute;ch h&agrave;ng tới v&agrave;
                                tr&aacute;nh hủy ph&ograve;ng hoặc t&iacute;nh ph&iacute; vắng mặt (no-show). Bộ phận
                                chăm s&oacute;c kh&aacute;ch h&agrave;ng của Vntrip c&oacute; thể gi&uacute;p
                                kh&aacute;ch h&agrave;ng th&ocirc;ng b&aacute;o với chỗ nghỉ, nếu cần thiết. Vntrip.vn
                                kh&ocirc;ng chịu bất kỳ tr&aacute;ch nhiệm hoặc nghĩa vụ n&agrave;o li&ecirc;n quan đến
                                việc kh&aacute;ch h&agrave;ng tới nhận ph&ograve;ng chậm hoặc hủy ph&ograve;ng, hoặc
                                ph&iacute; vắng mặt m&agrave; chỗ nghỉ y&ecirc;u cầu kh&aacute;ch h&agrave;ng thanh
                                to&aacute;n.
                            </p>

                            <p>
                                <strong>4. Quy tr&igrave;nh giải quyết tranh chấp, khiếu nại:</strong>
                                <br />
                                Khi nhận được khiếu nại của kh&aacute;ch h&agrave;ng về c&aacute;c kh&aacute;ch sạn
                                m&agrave; kh&aacute;ch h&agrave;ng đ&atilde; đặt ph&ograve;ng tại S&agrave;n GD TMĐT
                                Vntrip.vn, ban quản l&yacute; sẽ li&ecirc;n lạc với kh&aacute;ch sạn bị khiếu nại để
                                y&ecirc;u cầu giải tr&igrave;nh th&ocirc;ng tin v&agrave; li&ecirc;n hệ với b&ecirc;n
                                khiếu nại để giải quyết c&aacute;c khiếu nại đ&oacute;. S&agrave;n GD TMĐT Vntrip.vn
                                khuyến kh&iacute;ch c&aacute;c th&agrave;nh vi&ecirc;n giải quyết khiếu nại tr&ecirc;n
                                cơ sở thương lượng. Sau khi giải quyết khiếu nại, th&agrave;nh vi&ecirc;n bị khiếu nại
                                c&oacute; tr&aacute;ch nhiệm th&ocirc;ng b&aacute;o t&igrave;nh h&igrave;nh cho
                                S&agrave;n GD TMĐT Vntrip.vn, S&agrave;n GD TMĐT Vntrip.vn c&oacute; tr&aacute;ch nhiệm
                                kiểm tra thực tế, x&aacute;c minh t&igrave;nh h&igrave;nh giải quyết khiếu nại.
                            </p>

                            <p>
                                Trong thời hạn 3 ng&agrave;y l&agrave;m việc, nếu S&agrave;n GD TMĐT Vntrip.vn đ&atilde;
                                sử dụng mọi phương thức li&ecirc;n lạc nhưng kh&ocirc;ng thể li&ecirc;n lạc với
                                kh&aacute;ch sạn bị khiếu nại hoặc S&agrave;n GD TMĐT Vntrip.vn đ&atilde; th&ocirc;ng
                                b&aacute;o việc khiếu nại của kh&aacute;ch h&agrave;ng cho c&aacute;c kh&aacute;ch sạn
                                bị khiếu nại nhưng kh&aacute;ch sạn bị khiếu nại kh&ocirc;ng chủ động giải quyết khiếu
                                nại, ban quản l&yacute; S&agrave;n GD TMĐT Vntrip.vn sẽ chấm dứt hợp t&aacute;c với
                                kh&aacute;ch sạn bị khiếu nại đồng thời chấm dứt hợp đồng đ&atilde; k&yacute; kết
                                v&agrave; th&ocirc;ng b&aacute;o c&ocirc;ng khai tr&ecirc;n Vntrip.vn.
                                <br />
                                B&ecirc;n khiếu nại c&oacute; quyền đưa vụ việc ra Cơ quan nh&agrave; nước c&oacute;
                                thẩm quyền giải quyết. S&agrave;n GD TMĐT Vntrip.vn sẽ hỗ trợ b&ecirc;n khiếu nại
                                v&agrave; C&aacute;c cơ quan chức năng khi c&oacute; y&ecirc;u cầu hỗ trợ th&ocirc;ng
                                tin li&ecirc;n quan đến việc giải quyết khiếu nại.
                            </p>

                            <p>
                                Địa chỉ nhận th&ocirc;ng tin khiếu nại:
                                <br />
                                C&ocirc;ng ty tr&aacute;ch nhiệm hữu hạn VNTRIP OTA
                                <br />
                                Địa chỉ: Tầng 2, to&agrave; nh&agrave; 17T4, Hapulico Complex, Số 1 Nguyễn Huy Tưởng,
                                phường Thanh Xu&acirc;n Trung, quận Thanh Xu&acirc;n, th&agrave;nh phố H&agrave; Nội
                            </p>

                            <p>
                                <strong>
                                    5. Quy tr&igrave;nh ho&agrave;n trả/ hủy ph&ograve;ng v&agrave; cam kết của
                                    kh&aacute;ch sạn:
                                </strong>
                                <br />
                                Website cung cấp dịch vụ cho thu&ecirc; ph&ograve;ng kh&aacute;ch sạn. Tuy nhi&ecirc;n,
                                VNTRIP cũng đưa l&ecirc;n nội dung quy định về việc ho&agrave;n trả h&agrave;ng
                                h&oacute;a/ dịch vụ như sau:
                                <br />
                                - Ch&iacute;nh s&aacute;ch huỷ ph&ograve;ng phụ thuộc v&agrave;o từng kh&aacute;ch sạn
                                v&agrave; được &aacute;p dụng từng thời điểm kh&aacute;c nhau. Cụ thể như sau:
                                <br />
                                Kh&aacute;ch sạn Cendeluxe Ph&uacute; Y&ecirc;n (5 sao):
                                <br />
                                &Aacute;p dụng ch&iacute;nh s&aacute;ch hủy ph&ograve;ng đối với kh&aacute;ch lẻ (FIT)
                                dưới 5 ph&ograve;ng:
                                <br />
                                Huỷ 03 ng&agrave;y trước ng&agrave;y đến: T&iacute;nh 50% tiền ph&ograve;ng của
                                đ&ecirc;m đầu ti&ecirc;n.
                                <br />
                                Huỷ trong ng&agrave;y đến: T&iacute;nh 100% tiền ph&ograve;ng của đ&ecirc;m đầu
                                ti&ecirc;n.
                                <br />
                                Kh&aacute;ch sạn Mường Thanh Centre Nha Trang (5 sao):
                                <br />
                                &Aacute;p dụng ch&iacute;nh s&aacute;ch hủy ph&ograve;ng đối với kh&aacute;ch lẻ (FIT)
                                dưới 20 ph&ograve;ng:
                                <br />
                                M&ugrave;a B&igrave;nh thường:
                                <br />
                                Hủy trước 7 ng&agrave;y kể từ ng&agrave;y đến: kh&ocirc;ng t&iacute;nh ph&iacute;.
                                <br />
                                Hủy trong v&ograve;ng 7 - 3 ng&agrave;y kể từ ng&agrave;y đến: t&iacute;nh ph&iacute;
                                50% đ&ecirc;m đầu ti&ecirc;n.
                                <br />
                                Hủy trong v&ograve;ng 3 ng&agrave;y kể từ ng&agrave;y đến: t&iacute;nh ph&iacute; 100%
                                đ&ecirc;m đầu ti&ecirc;n.
                                <br />
                                M&ugrave;a Cao điểm:
                                <br />
                                Hủy trước 21 ng&agrave;y kể từ ng&agrave;y đến: kh&ocirc;ng t&iacute;nh ph&iacute;.
                                <br />
                                Hủy trong v&ograve;ng 20 - 10 ng&agrave;y kể từ ng&agrave;y đến: t&iacute;nh ph&iacute;
                                50% đ&ecirc;m đầu ti&ecirc;n.
                                <br />
                                Hủy trong v&ograve;ng 10 ng&agrave;y kể từ ng&agrave;y đến: t&iacute;nh ph&iacute; 100%
                                đ&ecirc;m đầu ti&ecirc;n.
                                <br />
                                Quy tr&igrave;nh huỷ ph&ograve;ng:
                                <br />
                                Việc ho&agrave;n trả/ hủy ph&ograve;ng n&agrave;y, kh&aacute;ch h&agrave;ng c&oacute;
                                thể gửi email hoặc gọi điện thoại đến số hotline: 096 326 6688 của VNTRIP, Bộ phận chăm
                                s&oacute;c kh&aacute;ch h&agrave;ng sẽ hỗ trợ tận t&igrave;nh theo y&ecirc;u cầu của
                                kh&aacute;ch h&agrave;ng. Bộ phận chăm s&oacute;c kh&aacute;ch h&agrave;ng sẽ dựa theo
                                ch&iacute;nh s&aacute;ch của kh&aacute;ch sạn đ&atilde; được qui định cụ thể trong
                                Voucher x&aacute;c nhận đặt ph&ograve;ng v&agrave; th&ocirc;ng b&aacute;o đến
                                kh&aacute;ch h&agrave;ng việc ho&agrave;n trả/ hủy ph&ograve;ng n&agrave;y một
                                c&aacute;ch cụ thể v&agrave; ch&iacute;nh x&aacute;c nhất.&nbsp;
                                <br />
                                Cụ thể:
                                <br />
                                Kh&aacute;ch h&agrave;ng b&aacute;o cho tổng đ&agrave;i VNTRIP qua số 096 326 6688
                                <br />
                                VNTRIP th&ocirc;ng b&aacute;o lại ch&iacute;nh s&aacute;ch huỷ ph&ograve;ng của
                                kh&aacute;ch sạn cho kh&aacute;ch h&agrave;ng, v&agrave; x&aacute;c nhận huỷ
                                ph&ograve;ng với kh&aacute;ch h&agrave;ng.
                                <br />
                                VNTRIP tiến h&agrave;nh huỷ ph&ograve;ng với kh&aacute;ch sạn,
                                <br />
                                VNTRIP trả lại tiền cho kh&aacute;ch h&agrave;ng theo ch&iacute;nh s&aacute;ch của
                                kh&aacute;ch sạn
                                <br />
                                Kh&aacute;ch h&agrave;ng được trả lại tiền qua h&igrave;nh thức chuyển khoản hoặc đến
                                nhận lại trực tiếp tại trụ sở VNTRIP.
                                <br />
                                Cam kết của kh&aacute;ch sạn khi tiếp nhận Voucher:
                                <br />
                                Kh&aacute;ch sạn sẽ cung cấp cho kh&aacute;ch h&agrave;ng đ&uacute;ng dịch vụ đ&atilde;
                                cam kết với Vntrip m&agrave; đ&atilde; được 2 b&ecirc;n k&iacute; kết bằng hợp đồng kinh
                                doanh.
                                <br />
                                Trước khi ph&aacute;t h&agrave;nh Voucher cho kh&aacute;ch h&agrave;ng, Vntrip đ&atilde;
                                c&oacute; những thỏa thuận bằng văn bản hoặc hợp đồng với kh&aacute;ch sạn, vậy
                                n&ecirc;n kh&aacute;ch sạn phải chấp nhận Voucher từ ph&iacute;a kh&aacute;ch
                                h&agrave;ng theo thỏa thuận ban đầu, Trong trường hợp bất khả kh&aacute;ng kh&ocirc;ng
                                thu xếp được với kh&aacute;ch sạn đ&oacute;, Vntrip sẽ t&igrave;m 1 phương &aacute;n
                                kh&aacute;c thay thế, 1 kh&aacute;ch sạn tương đương để đảm bảo dịch vụ cho kh&aacute;ch
                                h&agrave;ng. Đ&acirc;y l&agrave; thỏa thuận hợp t&aacute;c đa phương giữa kh&aacute;ch
                                sạn, Vntrip v&agrave; kh&aacute;ch h&agrave;ng, Vntrip sẽ t&igrave;m những biện
                                ph&aacute;p ưu việt nhất để giải quyết cho kh&aacute;ch h&agrave;ng trong những trường
                                hợp ph&aacute;t sinh.
                                <br />
                                Ch&iacute;nh s&aacute;ch ho&agrave;n trả đối với kh&aacute;ch sạn
                                <br />
                                - Trường hợp Kh&aacute;ch h&agrave;ng điều chỉnh giảm hoặc hủy ph&ograve;ng,
                                Kh&aacute;ch h&agrave;ng c&oacute; tr&aacute;ch nhiệm th&ocirc;ng b&aacute;o hủy
                                ph&ograve;ng hoặc điều chỉnh giảm ph&ograve;ng cho VNTRIP c&agrave;ng sớm c&agrave;ng
                                tốt v&agrave; VNTRIP sẽ căn cứ v&agrave;o ch&iacute;nh s&aacute;ch quy định của từng
                                kh&aacute;ch sạn c&ocirc;ng bố tại thời điểm đặt phòng để xử l&yacute;. Việc huỷ hay
                                điều chỉnh giảm ph&ograve;ng phải được Kh&aacute;ch h&agrave;ng th&ocirc;ng b&aacute;o
                                bằng email/văn bản. Để tr&aacute;nh nhầm lẫn, giảm hoặc hủy ph&ograve;ng bao gồm nhưng
                                kh&ocirc;ng giới hạn c&aacute;c trường hợp thay đổi về ng&agrave;y lưu tr&uacute;, giảm
                                lượng ph&ograve;ng, giảm số đ&ecirc;m ở của Kh&aacute;ch h&agrave;ng so với số lượng
                                đ&atilde; được x&aacute;c nhận trong c&aacute;c x&aacute;c nhận đặt ph&ograve;ng.
                                <br />
                                - Trường hợp Kh&aacute;ch h&agrave;ng đề nghị tăng phòng, tùy thuộc v&agrave;o
                                t&igrave;nh trạng của kh&aacute;ch sạn v&agrave; y&ecirc;u cầu của Kh&aacute;ch
                                h&agrave;ng, VNTRIP c&oacute; quyền chấp nhận hoặc từ chối đề nghị tăng phòng của
                                Kh&aacute;ch h&agrave;ng căn cứ v&agrave;o ch&iacute;nh s&aacute;ch của từng
                                kh&aacute;ch sạn c&ocirc;ng bố tại thời điểm đặt phòng. Trong trường hợp đề nghị của
                                Kh&aacute;ch h&agrave;ng được VNTRIP chấp nhận, VNTRIP c&oacute; quyền thu th&ecirc;m
                                ph&iacute; bổ sung (nếu c&oacute;) ph&ugrave; hợp với y&ecirc;u cầu của Kh&aacute;ch
                                h&agrave;ng theo ch&iacute;nh s&aacute;ch v&agrave; quy định tại website của VNTRIP.
                                <br />- Trường hợp Kh&aacute;ch h&agrave;ng đ&atilde; nhận C&aacute;c X&aacute;c Nhận
                                Đặt Ph&ograve;ng nhưng sau đ&oacute; VNTRIP kh&ocirc;ng thể cung cấp Dịch Vụ như thỏa
                                thuận do lỗi kh&aacute;ch quan ph&aacute;t sinh từ ph&iacute;a kh&aacute;ch sạn
                                th&igrave; VNTRIP sẽ nỗ lực (i) t&igrave;m kh&aacute;ch sạn kh&aacute;c c&oacute;
                                ti&ecirc;u chuẩn tương đương v&agrave; khoảng c&aacute;ch hợp l&yacute; tới kh&aacute;ch
                                sạn cho Kh&aacute;ch h&agrave;ng; (ii) trong trường hợp Kh&aacute;ch h&agrave;ng
                                kh&ocirc;ng đồng &yacute; với phương &aacute;n VNTRIP đưa ra hoặc VNTRIP kh&ocirc;ng thể
                                t&igrave;m được kh&aacute;ch sạn với ti&ecirc;u chuẩn v&agrave; khoảng c&aacute;ch tương
                                đương th&igrave; VNTRIP c&oacute; tr&aacute;ch nhiệm ho&agrave;n trả tiền hoặc
                                ho&agrave;n c&ocirc;ng nợ cho Kh&aacute;ch h&agrave;ng theo đ&uacute;ng gi&aacute; trị
                                đơn h&agrave;ng ban đầu m&agrave; Kh&aacute;ch h&agrave;ng kh&ocirc;ng phải chịu bất kỳ
                                chi ph&iacute; n&agrave;o.
                            </p>

                            <p>
                                <strong>
                                    6. Ch&iacute;nh s&aacute;ch gi&aacute; trị sử dụng với v&eacute; m&aacute;y bay
                                </strong>
                                <br />
                                6.1. VNTRIP c&oacute; tr&aacute;ch nhiệm đặt giữ chỗ v&agrave; cung cấp v&eacute;
                                m&aacute;y bay, hỗ trợ thay đổi t&ecirc;n, ng&agrave;y, chặng h&agrave;nh tr&igrave;nh,
                                ho&agrave;n v&eacute;, c&aacute;c thủ tục kh&aacute;c theo quy định cho Kh&aacute;ch
                                h&agrave;ng đối với c&aacute;c h&agrave;nh tr&igrave;nh đi nội địa v&agrave; quốc tế của
                                c&aacute;c H&atilde;ng h&agrave;ng kh&ocirc;ng: Vietnam Airlines, Jetstar Pacific,
                                Vietjet Air, Bamboo v&agrave; c&aacute;c h&atilde;ng h&agrave;ng kh&ocirc;ng Quốc tế
                                kh&aacute;c. Hỗ trợ về việc xin x&aacute;c nhận chỗ tr&ecirc;n c&aacute;c chuyến bay Nội
                                địa, Quốc tế v&agrave; c&aacute;c dịch vụ kh&aacute;c tại s&acirc;n bay trong điều kiện
                                v&agrave; khả năng cho ph&eacute;p của từng chuyến bay.
                                <br />
                                6.2. Đối với c&aacute;c nh&oacute;m kh&aacute;ch từ 10 người trở l&ecirc;n (v&eacute;
                                đo&agrave;n), c&aacute;c h&atilde;ng h&agrave;ng kh&ocirc;ng sẽ x&aacute;c nhận chỗ
                                (CFM) 30 ng&agrave;y trước ng&agrave;y bay. Nếu chỗ của đo&agrave;n kh&ocirc;ng được
                                h&atilde;ng h&agrave;ng kh&ocirc;ng x&aacute;c nhận, VNTRIP sẽ th&ocirc;ng b&aacute;o
                                h&agrave;nh tr&igrave;nh chuyến bay cho Kh&aacute;ch h&agrave;ng để hai b&ecirc;n
                                c&ugrave;ng phối hợp chuyển kh&aacute;ch sang chuyến kế tiếp hoặc tư vấn đi theo
                                h&agrave;nh tr&igrave;nh phù hợp kh&aacute;c. Trường hợp c&oacute; sự thay đổi đột xuất
                                từ h&atilde;ng h&agrave;ng kh&ocirc;ng, VNTRIP sẽ phối hợp với Kh&aacute;ch h&agrave;ng
                                để tư vấn v&agrave; sắp xếp h&agrave;nh tr&igrave;nh ph&ugrave; hợp theo y&ecirc;u cầu
                                của Kh&aacute;ch h&agrave;ng. Nếu hai b&ecirc;n kh&ocirc;ng thống nhất được h&agrave;nh
                                tr&igrave;nh, VNTRIP sẽ &aacute;p dụng theo đ&uacute;ng ch&iacute;nh s&aacute;ch
                                ho&agrave;n, hủy của c&aacute;c H&atilde;ng h&agrave;ng kh&ocirc;ng.
                                <br />
                                6.3. Kh&aacute;ch h&agrave;ng chịu tr&aacute;ch nhiệm thanh to&aacute;n cho c&aacute;c
                                V&eacute; M&aacute;y Bay theo Gi&aacute; V&eacute; M&aacute;y Bay, c&aacute;c dịch vụ
                                kh&aacute;c v&agrave; c&aacute;c ph&iacute; li&ecirc;n quan v&agrave; bao gồm
                                kh&ocirc;ng giới hạn ph&iacute; ho&agrave;n, hủy v&eacute;/dịch vụ, đổi ng&agrave;y bay,
                                đổi h&agrave;nh tr&igrave;nh (nếu c&oacute;) đ&atilde; được x&aacute;c nhận đặt
                                v&eacute; qua Đại Diện Li&ecirc;n Lạc do Kh&aacute;ch h&agrave;ng cung cấp.
                            </p>

                            <p>
                                6.4. Quy định mức ph&iacute; dịch vụ xuất v&eacute;: Kh&aacute;ch h&agrave;ng đồng
                                &yacute; thanh to&aacute;n ph&iacute; dịch vụ cho VNTRIP để sử dụng dịch vụ. Khoản
                                ph&iacute; n&agrave;y được bao gồm trong Gi&aacute; V&eacute; M&aacute;y Bay theo mức
                                Ph&iacute; dịch vụ được quy định tại Hợp đồng n&agrave;y v&agrave; khoản ph&iacute;
                                n&agrave;y sẽ (i) kh&ocirc;ng ho&agrave;n lại trong trường hợp y&ecirc;u cầu hủy
                                v&eacute; ph&aacute;t sinh từ Kh&aacute;ch h&agrave;ng; (ii) ho&agrave;n lại trong
                                trường hợp H&atilde;ng hủy v&eacute; của Kh&aacute;ch h&agrave;ng . Chi tiết Mức
                                ph&iacute; dịch vụ chi tiết được quy định tại Phụ lục 02 của Hợp đồng n&agrave;y. Lưu
                                &yacute;: gi&aacute; v&eacute; m&aacute;y bay sẽ được b&aacute;o gi&aacute; chi tiết
                                theo từng trường hợp. Trường hợp trẻ em dưới 2 tuổi v&agrave; c&aacute;c trường hợp đặc
                                biệt kh&aacute;c, gi&aacute; v&eacute; sẽ được t&iacute;nh theo Quy định của c&aacute;c
                                H&atilde;ng H&agrave;ng Kh&ocirc;ng.
                                <br />
                                6.5. Kh&aacute;ch h&agrave;ng giữ nguy&ecirc;n trạng th&aacute;i của V&eacute;
                                M&aacute;y Bay, kh&ocirc;ng được sửa chữa c&aacute;c th&ocirc;ng tin tr&ecirc;n mặt
                                v&eacute; m&agrave; VNTRIP đ&atilde; xuất v&eacute; b&aacute;n cho Kh&aacute;ch
                                h&agrave;ng. Nếu vi phạm, Kh&aacute;ch h&agrave;ng phải chịu ho&agrave;n to&agrave;n
                                tr&aacute;ch nhiệm trước c&aacute;c cơ quan chức năng.
                                <br />
                                6.6. Trường hợp VNTRIP đ&atilde; xuất v&eacute; hoặc đặt c&aacute;c dịch vụ kh&aacute;c
                                theo x&aacute;c nhận của Kh&aacute;ch h&agrave;ng m&agrave; sau đ&oacute; Kh&aacute;ch
                                h&agrave;ng kh&ocirc;ng nhận v&eacute;, hủy v&eacute;, cung cấp sai th&ocirc;ng tin xuất
                                v&eacute;, hủy dịch vụ, Kh&aacute;ch h&agrave;ng vẫn sẽ phải thanh to&aacute;n cho
                                VNTRIP đầy đủ c&aacute;c chi ph&iacute; ph&aacute;t sinh từ việc ho&agrave;n hủy
                                c&aacute;c v&eacute; đ&atilde; xuất theo đ&uacute;ng ch&iacute;nh s&aacute;ch của
                                H&atilde;ng h&agrave;ng kh&ocirc;ng v&agrave; ch&iacute;nh s&aacute;ch của VNTRIP
                                v&agrave; thanh to&aacute;n ph&iacute; dịch vụ xuất v&eacute; cho VNTRIP.
                                <br />
                                <strong>IV. QUY TR&Igrave;NH THANH TO&Aacute;N</strong>
                                <br />
                                Kh&aacute;ch h&agrave;ng c&oacute; thể đặt ph&ograve;ng v&agrave; thanh to&aacute;n trực
                                tiếp tiền ph&ograve;ng cho Vntrip.vn th&ocirc;ng qua c&aacute;c phương thức:
                                <br />
                                - Thanh to&aacute;n trực tiếp tại trụ sở của C&Ocirc;NG TY TNHH VNTRIP.VN
                                <br />
                                - Thanh to&aacute;n online
                                <br />
                                - Chuyển khoản qua t&agrave;i khoản ng&acirc;n h&agrave;ng
                                <br />
                                Ngo&agrave;i ra kh&aacute;ch h&agrave;ng c&oacute; thể đặt ph&ograve;ng trước v&agrave;
                                thanh to&aacute;n trực tiếp cho kh&aacute;ch sạn sau khi trả ph&ograve;ng.
                                <br />
                                Vntrip.vn kh&ocirc;ng thu ph&iacute; th&agrave;nh vi&ecirc;n của kh&aacute;ch
                                h&agrave;ng m&agrave; hưởng hoa hồng từ c&aacute;c kh&aacute;ch sạn đối với mỗi đơn đặt
                                ph&ograve;ng của kh&aacute;ch h&agrave;ng.
                            </p>

                            <p>
                                <strong>V. ĐẢM BẢO AN TO&Agrave;N GIAO DỊCH</strong>
                                <br />
                                Ban quản l&yacute; S&agrave;n GD TMĐT Vntrip.vn đ&atilde; sử dụng c&aacute;c dịch vụ để
                                bảo vệ th&ocirc;ng tin v&agrave; việc thanh to&aacute;n của th&agrave;nh vi&ecirc;n. Để
                                đảm c&aacute;c c&aacute;c giao dịch được tiến h&agrave;nh th&agrave;nh c&ocirc;ng, hạn
                                chế tối đa rủi ro c&oacute; thể ph&aacute;t sinh, y&ecirc;u cầu c&aacute;c th&agrave;nh
                                vi&ecirc;n tham gia S&agrave;n GD TMĐT Vntrip.vn lưu &yacute; v&agrave; tu&acirc;n thủ
                                c&aacute;c nội dung cam kết như sau:
                                <br />
                                Th&agrave;nh vi&ecirc;n kh&ocirc;ng n&ecirc;n đưa th&ocirc;ng tin chi tiết về thanh
                                to&aacute;n với bất kỳ ai bằng e-mail, Vntrip kh&ocirc;ng chịu tr&aacute;ch nhiệm về
                                những mất m&aacute;t m&agrave; th&agrave;nh vi&ecirc;n c&oacute; thể g&aacute;nh chịu
                                trong việc trao đổi th&ocirc;ng tin của th&agrave;nh vi&ecirc;n qua internet hoặc email.
                                <br />
                                S&agrave;n GD TMĐT Vntrip.vn x&acirc;y dựng cơ chế bảo đảm an to&agrave;n giao dịch như
                                sau:
                                <br />
                                Quản l&yacute; th&ocirc;ng tin của th&agrave;nh vi&ecirc;n: Người d&ugrave;ng đăng
                                k&yacute; th&agrave;nh vi&ecirc;n của S&agrave;n Giao dịch thương mại điện tử Vntrip.vn
                                phải cung cấp đầy đủ c&aacute;c th&ocirc;ng tin li&ecirc;n quan v&agrave; phải chịu
                                ho&agrave;n to&agrave;n tr&aacute;ch nhiệm đối với c&aacute;c th&ocirc;ng tin
                                n&agrave;y. C&aacute;c th&ocirc;ng tin cụ thể bao gồm: Th&ocirc;ng tin c&aacute;
                                nh&acirc;n đối với c&aacute; nh&acirc;n, th&ocirc;ng tin về tư c&aacute;ch ph&aacute;p
                                l&yacute; đối với l&agrave; tổ chức. C&aacute;c th&ocirc;ng tin n&agrave;y sẽ được
                                S&agrave;n GD TMĐT Vntrip.vn đưa v&agrave;o dữ liệu để quản l&yacute;.
                                <br />
                                C&aacute;c giao dịch giữa kh&aacute;ch sạn v&agrave; kh&aacute;ch h&agrave;ng sẽ được
                                S&agrave;n GD TMĐT Vntrip.vn đưa v&agrave;o nội dung quản l&yacute;, thường xuy&ecirc;n
                                cập nhật t&igrave;nh trạng v&agrave; sẽ c&oacute; đ&aacute;nh gi&aacute; sơ bộ về uy
                                t&iacute;n của kh&aacute;ch sạn.
                                <br />
                                S&agrave;n GD TMĐT Vntrip.vn cũng tiếp nhận c&aacute;c phản hồi của người d&ugrave;ng về
                                dịch vụ của kh&aacute;ch sạn qua đ&oacute; kiểm so&aacute;t, đ&aacute;nh gi&aacute;
                                t&iacute;n nhiệm của c&aacute;c kh&aacute;ch sạn.
                                <br />
                                Kh&aacute;ch h&agrave;ng c&oacute; quyền gửi khiếu nại về kh&aacute;ch sạn đến
                                S&agrave;n GD TMĐT Vntrip.vn. Khi tiếp nhận được những khiếu nại n&agrave;y, S&agrave;n
                                GD TMĐT Vntrip.vn sẽ x&aacute;c minh lại th&ocirc;ng tin, trường hợp c&aacute;c khiếu
                                nại của kh&aacute;ch h&agrave;ng l&agrave; đ&uacute;ng th&igrave; tuỳ theo mức độ vi
                                phạm, S&agrave;n GD TMĐT Vntrip.vn sẽ c&oacute; những biện ph&aacute;p xử l&yacute; nhằm
                                bảo vệ quyền lợi kh&aacute;ch h&agrave;ng hoặc nhờ sự can thiệp của cơ quan nh&agrave;
                                nước c&oacute; thẩm quyền
                            </p>

                            <p>
                                <strong>
                                    VI. BẢO VỆ TH&Ocirc;NG TIN C&Aacute; NH&Acirc;N KH&Aacute;CH H&Agrave;NG
                                </strong>
                                <br />
                                <strong>1. Mục đ&iacute;ch v&agrave; phạm vi thu thập th&ocirc;ng tin</strong>
                                <br />
                                Việc thu thập th&ocirc;ng tin tr&ecirc;n S&agrave;n GD TMĐT Vntrip.vn nhằm mục
                                đ&iacute;ch đăng k&yacute; t&agrave;i khoản cho kh&aacute;ch h&agrave;ng v&agrave; quản
                                l&yacute; th&agrave;nh vi&ecirc;n, li&ecirc;n lạc khi c&oacute; vấn đề tranh chấp, vi
                                phạm xảy ra tr&ecirc;n website, hiển thị th&ocirc;ng tin cho đối t&aacute;c của
                                th&agrave;nh vi&ecirc;n. S&agrave;n GD TMĐT Vntrip.vn sẽ kh&ocirc;ng b&aacute;n, chia sẻ
                                hay trao đổi th&ocirc;ng tin c&aacute; nh&acirc;n của kh&aacute;ch h&agrave;ng.
                                <br />
                                Khi kh&aacute;ch h&agrave;ng đăng k&yacute; th&agrave;nh vi&ecirc;n tại S&agrave;n GD
                                TMĐT Vntrip.vn, th&ocirc;ng tin c&aacute; nh&acirc;n Vntrip thu thập bao gồm:
                                <br />
                                T&ecirc;n kh&aacute;ch h&agrave;ng: ...........
                                <br />
                                Địa chỉ:..........
                                <br />
                                Số điện thoại:...........
                                <br />
                                Email: ...........
                            </p>

                            <p>
                                <strong>2. Phạm vi sử dụng th&ocirc;ng tin</strong>
                                <br />
                                Những th&ocirc;ng tin của th&agrave;nh vi&ecirc;n S&agrave;n GD TMĐT Vntrip.vn sẽ chỉ
                                được sử dụng nội bộ cho c&aacute;c mục đ&iacute;ch rao c&aacute;c tin đăng của
                                th&agrave;nh vi&ecirc;n tr&ecirc;n website tạo thuận lợi cho việc t&igrave;m kiếm đối
                                t&aacute;c của th&agrave;nh vi&ecirc;n.
                            </p>

                            <p>
                                <strong>3. Thời gian lưu trữ th&ocirc;ng tin:</strong>
                                <br />
                                Thời gian lưu trữ th&ocirc;ng tin kh&aacute;ch h&agrave;ng l&agrave; vĩnh viễn. Trừ
                                c&aacute;c trường hợp kh&aacute;ch h&agrave;ng huỷ gia hạn dịch vụ, tự chấm dứt tư
                                c&aacute;ch th&agrave;nh vi&ecirc;n của website hoặc kh&aacute;ch h&agrave;ng l&agrave;
                                th&agrave;nh vi&ecirc;n của website đ&atilde; đăng k&yacute; nhưng vi phạm c&aacute;c
                                điều khoản n&ecirc;n bị x&oacute;a t&agrave;i khoản, th&igrave; l&uacute;c đ&oacute; tất
                                cả th&ocirc;ng tin của kh&aacute;ch h&agrave;ng bị vi phạm kh&ocirc;ng c&ograve;n được
                                lưu trữ trong cơ sở dữ liệu của website.
                                <br />
                                <strong>
                                    4. Địa chỉ của đơn vị thu thập v&agrave; quản l&yacute; th&ocirc;ng tin c&aacute;
                                    nh&acirc;n
                                </strong>
                                <br />
                                C&Ocirc;NG TY TNHH VNTRIP.VN
                                <br />
                                Địa chỉ: Tầng 2, to&agrave; nh&agrave; 17T4, Hapulico Complex, Số 1 Nguyễn Huy Tưởng,
                                phường Thanh Xu&acirc;n Trung, quận Thanh Xu&acirc;n, th&agrave;nh phố H&agrave; Nội
                            </p>

                            <p>
                                <strong>
                                    5. Phương tiện v&agrave; c&ocirc;ng cụ để người d&ugrave;ng tiếp cận v&agrave; chỉnh
                                    sửa dữ liệu c&aacute; nh&acirc;n của m&igrave;nh:
                                </strong>
                                <br />
                                Th&agrave;nh vi&ecirc;n l&agrave; kh&aacute;ch sạn kh&ocirc;ng trực tiếp đăng c&aacute;c
                                th&ocirc;ng tin của m&igrave;nh tr&ecirc;n website Vntrip.vn, do đ&oacute;, khi
                                c&aacute;c th&agrave;nh vi&ecirc;n l&agrave; kh&aacute;ch sạn muốn chỉnh sửa dữ liệu của
                                m&igrave;nh, kh&aacute;ch sạn li&ecirc;n hệ với ban quản l&yacute; S&agrave;n Giao dịch
                                TMĐT Vntrip.vn để y&ecirc;u cầu Vntrip.vn chỉnh sửa, cập nhật hoặc huỷ bỏ th&ocirc;ng
                                tin của m&igrave;nh.
                                <br />
                                <strong>
                                    6. Cam kết bảo mật th&ocirc;ng tin c&aacute; nh&acirc;n kh&aacute;ch h&agrave;ng:
                                </strong>
                                <br />
                                Th&ocirc;ng tin của th&agrave;nh vi&ecirc;n tr&ecirc;n S&agrave;n GD TMĐT Vntrip.vn được
                                cam kết bảo mật tuyệt đối, theo ch&iacute;nh s&aacute;ch bảo vệ th&ocirc;ng tin
                                c&aacute; nh&acirc;n của S&agrave;n GD TMĐT Vntrip.vn.
                                <br />
                                Việc thu thập v&agrave; sử dụng th&ocirc;ng tin của mỗi th&agrave;nh vi&ecirc;n chỉ được
                                thực hiện khi c&oacute; sự đồng &yacute; của th&agrave;nh vi&ecirc;n đ&oacute; trừ những
                                trường hợp ph&aacute;p luật quy định kh&aacute;c.
                                <br />
                                Th&agrave;nh vi&ecirc;n c&oacute; quyền tự kiểm tra, cập nhật, điều chỉnh hoặc huỷ bỏ
                                th&ocirc;ng tin c&aacute; nh&acirc;n của m&igrave;nh theo quy tr&igrave;nh tại
                                S&agrave;n GD TMĐT Vntrip.vn.
                                <br />
                                S&agrave;n GD TMĐT Vntrip.vn kh&ocirc;ng tiết lộ cho b&ecirc;n thứ ba th&ocirc;ng tin
                                c&aacute; nh&acirc;n hoặc th&ocirc;ng tin về việc sử dụng Vntrip.vn của th&agrave;nh
                                vi&ecirc;n trừ c&aacute;c trường hợp sau:
                                <br />
                                Việc cung cấp th&ocirc;ng tin cho b&ecirc;n thứ ba được sự đồng &yacute; của
                                th&agrave;nh vi&ecirc;n.
                                <br />
                                B&ecirc;n thứ ba l&agrave; b&ecirc;n cung ứng dịch vụ được S&agrave;n GD TMĐT Vntrip.vn
                                thu&ecirc; triển khai dịch vụ như: dịch vụ m&aacute;y chủ, ph&aacute;t triển website,
                                c&aacute;c h&igrave;nh thức thanh to&aacute;n. Trong trường hợp n&agrave;y hợp đồng giữa
                                S&agrave;n GD TMĐT Vntrip.vn v&agrave; b&ecirc;n thứ ba phải quy định r&otilde;
                                tr&aacute;ch nhiệm của mỗi b&ecirc;n trong việc bảo vệ th&ocirc;ng tin người
                                d&ugrave;ng, kh&ocirc;ng chia sẻ th&ocirc;ng tin đ&oacute; với bất cứ ai v&agrave;
                                b&ecirc;n thứ ba chỉ sử dụng th&ocirc;ng tin của th&agrave;nh vi&ecirc;n để thực hiện
                                c&aacute;c chức năng của họ. Khi ph&aacute;t sinh sự cố về hệ thống th&ocirc;ng tin dẫn
                                đến ph&aacute;t sinh nguy cơ mất th&ocirc;ng tin của th&agrave;nh vi&ecirc;n, S&agrave;n
                                GD TMĐT Vntrip.vn v&agrave; b&ecirc;n thứ ba sẽ th&ocirc;ng b&aacute;o cho Cơ quan chức
                                năng trong v&ograve;ng 24 (hai mươi bốn) giờ sau khi ph&aacute;t hiện sự cố.
                                <br />
                                Khi c&oacute; y&ecirc;u cầu hợp ph&aacute;p của cơ quan nh&agrave; nước.
                                <br />
                                Mọi h&agrave;nh vi cố t&igrave;nh để lộ th&ocirc;ng tin của kh&aacute;ch h&agrave;ng
                                hoặc sử dụng th&ocirc;ng tin của kh&aacute;ch h&agrave;ng sai mục đ&iacute;ch đều
                                đ&aacute;ng bị l&ecirc;n &aacute;n v&agrave; xử l&yacute;. Nếu c&oacute; khiếu nại
                                li&ecirc;n quan đến việc để lộ th&ocirc;ng tin kh&aacute;ch h&agrave;ng v&agrave; sử
                                dụng th&ocirc;ng tin của kh&aacute;ch h&agrave;ng sai mục đ&iacute;ch, S&agrave;n GD
                                TMĐT Vntrip.vn sẽ c&oacute; cơ chế x&aacute;c minh v&agrave; xử l&yacute; th&iacute;ch
                                hợp. Trường hợp cần thiết sẽ nhờ sự can thiệp của cơ quan nh&agrave; nước c&oacute; thẩm
                                quyền.
                            </p>

                            <p>
                                <strong>
                                    VII. QUẢN L&Yacute; TH&Ocirc;NG TIN XẤU
                                    <br />
                                    1. Quy định th&agrave;nh vi&ecirc;n
                                </strong>
                                <br />
                                Th&agrave;nh vi&ecirc;n v&agrave; Ban Quản l&yacute; S&agrave;n GDTMĐT Vntrip.vn chịu
                                tr&aacute;ch nhiệm về bảo mật v&agrave; lưu giữ mọi hoạt động sử dụng dịch vụ dưới
                                t&ecirc;n đăng k&yacute;, mật khẩu của th&agrave;nh vi&ecirc;n. Th&agrave;nh vi&ecirc;n
                                c&oacute; tr&aacute;ch nhiệm th&ocirc;ng b&aacute;o kịp thời cho S&agrave;n GD TMĐT
                                Vntrip.vn về những h&agrave;nh vi sử dụng tr&aacute;i ph&eacute;p, lạm dụng, vi phạm bảo
                                mật, lưu giữ t&ecirc;n đăng k&yacute; v&agrave; mật khẩu của b&ecirc;n thứ ba để
                                c&oacute; biện ph&aacute;p giải quyết ph&ugrave; hợp.
                                <br />
                                Nghi&ecirc;m cấm Ban quản l&yacute; v&agrave; Th&agrave;nh vi&ecirc;n S&agrave;n GD TMĐT
                                Vntrip.vn c&oacute; c&aacute;c h&agrave;nh động sau:
                                <br />
                                Gửi l&ecirc;n những th&ocirc;ng tin được hiểu l&agrave; g&acirc;y k&iacute;ch động cộng
                                đồng trực tuyến, như l&agrave; c&aacute;c nội dung ph&acirc;n biệt chủng tộc, m&ecirc;
                                t&iacute;n dị đoan, hận th&ugrave; hoặc x&uacute;c phạm đối với bất k&igrave; c&aacute;
                                nh&acirc;n hay nh&oacute;m n&agrave;o.
                                <br />
                                Tham gia v&agrave;o c&aacute;c hoạt động hoặc gửi l&ecirc;n c&aacute;c Th&ocirc;ng tin
                                c&oacute; thể x&acirc;m hại đến c&aacute;c c&aacute; nh&acirc;n, tổ chức kh&aacute;c.
                                <br />
                                Tham gia v&agrave;o c&aacute;c hoạt động hoặc gửi l&ecirc;n c&aacute;c Th&ocirc;ng tin
                                quấy rối hoặc c&oacute; h&agrave;nh vi quậy ph&aacute; người kh&aacute;c
                                <br />
                                Tham gia v&agrave;o c&aacute;c hoạt động li&ecirc;n quan đến việc ph&aacute;t t&aacute;n
                                &ldquo;thư r&aacute;c&rdquo; hoặc gửi một số lượng lớn thư điện tử kh&ocirc;ng được
                                y&ecirc;u cầu hoặc &ldquo;spam&rdquo; c&aacute;c th&agrave;nh vi&ecirc;n v&agrave; người
                                sử dụng kh&aacute;c.
                                <br />
                                Tham gia v&agrave;o c&aacute;c hoạt động, gửi l&ecirc;n c&aacute;c Th&ocirc;ng tin hay
                                ph&aacute;t t&aacute;n những tin tức gian lận, sai tr&aacute;i, g&acirc;y hiểu lầm, hoặc
                                tuy&ecirc;n truyền, tổ chức c&aacute;c hoạt động lăng mạ, đe doạ, khi&ecirc;u d&acirc;m,
                                phỉ bang hoặc b&ocirc;i nhọ c&aacute;c th&agrave;nh vi&ecirc;n kh&aacute;c.
                                <br />
                                Gửi l&ecirc;n c&aacute;c th&ocirc;ng tin c&oacute; nội dung khi&ecirc;u d&acirc;m.
                                <br />
                                Gửi l&ecirc;n c&aacute;c th&ocirc;ng tin cung cấp c&aacute;c t&agrave;i liệu hướng dẫn
                                v&agrave; c&aacute;c h&agrave;nh vi bất hợp ph&aacute;p như l&agrave; mua b&aacute;n
                                c&aacute;c h&agrave;ng ho&aacute;, cung cấp c&aacute;c dịch vụ cấm kinh doanh, x&acirc;m
                                phạm quyền ri&ecirc;ng tư của người kh&aacute;c hoặc cung cấp v&agrave; ph&aacute;t
                                t&aacute;n virus m&aacute;y t&iacute;nh.
                                <br />
                                Tham gia v&agrave;o c&aacute;c hoạt động hoặc gửi l&ecirc;n c&aacute;c Th&ocirc;ng tin
                                để lộ mật khẩu, danh t&aacute;nh hoặc th&ocirc;ng tin v&igrave; những mục đ&iacute;ch
                                kh&ocirc;ng c&oacute; lợi cho người kh&aacute;c.
                                <br />
                                Tham gia v&agrave;o c&aacute;c hoạt động thương mại, kinh doanh m&agrave; kh&ocirc;ng
                                c&oacute; sự đồng thuận của S&agrave;n GD TMĐT Vntrip.vn, như l&agrave; c&aacute;c cuộc
                                thi, c&aacute; cược, đổi ch&aacute;c, quảng c&aacute;o hoặc kinh doanh đa cấp.
                                <br />
                                Sử dụng c&aacute;c mẫu form tr&ecirc;n website v&agrave; c&aacute;c số điện thoại miễn
                                ph&iacute; để quảng c&aacute;o hoặc quảng b&aacute; c&aacute;c sản phẩm hay dịch vụ đến
                                những người quảng c&aacute;o tr&ecirc;n Vntrip.vn hoặc gạ gẫm quảng c&aacute;o
                                tr&ecirc;n Vntrip.vn dưới bất cứ h&igrave;nh thức n&agrave;o.
                                <br />
                                Sử dụng c&aacute;c thiết bị tự động,hoặc tự tay theo d&otilde;i v&agrave; thu thập
                                th&ocirc;ng tin v&agrave; c&aacute;c trang hiển thị tr&ecirc;n website cho bất k&igrave;
                                mục đ&iacute;ch t&aacute;i sử dụng m&agrave; kh&ocirc;ng được sự cho ph&eacute;p bằng
                                văn bản của S&agrave;n GD TMĐT Vntrip.vn
                                <br />
                                Sử dụng bất kỳ thiết bị hay phần mềm n&agrave;o nhằm x&acirc;m hại hoặc cố &yacute;
                                x&acirc;m phạm đến hoạt động của Vntrip.vn.
                            </p>

                            <p>
                                <strong>2. Danh s&aacute;ch c&aacute;c tin cấm đăng</strong>
                                <br />
                                S&agrave;n GD TMĐT Vntrip.vn chỉ đăng c&aacute;c th&ocirc;ng tin về kh&aacute;ch sạn, du
                                lịch; tuyệt đối kh&ocirc;ng đăng c&aacute;c th&ocirc;ng tin về h&agrave;ng ho&aacute;,
                                dịch vụ kh&ocirc;ng thuộc phạm vi hoạt động S&agrave;n GD TMĐT Vntrip.vn, đặc biệt
                                l&agrave; c&aacute;c h&agrave;ng h&oacute;a hạn chế kinh doanh hoặc h&agrave;ng
                                h&oacute;a, dịch vụ kinh doanh c&oacute; điều kiện theo quy định tại Điều 3 Th&ocirc;ng
                                tư 47/2014/TT-BTC gồm:
                                <br />
                                S&uacute;ng săn v&agrave; đạn s&uacute;ng săn, vũ kh&iacute; thể thao, c&ocirc;ng cụ hỗ
                                trợ
                                <br />
                                Thuốc l&aacute; điếu, x&igrave; g&agrave; v&agrave; c&aacute;c dạng thuốc l&aacute;
                                th&agrave;nh phẩm kh&aacute;c
                                <br />
                                Rượu c&aacute;c loại
                                <br />
                                Thực vật, động vật hoang d&atilde; qu&yacute; hiếm, bao gồm cả vật sống v&agrave;
                                c&aacute;c bộ phận của ch&uacute;ng đ&atilde; được chế biến
                                <br />
                                V&agrave; c&aacute;c h&agrave;ng h&oacute;a, dịch vụ cấm v&agrave; hạn chế kinh doanh,
                                kinh doanh c&oacute; điều kiện kh&aacute;c theo quy định tại văn bản 19/VBHN-BCT
                                v&agrave; quy định ph&aacute;p luật li&ecirc;n quan
                            </p>

                            <p>
                                <strong>3. Cơ chế r&agrave; so&aacute;t th&ocirc;ng tin:</strong>
                                <br />
                                Trước khi đăng tin của th&agrave;nh vi&ecirc;n l&ecirc;n website, ban quản l&yacute;
                                S&agrave;n GD TMĐT Vntrip.vn sẽ c&oacute; c&aacute;c quy tr&igrave;nh kiểm duyệt
                                t&iacute;nh hợp lệ của tin đăng trước khi cho hiển thị l&ecirc;n website.
                                <br />
                                C&aacute;c tin đăng tr&ecirc;n S&agrave;n GD TMĐT Vntrip.vn sẽ được kiểm duyệt bằng đội
                                ngũ nh&acirc;n sự l&agrave; những người c&oacute; kiến thức chuy&ecirc;n m&ocirc;n, nắm
                                vững c&aacute;c quy định của ph&aacute;p luật hiện h&agrave;nh về quản l&yacute; nội
                                dung th&ocirc;ng tin tr&ecirc;n website. Đội ngũ kiểm duyệt tin của S&agrave;n GD TMĐT
                                Vntrip.vn thực hiện việc kiểm duyệt h&agrave;ng ng&agrave;y nhằm kịp thời ph&aacute;t
                                hiện v&agrave; loại bỏ c&aacute;c nội dung vi phạm.
                                <br />
                                H&agrave;ng ng&agrave;y, đội ngũ kiểm duyệt tin sẽ thực hiện việc kiểm duyệt th&ocirc;ng
                                tin trong danh s&aacute;ch mới cập nhật.
                                <br />
                                B&ecirc;n cạnh đ&oacute;, đội ngũ kiểm duyệt tin c&ograve;n thực hiện việc kiểm duyệt
                                th&ocirc;ng tin th&ocirc;ng qua th&ocirc;ng b&aacute;o nội dung xấu của c&aacute;c
                                th&agrave;nh vi&ecirc;n kh&aacute;c. Khi nhận được th&ocirc;ng b&aacute;o, đội ngũ kiểm
                                duyệt tin c&oacute; nhiệm vụ x&aacute;c nhận lại c&aacute;c th&ocirc;ng tin n&agrave;y,
                                nếu ph&aacute;t hiện vi phạm sẽ xử l&yacute; theo quy tr&igrave;nh chung.
                            </p>

                            <p>
                                <strong>4. Biện ph&aacute;p xử l&yacute; c&aacute;c tin vi phạm</strong>
                                <br />
                                C&aacute;c tin đăng được Ban quản l&yacute; S&agrave;n GD TMĐT Vntrip.vn trực tiếp đăng.
                                C&aacute;c th&agrave;nh vi&ecirc;n l&agrave; kh&aacute;ch sạn kh&ocirc;ng trực tiếp đăng
                                tin m&agrave; cung cấp th&ocirc;ng tin cho Vntrip.vn, v&igrave; vậy trước khi cho đăng
                                th&ocirc;ng tin, Ban quản l&yacute; S&agrave;n GD TMĐT Vntrip.vn sẽ c&oacute; biện
                                ph&aacute;p kiểm duyệt th&ocirc;ng tin trước khi cho đăng tải để đảm bảo t&iacute;nh hợp
                                lệ của th&ocirc;ng tin.
                                <br />
                                Tuy nhi&ecirc;n, khi ph&aacute;t hiện bất kỳ tin đăng n&agrave;o vi phạm, kh&ocirc;ng
                                ph&ugrave; hợp Ban quản l&yacute; S&agrave;n GD TMĐT Vntrip.vn lập tức c&oacute; biện
                                ph&aacute;p gỡ bỏ, ngăn chặn.
                            </p>

                            <p>
                                <strong>VIII. TR&Aacute;CH NHIỆM TRONG TRƯỜNG HỢP PH&Aacute;T SINH LỖI KỸ THUẬT</strong>
                                <br />
                                Vntrip.vn cam kết lu&ocirc;n kiểm tra, n&acirc;ng cấp website v&agrave; nỗ lực đảm bảo
                                sự an to&agrave;n v&agrave; ổn định của to&agrave;n bộ hệ thống kỹ thuật của website.
                                Trường hợp ph&aacute;t sinh lỗi kỹ thuật, lỗi đường truyền, lỗi phần mềm hoặc c&aacute;c
                                lỗi kh&aacute;ch quan kh&aacute;c dẫn đến người d&ugrave;ng kh&ocirc;ng thể tham gia
                                giao dịch được xin vui l&ograve;ng th&ocirc;ng b&aacute;o cho Ban quản l&yacute;
                                Vntrip.vn, Vntrip sẽ ngay lập tức &aacute;p dụng c&aacute;c biện ph&aacute;p khắc phục
                                v&agrave; xử l&yacute; lỗi để đảm bảo quyền lợi cho người d&ugrave;ng.
                            </p>

                            <p>
                                <strong>
                                    IX. QUYỀN V&Agrave; NGHĨA VỤ CỦA BAN QUẢN L&Yacute; S&Agrave;N GIAO DỊCH TMĐT
                                    VNTRIP.VN
                                    <br />
                                    1. Quyền của Ban quản l&yacute; S&agrave;n giao dịch TMĐT Vntrip.vn
                                </strong>
                                <br />
                                S&agrave;n Giao dịch thương mại điện tử Vntrip.vn sẽ tiến h&agrave;nh x&acirc;y dựng
                                c&aacute;c ch&iacute;nh s&aacute;ch dịch vụ &aacute;p dụng cho loại h&igrave;nh dịch vụ
                                kh&aacute;ch sạn, du lịch tr&ecirc;n S&agrave;n giao dịch TMĐT Vntrip.vn.
                                <br />
                                Trong trường hợp c&oacute; cơ sở để chứng minh th&agrave;nh vi&ecirc;n S&agrave;n Giao
                                dịch TMĐT Vntrip.vn v&agrave; người d&ugrave;ng cung cấp th&ocirc;ng tin cho S&agrave;n
                                Giao dịch TMĐT Vntrip.vn kh&ocirc;ng ch&iacute;nh x&aacute;c, sai lệch, g&acirc;y nhầm
                                lẫn, kh&ocirc;ng đầy đủ hoặc vi phạm ph&aacute;p luật, kh&ocirc;ng ph&ugrave; hợp với
                                thuần phong mỹ tục Việt Nam th&igrave; S&agrave;n giao dịch TMĐT Vntrip.vn c&oacute;
                                quyền từ chối, tạm ngừng hoặc chấm dứt quyền sử dụng dịch vụ của th&agrave;nh vi&ecirc;n
                                hoặc người d&ugrave;ng đ&oacute;.
                                <br />
                                S&agrave;n Giao dịch TMĐT Vntrip.vn c&oacute; thể chấm dứt hợp t&aacute;c, ngừng cung
                                cấp dịch vụ cho th&agrave;nh vi&ecirc;n S&agrave;n Giao dịch TMĐT Vntrip.vn v&agrave; sẽ
                                th&ocirc;ng b&aacute;o trước cho th&agrave;nh vi&ecirc;n trong thời hạn &iacute;t nhất
                                l&agrave; một (01) th&aacute;ng trong trường hợp Th&agrave;nh vi&ecirc;n vi phạm
                                c&aacute;c quy chế của S&agrave;n Giao dịch TMĐT Vntrip.vn hoặc c&oacute; những
                                h&agrave;nh vi ảnh hưởng đến hoạt động kinh doanh của S&agrave;n Giao dịch TMĐT
                                Vntrip.vn.
                                <br />
                                S&agrave;n Giao dịch TMĐT Vntrip.vn sẽ chấm dứt ngay quyền sử dụng dịch vụ của
                                th&agrave;nh vi&ecirc;n n&ecirc;n ph&aacute;t hiện Th&agrave;nh vi&ecirc;n đ&atilde;
                                ph&aacute; sản, bị kết &aacute;n hoặc đang trong thời gian thụ &aacute;n, trong trường
                                hợp th&agrave;nh vi&ecirc;n tiếp tục hoạt động c&oacute; thể g&acirc;y hại cho
                                S&agrave;n Giao dịch TMĐT Vntrip.vn
                                <br />
                                S&agrave;n Giao dịch TMĐT Vntrip.vn c&oacute; quyền thay đổi gi&aacute; dịch vụ
                                v&agrave; phương thức thanh to&aacute;n ph&ugrave; hợp với gi&aacute; cả thị trường
                                v&agrave; c&aacute;c quy định của ph&aacute;p luật trong thời gian cung cấp dịch vụ
                                v&agrave; sẽ b&aacute;o trước cho th&agrave;nh vi&ecirc;n trong thời hạn một (01)
                                th&aacute;ng trước khi thay đổi.
                            </p>

                            <p>
                                <strong>
                                    2. Nghĩa vụ v&agrave; tr&aacute;ch nhiệm của Ban quản l&yacute; S&agrave;n giao dịch
                                    TMĐT Vntrip.vn
                                </strong>
                                <br />
                                S&agrave;n Giao dịch thương mại điện tử Vntrip.vn chịu tr&aacute;ch nhiệm cung cấp
                                c&aacute;c dịch vụ cho c&aacute;c th&agrave;nh vi&ecirc;n v&agrave; người d&ugrave;ng
                                tham gia khi đ&atilde; ho&agrave;n th&agrave;nh c&aacute;c thủ tục c&aacute;c điều kiện
                                bắt buộc m&agrave; S&agrave;n giao dịch TMĐT Vntrip.vn n&ecirc;u ra.
                                <br />
                                S&agrave;n giao dịch TMĐT Vntrip.vn chịu tr&aacute;ch nhiệm x&acirc;y dựng S&agrave;n
                                Giao dịch bao gồm c&aacute;c c&ocirc;ng việc: nghi&ecirc;n cứu, thiết kế, mua sắm
                                c&aacute;c thiết bị phần cứng v&agrave; phần mềm, kết nối internet, x&acirc;y dựng
                                ch&iacute;nh s&aacute;ch phục vụ cho hoạt động S&agrave;n giao dịch TMĐT Vntrip.vn trong
                                điều kiện v&agrave; phạm vi cho ph&eacute;p.
                                <br />
                                S&agrave;n giao dịch TMĐT Vntrip.vn sẽ tiến h&agrave;nh triển khai v&agrave; hợp
                                t&aacute;c với c&aacute;c đối t&aacute;c trong việc x&acirc;y dựng hệ thống c&aacute;c
                                dịch vụ, c&aacute;c c&ocirc;ng cụ tiện &iacute;ch phục vụ cho việc giao dịch của
                                c&aacute;c th&agrave;nh vi&ecirc;n tham gia v&agrave; người sử dụng tr&ecirc;n
                                S&agrave;n giao dịch TMĐT Vntrip.vn
                                <br />
                                S&agrave;n giao dịch TMĐT Vntrip.vn chịu tr&aacute;ch nhiệm x&acirc;y dựng, bổ sung hệ
                                thống c&aacute;c kiến thức, th&ocirc;ng tin về: nghiệp vụ thương mại điện tử, hệ thống
                                văn bản ph&aacute;p luật thương mại trong nước v&agrave; quốc tế, thị trường nước
                                ngo&agrave;i, cũng như c&aacute;c tin tức c&oacute; li&ecirc;n quan đến hoạt động của
                                S&agrave;n giao dịch TMĐT Vntrip.vn.
                                <br />
                                S&agrave;n giao dịch TMĐT Vntrip.vn sẽ cố gắng đến mức cao nhất trong phạm vi v&agrave;
                                điều kiện c&oacute; thể để duy tr&igrave; hoạt động b&igrave;nh thường của S&agrave;n
                                giao dịch TMĐT Vntrip.vn v&agrave; khắc phục c&aacute;c sự cố như: sự cố kỹ thuật về
                                m&aacute;y m&oacute;c, lỗi phần mềm, hệ thống đường truyền internet, nh&acirc;n sự,
                                c&aacute;c biến động x&atilde; hội, thi&ecirc;n tai, mất điện, c&aacute;c quyết định của
                                cơ quan nh&agrave; nước hay một tổ chức li&ecirc;n quan thứ ba. Tuy nhi&ecirc;n nếu
                                những sự cố tr&ecirc;n xảy ra nằm ngo&agrave;i khả năng kiểm so&aacute;t, l&agrave;
                                những trường hợp bất khả kh&aacute;ng m&agrave; g&acirc;y thiệt hại cho th&agrave;nh
                                vi&ecirc;n th&igrave; S&agrave;n giao dịch TMĐT Vntrip.vn kh&ocirc;ng phải chịu
                                tr&aacute;ch nhiệm li&ecirc;n đới.
                                <br />
                                Ngăn chặn v&agrave; loại bỏ khỏi website những th&ocirc;ng tin b&aacute;n h&agrave;ng
                                h&oacute;a, dịch vụ thuộc danh mục h&agrave;ng h&oacute;a, dịch vụ cấm kinh doanh theo
                                quy định của ph&aacute;p luật v&agrave; h&agrave;ng h&oacute;a hạn chế kinh doanh theo
                                quy định ph&aacute;p luật v&agrave; quy định tại Quy chế quản l&yacute;, điều
                                h&agrave;nh S&agrave;n giao dịch thương mại điện tử Vntrip.vn.
                                <br />
                                Loại bỏ khỏi website những th&ocirc;ng tin b&aacute;n h&agrave;ng giả, h&agrave;ng
                                nh&aacute;i, h&agrave;ng nhập lậu, h&agrave;ng vi phạm quyền sở hữu tr&iacute; tuệ
                                v&agrave; c&aacute;c h&agrave;ng h&oacute;a, dịch vụ vi phạm ph&aacute;p luật
                                kh&aacute;c khi ph&aacute;t hiện hoặc nhận được phản &aacute;nh c&oacute; căn cứ
                                x&aacute;c thực về những th&ocirc;ng tin n&agrave;y.
                                <br />
                                Y&ecirc;u cầu b&ecirc;n cung cấp dịch vụ kh&aacute;ch sạn, lưu tr&uacute; phải chứng
                                minh đủ điều kiện kinh doanh dịch vụ.
                                <br />
                                S&agrave;n giao dịch TMĐT Vntrip.vn c&oacute; cơ chế kiểm tra, gi&aacute;m s&aacute;t để
                                đảm bảo việc cung cấp th&ocirc;ng tin của th&agrave;nh vi&ecirc;n tr&ecirc;n s&agrave;n
                                giao dịch thương mại điện tử được thực hiện ch&iacute;nh x&aacute;c, đầy đủ.
                                <br />
                                C&oacute; biện ph&aacute;p xử l&yacute; kịp thời khi ph&aacute;t hiện hoặc nhận được
                                phản &aacute;nh về h&agrave;nh vi kinh doanh vi phạm ph&aacute;p luật tr&ecirc;n
                                S&agrave;n giao dịch TMĐT Vntrip.vn.
                                <br />
                                C&ocirc;ng bố c&ocirc;ng khai cơ chế giải quyết c&aacute;c tranh chấp ph&aacute;t sinh
                                trong qu&aacute; tr&igrave;nh giao dịch tr&ecirc;n s&agrave;n giao dịch thương mại điện
                                tử. Khi kh&aacute;ch h&agrave;ng tr&ecirc;n s&agrave;n giao dịch thương mại điện tử
                                ph&aacute;t sinh m&acirc;u thuẫn với th&agrave;nh vi&ecirc;n hoặc bị tổn hại lợi
                                &iacute;ch hợp ph&aacute;p, S&agrave;n giao dịch TMĐT Vntrip.vn cung cấp cho
                                kh&aacute;ch h&agrave;ng th&ocirc;ng tin về th&agrave;nh vi&ecirc;n vi phạm, t&iacute;ch
                                cực hỗ trợ kh&aacute;ch h&agrave;ng bảo vệ quyền v&agrave; lợi &iacute;ch hợp
                                ph&aacute;p của m&igrave;nh.
                            </p>

                            <p>
                                <strong>
                                    X. QUYỀN V&Agrave; TR&Aacute;CH NHIỆM CỦA TH&Agrave;NH VI&Ecirc;N THAM GIA
                                    S&Agrave;N GIAO DỊCH TMĐT VNTRIP.VN
                                </strong>
                                <br />
                                <strong>
                                    1. Quyền của Th&agrave;nh vi&ecirc;n S&agrave;n Giao dịch thương mại điện tử
                                    Vntrip.vn
                                </strong>
                                <br />
                                Khi đăng k&yacute; trở th&agrave;nh th&agrave;nh vi&ecirc;n của S&agrave;n Giao dịch
                                thương mại điện tử Vntrip.vn v&agrave; được Vntrip.vn đồng &yacute;, c&aacute;c
                                th&agrave;nh vi&ecirc;n l&agrave; kh&aacute;ch h&agrave;ng sẽ được quyền khởi tạo một
                                t&agrave;i khoản online để tiến h&agrave;nh t&igrave;m hiểu về c&aacute;c kh&aacute;ch
                                sạn tr&ecirc;n S&agrave;n Giao dịch thương mại điện tử Vntrip.vn, c&aacute;c
                                kh&aacute;ch sạn kh&ocirc;ng cần đăng k&yacute; t&agrave;i khoản online để trở
                                th&agrave;nh th&agrave;nh vi&ecirc;n của Vntrip.vn, m&agrave; th&ocirc;ng tin của
                                kh&aacute;ch sạn sẽ được ban quản l&yacute; Vntrip.vn trực tiếp thu thập, x&eacute;t
                                duyệt v&agrave; đăng l&ecirc;n website Vntrip.vn.
                                <br />
                                Th&agrave;nh vi&ecirc;n đăng k&yacute; t&agrave;i khoản sẽ được cấp một t&ecirc;n đăng
                                k&yacute; v&agrave; mật khẩu ri&ecirc;ng để được v&agrave;o sử dụng c&aacute;c dịch vụ
                                tr&ecirc;n S&agrave;n Giao dịch thương mại điện tử Vntrip.vn. Website Vntrip.vn sẽ chịu
                                tr&aacute;ch nhiệm như một k&ecirc;nh trung gian, đưa th&ocirc;ng tin của kh&aacute;ch
                                sạn tiếp cận với kh&aacute;ch h&agrave;ng
                            </p>

                            <p>
                                <strong>
                                    2. Nghĩa vụ của Th&agrave;nh vi&ecirc;n S&agrave;n giao dịch TMĐT Vntrip.vn
                                </strong>
                                <br />
                                Th&agrave;nh vi&ecirc;n sẽ tự chịu tr&aacute;ch nhiệm về bảo mật v&agrave; lưu giữ
                                v&agrave; mọi hoạt động sử dụng dịch vụ dưới t&ecirc;n đăng k&yacute;, mật khẩu
                                v&agrave; hộp thư điện tử của m&igrave;nh.
                                <br />
                                Th&agrave;nh vi&ecirc;n c&oacute; tr&aacute;ch nhiệm th&ocirc;ng b&aacute;o kịp thời cho
                                S&agrave;n giao dịch TMĐT Vntrip.vn về những h&agrave;ng vi sử dụng tr&aacute;i
                                ph&eacute;p, lạm dụng vi phạm bảo mật, lưu giữ t&ecirc;n đăng k&yacute; v&agrave; mật
                                khẩu của m&igrave;nh để 2 b&ecirc;n c&ugrave;ng hợp t&aacute;c xử l&yacute;.
                                <br />
                                Th&agrave;nh vi&ecirc;n cam kết những th&ocirc;ng tin cung cấp cho S&agrave;n giao dịch
                                TMĐT Vntrip.vn v&agrave; những th&ocirc;ng tin đăng tải tr&ecirc;n S&agrave;n giao dịch
                                TMĐT Vntrip.vn l&agrave; ch&iacute;nh x&aacute;c v&agrave; ho&agrave;n chỉnh.
                                <br />
                                Th&agrave;nh vi&ecirc;n tự chịu tr&aacute;ch nhiệm về nội dung, h&igrave;nh ảnh
                                v&agrave; c&aacute;c th&ocirc;ng tin kh&aacute;c đăng l&ecirc;n website Vntrip.vn cũng
                                như to&agrave;n bộ qu&aacute; tr&igrave;nh giao dịch với c&aacute;c đối t&aacute;c
                                tr&ecirc;n S&agrave;n giao dịch TMĐT Vntrip.vn.
                                <br />
                                Th&agrave;nh vi&ecirc;n cam kết, đồng &yacute; kh&ocirc;ng sử dụng dịch vụ của
                                S&agrave;n giao dịch TMĐT Vntrip.vn v&agrave;o những mục đ&iacute;ch bất hợp
                                ph&aacute;p, kh&ocirc;ng hợp l&yacute;, lừa đảo, đe doạ thăm d&ograve; th&ocirc;ng tin
                                bất hợp ph&aacute;p, ph&aacute; hoại, tạo ra v&agrave; ph&aacute;t t&aacute;n virus
                                g&acirc;y hư hại tới hệ thống, cấu h&igrave;nh, truyền tải th&ocirc;ng tin của
                                S&agrave;n giao dịch TMĐT Vntrip.vn hay sử dụng dịch vụ của m&igrave;nh v&agrave;o mục
                                đ&iacute;ch đầu cơ, lũng đoạn thị trường tạo những đơn đặt h&agrave;ng, ch&agrave;o
                                h&agrave;ng giả, kể cả phục vụ cho việc thăm d&ograve;, ph&aacute;n đo&aacute;n nhu cầu
                                thị trường. Trong trường hợp vi phạm th&igrave; th&agrave;nh vi&ecirc;n phải chịu
                                tr&aacute;ch nhiệm về c&aacute;c h&agrave;nh vi của m&igrave;nh trước ph&aacute;p luật.
                                <br />
                                Th&agrave;nh vi&ecirc;n cam kết kh&ocirc;ng thay đổi, chỉnh sửa, sao ch&eacute;p, truyền
                                b&aacute;, ph&acirc;n phối, cung cấp v&agrave; tạo ra những c&ocirc;ng cụ tương tự của
                                dịch vụ do S&agrave;n giao dịch TMĐT Vntrip.vn cung cấp cho một b&ecirc;n thứ ba nếu
                                kh&ocirc;ng được sự đồng &yacute; của S&agrave;n giao dịch TMĐT Vntrip.vn.
                                <br />
                                Th&agrave;nh vi&ecirc;n kh&ocirc;ng được h&agrave;nh động g&acirc;y mất uy t&iacute;n
                                của S&agrave;n giao dịch TMĐT Vntrip.vn dưới mọi h&igrave;nh thức như g&acirc;y mất
                                đo&agrave;n kết giữa c&aacute;c th&agrave;nh vi&ecirc;n bằng c&aacute;ch sử dụng
                                t&ecirc;n đăng k&yacute; thứ hai, th&ocirc;ng qua một b&ecirc;n thứ ba hoặc tuy&ecirc;n
                                truyền, phố biến những th&ocirc;ng tin kh&ocirc;ng c&oacute; lợi cho uy t&iacute;n của
                                S&agrave;n giao dịch TMĐT Vntrip.vn.
                                <br />
                                Cung cấp đầy đủ v&agrave; ch&iacute;nh x&aacute;c c&aacute;c th&ocirc;ng tin: T&ecirc;n
                                v&agrave; địa chỉ trụ sở của thương nh&acirc;n, tổ chức hoặc t&ecirc;n v&agrave; địa chỉ
                                thường tr&uacute; của c&aacute; nh&acirc;n; Số, ng&agrave;y cấp v&agrave; nơi cấp giấy
                                chứng nhận đăng k&yacute; kinh doanh của thương nh&acirc;n, hoặc số, ng&agrave;y cấp
                                v&agrave; đơn vị cấp quyết định th&agrave;nh lập của tổ chức, hoặc m&atilde; số thuế
                                c&aacute; nh&acirc;n của c&aacute; nh&acirc;n; Số điện thoại hoặc một phương thức
                                li&ecirc;n hệ trực tuyến kh&aacute;c cho S&agrave;n Giao dịch TMĐT Vntrip.vn tử khi đăng
                                k&yacute; sử dụng dịch vụ.
                                <br />
                                Cung cấp đầy đủ th&ocirc;ng tin về kh&aacute;ch sạn cho thu&ecirc; tr&ecirc;n S&agrave;n
                                Giao dịch TMĐT Vntrip.vn, bao gồm những th&ocirc;ng tin để kh&aacute;ch h&agrave;ng
                                c&oacute; thể x&aacute;c định ch&iacute;nh x&aacute;c c&aacute;c đặc t&iacute;nh
                                kh&aacute;ch sạn nhằm tr&aacute;nh sự hiểu nhầm khi quyết định việc đề nghị giao kết hợp
                                đồng.
                                <br />
                                Đảm bảo t&iacute;nh ch&iacute;nh x&aacute;c, trung thực của th&ocirc;ng tin về
                                kh&aacute;ch sạn cung cấp tr&ecirc;n S&agrave;n giao dịch TMĐT Vntrip.vn.
                                <br />
                                Tu&acirc;n thủ quy định của ph&aacute;p luật về thanh to&aacute;n, quảng c&aacute;o,
                                khuyến mại, bảo vệ quyền sở hữu tr&iacute; tuệ, bảo vệ quyền lợi người ti&ecirc;u
                                d&ugrave;ng v&agrave; c&aacute;c quy định của ph&aacute;p luật c&oacute; li&ecirc;n quan
                                kh&aacute;c cung ứng dịch vụ tr&ecirc;n S&agrave;n giao dịch TMĐT Vntrip.vn
                                <br />
                                Thực hiện đầy đủ nghĩa vụ thuế theo quy định của ph&aacute;p luật.
                            </p>

                            <p>
                                <strong>XI. ĐIỀU KHOẢN &Aacute;P DỤNG</strong>
                                <br />
                                Quy chế của S&agrave;n Giao dịch thương mại điện tử Vntrip.vn c&oacute; hiệu lực kể từ
                                ng&agrave;y k&yacute; quyết định ban h&agrave;nh k&egrave;m theo Quy chế n&agrave;y.
                                S&agrave;n Giao dịch thương mại điện tử Vntrip.vn c&oacute; quyền v&agrave; c&oacute;
                                thể thay đổi Quy chế n&agrave;y bằng c&aacute;ch th&ocirc;ng b&aacute;o l&ecirc;n
                                S&agrave;n Giao dịch thương mại điện tử Vntrip.vn cho c&aacute;c th&agrave;nh vi&ecirc;n
                                biết.
                                <br />
                                Quy chế sửa đổi c&oacute; hiệu lực kể từ ng&agrave;y Quyết định về việc sửa đổi Quy chế
                                c&oacute; hiệu lực. Việc th&agrave;nh vi&ecirc;n tiếp tục sử dụng dịch vụ sau khi Quy
                                chế sửa đổi được c&ocirc;ng bố v&agrave; thực thi đồng nghĩa với việc họ đ&atilde; chấp
                                nhận Quy chế sửa đổi n&agrave;y.
                            </p>

                            <p>
                                <strong>XII. ĐIỀU KHOẢN CAM KẾT</strong>
                                <br />
                                Mọi tranh chấp ph&aacute;t sinh giữa S&agrave;n Giao dịch thương mại điện tử Vntrip.vn
                                v&agrave; th&agrave;nh vi&ecirc;n sẽ được giải quyết tr&ecirc;n cơ sở thương lượng.
                                Trường hợp kh&ocirc;ng đạt được thoả thuận như mong muốn, một trong hai b&ecirc;n
                                c&oacute; quyền đưa vụ việc ra To&agrave; &aacute;n nh&acirc;n d&acirc;n c&oacute; thẩm
                                quyền để giải quyết.
                                <br />
                                S&agrave;n giao dịch TMĐT Vntrip.vn v&agrave; c&aacute;c th&agrave;nh vi&ecirc;n đồng
                                &yacute; cam kết thực hiện đ&uacute;ng c&aacute;c điều khoản trong nội dung Quy chế
                                n&agrave;y.
                                <br />
                                Địa chỉ li&ecirc;n lạc ch&iacute;nh thức của S&agrave;n giao dịch TMĐT: Vntrip.vn
                                <br />
                                S&agrave;n Giao dịch Thương mại điện tử Vntrip.vn
                                <br />
                                C&ocirc;ng ty tr&aacute;ch nhiệm hữu hạn VNTRIP OTA
                                <br />
                                M&atilde; số doanh nghiệp: 0107426591 do Sở Kế hoạch v&agrave; đầu tư th&agrave;nh phố
                                H&agrave; Nội cấp đăng k&yacute; lần đầu ng&agrave;y 09 th&aacute;ng 05 năm 2016.
                                <br />
                                Địa chỉ: Tầng 2 T&ograve;a nh&agrave; 17T4 Hapulico Complex, Số 1 Nguyễn Huy Tưởng,
                                Thanh Xu&acirc;n, H&agrave; Nội
                                <br />
                                Tel: 04 6260 4458
                                <br />
                                Email: info@Vntrip.vn
                            </p>

                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default OperationRegulations
