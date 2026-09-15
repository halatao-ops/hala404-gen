export default function generate(THREE) {
  const root = new THREE.Group();

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xb8bdc2,
    metalness: 0.7,
    roughness: 0.42,
  });
  const cutting_bevelMat = new THREE.MeshStandardMaterial({
    color: 0xd2d5d8,
    metalness: 0.65,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const tangMat = new THREE.MeshStandardMaterial({
    color: 0x747b80,
    metalness: 0.65,
    roughness: 0.5,
  });
  const ferruleMat = new THREE.MeshStandardMaterial({
    color: 0x858b8f,
    metalness: 0.7,
    roughness: 0.38,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x303438,
    metalness: 0.6,
    roughness: 0.55,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xa86b38,
    metalness: 0.0,
    roughness: 0.55,
  });
  const front_wood_collarMat = new THREE.MeshStandardMaterial({
    color: 0x6f3d24,
    metalness: 0.0,
    roughness: 0.58,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x4b2818,
    metalness: 0.0,
    roughness: 0.7,
  });
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0xaeb3b5,
    metalness: 0.7,
    roughness: 0.35,
  });

  const tangShape = new THREE.Shape();
  tangShape.moveTo(-0.31, -0.11);
  tangShape.lineTo(0.31, -0.11);
  tangShape.lineTo(0.31, 0.11);
  tangShape.lineTo(-0.31, 0.11);
  tangShape.closePath();

  const tangGeom = new THREE.ExtrudeGeometry(tangShape, {
    depth: 0.88,
    steps: 1,
  });
  const tang = new THREE.Mesh(tangGeom, tangMat);
  tang.position.z = -0.48;
  root.add(tang);

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.31, -0.10);
  bladeShape.lineTo(0.31, -0.10);
  bladeShape.bezierCurveTo(0.33, 0.38, 0.39, 0.88, 0.43, 1.38);
  bladeShape.bezierCurveTo(0.47, 2.02, 0.48, 2.72, 0.42, 3.28);
  bladeShape.bezierCurveTo(0.36, 3.82, 0.16, 4.30, -0.18, 4.62);
  bladeShape.bezierCurveTo(-0.34, 4.50, -0.43, 4.18, -0.45, 3.82);
  bladeShape.bezierCurveTo(-0.47, 3.18, -0.44, 2.52, -0.41, 1.92);
  bladeShape.bezierCurveTo(-0.39, 1.34, -0.35, 0.78, -0.33, 0.42);
  bladeShape.lineTo(-0.31, -0.10);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.07,
    steps: 1,
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.rotation.x = Math.PI / 2;
  blade.position.y = 0.035;
  root.add(blade);

  const cutting_bevelShape = new THREE.Shape();
  cutting_bevelShape.moveTo(0.295, 0.02);
  cutting_bevelShape.bezierCurveTo(0.32, 0.40, 0.38, 0.90, 0.42, 1.38);
  cutting_bevelShape.bezierCurveTo(0.46, 2.02, 0.47, 2.72, 0.41, 3.28);
  cutting_bevelShape.bezierCurveTo(0.35, 3.82, 0.15, 4.30, -0.18, 4.62);
  cutting_bevelShape.lineTo(-0.08, 4.48);
  cutting_bevelShape.bezierCurveTo(0.13, 4.18, 0.28, 3.78, 0.32, 3.26);
  cutting_bevelShape.bezierCurveTo(0.37, 2.68, 0.36, 2.03, 0.33, 1.40);
  cutting_bevelShape.bezierCurveTo(0.30, 0.88, 0.26, 0.42, 0.245, 0.08);
  cutting_bevelShape.closePath();

  const cutting_bevelGeom = new THREE.ShapeGeometry(cutting_bevelShape, 24);
  const cutting_bevel = new THREE.Mesh(cutting_bevelGeom, cutting_bevelMat);
  cutting_bevel.rotation.x = Math.PI / 2;
  cutting_bevel.position.y = 0.041;
  root.add(cutting_bevel);

  const ferruleGeom = new THREE.CylinderGeometry(0.47, 0.47, 0.42, 32);
  const ferrule = new THREE.Mesh(ferruleGeom, ferruleMat);
  ferrule.rotation.x = Math.PI / 2;
  ferrule.position.z = -0.08;
  root.add(ferrule);

  const ferrule_front_lipGeom = new THREE.TorusGeometry(0.405, 0.055, 10, 32);
  const ferrule_front_lip = new THREE.Mesh(ferrule_front_lipGeom, ferruleMat);
  ferrule_front_lip.position.z = 0.13;
  root.add(ferrule_front_lip);

  const ferrule_rear_seamGeom = new THREE.TorusGeometry(0.455, 0.018, 8, 32);
  const ferrule_rear_seam = new THREE.Mesh(ferrule_rear_seamGeom, dark_metalMat);
  ferrule_rear_seam.position.z = -0.295;
  root.add(ferrule_rear_seam);

  const blade_socketGeom = new THREE.BoxGeometry(0.58, 0.16, 0.035);
  const blade_socket = new THREE.Mesh(blade_socketGeom, dark_metalMat);
  blade_socket.position.set(0, 0, 0.145);
  root.add(blade_socket);

  const handleProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.40, 0.00),
    new THREE.Vector2(0.44, 0.06),
    new THREE.Vector2(0.47, 0.20),
    new THREE.Vector2(0.48, 0.55),
    new THREE.Vector2(0.49, 1.20),
    new THREE.Vector2(0.50, 2.10),
    new THREE.Vector2(0.51, 3.00),
    new THREE.Vector2(0.52, 3.65),
    new THREE.Vector2(0.515, 3.95),
    new THREE.Vector2(0.49, 4.18),
    new THREE.Vector2(0.43, 4.36),
    new THREE.Vector2(0.32, 4.48),
    new THREE.Vector2(0.16, 4.55),
    new THREE.Vector2(0.00, 4.57),
  ];
  const handleGeom = new THREE.LatheGeometry(handleProfile, 40);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.rotation.x = -Math.PI / 2;
  handle.position.z = -0.27;
  root.add(handle);

  const front_wood_collarProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.47, 0.00),
    new THREE.Vector2(0.48, 0.08),
    new THREE.Vector2(0.48, 0.48),
    new THREE.Vector2(0.46, 0.68),
    new THREE.Vector2(0.43, 0.78),
    new THREE.Vector2(0.00, 0.78),
  ];
  const front_wood_collarGeom = new THREE.LatheGeometry(front_wood_collarProfile, 36);
  const front_wood_collar = new THREE.Mesh(front_wood_collarGeom, front_wood_collarMat);
  front_wood_collar.rotation.x = -Math.PI / 2;
  front_wood_collar.position.z = -1.05;
  root.add(front_wood_collar);

  const collar_seamGeom = new THREE.TorusGeometry(0.465, 0.014, 8, 32);
  const collar_seam = new THREE.Mesh(collar_seamGeom, wood_grainMat);
  collar_seam.position.z = -1.045;
  root.add(collar_seam);

  const rivet_rimGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.035, 24);
  const rivet_rim = new THREE.Mesh(rivet_rimGeom, dark_metalMat);
  rivet_rim.position.set(0, 0.485, -0.72);
  root.add(rivet_rim);

  const collar_rivetGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.045, 24);
  const collar_rivet = new THREE.Mesh(collar_rivetGeom, rivetMat);
  collar_rivet.position.set(0, 0.505, -0.72);
  root.add(collar_rivet);

  function handleRadiusAt(t) {
    if (t < 0.18) return 0.44 + 0.04 * (t / 0.18);
    if (t < 0.82) return 0.48 + 0.025 * ((t - 0.18) / 0.64);
    if (t < 0.94) return 0.505 + 0.005 * ((t - 0.82) / 0.12);
    return 0.51 - 0.10 * ((t - 0.94) / 0.06);
  }

  const wood_grain = new THREE.Group();
  for (let i = 0; i < 14; i++) {
    const grainPoints = [];
    const start = 0.08 + (i % 4) * 0.035;
    const end = 0.88 + (i % 3) * 0.035;
    const baseAngle = (i / 14) * Math.PI * 2 + 0.12;

    for (let j = 0; j <= 8; j++) {
      const t = start + (end - start) * (j / 8);
      const angle = baseAngle + 0.025 * Math.sin(t * 12 + i * 0.7);
      const radius = handleRadiusAt(t) + 0.006;
      grainPoints.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -0.27 - t * 4.57
      ));
    }

    const grainCurve = new THREE.CatmullRomCurve3(grainPoints);
    const grainGeom = new THREE.TubeGeometry(grainCurve, 24, 0.006, 5, false);
    const grain = new THREE.Mesh(grainGeom, wood_grainMat);
    wood_grain.add(grain);
  }
  root.add(wood_grain);

  const collar_grain = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const grainPoints = [];
    const baseAngle = (i / 6) * Math.PI * 2 + 0.28;

    for (let j = 0; j <= 4; j++) {
      const t = j / 4;
      const angle = baseAngle + 0.018 * Math.sin(t * Math.PI * 2 + i);
      const radius = 0.482;
      grainPoints.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -1.00 + t * 0.62
      ));
    }

    const grainCurve = new THREE.CatmullRomCurve3(grainPoints);
    const grainGeom = new THREE.TubeGeometry(grainCurve, 12, 0.005, 5, false);
    const grain = new THREE.Mesh(grainGeom, wood_grainMat);
    collar_grain.add(grain);
  }
  root.add(collar_grain);

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