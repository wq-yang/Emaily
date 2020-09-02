module.exports = (req, res, next) => { // next: call when current middleware is complete
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }
    next();
}