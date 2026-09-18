const hand = document.querySelector('.hand_image');
const doomMusic = document.getElementById('doom-music');
const doomGun = document.getElementById('doom-gun');

doomMusic.volume = 0.5;
doomGun.volume = 1.0;

window.addEventListener('mousemove', (event) => {
	if (!hand) return;
	hand.style.left = `${event.clientX - 25}px`;
	hand.style.top = `${event.clientY + 100}px`;
});

window.addEventListener('mouseup', async () => {
	if (!hand || !doomMusic || !doomGun) return;
	hand.src = "./images/hand_shoot.png";
	doomGun.currentTime = 0;
	await doomGun.play().catch(() => {});
	if (doomMusic.paused) await doomMusic.play().catch(() => {});
	await new Promise(r => setTimeout(r, 500));
	hand.src = "./images/hand.png";
});
