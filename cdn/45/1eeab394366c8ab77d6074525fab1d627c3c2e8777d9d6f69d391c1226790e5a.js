export default function generate(THREE) {
  const root = new THREE.Group();

  const springMat = new THREE.MeshStandardMaterial({
    color: 0xe5e5e5,
    metalness: 0.6,
    roughness: 0.4,
  });

  const coilRadius = 0.4;
  const wireRadius = 0.045;
  const totalLength = 1.15;
  const turnCount = 8;
  const endTransition = 0.16;
  const pointCount = 320;
  const springPoints = [];

  for (let i = 0; i <= pointCount; i++) {
    const t = i / pointCount;
    let x;
    let radius;

    if (t < endTransition) {
      const q = t / endTransition;
      const smooth = q * q * (3 - 2 * q);
      x = -totalLength / 2 + smooth * totalLength * 0.12;
      radius = 0.36 + smooth * 0.04;
    } else if (t > 1 - endTransition) {
      const q = (t - (1 - endTransition)) / endTransition;
      const smooth = q * q * (3 - 2 * q);
      x = totalLength / 2 - totalLength * 0.12 + smooth * totalLength * 0.12;
      radius = 0.4 - smooth * 0.04;
    } else {
      x = -totalLength / 2 + totalLength * 0.12 +
        (t - endTransition) * (totalLength * 0.76 / (1 - 2 * endTransition));
      radius = coilRadius;
    }

    const angle = Math.PI / 2 + t * turnCount * Math.PI * 2;
    springPoints.push(new THREE.Vector3(
      x,
      Math.sin(angle) * radius,
      Math.cos(angle) * radius
    ));
  }

  const springCurve = new THREE.CatmullRomCurve3(
    springPoints,
    false,
    "centripetal",
    0.5
  );
  const spring_coilGeom = new THREE.TubeGeometry(
    springCurve,
    480,
    wireRadius,
    24,
    false
  );
  const spring_coil = new THREE.Mesh(spring_coilGeom, springMat);
  root.add(spring_coil);

  const wire_endGeom = new THREE.SphereGeometry(wireRadius, 20, 12);

  const left_wire_end = new THREE.Mesh(wire_endGeom, springMat);
  left_wire_end.position.copy(springPoints[0]);
  root.add(left_wire_end);

  const right_wire_end = new THREE.Mesh(wire_endGeom, springMat);
  right_wire_end.position.copy(springPoints[springPoints.length - 1]);
  root.add(right_wire_end);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}