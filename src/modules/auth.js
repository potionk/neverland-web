export function isLoggedIn() {
    return sessionStorage.getItem("loggedInState") !== null && sessionStorage.getItem("loggedInState") !== "undefined";
}

export function login(account, loggedInState) {
    sessionStorage.setItem("account", account);
    sessionStorage.setItem("loggedInState", loggedInState);
}

export function logout() {
    sessionStorage.removeItem("account");
    sessionStorage.removeItem("loggedInState");
}

export function getLoggedInAccount() {
    return sessionStorage.getItem("account");
}