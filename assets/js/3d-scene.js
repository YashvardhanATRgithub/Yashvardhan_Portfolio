// Basic Three.js scene setup
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas) {
        console.error('Three.js canvas not found');
        return;
    }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / Math.max(1, canvas.clientHeight), 0.1, 1000); // Ensure clientHeight is not 0
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // alpha: true for transparent background
    renderer.setSize(canvas.clientWidth, Math.max(1, canvas.clientHeight)); // Ensure clientHeight is not 0

    // Handle window resize
    window.addEventListener('resize', () => {
        if (canvas.parentElement) { // Check if canvas is still in DOM
            const parentWidth = canvas.parentElement.clientWidth;
            const parentHeight = canvas.parentElement.clientHeight;
            renderer.setSize(parentWidth, parentHeight);
            camera.aspect = parentWidth / Math.max(1, parentHeight); // Ensure parentHeight is not 0
            camera.updateProjectionMatrix();
        }
    });

    // Initial resize call
    if (canvas.parentElement) {
         const parentWidth = canvas.parentElement.clientWidth;
         const parentHeight = canvas.parentElement.clientHeight;
         renderer.setSize(parentWidth, parentHeight);
         camera.aspect = parentWidth / Math.max(1, parentHeight);
         camera.updateProjectionMatrix();
    }


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Geometry (e.g., a rotating cube)
    const geometry = new THREE.BoxGeometry();
    // Use a professional-looking material, perhaps a metallic one or one that matches the site's new palette
    const material = new THREE.MeshStandardMaterial({ color: 0x2a76c6 }); // Using the new primary color
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    // Check if WebGL is available
    if (THREE.WEBGL.isWebGLAvailable()) {
        animate();
    } else {
        const warning = THREE.WEBGL.getWebGLErrorMessage();
        console.error('WebGL is not available:', warning);
        if (canvas.parentElement) {
            // canvas.parentElement.appendChild(warning); // Avoid appending directly to parent if it might break layout
        }
    }
});
