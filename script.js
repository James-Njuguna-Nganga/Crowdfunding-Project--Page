// Make a selection of which pledge to make
// See an updated progress bar and total money raised based on their pledge total after confirming a pledge
// See the number of total backers increment by one after confirming a pledge
// Toggle whether or not the product is bookmarked
// View the optimal layout depending on their device's screen size
// See hover states for interactive elements

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

openModal.onclick = function () {
  modal.style.display = "block";
  document.body.classList.add("fixed");
};

closeIcon.onclick = function () {
  modal.style.display = "none";
  document.body.classList.remove("fixed");
};

//open thank you
for (let button of openThankYouBtn) {
  button.addEventListener("click", () => {
    modal.style.display = "none";
    thankYouPage.style.display = "block";
  });
}

closeThankYouBtn.onclick = function () {
  thankYouPage.style.display = "none";
  document.body.classList.remove("fixed");
};

//menu
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


//select Reward
for (let button of selectReward) {
  button.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.classList.add("fixed");
  });
}

  // Add event listeners to radio buttons
  for (let i = 0; i < clickRadio.length; i++) {
    clickRadio[i].addEventListener("change", () => {

      for (let j = 0; j < belowSections.length; j++) {
        belowSections[j].style.display = "none";
      }
      
      if (clickRadio[i].checked) {
        belowSections[i].style.display = "block";
      }
    });
  let raisedAmount = parseInt(localStorage.getItem('raisedAmount')) || 89914;
  let backersCount = parseInt(localStorage.getItem('backersCount')) || 5007;
  let bookmarked = localStorage.getItem('bookmarked') === 'true';
  updateDisplay();

  function updateCountdown() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), 11, 17);
    const difference = targetDate - today;
    const daysLeftCount = Math.ceil(difference / (1000 * 60 * 60 * 24));
    daysLeft.textContent = daysLeftCount;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000 * 60 * 60 * 24);

  bookmarkToggle.onclick = function () {
    bookmarked = !bookmarked;
    localStorage.setItem('bookmarked', bookmarked);
    updateDisplay();
  };

  function confirmPledge(amount) {
    if (isNaN(amount)) return;
    raisedAmount += amount;
    backersCount += 1;
    localStorage.setItem('raisedAmount', raisedAmount);
    localStorage.setItem('backersCount', backersCount);
    updateDisplay();
  }

  function updateDisplay() {
    totalRaised.textContent = `$${raisedAmount.toLocaleString()}`;
    totalBackers.textContent = backersCount.toLocaleString();
    progressBar.value = (raisedAmount / 100000) * 100;
    bookmarkToggle.classList.toggle('bookmarked', bookmarked);
  }

  // Initial display update
  updateDisplay();
}