const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];
let players = [
    { name: "P1", balance: 1000, bet: null },
    { name: "P2", balance: 1000, bet: null },
    { name: "P3", balance: 1000, bet: null },
    { name: "P4", balance: 1000, bet: null }
];

function populateColorOptions() {
    players.forEach((player, index) => {
        let select = document.getElementById(`betP${index + 1}`);
        select.innerHTML = ""; // Clear previous options
        colors.forEach(color => {
            let option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            select.appendChild(option);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateColorOptions();
    updateBalanceDisplay();
});

function placeBets() {
    players.forEach((player, index) => {
        let select = document.getElementById(`betP${index + 1}`);
        player.bet = select.value;
        player.balance -= 100;
    });
    updateBalanceDisplay();
    spinWheel();
}

function spinWheel() {
    let wheel = document.querySelector(".wheel");
    let spinDegrees = 3600 + Math.floor(Math.random() * 360);
    wheel.style.transition = "none"; // Reset transition for smooth effect
    wheel.style.transform = `rotateX(0deg) rotateY(0deg) rotate(${0}deg)`;
    
    setTimeout(() => {
        wheel.style.transition = "transform 4s ease-out";
        wheel.style.transform = `rotateX(10deg) rotateY(5deg) rotate(${spinDegrees}deg)`;
        document.getElementById("spinSound").play();
    }, 50);
    
    setTimeout(() => {
        let winningIndex = Math.floor((spinDegrees % 360) / 45);
        let winningColor = colors[winningIndex];
        document.getElementById("winning-color").textContent = `Winning Color: ${winningColor}`;
        showWinningCard(winningColor);
        distributeWinnings(winningColor);
    }, 4000);
}

function showWinningCard(color) {
    let card = document.createElement("div");
    card.classList.add("winning-card");
    card.style.backgroundColor = color;
    card.textContent = `Winner: ${color.toUpperCase()}`;
    document.body.appendChild(card);
    
    setTimeout(() => {
        card.style.opacity = "0";
        setTimeout(() => card.remove(), 1000);
    }, 3000);
}

function distributeWinnings(winningColor) {
    let totalBetAmount = 400;
    let winners = players.filter(player => player.bet === winningColor);
    let winningAmount = winners.length > 0 ? totalBetAmount / winners.length : 0;
    
    players.forEach(player => {
        if (player.bet === winningColor) {
            player.balance += winningAmount;
        }
    });
    
    updateBalanceDisplay();
    updateLeaderboard();
    document.getElementById("winSound").play();
}

function updateBalanceDisplay() {
    let balanceText = players.map(player => `${player.name}: $${player.balance}`).join(" | ");
    document.getElementById("balance").textContent = balanceText;
}

function updateLeaderboard() {
    let leaderboard = document.getElementById("leaderboard-list");
    leaderboard.innerHTML = "";
    players.sort((a, b) => b.balance - a.balance);
    players.forEach(player => {
        let listItem = document.createElement("li");
        listItem.textContent = `${player.name}: $${player.balance}`;
        leaderboard.appendChild(listItem);
    });
}
