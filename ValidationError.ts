namespace MSharp {
    export class ValidationError extends Error {
        constructor(public issues?: ValidationResult, message?: string) {
            super(message);
        }
    }
}