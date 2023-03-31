const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => { res.json({ message: 'Welcome to my API' }) })

module.exports = router;