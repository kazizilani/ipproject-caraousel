// array of member information
const teamMembers = [
	{ name: "Emily Kim", role: "Founder" },
	{ name: "Michael Steward", role: "Creative Director" },
	{ name: "Emma Rodriguez", role: "Lead Developer" },
	{ name: "Julia Gimmel", role: "UX Designer" },
	{ name: "Lisa Anderson", role: "Marketing Manager" },
	{ name: "James Wilson", role: "Product Manager" }
];

//accessing the relevant dom elements

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

//setting the current current dom index
let currentIndex = 0;
let isAnimating = false;

//callback handler for the click event listener set in buttons
function updateCarousel(newIndex) {
    //preventing double clicks during animations
	if (isAnimating) return;
	isAnimating = true;

    //setting a revolving index
	currentIndex = (newIndex + cards.length) % cards.length;

    //setting the cards position in carousel
	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

        //resetting the previous order
		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

        //setting the positin based on current index
		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

    //switching the active class based on the current index
	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});


    //creating an opacity animation
	memberName.style.opacity = "0";
	memberRole.style.opacity = "0";

	setTimeout(() => {
		memberName.textContent = teamMembers[currentIndex].name;
		memberRole.textContent = teamMembers[currentIndex].role;
		memberName.style.opacity = "1";
		memberRole.style.opacity = "1";
	}, 300);

    //enabling the buttons again
	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

//adding event listeners on buttons, dots, and cards
leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

//enabling keyboard handing for accessability
document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

//support for touch events
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);
