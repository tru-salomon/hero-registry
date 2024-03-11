const checkAlias = (req, res, next) => {
    if (req.body.alias) {
        return next();
    } else {
        res.status(400).json({ error: "alias is required" });
    }
}

const checkLastname = (req, res, next) => {
    if (req.body.lastname) {
        return next();
    } else {
        res.status(400).json({ error: "lastname is required" });
    }
}

const checkDob = (req, res, next) => {
    if (req.body.dob) {
        return next();
    } else {
        res.status(400).json({ error: "dob is required" });
    }
}

const checkAdult = (req, res, next) => {
    const { adult } = req.body;

    if (adult == "true" ||
        adult == "false" ||
        adult == undefined ||
        typeof adult == 'boolean'
    ) {
        next();
    } else {
        res.status(400).json({ error: "adult must be a boolean" });
    }
}

module.exports = { checkAlias, checkLastname, checkDob, checkAdult };