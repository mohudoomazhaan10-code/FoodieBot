const API_URL =
    "https://hd4vj2xs60.execute-api.us-east-1.amazonaws.com/chat";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


function addMessage(message, sender) {

    const messageDiv =
        document.createElement("div");

    messageDiv.className =
        "message " + sender;


    const bubble =
        document.createElement("div");

    bubble.className = "bubble";

    bubble.innerHTML = message;


    messageDiv.appendChild(bubble);

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop =
        chatBox.scrollHeight;
}


async function sendMessage() {

    const message =
        userInput.value.trim();


    if (message === "") {
        return;
    }


    // Show user message
    addMessage(
        message,
        "user"
    );


    userInput.value = "";


    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    command: message,

                    userId: "demo-user"

                })

            });


        const data =
            await response.json();


        console.log(
            "AWS Response:",
            data
        );


        let result = data;


        if (data.body) {

            result =
                JSON.parse(data.body);

        }


        // Display bot response
        if (result.message) {

            addMessage(
                result.message,
                "bot"
            );

        }

    }

    catch (error) {

        console.error(
            "Error:",
            error
        );


        addMessage(
            "❌ Unable to connect to the food service.",
            "bot"
        );

    }

}


sendButton.addEventListener(
    "click",
    sendMessage
);


userInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);