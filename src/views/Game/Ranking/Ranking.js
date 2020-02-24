import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";

function UserRow(props) {
  const user = props.user;
  const rank = props.rank;
  
  // const userLink = `/users/${user.id}`

  // const getBadge = (status) => {
  //   return status === 'Active' ? 'success' :
  //     status === 'Inactive' ? 'secondary' :
  //       status === 'Pending' ? 'warning' :
  //         status === 'Banned' ? 'danger' :
  //           'primary'
  // }
  return (
    <tr key={rank}>
      <th scope="row">{rank}</th>
      <td>{user.name}</td>
      <td>{user.level}</td>
      <td>{user.exp}</td>
      <td>{user.job}</td>
      <td>{user.createdate}</td>
      {/* <td><Badge color={getBadge(user.status)}>{user.status}</Badge></td> */}
    </tr>
  )
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {usersData: null};
    this.getRankingData();
  }

  componentDidMount() {
    this.getRankingData();
  }

  getRankingData = async () => {
    axios.get("http://localhost:3001/characters/get_ranking")
      .then( res => {
        let data=res.data;
        if(data.error){
          alert("DB에러");
        } else {
          this.setState({usersData: res.data.characters});
          console.log(this.state);
        }
      }).catch( error => {
        console.log('failed', error)
      })
  };

  render() {
    // const userList = this.state.usersData.filter((user) => user.id < 20)
    const userList = this.state.usersData;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Ranking
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">Name</th>
                      <th scope="col">Level</th>
                      <th scope="col">EXP</th>
                      <th scope="col">job</th>
                      <th scope="col">Create Date</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.usersData ?
                  (userList.map((user, index) =>
                    <UserRow key={index} user={user} rank={index+1}/>
                  ))
                  : <tr><td>("Loading...")</td></tr>
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
