import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
function StdCreate() {
  const [data, Setdata] = useState({
    name: "",
    age: "",
    perc: "",
    active: true,
  });

  const navigate = useNavigate();
  const { name, age, perc, active } = data;

  const submitform = (e) => {
    e.preventDefault();
    const dataToAdd = { name, age, perc, active };

    axios
      .post("http://localhost:5000/adddata", dataToAdd, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        alert("Successfully Added");

        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };


  
  const handle = (e) => {
    Setdata({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Container>
        <Row>
          <div className="justify-content-md-center">
            <h3>
              <u>-:Add Student Data:-</u>
            </h3>

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
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*(\.\d{0,2})?$/.test(val)) {
                      Setdata({ ...data, [e.target.name]: val });
                    }
                  }}
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
                Submit
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
export default StdCreate;
