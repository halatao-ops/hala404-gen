export default function generate(THREE) {
  const root = new THREE.Group();
  const cup_group = new THREE.Group();
  const topping_group = new THREE.Group();
  root.add(cup_group, topping_group);

  const cupHeight = 3.0;
  const cupBottomY = -1.5;
  const cupTopY = 1.5;
  const cupBottomR = 1.0;
  const cupTopR = 1.22;

  const drinkMat = new THREE.MeshStandardMaterial({
    color: 0xd9ad7d,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.94
  });
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xf0c994,
    metalness: 0.0,
    roughness: 0.7
  });
  const cupMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.2,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.22,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.25,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0x21191c,
    metalness: 0.0,
    roughness: 0.82
  });
  const brownPearlMat = new THREE.MeshStandardMaterial({
    color: 0x5a3028,
    metalness: 0.0,
    roughness: 0.55
  });
  const clearPearlMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe8cf,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.72,
    opacity: 0.76,
    thickness: 0.22
  });
  const pinkPearlMat = new THREE.MeshPhysicalMaterial({
    color: 0xd96f78,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.42,
    opacity: 0.84,
    thickness: 0.18
  });
  const grayPearlMat = new THREE.MeshPhysicalMaterial({
    color: 0x8f9692,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.45,
    opacity: 0.8,
    thickness: 0.18
  });
  const strawberryMat = new THREE.MeshStandardMaterial({
    color: 0xd91f32,
    metalness: 0.0,
    roughness: 0.45
  });
  const strawberrySeedMat = new THREE.MeshStandardMaterial({
    color: 0xffd077,
    metalness: 0.0,
    roughness: 0.65
  });
  const kiwiRindMat = new THREE.MeshStandardMaterial({
    color: 0x426f22,
    metalness: 0.0,
    roughness: 0.75
  });
  const kiwiFleshMat = new THREE.MeshStandardMaterial({
    color: 0xa9d94e,
    metalness: 0.0,
    roughness: 0.58
  });
  const kiwiCoreMat = new THREE.MeshStandardMaterial({
    color: 0xe5e7a0,
    metalness: 0.0,
    roughness: 0.65
  });
  const kiwiSeedMat = new THREE.MeshStandardMaterial({
    color: 0x171511,
    metalness: 0.0,
    roughness: 0.8
  });
  const orangeFruitMat = new THREE.MeshStandardMaterial({
    color: 0xff7b20,
    metalness: 0.0,
    roughness: 0.55
  });
  const orangePulpMat = new THREE.MeshStandardMaterial({
    color: 0xffb342,
    metalness: 0.0,
    roughness: 0.6
  });
  const mangoMat = new THREE.MeshStandardMaterial({
    color: 0xffa92e,
    metalness: 0.0,
    roughness: 0.58
  });
  const peachMat = new THREE.MeshStandardMaterial({
    color: 0xf38d73,
    metalness: 0.0,
    roughness: 0.6
  });

  const drink_body = new THREE.Mesh(
    new THREE.CylinderGeometry(cupTopR, cupBottomR, cupHeight, 64, 1, false),
    drinkMat
  );
  drink_body.position.y = 0;
  cup_group.add(drink_body);

  const bottom_base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.04, 0.99, 0.28, 64),
    drinkMat
  );
  bottom_base.position.y = -1.61;
  cup_group.add(bottom_base);

  const foam_band = new THREE.Mesh(
    new THREE.CylinderGeometry(1.25, 1.21, 0.34, 64),
    foamMat
  );
  foam_band.position.y = 1.34;
  cup_group.add(foam_band);

  const foam_surface = new THREE.Mesh(
    new THREE.CylinderGeometry(1.25, 1.25, 0.055, 64),
    foamMat
  );
  foam_surface.position.y = 1.515;
  cup_group.add(foam_surface);

  const cup_shell = new THREE.Mesh(
    new THREE.CylinderGeometry(1.27, 1.055, 3.08, 64, 1, true),
    cupMat
  );
  cup_shell.position.y = -0.01;
  cup_group.add(cup_shell);

  const top_flange = new THREE.Mesh(
    new THREE.RingGeometry(1.18, 1.39, 64),
    rimMat
  );
  top_flange.rotation.x = -Math.PI / 2;
  top_flange.position.y = 1.535;
  cup_group.add(top_flange);

  const outer_rim = new THREE.Mesh(
    new THREE.TorusGeometry(1.34, 0.055, 12, 64),
    rimMat
  );
  outer_rim.rotation.x = Math.PI / 2;
  outer_rim.position.y = 1.55;
  cup_group.add(outer_rim);

  const inner_rim = new THREE.Mesh(
    new THREE.TorusGeometry(1.205, 0.026, 10, 64),
    rimMat
  );
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 1.525;
  cup_group.add(inner_rim);

  const bottom_rim = new THREE.Mesh(
    new THREE.TorusGeometry(1.015, 0.045, 10, 64),
    cupMat
  );
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = -1.69;
  cup_group.add(bottom_rim);

  function drinkRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - cupBottomY) / cupHeight));
    return cupBottomR + (cupTopR - cupBottomR) * t;
  }

  const bubbleCount = 72;
  const bubbleGeom = new THREE.SphereGeometry(1, 10, 7);
  const bubble_inclusions = new THREE.InstancedMesh(bubbleGeom, bubbleMat, bubbleCount);
  const bubbleDummy = new THREE.Object3D();
  const localNormal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < bubbleCount; i++) {
    const angle = i * 2.3999632297 + (i % 5) * 0.11;
    const y = -1.31 + (((i * 17) % 73) / 72) * 2.48;
    const radius = drinkRadiusAt(y) + 0.008;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const sx = 0.035 + (i % 4) * 0.012;
    const sy = 0.045 + ((i * 3) % 5) * 0.014;

    bubbleDummy.position.set(normal.x * radius, y, normal.z * radius);
    bubbleDummy.quaternion.setFromUnitVectors(localNormal, normal);
    bubbleDummy.scale.set(sx, sy, 0.012);
    bubbleDummy.updateMatrix();
    bubble_inclusions.setMatrixAt(i, bubbleDummy.matrix);
  }
  bubble_inclusions.instanceMatrix.needsUpdate = true;
  cup_group.add(bubble_inclusions);

  const brownPearlData = [
    [-0.72, 1.58, 0.42, 0.17],
    [-0.20, 1.61, 0.73, 0.18],
    [0.38, 1.59, 0.70, 0.17],
    [0.82, 1.58, 0.34, 0.18],
    [0.66, 1.62, -0.34, 0.17],
    [-0.58, 1.62, -0.46, 0.18]
  ];
  const brown_pearls = new THREE.InstancedMesh(
    bubbleGeom,
    brownPearlMat,
    brownPearlData.length
  );
  const pearlDummy = new THREE.Object3D();

  for (let i = 0; i < brownPearlData.length; i++) {
    const p = brownPearlData[i];
    pearlDummy.position.set(p[0], p[1], p[2]);
    pearlDummy.rotation.set(0, i * 0.43, 0);
    pearlDummy.scale.setScalar(p[3]);
    pearlDummy.updateMatrix();
    brown_pearls.setMatrixAt(i, pearlDummy.matrix);
  }
  brown_pearls.instanceMatrix.needsUpdate = true;
  topping_group.add(brown_pearls);

  const clearPearlData = [
    [-0.92, 1.62, 0.18, 0.22],
    [-0.72, 1.72, -0.18, 0.23],
    [-0.48, 1.64, 0.62, 0.24],
    [-0.20, 1.76, 0.18, 0.25],
    [0.08, 1.64, 0.72, 0.25],
    [0.36, 1.76, 0.30, 0.25],
    [0.66, 1.65, 0.58, 0.24],
    [0.90, 1.67, 0.10, 0.23],
    [0.72, 1.76, -0.28, 0.24],
    [0.36, 1.86, -0.10, 0.25],
    [-0.08, 1.88, -0.22, 0.25],
    [-0.50, 1.84, -0.30, 0.24],
    [-0.84, 1.76, -0.38, 0.23],
    [0.02, 1.62, -0.62, 0.23],
    [0.50, 1.62, -0.58, 0.23]
  ];
  const clear_pearls = new THREE.InstancedMesh(
    bubbleGeom,
    clearPearlMat,
    clearPearlData.length
  );

  for (let i = 0; i < clearPearlData.length; i++) {
    const p = clearPearlData[i];
    pearlDummy.position.set(p[0], p[1], p[2]);
    pearlDummy.rotation.set(0, i * 0.31, 0);
    pearlDummy.scale.setScalar(p[3]);
    pearlDummy.updateMatrix();
    clear_pearls.setMatrixAt(i, pearlDummy.matrix);
  }
  clear_pearls.instanceMatrix.needsUpdate = true;
  topping_group.add(clear_pearls);

  const pinkPearlData = [
    [-0.36, 1.61, 0.84, 0.22],
    [-0.94, 1.66, -0.08, 0.21],
    [0.54, 1.62, -0.52, 0.21],
    [0.88, 1.72, -0.12, 0.20]
  ];
  const pink_pearls = new THREE.InstancedMesh(
    bubbleGeom,
    pinkPearlMat,
    pinkPearlData.length
  );

  for (let i = 0; i < pinkPearlData.length; i++) {
    const p = pinkPearlData[i];
    pearlDummy.position.set(p[0], p[1], p[2]);
    pearlDummy.scale.setScalar(p[3]);
    pearlDummy.updateMatrix();
    pink_pearls.setMatrixAt(i, pearlDummy.matrix);
  }
  pink_pearls.instanceMatrix.needsUpdate = true;
  topping_group.add(pink_pearls);

  const grayPearlData = [
    [0.76, 1.82, 0.02, 0.22],
    [0.52, 1.88, -0.36, 0.21]
  ];
  const gray_pearls = new THREE.InstancedMesh(
    bubbleGeom,
    grayPearlMat,
    grayPearlData.length
  );

  for (let i = 0; i < grayPearlData.length; i++) {
    const p = grayPearlData[i];
    pearlDummy.position.set(p[0], p[1], p[2]);
    pearlDummy.scale.setScalar(p[3]);
    pearlDummy.updateMatrix();
    gray_pearls.setMatrixAt(i, pearlDummy.matrix);
  }
  gray_pearls.instanceMatrix.needsUpdate = true;
  topping_group.add(gray_pearls);

  const strawberry_body = new THREE.Mesh(
    new THREE.SphereGeometry(1, 28, 18),
    strawberryMat
  );
  strawberry_body.position.set(-0.55, 2.03, 0.28);
  strawberry_body.scale.set(0.34, 0.43, 0.31);
  strawberry_body.rotation.z = -0.18;
  topping_group.add(strawberry_body);

  const strawberrySeedCount = 28;
  const strawberry_seeds = new THREE.InstancedMesh(
    bubbleGeom,
    strawberrySeedMat,
    strawberrySeedCount
  );
  const seedDummy = new THREE.Object3D();

  for (let i = 0; i < strawberrySeedCount; i++) {
    const v = -0.78 + 1.56 * ((i + 0.5) / strawberrySeedCount);
    const ring = Math.sqrt(Math.max(0, 1 - v * v));
    const angle = i * 2.3999632297;
    const localX = 0.34 * ring * Math.cos(angle);
    const localY = 0.43 * v;
    const localZ = 0.31 * ring * Math.sin(angle);
    const bodyQuaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      -0.18
    );
    const seedPosition = new THREE.Vector3(localX, localY, localZ).applyQuaternion(bodyQuaternion);
    const normal = new THREE.Vector3(
      localX / (0.34 * 0.34),
      localY / (0.43 * 0.43),
      localZ / (0.31 * 0.31)
    ).normalize().applyQuaternion(bodyQuaternion);

    seedDummy.position.set(
      -0.55 + seedPosition.x + normal.x * 0.012,
      2.03 + seedPosition.y + normal.y * 0.012,
      0.28 + seedPosition.z + normal.z * 0.012
    );
    seedDummy.quaternion.setFromUnitVectors(localNormal, normal);
    seedDummy.scale.set(0.022, 0.034, 0.012);
    seedDummy.updateMatrix();
    strawberry_seeds.setMatrixAt(i, seedDummy.matrix);
  }
  strawberry_seeds.instanceMatrix.needsUpdate = true;
  topping_group.add(strawberry_seeds);

  const kiwi_slice = new THREE.Group();
  kiwi_slice.position.set(0.66, 2.12, -0.02);
  kiwi_slice.rotation.set(-0.08, -0.12, -0.34);
  topping_group.add(kiwi_slice);

  const kiwi_rind = new THREE.Mesh(
    new THREE.CylinderGeometry(0.49, 0.49, 0.08, 48),
    kiwiRindMat
  );
  kiwi_rind.rotation.x = Math.PI / 2;
  kiwi_slice.add(kiwi_rind);

  const kiwi_flesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.445, 0.445, 0.086, 48),
    kiwiFleshMat
  );
  kiwi_flesh.rotation.x = Math.PI / 2;
  kiwi_flesh.position.z = 0.012;
  kiwi_slice.add(kiwi_flesh);

  const kiwi_core = new THREE.Mesh(
    new THREE.SphereGeometry(1, 20, 12),
    kiwiCoreMat
  );
  kiwi_core.position.z = 0.065;
  kiwi_core.scale.set(0.105, 0.205, 0.018);
  kiwi_slice.add(kiwi_core);

  const kiwiSeedCount = 18;
  const kiwi_seeds = new THREE.InstancedMesh(
    bubbleGeom,
    kiwiSeedMat,
    kiwiSeedCount
  );

  for (let i = 0; i < kiwiSeedCount; i++) {
    const angle = (i / kiwiSeedCount) * Math.PI * 2;
    const radius = 0.235 + (i % 3) * 0.035;
    seedDummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.074
    );
    seedDummy.rotation.set(0, 0, angle + Math.PI / 2);
    seedDummy.scale.set(0.018, 0.047, 0.012);
    seedDummy.updateMatrix();
    kiwi_seeds.setMatrixAt(i, seedDummy.matrix);
  }
  kiwi_seeds.instanceMatrix.needsUpdate = true;
  kiwi_slice.add(kiwi_seeds);

  const orange_wedge = new THREE.Group();
  orange_wedge.position.set(0.02, 2.02, -0.22);
  orange_wedge.rotation.set(0.04, -0.12, 0.12);
  topping_group.add(orange_wedge);

  const orange_peel = new THREE.Mesh(
    new THREE.ConeGeometry(0.39, 0.76, 32),
    orangeFruitMat
  );
  orange_peel.position.y = 0.38;
  orange_wedge.add(orange_peel);

  const orange_pulp = new THREE.Mesh(
    new THREE.ConeGeometry(0.335, 0.69, 32),
    orangePulpMat
  );
  orange_pulp.position.set(0, 0.36, 0.035);
  orange_wedge.add(orange_pulp);

  const mango_wedge = new THREE.Group();
  mango_wedge.position.set(-0.82, 1.96, -0.24);
  mango_wedge.rotation.set(0.04, 0.12, 0.50);
  topping_group.add(mango_wedge);

  const mango_body = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.78, 0.22),
    mangoMat
  );
  mango_body.position.y = 0.39;
  mango_wedge.add(mango_body);

  const mango_highlight = new THREE.Mesh(
    new THREE.BoxGeometry(0.19, 0.62, 0.018),
    orangePulpMat
  );
  mango_highlight.position.set(0, 0.40, 0.12);
  mango_wedge.add(mango_highlight);

  const peach_chunk = new THREE.Mesh(
    new THREE.SphereGeometry(1, 24, 16),
    peachMat
  );
  peach_chunk.position.set(-0.96, 1.70, 0.18);
  peach_chunk.scale.set(0.27, 0.31, 0.25);
  peach_chunk.rotation.z = -0.25;
  topping_group.add(peach_chunk);

  const cup_highlight = new THREE.Mesh(
    new THREE.PlaneGeometry(0.055, 2.15),
    highlightMat
  );
  const highlightAngle = 2.42;
  const highlightNormal = new THREE.Vector3(
    Math.cos(highlightAngle),
    0,
    Math.sin(highlightAngle)
  );
  cup_highlight.position.set(
    highlightNormal.x * 1.245,
    -0.08,
    highlightNormal.z * 1.245
  );
  cup_highlight.quaternion.setFromUnitVectors(localNormal, highlightNormal);
  cup_group.add(cup_highlight);

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