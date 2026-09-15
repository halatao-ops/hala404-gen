export default function generate(THREE) {
  const root = new THREE.Group();

  const waxMat = new THREE.MeshStandardMaterial({
    color: 0xe0b64f,
    metalness: 0.0,
    roughness: 0.48,
  });
  const waxLightMat = new THREE.MeshStandardMaterial({
    color: 0xf0ca68,
    metalness: 0.0,
    roughness: 0.5,
  });
  const waxDarkMat = new THREE.MeshStandardMaterial({
    color: 0xc99a35,
    metalness: 0.0,
    roughness: 0.55,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0xe8d59a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const wickTipMat = new THREE.MeshStandardMaterial({
    color: 0xcbb77c,
    metalness: 0.0,
    roughness: 0.85,
  });

  const candle_bodyProfile = [
    new THREE.Vector3(0.00, 0.00, 0),
    new THREE.Vector3(0.34, 0.00, 0),
    new THREE.Vector3(0.39, 0.025, 0),
    new THREE.Vector3(0.415, 0.08, 0),
    new THREE.Vector3(0.42, 0.18, 0),
    new THREE.Vector3(0.42, 4.34, 0),
    new THREE.Vector3(0.415, 4.40, 0),
    new THREE.Vector3(0.38, 4.47, 0),
    new THREE.Vector3(0.31, 4.54, 0),
    new THREE.Vector3(0.25, 4.64, 0),
    new THREE.Vector3(0.20, 4.78, 0),
    new THREE.Vector3(0.15, 4.94, 0),
    new THREE.Vector3(0.105, 5.08, 0),
    new THREE.Vector3(0.07, 5.17, 0),
    new THREE.Vector3(0.00, 5.18, 0),
  ];
  const candle_bodyGeom = new THREE.LatheGeometry(candle_bodyProfile, 48);
  const candle_body = new THREE.Mesh(candle_bodyGeom, waxMat);
  root.add(candle_body);

  const bottom_wax_rimGeom = new THREE.TorusGeometry(0.392, 0.012, 8, 48);
  const bottom_wax_rim = new THREE.Mesh(bottom_wax_rimGeom, waxDarkMat);
  bottom_wax_rim.rotation.x = Math.PI / 2;
  bottom_wax_rim.position.y = 0.035;
  root.add(bottom_wax_rim);

  const shoulder_wax_ridgeGeom = new THREE.TorusGeometry(0.386, 0.007, 6, 48);
  const shoulder_wax_ridge = new THREE.Mesh(shoulder_wax_ridgeGeom, waxLightMat);
  shoulder_wax_ridge.rotation.x = Math.PI / 2;
  shoulder_wax_ridge.position.y = 4.445;
  root.add(shoulder_wax_ridge);

  const wax_dripsGeom = new THREE.SphereGeometry(1, 12, 8);
  const wax_drips = new THREE.InstancedMesh(wax_dripsGeom, waxLightMat, 4);
  const dripDummy = new THREE.Object3D();
  const dripData = [
    [0.72, 3.98, 0.020, 0.22],
    [1.78, 3.18, 0.016, 0.16],
    [2.62, 4.10, 0.014, 0.13],
    [5.18, 3.55, 0.012, 0.18],
  ];
  for (let i = 0; i < dripData.length; i++) {
    const angle = dripData[i][0];
    const y = dripData[i][1];
    const w = dripData[i][2];
    const h = dripData[i][3];
    dripDummy.position.set(Math.cos(angle) * 0.423, y, Math.sin(angle) * 0.423);
    dripDummy.scale.set(w, h, w * 0.55);
    dripDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dripDummy.updateMatrix();
    wax_drips.setMatrixAt(i, dripDummy.matrix);
  }
  wax_drips.instanceMatrix.needsUpdate = true;
  root.add(wax_drips);

  const wax_specklesGeom = new THREE.SphereGeometry(1, 6, 4);
  const wax_speckles = new THREE.InstancedMesh(wax_specklesGeom, waxLightMat, 72);
  const speckleDummy = new THREE.Object3D();
  for (let i = 0; i < 72; i++) {
    const angle = i * 2.3999632297;
    const y = 0.22 + (((i * 37) % 100) / 100) * 4.02;
    const size = 0.0045 + (i % 5) * 0.0012;
    speckleDummy.position.set(Math.cos(angle) * 0.421, y, Math.sin(angle) * 0.421);
    speckleDummy.scale.set(size, size * 1.4, size * 0.45);
    speckleDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    speckleDummy.updateMatrix();
    wax_speckles.setMatrixAt(i, speckleDummy.matrix);
  }
  wax_speckles.instanceMatrix.needsUpdate = true;
  root.add(wax_speckles);

  const wick_baseGeom = new THREE.SphereGeometry(0.075, 16, 10);
  const wick_base = new THREE.Mesh(wick_baseGeom, waxDarkMat);
  wick_base.scale.set(0.8, 0.55, 0.8);
  wick_base.position.set(0, 5.145, 0.005);
  root.add(wick_base);

  const wickPath = [
    new THREE.Vector3(0.000, 5.10, 0.005),
    new THREE.Vector3(0.000, 5.28, 0.008),
    new THREE.Vector3(-0.015, 5.45, 0.012),
    new THREE.Vector3(0.015, 5.60, 0.018),
    new THREE.Vector3(0.105, 5.72, 0.025),
    new THREE.Vector3(0.235, 5.80, 0.032),
    new THREE.Vector3(0.365, 5.84, 0.038),
  ];
  const wickCurve = new THREE.CatmullRomCurve3(wickPath, false, "centripetal");
  const wickGeom = new THREE.TubeGeometry(wickCurve, 36, 0.045, 10, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  root.add(wick);

  const wick_tipGeom = new THREE.SphereGeometry(0.055, 12, 8);
  const wick_tip = new THREE.Mesh(wick_tipGeom, wickTipMat);
  wick_tip.scale.set(1.15, 0.8, 0.9);
  wick_tip.position.set(0.365, 5.84, 0.038);
  root.add(wick_tip);

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