
/**
 * This function compares the response status with 401 or 403 http error codes.
 * Returns true if comparison successful and false otherwise
 */
export const unauthorizedOrForbidden = (rawResponse) => {
    if(rawResponse.status === 401 || rawResponse.status === 403) {
        return true;
    }

    return false;
}

/**
 * This function compares the response status with 422 http error code.
 * Returns true if comparison successful and false otherwise
 */
export const unprocessableEntity = (rawResponse) => {
    if(rawResponse.status === 422) {
        return true;
    }

    return false;
}

/**
 * This function compares the response status with 400 http error code.
 * Returns true if comparison successful and false otherwise
 */
export const badRequest = (rawResponse) => {
    if(rawResponse.status === 400) {
        return true;
    }

    return false;
}

/**
 * This function compares the response status with 500 http error code.
 * Returns true if comparison successful and false otherwise
 */
export const internalServerError = (rawResponse) => {
    if(rawResponse.status === 500) {
        return true;
    }

    return false;
}

/**
 * This function compares the response status with 200 http error code.
 * Returns true if comparison successful and false otherwise
 */
export const ok = (rawResponse) => {
    if(rawResponse.status === 200) {
        return true;
    }

    return false;
}