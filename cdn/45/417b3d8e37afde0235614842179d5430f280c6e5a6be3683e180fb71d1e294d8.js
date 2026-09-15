export default function generate(THREE) {
  const root = new THREE.Group();

  const blockW = 1.28;
  const blockH = 0.34;
  const blockD = 0.90;
  const cornerR = 0.14;
  const halfW = blockW / 2;
  const halfH = blockH / 2;
  const halfD = blockD / 2;
  const innerW = halfW - cornerR;
  const innerH = halfH - cornerR;
  const innerD = halfD - cornerR;

  const glass_blockMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce8e9,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.82,
    thickness: 0.55,
    attenuationColor: 0xc8d8da,
    attenuationDistance: 1.8,
    clearcoat: 0.75,
    clearcoatRoughness: 0.12,
    depthWrite: false
  });

  const glass_blockShape = new THREE.Shape();
  glass_blockShape.moveTo(-innerW, -halfH);
  glass_blockShape.lineTo(innerW, -halfH);
  glass_blockShape.quadraticCurveTo(halfW, -halfH, halfW, -innerH);
  glass_blockShape.lineTo(halfW, innerH);
  glass_blockShape.quadraticCurveTo(halfW, halfH, innerW, halfH);
  glass_blockShape.lineTo(-innerW, halfH);
  glass_blockShape.quadraticCurveTo(-halfW, halfH, -halfW, innerH);
  glass_blockShape.lineTo(-halfW, -innerH);
  glass_blockShape.quadraticCurveTo(-halfW, -halfH, -innerW, -halfH);

  const glass_blockGeom = new THREE.ExtrudeGeometry(glass_blockShape, {
    depth: blockD,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: cornerR,
    bevelSize: cornerR,
    bevelOffset: 0,
    bevelSegments: 10
  });
  glass_blockGeom.translate(0, 0, -halfD);
  glass_blockGeom.computeVertexNormals();

  const glass_block = new THREE.Mesh(glass_blockGeom, glass_blockMat);
  glass_block.renderOrder = 3;
  root.add(glass_block);

  const bubbleMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4fbfb,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.55,
    thickness: 0.08,
    clearcoat: 0.35,
    clearcoatRoughness: 0.08,
    depthWrite: false
  });

  const bubbleGeom = new THREE.SphereGeometry(1, 12, 8);
  const bubbleCount = 38;
  const bubbles = new THREE.InstancedMesh(bubbleGeom, bubbleMat, bubbleCount);
  const bubbleDummy = new THREE.Object3D();

  for (let i = 0; i < bubbleCount; i++) {
    const u = ((i * 37 + 11) % 101) / 100;
    const v = ((i * 53 + 17) % 97) / 96;
    const w = ((i * 29 + 7) % 89) / 88;
    const size = 0.006 + ((i * 13) % 9) * 0.00125;

    bubbleDummy.position.set(
      (u - 0.5) * 1.02,
      (v - 0.5) * 0.20,
      (w - 0.5) * 0.64
    );
    bubbleDummy.scale.set(
      size * (0.75 + ((i * 7) % 5) * 0.13),
      size * (0.65 + ((i * 11) % 6) * 0.10),
      size * (0.70 + ((i * 5) % 4) * 0.12)
    );
    bubbleDummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    bubbleDummy.updateMatrix();
    bubbles.setMatrixAt(i, bubbleDummy.matrix);
  }
  bubbles.instanceMatrix.needsUpdate = true;
  bubbles.renderOrder = 1;
  root.add(bubbles);

  const fractureMat = new THREE.MeshPhysicalMaterial({
    color: 0xe9f2f2,
    metalness: 0.0,
    roughness: 0.28,
    transmission: 0.42,
    thickness: 0.06,
    clearcoat: 0.2,
    clearcoatRoughness: 0.15,
    depthWrite: false
  });

  const fracture_flakesGeom = new THREE.TetrahedronGeometry(1, 0);
  const fractureCount = 24;
  const fracture_flakes = new THREE.InstancedMesh(
    fracture_flakesGeom,
    fractureMat,
    fractureCount
  );
  const fractureDummy = new THREE.Object3D();

  for (let i = 0; i < fractureCount; i++) {
    const u = ((i * 43 + 5) % 103) / 102;
    const v = ((i * 61 + 23) % 107) / 106;
    const w = ((i * 31 + 19) % 101) / 100;
    const size = 0.011 + ((i * 17) % 8) * 0.0018;

    fractureDummy.position.set(
      (u - 0.5) * 1.00,
      (v - 0.5) * 0.19,
      (w - 0.5) * 0.62
    );
    fractureDummy.scale.set(
      size * (1.25 + ((i * 3) % 5) * 0.28),
      size * (0.32 + ((i * 7) % 4) * 0.12),
      size * (0.75 + ((i * 11) % 5) * 0.18)
    );
    fractureDummy.rotation.set(i * 0.73, i * 0.41, i * 0.97);
    fractureDummy.updateMatrix();
    fracture_flakes.setMatrixAt(i, fractureDummy.matrix);
  }
  fracture_flakes.instanceMatrix.needsUpdate = true;
  fracture_flakes.renderOrder = 1;
  root.add(fracture_flakes);

  const scratchMat = new THREE.LineBasicMaterial({
    color: 0xeaf5f5,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });

  const scratchPositions = [];
  const scratchCount = 30;
  for (let i = 0; i < scratchCount; i++) {
    const u = ((i * 47 + 9) % 109) / 108;
    const v = ((i * 59 + 31) % 113) / 112;
    const w = ((i * 41 + 13) % 107) / 106;
    const length = 0.018 + ((i * 23) % 11) * 0.0032;
    const angle = i * 1.731;
    const cx = (u - 0.5) * 1.00;
    const cy = (v - 0.5) * 0.19;
    const cz = (w - 0.5) * 0.62;
    const dx = Math.cos(angle) * length;
    const dy = Math.sin(angle * 0.7) * length * 0.22;
    const dz = Math.sin(angle) * length;

    scratchPositions.push(
      cx - dx, cy - dy, cz - dz,
      cx + dx, cy + dy, cz + dz
    );
  }

  const surface_scratchesGeom = new THREE.BufferGeometry();
  surface_scratchesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(scratchPositions, 3)
  );
  const surface_scratches = new THREE.LineSegments(
    surface_scratchesGeom,
    scratchMat
  );
  surface_scratches.renderOrder = 2;
  root.add(surface_scratches);

  const edge_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });

  const edge_highlightGeom = new THREE.CapsuleGeometry(0.014, 0.76, 4, 10);
  const edge_highlight = new THREE.Mesh(edge_highlightGeom, edge_highlightMat);
  edge_highlight.rotation.z = Math.PI / 2;
  edge_highlight.position.set(-0.08, 0.105, 0.454);
  edge_highlight.renderOrder = 4;
  root.add(edge_highlight);

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

  fitToUnitCube(THREE, root);
  return root;
}