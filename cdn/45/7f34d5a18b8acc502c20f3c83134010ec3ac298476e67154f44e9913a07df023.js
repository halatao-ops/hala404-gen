export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "jeweled_ornament";

  const sphereR = 1.0;
  const ornament_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x292724,
    metalness: 0.3,
    roughness: 0.72,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc5c5bd,
    metalness: 0.6,
    roughness: 0.4,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: 0xd0cfca,
    metalness: 0.6,
    roughness: 0.4,
  });
  const clear_gemsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    flatShading: true,
  });
  const pink_gemsMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2b8c8,
    metalness: 0.0,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    flatShading: true,
  });
  const blue_gemsMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9d9f4,
    metalness: 0.0,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    flatShading: true,
  });
  const green_gemsMat = new THREE.MeshPhysicalMaterial({
    color: 0xc9d9a8,
    metalness: 0.0,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    flatShading: true,
  });
  const gold_gemsMat = new THREE.MeshPhysicalMaterial({
    color: 0xe5c77e,
    metalness: 0.0,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    flatShading: true,
  });
  const gem_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });

  const ornament_body = new THREE.Mesh(
    new THREE.SphereGeometry(sphereR, 64, 40),
    ornament_bodyMat
  );
  ornament_body.name = "ornament_body";
  root.add(ornament_body);

  const gemstone_field = new THREE.Group();
  gemstone_field.name = "gemstone_field";
  root.add(gemstone_field);

  const gemstone_bezelsMat = silverMat;
  const gemstone_bezelsGeo = new THREE.CylinderGeometry(1, 1, 0.018, 10);
  const gemstone_bezelCount = 1200;
  const gemstone_bezels = new THREE.InstancedMesh(
    gemstone_bezelsGeo,
    gemstone_bezelsMat,
    gemstone_bezelCount
  );
  gemstone_bezels.name = "gemstone_bezels";

  const clear_gemsGeo = new THREE.CylinderGeometry(0.78, 1, 0.038, 10);
  const pink_gemsGeo = clear_gemsGeo;
  const blue_gemsGeo = clear_gemsGeo;
  const green_gemsGeo = clear_gemsGeo;
  const gold_gemsGeo = clear_gemsGeo;

  const gemstoneCount = 1200;
  const gemstoneSets = [[], [], [], [], []];
  const gemstoneRecords = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const localY = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < gemstoneCount; i++) {
    const y = 1 - 2 * (i + 0.5) / gemstoneCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle;
    const normal = new THREE.Vector3(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    ).normalize();

    const size = 0.021 + 0.014 * (0.5 + 0.5 * Math.sin(i * 2.731));
    const quaternion = new THREE.Quaternion().setFromUnitVectors(localY, normal);
    const bezelPosition = normal.clone().multiplyScalar(sphereR + 0.006);
    const gemstonePosition = normal.clone().multiplyScalar(sphereR + 0.023);
    const colorIndex = (i * 7 + Math.floor(i / 11) * 3) % 29;
    const setIndex =
      colorIndex < 18 ? 0 :
      colorIndex < 21 ? 1 :
      colorIndex < 24 ? 2 :
      colorIndex < 27 ? 3 : 4;

    gemstoneSets[setIndex].push(i);
    gemstoneRecords.push({
      normal,
      quaternion,
      size,
      bezelPosition,
      gemstonePosition,
    });
  }

  const dummy = new THREE.Object3D();

  function populateBezels() {
    for (let i = 0; i < gemstoneRecords.length; i++) {
      const record = gemstoneRecords[i];
      dummy.position.copy(record.bezelPosition);
      dummy.quaternion.copy(record.quaternion);
      dummy.scale.set(record.size * 1.13, 1, record.size * 1.13);
      dummy.updateMatrix();
      gemstone_bezels.setMatrixAt(i, dummy.matrix);
    }
    gemstone_bezels.instanceMatrix.needsUpdate = true;
  }

  function populateGemstones(mesh, indices) {
    for (let i = 0; i < indices.length; i++) {
      const record = gemstoneRecords[indices[i]];
      dummy.position.copy(record.gemstonePosition);
      dummy.quaternion.copy(record.quaternion);
      dummy.scale.set(record.size, 1, record.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  populateBezels();
  gemstone_field.add(gemstone_bezels);

  const clear_gems = new THREE.InstancedMesh(
    clear_gemsGeo,
    clear_gemsMat,
    gemstoneSets[0].length
  );
  clear_gems.name = "clear_gems";
  populateGemstones(clear_gems, gemstoneSets[0]);
  gemstone_field.add(clear_gems);

  const pink_gems = new THREE.InstancedMesh(
    pink_gemsGeo,
    pink_gemsMat,
    gemstoneSets[1].length
  );
  pink_gems.name = "pink_gems";
  populateGemstones(pink_gems, gemstoneSets[1]);
  gemstone_field.add(pink_gems);

  const blue_gems = new THREE.InstancedMesh(
    blue_gemsGeo,
    blue_gemsMat,
    gemstoneSets[2].length
  );
  blue_gems.name = "blue_gems";
  populateGemstones(blue_gems, gemstoneSets[2]);
  gemstone_field.add(blue_gems);

  const green_gems = new THREE.InstancedMesh(
    green_gemsGeo,
    green_gemsMat,
    gemstoneSets[3].length
  );
  green_gems.name = "green_gems";
  populateGemstones(green_gems, gemstoneSets[3]);
  gemstone_field.add(green_gems);

  const gold_gems = new THREE.InstancedMesh(
    gold_gemsGeo,
    gold_gemsMat,
    gemstoneSets[4].length
  );
  gold_gems.name = "gold_gems";
  populateGemstones(gold_gems, gemstoneSets[4]);
  gemstone_field.add(gold_gems);

  const gem_highlightsMat = gem_highlightMat;
  const gem_highlightsGeo = new THREE.CircleGeometry(1, 6);
  const highlightRecords = [];
  for (let i = 0; i < gemstoneRecords.length; i++) {
    if (i % 3 === 0 && gemstoneRecords[i].size > 0.024) {
      highlightRecords.push(gemstoneRecords[i]);
    }
  }
  const gem_highlights = new THREE.InstancedMesh(
    gem_highlightsGeo,
    gem_highlightsMat,
    highlightRecords.length
  );
  gem_highlights.name = "gem_highlights";

  const localZ = new THREE.Vector3(0, 0, 1);
  const tangentOffset = new THREE.Vector3();
  for (let i = 0; i < highlightRecords.length; i++) {
    const record = highlightRecords[i];
    const frontQuaternion = new THREE.Quaternion().setFromUnitVectors(localZ, record.normal);
    tangentOffset
      .set(-0.22, 0.22, 0)
      .normalize()
      .multiplyScalar(record.size)
      .applyQuaternion(frontQuaternion);

    dummy.position
      .copy(record.gemstonePosition)
      .addScaledVector(record.normal, 0.021)
      .add(tangentOffset);
    dummy.quaternion.copy(frontQuaternion);
    dummy.scale.setScalar(record.size * 0.18);
    dummy.updateMatrix();
    gem_highlights.setMatrixAt(i, dummy.matrix);
  }
  gem_highlights.instanceMatrix.needsUpdate = true;
  gemstone_field.add(gem_highlights);

  function surfacePoint(x, y, extra) {
    const z = Math.sqrt(Math.max(0.001, sphereR * sphereR - x * x - y * y));
    return new THREE.Vector3(x, y, z)
      .normalize()
      .multiplyScalar(sphereR + extra);
  }

  function createSurfaceTube(points, radius, material, name) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, points.length * 4),
      radius,
      8,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  }

  function createSurfaceLoop(cx, cy, rx, ry, rotation, radius, name) {
    const points = [];
    const count = 32;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const dx = Math.cos(angle) * rx;
      const dy = Math.sin(angle) * ry;
      const x = cx + dx * cosRotation - dy * sinRotation;
      const y = cy + dx * sinRotation + dy * cosRotation;
      points.push(surfacePoint(x, y, 0.029));
    }
    return createSurfaceTube(points, radius, silverMat, name);
  }

  function createSurfaceArc(cx, cy, rx, ry, start, end, rotation, radius, name) {
    const points = [];
    const count = 24;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const angle = start + (end - start) * t;
      const dx = Math.cos(angle) * rx;
      const dy = Math.sin(angle) * ry;
      const x = cx + dx * cosRotation - dy * sinRotation;
      const y = cy + dx * sinRotation + dy * cosRotation;
      points.push(surfacePoint(x, y, 0.03));
    }
    return createSurfaceTube(points, radius, silverMat, name);
  }

  const silver_ribbons = new THREE.Group();
  silver_ribbons.name = "silver_ribbons";
  root.add(silver_ribbons);

  const equatorial_bandPoints = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const x = -0.965 + 1.93 * t;
    const y = -0.015 + 0.025 * Math.sin(t * Math.PI * 2);
    equatorial_bandPoints.push(surfacePoint(x, y, 0.031));
  }
  const equatorial_band = createSurfaceTube(
    equatorial_bandPoints,
    0.027,
    silverMat,
    "equatorial_band"
  );
  silver_ribbons.add(equatorial_band);

  const diagonal_band_leftPoints = [];
  const diagonal_band_rightPoints = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const leftX = -0.72 + 1.42 * t;
    const leftY = -0.78 + 1.56 * t;
    const rightX = 0.72 - 1.42 * t;
    const rightY = 0.78 - 1.56 * t;
    diagonal_band_leftPoints.push(surfacePoint(leftX, leftY, 0.03));
    diagonal_band_rightPoints.push(surfacePoint(rightX, rightY, 0.03));
  }
  const diagonal_band_left = createSurfaceTube(
    diagonal_band_leftPoints,
    0.025,
    silverMat,
    "diagonal_band_left"
  );
  const diagonal_band_right = createSurfaceTube(
    diagonal_band_rightPoints,
    0.025,
    silverMat,
    "diagonal_band_right"
  );
  silver_ribbons.add(diagonal_band_left, diagonal_band_right);

  const upper_vertical_bandPoints = [];
  for (let i = 0; i <= 36; i++) {
    const t = i / 36;
    const x = -0.18 + 0.18 * t;
    const y = 0.91 - 0.82 * t;
    upper_vertical_bandPoints.push(surfacePoint(x, y, 0.03));
  }
  const upper_vertical_band = createSurfaceTube(
    upper_vertical_bandPoints,
    0.024,
    silverMat,
    "upper_vertical_band"
  );
  silver_ribbons.add(upper_vertical_band);

  const right_curved_bandPoints = [];
  for (let i = 0; i <= 36; i++) {
    const t = i / 36;
    const x = 0.55 + 0.28 * Math.sin(t * Math.PI);
    const y = 0.72 - 1.38 * t;
    right_curved_bandPoints.push(surfacePoint(x, y, 0.03));
  }
  const right_curved_band = createSurfaceTube(
    right_curved_bandPoints,
    0.025,
    silverMat,
    "right_curved_band"
  );
  silver_ribbons.add(right_curved_band);

  const left_curved_bandPoints = [];
  for (let i = 0; i <= 36; i++) {
    const t = i / 36;
    const x = -0.58 - 0.22 * Math.sin(t * Math.PI);
    const y = 0.62 - 1.18 * t;
    left_curved_bandPoints.push(surfacePoint(x, y, 0.03));
  }
  const left_curved_band = createSurfaceTube(
    left_curved_bandPoints,
    0.024,
    silverMat,
    "left_curved_band"
  );
  silver_ribbons.add(left_curved_band);

  const lower_left_bandPoints = [];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32;
    const x = -0.84 + 0.72 * t;
    const y = -0.48 - 0.34 * Math.sin(t * Math.PI);
    lower_left_bandPoints.push(surfacePoint(x, y, 0.03));
  }
  const lower_left_band = createSurfaceTube(
    lower_left_bandPoints,
    0.023,
    silverMat,
    "lower_left_band"
  );
  silver_ribbons.add(lower_left_band);

  const ornamental_glyphs = new THREE.Group();
  ornamental_glyphs.name = "ornamental_glyphs";
  root.add(ornamental_glyphs);

  const upper_left_glyph_loop = createSurfaceLoop(
    -0.48, 0.43, 0.23, 0.31, -0.35, 0.024, "upper_left_glyph_loop"
  );
  const upper_left_glyph_stem = createSurfaceTube([
    surfacePoint(-0.42, 0.65, 0.03),
    surfacePoint(-0.35, 0.48, 0.03),
    surfacePoint(-0.24, 0.28, 0.03),
    surfacePoint(-0.12, 0.12, 0.03),
  ], 0.024, silverMat, "upper_left_glyph_stem");
  const upper_left_glyph_crossbar = createSurfaceTube([
    surfacePoint(-0.61, 0.48, 0.03),
    surfacePoint(-0.48, 0.38, 0.03),
    surfacePoint(-0.31, 0.31, 0.03),
    surfacePoint(-0.17, 0.25, 0.03),
  ], 0.022, silverMat, "upper_left_glyph_crossbar");
  ornamental_glyphs.add(
    upper_left_glyph_loop,
    upper_left_glyph_stem,
    upper_left_glyph_crossbar
  );

  const center_glyph_outer = createSurfaceArc(
    0.12, 0.35, 0.27, 0.23, -0.35, 5.15, 0.08, 0.025, "center_glyph_outer"
  );
  const center_glyph_inner = createSurfaceArc(
    0.12, 0.35, 0.18, 0.15, -0.25, 4.95, 0.08, 0.021, "center_glyph_inner"
  );
  const center_glyph_bar = createSurfaceTube([
    surfacePoint(0.02, 0.35, 0.03),
    surfacePoint(0.12, 0.31, 0.03),
    surfacePoint(0.25, 0.30, 0.03),
    surfacePoint(0.36, 0.34, 0.03),
  ], 0.021, silverMat, "center_glyph_bar");
  ornamental_glyphs.add(center_glyph_outer, center_glyph_inner, center_glyph_bar);

  const right_glyph_loop = createSurfaceLoop(
    0.62, 0.12, 0.18, 0.31, 0.34, 0.023, "right_glyph_loop"
  );
  const right_glyph_stem = createSurfaceTube([
    surfacePoint(0.54, 0.39, 0.03),
    surfacePoint(0.64, 0.22, 0.03),
    surfacePoint(0.72, 0.02, 0.03),
    surfacePoint(0.79, -0.22, 0.03),
  ], 0.023, silverMat, "right_glyph_stem");
  ornamental_glyphs.add(right_glyph_loop, right_glyph_stem);

  const lower_center_glyph_loop = createSurfaceLoop(
    0.05, -0.58, 0.25, 0.22, -0.12, 0.024, "lower_center_glyph_loop"
  );
  const lower_center_glyph_stem = createSurfaceTube([
    surfacePoint(0.02, -0.39, 0.03),
    surfacePoint(0.00, -0.55, 0.03),
    surfacePoint(0.08, -0.72, 0.03),
    surfacePoint(0.17, -0.84, 0.03),
  ], 0.023, silverMat, "lower_center_glyph_stem");
  const lower_center_glyph_crossbar = createSurfaceTube([
    surfacePoint(-0.15, -0.58, 0.03),
    surfacePoint(-0.02, -0.52, 0.03),
    surfacePoint(0.14, -0.49, 0.03),
    surfacePoint(0.27, -0.52, 0.03),
  ], 0.021, silverMat, "lower_center_glyph_crossbar");
  ornamental_glyphs.add(
    lower_center_glyph_loop,
    lower_center_glyph_stem,
    lower_center_glyph_crossbar
  );

  const lower_left_glyph_loop = createSurfaceLoop(
    -0.62, -0.55, 0.22, 0.25, -0.45, 0.023, "lower_left_glyph_loop"
  );
  const lower_left_glyph_stem = createSurfaceTube([
    surfacePoint(-0.75, -0.39, 0.03),
    surfacePoint(-0.67, -0.52, 0.03),
    surfacePoint(-0.58, -0.68, 0.03),
    surfacePoint(-0.48, -0.77, 0.03),
  ], 0.022, silverMat, "lower_left_glyph_stem");
  ornamental_glyphs.add(lower_left_glyph_loop, lower_left_glyph_stem);

  const cap_assembly = new THREE.Group();
  cap_assembly.name = "cap_assembly";
  root.add(cap_assembly);

  const cap_bodyMat = capMat;
  const cap_bodyGeo = new THREE.CylinderGeometry(0.29, 0.34, 0.22, 32);
  const cap_body = new THREE.Mesh(cap_bodyGeo, cap_bodyMat);
  cap_body.name = "cap_body";
  cap_body.position.y = 1.075;
  cap_assembly.add(cap_body);

  const cap_topMat = capMat;
  const cap_topGeo = new THREE.CylinderGeometry(0.29, 0.29, 0.035, 32);
  const cap_top = new THREE.Mesh(cap_topGeo, cap_topMat);
  cap_top.name = "cap_top";
  cap_top.position.y = 1.19;
  cap_assembly.add(cap_top);

  const cap_scallopsMat = capMat;
  const cap_scallopsGeo = new THREE.SphereGeometry(1, 16, 10);
  const cap_scallopCount = 10;
  const cap_scallops = new THREE.InstancedMesh(
    cap_scallopsGeo,
    cap_scallopsMat,
    cap_scallopCount
  );
  cap_scallops.name = "cap_scallops";
  for (let i = 0; i < cap_scallopCount; i++) {
    const angle = i / cap_scallopCount * Math.PI * 2;
    dummy.position.set(
      Math.sin(angle) * 0.325,
      0.965,
      Math.cos(angle) * 0.325
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(0.095, 0.085, 0.055);
    dummy.updateMatrix();
    cap_scallops.setMatrixAt(i, dummy.matrix);
  }
  cap_scallops.instanceMatrix.needsUpdate = true;
  cap_assembly.add(cap_scallops);

  const cap_gemsMat = clear_gemsMat;
  const cap_gemsGeo = new THREE.CylinderGeometry(0.78, 1, 0.026, 10);
  const cap_gems = new THREE.InstancedMesh(cap_gemsGeo, cap_gemsMat, 8);
  cap_gems.name = "cap_gems";
  for (let i = 0; i < 8; i++) {
    const angle = (i + 0.5) / 8 * Math.PI * 2;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const quaternion = new THREE.Quaternion().setFromUnitVectors(localY, normal);
    dummy.position.set(
      normal.x * 0.342,
      1.075,
      normal.z * 0.342
    );
    dummy.quaternion.copy(quaternion);
    dummy.scale.set(0.034, 1, 0.034);
    dummy.updateMatrix();
    cap_gems.setMatrixAt(i, dummy.matrix);
  }
  cap_gems.instanceMatrix.needsUpdate = true;
  cap_assembly.add(cap_gems);

  const cap_front_gemMat = clear_gemsMat;
  const cap_front_gemGeo = new THREE.CylinderGeometry(0.78, 1, 0.03, 12);
  const cap_front_gem = new THREE.Mesh(cap_front_gemGeo, cap_front_gemMat);
  cap_front_gem.name = "cap_front_gem";
  cap_front_gem.rotation.x = Math.PI / 2;
  cap_front_gem.position.set(0, 1.075, 0.347);
  cap_front_gem.scale.setScalar(0.072);
  cap_assembly.add(cap_front_gem);

  const cap_front_gem_bezelMat = silverMat;
  const cap_front_gem_bezelGeo = new THREE.TorusGeometry(0.073, 0.012, 8, 24);
  const cap_front_gem_bezel = new THREE.Mesh(
    cap_front_gem_bezelGeo,
    cap_front_gem_bezelMat
  );
  cap_front_gem_bezel.name = "cap_front_gem_bezel";
  cap_front_gem_bezel.position.set(0, 1.075, 0.365);
  cap_assembly.add(cap_front_gem_bezel);

  const hanging_loopMat = silverMat;
  const hanging_loopGeo = new THREE.TorusGeometry(0.18, 0.026, 12, 40);
  const hanging_loop = new THREE.Mesh(hanging_loopGeo, hanging_loopMat);
  hanging_loop.name = "hanging_loop";
  hanging_loop.position.set(0, 1.405, 0);
  hanging_loop.scale.set(0.92, 1.08, 1);
  cap_assembly.add(hanging_loop);

  const loop_mountsMat = silverMat;
  const loop_mountsGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.13, 12);
  const loop_mounts = new THREE.InstancedMesh(loop_mountsGeo, loop_mountsMat, 2);
  loop_mounts.name = "loop_mounts";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.105 : 0.105, 1.225, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    loop_mounts.setMatrixAt(i, dummy.matrix);
  }
  loop_mounts.instanceMatrix.needsUpdate = true;
  cap_assembly.add(loop_mounts);

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