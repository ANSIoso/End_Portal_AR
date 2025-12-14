
// gestione audio
const audio = document.querySelector('#markerAudio');
audio.loop = true;

// gestione tracciamento
const marker_portal = document.querySelector('#portalMarker');
const body_portal = document.querySelector('#portalbody');
const body_achievement = document.querySelector('#achievementbody');

const loadingDiv = document.querySelector('#loadingDiv');
const loading_alpha = 0.5

marker_portal.addEventListener('markerFound', async () => {
    audio.play();

    animate_in([body_portal, body_achievement]);
    wave_body(body_achievement);

    requestAnimationFrame(() => {
        loadingDiv.style.opacity = '0';
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    loadingDiv.style.display = 'none';
});

marker_portal.addEventListener('markerLost', async () => {
    audio.pause();

    requestAnimationFrame(() => {
        loadingDiv.style.opacity = loading_alpha;
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    loadingDiv.style.display = "flex";
});

function lerp(a, b, t) {
    return a + (b - a) * t;
}

bodys_to_animate = NaN

function animate_in(body) {
    if (body == NaN)
        return

    bodys_to_animate = body

    bodys_to_animate.flatMap((body) =>
        body.setAttribute("scale", { x: 0, y: 0, z: 0 })
    );

    animate_body_in(0, 0.5);
}

function animate_body_in(start, end) {
    const duration = 2000; // milliseconds
    const startTime = performance.now();

    function step(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const scale = start + (end - start) * progress;

        bodys_to_animate.flatMap((body) =>
            body.setAttribute("scale", { x: scale, y: scale, z: scale })
        );

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function wave_body(bodys_to_animate) {
    if (bodys_to_animate == NaN)
        return

    const startPosition = Object.assign({}, bodys_to_animate.getAttribute("position"));

    function step(time) {
        var t = Math.sin(new Date().getTime() / 1000) * 0.15;

        console.log(startPosition.y);


        bodys_to_animate.setAttribute("position", { x: startPosition.x, y: startPosition.y + t, z: startPosition.z })

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}