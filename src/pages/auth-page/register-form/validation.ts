const REQUIRED_FIELD = 'Required to fill';

export const loginValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/[а-яА-Я]/)) {
            return 'Login cannot contain Russian letters'
        }

        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {

// (?=.*[0-9]) - строка содержит хотя бы одно число;
// (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 вышеупомянутых символов.

        if (!value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g)) {
            return 'Password is not secure';
        }
        return true;
    }
};




export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (!value.match(/\S+@\S+\.\S+/)) {
            return 'Email is invalid'; 
        }
        if (value.length > 256) {
            return 'Email must contain less then 256 characters'
        }
        return true;
    }
};



