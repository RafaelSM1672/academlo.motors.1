exports.validUser = (req, res, next) => {
    const { name } = req.body;
    if(!name){
        return res.status(400).json({
            message: "the name is required"
        });
    }
    
    next();
}