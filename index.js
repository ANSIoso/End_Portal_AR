// ========= [SETTINGS] =========
const marker_figure = document.querySelector('#figureMarker');
const marker_portal = document.querySelector('#portalMarker');
const body_achievement = document.querySelector('#achievementbody');
const body_spawner = document.querySelector('#spawnerbody');
const body_steve = document.querySelector('#stevebody');
const body_portal = document.querySelector('#portalbody');

const portal = {
    'position': { x: 0, y: 0, z: 0 },
    'rotation': { x: 0, y: 90, z: 0 },
    'scale': { x: 0.5, y: 0.5, z: 0.5 }
}
const achievement = {
    'position': { x: 0, y: 0, z: -2 },
    'rotation': { x: 0, y: 270, z: 40 },
    'scale': { x: 0.5, y: 0.5, z: 0.5 }
}
const steve = {
    'position': { x: 0, y: 0.5, z: 0 },
    'rotation': { x: 0, y: 0, z: 40 },
    'scale': { x: 0.12, y: 0.12, z: 0.12 }
}
const spawner = {
    'position': { x: 0, y: 0, z: 0 },
    'rotation': { x: 0, y: 0, z: 0 },
    'scale': { x: 1, y: 1, z: 1 }
}

// ========= [GESTIONE AUDIO] =========
const audio = document.querySelector('#markerAudio');
audio.loop = true;

// ========= [GESTIONE TRACCIAMENTO] =========
AFRAME.registerComponent('markerhandler', {
    init: function () {
        this.el.addEventListener('markerFound', () => {
            console.log('Marker trovato');
        });
    }
});


marker_portal.addEventListener('markerFound', async () => {
    somethingFound();

    setBody(body_achievement, achievement)
    setBody(body_portal, portal)

    animate_in(body_achievement, achievement, 2000);
    animate_in(body_portal, portal, 2000);

    wave_body(body_achievement, achievement, 0.2);
});

marker_portal.addEventListener('markerLost', async () => {
    nothingFound();
});


marker_figure.addEventListener('markerFound', async () => {
    somethingFound();

    setBody(body_spawner, spawner)
    setBody(body_steve, steve)

    animate_in(body_spawner, spawner, 2000);
    animate_in(body_steve, steve, 2000);

    rotate_body(body_steve, 0.3)
});

marker_figure.addEventListener('markerLost', async () => {
    nothingFound();
});


// ========= [GESTIONE STATO] =========
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

// ========= [GESTIONE MOVIMENTO] =========

function setBody(body, settings) {
    body.setAttribute('position', settings.position);
    body.setAttribute('rotation', settings.rotation);
    body.setAttribute('scale', settings.scale);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animate_in(body, settings, duration) {
    const startTime = performance.now();

    if (body == NaN)
        return

    body.setAttribute("scale", { x: 0, y: 0, z: 0 })

    function step(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const scale = lerp(0, settings.scale.x, progress);

        body.setAttribute("scale", { x: scale, y: scale, z: scale })

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function wave_body(bodys, settings, interval) {
    if (bodys == NaN)
        return

    function step() {
        var t = (Math.sin(new Date().getTime() / 1000)) * interval;
        new_y_pos = settings.position.y + t

        bodys.setAttribute("position", {
            x: settings.position.x,
            y: new_y_pos, z:
                settings.position.z
        })

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function rotate_body(body, speed) {
    if (body == NaN)
        return

    function step() {
        const actualRotation = body.getAttribute("rotation");

        body.setAttribute("rotation", {
            x: actualRotation.x,
            y: actualRotation.y + speed,
            z: actualRotation.z
        })

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}