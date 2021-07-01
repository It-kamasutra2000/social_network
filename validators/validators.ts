export const emailValidator = (value: string) => {
    let error;
    const maxLength = maxLengthCreator(40)
    error = maxLength(value)
    error = error || required(value) 
     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = error || 'Invalid email address';
    } 
    return error;
}

export const reqAndMaxLValCreator = (MaxLength: number) => {
    return (value: string) => {
        let error;
        const maxLength = maxLengthCreator(MaxLength)
        error = maxLength(value)
        error = error || required(value) 
        return error
    }
}

export const required = (value: string) => {
    let error;
    if(!value) {
        error = 'filed is required'
    }
    return error;
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    let error;
    if (value && value.length > maxLength) {
        error = `Max length is ${maxLength}`
    }
    return error;
}