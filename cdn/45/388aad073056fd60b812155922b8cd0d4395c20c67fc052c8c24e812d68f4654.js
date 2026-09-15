export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "refrigerator";

  const cabinet = new THREE.Group();
  cabinet.name = "cabinet";
  root.add(cabinet);

  const interior = new THREE.Group();
  interior.name = "interior";
  root.add(interior);

  const produce = new THREE.Group();
  produce.name = "produce";
  root.add(produce);

  const cabinetMat = new THREE.MeshStandardMaterial({
    color: 0xf4f4f2,
    metalness: 0.0,
    roughness: 0.3
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0xe8eef0,
    metalness: 0.0,
    roughness: 0.4
  });
  const gasketMat = new THREE.MeshStandardMaterial({
    color: 0xd7e2e5,
    metalness: 0.0,
    roughness: 0.5
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdcebf2,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.72,
    opacity: 0.28,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const drawerGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xcfe3ec,
    metalness: 0.0,
    roughness: 0.2,
    transmission: 0.62,
    opacity: 0.34,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const shelfMat = new THREE.MeshStandardMaterial({
    color: 0xf2f7f7,
    metalness: 0.0,
    roughness: 0.35
  });
  const darkTrimMat = new THREE.MeshStandardMaterial({
    color: 0x40515a,
    metalness: 0.2,
    roughness: 0.45
  });
  const footMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });

  const cabbageMat = new THREE.MeshStandardMaterial({ color: 0x9fbd83, metalness: 0.0, roughness: 0.8 });
  const darkCabbageMat = new THREE.MeshStandardMaterial({ color: 0x496b3e, metalness: 0.0, roughness: 0.8 });
  const cauliflowerMat = new THREE.MeshStandardMaterial({ color: 0xf1eedc, metalness: 0.0, roughness: 0.85 });
  const leafGreenMat = new THREE.MeshStandardMaterial({ color: 0x4f873f, metalness: 0.0, roughness: 0.8 });
  const leafLightMat = new THREE.MeshStandardMaterial({ color: 0x76a85b, metalness: 0.0, roughness: 0.8 });
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x83ad58, metalness: 0.0, roughness: 0.75 });
  const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xc9362f, metalness: 0.0, roughness: 0.7 });
  const pinkTomatoMat = new THREE.MeshStandardMaterial({ color: 0xd98278, metalness: 0.0, roughness: 0.72 });
  const grapeMat = new THREE.MeshStandardMaterial({ color: 0x8f1f35, metalness: 0.0, roughness: 0.65 });
  const orangeMat = new THREE.MeshStandardMaterial({ color: 0xf28a32, metalness: 0.0, roughness: 0.7 });
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xe8b83e, metalness: 0.0, roughness: 0.72 });
  const melonMat = new THREE.MeshStandardMaterial({ color: 0x355b35, metalness: 0.0, roughness: 0.8 });
  const kiwiMat = new THREE.MeshStandardMaterial({ color: 0x7d813e, metalness: 0.0, roughness: 0.8 });
  const kiwiFleshMat = new THREE.MeshStandardMaterial({ color: 0xb7b86a, metalness: 0.0, roughness: 0.8 });
  const carrotMat = new THREE.MeshStandardMaterial({ color: 0xe87935, metalness: 0.0, roughness: 0.78 });
  const carrotCoreMat = new THREE.MeshStandardMaterial({ color: 0xf3a45d, metalness: 0.0, roughness: 0.8 });
  const onionMat = new THREE.MeshStandardMaterial({ color: 0xe9e5ce, metalness: 0.0, roughness: 0.82 });
  const squashMat = new THREE.MeshStandardMaterial({ color: 0xd99b2c, metalness: 0.0, roughness: 0.78 });
  const hamMat = new THREE.MeshStandardMaterial({ color: 0xd98278, metalness: 0.0, roughness: 0.72 });
  const hamCenterMat = new THREE.MeshStandardMaterial({ color: 0xf2b3a2, metalness: 0.0, roughness: 0.75 });

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  function addRodBetween(parent, name, start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, 8),
      material
    );
    rod.name = name;
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    parent.add(rod);
    return rod;
  }

  const cabinet_back = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 2.90, 0.10),
    cabinetMat
  );
  cabinet_back.name = "cabinet_back";
  cabinet_back.position.set(0, 1.67, -0.43);
  cabinet.add(cabinet_back);

  const left_side = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 2.90, 0.86),
    cabinetMat
  );
  left_side.name = "left_side";
  left_side.position.set(-0.755, 1.67, -0.03);
  cabinet.add(left_side);

  const right_side = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 2.90, 0.86),
    cabinetMat
  );
  right_side.name = "right_side";
  right_side.position.set(0.755, 1.67, -0.03);
  cabinet.add(right_side);

  const top_cap = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.14, 0.86),
    cabinetMat
  );
  top_cap.name = "top_cap";
  top_cap.position.set(0, 3.10, -0.03);
  cabinet.add(top_cap);

  const bottom_plinth = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.18, 0.84),
    cabinetMat
  );
  bottom_plinth.name = "bottom_plinth";
  bottom_plinth.position.set(0, 0.24, -0.02);
  cabinet.add(bottom_plinth);

  const front_left_pillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.20, 2.78, 0.14),
    cabinetMat
  );
  front_left_pillar.name = "front_left_pillar";
  front_left_pillar.position.set(-0.68, 1.67, 0.38);
  cabinet.add(front_left_pillar);

  const front_right_pillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.20, 2.78, 0.14),
    cabinetMat
  );
  front_right_pillar.name = "front_right_pillar";
  front_right_pillar.position.set(0.68, 1.67, 0.38);
  cabinet.add(front_right_pillar);

  const front_top_pillar = new THREE.Mesh(
    new THREE.BoxGeometry(1.36, 0.30, 0.14),
    cabinetMat
  );
  front_top_pillar.name = "front_top_pillar";
  front_top_pillar.position.set(0, 2.99, 0.38);
  cabinet.add(front_top_pillar);

  const front_bottom_pillar = new THREE.Mesh(
    new THREE.BoxGeometry(1.36, 0.38, 0.14),
    cabinetMat
  );
  front_bottom_pillar.name = "front_bottom_pillar";
  front_bottom_pillar.position.set(0, 0.39, 0.38);
  cabinet.add(front_bottom_pillar);

  const left_hinge_cap = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.055, 0.13),
    cabinetMat
  );
  left_hinge_cap.name = "left_hinge_cap";
  left_hinge_cap.position.set(-0.66, 3.185, 0.31);
  cabinet.add(left_hinge_cap);

  const right_hinge_cap = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.055, 0.13),
    cabinetMat
  );
  right_hinge_cap.name = "right_hinge_cap";
  right_hinge_cap.position.set(0.66, 3.185, 0.31);
  cabinet.add(right_hinge_cap);

  const left_hinge_seam = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.012, 0.10),
    darkTrimMat
  );
  left_hinge_seam.name = "left_hinge_seam";
  left_hinge_seam.position.set(-0.66, 3.155, 0.34);
  cabinet.add(left_hinge_seam);

  const right_hinge_seam = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.012, 0.10),
    darkTrimMat
  );
  right_hinge_seam.name = "right_hinge_seam";
  right_hinge_seam.position.set(0.66, 3.155, 0.34);
  cabinet.add(right_hinge_seam);

  const interior_back = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 2.38, 0.035),
    interiorMat
  );
  interior_back.name = "interior_back";
  interior_back.position.set(0, 1.65, -0.365);
  interior.add(interior_back);

  const interior_left_wall = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 2.38, 0.68),
    interiorMat
  );
  interior_left_wall.name = "interior_left_wall";
  interior_left_wall.position.set(-0.555, 1.65, -0.015);
  interior.add(interior_left_wall);

  const interior_right_wall = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 2.38, 0.68),
    interiorMat
  );
  interior_right_wall.name = "interior_right_wall";
  interior_right_wall.position.set(0.555, 1.65, -0.015);
  interior.add(interior_right_wall);

  const interior_ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 0.045, 0.68),
    interiorMat
  );
  interior_ceiling.name = "interior_ceiling";
  interior_ceiling.position.set(0, 2.82, -0.015);
  interior.add(interior_ceiling);

  const interior_floor = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 0.05, 0.68),
    interiorMat
  );
  interior_floor.name = "interior_floor";
  interior_floor.position.set(0, 0.47, -0.015);
  interior.add(interior_floor);

  const upper_glass = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 0.94),
    glassMat
  );
  upper_glass.name = "upper_glass";
  upper_glass.position.set(0, 2.29, 0.335);
  interior.add(upper_glass);

  const middle_glass = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 0.84),
    glassMat
  );
  middle_glass.name = "middle_glass";
  middle_glass.position.set(0, 1.40, 0.335);
  interior.add(middle_glass);

  const lower_glass = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 0.48),
    glassMat
  );
  lower_glass.name = "lower_glass";
  lower_glass.position.set(0, 0.79, 0.335);
  interior.add(lower_glass);

  const upper_shelf = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 0.045, 0.68),
    shelfMat
  );
  upper_shelf.name = "upper_shelf";
  upper_shelf.position.set(0, 1.83, -0.01);
  interior.add(upper_shelf);

  const middle_shelf = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 0.045, 0.68),
    shelfMat
  );
  middle_shelf.name = "middle_shelf";
  middle_shelf.position.set(0, 0.99, -0.01);
  interior.add(middle_shelf);

  const lower_shelf = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 0.045, 0.68),
    shelfMat
  );
  lower_shelf.name = "lower_shelf";
  lower_shelf.position.set(0, 0.49, -0.01);
  interior.add(lower_shelf);

  const shelf_lip_geom = new THREE.CylinderGeometry(0.025, 0.025, 1.10, 12);

  const upper_shelf_lip = new THREE.Mesh(shelf_lip_geom, shelfMat);
  upper_shelf_lip.name = "upper_shelf_lip";
  upper_shelf_lip.rotation.z = Math.PI / 2;
  upper_shelf_lip.position.set(0, 1.83, 0.335);
  interior.add(upper_shelf_lip);

  const middle_shelf_lip = new THREE.Mesh(shelf_lip_geom, shelfMat);
  middle_shelf_lip.name = "middle_shelf_lip";
  middle_shelf_lip.rotation.z = Math.PI / 2;
  middle_shelf_lip.position.set(0, 0.99, 0.335);
  interior.add(middle_shelf_lip);

  const lower_shelf_lip = new THREE.Mesh(shelf_lip_geom, shelfMat);
  lower_shelf_lip.name = "lower_shelf_lip";
  lower_shelf_lip.rotation.z = Math.PI / 2;
  lower_shelf_lip.position.set(0, 0.49, 0.335);
  interior.add(lower_shelf_lip);

  const shelf_support_geom = new THREE.BoxGeometry(0.035, 0.16, 0.035);
  const shelf_supports = new THREE.InstancedMesh(shelf_support_geom, darkTrimMat, 8);
  shelf_supports.name = "shelf_supports";
  let support_index = 0;
  for (const y of [1.76, 0.92, 0.42]) {
    for (const x of [-0.515, 0.515]) {
      setInstance(shelf_supports, support_index++, x, y, 0.275, 0, 0, 0, 1, 1, 1);
    }
  }
  shelf_supports.instanceMatrix.needsUpdate = true;
  interior.add(shelf_supports);

  const drawer_front = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.56, 0.025),
    drawerGlassMat
  );
  drawer_front.name = "drawer_front";
  drawer_front.position.set(0, 0.70, 0.365);
  interior.add(drawer_front);

  const drawer_left_rail = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.58, 0.045),
    darkTrimMat
  );
  drawer_left_rail.name = "drawer_left_rail";
  drawer_left_rail.position.set(-0.555, 0.70, 0.385);
  interior.add(drawer_left_rail);

  const drawer_right_rail = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.58, 0.045),
    darkTrimMat
  );
  drawer_right_rail.name = "drawer_right_rail";
  drawer_right_rail.position.set(0.555, 0.70, 0.385);
  interior.add(drawer_right_rail);

  const drawer_top_rail = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 0.045, 0.045),
    darkTrimMat
  );
  drawer_top_rail.name = "drawer_top_rail";
  drawer_top_rail.position.set(0, 0.99, 0.385);
  interior.add(drawer_top_rail);

  const drawer_bottom_rail = new THREE.Mesh(
    new THREE.BoxGeometry(1.10, 0.045, 0.045),
    darkTrimMat
  );
  drawer_bottom_rail.name = "drawer_bottom_rail";
  drawer_bottom_rail.position.set(0, 0.42, 0.385);
  interior.add(drawer_bottom_rail);

  const drawer_handle = new THREE.Mesh(
    new THREE.BoxGeometry(1.02, 0.065, 0.055),
    darkTrimMat
  );
  drawer_handle.name = "drawer_handle";
  drawer_handle.position.set(0, 0.965, 0.405);
  interior.add(drawer_handle);

  const drawer_handle_highlight = new THREE.Mesh(
    new THREE.BoxGeometry(0.94, 0.018, 0.06),
    shelfMat
  );
  drawer_handle_highlight.name = "drawer_handle_highlight";
  drawer_handle_highlight.position.set(0, 0.985, 0.425);
  interior.add(drawer_handle_highlight);

  const left_gasket = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 2.40, 0.035),
    gasketMat
  );
  left_gasket.name = "left_gasket";
  left_gasket.position.set(-0.575, 1.65, 0.365);
  interior.add(left_gasket);

  const right_gasket = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 2.40, 0.035),
    gasketMat
  );
  right_gasket.name = "right_gasket";
  right_gasket.position.set(0.575, 1.65, 0.365);
  interior.add(right_gasket);

  const top_gasket = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.035, 0.035),
    gasketMat
  );
  top_gasket.name = "top_gasket";
  top_gasket.position.set(0, 2.85, 0.365);
  interior.add(top_gasket);

  const bottom_gasket = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.035, 0.035),
    gasketMat
  );
  bottom_gasket.name = "bottom_gasket";
  bottom_gasket.position.set(0, 0.45, 0.365);
  interior.add(bottom_gasket);

  const foot_geom = new THREE.CylinderGeometry(0.07, 0.075, 0.10, 16);
  const feet = new THREE.InstancedMesh(foot_geom, footMat, 4);
  feet.name = "feet";
  const foot_positions = [
    [-0.66, 0.08, 0.30],
    [0.66, 0.08, 0.30],
    [-0.66, 0.08, -0.30],
    [0.66, 0.08, -0.30]
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    const p = foot_positions[i];
    setInstance(feet, i, p[0], p[1], p[2], 0, 0, 0, 1, 1, 1);
  }
  feet.instanceMatrix.needsUpdate = true;
  cabinet.add(feet);

  const cabbage_body = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 20, 12),
    cabbageMat
  );
  cabbage_body.name = "cabbage_body";
  cabbage_body.position.set(-0.27, 2.55, -0.08);
  cabbage_body.scale.set(1.05, 0.88, 0.92);
  produce.add(cabbage_body);

  const cabbage_leaf_geom = new THREE.SphereGeometry(0.11, 12, 8);
  const cabbage_leaves = new THREE.InstancedMesh(cabbage_leaf_geom, darkCabbageMat, 10);
  cabbage_leaves.name = "cabbage_leaves";
  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2;
    const radius = 0.105;
    setInstance(
      cabbage_leaves,
      i,
      -0.27 + Math.cos(angle) * radius,
      2.55 + Math.sin(angle) * radius * 0.78,
      0.075,
      0,
      0,
      angle - Math.PI / 2,
      0.48,
      1.05,
      0.18
    );
  }
  cabbage_leaves.instanceMatrix.needsUpdate = true;
  produce.add(cabbage_leaves);

  const ham_slice = new THREE.Mesh(
    new THREE.CylinderGeometry(0.205, 0.205, 0.055, 28),
    hamMat
  );
  ham_slice.name = "ham_slice";
  ham_slice.rotation.x = Math.PI / 2;
  ham_slice.position.set(-0.39, 2.08, 0.22);
  produce.add(ham_slice);

  const ham_center = new THREE.Mesh(
    new THREE.CylinderGeometry(0.155, 0.155, 0.062, 28),
    hamCenterMat
  );
  ham_center.name = "ham_center";
  ham_center.rotation.x = Math.PI / 2;
  ham_center.position.set(-0.39, 2.08, 0.252);
  produce.add(ham_center);

  const ham_center_piece = new THREE.Mesh(
    new THREE.BoxGeometry(0.075, 0.20, 0.018),
    cabinetMat
  );
  ham_center_piece.name = "ham_center_piece";
  ham_center_piece.position.set(-0.39, 2.08, 0.29);
  ham_center_piece.rotation.z = -0.22;
  produce.add(ham_center_piece);

  const ham_slice_mark = new THREE.Mesh(
    new THREE.BoxGeometry(0.025, 0.13, 0.018),
    cabinetMat
  );
  ham_slice_mark.name = "ham_slice_mark";
  ham_slice_mark.position.set(-0.31, 2.12, 0.292);
  ham_slice_mark.rotation.z = -0.65;
  produce.add(ham_slice_mark);

  const cauliflower_core = new THREE.Mesh(
    new THREE.SphereGeometry(0.20, 18, 12),
    cauliflowerMat
  );
  cauliflower_core.name = "cauliflower_core";
  cauliflower_core.position.set(0.35, 2.12, 0.08);
  cauliflower_core.scale.set(1.0, 0.85, 0.9);
  produce.add(cauliflower_core);

  const cauliflower_floret_geom = new THREE.SphereGeometry(0.055, 10, 8);
  const cauliflower_florets = new THREE.InstancedMesh(
    cauliflower_floret_geom,
    cauliflowerMat,
    18
  );
  cauliflower_florets.name = "cauliflower_florets";
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.045 + (i % 4) * 0.035;
    const scale = 0.78 + (i % 3) * 0.12;
    setInstance(
      cauliflower_florets,
      i,
      0.35 + Math.cos(angle) * radius,
      2.12 + Math.sin(angle) * radius * 0.72,
      0.20 + (i % 2) * 0.025,
      0,
      0,
      angle,
      scale,
      scale,
      scale
    );
  }
  cauliflower_florets.instanceMatrix.needsUpdate = true;
  produce.add(cauliflower_florets);

  const upper_leafy_stem_geom = new THREE.CylinderGeometry(0.012, 0.014, 0.28, 8);
  const upper_leafy_stems = new THREE.InstancedMesh(
    upper_leafy_stem_geom,
    stemMat,
    7
  );
  upper_leafy_stems.name = "upper_leafy_stems";
  for (let i = 0; i < 7; i++) {
    setInstance(
      upper_leafy_stems,
      i,
      0.25 + i * 0.035,
      2.48 + (i % 2) * 0.025,
      -0.03,
      -0.12 + i * 0.04,
      0,
      -0.22 + i * 0.07,
      1,
      1,
      1
    );
  }
  upper_leafy_stems.instanceMatrix.needsUpdate = true;
  produce.add(upper_leafy_stems);

  const upper_leafy_leaf_geom = new THREE.SphereGeometry(0.075, 10, 8);
  const upper_leafy_leaves = new THREE.InstancedMesh(
    upper_leafy_leaf_geom,
    leafGreenMat,
    14
  );
  upper_leafy_leaves.name = "upper_leafy_leaves";
  for (let i = 0; i < 14; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const stem_index = Math.floor(i / 2);
    setInstance(
      upper_leafy_leaves,
      i,
      0.25 + stem_index * 0.035 + side * (0.035 + (i % 3) * 0.012),
      2.61 + (i % 4) * 0.025,
      0.01 + (i % 3) * 0.018,
      0.15,
      0,
      side * (0.55 + (i % 3) * 0.12),
      0.55,
      1.15,
      0.22
    );
  }
  upper_leafy_leaves.instanceMatrix.needsUpdate = true;
  produce.add(upper_leafy_leaves);

  const middle_leafy_stem_geom = new THREE.CylinderGeometry(0.012, 0.015, 0.30, 8);
  const middle_leafy_stems = new THREE.InstancedMesh(
    middle_leafy_stem_geom,
    stemMat,
    8
  );
  middle_leafy_stems.name = "middle_leafy_stems";
  for (let i = 0; i < 8; i++) {
    setInstance(
      middle_leafy_stems,
      i,
      -0.43 + i * 0.035,
      1.39 + (i % 2) * 0.02,
      -0.04,
      -0.12 + i * 0.035,
      0,
      -0.28 + i * 0.075,
      1,
      1,
      1
    );
  }
  middle_leafy_stems.instanceMatrix.needsUpdate = true;
  produce.add(middle_leafy_stems);

  const middle_leafy_leaf_geom = new THREE.SphereGeometry(0.078, 10, 8);
  const middle_leafy_leaves = new THREE.InstancedMesh(
    middle_leafy_leaf_geom,
    leafGreenMat,
    16
  );
  middle_leafy_leaves.name = "middle_leafy_leaves";
  for (let i = 0; i < 16; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const stem_index = Math.floor(i / 2);
    setInstance(
      middle_leafy_leaves,
      i,
      -0.43 + stem_index * 0.035 + side * (0.035 + (i % 3) * 0.012),
      1.53 + (i % 4) * 0.025,
      0.00 + (i % 3) * 0.018,
      0.12,
      0,
      side * (0.58 + (i % 3) * 0.10),
      0.55,
      1.18,
      0.22
    );
  }
  middle_leafy_leaves.instanceMatrix.needsUpdate = true;
  produce.add(middle_leafy_leaves);

  const middle_tomato_geom = new THREE.SphereGeometry(0.12, 18, 12);
  const middle_tomatoes = new THREE.InstancedMesh(middle_tomato_geom, tomatoMat, 4);
  middle_tomatoes.name = "middle_tomatoes";
  const middle_tomato_positions = [
    [-0.43, 1.15, 0.20],
    [-0.25, 1.17, 0.22],
    [-0.08, 1.14, 0.20],
    [0.05, 1.16, 0.18]
  ];
  for (let i = 0; i < middle_tomato_positions.length; i++) {
    const p = middle_tomato_positions[i];
    setInstance(middle_tomatoes, i, p[0], p[1], p[2], 0, 0, 0, 1, 0.95, 0.95);
  }
  middle_tomatoes.instanceMatrix.needsUpdate = true;
  produce.add(middle_tomatoes);

  const middle_pink_tomatoes = new THREE.InstancedMesh(
    middle_tomato_geom,
    pinkTomatoMat,
    3
  );
  middle_pink_tomatoes.name = "middle_pink_tomatoes";
  setInstance(middle_pink_tomatoes, 0, 0.18, 1.16, 0.20, 0, 0, 0, 1, 1, 1);
  setInstance(middle_pink_tomatoes, 1, 0.31, 1.17, 0.19, 0, 0, 0, 0.95, 0.95, 0.95);
  setInstance(middle_pink_tomatoes, 2, 0.43, 1.18, 0.17, 0, 0, 0, 0.88, 0.88, 0.88);
  middle_pink_tomatoes.instanceMatrix.needsUpdate = true;
  produce.add(middle_pink_tomatoes);

  const middle_yellow_squash = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 20, 12),
    yellowMat
  );
  middle_yellow_squash.name = "middle_yellow_squash";
  middle_yellow_squash.position.set(0.45, 1.19, 0.08);
  middle_yellow_squash.scale.set(0.85, 1.08, 0.85);
  produce.add(middle_yellow_squash);

  const middle_squash_stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.035, 0.09, 10),
    stemMat
  );
  middle_squash_stem.name = "middle_squash_stem";
  middle_squash_stem.position.set(0.45, 1.37, 0.08);
  produce.add(middle_squash_stem);

  const grape_geom = new THREE.SphereGeometry(0.035, 10, 8);
  const grapes = new THREE.InstancedMesh(grape_geom, grapeMat, 12);
  grapes.name = "grapes";
  for (let i = 0; i < 12; i++) {
    const row = Math.floor(i / 4);
    const col = i % 4;
    setInstance(
      grapes,
      i,
      -0.02 + col * 0.045,
      1.10 - row * 0.045,
      0.285 + (i % 2) * 0.012,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  grapes.instanceMatrix.needsUpdate = true;
  produce.add(grapes);

  const lower_melon_geom = new THREE.SphereGeometry(0.17, 20, 12);
  const lower_melons = new THREE.InstancedMesh(lower_melon_geom, melonMat, 2);
  lower_melons.name = "lower_melons";
  setInstance(lower_melons, 0, -0.38, 0.78, 0.08, 0, 0, 0, 1.0, 0.95, 0.95);
  setInstance(lower_melons, 1, -0.12, 0.78, 0.07, 0, 0, 0, 0.92, 0.92, 0.92);
  lower_melons.instanceMatrix.needsUpdate = true;
  produce.add(lower_melons);

  const lower_kiwi = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.055, 24),
    kiwiMat
  );
  lower_kiwi.name = "lower_kiwi";
  lower_kiwi.rotation.x = Math.PI / 2;
  lower_kiwi.position.set(-0.08, 0.78, 0.255);
  produce.add(lower_kiwi);

  const lower_kiwi_flesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.112, 0.112, 0.062, 24),
    kiwiFleshMat
  );
  lower_kiwi_flesh.name = "lower_kiwi_flesh";
  lower_kiwi_flesh.rotation.x = Math.PI / 2;
  lower_kiwi_flesh.position.set(-0.08, 0.78, 0.286);
  produce.add(lower_kiwi_flesh);

  const kiwi_seed_geom = new THREE.SphereGeometry(0.012, 8, 6);
  const kiwi_seeds = new THREE.InstancedMesh(kiwi_seed_geom, footMat, 12);
  kiwi_seeds.name = "kiwi_seeds";
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    setInstance(
      kiwi_seeds,
      i,
      -0.08 + Math.cos(angle) * 0.072,
      0.78 + Math.sin(angle) * 0.072,
      0.322,
      0,
      0,
      angle,
      0.55,
      1.0,
      0.28
    );
  }
  kiwi_seeds.instanceMatrix.needsUpdate = true;
  produce.add(kiwi_seeds);

  const lower_red_peppers = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.105, 16, 10),
    tomatoMat,
    2
  );
  lower_red_peppers.name = "lower_red_peppers";
  setInstance(lower_red_peppers, 0, 0.18, 0.79, 0.22, 0, 0, -0.15, 0.82, 1.0, 0.82);
  setInstance(lower_red_peppers, 1, 0.31, 0.79, 0.22, 0, 0, 0.12, 0.82, 1.0, 0.82);
  lower_red_peppers.instanceMatrix.needsUpdate = true;
  produce.add(lower_red_peppers);

  const lower_orange = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 18, 12),
    orangeMat
  );
  lower_orange.name = "lower_orange";
  lower_orange.position.set(0.45, 0.79, 0.19);
  lower_orange.scale.set(0.95, 1.0, 0.95);
  produce.add(lower_orange);

  const lower_broccoli_core = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 16, 10),
    leafGreenMat
  );
  lower_broccoli_core.name = "lower_broccoli_core";
  lower_broccoli_core.position.set(0.31, 1.02, 0.03);
  lower_broccoli_core.scale.set(1.0, 0.75, 0.9);
  produce.add(lower_broccoli_core);

  const lower_broccoli_floret_geom = new THREE.SphereGeometry(0.055, 10, 8);
  const lower_broccoli_florets = new THREE.InstancedMesh(
    lower_broccoli_floret_geom,
    leafGreenMat,
    12
  );
  lower_broccoli_florets.name = "lower_broccoli_florets";
  for (let i = 0; i < 12; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.035 + (i % 3) * 0.035;
    setInstance(
      lower_broccoli_florets,
      i,
      0.31 + Math.cos(angle) * radius,
      1.04 + Math.sin(angle) * radius * 0.75,
      0.10 + (i % 2) * 0.025,
      0,
      0,
      angle,
      0.85,
      0.85,
      0.85
    );
  }
  lower_broccoli_florets.instanceMatrix.needsUpdate = true;
  produce.add(lower_broccoli_florets);

  const lower_leafy_stem_geom = new THREE.CylinderGeometry(0.012, 0.015, 0.30, 8);
  const lower_leafy_stems = new THREE.InstancedMesh(
    lower_leafy_stem_geom,
    stemMat,
    7
  );
  lower_leafy_stems.name = "lower_leafy_stems";
  for (let i = 0; i < 7; i++) {
    setInstance(
      lower_leafy_stems,
      i,
      0.23 + i * 0.035,
      1.00 + (i % 2) * 0.02,
      -0.02,
      -0.12 + i * 0.04,
      0,
      -0.22 + i * 0.07,
      1,
      1,
      1
    );
  }
  lower_leafy_stems.instanceMatrix.needsUpdate = true;
  produce.add(lower_leafy_stems);

  const lower_leafy_leaves = new THREE.InstancedMesh(
    upper_leafy_leaf_geom,
    leafLightMat,
    14
  );
  lower_leafy_leaves.name = "lower_leafy_leaves";
  for (let i = 0; i < 14; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const stem_index = Math.floor(i / 2);
    setInstance(
      lower_leafy_leaves,
      i,
      0.23 + stem_index * 0.035 + side * 0.04,
      1.13 + (i % 4) * 0.025,
      0.02 + (i % 3) * 0.015,
      0.1,
      0,
      side * (0.55 + (i % 3) * 0.1),
      0.52,
      1.1,
      0.22
    );
  }
  lower_leafy_leaves.instanceMatrix.needsUpdate = true;
  produce.add(lower_leafy_leaves);

  const drawer_leafy_stem_geom = new THREE.CylinderGeometry(0.012, 0.015, 0.28, 8);
  const drawer_leafy_stems = new THREE.InstancedMesh(
    drawer_leafy_stem_geom,
    stemMat,
    10
  );
  drawer_leafy_stems.name = "drawer_leafy_stems";
  for (let i = 0; i < 10; i++) {
    setInstance(
      drawer_leafy_stems,
      i,
      -0.43 + i * 0.035,
      0.72 + (i % 2) * 0.02,
      -0.04,
      -0.12 + i * 0.035,
      0,
      -0.28 + i * 0.075,
      1,
      1,
      1
    );
  }
  drawer_leafy_stems.instanceMatrix.needsUpdate = true;
  produce.add(drawer_leafy_stems);

  const drawer_leafy_leaves = new THREE.InstancedMesh(
    middle_leafy_leaf_geom,
    leafGreenMat,
    20
  );
  drawer_leafy_leaves.name = "drawer_leafy_leaves";
  for (let i = 0; i < 20; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const stem_index = Math.floor(i / 2);
    setInstance(
      drawer_leafy_leaves,
      i,
      -0.43 + stem_index * 0.035 + side * (0.035 + (i % 3) * 0.01),
      0.86 + (i % 4) * 0.025,
      0.00 + (i % 3) * 0.018,
      0.12,
      0,
      side * (0.58 + (i % 3) * 0.10),
      0.55,
      1.18,
      0.22
    );
  }
  drawer_leafy_leaves.instanceMatrix.needsUpdate = true;
  produce.add(drawer_leafy_leaves);

  const drawer_yellow_fruit_geom = new THREE.SphereGeometry(0.105, 16, 10);
  const drawer_yellow_fruits = new THREE.InstancedMesh(
    drawer_yellow_fruit_geom,
    yellowMat,
    3
  );
  drawer_yellow_fruits.name = "drawer_yellow_fruits";
  setInstance(drawer_yellow_fruits, 0, -0.38, 0.72, 0.20, 0, 0, 0, 1, 1, 1);
  setInstance(drawer_yellow_fruits, 1, -0.18, 0.70, 0.21, 0, 0, 0, 0.92, 0.92, 0.92);
  setInstance(drawer_yellow_fruits, 2, 0.02, 0.69, 0.20, 0, 0, 0, 0.82, 0.82, 0.82);
  drawer_yellow_fruits.instanceMatrix.needsUpdate = true;
  produce.add(drawer_yellow_fruits);

  const drawer_squash = new THREE.Mesh(
    new THREE.SphereGeometry(0.105, 16, 10),
    squashMat
  );
  drawer_squash.name = "drawer_squash";
  drawer_squash.position.set(-0.08, 0.61, 0.22);
  drawer_squash.scale.set(0.82, 1.15, 0.82);
  produce.add(drawer_squash);

  const drawer_carrot_slice = new THREE.Mesh(
    new THREE.CylinderGeometry(0.125, 0.125, 0.055, 24),
    carrotMat
  );
  drawer_carrot_slice.name = "drawer_carrot_slice";
  drawer_carrot_slice.rotation.x = Math.PI / 2;
  drawer_carrot_slice.position.set(-0.36, 0.56, 0.275);
  produce.add(drawer_carrot_slice);

  const drawer_carrot_core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.085, 0.062, 24),
    carrotCoreMat
  );
  drawer_carrot_core.name = "drawer_carrot_core";
  drawer_carrot_core.rotation.x = Math.PI / 2;
  drawer_carrot_core.position.set(-0.36, 0.56, 0.307);
  produce.add(drawer_carrot_core);

  const drawer_carrot_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.065, 0.008, 8, 24),
    orangeMat
  );
  drawer_carrot_ring.name = "drawer_carrot_ring";
  drawer_carrot_ring.position.set(-0.36, 0.56, 0.342);
  produce.add(drawer_carrot_ring);

  const drawer_onion_slice = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.055, 24),
    yellowMat
  );
  drawer_onion_slice.name = "drawer_onion_slice";
  drawer_onion_slice.rotation.x = Math.PI / 2;
  drawer_onion_slice.position.set(-0.13, 0.56, 0.275);
  produce.add(drawer_onion_slice);

  const drawer_onion_core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.062, 24),
    onionMat
  );
  drawer_onion_core.name = "drawer_onion_core";
  drawer_onion_core.rotation.x = Math.PI / 2;
  drawer_onion_core.position.set(-0.13, 0.56, 0.307);
  produce.add(drawer_onion_core);

  const drawer_onion_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.058, 0.007, 8, 24),
    squashMat
  );
  drawer_onion_ring.name = "drawer_onion_ring";
  drawer_onion_ring.position.set(-0.13, 0.56, 0.342);
  produce.add(drawer_onion_ring);

  const drawer_onion = new THREE.Mesh(
    new THREE.SphereGeometry(0.105, 16, 10),
    onionMat
  );
  drawer_onion.name = "drawer_onion";
  drawer_onion.position.set(0.20, 0.57, 0.20);
  drawer_onion.scale.set(0.9, 1.0, 0.9);
  produce.add(drawer_onion);

  const drawer_tomatoes = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.095, 16, 10),
    tomatoMat,
    2
  );
  drawer_tomatoes.name = "drawer_tomatoes";
  setInstance(drawer_tomatoes, 0, 0.36, 0.57, 0.22, 0, 0, 0, 0.9, 1.0, 0.9);
  setInstance(drawer_tomatoes, 1, 0.47, 0.58, 0.20, 0, 0, 0, 0.86, 0.96, 0.86);
  drawer_tomatoes.instanceMatrix.needsUpdate = true;
  produce.add(drawer_tomatoes);

  const middle_carrot_top = addRodBetween(
    produce,
    "middle_carrot_top",
    new THREE.Vector3(0.34, 1.27, -0.02),
    new THREE.Vector3(0.27, 1.58, -0.04),
    0.014,
    stemMat
  );

  const middle_carrot_side = addRodBetween(
    produce,
    "middle_carrot_side",
    new THREE.Vector3(0.42, 1.27, -0.02),
    new THREE.Vector3(0.47, 1.55, -0.04),
    0.014,
    stemMat
  );

  const middle_carrot_rear = addRodBetween(
    produce,
    "middle_carrot_rear",
    new THREE.Vector3(0.47, 1.26, -0.04),
    new THREE.Vector3(0.50, 1.52, -0.07),
    0.013,
    stemMat
  );

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