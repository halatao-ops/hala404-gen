export default function generate(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa9823f,
    metalness: 0.6,
    roughness: 0.4,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x70542d,
    metalness: 0.5,
    roughness: 0.55,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x282722,
    metalness: 0.2,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.9,
  });

  const base_footProfile = [
    new THREE.Vector3(0.00, 0.00, 0.00),
    new THREE.Vector3(0.56, 0.00, 0.00),
    new THREE.Vector3(0.64, 0.025, 0.00),
    new THREE.Vector3(0.68, 0.075, 0.00),
    new THREE.Vector3(0.67, 0.125, 0.00),
    new THREE.Vector3(0.62, 0.175, 0.00),
    new THREE.Vector3(0.54, 0.225, 0.00),
    new THREE.Vector3(0.44, 0.285, 0.00),
    new THREE.Vector3(0.36, 0.355, 0.00),
    new THREE.Vector3(0.30, 0.445, 0.00),
    new THREE.Vector3(0.26, 0.555, 0.00),
    new THREE.Vector3(0.23, 0.675, 0.00),
    new THREE.Vector3(0.21, 0.765, 0.00),
    new THREE.Vector3(0.00, 0.765, 0.00),
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile);
  const base_foot = new THREE.Mesh(base_footGeom, brassMat);
  root.add(base_foot);

  const base_rimGeom = new THREE.TorusGeometry(0.615, 0.035, 10, 48);
  const base_rim = new THREE.Mesh(base_rimGeom, brassMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.075;
  root.add(base_rim);

  const socket_collarGeom = new THREE.CylinderGeometry(0.215, 0.235, 0.11, 40);
  const socket_collar = new THREE.Mesh(socket_collarGeom, brassMat);
  socket_collar.position.y = 0.77;
  root.add(socket_collar);

  const socket_rimGeom = new THREE.TorusGeometry(0.185, 0.043, 12, 40);
  const socket_rim = new THREE.Mesh(socket_rimGeom, brassMat);
  socket_rim.rotation.x = Math.PI / 2;
  socket_rim.position.y = 0.825;
  root.add(socket_rim);

  const socket_recessGeom = new THREE.CylinderGeometry(0.158, 0.158, 0.018, 36);
  const socket_recess = new THREE.Mesh(socket_recessGeom, patinaMat);
  socket_recess.position.y = 0.838;
  root.add(socket_recess);

  const candle_bodyProfile = [
    new THREE.Vector3(0.00, 0.75, 0.00),
    new THREE.Vector3(0.155, 0.75, 0.00),
    new THREE.Vector3(0.158, 0.90, 0.00),
    new THREE.Vector3(0.153, 1.25, 0.00),
    new THREE.Vector3(0.147, 1.80, 0.00),
    new THREE.Vector3(0.141, 2.40, 0.00),
    new THREE.Vector3(0.134, 3.00, 0.00),
    new THREE.Vector3(0.127, 3.55, 0.00),
    new THREE.Vector3(0.121, 3.95, 0.00),
    new THREE.Vector3(0.118, 4.08, 0.00),
    new THREE.Vector3(0.00, 4.08, 0.00),
  ];
  const candle_bodyGeom = new THREE.LatheGeometry(candle_bodyProfile);
  const candle_body = new THREE.Mesh(candle_bodyGeom, brassMat);
  root.add(candle_body);

  function candleRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - 0.9) / 3.15));
    return 0.156 + (0.119 - 0.156) * t;
  }

  const patina_spotGeom = new THREE.CircleGeometry(1, 10);
  const patina_spots = new THREE.InstancedMesh(patina_spotGeom, patinaMat, 58);
  const spot_dummy = new THREE.Object3D();
  const outward_axis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 58; i++) {
    const y = 0.92 + (((i * 37) % 100) / 100) * 3.05;
    const angle = i * 2.3999632297 + (i % 4) * 0.17;
    const radius = candleRadiusAt(y) + 0.003;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const width = 0.008 + ((i * 11) % 7) * 0.003;
    const height = 0.014 + ((i * 13) % 9) * 0.004;

    spot_dummy.position.set(normal.x * radius, y, normal.z * radius);
    spot_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
    spot_dummy.scale.set(width, height, 1);
    spot_dummy.updateMatrix();
    patina_spots.setMatrixAt(i, spot_dummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  root.add(patina_spots);

  const base_patina_spots = new THREE.InstancedMesh(patina_spotGeom, patinaMat, 24);
  for (let i = 0; i < 24; i++) {
    const y = 0.13 + (((i * 29) % 100) / 100) * 0.55;
    const angle = i * 2.173 + 0.35;
    let radius;
    let normalY;

    if (y < 0.22) {
      radius = 0.66;
      normalY = 0.08;
    } else if (y < 0.36) {
      radius = 0.54 - (y - 0.22) * 0.86;
      normalY = 0.35;
    } else {
      radius = 0.42 - (y - 0.36) * 0.72;
      normalY = 0.55;
    }

    const normal = new THREE.Vector3(
      Math.cos(angle),
      normalY,
      Math.sin(angle)
    ).normalize();
    const width = 0.012 + ((i * 7) % 6) * 0.004;
    const height = 0.018 + ((i * 17) % 7) * 0.005;

    spot_dummy.position.set(
      Math.cos(angle) * radius + normal.x * 0.004,
      y + normal.y * 0.004,
      Math.sin(angle) * radius + normal.z * 0.004
    );
    spot_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
    spot_dummy.scale.set(width, height, 1);
    spot_dummy.updateMatrix();
    base_patina_spots.setMatrixAt(i, spot_dummy.matrix);
  }
  base_patina_spots.instanceMatrix.needsUpdate = true;
  root.add(base_patina_spots);

  const wick_points = [
    new THREE.Vector3(0.000, 4.055, 0.000),
    new THREE.Vector3(-0.010, 4.145, 0.004),
    new THREE.Vector3(-0.045, 4.245, 0.008),
    new THREE.Vector3(-0.038, 4.340, 0.002),
    new THREE.Vector3(0.012, 4.425, -0.004),
    new THREE.Vector3(0.075, 4.485, -0.002),
    new THREE.Vector3(0.125, 4.515, 0.004),
  ];
  const wick_curve = new THREE.CatmullRomCurve3(wick_points);
  const wickGeom = new THREE.TubeGeometry(wick_curve, 32, 0.024, 8, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  root.add(wick);

  const wick_tipGeom = new THREE.SphereGeometry(0.032, 10, 7);
  const wick_tip = new THREE.Mesh(wick_tipGeom, wickMat);
  wick_tip.position.copy(wick_points[wick_points.length - 1]);
  wick_tip.scale.set(1.15, 0.8, 1.0);
  root.add(wick_tip);

  const wick_charGeom = new THREE.SphereGeometry(0.027, 8, 6);
  const wick_char = new THREE.InstancedMesh(wick_charGeom, wickMat, 5);
  for (let i = 0; i < 5; i++) {
    const t = 0.18 + i * 0.16;
    const point = wick_curve.getPoint(t);
    spot_dummy.position.copy(point);
    spot_dummy.quaternion.identity();
    spot_dummy.scale.set(
      0.8 + (i % 3) * 0.12,
      0.95 + (i % 2) * 0.18,
      0.8 + ((i + 1) % 3) * 0.1
    );
    spot_dummy.updateMatrix();
    wick_char.setMatrixAt(i, spot_dummy.matrix);
  }
  wick_char.instanceMatrix.needsUpdate = true;
  root.add(wick_char);

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