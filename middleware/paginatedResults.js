const { base } = require("../static/models/admin");

paginatedResults = (model, limit, newest, filter) => {
    return async (req, res, next) => {
        let page;
        if (req.query.page)
            page = parseInt(req.query.page);
        else page = 1;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginationInfo = {};

        let allModels;

        if (filter != undefined) {
            allModels = await model.countDocuments({ "section": filter }).exec();
        } else {
            allModels = await model.countDocuments().exec();
        }


        if (endIndex < allModels - newest) {
            paginationInfo.next = {
                page: page + 1,
            }
        }

        if (startIndex > 0) {
            paginationInfo.previous = {
                page: page - 1,
            }
        }

        let tabOfNumbers = [];

        let baseNumber = page - 3;
        if (baseNumber * limit > 0 && (baseNumber + 1) * limit != limit * 2)
            paginationInfo.less = true;

        do {
            baseNumber++;

            if (baseNumber * limit > 0) {
                if (tabOfNumbers.length == 4) {
                    if ((baseNumber - 1) * limit < (allModels - newest))
                        paginationInfo.more = true;
                    break;
                }
                tabOfNumbers.push(baseNumber);
            }

        } while (baseNumber * limit < (allModels - newest))

        if (!tabOfNumbers.find((elem) => elem == 1))
            paginationInfo.first = true;

        paginationInfo.tabOfNumbers = tabOfNumbers;

        paginationInfo.page = page;

        if (filter != undefined) {
            results = await model.find({ "section": filter }).sort({ _id: -1 }).limit(limit).skip(startIndex + newest).exec();
        } else {
            results = await model.find().sort({ _id: -1 }).limit(limit).skip(startIndex + newest).exec();
        }


        res.paginatedModels = results;
        res.paginationInfo = paginationInfo;

        next();
    }
}

module.exports = { paginatedResults };
