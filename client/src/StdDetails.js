import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
function StdDetails() {
  const [data, setData] = useState({});
  const { stdDta } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/data/${stdDta}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [stdDta]); // Include stdDta in the dependency array if you want to fetch data whenever stdDta changes

  return (
    <Container>
      <Row>
        {" "}
        <div className="justify-content-md-center">
          <h2>
            <u>Student Details</u>
          </h2>
          {
            <div className="detailspage">
              <h3>
                Student Id:<span>{data._id}</span>
              </h3>
              <h3>
                Student Name:<span>{data.name}</span>
              </h3>

              <h3>
                Student Age:<span>{data.age}</span>
              </h3>
              <h3>
                Student Percentage:<span>{data.perc}</span>
              </h3>
              <Link to="/">
                <Button variant="primary">{">>"}Back</Button>
              </Link>
            </div>
          }
        </div>
      </Row>
    </Container>
  );
}
export default StdDetails;
