export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_optical_scanner";

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x202223, metalness: 0.3, roughness: 0.55 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x282a2b, metalness: 0.25, roughness: 0.5 });
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x111213, metalness: 0.2, roughness: 0.65 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: 0x151617, metalness: 0.0, roughness: 0.8 });
  const redMat = new THREE.MeshStandardMaterial({ color: 0x7b211d, metalness: 0.5, roughness: 0.4 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xb8b8b5, metalness: 0.6, roughness: 0.4 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e4, metalness: 0.0, roughness: 0.5 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x08090a, metalness: 0.0, roughness: 0.25 });
  const amberMat = new THREE.MeshStandardMaterial({ color: 0xc99a45, metalness: 0.35, roughness: 0.45 });
  const badgeMat = new THREE.MeshStandardMaterial({ color: 0xa85d35, metalness: 0.45, roughness: 0.45 });

  const main_chassis = new THREE.Group();
  main_chassis.name = "main_chassis";
  root.add(main_chassis);

  const front_assembly = new THREE.Group();
  front_assembly.name = "front_assembly";
  root.add(front_assembly);

  const top_controls = new THREE.Group();
  top_controls.name = "top_controls";
  root.add(top_controls);

  const side_details = new THREE.Group();
  side_details.name = "side_details";
  root.add(side_details);

  const main_bodyGeom = new THREE.BoxGeometry(1.28, 0.72, 2.72);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.position.set(0, 0, -0.12);
  main_chassis.add(main_body);

  const lower_spineGeom = new THREE.BoxGeometry(1.12, 0.18, 2.55);
  const lower_spine = new THREE.Mesh(lower_spineGeom, edgeMat);
  lower_spine.name = "lower_spine";
  lower_spine.position.set(0, -0.43, -0.12);
  main_chassis.add(lower_spine);

  const front_noseShape = new THREE.Shape();
  front_noseShape.moveTo(-0.64, -0.36);
  front_noseShape.lineTo(0.64, -0.36);
  front_noseShape.lineTo(0.64, 0.36);
  front_noseShape.lineTo(-0.64, 0.36);
  front_noseShape.closePath();

  const front_noseGeom = new THREE.ExtrudeGeometry(front_noseShape, {
    depth: 0.78,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 2
  });
  const front_nose = new THREE.Mesh(front_noseGeom, bodyMat);
  front_nose.name = "front_nose";
  front_nose.rotation.x = Math.PI / 2;
  front_nose.position.set(0, 0.36, 1.53);
  front_assembly.add(front_nose);

  const front_faceGeom = new THREE.BoxGeometry(1.18, 0.66, 0.045);
  const front_face = new THREE.Mesh(front_faceGeom, panelMat);
  front_face.name = "front_face";
  front_face.position.set(0, 0, 1.57);
  front_assembly.add(front_face);

  const front_port_outerGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.07, 24);
  const front_port_innerGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.075, 20);
  const front_port_coreGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.08, 16);

  const front_port_outer = new THREE.Mesh(front_port_outerGeom, edgeMat);
  front_port_outer.name = "front_port_outer";
  front_port_outer.rotation.x = Math.PI / 2;
  front_port_outer.position.set(-0.31, -0.04, 1.60);
  front_assembly.add(front_port_outer);

  const front_port_inner = new THREE.Mesh(front_port_innerGeom, lensMat);
  front_port_inner.name = "front_port_inner";
  front_port_inner.rotation.x = Math.PI / 2;
  front_port_inner.position.set(-0.31, -0.04, 1.635);
  front_assembly.add(front_port_inner);

  const front_port_core = new THREE.Mesh(front_port_coreGeom, silverMat);
  front_port_core.name = "front_port_core";
  front_port_core.rotation.x = Math.PI / 2;
  front_port_core.position.set(-0.31, -0.04, 1.67);
  front_assembly.add(front_port_core);

  const front_slotGeom = new THREE.BoxGeometry(0.30, 0.075, 0.035);
  const front_slot = new THREE.Mesh(front_slotGeom, edgeMat);
  front_slot.name = "front_slot";
  front_slot.position.set(0.25, -0.08, 1.605);
  front_assembly.add(front_slot);

  const front_sensor_holeGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.025, 12);
  const front_sensor_hole = new THREE.Mesh(front_sensor_holeGeom, lensMat);
  front_sensor_hole.name = "front_sensor_hole";
  front_sensor_hole.rotation.x = Math.PI / 2;
  front_sensor_hole.position.set(0.27, -0.25, 1.605);
  front_assembly.add(front_sensor_hole);

  const front_screwGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 10);
  const front_screws = new THREE.InstancedMesh(front_screwGeom, edgeMat, 2);
  front_screws.name = "front_screws";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.53 : 0.53, 0.20, 1.61);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.updateMatrix();
    front_screws.setMatrixAt(i, dummy.matrix);
  }
  front_screws.instanceMatrix.needsUpdate = true;
  front_assembly.add(front_screws);

  const front_lens_barrelGeom = new THREE.CylinderGeometry(0.31, 0.31, 0.42, 28);
  const front_lens_red_bandGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.18, 28);
  const front_lens_bezelGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.18, 28);
  const front_lens_glassGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.035, 24);
  const front_lens_irisGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.04, 16);

  function createFrontLens(side, name) {
    const lens = new THREE.Group();
    lens.name = name;
    lens.position.set(side * 0.59, 0.02, 1.25);

    const barrel = new THREE.Mesh(front_lens_barrelGeom, bodyMat);
    barrel.name = name + "_barrel";
    barrel.rotation.x = Math.PI / 2;
    lens.add(barrel);

    const red_band = new THREE.Mesh(front_lens_red_bandGeom, redMat);
    red_band.name = name + "_red_band";
    red_band.rotation.x = Math.PI / 2;
    red_band.position.z = 0.20;
    lens.add(red_band);

    const bezel = new THREE.Mesh(front_lens_bezelGeom, edgeMat);
    bezel.name = name + "_bezel";
    bezel.rotation.x = Math.PI / 2;
    bezel.position.z = 0.36;
    lens.add(bezel);

    const glass = new THREE.Mesh(front_lens_glassGeom, lensMat);
    glass.name = name + "_glass";
    glass.rotation.x = Math.PI / 2;
    glass.position.z = 0.465;
    lens.add(glass);

    const iris = new THREE.Mesh(front_lens_irisGeom, amberMat);
    iris.name = name + "_iris";
    iris.rotation.x = Math.PI / 2;
    iris.position.z = 0.485;
    lens.add(iris);

    return lens;
  }

  const left_front_lens = createFrontLens(-1, "left_front_lens");
  const right_front_lens = createFrontLens(1, "right_front_lens");
  front_assembly.add(left_front_lens, right_front_lens);

  const rear_motor_housingGeom = new THREE.CylinderGeometry(0.40, 0.40, 0.58, 28);
  const rear_motor_red_bandGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.18, 28);
  const rear_motor_capGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.16, 28);
  const rear_motor_faceGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.035, 24);
  const rear_motor_hubGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.045, 16);

  function createRearMotor(side, name) {
    const motor = new THREE.Group();
    motor.name = name;
    motor.position.set(side * 0.59, 0.02, -1.34);

    const housing = new THREE.Mesh(rear_motor_housingGeom, bodyMat);
    housing.name = name + "_housing";
    housing.rotation.x = Math.PI / 2;
    motor.add(housing);

    const red_band = new THREE.Mesh(rear_motor_red_bandGeom, redMat);
    red_band.name = name + "_red_band";
    red_band.rotation.x = Math.PI / 2;
    red_band.position.z = -0.27;
    motor.add(red_band);

    const cap = new THREE.Mesh(rear_motor_capGeom, edgeMat);
    cap.name = name + "_cap";
    cap.rotation.x = Math.PI / 2;
    cap.position.z = -0.43;
    motor.add(cap);

    const face = new THREE.Mesh(rear_motor_faceGeom, panelMat);
    face.name = name + "_face";
    face.rotation.x = Math.PI / 2;
    face.position.z = -0.52;
    motor.add(face);

    const hub = new THREE.Mesh(rear_motor_hubGeom, lensMat);
    hub.name = name + "_hub";
    hub.rotation.x = Math.PI / 2;
    hub.position.z = -0.545;
    motor.add(hub);

    return motor;
  }

  const left_rear_motor = createRearMotor(-1, "left_rear_motor");
  const right_rear_motor = createRearMotor(1, "right_rear_motor");
  root.add(left_rear_motor, right_rear_motor);

  const rear_bridgeGeom = new THREE.BoxGeometry(1.18, 0.58, 0.34);
  const rear_bridge = new THREE.Mesh(rear_bridgeGeom, bodyMat);
  rear_bridge.name = "rear_bridge";
  rear_bridge.position.set(0, 0, -1.38);
  root.add(rear_bridge);

  const rear_top_panelGeom = new THREE.BoxGeometry(1.08, 0.12, 0.48);
  const rear_top_panel = new THREE.Mesh(rear_top_panelGeom, panelMat);
  rear_top_panel.name = "rear_top_panel";
  rear_top_panel.position.set(0, 0.39, -1.34);
  top_controls.add(rear_top_panel);

  const rear_status_lightGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.025, 16);
  const rear_status_light = new THREE.Mesh(rear_status_lightGeom, redMat);
  rear_status_light.name = "rear_status_light";
  rear_status_light.position.set(0.32, 0.465, -1.38);
  top_controls.add(rear_status_light);

  const top_panelGeom = new THREE.BoxGeometry(1.08, 0.075, 0.68);

  const top_panel_front = new THREE.Mesh(top_panelGeom, panelMat);
  top_panel_front.name = "top_panel_front";
  top_panel_front.position.set(0, 0.385, 0.62);
  top_controls.add(top_panel_front);

  const top_panel_middle = new THREE.Mesh(top_panelGeom, panelMat);
  top_panel_middle.name = "top_panel_middle";
  top_panel_middle.position.set(0, 0.385, -0.08);
  top_controls.add(top_panel_middle);

  const top_panel_rear = new THREE.Mesh(top_panelGeom, panelMat);
  top_panel_rear.name = "top_panel_rear";
  top_panel_rear.position.set(0, 0.385, -0.78);
  top_controls.add(top_panel_rear);

  const top_railGeom = new THREE.BoxGeometry(0.075, 0.075, 2.58);
  const left_top_rail = new THREE.Mesh(top_railGeom, edgeMat);
  left_top_rail.name = "left_top_rail";
  left_top_rail.position.set(-0.59, 0.39, -0.08);
  top_controls.add(left_top_rail);

  const right_top_rail = new THREE.Mesh(top_railGeom, edgeMat);
  right_top_rail.name = "right_top_rail";
  right_top_rail.position.set(0.59, 0.39, -0.08);
  top_controls.add(right_top_rail);

  const top_seamGeom = new THREE.BoxGeometry(1.10, 0.025, 0.035);
  const top_seams = new THREE.InstancedMesh(top_seamGeom, edgeMat, 3);
  top_seams.name = "top_seams";
  const seamZ = [0.27, -0.43, -1.10];
  for (let i = 0; i < seamZ.length; i++) {
    dummy.position.set(0, 0.43, seamZ[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    top_seams.setMatrixAt(i, dummy.matrix);
  }
  top_seams.instanceMatrix.needsUpdate = true;
  top_controls.add(top_seams);

  const top_button_rimGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.035, 24);
  const top_button_rim = new THREE.Mesh(top_button_rimGeom, silverMat);
  top_button_rim.name = "top_button_rim";
  top_button_rim.position.set(-0.25, 0.445, 0.62);
  top_controls.add(top_button_rim);

  const top_button_centerGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.04, 18);
  const top_button_center = new THREE.Mesh(top_button_centerGeom, lensMat);
  top_button_center.name = "top_button_center";
  top_button_center.position.set(-0.25, 0.465, 0.62);
  top_controls.add(top_button_center);

  const top_dial_ringGeom = new THREE.TorusGeometry(0.115, 0.018, 8, 24);
  const top_dial_ring = new THREE.Mesh(top_dial_ringGeom, edgeMat);
  top_dial_ring.name = "top_dial_ring";
  top_dial_ring.rotation.x = Math.PI / 2;
  top_dial_ring.position.set(0.25, 0.445, 0.62);
  top_controls.add(top_dial_ring);

  const top_dial_centerGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 20);
  const top_dial_center = new THREE.Mesh(top_dial_centerGeom, panelMat);
  top_dial_center.name = "top_dial_center";
  top_dial_center.position.set(0.25, 0.44, 0.62);
  top_controls.add(top_dial_center);

  const top_mode_buttonGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.035, 20);
  const top_mode_button = new THREE.Mesh(top_mode_buttonGeom, edgeMat);
  top_mode_button.name = "top_mode_button";
  top_mode_button.position.set(-0.30, 0.445, 1.12);
  top_controls.add(top_mode_button);

  const top_mode_markGeom = new THREE.BoxGeometry(0.10, 0.012, 0.025);
  const top_mode_mark = new THREE.Mesh(top_mode_markGeom, whiteMat);
  top_mode_mark.name = "top_mode_mark";
  top_mode_mark.position.set(-0.30, 0.468, 1.12);
  top_controls.add(top_mode_mark);

  const brand_mark = new THREE.Group();
  brand_mark.name = "brand_mark";
  brand_mark.position.set(0, 0.43, -0.08);

  const brand_barGeom = new THREE.BoxGeometry(0.16, 0.012, 0.025);
  for (let i = 0; i < 4; i++) {
    const brand_bar = new THREE.Mesh(brand_barGeom, whiteMat);
    brand_bar.name = "brand_bar_" + i;
    brand_bar.position.set(-0.18 + i * 0.12, 0, -0.04 + (i % 2) * 0.035);
    brand_bar.rotation.y = -0.18;
    brand_mark.add(brand_bar);
  }
  top_controls.add(brand_mark);

  const top_logo = new THREE.Group();
  top_logo.name = "top_logo";
  top_logo.position.set(0, 0.43, -0.78);

  const logo_strokeGeom = new THREE.BoxGeometry(0.18, 0.012, 0.025);
  const logo_stroke_a = new THREE.Mesh(logo_strokeGeom, whiteMat);
  logo_stroke_a.name = "logo_stroke_a";
  logo_stroke_a.position.set(-0.08, 0, 0.02);
  logo_stroke_a.rotation.y = 0.55;
  top_logo.add(logo_stroke_a);

  const logo_stroke_b = new THREE.Mesh(logo_strokeGeom, whiteMat);
  logo_stroke_b.name = "logo_stroke_b";
  logo_stroke_b.position.set(0.08, 0, 0.02);
  logo_stroke_b.rotation.y = -0.55;
  top_logo.add(logo_stroke_b);

  const logo_stroke_c = new THREE.Mesh(logo_strokeGeom, whiteMat);
  logo_stroke_c.name = "logo_stroke_c";
  logo_stroke_c.scale.x = 0.65;
  logo_stroke_c.position.set(0, 0, -0.07);
  top_logo.add(logo_stroke_c);
  top_controls.add(top_logo);

  const side_panelGeom = new THREE.BoxGeometry(0.025, 0.52, 1.72);
  const left_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-0.655, -0.02, -0.12);
  side_details.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.655, -0.02, -0.12);
  side_details.add(right_side_panel);

  const side_upper_trimGeom = new THREE.BoxGeometry(0.035, 0.035, 2.35);
  const left_side_upper_trim = new THREE.Mesh(side_upper_trimGeom, edgeMat);
  left_side_upper_trim.name = "left_side_upper_trim";
  left_side_upper_trim.position.set(-0.67, 0.29, -0.08);
  side_details.add(left_side_upper_trim);

  const right_side_upper_trim = new THREE.Mesh(side_upper_trimGeom, edgeMat);
  right_side_upper_trim.name = "right_side_upper_trim";
  right_side_upper_trim.position.set(0.67, 0.29, -0.08);
  side_details.add(right_side_upper_trim);

  const side_lower_trim = new THREE.Mesh(side_upper_trimGeom, edgeMat);
  side_lower_trim.name = "side_lower_trim";
  side_lower_trim.position.set(0.67, -0.31, -0.08);
  side_details.add(side_lower_trim);

  const side_seamGeom = new THREE.BoxGeometry(0.035, 0.50, 0.025);
  const side_panel_seams = new THREE.InstancedMesh(side_seamGeom, edgeMat, 4);
  side_panel_seams.name = "side_panel_seams";
  let seamIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.72, 0.55]) {
      dummy.position.set(side * 0.672, -0.02, z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      side_panel_seams.setMatrixAt(seamIndex++, dummy.matrix);
    }
  }
  side_panel_seams.instanceMatrix.needsUpdate = true;
  side_details.add(side_panel_seams);

  const side_screwGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.025, 10);
  const side_screws = new THREE.InstancedMesh(side_screwGeom, edgeMat, 8);
  side_screws.name = "side_screws";
  let screwIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.82, -0.28, 0.28, 0.82]) {
      dummy.position.set(side * 0.68, -0.24, z);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.updateMatrix();
      side_screws.setMatrixAt(screwIndex++, dummy.matrix);
    }
  }
  side_screws.instanceMatrix.needsUpdate = true;
  side_details.add(side_screws);

  const side_badgeShape = new THREE.Shape();
  side_badgeShape.moveTo(-0.12, -0.10);
  side_badgeShape.lineTo(0.12, -0.10);
  side_badgeShape.lineTo(0.15, 0.02);
  side_badgeShape.lineTo(0.08, 0.13);
  side_badgeShape.lineTo(-0.08, 0.13);
  side_badgeShape.lineTo(-0.15, 0.02);
  side_badgeShape.closePath();

  const side_badgeGeom = new THREE.ExtrudeGeometry(side_badgeShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 1
  });
  const side_badge = new THREE.Mesh(side_badgeGeom, badgeMat);
  side_badge.name = "side_badge";
  side_badge.rotation.y = Math.PI / 2;
  side_badge.position.set(0.67, 0.02, 0.92);
  side_details.add(side_badge);

  const badge_markGeom = new THREE.BoxGeometry(0.012, 0.025, 0.10);
  const badge_mark_a = new THREE.Mesh(badge_markGeom, edgeMat);
  badge_mark_a.name = "badge_mark_a";
  badge_mark_a.position.set(0.705, 0.02, 0.92);
  badge_mark_a.rotation.x = 0.55;
  side_details.add(badge_mark_a);

  const badge_mark_b = new THREE.Mesh(badge_markGeom, edgeMat);
  badge_mark_b.name = "badge_mark_b";
  badge_mark_b.position.set(0.705, 0.02, 0.92);
  badge_mark_b.rotation.x = -0.55;
  side_details.add(badge_mark_b);

  const side_knob_baseGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.12, 24);
  const side_knob_gripGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.15, 24);
  const side_knob_faceGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.025, 20);

  const side_knob_base = new THREE.Mesh(side_knob_baseGeom, edgeMat);
  side_knob_base.name = "side_knob_base";
  side_knob_base.rotation.z = Math.PI / 2;
  side_knob_base.position.set(0.68, -0.20, 1.05);
  side_details.add(side_knob_base);

  const side_knob_grip = new THREE.Mesh(side_knob_gripGeom, rubberMat);
  side_knob_grip.name = "side_knob_grip";
  side_knob_grip.rotation.z = Math.PI / 2;
  side_knob_grip.position.set(0.76, -0.20, 1.05);
  side_details.add(side_knob_grip);

  const side_knob_face = new THREE.Mesh(side_knob_faceGeom, panelMat);
  side_knob_face.name = "side_knob_face";
  side_knob_face.rotation.z = Math.PI / 2;
  side_knob_face.position.set(0.845, -0.20, 1.05);
  side_details.add(side_knob_face);

  const rear_side_hubGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.055, 28);
  const rear_side_hub_centerGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.065, 20);

  const left_rear_side_hub = new THREE.Mesh(rear_side_hubGeom, panelMat);
  left_rear_side_hub.name = "left_rear_side_hub";
  left_rear_side_hub.rotation.z = Math.PI / 2;
  left_rear_side_hub.position.set(-0.68, 0.02, -1.34);
  side_details.add(left_rear_side_hub);

  const right_rear_side_hub = new THREE.Mesh(rear_side_hubGeom, panelMat);
  right_rear_side_hub.name = "right_rear_side_hub";
  right_rear_side_hub.rotation.z = Math.PI / 2;
  right_rear_side_hub.position.set(0.68, 0.02, -1.34);
  side_details.add(right_rear_side_hub);

  const left_rear_side_hub_center = new THREE.Mesh(rear_side_hub_centerGeom, edgeMat);
  left_rear_side_hub_center.name = "left_rear_side_hub_center";
  left_rear_side_hub_center.rotation.z = Math.PI / 2;
  left_rear_side_hub_center.position.set(-0.715, 0.02, -1.34);
  side_details.add(left_rear_side_hub_center);

  const right_rear_side_hub_center = new THREE.Mesh(rear_side_hub_centerGeom, edgeMat);
  right_rear_side_hub_center.name = "right_rear_side_hub_center";
  right_rear_side_hub_center.rotation.z = Math.PI / 2;
  right_rear_side_hub_center.position.set(0.715, 0.02, -1.34);
  side_details.add(right_rear_side_hub_center);

  const footGeom = new THREE.BoxGeometry(0.34, 0.18, 0.42);
  const rubber_feet = new THREE.InstancedMesh(footGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const footPositions = [
    [-0.43, -0.55, 1.02],
    [0.43, -0.55, 1.02],
    [-0.43, -0.55, -1.02],
    [0.43, -0.55, -1.02]
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    rubber_feet.setMatrixAt(i, dummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  root.add(rubber_feet);

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
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }
}