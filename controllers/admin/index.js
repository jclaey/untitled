import indexPage from "../../views/admin/index.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}