export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ceramic_bowl_with_cream";

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xc8b594,
    metalness: 0.0,
    roughness: 0.82,
    side: THREE.DoubleSide,
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xf2e7c9,
    metalness: 0.0,
    roughness: 0.34,
    side: THREE.DoubleSide,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0xd8c9a8,
    metalness: 0.0,
    roughness: 0.58,
  });
  const speckMat = new THREE.MeshStandardMaterial({
    color: 0x9f8d6e,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const bowl_bodyProfile = [
    new THREE.Vector2(0.00, -0.48),
    new THREE.Vector2(0.18, -0.48),
    new THREE.Vector2(0.30, -0.455),
    new THREE.Vector2(0.43, -0.395),
    new THREE.Vector2(0.55, -0.305),
    new THREE.Vector2(0.65, -0.185),
    new THREE.Vector2(0.72, -0.045),
    new THREE.Vector2(0.77, 0.105),
    new THREE.Vector2(0.79, 0.235),
    new THREE.Vector2(0.785, 0.315),
    new THREE.Vector2(0.755, 0.375),
    new THREE.Vector2(0.710, 0.410),
    new THREE.Vector2(0.665, 0.395),
    new THREE.Vector2(0.630, 0.345),
    new THREE.Vector2(0.610, 0.260),
    new THREE.Vector2(0.585, 0.145),
    new THREE.Vector2(0.540, 0.025),
    new THREE.Vector2(0.465, -0.075),
    new THREE.Vector2(0.355, -0.145),
    new THREE.Vector2(0.205, -0.180),
    new THREE.Vector2(0.00, -0.190),
  ];
  const bowl_bodyGeo = new THREE.LatheGeometry(bowl_bodyProfile, 64);
  const bowl_body = new THREE.Mesh(bowl_bodyGeo, ceramicMat);
  bowl_body.name = "bowl_body";
  root.add(bowl_body);

  const rounded_rimGeo = new THREE.TorusGeometry(0.70, 0.075, 16, 64);
  const rounded_rim = new THREE.Mesh(rounded_rimGeo, ceramicMat);
  rounded_rim.name = "rounded_rim";
  rounded_rim.rotation.x = Math.PI / 2;
  rounded_rim.position.y = 0.37;
  root.add(rounded_rim);

  const foot_ringGeo = new THREE.TorusGeometry(0.235, 0.025, 10, 48);
  const foot_ring = new THREE.Mesh(foot_ringGeo, ceramicMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = -0.468;
  root.add(foot_ring);

  const lower_throwing_lineGeo = new THREE.TorusGeometry(0.535, 0.008, 8, 64);
  const lower_throwing_line = new THREE.Mesh(lower_throwing_lineGeo, ceramicMat);
  lower_throwing_line.name = "lower_throwing_line";
  lower_throwing_line.rotation.x = Math.PI / 2;
  lower_throwing_line.position.y = -0.315;
  root.add(lower_throwing_line);

  const upper_throwing_lineGeo = new THREE.TorusGeometry(0.665, 0.007, 8, 64);
  const upper_throwing_line = new THREE.Mesh(upper_throwing_lineGeo, ceramicMat);
  upper_throwing_line.name = "upper_throwing_line";
  upper_throwing_line.rotation.x = Math.PI / 2;
  upper_throwing_line.position.y = -0.155;
  root.add(upper_throwing_line);

  const cream_fillProfile = [
    new THREE.Vector2(0.00, -0.145),
    new THREE.Vector2(0.20, -0.140),
    new THREE.Vector2(0.40, -0.095),
    new THREE.Vector2(0.535, 0.000),
    new THREE.Vector2(0.595, 0.115),
    new THREE.Vector2(0.610, 0.205),
    new THREE.Vector2(0.590, 0.255),
    new THREE.Vector2(0.545, 0.285),
    new THREE.Vector2(0.470, 0.300),
    new THREE.Vector2(0.350, 0.307),
    new THREE.Vector2(0.205, 0.310),
    new THREE.Vector2(0.00, 0.312),
  ];
  const cream_fillGeo = new THREE.LatheGeometry(cream_fillProfile, 64);
  const cream_fill = new THREE.Mesh(cream_fillGeo, creamMat);
  cream_fill.name = "cream_fill";
  root.add(cream_fill);

  const spiralPoints = [];
  const spiralSegments = 144;
  const spiralTurns = 4.25;
  for (let i = 0; i <= spiralSegments; i++) {
    const t = i / spiralSegments;
    const angle = t * spiralTurns * Math.PI * 2;
    const radius = 0.035 + t * 0.50;
    const y = 0.326 - t * 0.020 + Math.sin(angle * 0.5) * 0.0015;
    spiralPoints.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ));
  }
  const spiralCurve = new THREE.CatmullRomCurve3(
    spiralPoints,
    false,
    "centripetal"
  );

  const spiral_grooveGeo = new THREE.TubeGeometry(
    spiralCurve,
    216,
    0.014,
    8,
    false
  );
  const spiral_groove = new THREE.Mesh(spiral_grooveGeo, grooveMat);
  spiral_groove.name = "spiral_groove";
  root.add(spiral_groove);

  const spiral_ridgePoints = [];
  for (let i = 0; i < spiralPoints.length; i++) {
    const point = spiralPoints[i];
    spiral_ridgePoints.push(new THREE.Vector3(point.x, point.y + 0.026, point.z));
  }
  const spiral_ridgeCurve = new THREE.CatmullRomCurve3(
    spiral_ridgePoints,
    false,
    "centripetal"
  );
  const spiral_ridgeGeo = new THREE.TubeGeometry(
    spiral_ridgeCurve,
    216,
    0.027,
    10,
    false
  );
  const spiral_ridge = new THREE.Mesh(spiral_ridgeGeo, creamMat);
  spiral_ridge.name = "spiral_ridge";
  root.add(spiral_ridge);

  const center_dollopGeo = new THREE.SphereGeometry(1, 24, 12);
  const center_dollop = new THREE.Mesh(center_dollopGeo, creamMat);
  center_dollop.name = "center_dollop";
  center_dollop.scale.set(0.105, 0.034, 0.105);
  center_dollop.position.y = 0.345;
  root.add(center_dollop);

  const center_dimpleGeo = new THREE.SphereGeometry(1, 12, 6);
  const center_dimple = new THREE.Mesh(center_dimpleGeo, grooveMat);
  center_dimple.name = "center_dimple";
  center_dimple.scale.set(0.014, 0.004, 0.014);
  center_dimple.position.set(0.012, 0.379, -0.004);
  root.add(center_dimple);

  const cream_edge_lumpsGeo = new THREE.SphereGeometry(1, 12, 8);
  const cream_edge_lumps = new THREE.InstancedMesh(
    cream_edge_lumpsGeo,
    creamMat,
    12
  );
  cream_edge_lumps.name = "cream_edge_lumps";
  const lumpDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    const radius = 0.565 + 0.008 * Math.sin(i * 1.7);
    lumpDummy.position.set(
      Math.cos(angle) * radius,
      0.286 + 0.004 * Math.cos(i * 2.1),
      Math.sin(angle) * radius
    );
    lumpDummy.rotation.set(0, -angle, 0);
    lumpDummy.scale.set(
      0.034 + 0.006 * (i % 3),
      0.014 + 0.003 * (i % 2),
      0.050 + 0.006 * ((i + 1) % 3)
    );
    lumpDummy.updateMatrix();
    cream_edge_lumps.setMatrixAt(i, lumpDummy.matrix);
  }
  cream_edge_lumps.instanceMatrix.needsUpdate = true;
  root.add(cream_edge_lumps);

  const cream_surface_poresData = [
    [-0.24, 0.12, 0.010],
    [0.18, 0.20, 0.008],
    [-0.38, -0.10, 0.009],
    [0.31, -0.18, 0.011],
    [-0.08, -0.34, 0.008],
    [0.43, 0.08, 0.007],
    [-0.46, 0.22, 0.008],
    [0.10, -0.08, 0.006],
    [0.27, 0.34, 0.007],
    [-0.31, -0.28, 0.009],
    [0.48, -0.24, 0.008],
    [-0.04, 0.43, 0.006],
  ];
  const cream_surface_poresGeo = new THREE.CircleGeometry(1, 12);
  const cream_surface_pores = new THREE.InstancedMesh(
    cream_surface_poresGeo,
    grooveMat,
    cream_surface_poresData.length
  );
  cream_surface_pores.name = "cream_surface_pores";
  const poreDummy = new THREE.Object3D();
  for (let i = 0; i < cream_surface_poresData.length; i++) {
    const pore = cream_surface_poresData[i];
    const radius = Math.sqrt(pore[0] * pore[0] + pore[1] * pore[1]);
    poreDummy.position.set(pore[0], 0.329 - radius * 0.04, pore[1]);
    poreDummy.rotation.set(-Math.PI / 2, 0, i * 0.37);
    poreDummy.scale.set(pore[2], pore[2] * 0.62, 1);
    poreDummy.updateMatrix();
    cream_surface_pores.setMatrixAt(i, poreDummy.matrix);
  }
  cream_surface_pores.instanceMatrix.needsUpdate = true;
  root.add(cream_surface_pores);

  const inner_glaze_specksData = [
    [-2.55, 0.22, 0.010],
    [-1.85, 0.14, 0.008],
    [-1.15, 0.25, 0.011],
    [-0.45, 0.18, 0.007],
    [0.25, 0.27, 0.009],
    [0.95, 0.16, 0.008],
    [1.65, 0.23, 0.010],
    [2.35, 0.13, 0.007],
  ];
  const inner_glaze_specksGeo = new THREE.CircleGeometry(1, 10);
  const inner_glaze_specks = new THREE.InstancedMesh(
    inner_glaze_specksGeo,
    speckMat,
    inner_glaze_specksData.length
  );
  inner_glaze_specks.name = "inner_glaze_specks";
  const speckDummy = new THREE.Object3D();
  const localNormal = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < inner_glaze_specksData.length; i++) {
    const speck = inner_glaze_specksData[i];
    const angle = speck[0];
    const y = speck[1];
    const radius = 0.615 + (y - 0.20) * 0.20;
    const normal = new THREE.Vector3(
      -Math.cos(angle),
      0.18,
      -Math.sin(angle)
    ).normalize();
    speckDummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ).addScaledVector(normal, 0.003);
    speckDummy.quaternion.setFromUnitVectors(localNormal, normal);
    speckDummy.scale.set(speck[2], speck[2] * 0.65, 1);
    speckDummy.updateMatrix();
    inner_glaze_specks.setMatrixAt(i, speckDummy.matrix);
  }
  inner_glaze_specks.instanceMatrix.needsUpdate = true;
  root.add(inner_glaze_specks);

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