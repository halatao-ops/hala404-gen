export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_table";

  const tableW = 3.50;
  const tableD = 2.80;
  const legX = 1.47;
  const legZ = 1.10;

  function createWoodTexture(horizontal) {
    const size = 64;
    const data = new Uint8Array(size * size * 4);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = x / (size - 1);
        const v = y / (size - 1);
        const across = horizontal ? v : u;
        const along = horizontal ? u : v;

        const broad = Math.sin(across * 52 + Math.sin(along * 8) * 1.8);
        const fine = Math.sin(across * 176 + Math.sin(along * 21) * 0.8);
        const dx = (along - 0.68) * 2.8;
        const dy = (across - 0.43) * 0.85;
        const knot = Math.exp(-(dx * dx + dy * dy) * 8) * Math.sin(Math.sqrt(dx * dx + dy * dy) * 38);
        const variation = broad * 5 + fine * 2 + knot * 9;

        const i = (y * size + x) * 4;
        data[i] = Math.max(0, Math.min(255, Math.round(205 + variation)));
        data[i + 1] = Math.max(0, Math.min(255, Math.round(166 + variation * 0.78)));
        data[i + 2] = Math.max(0, Math.min(255, Math.round(121 + variation * 0.52)));
        data[i + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  const horizontalWoodTexture = createWoodTexture(true);
  const verticalWoodTexture = createWoodTexture(false);

  const top_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: horizontalWoodTexture,
    bumpMap: horizontalWoodTexture,
    bumpScale: 0.008,
    roughness: 0.6
  });
  const top_borderMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: horizontalWoodTexture,
    bumpMap: horizontalWoodTexture,
    bumpScale: 0.008,
    roughness: 0.6
  });
  const top_inlayMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: horizontalWoodTexture,
    bumpMap: horizontalWoodTexture,
    bumpScale: 0.006,
    roughness: 0.6
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: verticalWoodTexture,
    bumpMap: verticalWoodTexture,
    bumpScale: 0.008,
    roughness: 0.6
  });
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: horizontalWoodTexture,
    bumpMap: horizontalWoodTexture,
    bumpScale: 0.007,
    roughness: 0.6
  });
  const trayMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: horizontalWoodTexture,
    bumpMap: horizontalWoodTexture,
    bumpScale: 0.008,
    roughness: 0.6
  });
  const tray_linerMat = new THREE.MeshStandardMaterial({
    color: 0x654126,
    roughness: 0.65
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x4b3020,
    roughness: 0.8
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x241d18,
    metalness: 0.15,
    roughness: 0.7
  });

  const tabletop = new THREE.Group();
  tabletop.name = "tabletop";
  root.add(tabletop);

  const top_surfaceShape = new THREE.Shape();
  const cornerR = 0.075;
  const halfW = tableW / 2;
  const halfD = tableD / 2;
  top_surfaceShape.moveTo(-halfW + cornerR, -halfD);
  top_surfaceShape.lineTo(halfW - cornerR, -halfD);
  top_surfaceShape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + cornerR);
  top_surfaceShape.lineTo(halfW, halfD - cornerR);
  top_surfaceShape.quadraticCurveTo(halfW, halfD, halfW - cornerR, halfD);
  top_surfaceShape.lineTo(-halfW + cornerR, halfD);
  top_surfaceShape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - cornerR);
  top_surfaceShape.lineTo(-halfW, -halfD + cornerR);
  top_surfaceShape.quadraticCurveTo(-halfW, -halfD, -halfW + cornerR, -halfD);

  const top_surfaceGeom = new THREE.ExtrudeGeometry(top_surfaceShape, {
    depth: 0.11,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2,
    curveSegments: 8
  });
  const top_surface = new THREE.Mesh(top_surfaceGeom, top_surfaceMat);
  top_surface.name = "top_surface";
  top_surface.rotation.x = Math.PI / 2;
  top_surface.position.y = 2.105;
  tabletop.add(top_surface);

  const top_inlayGeom = new THREE.BoxGeometry(2.72, 0.014, 1.98);
  const top_inlay = new THREE.Mesh(top_inlayGeom, top_inlayMat);
  top_inlay.name = "top_inlay";
  top_inlay.position.set(0, 2.129, 0);
  tabletop.add(top_inlay);

  const top_border_xGeom = new THREE.BoxGeometry(2.98, 0.014, 0.17);
  const top_border_zGeom = new THREE.BoxGeometry(0.17, 0.014, 2.48);

  const top_border_front = new THREE.Mesh(top_border_xGeom, top_borderMat);
  top_border_front.name = "top_border_front";
  top_border_front.position.set(0, 2.129, 1.19);
  tabletop.add(top_border_front);

  const top_border_back = new THREE.Mesh(top_border_xGeom, top_borderMat);
  top_border_back.name = "top_border_back";
  top_border_back.position.set(0, 2.129, -1.19);
  tabletop.add(top_border_back);

  const top_border_left = new THREE.Mesh(top_border_zGeom, top_borderMat);
  top_border_left.name = "top_border_left";
  top_border_left.position.set(-1.44, 2.129, 0);
  tabletop.add(top_border_left);

  const top_border_right = new THREE.Mesh(top_border_zGeom, top_borderMat);
  top_border_right.name = "top_border_right";
  top_border_right.position.set(1.44, 2.129, 0);
  tabletop.add(top_border_right);

  const top_groove_xGeom = new THREE.BoxGeometry(2.82, 0.006, 0.018);
  const top_groove_zGeom = new THREE.BoxGeometry(0.018, 0.006, 2.12);

  const top_groove_front = new THREE.Mesh(top_groove_xGeom, shadowMat);
  top_groove_front.name = "top_groove_front";
  top_groove_front.position.set(0, 2.139, 1.095);
  tabletop.add(top_groove_front);

  const top_groove_back = new THREE.Mesh(top_groove_xGeom, shadowMat);
  top_groove_back.name = "top_groove_back";
  top_groove_back.position.set(0, 2.139, -1.095);
  tabletop.add(top_groove_back);

  const top_groove_left = new THREE.Mesh(top_groove_zGeom, shadowMat);
  top_groove_left.name = "top_groove_left";
  top_groove_left.position.set(-1.37, 2.139, 0);
  tabletop.add(top_groove_left);

  const top_groove_right = new THREE.Mesh(top_groove_zGeom, shadowMat);
  top_groove_right.name = "top_groove_right";
  top_groove_right.position.set(1.37, 2.139, 0);
  tabletop.add(top_groove_right);

  const top_laminationGeom = new THREE.BoxGeometry(3.43, 0.025, 2.73);

  const top_lamination_upper = new THREE.Mesh(top_laminationGeom, apronMat);
  top_lamination_upper.name = "top_lamination_upper";
  top_lamination_upper.position.y = 1.985;
  tabletop.add(top_lamination_upper);

  const top_shadow_gap = new THREE.Mesh(top_laminationGeom, shadowMat);
  top_shadow_gap.name = "top_shadow_gap";
  top_shadow_gap.scale.set(0.992, 0.72, 0.992);
  top_shadow_gap.position.y = 1.956;
  tabletop.add(top_shadow_gap);

  const top_lamination_middle = new THREE.Mesh(top_laminationGeom, apronMat);
  top_lamination_middle.name = "top_lamination_middle";
  top_lamination_middle.scale.set(0.995, 0.82, 0.995);
  top_lamination_middle.position.y = 1.925;
  tabletop.add(top_lamination_middle);

  const lower_shadow_gap = new THREE.Mesh(top_laminationGeom, shadowMat);
  lower_shadow_gap.name = "lower_shadow_gap";
  lower_shadow_gap.scale.set(0.985, 0.65, 0.985);
  lower_shadow_gap.position.y = 1.895;
  tabletop.add(lower_shadow_gap);

  const top_lamination_lower = new THREE.Mesh(top_laminationGeom, apronMat);
  top_lamination_lower.name = "top_lamination_lower";
  top_lamination_lower.scale.set(0.988, 0.90, 0.988);
  top_lamination_lower.position.y = 1.86;
  tabletop.add(top_lamination_lower);

  const base = new THREE.Group();
  base.name = "base";
  root.add(base);

  const legsGeom = new THREE.BoxGeometry(0.28, 1.72, 0.28);
  const legs = new THREE.InstancedMesh(legsGeom, frameMat, 4);
  legs.name = "legs";
  const leg_positions = [
    [-legX, 0.86, legZ],
    [legX, 0.86, legZ],
    [-legX, 0.86, -legZ],
    [legX, 0.86, -legZ]
  ];
  const leg_dummy = new THREE.Object3D();
  for (let i = 0; i < leg_positions.length; i++) {
    leg_dummy.position.set(leg_positions[i][0], leg_positions[i][1], leg_positions[i][2]);
    leg_dummy.updateMatrix();
    legs.setMatrixAt(i, leg_dummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  base.add(legs);

  const leg_top_capsGeom = new THREE.BoxGeometry(0.31, 0.045, 0.31);
  const leg_top_caps = new THREE.InstancedMesh(leg_top_capsGeom, frameMat, 4);
  leg_top_caps.name = "leg_top_caps";
  for (let i = 0; i < leg_positions.length; i++) {
    leg_dummy.position.set(leg_positions[i][0], 1.705, leg_positions[i][2]);
    leg_dummy.updateMatrix();
    leg_top_caps.setMatrixAt(i, leg_dummy.matrix);
  }
  leg_top_caps.instanceMatrix.needsUpdate = true;
  base.add(leg_top_caps);

  const upper_apron_xGeom = new THREE.BoxGeometry(2.72, 0.15, 0.13);
  const upper_apron_zGeom = new THREE.BoxGeometry(0.13, 0.15, 2.04);

  const upper_apron_front = new THREE.Mesh(upper_apron_xGeom, apronMat);
  upper_apron_front.name = "upper_apron_front";
  upper_apron_front.position.set(0, 1.70, 1.04);
  base.add(upper_apron_front);

  const upper_apron_back = new THREE.Mesh(upper_apron_xGeom, apronMat);
  upper_apron_back.name = "upper_apron_back";
  upper_apron_back.position.set(0, 1.70, -1.04);
  base.add(upper_apron_back);

  const upper_apron_left = new THREE.Mesh(upper_apron_zGeom, apronMat);
  upper_apron_left.name = "upper_apron_left";
  upper_apron_left.position.set(-1.40, 1.70, 0);
  base.add(upper_apron_left);

  const upper_apron_right = new THREE.Mesh(upper_apron_zGeom, apronMat);
  upper_apron_right.name = "upper_apron_right";
  upper_apron_right.position.set(1.40, 1.70, 0);
  base.add(upper_apron_right);

  const lower_stretcher_xGeom = new THREE.BoxGeometry(2.72, 0.16, 0.14);
  const lower_stretcher_zGeom = new THREE.BoxGeometry(0.14, 0.16, 2.04);

  const lower_stretcher_front = new THREE.Mesh(lower_stretcher_xGeom, apronMat);
  lower_stretcher_front.name = "lower_stretcher_front";
  lower_stretcher_front.position.set(0, 0.39, 1.04);
  base.add(lower_stretcher_front);

  const lower_stretcher_back = new THREE.Mesh(lower_stretcher_xGeom, apronMat);
  lower_stretcher_back.name = "lower_stretcher_back";
  lower_stretcher_back.position.set(0, 0.39, -1.04);
  base.add(lower_stretcher_back);

  const lower_stretcher_left = new THREE.Mesh(lower_stretcher_zGeom, apronMat);
  lower_stretcher_left.name = "lower_stretcher_left";
  lower_stretcher_left.position.set(-legX, 0.39, 0);
  base.add(lower_stretcher_left);

  const lower_stretcher_right = new THREE.Mesh(lower_stretcher_zGeom, apronMat);
  lower_stretcher_right.name = "lower_stretcher_right";
  lower_stretcher_right.position.set(legX, 0.39, 0);
  base.add(lower_stretcher_right);

  const tray_assembly = new THREE.Group();
  tray_assembly.name = "tray_assembly";
  root.add(tray_assembly);

  const tray_floorGeom = new THREE.BoxGeometry(2.58, 0.07, 1.82);
  const tray_floor = new THREE.Mesh(tray_floorGeom, trayMat);
  tray_floor.name = "tray_floor";
  tray_floor.position.set(0, 1.105, 0);
  tray_assembly.add(tray_floor);

  const tray_linerGeom = new THREE.BoxGeometry(2.34, 0.012, 1.58);
  const tray_liner = new THREE.Mesh(tray_linerGeom, tray_linerMat);
  tray_liner.name = "tray_liner";
  tray_liner.position.set(0, 1.146, 0);
  tray_assembly.add(tray_liner);

  const tray_front_wallGeom = new THREE.BoxGeometry(2.58, 0.27, 0.09);
  const tray_front_wall = new THREE.Mesh(tray_front_wallGeom, trayMat);
  tray_front_wall.name = "tray_front_wall";
  tray_front_wall.position.set(0, 1.255, 0.91);
  tray_assembly.add(tray_front_wall);

  const tray_back_wall = new THREE.Mesh(tray_front_wallGeom, trayMat);
  tray_back_wall.name = "tray_back_wall";
  tray_back_wall.position.set(0, 1.255, -0.91);
  tray_assembly.add(tray_back_wall);

  const tray_side_wallGeom = new THREE.BoxGeometry(0.09, 0.27, 1.82);
  const tray_left_wall = new THREE.Mesh(tray_side_wallGeom, trayMat);
  tray_left_wall.name = "tray_left_wall";
  tray_left_wall.position.set(-1.24, 1.255, 0);
  tray_assembly.add(tray_left_wall);

  const tray_right_wall = new THREE.Mesh(tray_side_wallGeom, trayMat);
  tray_right_wall.name = "tray_right_wall";
  tray_right_wall.position.set(1.24, 1.255, 0);
  tray_assembly.add(tray_right_wall);

  const tray_supportGeom = new THREE.BoxGeometry(0.11, 0.13, 1.72);
  const tray_left_support = new THREE.Mesh(tray_supportGeom, frameMat);
  tray_left_support.name = "tray_left_support";
  tray_left_support.position.set(-1.18, 0.98, 0);
  tray_assembly.add(tray_left_support);

  const tray_right_support = new THREE.Mesh(tray_supportGeom, frameMat);
  tray_right_support.name = "tray_right_support";
  tray_right_support.position.set(1.18, 0.98, 0);
  tray_assembly.add(tray_right_support);

  const tray_front_highlightGeom = new THREE.BoxGeometry(2.42, 0.018, 0.012);
  const tray_front_highlight = new THREE.Mesh(tray_front_highlightGeom, top_borderMat);
  tray_front_highlight.name = "tray_front_highlight";
  tray_front_highlight.position.set(0, 1.389, 0.959);
  tray_assembly.add(tray_front_highlight);

  const front_leg_screwsGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.014, 16);
  const front_leg_screws = new THREE.InstancedMesh(front_leg_screwsGeom, screwMat, 2);
  front_leg_screws.name = "front_leg_screws";
  const screw_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    screw_dummy.position.set(i === 0 ? -legX : legX, 0.91, legZ + 0.147);
    screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    screw_dummy.updateMatrix();
    front_leg_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  front_leg_screws.instanceMatrix.needsUpdate = true;
  root.add(front_leg_screws);

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