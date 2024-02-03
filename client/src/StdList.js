import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
function StdList() {
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

  const Edit = (id) => {
    navigate("/edit/" + id);
  };
  const Details = (id) => {
    navigate("/details/" + id);
  };

  const Delete = (id) => {
    axios
      .delete(`http://localhost:5000/deletedata/${id}`)
      .then(() => {
        getrecord();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <>
            <h3>
              <u>-:Student Data:-</u>
            </h3>
            <h4>
              Add Student Data:
              <Link to="/create">
                <Button
                  className="mb-3 p-1"
                  as="input"
                  variant="info"
                  type="button"
                  value="Add"
                />
              </Link>
            </h4>
            <hr />
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Percentage</th>
                  <th colSpan="3">Additional</th>
                </tr>
              </thead>

              {data.map((dta, id) => {
                return (
                  <>
                    <tbody style={{ verticalAlign: "middle" }}>
                      <tr>
                        <td>{id + 1}</td>
                        <td>{dta.name}</td>
                        <td>{dta.age}</td>
                        <td>{dta.perc}%</td>

                        <td>
                          <Button
                            style={{ fontSize: "15px" }}
                            variant="primary"
                            as="input"
                            type="button"
                            value="Edit"
                            onClick={() => Edit(dta._id)}
                          />
                        </td>
                        <td>
                          <Button
                            style={{ fontSize: "15px" }}
                            variant="danger"
                            as="input"
                            type="button"
                            value="Details"
                            onClick={() => Details(dta._id)}
                          />
                        </td>
                        <td>
                          <Button
                            style={{ fontSize: "15px" }}
                            as="input"
                            variant="success"
                            type="button"
                            value="Delete"
                            onClick={() => Delete(dta._id)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </Table>
          </>
        </Col>
      </Row>
    </Container>
  );
}
export default StdList;
