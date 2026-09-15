export default function generate(THREE) {
  const root = new THREE.Group();
  const package_group = new THREE.Group();
  package_group.rotation.set(-0.035, -0.16, -0.015);
  root.add(package_group);

  const pouch_backMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf0c8,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const pouch_frontMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2f4d8,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const pouch_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f3cc,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const pouch_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.13,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const rear_leafMat = new THREE.MeshStandardMaterial({
    color: 0x7fa63d,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const rear_leaf_veinMat = new THREE.MeshStandardMaterial({
    color: 0xb7cc68,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
  });
  const middle_leafMat = new THREE.MeshStandardMaterial({
    color: 0x3f682d,
    side: THREE.DoubleSide
  });
  const front_leafMat = new THREE.MeshStandardMaterial({
    color: 0x527b35,
    side: THREE.DoubleSide
  });
  const leaf_veinMat = new THREE.MeshStandardMaterial({
    color: 0x91ad4e,
    side: THREE.DoubleSide
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x78953c,
    side: THREE.DoubleSide
  });
  const tan_stemMat = new THREE.MeshStandardMaterial({
    color: 0xa58b55,
    side: THREE.DoubleSide
  });
  const herb_fragmentMat = new THREE.MeshStandardMaterial({
    color: 0x294526,
    side: THREE.DoubleSide
  });
  const pale_fragmentMat = new THREE.MeshStandardMaterial({
    color: 0xa7b85d,
    side: THREE.DoubleSide
  });
  const wrinkleMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });

  function makeTubeGeometry(points, width) {
    const left = [];
    const right = [];

    for (let i = 0; i < points.length; i++) {
      const previous = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const dx = next[0] - previous[0];
      const dy = next[1] - previous[1];
      const length = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / length;
      const ny = dx / length;
      const t = i / (points.length - 1);
      const halfWidth = width * (0.35 + 0.65 * Math.sin(Math.PI * t));

      left.push([
        points[i][0] + nx * halfWidth,
        points[i][1] + ny * halfWidth
      ]);
      right.push([
        points[i][0] - nx * halfWidth,
        points[i][1] - ny * halfWidth
      ]);
    }

    const shape = new THREE.Shape();
    shape.moveTo(left[0][0], left[0][1]);
    for (let i = 1; i < left.length; i++) {
      shape.lineTo(left[i][0], left[i][1]);
    }
    for (let i = right.length - 1; i >= 0; i--) {
      shape.lineTo(right[i][0], right[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function addVeinTube(parent, points, width, material) {
    const vein = new THREE.Mesh(makeTubeGeometry(points, width), material);
    vein.position.z = 0.012;
    parent.add(vein);
    return vein;
  }

  const pouch_backShape = new THREE.Shape();
  pouch_backShape.moveTo(-1.34, -1.16);
  pouch_backShape.lineTo(1.27, -1.27);
  pouch_backShape.lineTo(1.22, 0.98);
  pouch_backShape.lineTo(0.98, 1.10);
  pouch_backShape.lineTo(0.72, 1.02);
  pouch_backShape.lineTo(0.48, 1.16);
  pouch_backShape.lineTo(0.20, 1.08);
  pouch_backShape.lineTo(-0.08, 1.20);
  pouch_backShape.lineTo(-0.38, 1.12);
  pouch_backShape.lineTo(-0.68, 1.22);
  pouch_backShape.lineTo(-0.96, 1.13);
  pouch_backShape.lineTo(-1.25, 1.18);
  pouch_backShape.closePath();

  const pouch_backGeom = new THREE.ShapeGeometry(pouch_backShape);
  const pouch_back = new THREE.Mesh(pouch_backGeom, pouch_backMat);
  pouch_back.position.z = -0.12;
  pouch_back.renderOrder = 1;
  package_group.add(pouch_back);

  const rear_leafShape = new THREE.Shape();
  rear_leafShape.moveTo(0.48, -1.02);
  rear_leafShape.lineTo(0.31, -0.68);
  rear_leafShape.lineTo(0.18, -0.35);
  rear_leafShape.lineTo(0.02, -0.05);
  rear_leafShape.lineTo(-0.18, 0.28);
  rear_leafShape.lineTo(-0.39, 0.61);
  rear_leafShape.lineTo(-0.58, 0.93);
  rear_leafShape.lineTo(-0.72, 1.25);
  rear_leafShape.lineTo(-0.91, 1.36);
  rear_leafShape.lineTo(-1.08, 1.25);
  rear_leafShape.lineTo(-1.18, 1.04);
  rear_leafShape.lineTo(-1.31, 0.88);
  rear_leafShape.lineTo(-1.22, 0.68);
  rear_leafShape.lineTo(-1.35, 0.49);
  rear_leafShape.lineTo(-1.20, 0.29);
  rear_leafShape.lineTo(-1.31, 0.08);
  rear_leafShape.lineTo(-1.14, -0.10);
  rear_leafShape.lineTo(-1.25, -0.31);
  rear_leafShape.lineTo(-1.05, -0.47);
  rear_leafShape.lineTo(-0.91, -0.66);
  rear_leafShape.lineTo(-0.72, -0.78);
  rear_leafShape.lineTo(-0.55, -0.98);
  rear_leafShape.lineTo(-0.34, -1.12);
  rear_leafShape.lineTo(-0.10, -1.06);
  rear_leafShape.lineTo(0.12, -1.15);
  rear_leafShape.closePath();

  const rear_leafGeom = new THREE.ShapeGeometry(rear_leafShape);
  const rear_leaf = new THREE.Mesh(rear_leafGeom, rear_leafMat);
  rear_leaf.position.z = -0.075;
  rear_leaf.renderOrder = 2;
  package_group.add(rear_leaf);

  const rear_leaf_veins = new THREE.Group();
  addVeinTube(rear_leaf_veins, [[0.43, -0.96], [0.16, -0.35], [-0.18, 0.28], [-0.58, 0.92], [-0.88, 1.29]], 0.018, rear_leaf_veinMat);
  addVeinTube(rear_leaf_veins, [[0.08, -0.27], [-0.35, -0.10], [-0.82, 0.02], [-1.17, 0.08]], 0.010, rear_leaf_veinMat);
  addVeinTube(rear_leaf_veins, [[-0.08, 0.08], [-0.52, 0.22], [-0.98, 0.34], [-1.25, 0.39]], 0.009, rear_leaf_veinMat);
  addVeinTube(rear_leaf_veins, [[-0.22, 0.36], [-0.58, 0.55], [-0.96, 0.70], [-1.18, 0.77]], 0.009, rear_leaf_veinMat);
  addVeinTube(rear_leaf_veins, [[-0.39, 0.63], [-0.67, 0.86], [-0.88, 1.10]], 0.008, rear_leaf_veinMat);
  addVeinTube(rear_leaf_veins, [[-0.67, 0.03], [-0.78, 0.36], [-0.83, 0.70], [-0.87, 1.08]], 0.007, rear_leaf_veinMat);
  addVeinTube(rear_leaf_veins, [[-0.48, 0.42], [-0.28, 0.68], [-0.18, 0.98]], 0.007, rear_leaf_veinMat);
  addVeinTube(rear_leaf_veins, [[-0.86, 0.27], [-1.04, 0.48], [-1.15, 0.68]], 0.006, rear_leaf_veinMat);
  rear_leaf_veins.position.z = -0.068;
  rear_leaf_veins.renderOrder = 3;
  package_group.add(rear_leaf_veins);

  const middle_leafShape = new THREE.Shape();
  middle_leafShape.moveTo(0.62, -0.92);
  middle_leafShape.lineTo(0.42, -0.62);
  middle_leafShape.lineTo(0.22, -0.35);
  middle_leafShape.lineTo(0.02, -0.08);
  middle_leafShape.lineTo(-0.20, 0.18);
  middle_leafShape.lineTo(-0.42, 0.42);
  middle_leafShape.lineTo(-0.68, 0.55);
  middle_leafShape.lineTo(-0.92, 0.48);
  middle_leafShape.lineTo(-1.10, 0.30);
  middle_leafShape.lineTo(-1.22, 0.05);
  middle_leafShape.lineTo(-1.12, -0.18);
  middle_leafShape.lineTo(-0.95, -0.35);
  middle_leafShape.lineTo(-0.82, -0.55);
  middle_leafShape.lineTo(-0.62, -0.68);
  middle_leafShape.lineTo(-0.48, -0.88);
  middle_leafShape.lineTo(-0.20, -1.02);
  middle_leafShape.lineTo(0.08, -0.94);
  middle_leafShape.lineTo(0.30, -1.08);
  middle_leafShape.closePath();

  const middle_leafGeom = new THREE.ShapeGeometry(middle_leafShape);
  const middle_leaf = new THREE.Mesh(middle_leafGeom, middle_leafMat);
  middle_leaf.position.z = -0.025;
  package_group.add(middle_leaf);

  const middle_leaf_veins = new THREE.Group();
  addVeinTube(middle_leaf_veins, [[0.55, -0.88], [0.20, -0.35], [-0.20, 0.18], [-0.66, 0.50]], 0.014, leaf_veinMat);
  addVeinTube(middle_leaf_veins, [[0.03, -0.08], [-0.35, -0.18], [-0.75, -0.28], [-1.10, -0.16]], 0.008, leaf_veinMat);
  addVeinTube(middle_leaf_veins, [[-0.18, 0.16], [-0.48, 0.02], [-0.78, -0.08], [-1.08, -0.05]], 0.007, leaf_veinMat);
  addVeinTube(middle_leaf_veins, [[-0.40, 0.39], [-0.62, 0.28], [-0.84, 0.20]], 0.007, leaf_veinMat);
  addVeinTube(middle_leaf_veins, [[-0.58, 0.50], [-0.76, 0.46], [-0.94, 0.40]], 0.006, leaf_veinMat);
  middle_leaf_veins.position.z = -0.016;
  package_group.add(middle_leaf_veins);

  const front_leafShape = new THREE.Shape();
  front_leafShape.moveTo(0.78, -1.02);
  front_leafShape.lineTo(0.55, -0.72);
  front_leafShape.lineTo(0.32, -0.45);
  front_leafShape.lineTo(0.10, -0.18);
  front_leafShape.lineTo(-0.12, 0.08);
  front_leafShape.lineTo(-0.35, 0.30);
  front_leafShape.lineTo(-0.58, 0.38);
  front_leafShape.lineTo(-0.82, 0.28);
  front_leafShape.lineTo(-1.02, 0.08);
  front_leafShape.lineTo(-1.12, -0.18);
  front_leafShape.lineTo(-1.00, -0.42);
  front_leafShape.lineTo(-0.82, -0.58);
  front_leafShape.lineTo(-0.68, -0.78);
  front_leafShape.lineTo(-0.42, -0.92);
  front_leafShape.lineTo(-0.15, -1.08);
  front_leafShape.lineTo(0.15, -1.00);
  front_leafShape.lineTo(0.40, -1.12);
  front_leafShape.closePath();

  const front_leafGeom = new THREE.ShapeGeometry(front_leafShape);
  const front_leaf = new THREE.Mesh(front_leafGeom, front_leafMat);
  front_leaf.position.z = 0.025;
  front_leaf.renderOrder = 4;
  package_group.add(front_leaf);

  const front_leaf_veins = new THREE.Group();
  addVeinTube(front_leaf_veins, [[0.70, -0.98], [0.31, -0.45], [-0.12, 0.08], [-0.56, 0.34]], 0.015, leaf_veinMat);
  addVeinTube(front_leaf_veins, [[0.10, -0.18], [-0.25, -0.30], [-0.62, -0.38], [-0.98, -0.28]], 0.008, leaf_veinMat);
  addVeinTube(front_leaf_veins, [[-0.10, 0.06], [-0.38, -0.02], [-0.68, -0.10], [-0.98, -0.12]], 0.007, leaf_veinMat);
  addVeinTube(front_leaf_veins, [[-0.34, 0.28], [-0.55, 0.20], [-0.76, 0.13], [-0.96, 0.08]], 0.007, leaf_veinMat);
  addVeinTube(front_leaf_veins, [[-0.55, 0.34], [-0.70, 0.31], [-0.84, 0.26]], 0.006, leaf_veinMat);
  front_leaf_veins.position.z = 0.034;
  front_leaf_veins.renderOrder = 5;
  package_group.add(front_leaf_veins);

  const main_stemGeom = makeTubeGeometry([
    [0.88, -1.08],
    [0.62, -0.76],
    [0.36, -0.43],
    [0.10, -0.10],
    [-0.16, 0.25],
    [-0.42, 0.60],
    [-0.66, 0.94],
    [-0.84, 1.24]
  ], 0.045);
  const main_stem = new THREE.Mesh(main_stemGeom, stemMat);
  main_stem.position.z = 0.052;
  main_stem.renderOrder = 6;
  package_group.add(main_stem);

  const secondary_stemGeom = makeTubeGeometry([
    [0.72, -1.04],
    [0.48, -0.72],
    [0.25, -0.42],
    [0.02, -0.12],
    [-0.22, 0.20],
    [-0.48, 0.50]
  ], 0.027);
  const secondary_stem = new THREE.Mesh(secondary_stemGeom, stemMat);
  secondary_stem.position.z = 0.055;
  secondary_stem.renderOrder = 6;
  package_group.add(secondary_stem);

  const tan_stemGeom = makeTubeGeometry([
    [-0.72, -0.82],
    [-0.42, -0.68],
    [-0.12, -0.55],
    [0.18, -0.43],
    [0.46, -0.34]
  ], 0.020);
  const tan_stem = new THREE.Mesh(tan_stemGeom, tan_stemMat);
  tan_stem.position.z = 0.058;
  package_group.add(tan_stem);

  const herb_fragmentGeom = new THREE.CircleGeometry(0.045, 10);
  const herb_fragments = new THREE.InstancedMesh(
    herb_fragmentGeom,
    herb_fragmentMat,
    18
  );
  const fragment_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const column = i % 6;
    const row = Math.floor(i / 6);
    fragment_dummy.position.set(
      -0.82 + column * 0.29 + Math.sin(i * 1.7) * 0.055,
      -0.91 + row * 0.25 + Math.cos(i * 1.3) * 0.045,
      0.064
    );
    fragment_dummy.rotation.set(0, 0, i * 0.73);
    fragment_dummy.scale.set(
      0.55 + (i % 4) * 0.18,
      0.28 + (i % 3) * 0.12,
      1
    );
    fragment_dummy.updateMatrix();
    herb_fragments.setMatrixAt(i, fragment_dummy.matrix);
  }
  herb_fragments.instanceMatrix.needsUpdate = true;
  package_group.add(herb_fragments);

  const pale_fragmentGeom = new THREE.CircleGeometry(0.035, 10);
  const pale_fragments = new THREE.InstancedMesh(
    pale_fragmentGeom,
    pale_fragmentMat,
    8
  );
  for (let i = 0; i < 8; i++) {
    fragment_dummy.position.set(
      -0.62 + (i % 4) * 0.34,
      -0.78 + Math.floor(i / 4) * 0.30 + Math.sin(i * 2.1) * 0.04,
      0.067
    );
    fragment_dummy.rotation.set(0, 0, i * 0.91);
    fragment_dummy.scale.set(
      0.75 + (i % 3) * 0.22,
      0.35 + (i % 2) * 0.16,
      1
    );
    fragment_dummy.updateMatrix();
    pale_fragments.setMatrixAt(i, fragment_dummy.matrix);
  }
  pale_fragments.instanceMatrix.needsUpdate = true;
  package_group.add(pale_fragments);

  const pouch_frontShape = new THREE.Shape();
  pouch_frontShape.moveTo(-1.34, -1.16);
  pouch_frontShape.lineTo(1.27, -1.27);
  pouch_frontShape.lineTo(1.22, 0.98);
  pouch_frontShape.lineTo(0.98, 1.10);
  pouch_frontShape.lineTo(0.72, 1.02);
  pouch_frontShape.lineTo(0.48, 1.16);
  pouch_frontShape.lineTo(0.20, 1.08);
  pouch_frontShape.lineTo(-0.08, 1.20);
  pouch_frontShape.lineTo(-0.38, 1.12);
  pouch_frontShape.lineTo(-0.68, 1.22);
  pouch_frontShape.lineTo(-0.96, 1.13);
  pouch_frontShape.lineTo(-1.25, 1.18);
  pouch_frontShape.closePath();

  const pouch_frontGeom = new THREE.ShapeGeometry(pouch_frontShape);
  const pouch_front = new THREE.Mesh(pouch_frontGeom, pouch_frontMat);
  pouch_front.position.z = 0.10;
  pouch_front.renderOrder = 10;
  package_group.add(pouch_front);

  const right_sealShape = new THREE.Shape();
  right_sealShape.moveTo(0.98, -1.16);
  right_sealShape.lineTo(1.27, -1.27);
  right_sealShape.lineTo(1.22, 0.98);
  right_sealShape.lineTo(1.04, 1.06);
  right_sealShape.lineTo(1.08, 0.70);
  right_sealShape.lineTo(1.04, 0.35);
  right_sealShape.lineTo(1.09, -0.02);
  right_sealShape.lineTo(1.04, -0.38);
  right_sealShape.lineTo(1.08, -0.72);
  right_sealShape.closePath();

  const right_sealGeom = new THREE.ShapeGeometry(right_sealShape);
  const right_seal = new THREE.Mesh(right_sealGeom, pouch_edgeMat);
  right_seal.position.z = 0.112;
  right_seal.renderOrder = 11;
  package_group.add(right_seal);

  const bottom_sealShape = new THREE.Shape();
  bottom_sealShape.moveTo(-1.34, -1.16);
  bottom_sealShape.lineTo(1.27, -1.27);
  bottom_sealShape.lineTo(1.17, -1.06);
  bottom_sealShape.lineTo(0.78, -1.00);
  bottom_sealShape.lineTo(0.38, -1.08);
  bottom_sealShape.lineTo(-0.08, -1.02);
  bottom_sealShape.lineTo(-0.52, -1.09);
  bottom_sealShape.lineTo(-0.94, -1.01);
  bottom_sealShape.lineTo(-1.25, -1.05);
  bottom_sealShape.closePath();

  const bottom_sealGeom = new THREE.ShapeGeometry(bottom_sealShape);
  const bottom_seal = new THREE.Mesh(bottom_sealGeom, pouch_edgeMat);
  bottom_seal.position.z = 0.114;
  bottom_seal.renderOrder = 11;
  package_group.add(bottom_seal);

  const left_seamShape = new THREE.Shape();
  left_seamShape.moveTo(-1.34, -1.16);
  left_seamShape.lineTo(-1.25, 1.18);
  left_seamShape.lineTo(-1.12, 1.12);
  left_seamShape.lineTo(-1.18, 0.72);
  left_seamShape.lineTo(-1.13, 0.32);
  left_seamShape.lineTo(-1.19, -0.10);
  left_seamShape.lineTo(-1.13, -0.52);
  left_seamShape.lineTo(-1.20, -0.88);
  left_seamShape.closePath();

  const left_seamGeom = new THREE.ShapeGeometry(left_seamShape);
  const left_seam = new THREE.Mesh(left_seamGeom, pouch_edgeMat);
  left_seam.position.z = 0.113;
  left_seam.renderOrder = 11;
  package_group.add(left_seam);

  const top_seamShape = new THREE.Shape();
  top_seamShape.moveTo(-1.25, 1.18);
  top_seamShape.lineTo(-0.96, 1.13);
  top_seamShape.lineTo(-0.68, 1.22);
  top_seamShape.lineTo(-0.38, 1.12);
  top_seamShape.lineTo(-0.08, 1.20);
  top_seamShape.lineTo(0.20, 1.08);
  top_seamShape.lineTo(0.48, 1.16);
  top_seamShape.lineTo(0.72, 1.02);
  top_seamShape.lineTo(0.98, 1.10);
  top_seamShape.lineTo(1.22, 0.98);
  top_seamShape.lineTo(1.16, 0.82);
  top_seamShape.lineTo(0.94, 0.94);
  top_seamShape.lineTo(0.68, 0.88);
  top_seamShape.lineTo(0.43, 1.01);
  top_seamShape.lineTo(0.16, 0.93);
  top_seamShape.lineTo(-0.12, 1.05);
  top_seamShape.lineTo(-0.42, 0.98);
  top_seamShape.lineTo(-0.70, 1.07);
  top_seamShape.lineTo(-0.98, 0.99);
  top_seamShape.lineTo(-1.18, 1.05);
  top_seamShape.closePath();

  const top_seamGeom = new THREE.ShapeGeometry(top_seamShape);
  const top_seam = new THREE.Mesh(top_seamGeom, pouch_edgeMat);
  top_seam.position.z = 0.115;
  top_seam.renderOrder = 11;
  package_group.add(top_seam);

  const upper_foldShape = new THREE.Shape();
  upper_foldShape.moveTo(-1.16, 0.72);
  upper_foldShape.lineTo(1.08, 0.92);
  upper_foldShape.lineTo(1.13, 0.80);
  upper_foldShape.lineTo(-1.12, 0.59);
  upper_foldShape.closePath();

  const upper_foldGeom = new THREE.ShapeGeometry(upper_foldShape);
  const upper_fold = new THREE.Mesh(upper_foldGeom, pouch_highlightMat);
  upper_fold.position.z = 0.121;
  upper_fold.renderOrder = 12;
  package_group.add(upper_fold);

  const lower_foldShape = new THREE.Shape();
  lower_foldShape.moveTo(-1.20, -0.72);
  lower_foldShape.lineTo(1.12, -1.02);
  lower_foldShape.lineTo(1.18, -0.90);
  lower_foldShape.lineTo(-1.15, -0.58);
  lower_foldShape.closePath();

  const lower_foldGeom = new THREE.ShapeGeometry(lower_foldShape);
  const lower_fold = new THREE.Mesh(lower_foldGeom, pouch_highlightMat);
  lower_fold.position.z = 0.122;
  lower_fold.renderOrder = 12;
  package_group.add(lower_fold);

  const wrinkle_positions = [];
  for (let i = 0; i < 15; i++) {
    const x = -1.12 + i * 0.15;
    const y0 = -0.96 + (i % 4) * 0.16;
    const y1 = y0 + 0.24 + (i % 3) * 0.08;
    wrinkle_positions.push(
      x, y0, 0.126,
      x + 0.055 * Math.sin(i * 1.4), y1, 0.126
    );
  }
  for (let i = 0; i < 8; i++) {
    const x = -0.95 + i * 0.25;
    const y = 0.78 + (i % 3) * 0.08;
    wrinkle_positions.push(
      x, y, 0.127,
      x + 0.18, y - 0.10, 0.127
    );
  }

  const wrinkle_linesGeom = new THREE.BufferGeometry();
  wrinkle_linesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(wrinkle_positions, 3)
  );
  const wrinkle_lines = new THREE.LineSegments(wrinkle_linesGeom, wrinkleMat);
  wrinkle_lines.renderOrder = 13;
  package_group.add(wrinkle_lines);

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