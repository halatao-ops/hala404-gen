export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x69d916,
    metalness: 0.0,
    roughness: 0.3,
  });
  const baseDarkMat = new THREE.MeshStandardMaterial({
    color: 0x45a90d,
    metalness: 0.0,
    roughness: 0.45,
  });
  const jarMat = new THREE.MeshStandardMaterial({
    color: 0xf4f5f7,
    metalness: 0.0,
    roughness: 0.45,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xf7f8fa,
    metalness: 0.0,
    roughness: 0.35,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.6,
    roughness: 0.25,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.55,
  });
  const dialFaceMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.65,
  });
  const markerMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    metalness: 0.0,
    roughness: 0.45,
  });

  const base_bodyProfile = [
    new THREE.Vector3(0.00, 0.16, 0),
    new THREE.Vector3(0.42, 0.16, 0),
    new THREE.Vector3(0.49, 0.18, 0),
    new THREE.Vector3(0.535, 0.24, 0),
    new THREE.Vector3(0.55, 0.34, 0),
    new THREE.Vector3(0.55, 0.78, 0),
    new THREE.Vector3(0.535, 0.91, 0),
    new THREE.Vector3(0.49, 1.00, 0),
    new THREE.Vector3(0.43, 1.045, 0),
    new THREE.Vector3(0.00, 1.045, 0),
  ];
  const base_bodyGeom = new THREE.LatheGeometry(base_bodyProfile);
  const base_body = new THREE.Mesh(base_bodyGeom, baseMat);
  root.add(base_body);

  const base_bottom_trimGeom = new THREE.TorusGeometry(0.495, 0.014, 10, 64);
  const base_bottom_trim = new THREE.Mesh(base_bottom_trimGeom, baseDarkMat);
  base_bottom_trim.rotation.x = Math.PI / 2;
  base_bottom_trim.position.y = 0.185;
  root.add(base_bottom_trim);

  const base_top_gasketGeom = new THREE.TorusGeometry(0.445, 0.018, 10, 64);
  const base_top_gasket = new THREE.Mesh(base_top_gasketGeom, blackMat);
  base_top_gasket.rotation.x = Math.PI / 2;
  base_top_gasket.position.y = 1.045;
  root.add(base_top_gasket);

  const footGeom = new THREE.CylinderGeometry(0.065, 0.075, 0.16, 16);
  const feet = new THREE.InstancedMesh(footGeom, blackMat, 4);
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-0.34, 0.08, 0.25],
    [0.34, 0.08, 0.25],
    [-0.34, 0.08, -0.25],
    [0.34, 0.08, -0.25],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(footPositions[i][0], footPositions[i][1], footPositions[i][2]);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  root.add(feet);

  const lower_chrome_bandGeom = new THREE.CylinderGeometry(0.475, 0.475, 0.075, 64);
  const lower_chrome_band = new THREE.Mesh(lower_chrome_bandGeom, chromeMat);
  lower_chrome_band.position.y = 1.085;
  root.add(lower_chrome_band);

  const lower_band_shadowGeom = new THREE.TorusGeometry(0.455, 0.012, 8, 64);
  const lower_band_shadow = new THREE.Mesh(lower_band_shadowGeom, blackMat);
  lower_band_shadow.rotation.x = Math.PI / 2;
  lower_band_shadow.position.y = 1.055;
  root.add(lower_band_shadow);

  const jar_bodyGeom = new THREE.CylinderGeometry(0.455, 0.455, 1.50, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, jarMat);
  jar_body.position.y = 1.85;
  root.add(jar_body);

  const upper_chrome_bandGeom = new THREE.CylinderGeometry(0.475, 0.475, 0.075, 64);
  const upper_chrome_band = new THREE.Mesh(upper_chrome_bandGeom, chromeMat);
  upper_chrome_band.position.y = 2.61;
  root.add(upper_chrome_band);

  const upper_band_shadowGeom = new THREE.TorusGeometry(0.455, 0.012, 8, 64);
  const upper_band_shadow = new THREE.Mesh(upper_band_shadowGeom, blackMat);
  upper_band_shadow.rotation.x = Math.PI / 2;
  upper_band_shadow.position.y = 2.575;
  root.add(upper_band_shadow);

  const top_lidProfile = [
    new THREE.Vector3(0.00, 2.635, 0),
    new THREE.Vector3(0.43, 2.635, 0),
    new THREE.Vector3(0.475, 2.655, 0),
    new THREE.Vector3(0.49, 2.69, 0),
    new THREE.Vector3(0.485, 2.72, 0),
    new THREE.Vector3(0.44, 2.75, 0),
    new THREE.Vector3(0.34, 2.77, 0),
    new THREE.Vector3(0.00, 2.77, 0),
  ];
  const top_lidGeom = new THREE.LatheGeometry(top_lidProfile);
  const top_lid = new THREE.Mesh(top_lidGeom, lidMat);
  root.add(top_lid);

  const lid_center_ringGeom = new THREE.TorusGeometry(0.255, 0.018, 10, 64);
  const lid_center_ring = new THREE.Mesh(lid_center_ringGeom, lidMat);
  lid_center_ring.rotation.x = Math.PI / 2;
  lid_center_ring.position.y = 2.785;
  root.add(lid_center_ring);

  const lid_recessGeom = new THREE.CylinderGeometry(0.225, 0.225, 0.008, 64);
  const lid_recess = new THREE.Mesh(lid_recessGeom, new THREE.MeshStandardMaterial({
    color: 0xdfe2e8,
    metalness: 0.0,
    roughness: 0.45,
  }));
  lid_recess.position.y = 2.778;
  root.add(lid_recess);

  const dialCenterY = 0.56;

  const dial_bezelGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.045, 48);
  const dial_bezel = new THREE.Mesh(dial_bezelGeom, chromeMat);
  dial_bezel.rotation.x = Math.PI / 2;
  dial_bezel.position.set(0, dialCenterY, 0.548);
  root.add(dial_bezel);

  const dial_faceGeom = new THREE.CylinderGeometry(0.164, 0.164, 0.018, 48);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialFaceMat);
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.set(0, dialCenterY, 0.574);
  root.add(dial_face);

  const dial_outer_ringGeom = new THREE.TorusGeometry(0.174, 0.011, 10, 64);
  const dial_outer_ring = new THREE.Mesh(dial_outer_ringGeom, chromeMat);
  dial_outer_ring.position.set(0, dialCenterY, 0.586);
  root.add(dial_outer_ring);

  const dial_inner_ringGeom = new THREE.TorusGeometry(0.153, 0.004, 8, 64);
  const dial_inner_ring = new THREE.Mesh(dial_inner_ringGeom, blackMat);
  dial_inner_ring.position.set(0, dialCenterY, 0.588);
  root.add(dial_inner_ring);

  const dial_tickGeom = new THREE.BoxGeometry(0.008, 0.025, 0.006);
  const dial_ticks = new THREE.InstancedMesh(dial_tickGeom, markerMat, 13);
  const tickDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    const angle = -2.35 + (4.70 * i) / 12;
    const radius = 0.132;
    tickDummy.position.set(
      Math.sin(angle) * radius,
      dialCenterY + Math.cos(angle) * radius,
      0.591
    );
    tickDummy.rotation.set(0, 0, -angle);
    tickDummy.updateMatrix();
    dial_ticks.setMatrixAt(i, tickDummy.matrix);
  }
  root.add(dial_ticks);

  const dial_pointerGeom = new THREE.BoxGeometry(0.034, 0.145, 0.026);
  const dial_pointer = new THREE.Mesh(dial_pointerGeom, dialMat);
  dial_pointer.position.set(0, dialCenterY + 0.025, 0.602);
  root.add(dial_pointer);

  const dial_pointer_tipGeom = new THREE.SphereGeometry(0.023, 16, 10);
  const dial_pointer_tip = new THREE.Mesh(dial_pointer_tipGeom, dialMat);
  dial_pointer_tip.scale.set(0.75, 1.0, 0.55);
  dial_pointer_tip.position.set(0, dialCenterY + 0.102, 0.603);
  root.add(dial_pointer_tip);

  const dial_zero_markerGeom = new THREE.BoxGeometry(0.025, 0.006, 0.006);
  const dial_zero_marker = new THREE.Mesh(dial_zero_markerGeom, markerMat);
  dial_zero_marker.position.set(0, dialCenterY + 0.145, 0.593);
  root.add(dial_zero_marker);

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