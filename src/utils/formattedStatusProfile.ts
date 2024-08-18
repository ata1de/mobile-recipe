  //FUNCTIONS
function capitalize(text: string) {
    return text.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

function maskPassword(password: string) {
    return '*'.repeat(password.length);
}

export const FormattedProfile = { capitalize, maskPassword };