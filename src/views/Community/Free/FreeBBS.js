import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, FormGroup, Input } from 'reactstrap';
import axios from "axios";

function PostRow(props) {
    const post = props.post

    return (
        <tr key={post.id}>
            <td>{post.contents}</td>
            <td>{post.writer_id}</td>
            <td>{post.write_date}</td>
            <td>{post.class}</td>
            <td>{post.views}</td>
        </tr>
    )
}

function Split(props) {
    const post = props.post
    const createDate = (createdate) => {
        let date = createdate.split("T");
        let time = date[1].split(".");
        return date[0].replaceAll("-", ".") + " " + time[0]
    }
    return createDate(post.write_date)
}

class FreeBBS extends Component {
    constructor(props) {
        super(props);
        this.state = { post: null };
        this.getFreeBBSList();
    }

    componentDidMount() {
        this.getFreeBBSList();
    }

    getFreeBBSList = async () => {
        axios.post("http://localhost:3001/community/get_contents", {
            id: this.props.match.params.id,
        }).then(res => {
            let data = res.data;
            if (data.error) {
                alert("DB에러");
            } else {
                console.log(data.bbsContents);
                this.setState({ post: data.bbsContents });
                // console.log(this.state.post)
            }
        }).catch(error => {
            console.log('failed', error)
        })
    };
    render() {
        const post = this.state.post;
        console.log(post);
        return (
            <div className="animated fadeIn" >
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>
                                    {post ?
                                        (<div>
                                            <strong>
                                                {post.title}
                                            </strong>
                                            &nbsp;|&nbsp;
                                           <small>{post.class}</small>
                                            <small className="card-header-actions">
                                                <div className="text-muted">
                                                    {<Split post={post} />}
                                                </div>
                                            </small>
                                        </div>)
                                        : ("Loading...")
                                    }
                                </strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="12">
                                            <strong><div>{post ? <div>작성자 : {post.writer_id}</div> : ("Loading...")}</div></strong>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col xs="8" md="12">
                                            <div>{post ? <div>{post.contents}</div> : ("Loading...")}</div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col xs="8" md="12">
                                            <div>{post ? <div><strong>댓글&nbsp;|&nbsp;조회수&nbsp;</strong></div> : ("Loading...")}</div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col xs="12" md="12">
                                            <Input type="textarea" name="textarea-input" id="textarea-input" rows="2" placeholder="내용..." />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FreeBBS;
