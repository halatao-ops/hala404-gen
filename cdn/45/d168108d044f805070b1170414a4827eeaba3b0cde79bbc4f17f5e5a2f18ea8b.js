export default function generate(THREE) {
  const root = new THREE.Group();

  const red_hullMat = new THREE.MeshStandardMaterial({
    color: 0xc91520,
    metalness: 0.3,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const white_hullMat = new THREE.MeshStandardMaterial({
    color: 0xf2f3f1,
    metalness: 0.2,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f4,
    metalness: 0.1,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x35434a,
    metalness: 0.1,
    roughness: 0.2,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });
  const cockpitMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0xb51220,
    metalness: 0.0,
    roughness: 0.6,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.1,
    roughness: 0.7,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d5,
    metalness: 0.6,
    roughness: 0.4,
  });

  function createLoftGeometry(stations, ringBuilder) {
    const vertices = [];
    const indices = [];
    const firstRing = ringBuilder(stations[0]);
    const ringSize = firstRing.length;

    for (let i = 0; i < stations.length; i++) {
      const ring = i === 0 ? firstRing : ringBuilder(stations[i]);
      for (let j = 0; j < ringSize; j++) {
        vertices.push(ring[j][0], ring[j][1], stations[i].z);
      }
    }

    for (let i = 0; i < stations.length - 1; i++) {
      for (let j = 0; j < ringSize; j++) {
        const next = (j + 1) % ringSize;
        const a = i * ringSize + j;
        const b = i * ringSize + next;
        const c = (i + 1) * ringSize + next;
        const d = (i + 1) * ringSize + j;
        indices.push(a, b, d, b, c, d);
      }
    }

    for (let j = 1; j < ringSize - 1; j++) {
      indices.push(0, j + 1, j);
    }

    const end = (stations.length - 1) * ringSize;
    for (let j = 1; j < ringSize - 1; j++) {
      indices.push(end, end + j, end + j + 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createSidePanelGeometry(points) {
    const vertices = [];
    const indices = [];
    for (const point of points) {
      vertices.push(0, point.y, point.z);
    }
    for (let i = 1; i < points.length - 1; i++) {
      indices.push(0, i, i + 1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createQuadGeometry(points) {
    const vertices = [];
    for (const point of points) {
      vertices.push(point.x, point.y, point.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex([0, 1, 2, 0, 2, 3]);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createTube(p1, p2, radius, material) {
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.LineCurve3(p1, p2),
        1,
        radius,
        8,
        false
      ),
      material
    );
  }

  const red_hullStations = [
    { z: -2.75, w: 0.72, top: 0.47, chine: -0.27, keel: -0.47 },
    { z: -2.35, w: 0.86, top: 0.49, chine: -0.31, keel: -0.57 },
    { z: -1.30, w: 0.92, top: 0.50, chine: -0.33, keel: -0.65 },
    { z: 0.00, w: 0.94, top: 0.51, chine: -0.32, keel: -0.66 },
    { z: 1.20, w: 0.88, top: 0.53, chine: -0.28, keel: -0.58 },
    { z: 2.15, w: 0.62, top: 0.55, chine: -0.12, keel: -0.34 },
    { z: 2.75, w: 0.20, top: 0.56, chine: 0.22, keel: 0.10 },
    { z: 2.95, w: 0.025, top: 0.54, chine: 0.43, keel: 0.39 },
  ];
  const red_hullGeom = createLoftGeometry(red_hullStations, (s) => [
    [-s.w, s.top],
    [-s.w * 0.98, s.chine],
    [-s.w * 0.48, s.keel],
    [0, s.keel - 0.025],
    [s.w * 0.48, s.keel],
    [s.w * 0.98, s.chine],
    [s.w, s.top],
  ]);
  const red_hull = new THREE.Mesh(red_hullGeom, red_hullMat);
  root.add(red_hull);

  const white_hullStations = [
    { z: -2.75, w: 0.72, top: -0.28, bottom: -0.50 },
    { z: -2.35, w: 0.86, top: -0.31, bottom: -0.60 },
    { z: -1.30, w: 0.92, top: -0.33, bottom: -0.68 },
    { z: 0.00, w: 0.94, top: -0.32, bottom: -0.69 },
    { z: 1.20, w: 0.88, top: -0.28, bottom: -0.61 },
    { z: 2.15, w: 0.62, top: -0.12, bottom: -0.38 },
    { z: 2.75, w: 0.20, top: 0.22, bottom: 0.08 },
    { z: 2.95, w: 0.025, top: 0.43, bottom: 0.38 },
  ];
  const white_hullGeom = createLoftGeometry(white_hullStations, (s) => [
    [-s.w, s.top],
    [-s.w * 0.98, s.bottom + 0.04],
    [-s.w * 0.55, s.bottom],
    [0, s.bottom - 0.025],
    [s.w * 0.55, s.bottom],
    [s.w * 0.98, s.bottom + 0.04],
    [s.w, s.top],
  ]);
  const white_hull = new THREE.Mesh(white_hullGeom, white_hullMat);
  root.add(white_hull);

  const deckStations = [
    { z: -2.78, w: 0.74, lower: 0.46, upper: 0.55 },
    { z: -2.35, w: 0.87, lower: 0.48, upper: 0.58 },
    { z: -1.20, w: 0.93, lower: 0.49, upper: 0.59 },
    { z: 0.00, w: 0.94, lower: 0.50, upper: 0.59 },
    { z: 1.20, w: 0.88, lower: 0.52, upper: 0.61 },
    { z: 2.20, w: 0.61, lower: 0.54, upper: 0.62 },
    { z: 2.82, w: 0.16, lower: 0.54, upper: 0.59 },
    { z: 2.98, w: 0.02, lower: 0.52, upper: 0.55 },
  ];
  const deckGeom = createLoftGeometry(deckStations, (s) => [
    [-s.w, s.lower],
    [-s.w, s.upper],
    [s.w, s.upper],
    [s.w, s.lower],
  ]);
  const deck = new THREE.Mesh(deckGeom, deckMat);
  root.add(deck);

  const foredeckShape = new THREE.Shape();
  foredeckShape.moveTo(-0.78, 0);
  foredeckShape.lineTo(0.78, 0);
  foredeckShape.lineTo(0.06, 0.78);
  foredeckShape.lineTo(-0.06, 0.78);
  foredeckShape.closePath();
  const foredeckGeom = new THREE.ShapeGeometry(foredeckShape);
  const foredeck = new THREE.Mesh(foredeckGeom, deckMat);
  foredeck.rotation.x = Math.PI / 2 + 0.035;
  foredeck.position.set(0, 0.615, 1.90);
  root.add(foredeck);

  const cockpit_wellGeom = new THREE.BoxGeometry(1.48, 0.045, 1.95);
  const cockpit_well = new THREE.Mesh(cockpit_wellGeom, cockpitMat);
  cockpit_well.position.set(0, 0.595, -0.62);
  root.add(cockpit_well);

  const cockpit_coamingGeom = new THREE.BoxGeometry(0.075, 0.07, 2.08);
  const port_cockpit_coaming = new THREE.Mesh(cockpit_coamingGeom, deckMat);
  port_cockpit_coaming.position.set(-0.79, 0.625, -0.58);
  root.add(port_cockpit_coaming);

  const starboard_cockpit_coaming = new THREE.Mesh(
    cockpit_coamingGeom,
    deckMat
  );
  starboard_cockpit_coaming.position.set(0.79, 0.625, -0.58);
  root.add(starboard_cockpit_coaming);

  const rear_cockpit_coamingGeom = new THREE.BoxGeometry(1.58, 0.07, 0.08);
  const rear_cockpit_coaming = new THREE.Mesh(
    rear_cockpit_coamingGeom,
    deckMat
  );
  rear_cockpit_coaming.position.set(0, 0.625, -1.62);
  root.add(rear_cockpit_coaming);

  const port_side_panelGeom = createSidePanelGeometry([
    { z: -2.58, y: 0.565 },
    { z: -1.68, y: 0.575 },
    { z: -0.78, y: 0.69 },
    { z: 0.12, y: 0.68 },
    { z: 0.42, y: 0.585 },
    { z: -0.62, y: 0.585 },
  ]);
  const port_side_panel = new THREE.Mesh(port_side_panelGeom, red_hullMat);
  port_side_panel.position.x = -0.935;
  root.add(port_side_panel);

  const starboard_side_panelGeom = createSidePanelGeometry([
    { z: 0.42, y: 0.585 },
    { z: 0.12, y: 0.68 },
    { z: -0.78, y: 0.69 },
    { z: -1.68, y: 0.575 },
    { z: -2.58, y: 0.565 },
    { z: -0.62, y: 0.585 },
  ]);
  const starboard_side_panel = new THREE.Mesh(
    starboard_side_panelGeom,
    red_hullMat
  );
  starboard_side_panel.position.x = 0.935;
  root.add(starboard_side_panel);

  const port_windshieldGeom = createQuadGeometry([
    new THREE.Vector3(-0.79, 0.61, 0.43),
    new THREE.Vector3(0, 0.61, 0.43),
    new THREE.Vector3(0, 0.99, 0.08),
    new THREE.Vector3(-0.67, 0.98, 0.08),
  ]);
  const port_windshield = new THREE.Mesh(port_windshieldGeom, glassMat);
  root.add(port_windshield);

  const starboard_windshieldGeom = createQuadGeometry([
    new THREE.Vector3(0, 0.61, 0.43),
    new THREE.Vector3(0.79, 0.61, 0.43),
    new THREE.Vector3(0.67, 0.98, 0.08),
    new THREE.Vector3(0, 0.99, 0.08),
  ]);
  const starboard_windshield = new THREE.Mesh(
    starboard_windshieldGeom,
    glassMat
  );
  root.add(starboard_windshield);

  const port_side_windowGeom = createQuadGeometry([
    new THREE.Vector3(-0.67, 0.98, 0.08),
    new THREE.Vector3(0, 0.99, 0.08),
    new THREE.Vector3(0, 0.965, -0.78),
    new THREE.Vector3(-0.66, 0.95, -0.78),
  ]);
  const port_side_window = new THREE.Mesh(port_side_windowGeom, glassMat);
  root.add(port_side_window);

  const starboard_side_windowGeom = createQuadGeometry([
    new THREE.Vector3(0, 0.99, 0.08),
    new THREE.Vector3(0.67, 0.98, 0.08),
    new THREE.Vector3(0.66, 0.95, -0.78),
    new THREE.Vector3(0, 0.965, -0.78),
  ]);
  const starboard_side_window = new THREE.Mesh(
    starboard_side_windowGeom,
    glassMat
  );
  root.add(starboard_side_window);

  const rear_windshieldGeom = createQuadGeometry([
    new THREE.Vector3(-0.66, 0.95, -0.78),
    new THREE.Vector3(0.66, 0.95, -0.78),
    new THREE.Vector3(0.61, 0.76, -1.48),
    new THREE.Vector3(-0.61, 0.76, -1.48),
  ]);
  const rear_windshield = new THREE.Mesh(rear_windshieldGeom, glassMat);
  root.add(rear_windshield);

  const windshield_center_frame = createTube(
    new THREE.Vector3(0, 0.605, 0.44),
    new THREE.Vector3(0, 1.0, 0.075),
    0.022,
    red_hullMat
  );
  root.add(windshield_center_frame);

  const port_windshield_top_frame = createTube(
    new THREE.Vector3(-0.67, 0.985, 0.08),
    new THREE.Vector3(0, 1.0, 0.075),
    0.024,
    red_hullMat
  );
  root.add(port_windshield_top_frame);

  const starboard_windshield_top_frame = createTube(
    new THREE.Vector3(0, 1.0, 0.075),
    new THREE.Vector3(0.67, 0.985, 0.08),
    0.024,
    red_hullMat
  );
  root.add(starboard_windshield_top_frame);

  const port_roof_rail = createTube(
    new THREE.Vector3(-0.67, 0.985, 0.08),
    new THREE.Vector3(-0.66, 0.95, -0.78),
    0.025,
    red_hullMat
  );
  root.add(port_roof_rail);

  const starboard_roof_rail = createTube(
    new THREE.Vector3(0.67, 0.985, 0.08),
    new THREE.Vector3(0.66, 0.95, -0.78),
    0.025,
    red_hullMat
  );
  root.add(starboard_roof_rail);

  const rear_roof_rail = createTube(
    new THREE.Vector3(-0.66, 0.95, -0.78),
    new THREE.Vector3(0.66, 0.95, -0.78),
    0.025,
    red_hullMat
  );
  root.add(rear_roof_rail);

  const port_window_lower_frame = createTube(
    new THREE.Vector3(-0.79, 0.61, 0.43),
    new THREE.Vector3(-0.66, 0.95, -0.78),
    0.018,
    red_hullMat
  );
  root.add(port_window_lower_frame);

  const starboard_window_lower_frame = createTube(
    new THREE.Vector3(0.79, 0.61, 0.43),
    new THREE.Vector3(0.66, 0.95, -0.78),
    0.018,
    red_hullMat
  );
  root.add(starboard_window_lower_frame);

  const seat_cushionGeom = new THREE.BoxGeometry(0.42, 0.10, 0.42);
  const seat_backGeom = new THREE.BoxGeometry(0.42, 0.38, 0.10);

  const port_seat_cushion = new THREE.Mesh(seat_cushionGeom, seatMat);
  port_seat_cushion.position.set(-0.34, 0.68, -0.66);
  root.add(port_seat_cushion);

  const starboard_seat_cushion = new THREE.Mesh(seat_cushionGeom, seatMat);
  starboard_seat_cushion.position.set(0.34, 0.68, -0.66);
  root.add(starboard_seat_cushion);

  const port_seat_back = new THREE.Mesh(seat_backGeom, seatMat);
  port_seat_back.position.set(-0.34, 0.86, -0.88);
  port_seat_back.rotation.x = -0.16;
  root.add(port_seat_back);

  const starboard_seat_back = new THREE.Mesh(seat_backGeom, seatMat);
  starboard_seat_back.position.set(0.34, 0.86, -0.88);
  starboard_seat_back.rotation.x = -0.16;
  root.add(starboard_seat_back);

  const headrestGeom = new THREE.SphereGeometry(1, 16, 10);
  const port_headrest = new THREE.Mesh(headrestGeom, seatMat);
  port_headrest.scale.set(0.20, 0.10, 0.075);
  port_headrest.position.set(-0.34, 1.04, -0.91);
  root.add(port_headrest);

  const starboard_headrest = new THREE.Mesh(headrestGeom, seatMat);
  starboard_headrest.scale.set(0.20, 0.10, 0.075);
  starboard_headrest.position.set(0.34, 1.04, -0.91);
  root.add(starboard_headrest);

  const steering_wheelGeom = new THREE.TorusGeometry(0.12, 0.018, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, trimMat);
  steering_wheel.position.set(0.34, 0.82, -0.18);
  steering_wheel.rotation.x = -0.22;
  root.add(steering_wheel);

  const steering_column = createTube(
    new THREE.Vector3(0.34, 0.72, -0.30),
    new THREE.Vector3(0.34, 0.82, -0.18),
    0.018,
    trimMat
  );
  root.add(steering_column);

  const port_rub_rail = createTube(
    new THREE.Vector3(-0.94, 0.50, -2.62),
    new THREE.Vector3(-0.94, 0.50, 1.55),
    0.025,
    deckMat
  );
  root.add(port_rub_rail);

  const starboard_rub_rail = createTube(
    new THREE.Vector3(0.94, 0.50, -2.62),
    new THREE.Vector3(0.94, 0.50, 1.55),
    0.025,
    deckMat
  );
  root.add(starboard_rub_rail);

  const port_gunwale = createTube(
    new THREE.Vector3(-0.88, 0.58, -2.62),
    new THREE.Vector3(-0.88, 0.58, 1.55),
    0.035,
    deckMat
  );
  root.add(port_gunwale);

  const starboard_gunwale = createTube(
    new THREE.Vector3(0.88, 0.58, -2.62),
    new THREE.Vector3(0.88, 0.58, 1.55),
    0.035,
    deckMat
  );
  root.add(starboard_gunwale);

  const port_red_pinstripe = createTube(
    new THREE.Vector3(-0.945, 0.545, -2.55),
    new THREE.Vector3(-0.945, 0.545, 1.50),
    0.012,
    red_hullMat
  );
  root.add(port_red_pinstripe);

  const starboard_red_pinstripe = createTube(
    new THREE.Vector3(0.945, 0.545, -2.55),
    new THREE.Vector3(0.945, 0.545, 1.50),
    0.012,
    red_hullMat
  );
  root.add(starboard_red_pinstripe);

  const bow_rollerGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.30, 12);
  const bow_roller = new THREE.Mesh(bow_rollerGeom, silverMat);
  bow_roller.rotation.z = Math.PI / 2;
  bow_roller.position.set(0, 0.53, 2.96);
  root.add(bow_roller);

  const cleatGeom = new THREE.BoxGeometry(0.18, 0.035, 0.045);
  const port_bow_cleat = new THREE.Mesh(cleatGeom, silverMat);
  port_bow_cleat.position.set(-0.38, 0.64, 2.12);
  root.add(port_bow_cleat);

  const starboard_bow_cleat = new THREE.Mesh(cleatGeom, silverMat);
  starboard_bow_cleat.position.set(0.38, 0.64, 2.12);
  root.add(starboard_bow_cleat);

  const port_rear_cleat = new THREE.Mesh(cleatGeom, silverMat);
  port_rear_cleat.position.set(-0.55, 0.63, -2.28);
  root.add(port_rear_cleat);

  const starboard_rear_cleat = new THREE.Mesh(cleatGeom, silverMat);
  starboard_rear_cleat.position.set(0.55, 0.63, -2.28);
  root.add(starboard_rear_cleat);

  const side_logo_barGeom = new THREE.BoxGeometry(0.018, 0.035, 0.16);
  const side_logo_bars = new THREE.InstancedMesh(
    side_logo_barGeom,
    silverMat,
    10
  );
  const logo_dummy = new THREE.Object3D();
  let logo_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      logo_dummy.position.set(
        side * 0.952,
        0.10 + (i % 2) * 0.018,
        -2.05 + i * 0.15
      );
      logo_dummy.rotation.set(-0.28, 0, 0);
      logo_dummy.updateMatrix();
      side_logo_bars.setMatrixAt(logo_index++, logo_dummy.matrix);
    }
  }
  root.add(side_logo_bars);

  const side_badgeGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 16);
  const port_side_badge = new THREE.Mesh(side_badgeGeom, silverMat);
  port_side_badge.rotation.z = Math.PI / 2;
  port_side_badge.position.set(-0.952, -0.02, -2.30);
  root.add(port_side_badge);

  const starboard_side_badge = new THREE.Mesh(side_badgeGeom, silverMat);
  starboard_side_badge.rotation.z = Math.PI / 2;
  starboard_side_badge.position.set(0.952, -0.02, -2.30);
  root.add(starboard_side_badge);

  const transom_plateGeom = new THREE.BoxGeometry(0.55, 0.34, 0.045);
  const transom_plate = new THREE.Mesh(transom_plateGeom, trimMat);
  transom_plate.position.set(0, -0.12, -2.78);
  root.add(transom_plate);

  const outdrive_strut = createTube(
    new THREE.Vector3(0, -0.22, -2.78),
    new THREE.Vector3(0, -0.48, -2.98),
    0.065,
    trimMat
  );
  root.add(outdrive_strut);

  const lower_unitGeom = new THREE.BoxGeometry(0.20, 0.24, 0.18);
  const lower_unit = new THREE.Mesh(lower_unitGeom, trimMat);
  lower_unit.position.set(0, -0.53, -3.02);
  lower_unit.rotation.x = -0.18;
  root.add(lower_unit);

  const propeller_shaftGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.28,
    12
  );
  const propeller_shaft = new THREE.Mesh(propeller_shaftGeom, silverMat);
  propeller_shaft.rotation.x = Math.PI / 2;
  propeller_shaft.position.set(0, -0.55, -3.14);
  root.add(propeller_shaft);

  const propeller_hubGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.08,
    12
  );
  const propeller_hub = new THREE.Mesh(propeller_hubGeom, silverMat);
  propeller_hub.rotation.x = Math.PI / 2;
  propeller_hub.position.set(0, -0.55, -3.29);
  root.add(propeller_hub);

  const propeller_bladeGeom = new THREE.BoxGeometry(0.055, 0.22, 0.025);
  const propeller_blades = new THREE.InstancedMesh(
    propeller_bladeGeom,
    silverMat,
    3
  );
  const blade_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    blade_dummy.position.set(0, -0.55, -3.30);
    blade_dummy.rotation.set(0, 0, (i / 3) * Math.PI * 2);
    blade_dummy.updateMatrix();
    propeller_blades.setMatrixAt(i, blade_dummy.matrix);
  }
  root.add(propeller_blades);

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