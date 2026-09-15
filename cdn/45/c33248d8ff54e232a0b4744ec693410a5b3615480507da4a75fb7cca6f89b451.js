export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compass";

  const housing_group = new THREE.Group();
  housing_group.name = "housing_group";
  root.add(housing_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const pointer_group = new THREE.Group();
  pointer_group.name = "pointer_group";
  root.add(pointer_group);

  const center_group = new THREE.Group();
  center_group.name = "center_group";
  root.add(center_group);

  const housingMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.15,
    roughness: 0.8
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.2,
    roughness: 0.45
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xc8bea0,
    metalness: 0.2,
    roughness: 0.55
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xb89a5a,
    metalness: 0.55,
    roughness: 0.35
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x4b4a3f,
    metalness: 0.1,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    depthWrite: false
  });
  const needleRedMat = new THREE.MeshStandardMaterial({
    color: 0xb85a52,
    metalness: 0.25,
    roughness: 0.4
  });
  const needleDarkMat = new THREE.MeshStandardMaterial({
    color: 0x30302d,
    metalness: 0.25,
    roughness: 0.5
  });
  const center_lightMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c8,
    metalness: 0,
    roughness: 0.25,
    emissive: 0xfff4c8,
    emissiveIntensity: 1
  });

  const housing_bodyGeom = new THREE.CylinderGeometry(1.43, 1.5, 0.48, 64);
  const housing_body = new THREE.Mesh(housing_bodyGeom, housingMat);
  housing_body.name = "housing_body";
  housing_body.position.y = -0.08;
  housing_group.add(housing_body);

  const bottom_plateGeom = new THREE.CylinderGeometry(1.39, 1.43, 0.1, 64);
  const bottom_plate = new THREE.Mesh(bottom_plateGeom, housingMat);
  bottom_plate.name = "bottom_plate";
  bottom_plate.position.y = -0.34;
  housing_group.add(bottom_plate);

  const lower_bezelGeom = new THREE.TorusGeometry(1.35, 0.13, 16, 64);
  const lower_bezel = new THREE.Mesh(lower_bezelGeom, housingMat);
  lower_bezel.name = "lower_bezel";
  lower_bezel.rotation.x = Math.PI / 2;
  lower_bezel.position.y = -0.29;
  housing_group.add(lower_bezel);

  const outer_bezelGeom = new THREE.TorusGeometry(1.36, 0.16, 20, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, bezelMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.rotation.x = Math.PI / 2;
  outer_bezel.position.y = 0.18;
  housing_group.add(outer_bezel);

  const bezel_seamGeom = new THREE.TorusGeometry(1.49, 0.012, 8, 64);
  const bezel_seam = new THREE.Mesh(bezel_seamGeom, housingMat);
  bezel_seam.name = "bezel_seam";
  bezel_seam.rotation.x = Math.PI / 2;
  bezel_seam.position.y = -0.08;
  housing_group.add(bezel_seam);

  const dial_faceGeom = new THREE.CylinderGeometry(1.22, 1.22, 0.05, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.name = "dial_face";
  dial_face.position.y = 0.19;
  dial_group.add(dial_face);

  const inner_bezelGeom = new THREE.TorusGeometry(1.235, 0.055, 16, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, bezelMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.rotation.x = Math.PI / 2;
  inner_bezel.position.y = 0.225;
  housing_group.add(inner_bezel);

  const gold_inlayGeom = new THREE.TorusGeometry(1.16, 0.018, 10, 64);
  const gold_inlay = new THREE.Mesh(gold_inlayGeom, goldMat);
  gold_inlay.name = "gold_inlay";
  gold_inlay.rotation.x = Math.PI / 2;
  gold_inlay.position.y = 0.242;
  dial_group.add(gold_inlay);

  const clear_retaining_ringGeom = new THREE.TorusGeometry(1.205, 0.026, 12, 64);
  const clear_retaining_ring = new THREE.Mesh(clear_retaining_ringGeom, glassMat);
  clear_retaining_ring.name = "clear_retaining_ring";
  clear_retaining_ring.rotation.x = Math.PI / 2;
  clear_retaining_ring.position.y = 0.27;
  clear_retaining_ring.renderOrder = 2;
  housing_group.add(clear_retaining_ring);

  const dial_ticksGeom = new THREE.BoxGeometry(0.022, 0.012, 0.11);
  const dial_ticks = new THREE.InstancedMesh(dial_ticksGeom, markingMat, 32);
  dial_ticks.name = "dial_ticks";
  const tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    const radius = 1.035;
    const lengthScale = i % 8 === 0 ? 1.65 : (i % 4 === 0 ? 1.25 : 0.8);
    tick_dummy.position.set(Math.sin(angle) * radius, 0.229, Math.cos(angle) * radius);
    tick_dummy.rotation.set(0, angle, 0);
    tick_dummy.scale.set(i % 8 === 0 ? 1.35 : 1, 1, lengthScale);
    tick_dummy.updateMatrix();
    dial_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(dial_ticks);

  const inner_scale_ticksGeom = new THREE.BoxGeometry(0.014, 0.009, 0.07);
  const inner_scale_ticks = new THREE.InstancedMesh(inner_scale_ticksGeom, goldMat, 24);
  inner_scale_ticks.name = "inner_scale_ticks";
  const inner_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    const radius = 0.84;
    inner_tick_dummy.position.set(Math.sin(angle) * radius, 0.226, Math.cos(angle) * radius);
    inner_tick_dummy.rotation.set(0, angle, 0);
    inner_tick_dummy.scale.set(1, 1, i % 6 === 0 ? 1.4 : 0.8);
    inner_tick_dummy.updateMatrix();
    inner_scale_ticks.setMatrixAt(i, inner_tick_dummy.matrix);
  }
  inner_scale_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(inner_scale_ticks);

  const glyph_strokes = {
    N: [
      [-0.42, -0.5, -0.42, 0.5],
      [0.42, -0.5, 0.42, 0.5],
      [-0.42, -0.5, 0.42, 0.5]
    ],
    E: [
      [-0.4, -0.5, -0.4, 0.5],
      [-0.4, 0.5, 0.4, 0.5],
      [-0.4, 0, 0.3, 0],
      [-0.4, -0.5, 0.4, -0.5]
    ],
    S: [
      [-0.38, 0.5, 0.38, 0.5],
      [-0.38, 0.5, -0.38, 0],
      [-0.38, 0, 0.38, 0],
      [0.38, 0, 0.38, -0.5],
      [-0.38, -0.5, 0.38, -0.5]
    ],
    W: [
      [-0.5, 0.5, -0.28, -0.5],
      [-0.28, -0.5, 0, 0.05],
      [0, 0.05, 0.28, -0.5],
      [0.28, -0.5, 0.5, 0.5]
    ]
  };

  const glyph_segments = [];
  const glyph_size = 0.22;
  const glyph_radius = 0.89;
  const glyph_height = 0.012;

  function addGlyph(character, angle) {
    const radialX = Math.sin(angle);
    const radialZ = Math.cos(angle);
    const tangentX = Math.cos(angle);
    const tangentZ = -Math.sin(angle);
    const strokes = glyph_strokes[character];

    for (const stroke of strokes) {
      const u1 = stroke[0] * glyph_size;
      const v1 = stroke[1] * glyph_size;
      const u2 = stroke[2] * glyph_size;
      const v2 = stroke[3] * glyph_size;
      const x1 = radialX * (glyph_radius + v1) + tangentX * u1;
      const z1 = radialZ * (glyph_radius + v1) + tangentZ * u1;
      const x2 = radialX * (glyph_radius + v2) + tangentX * u2;
      const z2 = radialZ * (glyph_radius + v2) + tangentZ * u2;
      glyph_segments.push([x1, z1, x2, z2]);
    }
  }

  addGlyph("N", 0);
  addGlyph("E", Math.PI / 2);
  addGlyph("S", Math.PI);
  addGlyph("W", Math.PI * 1.5);

  const cardinal_lettersGeom = new THREE.BoxGeometry(1, glyph_height, 1);
  const cardinal_letters = new THREE.InstancedMesh(
    cardinal_lettersGeom,
    markingMat,
    glyph_segments.length
  );
  cardinal_letters.name = "cardinal_letters";
  const glyph_dummy = new THREE.Object3D();

  for (let i = 0; i < glyph_segments.length; i++) {
    const segment = glyph_segments[i];
    const dx = segment[2] - segment[0];
    const dz = segment[3] - segment[1];
    const length = Math.sqrt(dx * dx + dz * dz);
    glyph_dummy.position.set(
      (segment[0] + segment[2]) * 0.5,
      0.232,
      (segment[1] + segment[3]) * 0.5
    );
    glyph_dummy.rotation.set(0, -Math.atan2(dz, dx), 0);
    glyph_dummy.scale.set(length, 1, 0.032);
    glyph_dummy.updateMatrix();
    cardinal_letters.setMatrixAt(i, glyph_dummy.matrix);
  }
  cardinal_letters.instanceMatrix.needsUpdate = true;
  dial_group.add(cardinal_letters);

  const calibration_blockGeom = new THREE.BoxGeometry(0.25, 0.028, 0.3);
  const calibration_block = new THREE.Mesh(calibration_blockGeom, goldMat);
  calibration_block.name = "calibration_block";
  calibration_block.position.set(-0.62, 0.24, 0.69);
  calibration_block.rotation.y = -0.38;
  dial_group.add(calibration_block);

  const calibration_block_baseGeom = new THREE.BoxGeometry(0.29, 0.025, 0.34);
  const calibration_block_base = new THREE.Mesh(calibration_block_baseGeom, markingMat);
  calibration_block_base.name = "calibration_block_base";
  calibration_block_base.position.set(-0.62, 0.222, 0.69);
  calibration_block_base.rotation.y = -0.38;
  dial_group.add(calibration_block_base);

  const calibration_screwGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.035, 20);
  const calibration_screw = new THREE.Mesh(calibration_screwGeom, goldMat);
  calibration_screw.name = "calibration_screw";
  calibration_screw.position.set(-0.67, 0.267, 0.75);
  dial_group.add(calibration_screw);

  const calibration_screw_slotGeom = new THREE.BoxGeometry(0.105, 0.012, 0.018);
  const calibration_screw_slot = new THREE.Mesh(calibration_screw_slotGeom, markingMat);
  calibration_screw_slot.name = "calibration_screw_slot";
  calibration_screw_slot.position.set(-0.67, 0.289, 0.75);
  calibration_screw_slot.rotation.y = 0.55;
  dial_group.add(calibration_screw_slot);

  const adjustment_holeGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.025, 24);
  const adjustment_hole = new THREE.Mesh(adjustment_holeGeom, housingMat);
  adjustment_hole.name = "adjustment_hole";
  adjustment_hole.position.set(0.31, 0.232, 0.86);
  dial_group.add(adjustment_hole);

  const adjustment_hole_rimGeom = new THREE.TorusGeometry(0.105, 0.014, 8, 24);
  const adjustment_hole_rim = new THREE.Mesh(adjustment_hole_rimGeom, markingMat);
  adjustment_hole_rim.name = "adjustment_hole_rim";
  adjustment_hole_rim.rotation.x = Math.PI / 2;
  adjustment_hole_rim.position.set(0.31, 0.247, 0.86);
  dial_group.add(adjustment_hole_rim);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(-0.055, 0.02);
  needleShape.lineTo(0.055, 0.02);
  needleShape.lineTo(0.038, 0.78);
  needleShape.lineTo(0, 1);
  needleShape.lineTo(-0.038, 0.78);
  needleShape.closePath();

  const needleGeom = new THREE.ShapeGeometry(needleShape);

  const north_needle = new THREE.Mesh(needleGeom, needleRedMat);
  north_needle.name = "north_needle";
  north_needle.position.y = 0.255;
  north_needle.rotation.x = Math.PI / 2;
  north_needle.renderOrder = 1;
  pointer_group.add(north_needle);

  const south_needle = new THREE.Mesh(needleGeom, needleDarkMat);
  south_needle.name = "south_needle";
  south_needle.position.y = 0.254;
  south_needle.rotation.x = Math.PI / 2;
  south_needle.scale.set(1, -1, 1);
  south_needle.renderOrder = 1;
  pointer_group.add(south_needle);

  const needle_pivotGeom = new THREE.CylinderGeometry(0.16, 0.18, 0.12, 32);
  const needle_pivot = new THREE.Mesh(needle_pivotGeom, goldMat);
  needle_pivot.name = "needle_pivot";
  needle_pivot.position.y = 0.29;
  center_group.add(needle_pivot);

  const center_lightGeom = new THREE.CylinderGeometry(0.235, 0.255, 0.13, 40);
  const center_light = new THREE.Mesh(center_lightGeom, center_lightMat);
  center_light.name = "center_light";
  center_light.position.y = 0.35;
  center_group.add(center_light);

  const center_light_rimGeom = new THREE.TorusGeometry(0.225, 0.025, 12, 40);
  const center_light_rim = new THREE.Mesh(center_light_rimGeom, center_lightMat);
  center_light_rim.name = "center_light_rim";
  center_light_rim.rotation.x = Math.PI / 2;
  center_light_rim.position.y = 0.418;
  center_group.add(center_light_rim);

  const center_capGeom = new THREE.CylinderGeometry(0.13, 0.145, 0.045, 32);
  const center_cap = new THREE.Mesh(center_capGeom, center_lightMat);
  center_cap.name = "center_cap";
  center_cap.position.y = 0.435;
  center_group.add(center_cap);

  const center_cap_insetGeom = new THREE.CylinderGeometry(0.085, 0.09, 0.012, 28);
  const center_cap_inset = new THREE.Mesh(center_cap_insetGeom, dialMat);
  center_cap_inset.name = "center_cap_inset";
  center_cap_inset.position.y = 0.463;
  center_group.add(center_cap_inset);

  const glass_domeGeom = new THREE.SphereGeometry(
    1.24,
    64,
    20,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const glass_dome = new THREE.Mesh(glass_domeGeom, glassMat);
  glass_dome.name = "glass_dome";
  glass_dome.position.y = 0.275;
  glass_dome.scale.set(1, 0.22, 1);
  glass_dome.renderOrder = 2;
  housing_group.add(glass_dome);

  const glass_highlightGeom = new THREE.TorusGeometry(
    1.03,
    0.014,
    6,
    36,
    1.35
  );
  const glass_highlight = new THREE.Mesh(glass_highlightGeom, highlightMat);
  glass_highlight.name = "glass_highlight";
  glass_highlight.rotation.x = Math.PI / 2;
  glass_highlight.rotation.z = 2.45;
  glass_highlight.position.y = 0.49;
  glass_highlight.renderOrder = 3;
  housing_group.add(glass_highlight);

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