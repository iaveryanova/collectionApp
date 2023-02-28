const REQUIRED_FIELD = 'Required to fill';

export const fieldIntegerValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.toString().match(/^\d+$/)) {
            return true;
        }
        return 'Field must contain only numbers.'
    }
};

export const fieldStringValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length > 255) {
            return 'Field must contain less then 256 characters.'
        }
        return true;
    }
};