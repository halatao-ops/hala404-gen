export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "metalworking_tool";

  const brushed_steelMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b5,
    metalness: 0.6,
    roughness: 0.4,
  });
  const bright_steelMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0cd,
    metalness: 0.6,
    roughness: 0.35,
  });
  const dark_steelMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.5,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x3f3f3f,
    metalness: 0.4,
    roughness: 0.65,
  });

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const main_handleGeom = new THREE.CylinderGeometry(0.31, 0.31, 2.3, 48);
  const main_handle = new THREE.Mesh(main_handleGeom, brushed_steelMat);
  main_handle.name = "main_handle";
  main_handle.rotation.x = Math.PI / 2;
  main_handle.position.z = -0.5;
  handle_assembly.add(main_handle);

  const rear_bevelGeom = new THREE.CylinderGeometry(0.31, 0.275, 0.12, 48);
  const rear_bevel = new THREE.Mesh(rear_bevelGeom, brushed_steelMat);
  rear_bevel.name = "rear_bevel";
  rear_bevel.rotation.x = Math.PI / 2;
  rear_bevel.position.z = -1.72;
  handle_assembly.add(rear_bevel);

  const rear_end_capGeom = new THREE.CylinderGeometry(0.275, 0.275, 0.018, 48);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, bright_steelMat);
  rear_end_cap.name = "rear_end_cap";
  rear_end_cap.rotation.x = Math.PI / 2;
  rear_end_cap.position.z = -1.789;
  handle_assembly.add(rear_end_cap);

  const rear_edge_ringGeom = new THREE.TorusGeometry(0.273, 0.008, 8, 48);
  const rear_edge_ring = new THREE.Mesh(rear_edge_ringGeom, bright_steelMat);
  rear_edge_ring.name = "rear_edge_ring";
  rear_edge_ring.position.z = -1.785;
  handle_assembly.add(rear_edge_ring);

  const front_shoulderGeom = new THREE.CylinderGeometry(0.17, 0.31, 0.32, 48);
  const front_shoulder = new THREE.Mesh(front_shoulderGeom, brushed_steelMat);
  front_shoulder.name = "front_shoulder";
  front_shoulder.rotation.x = Math.PI / 2;
  front_shoulder.position.z = 0.79;
  handle_assembly.add(front_shoulder);

  const shoulder_stepGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.025, 40);
  const shoulder_step = new THREE.Mesh(shoulder_stepGeom, bright_steelMat);
  shoulder_step.name = "shoulder_step";
  shoulder_step.rotation.x = Math.PI / 2;
  shoulder_step.position.z = 0.955;
  handle_assembly.add(shoulder_step);

  const neckGeom = new THREE.CylinderGeometry(0.145, 0.16, 0.32, 40);
  const neck = new THREE.Mesh(neckGeom, brushed_steelMat);
  neck.name = "neck";
  neck.rotation.x = Math.PI / 2;
  neck.position.z = 1.11;
  handle_assembly.add(neck);

  const chuck_assembly = new THREE.Group();
  chuck_assembly.name = "chuck_assembly";
  root.add(chuck_assembly);

  const chuck_bodyGeom = new THREE.CylinderGeometry(0.2, 0.18, 0.34, 40);
  const chuck_body = new THREE.Mesh(chuck_bodyGeom, brushed_steelMat);
  chuck_body.name = "chuck_body";
  chuck_body.rotation.x = Math.PI / 2;
  chuck_body.position.z = 1.39;
  chuck_assembly.add(chuck_body);

  const chuck_rear_ringGeom = new THREE.TorusGeometry(0.178, 0.012, 8, 40);
  const chuck_rear_ring = new THREE.Mesh(chuck_rear_ringGeom, bright_steelMat);
  chuck_rear_ring.name = "chuck_rear_ring";
  chuck_rear_ring.position.z = 1.225;
  chuck_assembly.add(chuck_rear_ring);

  const chuck_front_bevelGeom = new THREE.CylinderGeometry(0.17, 0.2, 0.08, 40);
  const chuck_front_bevel = new THREE.Mesh(chuck_front_bevelGeom, bright_steelMat);
  chuck_front_bevel.name = "chuck_front_bevel";
  chuck_front_bevel.rotation.x = Math.PI / 2;
  chuck_front_bevel.position.z = 1.59;
  chuck_assembly.add(chuck_front_bevel);

  const chuck_openingGeom = new THREE.CircleGeometry(0.105, 32);
  const chuck_opening = new THREE.Mesh(chuck_openingGeom, dark_steelMat);
  chuck_opening.name = "chuck_opening";
  chuck_opening.position.z = 1.632;
  chuck_assembly.add(chuck_opening);

  const chuck_faceGeom = new THREE.RingGeometry(0.105, 0.17, 40);
  const chuck_face = new THREE.Mesh(chuck_faceGeom, bright_steelMat);
  chuck_face.name = "chuck_face";
  chuck_face.position.z = 1.634;
  chuck_assembly.add(chuck_face);

  const chuck_inner_shadowGeom = new THREE.TorusGeometry(0.105, 0.008, 8, 32);
  const chuck_inner_shadow = new THREE.Mesh(chuck_inner_shadowGeom, dark_steelMat);
  chuck_inner_shadow.name = "chuck_inner_shadow";
  chuck_inner_shadow.position.z = 1.637;
  chuck_assembly.add(chuck_inner_shadow);

  const bit_assembly = new THREE.Group();
  bit_assembly.name = "bit_assembly";
  root.add(bit_assembly);

  const bit_shaftGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.22, 24);
  const bit_shaft = new THREE.Mesh(bit_shaftGeom, dark_steelMat);
  bit_shaft.name = "bit_shaft";
  bit_shaft.rotation.x = Math.PI / 2;
  bit_shaft.position.z = 1.69;
  bit_assembly.add(bit_shaft);

  const flute_start = 1.68;
  const flute_end = 2.08;
  const flute_turns = 1.15;
  const flute_samples = 56;
  const flute_radius = 0.095;
  const flute_positions = [];
  const flute_indices = [];

  for (let i = 0; i <= flute_samples; i++) {
    const t = i / flute_samples;
    const z = flute_start + (flute_end - flute_start) * t;
    const angle = t * flute_turns * Math.PI * 2;
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);

    flute_positions.push(
      ca * flute_radius, sa * flute_radius, z,
      ca * 0.025, sa * 0.025, z,
      -ca * flute_radius, -sa * flute_radius, z,
      -ca * 0.025, -sa * 0.025, z
    );
  }

  for (let i = 0; i < flute_samples; i++) {
    const a = i * 4;
    const b = (i + 1) * 4;

    flute_indices.push(
      a, b, b + 1, a, b + 1, a + 1,
      a + 1, b + 1, b + 2, a + 1, b + 2, a + 2,
      a + 2, b + 2, b + 3, a + 2, b + 3, a + 3,
      a + 3, b + 3, b, a + 3, b, a
    );
  }

  flute_indices.push(
    0, 1, 2, 0, 2, 3,
    flute_samples * 4, flute_samples * 4 + 3, flute_samples * 4 + 2,
    flute_samples * 4, flute_samples * 4 + 2, flute_samples * 4 + 1
  );

  const bit_flutesGeom = new THREE.BufferGeometry();
  bit_flutesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(flute_positions, 3)
  );
  bit_flutesGeom.setIndex(flute_indices);
  bit_flutesGeom.computeVertexNormals();

  const bit_flutes = new THREE.Mesh(bit_flutesGeom, bright_steelMat);
  bit_flutes.name = "bit_flutes";
  bit_assembly.add(bit_flutes);

  const groove_points = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const angle = t * flute_turns * Math.PI * 2 + Math.PI;
    groove_points.push(new THREE.Vector3(
      Math.cos(angle) * 0.029,
      Math.sin(angle) * 0.029,
      flute_start + (flute_end - flute_start) * t
    ));
  }

  const bit_groovesGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(groove_points),
    80,
    0.008,
    6,
    false
  );
  const bit_grooves = new THREE.InstancedMesh(bit_groovesGeom, grooveMat, 2);
  bit_grooves.name = "bit_grooves";
  const groove_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    groove_dummy.rotation.set(0, 0, i * Math.PI);
    groove_dummy.updateMatrix();
    bit_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  bit_grooves.instanceMatrix.needsUpdate = true;
  bit_assembly.add(bit_grooves);

  const bit_tipGeom = new THREE.CylinderGeometry(0.025, 0.095, 0.16, 24);
  const bit_tip = new THREE.Mesh(bit_tipGeom, bright_steelMat);
  bit_tip.name = "bit_tip";
  bit_tip.rotation.x = Math.PI / 2;
  bit_tip.position.z = 2.16;
  bit_assembly.add(bit_tip);

  const cutting_edgeGeom = new THREE.TorusGeometry(0.024, 0.004, 6, 20);
  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, dark_steelMat);
  cutting_edge.name = "cutting_edge";
  cutting_edge.position.z = 2.242;
  bit_assembly.add(cutting_edge);

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