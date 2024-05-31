const express = require('express')

const {
    getTaskTmps, getTaskTmp, getOnlyOwnerTaskTmp, createTmp, updateTmp, deleteTmp
} = require('../controller/taskTmpController')

const router = express.Router()

router.get('/', getTaskTmps)
router.get('/:id', getTaskTmp)
router.post('/email', getOnlyOwnerTaskTmp)
router.post('/', createTmp)
router.delete('/:id', deleteTmp)
router.patch('/:id', updateTmp)

module.exports = router