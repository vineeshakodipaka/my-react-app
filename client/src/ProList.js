import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
function ProList() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getrecord();
  }, []);

  const getrecord = () => {
    axios
      .get("http://localhost:5000/getdata")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const Details = (id) => {
    navigate("/details/" + id);
  };

  return (
    <Container>
      <Row>
        <>
          {data.map((ele, i) => {
            return (
              <>
                <Col
                  xs={12}
                  lg={4}
                  xl={3}
                  className=" col-xs-12 col-cards  mt-4"
                >
                  <Card key={ele._id} className="cards p-3 m-3">
                    <center>
                      <Card.Title>{ele.name}</Card.Title>
                    </center>
                    <center>
                      <Card.Img
                        className="card-img mt-2"
                        variant="top"
                        onClick={() => Details(ele._id)}
                        src={ele.image}
                      />
                    </center>
                    <Card.Body>
                      <Card.Text className="mt-4">
                        <span className="fw-bold fs-4">Price:</span>
                        <span className="fs-4">{ele.price}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            );
          })}
        </>
      </Row>
    </Container>
  );
}
export default ProList;
