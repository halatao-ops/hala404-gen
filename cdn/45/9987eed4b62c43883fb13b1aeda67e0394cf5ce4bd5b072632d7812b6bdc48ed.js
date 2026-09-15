export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.7,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0x1c1c1c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const spout_openingMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.4,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, -0.01),
    new THREE.Vector2(0.58, -0.01),
    new THREE.Vector2(0.68, 0.00),
    new THREE.Vector2(0.73, 0.04),
    new THREE.Vector2(0.75, 0.11),
    new THREE.Vector2(0.74, 0.20),
    new THREE.Vector2(0.70, 0.48),
    new THREE.Vector2(0.65, 0.78),
    new THREE.Vector2(0.60, 1.08),
    new THREE.Vector2(0.55, 1.34),
    new THREE.Vector2(0.52, 1.50),
    new THREE.Vector2(0.51, 1.56),
    new THREE.Vector2(0.00, 1.56),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const base_rimGeom = new THREE.TorusGeometry(0.68, 0.018, 10, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, bodyMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.015;
  root.add(base_rim);

  const lid_gasketGeom = new THREE.TorusGeometry(0.485, 0.018, 10, 64);
  const lid_gasket = new THREE.Mesh(lid_gasketGeom, spout_openingMat);
  lid_gasket.rotation.x = Math.PI / 2;
  lid_gasket.position.y = 1.565;
  root.add(lid_gasket);

  const lidProfile = [
    new THREE.Vector2(0.00, 1.55),
    new THREE.Vector2(0.44, 1.55),
    new THREE.Vector2(0.50, 1.57),
    new THREE.Vector2(0.53, 1.61),
    new THREE.Vector2(0.52, 1.66),
    new THREE.Vector2(0.48, 1.71),
    new THREE.Vector2(0.40, 1.75),
    new THREE.Vector2(0.28, 1.775),
    new THREE.Vector2(0.14, 1.785),
    new THREE.Vector2(0.00, 1.785),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, lidMat);
  root.add(lid);

  const lid_tabGeom = new THREE.CapsuleGeometry(0.045, 0.18, 5, 12);
  const lid_tab = new THREE.Mesh(lid_tabGeom, lidMat);
  lid_tab.rotation.z = Math.PI / 2;
  lid_tab.scale.set(0.72, 1, 1.35);
  lid_tab.position.set(0.60, 1.625, 0.015);
  root.add(lid_tab);

  const spoutCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.50, 0.48, 0.00),
    new THREE.Vector3(-0.66, 0.64, 0.00),
    new THREE.Vector3(-1.06, 1.18, 0.00),
    new THREE.Vector3(-1.34, 1.30, 0.00)
  );
  const spoutGeom = createTaperedTubeGeometry(THREE, spoutCurve, 0.235, 0.145, 28, 24);
  const spout = new THREE.Mesh(spoutGeom, bodyMat);
  root.add(spout);

  const spoutTip = spoutCurve.getPoint(1);
  const spoutTangent = spoutCurve.getTangent(1).normalize();
  const spoutOrientation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutTangent
  );

  const spout_openingGeom = new THREE.CircleGeometry(0.118, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, spout_openingMat);
  spout_opening.quaternion.copy(spoutOrientation);
  spout_opening.position.copy(spoutTip).addScaledVector(spoutTangent, 0.004);
  root.add(spout_opening);

  const spout_lipGeom = new THREE.TorusGeometry(0.128, 0.018, 10, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, bodyMat);
  spout_lip.quaternion.copy(spoutOrientation);
  spout_lip.position.copy(spoutTip).addScaledVector(spoutTangent, 0.008);
  root.add(spout_lip);

  const handleCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0.50, 1.39, -0.02),
    new THREE.Vector3(0.92, 1.50, -0.02),
    new THREE.Vector3(1.38, 0.76, -0.02),
    new THREE.Vector3(1.00, 0.34, -0.02)
  );
  const handleGeom = new THREE.TubeGeometry(handleCurve, 56, 0.095, 18, false);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  root.add(handle);

  const handleStart = handleCurve.getPoint(0);
  const handleStartTangent = handleCurve.getTangent(0).normalize();
  const handle_root_collarGeom = new THREE.CylinderGeometry(0.112, 0.125, 0.16, 24);
  const handle_root_collar = new THREE.Mesh(handle_root_collarGeom, handleMat);
  handle_root_collar.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    handleStartTangent
  );
  handle_root_collar.position.copy(handleStart).addScaledVector(handleStartTangent, 0.035);
  root.add(handle_root_collar);

  const handleEnd = handleCurve.getPoint(1);
  const handleEndTangent = handleCurve.getTangent(1).normalize();
  const handle_end_capGeom = new THREE.SphereGeometry(0.098, 24, 14);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, handleMat);
  handle_end_cap.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    handleEndTangent
  );
  handle_end_cap.scale.set(1, 1.22, 1);
  handle_end_cap.position.copy(handleEnd);
  root.add(handle_end_cap);

  fitToUnitCube(THREE, root);
  return root;
}

function createTaperedTubeGeometry(THREE, curve, startRadius, endRadius, lengthSegments, radialSegments) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  const fixedReference = new THREE.Vector3(0, 0, 1);
  const alternativeReference = new THREE.Vector3(1, 0, 0);

  for (let i = 0; i <= lengthSegments; i++) {
    const t = i / lengthSegments;
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();
    const reference = Math.abs(tangent.z) < 0.9
      ? fixedReference
      : alternativeReference;
    const side = new THREE.Vector3().crossVectors(tangent, reference).normalize();
    const binormal = new THREE.Vector3().crossVectors(side, tangent).normalize();
    const radius = startRadius + (endRadius - startRadius) * t;

    for (let j = 0; j <= radialSegments; j++) {
      const angle = j / radialSegments * Math.PI * 2;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const radialNormal = side.clone().multiplyScalar(cosAngle)
        .addScaledVector(binormal, sinAngle)
        .normalize();

      positions.push(
        point.x + radialNormal.x * radius,
        point.y + radialNormal.y * radius,
        point.z + radialNormal.z * radius
      );
      normals.push(radialNormal.x, radialNormal.y, radialNormal.z);
      uvs.push(t, j / radialSegments);
    }
  }

  const ringSize = radialSegments + 1;
  for (let i = 0; i < lengthSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * ringSize + j;
      const b = (i + 1) * ringSize + j;
      const c = (i + 1) * ringSize + j + 1;
      const d = i * ringSize + j + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
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