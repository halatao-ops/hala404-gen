export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hanging_wooden_lantern";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x76583f,
    metalness: 0.0,
    roughness: 0.82,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4d3527,
    metalness: 0.0,
    roughness: 0.86,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9a7048,
    metalness: 0.0,
    roughness: 0.78,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x3d2b20,
    metalness: 0.0,
    roughness: 0.9,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x292826,
    metalness: 0.55,
    roughness: 0.5,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x171716,
    metalness: 0.5,
    roughness: 0.58,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x8c6a3d,
    metalness: 0.5,
    roughness: 0.45,
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0xb9a58a,
    metalness: 0.0,
    roughness: 0.95,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8e2d8,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.72,
    thickness: 0.025,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const bulbGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffdfad,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.62,
    thickness: 0.018,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffc35c,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffa52f,
    emissiveIntensity: 1.8,
  });
  const hotCoreMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c7,
    metalness: 0.0,
    roughness: 0.35,
    emissive: 0xffd27a,
    emissiveIntensity: 2.2,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addBeam(name, start, end, thickness, depth, mat) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, length, depth),
      mat
    );
    beam.name = name;
    beam.position.copy(start).add(end).multiplyScalar(0.5);
    beam.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    root.add(beam);
    return beam;
  }

  function addTube(name, points, radius, mat, segments) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments || 16, radius, 8, false),
      mat
    );
    tube.name = name;
    root.add(tube);
    return tube;
  }

  const base_reservoir = new THREE.Mesh(
    new THREE.CylinderGeometry(0.43, 0.46, 0.3, 32),
    darkWoodMat
  );
  base_reservoir.name = "base_reservoir";
  base_reservoir.position.y = -1.02;
  root.add(base_reservoir);

  const base_bottom_trim = new THREE.Mesh(
    new THREE.TorusGeometry(0.425, 0.025, 8, 32),
    grainMat
  );
  base_bottom_trim.name = "base_bottom_trim";
  base_bottom_trim.rotation.x = Math.PI / 2;
  base_bottom_trim.position.y = -1.155;
  root.add(base_bottom_trim);

  const base_top_trim = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.022, 8, 32),
    grainMat
  );
  base_top_trim.name = "base_top_trim";
  base_top_trim.rotation.x = Math.PI / 2;
  base_top_trim.position.y = -0.885;
  root.add(base_top_trim);

  const bottom_platform = addBox(
    "bottom_platform",
    1.72,
    0.14,
    1.5,
    woodMat,
    0,
    -0.82,
    0
  );

  const front_bottom_rail = addBox(
    "front_bottom_rail",
    1.58,
    0.2,
    0.13,
    lightWoodMat,
    0,
    -0.68,
    0.68
  );
  const rear_bottom_rail = addBox(
    "rear_bottom_rail",
    1.58,
    0.2,
    0.13,
    woodMat,
    0,
    -0.68,
    -0.68
  );
  const left_bottom_rail = addBox(
    "left_bottom_rail",
    0.13,
    0.2,
    1.25,
    woodMat,
    -0.76,
    -0.68,
    0
  );
  const right_bottom_rail = addBox(
    "right_bottom_rail",
    0.13,
    0.2,
    1.25,
    woodMat,
    0.76,
    -0.68,
    0
  );

  const front_top_rail = addBox(
    "front_top_rail",
    1.58,
    0.2,
    0.14,
    woodMat,
    0,
    0.84,
    0.68
  );
  const rear_top_rail = addBox(
    "rear_top_rail",
    1.58,
    0.2,
    0.14,
    darkWoodMat,
    0,
    0.84,
    -0.68
  );
  const left_top_rail = addBox(
    "left_top_rail",
    0.14,
    0.2,
    1.25,
    darkWoodMat,
    -0.76,
    0.84,
    0
  );
  const right_top_rail = addBox(
    "right_top_rail",
    0.14,
    0.2,
    1.25,
    woodMat,
    0.76,
    0.84,
    0
  );

  const postGeom = new THREE.BoxGeometry(0.17, 1.5, 0.17);
  const corner_posts = new THREE.InstancedMesh(postGeom, woodMat, 4);
  corner_posts.name = "corner_posts";
  const postDummy = new THREE.Object3D();
  const postPositions = [
    [-0.7, 0.08, 0.61],
    [0.7, 0.08, 0.61],
    [-0.7, 0.08, -0.61],
    [0.7, 0.08, -0.61],
  ];
  for (let i = 0; i < postPositions.length; i++) {
    postDummy.position.set(
      postPositions[i][0],
      postPositions[i][1],
      postPositions[i][2]
    );
    postDummy.updateMatrix();
    corner_posts.setMatrixAt(i, postDummy.matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  root.add(corner_posts);

  const post_grainGeom = new THREE.BoxGeometry(0.012, 1.22, 0.008);
  const post_grain_lines = new THREE.InstancedMesh(
    post_grainGeom,
    grainMat,
    8
  );
  post_grain_lines.name = "post_grain_lines";
  const grainDummy = new THREE.Object3D();
  let grainIndex = 0;
  for (const x of [-0.7, 0.7]) {
    for (const offset of [-0.035, 0.035]) {
      grainDummy.position.set(x + offset, 0.08, 0.699);
      grainDummy.rotation.set(0, 0, 0);
      grainDummy.updateMatrix();
      post_grain_lines.setMatrixAt(grainIndex++, grainDummy.matrix);

      grainDummy.position.set(x + offset, 0.08, -0.521);
      grainDummy.rotation.set(0, Math.PI, 0);
      grainDummy.updateMatrix();
      post_grain_lines.setMatrixAt(grainIndex++, grainDummy.matrix);
    }
  }
  post_grain_lines.instanceMatrix.needsUpdate = true;
  root.add(post_grain_lines);

  const left_front_brace = addBeam(
    "left_front_brace",
    new THREE.Vector3(-0.59, -0.55, 0.705),
    new THREE.Vector3(-0.08, 0.48, 0.705),
    0.055,
    0.045,
    lightWoodMat
  );
  const right_front_brace = addBeam(
    "right_front_brace",
    new THREE.Vector3(0.59, -0.55, 0.705),
    new THREE.Vector3(0.08, 0.48, 0.705),
    0.055,
    0.045,
    lightWoodMat
  );
  const left_side_brace = addBeam(
    "left_side_brace",
    new THREE.Vector3(-0.755, -0.5, -0.48),
    new THREE.Vector3(-0.755, 0.48, 0.42),
    0.05,
    0.045,
    darkWoodMat
  );
  const right_side_brace = addBeam(
    "right_side_brace",
    new THREE.Vector3(0.755, -0.5, -0.48),
    new THREE.Vector3(0.755, 0.48, 0.42),
    0.05,
    0.045,
    darkWoodMat
  );

  const frame_boltGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.025,
    14
  );
  const frame_bolts = new THREE.InstancedMesh(
    frame_boltGeom,
    darkMetalMat,
    8
  );
  frame_bolts.name = "frame_bolts";
  const boltDummy = new THREE.Object3D();
  const boltPositions = [
    [-0.7, -0.48, 0.704],
    [-0.7, 0.5, 0.704],
    [0.7, -0.48, 0.704],
    [0.7, 0.5, 0.704],
    [-0.794, -0.42, 0.38],
    [-0.794, 0.46, -0.3],
    [0.794, -0.42, 0.38],
    [0.794, 0.46, -0.3],
  ];
  for (let i = 0; i < boltPositions.length; i++) {
    boltDummy.position.set(
      boltPositions[i][0],
      boltPositions[i][1],
      boltPositions[i][2]
    );
    boltDummy.rotation.set(
      i < 4 ? Math.PI / 2 : 0,
      0,
      i >= 4 ? Math.PI / 2 : 0
    );
    boltDummy.updateMatrix();
    frame_bolts.setMatrixAt(i, boltDummy.matrix);
  }
  frame_bolts.instanceMatrix.needsUpdate = true;
  root.add(frame_bolts);

  const door_hingeGeom = new THREE.BoxGeometry(0.045, 0.16, 0.025);
  const door_hinges = new THREE.InstancedMesh(
    door_hingeGeom,
    darkMetalMat,
    2
  );
  door_hinges.name = "door_hinges";
  const hingeDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    hingeDummy.position.set(0.61, -0.28 + i * 0.52, 0.708);
    hingeDummy.updateMatrix();
    door_hinges.setMatrixAt(i, hingeDummy.matrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  root.add(door_hinges);

  const door_latch_stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.14, 12),
    brassMat
  );
  door_latch_stem.name = "door_latch_stem";
  door_latch_stem.rotation.x = Math.PI / 2;
  door_latch_stem.position.set(-0.62, -0.03, 0.75);
  root.add(door_latch_stem);

  const door_latch_knob = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 16, 10),
    brassMat
  );
  door_latch_knob.name = "door_latch_knob";
  door_latch_knob.position.set(-0.62, -0.03, 0.83);
  root.add(door_latch_knob);

  const lower_glass_panel = addBox(
    "lower_glass_panel",
    1.25,
    1.34,
    0.012,
    glassMat,
    0,
    0.08,
    0.695
  );
  const upper_glass_panel = addBox(
    "upper_glass_panel",
    1.25,
    0.38,
    0.012,
    glassMat,
    0,
    0.82,
    0.695
  );
  const left_glass_panel = addBox(
    "left_glass_panel",
    0.012,
    1.34,
    1.02,
    glassMat,
    -0.705,
    0.08,
    0
  );
  const right_glass_panel = addBox(
    "right_glass_panel",
    0.012,
    1.34,
    1.02,
    glassMat,
    0.705,
    0.08,
    0
  );

  const glass_highlight = addBox(
    "glass_highlight",
    0.025,
    0.72,
    0.006,
    highlightMat,
    -0.34,
    0.12,
    0.705
  );
  glass_highlight.rotation.z = -0.08;

  const burner_base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.22, 0.18, 24),
    darkMetalMat
  );
  burner_base.name = "burner_base";
  burner_base.position.y = -0.59;
  root.add(burner_base);

  const burner_collar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.19, 0.12, 24),
    brassMat
  );
  burner_collar.name = "burner_collar";
  burner_collar.position.y = -0.45;
  root.add(burner_collar);

  const bulbProfile = [
    { r: 0.13, y: -0.43 },
    { r: 0.22, y: -0.34 },
    { r: 0.34, y: -0.12 },
    { r: 0.4, y: 0.16 },
    { r: 0.37, y: 0.38 },
    { r: 0.29, y: 0.58 },
    { r: 0.2, y: 0.72 },
    { r: 0.16, y: 0.82 },
  ];
  const bulbGeom = new THREE.BufferGeometry();
  const bulbPositions = [];
  const bulbIndices = [];
  const bulbSegments = 32;

  for (let i = 0; i < bulbProfile.length; i++) {
    for (let j = 0; j <= bulbSegments; j++) {
      const angle = (j / bulbSegments) * Math.PI * 2;
      bulbPositions.push(
        Math.cos(angle) * bulbProfile[i].r,
        bulbProfile[i].y,
        Math.sin(angle) * bulbProfile[i].r
      );
    }
  }

  for (let i = 0; i < bulbProfile.length - 1; i++) {
    for (let j = 0; j < bulbSegments; j++) {
      const a = i * (bulbSegments + 1) + j;
      const b = a + 1;
      const c = (i + 1) * (bulbSegments + 1) + j;
      const d = c + 1;
      bulbIndices.push(a, c, b, b, c, d);
    }
  }

  bulbGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bulbPositions, 3)
  );
  bulbGeom.setIndex(bulbIndices);
  bulbGeom.computeVertexNormals();

  const bulb = new THREE.Mesh(bulbGeom, bulbGlassMat);
  bulb.name = "bulb";
  root.add(bulb);

  const bulb_neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.155, 0.17, 0.2, 24),
    bulbGlassMat
  );
  bulb_neck.name = "bulb_neck";
  bulb_neck.position.y = 0.82;
  root.add(bulb_neck);

  const upper_socket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.19, 0.34, 24),
    darkMetalMat
  );
  upper_socket.name = "upper_socket";
  upper_socket.position.y = 0.98;
  root.add(upper_socket);

  const socket_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.21, 0.21, 0.07, 24),
    metalMat
  );
  socket_cap.name = "socket_cap";
  socket_cap.position.y = 1.16;
  root.add(socket_cap);

  const glow_orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 24, 16),
    glowMat
  );
  glow_orb.name = "glow_orb";
  glow_orb.position.set(0, 0.03, 0.03);
  glow_orb.scale.set(0.85, 1.25, 0.85);
  root.add(glow_orb);

  const hot_core = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 20, 12),
    hotCoreMat
  );
  hot_core.name = "hot_core";
  hot_core.position.set(0.02, 0.04, 0.1);
  root.add(hot_core);

  const filament = addTube(
    "filament",
    [
      new THREE.Vector3(-0.045, -0.12, 0.08),
      new THREE.Vector3(-0.025, 0.02, 0.1),
      new THREE.Vector3(0.035, 0.14, 0.08),
      new THREE.Vector3(0.02, 0.27, 0.06),
    ],
    0.012,
    hotCoreMat,
    18
  );

  const left_filament_support = addTube(
    "left_filament_support",
    [
      new THREE.Vector3(-0.07, -0.34, 0.03),
      new THREE.Vector3(-0.06, -0.2, 0.06),
      new THREE.Vector3(-0.045, -0.1, 0.08),
    ],
    0.008,
    brassMat,
    10
  );

  const right_filament_support = addTube(
    "right_filament_support",
    [
      new THREE.Vector3(0.07, -0.34, 0.03),
      new THREE.Vector3(0.06, -0.2, 0.06),
      new THREE.Vector3(0.035, -0.1, 0.08),
    ],
    0.008,
    brassMat,
    10
  );

  const main_roof = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 1.22, 0.28, 4, 1, false),
    woodMat
  );
  main_roof.name = "main_roof";
  main_roof.rotation.y = Math.PI / 4;
  main_roof.position.y = 1.07;
  root.add(main_roof);

  const roof_eave_front = addBox(
    "roof_eave_front",
    1.78,
    0.08,
    0.12,
    lightWoodMat,
    0,
    0.94,
    0.86
  );
  const roof_eave_rear = addBox(
    "roof_eave_rear",
    1.78,
    0.08,
    0.12,
    darkWoodMat,
    0,
    0.94,
    -0.86
  );
  const roof_eave_left = addBox(
    "roof_eave_left",
    0.12,
    0.08,
    1.6,
    darkWoodMat,
    -0.86,
    0.94,
    0
  );
  const roof_eave_right = addBox(
    "roof_eave_right",
    0.12,
    0.08,
    1.6,
    woodMat,
    0.86,
    0.94,
    0
  );

  const roof_grainGeom = new THREE.BoxGeometry(0.012, 0.008, 0.78);
  const roof_grain_lines = new THREE.InstancedMesh(
    roof_grainGeom,
    grainMat,
    7
  );
  roof_grain_lines.name = "roof_grain_lines";
  const roofGrainDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    roofGrainDummy.position.set(-0.48 + i * 0.16, 1.215, 0.02);
    roofGrainDummy.rotation.set(0, -0.18 + i * 0.06, 0);
    roofGrainDummy.updateMatrix();
    roof_grain_lines.setMatrixAt(i, roofGrainDummy.matrix);
  }
  roof_grain_lines.instanceMatrix.needsUpdate = true;
  root.add(roof_grain_lines);

  const vent_body = addBox(
    "vent_body",
    0.72,
    0.38,
    0.64,
    darkWoodMat,
    0,
    1.4,
    0
  );

  const vent_front_board = addBox(
    "vent_front_board",
    0.72,
    0.08,
    0.055,
    woodMat,
    0,
    1.55,
    0.345
  );
  const vent_rear_board = addBox(
    "vent_rear_board",
    0.72,
    0.08,
    0.055,
    darkWoodMat,
    0,
    1.55,
    -0.345
  );
  const vent_left_board = addBox(
    "vent_left_board",
    0.055,
    0.08,
    0.59,
    darkWoodMat,
    -0.36,
    1.55,
    0
  );
  const vent_right_board = addBox(
    "vent_right_board",
    0.055,
    0.08,
    0.59,
    woodMat,
    0.36,
    1.55,
    0
  );

  const vent_postGeom = new THREE.BoxGeometry(0.07, 0.38, 0.07);
  const vent_corner_posts = new THREE.InstancedMesh(
    vent_postGeom,
    woodMat,
    4
  );
  vent_corner_posts.name = "vent_corner_posts";
  const ventPostDummy = new THREE.Object3D();
  const ventPostPositions = [
    [-0.325, 1.4, 0.295],
    [0.325, 1.4, 0.295],
    [-0.325, 1.4, -0.295],
    [0.325, 1.4, -0.295],
  ];
  for (let i = 0; i < ventPostPositions.length; i++) {
    ventPostDummy.position.set(
      ventPostPositions[i][0],
      ventPostPositions[i][1],
      ventPostPositions[i][2]
    );
    ventPostDummy.updateMatrix();
    vent_corner_posts.setMatrixAt(i, ventPostDummy.matrix);
  }
  vent_corner_posts.instanceMatrix.needsUpdate = true;
  root.add(vent_corner_posts);

  const vent_slotGeom = new THREE.BoxGeometry(0.052, 0.2, 0.018);
  const vent_slots = new THREE.InstancedMesh(
    vent_slotGeom,
    darkMetalMat,
    16
  );
  vent_slots.name = "vent_slots";
  const slotDummy = new THREE.Object3D();
  let slotIndex = 0;
  for (const x of [-0.22, -0.075, 0.075, 0.22]) {
    slotDummy.position.set(x, 1.39, 0.378);
    slotDummy.rotation.set(0, 0, 0);
    slotDummy.updateMatrix();
    vent_slots.setMatrixAt(slotIndex++, slotDummy.matrix);

    slotDummy.position.set(x, 1.39, -0.378);
    slotDummy.rotation.set(0, Math.PI, 0);
    slotDummy.updateMatrix();
    vent_slots.setMatrixAt(slotIndex++, slotDummy.matrix);

    slotDummy.position.set(-0.388, 1.39, x * 0.82);
    slotDummy.rotation.set(0, -Math.PI / 2, 0);
    slotDummy.updateMatrix();
    vent_slots.setMatrixAt(slotIndex++, slotDummy.matrix);

    slotDummy.position.set(0.388, 1.39, x * 0.82);
    slotDummy.rotation.set(0, Math.PI / 2, 0);
    slotDummy.updateMatrix();
    vent_slots.setMatrixAt(slotIndex++, slotDummy.matrix);
  }
  vent_slots.instanceMatrix.needsUpdate = true;
  root.add(vent_slots);

  const vent_roof = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.62, 0.18, 4, 1, false),
    woodMat
  );
  vent_roof.name = "vent_roof";
  vent_roof.rotation.y = Math.PI / 4;
  vent_roof.position.y = 1.68;
  root.add(vent_roof);

  const vent_roof_eave_front = addBox(
    "vent_roof_eave_front",
    0.9,
    0.06,
    0.08,
    lightWoodMat,
    0,
    1.59,
    0.44
  );
  const vent_roof_eave_rear = addBox(
    "vent_roof_eave_rear",
    0.9,
    0.06,
    0.08,
    darkWoodMat,
    0,
    1.59,
    -0.44
  );
  const vent_roof_eave_left = addBox(
    "vent_roof_eave_left",
    0.08,
    0.06,
    0.8,
    darkWoodMat,
    -0.44,
    1.59,
    0
  );
  const vent_roof_eave_right = addBox(
    "vent_roof_eave_right",
    0.08,
    0.06,
    0.8,
    woodMat,
    0.44,
    1.59,
    0
  );

  const top_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.22, 0.08, 4, 1, false),
    darkWoodMat
  );
  top_cap.name = "top_cap";
  top_cap.rotation.y = Math.PI / 4;
  top_cap.position.y = 1.8;
  root.add(top_cap);

  const top_finial = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 20, 12),
    darkWoodMat
  );
  top_finial.name = "top_finial";
  top_finial.position.y = 1.89;
  top_finial.scale.set(1, 0.72, 1);
  root.add(top_finial);

  const side_latch_rod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.42, 12),
    metalMat
  );
  side_latch_rod.name = "side_latch_rod";
  side_latch_rod.rotation.z = Math.PI / 2;
  side_latch_rod.position.set(0.57, 1.43, 0.08);
  root.add(side_latch_rod);

  const side_latch_knob = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 16, 10),
    metalMat
  );
  side_latch_knob.name = "side_latch_knob";
  side_latch_knob.position.set(0.8, 1.43, 0.08);
  root.add(side_latch_knob);

  const hanging_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.34, 0.045, 12, 48),
    metalMat
  );
  hanging_ring.name = "hanging_ring";
  hanging_ring.position.y = 2.18;
  root.add(hanging_ring);

  const top_rope = addTube(
    "top_rope",
    [
      new THREE.Vector3(-0.075, 2.49, 0),
      new THREE.Vector3(-0.065, 2.4, 0.015),
      new THREE.Vector3(-0.08, 2.31, -0.01),
      new THREE.Vector3(-0.045, 2.22, 0),
      new THREE.Vector3(0, 2.17, 0),
    ],
    0.035,
    ropeMat,
    24
  );

  const top_rope_strand = addTube(
    "top_rope_strand",
    [
      new THREE.Vector3(0.015, 2.49, 0.01),
      new THREE.Vector3(0.035, 2.4, -0.012),
      new THREE.Vector3(0.02, 2.31, 0.012),
      new THREE.Vector3(0.055, 2.22, 0),
      new THREE.Vector3(0.02, 2.17, 0),
    ],
    0.025,
    ropeMat,
    24
  );

  const top_rope_wrap = new THREE.Mesh(
    new THREE.TorusGeometry(0.075, 0.028, 8, 24),
    ropeMat
  );
  top_rope_wrap.name = "top_rope_wrap";
  top_rope_wrap.position.set(0, 2.18, 0.02);
  top_rope_wrap.scale.set(1, 0.65, 1);
  root.add(top_rope_wrap);

  const bottom_pull_cord = addTube(
    "bottom_pull_cord",
    [
      new THREE.Vector3(0, -1.15, 0),
      new THREE.Vector3(0.015, -1.27, 0.005),
      new THREE.Vector3(-0.01, -1.4, -0.005),
      new THREE.Vector3(0.015, -1.53, 0.005),
      new THREE.Vector3(0, -1.66, 0),
    ],
    0.025,
    ropeMat,
    24
  );

  const bottom_cord_strand = addTube(
    "bottom_cord_strand",
    [
      new THREE.Vector3(0.035, -1.15, 0),
      new THREE.Vector3(0.045, -1.27, -0.008),
      new THREE.Vector3(0.025, -1.4, 0.008),
      new THREE.Vector3(0.045, -1.53, -0.006),
      new THREE.Vector3(0.02, -1.66, 0),
    ],
    0.018,
    ropeMat,
    24
  );

  const bottom_cord_knot = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 14, 10),
    ropeMat
  );
  bottom_cord_knot.name = "bottom_cord_knot";
  bottom_cord_knot.position.y = -1.17;
  bottom_cord_knot.scale.set(1, 0.75, 1);
  root.add(bottom_cord_knot);

  const tassel_center = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.025, 0.22, 8),
    ropeMat
  );
  tassel_center.name = "tassel_center";
  tassel_center.position.y = -1.77;
  root.add(tassel_center);

  const tassel_strandGeom = new THREE.CylinderGeometry(
    0.008,
    0.012,
    0.22,
    6
  );
  const tassel_strands = new THREE.InstancedMesh(
    tassel_strandGeom,
    ropeMat,
    9
  );
  tassel_strands.name = "tassel_strands";
  const tasselDummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2;
    const radius = i === 0 ? 0 : 0.045;
    tasselDummy.position.set(
      Math.cos(angle) * radius,
      -1.77,
      Math.sin(angle) * radius
    );
    tasselDummy.rotation.set(
      Math.sin(angle) * 0.12,
      0,
      -Math.cos(angle) * 0.12
    );
    tasselDummy.updateMatrix();
    tassel_strands.setMatrixAt(i, tasselDummy.matrix);
  }
  tassel_strands.instanceMatrix.needsUpdate = true;
  root.add(tassel_strands);

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