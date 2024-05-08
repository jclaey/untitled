import indexPage from "../../views/docs/index.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}