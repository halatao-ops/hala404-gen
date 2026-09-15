export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.42,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.9,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x343434,
    metalness: 0.0,
    roughness: 0.7,
  });
  const cavityMat = new THREE.MeshStandardMaterial({
    color: 0x010101,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  const sphereR = 1.0;
  const openingAngle = 0.135;
  const openingX = 0.035;
  const openingY = 0.055;
  const openingZ = Math.sqrt(
    sphereR * sphereR - openingX * openingX - openingY * openingY
  );
  const openingNormal = new THREE.Vector3(
    openingX,
    openingY,
    openingZ
  ).normalize();

  const bodyGeom = new THREE.SphereGeometry(
    sphereR,
    96,
    64,
    0,
    Math.PI * 2,
    openingAngle,
    Math.PI - openingAngle
  );
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    openingNormal
  );
  root.add(body);

  const opening_cavityGeom = new THREE.CircleGeometry(0.098, 40);
  const opening_cavity = new THREE.Mesh(opening_cavityGeom, cavityMat);
  opening_cavity.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    openingNormal
  );
  opening_cavity.position.copy(openingNormal).multiplyScalar(0.974);
  root.add(opening_cavity);

  const opening_rimGeom = new THREE.TorusGeometry(0.106, 0.011, 10, 48);
  const opening_rim = new THREE.Mesh(opening_rimGeom, grooveMat);
  opening_rim.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    openingNormal
  );
  opening_rim.position.copy(openingNormal).multiplyScalar(0.985);
  root.add(opening_rim);

  const seamPoints = [];
  const seamTilt = 0.31;
  const seamCos = Math.cos(seamTilt);
  const seamSin = Math.sin(seamTilt);
  const seamPointCount = 72;

  for (let i = 0; i < seamPointCount; i++) {
    const t = (i / seamPointCount) * Math.PI * 2;
    const localX = Math.cos(t) * 0.994;
    const localY = Math.sin(t) * 0.994;
    const x = localX * seamCos - localY * seamSin;
    const y = localX * seamSin + localY * seamCos;
    const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
    seamPoints.push(new THREE.Vector3(x, y, z));
  }

  const seamCurve = new THREE.CatmullRomCurve3(
    seamPoints,
    true,
    "centripetal"
  );
  const seam_grooveGeom = new THREE.TubeGeometry(
    seamCurve,
    160,
    0.009,
    8,
    true
  );
  const seam_groove = new THREE.Mesh(seam_grooveGeom, grooveMat);
  root.add(seam_groove);

  const seamEdgePoints = [];
  for (let i = 0; i < seamPointCount; i++) {
    const point = seamPoints[i];
    seamEdgePoints.push(
      new THREE.Vector3(
        point.x * 1.003,
        point.y * 1.003,
        point.z * 1.003
      )
    );
  }

  const seamEdgeCurve = new THREE.CatmullRomCurve3(
    seamEdgePoints,
    true,
    "centripetal"
  );
  const seam_edgeGeom = new THREE.TubeGeometry(
    seamEdgeCurve,
    160,
    0.0028,
    6,
    true
  );
  const seam_edge = new THREE.Mesh(seam_edgeGeom, edgeMat);
  root.add(seam_edge);

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