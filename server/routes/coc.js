var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/get_clan_info', async (req, res, next) => {
    console.log("hi")
    const id = req.body.id; // 게시물 id
    var headers = {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImU4N2E2ODllLWM1OGMtNDcwNi1iOTlhLTFlYzUzMDY5OTM3MSIsImlhdCI6MTYxNTgwMjQ3Niwic3ViIjoiZGV2ZWxvcGVyL2M0MWNmYzkyLTNmMzktYThiMC0xM2UxLTkwMmRjNjE4NWRkNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE2OC4xODguMjM1LjE0Il0sInR5cGUiOiJjbGllbnQifV19.3AncKtADla1dPzKrBZ7zRxtMDCmIejoVLgAz8a9SJyzuK_ScpnARMAkZfRalWL-9VCfqr9gYXDA2csMZi3qEZg',
        'Accept': "*/*"
    }
    var options = {
        url : 'https://api.clashofclans.com/v1/clans/'+id,
        method:'GET',
        headers: headers,
        json:true
    };
    try {
        request(options, function (error, response, body) {
            if (error) console.log("에러에러(wise 점검 및 인터넷 연결 안됨)");
            if (!error && response.statusCode === 200) {
                res.send({response});
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;