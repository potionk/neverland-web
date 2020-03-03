import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, ButtonToolbar, ButtonGroup } from 'reactstrap';
import axios from "axios";
import { getLoggedInAccount, isLoggedIn } from '../../../modules/auth';

function Split(props) {
    const post = props.post
    const createDate = (createdate) => {
        let date = createdate.split("T");
        let time = date[1].split(".");
        return date[0].replaceAll("-", ".") + " " + time[0]
    }
    return createDate(post.write_date)
}

// function PostComment(props) {
//     const comment = props.comment

//     return (
//         <tr key={post.body_id.toString()}>
//             <td>{comment.writer_id}</td>
//             <td>{comment.contents}</td>
//             <td>{comment.write_date}</td>
//         </tr>
//     )
// }

class FreeBBS extends Component {
    state = {
        commentContents: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            commentContents: '',
        })
    }
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
    }
    write = async () => {
        axios.post("http://localhost:3001/community/write_comment", {
            writer_id: getLoggedInAccount(),
            contents: this.state.commentContents,
        })
            .then(res => {
                let data = res.data;
                console.log(data);
                if (data.error) {
                    switch (data.errorCode) {
                        case 3:
                            alert("내용을 입력하세요.")
                            window.location.reload();
                            return;
                        default:
                            alert("잘못된 접근입니다.")
                            window.location.reload();
                            return
                    }
                } else {
                    alert("댓글이 등록되었습니다.")
                    window.location.reload();
                }
            }).catch(error => {
                console.log('failed', error)
            })
    }
    render() {
        const post = this.state.post;
        let button = null;

        if (isLoggedIn()) {
            button = <Button color="primary" size="sm" className="card-header-actions" onClick={this.write}>등록</Button>
        }
        else {
            button = <Button color="primary" size="sm" className="card-header-actions" onClick={() => { alert("로그인을 하고 이용해 주세요") }} >등록</Button>;
        }
        console.log(post);
        console.log(this.state.commentContents);
        console.log(this.state.writer_id);
        return (
            <div>
                <p>
                <ButtonToolbar className="justify-content-between">
                <Button color="secondary" href="http://localhost:3000/#/community/Free">Back</Button>
                <ButtonGroup className="card-header-actions">
                <Button color="secondary">Delete</Button>
                &nbsp;
                <Button color="secondary">Edit</Button>
                </ButtonGroup>
                </ButtonToolbar>
                </p>
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
                                        <Col xs="12" md="8">
                                            <InputGroup>
                                                <Input type="textarea" name="commentContents" id="textarea-input" value={this.state.commentContents} onChange={this.handleChange} size="16" placeholder="내용..." />
                                                &nbsp;
                                            <InputGroupAddon addonType="append">
                                                    {button}
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            </div>
        )
    }
}

export default FreeBBS;
