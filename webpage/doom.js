const hand = document.querySelector('.hand_image');

window.addEventListener('mousemove', (event) => {
	hand.style.left = `${event.clientX - 25}px`;
	hand.style.top = `${event.clientY + 100}px`;
});

window.addEventListener('mouseup', async () => {
	hand.src = "./images/hand_shoot.png";
	await new Promise(r => setTimeout(r, 500));
	hand.src = "./images/hand.png";
});
