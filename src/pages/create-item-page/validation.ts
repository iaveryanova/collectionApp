
export const fieldIntegerValidation = {
    validate: (value: string) => {
        if(value.toString().match(/^\d+$/)) {
            return true;
        }
        return 'Field must contain only numbers.'
    }
};

export const fieldStringValidation = {
    validate: (value: string) => {
        if(value.toString().length > 255) {
            return 'Field must contain less then 256 characters.'
        }
        return true;
    }
};