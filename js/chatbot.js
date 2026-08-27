const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    userInput.value = "";

    setTimeout(() => {
        addMessage(botReply(text), "bot");
    }, 500);
}

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botReply(input) {
    input = input.toLowerCase();
    if (input.includes("produk")) {
        return "Kami menyediakan berbagai produk berbagai jenis telur dari peternak yang menerapkan IoT dan Big Data dalam perkembangbiakanya.";
    } else if (input.includes("harga") || input.includes("biaya")) {
        return "Harga produk kami mulai dari Rp20.000. Silakan cek katalog lengkap kami.";
    } else if (input.includes("alamat") || input.includes("lokasi")) {
        return "Toko kami berada di Palembang, tapi kami juga menerima pesanan online ke seluruh Indonesia!";
    } else if (input.includes("hai") || input.includes("helo") || input.includes("haii") || input.includes("hallo") || input.includes("halo")) {
        return "Hai, Ada yang bisa kami bantu?";
    } else {
        return "Maaf, saya belum mengerti. Bisa coba dengan kata kunci lain seperti 'produk', 'harga', atau 'alamat'.";
    }
}

userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});