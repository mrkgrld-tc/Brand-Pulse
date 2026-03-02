module.exports = {
    authUser : (req, res) => {
        console.log(req.body.data);
        res.json({
            success : 'true'
        })
    },

    signup : (req, res) => {
        res.json({
            success : 'true'
        })
    },
}