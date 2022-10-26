import Router from 'express';
import authController from './auth/auth.controller.js';
import userController from './users/user.controller.js';
import {body, validationResult} from 'express-validator'

const router = new Router()

//Auth
router.post('/auth/login',
    // body validation
    body('email', 'Не соответствует Email').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({min: 5}),
    (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        authController.login(req, res)
    })

router.post('/auth/registration',
    // body validation
    body('email', 'Не соответствует Email').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({min: 5}),
    (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        authController.registration(req, res)
    },
)


//Users
router.post('/users', userController.create)
router.get('/users', userController.getAll)
router.get('/user', userController.getOne)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)
router.delete('/users/all', userController.deleteAll)

export default router;
