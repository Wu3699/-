var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.get('/getbid',(req,res)=>{
    var sql='SELECT * FROM `bid`'; 
    conn.query(sql,function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result)
            jsonWrite(res, result);   
        }
    })
    
});

router.get('/toudi',(req,res)=>{
    var id=req.query.id
    console.log(id)
    var sql="INSERT INTO bid (title,details) SELECT title,details FROM tender WHERE id=?"
    conn.query(sql,[id],function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result)
            jsonWrite(res, result);   
        }
    })
})

router.get('/deleteBid',(request,response)=>{
    var sql='DELETE FROM `bid` WHERE id=?';
    var id=request.query.id;
    conn.query(sql,[id],function(err,result){
        if (err) {
            jsonWrite(response, "删除失败");
        }
        if (result) {
            jsonWrite(response, "删除成功");
        }
    })
});

module.exports = router;