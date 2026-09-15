export default function generate(THREE) {
  const root = new THREE.Group();
  const housing = new THREE.Group();
  const light_assembly = new THREE.Group();
  const top_assembly = new THREE.Group();
  root.add(housing, light_assembly, top_assembly);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x111821,
    metalness: 0.5,
    roughness: 0.4,
    flatShading: true,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x090e14,
    metalness: 0.5,
    roughness: 0.38,
    flatShading: true,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x020305,
    metalness: 0.2,
    roughness: 0.7,
  });
  const panel_frameMat = new THREE.MeshStandardMaterial({
    color: 0x071019,
    metalness: 0.45,
    roughness: 0.42,
  });
  const frosted_diffuserMat = new THREE.MeshPhysicalMaterial({
    color: 0x7890a0,
    metalness: 0.0,
    roughness: 0.55,
    transmission: 0.35,
    thickness: 0.12,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const speaker_grilleMat = new THREE.MeshStandardMaterial({
    color: 0x171b22,
    metalness: 0.35,
    roughness: 0.65,
  });
  const speaker_holeMat = new THREE.MeshStandardMaterial({
    color: 0x010203,
    metalness: 0.0,
    roughness: 0.9,
  });
  const top_lensMat = new THREE.MeshStandardMaterial({
    color: 0x778087,
    metalness: 0.2,
    roughness: 0.45,
    transparent: true,
    opacity: 0.72,
  });
  const lens_detailMat = new THREE.MeshStandardMaterial({
    color: 0xa5adb3,
    metalness: 0.15,
    roughness: 0.5,
    transparent: true,
    opacity: 0.38,
  });

  function makeLedMaterial(color, opacity) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.35,
      emissive: color,
      emissiveIntensity: 1.0,
      transparent: opacity < 1,
      opacity,
      depthWrite: opacity >= 1,
    });
  }

  const red_ledMat = makeLedMaterial(0xff1744, 1.0);
  const magenta_ledMat = makeLedMaterial(0xff00cf, 1.0);
  const purple_ledMat = makeLedMaterial(0x9c27ff, 1.0);
  const blue_ledMat = makeLedMaterial(0x1649ff, 1.0);
  const cyan_ledMat = makeLedMaterial(0x00d9ff, 1.0);
  const green_ledMat = makeLedMaterial(0x00e676, 1.0);
  const white_ledMat = makeLedMaterial(0xffffff, 1.0);
  const led_coreMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffffff,
    emissiveIntensity: 1.0,
  });
  const led_core_haloMat = new THREE.MeshStandardMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xddeeff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });

  function createRoundedPanelGeometry(width, height, radius) {
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
    return new THREE.ShapeGeometry(shape, 16);
  }

  const main_bodyGeom = new THREE.CylinderGeometry(0.43, 0.43, 2.68, 16);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.position.y = 0;
  housing.add(main_body);

  const bottom_baseGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.4, 12);
  const bottom_base = new THREE.Mesh(bottom_baseGeom, capMat);
  bottom_base.position.y = -1.54;
  housing.add(bottom_base);

  const bottom_bevelGeom = new THREE.CylinderGeometry(0.39, 0.43, 0.1, 12);
  const bottom_bevel = new THREE.Mesh(bottom_bevelGeom, capMat);
  bottom_bevel.position.y = -1.77;
  housing.add(bottom_bevel);

  const bottom_shadow_ringGeom = new THREE.TorusGeometry(0.395, 0.018, 8, 32);
  const bottom_shadow_ring = new THREE.Mesh(bottom_shadow_ringGeom, seamMat);
  bottom_shadow_ring.rotation.x = Math.PI / 2;
  bottom_shadow_ring.position.y = -1.72;
  housing.add(bottom_shadow_ring);

  const lower_collarGeom = new THREE.CylinderGeometry(0.445, 0.445, 0.16, 16);
  const lower_collar = new THREE.Mesh(lower_collarGeom, capMat);
  lower_collar.position.y = -1.31;
  housing.add(lower_collar);

  const lower_collar_ringGeom = new THREE.TorusGeometry(0.418, 0.022, 8, 32);
  const lower_collar_ring = new THREE.Mesh(lower_collar_ringGeom, seamMat);
  lower_collar_ring.rotation.x = Math.PI / 2;
  lower_collar_ring.position.y = -1.39;
  housing.add(lower_collar_ring);

  const upper_collarGeom = new THREE.CylinderGeometry(0.445, 0.445, 0.16, 16);
  const upper_collar = new THREE.Mesh(upper_collarGeom, capMat);
  upper_collar.position.y = 1.31;
  housing.add(upper_collar);

  const upper_collar_ringGeom = new THREE.TorusGeometry(0.42, 0.022, 8, 32);
  const upper_collar_ring = new THREE.Mesh(upper_collar_ringGeom, seamMat);
  upper_collar_ring.rotation.x = Math.PI / 2;
  upper_collar_ring.position.y = 1.39;
  housing.add(upper_collar_ring);

  const body_seamGeom = new THREE.TorusGeometry(0.426, 0.009, 6, 32);
  const body_seam = new THREE.Mesh(body_seamGeom, seamMat);
  body_seam.rotation.x = Math.PI / 2;
  body_seam.position.y = -0.31;
  housing.add(body_seam);

  const panel_frameGeom = createRoundedPanelGeometry(0.68, 2.28, 0.09);
  const panel_frame = new THREE.Mesh(panel_frameGeom, panel_frameMat);
  panel_frame.position.set(0, -0.03, 0.434);
  light_assembly.add(panel_frame);

  const frosted_diffuserGeom = createRoundedPanelGeometry(0.59, 2.18, 0.065);
  const frosted_diffuser = new THREE.Mesh(frosted_diffuserGeom, frosted_diffuserMat);
  frosted_diffuser.position.set(0, -0.03, 0.442);
  frosted_diffuser.renderOrder = 4;
  light_assembly.add(frosted_diffuser);

  const led_segmentGeom = new THREE.PlaneGeometry(0.55, 0.36);

  const red_led_segment = new THREE.Mesh(led_segmentGeom, red_ledMat);
  red_led_segment.position.set(0, 0.81, 0.448);
  light_assembly.add(red_led_segment);

  const magenta_led_segment = new THREE.Mesh(led_segmentGeom, magenta_ledMat);
  magenta_led_segment.position.set(0, 0.45, 0.448);
  light_assembly.add(magenta_led_segment);

  const purple_led_segment = new THREE.Mesh(led_segmentGeom, purple_ledMat);
  purple_led_segment.position.set(0, 0.09, 0.448);
  light_assembly.add(purple_led_segment);

  const blue_led_segment = new THREE.Mesh(led_segmentGeom, blue_ledMat);
  blue_led_segment.position.set(0, -0.27, 0.448);
  light_assembly.add(blue_led_segment);

  const cyan_led_segment = new THREE.Mesh(led_segmentGeom, cyan_ledMat);
  cyan_led_segment.position.set(0, -0.63, 0.448);
  light_assembly.add(cyan_led_segment);

  const green_led_segment = new THREE.Mesh(led_segmentGeom, green_ledMat);
  green_led_segment.position.set(0, -0.99, 0.448);
  light_assembly.add(green_led_segment);

  const led_coreGeom = new THREE.CircleGeometry(0.13, 24);
  const led_core_haloGeom = new THREE.CircleGeometry(0.19, 24);

  const upper_led_core_halo = new THREE.Mesh(led_core_haloGeom, led_core_haloMat);
  upper_led_core_halo.position.set(0.015, 0.57, 0.452);
  upper_led_core_halo.renderOrder = 5;
  light_assembly.add(upper_led_core_halo);

  const upper_led_core = new THREE.Mesh(led_coreGeom, led_coreMat);
  upper_led_core.position.set(0.015, 0.57, 0.454);
  upper_led_core.renderOrder = 6;
  light_assembly.add(upper_led_core);

  const middle_led_core_halo = new THREE.Mesh(led_core_haloGeom, led_core_haloMat);
  middle_led_core_halo.position.set(0.01, -0.15, 0.452);
  middle_led_core_halo.renderOrder = 5;
  light_assembly.add(middle_led_core_halo);

  const middle_led_core = new THREE.Mesh(led_coreGeom, led_coreMat);
  middle_led_core.position.set(0.01, -0.15, 0.454);
  middle_led_core.renderOrder = 6;
  light_assembly.add(middle_led_core);

  const lower_led_core_halo = new THREE.Mesh(led_core_haloGeom, led_core_haloMat);
  lower_led_core_halo.position.set(0.015, -0.88, 0.452);
  lower_led_core_halo.renderOrder = 5;
  light_assembly.add(lower_led_core_halo);

  const lower_led_core = new THREE.Mesh(led_coreGeom, led_coreMat);
  lower_led_core.position.set(0.015, -0.88, 0.454);
  lower_led_core.renderOrder = 6;
  light_assembly.add(lower_led_core);

  const panel_dividerGeom = new THREE.BoxGeometry(0.56, 0.025, 0.018);
  const panel_divider = new THREE.Mesh(panel_dividerGeom, panel_frameMat);
  panel_divider.position.set(0, -0.31, 0.459);
  light_assembly.add(panel_divider);

  const speaker_grilleGeom = new THREE.CircleGeometry(0.18, 28);
  const speaker_grille = new THREE.Mesh(speaker_grilleGeom, speaker_grilleMat);
  const speakerAngle = -1.08;
  const speakerNormal = new THREE.Vector3(
    Math.sin(speakerAngle),
    0,
    Math.cos(speakerAngle)
  );
  speaker_grille.position.set(
    speakerNormal.x * 0.436,
    0.62,
    speakerNormal.z * 0.436
  );
  speaker_grille.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    speakerNormal
  );
  housing.add(speaker_grille);

  const speaker_holeGeom = new THREE.CircleGeometry(0.012, 8);
  const speaker_holes = new THREE.InstancedMesh(
    speaker_holeGeom,
    speaker_holeMat,
    25
  );
  const speakerDummy = new THREE.Object3D();
  let speakerIndex = 0;
  for (let row = -3; row <= 3; row++) {
    const yy = row * 0.043;
    const offset = Math.abs(row) % 2 === 1 ? 0.021 : 0;
    for (let column = -2; column <= 2; column++) {
      const xx = column * 0.042 + offset;
      if (xx * xx + yy * yy <= 0.145 * 0.145) {
        speakerDummy.position.set(xx, yy, 0.004);
        speakerDummy.updateMatrix();
        speaker_holes.setMatrixAt(speakerIndex, speakerDummy.matrix);
        speakerIndex++;
      }
    }
  }
  speaker_holes.instanceMatrix.needsUpdate = true;
  speaker_grille.add(speaker_holes);

  const side_buttonGeom = new THREE.SphereGeometry(0.045, 16, 8);
  const side_button = new THREE.Mesh(side_buttonGeom, seamMat);
  const buttonAngle = -1.28;
  const buttonNormal = new THREE.Vector3(
    Math.sin(buttonAngle),
    0,
    Math.cos(buttonAngle)
  );
  side_button.scale.set(0.45, 1.0, 0.28);
  side_button.position.set(
    buttonNormal.x * 0.442,
    -0.91,
    buttonNormal.z * 0.442
  );
  side_button.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    buttonNormal
  );
  housing.add(side_button);

  const top_capGeom = new THREE.CylinderGeometry(0.4, 0.45, 0.38, 10);
  const top_cap = new THREE.Mesh(top_capGeom, capMat);
  top_cap.position.y = 1.54;
  top_assembly.add(top_cap);

  const top_bevelGeom = new THREE.CylinderGeometry(0.34, 0.4, 0.12, 10);
  const top_bevel = new THREE.Mesh(top_bevelGeom, capMat);
  top_bevel.position.y = 1.78;
  top_assembly.add(top_bevel);

  const top_lens_rimGeom = new THREE.CylinderGeometry(0.335, 0.335, 0.055, 32);
  const top_lens_rim = new THREE.Mesh(top_lens_rimGeom, seamMat);
  top_lens_rim.position.y = 1.855;
  top_assembly.add(top_lens_rim);

  const top_lensGeom = new THREE.CylinderGeometry(0.285, 0.285, 0.026, 32);
  const top_lens = new THREE.Mesh(top_lensGeom, top_lensMat);
  top_lens.position.y = 1.89;
  top_assembly.add(top_lens);

  const top_lens_outer_ringGeom = new THREE.TorusGeometry(0.245, 0.008, 6, 32);
  const top_lens_outer_ring = new THREE.Mesh(
    top_lens_outer_ringGeom,
    lens_detailMat
  );
  top_lens_outer_ring.rotation.x = Math.PI / 2;
  top_lens_outer_ring.position.y = 1.905;
  top_assembly.add(top_lens_outer_ring);

  const top_lens_middle_ringGeom = new THREE.TorusGeometry(0.17, 0.006, 6, 32);
  const top_lens_middle_ring = new THREE.Mesh(
    top_lens_middle_ringGeom,
    lens_detailMat
  );
  top_lens_middle_ring.rotation.x = Math.PI / 2;
  top_lens_middle_ring.position.y = 1.906;
  top_assembly.add(top_lens_middle_ring);

  const top_lens_inner_ringGeom = new THREE.TorusGeometry(0.095, 0.005, 6, 28);
  const top_lens_inner_ring = new THREE.Mesh(
    top_lens_inner_ringGeom,
    lens_detailMat
  );
  top_lens_inner_ring.rotation.x = Math.PI / 2;
  top_lens_inner_ring.position.y = 1.907;
  top_assembly.add(top_lens_inner_ring);

  const top_lens_centerGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.012, 24);
  const top_lens_center = new THREE.Mesh(top_lens_centerGeom, lens_detailMat);
  top_lens_center.position.y = 1.908;
  top_assembly.add(top_lens_center);

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