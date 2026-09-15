export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_black_radio";

  const cabinetMat = new THREE.MeshStandardMaterial({
    color: 0x151718,
    metalness: 0.0,
    roughness: 0.22,
  });
  const glossyTrimMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.18,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x050606,
    metalness: 0.0,
    roughness: 0.72,
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x111313,
    metalness: 0.1,
    roughness: 0.65,
  });
  const grilleEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x292c2c,
    metalness: 0.1,
    roughness: 0.55,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x171919,
    metalness: 0.0,
    roughness: 0.35,
  });
  const dialFaceMat = new THREE.MeshStandardMaterial({
    color: 0x236b50,
    metalness: 0.0,
    roughness: 0.48,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xd8ddd4,
    metalness: 0.0,
    roughness: 0.45,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xbfc2bd,
    metalness: 0.45,
    roughness: 0.3,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a5b2d,
    metalness: 0.0,
    roughness: 0.5,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x563018,
    metalness: 0.0,
    roughness: 0.65,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x101111,
    metalness: 0.0,
    roughness: 0.85,
  });

  function roundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
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

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        curveSegments: 10,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelOffset: 0,
        bevelSegments: 3,
      }
    );
  }

  const cabinetW = 1.0;
  const cabinetH = 0.92;
  const cabinetD = 0.78;
  const cabinetBevel = 0.035;

  const cabinet = new THREE.Mesh(
    roundedExtrudeGeometry(
      cabinetW,
      cabinetH,
      0.085,
      cabinetD,
      cabinetBevel
    ),
    cabinetMat
  );
  cabinet.name = "cabinet";
  cabinet.position.z = -cabinetD / 2;
  root.add(cabinet);

  const frontZ = cabinetD / 2 + cabinetBevel;

  const front_recess = new THREE.Mesh(
    roundedExtrudeGeometry(0.88, 0.79, 0.055, 0.012, 0.004),
    recessMat
  );
  front_recess.name = "front_recess";
  front_recess.position.set(0, -0.005, frontZ + 0.002);
  root.add(front_recess);

  const front_bezel = new THREE.Mesh(
    roundedExtrudeGeometry(0.84, 0.75, 0.045, 0.014, 0.004),
    glossyTrimMat
  );
  front_bezel.name = "front_bezel";
  front_bezel.position.set(0, -0.005, frontZ + 0.014);
  root.add(front_bezel);

  const speaker_backing = new THREE.Mesh(
    roundedExtrudeGeometry(0.75, 0.36, 0.032, 0.009, 0.003),
    grilleMat
  );
  speaker_backing.name = "speaker_backing";
  speaker_backing.position.set(0, 0.18, frontZ + 0.029);
  root.add(speaker_backing);

  const speaker_slotGeom = new THREE.BoxGeometry(0.69, 0.019, 0.012);
  const speaker_slots = new THREE.InstancedMesh(
    speaker_slotGeom,
    recessMat,
    6
  );
  speaker_slots.name = "speaker_slots";
  const slotDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    slotDummy.position.set(0, 0.315 - i * 0.055, frontZ + 0.044);
    slotDummy.rotation.set(0, 0, 0);
    slotDummy.updateMatrix();
    speaker_slots.setMatrixAt(i, slotDummy.matrix);
  }
  speaker_slots.instanceMatrix.needsUpdate = true;
  root.add(speaker_slots);

  const speaker_louverGeom = new THREE.BoxGeometry(0.72, 0.014, 0.024);
  const speaker_louvers = new THREE.InstancedMesh(
    speaker_louverGeom,
    grilleEdgeMat,
    7
  );
  speaker_louvers.name = "speaker_louvers";
  const louverDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    louverDummy.position.set(0, 0.342 - i * 0.055, frontZ + 0.052);
    louverDummy.rotation.set(-0.1, 0, 0);
    louverDummy.updateMatrix();
    speaker_louvers.setMatrixAt(i, louverDummy.matrix);
  }
  speaker_louvers.instanceMatrix.needsUpdate = true;
  root.add(speaker_louvers);

  const speaker_dividerGeom = new THREE.BoxGeometry(0.012, 0.031, 0.014);
  const speaker_dividers = new THREE.InstancedMesh(
    speaker_dividerGeom,
    recessMat,
    42
  );
  speaker_dividers.name = "speaker_dividers";
  const dividerDummy = new THREE.Object3D();
  let dividerIndex = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      dividerDummy.position.set(
        -0.285 + col * 0.095,
        0.315 - row * 0.055,
        frontZ + 0.055
      );
      dividerDummy.rotation.set(0, 0, 0);
      dividerDummy.updateMatrix();
      speaker_dividers.setMatrixAt(dividerIndex++, dividerDummy.matrix);
    }
  }
  speaker_dividers.instanceMatrix.needsUpdate = true;
  root.add(speaker_dividers);

  const control_panel_border = new THREE.Mesh(
    roundedExtrudeGeometry(0.76, 0.34, 0.025, 0.012, 0.003),
    silverMat
  );
  control_panel_border.name = "control_panel_border";
  control_panel_border.position.set(0, -0.22, frontZ + 0.03);
  root.add(control_panel_border);

  const control_panel = new THREE.Mesh(
    roundedExtrudeGeometry(0.735, 0.315, 0.019, 0.012, 0.003),
    panelMat
  );
  control_panel.name = "control_panel";
  control_panel.position.set(0, -0.22, frontZ + 0.043);
  root.add(control_panel);

  const dialCenterX = 0.13;
  const dialCenterY = -0.22;
  const dialScale = 1.3;

  const dial_outer_ring = new THREE.Mesh(
    new THREE.RingGeometry(0.137, 0.151, 64),
    silverMat
  );
  dial_outer_ring.name = "dial_outer_ring";
  dial_outer_ring.position.set(dialCenterX, dialCenterY, frontZ + 0.064);
  dial_outer_ring.scale.setScalar(dialScale);
  root.add(dial_outer_ring);

  const dial_face = new THREE.Mesh(
    new THREE.CircleGeometry(0.136, 64),
    dialFaceMat
  );
  dial_face.name = "dial_face";
  dial_face.position.set(dialCenterX, dialCenterY, frontZ + 0.065);
  dial_face.scale.setScalar(dialScale);
  root.add(dial_face);

  const dial_tickGeom = new THREE.BoxGeometry(0.006, 0.021, 0.004);
  const dial_ticks = new THREE.InstancedMesh(
    dial_tickGeom,
    markingMat,
    32
  );
  dial_ticks.name = "dial_ticks";
  const tickDummy = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const radius = 0.116 * dialScale;
    tickDummy.position.set(
      dialCenterX + Math.sin(angle) * radius,
      dialCenterY + Math.cos(angle) * radius,
      frontZ + 0.069
    );
    tickDummy.rotation.set(0, 0, -angle);
    tickDummy.scale.set(1, i % 4 === 0 ? 1.45 : 0.78, 1);
    tickDummy.updateMatrix();
    dial_ticks.setMatrixAt(i, tickDummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  root.add(dial_ticks);

  const dial_number_markGeom = new THREE.BoxGeometry(0.018, 0.006, 0.004);
  const dial_number_marks = new THREE.InstancedMesh(
    dial_number_markGeom,
    markingMat,
    8
  );
  dial_number_marks.name = "dial_number_marks";
  const numberDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 0.087 * dialScale;
    numberDummy.position.set(
      dialCenterX + Math.sin(angle) * radius,
      dialCenterY + Math.cos(angle) * radius,
      frontZ + 0.07
    );
    numberDummy.rotation.set(0, 0, -angle);
    numberDummy.scale.set(i % 2 === 0 ? 1.0 : 0.65, 1, 1);
    numberDummy.updateMatrix();
    dial_number_marks.setMatrixAt(i, numberDummy.matrix);
  }
  dial_number_marks.instanceMatrix.needsUpdate = true;
  root.add(dial_number_marks);

  const pointerAngle = -0.58;
  const pointerLength = 0.115 * dialScale;
  const dial_pointer = new THREE.Mesh(
    new THREE.BoxGeometry(0.009, pointerLength, 0.006),
    markingMat
  );
  dial_pointer.name = "dial_pointer";
  dial_pointer.position.set(
    dialCenterX + Math.sin(pointerAngle) * pointerLength * 0.46,
    dialCenterY + Math.cos(pointerAngle) * pointerLength * 0.46,
    frontZ + 0.074
  );
  dial_pointer.rotation.z = -pointerAngle;
  root.add(dial_pointer);

  const dial_hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.047, 0.047, 0.026, 32),
    glossyTrimMat
  );
  dial_hub.name = "dial_hub";
  dial_hub.rotation.x = Math.PI / 2;
  dial_hub.position.set(dialCenterX, dialCenterY, frontZ + 0.078);
  dial_hub.scale.setScalar(dialScale);
  root.add(dial_hub);

  const dial_hub_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.034, 0.034, 0.029, 32),
    silverMat
  );
  dial_hub_cap.name = "dial_hub_cap";
  dial_hub_cap.rotation.x = Math.PI / 2;
  dial_hub_cap.position.set(dialCenterX, dialCenterY, frontZ + 0.087);
  dial_hub_cap.scale.setScalar(dialScale);
  root.add(dial_hub_cap);

  const knobCenterX = -0.245;
  const knobCenterY = -0.285;

  const knob_scale_ring = new THREE.Mesh(
    new THREE.RingGeometry(0.083, 0.101, 48),
    silverMat
  );
  knob_scale_ring.name = "knob_scale_ring";
  knob_scale_ring.position.set(knobCenterX, knobCenterY, frontZ + 0.064);
  root.add(knob_scale_ring);

  const knob_tickGeom = new THREE.BoxGeometry(0.005, 0.015, 0.004);
  const knob_ticks = new THREE.InstancedMesh(
    knob_tickGeom,
    markingMat,
    20
  );
  knob_ticks.name = "knob_ticks";
  const knobTickDummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 0.088;
    knobTickDummy.position.set(
      knobCenterX + Math.sin(angle) * radius,
      knobCenterY + Math.cos(angle) * radius,
      frontZ + 0.068
    );
    knobTickDummy.rotation.set(0, 0, -angle);
    knobTickDummy.scale.set(1, i % 5 === 0 ? 1.35 : 0.75, 1);
    knobTickDummy.updateMatrix();
    knob_ticks.setMatrixAt(i, knobTickDummy.matrix);
  }
  knob_ticks.instanceMatrix.needsUpdate = true;
  root.add(knob_ticks);

  const tuning_knob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.073, 0.073, 0.075, 32),
    woodMat
  );
  tuning_knob.name = "tuning_knob";
  tuning_knob.rotation.x = Math.PI / 2;
  tuning_knob.position.set(knobCenterX, knobCenterY, frontZ + 0.098);
  root.add(tuning_knob);

  const tuning_knob_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.068, 0.008, 32),
    woodMat
  );
  tuning_knob_cap.name = "tuning_knob_cap";
  tuning_knob_cap.rotation.x = Math.PI / 2;
  tuning_knob_cap.position.set(knobCenterX, knobCenterY, frontZ + 0.139);
  root.add(tuning_knob_cap);

  const knob_grainGeom = new THREE.BoxGeometry(0.004, 0.052, 0.003);
  const knob_grain = new THREE.InstancedMesh(
    knob_grainGeom,
    woodGrainMat,
    9
  );
  knob_grain.name = "knob_grain";
  const grainDummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    const x = knobCenterX - 0.048 + i * 0.012;
    const offset = Math.sqrt(Math.max(0, 0.064 * 0.064 - x * x));
    grainDummy.position.set(
      x,
      knobCenterY + ((i % 3) - 1) * 0.004,
      frontZ + 0.144
    );
    grainDummy.rotation.set(0, 0, -0.18 + i * 0.045);
    grainDummy.scale.set(1, 0.65 + (i % 4) * 0.1, 1);
    grainDummy.updateMatrix();
    knob_grain.setMatrixAt(i, grainDummy.matrix);
  }
  knob_grain.instanceMatrix.needsUpdate = true;
  root.add(knob_grain);

  const brand_markGeom = new THREE.BoxGeometry(0.026, 0.006, 0.004);
  const brand_marks = new THREE.InstancedMesh(
    brand_markGeom,
    markingMat,
    6
  );
  brand_marks.name = "brand_marks";
  const brandDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    brandDummy.position.set(
      -0.105 + (i % 3) * 0.029,
      -0.145 - Math.floor(i / 3) * 0.014,
      frontZ + 0.069
    );
    brandDummy.rotation.set(0, 0, 0);
    brandDummy.scale.set(i % 2 === 0 ? 1.0 : 0.62, 1, 1);
    brandDummy.updateMatrix();
    brand_marks.setMatrixAt(i, brandDummy.matrix);
  }
  brand_marks.instanceMatrix.needsUpdate = true;
  root.add(brand_marks);

  const power_icon_ring = new THREE.Mesh(
    new THREE.RingGeometry(0.014, 0.018, 24),
    markingMat
  );
  power_icon_ring.name = "power_icon_ring";
  power_icon_ring.position.set(-0.31, -0.15, frontZ + 0.069);
  root.add(power_icon_ring);

  const power_icon_stem = new THREE.Mesh(
    new THREE.BoxGeometry(0.004, 0.018, 0.004),
    markingMat
  );
  power_icon_stem.name = "power_icon_stem";
  power_icon_stem.position.set(-0.31, -0.137, frontZ + 0.071);
  root.add(power_icon_stem);

  const panel_screwGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.008,
    20
  );
  const panel_screws = new THREE.InstancedMesh(
    panel_screwGeom,
    silverMat,
    2
  );
  panel_screws.name = "panel_screws";
  const screwDummy = new THREE.Object3D();
  const screwPositions = [
    [0.335, -0.105],
    [0.335, -0.335],
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    screwDummy.position.set(
      screwPositions[i][0],
      screwPositions[i][1],
      frontZ + 0.071
    );
    screwDummy.rotation.set(Math.PI / 2, 0, 0);
    screwDummy.updateMatrix();
    panel_screws.setMatrixAt(i, screwDummy.matrix);
  }
  panel_screws.instanceMatrix.needsUpdate = true;
  root.add(panel_screws);

  const screw_slotGeom = new THREE.BoxGeometry(0.017, 0.003, 0.003);
  const screw_slots = new THREE.InstancedMesh(
    screw_slotGeom,
    recessMat,
    2
  );
  screw_slots.name = "screw_slots";
  const slotMatrixDummy = new THREE.Object3D();
  for (let i = 0; i < screwPositions.length; i++) {
    slotMatrixDummy.position.set(
      screwPositions[i][0],
      screwPositions[i][1],
      frontZ + 0.076
    );
    slotMatrixDummy.rotation.set(0, 0, i === 0 ? 0.45 : -0.35);
    slotMatrixDummy.updateMatrix();
    screw_slots.setMatrixAt(i, slotMatrixDummy.matrix);
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  root.add(screw_slots);

  const footGeom = new THREE.CylinderGeometry(0.052, 0.058, 0.07, 24);
  const feet = new THREE.InstancedMesh(footGeom, rubberMat, 4);
  feet.name = "feet";
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-0.39, -0.49, 0.29],
    [0.39, -0.49, 0.29],
    [-0.39, -0.49, -0.29],
    [0.39, -0.49, -0.29],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(
      footPositions[i][0],
      footPositions[i][1],
      footPositions[i][2]
    );
    footDummy.rotation.set(0, 0, 0);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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