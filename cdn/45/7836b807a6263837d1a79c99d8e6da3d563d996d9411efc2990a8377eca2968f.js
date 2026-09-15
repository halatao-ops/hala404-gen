export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0874dc, metalness: 0.35, roughness: 0.3 });
  const bodyDarkMat = new THREE.MeshStandardMaterial({ color: 0x045bb8, metalness: 0.25, roughness: 0.35 });
  const cyanDecalMat = new THREE.MeshStandardMaterial({ color: 0x00bdf2, metalness: 0.1, roughness: 0.35, side: THREE.DoubleSide });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x17191c, metalness: 0.1, roughness: 0.8 });
  const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x30343a, metalness: 0.1, roughness: 0.75 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x526b7a, metalness: 0.0, roughness: 0.2, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xeaf5ff, metalness: 0.1, roughness: 0.25, side: THREE.DoubleSide });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xc9cdd0, metalness: 0.5, roughness: 0.35 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0, roughness: 0.85 });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x343b42, metalness: 0.0, roughness: 0.8 });
  const redLightMat = new THREE.MeshStandardMaterial({ color: 0xd52222, metalness: 0.1, roughness: 0.35 });

  const dummy = new THREE.Object3D();

  function addBox(w, h, d, x, y, z, mat) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    root.add(m);
    return m;
  }

  function addSidePlane(side, z, y, w, h, mat, offset) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.rotation.y = side * Math.PI / 2;
    m.position.set(side * (0.84 + offset), y, z);
    root.add(m);
    return m;
  }

  function addSideShape(side, points, mat, offset) {
    const shape = new THREE.Shape();
    shape.moveTo(-side * points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) shape.lineTo(-side * points[i][0], points[i][1]);
    shape.closePath();
    const m = new THREE.Mesh(new THREE.ShapeGeometry(shape), mat);
    m.rotation.y = side * Math.PI / 2;
    m.position.x = side * (0.842 + offset);
    root.add(m);
    return m;
  }

  function addTube(p1, p2, radius, mat) {
    const curve = new THREE.LineCurve3(p1, p2);
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 1, radius, 8), mat);
    root.add(m);
    return m;
  }

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-2.35, 0.42);
  bodyShape.lineTo(2.25, 0.42);
  bodyShape.quadraticCurveTo(2.55, 0.45, 2.58, 0.72);
  bodyShape.lineTo(2.52, 1.18);
  bodyShape.quadraticCurveTo(2.42, 1.48, 2.12, 1.62);
  bodyShape.lineTo(1.42, 2.34);
  bodyShape.quadraticCurveTo(1.12, 2.58, 0.55, 2.62);
  bodyShape.lineTo(-1.95, 2.62);
  bodyShape.quadraticCurveTo(-2.35, 2.58, -2.48, 2.25);
  bodyShape.lineTo(-2.55, 0.72);
  bodyShape.quadraticCurveTo(-2.55, 0.50, -2.35, 0.42);
  bodyShape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 1.66,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 3
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.rotation.y = -Math.PI / 2;
  body.position.x = 0.83;
  root.add(body);

  const roof = addBox(1.58, 0.08, 3.75, 0, 2.62, -0.25, bodyMat);
  const roof_front_round = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.55, 24), bodyMat);
  roof_front_round.rotation.z = Math.PI / 2;
  roof_front_round.position.set(0, 2.54, 1.42);
  root.add(roof_front_round);

  const hood = addBox(1.52, 0.12, 0.92, 0, 1.43, 2.08, bodyMat);
  hood.rotation.x = -0.08;
  const hood_center_ridge = addBox(0.05, 0.025, 0.72, 0, 1.50, 2.05, bodyDarkMat);
  hood_center_ridge.rotation.x = -0.08;

  const windshield_frame = addBox(1.58, 1.02, 0.045, 0, 1.98, 1.79, blackMat);
  windshield_frame.rotation.x = -0.55;
  const windshield = addBox(1.42, 0.88, 0.035, 0, 2.00, 1.82, glassMat);
  windshield.rotation.x = -0.55;
  windshield.position.z += 0.025;

  const left_a_pillar = addTube(new THREE.Vector3(-0.79, 1.53, 2.18), new THREE.Vector3(-0.79, 2.48, 1.35), 0.045, bodyMat);
  const right_a_pillar = addTube(new THREE.Vector3(0.79, 1.53, 2.18), new THREE.Vector3(0.79, 2.48, 1.35), 0.045, bodyMat);
  const left_wiper = addTube(new THREE.Vector3(-0.55, 1.58, 2.18), new THREE.Vector3(-0.08, 1.72, 2.05), 0.018, blackMat);
  const right_wiper = addTube(new THREE.Vector3(0.55, 1.58, 2.18), new THREE.Vector3(0.08, 1.72, 2.05), 0.018, blackMat);

  const front_grille = addBox(1.22, 0.38, 0.055, 0, 1.02, 2.58, blackMat);
  const grille_top_bar = addBox(1.18, 0.035, 0.065, 0, 1.18, 2.61, darkTrimMat);
  const grille_middle_bar = addBox(1.18, 0.035, 0.065, 0, 1.02, 2.61, darkTrimMat);
  const grille_bottom_bar = addBox(1.18, 0.035, 0.065, 0, 0.86, 2.61, darkTrimMat);
  for (let i = 0; i < 7; i++) {
    const grille_vertical = addBox(0.025, 0.34, 0.065, -0.48 + i * 0.16, 1.02, 2.615, blackMat);
  }

  const logo_ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 12, 32), silverMat);
  logo_ring.position.set(0, 1.02, 2.65);
  root.add(logo_ring);
  const logo_bar = addBox(0.22, 0.035, 0.035, 0, 1.02, 2.66, silverMat);
  logo_bar.rotation.z = -0.35;

  const left_headlight_shape = new THREE.Shape();
  left_headlight_shape.moveTo(-0.82, 1.20);
  left_headlight_shape.lineTo(-0.22, 1.25);
  left_headlight_shape.lineTo(-0.38, 1.48);
  left_headlight_shape.lineTo(-0.78, 1.42);
  left_headlight_shape.closePath();
  const left_headlight = new THREE.Mesh(new THREE.ShapeGeometry(left_headlight_shape), headlightMat);
  left_headlight.position.z = 2.625;
  root.add(left_headlight);

  const right_headlight_shape = new THREE.Shape();
  right_headlight_shape.moveTo(0.22, 1.25);
  right_headlight_shape.lineTo(0.82, 1.20);
  right_headlight_shape.lineTo(0.78, 1.42);
  right_headlight_shape.lineTo(0.38, 1.48);
  right_headlight_shape.closePath();
  const right_headlight = new THREE.Mesh(new THREE.ShapeGeometry(right_headlight_shape), headlightMat);
  right_headlight.position.z = 2.625;
  root.add(right_headlight);

  const left_headlight_reflector = addBox(0.28, 0.08, 0.035, -0.55, 1.33, 2.65, silverMat);
  left_headlight_reflector.rotation.z = -0.15;
  const right_headlight_reflector = addBox(0.28, 0.08, 0.035, 0.55, 1.33, 2.65, silverMat);
  right_headlight_reflector.rotation.z = 0.15;

  const front_bumper = addBox(1.72, 0.28, 0.18, 0, 0.62, 2.58, darkTrimMat);
  const lower_grille = addBox(1.05, 0.16, 0.05, 0, 0.61, 2.69, blackMat);
  const license_plate = addBox(0.58, 0.22, 0.035, 0, 0.67, 2.71, darkTrimMat);
  const left_fog_light = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.035, 20), headlightMat);
  left_fog_light.rotation.x = Math.PI / 2;
  left_fog_light.position.set(-0.58, 0.61, 2.70);
  root.add(left_fog_light);
  const right_fog_light = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.035, 20), headlightMat);
  right_fog_light.rotation.x = Math.PI / 2;
  right_fog_light.position.set(0.58, 0.61, 2.70);
  root.add(right_fog_light);

  const wheelGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.18, 32);
  const tireGeom = new THREE.TorusGeometry(0.29, 0.085, 12, 32);
  const rimGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.045, 24);
  const hubGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.055, 20);
  const wheelPositions = [
    [-0.91, 0.43, 1.55], [0.91, 0.43, 1.55],
    [-0.91, 0.43, -1.55], [0.91, 0.43, -1.55]
  ];

  for (const p of wheelPositions) {
    const tire = new THREE.Mesh(tireGeom, tireMat);
    tire.rotation.y = Math.PI / 2;
    tire.position.set(p[0], p[1], p[2]);
    root.add(tire);

    const wheel = new THREE.Mesh(wheelGeom, tireMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(p[0], p[1], p[2]);
    root.add(wheel);

    const rim = new THREE.Mesh(rimGeom, silverMat);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(p[0] < 0 ? -0.99 : 0.99, p[1], p[2]);
    root.add(rim);

    const hub = new THREE.Mesh(hubGeom, darkTrimMat);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(p[0] < 0 ? -1.02 : 1.02, p[1], p[2]);
    root.add(hub);
  }

  for (const p of wheelPositions) {
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      const spoke = addBox(0.035, 0.22, 0.035, p[0] < 0 ? -1.025 : 1.025, p[1] + Math.cos(a) * 0.10, p[2] + Math.sin(a) * 0.10, silverMat);
      spoke.rotation.x = a;
    }
  }

  const left_cab_window = addSidePlane(1, 1.05, 1.98, 0.92, 0.82, glassMat, 0.01);
  const right_cab_window = addSidePlane(-1, 1.05, 1.98, 0.92, 0.82, glassMat, 0.01);
  const left_cab_window_top_trim = addSidePlane(1, 1.05, 2.40, 0.98, 0.045, blackMat, 0.025);
  const right_cab_window_top_trim = addSidePlane(-1, 1.05, 2.40, 0.98, 0.045, blackMat, 0.025);
  const left_cab_window_bottom_trim = addSidePlane(1, 1.05, 1.56, 0.98, 0.045, blackMat, 0.025);
  const right_cab_window_bottom_trim = addSidePlane(-1, 1.05, 1.56, 0.98, 0.045, blackMat, 0.025);
  const left_cab_window_front_trim = addSidePlane(1, 1.52, 1.98, 0.045, 0.86, blackMat, 0.025);
  const right_cab_window_front_trim = addSidePlane(-1, 1.52, 1.98, 0.045, 0.86, blackMat, 0.025);
  const left_cab_window_rear_trim = addSidePlane(1, 0.58, 1.98, 0.045, 0.86, blackMat, 0.025);
  const right_cab_window_rear_trim = addSidePlane(-1, 0.58, 1.98, 0.045, 0.86, blackMat, 0.025);

  const left_door_seam = addSidePlane(1, 0.52, 1.25, 0.025, 1.72, blackMat, 0.035);
  const right_door_seam = addSidePlane(-1, 0.52, 1.25, 0.025, 1.72, blackMat, 0.035);
  const left_sliding_door_seam = addSidePlane(1, -0.72, 1.25, 0.025, 1.72, blackMat, 0.035);
  const right_sliding_door_seam = addSidePlane(-1, -0.72, 1.25, 0.025, 1.72, blackMat, 0.035);
  const left_rear_panel_seam = addSidePlane(1, -1.82, 1.35, 0.025, 1.55, blackMat, 0.035);
  const right_rear_panel_seam = addSidePlane(-1, -1.82, 1.35, 0.025, 1.55, blackMat, 0.035);

  const left_cargo_upper_rail = addSidePlane(1, -1.05, 1.52, 1.45, 0.035, bodyDarkMat, 0.04);
  const right_cargo_upper_rail = addSidePlane(-1, -1.05, 1.52, 1.45, 0.035, bodyDarkMat, 0.04);
  const left_cargo_lower_rail = addSidePlane(1, -1.05, 1.43, 1.45, 0.025, bodyDarkMat, 0.04);
  const right_cargo_lower_rail = addSidePlane(-1, -1.05, 1.43, 1.45, 0.025, bodyDarkMat, 0.04);

  const left_handle = addBox(0.055, 0.075, 0.24, 0.91, 1.48, 0.38, blackMat);
  const right_handle = addBox(0.055, 0.075, 0.24, -0.91, 1.48, 0.38, blackMat);
  const left_sliding_handle = addBox(0.055, 0.075, 0.24, 0.91, 1.48, -0.62, blackMat);
  const right_sliding_handle = addBox(0.055, 0.075, 0.24, -0.91, 1.48, -0.62, blackMat);

  const left_mirror_stem = addTube(new THREE.Vector3(0.78, 1.62, 1.48), new THREE.Vector3(1.02, 1.67, 1.50), 0.035, blackMat);
  const right_mirror_stem = addTube(new THREE.Vector3(-0.78, 1.62, 1.48), new THREE.Vector3(-1.02, 1.67, 1.50), 0.035, blackMat);
  const left_mirror = addBox(0.18, 0.30, 0.24, 1.08, 1.68, 1.50, darkTrimMat);
  const right_mirror = addBox(0.18, 0.30, 0.24, -1.08, 1.68, 1.50, darkTrimMat);
  const left_mirror_glass = addBox(0.025, 0.22, 0.17, 1.18, 1.68, 1.50, glassMat);
  const right_mirror_glass = addBox(0.025, 0.22, 0.17, -1.18, 1.68, 1.50, glassMat);

  const left_side_protector = addSidePlane(1, -0.15, 0.78, 2.15, 0.18, darkTrimMat, 0.055);
  const right_side_protector = addSidePlane(-1, -0.15, 0.78, 2.15, 0.18, darkTrimMat, 0.055);
  const left_rear_bumper = addBox(0.16, 0.28, 0.55, 0.91, 0.62, -2.28, darkTrimMat);
  const right_rear_bumper = addBox(0.16, 0.28, 0.55, -0.91, 0.62, -2.28, darkTrimMat);
  const rear_bumper = addBox(1.72, 0.28, 0.16, 0, 0.62, -2.50, darkTrimMat);

  const left_tail_light = addBox(0.13, 0.55, 0.07, 0.88, 1.25, -2.48, redLightMat);
  const right_tail_light = addBox(0.13, 0.55, 0.07, -0.88, 1.25, -2.48, redLightMat);
  const rear_door_seam = addBox(0.025, 1.75, 0.04, 0, 1.45, -2.53, blackMat);

  const cyan_front_flash = addSideShape(1, [[1.72, 0.62], [1.25, 0.62], [0.62, 1.28], [1.18, 1.28]], cyanDecalMat, 0.065);
  const cyan_rear_flash = addSideShape(1, [[0.58, 0.58], [0.15, 0.58], [-0.55, 1.28], [0.05, 1.28]], cyanDecalMat, 0.065);
  const cyan_center_slash = addSideShape(1, [[-0.18, 0.58], [-0.42, 0.58], [-1.08, 1.28], [-0.82, 1.28]], cyanDecalMat, 0.066);
  const cyan_upper_accent = addSideShape(1, [[-0.72, 1.36], [-1.65, 1.36], [-1.48, 1.50], [-0.55, 1.50]], cyanDecalMat, 0.067);
  const cyan_lower_accent = addSideShape(1, [[-0.10, 0.55], [-1.18, 0.55], [-0.98, 0.70], [0.05, 0.70]], cyanDecalMat, 0.067);

  const cyan_front_flash_right = addSideShape(-1, [[1.72, 0.62], [1.25, 0.62], [0.62, 1.28], [1.18, 1.28]], cyanDecalMat, 0.065);
  const cyan_rear_flash_right = addSideShape(-1, [[0.58, 0.58], [0.15, 0.58], [-0.55, 1.28], [0.05, 1.28]], cyanDecalMat, 0.065);
  const cyan_center_slash_right = addSideShape(-1, [[-0.18, 0.58], [-0.42, 0.58], [-1.08, 1.28], [-0.82, 1.28]], cyanDecalMat, 0.066);
  const cyan_upper_accent_right = addSideShape(-1, [[-0.72, 1.36], [-1.65, 1.36], [-1.48, 1.50], [-0.55, 1.50]], cyanDecalMat, 0.067);
  const cyan_lower_accent_right = addSideShape(-1, [[-0.10, 0.55], [-1.18, 0.55], [-0.98, 0.70], [0.05, 0.70]], cyanDecalMat, 0.067);

  const left_roof_rib = addBox(0.035, 0.025, 3.15, -0.42, 2.68, -0.25, bodyDarkMat);
  const right_roof_rib = addBox(0.035, 0.025, 3.15, 0.42, 2.68, -0.25, bodyDarkMat);
  const center_roof_rib = addBox(0.035, 0.025, 3.15, 0, 2.69, -0.25, bodyDarkMat);

  const roof_antenna_base = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.055, 20), blackMat);
  roof_antenna_base.position.set(0.25, 2.70, -1.25);
  root.add(roof_antenna_base);
  const roof_antenna = addTube(new THREE.Vector3(0.25, 2.73, -1.25), new THREE.Vector3(0.36, 3.05, -1.42), 0.012, blackMat);

  const front_seat_back = addBox(0.42, 0.62, 0.16, -0.32, 1.55, 0.82, seatMat);
  const passenger_seat_back = addBox(0.42, 0.62, 0.16, 0.32, 1.55, 0.82, seatMat);
  const front_seat_headrest = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 10), seatMat);
  front_seat_headrest.scale.set(1, 0.8, 0.55);
  front_seat_headrest.position.set(-0.32, 1.95, 0.82);
  root.add(front_seat_headrest);
  const passenger_seat_headrest = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 10), seatMat);
  passenger_seat_headrest.scale.set(1, 0.8, 0.55);
  passenger_seat_headrest.position.set(0.32, 1.95, 0.82);
  root.add(passenger_seat_headrest);
  const dashboard = addBox(1.25, 0.18, 0.38, 0, 1.48, 1.48, darkTrimMat);

  const left_side_marker = addBox(0.035, 0.08, 0.14, 0.91, 1.30, 1.88, headlightMat);
  const right_side_marker = addBox(0.035, 0.08, 0.14, -0.91, 1.30, 1.88, headlightMat);

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