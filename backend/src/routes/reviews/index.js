import { Router } from 'express'
import csrf from 'csurf'
import reviewControl from './review.controller'

const router = Router()
const csrfProtection = csrf({ cookie: true })

router.post('/', reviewControl.create)

// 특정 유저가 작성한 댓글
router.get('/user/:userId', reviewControl.readUserReview)

router.put('/:reviewId', reviewControl.update)

router.delete('/:reviewId', reviewControl.delete)

export default router
