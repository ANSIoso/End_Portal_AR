# End_Portal_AR

A Minecraft-themed AR experience for my thesis acknowledgments. The experience is browser-based and can be triggered by scanning the bound QR codes.

<p align="center">
<img src="./resources/examples/portal_example.gif" width="40%" style="border-radius: 8px;" />
</p>

## Technologies Used

- [AR.js](https://ar-js-org.github.io/AR.js-Docs/) - Binds 3D objects to QR codes in the physical world
- GitHub Pages - Hosts the experience
- Blender - For editing 3D models
- A-Frame - Web framework for building VR/AR experiences

## How to Access the Experience

The experience is accessed through 2 QR codes that are also used as anchors for the 3D objects:

### Portal QR Code
Displays the Minecraft End Portal with a bouncing achievement notification. This QR code appears on my thesis.

<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 100px;">
    <img src="./qrcodes/pattern-portal.png" style="border-radius: 8px; width: 40%" />
    <img src="./resources/examples/portal_example.gif" style="border-radius: 8px; width: 20%" />
</div>

### Spawner QR Code
Displays a spawner with a spinning Steve figure inside. This QR code appears on the party favors.

<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 100px;">
    <img src="./qrcodes/pattern-figure.png" style="border-radius: 8px; width: 40%" />
    <img src="./resources/examples/figure_example.gif" style="border-radius: 8px; width: 20%" />
</div>

## Credits

- [Minecraft Stronghold Portal](https://sketchfab.com/3d-models/stronghold-portal-8f5bcdf50ea14a45a5887e472be8d5c0)
- [Steve Model](https://sketchfab.com/3d-models/minecraft-steve-cb228dcc137042cc9a3dc588758cc6e9)
- [Achievement Generator](https://skinmc.net/achievement)

## Known Issues

Due to incompatibility with mobile browsers, I had to use an older A-Frame version (1.4.0) and the corresponding AR.js version. This resulted in lower graphics quality in the 3D model rendering compared to newer versions.