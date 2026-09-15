export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_cabinet";

  const cabinetW = 1.16;
  const cabinetD = 0.72;
  const cabinetH = 1.24;
  const doorW = 0.49;
  const doorH = 0.94;
  const doorY = 0.61;

  function makeWoodTexture(THREE, baseR, baseG, baseB, vertical, phase) {
    const size = 96;
    const data = new Uint8Array(size * size * 4);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = x / (size - 1);
        const v = y / (size - 1);
        const across = vertical ? u : v;
        const along = vertical ? v : u;

        const broad = Math.sin(
          across * 31 +
          Math.sin(along * 5.2 + phase) * 1.8
        );
        const fine = Math.sin(
          across * 117 +
          Math.sin(along * 13 + phase * 0.7) * 2.2
        );
        const flowing = Math.sin(
          along * 8.5 +
          Math.sin(across * 7 + phase) * 2.4
        );

        const dx1 = u - 0.28;
        const dy1 = v - 0.37;
        const dist1 = Math.sqrt(dx1 * dx1 * 1.5 + dy1 * dy1 * 5.5);
        const knot1 = Math.sin(dist1 * 38 - phase * 4) * Math.exp(-dist1 * 9);

        const dx2 = u - 0.73;
        const dy2 = v - 0.69;
        const dist2 = Math.sqrt(dx2 * dx2 * 1.3 + dy2 * dy2 * 7.0);
        const knot2 = Math.sin(dist2 * 44 + phase * 3) * Math.exp(-dist2 * 11);

        const tone =
          0.94 +
          broad * 0.055 +
          fine * 0.022 +
          flowing * 0.018 +
          knot1 * 0.12 +
          knot2 * 0.08;

        const index = (y * size + x) * 4;
        data[index] = Math.max(0, Math.min(255, Math.round(baseR * tone)));
        data[index + 1] = Math.max(0, Math.min(255, Math.round(baseG * tone)));
        data[index + 2] = Math.max(0, Math.min(255, Math.round(baseB * tone)));
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(data, size, size);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  const frame_woodTexture = makeWoodTexture(THREE, 158, 103, 61, false, 0.4);
  const side_woodTexture = makeWoodTexture(THREE, 126, 82, 49, true, 1.2);
  const left_doorTexture = makeWoodTexture(THREE, 173, 116, 69, true, 2.0);
  const right_doorTexture = makeWoodTexture(THREE, 169, 112, 67, true, 2.8);
  const top_woodTexture = makeWoodTexture(THREE, 184, 137, 91, false, 3.5);

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: frame_woodTexture,
    metalness: 0.0,
    roughness: 0.6
  });
  const side_panelMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: side_woodTexture,
    metalness: 0.0,
    roughness: 0.6
  });
  const left_doorMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: left_doorTexture,
    metalness: 0.0,
    roughness: 0.6
  });
  const right_doorMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: right_doorTexture,
    metalness: 0.0,
    roughness: 0.6
  });
  const top_slabMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: top_woodTexture,
    metalness: 0.0,
    roughness: 0.6
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x4b2d1d,
    metalness: 0.0,
    roughness: 0.75
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x1d130d,
    metalness: 0.0,
    roughness: 0.9
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.3
  });

  const cabinet_carcass = new THREE.Group();
  cabinet_carcass.name = "cabinet_carcass";
  root.add(cabinet_carcass);

  const top_slabShape = new THREE.Shape();
  top_slabShape.moveTo(-0.66, -0.035);
  top_slabShape.lineTo(0.66, -0.035);
  top_slabShape.lineTo(0.66, 0.035);
  top_slabShape.lineTo(-0.66, 0.035);
  top_slabShape.closePath();

  const top_slabGeom = new THREE.ExtrudeGeometry(top_slabShape, {
    depth: 0.80,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  const top_slab = new THREE.Mesh(top_slabGeom, top_slabMat);
  top_slab.name = "top_slab";
  top_slab.position.set(0, 1.205, -0.40);
  cabinet_carcass.add(top_slab);

  const top_front_edgeGeom = new THREE.BoxGeometry(1.28, 0.055, 0.035);
  const top_front_edge = new THREE.Mesh(top_front_edgeGeom, top_slabMat);
  top_front_edge.name = "top_front_edge";
  top_front_edge.position.set(0, 1.185, 0.405);
  cabinet_carcass.add(top_front_edge);

  const front_shadow_gapGeom = new THREE.BoxGeometry(1.04, 0.018, 0.018);
  const front_shadow_gap = new THREE.Mesh(front_shadow_gapGeom, shadowMat);
  front_shadow_gap.name = "front_shadow_gap";
  front_shadow_gap.position.set(0, 1.151, 0.371);
  cabinet_carcass.add(front_shadow_gap);

  const side_panelGeom = new THREE.BoxGeometry(0.035, 0.96, 0.58);

  const left_side_panel = new THREE.Mesh(side_panelGeom, side_panelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-0.56, 0.61, -0.01);
  cabinet_carcass.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, side_panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.56, 0.61, -0.01);
  cabinet_carcass.add(right_side_panel);

  const back_panelGeom = new THREE.BoxGeometry(1.08, 0.96, 0.025);
  const back_panel = new THREE.Mesh(back_panelGeom, side_panelMat);
  back_panel.name = "back_panel";
  back_panel.position.set(0, 0.61, -0.345);
  cabinet_carcass.add(back_panel);

  const front_stileGeom = new THREE.BoxGeometry(0.07, 1.00, 0.07);

  const left_front_stile = new THREE.Mesh(front_stileGeom, frameMat);
  left_front_stile.name = "left_front_stile";
  left_front_stile.position.set(-0.545, 0.62, 0.345);
  cabinet_carcass.add(left_front_stile);

  const right_front_stile = new THREE.Mesh(front_stileGeom, frameMat);
  right_front_stile.name = "right_front_stile";
  right_front_stile.position.set(0.545, 0.62, 0.345);
  cabinet_carcass.add(right_front_stile);

  const rear_stileGeom = new THREE.BoxGeometry(0.07, 1.00, 0.07);

  const left_rear_stile = new THREE.Mesh(rear_stileGeom, frameMat);
  left_rear_stile.name = "left_rear_stile";
  left_rear_stile.position.set(-0.545, 0.62, -0.315);
  cabinet_carcass.add(left_rear_stile);

  const right_rear_stile = new THREE.Mesh(rear_stileGeom, frameMat);
  right_rear_stile.name = "right_rear_stile";
  right_rear_stile.position.set(0.545, 0.62, -0.315);
  cabinet_carcass.add(right_rear_stile);

  const side_railGeom = new THREE.BoxGeometry(0.07, 0.075, 0.60);

  const left_upper_side_rail = new THREE.Mesh(side_railGeom, frameMat);
  left_upper_side_rail.name = "left_upper_side_rail";
  left_upper_side_rail.position.set(-0.545, 1.105, -0.01);
  cabinet_carcass.add(left_upper_side_rail);

  const right_upper_side_rail = new THREE.Mesh(side_railGeom, frameMat);
  right_upper_side_rail.name = "right_upper_side_rail";
  right_upper_side_rail.position.set(0.545, 1.105, -0.01);
  cabinet_carcass.add(right_upper_side_rail);

  const left_lower_side_rail = new THREE.Mesh(side_railGeom, frameMat);
  left_lower_side_rail.name = "left_lower_side_rail";
  left_lower_side_rail.position.set(-0.545, 0.135, -0.01);
  cabinet_carcass.add(left_lower_side_rail);

  const right_lower_side_rail = new THREE.Mesh(side_railGeom, frameMat);
  right_lower_side_rail.name = "right_lower_side_rail";
  right_lower_side_rail.position.set(0.545, 0.135, -0.01);
  cabinet_carcass.add(right_lower_side_rail);

  const front_plinthGeom = new THREE.BoxGeometry(1.20, 0.11, 0.12);
  const front_plinth = new THREE.Mesh(front_plinthGeom, frameMat);
  front_plinth.name = "front_plinth";
  front_plinth.position.set(0, 0.065, 0.385);
  cabinet_carcass.add(front_plinth);

  const rear_plinthGeom = new THREE.BoxGeometry(1.20, 0.10, 0.10);
  const rear_plinth = new THREE.Mesh(rear_plinthGeom, frameMat);
  rear_plinth.name = "rear_plinth";
  rear_plinth.position.set(0, 0.06, -0.34);
  cabinet_carcass.add(rear_plinth);

  const side_plinthGeom = new THREE.BoxGeometry(0.10, 0.10, 0.66);

  const left_side_plinth = new THREE.Mesh(side_plinthGeom, frameMat);
  left_side_plinth.name = "left_side_plinth";
  left_side_plinth.position.set(-0.55, 0.06, 0.01);
  cabinet_carcass.add(left_side_plinth);

  const right_side_plinth = new THREE.Mesh(side_plinthGeom, frameMat);
  right_side_plinth.name = "right_side_plinth";
  right_side_plinth.position.set(0.55, 0.06, 0.01);
  cabinet_carcass.add(right_side_plinth);

  const footGeom = new THREE.BoxGeometry(0.17, 0.07, 0.15);
  const feet = new THREE.InstancedMesh(footGeom, frameMat, 4);
  feet.name = "feet";
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-0.49, -0.015, 0.34],
    [0.49, -0.015, 0.34],
    [-0.49, -0.015, -0.29],
    [0.49, -0.015, -0.29]
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(
      footPositions[i][0],
      footPositions[i][1],
      footPositions[i][2]
    );
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  cabinet_carcass.add(feet);

  const door_assembly = new THREE.Group();
  door_assembly.name = "door_assembly";
  root.add(door_assembly);

  const door_shadowGeom = new THREE.BoxGeometry(doorW + 0.018, doorH + 0.018, 0.012);

  const left_door_shadow = new THREE.Mesh(door_shadowGeom, shadowMat);
  left_door_shadow.name = "left_door_shadow";
  left_door_shadow.position.set(-0.25, doorY, 0.374);
  door_assembly.add(left_door_shadow);

  const right_door_shadow = new THREE.Mesh(door_shadowGeom, shadowMat);
  right_door_shadow.name = "right_door_shadow";
  right_door_shadow.position.set(0.25, doorY, 0.374);
  door_assembly.add(right_door_shadow);

  const door_backingGeom = new THREE.BoxGeometry(doorW, doorH, 0.026);
  const door_stileGeom = new THREE.BoxGeometry(0.065, doorH, 0.045);
  const door_railGeom = new THREE.BoxGeometry(doorW - 0.13, 0.075, 0.045);
  const door_panelGeom = new THREE.BoxGeometry(doorW - 0.15, doorH - 0.18, 0.022);
  const door_bevel_verticalGeom = new THREE.BoxGeometry(0.018, doorH - 0.19, 0.018);
  const door_bevel_horizontalGeom = new THREE.BoxGeometry(doorW - 0.17, 0.018, 0.018);

  const left_door = new THREE.Group();
  left_door.name = "left_door";
  left_door.position.x = -0.25;
  door_assembly.add(left_door);

  const left_door_backing = new THREE.Mesh(door_backingGeom, left_doorMat);
  left_door_backing.name = "left_door_backing";
  left_door_backing.position.set(0, doorY, 0.386);
  left_door.add(left_door_backing);

  const left_door_left_stile = new THREE.Mesh(door_stileGeom, left_doorMat);
  left_door_left_stile.name = "left_door_left_stile";
  left_door_left_stile.position.set(-doorW / 2 + 0.0325, doorY, 0.397);
  left_door.add(left_door_left_stile);

  const left_door_right_stile = new THREE.Mesh(door_stileGeom, left_doorMat);
  left_door_right_stile.name = "left_door_right_stile";
  left_door_right_stile.position.set(doorW / 2 - 0.0325, doorY, 0.397);
  left_door.add(left_door_right_stile);

  const left_door_top_rail = new THREE.Mesh(door_railGeom, left_doorMat);
  left_door_top_rail.name = "left_door_top_rail";
  left_door_top_rail.position.set(0, doorY + doorH / 2 - 0.0375, 0.397);
  left_door.add(left_door_top_rail);

  const left_door_bottom_rail = new THREE.Mesh(door_railGeom, left_doorMat);
  left_door_bottom_rail.name = "left_door_bottom_rail";
  left_door_bottom_rail.position.set(0, doorY - doorH / 2 + 0.0375, 0.397);
  left_door.add(left_door_bottom_rail);

  const left_door_panel = new THREE.Mesh(door_panelGeom, left_doorMat);
  left_door_panel.name = "left_door_panel";
  left_door_panel.position.set(0, doorY, 0.402);
  left_door.add(left_door_panel);

  const left_door_left_bevel = new THREE.Mesh(door_bevel_verticalGeom, left_doorMat);
  left_door_left_bevel.name = "left_door_left_bevel";
  left_door_left_bevel.position.set(-doorW / 2 + 0.078, doorY, 0.416);
  left_door.add(left_door_left_bevel);

  const left_door_right_bevel = new THREE.Mesh(door_bevel_verticalGeom, left_doorMat);
  left_door_right_bevel.name = "left_door_right_bevel";
  left_door_right_bevel.position.set(doorW / 2 - 0.078, doorY, 0.416);
  left_door.add(left_door_right_bevel);

  const left_door_top_bevel = new THREE.Mesh(door_bevel_horizontalGeom, left_doorMat);
  left_door_top_bevel.name = "left_door_top_bevel";
  left_door_top_bevel.position.set(0, doorY + doorH / 2 - 0.095, 0.416);
  left_door.add(left_door_top_bevel);

  const left_door_bottom_bevel = new THREE.Mesh(door_bevel_horizontalGeom, left_doorMat);
  left_door_bottom_bevel.name = "left_door_bottom_bevel";
  left_door_bottom_bevel.position.set(0, doorY - doorH / 2 + 0.095, 0.416);
  left_door.add(left_door_bottom_bevel);

  const right_door = new THREE.Group();
  right_door.name = "right_door";
  right_door.position.x = 0.25;
  door_assembly.add(right_door);

  const right_door_backing = new THREE.Mesh(door_backingGeom, right_doorMat);
  right_door_backing.name = "right_door_backing";
  right_door_backing.position.set(0, doorY, 0.386);
  right_door.add(right_door_backing);

  const right_door_left_stile = new THREE.Mesh(door_stileGeom, right_doorMat);
  right_door_left_stile.name = "right_door_left_stile";
  right_door_left_stile.position.set(-doorW / 2 + 0.0325, doorY, 0.397);
  right_door.add(right_door_left_stile);

  const right_door_right_stile = new THREE.Mesh(door_stileGeom, right_doorMat);
  right_door_right_stile.name = "right_door_right_stile";
  right_door_right_stile.position.set(doorW / 2 - 0.0325, doorY, 0.397);
  right_door.add(right_door_right_stile);

  const right_door_top_rail = new THREE.Mesh(door_railGeom, right_doorMat);
  right_door_top_rail.name = "right_door_top_rail";
  right_door_top_rail.position.set(0, doorY + doorH / 2 - 0.0375, 0.397);
  right_door.add(right_door_top_rail);

  const right_door_bottom_rail = new THREE.Mesh(door_railGeom, right_doorMat);
  right_door_bottom_rail.name = "right_door_bottom_rail";
  right_door_bottom_rail.position.set(0, doorY - doorH / 2 + 0.0375, 0.397);
  right_door.add(right_door_bottom_rail);

  const right_door_panel = new THREE.Mesh(door_panelGeom, right_doorMat);
  right_door_panel.name = "right_door_panel";
  right_door_panel.position.set(0, doorY, 0.402);
  right_door.add(right_door_panel);

  const right_door_left_bevel = new THREE.Mesh(door_bevel_verticalGeom, right_doorMat);
  right_door_left_bevel.name = "right_door_left_bevel";
  right_door_left_bevel.position.set(-doorW / 2 + 0.078, doorY, 0.416);
  right_door.add(right_door_left_bevel);

  const right_door_right_bevel = new THREE.Mesh(door_bevel_verticalGeom, right_doorMat);
  right_door_right_bevel.name = "right_door_right_bevel";
  right_door_right_bevel.position.set(doorW / 2 - 0.078, doorY, 0.416);
  right_door.add(right_door_right_bevel);

  const right_door_top_bevel = new THREE.Mesh(door_bevel_horizontalGeom, right_doorMat);
  right_door_top_bevel.name = "right_door_top_bevel";
  right_door_top_bevel.position.set(0, doorY + doorH / 2 - 0.095, 0.416);
  right_door.add(right_door_top_bevel);

  const right_door_bottom_bevel = new THREE.Mesh(door_bevel_horizontalGeom, right_doorMat);
  right_door_bottom_bevel.name = "right_door_bottom_bevel";
  right_door_bottom_bevel.position.set(0, doorY - doorH / 2 + 0.095, 0.416);
  right_door.add(right_door_bottom_bevel);

  const center_door_gapGeom = new THREE.BoxGeometry(0.012, doorH - 0.015, 0.012);
  const center_door_gap = new THREE.Mesh(center_door_gapGeom, shadowMat);
  center_door_gap.name = "center_door_gap";
  center_door_gap.position.set(0, doorY, 0.424);
  door_assembly.add(center_door_gap);

  const hardware = new THREE.Group();
  hardware.name = "hardware";
  root.add(hardware);

  const hinge_plateGeom = new THREE.BoxGeometry(0.022, 0.072, 0.012);
  const door_hinges = new THREE.InstancedMesh(hinge_plateGeom, brassMat, 4);
  door_hinges.name = "door_hinges";
  const hingeDummy = new THREE.Object3D();
  const hingePositions = [
    [-0.493, 0.36, 0.427],
    [-0.493, 0.86, 0.427],
    [0.493, 0.36, 0.427],
    [0.493, 0.86, 0.427]
  ];
  for (let i = 0; i < hingePositions.length; i++) {
    hingeDummy.position.set(
      hingePositions[i][0],
      hingePositions[i][1],
      hingePositions[i][2]
    );
    hingeDummy.updateMatrix();
    door_hinges.setMatrixAt(i, hingeDummy.matrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  hardware.add(door_hinges);

  const hinge_pinGeom = new THREE.CylinderGeometry(0.007, 0.007, 0.082, 10);
  const hinge_pins = new THREE.InstancedMesh(hinge_pinGeom, brassMat, 4);
  hinge_pins.name = "hinge_pins";
  const pinDummy = new THREE.Object3D();
  for (let i = 0; i < hingePositions.length; i++) {
    const side = hingePositions[i][0] < 0 ? -1 : 1;
    pinDummy.position.set(
      hingePositions[i][0] + side * 0.014,
      hingePositions[i][1],
      hingePositions[i][2] + 0.008
    );
    pinDummy.updateMatrix();
    hinge_pins.setMatrixAt(i, pinDummy.matrix);
  }
  hinge_pins.instanceMatrix.needsUpdate = true;
  hardware.add(hinge_pins);

  const handle_mount_plateGeom = new THREE.BoxGeometry(0.034, 0.052, 0.012);
  const handle_mount_plates = new THREE.InstancedMesh(
    handle_mount_plateGeom,
    brassMat,
    4
  );
  handle_mount_plates.name = "handle_mount_plates";
  const mountDummy = new THREE.Object3D();
  const mountPositions = [
    [-0.055, 0.49, 0.431],
    [-0.055, 0.71, 0.431],
    [0.055, 0.49, 0.431],
    [0.055, 0.71, 0.431]
  ];
  for (let i = 0; i < mountPositions.length; i++) {
    mountDummy.position.set(
      mountPositions[i][0],
      mountPositions[i][1],
      mountPositions[i][2]
    );
    mountDummy.updateMatrix();
    handle_mount_plates.setMatrixAt(i, mountDummy.matrix);
  }
  handle_mount_plates.instanceMatrix.needsUpdate = true;
  hardware.add(handle_mount_plates);

  const handle_screwGeom = new THREE.CylinderGeometry(0.005, 0.005, 0.006, 12);
  const handle_screws = new THREE.InstancedMesh(handle_screwGeom, brassMat, 8);
  handle_screws.name = "handle_screws";
  const screwDummy = new THREE.Object3D();
  let screwIndex = 0;
  for (let i = 0; i < mountPositions.length; i++) {
    for (const offsetY of [-0.015, 0.015]) {
      screwDummy.position.set(
        mountPositions[i][0],
        mountPositions[i][1] + offsetY,
        0.439
      );
      screwDummy.rotation.set(Math.PI / 2, 0, 0);
      screwDummy.updateMatrix();
      handle_screws.setMatrixAt(screwIndex, screwDummy.matrix);
      screwIndex++;
    }
  }
  handle_screws.instanceMatrix.needsUpdate = true;
  hardware.add(handle_screws);

  const handle_curvePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, -0.11, 0.022),
      new THREE.Vector3(0, -0.095, 0.052),
      new THREE.Vector3(0, -0.055, 0.070),
      new THREE.Vector3(0, 0.000, 0.075),
      new THREE.Vector3(0, 0.055, 0.070),
      new THREE.Vector3(0, 0.095, 0.052),
      new THREE.Vector3(0, 0.11, 0.022)
    ],
    false,
    "centripetal"
  );
  const handle_curveGeom = new THREE.TubeGeometry(
    handle_curvePath,
    32,
    0.009,
    10,
    false
  );
  const handle_connectorGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.025,
    12
  );

  const left_handle = new THREE.Group();
  left_handle.name = "left_handle";
  left_handle.position.set(-0.055, 0.60, 0.438);
  hardware.add(left_handle);

  const left_handle_curve = new THREE.Mesh(handle_curveGeom, brassMat);
  left_handle_curve.name = "left_handle_curve";
  left_handle.add(left_handle_curve);

  const left_handle_lower_connector = new THREE.Mesh(handle_connectorGeom, brassMat);
  left_handle_lower_connector.name = "left_handle_lower_connector";
  left_handle_lower_connector.position.set(0, -0.11, 0.012);
  left_handle.add(left_handle_lower_connector);

  const left_handle_upper_connector = new THREE.Mesh(handle_connectorGeom, brassMat);
  left_handle_upper_connector.name = "left_handle_upper_connector";
  left_handle_upper_connector.position.set(0, 0.11, 0.012);
  left_handle.add(left_handle_upper_connector);

  const right_handle = new THREE.Group();
  right_handle.name = "right_handle";
  right_handle.position.set(0.055, 0.60, 0.438);
  hardware.add(right_handle);

  const right_handle_curve = new THREE.Mesh(handle_curveGeom, brassMat);
  right_handle_curve.name = "right_handle_curve";
  right_handle.add(right_handle_curve);

  const right_handle_lower_connector = new THREE.Mesh(handle_connectorGeom, brassMat);
  right_handle_lower_connector.name = "right_handle_lower_connector";
  right_handle_lower_connector.position.set(0, -0.11, 0.012);
  right_handle.add(right_handle_lower_connector);

  const right_handle_upper_connector = new THREE.Mesh(handle_connectorGeom, brassMat);
  right_handle_upper_connector.name = "right_handle_upper_connector";
  right_handle_upper_connector.position.set(0, 0.11, 0.012);
  right_handle.add(right_handle_upper_connector);

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