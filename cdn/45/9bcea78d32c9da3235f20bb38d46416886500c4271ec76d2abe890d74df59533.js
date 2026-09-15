export default function generate(THREE) {
  const root = new THREE.Group();

  const central_handleMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b2,
    metalness: 0.6,
    roughness: 0.4,
  });
  const upper_collarMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0ca,
    metalness: 0.6,
    roughness: 0.4,
  });
  const collar_seamMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.6,
    roughness: 0.4,
  });
  const upper_wiresMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0ca,
    metalness: 0.6,
    roughness: 0.4,
  });
  const lower_wire_loopMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0ca,
    metalness: 0.6,
    roughness: 0.4,
  });

  const central_handleProfile = [
    new THREE.Vector2(0.00, -2.72),
    new THREE.Vector2(0.15, -2.71),
    new THREE.Vector2(0.27, -2.66),
    new THREE.Vector2(0.34, -2.57),
    new THREE.Vector2(0.37, -2.45),
    new THREE.Vector2(0.37, -1.65),
    new THREE.Vector2(0.36, -0.75),
    new THREE.Vector2(0.34, 0.10),
    new THREE.Vector2(0.31, 0.62),
    new THREE.Vector2(0.29, 0.78),
    new THREE.Vector2(0.00, 0.78),
  ];
  const central_handleGeom = new THREE.LatheGeometry(central_handleProfile, 48);
  const central_handle = new THREE.Mesh(central_handleGeom, central_handleMat);
  root.add(central_handle);

  const upper_collarProfile = [
    new THREE.Vector2(0.00, 0.72),
    new THREE.Vector2(0.29, 0.72),
    new THREE.Vector2(0.34, 0.76),
    new THREE.Vector2(0.38, 0.86),
    new THREE.Vector2(0.40, 1.00),
    new THREE.Vector2(0.39, 1.14),
    new THREE.Vector2(0.35, 1.27),
    new THREE.Vector2(0.29, 1.34),
    new THREE.Vector2(0.00, 1.34),
  ];
  const upper_collarGeom = new THREE.LatheGeometry(upper_collarProfile, 48);
  const upper_collar = new THREE.Mesh(upper_collarGeom, upper_collarMat);
  root.add(upper_collar);

  const collar_seamGeom = new THREE.TorusGeometry(0.305, 0.012, 8, 48);
  const collar_seam = new THREE.Mesh(collar_seamGeom, collar_seamMat);
  collar_seam.rotation.x = Math.PI / 2;
  collar_seam.position.y = 0.735;
  root.add(collar_seam);

  const upper_wire_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.235, 1.285, 0),
    new THREE.Vector3(0.31, 1.62, 0),
    new THREE.Vector3(0.55, 2.18, 0),
    new THREE.Vector3(0.82, 2.82, 0),
    new THREE.Vector3(0.94, 3.43, 0),
    new THREE.Vector3(0.88, 4.00, 0),
    new THREE.Vector3(0.62, 4.49, 0),
    new THREE.Vector3(0.28, 4.78, 0),
    new THREE.Vector3(0.00, 4.90, 0),
  ], false, "centripetal");
  const upper_wiresGeom = new THREE.TubeGeometry(
    upper_wire_path,
    64,
    0.018,
    8,
    false
  );
  const upper_wire_count = 10;
  const upper_wires = new THREE.InstancedMesh(
    upper_wiresGeom,
    upper_wiresMat,
    upper_wire_count
  );
  const upper_wire_dummy = new THREE.Object3D();
  for (let i = 0; i < upper_wire_count; i++) {
    const angle = i / upper_wire_count * Math.PI * 2;
    upper_wire_dummy.position.set(0, 0, 0);
    upper_wire_dummy.rotation.set(0, angle, 0);
    upper_wire_dummy.scale.set(1, 1, 1);
    upper_wire_dummy.updateMatrix();
    upper_wires.setMatrixAt(i, upper_wire_dummy.matrix);
  }
  upper_wires.instanceMatrix.needsUpdate = true;
  root.add(upper_wires);

  const upper_wire_anchorGeom = new THREE.TorusGeometry(0.235, 0.014, 8, 40);
  const upper_wire_anchor = new THREE.Mesh(upper_wire_anchorGeom, upper_wiresMat);
  upper_wire_anchor.rotation.x = Math.PI / 2;
  upper_wire_anchor.position.y = 1.285;
  root.add(upper_wire_anchor);

  const lower_wire_loopPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.30, 0.76, 0),
    new THREE.Vector3(0.40, 0.20, 0),
    new THREE.Vector3(0.53, -0.65, 0),
    new THREE.Vector3(0.68, -1.55, 0),
    new THREE.Vector3(0.76, -2.25, 0),
    new THREE.Vector3(0.72, -2.62, 0),
    new THREE.Vector3(0.58, -2.87, 0),
    new THREE.Vector3(0.34, -3.04, 0),
    new THREE.Vector3(0.00, -3.10, 0),
    new THREE.Vector3(-0.34, -3.04, 0),
    new THREE.Vector3(-0.58, -2.87, 0),
    new THREE.Vector3(-0.72, -2.62, 0),
    new THREE.Vector3(-0.76, -2.25, 0),
    new THREE.Vector3(-0.68, -1.55, 0),
    new THREE.Vector3(-0.53, -0.65, 0),
    new THREE.Vector3(-0.40, 0.20, 0),
    new THREE.Vector3(-0.30, 0.76, 0),
  ], false, "centripetal");
  const lower_wire_loopGeom = new THREE.TubeGeometry(
    lower_wire_loopPath,
    96,
    0.026,
    8,
    false
  );
  const lower_wire_loop = new THREE.Mesh(lower_wire_loopGeom, lower_wire_loopMat);
  root.add(lower_wire_loop);

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