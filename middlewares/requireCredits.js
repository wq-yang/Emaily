module.exports = (req, res, next) => { // next: call when current middleware is complete
    if (req.user.credits < 0) {
        return res.status(403).send({ error: 'You don\'t have enough credits!' });
    }

    next();
}