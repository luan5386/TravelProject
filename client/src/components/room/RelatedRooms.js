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

const RelatedRooms = ({ relatedRooms, roomId }) => {
  return (
    <>
      {relatedRooms && relatedRooms.length > 0 && (
        <>
          {relatedRooms.length > 1 && <h4 className="mt-4"><b>Các phòng liên quan</b></h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-3">
            {relatedRooms
              .filter((item) => item._id !== roomId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol>
                  <MDBCard>
                    <Link to={`/room/${item._id}`}>
                      <MDBCardImage
                        src={item.imageFile}
                        alt={item.roomNumber}
                        position="top"
                        style={{ maxWidth: "100%", height: "200px" }}
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {item.tags.map((tag) => (
                        <Link to={`/rooms/tag/${tag}`}> #{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        <b>Phòng: {item.roomNumber}</b>
                      </MDBCardTitle>
                    <MDBCardText className="text-start">
                        <i class="fas fa-dice-d20 me-2"></i>
                        Số giường: {item.numberOfBeds}
                    </MDBCardText>
                      <MDBCardText className="text-start">
                        <i class="fas fa-pen-alt me-2"></i>
                        Mô tả: {excerpt(item.description, 45)}
                      </MDBCardText>
                    <MDBCardText className="text-start">
                        <i class="fas fa-map-marker-alt me-2"></i>
                        Địa điểm: {excerpt(item.location, 20)}
                    </MDBCardText>
                    <MDBCardText className="text-start">
                        <i class="fas fa-dollar-sign me-2"></i>
                        Giá phòng: {item.price} vnđ
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

export default RelatedRooms;