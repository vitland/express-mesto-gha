const router = require('express').Router()
const {getUsers, getUser, getCurrentUser, updateUserInfo, updateUserAvatar} = require('../controllers/users')

router.get('/', getUsers)
router.get('/me', getCurrentUser)
router.patch('/me', updateUserInfo)
router.patch('/me/avatar', updateUserAvatar)
router.get('/:id', getUser)
module.exports = router