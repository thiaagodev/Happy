import { ErrorRequestHandler } from 'express';
import { ValidationError }  from 'yup';

interface ValidationErrors {
    [ket: string]: string[];
}

const errorHandle: ErrorRequestHandler = (error, request, response, next) => {
    if(error instanceof ValidationError) {
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return response.status(400).json({ massage: 'Validation fails', errors })
    }
    console.error(error);

    return response.status(500).json({message: 'Internal server error'})
};

export default errorHandle;