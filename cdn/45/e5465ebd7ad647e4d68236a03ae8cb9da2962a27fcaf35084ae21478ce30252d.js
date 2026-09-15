export default function generate(THREE) {
  const root = new THREE.Group();

  const black_ceramic_mat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.16,
    side: THREE.DoubleSide,
  });

  const gold_trim_mat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.28,
  });

  const vessel_body_profile = [
    { r: 0.000, y: 0.000 },
    { r: 0.270, y: 0.000 },
    { r: 0.330, y: 0.012 },
    { r: 0.370, y: 0.045 },
    { r: 0.395, y: 0.105 },
    { r: 0.425, y: 0.220 },
    { r: 0.465, y: 0.420 },
    { r: 0.505, y: 0.620 },
    { r: 0.535, y: 0.750 },
    { r: 0.560, y: 0.820 },
    { r: 0.580, y: 0.855 },
    { r: 0.585, y: 0.885 },
    { r: 0.575, y: 0.915 },
    { r: 0.550, y: 0.940 },
    { r: 0.515, y: 0.950 },
    { r: 0.485, y: 0.940 },
    { r: 0.465, y: 0.915 },
    { r: 0.455, y: 0.880 },
    { r: 0.445, y: 0.820 },
    { r: 0.420, y: 0.650 },
    { r: 0.390, y: 0.450 },
    { r: 0.350, y: 0.250 },
    { r: 0.310, y: 0.140 },
    { r: 0.250, y: 0.105 },
    { r: 0.000, y: 0.105 },
  ];

  const vessel_body_geo = createProfileGeometry(THREE, vessel_body_profile, 64);
  const vessel_body = new THREE.Mesh(vessel_body_geo, black_ceramic_mat);
  root.add(vessel_body);

  const upper_lip_roll_geo = new THREE.TorusGeometry(0.520, 0.024, 16, 64);
  const upper_lip_roll = new THREE.Mesh(upper_lip_roll_geo, black_ceramic_mat);
  upper_lip_roll.rotation.x = Math.PI / 2;
  upper_lip_roll.position.y = 0.928;
  root.add(upper_lip_roll);

  const upper_gold_band_profile = [
    { r: 0.548, y: 0.752 },
    { r: 0.558, y: 0.778 },
    { r: 0.570, y: 0.810 },
    { r: 0.581, y: 0.842 },
    { r: 0.585, y: 0.860 },
  ];
  const upper_gold_band_geo = createProfileGeometry(THREE, upper_gold_band_profile, 64);
  const upper_gold_band = new THREE.Mesh(upper_gold_band_geo, gold_trim_mat);
  root.add(upper_gold_band);

  const upper_gold_trim_upper = createRimBand(THREE, 0.580, 0.866, 0.008, 64, gold_trim_mat);
  root.add(upper_gold_trim_upper);

  const upper_gold_trim_lower = createRimBand(THREE, 0.548, 0.756, 0.007, 64, gold_trim_mat);
  root.add(upper_gold_trim_lower);

  const lower_gold_band_profile = [
    { r: 0.393, y: 0.105 },
    { r: 0.402, y: 0.125 },
    { r: 0.412, y: 0.148 },
    { r: 0.421, y: 0.170 },
  ];
  const lower_gold_band_geo = createProfileGeometry(THREE, lower_gold_band_profile, 64);
  const lower_gold_band = new THREE.Mesh(lower_gold_band_geo, gold_trim_mat);
  root.add(lower_gold_band);

  const lower_gold_trim_top = createRimBand(THREE, 0.421, 0.170, 0.006, 64, gold_trim_mat);
  root.add(lower_gold_trim_top);

  const lower_gold_trim_bottom = createRimBand(THREE, 0.394, 0.106, 0.006, 64, gold_trim_mat);
  root.add(lower_gold_trim_bottom);

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
      const c = (i + 1) * segments + j;
      const d = (i + 1) * segments + next;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createRimBand(THREE, radius, y, height, segments, material) {
  const geometry = new THREE.CylinderGeometry(
    radius,
    radius,
    height,
    segments,
    1,
    true
  );
  return new THREE.Mesh(geometry, material);
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