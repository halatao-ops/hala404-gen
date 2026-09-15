export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_teacup";

  const cup_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe9ece8,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd8ddd8,
    metalness: 0.0,
    roughness: 0.2,
  });
  const floral_decorationMat = new THREE.MeshStandardMaterial({
    color: 0xb8bdb8,
    metalness: 0.0,
    roughness: 0.4,
  });

  const cup_bodyProfile = [
    { r: 0.70, y: -0.72, inner: true },
    { r: 0.82, y: -0.58, inner: true },
    { r: 1.04, y: -0.28, inner: true },
    { r: 1.25, y: 0.18, inner: true },
    { r: 1.43, y: 0.72, inner: true },
    { r: 1.50, y: 1.02, inner: true },
    { r: 1.58, y: 1.08, inner: false },
    { r: 1.53, y: 1.00, inner: false },
    { r: 1.47, y: 0.72, inner: false },
    { r: 1.33, y: 0.18, inner: false },
    { r: 1.12, y: -0.30, inner: false },
    { r: 0.90, y: -0.62, inner: false },
    { r: 0.78, y: -0.74, inner: false },
  ];

  const cup_bodyPositions = [];
  const cup_bodyIndices = [];
  for (const point of cup_bodyProfile) {
    cup_bodyPositions.push(point.r, point.y, 0);
  }
  for (let i = 0; i < cup_bodyProfile.length - 1; i++) {
    const a = i;
    const b = (i + 1) % cup_bodyProfile.length;
    if (cup_bodyProfile[i].inner === cup_bodyProfile[b].inner) {
      cup_bodyIndices.push(a, b, a, b, a + 1, b);
    }
  }

  const cup_bodyGeo = new THREE.BufferGeometry();
  cup_bodyGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(cup_bodyPositions, 3)
  );
  cup_bodyGeo.setIndex(cup_bodyIndices);
  cup_bodyGeo.computeVertexNormals();

  const cup_body = new THREE.Mesh(cup_bodyGeo, cup_bodyMat);
  cup_body.name = "cup_body";
  cup_body.rotation.y = Math.PI;
  cup_body.scale.set(1, 1, 1);
  root.add(cup_body);

  const footMat = cup_bodyMat;
  const footProfile = [
    { r: 0.76, y: -0.96, inner: true },
    { r: 0.91, y: -0.94, inner: true },
    { r: 1.00, y: -0.86, inner: true },
    { r: 1.02, y: -0.75, inner: true },
    { r: 0.96, y: -0.67, inner: true },
    { r: 0.84, y: -0.64, inner: true },
    { r: 0.77, y: -0.69, inner: false },
    { r: 0.73, y: -0.82, inner: false },
    { r: 0.76, y: -0.92, inner: false },
  ];

  const footPositions = [];
  const footIndices = [];
  for (const point of footProfile) {
    footPositions.push(point.r, point.y, 0);
  }
  for (let i = 0; i < footProfile.length - 1; i++) {
    const a = i;
    const b = (i + 1) % footProfile.length;
    if (footProfile[i].inner === footProfile[b].inner) {
      footIndices.push(a, b, a, b, a + 1, b);
    }
  }

  const footGeo = new THREE.BufferGeometry();
  footGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(footPositions, 3)
  );
  footGeo.setIndex(footIndices);
  footGeo.computeVertexNormals();

  const foot = new THREE.Mesh(footGeo, footMat);
  foot.name = "foot";
  root.add(foot);

  const rimGeom = new THREE.TorusGeometry(1.555, 0.028, 12, 72);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.075;
  root.add(rim);

  const foot_ringMat = rimMat;
  const foot_ringGeom = new THREE.TorusGeometry(0.965, 0.025, 10, 64);
  const foot_ring = new THREE.Mesh(foot_ringGeom, foot_ringMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = -0.70;
  root.add(foot_ring);

  const handleMat = cup_bodyMat;
  const handleCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(1.39, 0.78, 0),
    new THREE.Vector3(2.65, 1.42, 0),
    new THREE.Vector3(3.55, -0.20, 0),
    new THREE.Vector3(1.10, -0.34, 0)
  );
  const handleGeom = new THREE.TubeGeometry(handleCurve, 64, 0.13, 16, false);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.18, 24, 16);

  const upper_handle_mountMat = cup_bodyMat;
  const upper_handle_mount = new THREE.Mesh(
    handle_mountGeom,
    upper_handle_mountMat
  );
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(1.42, 0.77, 0);
  upper_handle_mount.scale.set(1.15, 0.82, 1.0);
  root.add(upper_handle_mount);

  const lower_handle_mountMat = cup_bodyMat;
  const lower_handle_mount = new THREE.Mesh(
    handle_mountGeom,
    lower_handle_mountMat
  );
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(1.10, -0.34, 0);
  lower_handle_mount.scale.set(1.25, 0.78, 1.0);
  root.add(lower_handle_mount);

  const floral_decoration = new THREE.Group();
  floral_decoration.name = "floral_decoration";
  root.add(floral_decoration);

  function outerRadiusAt(y) {
    if (y <= -0.62) return 0.90;
    if (y <= -0.30) return 0.90 + ((y + 0.62) / 0.32) * 0.22;
    if (y <= 0.18) return 1.12 + ((y + 0.30) / 0.48) * 0.21;
    if (y <= 0.72) return 1.33 + ((y - 0.18) / 0.54) * 0.14;
    return 1.47 + ((y - 0.72) / 0.36) * 0.06;
  }

  function surfacePoint(x, y, extra) {
    const radius = outerRadiusAt(y) + extra;
    const angle = Math.PI / 2 - x / radius;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addSurfaceStroke(name, coordinates, radius, closed) {
    const points = [];
    for (const coordinate of coordinates) {
      points.push(surfacePoint(coordinate[0], coordinate[1], 0.018));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, coordinates.length * 4),
      radius,
      6,
      closed
    );
    const mesh = new THREE.Mesh(geometry, floral_decorationMat);
    mesh.name = name;
    floral_decoration.add(mesh);
    return mesh;
  }

  function addSurfaceEllipse(name, cx, cy, rx, ry, rotation, radius) {
    const coordinates = [];
    const count = 24;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dx = Math.cos(angle) * rx;
      const dy = Math.sin(angle) * ry;
      coordinates.push([
        cx + dx * cosRotation - dy * sinRotation,
        cy + dx * sinRotation + dy * cosRotation,
      ]);
    }
    return addSurfaceStroke(name, coordinates, radius, true);
  }

  function addFlower(name, cx, cy, size, petalCount) {
    const flower = new THREE.Group();
    flower.name = name;

    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalX = cx + Math.cos(angle) * size * 0.55;
      const petalY = cy + Math.sin(angle) * size * 0.55;
      const petalCoordinates = [];
      const petalSteps = 14;

      for (let j = 0; j < petalSteps; j++) {
        const t = (j / petalSteps) * Math.PI * 2;
        const longitudinal = Math.cos(t) * size * 0.58;
        const width = Math.sin(t) * size * 0.29 * (0.82 + 0.18 * Math.cos(t));
        petalCoordinates.push([
          petalX + Math.cos(angle) * longitudinal - Math.sin(angle) * width,
          petalY + Math.sin(angle) * longitudinal + Math.cos(angle) * width,
        ]);
      }

      const petal = addSurfaceStroke(
        name + "_petal_" + i,
        petalCoordinates,
        0.009,
        true
      );
      flower.add(petal);
    }

    const flower_center = addSurfaceEllipse(
      name + "_center",
      cx,
      cy,
      size * 0.17,
      size * 0.17,
      0,
      0.009
    );
    flower.add(flower_center);
    floral_decoration.add(flower);
    return flower;
  }

  function addLeaf(name, cx, cy, length, width, rotation) {
    const leaf = new THREE.Group();
    leaf.name = name;

    const outlineCoordinates = [];
    const steps = 10;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const dx = (t - 0.5) * length;
      const dy = Math.sin(t * Math.PI) * width;
      outlineCoordinates.push([
        cx + dx * cosRotation - dy * sinRotation,
        cy + dx * sinRotation + dy * cosRotation,
      ]);
    }
    for (let i = steps - 1; i >= 1; i--) {
      const t = i / steps;
      const dx = (t - 0.5) * length;
      const dy = -Math.sin(t * Math.PI) * width;
      outlineCoordinates.push([
        cx + dx * cosRotation - dy * sinRotation,
        cy + dx * sinRotation + dy * cosRotation,
      ]);
    }

    const leaf_outline = addSurfaceStroke(
      name + "_outline",
      outlineCoordinates,
      0.008,
      true
    );
    leaf.add(leaf_outline);

    const veinCoordinates = [];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      const dx = (t - 0.5) * length * 0.82;
      veinCoordinates.push([
        cx + dx * cosRotation,
        cy + dx * sinRotation,
      ]);
    }
    const leaf_vein = addSurfaceStroke(
      name + "_vein",
      veinCoordinates,
      0.006,
      false
    );
    leaf.add(leaf_vein);

    floral_decoration.add(leaf);
    return leaf;
  }

  const main_vine = addSurfaceStroke(
    "main_vine",
    [
      [-1.22, -0.28],
      [-0.92, -0.30],
      [-0.58, -0.22],
      [-0.22, -0.08],
      [0.18, 0.10],
      [0.56, 0.28],
      [0.94, 0.39],
      [1.22, 0.36],
    ],
    0.011,
    false
  );

  const left_branch = addSurfaceStroke(
    "left_branch",
    [
      [-0.82, -0.29],
      [-1.02, -0.08],
      [-1.13, 0.17],
      [-1.16, 0.42],
    ],
    0.009,
    false
  );

  const center_branch = addSurfaceStroke(
    "center_branch",
    [
      [-0.20, -0.08],
      [-0.08, 0.12],
      [0.02, 0.34],
      [0.16, 0.55],
    ],
    0.009,
    false
  );

  const right_branch = addSurfaceStroke(
    "right_branch",
    [
      [0.30, 0.07],
      [0.48, -0.08],
      [0.68, -0.23],
      [0.94, -0.31],
    ],
    0.009,
    false
  );

  const far_left_flower = addFlower(
    "far_left_flower",
    -1.18,
    0.18,
    0.19,
    5
  );
  const left_flower = addFlower(
    "left_flower",
    -0.96,
    -0.10,
    0.27,
    5
  );
  const central_flower = addFlower(
    "central_flower",
    -0.43,
    0.18,
    0.35,
    5
  );
  const lower_flower = addFlower(
    "lower_flower",
    0.48,
    -0.18,
    0.31,
    5
  );
  const upper_flower = addFlower(
    "upper_flower",
    0.13,
    0.43,
    0.20,
    5
  );
  const right_flower = addFlower(
    "right_flower",
    1.08,
    0.39,
    0.17,
    5
  );

  const far_left_upper_leaf = addLeaf(
    "far_left_upper_leaf",
    -1.25,
    0.43,
    0.28,
    0.075,
    2.05
  );
  const far_left_lower_leaf = addLeaf(
    "far_left_lower_leaf",
    -1.18,
    -0.30,
    0.31,
    0.085,
    -2.20
  );
  const left_upper_leaf = addLeaf(
    "left_upper_leaf",
    -0.82,
    0.48,
    0.36,
    0.10,
    2.55
  );
  const left_lower_leaf = addLeaf(
    "left_lower_leaf",
    -0.72,
    -0.43,
    0.42,
    0.11,
    -0.45
  );
  const center_upper_leaf = addLeaf(
    "center_upper_leaf",
    0.02,
    0.55,
    0.39,
    0.105,
    1.10
  );
  const center_lower_leaf = addLeaf(
    "center_lower_leaf",
    0.05,
    -0.34,
    0.39,
    0.105,
    -1.00
  );
  const right_upper_leaf = addLeaf(
    "right_upper_leaf",
    0.62,
    0.48,
    0.34,
    0.09,
    0.65
  );
  const right_middle_leaf = addLeaf(
    "right_middle_leaf",
    0.82,
    0.18,
    0.32,
    0.085,
    -0.25
  );
  const right_lower_leaf = addLeaf(
    "right_lower_leaf",
    0.82,
    -0.34,
    0.34,
    0.09,
    -0.70
  );
  const tip_leaf = addLeaf(
    "tip_leaf",
    1.22,
    0.36,
    0.25,
    0.065,
    0.20
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