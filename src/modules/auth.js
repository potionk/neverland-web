export function isLoggedIn() {
    return sessionStorage.getItem("loggedInState") !== null && sessionStorage.getItem("loggedInState") !== "undefined";
}

export function login(account, loggedInState) {
    sessionStorage.setItem("account", account)
    sessionStorage.setItem("loggedInState", loggedInState)
}