import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
function StdEdit() {
  const { stdDta } = useParams();
  const [data, Setdata] = useState({
    name: "",
    age: "",
    perc: "",
    active: true,
  });
  const handle = (e) => {
    Setdata({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const { name, age, perc, active } = data;
  useEffect(() => {
    getrecord();
  }, []);

  const getrecord = () => {
    axios
      .get(`http://localhost:5000/data/${stdDta}`)
      .then((response) => {
        Setdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const submitform = (e) => {
    e.preventDefault();
    const dataToUpdate = { name, age, perc, active };

    axios
      .patch(`http://localhost:5000/updatedata/${stdDta}`, dataToUpdate, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        alert("Data modified Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  return (
    <>
      <Container>
        <Row>
          <div className="justify-content-md-center">
            <center>
              <h3>
                <u>-:Modify Student Data:-</u>
              </h3>
            </center>
            <Form onSubmit={submitform}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  name="name"
                  required
                  type="text"
                  value={name}
                  onChange={handle}
                  placeholder="Student name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Student Age</Form.Label>
                <Form.Control
                  required
                  name="age"
                  type="number"
                  value={age}
                  onChange={handle}
                  placeholder="Student age"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Student Percentage</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="perc"
                  value={perc}
                  onChange={handle}
                  placeholder="Student percentage"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="active"
                  required
                  checked={active}
                  onChange={handle}
                  label="Check me out"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
              &nbsp;&nbsp;
              <Link to="/">
                <Button variant="primary">{">>"}Back</Button>
              </Link>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default StdEdit;
