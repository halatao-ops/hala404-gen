export default function generate(THREE) {
  const root = new THREE.Group();
  const hammer = new THREE.Group();
  root.add(hammer);

  const headMat = new THREE.MeshStandardMaterial({
    color: 0x303231,
    metalness: 0.65,
    roughness: 0.58,
  });
  const wornMetalMat = new THREE.MeshStandardMaterial({
    color: 0x858783,
    metalness: 0.7,
    roughness: 0.45,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x783d2b,
    metalness: 0.15,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6335,
    metalness: 0.0,
    roughness: 0.72,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x4b2d18,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const stampMat = new THREE.MeshStandardMaterial({
    color: 0x171817,
    metalness: 0.35,
    roughness: 0.75,
  });

  const handleProfile = [
    { y: -2.62, r: 0.08 },
    { y: -2.59, r: 0.18 },
    { y: -2.52, r: 0.27 },
    { y: -2.40, r: 0.31 },
    { y: -2.12, r: 0.32 },
    { y: -1.55, r: 0.31 },
    { y: -0.90, r: 0.29 },
    { y: -0.25, r: 0.27 },
    { y: 0.38, r: 0.245 },
    { y: 0.72, r: 0.225 },
    { y: 0.88, r: 0.19 },
    { y: 0.94, r: 0.13 },
  ];

  function handleRadiusAt(y) {
    if (y <= handleProfile[0].y) return handleProfile[0].r;
    for (let i = 0; i < handleProfile.length - 1; i++) {
      const a = handleProfile[i];
      const b = handleProfile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return handleProfile[handleProfile.length - 1].r;
  }

  const handleGeom = new THREE.LatheGeometry(
    handleProfile.map((p) => new THREE.Vector2(p.r, p.y)),
    32
  );
  const handle = new THREE.Mesh(handleGeom, woodMat);
  hammer.add(handle);

  const wood_grain = new THREE.Group();
  for (let i = 0; i < 18; i++) {
    const y0 = -2.38 + (i % 9) * 0.31;
    const length = 0.28 + (i % 4) * 0.13;
    const y1 = Math.min(0.66, y0 + length);
    const angle0 = 0.25 + (i % 6) * 0.31 + Math.floor(i / 6) * 0.08;
    const grainPoints = [];
    for (let j = 0; j <= 4; j++) {
      const t = j / 4;
      const y = y0 + (y1 - y0) * t;
      const angle = angle0 + Math.sin(t * Math.PI * 2 + i * 0.7) * 0.018;
      const r = handleRadiusAt(y) + 0.006;
      grainPoints.push(new THREE.Vector3(
        Math.cos(angle) * r,
        y,
        Math.sin(angle) * r
      ));
    }
    const grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(grainPoints),
      8,
      0.005,
      5,
      false
    );
    const grain = new THREE.Mesh(grainGeom, woodGrainMat);
    wood_grain.add(grain);
  }
  hammer.add(wood_grain);

  const wood_knots = new THREE.Group();
  const knotData = [
    { y: -0.12, angle: 1.18, w: 0.055, h: 0.085 },
    { y: -1.43, angle: 1.72, w: 0.045, h: 0.07 },
    { y: -2.13, angle: 0.82, w: 0.035, h: 0.055 },
  ];
  for (const knot of knotData) {
    const normal = new THREE.Vector3(Math.cos(knot.angle), 0, Math.sin(knot.angle));
    const tangent = new THREE.Vector3(-normal.z, 0, normal.x);
    const positions = [];
    const indices = [];
    const segments = 16;
    const centerR = handleRadiusAt(knot.y) + 0.009;
    positions.push(normal.x * centerR, knot.y, normal.z * centerR);
    for (let i = 0; i < segments; i++) {
      const a = i / segments * Math.PI * 2;
      const y = knot.y + Math.sin(a) * knot.h;
      const r = handleRadiusAt(y) + 0.009;
      positions.push(
        normal.x * r + tangent.x * Math.cos(a) * knot.w,
        y,
        normal.z * r + tangent.z * Math.cos(a) * knot.w
      );
    }
    for (let i = 0; i < segments; i++) {
      indices.push(0, i + 1, (i + 1) % segments + 1);
    }
    const knotGeom = new THREE.BufferGeometry();
    knotGeom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    knotGeom.setIndex(indices);
    knotGeom.computeVertexNormals();
    const knotMesh = new THREE.Mesh(knotGeom, woodGrainMat);
    wood_knots.add(knotMesh);
  }
  hammer.add(wood_knots);

  const handle_ringGeom = new THREE.TorusGeometry(handleRadiusAt(0.43) + 0.004, 0.009, 6, 32);
  const handle_ring = new THREE.Mesh(handle_ringGeom, woodGrainMat);
  handle_ring.position.y = 0.43;
  handle_ring.rotation.x = Math.PI / 2;
  hammer.add(handle_ring);

  const headShape = new THREE.Shape();
  headShape.moveTo(-1.78, 1.25);
  headShape.bezierCurveTo(-1.55, 1.57, -0.95, 1.88, -0.35, 1.95);
  headShape.bezierCurveTo(0.28, 2.02, 0.95, 1.78, 1.42, 1.48);
  headShape.bezierCurveTo(1.67, 1.31, 1.82, 1.05, 1.82, 0.82);
  headShape.bezierCurveTo(1.82, 0.58, 1.67, 0.39, 1.48, 0.28);
  headShape.bezierCurveTo(1.25, 0.15, 1.02, 0.16, 0.82, 0.28);
  headShape.bezierCurveTo(0.62, 0.40, 0.48, 0.42, 0.34, 0.31);
  headShape.bezierCurveTo(0.18, 0.18, 0.12, -0.03, 0.02, -0.20);
  headShape.bezierCurveTo(-0.08, -0.36, -0.25, -0.38, -0.40, -0.27);
  headShape.bezierCurveTo(-0.55, -0.15, -0.57, 0.08, -0.48, 0.25);
  headShape.bezierCurveTo(-0.39, 0.43, -0.22, 0.55, -0.04, 0.61);
  headShape.bezierCurveTo(0.18, 0.68, 0.25, 0.84, 0.19, 1.00);
  headShape.bezierCurveTo(0.10, 1.23, -0.18, 1.38, -0.49, 1.42);
  headShape.bezierCurveTo(-0.91, 1.47, -1.34, 1.24, -1.68, 1.10);
  headShape.bezierCurveTo(-1.77, 1.07, -1.85, 1.13, -1.78, 1.25);
  headShape.closePath();

  const headGeom = new THREE.ExtrudeGeometry(headShape, {
    depth: 0.58,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.065,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  headGeom.translate(0, 0, -0.29);
  const head = new THREE.Mesh(headGeom, headMat);
  hammer.add(head);

  const head_rust_patches = new THREE.Group();
  const rustPatchData = [
    { x: -1.34, y: 1.39, z: 0.369, sx: 0.18, sy: 0.065, r: 0.35 },
    { x: -0.92, y: 1.67, z: 0.369, sx: 0.13, sy: 0.055, r: -0.45 },
    { x: -0.42, y: 1.82, z: 0.369, sx: 0.17, sy: 0.06, r: 0.15 },
    { x: 0.12, y: 1.79, z: 0.369, sx: 0.12, sy: 0.05, r: -0.25 },
    { x: 0.62, y: 1.61, z: 0.369, sx: 0.16, sy: 0.07, r: 0.55 },
    { x: 1.08, y: 1.34, z: 0.369, sx: 0.15, sy: 0.06, r: -0.35 },
    { x: 1.48, y: 1.02, z: 0.369, sx: 0.12, sy: 0.07, r: 0.2 },
    { x: 1.53, y: 0.61, z: 0.369, sx: 0.11, sy: 0.055, r: -0.5 },
    { x: 1.18, y: 0.39, z: 0.369, sx: 0.14, sy: 0.05, r: 0.4 },
    { x: 0.68, y: 0.48, z: 0.369, sx: 0.12, sy: 0.05, r: -0.2 },
    { x: -0.18, y: 0.48, z: 0.369, sx: 0.13, sy: 0.055, r: 0.6 },
    { x: -0.38, y: 0.18, z: 0.369, sx: 0.10, sy: 0.045, r: -0.4 },
  ];
  for (const patch of rustPatchData) {
    const patchGeom = new THREE.CircleGeometry(1, 14);
    const patchMesh = new THREE.Mesh(patchGeom, rustMat);
    patchMesh.position.set(patch.x, patch.y, patch.z);
    patchMesh.scale.set(patch.sx, patch.sy, 1);
    patchMesh.rotation.z = patch.r;
    head_rust_patches.add(patchMesh);
  }
  hammer.add(head_rust_patches);

  const head_scratches = new THREE.Group();
  const scratchData = [
    [-1.25, 1.48, -1.02, 1.57],
    [-0.72, 1.73, -0.48, 1.77],
    [-0.18, 1.82, 0.08, 1.84],
    [0.42, 1.69, 0.67, 1.61],
    [0.91, 1.45, 1.13, 1.34],
    [1.28, 1.14, 1.42, 0.98],
    [0.72, 0.55, 0.94, 0.48],
  ];
  for (const scratch of scratchData) {
    const scratchGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(scratch[0], scratch[1], 0.374),
        new THREE.Vector3(scratch[2], scratch[3], 0.374)
      ),
      1,
      0.006,
      5,
      false
    );
    const scratchMesh = new THREE.Mesh(scratchGeom, wornMetalMat);
    head_scratches.add(scratchMesh);
  }
  hammer.add(head_scratches);

  const claw_tip_wearGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.73, 1.20, 0.371),
      new THREE.Vector3(-1.48, 1.47, 0.371),
      new THREE.Vector3(-1.12, 1.67, 0.371),
      new THREE.Vector3(-0.72, 1.79, 0.371),
    ]),
    18,
    0.018,
    6,
    false
  );
  const claw_tip_wear = new THREE.Mesh(claw_tip_wearGeom, wornMetalMat);
  hammer.add(claw_tip_wear);

  const striking_face_wearGeom = new THREE.BoxGeometry(0.34, 0.17, 0.66);
  const striking_face_wear = new THREE.Mesh(striking_face_wearGeom, wornMetalMat);
  striking_face_wear.position.set(1.66, 0.80, 0);
  striking_face_wear.rotation.z = -0.28;
  hammer.add(striking_face_wear);

  const striking_faceGeom = new THREE.BoxGeometry(0.10, 0.27, 0.72);
  const striking_face = new THREE.Mesh(striking_faceGeom, headMat);
  striking_face.position.set(1.83, 0.80, 0);
  striking_face.rotation.z = -0.28;
  hammer.add(striking_face);

  const maker_stamp = new THREE.Group();
  const stampBarGeom = new THREE.BoxGeometry(0.12, 0.025, 0.018);
  const stampPositions = [
    [0.58, 1.20, 0.378, 0, 0.72],
    [0.72, 1.20, 0.378, 0, 0.72],
    [0.86, 1.20, 0.378, 0, 0.72],
    [0.65, 1.10, 0.378, Math.PI / 2, 0.55],
    [0.79, 1.10, 0.378, Math.PI / 2, 0.55],
    [0.93, 1.10, 0.378, Math.PI / 2, 0.55],
    [0.68, 1.00, 0.378, 0, 0.48],
    [0.82, 1.00, 0.378, 0, 0.48],
  ];
  for (const mark of stampPositions) {
    const stampBar = new THREE.Mesh(stampBarGeom, stampMat);
    stampBar.position.set(mark[0], mark[1], mark[2]);
    stampBar.rotation.z = mark[3];
    stampBar.scale.set(mark[4], 1, 1);
    maker_stamp.add(stampBar);
  }
  hammer.add(maker_stamp);

  hammer.rotation.z = 0.62;

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}