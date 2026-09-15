export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_toaster";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb5162d,
    metalness: 0.25,
    roughness: 0.42,
  });
  const blackenedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.35,
    roughness: 0.72,
  });
  const darkRecessMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.6,
    roughness: 0.48,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a7448,
    metalness: 0.0,
    roughness: 0.65,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x4b3422,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dialFaceMat = new THREE.MeshStandardMaterial({
    color: 0x76513a,
    metalness: 0.0,
    roughness: 0.72,
  });
  const heatingElementMat = new THREE.MeshStandardMaterial({
    color: 0xff2412,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0xff1608,
    emissiveIntensity: 0.9,
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0x77736a,
    metalness: 0.1,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const chipMat = new THREE.MeshStandardMaterial({
    color: 0xb09b7d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        curveSegments: 12,
        steps: 1,
        depth,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 4,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedLoopGeometry(width, depth, radius, y, tubeRadius) {
    const points = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5],
    ];
    for (const corner of corners) {
      for (let i = 0; i < 5; i++) {
        const angle = corner[2] + (i / 5) * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 72, tubeRadius, 8, true);
  }

  const bodyWidth = 2.4;
  const bodyHeight = 2.25;
  const bodyDepth = 1.45;
  const bodyCenterY = 1.42;
  const bodyBevel = 0.13;
  const frontZ = bodyDepth / 2 + bodyBevel;

  const bodyGeom = roundedExtrudeGeometry(
    bodyWidth,
    bodyHeight,
    bodyDepth,
    0.34,
    bodyBevel
  );
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.position.y = bodyCenterY;
  root.add(body);

  const base_bandGeom = roundedExtrudeGeometry(2.52, 1.58, 0.13, 0.22, 0.035);
  const base_band = new THREE.Mesh(base_bandGeom, blackenedMetalMat);
  base_band.name = "base_band";
  base_band.rotation.x = -Math.PI / 2;
  base_band.position.y = 0.25;
  root.add(base_band);

  const base_edgeGeom = roundedLoopGeometry(2.56, 1.62, 0.22, 0.31, 0.045);
  const base_edge = new THREE.Mesh(base_edgeGeom, blackenedMetalMat);
  base_edge.name = "base_edge";
  root.add(base_edge);

  const footGeom = new THREE.CylinderGeometry(0.16, 0.18, 0.24, 16);
  const feet = new THREE.InstancedMesh(footGeom, blackenedMetalMat, 4);
  feet.name = "feet";
  const footPositions = [
    [-0.92, 0.08, 0.57],
    [0.92, 0.08, 0.57],
    [-0.92, 0.08, -0.57],
    [0.92, 0.08, -0.57],
  ];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < footPositions.length; i++) {
    dummy.position.set(footPositions[i][0], footPositions[i][1], footPositions[i][2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    feet.setMatrixAt(i, dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const slotRecessGeom = new THREE.ShapeGeometry(
    roundedRectShape(1.92, 0.34, 0.15),
    12
  );
  const slotRecessMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const slotY = bodyCenterY + bodyHeight / 2 + bodyBevel + 0.006;

  const front_slot_recess = new THREE.Mesh(slotRecessGeom, slotRecessMat);
  front_slot_recess.name = "front_slot_recess";
  front_slot_recess.rotation.x = -Math.PI / 2;
  front_slot_recess.position.set(0, slotY, 0.27);
  root.add(front_slot_recess);

  const rear_slot_recess = new THREE.Mesh(slotRecessGeom, slotRecessMat);
  rear_slot_recess.name = "rear_slot_recess";
  rear_slot_recess.rotation.x = -Math.PI / 2;
  rear_slot_recess.position.set(0, slotY, -0.27);
  root.add(rear_slot_recess);

  const heating_bedGeom = new THREE.BoxGeometry(1.58, 0.018, 0.18);
  const heating_bed_front = new THREE.Mesh(heating_bedGeom, heatingElementMat);
  heating_bed_front.name = "heating_bed_front";
  heating_bed_front.position.set(0, slotY + 0.014, 0.27);
  root.add(heating_bed_front);

  const heating_bed_rear = new THREE.Mesh(heating_bedGeom, heatingElementMat);
  heating_bed_rear.name = "heating_bed_rear";
  heating_bed_rear.position.set(0, slotY + 0.014, -0.27);
  root.add(heating_bed_rear);

  const heatingElementGeom = new THREE.CylinderGeometry(0.014, 0.014, 1.58, 8);
  const heating_elements = new THREE.InstancedMesh(
    heatingElementGeom,
    heatingElementMat,
    8
  );
  heating_elements.name = "heating_elements";
  let heaterIndex = 0;
  for (const slotZ of [-0.27, 0.27]) {
    for (const offset of [-0.072, -0.024, 0.024, 0.072]) {
      dummy.position.set(0, slotY + 0.035, slotZ + offset);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      heating_elements.setMatrixAt(heaterIndex++, dummy.matrix);
    }
  }
  heating_elements.instanceMatrix.needsUpdate = true;
  root.add(heating_elements);

  const slotRailGeom = new THREE.CapsuleGeometry(0.055, 1.72, 4, 12);
  const slot_rails = new THREE.InstancedMesh(slotRailGeom, brushedMetalMat, 4);
  slot_rails.name = "slot_rails";
  const railPositions = [
    [0, slotY + 0.045, 0.47],
    [0, slotY + 0.045, 0.07],
    [0, slotY + 0.045, -0.07],
    [0, slotY + 0.045, -0.47],
  ];
  for (let i = 0; i < railPositions.length; i++) {
    dummy.position.set(railPositions[i][0], railPositions[i][1], railPositions[i][2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    slot_rails.setMatrixAt(i, dummy.matrix);
  }
  slot_rails.instanceMatrix.needsUpdate = true;
  root.add(slot_rails);

  const slotEndcapGeom = new THREE.BoxGeometry(0.11, 0.045, 0.14);
  const slot_endcaps = new THREE.InstancedMesh(slotEndcapGeom, brushedMetalMat, 8);
  slot_endcaps.name = "slot_endcaps";
  let endcapIndex = 0;
  for (const slotZ of [-0.27, 0.27]) {
    for (const side of [-1, 1]) {
      for (const zOffset of [-0.1, 0.1]) {
        dummy.position.set(side * 0.93, slotY + 0.043, slotZ + zOffset);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        slot_endcaps.setMatrixAt(endcapIndex++, dummy.matrix);
      }
    }
  }
  slot_endcaps.instanceMatrix.needsUpdate = true;
  root.add(slot_endcaps);

  const leverX = 0.72;
  const leverY = 1.78;

  const lever_socketGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.055, 20);
  const lever_socket = new THREE.Mesh(lever_socketGeom, blackenedMetalMat);
  lever_socket.name = "lever_socket";
  lever_socket.rotation.x = Math.PI / 2;
  lever_socket.position.set(leverX, leverY, frontZ + 0.015);
  root.add(lever_socket);

  const lever_stemGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.22, 12);
  const lever_stem = new THREE.Mesh(lever_stemGeom, blackenedMetalMat);
  lever_stem.name = "lever_stem";
  lever_stem.rotation.x = Math.PI / 2;
  lever_stem.position.set(leverX, leverY, frontZ + 0.11);
  root.add(lever_stem);

  const lever_handleGeom = new THREE.CapsuleGeometry(0.13, 0.38, 5, 16);
  const lever_handle = new THREE.Mesh(lever_handleGeom, woodMat);
  lever_handle.name = "lever_handle";
  lever_handle.rotation.z = Math.PI / 2;
  lever_handle.position.set(leverX, leverY, frontZ + 0.25);
  root.add(lever_handle);

  const lever_grain = new THREE.Group();
  lever_grain.name = "lever_grain";
  for (let i = 0; i < 3; i++) {
    const grainPoints = [];
    for (let j = 0; j < 5; j++) {
      const t = j / 4;
      grainPoints.push(new THREE.Vector3(
        leverX - 0.2 + t * 0.4,
        leverY + (i - 1) * 0.045 + Math.sin(t * Math.PI * 2 + i) * 0.008,
        frontZ + 0.383
      ));
    }
    const grainCurve = new THREE.CatmullRomCurve3(grainPoints, false, "centripetal");
    const grainGeom = new THREE.TubeGeometry(grainCurve, 12, 0.004, 5, false);
    const grain = new THREE.Mesh(grainGeom, woodGrainMat);
    lever_grain.add(grain);
  }
  root.add(lever_grain);

  const screwGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 18);
  const screwSlotGeom = new THREE.BoxGeometry(0.09, 0.014, 0.012);

  const upper_screw = new THREE.Mesh(screwGeom, blackenedMetalMat);
  upper_screw.name = "upper_screw";
  upper_screw.rotation.x = Math.PI / 2;
  upper_screw.position.set(leverX, 1.49, frontZ + 0.018);
  root.add(upper_screw);

  const upper_screw_slot_horizontal = new THREE.Mesh(screwSlotGeom, darkRecessMat);
  upper_screw_slot_horizontal.name = "upper_screw_slot_horizontal";
  upper_screw_slot_horizontal.position.set(leverX, 1.49, frontZ + 0.041);
  root.add(upper_screw_slot_horizontal);

  const upper_screw_slot_vertical = new THREE.Mesh(screwSlotGeom, darkRecessMat);
  upper_screw_slot_vertical.name = "upper_screw_slot_vertical";
  upper_screw_slot_vertical.rotation.z = Math.PI / 2;
  upper_screw_slot_vertical.position.set(leverX, 1.49, frontZ + 0.042);
  root.add(upper_screw_slot_vertical);

  const dialX = 0.62;
  const dialY = 0.78;

  const dial_backplateGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.055, 28);
  const dial_backplate = new THREE.Mesh(dial_backplateGeom, blackenedMetalMat);
  dial_backplate.name = "dial_backplate";
  dial_backplate.rotation.x = Math.PI / 2;
  dial_backplate.position.set(dialX, dialY, frontZ + 0.02);
  root.add(dial_backplate);

  const dial_ringGeom = new THREE.TorusGeometry(0.205, 0.035, 8, 28);
  const dial_ring = new THREE.Mesh(dial_ringGeom, blackenedMetalMat);
  dial_ring.name = "dial_ring";
  dial_ring.position.set(dialX, dialY, frontZ + 0.055);
  root.add(dial_ring);

  const dial_knobGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 28);
  const dial_knob = new THREE.Mesh(dial_knobGeom, blackenedMetalMat);
  dial_knob.name = "dial_knob";
  dial_knob.rotation.x = Math.PI / 2;
  dial_knob.position.set(dialX, dialY, frontZ + 0.12);
  root.add(dial_knob);

  const dialRidgeGeom = new THREE.BoxGeometry(0.035, 0.065, 0.055);
  const dial_ridges = new THREE.InstancedMesh(dialRidgeGeom, blackenedMetalMat, 24);
  dial_ridges.name = "dial_ridges";
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    dummy.position.set(
      dialX + Math.cos(angle) * 0.183,
      dialY + Math.sin(angle) * 0.183,
      frontZ + 0.197
    );
    dummy.rotation.set(0, 0, angle - Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    dial_ridges.setMatrixAt(i, dummy.matrix);
  }
  dial_ridges.instanceMatrix.needsUpdate = true;
  root.add(dial_ridges);

  const dial_faceGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.025, 24);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialFaceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.set(dialX, dialY, frontZ + 0.215);
  root.add(dial_face);

  const dial_indicatorGeom = new THREE.BoxGeometry(0.018, 0.07, 0.012);
  const dial_indicator = new THREE.Mesh(dial_indicatorGeom, darkRecessMat);
  dial_indicator.name = "dial_indicator";
  dial_indicator.position.set(dialX, dialY + 0.055, frontZ + 0.232);
  root.add(dial_indicator);

  const timer_bezelGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 24);
  const timer_bezel = new THREE.Mesh(timer_bezelGeom, blackenedMetalMat);
  timer_bezel.name = "timer_bezel";
  timer_bezel.rotation.x = Math.PI / 2;
  timer_bezel.position.set(1.08, 0.84, frontZ + 0.02);
  root.add(timer_bezel);

  const timer_ringGeom = new THREE.TorusGeometry(0.145, 0.025, 8, 24);
  const timer_ring = new THREE.Mesh(timer_ringGeom, blackenedMetalMat);
  timer_ring.name = "timer_ring";
  timer_ring.position.set(1.08, 0.84, frontZ + 0.055);
  root.add(timer_ring);

  const timer_knobGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.1, 24);
  const timer_knob = new THREE.Mesh(timer_knobGeom, dialFaceMat);
  timer_knob.name = "timer_knob";
  timer_knob.rotation.x = Math.PI / 2;
  timer_knob.position.set(1.08, 0.84, frontZ + 0.105);
  root.add(timer_knob);

  const lower_screw = new THREE.Mesh(screwGeom, blackenedMetalMat);
  lower_screw.name = "lower_screw";
  lower_screw.rotation.x = Math.PI / 2;
  lower_screw.position.set(dialX, 0.42, frontZ + 0.018);
  root.add(lower_screw);

  const lower_screw_slot_horizontal = new THREE.Mesh(screwSlotGeom, darkRecessMat);
  lower_screw_slot_horizontal.name = "lower_screw_slot_horizontal";
  lower_screw_slot_horizontal.position.set(dialX, 0.42, frontZ + 0.041);
  root.add(lower_screw_slot_horizontal);

  const lower_screw_slot_vertical = new THREE.Mesh(screwSlotGeom, darkRecessMat);
  lower_screw_slot_vertical.name = "lower_screw_slot_vertical";
  lower_screw_slot_vertical.rotation.z = Math.PI / 2;
  lower_screw_slot_vertical.position.set(dialX, 0.42, frontZ + 0.042);
  root.add(lower_screw_slot_vertical);

  const frontScratchGeom = new THREE.BoxGeometry(0.18, 0.012, 0.008);
  const front_scratches = new THREE.InstancedMesh(frontScratchGeom, wearMat, 18);
  front_scratches.name = "front_scratches";
  for (let i = 0; i < 18; i++) {
    const x = -1.02 + (((i * 37) % 100) / 100) * 2.04;
    const y = 0.43 + (((i * 61) % 100) / 100) * 1.72;
    const angle = -0.9 + (((i * 29) % 100) / 100) * 1.8;
    const lengthScale = 0.35 + (((i * 17) % 100) / 100) * 0.9;
    dummy.position.set(x, y, frontZ + 0.012);
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(lengthScale, 1, 1);
    dummy.updateMatrix();
    front_scratches.setMatrixAt(i, dummy.matrix);
  }
  front_scratches.instanceMatrix.needsUpdate = true;
  root.add(front_scratches);

  const chipGeom = new THREE.CircleGeometry(0.035, 10);
  const paint_chips = new THREE.InstancedMesh(chipGeom, chipMat, 10);
  paint_chips.name = "paint_chips";
  for (let i = 0; i < 10; i++) {
    const x = -0.98 + (((i * 43 + 11) % 100) / 100) * 1.96;
    const y = 0.48 + (((i * 47 + 19) % 100) / 100) * 1.62;
    const sx = 0.45 + (((i * 13) % 100) / 100) * 0.8;
    const sy = 0.25 + (((i * 23) % 100) / 100) * 0.55;
    dummy.position.set(x, y, frontZ + 0.016);
    dummy.rotation.set(0, 0, i * 0.61);
    dummy.scale.set(sx, sy, 1);
    dummy.updateMatrix();
    paint_chips.setMatrixAt(i, dummy.matrix);
  }
  paint_chips.instanceMatrix.needsUpdate = true;
  root.add(paint_chips);

  const topScratchGeom = new THREE.BoxGeometry(0.16, 0.008, 0.012);
  const top_scratches = new THREE.InstancedMesh(topScratchGeom, wearMat, 8);
  top_scratches.name = "top_scratches";
  const topScratchPositions = [
    [-0.98, 0.48, 0.2],
    [0.96, 0.48, -0.35],
    [-0.96, -0.48, -0.2],
    [0.95, -0.48, 0.4],
    [-1.05, 0.08, 0.7],
    [1.03, 0.12, -0.65],
    [-0.78, -0.55, 0.1],
    [0.76, 0.55, -0.15],
  ];
  for (let i = 0; i < topScratchPositions.length; i++) {
    dummy.position.set(
      topScratchPositions[i][0],
      slotY + 0.006,
      topScratchPositions[i][1]
    );
    dummy.rotation.set(0, topScratchPositions[i][2], 0);
    dummy.scale.set(0.55 + (i % 3) * 0.25, 1, 1);
    dummy.updateMatrix();
    top_scratches.setMatrixAt(i, dummy.matrix);
  }
  top_scratches.instanceMatrix.needsUpdate = true;
  root.add(top_scratches);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}