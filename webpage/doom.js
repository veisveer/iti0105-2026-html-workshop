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

window.addEventListener('mouseup', async (event) => {
	if (!hand || !doomMusic || !doomGun) return;
	const muzzleX = event.clientX;
	const muzzleY = event.clientY;
	const tracerLength = 64;
	const tracerAngle = -90;

	const tracer = document.createElement('span');
	tracer.className = 'bullet-tracer';
	tracer.style.left = `${muzzleX}px`;
	tracer.style.top = `${muzzleY}px`;
	tracer.style.setProperty('--tracer-length', `${tracerLength}px`);
	tracer.style.setProperty('--tracer-angle', `${tracerAngle}deg`);
	document.body.appendChild(tracer);

	const flash = document.createElement('span');
	flash.className = 'muzzle-flash';
	flash.style.left = `${muzzleX}px`;
	flash.style.top = `${muzzleY}px`;
	document.body.appendChild(flash);

	const impact = document.createElement('span');
	impact.className = 'bullet-impact';
	impact.style.left = `${event.clientX}px`;
	impact.style.top = `${event.clientY}px`;
	impact.style.setProperty('--impact-rotation', `${Math.floor(Math.random() * 360)}deg`);
	document.body.appendChild(impact);

	for (let i = 0; i < 7; i += 1) {
		const spark = document.createElement('span');
		const angle = (360 / 7) * i + Math.random() * 22;
		const distance = 22 + Math.random() * 30;
		spark.className = 'impact-spark';
		spark.style.left = `${event.clientX}px`;
		spark.style.top = `${event.clientY}px`;
		spark.style.setProperty('--spark-angle', `${angle}deg`);
		spark.style.setProperty('--spark-x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
		spark.style.setProperty('--spark-y', `${Math.sin(angle * Math.PI / 180) * distance}px`);
		document.body.appendChild(spark);
		setTimeout(() => spark.remove(), 300);
	}

	hand.classList.remove('gun-recoil');
	void hand.offsetWidth;
	hand.classList.add('gun-recoil');
	setTimeout(() => hand.classList.remove('gun-recoil'), 120);

	setTimeout(() => tracer.remove(), 140);
	setTimeout(() => flash.remove(), 140);
	setTimeout(() => impact.remove(), 8000);
	const oldImpacts = document.querySelectorAll('.bullet-impact');
	if (oldImpacts.length > 12) oldImpacts[0].remove();

	hand.src = "./images/hand_shoot.png";
	doomGun.currentTime = 0;
	await doomGun.play().catch(() => {});
	if (doomMusic.paused) await doomMusic.play().catch(() => {});
	await new Promise(r => setTimeout(r, 500));
	hand.src = "./images/hand.png";
});
