export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "xerox_9500_printer";

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x24262a, metalness: 0.1, roughness: 0.8 });
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x2d2f33, metalness: 0.1, roughness: 0.8 });
  const topMat = new THREE.MeshStandardMaterial({ color: 0x383a3e, metalness: 0.1, roughness: 0.8 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111316, metalness: 0.0, roughness: 0.85 });
  const slotMat = new THREE.MeshStandardMaterial({ color: 0x050607, metalness: 0.0, roughness: 0.9 });
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d2, metalness: 0.0, roughness: 0.45 });
  const blueButtonMat = new THREE.MeshStandardMaterial({ color: 0xaac8d0, metalness: 0.0, roughness: 0.45 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x17232b, metalness: 0.0, roughness: 0.3, transparent: true, opacity: 0.72 });
  const blueLineMat = new THREE.MeshStandardMaterial({ color: 0x174b70, metalness: 0.0, roughness: 0.65 });
  const whiteLogoMat = new THREE.MeshStandardMaterial({ color: 0xf2f2ee, metalness: 0.0, roughness: 0.55 });
  const indicatorMat = new THREE.MeshStandardMaterial({ color: 0x9fc4ca, metalness: 0.0, roughness: 0.5 });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  const main_body = addBox("main_body", 1.16, 0.78, 0.98, bodyMat, 0, 0.42, -0.02);
  const front_upper_panel = addBox("front_upper_panel", 1.08, 0.46, 0.045, bodyMat, 0, 0.55, 0.505);
  const front_lower_panel = addBox("front_lower_panel", 1.08, 0.34, 0.045, sideMat, 0, 0.20, 0.505);
  const left_front_round = addBox("left_front_round", 0.055, 0.72, 0.06, bodyMat, -0.555, 0.40, 0.50);
  const right_front_round = addBox("right_front_round", 0.055, 0.72, 0.06, bodyMat, 0.555, 0.40, 0.50);
  const left_side_panel = addBox("left_side_panel", 0.045, 0.66, 0.90, sideMat, -0.585, 0.39, -0.04);
  const right_side_panel = addBox("right_side_panel", 0.045, 0.66, 0.90, sideMat, 0.585, 0.39, -0.04);
  const left_side_top_band = addBox("left_side_top_band", 0.055, 0.10, 0.94, bodyMat, -0.59, 0.76, -0.02);
  const right_side_top_band = addBox("right_side_top_band", 0.055, 0.10, 0.94, bodyMat, 0.59, 0.76, -0.02);
  const bottom_plinth = addBox("bottom_plinth", 1.02, 0.08, 0.86, darkMat, 0, 0.045, -0.02);

  const paper_output_slot = addBox("paper_output_slot", 0.68, 0.075, 0.055, slotMat, 0, 0.365, 0.535);
  const paper_output_lip = addBox("paper_output_lip", 0.58, 0.035, 0.10, darkMat, 0, 0.325, 0.565);
  const paper_guide_left = addBox("paper_guide_left", 0.045, 0.12, 0.07, darkMat, -0.31, 0.31, 0.55);
  const paper_guide_right = addBox("paper_guide_right", 0.045, 0.12, 0.07, darkMat, 0.31, 0.31, 0.55);
  const left_output_recess = addBox("left_output_recess", 0.055, 0.22, 0.07, slotMat, -0.36, 0.25, 0.54);
  const right_output_recess = addBox("right_output_recess", 0.055, 0.22, 0.07, slotMat, 0.36, 0.25, 0.54);

  const control_panel = addBox("control_panel", 0.105, 0.34, 0.035, darkMat, -0.475, 0.235, 0.545);
  const control_panel_border = addBox("control_panel_border", 0.125, 0.36, 0.025, bodyMat, -0.475, 0.235, 0.525);
  const upper_control_button = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.012, 24), buttonMat);
  upper_control_button.name = "upper_control_button";
  upper_control_button.rotation.x = Math.PI / 2;
  upper_control_button.position.set(-0.475, 0.315, 0.57);
  root.add(upper_control_button);

  const lower_control_button = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.012, 24), buttonMat);
  lower_control_button.name = "lower_control_button";
  lower_control_button.rotation.x = Math.PI / 2;
  lower_control_button.position.set(-0.475, 0.165, 0.57);
  root.add(lower_control_button);

  const small_status_light = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16), indicatorMat);
  small_status_light.name = "small_status_light";
  small_status_light.rotation.x = Math.PI / 2;
  small_status_light.position.set(-0.475, 0.245, 0.574);
  root.add(small_status_light);

  const front_power_button = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.012, 24), buttonMat);
  front_power_button.name = "front_power_button";
  front_power_button.rotation.x = Math.PI / 2;
  front_power_button.position.set(0.43, 0.245, 0.555);
  root.add(front_power_button);

  const front_power_icon = addBox("front_power_icon", 0.008, 0.025, 0.006, darkMat, 0.43, 0.245, 0.564);

  const top_console = addBox("top_console", 1.10, 0.17, 0.36, topMat, 0, 0.845, 0.33);
  const top_console_front_lip = addBox("top_console_front_lip", 1.08, 0.055, 0.055, bodyMat, 0, 0.775, 0.515);
  const top_console_blue_line = addBox("top_console_blue_line", 0.92, 0.012, 0.012, blueLineMat, 0, 0.775, 0.548);

  const top_window = addBox("top_window", 0.72, 0.018, 0.28, glassMat, 0, 0.945, 0.285);
  const top_window_front_frame = addBox("top_window_front_frame", 0.82, 0.035, 0.035, darkMat, 0, 0.94, 0.445);
  const top_window_rear_frame = addBox("top_window_rear_frame", 0.82, 0.035, 0.035, darkMat, 0, 0.94, 0.125);
  const top_window_left_frame = addBox("top_window_left_frame", 0.045, 0.035, 0.31, darkMat, -0.39, 0.94, 0.285);
  const top_window_right_frame = addBox("top_window_right_frame", 0.045, 0.035, 0.31, darkMat, 0.39, 0.94, 0.285);

  const top_left_shoulder = addBox("top_left_shoulder", 0.16, 0.12, 0.38, topMat, -0.49, 0.91, 0.29);
  top_left_shoulder.rotation.x = -0.18;
  const top_right_shoulder = addBox("top_right_shoulder", 0.16, 0.12, 0.38, topMat, 0.49, 0.91, 0.29);
  top_right_shoulder.rotation.x = -0.18;

  const rear_top_cover = addBox("rear_top_cover", 1.08, 0.12, 0.66, topMat, 0, 0.91, -0.20);
  const rear_top_inset = addBox("rear_top_inset", 0.58, 0.012, 0.075, darkMat, 0, 0.977, -0.24);
  const rear_top_slot = addBox("rear_top_slot", 0.48, 0.008, 0.018, slotMat, 0, 0.986, -0.24);

  const left_side_seam = addBox("left_side_seam", 0.012, 0.018, 0.82, slotMat, -0.612, 0.705, -0.03);
  const right_side_seam = addBox("right_side_seam", 0.012, 0.018, 0.82, slotMat, 0.612, 0.705, -0.03);
  const left_side_vertical_seam = addBox("left_side_vertical_seam", 0.012, 0.56, 0.012, slotMat, -0.612, 0.39, 0.34);
  const right_side_vertical_seam = addBox("right_side_vertical_seam", 0.012, 0.56, 0.012, slotMat, 0.612, 0.39, 0.34);

  const footGeom = new THREE.CylinderGeometry(0.055, 0.065, 0.06, 18);
  const feet = new THREE.InstancedMesh(footGeom, darkMat, 4);
  feet.name = "feet";
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-0.47, -0.005, 0.39],
    [0.47, -0.005, 0.39],
    [-0.47, -0.005, -0.39],
    [0.47, -0.005, -0.39]
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(footPositions[i][0], footPositions[i][1], footPositions[i][2]);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  root.add(feet);

  const logoBarGeom = new THREE.BoxGeometry(1, 1, 1);
  function addLogoBar(parent, name, x, y, z, w, h, angle) {
    const bar = new THREE.Mesh(logoBarGeom, whiteLogoMat);
    bar.name = name;
    bar.position.set(x, y, z);
    bar.scale.set(w, h, 0.006);
    bar.rotation.z = angle || 0;
    parent.add(bar);
    return bar;
  }

  const front_brand_logo = new THREE.Group();
  front_brand_logo.name = "front_brand_logo";
  root.add(front_brand_logo);
  const logoX = -0.47;
  const logoY = 0.64;
  const logoZ = 0.532;
  addLogoBar(front_brand_logo, "logo_x_left", logoX, logoY, logoZ, 0.055, 0.009, Math.PI / 4);
  addLogoBar(front_brand_logo, "logo_x_right", logoX, logoY, logoZ, 0.055, 0.009, -Math.PI / 4);
  addLogoBar(front_brand_logo, "logo_e_stem", logoX + 0.055, logoY, logoZ, 0.009, 0.038, 0);
  addLogoBar(front_brand_logo, "logo_e_top", logoX + 0.075, logoY + 0.014, logoZ, 0.038, 0.008, 0);
  addLogoBar(front_brand_logo, "logo_e_mid", logoX + 0.073, logoY, logoZ, 0.032, 0.007, 0);
  addLogoBar(front_brand_logo, "logo_e_bottom", logoX + 0.075, logoY - 0.014, logoZ, 0.038, 0.008, 0);
  addLogoBar(front_brand_logo, "logo_r_stem", logoX + 0.12, logoY, logoZ, 0.009, 0.038, 0);
  addLogoBar(front_brand_logo, "logo_r_bowl", logoX + 0.143, logoY + 0.008, logoZ, 0.030, 0.008, 0);
  addLogoBar(front_brand_logo, "logo_o", logoX + 0.185, logoY, logoZ, 0.038, 0.038, 0);
  addLogoBar(front_brand_logo, "logo_r2_stem", logoX + 0.235, logoY, logoZ, 0.009, 0.038, 0);
  addLogoBar(front_brand_logo, "logo_r2_bowl", logoX + 0.258, logoY + 0.008, logoZ, 0.030, 0.008, 0);

  const model_number_logo = new THREE.Group();
  model_number_logo.name = "model_number_logo";
  root.add(model_number_logo);
  const modelX = 0.18;
  const modelY = 0.57;
  const modelZ = 0.533;
  addLogoBar(model_number_logo, "model_nine_loop", modelX, modelY + 0.018, modelZ, 0.034, 0.034, 0);
  addLogoBar(model_number_logo, "model_nine_stem", modelX + 0.012, modelY - 0.018, modelZ, 0.009, 0.040, -0.25);
  addLogoBar(model_number_logo, "model_five_top", modelX + 0.065, modelY + 0.020, modelZ, 0.036, 0.008, 0);
  addLogoBar(model_number_logo, "model_five_stem", modelX + 0.050, modelY, modelZ, 0.009, 0.040, 0);
  addLogoBar(model_number_logo, "model_five_middle", modelX + 0.068, modelY, modelZ, 0.034, 0.008, 0);
  addLogoBar(model_number_logo, "model_five_bottom", modelX + 0.065, modelY - 0.020, modelZ, 0.036, 0.008, 0);
  addLogoBar(model_number_logo, "model_zero_left", modelX + 0.125, modelY, modelZ, 0.009, 0.045, 0);
  addLogoBar(model_number_logo, "model_zero_right", modelX + 0.158, modelY, modelZ, 0.009, 0.045, 0);
  addLogoBar(model_number_logo, "model_zero_top", modelX + 0.142, modelY + 0.020, modelZ, 0.040, 0.008, 0);
  addLogoBar(model_number_logo, "model_zero_bottom", modelX + 0.142, modelY - 0.020, modelZ, 0.040, 0.008, 0);
  addLogoBar(model_number_logo, "model_second_zero_left", modelX + 0.195, modelY, modelZ, 0.009, 0.045, 0);
  addLogoBar(model_number_logo, "model_second_zero_right", modelX + 0.228, modelY, modelZ, 0.009, 0.045, 0);
  addLogoBar(model_number_logo, "model_second_zero_top", modelX + 0.212, modelY + 0.020, modelZ, 0.040, 0.008, 0);
  addLogoBar(model_number_logo, "model_second_zero_bottom", modelX + 0.212, modelY - 0.020, modelZ, 0.040, 0.008, 0);

  const console_button_left = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.014, 28), blueButtonMat);
  console_button_left.name = "console_button_left";
  console_button_left.rotation.x = Math.PI / 2;
  console_button_left.position.set(-0.16, 0.815, 0.525);
  root.add(console_button_left);

  const console_button_right = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.014, 28), buttonMat);
  console_button_right.name = "console_button_right";
  console_button_right.rotation.x = Math.PI / 2;
  console_button_right.position.set(0.16, 0.815, 0.525);
  root.add(console_button_right);

  const console_button_left_icon = addBox("console_button_left_icon", 0.025, 0.006, 0.006, darkMat, -0.16, 0.815, 0.535);
  const console_button_right_icon = addBox("console_button_right_icon", 0.025, 0.006, 0.006, darkMat, 0.16, 0.815, 0.535);

  const top_window_internal_rail = addBox("top_window_internal_rail", 0.58, 0.012, 0.012, darkMat, 0, 0.952, 0.19);
  const top_window_internal_crossbar = addBox("top_window_internal_crossbar", 0.012, 0.012, 0.18, darkMat, -0.22, 0.952, 0.28);
  const top_window_internal_crossbar_2 = addBox("top_window_internal_crossbar_2", 0.012, 0.012, 0.18, darkMat, 0, 0.952, 0.28);
  const top_window_internal_crossbar_3 = addBox("top_window_internal_crossbar_3", 0.012, 0.012, 0.18, darkMat, 0.22, 0.952, 0.28);

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