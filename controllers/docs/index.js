import indexPage from "../../views/docs/index.js"
import newDocPage from "../../views/docs/new.js"

export const getIndex = (req, res, next) => {
    res.send(indexPage())
}

export const getNew = (req, res, next) => {
    res.send(newDocPage())
}