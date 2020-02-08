export function isLoggedIn() {
    return sessionStorage.getItem("loggedInState") !== null && sessionStorage.getItem("loggedInState") !== "undefined";
}

