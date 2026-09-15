export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 1.0,
    thickness: 0.05,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const edgeGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c5c2,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.98,
    thickness: 0.12,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const bottle_profile = [
    { r: 0.69, y: 0.06 },
    { r: 0.76, y: 0.08 },
    { r: 0.81, y: 0.13 },
    { r: 0.84, y: 0.22 },
    { r: 0.85, y: 0.36 },
    { r: 0.85, y: 2.28 },
    { r: 0.84, y: 2.43 },
    { r: 0.81, y: 2.58 },
    { r: 0.76, y: 2.73 },
    { r: 0.69, y: 2.88 },
    { r: 0.60, y: 3.02 },
    { r: 0.50, y: 3.14 },
    { r: 0.42, y: 3.24 },
    { r: 0.37, y: 3.35 },
    { r: 0.35, y: 3.48 },
    { r: 0.35, y: 3.82 },
    { r: 0.36, y: 3.91 },
    { r: 0.39, y: 3.96 },
    { r: 0.46, y: 4.00 },
    { r: 0.49, y: 4.06 },
    { r: 0.48, y: 4.12 },
    { r: 0.44, y: 4.17 },
    { r: 0.37, y: 4.19 },
    { r: 0.33, y: 4.17 },
    { r: 0.31, y: 4.13 },
    { r: 0.31, y: 4.08 },
    { r: 0.33, y: 4.04 },
    { r: 0.36, y: 4.00 },
    { r: 0.34, y: 3.94 },
    { r: 0.325, y: 3.84 },
    { r: 0.325, y: 3.48 },
    { r: 0.34, y: 3.36 },
    { r: 0.39, y: 3.25 },
    { r: 0.47, y: 3.14 },
    { r: 0.57, y: 3.01 },
    { r: 0.66, y: 2.87 },
    { r: 0.73, y: 2.72 },
    { r: 0.78, y: 2.57 },
    { r: 0.80, y: 2.42 },
    { r: 0.81, y: 2.28 },
    { r: 0.81, y: 0.36 },
    { r: 0.80, y: 0.27 },
    { r: 0.77, y: 0.21 },
    { r: 0.70, y: 0.17 },
    { r: 0.62, y: 0.15 },
    { r: 0.69, y: 0.06 }
  ];

  const bottle_shellGeo = createLoftGeometry(THREE, bottle_profile, 64);
  const bottle_shell = new THREE.Mesh(bottle_shellGeo, glassMat);
  root.add(bottle_shell);

  const rolled_lipGeom = new THREE.TorusGeometry(0.405, 0.085, 18, 64);
  const rolled_lip = new THREE.Mesh(rolled_lipGeom, edgeGlassMat);
  rolled_lip.rotation.x = Math.PI / 2;
  rolled_lip.position.y = 4.075;
  root.add(rolled_lip);

  const neck_collarGeom = new THREE.TorusGeometry(0.365, 0.018, 10, 64);
  const neck_collar = new THREE.Mesh(neck_collarGeom, edgeGlassMat);
  neck_collar.rotation.x = Math.PI / 2;
  neck_collar.position.y = 3.925;
  root.add(neck_collar);

  const mouth_rimGeom = new THREE.RingGeometry(0.315, 0.375, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, edgeGlassMat);
  mouth_rim.rotation.x = -Math.PI / 2;
  mouth_rim.position.y = 4.188;
  root.add(mouth_rim);

  const inner_mouth_edgeGeom = new THREE.TorusGeometry(0.322, 0.012, 10, 64);
  const inner_mouth_edge = new THREE.Mesh(inner_mouth_edgeGeom, edgeGlassMat);
  inner_mouth_edge.rotation.x = Math.PI / 2;
  inner_mouth_edge.position.y = 4.165;
  root.add(inner_mouth_edge);

  const base_ringGeom = new THREE.TorusGeometry(0.755, 0.045, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, edgeGlassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.125;
  root.add(base_ring);

  const inner_bottom_ringGeom = new THREE.TorusGeometry(0.615, 0.018, 8, 64);
  const inner_bottom_ring = new THREE.Mesh(inner_bottom_ringGeom, edgeGlassMat);
  inner_bottom_ring.rotation.x = Math.PI / 2;
  inner_bottom_ring.position.y = 0.165;
  root.add(inner_bottom_ring);

  const bottom_puntGeom = new THREE.TorusGeometry(0.075, 0.011, 8, 32);
  const bottom_punt = new THREE.Mesh(bottom_puntGeom, edgeGlassMat);
  bottom_punt.rotation.x = Math.PI / 2;
  bottom_punt.position.y = 0.172;
  root.add(bottom_punt);

  fitToUnitCube(THREE, root);
  return root;
}

function createLoftGeometry(THREE, sections, segments) {
  const positions = [];
  const indices = [];

  for (let s = 0; s < sections.length; s++) {
    const section = sections[s];
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      positions.push(
        Math.cos(angle) * section.r,
        section.y,
        Math.sin(angle) * section.r
      );
    }
  }

  for (let s = 0; s < sections.length - 1; s++) {
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const a = s * segments + i;
      const b = s * segments + next;
      const c = (s + 1) * segments + i;
      const d = (s + 1) * segments + next;
      indices.push(a, c, b, b, c, d);
    }
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