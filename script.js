const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeIcon = document.getElementsByClassName("close-icon")[0];
const thankYouPage = document.getElementById("thankYouPage");
const closeThankYouBtn = document.getElementById("closeThankYouBtn");
const openThankYouBtns = document.getElementsByClassName("Continue");
const pledge = document.getElementsByClassName("pledge");
const deleteMenu = document.getElementById("close_Menu");
const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sidemenu");
const selectReward = document.getElementsByClassName("select");
const clickRadio = document.getElementsByName("account-type");
const belowSections = document.getElementsByClassName("below");

const progressBar = document.getElementById("file");
const totalBackersElement = document.querySelector(".update div:nth-child(2) h1");
const totalMoneyElement = document.querySelector(".update div:first-child h1");

const targetAmount = 100000;

// Initialize state from localStorage or set default values
let totalBackers = localStorage.getItem('totalBackers') || 5007;
let totalMoney = localStorage.getItem('totalMoney') || 89914;

function updateDisplay() {
  totalBackersElement.textContent = totalBackers;
  totalMoneyElement.textContent = `$${Number(totalMoney).toLocaleString()}`;
  const progress = (totalMoney / targetAmount) * 100;
  progressBar.value = progress;
}

openModal.onclick = function () {
  modal.style.display = "block";
  document.body.classList.add("fixed");
};

closeIcon.onclick = function () {
  modal.style.display = "none";
  document.body.classList.remove("fixed");
};

for (let button of openThankYouBtns) {
  button.addEventListener("click", (e) => {
    const pledgeAmount = parseInt(e.target.getAttribute('data-pledge'), 10);
    totalMoney = Number(totalMoney) + pledgeAmount;
    totalBackers++;

    // Update localStorage
    localStorage.setItem('totalBackers', totalBackers);
    localStorage.setItem('totalMoney', totalMoney);

    // Update display
    updateDisplay();

    modal.style.display = "none";
    thankYouPage.style.display = "block";
  });
}

closeThankYouBtn.onclick = function () {
  thankYouPage.style.display = "none";
  document.body.classList.remove("fixed");
};

menuToggle.addEventListener('click', () => {
  menuToggle.style.display = 'none';
  deleteMenu.style.display = 'block';
  sideMenu.style.display = 'block';
});

deleteMenu.addEventListener('click', () => {
  deleteMenu.style.display = 'none';
  menuToggle.style.display = 'block';
  sideMenu.style.display = 'none';
});

for (let button of selectReward) {
  button.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.classList.add("fixed");
  });
}

for (let i = 0; i < clickRadio.length; i++) {
  clickRadio[i].addEventListener("change", () => {
    for (let j = 0; j < belowSections.length; j++) {
      belowSections[j].style.display = "none";
    }

    if (clickRadio[i].checked) {
      belowSections[i].style.display = "block";
    }
  });
}

function updateCountdown() {
  const today = new Date();
  const targetDate = new Date(today.getFullYear(), 5, 30);
  const difference = targetDate - today;
  const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
  document.getElementById('daysLeft').textContent = daysLeft;
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60 * 24);

// Initial update of the display
updateDisplay();
