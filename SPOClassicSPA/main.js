//import * as Msal from "msal";
// if using cdn version, 'Msal' will be available in the global scope

const msalConfig = {
    auth: {
        clientId: 'b7467203-5592-44d4-ad87-5285c7a46753',
        authority: "https://login.microsoftonline.com/8a5ee357-7de0-4836-ab20-9173b12cdce9",
        redirectUri: "https://127.0.0.1:5500/index.html",
    }
};

const msalInstance = new Msal.UserAgentApplication(msalConfig);

msalInstance.handleRedirectCallback((error, response) => {
    // handle redirect response or error
});

var loginRequest = {
    scopes: ["user.read", "mail.send"] // optional Array<string>
};


function onLoginHandler() {
    //alert("hello");
    msalInstance.loginPopup(loginRequest)
        .then(response => {
            // handle response
            let divLoginInfo = document.getElementById("loginInfo");
            if (divLoginInfo) {
                divLoginInfo.innerHTML = `Welcome ${response.account.userName}`
            }
            console.log(response);
        })
        .catch(err => {
            // handle error
            console.log(err);
        });

}
function onTestHandler() {
    if (msalInstance.getAccount()) {
        var tokenRequest = {
            scopes: ["user.read", "mail.send"]
        };
        msalInstance.acquireTokenSilent(tokenRequest)
            .then(response => {
                // get access token from response
                // response.accessToken
                console.log(response);
                this.callAPI(response.accessToken);
            })
            .catch(err => {
                // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                if (err.name === "InteractionRequiredAuthError") {
                    return msalInstance.acquireTokenPopup(tokenRequest)
                        .then(response => {
                            // get access token from response
                            // response.accessToken
                            this.callAPI(response.accessToken);
                        })
                        .catch(err => {
                            // handle error
                            console.log(err);
                        });
                }
            });
    } else {
        // user is not logged in, you will need to log them in to acquire a token
    }
}
function callAPI(token) {
    var headers = new Headers();
    var bearer = "Bearer " + token;
    headers.append("Authorization", bearer);
    var options = {
        method: "GET",
        headers: headers
    };
    var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

    fetch(graphEndpoint, options)
        .then(resp => {
            return resp.json();
        }).then(result => {
            console.log(result);
            let divResult = document.getElementById("result");
            if (divResult) {
                divResult.innerText = JSON.stringify(result, null, 4)
            }

        });
}