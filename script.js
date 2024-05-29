const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeIcon = document.getElementsByClassName("close-icon")[0];
const thankYouPage = document.getElementById("thankYouPage");
const closeThankYouBtn = document.getElementById("closeThankYouBtn");
const openThankYouBtn = document.getElementsByClassName("Continue");
const pledge = document.getElementsByClassName("pledge");
const deleteMenu = document.getElementById("close_Menu");
const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sidemenu");
const selectReward = document.getElementsByClassName("select");
const clickRadio = document.getElementsByName("account-type");
const belowSections = document.getElementsByClassName("below");
const bookmarkButton = document.getElementById("bookmarkButton");

const bambooLeftElement = document.getElementById('bambooLeft');
const blackEditionLeftElement = document.getElementById('blackEditionLeft');
const mahoganyLeftElement = document.getElementById('mahoganyLeft');

const bambooLeftModalElement = document.getElementById('bambooLeftModal');
const blackEditionLeftModalElement = document.getElementById('blackEditionLeftModal');
const mahoganyLeftModalElement = document.getElementById('mahoganyLeftModal');


let totalAmountPledged = parseInt(localStorage.getItem('totalAmountPledged')) || 0;
let totalBackers = parseInt(localStorage.getItem('totalBackers')) || 0;
let bambooLeft = parseInt(localStorage.getItem('bambooLeft')) || 101;
let blackEditionLeft = parseInt(localStorage.getItem('blackEditionLeft')) || 64;
let mahoganyLeft = parseInt(localStorage.getItem('mahoganyLeft')) || 0;

const TARGET_AMOUNT = 100000;
const targetDate = new Date(new Date().getFullYear(), 5, 30);

openModal.onclick = function () {
  modal.style.display = "block";
  document.body.classList.add("fixed");
};

closeIcon.onclick = function () {
  modal.style.display = "none";
  document.body.classList.remove("fixed");
  resetPledgeInputs();
};

closeThankYouBtn.onclick = function () {
  thankYouPage.style.display = "none";
  document.body.classList.remove("fixed");
};


for (let button of openThankYouBtn) {
  button.addEventListener("click", () => {
    const pledgeBox = button.closest('.pledge');
    const input = pledgeBox.querySelector('.money');
    const pledgeAmount = parseInt(input.value.trim());

    let minPledgeAmount = 1;
    if (pledgeBox.classList.contains("second")) {
      minPledgeAmount = 25;
    } else if (pledgeBox.classList.contains("third")) {
      minPledgeAmount = 75;
    } else if (pledgeBox.classList.contains("fourth")) {
      minPledgeAmount = 200;
    }
    if (!isNaN(pledgeAmount) && pledgeAmount >= minPledgeAmount) {
      if (new Date() > targetDate) {
        alert("The campaign has ended. No more pledges can be made.");
      } else {
        if (totalAmountPledged + pledgeAmount <= TARGET_AMOUNT) {
          totalAmountPledged += pledgeAmount;
          totalBackers++;

          if (pledgeBox.classList.contains("second")) {
            bambooLeft--;
            localStorage.setItem('bambooLeft', bambooLeft);
          } else if (pledgeBox.classList.contains("third")) {
            blackEditionLeft--;
            localStorage.setItem('blackEditionLeft', blackEditionLeft);
          } else if (pledgeBox.classList.contains("fourth")) {
            mahoganyLeft--;
            localStorage.setItem('mahoganyLeft', mahoganyLeft);
          }

          updateLocalStorage();
          updateProgressBar();
          updatePageElements();
          modal.style.display = "none";
          thankYouPage.style.display = "block";
          resetPledgeInputs();
        } else {
          alert(`Your pledge would exceed the target amount of $${TARGET_AMOUNT.toLocaleString()}. Please enter a smaller amount.`);
        }
      }
    } else {
      alert(`Please enter a valid pledge amount of at least $${minPledgeAmount}`);
    }
  });
}

bookmarkButton.addEventListener("click", () => {
  bookmarkButton.classList.toggle("active");
  if (bookmarkButton.classList.contains("active")) {
    document.getElementById("bookmarkText").textContent = "Bookmarked";
  } else {
    document.getElementById("bookmarkText").textContent = "Bookmark";
  }
});

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
  const difference = targetDate - today;
  const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
  document.getElementById('daysLeft').textContent = daysLeft;
}
updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60 * 24);

function updateProgressBar() {
  const progress = (totalAmountPledged / TARGET_AMOUNT) * 100;
  document.getElementById('file').value = progress;
}

function updateLocalStorage() {
  localStorage.setItem('totalAmountPledged', totalAmountPledged);
  localStorage.setItem('totalBackers', totalBackers);
}

function updatePageElements() {
  const totalAmountElement = document.getElementById('totalAmount');
  const totalBackersElement = document.getElementById('totalBackers');

  totalAmountElement.textContent = `$${totalAmountPledged.toLocaleString()}`;
  totalBackersElement.textContent = totalBackers.toLocaleString();

  bambooLeftElement.textContent = bambooLeft;
  blackEditionLeftElement.textContent = blackEditionLeft;
  mahoganyLeftElement.textContent = mahoganyLeft;

  bambooLeftModalElement.textContent = bambooLeft;
  blackEditionLeftModalElement.textContent = blackEditionLeft;
  mahoganyLeftModalElement.textContent = mahoganyLeft;
}

function retrieveFromLocalStorage() {
  totalAmountPledged = parseInt(localStorage.getItem('totalAmountPledged')) || 0;
  totalBackers = parseInt(localStorage.getItem('totalBackers')) || 0;
  bambooLeft = parseInt(localStorage.getItem('bambooLeft')) || 101;
  blackEditionLeft = parseInt(localStorage.getItem('blackEditionLeft')) || 64;
  mahoganyLeft = parseInt(localStorage.getItem('mahoganyLeft')) || 0;

  updatePageElements();
  updateProgressBar();
}
retrieveFromLocalStorage();

function resetPledgeInputs() {
  const pledgeInputs = document.querySelectorAll('.money');
  pledgeInputs.forEach(input => {
    input.value = '';
  });
}