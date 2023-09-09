const jwt = require("../utils/jwt");

const isUser = async(req, res, next) => {
    const token = req.headers.authorization;

    if(!token)
        return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, (error, data) => {
        if(error) res.status(401).json({message: "Unauthorized"});
            
        req.idUser = data.id;
        next();
    });
};


module.exports = isUser;