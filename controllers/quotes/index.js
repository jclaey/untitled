import newQuotePage from '../../views/quotes/index.js'

export const getNewQuote = (req, res, next) => {
    res.send(newQuotePage())
}