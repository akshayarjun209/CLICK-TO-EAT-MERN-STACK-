import { body } from 'express-validator';

const userValidationData= [

    body('name').notEmpty().withMessage('please enter valid name'),
    body('email').isEmail().withMessage('please enter valid email'),
    body('password').isLength({min:6}).withMessage('please enter valid password'),
    body('location').notEmpty().withMessage('please enter valid location'),
];


const loginValidationData= [

  
    body('email').isEmail().withMessage('please enter valid email'),
    body('password').isLength({min:6}).withMessage('please enter valid password')
   
];

export {userValidationData,loginValidationData};
