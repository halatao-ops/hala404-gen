export default function generate(THREE) {
  const root = new THREE.Group();
  const bowl = new THREE.Group();
  root.add(bowl);

  const bowl_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa51f1d,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const foot_ringMat = new THREE.MeshStandardMaterial({
    color: 0xb98558,
    metalness: 0.0,
    roughness: 0.7,
  });
  const crack_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x321713,
    metalness: 0.0,
    roughness: 0.8,
  });
  const crack_coreMat = new THREE.MeshStandardMaterial({
    color: 0xb79a72,
    metalness: 0.0,
    roughness: 0.7,
  });
  const glaze_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xd28b7d,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });

  const bowl_profile = [
    { r: 0.00, y: 0.22, inner: false },
    { r: 0.65, y: 0.22, inner: false },
    { r: 0.95, y: 0.27, inner: false },
    { r: 1.18, y: 0.38, inner: false },
    { r: 1.38, y: 0.58, inner: false },
    { r: 1.54, y: 0.84, inner: false },
    { r: 1.66, y: 1.14, inner: false },
    { r: 1.75, y: 1.48, inner: false },
    { r: 1.81, y: 1.82, inner: false },
    { r: 1.84, y: 2.08, inner: false },
    { r: 1.83, y: 2.22, inner: false },
    { r: 1.78, y: 2.32, inner: false },
    { r: 1.70, y: 2.38, inner: false },
    { r: 1.62, y: 2.36, inner: true },
    { r: 1.57, y: 2.29, inner: true },
    { r: 1.57, y: 2.17, inner: true },
    { r: 1.54, y: 1.98, inner: true },
    { r: 1.48, y: 1.70, inner: true },
    { r: 1.38, y: 1.40, inner: true },
    { r: 1.24, y: 1.12, inner: true },
    { r: 1.06, y: 0.90, inner: true },
    { r: 0.82, y: 0.73, inner: true },
    { r: 0.50, y: 0.64, inner: true },
    { r: 0.00, y: 0.61, inner: true },
  ];

  const bowl_bodyPositions = [];
  const bowl_bodyIndices = [];
  for (const point of bowl_profile) {
    bowl_bodyPositions.push(point.r, point.y, 0);
  }

  for (let i = 0; i < bowl_profile.length - 1; i++) {
    const a = bowl_profile[i];
    const b = bowl_profile[i + 1];
    const segments = Math.max(8, Math.ceil(Math.PI * 2 * (a.r + b.r) / 0.045));
    const ringStart = bowl_bodyPositions.length / 3;

    for (let j = 0; j <= segments; j++) {
      const angle = j / segments * Math.PI * 2;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      bowl_bodyPositions.push(a.r * c, a.y, a.r * s);
      bowl_bodyPositions.push(b.r * c, b.y, b.r * s);
    }

    for (let j = 0; j < segments; j++) {
      const a0 = ringStart + j * 2;
      const b0 = a0 + 1;
      const a1 = a0 + 2;
      const b1 = a0 + 3;
      bowl_bodyIndices.push(a0, b0, a1, b0, b1, a1);
    }

    if (a.inner !== b.inner) {
      const bridgeStart = bowl_bodyPositions.length / 3;
      for (let j = 0; j <= segments; j++) {
        const angle = j / segments * Math.PI * 2;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        bowl_bodyPositions.push(a.r * c, a.y, a.r * s);
        bowl_bodyPositions.push(b.r * c, b.y, b.r * s);
      }
      for (let j = 0; j < segments; j++) {
        const a0 = bridgeStart + j * 2;
        const b0 = a0 + 1;
        const a1 = a0 + 2;
        const b1 = a0 + 3;
        bowl_bodyIndices.push(a0, a1, b0, b0, a1, b1);
      }
    }
  }

  const bowl_bodyGeo = new THREE.BufferGeometry();
  bowl_bodyGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bowl_bodyPositions, 3)
  );
  bowl_bodyGeo.setIndex(bowl_bodyIndices);
  bowl_bodyGeo.computeVertexNormals();

  const bowl_body = new THREE.Mesh(bowl_bodyGeo, bowl_bodyMat);
  bowl.add(bowl_body);

  const foot_ring_profile = [
    new THREE.Vector2(0.00, 0.08),
    new THREE.Vector2(0.82, 0.08),
    new THREE.Vector2(1.00, 0.10),
    new THREE.Vector2(1.10, 0.15),
    new THREE.Vector2(1.13, 0.22),
    new THREE.Vector2(1.10, 0.29),
    new THREE.Vector2(0.98, 0.34),
    new THREE.Vector2(0.00, 0.34),
  ];
  const foot_ringGeo = new THREE.LatheGeometry(foot_ring_profile, 64);
  const foot_ring = new THREE.Mesh(foot_ringGeo, foot_ringMat);
  bowl.add(foot_ring);

  const foot_edgeMat = foot_ringMat;
  const foot_edgeGeo = new THREE.TorusGeometry(1.00, 0.045, 10, 64);
  const foot_edge = new THREE.Mesh(foot_edgeGeo, foot_edgeMat);
  foot_edge.rotation.x = Math.PI / 2;
  foot_edge.position.y = 0.105;
  bowl.add(foot_edge);

  function outerRadiusAt(y) {
    if (y <= bowl_profile[0].y) return bowl_profile[0].r;
    for (let i = 0; i < bowl_profile.length - 1; i++) {
      const a = bowl_profile[i];
      const b = bowl_profile[i + 1];
      if (!a.inner && !b.inner && y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return bowl_profile[bowl_profile.length - 1].r;
  }

  function surfacePoint(angle, y, offset) {
    const radius = outerRadiusAt(y) + offset;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function makeCrackGeometry(path, width, offset) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < path.length; i++) {
      const previous = path[Math.max(0, i - 1)];
      const next = path[Math.min(path.length - 1, i + 1)];
      const tangentX = next[0] - previous[0];
      const tangentY = next[1] - previous[1];
      const length = Math.sqrt(tangentX * tangentX + tangentY * tangentY) || 1;
      const normalX = -tangentY / length;
      const normalY = tangentX / length;
      const halfWidth = width * (0.82 + (i % 4) * 0.08);

      const left = surfacePoint(
        path[i][0] + normalX * halfWidth,
        path[i][1] + normalY * halfWidth,
        offset
      );
      const right = surfacePoint(
        path[i][0] - normalX * halfWidth,
        path[i][1] - normalY * halfWidth,
        offset
      );
      positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    }

    for (let i = 0; i < path.length - 1; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
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

  const main_crack_path = [
    [1.57, 2.37],
    [1.54, 2.29],
    [1.59, 2.20],
    [1.55, 2.10],
    [1.61, 2.00],
    [1.58, 1.90],
    [1.64, 1.80],
    [1.60, 1.69],
    [1.66, 1.58],
    [1.63, 1.47],
    [1.69, 1.36],
    [1.66, 1.24],
    [1.72, 1.13],
    [1.69, 1.01],
    [1.75, 0.89],
    [1.72, 0.77],
    [1.78, 0.65],
    [1.75, 0.53],
    [1.81, 0.41],
    [1.78, 0.30],
    [1.84, 0.19],
    [1.81, 0.10],
  ];

  const left_branch_path = [
    [1.70, 1.13],
    [1.77, 1.04],
    [1.84, 0.95],
    [1.91, 0.86],
    [1.98, 0.76],
    [2.05, 0.66],
    [2.12, 0.56],
    [2.18, 0.47],
    [2.25, 0.38],
    [2.31, 0.29],
    [2.38, 0.21],
    [2.43, 0.14],
  ];

  const right_branch_path = [
    [1.70, 1.13],
    [1.63, 1.04],
    [1.56, 0.95],
    [1.49, 0.86],
    [1.42, 0.76],
    [1.35, 0.66],
    [1.28, 0.56],
    [1.21, 0.47],
    [1.14, 0.38],
    [1.08, 0.29],
    [1.02, 0.20],
    [0.98, 0.12],
  ];

  const main_crack_shadowGeo = makeCrackGeometry(
    main_crack_path,
    0.030,
    0.008
  );
  const main_crack_shadow = new THREE.Mesh(
    main_crack_shadowGeo,
    crack_shadowMat
  );
  bowl.add(main_crack_shadow);

  const main_crack_coreGeo = makeCrackGeometry(
    main_crack_path,
    0.014,
    0.014
  );
  const main_crack_core = new THREE.Mesh(
    main_crack_coreGeo,
    crack_coreMat
  );
  bowl.add(main_crack_core);

  const left_branch_shadowGeo = makeCrackGeometry(
    left_branch_path,
    0.024,
    0.008
  );
  const left_branch_shadow = new THREE.Mesh(
    left_branch_shadowGeo,
    crack_shadowMat
  );
  bowl.add(left_branch_shadow);

  const left_branch_coreGeo = makeCrackGeometry(
    left_branch_path,
    0.011,
    0.014
  );
  const left_branch_core = new THREE.Mesh(
    left_branch_coreGeo,
    crack_coreMat
  );
  bowl.add(left_branch_core);

  const right_branch_shadowGeo = makeCrackGeometry(
    right_branch_path,
    0.024,
    0.008
  );
  const right_branch_shadow = new THREE.Mesh(
    right_branch_shadowGeo,
    crack_shadowMat
  );
  bowl.add(right_branch_shadow);

  const right_branch_coreGeo = makeCrackGeometry(
    right_branch_path,
    0.011,
    0.014
  );
  const right_branch_core = new THREE.Mesh(
    right_branch_coreGeo,
    crack_coreMat
  );
  bowl.add(right_branch_core);

  const glaze_speckles_data = [
    [1.28, 1.72, 0.010],
    [1.42, 1.94, 0.007],
    [1.72, 2.03, 0.008],
    [1.91, 1.82, 0.006],
    [2.08, 1.55, 0.009],
    [1.18, 1.30, 0.007],
    [1.36, 1.08, 0.006],
    [1.94, 1.23, 0.008],
    [2.20, 1.02, 0.006],
    [0.98, 1.62, 0.007],
    [1.08, 2.08, 0.006],
    [2.34, 1.88, 0.008],
    [1.48, 0.76, 0.006],
    [1.92, 0.68, 0.007],
    [1.14, 0.48, 0.005],
    [2.18, 0.43, 0.006],
  ];
  const glaze_specklesGeo = new THREE.CircleGeometry(1, 10);
  const glaze_speckles = new THREE.InstancedMesh(
    glaze_specklesGeo,
    glaze_specklesMat,
    glaze_speckles_data.length
  );
  const speckle_dummy = new THREE.Object3D();
  const forward_normal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < glaze_speckles_data.length; i++) {
    const angle = glaze_speckles_data[i][0];
    const y = glaze_speckles_data[i][1];
    const size = glaze_speckles_data[i][2];
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();

    speckle_dummy.position.copy(surfacePoint(angle, y, 0.016));
    speckle_dummy.quaternion.setFromUnitVectors(forward_normal, normal);
    speckle_dummy.scale.set(size, size, 1);
    speckle_dummy.updateMatrix();
    glaze_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  glaze_speckles.instanceMatrix.needsUpdate = true;
  bowl.add(glaze_speckles);

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

  fitToUnitCube(THREE, root);
  return root;
}