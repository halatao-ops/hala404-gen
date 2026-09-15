export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "brass_candelabrum";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb58a35,
    metalness: 0.6,
    roughness: 0.4,
  });
  const brightBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd0a84a,
    metalness: 0.6,
    roughness: 0.32,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x76551f,
    metalness: 0.5,
    roughness: 0.5,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x24170d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const flameMat = new THREE.MeshStandardMaterial({
    color: 0xffc36a,
    emissive: 0xff8a24,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const innerFlameMat = new THREE.MeshStandardMaterial({
    color: 0xfff5d2,
    emissive: 0xffd98a,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const base_footProfile = [
    0.00, 0.00,
    0.42, 0.01,
    0.52, 0.035,
    0.56, 0.075,
    0.55, 0.115,
    0.49, 0.155,
    0.39, 0.205,
    0.29, 0.275,
    0.20, 0.365,
    0.14, 0.455,
    0.12, 0.50,
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile);
  const base_foot = new THREE.Mesh(base_footGeom, brassMat);
  base_foot.name = "base_foot";
  base_assembly.add(base_foot);

  const base_rimGeom = new THREE.TorusGeometry(0.515, 0.022, 10, 48);
  const base_rim = new THREE.Mesh(base_rimGeom, brightBrassMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.065;
  base_assembly.add(base_rim);

  const base_shadow_ringGeom = new THREE.TorusGeometry(0.485, 0.009, 8, 48);
  const base_shadow_ring = new THREE.Mesh(base_shadow_ringGeom, darkBrassMat);
  base_shadow_ring.name = "base_shadow_ring";
  base_shadow_ring.rotation.x = Math.PI / 2;
  base_shadow_ring.position.y = 0.125;
  base_assembly.add(base_shadow_ring);

  const lower_stemProfile = [
    0.10, 0.43,
    0.13, 0.49,
    0.12, 0.57,
    0.10, 0.68,
    0.09, 0.82,
    0.10, 0.98,
    0.13, 1.15,
    0.14, 1.27,
    0.13, 1.36,
    0.10, 1.43,
    0.10, 1.49,
  ];
  const lower_stemGeom = new THREE.LatheGeometry(lower_stemProfile);
  const lower_stem = new THREE.Mesh(lower_stemGeom, brassMat);
  lower_stem.name = "lower_stem";
  root.add(lower_stem);

  const lower_stem_collarGeom = new THREE.TorusGeometry(0.12, 0.018, 8, 32);
  const lower_stem_collar = new THREE.Mesh(lower_stem_collarGeom, brightBrassMat);
  lower_stem_collar.name = "lower_stem_collar";
  lower_stem_collar.rotation.x = Math.PI / 2;
  lower_stem_collar.position.y = 0.50;
  root.add(lower_stem_collar);

  const branch_hubProfile = [
    0.10, 1.43,
    0.14, 1.47,
    0.16, 1.52,
    0.16, 1.58,
    0.13, 1.63,
    0.12, 1.69,
    0.15, 1.74,
    0.15, 1.80,
    0.12, 1.85,
    0.10, 1.88,
  ];
  const branch_hubGeom = new THREE.LatheGeometry(branch_hubProfile);
  const branch_hub = new THREE.Mesh(branch_hubGeom, brassMat);
  branch_hub.name = "branch_hub";
  root.add(branch_hub);

  const hub_bandGeom = new THREE.TorusGeometry(0.145, 0.014, 8, 32);
  const hub_bands = new THREE.InstancedMesh(hub_bandGeom, brightBrassMat, 2);
  hub_bands.name = "hub_bands";
  const hub_band_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    hub_band_dummy.position.set(0, i === 0 ? 1.50 : 1.82, 0);
    hub_band_dummy.rotation.set(Math.PI / 2, 0, 0);
    hub_band_dummy.updateMatrix();
    hub_bands.setMatrixAt(i, hub_band_dummy.matrix);
  }
  hub_bands.instanceMatrix.needsUpdate = true;
  root.add(hub_bands);

  const upper_stemProfile = [
    0.10, 1.82,
    0.13, 1.87,
    0.14, 1.93,
    0.12, 1.99,
    0.10, 2.05,
    0.13, 2.12,
    0.15, 2.22,
    0.14, 2.31,
    0.11, 2.39,
    0.09, 2.48,
    0.085, 2.61,
    0.09, 2.75,
    0.11, 2.84,
    0.13, 2.89,
    0.12, 2.94,
  ];
  const upper_stemGeom = new THREE.LatheGeometry(upper_stemProfile);
  const upper_stem = new THREE.Mesh(upper_stemGeom, brassMat);
  upper_stem.name = "upper_stem";
  root.add(upper_stem);

  const upper_stem_collarGeom = new THREE.TorusGeometry(0.12, 0.016, 8, 32);
  const upper_stem_collar = new THREE.Mesh(upper_stem_collarGeom, brightBrassMat);
  upper_stem_collar.name = "upper_stem_collar";
  upper_stem_collar.rotation.x = Math.PI / 2;
  upper_stem_collar.position.y = 1.90;
  root.add(upper_stem_collar);

  const central_plateProfile = [
    0.00, 2.91,
    0.10, 2.92,
    0.22, 2.94,
    0.36, 2.97,
    0.48, 3.00,
    0.51, 3.025,
    0.49, 3.055,
    0.38, 3.075,
    0.22, 3.085,
    0.08, 3.09,
    0.00, 3.09,
  ];
  const central_plateGeom = new THREE.LatheGeometry(central_plateProfile);
  const central_plate = new THREE.Mesh(central_plateGeom, brassMat);
  central_plate.name = "central_plate";
  root.add(central_plate);

  const central_plate_rimGeom = new THREE.TorusGeometry(0.49, 0.015, 8, 48);
  const central_plate_rim = new THREE.Mesh(central_plate_rimGeom, brightBrassMat);
  central_plate_rim.name = "central_plate_rim";
  central_plate_rim.rotation.x = Math.PI / 2;
  central_plate_rim.position.y = 3.025;
  root.add(central_plate_rim);

  const central_plate_stemProfile = [
    0.09, 3.04,
    0.10, 3.08,
    0.08, 3.12,
    0.075, 3.17,
    0.09, 3.21,
    0.09, 3.25,
    0.07, 3.29,
    0.065, 3.34,
  ];
  const central_plate_stemGeom = new THREE.LatheGeometry(central_plate_stemProfile);
  const central_plate_stem = new THREE.Mesh(central_plate_stemGeom, brassMat);
  central_plate_stem.name = "central_plate_stem";
  root.add(central_plate_stem);

  const central_candle_cupProfile = [
    0.00, 3.30,
    0.07, 3.30,
    0.09, 3.34,
    0.12, 3.38,
    0.14, 3.43,
    0.13, 3.48,
    0.10, 3.52,
    0.085, 3.55,
  ];
  const central_candle_cupGeom = new THREE.LatheGeometry(central_candle_cupProfile);
  const central_candle_cup = new THREE.Mesh(central_candle_cupGeom, brightBrassMat);
  central_candle_cup.name = "central_candle_cup";
  root.add(central_candle_cup);

  const central_candle_sleeveGeom = new THREE.CylinderGeometry(0.082, 0.082, 0.44, 24);
  const central_candle_sleeve = new THREE.Mesh(central_candle_sleeveGeom, brassMat);
  central_candle_sleeve.name = "central_candle_sleeve";
  central_candle_sleeve.position.y = 3.77;
  root.add(central_candle_sleeve);

  const central_candle_top_lipGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.025, 24);
  const central_candle_top_lip = new THREE.Mesh(central_candle_top_lipGeom, brightBrassMat);
  central_candle_top_lip.name = "central_candle_top_lip";
  central_candle_top_lip.position.y = 4.00;
  root.add(central_candle_top_lip);

  const central_candle_rimGeom = new THREE.TorusGeometry(0.095, 0.012, 8, 32);
  const central_candle_rim = new THREE.Mesh(central_candle_rimGeom, brightBrassMat);
  central_candle_rim.name = "central_candle_rim";
  central_candle_rim.rotation.x = Math.PI / 2;
  central_candle_rim.position.y = 4.012;
  root.add(central_candle_rim);

  const sidePositions = [
    [-1.45, 2.22],
    [-0.95, 2.27],
    [0.95, 2.27],
    [1.45, 2.22],
  ];

  function makeArm(name, sideX, sideY) {
    const points = [
      new THREE.Vector3(sideX * 0.035, 1.70, 0),
      new THREE.Vector3(sideX * 0.13, 1.91, 0),
      new THREE.Vector3(sideX * 0.29, 2.02, 0),
      new THREE.Vector3(sideX * 0.45, 1.94, 0),
      new THREE.Vector3(sideX * 0.62, 1.67, 0),
      new THREE.Vector3(sideX * 0.82, 1.47, 0),
      new THREE.Vector3(sideX * 1.04, 1.43, 0),
      new THREE.Vector3(sideX * 1.22, 1.57, 0),
      new THREE.Vector3(sideX * 1.36, 1.84, 0),
      new THREE.Vector3(sideX, sideY - 0.34, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 64, 0.045, 10, false);
    const mesh = new THREE.Mesh(geom, brassMat);
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  const left_outer_arm = makeArm("left_outer_arm", -1.45, 2.22);
  const left_inner_arm = makeArm("left_inner_arm", -0.95, 2.27);
  const right_inner_arm = makeArm("right_inner_arm", 0.95, 2.27);
  const right_outer_arm = makeArm("right_outer_arm", 1.45, 2.22);

  function makeScroll(name, sideX) {
    const points = [
      new THREE.Vector3(sideX * 0.08, 1.72, 0.015),
      new THREE.Vector3(sideX * 0.20, 1.87, 0.015),
      new THREE.Vector3(sideX * 0.35, 1.92, 0.015),
      new THREE.Vector3(sideX * 0.47, 1.84, 0.015),
      new THREE.Vector3(sideX * 0.49, 1.72, 0.015),
      new THREE.Vector3(sideX * 0.43, 1.62, 0.015),
      new THREE.Vector3(sideX * 0.32, 1.60, 0.015),
      new THREE.Vector3(sideX * 0.25, 1.67, 0.015),
      new THREE.Vector3(sideX * 0.28, 1.75, 0.015),
    ];
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 40, 0.032, 9, false);
    const mesh = new THREE.Mesh(geom, brightBrassMat);
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  const left_scroll = makeScroll("left_scroll", -1);
  const right_scroll = makeScroll("right_scroll", 1);

  const scroll_terminalGeom = new THREE.SphereGeometry(0.052, 16, 10);
  const scroll_terminals = new THREE.InstancedMesh(scroll_terminalGeom, brightBrassMat, 2);
  scroll_terminals.name = "scroll_terminals";
  const scroll_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    scroll_dummy.position.set(side * 0.28, 1.75, 0.015);
    scroll_dummy.rotation.set(0, 0, 0);
    scroll_dummy.updateMatrix();
    scroll_terminals.setMatrixAt(i, scroll_dummy.matrix);
  }
  scroll_terminals.instanceMatrix.needsUpdate = true;
  root.add(scroll_terminals);

  const branch_jointGeom = new THREE.SphereGeometry(0.07, 18, 12);
  const branch_joints = new THREE.InstancedMesh(branch_jointGeom, brassMat, 4);
  branch_joints.name = "branch_joints";
  const joint_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    joint_dummy.position.set(sidePositions[i][0], 1.72, 0);
    joint_dummy.updateMatrix();
    branch_joints.setMatrixAt(i, joint_dummy.matrix);
  }
  branch_joints.instanceMatrix.needsUpdate = true;
  root.add(branch_joints);

  const side_supportProfile = [
    0.045, -0.34,
    0.075, -0.31,
    0.095, -0.25,
    0.095, -0.18,
    0.075, -0.12,
    0.055, -0.08,
  ];
  const side_supportGeom = new THREE.LatheGeometry(side_supportProfile);
  const side_supports = new THREE.InstancedMesh(side_supportGeom, brassMat, 4);
  side_supports.name = "side_supports";
  const support_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    support_dummy.position.set(sidePositions[i][0], sidePositions[i][1], 0);
    support_dummy.rotation.set(0, 0, 0);
    support_dummy.updateMatrix();
    side_supports.setMatrixAt(i, support_dummy.matrix);
  }
  side_supports.instanceMatrix.needsUpdate = true;
  root.add(side_supports);

  const side_dishProfile = [
    0.00, -0.075,
    0.07, -0.07,
    0.15, -0.045,
    0.22, -0.005,
    0.235, 0.025,
    0.21, 0.055,
    0.12, 0.072,
    0.00, 0.075,
  ];
  const side_dishGeom = new THREE.LatheGeometry(side_dishProfile);
  const side_dishes = new THREE.InstancedMesh(side_dishGeom, brassMat, 4);
  side_dishes.name = "side_dishes";
  const dish_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    dish_dummy.position.set(sidePositions[i][0], sidePositions[i][1], 0);
    dish_dummy.rotation.set(0, 0, 0);
    dish_dummy.updateMatrix();
    side_dishes.setMatrixAt(i, dish_dummy.matrix);
  }
  side_dishes.instanceMatrix.needsUpdate = true;
  root.add(side_dishes);

  const side_dish_rimGeom = new THREE.TorusGeometry(0.218, 0.012, 8, 32);
  const side_dish_rims = new THREE.InstancedMesh(side_dish_rimGeom, brightBrassMat, 4);
  side_dish_rims.name = "side_dish_rims";
  const rim_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    rim_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.025, 0);
    rim_dummy.rotation.set(Math.PI / 2, 0, 0);
    rim_dummy.updateMatrix();
    side_dish_rims.setMatrixAt(i, rim_dummy.matrix);
  }
  side_dish_rims.instanceMatrix.needsUpdate = true;
  root.add(side_dish_rims);

  const side_candle_cupProfile = [
    0.00, 0.04,
    0.06, 0.04,
    0.09, 0.08,
    0.11, 0.14,
    0.11, 0.21,
    0.09, 0.28,
    0.075, 0.32,
  ];
  const side_candle_cupGeom = new THREE.LatheGeometry(side_candle_cupProfile);
  const side_candle_cups = new THREE.InstancedMesh(side_candle_cupGeom, brightBrassMat, 4);
  side_candle_cups.name = "side_candle_cups";
  const cup_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    cup_dummy.position.set(sidePositions[i][0], sidePositions[i][1], 0);
    cup_dummy.rotation.set(0, 0, 0);
    cup_dummy.updateMatrix();
    side_candle_cups.setMatrixAt(i, cup_dummy.matrix);
  }
  side_candle_cups.instanceMatrix.needsUpdate = true;
  root.add(side_candle_cups);

  const side_candle_sleeveGeom = new THREE.CylinderGeometry(0.082, 0.082, 0.42, 24);
  const side_candle_sleeves = new THREE.InstancedMesh(side_candle_sleeveGeom, brassMat, 4);
  side_candle_sleeves.name = "side_candle_sleeves";
  const sleeve_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    sleeve_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.51, 0);
    sleeve_dummy.rotation.set(0, 0, 0);
    sleeve_dummy.updateMatrix();
    side_candle_sleeves.setMatrixAt(i, sleeve_dummy.matrix);
  }
  side_candle_sleeves.instanceMatrix.needsUpdate = true;
  root.add(side_candle_sleeves);

  const side_candle_bandGeom = new THREE.TorusGeometry(0.087, 0.009, 8, 28);
  const side_candle_bands = new THREE.InstancedMesh(side_candle_bandGeom, brightBrassMat, 4);
  side_candle_bands.name = "side_candle_bands";
  const band_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    band_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.39, 0);
    band_dummy.rotation.set(Math.PI / 2, 0, 0);
    band_dummy.updateMatrix();
    side_candle_bands.setMatrixAt(i, band_dummy.matrix);
  }
  side_candle_bands.instanceMatrix.needsUpdate = true;
  root.add(side_candle_bands);

  const side_candle_top_lipGeom = new THREE.CylinderGeometry(0.103, 0.103, 0.025, 24);
  const side_candle_top_lips = new THREE.InstancedMesh(side_candle_top_lipGeom, brightBrassMat, 4);
  side_candle_top_lips.name = "side_candle_top_lips";
  const top_lip_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    top_lip_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.725, 0);
    top_lip_dummy.rotation.set(0, 0, 0);
    top_lip_dummy.updateMatrix();
    side_candle_top_lips.setMatrixAt(i, top_lip_dummy.matrix);
  }
  side_candle_top_lips.instanceMatrix.needsUpdate = true;
  root.add(side_candle_top_lips);

  const side_candle_rimGeom = new THREE.TorusGeometry(0.094, 0.011, 8, 28);
  const side_candle_rims = new THREE.InstancedMesh(side_candle_rimGeom, brightBrassMat, 4);
  side_candle_rims.name = "side_candle_rims";
  const candle_rim_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    candle_rim_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.74, 0);
    candle_rim_dummy.rotation.set(Math.PI / 2, 0, 0);
    candle_rim_dummy.updateMatrix();
    side_candle_rims.setMatrixAt(i, candle_rim_dummy.matrix);
  }
  side_candle_rims.instanceMatrix.needsUpdate = true;
  root.add(side_candle_rims);

  const side_candle_waxGeom = new THREE.CylinderGeometry(0.074, 0.074, 0.012, 24);
  const side_candle_wax = new THREE.InstancedMesh(side_candle_waxGeom, brightBrassMat, 4);
  side_candle_wax.name = "side_candle_wax";
  const wax_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    wax_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.754, 0);
    wax_dummy.rotation.set(0, 0, 0);
    wax_dummy.updateMatrix();
    side_candle_wax.setMatrixAt(i, wax_dummy.matrix);
  }
  side_candle_wax.instanceMatrix.needsUpdate = true;
  root.add(side_candle_wax);

  const side_candle_pinGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const side_candle_pins = new THREE.InstancedMesh(side_candle_pinGeom, darkBrassMat, 8);
  side_candle_pins.name = "side_candle_pins";
  const pin_dummy = new THREE.Object3D();
  let pinIndex = 0;
  for (let i = 0; i < sidePositions.length; i++) {
    for (const pinSide of [-1, 1]) {
      pin_dummy.position.set(
        sidePositions[i][0] + pinSide * 0.095,
        sidePositions[i][1] + 0.62,
        0
      );
      pin_dummy.rotation.set(0, 0, 0);
      pin_dummy.updateMatrix();
      side_candle_pins.setMatrixAt(pinIndex++, pin_dummy.matrix);
    }
  }
  side_candle_pins.instanceMatrix.needsUpdate = true;
  root.add(side_candle_pins);

  const flameProfile = [
    0.00, 0.00,
    0.035, 0.015,
    0.065, 0.075,
    0.075, 0.15,
    0.065, 0.24,
    0.045, 0.34,
    0.022, 0.44,
    0.00, 0.52,
  ];
  const flameGeom = new THREE.LatheGeometry(flameProfile);
  const inner_flameGeom = new THREE.LatheGeometry(flameProfile);

  const central_flame = new THREE.Mesh(flameGeom, flameMat);
  central_flame.name = "central_flame";
  central_flame.position.set(0, 4.015, 0);
  central_flame.scale.set(1.0, 1.0, 0.82);
  root.add(central_flame);

  const central_inner_flame = new THREE.Mesh(inner_flameGeom, innerFlameMat);
  central_inner_flame.name = "central_inner_flame";
  central_inner_flame.position.set(0, 4.025, 0.004);
  central_inner_flame.scale.set(0.48, 0.68, 0.38);
  root.add(central_inner_flame);

  const side_flames = new THREE.InstancedMesh(flameGeom, flameMat, 4);
  side_flames.name = "side_flames";
  const flame_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    flame_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.755, 0);
    flame_dummy.rotation.set(0, 0, 0);
    flame_dummy.scale.set(0.88, 0.92, 0.72);
    flame_dummy.updateMatrix();
    side_flames.setMatrixAt(i, flame_dummy.matrix);
  }
  side_flames.instanceMatrix.needsUpdate = true;
  root.add(side_flames);

  const side_inner_flames = new THREE.InstancedMesh(inner_flameGeom, innerFlameMat, 4);
  side_inner_flames.name = "side_inner_flames";
  const inner_flame_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    inner_flame_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.762, 0.004);
    inner_flame_dummy.rotation.set(0, 0, 0);
    inner_flame_dummy.scale.set(0.42, 0.62, 0.34);
    inner_flame_dummy.updateMatrix();
    side_inner_flames.setMatrixAt(i, inner_flame_dummy.matrix);
  }
  side_inner_flames.instanceMatrix.needsUpdate = true;
  root.add(side_inner_flames);

  const wickGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.10, 8);

  const central_wick = new THREE.Mesh(wickGeom, wickMat);
  central_wick.name = "central_wick";
  central_wick.position.set(0, 4.055, 0.006);
  central_wick.rotation.z = -0.08;
  root.add(central_wick);

  const side_wicks = new THREE.InstancedMesh(wickGeom, wickMat, 4);
  side_wicks.name = "side_wicks";
  const wick_dummy = new THREE.Object3D();
  for (let i = 0; i < sidePositions.length; i++) {
    wick_dummy.position.set(sidePositions[i][0], sidePositions[i][1] + 0.795, 0.006);
    wick_dummy.rotation.set(0, 0, i % 2 === 0 ? -0.08 : 0.08);
    wick_dummy.scale.set(1, 0.9, 1);
    wick_dummy.updateMatrix();
    side_wicks.setMatrixAt(i, wick_dummy.matrix);
  }
  side_wicks.instanceMatrix.needsUpdate = true;
  root.add(side_wicks);

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