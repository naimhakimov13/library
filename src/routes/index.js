import { Router } from 'express'
import categoryRoutes from './category-routes.js'
import bookRoutes from './book.routes.js'
import fileRoutes from './file.routes.js'
import authRoutes from './auth-routes.js'
import userRoutes from './user-routes.js'
import BorrowingRoutes from './borrow.routes.js'
import ReturnRoutes from './return.routes.js'

const router = Router()

router.use('/categories', categoryRoutes)
router.use('/books', bookRoutes)
router.use('/file', fileRoutes)
router.use('/', authRoutes)
router.use('/users', userRoutes)
router.use('/borrows', BorrowingRoutes)
router.use('/returns', ReturnRoutes)

export default router
