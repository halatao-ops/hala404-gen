export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "handheld_math_device";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x292c2b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const frontMat = new THREE.MeshStandardMaterial({
    color: 0x343736,
    metalness: 0.0,
    roughness: 0.8,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.3,
  });
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0x171919,
    metalness: 0.0,
    roughness: 0.8,
  });
  const keyFaceMat = new THREE.MeshStandardMaterial({
    color: 0x242727,
    metalness: 0.0,
    roughness: 0.8,
  });
  const greenKeyMat = new THREE.MeshStandardMaterial({
    color: 0x20a65b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const orangeKeyMat = new THREE.MeshStandardMaterial({
    color: 0xd87920,
    metalness: 0.0,
    roughness: 0.8,
  });
  const redKeyMat = new THREE.MeshStandardMaterial({
    color: 0xd94a42,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blueKeyMat = new THREE.MeshStandardMaterial({
    color: 0x169ed9,
    metalness: 0.0,
    roughness: 0.8,
  });
  const purpleKeyMat = new THREE.MeshStandardMaterial({
    color: 0x7658a6,
    metalness: 0.0,
    roughness: 0.8,
  });
  const yellowKeyMat = new THREE.MeshStandardMaterial({
    color: 0xffb51e,
    metalness: 0.0,
    roughness: 0.8,
  });
  const labelMat = new THREE.MeshBasicMaterial({ color: 0xf2f4f1 });
  const darkLabelMat = new THREE.MeshBasicMaterial({ color: 0x202525 });

  function makeScreenMat(color) {
    return new THREE.MeshBasicMaterial({ color });
  }

  const screenDarkMat = makeScreenMat(0x071014);
  const screenGreenMat = makeScreenMat(0x00a84b);
  const screenPurpleMat = makeScreenMat(0x8d35e8);
  const screenBlueMat = makeScreenMat(0x008fe8);
  const screenCyanMat = makeScreenMat(0x00c9b9);
  const screenLimeMat = makeScreenMat(0x62dc16);
  const screenYellowMat = makeScreenMat(0xe8f31b);

  function roundedRectShape(w, h, r) {
    const x = -w / 2;
    const y = -h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function roundedExtrudeGeometry(w, h, r, depth, bevel) {
    const geom = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.55, -1.72);
  bodyShape.bezierCurveTo(-0.18, -1.79, 0.20, -1.78, 0.55, -1.72);
  bodyShape.bezierCurveTo(0.80, -1.68, 0.91, -1.50, 0.91, -1.22);
  bodyShape.bezierCurveTo(0.90, -0.55, 0.84, 0.20, 0.88, 0.82);
  bodyShape.bezierCurveTo(0.91, 1.25, 0.87, 1.50, 0.68, 1.64);
  bodyShape.bezierCurveTo(0.47, 1.78, -0.47, 1.78, -0.68, 1.64);
  bodyShape.bezierCurveTo(-0.87, 1.50, -0.91, 1.25, -0.88, 0.82);
  bodyShape.bezierCurveTo(-0.84, 0.20, -0.90, -0.55, -0.91, -1.22);
  bodyShape.bezierCurveTo(-0.91, -1.50, -0.80, -1.68, -0.55, -1.72);

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.34,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4,
  });
  bodyGeom.translate(0, 0, -0.17);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const front_insetGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  front_insetGeom.translate(0, 0, -0.009);
  const front_inset = new THREE.Mesh(front_insetGeom, frontMat);
  front_inset.name = "front_inset";
  front_inset.scale.set(0.94, 0.96, 1);
  front_inset.position.z = 0.225;
  root.add(front_inset);

  const screen_bezelGeom = roundedExtrudeGeometry(1.50, 1.72, 0.18, 0.055, 0.018);
  const screen_bezel = new THREE.Mesh(screen_bezelGeom, bezelMat);
  screen_bezel.name = "screen_bezel";
  screen_bezel.position.set(0, 0.78, 0.245);
  root.add(screen_bezel);

  const screen_display = new THREE.Group();
  screen_display.name = "screen_display";
  screen_display.position.set(0, 0.82, 0.292);
  root.add(screen_display);

  function addScreenRect(name, w, h, mat, x, y, z) {
    const geom = new THREE.PlaneGeometry(w, h);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    screen_display.add(mesh);
    return mesh;
  }

  const screen_background = addScreenRect("screen_background", 1.22, 1.34, screenDarkMat, 0, 0, 0);
  const screen_header = addScreenRect("screen_header", 1.22, 0.18, screenGreenMat, 0, 0.58, 0.001);
  const screen_purple_field = addScreenRect("screen_purple_field", 1.22, 0.48, screenPurpleMat, 0, 0.27, 0.001);
  const screen_blue_field = addScreenRect("screen_blue_field", 1.22, 0.46, screenBlueMat, 0, -0.21, 0.001);
  const screen_cyan_field = addScreenRect("screen_cyan_field", 1.22, 0.22, screenCyanMat, 0, -0.56, 0.001);
  const screen_left_column = addScreenRect("screen_left_column", 0.20, 0.96, screenLimeMat, -0.51, -0.08, 0.002);
  const screen_second_column = addScreenRect("screen_second_column", 0.18, 0.96, screenYellowMat, -0.31, -0.08, 0.002);
  const screen_footer = addScreenRect("screen_footer", 1.22, 0.16, screenCyanMat, 0, -0.59, 0.003);

  const screen_iconGeom = new THREE.CircleGeometry(0.055, 18);
  const screen_iconMat = makeScreenMat(0x72e9ff);
  const screen_icon = new THREE.Mesh(screen_iconGeom, screen_iconMat);
  screen_icon.name = "screen_icon";
  screen_icon.position.set(-0.51, 0.58, 0.006);
  screen_display.add(screen_icon);

  const screen_icon_bodyGeom = new THREE.BoxGeometry(0.055, 0.045, 0.004);
  const screen_icon_body = new THREE.Mesh(screen_icon_bodyGeom, labelMat);
  screen_icon_body.name = "screen_icon_body";
  screen_icon_body.position.set(-0.51, 0.555, 0.008);
  screen_display.add(screen_icon_body);

  const screen_icon_headGeom = new THREE.CircleGeometry(0.022, 14);
  const screen_icon_head = new THREE.Mesh(screen_icon_headGeom, labelMat);
  screen_icon_head.name = "screen_icon_head";
  screen_icon_head.position.set(-0.51, 0.615, 0.009);
  screen_display.add(screen_icon_head);

  const screen_signal_barGeom = new THREE.BoxGeometry(0.018, 0.045, 0.004);
  const screen_signal_bars = new THREE.InstancedMesh(screen_signal_barGeom, labelMat, 4);
  screen_signal_bars.name = "screen_signal_bars";
  const signalDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const scaleY = 0.35 + i * 0.22;
    signalDummy.position.set(0.39 + i * 0.027, 0.535 + 0.0225 * scaleY, 0.008);
    signalDummy.scale.set(1, scaleY, 1);
    signalDummy.updateMatrix();
    screen_signal_bars.setMatrixAt(i, signalDummy.matrix);
  }
  screen_signal_bars.instanceMatrix.needsUpdate = true;
  screen_display.add(screen_signal_bars);

  const screen_battery_bodyGeom = new THREE.BoxGeometry(0.095, 0.052, 0.004);
  const screen_battery_body = new THREE.Mesh(screen_battery_bodyGeom, labelMat);
  screen_battery_body.name = "screen_battery_body";
  screen_battery_body.position.set(0.535, 0.58, 0.008);
  screen_display.add(screen_battery_body);

  const screen_battery_tipGeom = new THREE.BoxGeometry(0.014, 0.026, 0.004);
  const screen_battery_tip = new THREE.Mesh(screen_battery_tipGeom, labelMat);
  screen_battery_tip.name = "screen_battery_tip";
  screen_battery_tip.position.set(0.592, 0.58, 0.008);
  screen_display.add(screen_battery_tip);

  const screen_formula_strokeGeom = new THREE.BoxGeometry(0.075, 0.012, 0.004);
  const screenFormulaData = [
    [-0.10, 0.39, 0.00, 1.0],
    [-0.01, 0.39, 0.78, 0.75],
    [0.08, 0.39, -0.78, 0.75],
    [0.18, 0.39, 0.00, 0.65],
    [0.29, 0.39, 0.00, 0.55],
    [-0.08, 0.20, 0.00, 1.15],
    [0.03, 0.20, 0.00, 0.65],
    [0.13, 0.20, 0.00, 0.55],
    [0.24, 0.20, 0.00, 0.55],
    [-0.08, 0.02, 0.00, 1.15],
    [0.04, 0.02, 0.00, 0.70],
    [0.15, 0.02, 0.00, 0.55],
    [0.27, 0.02, 0.00, 0.55],
    [-0.08, -0.17, 0.00, 1.15],
    [0.04, -0.17, 0.00, 0.70],
    [0.15, -0.17, 0.00, 0.55],
    [0.27, -0.17, 0.00, 0.55],
    [-0.08, -0.36, 0.00, 1.15],
    [0.04, -0.36, 0.00, 0.70],
    [0.15, -0.36, 0.00, 0.55],
    [0.27, -0.36, 0.00, 0.55],
    [-0.49, 0.39, 0.00, 0.55],
    [-0.49, 0.20, 0.00, 0.55],
    [-0.49, 0.02, 0.00, 0.55],
    [-0.49, -0.17, 0.00, 0.55],
    [-0.49, -0.36, 0.00, 0.55],
    [-0.29, 0.39, 0.00, 0.45],
    [-0.29, 0.20, 0.00, 0.45],
    [-0.29, 0.02, 0.00, 0.45],
    [-0.29, -0.17, 0.00, 0.45],
    [-0.29, -0.36, 0.00, 0.45],
  ];
  const screen_formula_strokes = new THREE.InstancedMesh(
    screen_formula_strokeGeom,
    labelMat,
    screenFormulaData.length
  );
  screen_formula_strokes.name = "screen_formula_strokes";
  const formulaDummy = new THREE.Object3D();
  for (let i = 0; i < screenFormulaData.length; i++) {
    const d = screenFormulaData[i];
    formulaDummy.position.set(d[0], d[1], 0.009);
    formulaDummy.rotation.set(0, 0, d[2]);
    formulaDummy.scale.set(d[3], 1, 1);
    formulaDummy.updateMatrix();
    screen_formula_strokes.setMatrixAt(i, formulaDummy.matrix);
  }
  screen_formula_strokes.instanceMatrix.needsUpdate = true;
  screen_display.add(screen_formula_strokes);

  const screen_header_markGeom = new THREE.BoxGeometry(0.045, 0.010, 0.004);
  const screenHeaderMarkData = [
    [-0.28, 0.58, 0.00, 1.0],
    [-0.20, 0.58, 0.75, 0.7],
    [-0.12, 0.58, -0.75, 0.7],
    [0.02, 0.58, 0.00, 0.8],
    [0.10, 0.58, 0.00, 0.8],
    [0.43, 0.47, 0.00, 0.6],
    [0.50, 0.47, 0.00, 0.6],
  ];
  const screen_header_marks = new THREE.InstancedMesh(
    screen_header_markGeom,
    labelMat,
    screenHeaderMarkData.length
  );
  screen_header_marks.name = "screen_header_marks";
  for (let i = 0; i < screenHeaderMarkData.length; i++) {
    const d = screenHeaderMarkData[i];
    formulaDummy.position.set(d[0], d[1], 0.009);
    formulaDummy.rotation.set(0, 0, d[2]);
    formulaDummy.scale.set(d[3], 1, 1);
    formulaDummy.updateMatrix();
    screen_header_marks.setMatrixAt(i, formulaDummy.matrix);
  }
  screen_header_marks.instanceMatrix.needsUpdate = true;
  screen_display.add(screen_header_marks);

  const small_keyGeom = roundedExtrudeGeometry(0.27, 0.19, 0.075, 0.065, 0.012);
  const medium_keyGeom = roundedExtrudeGeometry(0.30, 0.21, 0.085, 0.070, 0.013);
  const wide_keyGeom = roundedExtrudeGeometry(0.36, 0.19, 0.09, 0.068, 0.013);
  const round_keyGeom = new THREE.SphereGeometry(1, 24, 12);

  function addKey(name, geom, mat, x, y, z, sx, sy, sz) {
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    root.add(mesh);
    return mesh;
  }

  const top_left_key = addKey("top_left_key", wide_keyGeom, keyMat, -0.50, -0.12, 0.278, 1, 1, 1);
  const top_right_key = addKey("top_right_key", wide_keyGeom, keyMat, 0.50, -0.12, 0.278, 1, 1, 1);
  const green_function_key = addKey("green_function_key", round_keyGeom, greenKeyMat, -0.53, -0.43, 0.286, 0.145, 0.095, 0.045);
  const yellow_function_key = addKey("yellow_function_key", round_keyGeom, yellowKeyMat, 0.53, -0.43, 0.286, 0.145, 0.095, 0.045);
  const left_purple_key = addKey("left_purple_key", medium_keyGeom, purpleKeyMat, -0.53, -0.72, 0.278, 1, 1, 1);
  const left_black_key = addKey("left_black_key", medium_keyGeom, keyMat, -0.27, -0.72, 0.278, 1, 1, 1);
  const center_zero_key = addKey("center_zero_key", medium_keyGeom, keyMat, 0.00, -0.72, 0.278, 1, 1, 1);
  const right_black_key = addKey("right_black_key", medium_keyGeom, keyMat, 0.27, -0.72, 0.278, 1, 1, 1);
  const right_purple_key = addKey("right_purple_key", medium_keyGeom, purpleKeyMat, 0.53, -0.72, 0.278, 1, 1, 1);

  const row_one_key = addKey("row_one_key", medium_keyGeom, greenKeyMat, -0.53, -1.03, 0.278, 1, 1, 1);
  const row_one_middle_left_key = addKey("row_one_middle_left_key", medium_keyGeom, keyMat, -0.27, -1.03, 0.278, 1, 1, 1);
  const row_one_middle_right_key = addKey("row_one_middle_right_key", medium_keyGeom, keyMat, 0.00, -1.03, 0.278, 1, 1, 1);
  const row_one_right_small_key = addKey("row_one_right_small_key", small_keyGeom, keyMat, 0.27, -1.03, 0.278, 1, 1, 1);
  const row_one_far_right_key = addKey("row_one_far_right_key", small_keyGeom, keyMat, 0.53, -1.03, 0.278, 1, 1, 1);

  const row_two_left_key = addKey("row_two_left_key", medium_keyGeom, orangeKeyMat, -0.53, -1.34, 0.278, 1, 1, 1);
  const row_two_middle_left_key = addKey("row_two_middle_left_key", medium_keyGeom, keyMat, -0.27, -1.34, 0.278, 1, 1, 1);
  const row_two_middle_right_key = addKey("row_two_middle_right_key", medium_keyGeom, keyMat, 0.00, -1.34, 0.278, 1, 1, 1);
  const row_two_right_small_key = addKey("row_two_right_small_key", small_keyGeom, keyMat, 0.27, -1.34, 0.278, 1, 1, 1);
  const row_two_far_right_key = addKey("row_two_far_right_key", small_keyGeom, keyMat, 0.53, -1.34, 0.278, 1, 1, 1);

  const row_three_left_key = addKey("row_three_left_key", medium_keyGeom, redKeyMat, -0.53, -1.62, 0.278, 1, 1, 1);
  const row_three_middle_left_key = addKey("row_three_middle_left_key", medium_keyGeom, keyMat, -0.27, -1.62, 0.278, 1, 1, 1);
  const row_three_middle_right_key = addKey("row_three_middle_right_key", medium_keyGeom, keyMat, 0.00, -1.62, 0.278, 1, 1, 1);
  const row_three_right_small_key = addKey("row_three_right_small_key", small_keyGeom, keyMat, 0.27, -1.62, 0.278, 1, 1, 1);
  const row_three_far_right_key = addKey("row_three_far_right_key", round_keyGeom, blueKeyMat, 0.53, -1.62, 0.286, 0.135, 0.135, 0.047);

  const directional_padGeom = new THREE.SphereGeometry(1, 32, 16);
  const directional_pad = new THREE.Mesh(directional_padGeom, keyFaceMat);
  directional_pad.name = "directional_pad";
  directional_pad.position.set(0, -0.30, 0.292);
  directional_pad.scale.set(0.285, 0.315, 0.055);
  root.add(directional_pad);

  const directional_pad_ringGeom = new THREE.TorusGeometry(0.255, 0.012, 8, 32);
  const directional_pad_ring = new THREE.Mesh(directional_pad_ringGeom, bezelMat);
  directional_pad_ring.name = "directional_pad_ring";
  directional_pad_ring.position.set(0, -0.30, 0.347);
  root.add(directional_pad_ring);

  const triangleShape = new THREE.Shape();
  triangleShape.moveTo(0, 0.045);
  triangleShape.lineTo(-0.040, -0.032);
  triangleShape.lineTo(0.040, -0.032);
  triangleShape.lineTo(0, 0.045);
  const triangleGeom = new THREE.ShapeGeometry(triangleShape);

  const up_arrow = new THREE.Mesh(triangleGeom, labelMat);
  up_arrow.name = "up_arrow";
  up_arrow.position.set(0, -0.16, 0.351);
  root.add(up_arrow);

  const down_arrow = new THREE.Mesh(triangleGeom, labelMat);
  down_arrow.name = "down_arrow";
  down_arrow.position.set(0, -0.45, 0.351);
  down_arrow.rotation.z = Math.PI;
  root.add(down_arrow);

  const key_labelGeom = new THREE.BoxGeometry(0.070, 0.012, 0.006);
  const keyLabelData = [
    [-0.52, -0.12, 0.00, 1.0],
    [-0.43, -0.12, 0.75, 0.75],
    [-0.35, -0.12, -0.75, 0.75],
    [0.43, -0.12, 0.00, 0.75],
    [0.51, -0.12, 0.00, 0.75],
    [0.58, -0.12, 0.00, 0.55],
    [-0.53, -0.72, 0.00, 0.75],
    [-0.47, -0.72, 0.75, 0.65],
    [-0.27, -0.72, 0.75, 0.75],
    [-0.21, -0.72, -0.75, 0.75],
    [0.25, -0.72, 0.00, 0.65],
    [0.31, -0.72, 0.00, 0.65],
    [0.53, -0.72, 0.00, 0.75],
    [-0.53, -1.03, 0.00, 0.85],
    [-0.27, -1.03, 0.00, 0.65],
    [0.00, -1.03, 0.00, 0.65],
    [0.25, -1.03, 0.75, 0.55],
    [0.31, -1.03, -0.75, 0.55],
    [0.53, -1.03, 0.00, 0.75],
    [-0.53, -1.34, 0.00, 0.85],
    [-0.27, -1.34, 0.00, 0.65],
    [0.00, -1.34, 0.00, 0.65],
    [0.25, -1.34, 0.75, 0.55],
    [0.31, -1.34, -0.75, 0.55],
    [0.53, -1.34, 0.00, 0.75],
    [-0.53, -1.62, 0.00, 0.65],
    [-0.47, -1.62, 0.00, 0.65],
    [-0.27, -1.62, 0.75, 0.65],
    [-0.21, -1.62, -0.75, 0.65],
    [0.00, -1.62, 0.00, 0.65],
    [0.25, -1.62, 0.00, 0.65],
    [0.31, -1.62, 0.00, 0.65],
    [0.50, -1.62, 0.00, 0.55],
    [0.56, -1.62, 0.00, 0.55],
  ];
  const key_labels = new THREE.InstancedMesh(key_labelGeom, labelMat, keyLabelData.length);
  key_labels.name = "key_labels";
  const labelDummy = new THREE.Object3D();
  for (let i = 0; i < keyLabelData.length; i++) {
    const d = keyLabelData[i];
    labelDummy.position.set(d[0], d[1], 0.337);
    labelDummy.rotation.set(0, 0, d[2]);
    labelDummy.scale.set(d[3], 1, 1);
    labelDummy.updateMatrix();
    key_labels.setMatrixAt(i, labelDummy.matrix);
  }
  key_labels.instanceMatrix.needsUpdate = true;
  root.add(key_labels);

  const zero_key_labelGeom = new THREE.TorusGeometry(0.045, 0.009, 8, 20);
  const zero_key_label = new THREE.Mesh(zero_key_labelGeom, labelMat);
  zero_key_label.name = "zero_key_label";
  zero_key_label.position.set(0, -0.72, 0.338);
  zero_key_label.scale.set(0.72, 1.0, 1);
  root.add(zero_key_label);

  const side_buttonGeom = new THREE.SphereGeometry(1, 20, 10);
  const left_side_button = new THREE.Mesh(side_buttonGeom, keyMat);
  left_side_button.name = "left_side_button";
  left_side_button.position.set(-0.925, -0.48, 0.02);
  left_side_button.scale.set(0.045, 0.13, 0.075);
  root.add(left_side_button);

  const right_side_button = new THREE.Mesh(side_buttonGeom, keyMat);
  right_side_button.name = "right_side_button";
  right_side_button.position.set(0.925, 0.55, 0.01);
  right_side_button.scale.set(0.045, 0.18, 0.085);
  root.add(right_side_button);

  const top_power_button = new THREE.Mesh(side_buttonGeom, keyMat);
  top_power_button.name = "top_power_button";
  top_power_button.position.set(0.35, 1.76, -0.01);
  top_power_button.scale.set(0.13, 0.035, 0.075);
  root.add(top_power_button);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}