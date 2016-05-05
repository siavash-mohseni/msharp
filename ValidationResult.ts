namespace MSharp {
    export class ValidationResult {
        errors: Array<ResultError> = [];
        add(errorMessage, propertyName?) {
            this.errors.push(new ResultError(errorMessage, propertyName));
        }
        any(): boolean {
            return this.errors.length > 0;
        }
    }

    export class ResultError {
        constructor(public message: string, public propertyName?: string) {
        }
    }
}
