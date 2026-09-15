export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "round_tufted_ottoman";

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xaaa39a,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x898279,
    metalness: 0.0,
    roughness: 0.95,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x302a25,
    metalness: 0.0,
    roughness: 0.9,
  });
  const footMat = new THREE.MeshStandardMaterial({
    color: 0x2b211d,
    metalness: 0.0,
    roughness: 0.75,
  });

  const seat_base = new THREE.Group();
  seat_base.name = "seat_base";
  root.add(seat_base);

  const base_plinth = new THREE.Group();
  base_plinth.name = "base_plinth";
  root.add(base_plinth);

  const tufted_body = new THREE.Group();
  tufted_body.name = "tufted_body";
  root.add(tufted_body);

  const top_cushion = new THREE.Group();
  top_cushion.name = "top_cushion";
  root.add(top_cushion);

  const footGeom = new THREE.SphereGeometry(1, 20, 12);
  const feet = new THREE.InstancedMesh(footGeom, footMat, 4);
  feet.name = "feet";
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-0.68, -0.035, 0.55],
    [0.68, -0.035, 0.55],
    [-0.68, -0.035, -0.55],
    [0.68, -0.035, -0.55],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    footDummy.position.set(p[0], p[1], p[2]);
    footDummy.scale.set(0.23, 0.11, 0.23);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  base_plinth.add(feet);

  const lower_base_coreGeom = new THREE.CylinderGeometry(1.27, 1.27, 0.58, 48);
  const lower_base_core = new THREE.Mesh(lower_base_coreGeom, fabricMat);
  lower_base_core.name = "lower_base_core";
  lower_base_core.position.y = 0.34;
  base_plinth.add(lower_base_core);

  const lower_base_lobeGeom = new THREE.SphereGeometry(1, 28, 18);
  const lower_base_lobes = new THREE.InstancedMesh(
    lower_base_lobeGeom,
    fabricMat,
    12
  );
  lower_base_lobes.name = "lower_base_lobes";
  const lowerLobeDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    lowerLobeDummy.position.set(
      Math.sin(angle) * 1.2,
      0.34,
      Math.cos(angle) * 1.2
    );
    lowerLobeDummy.rotation.set(0, angle, 0);
    lowerLobeDummy.scale.set(0.38, 0.31, 0.25);
    lowerLobeDummy.updateMatrix();
    lower_base_lobes.setMatrixAt(i, lowerLobeDummy.matrix);
  }
  lower_base_lobes.instanceMatrix.needsUpdate = true;
  base_plinth.add(lower_base_lobes);

  const lower_base_seamGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.48, 8);
  const lower_base_seams = new THREE.InstancedMesh(
    lower_base_seamGeom,
    seamMat,
    12
  );
  lower_base_seams.name = "lower_base_seams";
  const lowerSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i + 0.5) / 12 * Math.PI * 2;
    lowerSeamDummy.position.set(
      Math.sin(angle) * 1.445,
      0.34,
      Math.cos(angle) * 1.445
    );
    lowerSeamDummy.rotation.set(0, 0, 0);
    lowerSeamDummy.scale.set(1, 1, 1);
    lowerSeamDummy.updateMatrix();
    lower_base_seams.setMatrixAt(i, lowerSeamDummy.matrix);
  }
  lower_base_seams.instanceMatrix.needsUpdate = true;
  base_plinth.add(lower_base_seams);

  const lower_base_top_pipingGeom = new THREE.TorusGeometry(1.29, 0.025, 8, 64);
  const lower_base_top_piping = new THREE.Mesh(
    lower_base_top_pipingGeom,
    seamMat
  );
  lower_base_top_piping.name = "lower_base_top_piping";
  lower_base_top_piping.rotation.x = Math.PI / 2;
  lower_base_top_piping.position.y = 0.61;
  base_plinth.add(lower_base_top_piping);

  const lower_base_bottom_pipingGeom = new THREE.TorusGeometry(1.27, 0.022, 8, 64);
  const lower_base_bottom_piping = new THREE.Mesh(
    lower_base_bottom_pipingGeom,
    seamMat
  );
  lower_base_bottom_piping.name = "lower_base_bottom_piping";
  lower_base_bottom_piping.rotation.x = Math.PI / 2;
  lower_base_bottom_piping.position.y = 0.08;
  base_plinth.add(lower_base_bottom_piping);

  const body_coreGeom = new THREE.CylinderGeometry(1.31, 1.31, 1.28, 48);
  const body_core = new THREE.Mesh(body_coreGeom, fabricMat);
  body_core.name = "body_core";
  body_core.position.y = 1.25;
  tufted_body.add(body_core);

  const body_upper_bolsterGeom = new THREE.TorusGeometry(1.18, 0.18, 16, 64);
  const body_upper_bolster = new THREE.Mesh(body_upper_bolsterGeom, fabricMat);
  body_upper_bolster.name = "body_upper_bolster";
  body_upper_bolster.rotation.x = Math.PI / 2;
  body_upper_bolster.position.y = 1.79;
  tufted_body.add(body_upper_bolster);

  const body_lower_bolsterGeom = new THREE.TorusGeometry(1.18, 0.17, 16, 64);
  const body_lower_bolster = new THREE.Mesh(body_lower_bolsterGeom, fabricMat);
  body_lower_bolster.name = "body_lower_bolster";
  body_lower_bolster.rotation.x = Math.PI / 2;
  body_lower_bolster.position.y = 0.72;
  tufted_body.add(body_lower_bolster);

  const body_lobeGeom = new THREE.SphereGeometry(1, 28, 18);
  const body_lobes = new THREE.InstancedMesh(body_lobeGeom, fabricMat, 24);
  body_lobes.name = "body_lobes";
  const bodyLobeDummy = new THREE.Object3D();
  for (let row = 0; row < 2; row++) {
    const y = row === 0 ? 1.04 : 1.5;
    const offset = row === 0 ? 0 : Math.PI / 8;
    for (let i = 0; i < 12; i++) {
      const index = row * 12 + i;
      const angle = i / 12 * Math.PI * 2 + offset;
      bodyLobeDummy.position.set(
        Math.sin(angle) * 1.22,
        y,
        Math.cos(angle) * 1.22
      );
      bodyLobeDummy.rotation.set(0, angle, 0);
      bodyLobeDummy.scale.set(0.4, 0.43, 0.23);
      bodyLobeDummy.updateMatrix();
      body_lobes.setMatrixAt(index, bodyLobeDummy.matrix);
    }
  }
  body_lobes.instanceMatrix.needsUpdate = true;
  tufted_body.add(body_lobes);

  const body_buttonGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.028, 18);
  const body_buttons = new THREE.InstancedMesh(body_buttonGeom, buttonMat, 16);
  body_buttons.name = "body_buttons";
  const bodyButtonDummy = new THREE.Object3D();
  const cylinderAxis = new THREE.Vector3(0, 1, 0);
  for (let row = 0; row < 2; row++) {
    const y = row === 0 ? 1.04 : 1.5;
    const offset = row === 0 ? Math.PI / 12 : -Math.PI / 12;
    for (let i = 0; i < 8; i++) {
      const index = row * 8 + i;
      const angle = i / 8 * Math.PI * 2 + offset;
      const normal = new THREE.Vector3(
        Math.sin(angle),
        0,
        Math.cos(angle)
      ).normalize();
      bodyButtonDummy.position.set(
        normal.x * 1.455,
        y,
        normal.z * 1.455
      );
      bodyButtonDummy.quaternion.setFromUnitVectors(cylinderAxis, normal);
      bodyButtonDummy.scale.set(1, 1, 1);
      bodyButtonDummy.updateMatrix();
      body_buttons.setMatrixAt(index, bodyButtonDummy.matrix);
    }
  }
  body_buttons.instanceMatrix.needsUpdate = true;
  tufted_body.add(body_buttons);

  const body_tuft_seamGeom = new THREE.CylinderGeometry(0.011, 0.011, 1, 8);
  const body_tuft_seams = new THREE.InstancedMesh(
    body_tuft_seamGeom,
    seamMat,
    32
  );
  body_tuft_seams.name = "body_tuft_seams";
  const bodySeamDummy = new THREE.Object3D();
  const seamUp = new THREE.Vector3(0, 1, 0);
  let bodySeamIndex = 0;
  for (let row = 0; row < 2; row++) {
    const centerY = row === 0 ? 1.04 : 1.5;
    const offset = row === 0 ? Math.PI / 12 : -Math.PI / 12;
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2 + offset;
      const radial = new THREE.Vector3(
        Math.sin(angle),
        0,
        Math.cos(angle)
      );
      const tangent = new THREE.Vector3(
        Math.cos(angle),
        0,
        -Math.sin(angle)
      );
      for (const direction of [-1, 1]) {
        const start = new THREE.Vector3(
          radial.x * 1.45,
          centerY,
          radial.z * 1.45
        );
        const end = start.clone()
          .addScaledVector(tangent, direction * 0.36)
          .add(new THREE.Vector3(0, 0.43, 0));
        const delta = end.clone().sub(start);
        const length = delta.length();
        bodySeamDummy.position.copy(start).add(end).multiplyScalar(0.5);
        bodySeamDummy.quaternion.setFromUnitVectors(
          seamUp,
          delta.clone().normalize()
        );
        bodySeamDummy.scale.set(1, length, 1);
        bodySeamDummy.updateMatrix();
        body_tuft_seams.setMatrixAt(bodySeamIndex++, bodySeamDummy.matrix);
      }
    }
  }
  body_tuft_seams.instanceMatrix.needsUpdate = true;
  tufted_body.add(body_tuft_seams);

  const top_cushion_coreGeom = new THREE.CylinderGeometry(1.3, 1.3, 0.42, 48);
  const top_cushion_core = new THREE.Mesh(top_cushion_coreGeom, fabricMat);
  top_cushion_core.name = "top_cushion_core";
  top_cushion_core.position.y = 2.08;
  top_cushion.add(top_cushion_core);

  const top_edge_bolsterGeom = new THREE.TorusGeometry(1.2, 0.28, 20, 72);
  const top_edge_bolster = new THREE.Mesh(top_edge_bolsterGeom, fabricMat);
  top_edge_bolster.name = "top_edge_bolster";
  top_edge_bolster.rotation.x = Math.PI / 2;
  top_edge_bolster.position.y = 2.08;
  top_cushion.add(top_edge_bolster);

  const top_cushion_lobeGeom = new THREE.SphereGeometry(1, 32, 20);
  const top_cushion_lobes = new THREE.InstancedMesh(
    top_cushion_lobeGeom,
    fabricMat,
    12
  );
  top_cushion_lobes.name = "top_cushion_lobes";
  const topLobeDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    topLobeDummy.position.set(
      Math.sin(angle) * 1.16,
      2.1,
      Math.cos(angle) * 1.16
    );
    topLobeDummy.rotation.set(0, angle, 0);
    topLobeDummy.scale.set(0.46, 0.3, 0.38);
    topLobeDummy.updateMatrix();
    top_cushion_lobes.setMatrixAt(i, topLobeDummy.matrix);
  }
  top_cushion_lobes.instanceMatrix.needsUpdate = true;
  top_cushion.add(top_cushion_lobes);

  const top_inner_cushionGeom = new THREE.SphereGeometry(1, 32, 20);
  const top_inner_cushion = new THREE.Mesh(top_inner_cushionGeom, fabricMat);
  top_inner_cushion.name = "top_inner_cushion";
  top_inner_cushion.position.y = 2.17;
  top_inner_cushion.scale.set(0.88, 0.24, 0.88);
  top_cushion.add(top_inner_cushion);

  const top_center_padGeom = new THREE.SphereGeometry(1, 24, 16);
  const top_center_pad = new THREE.Mesh(top_center_padGeom, fabricMat);
  top_center_pad.name = "top_center_pad";
  top_center_pad.position.y = 2.25;
  top_center_pad.scale.set(0.29, 0.1, 0.29);
  top_cushion.add(top_center_pad);

  const top_edge_seamGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.48, 8);
  const top_edge_seams = new THREE.InstancedMesh(
    top_edge_seamGeom,
    seamMat,
    12
  );
  top_edge_seams.name = "top_edge_seams";
  const topEdgeSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i + 0.5) / 12 * Math.PI * 2;
    topEdgeSeamDummy.position.set(
      Math.sin(angle) * 1.475,
      2.08,
      Math.cos(angle) * 1.475
    );
    topEdgeSeamDummy.rotation.set(0, 0, 0);
    topEdgeSeamDummy.scale.set(1, 1, 1);
    topEdgeSeamDummy.updateMatrix();
    top_edge_seams.setMatrixAt(i, topEdgeSeamDummy.matrix);
  }
  top_edge_seams.instanceMatrix.needsUpdate = true;
  top_cushion.add(top_edge_seams);

  const top_tuft_seamGeom = new THREE.CylinderGeometry(0.012, 0.012, 1, 8);
  const top_tuft_seams = new THREE.InstancedMesh(
    top_tuft_seamGeom,
    seamMat,
    12
  );
  top_tuft_seams.name = "top_tuft_seams";
  const topSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    const start = new THREE.Vector3(
      Math.sin(angle) * 0.2,
      2.335,
      Math.cos(angle) * 0.2
    );
    const end = new THREE.Vector3(
      Math.sin(angle) * 1.3,
      2.32,
      Math.cos(angle) * 1.3
    );
    const delta = end.clone().sub(start);
    const length = delta.length();
    topSeamDummy.position.copy(start).add(end).multiplyScalar(0.5);
    topSeamDummy.quaternion.setFromUnitVectors(
      seamUp,
      delta.clone().normalize()
    );
    topSeamDummy.scale.set(1, length, 1);
    topSeamDummy.updateMatrix();
    top_tuft_seams.setMatrixAt(i, topSeamDummy.matrix);
  }
  top_tuft_seams.instanceMatrix.needsUpdate = true;
  top_cushion.add(top_tuft_seams);

  const top_center_buttonGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.025, 18);
  const top_center_button = new THREE.Mesh(top_center_buttonGeom, buttonMat);
  top_center_button.name = "top_center_button";
  top_center_button.position.y = 2.355;
  top_cushion.add(top_center_button);

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