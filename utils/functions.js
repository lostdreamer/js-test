function pluralize(singular, amount, plural) {
    if(!plural) plural = singular + 's';
    return amount === 1 ? singular : plural;
}


export {pluralize};