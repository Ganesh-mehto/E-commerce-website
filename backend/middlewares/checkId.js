import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
         res.status(400)
         throw new Error(`Invalid ID format: ${id}`);
    }
    next();
}

export default checkId;