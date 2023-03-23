import React from "react";
import logoFooter from "../../assets/imgs/logo-footer.png";
import { MDBIcon } from "mdb-react-ui-kit";

function Footer() {
    return (
        <footer class="footer">
            <div class="container">
                <div class="footer__distance"></div>
                <div class="row footer__information pt-5">
                    <div class="col-lg-6 col-md-12">
                        <img
                            src={logoFooter}
                            alt="logo footer"
                            class="footer__information-logo"
                        />
                        <p class="footer__information-text">
                            Travel service website là công cụ giúp bạn có được những chuyến nghỉ dưỡng một cách nhanh chóng và tiện lợi
                        </p>
                        <ul class="footer__information-icon">
                            <li class="footer__information-item">
                                <i class="footer__information-item-icon fab fa-twitter-square"></i>
                            </li>
                            <li class="footer__information-item">
                                <i class="footer__information-item-icon fab fa-youtube"></i>
                            </li>
                            <li class="footer__information-item">
                                <i class="footer__information-item-icon fab fa-facebook-square"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <h4 class="footer__information-heading">Liên hệ</h4>
                        <ul class="footer__information-list">
                            <li class="footer__information-list-item">
                                <i class="footer__information-list-item-icon fas fa-envelope"></i>
                                Mail: travelserviceute@gmail.com
                            </li>
                            <li class="footer__information-list-item">
                                <i class="footer__information-list-item-icon fas fa-phone-square"></i>
                                Điện thoại: 0987456456
                            </li>
                            <li class="footer__information-list-item">
                                <i class="footer__information-list-item-icon fas fa-map-marker-alt"></i>
                                Địa chỉ: TP. Hồ Chí Minh
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row footer__information-footing"></div>
                <div class="footer__distance"></div>
            </div>
        </footer>
    );
}

export default Footer;
