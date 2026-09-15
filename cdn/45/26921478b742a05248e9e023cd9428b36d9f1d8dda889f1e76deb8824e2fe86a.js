export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "toy_steam_locomotive";

  const redMat = new THREE.MeshStandardMaterial({ color: 0xe51b1f, metalness: 0.1, roughness: 0.3 });
  const darkRedMat = new THREE.MeshStandardMaterial({ color: 0x8f0b10, metalness: 0.0, roughness: 0.45 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf1efe7, metalness: 0.0, roughness: 0.35 });
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xe8e3d2, metalness: 0.0, roughness: 0.4 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x111315, metalness: 0.1, roughness: 0.8 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x24272a, metalness: 0.1, roughness: 0.8 });
  const windowMat = new THREE.MeshStandardMaterial({ color: 0x171313, metalness: 0.0, roughness: 0.3 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xb08d57, metalness: 0.5, roughness: 0.35 });

  const chassis_group = new THREE.Group();
  chassis_group.name = "chassis_group";
  root.add(chassis_group);

  const boiler_group = new THREE.Group();
  boiler_group.name = "boiler_group";
  root.add(boiler_group);

  const cab_group = new THREE.Group();
  cab_group.name = "cab_group";
  root.add(cab_group);

  const wheel_group = new THREE.Group();
  wheel_group.name = "wheel_group";
  root.add(wheel_group);

  const front_assembly = new THREE.Group();
  front_assembly.name = "front_assembly";
  root.add(front_assembly);

  const chassis_frameGeom = new THREE.BoxGeometry(1.55, 0.34, 4.35);
  const chassis_frame = new THREE.Mesh(chassis_frameGeom, blackMat);
  chassis_frame.name = "chassis_frame";
  chassis_frame.position.set(0, 0.56, 0.02);
  chassis_group.add(chassis_frame);

  const running_boardGeom = new THREE.BoxGeometry(1.78, 0.12, 4.15);
  const running_board = new THREE.Mesh(running_boardGeom, redMat);
  running_board.name = "running_board";
  running_board.position.set(0, 0.76, 0.02);
  chassis_group.add(running_board);

  const front_buffer_beamGeom = new THREE.BoxGeometry(1.68, 0.34, 0.28);
  const front_buffer_beam = new THREE.Mesh(front_buffer_beamGeom, blackMat);
  front_buffer_beam.name = "front_buffer_beam";
  front_buffer_beam.position.set(0, 0.55, 2.27);
  front_assembly.add(front_buffer_beam);

  const rear_buffer_beamGeom = new THREE.BoxGeometry(1.58, 0.30, 0.24);
  const rear_buffer_beam = new THREE.Mesh(rear_buffer_beamGeom, blackMat);
  rear_buffer_beam.name = "rear_buffer_beam";
  rear_buffer_beam.position.set(0, 0.56, -2.18);
  chassis_group.add(rear_buffer_beam);

  const side_railsGeom = new THREE.BoxGeometry(0.08, 0.18, 3.75);
  const side_rails = new THREE.InstancedMesh(side_railsGeom, blackMat, 2);
  side_rails.name = "side_rails";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.76 : 0.76, 0.42, 0.0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_rails.setMatrixAt(i, dummy.matrix);
  }
  side_rails.instanceMatrix.needsUpdate = true;
  chassis_group.add(side_rails);

  const underframe_blocksGeom = new THREE.BoxGeometry(1.18, 0.28, 0.38);
  const underframe_blocks = new THREE.InstancedMesh(underframe_blocksGeom, blackMat, 3);
  underframe_blocks.name = "underframe_blocks";
  for (let i = 0; i < 3; i++) {
    dummy.position.set(0, 0.34, -1.15 + i * 1.15);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    underframe_blocks.setMatrixAt(i, dummy.matrix);
  }
  underframe_blocks.instanceMatrix.needsUpdate = true;
  chassis_group.add(underframe_blocks);

  const boilerGeom = new THREE.CylinderGeometry(0.58, 0.58, 1.82, 32);
  const boiler = new THREE.Mesh(boilerGeom, redMat);
  boiler.name = "boiler";
  boiler.rotation.x = Math.PI / 2;
  boiler.position.set(0, 1.39, 0.70);
  boiler_group.add(boiler);

  const boiler_bandsGeom = new THREE.TorusGeometry(0.585, 0.025, 8, 32);
  const boiler_bands = new THREE.InstancedMesh(boiler_bandsGeom, darkRedMat, 3);
  boiler_bands.name = "boiler_bands";
  const bandPositions = [0.12, 0.72, 1.27];
  for (let i = 0; i < bandPositions.length; i++) {
    dummy.position.set(0, 1.39, bandPositions[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    boiler_bands.setMatrixAt(i, dummy.matrix);
  }
  boiler_bands.instanceMatrix.needsUpdate = true;
  boiler_group.add(boiler_bands);

  const boiler_handrailsGeom = new THREE.CylinderGeometry(0.025, 0.025, 1.48, 10);
  const boiler_handrails = new THREE.InstancedMesh(boiler_handrailsGeom, brassMat, 2);
  boiler_handrails.name = "boiler_handrails";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.65 : 0.65, 1.48, 0.78);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    boiler_handrails.setMatrixAt(i, dummy.matrix);
  }
  boiler_handrails.instanceMatrix.needsUpdate = true;
  boiler_group.add(boiler_handrails);

  const handrail_stanchionsGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.16, 8);
  const handrail_stanchions = new THREE.InstancedMesh(handrail_stanchionsGeom, brassMat, 6);
  handrail_stanchions.name = "handrail_stanchions";
  let stanchionIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.20, 0.78, 1.36]) {
      dummy.position.set(side * 0.60, 1.48, z);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      handrail_stanchions.setMatrixAt(stanchionIndex++, dummy.matrix);
    }
  }
  handrail_stanchions.instanceMatrix.needsUpdate = true;
  boiler_group.add(handrail_stanchions);

  const smokeboxGeom = new THREE.CylinderGeometry(0.64, 0.64, 0.34, 32);
  const smokebox = new THREE.Mesh(smokeboxGeom, whiteMat);
  smokebox.name = "smokebox";
  smokebox.rotation.x = Math.PI / 2;
  smokebox.position.set(0, 1.39, 1.70);
  boiler_group.add(smokebox);

  const smokebox_doorGeom = new THREE.CylinderGeometry(0.50, 0.50, 0.10, 32);
  const smokebox_door = new THREE.Mesh(smokebox_doorGeom, whiteMat);
  smokebox_door.name = "smokebox_door";
  smokebox_door.rotation.x = Math.PI / 2;
  smokebox_door.position.set(0, 1.39, 1.91);
  boiler_group.add(smokebox_door);

  const smokebox_rimGeom = new THREE.TorusGeometry(0.45, 0.035, 10, 32);
  const smokebox_rim = new THREE.Mesh(smokebox_rimGeom, creamMat);
  smokebox_rim.name = "smokebox_rim";
  smokebox_rim.position.set(0, 1.39, 1.97);
  boiler_group.add(smokebox_rim);

  const smokebox_latchGeom = new THREE.BoxGeometry(0.13, 0.20, 0.07);
  const smokebox_latch = new THREE.Mesh(smokebox_latchGeom, creamMat);
  smokebox_latch.name = "smokebox_latch";
  smokebox_latch.position.set(0.34, 1.34, 1.99);
  boiler_group.add(smokebox_latch);

  const smokebox_hingeGeom = new THREE.BoxGeometry(0.08, 0.12, 0.08);
  const smokebox_hinge = new THREE.Mesh(smokebox_hingeGeom, darkMat);
  smokebox_hinge.name = "smokebox_hinge";
  smokebox_hinge.position.set(-0.20, 1.62, 1.99);
  boiler_group.add(smokebox_hinge);

  const smokebox_center_bossGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.10, 24);
  const smokebox_center_boss = new THREE.Mesh(smokebox_center_bossGeom, whiteMat);
  smokebox_center_boss.name = "smokebox_center_boss";
  smokebox_center_boss.rotation.x = Math.PI / 2;
  smokebox_center_boss.position.set(0, 1.39, 2.00);
  boiler_group.add(smokebox_center_boss);

  const chimneyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.35, 0.12),
    new THREE.Vector2(0.28, 0.25),
    new THREE.Vector2(0.22, 0.48),
    new THREE.Vector2(0.21, 0.72),
    new THREE.Vector2(0.25, 1.00),
    new THREE.Vector2(0.34, 1.20),
    new THREE.Vector2(0.38, 1.25),
    new THREE.Vector2(0.00, 1.25)
  ];
  const chimneyGeom = new THREE.LatheGeometry(chimneyProfile);
  const chimney = new THREE.Mesh(chimneyGeom, whiteMat);
  chimney.name = "chimney";
  chimney.position.set(0, 1.88, 1.42);
  boiler_group.add(chimney);

  const chimney_capProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.39, 0.00),
    new THREE.Vector2(0.43, 0.05),
    new THREE.Vector2(0.40, 0.13),
    new THREE.Vector2(0.31, 0.19),
    new THREE.Vector2(0.10, 0.22),
    new THREE.Vector2(0.00, 0.22)
  ];
  const chimney_capGeom = new THREE.LatheGeometry(chimney_capProfile);
  const chimney_cap = new THREE.Mesh(chimney_capGeom, blackMat);
  chimney_cap.name = "chimney_cap";
  chimney_cap.position.set(0, 3.10, 1.42);
  boiler_group.add(chimney_cap);

  const chimney_openingGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.018, 20);
  const chimney_opening = new THREE.Mesh(chimney_openingGeom, darkMat);
  chimney_opening.name = "chimney_opening";
  chimney_opening.position.set(0, 3.325, 1.42);
  boiler_group.add(chimney_opening);

  const steam_dome_baseGeom = new THREE.CylinderGeometry(0.30, 0.30, 0.12, 24);
  const steam_dome_base = new THREE.Mesh(steam_dome_baseGeom, redMat);
  steam_dome_base.name = "steam_dome_base";
  steam_dome_base.position.set(0, 1.96, 0.30);
  boiler_group.add(steam_dome_base);

  const steam_domeGeom = new THREE.SphereGeometry(0.30, 24, 16);
  const steam_dome = new THREE.Mesh(steam_domeGeom, redMat);
  steam_dome.name = "steam_dome";
  steam_dome.scale.set(1, 0.78, 1);
  steam_dome.position.set(0, 2.10, 0.30);
  boiler_group.add(steam_dome);

  const steam_dome_capGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.06, 16);
  const steam_dome_cap = new THREE.Mesh(steam_dome_capGeom, brassMat);
  steam_dome_cap.name = "steam_dome_cap";
  steam_dome_cap.position.set(0, 2.34, 0.30);
  boiler_group.add(steam_dome_cap);

  const cab_bodyGeom = new THREE.BoxGeometry(1.50, 1.52, 1.90);
  const cab_body = new THREE.Mesh(cab_bodyGeom, redMat);
  cab_body.name = "cab_body";
  cab_body.position.set(0, 1.53, -1.05);
  cab_group.add(cab_body);

  const cab_front_postGeom = new THREE.BoxGeometry(1.52, 1.50, 0.12);
  const cab_front_post = new THREE.Mesh(cab_front_postGeom, redMat);
  cab_front_post.name = "cab_front_post";
  cab_front_post.position.set(0, 1.53, -0.10);
  cab_group.add(cab_front_post);

  const cab_rear_postGeom = new THREE.BoxGeometry(1.52, 1.50, 0.12);
  const cab_rear_post = new THREE.Mesh(cab_rear_postGeom, redMat);
  cab_rear_post.name = "cab_rear_post";
  cab_rear_post.position.set(0, 1.53, -1.98);
  cab_group.add(cab_rear_post);

  const cab_side_lower_panelsGeom = new THREE.BoxGeometry(0.035, 0.58, 1.78);
  const cab_side_lower_panels = new THREE.InstancedMesh(cab_side_lower_panelsGeom, redMat, 2);
  cab_side_lower_panels.name = "cab_side_lower_panels";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.77 : 0.77, 1.10, -1.05);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    cab_side_lower_panels.setMatrixAt(i, dummy.matrix);
  }
  cab_side_lower_panels.instanceMatrix.needsUpdate = true;
  cab_group.add(cab_side_lower_panels);

  const cab_side_top_railsGeom = new THREE.BoxGeometry(0.045, 0.13, 1.82);
  const cab_side_top_rails = new THREE.InstancedMesh(cab_side_top_railsGeom, redMat, 2);
  cab_side_top_rails.name = "cab_side_top_rails";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.775 : 0.775, 2.20, -1.05);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    cab_side_top_rails.setMatrixAt(i, dummy.matrix);
  }
  cab_side_top_rails.instanceMatrix.needsUpdate = true;
  cab_group.add(cab_side_top_rails);

  const cab_side_windowsGeom = new THREE.BoxGeometry(0.035, 0.54, 0.34);
  const cab_side_windows = new THREE.InstancedMesh(cab_side_windowsGeom, windowMat, 6);
  cab_side_windows.name = "cab_side_windows";
  let sideWindowIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.58, -1.05, -1.52]) {
      dummy.position.set(side * 0.775, 1.76, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      cab_side_windows.setMatrixAt(sideWindowIndex++, dummy.matrix);
    }
  }
  cab_side_windows.instanceMatrix.needsUpdate = true;
  cab_group.add(cab_side_windows);

  const cab_side_mullionsGeom = new THREE.BoxGeometry(0.045, 0.68, 0.075);
  const cab_side_mullions = new THREE.InstancedMesh(cab_side_mullionsGeom, redMat, 8);
  cab_side_mullions.name = "cab_side_mullions";
  let mullionIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.35, -0.815, -1.285, -1.75]) {
      dummy.position.set(side * 0.78, 1.76, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      cab_side_mullions.setMatrixAt(mullionIndex++, dummy.matrix);
    }
  }
  cab_side_mullions.instanceMatrix.needsUpdate = true;
  cab_group.add(cab_side_mullions);

  const cab_front_windowsGeom = new THREE.BoxGeometry(0.36, 0.48, 0.035);
  const cab_front_windows = new THREE.InstancedMesh(cab_front_windowsGeom, windowMat, 2);
  cab_front_windows.name = "cab_front_windows";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.42 : 0.42, 1.78, -0.025);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    cab_front_windows.setMatrixAt(i, dummy.matrix);
  }
  cab_front_windows.instanceMatrix.needsUpdate = true;
  cab_group.add(cab_front_windows);

  const cab_front_center_postGeom = new THREE.BoxGeometry(0.10, 0.62, 0.045);
  const cab_front_center_post = new THREE.Mesh(cab_front_center_postGeom, redMat);
  cab_front_center_post.name = "cab_front_center_post";
  cab_front_center_post.position.set(0, 1.78, -0.005);
  cab_group.add(cab_front_center_post);

  const cab_rear_windowsGeom = new THREE.BoxGeometry(0.36, 0.48, 0.035);
  const cab_rear_windows = new THREE.InstancedMesh(cab_rear_windowsGeom, windowMat, 2);
  cab_rear_windows.name = "cab_rear_windows";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.42 : 0.42, 1.78, -2.015);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    cab_rear_windows.setMatrixAt(i, dummy.matrix);
  }
  cab_rear_windows.instanceMatrix.needsUpdate = true;
  cab_group.add(cab_rear_windows);

  const cab_rear_center_postGeom = new THREE.BoxGeometry(0.10, 0.62, 0.045);
  const cab_rear_center_post = new THREE.Mesh(cab_rear_center_postGeom, redMat);
  cab_rear_center_post.name = "cab_rear_center_post";
  cab_rear_center_post.position.set(0, 1.78, -2.035);
  cab_group.add(cab_rear_center_post);

  const cab_roofShape = new THREE.Shape();
  cab_roofShape.moveTo(-0.96, 0.00);
  cab_roofShape.lineTo(-0.96, 0.07);
  cab_roofShape.bezierCurveTo(-0.78, 0.28, 0.78, 0.28, 0.96, 0.07);
  cab_roofShape.lineTo(0.96, 0.00);
  cab_roofShape.closePath();

  const cab_roofGeom = new THREE.ExtrudeGeometry(cab_roofShape, 2.05);
  const cab_roof = new THREE.Mesh(cab_roofGeom, redMat);
  cab_roof.name = "cab_roof";
  cab_roof.position.set(0, 2.28, -2.08);
  cab_group.add(cab_roof);

  const roof_edge_railsGeom = new THREE.CylinderGeometry(0.035, 0.035, 2.08, 10);
  const roof_edge_rails = new THREE.InstancedMesh(roof_edge_railsGeom, redMat, 2);
  roof_edge_rails.name = "roof_edge_rails";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.96 : 0.96, 2.34, -1.055);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    roof_edge_rails.setMatrixAt(i, dummy.matrix);
  }
  roof_edge_rails.instanceMatrix.needsUpdate = true;
  cab_group.add(roof_edge_rails);

  const wheelPositions = [
    [-0.86, 0.38, 1.35],
    [0.86, 0.38, 1.35],
    [-0.86, 0.38, -1.35],
    [0.86, 0.38, -1.35]
  ];

  const wheel_tiresGeom = new THREE.TorusGeometry(0.34, 0.10, 12, 32);
  const wheel_tires = new THREE.InstancedMesh(wheel_tiresGeom, creamMat, 4);
  wheel_tires.name = "wheel_tires";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_tires.setMatrixAt(i, dummy.matrix);
  }
  wheel_tires.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_tires);

  const wheel_discsGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.13, 28);
  const wheel_discs = new THREE.InstancedMesh(wheel_discsGeom, blackMat, 4);
  wheel_discs.name = "wheel_discs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_discs.setMatrixAt(i, dummy.matrix);
  }
  wheel_discs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_discs);

  const wheel_spokesGeom = new THREE.BoxGeometry(0.075, 0.25, 0.055);
  const wheel_spokes = new THREE.InstancedMesh(wheel_spokesGeom, darkMat, 32);
  wheel_spokes.name = "wheel_spokes";
  let spokeIndex = 0;
  for (const p of wheelPositions) {
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      dummy.position.set(
        p[0],
        p[1] + Math.cos(angle) * 0.16,
        p[2] + Math.sin(angle) * 0.16
      );
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_spokes.setMatrixAt(spokeIndex++, dummy.matrix);
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_spokes);

  const wheel_hubsGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.19, 20);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubsGeom, darkMat, 4);
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, dummy.matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_hubs);

  const axle_capsGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.045, 16);
  const axle_caps = new THREE.InstancedMesh(axle_capsGeom, blackMat, 4);
  axle_caps.name = "axle_caps";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    dummy.position.set(side * 0.985, p[1], p[2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    axle_caps.setMatrixAt(i, dummy.matrix);
  }
  axle_caps.instanceMatrix.needsUpdate = true;
  wheel_group.add(axle_caps);

  const front_buffersGeom = new THREE.CylinderGeometry(0.10, 0.10, 0.18, 16);
  const front_buffers = new THREE.InstancedMesh(front_buffersGeom, blackMat, 2);
  front_buffers.name = "front_buffers";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.52 : 0.52, 0.58, 2.45);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_buffers.setMatrixAt(i, dummy.matrix);
  }
  front_buffers.instanceMatrix.needsUpdate = true;
  front_assembly.add(front_buffers);

  const front_coupler_shaftGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.42, 12);
  const front_coupler_shaft = new THREE.Mesh(front_coupler_shaftGeom, blackMat);
  front_coupler_shaft.name = "front_coupler_shaft";
  front_coupler_shaft.rotation.x = Math.PI / 2;
  front_coupler_shaft.position.set(0, 0.50, 2.54);
  front_assembly.add(front_coupler_shaft);

  const front_coupler_loopGeom = new THREE.TorusGeometry(0.13, 0.035, 8, 20);
  const front_coupler_loop = new THREE.Mesh(front_coupler_loopGeom, blackMat);
  front_coupler_loop.name = "front_coupler_loop";
  front_coupler_loop.scale.set(1, 0.65, 1);
  front_coupler_loop.position.set(0, 0.50, 2.76);
  front_assembly.add(front_coupler_loop);

  const front_supportsGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.34, 10);
  const front_supports = new THREE.InstancedMesh(front_supportsGeom, blackMat, 2);
  front_supports.name = "front_supports";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.58 : 0.58, 0.43, 2.34);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_supports.setMatrixAt(i, dummy.matrix);
  }
  front_supports.instanceMatrix.needsUpdate = true;
  front_assembly.add(front_supports);

  const rear_coupler_shaftGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.30, 12);
  const rear_coupler_shaft = new THREE.Mesh(rear_coupler_shaftGeom, blackMat);
  rear_coupler_shaft.name = "rear_coupler_shaft";
  rear_coupler_shaft.rotation.x = Math.PI / 2;
  rear_coupler_shaft.position.set(0, 0.52, -2.39);
  chassis_group.add(rear_coupler_shaft);

  const rear_coupler_loopGeom = new THREE.TorusGeometry(0.11, 0.032, 8, 18);
  const rear_coupler_loop = new THREE.Mesh(rear_coupler_loopGeom, blackMat);
  rear_coupler_loop.name = "rear_coupler_loop";
  rear_coupler_loop.scale.set(1, 0.65, 1);
  rear_coupler_loop.position.set(0, 0.52, -2.57);
  chassis_group.add(rear_coupler_loop);

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