
// gestione audio -------------
const audio = document.querySelector('#markerAudio');
audio.loop = true;

// gestione tracciamento ----------
const marker_portal = document.querySelector('#portalMarker');
const body_portal = document.querySelector('#portalbody');
const body_achievement = document.querySelector('#achievementbody');

marker_portal.addEventListener('markerFound', async () => {
    somethingFound();

    animate_in([body_portal, body_achievement], 0, 0.5);
    wave_body(body_achievement, 0.2);
});

marker_portal.addEventListener('markerLost', async () => {
    nothingFound();
});

const marker_figure = document.querySelector('#figureMarker');
const body_spawner = document.querySelector('#spawnerbody');
const body_steve = document.querySelector('#stevebody');

marker_figure.addEventListener('markerFound', async () => {
    rotate_body(body_steve)
    somethingFound();
});

marker_figure.addEventListener('markerLost', async () => {
    nothingFound();
});


// gestione stato ---------
const loadingDiv = document.querySelector('#loadingDiv');
const loading_alpha = 0.5


async function somethingFound() {
    audio.play();

    requestAnimationFrame(() => {
        loadingDiv.style.opacity = '0';
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    loadingDiv.style.display = 'none';
}

async function nothingFound() {
    audio.pause();

    requestAnimationFrame(() => {
        loadingDiv.style.opacity = loading_alpha;
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    loadingDiv.style.display = "flex";
}

// gestione movimento -------

function lerp(a, b, t) {
    return a + (b - a) * t;
}

bodys_to_animate = NaN

function animate_in(bodys, start, end) {
    const duration = 2000; // milliseconds
    const startTime = performance.now();

    if (bodys == NaN)
        return

    bodys.flatMap((body) =>
        body.setAttribute("scale", { x: 0, y: 0, z: 0 })
    );

    function step(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const scale = lerp(start, end, progress);

        bodys.flatMap((body) =>
            body.setAttribute("scale", { x: scale, y: scale, z: scale })
        );

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function wave_body(bodys_to_animate, interval) {
    if (bodys_to_animate == NaN)
        return

    const startPosition = Object.assign({}, bodys_to_animate.getAttribute("position"));

    function step() {
        var t = (Math.sin(new Date().getTime() / 1000) + 1) * 0.5;

        new_y_pos = lerp(startPosition.y - interval, startPosition.y + interval, t)

        bodys_to_animate.setAttribute("position", { x: startPosition.x, y: new_y_pos, z: startPosition.z })

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function rotate_body(bodys_to_animate) {
    if (bodys_to_animate == NaN)
        return


    function step() {
        const actualRotation = bodys_to_animate.getAttribute("rotation");
        bodys_to_animate.setAttribute("rotation", { x: actualRotation.x, y: actualRotation.y + 0.3, z: actualRotation.z })

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}