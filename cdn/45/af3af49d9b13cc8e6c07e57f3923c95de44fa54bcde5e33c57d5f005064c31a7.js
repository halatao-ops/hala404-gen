export default function generate(THREE) {
  const root = new THREE.Group();

  const bowlMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ef,
    metalness: 0.0,
    roughness: 0.22,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.25,
  });
  const brothMat = new THREE.MeshStandardMaterial({
    color: 0x9b6428,
    metalness: 0.0,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const broth_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x6f431d,
    metalness: 0.0,
    roughness: 0.55,
  });
  const noodleMat = new THREE.MeshStandardMaterial({
    color: 0xf1dfb5,
    metalness: 0.0,
    roughness: 0.55,
  });
  const meatMat = new THREE.MeshStandardMaterial({
    color: 0x8b4526,
    metalness: 0.0,
    roughness: 0.65,
  });
  const meat_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x5b2b18,
    metalness: 0.0,
    roughness: 0.7,
  });
  const scallionMat = new THREE.MeshStandardMaterial({
    color: 0x2f962f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const scallion_lightMat = new THREE.MeshStandardMaterial({
    color: 0x74b956,
    metalness: 0.0,
    roughness: 0.7,
  });
  const garnishMat = new THREE.MeshStandardMaterial({
    color: 0x1f6b2a,
    metalness: 0.0,
    roughness: 0.75,
  });

  const bowlProfile = [
    new THREE.Vector2(0.00, -0.58),
    new THREE.Vector2(0.38, -0.58),
    new THREE.Vector2(0.52, -0.54),
    new THREE.Vector2(0.68, -0.45),
    new THREE.Vector2(0.84, -0.30),
    new THREE.Vector2(1.00, -0.08),
    new THREE.Vector2(1.14, 0.18),
    new THREE.Vector2(1.25, 0.43),
    new THREE.Vector2(1.31, 0.56),
    new THREE.Vector2(1.31, 0.61),
    new THREE.Vector2(1.27, 0.66),
    new THREE.Vector2(1.20, 0.62),
    new THREE.Vector2(1.16, 0.52),
    new THREE.Vector2(1.08, 0.31),
    new THREE.Vector2(0.95, 0.05),
    new THREE.Vector2(0.78, -0.18),
    new THREE.Vector2(0.58, -0.35),
    new THREE.Vector2(0.36, -0.44),
    new THREE.Vector2(0.00, -0.44),
  ];
  const bowl_shellGeom = new THREE.LatheGeometry(bowlProfile);
  const bowl_shell = new THREE.Mesh(bowl_shellGeom, bowlMat);
  root.add(bowl_shell);

  const footProfile = [
    new THREE.Vector2(0.00, -0.72),
    new THREE.Vector2(0.42, -0.72),
    new THREE.Vector2(0.50, -0.69),
    new THREE.Vector2(0.54, -0.64),
    new THREE.Vector2(0.52, -0.58),
    new THREE.Vector2(0.44, -0.55),
    new THREE.Vector2(0.00, -0.55),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile);
  const foot = new THREE.Mesh(footGeom, bowlMat);
  root.add(foot);

  const foot_ringGeom = new THREE.TorusGeometry(0.47, 0.018, 10, 64);
  const foot_ring = new THREE.Mesh(foot_ringGeom, bowlMat);
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = -0.69;
  root.add(foot_ring);

  const black_rimGeom = new THREE.TorusGeometry(1.285, 0.047, 14, 96);
  const black_rim = new THREE.Mesh(black_rimGeom, rimMat);
  black_rim.rotation.x = Math.PI / 2;
  black_rim.position.y = 0.615;
  root.add(black_rim);

  const broth_surfaceGeom = new THREE.CircleGeometry(1.13, 96);
  const broth_surface = new THREE.Mesh(broth_surfaceGeom, brothMat);
  broth_surface.rotation.x = -Math.PI / 2;
  broth_surface.position.y = 0.49;
  root.add(broth_surface);

  const broth_edgeGeom = new THREE.TorusGeometry(1.115, 0.012, 8, 96);
  const broth_edge = new THREE.Mesh(broth_edgeGeom, broth_edgeMat);
  broth_edge.rotation.x = Math.PI / 2;
  broth_edge.position.y = 0.495;
  root.add(broth_edge);

  function addNoodle(points, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 48, radius, 10, false);
    const mesh = new THREE.Mesh(geom, noodleMat);
    root.add(mesh);
    return mesh;
  }

  const noodle_loop_left = addNoodle([
    new THREE.Vector3(-0.98, 0.535, 0.05),
    new THREE.Vector3(-0.86, 0.555, -0.25),
    new THREE.Vector3(-0.58, 0.565, -0.43),
    new THREE.Vector3(-0.28, 0.555, -0.34),
    new THREE.Vector3(-0.20, 0.545, -0.08),
    new THREE.Vector3(-0.42, 0.545, 0.14),
    new THREE.Vector3(-0.72, 0.54, 0.18),
  ], 0.045);

  const noodle_loop_center = addNoodle([
    new THREE.Vector3(-0.58, 0.54, 0.30),
    new THREE.Vector3(-0.35, 0.565, 0.04),
    new THREE.Vector3(-0.05, 0.575, -0.16),
    new THREE.Vector3(0.25, 0.565, -0.10),
    new THREE.Vector3(0.38, 0.55, 0.12),
    new THREE.Vector3(0.20, 0.545, 0.32),
    new THREE.Vector3(-0.10, 0.54, 0.40),
  ], 0.047);

  const noodle_loop_right = addNoodle([
    new THREE.Vector3(0.28, 0.535, 0.36),
    new THREE.Vector3(0.55, 0.56, 0.16),
    new THREE.Vector3(0.82, 0.565, 0.02),
    new THREE.Vector3(0.98, 0.55, -0.20),
    new THREE.Vector3(0.82, 0.545, -0.38),
    new THREE.Vector3(0.55, 0.54, -0.34),
    new THREE.Vector3(0.42, 0.535, -0.14),
  ], 0.045);

  const noodle_loop_back = addNoodle([
    new THREE.Vector3(-0.72, 0.525, -0.42),
    new THREE.Vector3(-0.48, 0.545, -0.62),
    new THREE.Vector3(-0.12, 0.55, -0.68),
    new THREE.Vector3(0.18, 0.545, -0.58),
    new THREE.Vector3(0.32, 0.535, -0.40),
    new THREE.Vector3(0.18, 0.53, -0.25),
  ], 0.043);

  const noodle_loop_front = addNoodle([
    new THREE.Vector3(-0.82, 0.53, 0.42),
    new THREE.Vector3(-0.58, 0.555, 0.58),
    new THREE.Vector3(-0.25, 0.565, 0.62),
    new THREE.Vector3(0.05, 0.56, 0.52),
    new THREE.Vector3(0.20, 0.55, 0.34),
    new THREE.Vector3(0.05, 0.54, 0.22),
  ], 0.046);

  const noodle_loop_small = addNoodle([
    new THREE.Vector3(0.52, 0.535, 0.48),
    new THREE.Vector3(0.72, 0.555, 0.38),
    new THREE.Vector3(0.86, 0.55, 0.20),
    new THREE.Vector3(0.78, 0.545, 0.04),
    new THREE.Vector3(0.58, 0.54, 0.02),
    new THREE.Vector3(0.48, 0.535, 0.18),
  ], 0.044);

  const meat_slice_leftGeom = new THREE.BoxGeometry(0.46, 0.12, 0.25);
  const meat_slice_left = new THREE.Mesh(meat_slice_leftGeom, meatMat);
  meat_slice_left.position.set(-0.28, 0.57, 0.18);
  meat_slice_left.rotation.set(0.08, -0.38, 0.08);
  root.add(meat_slice_left);

  const meat_slice_centerGeom = new THREE.BoxGeometry(0.38, 0.11, 0.23);
  const meat_slice_center = new THREE.Mesh(meat_slice_centerGeom, meatMat);
  meat_slice_center.position.set(0.08, 0.585, 0.08);
  meat_slice_center.rotation.set(-0.06, 0.48, -0.08);
  root.add(meat_slice_center);

  const meat_slice_rightGeom = new THREE.BoxGeometry(0.34, 0.10, 0.21);
  const meat_slice_right = new THREE.Mesh(meat_slice_rightGeom, meat_edgeMat);
  meat_slice_right.position.set(0.34, 0.565, -0.08);
  meat_slice_right.rotation.set(0.04, -0.72, 0.06);
  root.add(meat_slice_right);

  const meat_slice_backGeom = new THREE.BoxGeometry(0.32, 0.10, 0.20);
  const meat_slice_back = new THREE.Mesh(meat_slice_backGeom, meatMat);
  meat_slice_back.position.set(-0.05, 0.56, -0.22);
  meat_slice_back.rotation.set(-0.08, 0.18, -0.04);
  root.add(meat_slice_back);

  const meat_grainGeom = new THREE.BoxGeometry(0.34, 0.008, 0.012);
  const meat_grain = new THREE.InstancedMesh(meat_grainGeom, meat_edgeMat, 12);
  const grainDummy = new THREE.Object3D();
  const grainData = [
    [-0.30, 0.635, 0.15, -0.38, 1.00],
    [-0.27, 0.640, 0.20, -0.38, 0.82],
    [-0.24, 0.645, 0.24, -0.38, 0.65],
    [0.06, 0.645, 0.05, 0.48, 0.82],
    [0.09, 0.650, 0.10, 0.48, 0.68],
    [0.12, 0.645, 0.14, 0.48, 0.52],
    [0.32, 0.620, -0.10, -0.72, 0.70],
    [0.35, 0.625, -0.06, -0.72, 0.55],
    [-0.07, 0.615, -0.24, 0.18, 0.72],
    [-0.04, 0.620, -0.20, 0.18, 0.58],
    [-0.34, 0.625, 0.11, -0.38, 0.48],
    [0.16, 0.635, 0.13, 0.48, 0.45],
  ];
  for (let i = 0; i < grainData.length; i++) {
    const g = grainData[i];
    grainDummy.position.set(g[0], g[1], g[2]);
    grainDummy.rotation.set(0, g[3], 0);
    grainDummy.scale.set(g[4], 1, 1);
    grainDummy.updateMatrix();
    meat_grain.setMatrixAt(i, grainDummy.matrix);
  }
  root.add(meat_grain);

  const scallion_pieceGeom = new THREE.BoxGeometry(0.15, 0.035, 0.065);
  const scallion_pieces = new THREE.InstancedMesh(scallion_pieceGeom, scallionMat, 24);
  const scallionDummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.04 + (i % 6) * 0.045;
    scallionDummy.position.set(
      Math.cos(angle) * radius,
      0.655 + (i % 4) * 0.018,
      0.08 + Math.sin(angle) * radius
    );
    scallionDummy.rotation.set(
      ((i % 3) - 1) * 0.28,
      angle * 1.7,
      ((i % 5) - 2) * 0.12
    );
    scallionDummy.scale.set(
      0.72 + (i % 4) * 0.12,
      1,
      0.75 + (i % 3) * 0.12
    );
    scallionDummy.updateMatrix();
    scallion_pieces.setMatrixAt(i, scallionDummy.matrix);
  }
  root.add(scallion_pieces);

  const scallion_light_pieceGeom = new THREE.BoxGeometry(0.13, 0.032, 0.06);
  const scallion_light_pieces = new THREE.InstancedMesh(
    scallion_light_pieceGeom,
    scallion_lightMat,
    14
  );
  const lightDummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i * 1.73 + 0.4;
    const radius = 0.06 + (i % 5) * 0.05;
    lightDummy.position.set(
      Math.cos(angle) * radius,
      0.67 + (i % 3) * 0.018,
      0.08 + Math.sin(angle) * radius
    );
    lightDummy.rotation.set(
      ((i % 4) - 1.5) * 0.22,
      angle * 1.35,
      ((i % 3) - 1) * 0.18
    );
    lightDummy.scale.set(
      0.75 + (i % 3) * 0.14,
      1,
      0.8 + (i % 2) * 0.15
    );
    lightDummy.updateMatrix();
    scallion_light_pieces.setMatrixAt(i, lightDummy.matrix);
  }
  root.add(scallion_light_pieces);

  const scallion_ringGeom = new THREE.TorusGeometry(0.055, 0.014, 7, 18);
  const scallion_rings = new THREE.InstancedMesh(scallion_ringGeom, scallion_lightMat, 8);
  const ringDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i * 2.1;
    const radius = 0.08 + (i % 3) * 0.06;
    ringDummy.position.set(
      Math.cos(angle) * radius,
      0.69 + (i % 2) * 0.015,
      0.08 + Math.sin(angle) * radius
    );
    ringDummy.rotation.set(
      Math.PI / 2 + ((i % 3) - 1) * 0.25,
      angle,
      ((i % 2) - 0.5) * 0.35
    );
    ringDummy.scale.set(1.0, 0.72, 1.0);
    ringDummy.updateMatrix();
    scallion_rings.setMatrixAt(i, ringDummy.matrix);
  }
  root.add(scallion_rings);

  const garnish_stem_leftGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.02, 0.66, 0.04),
      new THREE.Vector3(-0.22, 0.64, -0.02),
      new THREE.Vector3(-0.42, 0.61, -0.12),
      new THREE.Vector3(-0.62, 0.58, -0.20),
    ], false, "centripetal"),
    24,
    0.012,
    7,
    false
  );
  const garnish_stem_left = new THREE.Mesh(garnish_stem_leftGeom, garnishMat);
  root.add(garnish_stem_left);

  const garnish_stem_rightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.02, 0.66, 0.02),
      new THREE.Vector3(0.22, 0.63, -0.04),
      new THREE.Vector3(0.42, 0.60, -0.14),
      new THREE.Vector3(0.62, 0.57, -0.24),
    ], false, "centripetal"),
    24,
    0.012,
    7,
    false
  );
  const garnish_stem_right = new THREE.Mesh(garnish_stem_rightGeom, garnishMat);
  root.add(garnish_stem_right);

  const garnish_stem_backGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.00, 0.65, 0.00),
      new THREE.Vector3(-0.04, 0.63, -0.18),
      new THREE.Vector3(-0.10, 0.60, -0.36),
      new THREE.Vector3(-0.18, 0.57, -0.52),
    ], false, "centripetal"),
    24,
    0.011,
    7,
    false
  );
  const garnish_stem_back = new THREE.Mesh(garnish_stem_backGeom, garnishMat);
  root.add(garnish_stem_back);

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