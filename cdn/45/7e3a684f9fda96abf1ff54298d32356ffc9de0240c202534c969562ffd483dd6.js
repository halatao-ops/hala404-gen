export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "foam_roller";

  const rollerRadius = 0.5;
  const rollerLength = 2.0;
  const rollerCenterY = 0.45;

  const foamTextureSize = 128;
  const foamTextureData = new Uint8Array(
    foamTextureSize * foamTextureSize * 4
  );

  for (let y = 0; y < foamTextureSize; y++) {
    for (let x = 0; x < foamTextureSize; x++) {
      const index = (y * foamTextureSize + x) * 4;
      const grain = (x * 37 + y * 61 + x * y * 17) % 97;
      const pore = (x * 11 + y * 7 + x * y * 3) % 113;
      const value = pore < 4
        ? 70 + grain % 35
        : 174 + grain % 76;

      foamTextureData[index] = value;
      foamTextureData[index + 1] = value;
      foamTextureData[index + 2] = value;
      foamTextureData[index + 3] = 255;
    }
  }

  const foamTexture = new THREE.DataTexture(
    foamTextureData,
    foamTextureSize,
    foamTextureSize
  );
  foamTexture.wrapS = THREE.RepeatWrapping;
  foamTexture.wrapT = THREE.RepeatWrapping;
  foamTexture.repeat.set(5, 2);
  foamTexture.magFilter = THREE.NearestFilter;
  foamTexture.minFilter = THREE.LinearFilter;
  foamTexture.needsUpdate = true;

  const foam_rollerMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.95,
    map: foamTexture,
    bumpMap: foamTexture,
    bumpScale: 0.018
  });

  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0xd9b985,
    metalness: 0.0,
    roughness: 0.6
  });

  const handle_mountMat = new THREE.MeshStandardMaterial({
    color: 0x1c1c1c,
    metalness: 0.0,
    roughness: 0.9
  });

  const foam_roller_assembly = new THREE.Group();
  foam_roller_assembly.name = "foam_roller_assembly";
  root.add(foam_roller_assembly);

  const foam_rollerGeom = new THREE.CapsuleGeometry(
    rollerRadius,
    rollerLength,
    12,
    32
  );
  const foam_roller = new THREE.Mesh(foam_rollerGeom, foam_rollerMat);
  foam_roller.name = "foam_roller";
  foam_roller.rotation.z = Math.PI / 2;
  foam_roller.position.set(0, rollerCenterY, 0);
  foam_roller_assembly.add(foam_roller);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const handle_mountGeom = new THREE.CylinderGeometry(
    0.235,
    0.215,
    0.1,
    32
  );
  const handle_mount = new THREE.Mesh(handle_mountGeom, handle_mountMat);
  handle_mount.name = "handle_mount";
  handle_mount.position.set(0, -0.045, 0);
  handle_assembly.add(handle_mount);

  const wooden_handleProfile = [
    { y: -1.25, r: 0.105 },
    { y: -1.22, r: 0.145 },
    { y: -1.15, r: 0.165 },
    { y: -1.02, r: 0.168 },
    { y: -0.82, r: 0.162 },
    { y: -0.62, r: 0.150 },
    { y: -0.42, r: 0.135 },
    { y: -0.22, r: 0.116 },
    { y: -0.07, r: 0.103 },
    { y: 0.00, r: 0.095 }
  ];
  const wooden_handlePositions = [];
  const wooden_handleIndices = [];
  const handleSegments = 48;

  for (let i = 0; i < wooden_handleProfile.length; i++) {
    const profilePoint = wooden_handleProfile[i];

    for (let j = 0; j < handleSegments; j++) {
      const angle = j / handleSegments * Math.PI * 2;
      wooden_handlePositions.push(
        Math.cos(angle) * profilePoint.r,
        profilePoint.y,
        Math.sin(angle) * profilePoint.r
      );
    }
  }

  for (let i = 0; i < wooden_handleProfile.length - 1; i++) {
    for (let j = 0; j < handleSegments; j++) {
      const next = (j + 1) % handleSegments;
      const a = i * handleSegments + j;
      const b = i * handleSegments + next;
      const c = (i + 1) * handleSegments + next;
      const d = (i + 1) * handleSegments + j;

      wooden_handleIndices.push(a, d, b);
      wooden_handleIndices.push(b, d, c);
    }
  }

  const bottomIndex = wooden_handlePositions.length / 3;
  wooden_handlePositions.push(0, -1.25, 0);
  const topIndex = wooden_handlePositions.length / 3;
  wooden_handlePositions.push(0, 0, 0);

  for (let j = 0; j < handleSegments; j++) {
    const next = (j + 1) % handleSegments;
    wooden_handleIndices.push(bottomIndex, j, next);

    const topRingStart = (wooden_handleProfile.length - 1) * handleSegments;
    wooden_handleIndices.push(
      topIndex,
      topRingStart + next,
      topRingStart + j
    );
  }

  const wooden_handleGeom = new THREE.BufferGeometry();
  wooden_handleGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(wooden_handlePositions, 3)
  );
  wooden_handleGeom.setIndex(wooden_handleIndices);
  wooden_handleGeom.computeVertexNormals();

  const wooden_handle = new THREE.Mesh(
    wooden_handleGeom,
    wooden_handleMat
  );
  wooden_handle.name = "wooden_handle";
  wooden_handle.position.set(0, -0.08, 0.015);
  handle_assembly.add(wooden_handle);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}