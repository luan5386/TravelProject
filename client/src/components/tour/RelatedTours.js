import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../../utility";

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <h4>Các tours liên quan</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours
              .filter((item) => item._id !== tourId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol>
                  <MDBCard>
                    <Link to={`/tour/${item._id}`}>
                      <MDBCardImage
                        src={item.imageFile}
                        alt={item.title}
                        position="top"
                        style={{ maxWidth: "100%", height: "200px" }}
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {item.tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        <b>{item.title}</b>
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                          <i class="far fa-clock me-2"></i>
                          Giờ mở cửa: {item.businessHours}
                      </MDBCardText>
                      <MDBCardText className="text-start">
                          <i class="fas fa-map-marker-alt me-2"></i>
                          Địa điểm: {excerpt(item.location, 24)}
                      </MDBCardText>
                      <MDBCardText className="text-start">
                          <i class="fas fa-dollar-sign me-2"></i>
                          Vé vào: {item.price}
                      </MDBCardText>
                      <MDBCardText className="text-start">
                        <i class="fas fa-pen-alt me-2"></i>
                        Mô tả: {excerpt(item.description, 45)}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedTours;