export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, metalness: 0.5, roughness: 0.45 });
  const blackLeatherMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0, roughness: 0.85 });
  const blackPlasticMat = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.0, roughness: 0.75 });
  const deepBlackMat = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.0, roughness: 0.9 });
  const lensGlassMat = new THREE.MeshPhysicalMaterial({ color: 0x10251f, metalness: 0.0, roughness: 0.2, transparent: true, opacity: 0.72 });
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x8f9994, metalness: 0.0, roughness: 0.35 });
  const redMat = new THREE.MeshStandardMaterial({ color: 0xb51f1f, metalness: 0.0, roughness: 0.5 });
  const whiteMarkMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, metalness: 0.0, roughness: 0.55 });
  const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });

  function addBox(w, h, d, x, y, z, mat) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addCylinderX(radius, length, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 32), mat);
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addCylinderY(radius, height, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 32), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addCylinderZ(radius, depth, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 48), mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addTorus(radius, tube, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 12, 64), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  const body_lower = addBox(2.8, 1.35, 0.58, 0, 0.67, 0, blackLeatherMat);
  const body_upper = addBox(2.75, 0.58, 0.58, 0, 1.48, 0, silverMat);
  const front_black_panel = addBox(2.55, 1.18, 0.08, 0, 0.72, 0.32, blackLeatherMat);
  const front_silver_band = addBox(2.65, 0.48, 0.09, 0, 1.48, 0.34, silverMat);
  const bottom_silver_strip = addBox(2.65, 0.16, 0.62, 0, 0.08, 0.02, silverMat);
  const left_grip_bulge = addCylinderX(0.34, 1.12, blackLeatherMat, -1.18, 0.72, 0.02);
  const right_grip_bulge = addCylinderX(0.28, 1.08, blackLeatherMat, 1.18, 0.72, 0.02);
  const top_left_round = addCylinderX(0.28, 0.58, silverMat, -1.18, 1.52, 0.02);
  const top_right_round = addCylinderX(0.28, 0.58, silverMat, 1.18, 1.52, 0.02);

  const viewfinder_hump_shape = new THREE.Shape();
  viewfinder_hump_shape.moveTo(-0.58, 0.0);
  viewfinder_hump_shape.lineTo(-0.48, 0.55);
  viewfinder_hump_shape.lineTo(-0.32, 0.72);
  viewfinder_hump_shape.lineTo(0.32, 0.72);
  viewfinder_hump_shape.lineTo(0.48, 0.55);
  viewfinder_hump_shape.lineTo(0.58, 0.0);
  viewfinder_hump_shape.closePath();
  const viewfinder_hump = new THREE.Mesh(new THREE.ExtrudeGeometry(viewfinder_hump_shape, { depth: 0.52 }), blackLeatherMat);
  viewfinder_hump.position.set(0, 1.62, -0.25);
  root.add(viewfinder_hump);

  const viewfinder_screen_frame = addBox(0.92, 0.48, 0.08, 0, 2.02, 0.31, deepBlackMat);
  const viewfinder_screen = addBox(0.72, 0.32, 0.025, 0, 2.02, 0.365, screenMat);
  const viewfinder_screen_highlight = addBox(0.22, 0.035, 0.012, -0.18, 2.12, 0.385, highlightMat);

  const hotshoe_base = addBox(0.55, 0.12, 0.36, 0, 2.42, -0.05, silverMat);
  const hotshoe_left_rail = addBox(0.08, 0.08, 0.42, -0.25, 2.50, -0.05, silverMat);
  const hotshoe_right_rail = addBox(0.08, 0.08, 0.42, 0.25, 2.50, -0.05, silverMat);
  const hotshoe_black_insert = addBox(0.34, 0.035, 0.24, 0, 2.49, -0.05, deepBlackMat);

  const left_mode_dial = addCylinderY(0.22, 0.16, blackPlasticMat, -0.78, 1.88, 0.02);
  const left_mode_dial_top = addCylinderY(0.18, 0.035, silverMat, -0.78, 1.98, 0.02);
  const right_mode_dial = addCylinderY(0.25, 0.18, blackPlasticMat, 0.98, 1.90, 0.02);
  const right_mode_dial_top = addCylinderY(0.21, 0.035, blackPlasticMat, 0.98, 2.01, 0.02);
  const small_front_dial = addCylinderY(0.15, 0.12, silverMat, -1.12, 1.86, 0.08);

  const dial_ridge_geom = new THREE.BoxGeometry(0.035, 0.13, 0.025);
  const dial_ridges = new THREE.InstancedMesh(dial_ridge_geom, blackPlasticMat, 72);
  const dummy = new THREE.Object3D();
  let ridgeIndex = 0;
  for (let d = 0; d < 2; d++) {
    const cx = d === 0 ? -0.78 : 0.98;
    const cy = d === 0 ? 1.88 : 1.90;
    const r = d === 0 ? 0.225 : 0.255;
    const count = d === 0 ? 30 : 36;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      dummy.position.set(cx + Math.cos(a) * r, cy, 0.02 + Math.sin(a) * r);
      dummy.rotation.set(0, -a, 0);
      dummy.updateMatrix();
      dial_ridges.setMatrixAt(ridgeIndex++, dummy.matrix);
    }
  }
  root.add(dial_ridges);

  const lensX = 0.35;
  const lensY = 0.78;

  const lens_mount_silver_ring = addCylinderZ(0.78, 0.16, silverMat, lensX, lensY, 0.40);
  const lens_mount_black_ring = addCylinderZ(0.72, 0.18, blackPlasticMat, lensX, lensY, 0.50);
  const lens_outer_barrel = addCylinderZ(0.66, 0.34, blackLeatherMat, lensX, lensY, 0.68);
  const lens_focus_ring = addCylinderZ(0.62, 0.22, blackPlasticMat, lensX, lensY, 0.88);
  const lens_front_bezel = addCylinderZ(0.55, 0.12, deepBlackMat, lensX, lensY, 1.00);
  const lens_glass_disc = addCylinderZ(0.38, 0.045, lensGlassMat, lensX, lensY, 1.075);
  const lens_inner_glass = addCylinderZ(0.22, 0.055, lensGlassMat, lensX, lensY, 1.105);
  const lens_outer_grip_ring = addTorus(0.61, 0.045, blackPlasticMat, lensX, lensY, 1.02);
  const lens_silver_trim_ring = addTorus(0.73, 0.025, silverMat, lensX, lensY, 0.96);

  const lens_ridge_geom = new THREE.BoxGeometry(0.035, 0.16, 0.035);
  const lens_grip_ridges = new THREE.InstancedMesh(lens_ridge_geom, blackPlasticMat, 48);
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    dummy.position.set(lensX + Math.cos(a) * 0.65, lensY + Math.sin(a) * 0.65, 0.88);
    dummy.rotation.set(0, 0, a);
    dummy.updateMatrix();
    lens_grip_ridges.setMatrixAt(i, dummy.matrix);
  }
  root.add(lens_grip_ridges);

  const lens_tick_geom = new THREE.BoxGeometry(0.018, 0.075, 0.012);
  const lens_scale_ticks = new THREE.InstancedMesh(lens_tick_geom, whiteMarkMat, 24);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    dummy.position.set(lensX + Math.cos(a) * 0.70, lensY + Math.sin(a) * 0.70, 1.04);
    dummy.rotation.set(0, 0, a);
    dummy.updateMatrix();
    lens_scale_ticks.setMatrixAt(i, dummy.matrix);
  }
  root.add(lens_scale_ticks);

  const lens_red_mark = addCylinderZ(0.035, 0.018, redMat, lensX - 0.55, lensY + 0.28, 1.06);
  const lens_highlight = addBox(0.18, 0.035, 0.012, lensX - 0.10, lensY + 0.14, 1.14, highlightMat);
  const lens_inner_highlight = addBox(0.08, 0.025, 0.012, lensX - 0.02, lensY + 0.02, 1.15, highlightMat);

  const brand_bar_geom = new THREE.BoxGeometry(0.025, 0.13, 0.012);
  const brand_bars = new THREE.InstancedMesh(brand_bar_geom, deepBlackMat, 8);
  for (let i = 0; i < 8; i++) {
    dummy.position.set(-0.22 + i * 0.075, 1.55, 0.405);
    dummy.rotation.set(0, 0, i % 3 === 0 ? -0.18 : 0);
    dummy.updateMatrix();
    brand_bars.setMatrixAt(i, dummy.matrix);
  }
  root.add(brand_bars);

  const lens_brand_bar_geom = new THREE.BoxGeometry(0.018, 0.09, 0.012);
  const lens_brand_bars = new THREE.InstancedMesh(lens_brand_bar_geom, whiteMarkMat, 7);
  for (let i = 0; i < 7; i++) {
    dummy.position.set(lensX - 0.17 + i * 0.055, lensY + 0.39, 1.08);
    dummy.rotation.set(0, 0, i % 2 === 0 ? 0.12 : -0.12);
    dummy.updateMatrix();
    lens_brand_bars.setMatrixAt(i, dummy.matrix);
  }
  root.add(lens_brand_bars);

  const front_viewfinder = addBox(0.48, 0.22, 0.08, 1.02, 1.52, 0.40, deepBlackMat);
  const front_viewfinder_glass = addBox(0.34, 0.13, 0.025, 1.02, 1.52, 0.46, screenMat);
  const front_viewfinder_highlight = addBox(0.10, 0.025, 0.012, 0.92, 1.56, 0.48, highlightMat);

  const left_grille = addBox(0.42, 0.18, 0.08, -1.05, 1.48, 0.40, deepBlackMat);
  const grille_slit_geom = new THREE.BoxGeometry(0.025, 0.13, 0.012);
  const grille_slits = new THREE.InstancedMesh(grille_slit_geom, blackPlasticMat, 8);
  for (let i = 0; i < 8; i++) {
    dummy.position.set(-1.20 + i * 0.045, 1.48, 0.455);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    grille_slits.setMatrixAt(i, dummy.matrix);
  }
  root.add(grille_slits);

  const front_round_button = addCylinderZ(0.10, 0.045, blackPlasticMat, -0.70, 1.48, 0.42);
  const front_lamp = addCylinderZ(0.09, 0.045, silverMat, -0.38, 1.50, 0.42);
  const front_lamp_glass = addCylinderZ(0.065, 0.052, highlightMat, -0.38, 1.50, 0.46);
  const red_indicator = addCylinderZ(0.035, 0.025, redMat, 0.02, 1.58, 0.43);

  const left_strap_lug = addBox(0.28, 0.10, 0.16, -1.48, 1.25, 0.08, silverMat);
  const right_strap_lug = addBox(0.28, 0.10, 0.16, 1.48, 1.25, 0.08, silverMat);
  const left_strap_ring = addTorus(0.10, 0.025, silverMat, -1.62, 1.25, 0.08);
  const right_strap_ring = addTorus(0.10, 0.025, silverMat, 1.62, 1.25, 0.08);

  const side_port_door = addBox(0.035, 0.42, 0.22, -1.43, 0.62, 0.02, deepBlackMat);
  const side_port_handle = addBox(0.045, 0.18, 0.05, -1.46, 0.70, 0.12, blackPlasticMat);

  const leather_pebble_geom = new THREE.SphereGeometry(0.035, 8, 6);
  const leather_pebbles = new THREE.InstancedMesh(leather_pebble_geom, blackLeatherMat, 120);
  for (let i = 0; i < 120; i++) {
    const col = i % 12;
    const row = Math.floor(i / 12);
    const x = -1.15 + col * 0.21 + (row % 2) * 0.04;
    const y = 0.25 + row * 0.12;
    const z = 0.375 + (i % 3) * 0.006;
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, 0, (i % 5) * 0.25);
    dummy.scale.set(1.0, 0.65, 0.25);
    dummy.updateMatrix();
    leather_pebbles.setMatrixAt(i, dummy.matrix);
  }
  root.add(leather_pebbles);

  const top_mark_geom = new THREE.BoxGeometry(0.07, 0.012, 0.025);
  const top_marks = new THREE.InstancedMesh(top_mark_geom, deepBlackMat, 12);
  for (let i = 0; i < 12; i++) {
    dummy.position.set(-1.25 + i * 0.06, 1.79, 0.18);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    top_marks.setMatrixAt(i, dummy.matrix);
  }
  root.add(top_marks);

  const red_top_button = addCylinderY(0.055, 0.035, redMat, -1.28, 1.82, 0.22);
  const blue_top_button = addCylinderY(0.055, 0.035, new THREE.MeshStandardMaterial({ color: 0x2266cc, metalness: 0.0, roughness: 0.5 }), -1.15, 1.82, 0.22);

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