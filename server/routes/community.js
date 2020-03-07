var express = require('express');
var bbsModel = require('../models').bbs;
var commentModel = require('../models').comments;
var router = express.Router();

/**
 * get_title_list : 게시글 목록을 반환
 * get_contents : 게시글 상세 내용을 반환 및 조회수 1 증가
 * write_post : 게시글 작성
 * delete_post : 게시글 삭제
 * write_comment : 댓글 작성 (원글 삭제시 댓글도 같이 삭제 됨)
 * delete_comment : 댓글 삭제
 */

/**
 * /get_title_list
 * @param class 게시판 종류
 * (free / game / information / photo / travel / event / notice / update ) 
 * @returns 에러코드 or 게시글 전체 조회
 */
router.post('/get_title_list', async (req, res, next) => {
    const _class = req.body.class;
    // 정해진 class name이 아닐때 에러
    if(!(_class=="free"||_class=="game"||_class=="information"||_class=="photo"||_class=="travel"||_class=="event"||_class=="notice"||_class=="update")){
        return res.send({ error: true, errorCode: 2 })
    }
    const bbs = await bbsModel.findAll({
     where: {class: _class},
     attributes: ['id', 'title', 'writer_id', 'write_date', 'views'],
     order: [['write_date','DESC']]
    });
    try {
        res.send({ bbs });
    } catch (error) {
        console.log(error);
        res.send({
            error:true,
            errorCode:1
        });
    }
});

/**
 * /get_contents
 * @param id 게시글 아이디 
 * @returns 에러코드 or 해당 게시글의 상세 내용들
 */
router.post('/get_contents', async (req, res, next) => {
    const id = req.body.id; // 게시물 id
    if (!id) {
      return res.send({ error: true, errorCode: 2 })
    }
  
    try {
        const bbsContents = await bbsModel.findOne(
            {
                where: {id: id},
                attributes: ['title', 'contents', 'writer_id', 'write_date', 'class', 'views'],
            }
        );
        const commentContents = await commentModel.findAll(
            {
                where: {body_id: id},
                attributes: ['contents', 'writer_id', 'write_date'],
                order: [['write_date','DESC']]
            }
        );
        let views=bbsContents.views+1;
        bbsModel.update(
            {views:views},
            {where: {id:id}}
        ).catch(err =>{
            return res.send({ error: true, errorCode: 5 })
        });
        if (!bbsContents) // 없는 게시물일 때
            return res.send({ error: true, errorCode: 3 })
        else {
            return res.send({ bbsContents, commentContents });
        }
    } catch (error) {
        console.error(error);
        res.send({ error: true, errorCode: 4 })
    }
});


/**
 * /write_post
 * @param writer_id 현재 접속중인 계정 id
 * @param title 게시물 제목
 * @param contents 게시물 내용
 * @param class 게시판 종류
 * @returns 에러코드 or 등록된 게시물 정보 반환
 */
router.post('/write_post', async (req, res, next) => {
    const writer_id = req.body.writer_id; // 게시물 id
    const title = req.body.title;
    const contents = req.body.contents;
    const _class = req.body.class;
    // if (!writer_id) { // login 하지 않은 상태
    //   return res.send({ error: true, errorCode: 1 })
    // }
    if (!title) { // 제목 미입력
      return res.send({ error: true, errorCode: 2 })
    }
    if (!contents) { // 내용 미입력
        return res.send({ error: true, errorCode: 3 })
    }
    // 올바르지 못한 게시판 종류
    if(!(_class=="free"||_class=="game"||_class=="information"||_class=="photo"||_class=="travel"||_class=="event"||_class=="notice"||_class=="update")){
        return res.send({ error: true, errorCode: 4 })
    }
    try {
        bbsModel.create({
            writer_id: writer_id,
            title: title,
            contents: contents,
            class: _class
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.send({ error: true, errorCode: 5 })
        });
    } catch (error) {
        res.send({ error: true, errorCode: 6 })
    }
});

/**
 * /delete_post
 * @param id 게시글 아이디 
 * @returns 에러코드 or 성공 알림
 */
router.post('/delete_post', async (req, res, next) => {
    const id = req.body.id; // 게시물 id
    if (!id) { // id 미입력
      return res.send({ error: true, errorCode: 1 })
    }
    try {
        bbsModel.destroy({
            where: {id: id}
        })
        .then(result => {
            res.json({ result: "success", state: result});
        })
        .catch(err => {
            res.send({ error: true, errorCode: 2 })
        });
    } catch (error) {
        res.send({ error: true, errorCode: 3 })
    }
});

/**
 * /write_comment
 * @param writer_id 현재 접속중인 계정 id
 * @param body_id 현재 읽은 게시물 id
 * @param contents 댓글 내용
 * @returns 에러코드 or 등록된 댓글 내용 반환
 */
router.post('/write_comment', async (req, res, next) => {
    const writer_id = req.body.writer_id; // 게시물 id
    const body_id = req.body.body_id;
    const contents = req.body.contents;
    // if (!writer_id) { // login 하지 않은 상태
    //   return res.send({ error: true, errorCode: 1 })
    // }
    // if (!body_id) { // 현재 읽은 게시물 미입력
    //   return res.send({ error: true, errorCode: 2 })
    // }
    if (!contents) { // 내용 미입력
        return res.send({ error: true, errorCode: 3 })
    }
    try {
        commentModel.create({
            writer_id: writer_id,
            body_id: body_id,
            contents: contents,
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.send({ error: true, errorCode: 5 })
        });
    } catch (error) {
        res.send({ error: true, errorCode: 6 })
    }
});

/**
 * /delete_comment
 * @param id 댓글 아이디 
 * @returns 에러코드 or 성공 알림
 */
router.post('/delete_comment', async (req, res, next) => {
    const id = req.body.id; // 게시물 id
    if (!id) { // id 미입력
      return res.send({ error: true, errorCode: 1 })
    }
    try {
        commentModel.destroy({
            where: {id: id}
        })
        .then(result => {
            res.json({ result: "success", state: result});
        })
        .catch(err => {
            res.send({ error: true, errorCode: 2 })
        });
    } catch (error) {
        res.send({ error: true, errorCode: 3 })
    }
});


module.exports = router;