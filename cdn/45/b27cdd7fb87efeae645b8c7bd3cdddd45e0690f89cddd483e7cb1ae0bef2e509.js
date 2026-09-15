export default function generate(THREE) {
  const root = new THREE.Group();

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x343638,
    metalness: 0.5,
    roughness: 0.7,
  });
  const ferruleMat = new THREE.MeshStandardMaterial({
    color: 0x202326,
    metalness: 0.5,
    roughness: 0.65,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6338,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x4d2d18,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x7b4327,
    metalness: 0.1,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x858585,
    metalness: 0.2,
    roughness: 0.8,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x100b08,
    metalness: 0.0,
    roughness: 0.9,
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.25, -0.12);
  bladeShape.lineTo(0.25, -0.12);
  bladeShape.bezierCurveTo(0.34, -0.02, 0.48, 0.12, 0.58, 0.25);
  bladeShape.lineTo(0.58, 1.38);
  bladeShape.bezierCurveTo(0.58, 1.53, 0.48, 1.62, 0.34, 1.64);
  bladeShape.lineTo(-0.34, 1.64);
  bladeShape.bezierCurveTo(-0.48, 1.62, -0.58, 1.53, -0.58, 1.38);
  bladeShape.lineTo(-0.58, 0.25);
  bladeShape.bezierCurveTo(-0.48, 0.12, -0.34, -0.02, -0.25, -0.12);
  bladeShape.closePath();

  const bladeThickness = 0.045;
  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
    depth: bladeThickness,
    steps: 1,
    curveSegments: 12,
  });
  bladeGeo.translate(0, 0, -bladeThickness / 2);
  const blade = new THREE.Mesh(bladeGeo, bladeMat);
  blade.rotation.x = Math.PI / 2;
  root.add(blade);

  const bladeRidgeShape = new THREE.Shape();
  bladeRidgeShape.moveTo(-0.105, -0.18);
  bladeRidgeShape.bezierCurveTo(-0.12, 0.18, -0.19, 0.72, -0.22, 1.08);
  bladeRidgeShape.bezierCurveTo(-0.23, 1.25, -0.18, 1.42, -0.12, 1.52);
  bladeRidgeShape.lineTo(0.12, 1.52);
  bladeRidgeShape.bezierCurveTo(0.18, 1.42, 0.23, 1.25, 0.22, 1.08);
  bladeRidgeShape.bezierCurveTo(0.19, 0.72, 0.12, 0.18, 0.105, -0.18);
  bladeRidgeShape.closePath();

  const bladeRidgeThickness = 0.025;
  const blade_ridgeGeom = new THREE.ExtrudeGeometry(bladeRidgeShape, {
    depth: bladeRidgeThickness,
    steps: 1,
    curveSegments: 10,
  });
  blade_ridgeGeom.translate(0, 0, -bladeRidgeThickness / 2);
  const blade_ridge = new THREE.Mesh(blade_ridgeGeom, bladeMat);
  blade_ridge.rotation.x = Math.PI / 2;
  blade_ridge.position.y = 0.035;
  root.add(blade_ridge);

  const tangGeom = new THREE.CylinderGeometry(0.115, 0.105, 0.5, 16);
  const tang = new THREE.Mesh(tangGeom, ferruleMat);
  tang.rotation.x = Math.PI / 2;
  tang.position.set(0, 0.075, -0.25);
  root.add(tang);

  const ferruleGeom = new THREE.CylinderGeometry(0.18, 0.155, 0.52, 24);
  const ferrule = new THREE.Mesh(ferruleGeom, ferruleMat);
  ferrule.rotation.x = Math.PI / 2;
  ferrule.position.set(0, 0.11, -0.58);
  root.add(ferrule);

  const handleFrontZ = -0.82;
  const handleLength = 1.9;
  const handleCenterZ = handleFrontZ - handleLength / 2;
  const handleRadius = 0.16;

  const handleGeom = new THREE.CylinderGeometry(
    handleRadius,
    handleRadius,
    handleLength,
    32
  );
  const handle = new THREE.Mesh(handleGeom, woodMat);
  handle.rotation.x = Math.PI / 2;
  handle.position.set(0, 0.11, handleCenterZ);
  root.add(handle);

  const handle_endGeom = new THREE.SphereGeometry(handleRadius, 24, 12);
  const handle_end = new THREE.Mesh(handle_endGeom, woodMat);
  handle_end.scale.set(1, 1, 0.72);
  handle_end.position.set(0, 0.11, handleFrontZ - handleLength);
  root.add(handle_end);

  const hanging_holeGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.012, 20);
  const hanging_hole = new THREE.Mesh(hanging_holeGeom, holeMat);
  hanging_hole.position.set(0, 0.274, -2.39);
  root.add(hanging_hole);

  const hanging_hole_rimGeom = new THREE.TorusGeometry(0.058, 0.007, 8, 20);
  const hanging_hole_rim = new THREE.Mesh(hanging_hole_rimGeom, woodGrainMat);
  hanging_hole_rim.rotation.x = Math.PI / 2;
  hanging_hole_rim.position.set(0, 0.28, -2.39);
  root.add(hanging_hole_rim);

  const wood_grain = new THREE.Group();
  const grainAngles = [0.22, 0.72, 1.18, 1.72, 2.35, 3.05, 3.82, 4.72, 5.55];
  for (let i = 0; i < grainAngles.length; i++) {
    const points = [];
    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      const angle = grainAngles[i] + Math.sin((j + 1) * (i + 2) * 0.37) * 0.025;
      const radius = handleRadius + 0.003;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0.11 + Math.sin(angle) * radius,
        -0.91 - t * 1.62
      ));
    }
    const grainCurve = new THREE.CatmullRomCurve3(points);
    const grainGeom = new THREE.TubeGeometry(grainCurve, 16, 0.0035, 5, false);
    const grain = new THREE.Mesh(grainGeom, woodGrainMat);
    wood_grain.add(grain);
  }
  root.add(wood_grain);

  const rust_spotsGeom = new THREE.CircleGeometry(1, 12);
  const rust_spots = new THREE.InstancedMesh(rust_spotsGeom, rustMat, 26);
  const rustDummy = new THREE.Object3D();
  for (let i = 0; i < 26; i++) {
    const z = 0.12 + (((i * 37) % 100) / 100) * 1.35;
    const halfWidth = z < 0.3 ? 0.36 + (z - 0.12) * 0.65 : 0.52;
    const x = -halfWidth + (((i * 61) % 100) / 100) * halfWidth * 2;
    const sx = 0.018 + ((i * 19) % 9) * 0.006;
    const sz = 0.012 + ((i * 23) % 7) * 0.005;
    rustDummy.position.set(x, 0.027, z);
    rustDummy.rotation.set(-Math.PI / 2, 0, (i % 8) * 0.31);
    rustDummy.scale.set(sx, sz, 1);
    rustDummy.updateMatrix();
    rust_spots.setMatrixAt(i, rustDummy.matrix);
  }
  rust_spots.instanceMatrix.needsUpdate = true;
  root.add(rust_spots);

  const blade_scratchesGeom = new THREE.BoxGeometry(0.006, 0.004, 0.16);
  const blade_scratches = new THREE.InstancedMesh(
    blade_scratchesGeom,
    scratchMat,
    9
  );
  const scratchDummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    const x = -0.4 + (((i * 29) % 100) / 100) * 0.8;
    const z = 0.28 + (((i * 43) % 100) / 100) * 1.08;
    scratchDummy.position.set(x, 0.029, z);
    scratchDummy.rotation.set(0, ((i % 5) - 2) * 0.13, 0);
    scratchDummy.scale.set(1, 1, 0.55 + (i % 4) * 0.18);
    scratchDummy.updateMatrix();
    blade_scratches.setMatrixAt(i, scratchDummy.matrix);
  }
  blade_scratches.instanceMatrix.needsUpdate = true;
  root.add(blade_scratches);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}