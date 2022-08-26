# SoftwareCity
Incode (the Software City) is a VR web app for software visualization. It can be used to analyze public Java projects on GitHub. It is built with Babylon.js and TypeScript. In order to successfully use incode, your browser needs to support Web Workers and WebXR for the VR-experience.

## Demo setup
The following instructions describe how to connect the VR headset with the Windows PC so that the GPU inside the PC is used. The focus is on a wireless setup with the [Oculus Air Link](https://support.oculus.com/airlink/) feature. If the wireless connection is too unstable, the graphics preferences can be [adjusted](https://support.oculus.com/articles/headsets-and-accessories/oculus-link/oculus-link-performance-preferences/) or a wired connection may be used (see [Oculus Link](https://support.oculus.com/airlink/)). Alternatively, the Oculus Quest 2 has a web browser called Oculus Browser which can run the web application directly on the VR device. However, the size of the generated cities is very limited here because of the performance.

**Components:**
- Linksys router
- Windows PC
- Oculus Quest 2

**Oculus Account**
Use your own compatible account to sign in to the Oculus PC App and headset.
Keep account and device credentials in your local password manager.

**Infrastructure:**
1. Connect the PC to the Linksys router via Ethernet cable.
2. Connect the Oculus Quest 2 to the router's Wi-Fi network using the locally configured credentials.

**On your desktop PC:**
1. Clone this repo: `git clone https://gitlab.ost.ch/iza/softwarecity.git`
2. Install dependencies: `npm install`
3. Start the local server: `npm start`
4. Download the Oculus PC App for the Oculus Quest 2: https://www.oculus.com/setup/
5. Inside the Oculus PC App, login with your account. Select the Oculus Quest 2 and choose Air Link as the connection method.
6. Quit Google Chrome

**On your VR headset:**
1. Visit settings -> experimental -> enable Airlink
2. Now in the quick settings menu, the Oculus Air Link Button should be visible. Select it.
3. If your headset is connected to the same local network, the PC should be listed. Launch the PC.
4. Download the app `Virtual Space` from the Store.
5. Start `Virtual Space`.
6. Inside `Virtual Space` start Google Chrome and visit incode with `https://localhost:8080/`. If the demo project inside the wep app cannot be started, the VR headset was not recognized as a VR device by Chrome. In this case try to restart Virtual Space, Google Chrome and if necessary the Oculus PC App.

> Hint: incode was developed and tested with npm version: 6.14.14 and node version 14.17.5

## GitHub access
The app reads public repositories through unauthenticated GitHub API requests. These requests share GitHub's unauthenticated rate limit for your public IP address. If the limit is reached, wait for it to reset before trying again.

The app runs in the browser. Do not embed personal access tokens in its source or build configuration, because they would be visible to anyone who loads the app.
