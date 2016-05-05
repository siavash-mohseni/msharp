namespace MSharp {
    export class ResultError {
        constructor(public message: string, public propertyName?: string) {
        }
        toString(): string {
            return this.message;
        }
    }
    export class ValidationResult {
        errors: Array<ResultError> = [];
        add(errorMessage, propertyName?) {
            this.errors.push(new ResultError(errorMessage, propertyName));
        }
        any(): boolean {
            return this.errors.length > 0;
        }
        toString(): string {
            return this.errors.join('\r\n');
        }
    }

    export class ValidationError extends Error {
        constructor(public validation?: ValidationResult) {
            super(validation.toString());
        }
    }
}