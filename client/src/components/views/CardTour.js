import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup,
    MDBBtn,
    MDBIcon,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../../redux/features/tourSlice";
import { toast } from "react-toastify";
// import image from "../../../src/assets/our_destination"

const CardTour = ({
    imageFile,
    description,
    title,
    tags,
    businessHours,
    location,
    contact,
    price,
    discount,
    _id,
    name,
    likes,
}) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + " ...";
        }
        return str;
    };


    return (
        <div className="col-12 col-lg-4 content__destination-item">
            <img src={imageFile} alt="Europe" class="content__destination-item-img"/>
            <img src="./assets/img/our_destination/Europe_icon.png" alt="" class="content__destination-item-icon"/>
            <div class="content__destination-item-text">
                {/* <h3 class="content__destination-item-text-destination">Europe</h3>
                <p class="content__destination-item-text-package">3 PACKAGES</p> */}
            </div>

            <div class="content__destination-details">
                <h3 class="content__destination-details-heading">{title}</h3>
                {/* <ul class="content__destination-details-places">
                    <li class="content__destination-details-places-item">
                        <a href="" class="content__destination-details-places-link">Berlin</a>
                    </li>
                    <li class="content__destination-details-places-item">
                        <a href="" class="content__destination-details-places-link">Amsterdam</a>
                    </li>
                    <li class="content__destination-details-places-item">
                        <a href="" class="content__destination-details-places-link">Tuscany</a>
                    </li>
                </ul> */}
                <Link to={`/tour/${_id}`} class="content__destination-details-btn btn--custom">Chi tiết</Link>
            </div>
        </div>
    );
};

export default CardTour;
