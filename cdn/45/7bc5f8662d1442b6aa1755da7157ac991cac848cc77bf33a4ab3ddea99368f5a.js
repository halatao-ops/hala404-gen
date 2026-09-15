export default function generate(THREE) {
  const root = new THREE.Group();
  const tool = new THREE.Group();
  root.add(tool);

  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0xd9ad73,
    metalness: 0.0,
    roughness: 0.6,
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0xa87542,
    metalness: 0.0,
    roughness: 0.7,
  });

  const metal_ferruleMat = new THREE.MeshStandardMaterial({
    color: 0xf0f2f2,
    metalness: 0.6,
    roughness: 0.18,
  });

  const ferrule_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x55585a,
    metalness: 0.5,
    roughness: 0.35,
  });

  const handle_profile = [
    { z: -2.75, r: 0.000 },
    { z: -2.72, r: 0.075 },
    { z: -2.66, r: 0.145 },
    { z: -2.56, r: 0.185 },
    { z: -2.38, r: 0.190 },
    { z: -1.85, r: 0.195 },
    { z: -1.20, r: 0.205 },
    { z: -0.65, r: 0.225 },
    { z: -0.15, r: 0.255 },
    { z: 0.35, r: 0.275 },
    { z: 0.85, r: 0.265 },
    { z: 1.35, r: 0.225 },
    { z: 1.85, r: 0.175 },
    { z: 2.25, r: 0.135 },
    { z: 2.50, r: 0.115 },
    { z: 2.62, r: 0.108 },
  ];

  function handleRadiusAt(z) {
    for (let i = 0; i < handle_profile.length - 1; i++) {
      const a = handle_profile[i];
      const b = handle_profile[i + 1];
      if (z >= a.z && z <= b.z) {
        const t = (z - a.z) / (b.z - a.z);
        return a.r + (b.r - a.r) * t;
      }
    }
    return z < handle_profile[0].z
      ? handle_profile[0].r
      : handle_profile[handle_profile.length - 1].r;
  }

  const wooden_handleCurve = new THREE.CatmullRomCurve3(
    handle_profile.map((point) => new THREE.Vector3(point.r, 0, point.z)),
    false,
    "centripetal"
  );
  const wooden_handleGeo = new THREE.TubeGeometry(
    wooden_handleCurve,
    80,
    32,
    false
  );
  const wooden_handle = new THREE.Mesh(wooden_handleGeo, wooden_handleMat);
  tool.add(wooden_handle);

  const wood_grain = new THREE.Group();
  const grain_count = 14;
  for (let i = 0; i < grain_count; i++) {
    const grain_points = [];
    const start_z = -2.48 + (i % 4) * 0.08;
    const end_z = 2.46 - (i % 3) * 0.10;
    const base_angle = (i / grain_count) * Math.PI * 2;

    for (let j = 0; j <= 18; j++) {
      const t = j / 18;
      const z = start_z + (end_z - start_z) * t;
      const angle =
        base_angle +
        0.025 * Math.sin(t * Math.PI * 2 + i * 0.73) +
        0.008 * Math.sin(t * Math.PI * 5 + i * 0.31);
      const radius = handleRadiusAt(z) + 0.0035;
      grain_points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        )
      );
    }

    const wood_grainCurve = new THREE.CatmullRomCurve3(
      grain_points,
      false,
      "centripetal"
    );
    const wood_grainGeo = new THREE.TubeGeometry(
      wood_grainCurve,
      36,
      0.0032,
      false
    );
    const wood_grain_strand = new THREE.Mesh(wood_grainGeo, wood_grainMat);
    wood_grain.add(wood_grain_strand);
  }
  tool.add(wood_grain);

  const metal_ferruleGeom = new THREE.CylinderGeometry(
    0.108,
    0.113,
    0.20,
    32
  );
  const metal_ferrule = new THREE.Mesh(metal_ferruleGeom, metal_ferruleMat);
  metal_ferrule.rotation.x = Math.PI / 2;
  metal_ferrule.position.z = 2.71;
  tool.add(metal_ferrule);

  const ferrule_rear_ringGeom = new THREE.TorusGeometry(0.109, 0.005, 8, 32);
  const ferrule_rear_ring = new THREE.Mesh(
    ferrule_rear_ringGeom,
    metal_ferruleMat
  );
  ferrule_rear_ring.position.z = 2.615;
  tool.add(ferrule_rear_ring);

  const ferrule_grooveGeom = new THREE.TorusGeometry(0.108, 0.004, 8, 32);
  const ferrule_groove = new THREE.Mesh(
    ferrule_grooveGeom,
    ferrule_grooveMat
  );
  ferrule_groove.position.z = 2.795;
  tool.add(ferrule_groove);

  const metal_spikeGeom = new THREE.ConeGeometry(0.105, 0.86, 32);
  const metal_spike = new THREE.Mesh(metal_spikeGeom, metal_ferruleMat);
  metal_spike.rotation.x = Math.PI / 2;
  metal_spike.position.z = 3.22;
  tool.add(metal_spike);

  const spike_tipGeom = new THREE.SphereGeometry(0.024, 16, 8);
  const spike_tip = new THREE.Mesh(spike_tipGeom, metal_ferruleMat);
  spike_tip.position.z = 3.655;
  tool.add(spike_tip);

  tool.rotation.set(-0.08, -Math.PI / 4, 0);

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