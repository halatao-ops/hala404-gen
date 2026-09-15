export default function generate(THREE) {
  const root = new THREE.Group();

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4cf,
    metalness: 0.6,
    roughness: 0.4,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x85857e,
    metalness: 0.6,
    roughness: 0.55,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x343532,
    metalness: 0.5,
    roughness: 0.6,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8e5,
    metalness: 0.0,
    roughness: 0.08,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.14,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const tubeMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    metalness: 0.0,
    roughness: 0.35,
    emissive: 0x30302c,
    emissiveIntensity: 0.18,
  });
  const tube_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const base_footProfile = [
    new THREE.Vector3(0.00, 0.00, 0.60),
    new THREE.Vector3(0.56, 0.00, 0.60),
    new THREE.Vector3(0.62, 0.02, 0.59),
    new THREE.Vector3(0.65, 0.06, 0.57),
    new THREE.Vector3(0.65, 0.10, 0.54),
    new THREE.Vector3(0.61, 0.15, 0.49),
    new THREE.Vector3(0.54, 0.22, 0.43),
    new THREE.Vector3(0.46, 0.29, 0.39),
    new THREE.Vector3(0.40, 0.34, 0.38),
    new THREE.Vector3(0.38, 0.38, 0.38),
    new THREE.Vector3(0.00, 0.38, 0.38),
  ];
  const base_footGeom = createLoftGeometry(THREE, base_footProfile, 48);
  const base_foot = new THREE.Mesh(base_footGeom, polished_metalMat);
  root.add(base_foot);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.595, 0.018, 10, 48);
  const base_lower_ring = new THREE.Mesh(base_lower_ringGeom, polished_metalMat);
  base_lower_ring.rotation.x = Math.PI / 2;
  base_lower_ring.position.y = 0.055;
  root.add(base_lower_ring);

  const base_step_ringGeom = new THREE.TorusGeometry(0.405, 0.024, 10, 48);
  const base_step_ring = new THREE.Mesh(base_step_ringGeom, polished_metalMat);
  base_step_ring.rotation.x = Math.PI / 2;
  base_step_ring.position.y = 0.355;
  root.add(base_step_ring);

  const base_collarGeom = new THREE.CylinderGeometry(0.39, 0.40, 0.28, 48);
  const base_collar = new THREE.Mesh(base_collarGeom, brushed_metalMat);
  base_collar.position.y = 0.50;
  root.add(base_collar);

  const base_collar_bottom_ringGeom = new THREE.TorusGeometry(0.385, 0.022, 10, 48);
  const base_collar_bottom_ring = new THREE.Mesh(base_collar_bottom_ringGeom, polished_metalMat);
  base_collar_bottom_ring.rotation.x = Math.PI / 2;
  base_collar_bottom_ring.position.y = 0.365;
  root.add(base_collar_bottom_ring);

  const base_collar_top_ringGeom = new THREE.TorusGeometry(0.375, 0.024, 10, 48);
  const base_collar_top_ring = new THREE.Mesh(base_collar_top_ringGeom, polished_metalMat);
  base_collar_top_ring.rotation.x = Math.PI / 2;
  base_collar_top_ring.position.y = 0.64;
  root.add(base_collar_top_ring);

  const base_seamGeom = new THREE.BoxGeometry(0.018, 0.22, 0.008);
  const base_seam = new THREE.Mesh(base_seamGeom, dark_metalMat);
  const base_seam_angle = 0.72;
  base_seam.position.set(
    Math.sin(base_seam_angle) * 0.397,
    0.50,
    Math.cos(base_seam_angle) * 0.397
  );
  base_seam.rotation.y = base_seam_angle;
  root.add(base_seam);

  const chamber_floorGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.035, 48);
  const chamber_floor = new THREE.Mesh(chamber_floorGeom, dark_metalMat);
  chamber_floor.position.y = 0.665;
  root.add(chamber_floor);

  const lower_glass_sealGeom = new THREE.TorusGeometry(0.345, 0.022, 10, 48);
  const lower_glass_seal = new THREE.Mesh(lower_glass_sealGeom, polished_metalMat);
  lower_glass_seal.rotation.x = Math.PI / 2;
  lower_glass_seal.position.y = 0.68;
  root.add(lower_glass_seal);

  const central_socketGeom = new THREE.CylinderGeometry(0.15, 0.16, 0.10, 32);
  const central_socket = new THREE.Mesh(central_socketGeom, dark_metalMat);
  central_socket.position.y = 0.72;
  root.add(central_socket);

  const central_socket_ringGeom = new THREE.TorusGeometry(0.145, 0.018, 8, 32);
  const central_socket_ring = new THREE.Mesh(central_socket_ringGeom, polished_metalMat);
  central_socket_ring.rotation.x = Math.PI / 2;
  central_socket_ring.position.y = 0.765;
  root.add(central_socket_ring);

  const inner_reservoirProfile = [
    new THREE.Vector3(0.00, 0.72, 0.08),
    new THREE.Vector3(0.08, 0.72, 0.11),
    new THREE.Vector3(0.14, 0.76, 0.15),
    new THREE.Vector3(0.18, 0.84, 0.18),
    new THREE.Vector3(0.19, 0.94, 0.19),
    new THREE.Vector3(0.19, 1.55, 0.19),
    new THREE.Vector3(0.18, 1.62, 0.18),
    new THREE.Vector3(0.00, 1.64, 0.18),
  ];
  const inner_reservoirGeom = createLoftGeometry(THREE, inner_reservoirProfile, 40);
  const inner_reservoir = new THREE.Mesh(inner_reservoirGeom, brushed_metalMat);
  root.add(inner_reservoir);

  const reservoir_top_sealGeom = new THREE.TorusGeometry(0.17, 0.012, 8, 32);
  const reservoir_top_seal = new THREE.Mesh(reservoir_top_sealGeom, dark_metalMat);
  reservoir_top_seal.rotation.x = Math.PI / 2;
  reservoir_top_seal.position.y = 1.61;
  root.add(reservoir_top_seal);

  const inner_white_tubeProfile = [
    new THREE.Vector3(0.00, 1.56, 0.15),
    new THREE.Vector3(0.15, 1.56, 0.15),
    new THREE.Vector3(0.16, 1.66, 0.16),
    new THREE.Vector3(0.16, 3.47, 0.16),
    new THREE.Vector3(0.15, 3.56, 0.15),
    new THREE.Vector3(0.12, 3.64, 0.12),
    new THREE.Vector3(0.08, 3.69, 0.08),
    new THREE.Vector3(0.00, 3.70, 0.08),
  ];
  const inner_white_tubeGeom = createLoftGeometry(THREE, inner_white_tubeProfile, 40);
  const inner_white_tube = new THREE.Mesh(inner_white_tubeGeom, tubeMat);
  root.add(inner_white_tube);

  const tube_highlightGeom = new THREE.PlaneGeometry(0.025, 1.72);
  const tube_highlight = new THREE.Mesh(tube_highlightGeom, tube_highlightMat);
  tube_highlight.position.set(-0.055, 2.58, 0.164);
  root.add(tube_highlight);

  const top_connectorGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.25, 40);
  const top_connector = new THREE.Mesh(top_connectorGeom, brushed_metalMat);
  top_connector.position.y = 3.78;
  root.add(top_connector);

  const top_connector_lower_ringGeom = new THREE.TorusGeometry(0.225, 0.018, 8, 40);
  const top_connector_lower_ring = new THREE.Mesh(top_connector_lower_ringGeom, dark_metalMat);
  top_connector_lower_ring.rotation.x = Math.PI / 2;
  top_connector_lower_ring.position.y = 3.66;
  root.add(top_connector_lower_ring);

  const outer_glass_chamberGeom = new THREE.CylinderGeometry(0.35, 0.35, 3.12, 48, 1, true);
  const outer_glass_chamber = new THREE.Mesh(outer_glass_chamberGeom, glassMat);
  outer_glass_chamber.position.y = 2.23;
  root.add(outer_glass_chamber);

  const glass_highlightGeom = new THREE.PlaneGeometry(0.026, 2.72);
  const left_glass_highlight = new THREE.Mesh(glass_highlightGeom, glass_highlightMat);
  left_glass_highlight.position.set(-0.22, 2.25, 0.275);
  root.add(left_glass_highlight);

  const right_glass_highlight = new THREE.Mesh(glass_highlightGeom, glass_highlightMat);
  right_glass_highlight.position.set(0.22, 2.25, 0.275);
  root.add(right_glass_highlight);

  const support_rodsGeom = new THREE.CylinderGeometry(0.012, 0.012, 3.10, 10);
  const support_rods = new THREE.InstancedMesh(support_rodsGeom, polished_metalMat, 2);
  const support_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    support_dummy.position.set(i === 0 ? -0.326 : 0.326, 2.23, 0.015);
    support_dummy.updateMatrix();
    support_rods.setMatrixAt(i, support_dummy.matrix);
  }
  support_rods.instanceMatrix.needsUpdate = true;
  root.add(support_rods);

  const top_glass_sealGeom = new THREE.TorusGeometry(0.345, 0.022, 10, 48);
  const top_glass_seal = new THREE.Mesh(top_glass_sealGeom, polished_metalMat);
  top_glass_seal.rotation.x = Math.PI / 2;
  top_glass_seal.position.y = 3.79;
  root.add(top_glass_seal);

  const top_capProfile = [
    new THREE.Vector3(0.00, 3.86, 0.39),
    new THREE.Vector3(0.36, 3.86, 0.39),
    new THREE.Vector3(0.41, 3.88, 0.42),
    new THREE.Vector3(0.43, 3.92, 0.43),
    new THREE.Vector3(0.43, 4.02, 0.43),
    new THREE.Vector3(0.41, 4.07, 0.41),
    new THREE.Vector3(0.36, 4.10, 0.38),
    new THREE.Vector3(0.00, 4.10, 0.38),
  ];
  const top_capGeom = createLoftGeometry(THREE, top_capProfile, 48);
  const top_cap = new THREE.Mesh(top_capGeom, polished_metalMat);
  root.add(top_cap);

  const top_cap_lower_ringGeom = new THREE.TorusGeometry(0.397, 0.022, 10, 48);
  const top_cap_lower_ring = new THREE.Mesh(top_cap_lower_ringGeom, dark_metalMat);
  top_cap_lower_ring.rotation.x = Math.PI / 2;
  top_cap_lower_ring.position.y = 3.875;
  root.add(top_cap_lower_ring);

  const top_cap_faceGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.012, 48);
  const top_cap_face = new THREE.Mesh(top_cap_faceGeom, brushed_metalMat);
  top_cap_face.position.y = 4.102;
  root.add(top_cap_face);

  const side_valve_mountGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.09, 24);
  const side_valve_mount = new THREE.Mesh(side_valve_mountGeom, dark_metalMat);
  side_valve_mount.rotation.z = Math.PI / 2;
  side_valve_mount.position.set(0.365, 1.69, 0.03);
  root.add(side_valve_mount);

  const side_valve_shaftGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.20, 16);
  const side_valve_shaft = new THREE.Mesh(side_valve_shaftGeom, polished_metalMat);
  side_valve_shaft.rotation.z = Math.PI / 2;
  side_valve_shaft.position.set(0.47, 1.69, 0.03);
  root.add(side_valve_shaft);

  const side_valve_knobGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.055, 28);
  const side_valve_knob = new THREE.Mesh(side_valve_knobGeom, polished_metalMat);
  side_valve_knob.rotation.z = Math.PI / 2;
  side_valve_knob.position.set(0.585, 1.69, 0.03);
  root.add(side_valve_knob);

  const side_valve_faceGeom = new THREE.CylinderGeometry(0.066, 0.066, 0.012, 28);
  const side_valve_face = new THREE.Mesh(side_valve_faceGeom, brushed_metalMat);
  side_valve_face.rotation.z = Math.PI / 2;
  side_valve_face.position.set(0.618, 1.69, 0.03);
  root.add(side_valve_face);

  fitToUnitCube(THREE, root);
  return root;
}

function createLoftGeometry(THREE, stations, segments) {
  const positions = [];
  const indices = [];

  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];
    for (let j = 0; j <= segments; j++) {
      const angle = j / segments * Math.PI * 2;
      positions.push(
        Math.cos(angle) * station.x,
        station.y,
        Math.sin(angle) * station.z
      );
    }
  }

  const stride = segments + 1;
  for (let i = 0; i < stations.length - 1; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * stride + j;
      const b = a + 1;
      const d = (i + 1) * stride + j;
      const c = d + 1;
      indices.push(a, d, b, b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}