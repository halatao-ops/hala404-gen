export default function generate(THREE) {
  const root = new THREE.Group();
  const tool = new THREE.Group();
  root.add(tool);

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc5c5c5,
    metalness: 0.6,
    roughness: 0.4,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.6,
    roughness: 0.28,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3f3f3f,
    metalness: 0.5,
    roughness: 0.5,
  });

  const handleProfile = [
    { y: -1.38, r: 0.15 },
    { y: -1.30, r: 0.23 },
    { y: -1.18, r: 0.31 },
    { y: -1.00, r: 0.38 },
    { y: -0.70, r: 0.43 },
    { y: -0.35, r: 0.46 },
    { y: 0.05, r: 0.45 },
    { y: 0.38, r: 0.42 },
    { y: 0.68, r: 0.36 },
    { y: 0.95, r: 0.29 },
    { y: 1.18, r: 0.22 },
    { y: 1.36, r: 0.17 },
    { y: 1.52, r: 0.15 },
    { y: 1.62, r: 0.17 },
  ];

  const handleBodyGeom = createProfileGeometry(THREE, handleProfile, 48);
  const handle_body = new THREE.Mesh(handleBodyGeom, brushed_metalMat);
  tool.add(handle_body);

  const lower_collarGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.055, 40);
  const lower_collar = new THREE.Mesh(lower_collarGeom, polished_metalMat);
  lower_collar.position.y = -1.305;
  tool.add(lower_collar);

  const collar_grooveGeom = new THREE.TorusGeometry(0.225, 0.012, 8, 40);
  const collar_groove = new THREE.Mesh(collar_grooveGeom, dark_metalMat);
  collar_groove.rotation.x = Math.PI / 2;
  collar_groove.position.y = -1.34;
  tool.add(collar_groove);

  const lower_taperGeom = new THREE.CylinderGeometry(0.15, 0.075, 0.27, 32);
  const lower_taper = new THREE.Mesh(lower_taperGeom, polished_metalMat);
  lower_taper.position.y = -1.455;
  tool.add(lower_taper);

  const shaftGeom = new THREE.CylinderGeometry(0.075, 0.075, 1.34, 28);
  const shaft = new THREE.Mesh(shaftGeom, polished_metalMat);
  shaft.position.y = -2.205;
  tool.add(shaft);

  const tip_bandGeom = new THREE.CylinderGeometry(0.088, 0.088, 0.045, 28);
  const tip_band = new THREE.Mesh(tip_bandGeom, dark_metalMat);
  tip_band.position.y = -2.875;
  tool.add(tip_band);

  const pointed_tipGeom = new THREE.ConeGeometry(0.09, 0.34, 28);
  const pointed_tip = new THREE.Mesh(pointed_tipGeom, polished_metalMat);
  pointed_tip.rotation.z = Math.PI;
  pointed_tip.position.y = -3.065;
  tool.add(pointed_tip);

  const top_capGeom = new THREE.SphereGeometry(1, 40, 20);
  const top_cap = new THREE.Mesh(top_capGeom, polished_metalMat);
  top_cap.scale.set(0.235, 0.145, 0.215);
  top_cap.position.y = 1.72;
  tool.add(top_cap);

  const top_faceGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.018, 36);
  const top_face = new THREE.Mesh(top_faceGeom, brushed_metalMat);
  top_face.position.y = 1.855;
  tool.add(top_face);

  const top_rimGeom = new THREE.TorusGeometry(0.145, 0.012, 8, 36);
  const top_rim = new THREE.Mesh(top_rimGeom, polished_metalMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 1.866;
  tool.add(top_rim);

  const top_markGeom = new THREE.TorusGeometry(0.035, 0.007, 6, 18);
  const top_marks = new THREE.InstancedMesh(top_markGeom, dark_metalMat, 2);
  const markDummy = new THREE.Object3D();
  const markPositions = [
    [-0.045, 1.871, -0.025, 0.15],
    [0.045, 1.871, 0.025, -0.15],
  ];
  for (let i = 0; i < markPositions.length; i++) {
    const p = markPositions[i];
    markDummy.position.set(p[0], p[1], p[2]);
    markDummy.rotation.set(Math.PI / 2, 0, p[3]);
    markDummy.scale.set(1, 0.65, 1);
    markDummy.updateMatrix();
    top_marks.setMatrixAt(i, markDummy.matrix);
  }
  top_marks.instanceMatrix.needsUpdate = true;
  tool.add(top_marks);

  const top_dimpleGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.009, 14);
  const top_dimple = new THREE.Mesh(top_dimpleGeom, dark_metalMat);
  top_dimple.position.set(0, 1.872, 0);
  tool.add(top_dimple);

  tool.rotation.z = -0.72;
  tool.rotation.x = 0.08;

  fitToUnitCube(THREE, root);
  return root;
}

function createProfileGeometry(THREE, profile, segments) {
  const positions = [];
  const indices = [];

  for (let i = 0; i < profile.length; i++) {
    const point = profile[i];
    for (let j = 0; j < segments; j++) {
      const angle = j / segments * Math.PI * 2;
      positions.push(
        Math.cos(angle) * point.r,
        point.y,
        Math.sin(angle) * point.r
      );
    }
  }

  for (let i = 0; i < profile.length - 1; i++) {
    for (let j = 0; j < segments; j++) {
      const next = (j + 1) % segments;
      const a = i * segments + j;
      const b = i * segments + next;
      const c = (i + 1) * segments + next;
      const d = (i + 1) * segments + j;
      indices.push(a, d, b, b, d, c);
    }
  }

  const bottom = profile[0];
  const bottomCenter = positions.length / 3;
  positions.push(0, bottom.y, 0);
  for (let j = 0; j < segments; j++) {
    indices.push(bottomCenter, j, (j + 1) % segments);
  }

  const top = profile[profile.length - 1];
  const topCenter = positions.length / 3;
  positions.push(0, top.y, 0);
  const topOffset = (profile.length - 1) * segments;
  for (let j = 0; j < segments; j++) {
    indices.push(
      topCenter,
      topOffset + (j + 1) % segments,
      topOffset + j
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}