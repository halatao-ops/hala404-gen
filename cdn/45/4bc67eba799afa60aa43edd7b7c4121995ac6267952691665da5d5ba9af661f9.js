export default function generate(THREE) {
  const root = new THREE.Group();

  const crescent_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x63b8ff,
    metalness: 0.0,
    roughness: 0.72,
    transmission: 0.42,
    thickness: 0.55,
    attenuationColor: 0x4aa9ff,
    attenuationDistance: 1.8,
    clearcoat: 0.2,
    clearcoatRoughness: 0.5,
    emissive: 0x126dff,
    emissiveIntensity: 0.28,
    transparent: true,
    opacity: 0.98
  });

  const inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0x258cff,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0x1677ff,
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.13,
    depthWrite: false
  });

  const glow_haloMat = new THREE.MeshStandardMaterial({
    color: 0x67c8ff,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0x35adff,
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.11,
    depthWrite: false
  });

  const glow_coreMat = new THREE.MeshStandardMaterial({
    color: 0xa9e9ff,
    metalness: 0.0,
    roughness: 0.75,
    emissive: 0x72d9ff,
    emissiveIntensity: 0.65,
    transparent: true,
    opacity: 0.24,
    depthWrite: false
  });

  const crescent_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.58, 0.13, 0),
    new THREE.Vector3(0.35, 0.34, 0),
    new THREE.Vector3(0.02, 0.52, 0),
    new THREE.Vector3(-0.31, 0.63, 0),
    new THREE.Vector3(-0.55, 0.49, 0),
    new THREE.Vector3(-0.66, 0.20, 0),
    new THREE.Vector3(-0.58, -0.14, 0),
    new THREE.Vector3(-0.36, -0.41, 0),
    new THREE.Vector3(-0.04, -0.53, 0),
    new THREE.Vector3(0.30, -0.48, 0),
    new THREE.Vector3(0.58, -0.28, 0)
  ], false, "centripetal");

  const radius_keys = [
    0.055, 0.14, 0.23, 0.29, 0.32, 0.315,
    0.29, 0.25, 0.20, 0.13, 0.055
  ];

  function radiusAt(t) {
    const scaled = t * (radius_keys.length - 1);
    const index = Math.min(radius_keys.length - 2, Math.floor(scaled));
    const blend = scaled - index;
    return radius_keys[index] * (1 - blend) + radius_keys[index + 1] * blend;
  }

  function createCrescentGeometry() {
    const path_points = crescent_path.computeFrenetFrames(112, false);
    const ring_count = 48;
    const positions = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= 112; i++) {
      const t = i / 112;
      const center = crescent_path.getPointAt(t);
      const normal = path_points.normals[i];
      const binormal = path_points.binormals[i];
      const radius = radiusAt(t);
      const depth_radius = radius * 0.72;

      for (let j = 0; j < ring_count; j++) {
        const angle = j / ring_count * Math.PI * 2;
        const cos_angle = Math.cos(angle);
        const sin_angle = Math.sin(angle);
        const px = center.x + normal.x * cos_angle * radius + binormal.x * sin_angle * depth_radius;
        const py = center.y + normal.y * cos_angle * radius + binormal.y * sin_angle * depth_radius;
        const pz = center.z + normal.z * cos_angle * radius + binormal.z * sin_angle * depth_radius;

        positions.push(px, py, pz);
        uvs.push(t, j / ring_count);
      }
    }

    for (let i = 0; i < 112; i++) {
      for (let j = 0; j < ring_count; j++) {
        const next_j = (j + 1) % ring_count;
        const a = i * ring_count + j;
        const b = (i + 1) * ring_count + j;
        const c = (i + 1) * ring_count + next_j;
        const d = i * ring_count + next_j;
        indices.push(a, d, b, b, d, c);
      }
    }

    const start_center_index = positions.length / 3;
    const start_center = crescent_path.getPointAt(0);
    positions.push(start_center.x, start_center.y, start_center.z);
    uvs.push(0, 0.5);

    const end_center_index = positions.length / 3;
    const end_center = crescent_path.getPointAt(1);
    positions.push(end_center.x, end_center.y, end_center.z);
    uvs.push(1, 0.5);

    const end_ring_offset = 112 * ring_count;
    for (let j = 0; j < ring_count; j++) {
      const next_j = (j + 1) % ring_count;
      indices.push(start_center_index, next_j, j);
      indices.push(end_center_index, end_ring_offset + j, end_ring_offset + next_j);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const crescent_bodyGeo = createCrescentGeometry();
  const crescent_body = new THREE.Mesh(crescent_bodyGeo, crescent_bodyMat);
  root.add(crescent_body);

  const inner_glow = new THREE.Mesh(crescent_bodyGeo, inner_glowMat);
  inner_glow.scale.set(0.965, 0.965, 0.965);
  root.add(inner_glow);

  const glow_spot_data = [
    [-0.43, 0.22, 0.150, 1.00],
    [-0.30, 0.02, 0.170, 0.85],
    [-0.18, -0.20, 0.180, 1.10],
    [0.04, -0.31, 0.170, 0.90],
    [0.25, -0.25, 0.150, 1.00],
    [0.39, -0.12, 0.120, 0.80],
    [-0.48, -0.05, 0.110, 0.90],
    [-0.08, 0.10, 0.130, 0.75]
  ];

  const glow_halos = new THREE.Group();
  const glow_cores = new THREE.Group();
  const glow_spot_count = glow_spot_data.length;
  const glow_halo_shellGeo = new THREE.SphereGeometry(1, 24, 16);
  const glow_halo_shells = new THREE.InstancedMesh(
    glow_halo_shellGeo,
    glow_haloMat,
    glow_spot_count
  );
  const glow_core_shellGeo = new THREE.SphereGeometry(1, 24, 16);
  const glow_core_shells = new THREE.InstancedMesh(
    glow_core_shellGeo,
    glow_coreMat,
    glow_spot_count
  );

  const glow_dummy = new THREE.Object3D();

  for (let i = 0; i < glow_spot_count; i++) {
    const spot = glow_spot_data[i];
    const x = spot[0];
    const y = spot[1];
    const radius = spot[2];
    const strength = spot[3];

    glow_dummy.position.set(x, y, 0.018);
    glow_dummy.rotation.set(0, 0, 0);
    glow_dummy.scale.set(radius * strength, radius * strength, radius * strength * 0.72);
    glow_dummy.updateMatrix();
    glow_halo_shells.setMatrixAt(i, glow_dummy.matrix);

    glow_dummy.position.set(x, y, 0.026);
    glow_dummy.scale.set(radius * 0.48 * strength, radius * 0.48 * strength, radius * 0.48 * strength * 0.72);
    glow_dummy.updateMatrix();
    glow_core_shells.setMatrixAt(i, glow_dummy.matrix);
  }

  glow_halo_shells.instanceMatrix.needsUpdate = true;
  glow_core_shells.instanceMatrix.needsUpdate = true;
  glow_halos.add(glow_halo_shells);
  glow_cores.add(glow_core_shells);
  root.add(glow_halos);
  root.add(glow_cores);

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