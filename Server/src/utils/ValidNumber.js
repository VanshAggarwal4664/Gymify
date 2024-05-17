const ValidNumber = (number) => {
    const numberRegex= /^\d{10}$/;
    return numberRegex.test(number)
}

export {ValidNumber}