import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from "axios";

import FreeData from './FreeData'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <td>{user.id}</td>
      <td><Link to={userLink}>{user.title}</Link></td>
      <td>{user.views}</td>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.registered}</td>
    </tr>
  )
}

class Users extends Component {

  render() {
    const userList = FreeData.filter((user) => user.id < 10)
    // const userList = this.state.usersData;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Post <small className="text-muted">Free</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Num</th>
                      <th scope="col">Title</th>
                      <th scope="col">Views</th>
                      <th scope="col">Author</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user} />
                    )}
                  </tbody>
                </Table>
                <Pagination className="d-flex justify-content-center">
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
