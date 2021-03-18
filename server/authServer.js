const jwt = require('jsonwebtoken');

function signJwt(user_id) {
    return ({sub: user_id}, process.env.SECRET);
}

function verifyJwt(req, res, next) {
    const authorization = req.header('authorization');
    const token = authorization ? authorization.split(' ')[1] : undefined;
    if(!token) {
        return res.send(401, "Unauthorized");
    }
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if (err) return res.sendStatus(403);
        if( !payload.sub) {
            return res.send(401, "Unauthorized");
        }
        return next();
    })
}

module.exports = {signJwt, verifyJwt};