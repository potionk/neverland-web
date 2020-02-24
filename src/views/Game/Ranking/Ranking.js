import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";

function UserRow(props) {
  const user = props.user;
  const rank = props.rank;
  const userJob=(jobCode)=>{
    switch(jobCode){
      case 0:
        return "초보자";
      case 100:
        return "검사";
      case 110:
        return "파이터";
      case 111:
          return "크루세이더";
      case 112:
        return "히어로";
      case 120:
        return "페이지";
      case 121:
        return "나이트";
      case 122:
        return "팔라딘";
      case 130:
        return "스피어맨";
      case 131:
        return "용기사";
      case 132:
        return "다크나이트";
      case 200:
        return "매지션";
      case 210:
        return "위자드 (불,독)";
      case 211:
        return "메이지 (불,독)";
      case 212:
        return "아크메이지 (불,독)";
      case 220:
        return "위자드 (얼음,번개)";
      case 221:
        return "메이지 (얼음,번개)";
      case 222:
        return "아크메이지 (얼음,번개)";
      case 230:
        return "클레릭";
      case 231:
        return "프리스트";
      case 232:
        return "비숍";
      case 300:
        return "아처";
      case 310:
        return "헌터";
      case 311:
        return "레인저";
      case 312:
        return "보우마스터";
      case 320:
        return "사수";
      case 321:
        return "저격수";
      case 322:
        return "신궁";
      case 400:
        return "로그";
      case 410:
        return "어쌔신";
      case 411:
        return "허밋";
      case 412:
        return "나이트로드";
      case 420:
        return "시프";
      case 421:
        return "시프마스터";
      case 422:
        return "새도어";
      case 500:
        return "해적";
      case 510:
        return "인파이터";
      case 511:
        return "버커니어";
      case 512:
        return "바이퍼";
      case 520:
        return "건슬링거";
      case 521:
        return "발키리";
      case 522:
        return "캡틴";
      case 1000:
        return "노블레스";
      case 1100:
      case 1110:
      case 1111:
      case 1112:
        return "소울마스터";
      case 1200:
      case 1210:
      case 1211:
      case 1212:
        return "플레임위자드";
      case 1300:
      case 1310:
      case 1311:
      case 1312:
        return "윈드브레이커";
      case 1400:
      case 1410:
      case 1411:
      case 1412:
        return "나이트워커";
      case 1500:
      case 1510:
      case 1511:
      case 1512:
        return "스트라이커";
      default:
        return jobCode;
    }
  }
  const createDate = (createdate) => {
    let result=createdate.split("T");
    return result[0];
  }
  return (
    <tr key={rank}>
      <th scope="row">{rank}</th>
      <td>{user.name}</td>
      <td>{user.level}</td>
      <td>{user.exp}</td>
      <td>{userJob(user.job)}</td>
      <td>{createDate(user.createdate)}</td>
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
