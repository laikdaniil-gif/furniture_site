const Router = require('express')
const router = new Router()


router.post('/', (res, req) => {
    res.json({message:'It`s working!'})
})
router.get('/', (res, req) => {
    res.json({message:'It`s working!'})
})
router.get('/:id', (res, req) => {
    res.json({message:'It`s working!'})
})


module.exports = router