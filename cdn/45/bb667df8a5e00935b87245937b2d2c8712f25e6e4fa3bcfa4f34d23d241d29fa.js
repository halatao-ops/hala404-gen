export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7e5dc,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 0.12,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const stemGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8cbb7,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.82,
    thickness: 0.08,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b5,
    metalness: 0.6,
    roughness: 0.4
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.5,
    roughness: 0.45
  });

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.4
  });

  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8
  });

  const filamentMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c5,
    emissive: 0xffc34f,
    emissiveIntensity: 2.8,
    metalness: 0.0,
    roughness: 0.35
  });

  const filamentCoreMat = new THREE.MeshBasicMaterial({
    color: 0xffffee
  });

  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffc85a,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  function addWire(points, radius, material) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, points.length === 2 ? 1 : 12, radius, 6, false);
    const wire = new THREE.Mesh(geometry, material);
    root.add(wire);
    return wire;
  }

  const base_shell = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.39, 0.62, 48), metalMat);
  base_shell.position.set(0, -0.82, 0);
  root.add(base_shell);

  const top_contact_plate = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.045, 48), darkMetalMat);
  top_contact_plate.position.set(0, -0.5, 0);
  root.add(top_contact_plate);

  const bottom_insulator = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.18, 0.18, 32), blackMat);
  bottom_insulator.position.set(0, -1.2, 0);
  root.add(bottom_insulator);

  const bottom_tip = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 12), blackMat);
  bottom_tip.scale.set(1, 0.55, 1);
  bottom_tip.position.set(0, -1.31, 0);
  root.add(bottom_tip);

  const thread_ridgeGeom = new THREE.TorusGeometry(0.405, 0.035, 10, 48);
  const thread_ridges = new THREE.InstancedMesh(thread_ridgeGeom, metalMat, 5);
  const ridgeDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    ridgeDummy.position.set(0, -0.61 - i * 0.105, 0);
    ridgeDummy.rotation.set(Math.PI / 2, 0, 0);
    ridgeDummy.updateMatrix();
    thread_ridges.setMatrixAt(i, ridgeDummy.matrix);
  }
  root.add(thread_ridges);

  const thread_grooveGeom = new THREE.TorusGeometry(0.407, 0.012, 8, 48);
  const thread_grooves = new THREE.InstancedMesh(thread_grooveGeom, darkMetalMat, 4);
  const grooveDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    grooveDummy.position.set(0, -0.665 - i * 0.105, 0);
    grooveDummy.rotation.set(Math.PI / 2, 0, 0);
    grooveDummy.updateMatrix();
    thread_grooves.setMatrixAt(i, grooveDummy.matrix);
  }
  root.add(thread_grooves);

  const glassProfile = [
    new THREE.Vector2(0.34, -0.52),
    new THREE.Vector2(0.42, -0.46),
    new THREE.Vector2(0.5, -0.3),
    new THREE.Vector2(0.62, -0.02),
    new THREE.Vector2(0.78, 0.35),
    new THREE.Vector2(0.9, 0.75),
    new THREE.Vector2(0.9, 1.08),
    new THREE.Vector2(0.82, 1.38),
    new THREE.Vector2(0.65, 1.62),
    new THREE.Vector2(0.38, 1.77),
    new THREE.Vector2(0.0, 1.82)
  ];
  const glass_envelope = new THREE.Mesh(new THREE.LatheGeometry(glassProfile, 64), glassMat);
  root.add(glass_envelope);

  const glass_neck_ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.025, 10, 48), glassMat);
  glass_neck_ring.rotation.x = Math.PI / 2;
  glass_neck_ring.position.set(0, -0.5, 0);
  root.add(glass_neck_ring);

  const stem_column = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.62, 24), stemGlassMat);
  stem_column.position.set(0, -0.18, 0);
  root.add(stem_column);

  const stem_flare = new THREE.Mesh(new THREE.SphereGeometry(0.18, 28, 16), stemGlassMat);
  stem_flare.scale.set(1, 0.72, 1);
  stem_flare.position.set(0, 0.12, 0);
  root.add(stem_flare);

  const central_glass_bead = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 12), stemGlassMat);
  central_glass_bead.position.set(0, 0.25, 0.02);
  root.add(central_glass_bead);

  const left_support_wire = addWire([
    new THREE.Vector3(-0.05, 0.1, 0),
    new THREE.Vector3(-0.22, 0.28, 0.02),
    new THREE.Vector3(-0.43, 0.36, 0.04)
  ], 0.012, copperMat);

  const right_support_wire = addWire([
    new THREE.Vector3(0.05, 0.1, 0),
    new THREE.Vector3(0.22, 0.28, 0.02),
    new THREE.Vector3(0.43, 0.36, 0.04)
  ], 0.012, copperMat);

  const rear_support_wire = addWire([
    new THREE.Vector3(0, 0.12, -0.04),
    new THREE.Vector3(0, 0.32, -0.2),
    new THREE.Vector3(0, 0.42, -0.34)
  ], 0.01, copperMat);

  const top_crossbar = addWire([
    new THREE.Vector3(-0.48, 1.08, 0.06),
    new THREE.Vector3(0.48, 1.08, 0.06)
  ], 0.012, copperMat);

  const top_hook_left = addWire([
    new THREE.Vector3(-0.43, 1.08, 0.06),
    new THREE.Vector3(-0.45, 1.16, 0.06)
  ], 0.01, copperMat);

  const top_hook_right = addWire([
    new THREE.Vector3(0.43, 1.08, 0.06),
    new THREE.Vector3(0.45, 1.16, 0.06)
  ], 0.01, copperMat);

  const center_feed_wire = addWire([
    new THREE.Vector3(0, 0.22, 0),
    new THREE.Vector3(0, 1.08, 0)
  ], 0.012, copperMat);

  const filamentGeom = new THREE.CylinderGeometry(0.018, 0.018, 1, 10);
  const filamentCoreGeom = new THREE.CylinderGeometry(0.007, 0.007, 1, 8);
  const glowGeom = new THREE.CylinderGeometry(0.045, 0.045, 1, 10);

  const filamentData = [
    [-0.38, 0.55, 0.12, 1.42],
    [-0.27, 0.62, -0.12, 1.28],
    [-0.14, 0.66, 0.18, 1.48],
    [0.0, 0.68, -0.18, 1.5],
    [0.14, 0.66, 0.18, 1.48],
    [0.27, 0.62, -0.12, 1.28],
    [0.38, 0.55, 0.12, 1.42],
    [-0.07, 0.7, 0.0, 1.18],
    [0.07, 0.7, 0.0, 1.18]
  ];

  const glowing_filaments = new THREE.InstancedMesh(filamentGeom, filamentMat, filamentData.length);
  const filament_cores = new THREE.InstancedMesh(filamentCoreGeom, filamentCoreMat, filamentData.length);
  const filament_glow = new THREE.InstancedMesh(glowGeom, glowMat, filamentData.length);
  const filamentDummy = new THREE.Object3D();

  for (let i = 0; i < filamentData.length; i++) {
    const data = filamentData[i];
    const x = data[0];
    const z = data[1];
    const bottomY = data[2];
    const length = data[3];
    const topY = bottomY + length;

    filamentDummy.position.set(x, bottomY + length / 2, z);
    filamentDummy.rotation.set(0, 0, 0);
    filamentDummy.scale.set(1, length, 1);
    filamentDummy.updateMatrix();
    glowing_filaments.setMatrixAt(i, filamentDummy.matrix);

    filamentDummy.scale.set(1, length * 0.96, 1);
    filamentDummy.updateMatrix();
    filament_cores.setMatrixAt(i, filamentDummy.matrix);

    filamentDummy.scale.set(1, length * 1.02, 1);
    filamentDummy.updateMatrix();
    filament_glow.setMatrixAt(i, filamentDummy.matrix);
  }
  root.add(filament_glow);
  root.add(glowing_filaments);
  root.add(filament_cores);

  const lower_anchorGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const lower_anchor_beads = new THREE.InstancedMesh(lower_anchorGeom, copperMat, filamentData.length);
  const anchorDummy = new THREE.Object3D();
  for (let i = 0; i < filamentData.length; i++) {
    anchorDummy.position.set(filamentData[i][0], filamentData[i][2], filamentData[i][1]);
    anchorDummy.updateMatrix();
    lower_anchor_beads.setMatrixAt(i, anchorDummy.matrix);
  }
  root.add(lower_anchor_beads);

  const upper_anchor_beads = new THREE.InstancedMesh(lower_anchorGeom, copperMat, filamentData.length);
  for (let i = 0; i < filamentData.length; i++) {
    const data = filamentData[i];
    anchorDummy.position.set(data[0], data[2] + data[3], data[1]);
    anchorDummy.updateMatrix();
    upper_anchor_beads.setMatrixAt(i, anchorDummy.matrix);
  }
  root.add(upper_anchor_beads);

  const left_glass_highlight = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.72), highlightMat);
  left_glass_highlight.position.set(-0.48, 0.78, 0.76);
  left_glass_highlight.rotation.z = -0.18;
  root.add(left_glass_highlight);

  const right_glass_highlight = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.58), highlightMat);
  right_glass_highlight.position.set(0.5, 0.72, 0.75);
  right_glass_highlight.rotation.z = 0.2;
  root.add(right_glass_highlight);

  const top_glass_highlight = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.12), highlightMat);
  top_glass_highlight.position.set(-0.12, 1.48, 0.66);
  top_glass_highlight.rotation.z = -0.08;
  root.add(top_glass_highlight);

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