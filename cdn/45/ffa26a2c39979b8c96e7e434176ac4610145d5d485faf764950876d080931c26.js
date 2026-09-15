export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_bell";

  const bell_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x59422f,
    metalness: 0.6,
    roughness: 0.48,
    side: THREE.DoubleSide,
  });
  const ornamentMat = new THREE.MeshStandardMaterial({
    color: 0x806244,
    metalness: 0.6,
    roughness: 0.42,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x382d25,
    metalness: 0.35,
    roughness: 0.72,
  });
  const bell_interiorMat = new THREE.MeshStandardMaterial({
    color: 0x171411,
    metalness: 0.2,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const green_patinaMat = new THREE.MeshStandardMaterial({
    color: 0x31483c,
    metalness: 0.2,
    roughness: 0.8,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
  const brown_patinaMat = new THREE.MeshStandardMaterial({
    color: 0x6b3f2d,
    metalness: 0.2,
    roughness: 0.8,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
  });

  const bell_bodyProfile = [
    { y: -0.72, r: 0.43 },
    { y: -0.62, r: 0.49 },
    { y: -0.48, r: 0.46 },
    { y: -0.30, r: 0.39 },
    { y: -0.08, r: 0.31 },
    { y: 0.16, r: 0.27 },
    { y: 0.34, r: 0.28 },
    { y: 0.40, r: 0.31 },
    { y: 0.46, r: 0.31 },
    { y: 0.50, r: 0.28 },
    { y: 0.54, r: 0.22 },
    { y: 0.56, r: 0.10 },
  ];

  function radiusAt(y) {
    if (y <= bell_bodyProfile[0].y) return bell_bodyProfile[0].r;
    for (let i = 0; i < bell_bodyProfile.length - 1; i++) {
      const a = bell_bodyProfile[i];
      const b = bell_bodyProfile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return bell_bodyProfile[bell_bodyProfile.length - 1].r;
  }

  function surfacePoint(angle, y, extra) {
    const r = radiusAt(y) + extra;
    return new THREE.Vector3(Math.sin(angle) * r, y, Math.cos(angle) * r);
  }

  function makeClosedTube(points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, true),
      material
    );
  }

  function makeOpenTube(points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, false),
      material
    );
  }

  function makeHorizontalRing(y, radius, tubeRadius, material) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, tubeRadius, 8, 64),
      material
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    return ring;
  }

  const bell_bodyPositions = [];
  const bell_bodyIndices = [];
  const bell_bodySegments = 72;
  for (const point of bell_bodyProfile) {
    for (let i = 0; i < bell_bodySegments; i++) {
      const angle = i / bell_bodySegments * Math.PI * 2;
      bell_bodyPositions.push(
        Math.sin(angle) * point.r,
        point.y,
        Math.cos(angle) * point.r
      );
    }
  }
  for (let row = 0; row < bell_bodyProfile.length - 1; row++) {
    for (let i = 0; i < bell_bodySegments; i++) {
      const next = (i + 1) % bell_bodySegments;
      const a = row * bell_bodySegments + i;
      const b = row * bell_bodySegments + next;
      const c = (row + 1) * bell_bodySegments + i;
      const d = (row + 1) * bell_bodySegments + next;
      bell_bodyIndices.push(a, c, b, b, c, d);
    }
  }

  const bell_bodyGeom = new THREE.BufferGeometry();
  bell_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bell_bodyPositions, 3)
  );
  bell_bodyGeom.setIndex(bell_bodyIndices);
  bell_bodyGeom.computeVertexNormals();

  const bell_body = new THREE.Mesh(bell_bodyGeom, bell_bodyMat);
  bell_body.name = "bell_body";
  root.add(bell_body);

  const bell_interiorGeom = new THREE.CircleGeometry(0.405, 64);
  const bell_interior = new THREE.Mesh(bell_interiorGeom, bell_interiorMat);
  bell_interior.name = "bell_interior";
  bell_interior.rotation.x = Math.PI / 2;
  bell_interior.position.y = -0.724;
  root.add(bell_interior);

  const lower_rim = makeHorizontalRing(-0.705, 0.445, 0.025, bell_bodyMat);
  lower_rim.name = "lower_rim";
  root.add(lower_rim);

  const lower_rim_trim = makeHorizontalRing(-0.675, 0.475, 0.009, ornamentMat);
  lower_rim_trim.name = "lower_rim_trim";
  root.add(lower_rim_trim);

  const lower_band_bottom_ring = makeHorizontalRing(
    -0.625,
    radiusAt(-0.625) + 0.008,
    0.011,
    ornamentMat
  );
  lower_band_bottom_ring.name = "lower_band_bottom_ring";
  root.add(lower_band_bottom_ring);

  const lower_band_top_ring = makeHorizontalRing(
    -0.365,
    radiusAt(-0.365) + 0.008,
    0.011,
    ornamentMat
  );
  lower_band_top_ring.name = "lower_band_top_ring";
  root.add(lower_band_top_ring);

  const lower_band_inner_ring = makeHorizontalRing(
    -0.392,
    radiusAt(-0.392) + 0.009,
    0.006,
    patinaMat
  );
  lower_band_inner_ring.name = "lower_band_inner_ring";
  root.add(lower_band_inner_ring);

  const upper_band_bottom_ring = makeHorizontalRing(
    0.155,
    radiusAt(0.155) + 0.008,
    0.010,
    ornamentMat
  );
  upper_band_bottom_ring.name = "upper_band_bottom_ring";
  root.add(upper_band_bottom_ring);

  const upper_band_top_ring = makeHorizontalRing(
    0.345,
    radiusAt(0.345) + 0.008,
    0.011,
    ornamentMat
  );
  upper_band_top_ring.name = "upper_band_top_ring";
  root.add(upper_band_top_ring);

  const upper_band_inner_ring = makeHorizontalRing(
    0.318,
    radiusAt(0.318) + 0.009,
    0.006,
    patinaMat
  );
  upper_band_inner_ring.name = "upper_band_inner_ring";
  root.add(upper_band_inner_ring);

  const top_cap_rim = makeHorizontalRing(
    0.455,
    radiusAt(0.455) + 0.006,
    0.010,
    ornamentMat
  );
  top_cap_rim.name = "top_cap_rim";
  root.add(top_cap_rim);

  const top_dome_rim = makeHorizontalRing(
    0.505,
    radiusAt(0.505) + 0.004,
    0.007,
    patinaMat
  );
  top_dome_rim.name = "top_dome_rim";
  root.add(top_dome_rim);

  const lower_scrollwork = new THREE.Group();
  lower_scrollwork.name = "lower_scrollwork";
  root.add(lower_scrollwork);

  const upper_scrollwork = new THREE.Group();
  upper_scrollwork.name = "upper_scrollwork";
  root.add(upper_scrollwork);

  function addScrollBand(
    parent,
    baseY,
    amplitude,
    waves,
    radius,
    phase,
    name
  ) {
    const points = [];
    const samples = 144;
    for (let i = 0; i < samples; i++) {
      const angle = i / samples * Math.PI * 2;
      const y = baseY + Math.sin(angle * waves + phase) * amplitude;
      points.push(surfacePoint(angle, y, 0.014));
    }
    const scroll = makeClosedTube(points, radius, ornamentMat, 216);
    scroll.name = name;
    parent.add(scroll);
    return scroll;
  }

  const lower_scroll_main = addScrollBand(
    lower_scrollwork,
    -0.495,
    0.052,
    6,
    0.010,
    0,
    "lower_scroll_main"
  );
  const upper_scroll_main = addScrollBand(
    upper_scrollwork,
    0.252,
    0.038,
    6,
    0.009,
    0,
    "upper_scroll_main"
  );

  function addSpiral(
    parent,
    centerAngle,
    centerY,
    angleRadius,
    yRadius,
    turns,
    direction,
    radius,
    name
  ) {
    const points = [];
    const samples = 30;
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const shrink = 1 - t * 0.82;
      const phase = direction * turns * Math.PI * 2 * t;
      const angle = centerAngle + Math.cos(phase) * angleRadius * shrink;
      const y = centerY + Math.sin(phase) * yRadius * shrink;
      points.push(surfacePoint(angle, y, 0.016));
    }
    const spiral = makeOpenTube(points, radius, ornamentMat, 48);
    spiral.name = name;
    parent.add(spiral);
    return spiral;
  }

  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2 + Math.PI / 6;
    const direction = i % 2 === 0 ? 1 : -1;
    addSpiral(
      lower_scrollwork,
      angle,
      -0.495,
      0.17,
      0.050,
      1.25,
      direction,
      0.008,
      "lower_spiral_" + i
    );
    addSpiral(
      upper_scrollwork,
      angle,
      0.252,
      0.145,
      0.037,
      1.15,
      -direction,
      0.007,
      "upper_spiral_" + i
    );
  }

  const rosetteGeom = new THREE.SphereGeometry(1, 14, 8);
  const lower_rosettes = new THREE.InstancedMesh(
    rosetteGeom,
    ornamentMat,
    6
  );
  lower_rosettes.name = "lower_rosettes";
  const upper_rosettes = new THREE.InstancedMesh(
    rosetteGeom,
    ornamentMat,
    6
  );
  upper_rosettes.name = "upper_rosettes";

  const instance_dummy = new THREE.Object3D();
  const outward_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;

    instance_dummy.position.copy(surfacePoint(angle, -0.495, 0.018));
    instance_dummy.quaternion.setFromUnitVectors(
      outward_axis,
      new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle))
    );
    instance_dummy.scale.set(0.030, 0.025, 0.009);
    instance_dummy.updateMatrix();
    lower_rosettes.setMatrixAt(i, instance_dummy.matrix);

    instance_dummy.position.copy(surfacePoint(angle, 0.252, 0.018));
    instance_dummy.quaternion.setFromUnitVectors(
      outward_axis,
      new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle))
    );
    instance_dummy.scale.set(0.024, 0.020, 0.008);
    instance_dummy.updateMatrix();
    upper_rosettes.setMatrixAt(i, instance_dummy.matrix);
  }
  lower_rosettes.instanceMatrix.needsUpdate = true;
  upper_rosettes.instanceMatrix.needsUpdate = true;
  root.add(lower_rosettes, upper_rosettes);

  const leafGeom = new THREE.SphereGeometry(1, 12, 7);
  const lower_leaves = new THREE.InstancedMesh(leafGeom, ornamentMat, 12);
  lower_leaves.name = "lower_leaves";
  const upper_leaves = new THREE.InstancedMesh(leafGeom, ornamentMat, 12);
  upper_leaves.name = "upper_leaves";

  for (let i = 0; i < 12; i++) {
    const lowerAngle = i / 12 * Math.PI * 2 + Math.PI / 12;
    const lowerY = -0.495 + (i % 2 === 0 ? -0.043 : 0.043);
    instance_dummy.position.copy(surfacePoint(lowerAngle, lowerY, 0.017));
    instance_dummy.rotation.set(0, lowerAngle, i % 2 === 0 ? -0.65 : 0.65);
    instance_dummy.scale.set(0.025, 0.010, 0.007);
    instance_dummy.updateMatrix();
    lower_leaves.setMatrixAt(i, instance_dummy.matrix);

    const upperAngle = i / 12 * Math.PI * 2 + Math.PI / 12;
    const upperY = 0.252 + (i % 2 === 0 ? -0.032 : 0.032);
    instance_dummy.position.copy(surfacePoint(upperAngle, upperY, 0.017));
    instance_dummy.rotation.set(0, upperAngle, i % 2 === 0 ? 0.65 : -0.65);
    instance_dummy.scale.set(0.019, 0.008, 0.006);
    instance_dummy.updateMatrix();
    upper_leaves.setMatrixAt(i, instance_dummy.matrix);
  }
  lower_leaves.instanceMatrix.needsUpdate = true;
  upper_leaves.instanceMatrix.needsUpdate = true;
  root.add(lower_leaves, upper_leaves);

  const band_tickGeom = new THREE.BoxGeometry(0.014, 0.034, 0.008);
  const upper_band_ticks = new THREE.InstancedMesh(
    band_tickGeom,
    ornamentMat,
    36
  );
  upper_band_ticks.name = "upper_band_ticks";
  for (let i = 0; i < 36; i++) {
    const angle = i / 36 * Math.PI * 2;
    instance_dummy.position.copy(surfacePoint(angle, 0.185, 0.013));
    instance_dummy.rotation.set(0, angle, 0);
    instance_dummy.scale.set(1, i % 3 === 0 ? 1.18 : 0.82, 1);
    instance_dummy.updateMatrix();
    upper_band_ticks.setMatrixAt(i, instance_dummy.matrix);
  }
  upper_band_ticks.instanceMatrix.needsUpdate = true;
  root.add(upper_band_ticks);

  const top_medallionGeom = new THREE.CylinderGeometry(
    0.19,
    0.215,
    0.025,
    48
  );
  const top_medallion = new THREE.Mesh(top_medallionGeom, bell_bodyMat);
  top_medallion.name = "top_medallion";
  top_medallion.position.y = 0.558;
  root.add(top_medallion);

  const top_medallion_ring = makeHorizontalRing(
    0.573,
    0.174,
    0.006,
    ornamentMat
  );
  top_medallion_ring.name = "top_medallion_ring";
  root.add(top_medallion_ring);

  const top_studGeom = new THREE.SphereGeometry(1, 10, 6);
  const top_studs = new THREE.InstancedMesh(top_studGeom, ornamentMat, 18);
  top_studs.name = "top_studs";
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    instance_dummy.position.set(
      Math.sin(angle) * 0.145,
      0.576,
      Math.cos(angle) * 0.145
    );
    instance_dummy.rotation.set(0, angle, 0);
    instance_dummy.scale.set(0.012, 0.005, 0.008);
    instance_dummy.updateMatrix();
    top_studs.setMatrixAt(i, instance_dummy.matrix);
  }
  top_studs.instanceMatrix.needsUpdate = true;
  root.add(top_studs);

  const handle_postGeom = new THREE.CylinderGeometry(
    0.062,
    0.070,
    0.27,
    24
  );
  const handle_post = new THREE.Mesh(handle_postGeom, patinaMat);
  handle_post.name = "handle_post";
  handle_post.position.set(0, 0.695, 0);
  root.add(handle_post);

  const handle_post_capGeom = new THREE.CylinderGeometry(
    0.071,
    0.071,
    0.025,
    24
  );
  const handle_post_cap = new THREE.Mesh(handle_post_capGeom, ornamentMat);
  handle_post_cap.name = "handle_post_cap";
  handle_post_cap.position.set(0, 0.825, 0);
  root.add(handle_post_cap);

  const handle_archPoints = [
    new THREE.Vector3(-0.145, 0.505, 0),
    new THREE.Vector3(-0.190, 0.575, 0),
    new THREE.Vector3(-0.170, 0.690, 0),
    new THREE.Vector3(-0.180, 0.790, 0),
    new THREE.Vector3(-0.235, 0.875, 0),
    new THREE.Vector3(-0.225, 0.975, 0),
    new THREE.Vector3(-0.155, 1.060, 0),
    new THREE.Vector3(-0.075, 1.095, 0),
    new THREE.Vector3(0.000, 1.085, 0),
    new THREE.Vector3(0.075, 1.095, 0),
    new THREE.Vector3(0.155, 1.060, 0),
    new THREE.Vector3(0.225, 0.975, 0),
    new THREE.Vector3(0.235, 0.875, 0),
    new THREE.Vector3(0.180, 0.790, 0),
    new THREE.Vector3(0.170, 0.690, 0),
    new THREE.Vector3(0.190, 0.575, 0),
    new THREE.Vector3(0.145, 0.505, 0),
  ];
  const handle_archCurve = new THREE.CatmullRomCurve3(
    handle_archPoints,
    false,
    "centripetal"
  );
  const handle_archGeom = new THREE.TubeGeometry(
    handle_archCurve,
    96,
    0.055,
    12,
    false
  );
  const handle_arch = new THREE.Mesh(handle_archGeom, bell_bodyMat);
  handle_arch.name = "handle_arch";
  root.add(handle_arch);

  const handle_inner_shadowPoints = [];
  for (const point of handle_archPoints) {
    handle_inner_shadowPoints.push(
      new THREE.Vector3(point.x, point.y, point.z + 0.052)
    );
  }
  const handle_inner_shadowCurve = new THREE.CatmullRomCurve3(
    handle_inner_shadowPoints,
    false,
    "centripetal"
  );
  const handle_inner_shadowGeom = new THREE.TubeGeometry(
    handle_inner_shadowCurve,
    96,
    0.012,
    8,
    false
  );
  const handle_inner_shadow = new THREE.Mesh(
    handle_inner_shadowGeom,
    patinaMat
  );
  handle_inner_shadow.name = "handle_inner_shadow";
  root.add(handle_inner_shadow);

  const handle_ridgePoints = [];
  for (const point of handle_archPoints) {
    handle_ridgePoints.push(
      new THREE.Vector3(point.x, point.y, point.z + 0.056)
    );
  }
  const handle_ridgeCurve = new THREE.CatmullRomCurve3(
    handle_ridgePoints,
    false,
    "centripetal"
  );
  const handle_ridgeGeom = new THREE.TubeGeometry(
    handle_ridgeCurve,
    96,
    0.007,
    8,
    false
  );
  const handle_ridge = new THREE.Mesh(handle_ridgeGeom, ornamentMat);
  handle_ridge.name = "handle_ridge";
  root.add(handle_ridge);

  const handle_pivotGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.025,
    24
  );
  const left_handle_pivot = new THREE.Mesh(handle_pivotGeom, patinaMat);
  left_handle_pivot.name = "left_handle_pivot";
  left_handle_pivot.rotation.x = Math.PI / 2;
  left_handle_pivot.position.set(-0.177, 0.615, 0.055);
  root.add(left_handle_pivot);

  const right_handle_pivot = new THREE.Mesh(handle_pivotGeom, patinaMat);
  right_handle_pivot.name = "right_handle_pivot";
  right_handle_pivot.rotation.x = Math.PI / 2;
  right_handle_pivot.position.set(0.177, 0.615, 0.055);
  root.add(right_handle_pivot);

  const handle_pivot_ringGeom = new THREE.TorusGeometry(
    0.043,
    0.008,
    8,
    24
  );
  const left_handle_pivot_ring = new THREE.Mesh(
    handle_pivot_ringGeom,
    ornamentMat
  );
  left_handle_pivot_ring.name = "left_handle_pivot_ring";
  left_handle_pivot_ring.position.set(-0.177, 0.615, 0.071);
  root.add(left_handle_pivot_ring);

  const right_handle_pivot_ring = new THREE.Mesh(
    handle_pivot_ringGeom,
    ornamentMat
  );
  right_handle_pivot_ring.name = "right_handle_pivot_ring";
  right_handle_pivot_ring.position.set(0.177, 0.615, 0.071);
  root.add(right_handle_pivot_ring);

  const handle_finialGeom = new THREE.SphereGeometry(1, 16, 10);
  const handle_finials = new THREE.InstancedMesh(
    handle_finialGeom,
    bell_bodyMat,
    5
  );
  handle_finials.name = "handle_finials";
  for (let i = 0; i < 5; i++) {
    const offset = i - 2;
    instance_dummy.position.set(offset * 0.045, 1.095 - Math.abs(offset) * 0.008, 0);
    instance_dummy.rotation.set(0, 0, -offset * 0.10);
    instance_dummy.scale.set(
      0.034,
      0.075 - Math.abs(offset) * 0.008,
      0.043
    );
    instance_dummy.updateMatrix();
    handle_finials.setMatrixAt(i, instance_dummy.matrix);
  }
  handle_finials.instanceMatrix.needsUpdate = true;
  root.add(handle_finials);

  const handle_finial_grooveGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    0.105,
    8
  );
  const handle_finial_grooves = new THREE.InstancedMesh(
    handle_finial_grooveGeom,
    patinaMat,
    4
  );
  handle_finial_grooves.name = "handle_finial_grooves";
  for (let i = 0; i < 4; i++) {
    instance_dummy.position.set((i - 1.5) * 0.045, 1.095, 0.041);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1 - Math.abs(i - 1.5) * 0.08, 1);
    instance_dummy.updateMatrix();
    handle_finial_grooves.setMatrixAt(i, instance_dummy.matrix);
  }
  handle_finial_grooves.instanceMatrix.needsUpdate = true;
  root.add(handle_finial_grooves);

  const clapper_stemGeom = new THREE.CylinderGeometry(
    0.012,
    0.015,
    0.20,
    12
  );
  const clapper_stem = new THREE.Mesh(clapper_stemGeom, patinaMat);
  clapper_stem.name = "clapper_stem";
  clapper_stem.position.y = -0.69;
  root.add(clapper_stem);

  const clapper_ballGeom = new THREE.SphereGeometry(0.055, 20, 12);
  const clapper_ball = new THREE.Mesh(clapper_ballGeom, patinaMat);
  clapper_ball.name = "clapper_ball";
  clapper_ball.position.y = -0.825;
  root.add(clapper_ball);

  const patina_patchGeom = new THREE.CircleGeometry(1, 18);
  const green_patch_data = [
    [-0.72, -0.53, 0.055, 0.025, 0.25],
    [0.18, -0.43, 0.075, 0.035, -0.45],
    [0.82, -0.20, 0.050, 0.080, 0.15],
    [-0.25, 0.02, 0.065, 0.030, -0.20],
    [1.18, 0.12, 0.045, 0.025, 0.55],
    [-1.22, 0.27, 0.040, 0.022, -0.35],
  ];
  const brown_patch_data = [
    [-1.05, -0.42, 0.070, 0.030, -0.25],
    [0.55, -0.56, 0.050, 0.020, 0.45],
    [-0.48, -0.12, 0.045, 0.075, 0.10],
    [0.38, 0.10, 0.060, 0.025, -0.50],
    [1.45, -0.08, 0.040, 0.020, 0.20],
    [-1.48, 0.18, 0.035, 0.020, -0.15],
  ];

  const green_patina_patches = new THREE.InstancedMesh(
    patina_patchGeom,
    green_patinaMat,
    green_patch_data.length
  );
  green_patina_patches.name = "green_patina_patches";
  for (let i = 0; i < green_patch_data.length; i++) {
    const data = green_patch_data[i];
    instance_dummy.position.copy(surfacePoint(data[0], data[1], 0.006));
    instance_dummy.quaternion.setFromUnitVectors(
      outward_axis,
      new THREE.Vector3(Math.sin(data[0]), 0, Math.cos(data[0]))
    );
    instance_dummy.rotateZ(data[4]);
    instance_dummy.scale.set(data[2], data[3], 1);
    instance_dummy.updateMatrix();
    green_patina_patches.setMatrixAt(i, instance_dummy.matrix);
  }
  green_patina_patches.instanceMatrix.needsUpdate = true;
  root.add(green_patina_patches);

  const brown_patina_patches = new THREE.InstancedMesh(
    patina_patchGeom,
    brown_patinaMat,
    brown_patch_data.length
  );
  brown_patina_patches.name = "brown_patina_patches";
  for (let i = 0; i < brown_patch_data.length; i++) {
    const data = brown_patch_data[i];
    instance_dummy.position.copy(surfacePoint(data[0], data[1], 0.007));
    instance_dummy.quaternion.setFromUnitVectors(
      outward_axis,
      new THREE.Vector3(Math.sin(data[0]), 0, Math.cos(data[0]))
    );
    instance_dummy.rotateZ(data[4]);
    instance_dummy.scale.set(data[2], data[3], 1);
    instance_dummy.updateMatrix();
    brown_patina_patches.setMatrixAt(i, instance_dummy.matrix);
  }
  brown_patina_patches.instanceMatrix.needsUpdate = true;
  root.add(brown_patina_patches);

  const scratch_points = [];
  for (let i = 0; i < 14; i++) {
    const angle = -1.25 + i * 0.19;
    const y = -0.58 + (i % 7) * 0.13;
    const angleDelta = 0.018 + (i % 3) * 0.008;
    const yDelta = ((i % 4) - 1.5) * 0.018;
    scratch_points.push(surfacePoint(angle, y, 0.010));
    scratch_points.push(
      surfacePoint(angle + angleDelta, y + yDelta, 0.010)
    );
  }
  const surface_scratchesGeom = new THREE.BufferGeometry().setFromPoints(
    scratch_points
  );
  const surface_scratchesMat = new THREE.LineBasicMaterial({
    color: 0xa17a55,
    transparent: true,
    opacity: 0.55,
  });
  const surface_scratches = new THREE.LineSegments(
    surface_scratchesGeom,
    surface_scratchesMat
  );
  surface_scratches.name = "surface_scratches";
  root.add(surface_scratches);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}