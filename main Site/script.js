// Three JS - City Background Animation
// Everything is inside window.onload + try-catch so it NEVER crashes the page

window.addEventListener('load', function () {

  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded — skipping 3D background.');
    return;
  }

  try {
    //--------------------------------------------------------------- RENDERER
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    var bgEl = document.getElementById('bg');
    if (!bgEl) return;
    bgEl.appendChild(renderer.domElement);

    //--------------------------------------------------------------- SCENE
    var scene  = new THREE.Scene();
    var city   = new THREE.Object3D();
    var smoke  = new THREE.Object3D();
    var town   = new THREE.Object3D();
    var mouse  = new THREE.Vector2();
    var createCarPos = true;
    var uSpeed = 0.001;

    scene.background = new THREE.Color(0x01030a);
    scene.fog = new THREE.FogExp2(0x01030a, 0.02);

    //--------------------------------------------------------------- CAMERA
    var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 2, 14);

    //--------------------------------------------------------------- RESIZE
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    //--------------------------------------------------------------- MOUSE
    window.addEventListener('mousemove', function (e) {
      mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) *  2 + 1;
    });
    window.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        mouse.x = e.touches[0].pageX - window.innerWidth  / 2;
        mouse.y = e.touches[0].pageY - window.innerHeight / 2;
      }
    }, { passive: true });

    //--------------------------------------------------------------- HELPERS
    function mathRandom(num) {
      num = num === undefined ? 8 : num;
      return -Math.random() * num + Math.random() * num;
    }

    //--------------------------------------------------------------- LIGHTS
    var ambientLight = new THREE.AmbientLight(0xffffff, 2);
    var lightFront   = new THREE.SpotLight(0xffffff, 10, 20);
    var lightBack    = new THREE.PointLight(0xffffff, 1);

    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width  = 2048;
    lightFront.shadow.mapSize.height = 2048;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0, 6, 0);

    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    scene.add(city);
    city.add(smoke);
    city.add(town);
    smoke.position.y = 2;

    //--------------------------------------------------------------- GRID
    var gridHelper = new THREE.GridHelper(60, 120, 0x83e5de, 0x000000);
    city.add(gridHelper);

    //--------------------------------------------------------------- CITY BLOCKS
    function init() {
      for (var i = 0; i < 100; i++) {
        var geo = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
        var mat = new THREE.MeshStandardMaterial({ color: 0x000000, wireframe: false, side: THREE.DoubleSide });
        var wmat = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.03, side: THREE.DoubleSide });

        var cube  = new THREE.Mesh(geo, mat);
        var wfloor = new THREE.Mesh(geo, wmat);
        var floor  = new THREE.Mesh(geo, mat);

        cube.add(wfloor);
        cube.castShadow    = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1 + Math.abs(mathRandom(8));
        floor.scale.y      = 0.05;
        cube.scale.y       = 0.1 + Math.abs(mathRandom(8));

        var w = 0.9;
        cube.scale.x = cube.scale.z = w + mathRandom(1 - w);
        cube.position.x = Math.round(mathRandom());
        cube.position.z = Math.round(mathRandom());
        floor.position.set(cube.position.x, 0, cube.position.z);

        town.add(floor);
        town.add(cube);
      }

      // Particles
      var pmat = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide });
      var pgeo = new THREE.CircleGeometry(0.01, 3);
      for (var h = 0; h < 300; h++) {
        var p = new THREE.Mesh(pgeo, pmat);
        p.position.set(mathRandom(5), mathRandom(5), mathRandom(5));
        p.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(p);
      }

      // Ground plane
      var floorMat = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide, roughness: 0.9, metalness: 0.6, opacity: 0.9, transparent: true });
      var floorGeo = new THREE.PlaneGeometry(60, 60);
      var floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.y = -0.001;
      floorMesh.receiveShadow = true;
      city.add(floorMesh);
    }

    //--------------------------------------------------------------- CARS / LINES
    function createCars(cScale, cPos, cColor) {
      cScale = cScale || 2;
      cPos   = cPos   || 20;
      cColor = cColor || 0x83e5de;

      var cmat  = new THREE.MeshStandardMaterial({ color: cColor, side: THREE.DoubleSide });
      var cgeo  = new THREE.BoxGeometry(1, cScale / 40, cScale / 40);
      var celem = new THREE.Mesh(cgeo, cmat);

      if (createCarPos) {
        createCarPos   = false;
        celem.position.x = -cPos;
        celem.position.z = mathRandom(3);
        if (typeof TweenMax !== 'undefined') {
          TweenMax.to(celem.position, 3, { x: cPos, repeat: -1, yoyo: true, delay: mathRandom(3) });
        }
      } else {
        createCarPos   = true;
        celem.position.x = mathRandom(3);
        celem.position.z = -cPos;
        celem.rotation.y = Math.PI / 2;
        if (typeof TweenMax !== 'undefined') {
          TweenMax.to(celem.position, 5, { z: cPos, repeat: -1, yoyo: true, delay: mathRandom(3) });
        }
      }

      celem.receiveShadow = true;
      celem.castShadow    = true;
      celem.position.y    = Math.abs(mathRandom(5));
      city.add(celem);
    }

    function generateLines() {
      for (var i = 0; i < 60; i++) createCars(0.1, 20);
    }

    //--------------------------------------------------------------- ANIMATE
    function animate() {
      requestAnimationFrame(animate);
      city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      if (city.rotation.x >  1)    city.rotation.x =  1;
      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;
      camera.lookAt(city.position);
      renderer.render(scene, camera);
    }

    //--------------------------------------------------------------- START
    generateLines();
    init();
    animate();

  } catch (err) {
    console.warn('Three.js scene failed to initialize:', err.message);
  }

});
