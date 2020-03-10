import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, ButtonToolbar, ButtonGroup } from 'reactstrap';
import axios from "axios";
import { getLoggedInAccount, isLoggedIn } from '../../../modules/auth';

function Split(props) {
    const post = props.post
    const createDate = (createdate) => {
        let koreaDate = new Date(createdate);
        return koreaDate.getFullYear() + "." + (koreaDate.getMonth() + 1) + "." + koreaDate.getDate() + ".  " + koreaDate.getHours() + ":" + koreaDate.getMinutes();
    }
    return createDate(post.write_date)
}

function PostComment(props) {
    const comment = props.comment
    const comment_id = comment.writer_id
    const writeDate = (date) => {
        let koreaDate = new Date(date);
        return koreaDate.getFullYear() + "." + (koreaDate.getMonth() + 1) + "." + koreaDate.getDate() + ".  " + koreaDate.getHours() + ":" + koreaDate.getMinutes();
    }
    let button = null;

    if (getLoggedInAccount() === comment_id)
        button = <Button size="sm" color="white" className="icon mr-1 mb-1"><i className="fa fa-remove" ></i></Button>
    return (
        // 일단 그냥 로드만 하게 해둠
        <div>
            <div>
                <b>{comment.writer_id}&nbsp;</b>
                ({writeDate(comment.write_date)})&nbsp;
            {button}
            </div>
            <div>
                {comment.contents}
            </div>
        </div>
    )
}

class FreeBBS extends Component {
    state = {
        loggedInAccount: '',
        bbsContents: '', // 현재 게시물
        commentContents: '', // 현재 게시물의 댓글들
        writeComment: '' // 작성할 댓글 내용
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            writeComment: '',
        })
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ loggedInAccount: getLoggedInAccount() })
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
                this.setState({ bbsContents: data.bbsContents, commentContents: data.commentContents });
            }
        }).catch(error => {
            console.log('failed', error)
        })
    }
    write = async () => {
        axios.post("http://localhost:3001/community/write_comment", {
            writer_id: this.state.loggedInAccount,
            contents: this.state.writeComment,
            body_id: this.props.match.params.id
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
    deletePost = async () => {
        axios.post("http://localhost:3001/community/delete_post", {
            id: this.props.match.params.id,
        })
            .then(res => {
                let data = res.data;
                console.log(data);
                if (data.error) {
                    switch (data.errorCode) {
                        case 1:
                            alert("게시글 id를 입력하세요.")
                            window.location.reload();
                            return;
                        default:
                            alert("잘못된 접근입니다.")
                            window.location.reload();
                            return
                    }
                } else {   
                        alert("삭제가 완료되었습니다.")
                        window.location.href="http://localhost:3000/#/community/Free"
                }
            }).catch(error => {
                console.log('failed', error)
            })
    }

    deleteComment = async () => {
        axios.post("http://localhost:3001/community/delete_comment", {
            id: this.props.match.params.id,
        })
            .then(res => {
                let data = res.data;
                console.log(data);
                if (data.error) {
                    switch (data.errorCode) {
                        case 1:
                            alert("게시글 id를 입력하세요.")
                            window.location.reload();
                            return;
                        default:
                            alert("잘못된 접근입니다.")
                            window.location.reload();
                            return
                    }
                } else {   
                        alert("삭제가 완료되었습니다.")
                        window.location.reload();
                }
            }).catch(error => {
                console.log('failed', error)
            })
    }
    getComments() {
        let comments = this.state.commentContents;

        return (
            (comments.map((comment, index) =>
                <PostComment key={index} comment={comment} />
            ))
        );
    }

    getCounts() {
        console.log(this.state.bbsContents)
        return (
            <div><strong>댓글 {this.state.commentContents.length}&nbsp;|&nbsp;조회수 {this.state.bbsContents.views}&nbsp;</strong></div>
        );
    }

    render() {
        console.log(this.state);
        console.log(this.state.bbsContents.writer_id);
        const post = this.state.bbsContents;
        let button = null;
        if (isLoggedIn()) {
            button = <Button color="primary" size="sm" className="card-header-actions" onClick={this.write}>등록</Button>
        }
        else {
            button = <Button color="primary" size="sm" className="card-header-actions" onClick={() => { alert("로그인을 하고 이용해 주세요") }} >등록</Button>;
        }

        let comments = null;
        let counts = null;
        if (post) {
            comments = this.getComments();
            counts = this.getCounts();
        }

        let del = null;
        if (getLoggedInAccount() === this.state.bbsContents.writer_id) {
            del = <Button color="secondary" onClick={() =>{if (window.confirm("삭제하시겠습니까?")) this.deletePost()}}>Delete</Button>;
        }
        else {
            del = <Button color="secondary" onClick={() =>alert("작성자만 삭제할 수 있습니다.")}>Delete</Button>;
        }
        return (
            <div>
                <ButtonToolbar className="justify-content-between">
                    <Button color="secondary" href="http://localhost:3000/#/community/Free">Back</Button>
                    <ButtonGroup className="card-header-actions">
                    {del}&nbsp;
                <Button color="secondary">Edit</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <br/>
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
                                                {counts}
                                            </Col>
                                        </FormGroup>
                                        <hr className="my-2" />
                                        {comments}
                                        <br />
                                        <FormGroup row>
                                            <Col xs="12" md="8">
                                                <InputGroup>
                                                    <Input type="textarea" name="writeComment" id="textarea-input" value={this.state.writeComment} onChange={this.handleChange} size="16" placeholder="내용..." />
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
