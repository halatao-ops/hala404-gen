export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8c0,
    metalness: 0.6,
    roughness: 0.4
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x666675,
    metalness: 0.6,
    roughness: 0.4
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.1,
    roughness: 0.8
  });
  const darkGlassMat = new THREE.MeshStandardMaterial({
    color: 0x18202a,
    metalness: 0.2,
    roughness: 0.3
  });
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x050608,
    metalness: 0.1,
    roughness: 0.3
  });
  const lensInnerMat = new THREE.MeshStandardMaterial({
    color: 0x172432,
    metalness: 0.2,
    roughness: 0.3
  });
  const flashMat = new THREE.MeshStandardMaterial({
    color: 0xfff2c0,
    metalness: 0.1,
    roughness: 0.3
  });
  const pinkLedMat = new THREE.MeshStandardMaterial({
    color: 0xff91e7,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff91e7,
    emissiveIntensity: 0.5
  });
  const cyanLedMat = new THREE.MeshStandardMaterial({
    color: 0x22d8ff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x22d8ff,
    emissiveIntensity: 0.45
  });
  const magentaGlowMat = new THREE.MeshBasicMaterial({
    color: 0xff20d7,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });
  const cyanGlowMat = new THREE.MeshBasicMaterial({
    color: 0x00cfff,
    transparent: true,
    opacity: 0.16,
    depthWrite: false
  });
  const purpleGlowMat = new THREE.MeshBasicMaterial({
    color: 0x9b40ff,
    transparent: true,
    opacity: 0.14,
    depthWrite: false
  });
  const basePinkGlowMat = new THREE.MeshBasicMaterial({
    color: 0xff62bd,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });
  const baseCyanGlowMat = new THREE.MeshBasicMaterial({
    color: 0x35cfff,
    transparent: true,
    opacity: 0.2,
    depthWrite: false
  });
  const basePurpleGlowMat = new THREE.MeshBasicMaterial({
    color: 0xa85cff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });
  const whiteMarkMat = new THREE.MeshBasicMaterial({
    color: 0xe8e8ff
  });

  function roundedRectShape(w, h, r) {
    const x = -w / 2;
    const y = -h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function roundedExtrudeGeometry(w, h, d, r, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(w, h, r),
      {
        depth: d,
        steps: 1,
        curveSegments: 12,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3
      }
    );
    geometry.translate(0, 0, -d / 2);
    return geometry;
  }

  const base_group = new THREE.Group();
  root.add(base_group);

  const base_lowerGeom = roundedExtrudeGeometry(3.4, 2.25, 0.14, 0.22, 0.035);
  const base_lower = new THREE.Mesh(base_lowerGeom, blackMat);
  base_lower.rotation.x = Math.PI / 2;
  base_lower.position.y = 0.02;
  base_group.add(base_lower);

  const base_bodyGeom = roundedExtrudeGeometry(3.5, 2.35, 0.28, 0.24, 0.055);
  const base_body = new THREE.Mesh(base_bodyGeom, silverMat);
  base_body.rotation.x = Math.PI / 2;
  base_body.position.y = 0.17;
  base_group.add(base_body);

  const base_topGeom = roundedExtrudeGeometry(3.32, 2.18, 0.045, 0.2, 0.018);
  const base_top = new THREE.Mesh(base_topGeom, silverMat);
  base_top.rotation.x = Math.PI / 2;
  base_top.position.y = 0.34;
  base_group.add(base_top);

  const base_front_trimGeom = new THREE.BoxGeometry(2.9, 0.075, 0.045);
  const base_front_trim = new THREE.Mesh(base_front_trimGeom, darkMetalMat);
  base_front_trim.position.set(0, 0.13, 1.205);
  base_group.add(base_front_trim);

  const base_seamGeom = new THREE.BoxGeometry(0.018, 0.24, 0.018);
  const base_seam = new THREE.Mesh(base_seamGeom, blackMat);
  base_seam.position.set(0.72, 0.16, 1.225);
  base_group.add(base_seam);

  const base_screwGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.012, 20);
  const base_screws = new THREE.InstancedMesh(base_screwGeom, blackMat, 2);
  const screwDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    screwDummy.position.set(i === 0 ? -1.25 : 1.25, 0.382, 0.78);
    screwDummy.updateMatrix();
    base_screws.setMatrixAt(i, screwDummy.matrix);
  }
  base_screws.instanceMatrix.needsUpdate = true;
  base_group.add(base_screws);

  const base_pink_glowGeom = new THREE.CircleGeometry(0.42, 32);
  const base_pink_glow = new THREE.Mesh(base_pink_glowGeom, basePinkGlowMat);
  base_pink_glow.rotation.x = -Math.PI / 2;
  base_pink_glow.scale.set(1.5, 0.75, 1);
  base_pink_glow.position.set(0.95, 0.386, -0.28);
  base_group.add(base_pink_glow);

  const base_cyan_glowGeom = new THREE.CircleGeometry(0.38, 32);
  const base_cyan_glow = new THREE.Mesh(base_cyan_glowGeom, baseCyanGlowMat);
  base_cyan_glow.rotation.x = -Math.PI / 2;
  base_cyan_glow.scale.set(1.35, 0.7, 1);
  base_cyan_glow.position.set(-0.15, 0.387, 0.55);
  base_group.add(base_cyan_glow);

  const base_purple_glowGeom = new THREE.CircleGeometry(0.34, 32);
  const base_purple_glow = new THREE.Mesh(base_purple_glowGeom, basePurpleGlowMat);
  base_purple_glow.rotation.x = -Math.PI / 2;
  base_purple_glow.scale.set(1.4, 0.7, 1);
  base_purple_glow.position.set(-1.0, 0.388, 0.28);
  base_group.add(base_purple_glow);

  const rear_supportShape = new THREE.Shape();
  rear_supportShape.moveTo(0, 0.34);
  rear_supportShape.lineTo(0.88, 0.34);
  rear_supportShape.lineTo(0.08, 1.48);
  rear_supportShape.closePath();

  const rear_supportGeom = new THREE.ExtrudeGeometry(rear_supportShape, {
    depth: 0.1,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2
  });
  rear_supportGeom.translate(0, 0, -0.05);
  const rear_support = new THREE.Mesh(rear_supportGeom, silverMat);
  rear_support.rotation.y = Math.PI / 2;
  rear_support.position.x = 0.36;
  root.add(rear_support);

  const support_hingeGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.22, 20);
  const support_hinge = new THREE.Mesh(support_hingeGeom, darkMetalMat);
  support_hinge.rotation.z = Math.PI / 2;
  support_hinge.position.set(0.36, 1.43, 0.08);
  root.add(support_hinge);

  const support_footGeom = new THREE.BoxGeometry(0.24, 0.045, 0.16);
  const support_foot = new THREE.Mesh(support_footGeom, blackMat);
  support_foot.position.set(0.36, 0.36, -0.78);
  root.add(support_foot);

  const kickstand_group = new THREE.Group();
  kickstand_group.position.set(0.58, 1.55, -0.04);
  kickstand_group.rotation.z = 0.48;
  root.add(kickstand_group);

  const kickstandGeom = new THREE.BoxGeometry(0.13, 1.25, 0.09);
  const kickstand = new THREE.Mesh(kickstandGeom, silverMat);
  kickstand_group.add(kickstand);

  const kickstand_edgeGeom = new THREE.BoxGeometry(0.025, 1.18, 0.025);
  const kickstand_edge = new THREE.Mesh(kickstand_edgeGeom, darkMetalMat);
  kickstand_edge.position.set(0.072, -0.02, 0);
  kickstand_group.add(kickstand_edge);

  const kickstand_tipGeom = new THREE.SphereGeometry(0.075, 16, 10);
  const kickstand_tip = new THREE.Mesh(kickstand_tipGeom, darkMetalMat);
  kickstand_tip.position.set(0, -0.63, 0);
  kickstand_group.add(kickstand_tip);

  const phone_group = new THREE.Group();
  phone_group.position.set(0, 1.7, 0.02);
  phone_group.rotation.x = -0.16;
  root.add(phone_group);

  const phoneW = 1.25;
  const phoneH = 3.0;
  const phoneD = 0.16;

  const phone_bodyGeom = roundedExtrudeGeometry(phoneW, phoneH, phoneD, 0.18, 0.025);
  const phone_body = new THREE.Mesh(phone_bodyGeom, darkMetalMat);
  phone_group.add(phone_body);

  const rear_panelGeom = roundedExtrudeGeometry(1.18, 2.92, 0.018, 0.15, 0.008);
  const rear_panel = new THREE.Mesh(rear_panelGeom, darkGlassMat);
  rear_panel.position.z = 0.105;
  phone_group.add(rear_panel);

  const rear_color_fieldShape = new THREE.Shape();
  rear_color_fieldShape.moveTo(-0.52, -1.36);
  rear_color_fieldShape.lineTo(0.52, -1.36);
  rear_color_fieldShape.quadraticCurveTo(0.57, -1.36, 0.57, -1.29);
  rear_color_fieldShape.lineTo(0.57, 1.27);
  rear_color_fieldShape.quadraticCurveTo(0.57, 1.36, 0.48, 1.36);
  rear_color_fieldShape.lineTo(-0.48, 1.36);
  rear_color_fieldShape.quadraticCurveTo(-0.57, 1.36, -0.57, 1.27);
  rear_color_fieldShape.lineTo(-0.57, -1.27);
  rear_color_fieldShape.quadraticCurveTo(-0.57, -1.36, -0.52, -1.36);

  const rear_color_fieldGeom = new THREE.ShapeGeometry(rear_color_fieldShape, 12);
  const rear_color_field = new THREE.Mesh(rear_color_fieldGeom, new THREE.MeshBasicMaterial({
    color: 0x25334d
  }));
  rear_color_field.position.z = 0.122;
  phone_group.add(rear_color_field);

  const upper_blue_glowGeom = new THREE.CircleGeometry(0.48, 32);
  const upper_blue_glow = new THREE.Mesh(upper_blue_glowGeom, cyanGlowMat);
  upper_blue_glow.scale.set(0.95, 1.35, 1);
  upper_blue_glow.position.set(0.08, 0.88, 0.128);
  phone_group.add(upper_blue_glow);

  const middle_magenta_glowGeom = new THREE.CircleGeometry(0.48, 32);
  const middle_magenta_glow = new THREE.Mesh(middle_magenta_glowGeom, magentaGlowMat);
  middle_magenta_glow.scale.set(1.0, 1.25, 1);
  middle_magenta_glow.position.set(0.12, 0.18, 0.129);
  phone_group.add(middle_magenta_glow);

  const lower_cyan_glowGeom = new THREE.CircleGeometry(0.46, 32);
  const lower_cyan_glow = new THREE.Mesh(lower_cyan_glowGeom, cyanGlowMat);
  lower_cyan_glow.scale.set(0.95, 1.35, 1);
  lower_cyan_glow.position.set(0.08, -0.72, 0.13);
  phone_group.add(lower_cyan_glow);

  const lower_purple_glowGeom = new THREE.CircleGeometry(0.38, 32);
  const lower_purple_glow = new THREE.Mesh(lower_purple_glowGeom, purpleGlowMat);
  lower_purple_glow.scale.set(1.0, 1.25, 1);
  lower_purple_glow.position.set(-0.22, -0.28, 0.131);
  phone_group.add(lower_purple_glow);

  const camera_islandGeom = roundedExtrudeGeometry(0.36, 0.82, 0.055, 0.16, 0.012);
  const camera_island = new THREE.Mesh(camera_islandGeom, darkMetalMat);
  camera_island.position.set(-0.39, 1.02, 0.145);
  phone_group.add(camera_island);

  const camera_ringGeom = new THREE.TorusGeometry(0.115, 0.025, 12, 28);
  const camera_ring_top = new THREE.Mesh(camera_ringGeom, silverMat);
  camera_ring_top.position.set(-0.39, 1.25, 0.188);
  phone_group.add(camera_ring_top);

  const camera_ring_bottom = new THREE.Mesh(camera_ringGeom, silverMat);
  camera_ring_bottom.position.set(-0.39, 0.81, 0.188);
  phone_group.add(camera_ring_bottom);

  const camera_lensGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 28);
  const camera_lens_top = new THREE.Mesh(camera_lensGeom, lensMat);
  camera_lens_top.rotation.x = Math.PI / 2;
  camera_lens_top.position.set(-0.39, 1.25, 0.19);
  phone_group.add(camera_lens_top);

  const camera_lens_bottom = new THREE.Mesh(camera_lensGeom, lensMat);
  camera_lens_bottom.rotation.x = Math.PI / 2;
  camera_lens_bottom.position.set(-0.39, 0.81, 0.19);
  phone_group.add(camera_lens_bottom);

  const camera_innerGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.012, 24);
  const camera_inner_top = new THREE.Mesh(camera_innerGeom, lensInnerMat);
  camera_inner_top.rotation.x = Math.PI / 2;
  camera_inner_top.position.set(-0.39, 1.25, 0.214);
  phone_group.add(camera_inner_top);

  const camera_inner_bottom = new THREE.Mesh(camera_innerGeom, lensInnerMat);
  camera_inner_bottom.rotation.x = Math.PI / 2;
  camera_inner_bottom.position.set(-0.39, 0.81, 0.214);
  phone_group.add(camera_inner_bottom);

  const camera_flashGeom = new THREE.SphereGeometry(0.045, 16, 10);
  const camera_flash = new THREE.Mesh(camera_flashGeom, flashMat);
  camera_flash.scale.set(1, 1, 0.35);
  camera_flash.position.set(-0.39, 1.03, 0.205);
  phone_group.add(camera_flash);

  const led_glowGeom = new THREE.CircleGeometry(0.18, 32);
  const led_glow = new THREE.Mesh(led_glowGeom, magentaGlowMat);
  led_glow.scale.set(0.75, 2.0, 1);
  led_glow.position.set(0.39, 0.92, 0.135);
  phone_group.add(led_glow);

  const rear_ledGeom = roundedExtrudeGeometry(0.15, 1.0, 0.025, 0.075, 0.006);
  const rear_led = new THREE.Mesh(rear_ledGeom, pinkLedMat);
  rear_led.position.set(0.39, 0.92, 0.15);
  phone_group.add(rear_led);

  const side_power_buttonGeom = new THREE.BoxGeometry(0.035, 0.22, 0.075);
  const side_power_button = new THREE.Mesh(side_power_buttonGeom, blackMat);
  side_power_button.position.set(0.665, 0.92, 0.015);
  phone_group.add(side_power_button);

  const side_volume_buttonGeom = new THREE.BoxGeometry(0.035, 0.34, 0.075);
  const side_volume_button = new THREE.Mesh(side_volume_buttonGeom, blackMat);
  side_volume_button.position.set(0.665, 0.52, 0.015);
  phone_group.add(side_volume_button);

  const side_sim_trayGeom = new THREE.BoxGeometry(0.035, 0.28, 0.07);
  const side_sim_tray = new THREE.Mesh(side_sim_trayGeom, blackMat);
  side_sim_tray.position.set(0.665, 0.12, 0.015);
  phone_group.add(side_sim_tray);

  const side_button_highlightGeom = new THREE.BoxGeometry(0.012, 0.18, 0.025);
  const side_button_highlight = new THREE.Mesh(side_button_highlightGeom, silverMat);
  side_button_highlight.position.set(0.686, 0.52, 0.04);
  phone_group.add(side_button_highlight);

  const charging_portGeom = new THREE.BoxGeometry(0.3, 0.025, 0.07);
  const charging_port = new THREE.Mesh(charging_portGeom, blackMat);
  charging_port.position.set(0, -1.515, 0.015);
  phone_group.add(charging_port);

  const bottom_speakerGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12);
  const bottom_speakers = new THREE.InstancedMesh(bottom_speakerGeom, blackMat, 5);
  const speakerDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    speakerDummy.position.set(-0.16 + i * 0.08, -1.515, 0.065);
    speakerDummy.updateMatrix();
    bottom_speakers.setMatrixAt(i, speakerDummy.matrix);
  }
  bottom_speakers.instanceMatrix.needsUpdate = true;
  phone_group.add(bottom_speakers);

  const brand_markGeom = new THREE.BoxGeometry(0.035, 0.13, 0.008);
  const brand_mark = new THREE.InstancedMesh(brand_markGeom, whiteMarkMat, 5);
  const brandDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    brandDummy.position.set(0.12 + i * 0.055, -1.12 + (i % 2) * 0.025, 0.143);
    brandDummy.rotation.z = i % 2 === 0 ? -0.18 : 0.18;
    brandDummy.updateMatrix();
    brand_mark.setMatrixAt(i, brandDummy.matrix);
  }
  brand_mark.instanceMatrix.needsUpdate = true;
  phone_group.add(brand_mark);

  const brand_wordGeom = new THREE.BoxGeometry(0.18, 0.018, 0.008);
  const brand_word = new THREE.Mesh(brand_wordGeom, whiteMarkMat);
  brand_word.position.set(0.2, -1.28, 0.143);
  phone_group.add(brand_word);

  const dock_mountGeom = roundedExtrudeGeometry(1.08, 0.34, 0.22, 0.08, 0.025);
  const dock_mount = new THREE.Mesh(dock_mountGeom, silverMat);
  dock_mount.rotation.x = Math.PI / 2;
  dock_mount.position.set(0, 0.43, 0.08);
  root.add(dock_mount);

  const dock_front_panelGeom = roundedExtrudeGeometry(0.92, 0.25, 0.055, 0.06, 0.012);
  const dock_front_panel = new THREE.Mesh(dock_front_panelGeom, new THREE.MeshStandardMaterial({
    color: 0xa85cff,
    metalness: 0.3,
    roughness: 0.4
  }));
  dock_front_panel.position.set(0, 0.43, 0.225);
  root.add(dock_front_panel);

  const dock_portGeom = roundedExtrudeGeometry(0.28, 0.085, 0.025, 0.025, 0.004);
  const dock_port = new THREE.Mesh(dock_portGeom, blackMat);
  dock_port.position.set(0, 0.43, 0.265);
  root.add(dock_port);

  const dock_indicatorGeom = new THREE.BoxGeometry(0.035, 0.012, 0.01);
  const dock_indicators = new THREE.InstancedMesh(dock_indicatorGeom, cyanLedMat, 3);
  const indicatorDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    indicatorDummy.position.set(-0.07 + i * 0.07, 0.43, 0.282);
    indicatorDummy.updateMatrix();
    dock_indicators.setMatrixAt(i, indicatorDummy.matrix);
  }
  dock_indicators.instanceMatrix.needsUpdate = true;
  root.add(dock_indicators);

  const dock_cyan_glowGeom = new THREE.CircleGeometry(0.28, 28);
  const dock_cyan_glow = new THREE.Mesh(dock_cyan_glowGeom, baseCyanGlowMat);
  dock_cyan_glow.rotation.x = -Math.PI / 2;
  dock_cyan_glow.scale.set(1.5, 0.65, 1);
  dock_cyan_glow.position.set(0.05, 0.39, 0.2);
  root.add(dock_cyan_glow);

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
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}