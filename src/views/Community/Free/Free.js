import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from "axios";

function UserRow(props) {
  const post = props.post
  const postLink = `/freeBBS/${post.id}`

  return (
    <tr key={post.id.toString()}>
      <td>{post.id}</td>
      <td><Link to={postLink}>{post.title}</Link></td>
      <td>{post.views}</td>
      <td><Link to={postLink}>{post.writer_id}</Link></td>
      <td>{post.write_date}</td>
    </tr>
  )
}

class Free extends Component {
  constructor(props) {
    super(props);
    this.state = {list: null};
    this.getFreeBBSList();
  }

  componentDidMount() {
    this.getFreeBBSList();
  }

  getFreeBBSList = async () => {
    axios.post("http://localhost:3001/community/get_title_list", {
      class: "free",
      }).then( res => {
        let data=res.data;
        if(data.error){
          alert("DB에러");
        } else {
          console.log(data.bbs);
          this.setState({list: data.bbs});
        }
      }).catch( error => {
        console.log('failed', error)
      })
  };
  render() {
    const list = this.state.list;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>자유게시판
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
                  {this.state.list ?
                  (list.map((post, index) =>
                    <UserRow key={index} post={post}/>
                  ))
                  : <tr><td>("Loading...")</td></tr>
                  }
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

export default Free;
