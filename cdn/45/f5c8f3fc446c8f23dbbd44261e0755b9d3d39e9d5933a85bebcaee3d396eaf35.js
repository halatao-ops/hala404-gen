export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "countertop_dispenser";

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b5,
    metalness: 0.6,
    roughness: 0.4,
  });
  const glossy_blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.2,
    roughness: 0.3,
  });
  const matte_blackMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.1,
    roughness: 0.8,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.1,
    roughness: 0.8,
  });
  const knobMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.2,
    roughness: 0.3,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    metalness: 0.0,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x747a7e,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.72,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const base_bottom_footMat = matte_blackMat;
  const base_bottom_footGeo = new THREE.CylinderGeometry(
    0.49,
    0.49,
    0.055,
    64
  );
  const base_bottom_foot = new THREE.Mesh(
    base_bottom_footGeo,
    base_bottom_footMat
  );
  base_bottom_foot.name = "base_bottom_foot";
  base_bottom_foot.position.y = 0.0275;
  base_assembly.add(base_bottom_foot);

  const base_silver_bandMat = brushed_metalMat;
  const base_silver_bandGeo = new THREE.CylinderGeometry(
    0.55,
    0.55,
    0.15,
    64
  );
  const base_silver_band = new THREE.Mesh(
    base_silver_bandGeo,
    base_silver_bandMat
  );
  base_silver_band.name = "base_silver_band";
  base_silver_band.position.y = 0.12;
  base_assembly.add(base_silver_band);

  const base_top_plateMat = glossy_blackMat;
  const base_top_plateGeo = new THREE.CylinderGeometry(
    0.52,
    0.55,
    0.1,
    64
  );
  const base_top_plate = new THREE.Mesh(
    base_top_plateGeo,
    base_top_plateMat
  );
  base_top_plate.name = "base_top_plate";
  base_top_plate.position.y = 0.235;
  base_assembly.add(base_top_plate);

  const base_supportsMat = glossy_blackMat;
  const base_supportsGeo = new THREE.BoxGeometry(0.13, 0.79, 0.2);
  const base_supports = new THREE.InstancedMesh(
    base_supportsGeo,
    base_supportsMat,
    2
  );
  base_supports.name = "base_supports";
  const support_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    support_dummy.position.set(i === 0 ? -0.405 : 0.405, 0.665, -0.07);
    support_dummy.updateMatrix();
    base_supports.setMatrixAt(i, support_dummy.matrix);
  }
  base_supports.instanceMatrix.needsUpdate = true;
  base_assembly.add(base_supports);

  const drip_trayMat = glossy_blackMat;
  const drip_trayGeo = new THREE.CylinderGeometry(0.39, 0.39, 0.025, 64);
  const drip_tray = new THREE.Mesh(drip_trayGeo, drip_trayMat);
  drip_tray.name = "drip_tray";
  drip_tray.position.y = 0.292;
  base_assembly.add(drip_tray);

  const drip_tray_rimMat = glossy_blackMat;
  const drip_tray_rimGeo = new THREE.TorusGeometry(0.35, 0.014, 10, 64);
  const drip_tray_rim = new THREE.Mesh(
    drip_tray_rimGeo,
    drip_tray_rimMat
  );
  drip_tray_rim.name = "drip_tray_rim";
  drip_tray_rim.rotation.x = Math.PI / 2;
  drip_tray_rim.position.y = 0.309;
  base_assembly.add(drip_tray_rim);

  const drip_grate_slotsMat = matte_blackMat;
  const drip_grate_slotsGeo = new THREE.BoxGeometry(0.018, 0.007, 0.105);
  const drip_grate_slots = new THREE.InstancedMesh(
    drip_grate_slotsGeo,
    drip_grate_slotsMat,
    12
  );
  drip_grate_slots.name = "drip_grate_slots";
  const grate_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    grate_dummy.position.set(
      Math.sin(angle) * 0.31,
      0.309,
      Math.cos(angle) * 0.31
    );
    grate_dummy.rotation.set(0, angle, 0);
    grate_dummy.updateMatrix();
    drip_grate_slots.setMatrixAt(i, grate_dummy.matrix);
  }
  drip_grate_slots.instanceMatrix.needsUpdate = true;
  base_assembly.add(drip_grate_slots);

  const lower_chamber = new THREE.Group();
  lower_chamber.name = "lower_chamber";
  root.add(lower_chamber);

  const lower_rear_panelMat = glossy_blackMat;
  const lower_rear_panelGeo = new THREE.BoxGeometry(0.72, 0.78, 0.08);
  const lower_rear_panel = new THREE.Mesh(
    lower_rear_panelGeo,
    lower_rear_panelMat
  );
  lower_rear_panel.name = "lower_rear_panel";
  lower_rear_panel.position.set(0, 0.665, -0.25);
  lower_chamber.add(lower_rear_panel);

  const reservoir_back_tintMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const reservoir_back_tintShape = roundedRectShape(0.5, 0.64, 0.075);
  const reservoir_back_tintGeo = new THREE.ShapeGeometry(
    reservoir_back_tintShape,
    16
  );
  const reservoir_back_tint = new THREE.Mesh(
    reservoir_back_tintGeo,
    reservoir_back_tintMat
  );
  reservoir_back_tint.name = "reservoir_back_tint";
  reservoir_back_tint.position.set(0, 0.65, -0.205);
  lower_chamber.add(reservoir_back_tint);

  const internal_filterMat = matte_blackMat;
  const internal_filterGeo = new THREE.CylinderGeometry(
    0.075,
    0.095,
    0.48,
    24
  );
  const internal_filter = new THREE.Mesh(
    internal_filterGeo,
    internal_filterMat
  );
  internal_filter.name = "internal_filter";
  internal_filter.position.set(0, 0.62, -0.04);
  lower_chamber.add(internal_filter);

  const internal_nozzleMat = matte_blackMat;
  const internal_nozzleGeo = new THREE.CylinderGeometry(
    0.025,
    0.032,
    0.18,
    18
  );
  const internal_nozzle = new THREE.Mesh(
    internal_nozzleGeo,
    internal_nozzleMat
  );
  internal_nozzle.name = "internal_nozzle";
  internal_nozzle.position.set(0, 0.86, -0.04);
  lower_chamber.add(internal_nozzle);

  const reservoir_bodyMat = glassMat;
  const reservoir_bodyShape = roundedRectShape(0.5, 0.66, 0.075);
  const reservoir_bodyGeo = new THREE.ExtrudeGeometry(
    reservoir_bodyShape,
    {
      depth: 0.36,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3,
    }
  );
  const reservoir_body = new THREE.Mesh(
    reservoir_bodyGeo,
    reservoir_bodyMat
  );
  reservoir_body.name = "reservoir_body";
  reservoir_body.position.set(0, 0.65, -0.18);
  lower_chamber.add(reservoir_body);

  const reservoir_front_panelMat = glassMat;
  const reservoir_front_panelShape = roundedRectShape(0.46, 0.61, 0.065);
  const reservoir_front_panelGeo = new THREE.ShapeGeometry(
    reservoir_front_panelShape,
    16
  );
  const reservoir_front_panel = new THREE.Mesh(
    reservoir_front_panelGeo,
    reservoir_front_panelMat
  );
  reservoir_front_panel.name = "reservoir_front_panel";
  reservoir_front_panel.position.set(0, 0.65, 0.198);
  lower_chamber.add(reservoir_front_panel);

  const reservoir_highlightMat = glass_highlightMat;
  const reservoir_highlightShape = roundedRectShape(0.025, 0.48, 0.012);
  const reservoir_highlightGeo = new THREE.ShapeGeometry(
    reservoir_highlightShape,
    8
  );
  const reservoir_highlight = new THREE.Mesh(
    reservoir_highlightGeo,
    reservoir_highlightMat
  );
  reservoir_highlight.name = "reservoir_highlight";
  reservoir_highlight.position.set(-0.16, 0.67, 0.204);
  lower_chamber.add(reservoir_highlight);

  const reservoir_bottom_ringMat = glossy_blackMat;
  const reservoir_bottom_ringGeo = new THREE.TorusGeometry(
    0.205,
    0.014,
    10,
    48
  );
  const reservoir_bottom_ring = new THREE.Mesh(
    reservoir_bottom_ringGeo,
    reservoir_bottom_ringMat
  );
  reservoir_bottom_ring.name = "reservoir_bottom_ring";
  reservoir_bottom_ring.rotation.x = Math.PI / 2;
  reservoir_bottom_ring.position.set(0, 0.326, 0.01);
  lower_chamber.add(reservoir_bottom_ring);

  const reservoir_bottom_discMat = glassMat;
  const reservoir_bottom_discGeo = new THREE.CylinderGeometry(
    0.19,
    0.19,
    0.018,
    48
  );
  const reservoir_bottom_disc = new THREE.Mesh(
    reservoir_bottom_discGeo,
    reservoir_bottom_discMat
  );
  reservoir_bottom_disc.name = "reservoir_bottom_disc";
  reservoir_bottom_disc.position.set(0, 0.322, 0.01);
  lower_chamber.add(reservoir_bottom_disc);

  const dispenser_headMat = glossy_blackMat;
  const dispenser_headGeo = new THREE.CylinderGeometry(
    0.23,
    0.25,
    0.12,
    48
  );
  const dispenser_head = new THREE.Mesh(
    dispenser_headGeo,
    dispenser_headMat
  );
  dispenser_head.name = "dispenser_head";
  dispenser_head.position.set(0, 0.985, 0.01);
  lower_chamber.add(dispenser_head);

  const dispenser_nozzleMat = glossy_blackMat;
  const dispenser_nozzleGeo = new THREE.CylinderGeometry(
    0.065,
    0.085,
    0.1,
    32
  );
  const dispenser_nozzle = new THREE.Mesh(
    dispenser_nozzleGeo,
    dispenser_nozzleMat
  );
  dispenser_nozzle.name = "dispenser_nozzle";
  dispenser_nozzle.position.set(0, 0.89, 0.02);
  lower_chamber.add(dispenser_nozzle);

  const upper_assembly = new THREE.Group();
  upper_assembly.name = "upper_assembly";
  root.add(upper_assembly);

  const upper_lower_collarMat = glossy_blackMat;
  const upper_lower_collarGeo = new THREE.CylinderGeometry(
    0.52,
    0.54,
    0.1,
    64
  );
  const upper_lower_collar = new THREE.Mesh(
    upper_lower_collarGeo,
    upper_lower_collarMat
  );
  upper_lower_collar.name = "upper_lower_collar";
  upper_lower_collar.position.y = 1.01;
  upper_assembly.add(upper_lower_collar);

  const upper_bodyMat = brushed_metalMat;
  const upper_bodyGeo = new THREE.CylinderGeometry(
    0.5,
    0.5,
    0.62,
    64
  );
  const upper_body = new THREE.Mesh(upper_bodyGeo, upper_bodyMat);
  upper_body.name = "upper_body";
  upper_body.position.y = 1.36;
  upper_assembly.add(upper_body);

  const upper_bottom_trimMat = glossy_blackMat;
  const upper_bottom_trimGeo = new THREE.TorusGeometry(
    0.493,
    0.014,
    10,
    64
  );
  const upper_bottom_trim = new THREE.Mesh(
    upper_bottom_trimGeo,
    upper_bottom_trimMat
  );
  upper_bottom_trim.name = "upper_bottom_trim";
  upper_bottom_trim.rotation.x = Math.PI / 2;
  upper_bottom_trim.position.y = 1.06;
  upper_assembly.add(upper_bottom_trim);

  const upper_top_bandMat = glossy_blackMat;
  const upper_top_bandGeo = new THREE.CylinderGeometry(
    0.51,
    0.51,
    0.075,
    64
  );
  const upper_top_band = new THREE.Mesh(
    upper_top_bandGeo,
    upper_top_bandMat
  );
  upper_top_band.name = "upper_top_band";
  upper_top_band.position.y = 1.68;
  upper_assembly.add(upper_top_band);

  const top_lidMat = glossy_blackMat;
  const top_lidGeo = new THREE.CylinderGeometry(
    0.485,
    0.51,
    0.075,
    64
  );
  const top_lid = new THREE.Mesh(top_lidGeo, top_lidMat);
  top_lid.name = "top_lid";
  top_lid.position.y = 1.725;
  upper_assembly.add(top_lid);

  const top_insertMat = brushed_metalMat;
  const top_insertGeo = new THREE.CylinderGeometry(
    0.435,
    0.435,
    0.018,
    64
  );
  const top_insert = new THREE.Mesh(top_insertGeo, top_insertMat);
  top_insert.name = "top_insert";
  top_insert.position.y = 1.771;
  upper_assembly.add(top_insert);

  const top_insert_grooveMat = glossy_blackMat;
  const top_insert_grooveGeo = new THREE.TorusGeometry(
    0.414,
    0.006,
    8,
    64
  );
  const top_insert_groove = new THREE.Mesh(
    top_insert_grooveGeo,
    top_insert_grooveMat
  );
  top_insert_groove.name = "top_insert_groove";
  top_insert_groove.rotation.x = Math.PI / 2;
  top_insert_groove.position.y = 1.782;
  upper_assembly.add(top_insert_groove);

  const top_buttonMat = glossy_blackMat;
  const top_buttonGeo = new THREE.CylinderGeometry(
    0.095,
    0.095,
    0.014,
    40
  );
  const top_button = new THREE.Mesh(top_buttonGeo, top_buttonMat);
  top_button.name = "top_button";
  top_button.position.y = 1.789;
  upper_assembly.add(top_button);

  const top_button_ringMat = brushed_metalMat;
  const top_button_ringGeo = new THREE.TorusGeometry(
    0.091,
    0.004,
    8,
    40
  );
  const top_button_ring = new THREE.Mesh(
    top_button_ringGeo,
    top_button_ringMat
  );
  top_button_ring.name = "top_button_ring";
  top_button_ring.rotation.x = Math.PI / 2;
  top_button_ring.position.y = 1.797;
  upper_assembly.add(top_button_ring);

  const control_assembly = new THREE.Group();
  control_assembly.name = "control_assembly";
  upper_assembly.add(control_assembly);

  const control_panelShape = roundedRectShape(0.34, 0.56, 0.055);
  const control_panelGeom = new THREE.ExtrudeGeometry(control_panelShape, {
    depth: 0.025,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const control_panel = new THREE.Mesh(control_panelGeom, panelMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0, 1.36, 0.489);
  control_assembly.add(control_panel);

  const brand_segments = [];
  const brand_text = "ZENIZEST";
  const brand_width = 0.024;
  const brand_height = 0.036;
  const brand_gap = 0.006;
  const brand_total_width =
    brand_text.length * brand_width +
    (brand_text.length - 1) * brand_gap;
  const brand_start_x = -brand_total_width / 2;
  const brand_y = 1.565;

  function addBrandSegment(x1, y1, x2, y2) {
    brand_segments.push([x1, y1, x2, y2]);
  }

  for (let i = 0; i < brand_text.length; i++) {
    const letter = brand_text[i];
    const x = brand_start_x + i * (brand_width + brand_gap);
    const left = x;
    const right = x + brand_width;
    const middle = x + brand_width / 2;
    const bottom = brand_y;
    const top = brand_y + brand_height;
    const middle_y = brand_y + brand_height / 2;

    if (letter === "Z") {
      addBrandSegment(left, top, right, top);
      addBrandSegment(right, top, left, bottom);
      addBrandSegment(left, bottom, right, bottom);
    } else if (letter === "E") {
      addBrandSegment(left, bottom, left, top);
      addBrandSegment(left, top, right, top);
      addBrandSegment(left, middle_y, right * 0.98 + left * 0.02, middle_y);
      addBrandSegment(left, bottom, right, bottom);
    } else if (letter === "N") {
      addBrandSegment(left, bottom, left, top);
      addBrandSegment(left, top, right, bottom);
      addBrandSegment(right, bottom, right, top);
    } else if (letter === "I") {
      addBrandSegment(left, top, right, top);
      addBrandSegment(middle, bottom, middle, top);
      addBrandSegment(left, bottom, right, bottom);
    } else if (letter === "S") {
      addBrandSegment(left, top, right, top);
      addBrandSegment(left, middle_y, left, top);
      addBrandSegment(left, middle_y, right, middle_y);
      addBrandSegment(right, bottom, right, middle_y);
      addBrandSegment(left, bottom, right, bottom);
    } else if (letter === "T") {
      addBrandSegment(left, top, right, top);
      addBrandSegment(middle, bottom, middle, top);
    }
  }

  const brand_logoMat = labelMat;
  const brand_logoGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_logo = new THREE.InstancedMesh(
    brand_logoGeom,
    brand_logoMat,
    brand_segments.length
  );
  brand_logo.name = "brand_logo";
  const logo_dummy = new THREE.Object3D();
  for (let i = 0; i < brand_segments.length; i++) {
    const segment = brand_segments[i];
    const dx = segment[2] - segment[0];
    const dy = segment[3] - segment[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    logo_dummy.position.set(
      (segment[0] + segment[2]) / 2,
      (segment[1] + segment[3]) / 2,
      0.528
    );
    logo_dummy.rotation.set(0, 0, Math.atan2(dy, dx));
    logo_dummy.scale.set(length, 0.0035, 0.004);
    logo_dummy.updateMatrix();
    brand_logo.setMatrixAt(i, logo_dummy.matrix);
  }
  brand_logo.instanceMatrix.needsUpdate = true;
  control_assembly.add(brand_logo);

  const upper_knobMat = knobMat;
  const upper_knobGeom = new THREE.CylinderGeometry(
    0.064,
    0.064,
    0.04,
    40
  );
  const upper_knob = new THREE.Mesh(upper_knobGeom, upper_knobMat);
  upper_knob.name = "upper_knob";
  upper_knob.rotation.x = Math.PI / 2;
  upper_knob.position.set(0, 1.39, 0.548);
  control_assembly.add(upper_knob);

  const upper_knob_bezelMat = glossy_blackMat;
  const upper_knob_bezelGeom = new THREE.TorusGeometry(
    0.066,
    0.007,
    10,
    40
  );
  const upper_knob_bezel = new THREE.Mesh(
    upper_knob_bezelGeom,
    upper_knob_bezelMat
  );
  upper_knob_bezel.name = "upper_knob_bezel";
  upper_knob_bezel.position.set(0, 1.39, 0.569);
  control_assembly.add(upper_knob_bezel);

  const upper_knob_indicatorMat = labelMat;
  const upper_knob_indicatorGeom = new THREE.BoxGeometry(
    0.006,
    0.022,
    0.005
  );
  const upper_knob_indicator = new THREE.Mesh(
    upper_knob_indicatorGeom,
    upper_knob_indicatorMat
  );
  upper_knob_indicator.name = "upper_knob_indicator";
  upper_knob_indicator.position.set(0, 1.432, 0.573);
  control_assembly.add(upper_knob_indicator);

  const lower_knobMat = knobMat;
  const lower_knobGeom = new THREE.CylinderGeometry(
    0.061,
    0.061,
    0.04,
    40
  );
  const lower_knob = new THREE.Mesh(lower_knobGeom, lower_knobMat);
  lower_knob.name = "lower_knob";
  lower_knob.rotation.x = Math.PI / 2;
  lower_knob.position.set(0, 1.145, 0.548);
  control_assembly.add(lower_knob);

  const lower_knob_bezelMat = glossy_blackMat;
  const lower_knob_bezelGeom = new THREE.TorusGeometry(
    0.063,
    0.007,
    10,
    40
  );
  const lower_knob_bezel = new THREE.Mesh(
    lower_knob_bezelGeom,
    lower_knob_bezelMat
  );
  lower_knob_bezel.name = "lower_knob_bezel";
  lower_knob_bezel.position.set(0, 1.145, 0.569);
  control_assembly.add(lower_knob_bezel);

  const lower_knob_indicatorMat = labelMat;
  const lower_knob_indicatorGeom = new THREE.BoxGeometry(
    0.078,
    0.007,
    0.005
  );
  const lower_knob_indicator = new THREE.Mesh(
    lower_knob_indicatorGeom,
    lower_knob_indicatorMat
  );
  lower_knob_indicator.name = "lower_knob_indicator";
  lower_knob_indicator.rotation.z = -0.55;
  lower_knob_indicator.position.set(0, 1.145, 0.573);
  control_assembly.add(lower_knob_indicator);

  const control_tick_marksMat = labelMat;
  const control_tick_marksGeom = new THREE.BoxGeometry(
    0.006,
    0.014,
    0.004
  );
  const control_tick_marks = new THREE.InstancedMesh(
    control_tick_marksGeom,
    control_tick_marksMat,
    14
  );
  control_tick_marks.name = "control_tick_marks";
  const tick_dummy = new THREE.Object3D();
  let tick_index = 0;

  for (let i = 0; i < 7; i++) {
    const angle = -1.95 + (i / 6) * 3.9;
    tick_dummy.position.set(
      Math.sin(angle) * 0.098,
      1.39 + Math.cos(angle) * 0.098,
      0.528
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, i === 3 ? 1.35 : 1, 1);
    tick_dummy.updateMatrix();
    control_tick_marks.setMatrixAt(tick_index++, tick_dummy.matrix);
  }

  for (let i = 0; i < 7; i++) {
    const angle = -1.75 + (i / 6) * 3.5;
    tick_dummy.position.set(
      Math.sin(angle) * 0.094,
      1.145 + Math.cos(angle) * 0.094,
      0.528
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, i === 3 ? 1.35 : 1, 1);
    tick_dummy.updateMatrix();
    control_tick_marks.setMatrixAt(tick_index++, tick_dummy.matrix);
  }
  control_tick_marks.instanceMatrix.needsUpdate = true;
  control_assembly.add(control_tick_marks);

  const control_label_marksMat = labelMat;
  const control_label_marksGeom = new THREE.BoxGeometry(
    0.022,
    0.004,
    0.004
  );
  const control_label_positions = [
    [-0.095, 1.47, 0],
    [0.095, 1.47, 0],
    [-0.105, 1.285, 0],
    [0.105, 1.285, 0],
    [-0.095, 1.245, 0],
    [0.095, 1.245, 0],
    [-0.075, 1.075, 0],
    [0.075, 1.075, 0],
    [-0.105, 1.315, Math.PI / 2],
    [0.105, 1.315, Math.PI / 2],
    [-0.105, 1.255, Math.PI / 2],
    [0.105, 1.255, Math.PI / 2],
  ];
  const control_label_marks = new THREE.InstancedMesh(
    control_label_marksGeom,
    control_label_marksMat,
    control_label_positions.length
  );
  control_label_marks.name = "control_label_marks";
  const label_dummy = new THREE.Object3D();
  for (let i = 0; i < control_label_positions.length; i++) {
    const position = control_label_positions[i];
    label_dummy.position.set(position[0], position[1], 0.529);
    label_dummy.rotation.set(0, 0, position[2]);
    label_dummy.scale.set(1, 1, 1);
    label_dummy.updateMatrix();
    control_label_marks.setMatrixAt(i, label_dummy.matrix);
  }
  control_label_marks.instanceMatrix.needsUpdate = true;
  control_assembly.add(control_label_marks);

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

  fitToUnitCube(THREE, root);
  return root;
}