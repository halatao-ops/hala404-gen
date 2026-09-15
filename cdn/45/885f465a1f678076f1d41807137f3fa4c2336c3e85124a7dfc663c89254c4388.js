export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cylindrical_led_light";

  const housing = new THREE.Group();
  housing.name = "housing";
  root.add(housing);

  const front_light_assembly = new THREE.Group();
  front_light_assembly.name = "front_light_assembly";
  root.add(front_light_assembly);

  const rear_end_assembly = new THREE.Group();
  rear_end_assembly.name = "rear_end_assembly";
  root.add(rear_end_assembly);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x151719,
    metalness: 0.35,
    roughness: 0.38
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x101214,
    metalness: 0.3,
    roughness: 0.42
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.1,
    roughness: 0.8
  });

  const reflectorMat = new THREE.MeshStandardMaterial({
    color: 0x0638cc,
    emissive: 0x0638cc,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const blueGlowMat = new THREE.MeshStandardMaterial({
    color: 0x087cff,
    emissive: 0x087cff,
    metalness: 0.0,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x1248d8,
    emissive: 0x0b36b8,
    metalness: 0.0,
    roughness: 0.25,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide
  });

  const opticMat = new THREE.MeshStandardMaterial({
    color: 0xc9d0ff,
    emissive: 0x8694ff,
    metalness: 0.0,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x7fffff,
    emissive: 0x2deaff,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const main_bodyGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.5, 64, 1, false);
  const main_body = new THREE.Mesh(main_bodyGeo, bodyMat);
  main_body.name = "main_body";
  main_body.rotation.x = Math.PI / 2;
  main_body.position.z = -0.02;
  housing.add(main_body);

  const front_cap_profile = [
    new THREE.Vector2(0.0, 1.18),
    new THREE.Vector2(0.47, 1.18),
    new THREE.Vector2(0.5, 1.1),
    new THREE.Vector2(0.515, 0.94),
    new THREE.Vector2(0.515, 0.78),
    new THREE.Vector2(0.5, 0.69),
    new THREE.Vector2(0.0, 0.69)
  ];
  const front_capGeom = new THREE.LatheGeometry(front_cap_profile, 64);
  const front_cap = new THREE.Mesh(front_capGeom, capMat);
  front_cap.name = "front_cap";
  front_cap.rotation.x = Math.PI / 2;
  housing.add(front_cap);

  const rear_cap_profile = [
    new THREE.Vector2(0.0, -1.39),
    new THREE.Vector2(0.39, -1.39),
    new THREE.Vector2(0.47, -1.36),
    new THREE.Vector2(0.515, -1.29),
    new THREE.Vector2(0.525, -1.19),
    new THREE.Vector2(0.525, -1.08),
    new THREE.Vector2(0.5, -1.0),
    new THREE.Vector2(0.0, -1.0)
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_cap_profile, 64);
  const rear_cap = new THREE.Mesh(rear_capGeom, capMat);
  rear_cap.name = "rear_cap";
  rear_cap.rotation.x = Math.PI / 2;
  housing.add(rear_cap);

  const seam_ringGeom = new THREE.TorusGeometry(0.505, 0.012, 8, 64);

  const front_seam_ring = new THREE.Mesh(seam_ringGeom, seamMat);
  front_seam_ring.name = "front_seam_ring";
  front_seam_ring.position.z = 0.7;
  housing.add(front_seam_ring);

  const rear_seam_ring = new THREE.Mesh(seam_ringGeom, seamMat);
  rear_seam_ring.name = "rear_seam_ring";
  rear_seam_ring.position.z = -1.01;
  housing.add(rear_seam_ring);

  const front_bezelGeom = new THREE.TorusGeometry(0.425, 0.085, 16, 64);
  const front_bezel = new THREE.Mesh(front_bezelGeom, capMat);
  front_bezel.name = "front_bezel";
  front_bezel.position.z = 1.205;
  front_light_assembly.add(front_bezel);

  const front_recessGeom = new THREE.CircleGeometry(0.355, 64);
  const front_recess = new THREE.Mesh(front_recessGeom, seamMat);
  front_recess.name = "front_recess";
  front_recess.position.z = 1.218;
  front_light_assembly.add(front_recess);

  const blue_reflectorGeom = new THREE.CircleGeometry(0.315, 64);
  const blue_reflector = new THREE.Mesh(blue_reflectorGeom, reflectorMat);
  blue_reflector.name = "blue_reflector";
  blue_reflector.position.z = 1.224;
  front_light_assembly.add(blue_reflector);

  const lens_glow_ringGeom = new THREE.TorusGeometry(0.286, 0.018, 10, 64);
  const lens_glow_ring = new THREE.Mesh(lens_glow_ringGeom, blueGlowMat);
  lens_glow_ring.name = "lens_glow_ring";
  lens_glow_ring.position.z = 1.232;
  front_light_assembly.add(lens_glow_ring);

  const front_lensGeom = new THREE.CircleGeometry(0.295, 64);
  const front_lens = new THREE.Mesh(front_lensGeom, lensMat);
  front_lens.name = "front_lens";
  front_lens.position.z = 1.238;
  front_light_assembly.add(front_lens);

  const optic_ringGeom = new THREE.RingGeometry(0.047, 0.083, 24);
  const optic_rings = new THREE.InstancedMesh(optic_ringGeom, opticMat, 3);
  optic_rings.name = "optic_rings";

  const optic_coreGeom = new THREE.CircleGeometry(0.043, 24);
  const optic_cores = new THREE.InstancedMesh(optic_coreGeom, opticMat, 3);
  optic_cores.name = "optic_cores";

  const led_emitterGeom = new THREE.CircleGeometry(0.018, 20);
  const led_emitters = new THREE.InstancedMesh(led_emitterGeom, ledMat, 3);
  led_emitters.name = "led_emitters";

  const optic_positions = [
    [-0.105, 0.085],
    [0.105, 0.085],
    [0.0, -0.13]
  ];

  const optic_dummy = new THREE.Object3D();
  for (let i = 0; i < optic_positions.length; i++) {
    const x = optic_positions[i][0];
    const y = optic_positions[i][1];

    optic_dummy.position.set(x, y, 1.247);
    optic_dummy.updateMatrix();
    optic_rings.setMatrixAt(i, optic_dummy.matrix);

    optic_dummy.position.set(x, y, 1.248);
    optic_dummy.updateMatrix();
    optic_cores.setMatrixAt(i, optic_dummy.matrix);

    optic_dummy.position.set(x, y, 1.252);
    optic_dummy.updateMatrix();
    led_emitters.setMatrixAt(i, optic_dummy.matrix);
  }

  optic_rings.instanceMatrix.needsUpdate = true;
  optic_cores.instanceMatrix.needsUpdate = true;
  led_emitters.instanceMatrix.needsUpdate = true;

  front_light_assembly.add(optic_rings);
  front_light_assembly.add(optic_cores);
  front_light_assembly.add(led_emitters);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}