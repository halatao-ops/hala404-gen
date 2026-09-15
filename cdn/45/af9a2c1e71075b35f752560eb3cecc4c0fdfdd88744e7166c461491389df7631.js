export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blue_floral_vase";

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1678c9,
    metalness: 0.0,
    roughness: 0.26,
    side: THREE.DoubleSide,
  });
  const inner_bowlMat = new THREE.MeshStandardMaterial({
    color: 0x0862ad,
    metalness: 0.0,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x249bd2,
    metalness: 0.0,
    roughness: 0.24,
  });
  const foot_bandMat = new THREE.MeshStandardMaterial({
    color: 0x0753a4,
    metalness: 0.0,
    roughness: 0.25,
  });
  const base_trimMat = new THREE.MeshStandardMaterial({
    color: 0x8fc9dc,
    metalness: 0.0,
    roughness: 0.3,
  });
  const floral_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x064c99,
    metalness: 0.0,
    roughness: 0.32,
    side: THREE.DoubleSide,
  });
  const floral_fillMat = new THREE.MeshStandardMaterial({
    color: 0x83c6e6,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const floral_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xb9e0ee,
    metalness: 0.0,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x72b7d9,
    metalness: 0.0,
    roughness: 0.32,
  });

  const vase_bodyProfile = [
    { r: 0.56, y: -1.18 },
    { r: 0.68, y: -1.08 },
    { r: 0.82, y: -0.9 },
    { r: 0.92, y: -0.62 },
    { r: 0.95, y: -0.3 },
    { r: 0.92, y: 0.02 },
    { r: 0.84, y: 0.28 },
    { r: 0.72, y: 0.5 },
    { r: 0.59, y: 0.68 },
    { r: 0.52, y: 0.88 },
    { r: 0.52, y: 1.08 },
    { r: 0.59, y: 1.3 },
    { r: 0.72, y: 1.49 },
    { r: 0.86, y: 1.64 },
    { r: 0.92, y: 1.69 },
  ];

  function radiusAt(y) {
    if (y <= vase_bodyProfile[0].y) return vase_bodyProfile[0].r;
    for (let i = 0; i < vase_bodyProfile.length - 1; i++) {
      const a = vase_bodyProfile[i];
      const b = vase_bodyProfile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return vase_bodyProfile[vase_bodyProfile.length - 1].r;
  }

  function makeLoftGeometry(profile, segments, closeBottom) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < profile.length; i++) {
      for (let j = 0; j < segments; j++) {
        const angle = j / segments * Math.PI * 2;
        positions.push(
          Math.cos(angle) * profile[i].r,
          profile[i].y,
          Math.sin(angle) * profile[i].r
        );
      }
    }

    for (let i = 0; i < profile.length - 1; i++) {
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        const a = i * segments + j;
        const b = i * segments + next;
        const c = (i + 1) * segments + next;
        const d = (i + 1) * segments + j;
        indices.push(a, d, b, b, d, c);
      }
    }

    if (closeBottom) {
      const centerIndex = positions.length / 3;
      positions.push(0, profile[0].y, 0);
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        indices.push(centerIndex, j, next);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const vase_bodyGeom = makeLoftGeometry(vase_bodyProfile, 64, true);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const inner_bowlProfile = [
    { r: 0.0, y: 0.91 },
    { r: 0.22, y: 0.95 },
    { r: 0.42, y: 1.08 },
    { r: 0.58, y: 1.29 },
    { r: 0.72, y: 1.5 },
    { r: 0.82, y: 1.66 },
  ];
  const inner_bowlGeom = makeLoftGeometry(inner_bowlProfile, 64, false);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, inner_bowlMat);
  inner_bowl.name = "inner_bowl";
  root.add(inner_bowl);

  const rimGeom = new THREE.TorusGeometry(0.875, 0.065, 16, 64);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.69;
  root.add(rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.805, 0.018, 10, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, foot_bandMat);
  inner_rim.name = "inner_rim";
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 1.675;
  root.add(inner_rim);

  const foot_bandProfile = [
    { r: 0.62, y: -1.39 },
    { r: 0.72, y: -1.35 },
    { r: 0.77, y: -1.27 },
    { r: 0.73, y: -1.17 },
    { r: 0.64, y: -1.1 },
  ];
  const foot_bandGeom = makeLoftGeometry(foot_bandProfile, 64, true);
  const foot_band = new THREE.Mesh(foot_bandGeom, foot_bandMat);
  foot_band.name = "foot_band";
  root.add(foot_band);

  const base_trimGeom = new THREE.TorusGeometry(0.69, 0.025, 10, 64);
  const base_trim = new THREE.Mesh(base_trimGeom, base_trimMat);
  base_trim.name = "base_trim";
  base_trim.rotation.x = Math.PI / 2;
  base_trim.position.y = -1.375;
  root.add(base_trim);

  const foot_collarGeom = new THREE.TorusGeometry(0.64, 0.035, 12, 64);
  const foot_collar = new THREE.Mesh(foot_collarGeom, foot_bandMat);
  foot_collar.name = "foot_collar";
  foot_collar.rotation.x = Math.PI / 2;
  foot_collar.position.y = -1.105;
  root.add(foot_collar);

  const floral_decoration = new THREE.Group();
  floral_decoration.name = "floral_decoration";
  root.add(floral_decoration);

  const decal_normal_axis = new THREE.Vector3(0, 0, 1);

  function surfacePose(angle, y, extra) {
    const radius = radiusAt(y) + extra;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();
    const position = new THREE.Vector3(
      normal.x * radius,
      y,
      normal.z * radius
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      decal_normal_axis,
      normal
    );
    return { position, quaternion };
  }

  function makeSurfaceMatrix(angle, y, sx, sy, rotation, extra) {
    const pose = surfacePose(angle, y, extra);
    const localRotation = new THREE.Quaternion().setFromAxisAngle(
      decal_normal_axis,
      rotation
    );
    const quaternion = pose.quaternion.clone().multiply(localRotation);
    return new THREE.Matrix4().compose(
      pose.position,
      quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
  }

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, -0.5);
  petalShape.bezierCurveTo(-0.42, -0.34, -0.52, 0.18, 0, 0.5);
  petalShape.bezierCurveTo(0.52, 0.18, 0.42, -0.34, 0, -0.5);
  const petalGeom = new THREE.ShapeGeometry(petalShape, 12);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.5);
  leafShape.bezierCurveTo(-0.38, -0.2, -0.34, 0.24, 0, 0.5);
  leafShape.bezierCurveTo(0.34, 0.24, 0.38, -0.2, 0, -0.5);
  const leafGeom = new THREE.ShapeGeometry(leafShape, 10);

  const flower_centerGeom = new THREE.CircleGeometry(1, 24);

  const flower_specs = [
    { angle: 1.56, y: 0.82, size: 0.22, petals: 7 },
    { angle: 2.28, y: 0.02, size: 0.2, petals: 8 },
    { angle: 1.62, y: -0.1, size: 0.27, petals: 8 },
    { angle: 0.86, y: 0.08, size: 0.19, petals: 8 },
    { angle: 2.34, y: -0.56, size: 0.18, petals: 8 },
    { angle: 1.55, y: -0.84, size: 0.18, petals: 8 },
    { angle: 0.82, y: -0.55, size: 0.18, petals: 8 },
    { angle: 0.58, y: -0.9, size: 0.12, petals: 7 },
    { angle: 2.62, y: 0.42, size: 0.13, petals: 7 },
  ];

  const petal_matrices = [];
  const center_matrices = [];

  for (const flower of flower_specs) {
    const centerMatrix = makeSurfaceMatrix(
      flower.angle,
      flower.y,
      flower.size * 0.18,
      flower.size * 0.18,
      0,
      0.012
    );
    center_matrices.push(centerMatrix);

    for (let i = 0; i < flower.petals; i++) {
      const angle = i / flower.petals * Math.PI * 2;
      const dx = Math.cos(angle) * flower.size * 0.43;
      const dy = Math.sin(angle) * flower.size * 0.43;
      const petalY = flower.y + dy;
      const petalAngle =
        flower.angle - dx / Math.max(radiusAt(petalY), 0.1);

      petal_matrices.push(
        makeSurfaceMatrix(
          petalAngle,
          petalY,
          flower.size * 0.58,
          flower.size * 0.94,
          angle - Math.PI / 2,
          0.008
        )
      );
    }
  }

  const floral_outlines = new THREE.InstancedMesh(
    petalGeom,
    floral_outlineMat,
    petal_matrices.length
  );
  floral_outlines.name = "floral_outlines";
  for (let i = 0; i < petal_matrices.length; i++) {
    const matrix = petal_matrices[i].clone();
    matrix.multiply(new THREE.Matrix4().makeScale(1.14, 1.08, 1));
    floral_outlines.setMatrixAt(i, matrix);
  }
  floral_outlines.instanceMatrix.needsUpdate = true;
  floral_decoration.add(floral_outlines);

  const floral_petals = new THREE.InstancedMesh(
    petalGeom,
    floral_fillMat,
    petal_matrices.length
  );
  floral_petals.name = "floral_petals";
  for (let i = 0; i < petal_matrices.length; i++) {
    floral_petals.setMatrixAt(i, petal_matrices[i]);
  }
  floral_petals.instanceMatrix.needsUpdate = true;
  floral_decoration.add(floral_petals);

  const floral_center_outlines = new THREE.InstancedMesh(
    flower_centerGeom,
    floral_outlineMat,
    center_matrices.length
  );
  floral_center_outlines.name = "floral_center_outlines";
  for (let i = 0; i < center_matrices.length; i++) {
    const matrix = center_matrices[i].clone();
    matrix.multiply(new THREE.Matrix4().makeScale(1.22, 1.22, 1));
    floral_center_outlines.setMatrixAt(i, matrix);
  }
  floral_center_outlines.instanceMatrix.needsUpdate = true;
  floral_decoration.add(floral_center_outlines);

  const floral_centers = new THREE.InstancedMesh(
    flower_centerGeom,
    floral_highlightMat,
    center_matrices.length
  );
  floral_centers.name = "floral_centers";
  for (let i = 0; i < center_matrices.length; i++) {
    floral_centers.setMatrixAt(i, center_matrices[i]);
  }
  floral_centers.instanceMatrix.needsUpdate = true;
  floral_decoration.add(floral_centers);

  const leaf_specs = [
    { angle: 1.39, y: -0.34, size: 0.25, rotation: -0.92 },
    { angle: 1.08, y: -0.18, size: 0.22, rotation: 0.82 },
    { angle: 1.22, y: -0.62, size: 0.22, rotation: -1.0 },
    { angle: 1.78, y: -0.48, size: 0.22, rotation: 0.92 },
    { angle: 1.92, y: -0.7, size: 0.2, rotation: -0.82 },
    { angle: 2.12, y: -0.28, size: 0.2, rotation: 0.78 },
    { angle: 2.42, y: -0.76, size: 0.18, rotation: -0.9 },
    { angle: 0.7, y: -0.34, size: 0.2, rotation: 0.88 },
    { angle: 0.62, y: -0.72, size: 0.18, rotation: -0.82 },
    { angle: 1.34, y: 0.55, size: 0.22, rotation: -0.88 },
    { angle: 1.82, y: 0.58, size: 0.22, rotation: 0.88 },
    { angle: 2.5, y: 0.2, size: 0.17, rotation: -0.78 },
    { angle: 0.52, y: 0.3, size: 0.17, rotation: 0.82 },
    { angle: 2.66, y: -0.38, size: 0.16, rotation: 0.74 },
    { angle: 0.42, y: -0.18, size: 0.16, rotation: -0.74 },
    { angle: 1.55, y: 1.08, size: 0.16, rotation: -0.82 },
    { angle: 1.61, y: 1.08, size: 0.16, rotation: 0.82 },
  ];

  const leaf_matrices = [];
  for (const leaf of leaf_specs) {
    leaf_matrices.push(
      makeSurfaceMatrix(
        leaf.angle,
        leaf.y,
        leaf.size * 0.52,
        leaf.size,
        leaf.rotation,
        0.008
      )
    );
  }

  const leaf_outlines = new THREE.InstancedMesh(
    leafGeom,
    floral_outlineMat,
    leaf_matrices.length
  );
  leaf_outlines.name = "leaf_outlines";
  for (let i = 0; i < leaf_matrices.length; i++) {
    const matrix = leaf_matrices[i].clone();
    matrix.multiply(new THREE.Matrix4().makeScale(1.14, 1.08, 1));
    leaf_outlines.setMatrixAt(i, matrix);
  }
  leaf_outlines.instanceMatrix.needsUpdate = true;
  floral_decoration.add(leaf_outlines);

  const leaf_fills = new THREE.InstancedMesh(
    leafGeom,
    floral_fillMat,
    leaf_matrices.length
  );
  leaf_fills.name = "leaf_fills";
  for (let i = 0; i < leaf_matrices.length; i++) {
    leaf_fills.setMatrixAt(i, leaf_matrices[i]);
  }
  leaf_fills.instanceMatrix.needsUpdate = true;
  floral_decoration.add(leaf_fills);

  function addSurfaceCurve(name, controls, material, extra, thickness) {
    const curve2d = new THREE.SplineCurve(controls);
    const samples = curve2d.getPoints(28);
    const positions = [];

    for (const sample of samples) {
      const angle = sample.x;
      const y = sample.y;
      const radius = radiusAt(y) + extra;
      positions.push(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    const mesh = new THREE.Line(geometry, material);
    mesh.name = name;
    if (thickness > 0) mesh.scale.setScalar(thickness);
    floral_decoration.add(mesh);
    return mesh;
  }

  const stem_material = new THREE.LineBasicMaterial({ color: 0x72b7d9 });
  const vein_material = new THREE.LineBasicMaterial({ color: 0x3f95c5 });

  const main_stem = addSurfaceCurve(
    "main_stem",
    [
      [1.5, -1.04],
      [1.46, -0.78],
      [1.5, -0.48],
      [1.56, -0.18],
      [1.58, 0.05],
    ],
    stem_material,
    0.011,
    1
  );

  const left_branch_stem = addSurfaceCurve(
    "left_branch_stem",
    [
      [1.5, -0.72],
      [1.7, -0.55],
      [1.92, -0.34],
      [2.12, -0.12],
      [2.28, 0.02],
    ],
    stem_material,
    0.011,
    1
  );

  const right_branch_stem = addSurfaceCurve(
    "right_branch_stem",
    [
      [1.48, -0.82],
      [1.3, -0.58],
      [1.1, -0.32],
      [0.96, -0.08],
      [0.86, 0.08],
    ],
    stem_material,
    0.011,
    1
  );

  const lower_left_stem = addSurfaceCurve(
    "lower_left_stem",
    [
      [1.5, -1.02],
      [1.76, -0.88],
      [2.02, -0.72],
      [2.28, -0.58],
      [2.34, -0.56],
    ],
    stem_material,
    0.011,
    1
  );

  const lower_right_stem = addSurfaceCurve(
    "lower_right_stem",
    [
      [1.5, -1.02],
      [1.3, -0.88],
      [1.08, -0.72],
      [0.88, -0.58],
      [0.82, -0.55],
    ],
    stem_material,
    0.011,
    1
  );

  const neck_stem = addSurfaceCurve(
    "neck_stem",
    [
      [1.56, 0.02],
      [1.56, 0.25],
      [1.56, 0.5],
      [1.56, 0.72],
      [1.56, 0.82],
    ],
    stem_material,
    0.011,
    1
  );

  const main_stem_vein = addSurfaceCurve(
    "main_stem_vein",
    [
      [1.5, -1.04],
      [1.46, -0.78],
      [1.5, -0.48],
      [1.56, -0.18],
      [1.58, 0.05],
    ],
    vein_material,
    0.014,
    0.55
  );

  const left_branch_vein = addSurfaceCurve(
    "left_branch_vein",
    [
      [1.5, -0.72],
      [1.7, -0.55],
      [1.92, -0.34],
      [2.12, -0.12],
      [2.28, 0.02],
    ],
    vein_material,
    0.014,
    0.5
  );

  const right_branch_vein = addSurfaceCurve(
    "right_branch_vein",
    [
      [1.48, -0.82],
      [1.3, -0.58],
      [1.1, -0.32],
      [0.96, -0.08],
      [0.86, 0.08],
    ],
    vein_material,
    0.014,
    0.5
  );

  const lower_left_vein = addSurfaceCurve(
    "lower_left_vein",
    [
      [1.5, -1.02],
      [1.76, -0.88],
      [2.02, -0.72],
      [2.28, -0.58],
      [2.34, -0.56],
    ],
    vein_material,
    0.014,
    0.48
  );

  const lower_right_vein = addSurfaceCurve(
    "lower_right_vein",
    [
      [1.5, -1.02],
      [1.3, -0.88],
      [1.08, -0.72],
      [0.88, -0.58],
      [0.82, -0.55],
    ],
    vein_material,
    0.014,
    0.48
  );

  const neck_stem_vein = addSurfaceCurve(
    "neck_stem_vein",
    [
      [1.56, 0.02],
      [1.56, 0.25],
      [1.56, 0.5],
      [1.56, 0.72],
      [1.56, 0.82],
    ],
    vein_material,
    0.014,
    0.48
  );

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