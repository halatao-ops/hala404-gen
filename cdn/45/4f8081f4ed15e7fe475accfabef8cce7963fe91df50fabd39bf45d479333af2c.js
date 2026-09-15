export default function generate(THREE) {
  const root = new THREE.Group();
  const trowel = new THREE.Group();
  root.add(trowel);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x16b91b,
    metalness: 0.0,
    roughness: 0.22,
  });
  const blade_rimMat = bladeMat;
  const neckMat = bladeMat;
  const handle_gripMat = new THREE.MeshStandardMaterial({
    color: 0xd7b33c,
    metalness: 0.6,
    roughness: 0.28,
  });
  const connector_collarMat = handle_gripMat;
  const hanging_holeMat = new THREE.MeshStandardMaterial({
    color: 0x171208,
    metalness: 0.0,
    roughness: 0.8,
  });
  const logo_ringMat = new THREE.MeshStandardMaterial({
    color: 0x9f791c,
    metalness: 0.5,
    roughness: 0.35,
  });
  const logo_markMat = logo_ringMat;

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -1.72);
  bladeShape.bezierCurveTo(0.34, -1.72, 0.55, -1.52, 0.60, -1.22);
  bladeShape.bezierCurveTo(0.65, -0.88, 0.62, -0.42, 0.57, -0.08);
  bladeShape.bezierCurveTo(0.55, 0.08, 0.50, 0.18, 0.42, 0.22);
  bladeShape.bezierCurveTo(0.31, 0.27, 0.20, 0.20, 0.14, 0.08);
  bladeShape.bezierCurveTo(0.09, -0.02, 0.04, -0.10, 0, -0.12);
  bladeShape.bezierCurveTo(-0.04, -0.10, -0.09, -0.02, -0.14, 0.08);
  bladeShape.bezierCurveTo(-0.20, 0.20, -0.31, 0.27, -0.42, 0.22);
  bladeShape.bezierCurveTo(-0.50, 0.18, -0.55, 0.08, -0.57, -0.08);
  bladeShape.bezierCurveTo(-0.62, -0.42, -0.65, -0.88, -0.60, -1.22);
  bladeShape.bezierCurveTo(-0.55, -1.52, -0.34, -1.72, 0, -1.72);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    curveSegments: 24,
    steps: 1,
    depth: 0.045,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.position.z = -0.0225;
  trowel.add(blade);

  const blade_rimPoints = [
    new THREE.Vector3(0, -1.72, 0.043),
    new THREE.Vector3(0.34, -1.67, 0.043),
    new THREE.Vector3(0.55, -1.47, 0.043),
    new THREE.Vector3(0.61, -1.16, 0.043),
    new THREE.Vector3(0.62, -0.72, 0.043),
    new THREE.Vector3(0.58, -0.22, 0.043),
    new THREE.Vector3(0.50, 0.12, 0.043),
    new THREE.Vector3(0.42, 0.22, 0.043),
    new THREE.Vector3(0.28, 0.23, 0.043),
    new THREE.Vector3(0.14, 0.08, 0.043),
    new THREE.Vector3(0, -0.12, 0.043),
    new THREE.Vector3(-0.14, 0.08, 0.043),
    new THREE.Vector3(-0.28, 0.23, 0.043),
    new THREE.Vector3(-0.42, 0.22, 0.043),
    new THREE.Vector3(-0.50, 0.12, 0.043),
    new THREE.Vector3(-0.58, -0.22, 0.043),
    new THREE.Vector3(-0.62, -0.72, 0.043),
    new THREE.Vector3(-0.61, -1.16, 0.043),
    new THREE.Vector3(-0.55, -1.47, 0.043),
    new THREE.Vector3(-0.34, -1.67, 0.043),
  ];
  const blade_rimCurve = new THREE.CatmullRomCurve3(
    blade_rimPoints,
    true,
    "centripetal"
  );
  const blade_rimGeom = new THREE.TubeGeometry(
    blade_rimCurve,
    96,
    0.012,
    8,
    true
  );
  const blade_rim = new THREE.Mesh(blade_rimGeom, blade_rimMat);
  trowel.add(blade_rim);

  const neckShape = new THREE.Shape();
  neckShape.moveTo(-0.22, 0.08);
  neckShape.bezierCurveTo(-0.17, 0.18, -0.13, 0.27, -0.115, 0.38);
  neckShape.bezierCurveTo(-0.10, 0.50, -0.105, 0.62, -0.13, 0.72);
  neckShape.lineTo(0.13, 0.72);
  neckShape.bezierCurveTo(0.105, 0.62, 0.10, 0.50, 0.115, 0.38);
  neckShape.bezierCurveTo(0.13, 0.27, 0.17, 0.18, 0.22, 0.08);
  neckShape.closePath();

  const neckGeom = new THREE.ExtrudeGeometry(neckShape, {
    curveSegments: 20,
    steps: 1,
    depth: 0.10,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  const neck = new THREE.Mesh(neckGeom, neckMat);
  neck.position.z = -0.05;
  trowel.add(neck);

  const connector_collarProfile = [
    new THREE.Vector2(0, -0.10),
    new THREE.Vector2(0.11, -0.10),
    new THREE.Vector2(0.15, -0.075),
    new THREE.Vector2(0.18, -0.025),
    new THREE.Vector2(0.18, 0.025),
    new THREE.Vector2(0.155, 0.075),
    new THREE.Vector2(0.12, 0.10),
    new THREE.Vector2(0, 0.10),
  ];
  const connector_collarGeom = new THREE.LatheGeometry(
    connector_collarProfile,
    32
  );
  const connector_collar = new THREE.Mesh(
    connector_collarGeom,
    connector_collarMat
  );
  connector_collar.position.y = 0.72;
  trowel.add(connector_collar);

  const handle_gripProfile = [
    new THREE.Vector2(0, -0.54),
    new THREE.Vector2(0.145, -0.54),
    new THREE.Vector2(0.17, -0.50),
    new THREE.Vector2(0.18, -0.42),
    new THREE.Vector2(0.18, 0.39),
    new THREE.Vector2(0.175, 0.47),
    new THREE.Vector2(0.15, 0.52),
    new THREE.Vector2(0.10, 0.55),
    new THREE.Vector2(0, 0.55),
  ];
  const handle_gripGeom = new THREE.LatheGeometry(handle_gripProfile, 40);
  const handle_grip = new THREE.Mesh(handle_gripGeom, handle_gripMat);
  handle_grip.position.y = 1.40;
  trowel.add(handle_grip);

  const hanging_holeGeom = new THREE.CylinderGeometry(
    0.082,
    0.082,
    0.018,
    28
  );
  const hanging_hole = new THREE.Mesh(hanging_holeGeom, hanging_holeMat);
  hanging_hole.rotation.x = Math.PI / 2;
  hanging_hole.position.set(0, 1.79, 0.174);
  trowel.add(hanging_hole);

  const hanging_hole_rimGeom = new THREE.TorusGeometry(
    0.087,
    0.011,
    8,
    28
  );
  const hanging_hole_rim = new THREE.Mesh(
    hanging_hole_rimGeom,
    logo_ringMat
  );
  hanging_hole_rim.position.set(0, 1.79, 0.184);
  trowel.add(hanging_hole_rim);

  const logo_ringGeom = new THREE.TorusGeometry(0.068, 0.008, 8, 28);
  const logo_ring = new THREE.Mesh(logo_ringGeom, logo_ringMat);
  logo_ring.position.set(0, 1.55, 0.181);
  trowel.add(logo_ring);

  const logo_markCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.038, 1.535, 0.191),
      new THREE.Vector3(-0.026, 1.575, 0.191),
      new THREE.Vector3(0, 1.595, 0.191),
      new THREE.Vector3(0.027, 1.585, 0.191),
      new THREE.Vector3(0.039, 1.55, 0.191),
      new THREE.Vector3(0.021, 1.525, 0.191),
      new THREE.Vector3(-0.006, 1.527, 0.191),
      new THREE.Vector3(-0.021, 1.55, 0.191),
      new THREE.Vector3(-0.004, 1.572, 0.191),
      new THREE.Vector3(0.017, 1.563, 0.191),
    ],
    false,
    "centripetal"
  );
  const logo_markGeom = new THREE.TubeGeometry(
    logo_markCurve,
    32,
    0.006,
    6,
    false
  );
  const logo_mark = new THREE.Mesh(logo_markGeom, logo_markMat);
  trowel.add(logo_mark);

  trowel.rotation.z = -0.48;

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