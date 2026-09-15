export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "salad_bowl";

  const bowl_group = new THREE.Group();
  bowl_group.name = "bowl_group";
  root.add(bowl_group);

  const salad_group = new THREE.Group();
  salad_group.name = "salad_group";
  root.add(salad_group);

  const bowlMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1ec,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xf2f1ec,
    emissiveIntensity: 0.14,
    side: THREE.DoubleSide,
  });
  const kaleMat = new THREE.MeshStandardMaterial({
    color: 0x1f5b2d,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const kaleDarkMat = new THREE.MeshStandardMaterial({
    color: 0x123d20,
    metalness: 0.0,
    roughness: 0.32,
    side: THREE.DoubleSide,
  });
  const kaleLightMat = new THREE.MeshStandardMaterial({
    color: 0x34733a,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x559536,
    metalness: 0.0,
    roughness: 0.45,
  });
  const tomatoMat = new THREE.MeshStandardMaterial({
    color: 0xd92818,
    metalness: 0.0,
    roughness: 0.28,
  });
  const tomatoScarMat = new THREE.MeshStandardMaterial({
    color: 0x6f7428,
    metalness: 0.0,
    roughness: 0.65,
  });
  const sesameMat = new THREE.MeshStandardMaterial({
    color: 0xe8c98d,
    metalness: 0.0,
    roughness: 0.55,
  });

  const bowlProfile = [
    [0.00, 0.06],
    [0.28, 0.06],
    [0.55, 0.12],
    [0.82, 0.27],
    [1.06, 0.49],
    [1.25, 0.78],
    [1.38, 1.04],
    [1.43, 1.17],
    [1.42, 1.23],
    [1.37, 1.28],
    [1.30, 1.27],
    [1.24, 1.19],
    [1.14, 0.98],
    [0.98, 0.73],
    [0.76, 0.54],
    [0.48, 0.43],
    [0.00, 0.40],
  ];
  const bowlPositions = [];
  const bowlIndices = [];
  for (const profile of bowlProfile) {
    bowlPositions.push(profile[0], profile[1], 0);
  }
  for (let i = 1; i < bowlProfile.length - 1; i++) {
    bowlIndices.push(0, i, i + 1);
  }
  for (let i = 1; i < bowlProfile.length - 2; i++) {
    bowlIndices.push(i, i + 2, i + 1);
  }
  const bowlGeom = new THREE.BufferGeometry();
  bowlGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bowlPositions, 3)
  );
  bowlGeom.setIndex(bowlIndices);
  bowlGeom.computeVertexNormals();

  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  bowl.name = "bowl";
  bowl_group.add(bowl);

  const rimGeom = new THREE.TorusGeometry(1.365, 0.065, 12, 64);
  const rim = new THREE.Mesh(rimGeom, bowlMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.235;
  bowl_group.add(rim);

  const footGeom = new THREE.CylinderGeometry(0.34, 0.39, 0.075, 40);
  const foot = new THREE.Mesh(footGeom, bowlMat);
  foot.name = "foot";
  foot.position.y = 0.035;
  bowl_group.add(foot);

  function leafPoint(length, halfWidth, t, s, phase) {
    const envelope =
      0.05 + 0.95 * Math.pow(Math.sin(Math.PI * t), 0.38);
    const scallop =
      1 +
      0.16 * Math.sin(t * Math.PI * 12 + phase) +
      0.065 * Math.sin(t * Math.PI * 27 + phase * 1.7);
    const width = halfWidth * envelope * scallop;
    const centerBend =
      length * 0.055 * Math.sin(Math.PI * t) * Math.sin(phase * 1.3);
    const x = centerBend + s * width;
    const z = length * (t - 0.5);
    const longitudinal =
      0.035 * Math.sin(Math.PI * t) *
      Math.sin(t * Math.PI * 8 + phase + s * 2.2);
    const crossCurl = 0.038 * s * Math.sin(t * Math.PI * 10 + phase);
    const edgeRuffle =
      0.028 * Math.pow(Math.abs(s), 1.5) *
      Math.sin(t * Math.PI * 18 + phase + s);
    const y = longitudinal + crossCurl + edgeRuffle;
    return new THREE.Vector3(x, y, z);
  }

  function makeKaleLeafGeometry() {
    const length = 0.82;
    const halfWidth = 0.25;
    const rows = 18;
    const columns = 7;
    const phase = 0.45;
    const positions = [];
    const indices = [];

    for (let row = 0; row <= rows; row++) {
      const t = row / rows;
      for (let column = 0; column < columns; column++) {
        const s = -1 + (column / (columns - 1)) * 2;
        const p = leafPoint(length, halfWidth, t, s, phase);
        positions.push(p.x, p.y, p.z);
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns - 1; column++) {
        const a = row * columns + column;
        const b = a + 1;
        const c = a + columns;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
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

  function makeKaleMarginGeometry() {
    const length = 0.82;
    const halfWidth = 0.25;
    const rows = 18;
    const phase = 0.45;
    const positions = [];

    for (const side of [-1, 1]) {
      for (let row = 0; row < rows; row++) {
        const t0 = row / rows;
        const t1 = (row + 1) / rows;
        const p0 = leafPoint(length, halfWidth, t0, side, phase);
        const p1 = leafPoint(length, halfWidth, t1, side, phase);
        positions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  function makeKaleMidribGeometry() {
    const length = 0.82;
    const phase = 0.45;
    const positions = [];

    for (let row = 0; row < 18; row++) {
      const t0 = row / 18;
      const t1 = (row + 1) / 18;
      const left0 = leafPoint(length, 0.25, t0, -0.055, phase);
      const right0 = leafPoint(length, 0.25, t0, 0.055, phase);
      const left1 = leafPoint(length, 0.25, t1, -0.055, phase);
      const right1 = leafPoint(length, 0.25, t1, 0.055, phase);
      left0.y += 0.018;
      right0.y += 0.018;
      left1.y += 0.018;
      right1.y += 0.018;
      positions.push(
        left0.x, left0.y, left0.z,
        right0.x, right0.y, right0.z,
        left1.x, left1.y, left1.z,
        right0.x, right0.y, right0.z,
        right1.x, right1.y, right1.z,
        left1.x, left1.y, left1.z
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  const kale_leafGeom = makeKaleLeafGeometry();
  const kale_marginGeom = makeKaleMarginGeometry();
  const kale_midribGeom = makeKaleMidribGeometry();

  const leafCount = 24;
  const kale_leaves = new THREE.InstancedMesh(
    kale_leafGeom,
    kaleMat,
    leafCount
  );
  kale_leaves.name = "kale_leaves";

  const kale_leaves_dark = new THREE.InstancedMesh(
    kale_leafGeom,
    kaleDarkMat,
    leafCount
  );
  kale_leaves_dark.name = "kale_leaves_dark";

  const kale_leaves_light = new THREE.InstancedMesh(
    kale_leafGeom,
    kaleLightMat,
    leafCount
  );
  kale_leaves_light.name = "kale_leaves_light";

  const kale_leaf_margins = new THREE.InstancedMesh(
    kale_marginGeom,
    stemMat,
    leafCount * 3
  );
  kale_leaf_margins.name = "kale_leaf_margins";

  const kale_midribs = new THREE.InstancedMesh(
    kale_midribGeom,
    stemMat,
    leafCount * 3
  );
  kale_midribs.name = "kale_midribs";

  const leafDummy = new THREE.Object3D();
  const leafBuckets = [[], [], []];
  const leafRecords = [];

  for (let i = 0; i < leafCount * 3; i++) {
    const angle = i * 2.3999632297 + 0.18;
    const radial = 0.10 + 0.76 * (((i * 7) % 23) / 22);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const y =
      1.00 +
      0.28 * (1 - radial / 0.86) +
      0.055 * Math.sin(i * 1.73);
    const direction =
      angle +
      Math.PI * 0.5 +
      0.72 * Math.sin(i * 1.31);
    const tiltX = 0.20 * Math.sin(i * 0.91);
    const tiltZ = 0.24 * Math.cos(i * 1.17);
    const scale = 0.82 + 0.25 * (((i * 5) % 11) / 10);
    const bucket = i % 3;

    leafDummy.position.set(x, y, z);
    leafDummy.rotation.set(tiltX, direction, tiltZ);
    leafDummy.scale.setScalar(scale);
    leafDummy.updateMatrix();

    const bucketIndex = leafBuckets[bucket].length;
    leafBuckets[bucket].push(leafDummy.matrix.clone());
    leafRecords.push({
      matrix: leafDummy.matrix.clone(),
      angle,
      radial,
      y,
      scale,
    });
  }

  const leafMeshes = [kale_leaves, kale_leaves_dark, kale_leaves_light];
  for (let bucket = 0; bucket < 3; bucket++) {
    const matrices = leafBuckets[bucket];
    for (let i = 0; i < matrices.length; i++) {
      leafMeshes[bucket].setMatrixAt(i, matrices[i]);
    }
    leafMeshes[bucket].count = matrices.length;
    leafMeshes[bucket].instanceMatrix.needsUpdate = true;
  }

  kale_leaf_margins.instanceMatrix.needsUpdate = true;
  kale_midribs.instanceMatrix.needsUpdate = true;
  for (let i = 0; i < leafRecords.length; i++) {
    kale_leaf_margins.setMatrixAt(i, leafRecords[i].matrix);
    kale_midribs.setMatrixAt(i, leafRecords[i].matrix);
  }
  kale_leaf_margins.count = leafRecords.length;
  kale_midribs.count = leafRecords.length;
  kale_leaf_margins.instanceMatrix.needsUpdate = true;
  kale_midribs.instanceMatrix.needsUpdate = true;

  salad_group.add(
    kale_leaves,
    kale_leaves_dark,
    kale_leaves_light,
    kale_leaf_margins,
    kale_midribs
  );

  const stemGeom = new THREE.CylinderGeometry(0.024, 0.028, 1, 10);
  const stemCount = 30;
  const curled_stems = new THREE.InstancedMesh(
    stemGeom,
    stemMat,
    stemCount
  );
  curled_stems.name = "curled_stems";

  const stemDummy = new THREE.Object3D();
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < stemCount; i++) {
    const angle = i * 2.3999632297 + 0.42;
    const radial = 0.10 + 0.68 * (((i * 9) % 19) / 18);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const y =
      1.04 +
      0.25 * (1 - radial / 0.80) +
      0.045 * Math.cos(i * 1.4);
    const directionAngle =
      angle + 0.65 * Math.sin(i * 1.17);
    const direction = new THREE.Vector3(
      Math.cos(directionAngle),
      0.10 * Math.sin(i * 0.83),
      Math.sin(directionAngle)
    ).normalize();
    const length = 0.48 + 0.30 * (((i * 5) % 13) / 12);

    stemDummy.position.set(x, y, z);
    stemDummy.quaternion.setFromUnitVectors(up, direction);
    stemDummy.scale.set(1, length, 1);
    stemDummy.updateMatrix();
    curled_stems.setMatrixAt(i, stemDummy.matrix);
  }
  curled_stems.instanceMatrix.needsUpdate = true;
  salad_group.add(curled_stems);

  function makeCurvedStemGeometry(points, radius) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 32, radius, 10, false);
  }

  const front_curled_stemGeom = makeCurvedStemGeometry(
    [
      new THREE.Vector3(-0.72, 0.96, 0.62),
      new THREE.Vector3(-0.42, 1.08, 0.82),
      new THREE.Vector3(0.02, 1.20, 0.88),
      new THREE.Vector3(0.42, 1.27, 0.72),
      new THREE.Vector3(0.66, 1.18, 0.46),
    ],
    0.034
  );
  const front_curled_stem = new THREE.Mesh(
    front_curled_stemGeom,
    stemMat
  );
  front_curled_stem.name = "front_curled_stem";
  salad_group.add(front_curled_stem);

  const right_curled_stemGeom = makeCurvedStemGeometry(
    [
      new THREE.Vector3(0.10, 1.00, 0.78),
      new THREE.Vector3(0.48, 1.10, 0.72),
      new THREE.Vector3(0.82, 1.22, 0.48),
      new THREE.Vector3(0.96, 1.29, 0.10),
      new THREE.Vector3(0.82, 1.20, -0.28),
    ],
    0.033
  );
  const right_curled_stem = new THREE.Mesh(
    right_curled_stemGeom,
    stemMat
  );
  right_curled_stem.name = "right_curled_stem";
  salad_group.add(right_curled_stem);

  const left_curled_stemGeom = makeCurvedStemGeometry(
    [
      new THREE.Vector3(-0.92, 1.02, 0.18),
      new THREE.Vector3(-0.76, 1.16, 0.52),
      new THREE.Vector3(-0.42, 1.28, 0.66),
      new THREE.Vector3(-0.05, 1.31, 0.55),
      new THREE.Vector3(0.25, 1.23, 0.35),
    ],
    0.032
  );
  const left_curled_stem = new THREE.Mesh(
    left_curled_stemGeom,
    stemMat
  );
  left_curled_stem.name = "left_curled_stem";
  salad_group.add(left_curled_stem);

  const inner_curled_stemGeom = makeCurvedStemGeometry(
    [
      new THREE.Vector3(-0.48, 0.98, 0.10),
      new THREE.Vector3(-0.28, 1.16, 0.30),
      new THREE.Vector3(0.05, 1.31, 0.34),
      new THREE.Vector3(0.34, 1.32, 0.12),
      new THREE.Vector3(0.48, 1.18, -0.18),
    ],
    0.031
  );
  const inner_curled_stem = new THREE.Mesh(
    inner_curled_stemGeom,
    stemMat
  );
  inner_curled_stem.name = "inner_curled_stem";
  salad_group.add(inner_curled_stem);

  const rear_curled_stemGeom = makeCurvedStemGeometry(
    [
      new THREE.Vector3(-0.72, 1.00, -0.34),
      new THREE.Vector3(-0.46, 1.20, -0.62),
      new THREE.Vector3(-0.05, 1.31, -0.70),
      new THREE.Vector3(0.38, 1.27, -0.58),
      new THREE.Vector3(0.70, 1.12, -0.32),
    ],
    0.031
  );
  const rear_curled_stem = new THREE.Mesh(
    rear_curled_stemGeom,
    stemMat
  );
  rear_curled_stem.name = "rear_curled_stem";
  salad_group.add(rear_curled_stem);

  const center_arch_stemGeom = makeCurvedStemGeometry(
    [
      new THREE.Vector3(-0.82, 1.02, 0.02),
      new THREE.Vector3(-0.52, 1.25, 0.20),
      new THREE.Vector3(-0.12, 1.39, 0.18),
      new THREE.Vector3(0.28, 1.37, 0.02),
      new THREE.Vector3(0.62, 1.20, -0.18),
    ],
    0.032
  );
  const center_arch_stem = new THREE.Mesh(
    center_arch_stemGeom,
    stemMat
  );
  center_arch_stem.name = "center_arch_stem";
  salad_group.add(center_arch_stem);

  const lower_front_stemGeom = makeCurvedStemGeometry(
    [
      new THREE.Vector3(-0.58, 0.94, 0.72),
      new THREE.Vector3(-0.28, 1.04, 0.86),
      new THREE.Vector3(0.08, 1.10, 0.84),
      new THREE.Vector3(0.38, 1.15, 0.68),
      new THREE.Vector3(0.58, 1.12, 0.48),
    ],
    0.030
  );
  const lower_front_stem = new THREE.Mesh(
    lower_front_stemGeom,
    stemMat
  );
  lower_front_stem.name = "lower_front_stem";
  salad_group.add(lower_front_stem);

  const tomatoGeom = new THREE.SphereGeometry(0.245, 28, 18);
  const tomatoData = [
    [-0.62, 1.27, 0.34, 1.02],
    [0.62, 1.29, 0.30, 0.98],
    [0.02, 1.43, -0.34, 1.03],
    [0.68, 1.35, -0.24, 0.96],
    [-0.66, 1.18, -0.28, 0.94],
  ];

  const tomatoes = new THREE.InstancedMesh(
    tomatoGeom,
    tomatoMat,
    tomatoData.length
  );
  tomatoes.name = "tomatoes";

  const tomatoDummy = new THREE.Object3D();
  for (let i = 0; i < tomatoData.length; i++) {
    const data = tomatoData[i];
    tomatoDummy.position.set(data[0], data[1], data[2]);
    tomatoDummy.rotation.set(
      0.08 * Math.sin(i * 1.4),
      i * 0.73,
      0.06 * Math.cos(i * 1.1)
    );
    tomatoDummy.scale.set(data[3], data[3] * 0.96, data[3]);
    tomatoDummy.updateMatrix();
    tomatoes.setMatrixAt(i, tomatoDummy.matrix);
  }
  tomatoes.instanceMatrix.needsUpdate = true;
  salad_group.add(tomatoes);

  const tomato_scarGeom = new THREE.CylinderGeometry(
    0.034,
    0.045,
    0.014,
    9
  );
  const tomato_scars = new THREE.InstancedMesh(
    tomato_scarGeom,
    tomatoScarMat,
    tomatoData.length
  );
  tomato_scars.name = "tomato_scars";

  const scarDummy = new THREE.Object3D();
  for (let i = 0; i < tomatoData.length; i++) {
    const data = tomatoData[i];
    scarDummy.position.set(
      data[0],
      data[1] + 0.245 * data[3] * 0.96 + 0.004,
      data[2]
    );
    scarDummy.rotation.set(0, i * 0.8, 0);
    scarDummy.scale.setScalar(data[3]);
    scarDummy.updateMatrix();
    tomato_scars.setMatrixAt(i, scarDummy.matrix);
  }
  tomato_scars.instanceMatrix.needsUpdate = true;
  salad_group.add(tomato_scars);

  const sesame_seedGeom = new THREE.SphereGeometry(1, 12, 8);
  const sesameCount = 68;
  const sesame_seeds = new THREE.InstancedMesh(
    sesame_seedGeom,
    sesameMat,
    sesameCount
  );
  sesame_seeds.name = "sesame_seeds";

  const seedDummy = new THREE.Object3D();
  for (let i = 0; i < sesameCount; i++) {
    const angle = i * 2.3999632297;
    const radial = 0.035 + 0.57 * Math.sqrt((i + 0.5) / sesameCount);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const y =
      1.43 -
      0.16 * (radial / 0.60) * (radial / 0.60) +
      0.018 * Math.sin(i * 1.9);

    seedDummy.position.set(x, y, z);
    seedDummy.rotation.set(
      0.08 * Math.sin(i * 0.7),
      angle + i * 0.41,
      0.08 * Math.cos(i * 0.9)
    );
    seedDummy.scale.set(
      0.045 + 0.006 * Math.sin(i * 1.2),
      0.011,
      0.019
    );
    seedDummy.updateMatrix();
    sesame_seeds.setMatrixAt(i, seedDummy.matrix);
  }
  sesame_seeds.instanceMatrix.needsUpdate = true;
  salad_group.add(sesame_seeds);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}