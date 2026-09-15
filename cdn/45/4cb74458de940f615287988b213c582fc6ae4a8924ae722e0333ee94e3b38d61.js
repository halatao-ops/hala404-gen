export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "tower_appliance";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const cabinet_assembly = new THREE.Group();
  cabinet_assembly.name = "cabinet_assembly";
  root.add(cabinet_assembly);

  const front_controls = new THREE.Group();
  front_controls.name = "front_controls";
  root.add(front_controls);

  const side_controls = new THREE.Group();
  side_controls.name = "side_controls";
  root.add(side_controls);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5b5d5e,
    metalness: 0.6,
    roughness: 0.4
  });
  const body_frontMat = new THREE.MeshStandardMaterial({
    color: 0x686a6b,
    metalness: 0.6,
    roughness: 0.4
  });
  const body_sideMat = new THREE.MeshStandardMaterial({
    color: 0x727475,
    metalness: 0.6,
    roughness: 0.4
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x292b2c,
    metalness: 0.6,
    roughness: 0.4
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x969899,
    metalness: 0.6,
    roughness: 0.4
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x111212,
    metalness: 0.1,
    roughness: 0.8
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x030607,
    metalness: 0.0,
    roughness: 0.3
  });
  const ventMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8
  });
  const cyan_ledMat = new THREE.MeshStandardMaterial({
    color: 0x8ffcff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x8ffcff
  });
  const white_ledMat = new THREE.MeshStandardMaterial({
    color: 0xe8ffff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xe8ffff
  });
  const brushed_lineMat = new THREE.LineBasicMaterial({
    color: 0x858788,
    transparent: true,
    opacity: 0.16
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  function makeRoundedExtrude(width, height, depth, radius, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      makeRoundedRectShape(width, height, radius),
      {
        curveSegments: 8,
        steps: 1,
        depth: depth,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const baseMat = black_plasticMat;
  const baseGeom = makeRoundedExtrude(0.88, 0.48, 0.07, 0.11, 0.012);
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.name = "base";
  base.rotation.x = Math.PI / 2;
  base.position.y = 0.055;
  base_assembly.add(base);

  const base_topMat = dark_metalMat;
  const base_topGeom = makeRoundedExtrude(0.72, 0.37, 0.025, 0.085, 0.006);
  const base_top = new THREE.Mesh(base_topGeom, base_topMat);
  base_top.name = "base_top";
  base_top.rotation.x = Math.PI / 2;
  base_top.position.y = 0.105;
  base_assembly.add(base_top);

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.22, 0.10);
  bodyShape.quadraticCurveTo(-0.27, 0.10, -0.27, 0.16);
  bodyShape.lineTo(-0.27, 2.08);
  bodyShape.quadraticCurveTo(-0.27, 2.16, -0.19, 2.17);
  bodyShape.lineTo(0.10, 2.17);
  bodyShape.quadraticCurveTo(0.24, 2.16, 0.27, 2.02);
  bodyShape.lineTo(0.27, 0.23);
  bodyShape.quadraticCurveTo(0.27, 0.14, 0.18, 0.10);
  bodyShape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    curveSegments: 10,
    steps: 1,
    depth: 0.38,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  bodyGeom.translate(0, 0, -0.19);

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  cabinet_assembly.add(body);

  const front_panelMat = body_frontMat;
  const front_panelShape = new THREE.Shape();
  front_panelShape.moveTo(-0.205, 0.135);
  front_panelShape.quadraticCurveTo(-0.23, 0.14, -0.23, 0.18);
  front_panelShape.lineTo(-0.23, 1.50);
  front_panelShape.lineTo(-0.115, 1.68);
  front_panelShape.lineTo(-0.115, 2.075);
  front_panelShape.quadraticCurveTo(-0.11, 2.125, -0.06, 2.125);
  front_panelShape.lineTo(0.105, 2.125);
  front_panelShape.quadraticCurveTo(0.225, 2.11, 0.23, 1.99);
  front_panelShape.lineTo(0.23, 0.22);
  front_panelShape.quadraticCurveTo(0.225, 0.15, 0.17, 0.135);
  front_panelShape.closePath();

  const front_panelGeom = new THREE.ExtrudeGeometry(front_panelShape, {
    curveSegments: 8,
    steps: 1,
    depth: 0.008,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2
  });
  front_panelGeom.translate(0, 0, -0.004);

  const front_panel = new THREE.Mesh(front_panelGeom, front_panelMat);
  front_panel.name = "front_panel";
  front_panel.position.z = 0.205;
  cabinet_assembly.add(front_panel);

  const right_side_panelMat = body_sideMat;
  const right_side_panelGeom = new THREE.BoxGeometry(0.012, 1.72, 0.31);
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, right_side_panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.284, 1.08, -0.005);
  cabinet_assembly.add(right_side_panel);

  const lower_side_insertMat = dark_metalMat;
  const lower_side_insertGeom = new THREE.BoxGeometry(0.014, 0.34, 0.28);
  const lower_side_insert = new THREE.Mesh(lower_side_insertGeom, lower_side_insertMat);
  lower_side_insert.name = "lower_side_insert";
  lower_side_insert.position.set(0.286, 0.31, -0.005);
  cabinet_assembly.add(lower_side_insert);

  const left_edge_trimMat = trimMat;
  const left_edge_trimGeom = new THREE.CylinderGeometry(0.011, 0.011, 1.92, 12);
  const left_edge_trim = new THREE.Mesh(left_edge_trimGeom, left_edge_trimMat);
  left_edge_trim.name = "left_edge_trim";
  left_edge_trim.position.set(-0.246, 1.12, 0.213);
  cabinet_assembly.add(left_edge_trim);

  const right_edge_trimMat = dark_metalMat;
  const right_edge_trimGeom = new THREE.CylinderGeometry(0.009, 0.009, 1.72, 12);
  const right_edge_trim = new THREE.Mesh(right_edge_trimGeom, right_edge_trimMat);
  right_edge_trim.name = "right_edge_trim";
  right_edge_trim.position.set(0.224, 1.10, 0.211);
  cabinet_assembly.add(right_edge_trim);

  const top_capMat = dark_metalMat;
  const top_capGeom = new THREE.BoxGeometry(0.34, 0.018, 0.30);
  const top_cap = new THREE.Mesh(top_capGeom, top_capMat);
  top_cap.name = "top_cap";
  top_cap.position.set(-0.005, 2.17, -0.005);
  cabinet_assembly.add(top_cap);

  const front_brush_positions = [];
  for (let i = 0; i < 18; i++) {
    const x = -0.205 + i * 0.024;
    const lower = 0.17 + (i % 3) * 0.012;
    const upper = 1.57 - (i % 4) * 0.012;
    front_brush_positions.push(x, lower, 0.216, x, upper, 0.216);
  }
  const front_brush_linesGeom = new THREE.BufferGeometry();
  front_brush_linesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(front_brush_positions, 3)
  );
  const front_brush_lines = new THREE.LineSegments(
    front_brush_linesGeom,
    brushed_lineMat
  );
  front_brush_lines.name = "front_brush_lines";
  cabinet_assembly.add(front_brush_lines);

  const display_bezelMat = dark_metalMat;
  const display_bezelGeom = makeRoundedExtrude(0.34, 0.56, 0.014, 0.035, 0.004);
  const display_bezel = new THREE.Mesh(display_bezelGeom, display_bezelMat);
  display_bezel.name = "display_bezel";
  display_bezel.position.set(-0.015, 1.84, 0.218);
  front_controls.add(display_bezel);

  const display_screenMat = screenMat;
  const display_screenGeom = makeRoundedExtrude(0.30, 0.50, 0.006, 0.025, 0.002);
  const display_screen = new THREE.Mesh(display_screenGeom, display_screenMat);
  display_screen.name = "display_screen";
  display_screen.position.set(-0.015, 1.84, 0.232);
  front_controls.add(display_screen);

  const display_segments = [];
  function addDisplaySegment(x, y, width, height) {
    display_segments.push([x, y, width, height]);
  }

  addDisplaySegment(0.060, 1.925, 0.065, 0.010);
  addDisplaySegment(0.060, 1.855, 0.065, 0.010);
  addDisplaySegment(0.028, 1.890, 0.010, 0.045);

  addDisplaySegment(0.075, 1.705, 0.010, 0.080);
  addDisplaySegment(0.045, 1.670, 0.060, 0.010);

  addDisplaySegment(-0.085, 1.985, 0.018, 0.004);
  addDisplaySegment(-0.060, 1.985, 0.012, 0.004);
  addDisplaySegment(-0.041, 1.985, 0.008, 0.004);
  addDisplaySegment(-0.091, 1.968, 0.008, 0.004);
  addDisplaySegment(-0.071, 1.968, 0.016, 0.004);
  addDisplaySegment(-0.047, 1.968, 0.008, 0.004);

  addDisplaySegment(-0.086, 1.915, 0.026, 0.005);
  addDisplaySegment(-0.086, 1.885, 0.026, 0.005);
  addDisplaySegment(-0.100, 1.900, 0.005, 0.030);
  addDisplaySegment(-0.072, 1.900, 0.005, 0.030);
  addDisplaySegment(-0.086, 1.892, 0.016, 0.004);

  addDisplaySegment(-0.086, 1.835, 0.026, 0.005);
  addDisplaySegment(-0.086, 1.805, 0.026, 0.005);
  addDisplaySegment(-0.100, 1.820, 0.005, 0.030);
  addDisplaySegment(-0.072, 1.820, 0.005, 0.030);
  addDisplaySegment(-0.086, 1.812, 0.016, 0.004);

  addDisplaySegment(-0.086, 1.755, 0.026, 0.005);
  addDisplaySegment(-0.086, 1.725, 0.026, 0.005);
  addDisplaySegment(-0.100, 1.740, 0.005, 0.030);
  addDisplaySegment(-0.072, 1.740, 0.005, 0.030);
  addDisplaySegment(-0.094, 1.748, 0.012, 0.004);
  addDisplaySegment(-0.078, 1.732, 0.012, 0.004);

  const display_segmentGeom = new THREE.BoxGeometry(1, 1, 1);
  const display_readout = new THREE.InstancedMesh(
    display_segmentGeom,
    cyan_ledMat,
    display_segments.length
  );
  display_readout.name = "display_readout";
  const display_dummy = new THREE.Object3D();
  for (let i = 0; i < display_segments.length; i++) {
    const segment = display_segments[i];
    display_dummy.position.set(segment[0], segment[1], 0.242);
    display_dummy.rotation.set(0, 0, 0);
    display_dummy.scale.set(segment[2], segment[3], 0.004);
    display_dummy.updateMatrix();
    display_readout.setMatrixAt(i, display_dummy.matrix);
  }
  display_readout.instanceMatrix.needsUpdate = true;
  front_controls.add(display_readout);

  const status_indicatorMat = cyan_ledMat;
  const status_indicatorGeom = new THREE.CircleGeometry(0.007, 16);
  const status_indicator = new THREE.Mesh(status_indicatorGeom, status_indicatorMat);
  status_indicator.name = "status_indicator";
  status_indicator.position.set(-0.105, 1.985, 0.244);
  front_controls.add(status_indicator);

  const sensor_button_rimMat = black_plasticMat;
  const sensor_button_rimGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.010, 24);
  const sensor_button_rim = new THREE.Mesh(sensor_button_rimGeom, sensor_button_rimMat);
  sensor_button_rim.name = "sensor_button_rim";
  sensor_button_rim.rotation.x = Math.PI / 2;
  sensor_button_rim.position.set(0.105, 1.39, 0.221);
  front_controls.add(sensor_button_rim);

  const sensor_buttonMat = screenMat;
  const sensor_buttonGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.012, 24);
  const sensor_button = new THREE.Mesh(sensor_buttonGeom, sensor_buttonMat);
  sensor_button.name = "sensor_button";
  sensor_button.rotation.x = Math.PI / 2;
  sensor_button.position.set(0.105, 1.39, 0.228);
  front_controls.add(sensor_button);

  const access_door_path = [
    new THREE.Vector3(-0.125, 0.93, 0.224),
    new THREE.Vector3(-0.045, 0.93, 0.224),
    new THREE.Vector3(-0.010, 0.925, 0.224),
    new THREE.Vector3(0.008, 0.905, 0.224),
    new THREE.Vector3(0.012, 0.870, 0.224),
    new THREE.Vector3(0.012, 0.285, 0.224),
    new THREE.Vector3(-0.015, 0.225, 0.224),
    new THREE.Vector3(-0.060, 0.175, 0.224)
  ];
  const access_door_seamMat = black_plasticMat;
  const access_door_seamGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(access_door_path, false, "centripetal"),
    32,
    0.0032,
    6,
    false
  );
  const access_door_seam = new THREE.Mesh(access_door_seamGeom, access_door_seamMat);
  access_door_seam.name = "access_door_seam";
  front_controls.add(access_door_seam);

  const lower_front_accentMat = black_plasticMat;
  const lower_front_accentShape = new THREE.Shape();
  lower_front_accentShape.moveTo(0.055, 0.115);
  lower_front_accentShape.lineTo(0.205, 0.115);
  lower_front_accentShape.lineTo(0.225, 0.315);
  lower_front_accentShape.lineTo(0.175, 0.430);
  lower_front_accentShape.closePath();

  const lower_front_accentGeom = new THREE.ExtrudeGeometry(lower_front_accentShape, {
    curveSegments: 2,
    steps: 1,
    depth: 0.006,
    bevelEnabled: false
  });
  lower_front_accentGeom.translate(0, 0, -0.003);

  const lower_front_accent = new THREE.Mesh(
    lower_front_accentGeom,
    lower_front_accentMat
  );
  lower_front_accent.name = "lower_front_accent";
  lower_front_accent.position.z = 0.217;
  front_controls.add(lower_front_accent);

  const side_display_bezelMat = dark_metalMat;
  const side_display_bezelGeom = new THREE.BoxGeometry(0.014, 0.58, 0.22);
  const side_display_bezel = new THREE.Mesh(
    side_display_bezelGeom,
    side_display_bezelMat
  );
  side_display_bezel.name = "side_display_bezel";
  side_display_bezel.position.set(0.291, 1.72, 0.015);
  side_controls.add(side_display_bezel);

  const side_display_screenMat = screenMat;
  const side_display_screenGeom = new THREE.BoxGeometry(0.008, 0.53, 0.18);
  const side_display_screen = new THREE.Mesh(
    side_display_screenGeom,
    side_display_screenMat
  );
  side_display_screen.name = "side_display_screen";
  side_display_screen.position.set(0.301, 1.72, 0.015);
  side_controls.add(side_display_screen);

  const side_display_segments = [
    [1.885, 0.055, 0.010, 0.050],
    [1.850, 0.055, 0.010, 0.050],
    [1.867, 0.082, 0.040, 0.008],
    [1.770, 0.055, 0.010, 0.070],
    [1.730, 0.055, 0.010, 0.070],
    [1.750, 0.087, 0.040, 0.008],
    [1.650, 0.055, 0.010, 0.075],
    [1.605, 0.055, 0.010, 0.075],
    [1.627, 0.088, 0.040, 0.008],
    [1.545, 0.055, 0.010, 0.060],
    [1.510, 0.055, 0.010, 0.060],
    [1.527, 0.082, 0.035, 0.008]
  ];
  const side_display_segmentGeom = new THREE.BoxGeometry(1, 1, 1);
  const side_display_readout = new THREE.InstancedMesh(
    side_display_segmentGeom,
    cyan_ledMat,
    side_display_segments.length
  );
  side_display_readout.name = "side_display_readout";
  const side_display_dummy = new THREE.Object3D();
  for (let i = 0; i < side_display_segments.length; i++) {
    const segment = side_display_segments[i];
    side_display_dummy.position.set(0.307, segment[0], segment[1]);
    side_display_dummy.rotation.set(0, 0, 0);
    side_display_dummy.scale.set(0.005, segment[2], segment[3]);
    side_display_dummy.updateMatrix();
    side_display_readout.setMatrixAt(i, side_display_dummy.matrix);
  }
  side_display_readout.instanceMatrix.needsUpdate = true;
  side_controls.add(side_display_readout);

  const side_vent_slatsMat = ventMat;
  const side_vent_slatsGeom = new THREE.BoxGeometry(0.012, 0.018, 0.105);
  const side_vent_slats = new THREE.InstancedMesh(
    side_vent_slatsGeom,
    side_vent_slatsMat,
    10
  );
  side_vent_slats.name = "side_vent_slats";
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    vent_dummy.position.set(0.294, 1.18 - i * 0.055, 0.025);
    vent_dummy.rotation.set(-0.12, 0, 0);
    vent_dummy.scale.set(1, 1, 1);
    vent_dummy.updateMatrix();
    side_vent_slats.setMatrixAt(i, vent_dummy.matrix);
  }
  side_vent_slats.instanceMatrix.needsUpdate = true;
  side_controls.add(side_vent_slats);

  const side_indicator_lightsMat = white_ledMat;
  const side_indicator_lightsGeom = new THREE.BoxGeometry(0.006, 0.018, 0.008);
  const side_indicator_lights = new THREE.InstancedMesh(
    side_indicator_lightsGeom,
    side_indicator_lightsMat,
    4
  );
  side_indicator_lights.name = "side_indicator_lights";
  const indicator_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    indicator_dummy.position.set(0.307, 1.47 - i * 0.045, 0.075);
    indicator_dummy.rotation.set(0, 0, 0);
    indicator_dummy.scale.set(1, 1, 1);
    indicator_dummy.updateMatrix();
    side_indicator_lights.setMatrixAt(i, indicator_dummy.matrix);
  }
  side_indicator_lights.instanceMatrix.needsUpdate = true;
  side_controls.add(side_indicator_lights);

  const side_panel_seamMat = black_plasticMat;
  const side_panel_seamGeom = new THREE.BoxGeometry(0.014, 0.008, 0.25);
  const side_panel_seam = new THREE.Mesh(side_panel_seamGeom, side_panel_seamMat);
  side_panel_seam.name = "side_panel_seam";
  side_panel_seam.position.set(0.292, 1.405, 0.005);
  side_controls.add(side_panel_seam);

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