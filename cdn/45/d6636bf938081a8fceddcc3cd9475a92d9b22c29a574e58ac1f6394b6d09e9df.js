export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7f0ed,
    metalness: 0.0,
    roughness: 0.03,
    transmission: 0.98,
    thickness: 0.08,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const edgeGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c9c3,
    metalness: 0.0,
    roughness: 0.04,
    transmission: 0.9,
    thickness: 0.16,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const bodyProfile = [
    { r: 0.00, y: 0.00 },
    { r: 0.48, y: 0.00 },
    { r: 0.62, y: 0.035 },
    { r: 0.70, y: 0.11 },
    { r: 0.76, y: 0.25 },
    { r: 0.80, y: 0.48 },
    { r: 0.82, y: 0.76 },
    { r: 0.81, y: 1.02 },
    { r: 0.77, y: 1.30 },
    { r: 0.70, y: 1.62 },
    { r: 0.62, y: 1.94 },
    { r: 0.54, y: 2.25 },
    { r: 0.46, y: 2.55 },
    { r: 0.39, y: 2.82 },
    { r: 0.35, y: 3.05 },
    { r: 0.35, y: 3.22 },
    { r: 0.37, y: 3.34 },
    { r: 0.43, y: 3.39 },
    { r: 0.45, y: 3.43 },
    { r: 0.43, y: 3.48 },
    { r: 0.35, y: 3.50 },
    { r: 0.31, y: 3.47 },
    { r: 0.30, y: 3.40 },
    { r: 0.31, y: 3.32 },
    { r: 0.30, y: 3.20 },
    { r: 0.30, y: 3.05 },
    { r: 0.33, y: 2.82 },
    { r: 0.40, y: 2.54 },
    { r: 0.48, y: 2.24 },
    { r: 0.56, y: 1.93 },
    { r: 0.64, y: 1.61 },
    { r: 0.71, y: 1.29 },
    { r: 0.75, y: 1.02 },
    { r: 0.76, y: 0.76 },
    { r: 0.74, y: 0.50 },
    { r: 0.69, y: 0.28 },
    { r: 0.61, y: 0.16 },
    { r: 0.47, y: 0.11 },
    { r: 0.00, y: 0.11 }
  ];

  const bodySegments = 64;
  const bodyPositions = [];
  const bodyIndices = [];

  for (let i = 0; i < bodyProfile.length; i++) {
    const profilePoint = bodyProfile[i];
    for (let j = 0; j < bodySegments; j++) {
      const angle = j / bodySegments * Math.PI * 2;
      bodyPositions.push(
        Math.cos(angle) * profilePoint.r,
        profilePoint.y,
        Math.sin(angle) * profilePoint.r
      );
    }
  }

  for (let i = 0; i < bodyProfile.length - 1; i++) {
    for (let j = 0; j < bodySegments; j++) {
      const next = (j + 1) % bodySegments;
      const a = i * bodySegments + j;
      const b = i * bodySegments + next;
      const c = (i + 1) * bodySegments + j;
      const d = (i + 1) * bodySegments + next;
      bodyIndices.push(a, c, b, b, c, d);
    }
  }

  const bodyGeom = new THREE.BufferGeometry();
  bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bodyPositions, 3)
  );
  bodyGeom.setIndex(bodyIndices);
  bodyGeom.computeVertexNormals();

  const body = new THREE.Mesh(bodyGeom, glassMat);
  root.add(body);

  const rolled_lipGeom = new THREE.TorusGeometry(0.39, 0.055, 16, 64);
  const rolled_lip = new THREE.Mesh(rolled_lipGeom, edgeGlassMat);
  rolled_lip.rotation.x = Math.PI / 2;
  rolled_lip.position.y = 3.43;
  root.add(rolled_lip);

  const mouth_rimGeom = new THREE.RingGeometry(0.305, 0.43, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, edgeGlassMat);
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 3.485;
  root.add(mouth_rim);

  const inner_lipGeom = new THREE.TorusGeometry(0.315, 0.018, 10, 64);
  const inner_lip = new THREE.Mesh(inner_lipGeom, edgeGlassMat);
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = 3.475;
  root.add(inner_lip);

  const base_ringGeom = new THREE.TorusGeometry(0.59, 0.045, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, edgeGlassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.075;
  root.add(base_ring);

  const bottom_puntGeom = new THREE.TorusGeometry(0.34, 0.025, 10, 48);
  const bottom_punt = new THREE.Mesh(bottom_puntGeom, edgeGlassMat);
  bottom_punt.rotation.x = Math.PI / 2;
  bottom_punt.position.y = 0.135;
  root.add(bottom_punt);

  const neck_detailGeom = new THREE.TorusGeometry(0.354, 0.012, 8, 48);
  const neck_detail = new THREE.Mesh(neck_detailGeom, edgeGlassMat);
  neck_detail.rotation.x = Math.PI / 2;
  neck_detail.position.y = 3.285;
  root.add(neck_detail);

  const front_swoopCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, 3.45, 0.34),
    new THREE.Vector3(-0.22, 3.36, 0.33),
    new THREE.Vector3(-0.28, 3.23, 0.30),
    new THREE.Vector3(-0.31, 3.09, 0.27),
    new THREE.Vector3(-0.29, 2.98, 0.25)
  ]);
  const front_swoopGeom = new THREE.TubeGeometry(
    front_swoopCurve,
    24,
    0.027,
    10,
    false
  );
  const front_swoop = new THREE.Mesh(front_swoopGeom, edgeGlassMat);
  root.add(front_swoop);

  const front_swoop_tipGeom = new THREE.SphereGeometry(0.038, 16, 10);
  const front_swoop_tip = new THREE.Mesh(front_swoop_tipGeom, edgeGlassMat);
  front_swoop_tip.position.set(-0.29, 2.98, 0.25);
  front_swoop_tip.scale.set(0.75, 1.15, 0.65);
  root.add(front_swoop_tip);

  const rear_crestCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.27, 3.43, -0.18),
    new THREE.Vector3(-0.18, 3.54, -0.23),
    new THREE.Vector3(-0.04, 3.59, -0.25),
    new THREE.Vector3(0.12, 3.57, -0.23),
    new THREE.Vector3(0.25, 3.48, -0.17)
  ]);
  const rear_crestGeom = new THREE.TubeGeometry(
    rear_crestCurve,
    28,
    0.035,
    10,
    false
  );
  const rear_crest = new THREE.Mesh(rear_crestGeom, edgeGlassMat);
  root.add(rear_crest);

  const rear_crest_tipGeom = new THREE.SphereGeometry(0.045, 16, 10);
  const rear_crest_tip = new THREE.Mesh(rear_crest_tipGeom, edgeGlassMat);
  rear_crest_tip.position.set(0.25, 3.48, -0.17);
  rear_crest_tip.scale.set(1.0, 0.7, 0.8);
  root.add(rear_crest_tip);

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