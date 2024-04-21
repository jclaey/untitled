import indexPage from "../views/index.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}