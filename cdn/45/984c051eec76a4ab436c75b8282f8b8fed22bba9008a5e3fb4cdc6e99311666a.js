export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_pocket_compass";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a3e,
    metalness: 0.6,
    roughness: 0.4,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x6f5224,
    metalness: 0.5,
    roughness: 0.5,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xe8e2cf,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x252a2a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const fadedInkMat = new THREE.MeshStandardMaterial({
    color: 0x555b59,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xb51f35,
    metalness: 0.1,
    roughness: 0.3,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f0ed,
    transmission: 0.75,
    thickness: 0.025,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const case_body = new THREE.Group();
  case_body.name = "case_body";
  root.add(case_body);

  const case_backGeom = new THREE.CylinderGeometry(1.49, 1.49, 0.18, 64);
  const case_back = new THREE.Mesh(case_backGeom, darkBrassMat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.13;
  case_body.add(case_back);

  const case_sideGeom = new THREE.CylinderGeometry(1.55, 1.55, 0.28, 64);
  const case_side = new THREE.Mesh(case_sideGeom, brassMat);
  case_side.name = "case_side";
  case_side.rotation.x = Math.PI / 2;
  case_side.position.z = -0.015;
  case_body.add(case_side);

  const rear_rimGeom = new THREE.TorusGeometry(1.43, 0.12, 12, 64);
  const rear_rim = new THREE.Mesh(rear_rimGeom, darkBrassMat);
  rear_rim.name = "rear_rim";
  rear_rim.position.z = -0.13;
  case_body.add(rear_rim);

  const side_grooveGeom = new THREE.TorusGeometry(1.535, 0.018, 8, 64);
  const side_groove = new THREE.Mesh(side_grooveGeom, darkBrassMat);
  side_groove.name = "side_groove";
  side_groove.position.z = -0.055;
  case_body.add(side_groove);

  const dial_faceGeom = new THREE.CircleGeometry(1.315, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.name = "dial_face";
  dial_face.position.z = 0.132;
  case_body.add(dial_face);

  const outer_bezelGeom = new THREE.TorusGeometry(1.405, 0.145, 16, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, brassMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.13;
  case_body.add(outer_bezel);

  const bezel_highlightGeom = new THREE.TorusGeometry(1.42, 0.045, 10, 72);
  const bezel_highlight = new THREE.Mesh(bezel_highlightGeom, brassMat);
  bezel_highlight.name = "bezel_highlight";
  bezel_highlight.position.z = 0.245;
  case_body.add(bezel_highlight);

  const inner_bezelGeom = new THREE.TorusGeometry(1.285, 0.026, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, darkBrassMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.225;
  case_body.add(inner_bezel);

  const dial_details = new THREE.Group();
  dial_details.name = "dial_details";
  root.add(dial_details);

  const outer_scale_ringGeom = new THREE.RingGeometry(1.185, 1.198, 64);
  const outer_scale_ring = new THREE.Mesh(outer_scale_ringGeom, inkMat);
  outer_scale_ring.name = "outer_scale_ring";
  outer_scale_ring.position.z = 0.143;
  dial_details.add(outer_scale_ring);

  const inner_scale_ringGeom = new THREE.RingGeometry(1.015, 1.027, 64);
  const inner_scale_ring = new THREE.Mesh(inner_scale_ringGeom, fadedInkMat);
  inner_scale_ring.name = "inner_scale_ring";
  inner_scale_ring.position.z = 0.144;
  dial_details.add(inner_scale_ring);

  const center_guide_ringGeom = new THREE.RingGeometry(0.335, 0.347, 48);
  const center_guide_ring = new THREE.Mesh(center_guide_ringGeom, fadedInkMat);
  center_guide_ring.name = "center_guide_ring";
  center_guide_ring.position.z = 0.145;
  dial_details.add(center_guide_ring);

  const minor_tickGeom = new THREE.BoxGeometry(0.012, 0.075, 0.008);
  const minor_ticks = new THREE.InstancedMesh(minor_tickGeom, fadedInkMat, 60);
  minor_ticks.name = "minor_ticks";
  const minor_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    minor_tick_dummy.position.set(
      Math.sin(angle) * 1.145,
      Math.cos(angle) * 1.145,
      0.149
    );
    minor_tick_dummy.rotation.set(0, 0, -angle);
    minor_tick_dummy.updateMatrix();
    minor_ticks.setMatrixAt(i, minor_tick_dummy.matrix);
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  dial_details.add(minor_ticks);

  const major_tickGeom = new THREE.BoxGeometry(0.022, 0.16, 0.009);
  const major_ticks = new THREE.InstancedMesh(major_tickGeom, inkMat, 12);
  major_ticks.name = "major_ticks";
  const major_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    major_tick_dummy.position.set(
      Math.sin(angle) * 1.105,
      Math.cos(angle) * 1.105,
      0.151
    );
    major_tick_dummy.rotation.set(0, 0, -angle);
    major_tick_dummy.updateMatrix();
    major_ticks.setMatrixAt(i, major_tick_dummy.matrix);
  }
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_details.add(major_ticks);

  const compass_rose = new THREE.Group();
  compass_rose.name = "compass_rose";
  dial_details.add(compass_rose);

  const rose_left_shape = new THREE.Shape();
  rose_left_shape.moveTo(0, 0.035);
  rose_left_shape.lineTo(0, 0.86);
  rose_left_shape.lineTo(-0.105, 0.11);
  rose_left_shape.closePath();

  const rose_right_shape = new THREE.Shape();
  rose_right_shape.moveTo(0, 0.035);
  rose_right_shape.lineTo(0.105, 0.11);
  rose_right_shape.lineTo(0, 0.86);
  rose_right_shape.closePath();

  const rose_leftGeom = new THREE.ShapeGeometry(rose_left_shape);
  const rose_rightGeom = new THREE.ShapeGeometry(rose_right_shape);
  const rose_left_halves = new THREE.InstancedMesh(rose_leftGeom, inkMat, 8);
  const rose_right_halves = new THREE.InstancedMesh(rose_rightGeom, fadedInkMat, 8);
  rose_left_halves.name = "rose_left_halves";
  rose_right_halves.name = "rose_right_halves";

  const rose_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const lengthScale = i % 2 === 0 ? 1.0 : 0.78;

    rose_dummy.position.set(0, 0, 0.147);
    rose_dummy.rotation.set(0, 0, -angle);
    rose_dummy.scale.set(1, lengthScale, 1);
    rose_dummy.updateMatrix();
    rose_left_halves.setMatrixAt(i, rose_dummy.matrix);
    rose_right_halves.setMatrixAt(i, rose_dummy.matrix);
  }
  rose_left_halves.instanceMatrix.needsUpdate = true;
  rose_right_halves.instanceMatrix.needsUpdate = true;
  compass_rose.add(rose_left_halves, rose_right_halves);

  const glyph_strokeGeom = new THREE.BoxGeometry(0.022, 0.14, 0.008);

  function addGlyphStroke(parent, x, y, rotation, lengthScale) {
    const stroke = new THREE.Mesh(glyph_strokeGeom, inkMat);
    stroke.position.set(x, y, 0);
    stroke.rotation.z = rotation;
    stroke.scale.y = lengthScale;
    parent.add(stroke);
    return stroke;
  }

  const north_label = new THREE.Group();
  north_label.name = "north_label";
  north_label.position.set(0, 0.91, 0.153);
  addGlyphStroke(north_label, -0.045, 0, 0, 1);
  addGlyphStroke(north_label, 0.045, 0, 0, 1);
  addGlyphStroke(north_label, 0, 0, -0.55, 1.08);
  dial_details.add(north_label);

  const east_label = new THREE.Group();
  east_label.name = "east_label";
  east_label.position.set(0.91, 0, 0.153);
  addGlyphStroke(east_label, -0.045, 0, 0, 1);
  addGlyphStroke(east_label, 0.005, 0.055, Math.PI / 2, 0.72);
  addGlyphStroke(east_label, -0.005, 0, Math.PI / 2, 0.62);
  addGlyphStroke(east_label, 0.005, -0.055, Math.PI / 2, 0.72);
  dial_details.add(east_label);

  const south_label = new THREE.Group();
  south_label.name = "south_label";
  south_label.position.set(0, -0.91, 0.153);
  addGlyphStroke(south_label, -0.005, 0.055, Math.PI / 2, 0.72);
  addGlyphStroke(south_label, 0.005, 0, Math.PI / 2, 0.72);
  addGlyphStroke(south_label, -0.005, -0.055, Math.PI / 2, 0.72);
  addGlyphStroke(south_label, -0.045, 0.028, 0, 0.48);
  addGlyphStroke(south_label, 0.045, -0.028, 0, 0.48);
  dial_details.add(south_label);

  const west_label = new THREE.Group();
  west_label.name = "west_label";
  west_label.position.set(-0.91, 0, 0.153);
  addGlyphStroke(west_label, -0.052, 0, -0.32, 0.82);
  addGlyphStroke(west_label, -0.017, -0.012, 0.32, 0.72);
  addGlyphStroke(west_label, 0.017, -0.012, -0.32, 0.72);
  addGlyphStroke(west_label, 0.052, 0, 0.32, 0.82);
  dial_details.add(west_label);

  const needle_assembly = new THREE.Group();
  needle_assembly.name = "needle_assembly";
  needle_assembly.rotation.z = Math.PI / 4;
  root.add(needle_assembly);

  const north_needle_shape = new THREE.Shape();
  north_needle_shape.moveTo(-0.075, -0.035);
  north_needle_shape.lineTo(0, 1.055);
  north_needle_shape.lineTo(0.075, -0.035);
  north_needle_shape.lineTo(0, 0.07);
  north_needle_shape.closePath();

  const north_needleGeom = new THREE.ShapeGeometry(north_needle_shape);
  const north_needle = new THREE.Mesh(north_needleGeom, redMat);
  north_needle.name = "north_needle";
  north_needle.position.z = 0.178;
  needle_assembly.add(north_needle);

  const south_needle_shape = new THREE.Shape();
  south_needle_shape.moveTo(-0.085, 0.035);
  south_needle_shape.lineTo(0, -0.96);
  south_needle_shape.lineTo(0.085, 0.035);
  south_needle_shape.lineTo(0, -0.07);
  south_needle_shape.closePath();

  const south_needleGeom = new THREE.ShapeGeometry(south_needle_shape);
  const south_needle = new THREE.Mesh(south_needleGeom, inkMat);
  south_needle.name = "south_needle";
  south_needle.position.z = 0.177;
  needle_assembly.add(south_needle);

  const pivot_baseGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.055, 32);
  const pivot_base = new THREE.Mesh(pivot_baseGeom, darkBrassMat);
  pivot_base.name = "pivot_base";
  pivot_base.rotation.x = Math.PI / 2;
  pivot_base.position.z = 0.19;
  root.add(pivot_base);

  const pivot_collarGeom = new THREE.TorusGeometry(0.135, 0.027, 10, 32);
  const pivot_collar = new THREE.Mesh(pivot_collarGeom, brassMat);
  pivot_collar.name = "pivot_collar";
  pivot_collar.position.z = 0.222;
  root.add(pivot_collar);

  const pivot_capGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.065, 32);
  const pivot_cap = new THREE.Mesh(pivot_capGeom, redMat);
  pivot_cap.name = "pivot_cap";
  pivot_cap.rotation.x = Math.PI / 2;
  pivot_cap.position.z = 0.235;
  root.add(pivot_cap);

  const pivot_buttonGeom = new THREE.SphereGeometry(0.075, 24, 12);
  const pivot_button = new THREE.Mesh(pivot_buttonGeom, redMat);
  pivot_button.name = "pivot_button";
  pivot_button.scale.set(1, 1, 0.45);
  pivot_button.position.z = 0.282;
  root.add(pivot_button);

  const glass_coverGeom = new THREE.CircleGeometry(1.275, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.z = 0.287;
  glass_cover.renderOrder = 2;
  root.add(glass_cover);

  const glass_highlight_shape = new THREE.Shape();
  glass_highlight_shape.moveTo(-1.02, 0.58);
  glass_highlight_shape.bezierCurveTo(-0.78, 0.98, -0.22, 1.18, 0.48, 1.02);
  glass_highlight_shape.bezierCurveTo(0.18, 0.97, -0.12, 0.88, -0.38, 0.73);
  glass_highlight_shape.bezierCurveTo(-0.62, 0.61, -0.84, 0.55, -1.02, 0.58);
  glass_highlight_shape.closePath();

  const glass_highlightGeom = new THREE.ShapeGeometry(glass_highlight_shape);
  const glass_highlight = new THREE.Mesh(glass_highlightGeom, highlightMat);
  glass_highlight.name = "glass_highlight";
  glass_highlight.position.z = 0.291;
  glass_highlight.renderOrder = 3;
  root.add(glass_highlight);

  const hanging_hardware = new THREE.Group();
  hanging_hardware.name = "hanging_hardware";
  root.add(hanging_hardware);

  const loop_stemGeom = new THREE.CylinderGeometry(0.085, 0.105, 0.34, 20);
  const loop_stem = new THREE.Mesh(loop_stemGeom, brassMat);
  loop_stem.name = "loop_stem";
  loop_stem.position.set(0, 1.57, -0.035);
  hanging_hardware.add(loop_stem);

  const stem_socketGeom = new THREE.SphereGeometry(0.13, 24, 12);
  const stem_socket = new THREE.Mesh(stem_socketGeom, darkBrassMat);
  stem_socket.name = "stem_socket";
  stem_socket.scale.set(0.9, 1.15, 0.8);
  stem_socket.position.set(0, 1.43, -0.025);
  hanging_hardware.add(stem_socket);

  const loop_knuckleGeom = new THREE.SphereGeometry(0.13, 24, 12);
  const loop_knuckle = new THREE.Mesh(loop_knuckleGeom, brassMat);
  loop_knuckle.name = "loop_knuckle";
  loop_knuckle.scale.set(0.9, 1.05, 0.85);
  loop_knuckle.position.set(0, 1.72, -0.035);
  hanging_hardware.add(loop_knuckle);

  const hanging_loopGeom = new THREE.TorusGeometry(0.29, 0.072, 12, 48);
  const hanging_loop = new THREE.Mesh(hanging_loopGeom, brassMat);
  hanging_loop.name = "hanging_loop";
  hanging_loop.position.set(0, 1.99, -0.04);
  hanging_hardware.add(hanging_loop);

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