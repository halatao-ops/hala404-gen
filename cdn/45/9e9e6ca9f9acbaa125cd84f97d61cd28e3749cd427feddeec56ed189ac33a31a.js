export default function generate(THREE) {
  const root = new THREE.Group();
  const magnifying_glass = new THREE.Group();
  magnifying_glass.name = "magnifying_glass";
  root.add(magnifying_glass);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb58a3c,
    metalness: 0.6,
    roughness: 0.4,
  });
  const brassHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xd0ad55,
    metalness: 0.6,
    roughness: 0.3,
  });
  const brassDarkMat = new THREE.MeshStandardMaterial({
    color: 0x6f5122,
    metalness: 0.5,
    roughness: 0.5,
  });
  const gasketMat = new THREE.MeshStandardMaterial({
    color: 0x171715,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf2f2,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    depthWrite: false,
  });
  const reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const lens_assembly = new THREE.Group();
  lens_assembly.name = "lens_assembly";
  magnifying_glass.add(lens_assembly);

  const lens_glassGeom = new THREE.SphereGeometry(0.91, 64, 32);
  const lens_glass = new THREE.Mesh(lens_glassGeom, glassMat);
  lens_glass.name = "lens_glass";
  lens_glass.scale.set(1, 1, 0.075);
  lens_glass.position.z = 0.015;
  lens_assembly.add(lens_glass);

  const outer_brass_rimGeom = new THREE.TorusGeometry(1.075, 0.18, 24, 80);
  const outer_brass_rim = new THREE.Mesh(outer_brass_rimGeom, brassMat);
  outer_brass_rim.name = "outer_brass_rim";
  lens_assembly.add(outer_brass_rim);

  const outer_rim_highlightGeom = new THREE.TorusGeometry(1.16, 0.025, 12, 80);
  const outer_rim_highlight = new THREE.Mesh(outer_rim_highlightGeom, brassHighlightMat);
  outer_rim_highlight.name = "outer_rim_highlight";
  outer_rim_highlight.position.z = 0.145;
  lens_assembly.add(outer_rim_highlight);

  const inner_brass_beadGeom = new THREE.TorusGeometry(0.965, 0.028, 12, 80);
  const inner_brass_bead = new THREE.Mesh(inner_brass_beadGeom, brassHighlightMat);
  inner_brass_bead.name = "inner_brass_bead";
  inner_brass_bead.position.z = 0.13;
  lens_assembly.add(inner_brass_bead);

  const black_lens_gasketGeom = new THREE.TorusGeometry(0.915, 0.045, 18, 80);
  const black_lens_gasket = new THREE.Mesh(black_lens_gasketGeom, gasketMat);
  black_lens_gasket.name = "black_lens_gasket";
  black_lens_gasket.position.z = 0.09;
  lens_assembly.add(black_lens_gasket);

  const rear_lens_edgeGeom = new THREE.TorusGeometry(0.91, 0.025, 12, 64);
  const rear_lens_edge = new THREE.Mesh(rear_lens_edgeGeom, gasketMat);
  rear_lens_edge.name = "rear_lens_edge";
  rear_lens_edge.position.z = -0.065;
  lens_assembly.add(rear_lens_edge);

  const lens_reflectionGeom = new THREE.RingGeometry(
    0.58,
    0.70,
    40,
    1,
    1.72,
    0.78
  );
  const lens_reflection = new THREE.Mesh(lens_reflectionGeom, reflectionMat);
  lens_reflection.name = "lens_reflection";
  lens_reflection.position.z = 0.087;
  lens_assembly.add(lens_reflection);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  magnifying_glass.add(handle_assembly);

  const handle_socketGeom = new THREE.CylinderGeometry(0.27, 0.22, 0.22, 32);
  const handle_socket = new THREE.Mesh(handle_socketGeom, brassDarkMat);
  handle_socket.name = "handle_socket";
  handle_socket.rotation.x = Math.PI / 2;
  handle_socket.position.z = -0.13;
  handle_assembly.add(handle_socket);

  const tapered_ferruleGeom = new THREE.CylinderGeometry(0.23, 0.17, 0.78, 40);
  const tapered_ferrule = new THREE.Mesh(tapered_ferruleGeom, brassMat);
  tapered_ferrule.name = "tapered_ferrule";
  tapered_ferrule.rotation.x = Math.PI / 2;
  tapered_ferrule.position.z = -0.48;
  handle_assembly.add(tapered_ferrule);

  const collar_bandGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.11, 32);
  const collar_band = new THREE.Mesh(collar_bandGeom, brassDarkMat);
  collar_band.name = "collar_band";
  collar_band.rotation.x = Math.PI / 2;
  collar_band.position.z = -0.89;
  handle_assembly.add(collar_band);

  const collar_ringGeom = new THREE.TorusGeometry(0.178, 0.025, 12, 48);
  const collar_ring = new THREE.Mesh(collar_ringGeom, brassHighlightMat);
  collar_ring.name = "collar_ring";
  collar_ring.position.z = -0.945;
  handle_assembly.add(collar_ring);

  const handle_shaftGeom = new THREE.CylinderGeometry(0.16, 0.145, 1.18, 40);
  const handle_shaft = new THREE.Mesh(handle_shaftGeom, brassMat);
  handle_shaft.name = "handle_shaft";
  handle_shaft.rotation.x = Math.PI / 2;
  handle_shaft.position.z = -1.51;
  handle_assembly.add(handle_shaft);

  const handle_end_capGeom = new THREE.SphereGeometry(0.16, 32, 16);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, brassMat);
  handle_end_cap.name = "handle_end_cap";
  handle_end_cap.scale.set(1, 1, 0.58);
  handle_end_cap.position.z = -2.10;
  handle_assembly.add(handle_end_cap);

  const handle_end_bandGeom = new THREE.TorusGeometry(0.145, 0.012, 10, 40);
  const handle_end_band = new THREE.Mesh(handle_end_bandGeom, brassDarkMat);
  handle_end_band.name = "handle_end_band";
  handle_end_band.position.z = -2.02;
  handle_assembly.add(handle_end_band);

  magnifying_glass.rotation.set(-0.1, -0.72, -0.08);

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