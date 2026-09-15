export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x9edff0,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.95,
    thickness: 0.08,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x3154c7,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.82,
    thickness: 0.06,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const baseMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8dce4,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.78,
    thickness: 0.12,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const bodyProfile = [
    { r: 0.22, y: 0.36 },
    { r: 0.34, y: 0.42 },
    { r: 0.43, y: 0.55 },
    { r: 0.46, y: 0.68 },
    { r: 0.43, y: 0.82 },
    { r: 0.38, y: 1.00 },
    { r: 0.32, y: 1.18 },
    { r: 0.27, y: 1.36 },
    { r: 0.235, y: 1.55 },
    { r: 0.22, y: 1.72 },
    { r: 0.22, y: 1.90 },
    { r: 0.235, y: 2.08 },
    { r: 0.26, y: 2.25 },
    { r: 0.29, y: 2.38 },
    { r: 0.32, y: 2.43 }
  ];

  function radiusAt(y) {
    if (y <= bodyProfile[0].y) return bodyProfile[0].r;
    for (let i = 0; i < bodyProfile.length - 1; i++) {
      const a = bodyProfile[i];
      const b = bodyProfile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        const smooth = t * t * (3 - 2 * t);
        return a.r + (b.r - a.r) * smooth;
      }
    }
    return bodyProfile[bodyProfile.length - 1].r;
  }

  function createLoftGeometry(profile, segments, closeBottom, capTop) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < profile.length; i++) {
      const ring = profile[i];
      for (let j = 0; j < segments; j++) {
        const angle = j / segments * Math.PI * 2;
        positions.push(
          Math.cos(angle) * ring.r,
          ring.y,
          Math.sin(angle) * ring.r
        );
      }
    }

    for (let i = 0; i < profile.length - 1; i++) {
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        const a = i * segments + j;
        const b = i * segments + next;
        const c = (i + 1) * segments + j;
        const d = (i + 1) * segments + next;
        indices.push(a, c, b, b, c, d);
      }
    }

    if (closeBottom) {
      const bottomCenter = positions.length / 3;
      positions.push(0, profile[0].y, 0);
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        indices.push(bottomCenter, j, next);
      }
    }

    if (capTop) {
      const topStart = (profile.length - 1) * segments;
      const topCenter = positions.length / 3;
      positions.push(0, profile[profile.length - 1].y, 0);
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        indices.push(topCenter, topStart + next, topStart + j);
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

  const pedestal_baseProfile = [
    { r: 0.29, y: 0.00 },
    { r: 0.34, y: 0.015 },
    { r: 0.38, y: 0.055 },
    { r: 0.39, y: 0.11 },
    { r: 0.38, y: 0.18 },
    { r: 0.35, y: 0.25 },
    { r: 0.31, y: 0.31 },
    { r: 0.27, y: 0.34 }
  ];
  const pedestal_baseGeom = createLoftGeometry(
    pedestal_baseProfile,
    64,
    true,
    true
  );
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, baseMat);
  pedestal_base.renderOrder = 1;
  root.add(pedestal_base);

  const base_bottom_ringGeom = new THREE.TorusGeometry(0.31, 0.012, 10, 64);
  const base_bottom_ring = new THREE.Mesh(base_bottom_ringGeom, baseMat);
  base_bottom_ring.rotation.x = Math.PI / 2;
  base_bottom_ring.position.y = 0.018;
  base_bottom_ring.renderOrder = 2;
  root.add(base_bottom_ring);

  const base_top_ringGeom = new THREE.TorusGeometry(0.285, 0.014, 10, 64);
  const base_top_ring = new THREE.Mesh(base_top_ringGeom, baseMat);
  base_top_ring.rotation.x = Math.PI / 2;
  base_top_ring.position.y = 0.325;
  base_top_ring.renderOrder = 2;
  root.add(base_top_ring);

  const bodyGeom = createLoftGeometry(bodyProfile, 64, false, false);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.renderOrder = 3;
  root.add(body);

  const lower_blue_bandProfile = [
    { r: radiusAt(0.37) + 0.008, y: 0.37 },
    { r: radiusAt(0.43) + 0.008, y: 0.43 },
    { r: radiusAt(0.50) + 0.008, y: 0.50 },
    { r: radiusAt(0.57) + 0.008, y: 0.57 }
  ];
  const lower_blue_bandGeom = createLoftGeometry(
    lower_blue_bandProfile,
    64,
    false,
    false
  );
  const lower_blue_band = new THREE.Mesh(lower_blue_bandGeom, rimMat);
  lower_blue_band.renderOrder = 4;
  root.add(lower_blue_band);

  const lower_blue_ringGeom = new THREE.TorusGeometry(0.355, 0.026, 12, 64);
  const lower_blue_ring = new THREE.Mesh(lower_blue_ringGeom, rimMat);
  lower_blue_ring.rotation.x = Math.PI / 2;
  lower_blue_ring.position.y = 0.405;
  lower_blue_ring.renderOrder = 5;
  root.add(lower_blue_ring);

  const mouth_lipGeom = new THREE.TorusGeometry(0.305, 0.026, 12, 64);
  const mouth_lip = new THREE.Mesh(mouth_lipGeom, rimMat);
  mouth_lip.rotation.x = Math.PI / 2;
  mouth_lip.position.y = 2.43;
  mouth_lip.renderOrder = 6;
  root.add(mouth_lip);

  const mouth_inner_ringGeom = new THREE.TorusGeometry(0.278, 0.008, 8, 64);
  const mouth_inner_ring = new THREE.Mesh(mouth_inner_ringGeom, rimMat);
  mouth_inner_ring.rotation.x = Math.PI / 2;
  mouth_inner_ring.position.y = 2.421;
  mouth_inner_ring.renderOrder = 6;
  root.add(mouth_inner_ring);

  const side_edgePath = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const y = 0.42 + t * 1.96;
    side_edgePath.push(
      new THREE.Vector3(radiusAt(y) + 0.006, y, 0)
    );
  }
  const side_edgeCurve = new THREE.CatmullRomCurve3(side_edgePath);
  const side_edgeGeom = new THREE.TubeGeometry(
    side_edgeCurve,
    72,
    0.007,
    8,
    false
  );

  const left_edge = new THREE.Mesh(side_edgeGeom, rimMat);
  left_edge.rotation.y = Math.PI / 2;
  left_edge.renderOrder = 7;
  root.add(left_edge);

  const right_edge = new THREE.Mesh(side_edgeGeom, rimMat);
  right_edge.rotation.y = -Math.PI / 2;
  right_edge.renderOrder = 7;
  root.add(right_edge);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}