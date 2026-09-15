export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "copper_double_handle_cup";

  const vessel_group = new THREE.Group();
  vessel_group.name = "vessel_group";
  root.add(vessel_group);

  const handles_group = new THREE.Group();
  handles_group.name = "handles_group";
  root.add(handles_group);

  const engraving_group = new THREE.Group();
  engraving_group.name = "engraving_group";
  root.add(engraving_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb8754f,
    metalness: 0.6,
    roughness: 0.4
  });

  const inner_liningMat = new THREE.MeshStandardMaterial({
    color: 0xeee8e1,
    metalness: 0.1,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xf1ece6,
    metalness: 0.1,
    roughness: 0.3
  });

  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x70483a,
    metalness: 0.2,
    roughness: 0.6,
    side: THREE.DoubleSide
  });

  const bodyProfile = [
    { y: -1.28, r: 0.82 },
    { y: -1.24, r: 0.96 },
    { y: -1.15, r: 1.04 },
    { y: -0.98, r: 1.07 },
    { y: -0.35, r: 1.09 },
    { y: 0.35, r: 1.10 },
    { y: 0.92, r: 1.10 },
    { y: 1.10, r: 1.09 },
    { y: 1.22, r: 1.08 }
  ];

  function bodyRadiusAt(y) {
    if (y <= bodyProfile[0].y) return bodyProfile[0].r;
    for (let i = 0; i < bodyProfile.length - 1; i++) {
      const a = bodyProfile[i];
      const b = bodyProfile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return bodyProfile[bodyProfile.length - 1].r;
  }

  const bodyGeom = new THREE.LatheGeometry(
    bodyProfile.map((p) => new THREE.Vector2(p.r, p.y)),
    64
  );
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  vessel_group.add(body);

  const inner_liningProfile = [
    new THREE.Vector2(0.925, 0.58),
    new THREE.Vector2(0.945, 0.88),
    new THREE.Vector2(0.975, 1.16),
    new THREE.Vector2(1.015, 1.29)
  ];
  const inner_liningGeom = new THREE.LatheGeometry(inner_liningProfile, 64);
  const inner_lining = new THREE.Mesh(inner_liningGeom, inner_liningMat);
  inner_lining.name = "inner_lining";
  vessel_group.add(inner_lining);

  const rim_collarGeom = new THREE.CylinderGeometry(
    1.15,
    1.09,
    0.22,
    64,
    1,
    true
  );
  const rim_collar = new THREE.Mesh(rim_collarGeom, rimMat);
  rim_collar.name = "rim_collar";
  rim_collar.position.y = 1.18;
  vessel_group.add(rim_collar);

  const rim_rollGeom = new THREE.TorusGeometry(1.075, 0.085, 16, 64);
  const rim_roll = new THREE.Mesh(rim_rollGeom, rimMat);
  rim_roll.name = "rim_roll";
  rim_roll.rotation.x = Math.PI / 2;
  rim_roll.position.y = 1.29;
  vessel_group.add(rim_roll);

  const inner_rim_shadowGeom = new THREE.TorusGeometry(0.99, 0.018, 10, 64);
  const inner_rim_shadow = new THREE.Mesh(inner_rim_shadowGeom, inner_liningMat);
  inner_rim_shadow.name = "inner_rim_shadow";
  inner_rim_shadow.rotation.x = Math.PI / 2;
  inner_rim_shadow.position.y = 1.285;
  vessel_group.add(inner_rim_shadow);

  const base_ringGeom = new THREE.TorusGeometry(0.88, 0.025, 10, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, bodyMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -1.245;
  vessel_group.add(base_ring);

  const handlePoints = [
    new THREE.Vector3(1.03, 0.78, -0.04),
    new THREE.Vector3(1.34, 0.87, -0.04),
    new THREE.Vector3(1.68, 0.78, -0.04),
    new THREE.Vector3(1.91, 0.48, -0.04),
    new THREE.Vector3(1.98, 0.02, -0.04),
    new THREE.Vector3(1.88, -0.48, -0.04),
    new THREE.Vector3(1.58, -0.82, -0.04),
    new THREE.Vector3(1.18, -0.94, -0.04),
    new THREE.Vector3(1.03, -0.78, -0.04)
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(handleCurve, 64, 0.105, 14, false);

  const right_handle = new THREE.Mesh(handleGeom, bodyMat);
  right_handle.name = "right_handle";
  handles_group.add(right_handle);

  const left_handle = new THREE.Mesh(handleGeom, bodyMat);
  left_handle.name = "left_handle";
  left_handle.scale.x = -1;
  handles_group.add(left_handle);

  const handle_mountsGeom = new THREE.SphereGeometry(0.14, 20, 12);
  const handle_mounts = new THREE.InstancedMesh(handle_mountsGeom, bodyMat, 4);
  handle_mounts.name = "handle_mounts";
  const mountDummy = new THREE.Object3D();
  const mountPositions = [
    [1.045, 0.77, -0.035],
    [1.045, -0.78, -0.035],
    [-1.045, 0.77, -0.035],
    [-1.045, -0.78, -0.035]
  ];
  for (let i = 0; i < mountPositions.length; i++) {
    const p = mountPositions[i];
    mountDummy.position.set(p[0], p[1], p[2]);
    mountDummy.scale.set(0.82, 1.18, 0.82);
    mountDummy.updateMatrix();
    handle_mounts.setMatrixAt(i, mountDummy.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  handles_group.add(handle_mounts);

  function surfacePoint(u, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    const angle = Math.PI / 2 - u / radius;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function surfaceNormal(u, y) {
    const angle = Math.PI / 2 - u / bodyRadiusAt(y);
    return new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
  }

  function addSurfaceStroke(name, coordinates, thickness, closed) {
    const points = coordinates.map((p) => surfacePoint(p[0], p[1], 0.018));
    let curve;
    if (points.length === 2) {
      curve = new THREE.LineCurve3(points[0], points[1]);
    } else {
      curve = new THREE.CatmullRomCurve3(points, closed, "centripetal");
    }
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(8, coordinates.length * 5),
      thickness,
      6,
      closed
    );
    const mesh = new THREE.Mesh(geometry, engravingMat);
    mesh.name = name;
    engraving_group.add(mesh);
    return mesh;
  }

  function addSurfaceLoop(name, cx, cy, rx, ry, thickness) {
    const coordinates = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      coordinates.push([
        cx + Math.cos(angle) * rx,
        cy + Math.sin(angle) * ry
      ]);
    }
    return addSurfaceStroke(name, coordinates, thickness, true);
  }

  function addFlower(name, cx, cy, size, petalCount) {
    const flower = new THREE.Group();
    flower.name = name;

    for (let i = 0; i < petalCount; i++) {
      const angle = i / petalCount * Math.PI * 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const px = -dy;
      const py = dx;
      const petalCoordinates = [
        [cx + dx * size * 0.10, cy + dy * size * 0.10],
        [cx + dx * size * 0.38 + px * size * 0.22, cy + dy * size * 0.38 + py * size * 0.22],
        [cx + dx * size * 0.72 + px * size * 0.17, cy + dy * size * 0.72 + py * size * 0.17],
        [cx + dx * size, cy + dy * size],
        [cx + dx * size * 0.72 - px * size * 0.17, cy + dy * size * 0.72 - py * size * 0.17],
        [cx + dx * size * 0.38 - px * size * 0.22, cy + dy * size * 0.38 - py * size * 0.22]
      ];
      const petal = addSurfaceStroke(
        name + "_petal_" + i,
        petalCoordinates,
        0.011,
        true
      );
      flower.add(petal);

      const vein = addSurfaceStroke(
        name + "_vein_" + i,
        [
          [cx + dx * size * 0.13, cy + dy * size * 0.13],
          [cx + dx * size * 0.62, cy + dy * size * 0.62]
        ],
        0.006,
        false
      );
      flower.add(vein);
    }

    const center = addSurfaceLoop(
      name + "_center",
      cx,
      cy,
      size * 0.17,
      size * 0.17,
      0.009
    );
    flower.add(center);
    engraving_group.add(flower);
    return flower;
  }

  function addLeaf(name, baseU, baseY, direction, length, width) {
    const leaf = new THREE.Group();
    leaf.name = name;

    const dx = Math.cos(direction);
    const dy = Math.sin(direction);
    const px = -dy;
    const py = dx;
    const midU = baseU + dx * length * 0.5;
    const midY = baseY + dy * length * 0.5;
    const tipU = baseU + dx * length;
    const tipY = baseY + dy * length;

    const upperCoordinates = [
      [baseU, baseY],
      [baseU + dx * length * 0.28 + px * width, baseY + dy * length * 0.28 + py * width],
      [midU + px * width * 0.8, midY + py * width * 0.8],
      [tipU, tipY]
    ];
    const lowerCoordinates = [
      [baseU, baseY],
      [baseU + dx * length * 0.28 - px * width, baseY + dy * length * 0.28 - py * width],
      [midU - px * width * 0.8, midY - py * width * 0.8],
      [tipU, tipY]
    ];

    const upper_edge = addSurfaceStroke(
      name + "_upper_edge",
      upperCoordinates,
      0.009,
      false
    );
    const lower_edge = addSurfaceStroke(
      name + "_lower_edge",
      lowerCoordinates,
      0.009,
      false
    );
    const central_vein = addSurfaceStroke(
      name + "_central_vein",
      [[baseU, baseY], [tipU, tipY]],
      0.006,
      false
    );
    leaf.add(upper_edge, lower_edge, central_vein);
    engraving_group.add(leaf);
    return leaf;
  }

  const upper_garland = addSurfaceStroke("upper_garland", [
    [-0.98, 0.72],
    [-0.78, 0.84],
    [-0.56, 0.73],
    [-0.31, 0.82],
    [-0.05, 0.72],
    [0.22, 0.82],
    [0.48, 0.73],
    [0.72, 0.82],
    [0.98, 0.70]
  ], 0.010, false);

  const upper_left_scroll = addSurfaceStroke("upper_left_scroll", [
    [-0.98, 0.72],
    [-1.03, 0.83],
    [-0.96, 0.91],
    [-0.86, 0.87],
    [-0.87, 0.79]
  ], 0.009, false);

  const upper_right_scroll = addSurfaceStroke("upper_right_scroll", [
    [0.98, 0.70],
    [1.03, 0.80],
    [0.97, 0.89],
    [0.88, 0.86],
    [0.88, 0.78]
  ], 0.009, false);

  const central_stem = addSurfaceStroke("central_stem", [
    [0.02, -1.00],
    [0.20, -0.82],
    [0.34, -0.55],
    [0.38, -0.25],
    [0.30, 0.04],
    [0.18, 0.28],
    [0.05, 0.43]
  ], 0.013, false);

  const central_left_branch = addSurfaceStroke("central_left_branch", [
    [0.27, -0.42],
    [0.05, -0.28],
    [-0.18, -0.12],
    [-0.30, 0.02]
  ], 0.010, false);

  const lower_left_branch = addSurfaceStroke("lower_left_branch", [
    [0.13, -0.82],
    [-0.08, -0.72],
    [-0.28, -0.62],
    [-0.42, -0.57]
  ], 0.010, false);

  const lower_right_branch = addSurfaceStroke("lower_right_branch", [
    [0.22, -0.72],
    [0.42, -0.62],
    [0.58, -0.48],
    [0.68, -0.38]
  ], 0.010, false);

  const right_upper_branch = addSurfaceStroke("right_upper_branch", [
    [0.34, -0.20],
    [0.48, 0.02],
    [0.56, 0.22],
    [0.50, 0.38]
  ], 0.009, false);

  const left_upper_branch = addSurfaceStroke("left_upper_branch", [
    [0.10, 0.25],
    [-0.08, 0.42],
    [-0.24, 0.55],
    [-0.36, 0.62]
  ], 0.009, false);

  const central_flower = addFlower("central_flower", -0.18, 0.25, 0.24, 6);
  const lower_left_flower = addFlower("lower_left_flower", -0.55, -0.70, 0.23, 5);
  const lower_right_flower = addFlower("lower_right_flower", 0.68, -0.42, 0.20, 5);
  const upper_left_flower = addFlower("upper_left_flower", -0.66, 0.70, 0.13, 5);
  const upper_right_flower = addFlower("upper_right_flower", 0.73, 0.71, 0.13, 5);

  const upper_center_leaf = addLeaf("upper_center_leaf", 0.02, 0.48, 1.35, 0.24, 0.075);
  const upper_right_leaf = addLeaf("upper_right_leaf", 0.20, 0.58, 0.72, 0.22, 0.070);
  const upper_left_leaf = addLeaf("upper_left_leaf", -0.34, 0.61, 2.55, 0.20, 0.065);
  const middle_right_leaf = addLeaf("middle_right_leaf", 0.38, 0.02, 1.05, 0.25, 0.080);
  const middle_left_leaf = addLeaf("middle_left_leaf", 0.22, -0.18, 2.70, 0.23, 0.075);
  const lower_center_leaf = addLeaf("lower_center_leaf", 0.22, -0.62, 2.00, 0.25, 0.080);
  const lower_right_leaf = addLeaf("lower_right_leaf", 0.42, -0.66, 0.35, 0.24, 0.075);
  const lower_left_leaf = addLeaf("lower_left_leaf", -0.18, -0.72, 1.90, 0.22, 0.070);
  const right_bud_leaf = addLeaf("right_bud_leaf", 0.50, 0.18, 1.15, 0.20, 0.065);
  const left_bud_leaf = addLeaf("left_bud_leaf", -0.30, -0.58, 1.75, 0.18, 0.060);

  const central_flower_centerGeom = new THREE.CircleGeometry(0.045, 18);
  const central_flower_center = new THREE.Mesh(central_flower_centerGeom, engravingMat);
  central_flower_center.name = "central_flower_center";
  central_flower_center.position.copy(surfacePoint(-0.18, 0.25, 0.024));
  central_flower_center.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    surfaceNormal(-0.18, 0.25)
  );
  engraving_group.add(central_flower_center);

  const lower_left_flower_centerGeom = new THREE.CircleGeometry(0.038, 18);
  const lower_left_flower_center = new THREE.Mesh(
    lower_left_flower_centerGeom,
    engravingMat
  );
  lower_left_flower_center.name = "lower_left_flower_center";
  lower_left_flower_center.position.copy(surfacePoint(-0.55, -0.70, 0.024));
  lower_left_flower_center.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    surfaceNormal(-0.55, -0.70)
  );
  engraving_group.add(lower_left_flower_center);

  const lower_right_flower_centerGeom = new THREE.CircleGeometry(0.034, 18);
  const lower_right_flower_center = new THREE.Mesh(
    lower_right_flower_centerGeom,
    engravingMat
  );
  lower_right_flower_center.name = "lower_right_flower_center";
  lower_right_flower_center.position.copy(surfacePoint(0.68, -0.42, 0.024));
  lower_right_flower_center.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    surfaceNormal(0.68, -0.42)
  );
  engraving_group.add(lower_right_flower_center);

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