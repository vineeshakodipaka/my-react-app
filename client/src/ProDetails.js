import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row } from "react-bootstrap";
import axios from "axios";
function ProDetails() {
  const [data, setData] = useState({});
  const { proDta } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/data/${proDta}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [proDta]);

  return (
    <Container>
      <Row>
        <div className="justify-content-md-center">
          <h2 className="text-center">
            <u>Product Details:</u>
          </h2>
          {
            <center>
              <Card
                className="cards m-3 text-start p-3"
                style={{ width: "30%" }}
              >
                <Card.Title className="text-center">{data.name}</Card.Title>

                <center>
                  <Card.Img
                    className="card-img mt-2"
                    variant="top"
                    style={{
                      width: "35%",
                    }}
                    src={data.image}
                  />
                </center>

                <Card.Body>
                  <Card.Text className="mt-4">
                    <span className="fw-bold fs-4">Price:</span>
                    <span className="fs-4">{data.price}</span>
                  </Card.Text>
                  <Card.Text>
                    <h3>Description:</h3>
                    {data.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </center>
          }
        </div>
      </Row>
    </Container>
  );
}
export default ProDetails;
