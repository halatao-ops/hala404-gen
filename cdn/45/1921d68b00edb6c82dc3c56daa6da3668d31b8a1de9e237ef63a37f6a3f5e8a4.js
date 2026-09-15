export default function generate(THREE) {
  const root = new THREE.Group();
  const feather_group = new THREE.Group();
  const handle_group = new THREE.Group();
  root.add(feather_group, handle_group);

  const vaneMat = new THREE.MeshStandardMaterial({
    color: 0xf4f3ef,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const vaneTextureMat = new THREE.MeshStandardMaterial({
    color: 0xd8d7d2,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const barbMat = new THREE.LineBasicMaterial({
    color: 0xc8c7c1,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });
  const downMat = new THREE.LineBasicMaterial({
    color: 0xd8d7d2,
    transparent: true,
    opacity: 0.58,
    depthWrite: false
  });
  const rachisMat = new THREE.MeshStandardMaterial({
    color: 0xe5e2d9,
    metalness: 0.0,
    roughness: 0.7
  });
  const rachisHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xfff6df,
    metalness: 0.0,
    roughness: 0.65
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d5,
    metalness: 0.5,
    roughness: 0.22
  });
  const brightSilverMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: 0.45,
    roughness: 0.18
  });
  const darkSilverMat = new THREE.MeshStandardMaterial({
    color: 0x969692,
    metalness: 0.45,
    roughness: 0.25
  });

  const leftShape = new THREE.Shape();
  leftShape.moveTo(-0.018, 0.08);
  leftShape.bezierCurveTo(-0.13, 0.18, -0.28, 0.48, -0.34, 0.86);
  leftShape.bezierCurveTo(-0.42, 1.35, -0.31, 1.95, -0.10, 2.40);
  leftShape.bezierCurveTo(-0.06, 2.49, -0.025, 2.55, 0.0, 2.57);
  leftShape.lineTo(-0.004, 2.30);
  leftShape.lineTo(-0.009, 1.75);
  leftShape.lineTo(-0.014, 1.10);
  leftShape.lineTo(-0.017, 0.45);
  leftShape.closePath();

  const rightShape = new THREE.Shape();
  rightShape.moveTo(0.018, 0.08);
  rightShape.bezierCurveTo(0.16, 0.18, 0.31, 0.50, 0.37, 0.90);
  rightShape.bezierCurveTo(0.44, 1.38, 0.34, 1.98, 0.13, 2.42);
  rightShape.bezierCurveTo(0.08, 2.51, 0.035, 2.56, 0.0, 2.57);
  rightShape.lineTo(0.005, 2.30);
  rightShape.lineTo(0.010, 1.75);
  rightShape.lineTo(0.014, 1.10);
  rightShape.lineTo(0.017, 0.45);
  rightShape.closePath();

  const left_vaneGeom = new THREE.ShapeGeometry(leftShape, 24);
  const left_vane = new THREE.Mesh(left_vaneGeom, vaneMat);
  left_vane.position.z = -0.006;
  left_vane.renderOrder = 1;
  feather_group.add(left_vane);

  const right_vaneGeom = new THREE.ShapeGeometry(rightShape, 24);
  const right_vane = new THREE.Mesh(right_vaneGeom, vaneMat);
  right_vane.position.z = -0.006;
  right_vane.renderOrder = 1;
  feather_group.add(right_vane);

  const textureShape = new THREE.Shape();
  textureShape.moveTo(-0.012, 0.16);
  textureShape.bezierCurveTo(-0.10, 0.25, -0.22, 0.55, -0.27, 0.90);
  textureShape.bezierCurveTo(-0.33, 1.35, -0.24, 1.90, -0.07, 2.38);
  textureShape.bezierCurveTo(-0.04, 2.47, -0.015, 2.51, 0.0, 2.52);
  textureShape.bezierCurveTo(0.035, 2.50, 0.07, 2.45, 0.10, 2.37);
  textureShape.bezierCurveTo(0.28, 1.90, 0.34, 1.35, 0.28, 0.90);
  textureShape.bezierCurveTo(0.23, 0.52, 0.10, 0.24, 0.012, 0.16);
  textureShape.closePath();

  const vane_textureGeom = new THREE.ShapeGeometry(textureShape, 24);
  const vane_texture = new THREE.Mesh(vane_textureGeom, vaneTextureMat);
  vane_texture.position.z = 0.004;
  vane_texture.renderOrder = 2;
  feather_group.add(vane_texture);

  function featherWidthAt(y) {
    const t = Math.max(0, Math.min(1, (y - 0.08) / 2.49));
    const envelope = Math.pow(Math.sin(Math.PI * t), 0.72);
    return 0.42 * envelope * (0.96 + 0.06 * t);
  }

  const barbPositions = [];
  const barbCount = 112;
  for (let i = 0; i < barbCount; i++) {
    const t = i / (barbCount - 1);
    const startY = 0.18 + t * 2.27;
    const endY = startY + 0.060 + 0.020 * (1 - t);
    const width = featherWidthAt(endY - 0.012);
    const slant = 0.012 + 0.018 * (1 - t);

    barbPositions.push(
      -0.018, startY, 0.026,
      -width * 0.96, endY, 0.026,
      0.018, startY, 0.026,
      width * 0.98, endY, 0.026
    );
  }
  const barb_linesGeom = new THREE.BufferGeometry();
  barb_linesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(barbPositions, 3)
  );
  const barb_lines = new THREE.LineSegments(barb_linesGeom, barbMat);
  barb_lines.renderOrder = 3;
  feather_group.add(barb_lines);

  const downPositions = [];
  const downCount = 28;
  for (let i = 0; i < downCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const band = Math.floor(i / 2);
    const startY = 0.075 + 0.012 * (i % 5);
    const spread = 0.12 + 0.014 * band;
    const rise = 0.045 + 0.012 * ((i * 3) % 7);
    const endX = side * spread;
    const endY = startY + rise;
    const midX = side * spread * 0.52;
    const midY = startY + rise * 0.58 + 0.018;

    downPositions.push(
      side * 0.012, startY, 0.022,
      midX, midY, 0.022,
      midX, midY, 0.022,
      endX, endY, 0.022
    );
  }
  const down_linesGeom = new THREE.BufferGeometry();
  down_linesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(downPositions, 3)
  );
  const down_lines = new THREE.LineSegments(down_linesGeom, downMat);
  down_lines.renderOrder = 3;
  feather_group.add(down_lines);

  const rachis_lowerGeom = new THREE.CylinderGeometry(0.014, 0.027, 0.78, 12);
  const rachis_lower = new THREE.Mesh(rachis_lowerGeom, rachisMat);
  rachis_lower.position.set(0, 0.48, 0.045);
  feather_group.add(rachis_lower);

  const rachis_middleGeom = new THREE.CylinderGeometry(0.008, 0.015, 1.08, 12);
  const rachis_middle = new THREE.Mesh(rachis_middleGeom, rachisMat);
  rachis_middle.position.set(0, 1.35, 0.045);
  feather_group.add(rachis_middle);

  const rachis_upperGeom = new THREE.CylinderGeometry(0.0025, 0.0085, 0.96, 12);
  const rachis_upper = new THREE.Mesh(rachis_upperGeom, rachisMat);
  rachis_upper.position.set(0, 2.24, 0.045);
  feather_group.add(rachis_upper);

  const rachis_highlightGeom = new THREE.CylinderGeometry(0.0015, 0.003, 1.92, 8);
  const rachis_highlight = new THREE.Mesh(rachis_highlightGeom, rachisHighlightMat);
  rachis_highlight.position.set(-0.004, 1.34, 0.061);
  feather_group.add(rachis_highlight);

  const upper_handleGeom = new THREE.CylinderGeometry(0.052, 0.070, 0.82, 24);
  const upper_handle = new THREE.Mesh(upper_handleGeom, silverMat);
  upper_handle.position.set(0, -0.56, 0.018);
  handle_group.add(upper_handle);

  const upper_handle_highlightGeom = new THREE.CylinderGeometry(0.008, 0.011, 0.72, 10);
  const upper_handle_highlight = new THREE.Mesh(upper_handle_highlightGeom, brightSilverMat);
  upper_handle_highlight.position.set(-0.025, -0.55, 0.074);
  handle_group.add(upper_handle_highlight);

  const upper_handle_shadowGeom = new THREE.CylinderGeometry(0.006, 0.009, 0.72, 10);
  const upper_handle_shadow = new THREE.Mesh(upper_handle_shadowGeom, darkSilverMat);
  upper_handle_shadow.position.set(0.034, -0.55, 0.067);
  handle_group.add(upper_handle_shadow);

  const collar_ringGeom = new THREE.TorusGeometry(0.068, 0.010, 8, 24);
  const collar_ring = new THREE.Mesh(collar_ringGeom, brightSilverMat);
  collar_ring.rotation.x = Math.PI / 2;
  collar_ring.position.set(0, -0.965, 0.018);
  handle_group.add(collar_ring);

  const lower_handleGeom = new THREE.CylinderGeometry(0.058, 0.012, 0.84, 24);
  const lower_handle = new THREE.Mesh(lower_handleGeom, silverMat);
  lower_handle.position.set(0, -1.385, 0.018);
  handle_group.add(lower_handle);

  const lower_handle_highlightGeom = new THREE.CylinderGeometry(0.007, 0.0025, 0.72, 10);
  const lower_handle_highlight = new THREE.Mesh(lower_handle_highlightGeom, brightSilverMat);
  lower_handle_highlight.position.set(-0.020, -1.37, 0.061);
  handle_group.add(lower_handle_highlight);

  const lower_handle_shadowGeom = new THREE.CylinderGeometry(0.005, 0.002, 0.72, 10);
  const lower_handle_shadow = new THREE.Mesh(lower_handle_shadowGeom, darkSilverMat);
  lower_handle_shadow.position.set(0.024, -1.37, 0.056);
  handle_group.add(lower_handle_shadow);

  const writing_tipGeom = new THREE.CylinderGeometry(0.012, 0.001, 0.16, 16);
  const writing_tip = new THREE.Mesh(writing_tipGeom, darkSilverMat);
  writing_tip.position.set(0, -1.865, 0.018);
  handle_group.add(writing_tip);

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