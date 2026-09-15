export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "multi_button_control_box";

  const enclosure = new THREE.Group();
  enclosure.name = "enclosure";
  root.add(enclosure);

  const top_controls = new THREE.Group();
  top_controls.name = "top_controls";
  root.add(top_controls);

  const front_controls = new THREE.Group();
  front_controls.name = "front_controls";
  root.add(front_controls);

  const right_controls = new THREE.Group();
  right_controls.name = "right_controls";
  root.add(right_controls);

  const left_controls = new THREE.Group();
  left_controls.name = "left_controls";
  root.add(left_controls);

  const bodyW = 2.4;
  const bodyH = 1.25;
  const bodyD = 3.0;
  const bodyTop = bodyH / 2;
  const bodyFront = bodyD / 2;
  const bodyRight = bodyW / 2;

  const enclosure_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb9bec2,
    metalness: 0.6,
    roughness: 0.4
  });
  const top_plateMat = new THREE.MeshStandardMaterial({
    color: 0xc5c9cb,
    metalness: 0.6,
    roughness: 0.4
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd5d8d9,
    metalness: 0.6,
    roughness: 0.25
  });
  const brushed_lineMat = new THREE.MeshStandardMaterial({
    color: 0xe1e3e4,
    metalness: 0.5,
    roughness: 0.5
  });
  const screw_recessMat = new THREE.MeshStandardMaterial({
    color: 0x292d2f,
    metalness: 0.2,
    roughness: 0.8
  });
  const gasketMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  const enclosure_bodyShape = roundedRectShape(bodyW, bodyH, 0.18);
  const enclosure_bodyGeom = new THREE.ExtrudeGeometry(enclosure_bodyShape, {
    depth: bodyD,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.07,
    bevelSegments: 3
  });
  enclosure_bodyGeom.translate(0, 0, -bodyD / 2);

  const enclosure_body = new THREE.Mesh(enclosure_bodyGeom, enclosure_bodyMat);
  enclosure_body.name = "enclosure_body";
  enclosure.add(enclosure_body);

  const top_plateShape = roundedRectShape(2.32, 2.92, 0.14);
  const top_plateGeom = new THREE.ShapeGeometry(top_plateShape, 8);
  const top_plate = new THREE.Mesh(top_plateGeom, top_plateMat);
  top_plate.name = "top_plate";
  top_plate.rotation.x = -Math.PI / 2;
  top_plate.position.y = bodyTop + 0.008;
  enclosure.add(top_plate);

  const top_brush_linesGeom = new THREE.BoxGeometry(0.006, 0.003, 2.62);
  const top_brush_lines = new THREE.InstancedMesh(
    top_brush_linesGeom,
    brushed_lineMat,
    18
  );
  top_brush_lines.name = "top_brush_lines";
  const brushDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    brushDummy.position.set(
      -1.02 + i * (2.04 / 17),
      bodyTop + 0.013,
      0
    );
    brushDummy.updateMatrix();
    top_brush_lines.setMatrixAt(i, brushDummy.matrix);
  }
  top_brush_lines.instanceMatrix.needsUpdate = true;
  enclosure.add(top_brush_lines);

  const topScrewPositions = [
    [-0.72, -1.02],
    [0.72, -1.02],
    [-0.72, 1.02],
    [0.72, 1.02]
  ];

  const top_screw_wellsGeom = new THREE.CylinderGeometry(0.115, 0.115, 0.018, 24);
  const top_screw_wells = new THREE.InstancedMesh(
    top_screw_wellsGeom,
    screw_recessMat,
    topScrewPositions.length
  );
  top_screw_wells.name = "top_screw_wells";

  const top_screw_headsGeom = new THREE.CylinderGeometry(0.092, 0.092, 0.026, 24);
  const top_screw_heads = new THREE.InstancedMesh(
    top_screw_headsGeom,
    polished_metalMat,
    topScrewPositions.length
  );
  top_screw_heads.name = "top_screw_heads";

  const top_screw_slots_xGeom = new THREE.BoxGeometry(0.105, 0.008, 0.024);
  const top_screw_slots_x = new THREE.InstancedMesh(
    top_screw_slots_xGeom,
    screw_recessMat,
    topScrewPositions.length
  );
  top_screw_slots_x.name = "top_screw_slots_x";

  const top_screw_slots_zGeom = new THREE.BoxGeometry(0.024, 0.008, 0.105);
  const top_screw_slots_z = new THREE.InstancedMesh(
    top_screw_slots_zGeom,
    screw_recessMat,
    topScrewPositions.length
  );
  top_screw_slots_z.name = "top_screw_slots_z";

  const screwDummy = new THREE.Object3D();
  for (let i = 0; i < topScrewPositions.length; i++) {
    const x = topScrewPositions[i][0];
    const z = topScrewPositions[i][1];

    screwDummy.position.set(x, bodyTop + 0.018, z);
    screwDummy.updateMatrix();
    top_screw_wells.setMatrixAt(i, screwDummy.matrix);

    screwDummy.position.set(x, bodyTop + 0.032, z);
    screwDummy.updateMatrix();
    top_screw_heads.setMatrixAt(i, screwDummy.matrix);

    screwDummy.position.set(x, bodyTop + 0.048, z);
    screwDummy.updateMatrix();
    top_screw_slots_x.setMatrixAt(i, screwDummy.matrix);
    top_screw_slots_z.setMatrixAt(i, screwDummy.matrix);
  }
  top_screw_wells.instanceMatrix.needsUpdate = true;
  top_screw_heads.instanceMatrix.needsUpdate = true;
  top_screw_slots_x.instanceMatrix.needsUpdate = true;
  top_screw_slots_z.instanceMatrix.needsUpdate = true;
  top_controls.add(
    top_screw_wells,
    top_screw_heads,
    top_screw_slots_x,
    top_screw_slots_z
  );

  const top_push_button_baseGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.07, 24);
  const top_push_button_gasketGeom = new THREE.CylinderGeometry(0.175, 0.175, 0.055, 24);
  const top_push_button_capGeom = new THREE.CylinderGeometry(0.145, 0.16, 0.14, 24);
  const top_push_button_domeGeom = new THREE.SphereGeometry(0.15, 24, 12);

  function createTopPushButton(name, material, x, z) {
    const button = new THREE.Group();
    button.name = name;
    button.position.set(x, bodyTop, z);

    const base = new THREE.Mesh(top_push_button_baseGeom, polished_metalMat);
    base.name = name + "_base";
    base.position.y = 0.035;
    button.add(base);

    const gasket = new THREE.Mesh(top_push_button_gasketGeom, gasketMat);
    gasket.name = name + "_gasket";
    gasket.position.y = 0.075;
    button.add(gasket);

    const cap = new THREE.Mesh(top_push_button_capGeom, material);
    cap.name = name + "_cap";
    cap.position.y = 0.15;
    button.add(cap);

    const dome = new THREE.Mesh(top_push_button_domeGeom, material);
    dome.name = name + "_dome";
    dome.scale.set(1, 0.28, 1);
    dome.position.y = 0.215;
    button.add(dome);

    return button;
  }

  const top_front_black_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x172b31,
    metalness: 0.0,
    roughness: 0.3
  });
  const top_left_purple_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x63327e,
    metalness: 0.0,
    roughness: 0.3
  });
  const top_left_orange_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xe53b22,
    metalness: 0.0,
    roughness: 0.3
  });
  const top_left_yellow_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xf2ca4e,
    metalness: 0.0,
    roughness: 0.3
  });
  const top_left_red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xd93438,
    metalness: 0.0,
    roughness: 0.3
  });

  const top_front_black_button = createTopPushButton(
    "top_front_black_button",
    top_front_black_buttonMat,
    0.88,
    1.0
  );
  const top_left_purple_button = createTopPushButton(
    "top_left_purple_button",
    top_left_purple_buttonMat,
    -1.08,
    -0.78
  );
  const top_left_orange_button = createTopPushButton(
    "top_left_orange_button",
    top_left_orange_buttonMat,
    -1.12,
    -0.34
  );
  const top_left_yellow_button = createTopPushButton(
    "top_left_yellow_button",
    top_left_yellow_buttonMat,
    -1.14,
    0.12
  );
  const top_left_red_button = createTopPushButton(
    "top_left_red_button",
    top_left_red_buttonMat,
    -1.14,
    0.58
  );

  top_controls.add(
    top_front_black_button,
    top_left_purple_button,
    top_left_orange_button,
    top_left_yellow_button,
    top_left_red_button
  );

  const tall_button_baseGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.075, 24);
  const tall_button_gasketGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.055, 24);
  const tall_button_stemGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.42, 24);
  const tall_button_headGeom = new THREE.CylinderGeometry(0.23, 0.23, 0.13, 28);
  const tall_button_domeGeom = new THREE.SphereGeometry(0.23, 28, 14);

  const tall_button = new THREE.Group();
  tall_button.name = "tall_button";
  tall_button.position.set(0.88, bodyTop, -1.08);

  const tall_button_base = new THREE.Mesh(tall_button_baseGeom, polished_metalMat);
  tall_button_base.name = "tall_button_base";
  tall_button_base.position.y = 0.038;
  tall_button.add(tall_button_base);

  const tall_button_gasket = new THREE.Mesh(tall_button_gasketGeom, gasketMat);
  tall_button_gasket.name = "tall_button_gasket";
  tall_button_gasket.position.y = 0.078;
  tall_button.add(tall_button_gasket);

  const tall_button_stem = new THREE.Mesh(tall_button_stemGeom, polished_metalMat);
  tall_button_stem.name = "tall_button_stem";
  tall_button_stem.position.y = 0.27;
  tall_button.add(tall_button_stem);

  const tall_button_headMat = new THREE.MeshStandardMaterial({
    color: 0x86b7c3,
    metalness: 0.0,
    roughness: 0.3
  });
  const tall_button_head = new THREE.Mesh(tall_button_headGeom, tall_button_headMat);
  tall_button_head.name = "tall_button_head";
  tall_button_head.position.y = 0.51;
  tall_button.add(tall_button_head);

  const tall_button_dome = new THREE.Mesh(tall_button_domeGeom, tall_button_headMat);
  tall_button_dome.name = "tall_button_dome";
  tall_button_dome.scale.set(1, 0.25, 1);
  tall_button_dome.position.y = 0.575;
  tall_button.add(tall_button_dome);

  top_controls.add(tall_button);

  const face_button_baseGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.075, 24);
  const face_button_gasketGeom = new THREE.CylinderGeometry(0.165, 0.165, 0.06, 24);
  const face_button_capGeom = new THREE.CylinderGeometry(0.145, 0.16, 0.18, 24);
  const face_button_domeGeom = new THREE.SphereGeometry(0.155, 24, 12);

  function createFaceButton(name, material, x, y, face, scale) {
    const button = new THREE.Group();
    button.name = name;
    button.position.set(x, y, face);
    button.scale.setScalar(scale);

    const base = new THREE.Mesh(face_button_baseGeom, polished_metalMat);
    base.name = name + "_base";
    base.rotation.x = Math.PI / 2;
    base.position.z = 0.038;
    button.add(base);

    const gasket = new THREE.Mesh(face_button_gasketGeom, gasketMat);
    gasket.name = name + "_gasket";
    gasket.rotation.x = Math.PI / 2;
    gasket.position.z = 0.078;
    button.add(gasket);

    const cap = new THREE.Mesh(face_button_capGeom, material);
    cap.name = name + "_cap";
    cap.rotation.x = Math.PI / 2;
    cap.position.z = 0.16;
    button.add(cap);

    const dome = new THREE.Mesh(face_button_domeGeom, material);
    dome.name = name + "_dome";
    dome.scale.set(1, 1, 0.3);
    dome.position.z = 0.255;
    button.add(dome);

    return button;
  }

  const front_blue_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x273f79,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_yellow_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xf2c84b,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xb83950,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_cyan_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x4fc4d8,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_green_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x3fc86b,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_orange_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xf04a2e,
    metalness: 0.0,
    roughness: 0.3
  });

  const frontFace = bodyFront + 0.07;

  const front_blue_button = createFaceButton(
    "front_blue_button",
    front_blue_buttonMat,
    -0.92,
    -0.18,
    frontFace,
    1.0
  );
  const front_yellow_button = createFaceButton(
    "front_yellow_button",
    front_yellow_buttonMat,
    -0.42,
    -0.34,
    frontFace,
    1.1
  );
  const front_red_button = createFaceButton(
    "front_red_button",
    front_red_buttonMat,
    0.20,
    -0.43,
    frontFace,
    0.9
  );
  const front_cyan_button = createFaceButton(
    "front_cyan_button",
    front_cyan_buttonMat,
    0.62,
    -0.30,
    frontFace,
    1.0
  );
  const front_green_button = createFaceButton(
    "front_green_button",
    front_green_buttonMat,
    0.98,
    -0.02,
    frontFace,
    1.05
  );
  const front_orange_button = createFaceButton(
    "front_orange_button",
    front_orange_buttonMat,
    0.98,
    0.34,
    frontFace,
    1.05
  );

  front_controls.add(
    front_blue_button,
    front_yellow_button,
    front_red_button,
    front_cyan_button,
    front_green_button,
    front_orange_button
  );

  const right_red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xe53b27,
    metalness: 0.0,
    roughness: 0.3
  });
  const right_black_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x171a1d,
    metalness: 0.0,
    roughness: 0.3
  });

  const sideFace = bodyRight + 0.07;

  const right_red_button = createFaceButton(
    "right_red_button",
    right_red_buttonMat,
    sideFace,
    0.25,
    0.88,
    1.0
  );
  const right_black_button = createFaceButton(
    "right_black_button",
    right_black_buttonMat,
    sideFace,
    0.25,
    0.34,
    1.0
  );

  right_controls.add(right_red_button, right_black_button);

  const left_red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xd9363e,
    metalness: 0.0,
    roughness: 0.3
  });

  const left_red_button = createFaceButton(
    "left_red_button",
    left_red_buttonMat,
    -sideFace,
    0.02,
    0.72,
    0.95
  );
  left_controls.add(left_red_button);

  const front_yellow_symbol = new THREE.Group();
  front_yellow_symbol.name = "front_yellow_symbol";
  front_yellow_symbol.position.set(-0.42, -0.34, frontFace + 0.34);
  front_yellow_symbol.scale.setScalar(1.1);

  const symbol_horizontalGeom = new THREE.BoxGeometry(0.075, 0.012, 0.008);
  const symbol_verticalGeom = new THREE.BoxGeometry(0.012, 0.065, 0.008);

  const symbol_horizontal = new THREE.Mesh(symbol_horizontalGeom, screw_recessMat);
  symbol_horizontal.name = "symbol_horizontal";
  front_yellow_symbol.add(symbol_horizontal);

  const symbol_vertical = new THREE.Mesh(symbol_verticalGeom, screw_recessMat);
  symbol_vertical.name = "symbol_vertical";
  front_yellow_symbol.add(symbol_vertical);

  front_controls.add(front_yellow_symbol);

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