const URL = "http://localhost:8080/exam/";
function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json()})
    }
    return res.json();
}

class ApiFacade {
    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }

    logout = () => {
        localStorage.removeItem("jwtToken");
    }

    login = (user, pass) => {
        const options = this.makeOptions("POST", true, {username: user, password: pass});
        const promise = fetch(URL + "api/login", options) 
            .then(handleHttpErrors);
        
        promise.then(res => this.setToken(res.token));
        return promise;
    }

    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    simpleMovie = (title) => {
        const promise = fetch(URL + "api/movies/movie-info-simple/" + title)
            .then(handleHttpErrors);
        return promise;
    }

    movieAll = (title) => {
        const options = this.makeOptions("GET", true);
        const promise = fetch(URL + "api/movies/movie-info-all/" + title, options)
            .then(handleHttpErrors);
        return promise;
    }
}

const facade = new ApiFacade();
export default facade;