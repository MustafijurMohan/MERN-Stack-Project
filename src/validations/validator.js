const { z } = require('zod')
// Creating an object schema

const loginSchema = z.object({
    email: z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'Invalid email address'})
    .min(3, {message: 'Email must be at least of 3 characters'})
    .max(255, {message: 'Email must not be more than 255 characters'}),

    password: z
    .string({required_error: 'Password is required'})
    .min(5, {message: 'Password must be at least of 5 characters'})
    .max(25, {message: 'Password must not be more than 25 characters'}),
})

const signupSchema = loginSchema.extend({
    username: z
    .string({required_error: 'Name is required'})
    .trim()
    .min(3, {message: 'Name must be at least of 3 characters'})
    .max(255, {message: 'Name must not be more than 255 characters'}),
    
    phone: z
    .string({required_error: 'Phone is required'})
    .trim()
    .min(11, {message: 'Phone must be at least of 11 characters'})
    .max(25, {message: 'Phone must not be more than 25 characters'}),
    
})


module.exports = {signupSchema, loginSchema}


