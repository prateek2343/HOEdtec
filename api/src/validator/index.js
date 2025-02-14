/**
 * Validation middleware functions
 */

const { check, body, validationResult } = require('express-validator')

module.exports = {
    failIfLimitAndOffsetAreInvalid: [
        check('limit')
            .trim()
            .optional()
            .isInt({ min: 1, max: 50 })
            .withMessage('limit: invalid value'),
        check('offset')
            .trim()
            .optional()
            .isInt({ min: 0 })
            .withMessage('offset: invalid value')
    ],
    failIfSyncBillerBodyInvalid: [
        body("categoryName").trim().notEmpty().withMessage('Category Name is a required field'),
    ],
    failIfAddRoleInvalid: [
        body('name')
            .exists().withMessage('Name must be provided'),
        body("weight")
            .exists().withMessage('Weight must be provided')
            .custom(value => value > 0).withMessage('Weight must be greater than 0')
    ],
    validate: (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []

        errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
        const Response = { message: 'Bad Request', error: extractedErrors }

        /* Send Back An HTTP Response */
        res.status(400)['json'](Response)
        res.end()
    }
}
