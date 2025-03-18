document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu");
    const optionBar = document.querySelector(".option-bar");
    const inboxContainer = document.querySelector(".inbox-container");
    const chatBox = document.querySelector(".chat-box");
    const chatBoard = document.querySelector(".chat-board");
    const exitArrow = document.querySelector(".exit-arrow");
    document.querySelector(".chat-header").style.display = "none";

    // Sample chat data
    const chats = [
        {
            id: 1,
            user: "Bewnet",
            messages: [
                { sender: "Bewnet", text: "Hey, how's it going?", time: "10:30 AM" },
                { sender: "You", text: "I'm good! How about you?", time: "10:31 AM" },
                { sender: "Bewnet", text: "I'm doing great. Just working on a project.", time: "10:35 AM" }
                ,{ sender: "Bewnet", text: "Hey, how's it going?", time: "10:30 AM" },
                    { sender: "You", text: "I'm good! How about you?", time: "10:31 AM" },
                    { sender: "Bewnet", text: "I'm doing great. Just working on a project.", time: "10:35 AM" }
            ,{ sender: "Bewnet", text: "Hey, how's it going?", time: "10:30 AM" },
            { sender: "You", text: "I'm good! How about you?", time: "10:31 AM" },
            { sender: "Bewnet", text: "I'm doing great. Just working on a project.", time: "10:35 AM" }
            ,{ sender: "Bewnet", text: "Hey, how's it going?", time: "10:30 AM" },
            { sender: "You", text: "I'm good! How about you?", time: "10:31 AM" },
            { sender: "Bewnet", text: "I'm doing great. does it work.", time: "10:35 AM" }
        
            ]
        },
        {
            id: 2,
            user: "John Doe",
            messages: [
                { sender: "John Doe", text: "Hello!", time: "9:00 AM" },
                { sender: "You", text: "Hey, what's up?", time: "9:05 AM" }
            ]
        }
    ];

    // Display default message when no chat is selected
    chatBoard.innerHTML = '<p class="no-chat">Select a chat to start messaging</p>';

    // Toggle option bar
    menuIcon.addEventListener("click", function () {
        optionBar.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!menuIcon.contains(e.target) && !optionBar.contains(e.target)) {
            optionBar.classList.remove("active");
        }
    });

    // Load chat list dynamically
    function loadChatList() {
        inboxContainer.innerHTML = "";
        chats.forEach(chat => {
            const chatItem = document.createElement("div");
            chatItem.classList.add("inbox-list");
            chatItem.innerHTML = `
                <img src="./image/profile.jpg" alt="Profile" class="profile-pic" />
                <div class="user-info">
                    <div class="top-row">
                        <span class="username">${chat.user}</span>
                        <span class="last-time">${chat.messages[chat.messages.length - 1].time}</span>
                    </div>
                    <div class="bottom-row">
                        <span class="last-message">${chat.messages[chat.messages.length - 1].text}</span>
                    </div>
                </div>
            `;
            chatItem.classList.add("active")

            chatItem.addEventListener("click", () =>{ 
                document.querySelector(".chat-header").style.display = "flex";
                loadChat(chat);
            });
            inboxContainer.appendChild(chatItem);
        });
    }

    // Load chat messages
    function loadChat(chat) {
        const name = document.getElementById("name");
        name.textContent = chat.user;
        chatBoard.innerHTML = "";
        chat.messages.forEach(msg => {
            const msgDiv = document.createElement("div");
            msgDiv.classList.add("message", msg.sender === "You" ? "sent" : "received");
            msgDiv.innerHTML = `<p>${msg.text}</p><span class="timestamp">${msg.time}</span>`;
            chatBoard.appendChild(msgDiv);
        });
        chatBox.classList.add("active");
    }

    // Exit chat view
    exitArrow.addEventListener("click", () => {

        document.querySelector(".chat-header").style.display = "none";
        chatBoard.innerHTML = '<p class="no-chat">Select a chat to start messaging</p>';
        chatBox.classList.remove("active");
    });

    // Initialize chat list
    loadChatList();
});
