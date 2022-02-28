import APP_URL from "./urls";


/**
 * This function is used to send an api call to the user registration uri.
 */
export const userRegistration = async (userDetails) => {
    const rawResponse = await fetch(APP_URL.USER_REGISTER, {
        body: JSON.stringify(userDetails),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return rawResponse;
}

/**
 * This function is used to send an api call to the user login uri.
 */
export const userLogin = async (userDetails) => {
    const rawResponse = await fetch(APP_URL.USER_LOGIN, {
        body: JSON.stringify(userDetails),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + userDetails
        }
    });

    return rawResponse;
}

/**
 * This function is used to send a post api call to the url.
 */
export const postRequest = async (url = "", data = "") => {
    const rawResponse = await fetch(url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("access-token")
        }
    });

    return rawResponse;
}

/**
 * This function is used to send a get api call to the url.
 */
export const getRequest = async (url = "") => {
    const rawResponse = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("access-token")
        }
    });

    return rawResponse;
}
