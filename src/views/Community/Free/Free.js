import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import axios from "axios";
import {isLoggedIn} from '../../../modules/auth';

function PostRow(props) {
  const post = props.post
  const postLink = `/community/free/${post.id}`

  const createDate = (createdate) => {
    let current = new Date();
    let koreaDate=new Date(createdate);
    
    if(current.getFullYear()===koreaDate.getFullYear()&&current.getMonth()===koreaDate.getMonth()
      &&current.getDate()===koreaDate.getDate()){
      return koreaDate.getHours()+":"+koreaDate.getMinutes();
    } else {
      return koreaDate.getFullYear()+"."+(koreaDate.getMonth()+1) +"."+koreaDate.getDate()+".";
    }
  }
  
  return (
    <tr key={post.id.toString()}>
      <td>{post.id}</td>
      <td><Link to={postLink}>{post.title}</Link></td>
      <td>{post.views}</td>
      <td><Link to={postLink}>{post.writer_id}</Link></td>
      <td>{createDate(post.write_date)}</td>
    </tr>
  )
}

class Free extends Component {
  constructor(props) {
    super(props);
    let id;
    let page;
    if(this.props.match.params.id)
      id=this.props.match.params.id.split("_");
    if(id!=null)
      page=parseInt(id[1]);
    else
      page=1;
    this.state = {
      list: null,
      page: page,
    };
    this.getFreeBBSList();
  }

  componentDidMount() {
    this.getFreeBBSList();
    console.log(this.state.page)
  }

  getFreeBBSList = async () => {
    axios.post("http://localhost:3001/community/get_title_list", {
      class: "free",
      }).then( res => {
        let data=res.data;
        if(data.error){
          alert("DB에러");
        } else {
          this.setState({list: data.bbs});
        }
      }).catch( error => {
        console.log('failed', error)
      }) 
  };

  refresh(num){
    window.location.href="/#/community/free_"+num;
    window.location.reload();
  }

  makePagination(){ 
    let pageNumMax = Math.ceil(this.state.list.length/15);
    let prevPages=[];
    let curPage = this.state.page;
    let nextPages=[];
    for(let i=1; i<curPage; i++){
      prevPages.push(i);
    }
    for(let i=curPage+1; i<=pageNumMax; i++){
      nextPages.push(i);
    }
    return (
      <Pagination className="d-flex justify-content-center" id="pagination">
        <PaginationItem>
          <PaginationLink previous tag="button"></PaginationLink>
        </PaginationItem>
        {prevPages.map((num, index) => (
          <PaginationItem key={index}>
            <PaginationLink href={"/#/community/free_"+num} onClick={()=>this.refresh(num)}>{num}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem active>
            <PaginationLink href={"/#/community/free_"+curPage} onClick={()=>this.refresh(curPage)}>{curPage}</PaginationLink>
          </PaginationItem>
        {nextPages.map((num, index) => (
          <PaginationItem key={index} onClick={this.test}>
            <PaginationLink href={"/#/community/free_"+num} onClick={()=>this.refresh(num)}>{num}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
        <PaginationLink next tag="button"></PaginationLink>
        </PaginationItem>
      </Pagination>
    )
  }
  render() {
    const list = this.state.list;
    let button = null;
    let pagination = null;

    if(isLoggedIn()){
      button = <Button color="primary" size="sm" className="card-header-actions" href="http://localhost:3000/#/community/write">New</Button>;           
    }
    else{
      button = <Button color="primary" size="sm" className="card-header-actions" onClick={() => {alert("로그인을 하고 이용해 주세요")}} >New</Button>;
    }

    if(this.state.list){
      pagination = this.makePagination();
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>자유게시판
                {button}
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
                  (list.filter((post, index)=>{
                    return index>=(this.state.page-1)*15&&index<=(this.state.page)*15-1;
                  }).map((post, index) =>
                    <PostRow key={index} post={post}/>
                  ))
                  : <tr><td>("Loading...")</td></tr>
                  }
                  </tbody>
                </Table>
                {pagination}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Free;