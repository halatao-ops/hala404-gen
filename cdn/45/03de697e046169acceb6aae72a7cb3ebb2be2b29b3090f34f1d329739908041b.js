export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_gemstone_display";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a4f2c,
    metalness: 0.2,
    roughness: 0.45,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3b2115,
    metalness: 0.1,
    roughness: 0.7,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb89235,
    metalness: 0.6,
    roughness: 0.32,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x6d5224,
    metalness: 0.5,
    roughness: 0.45,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeed,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.82,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  function createGemMaterial(color) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness: 0.12,
      transmission: 0.35,
      transparent: true,
      opacity: 0.9,
      flatShading: true,
    });
  }

  const rubyMat = createGemMaterial(0xd20b55);
  const sapphireMat = createGemMaterial(0x0756d8);
  const emeraldMat = createGemMaterial(0x00a86b);
  const citrineMat = createGemMaterial(0xf2a000);
  const amethystMat = createGemMaterial(0x9b467d);
  const clearGemMat = createGemMaterial(0xdcecf0);
  const orangeGemMat = createGemMaterial(0xe66a20);
  const greenGemMat = createGemMaterial(0x39a95b);

  const bottom_base = new THREE.Group();
  bottom_base.name = "bottom_base";
  root.add(bottom_base);

  const bottom_wood_footGeom = new THREE.CylinderGeometry(1.34, 1.34, 0.18, 64);
  const bottom_wood_foot = new THREE.Mesh(bottom_wood_footGeom, woodMat);
  bottom_wood_foot.name = "bottom_wood_foot";
  bottom_wood_foot.position.y = 0.09;
  bottom_base.add(bottom_wood_foot);

  const bottom_brass_bandGeom = new THREE.CylinderGeometry(1.39, 1.39, 0.58, 64);
  const bottom_brass_band = new THREE.Mesh(bottom_brass_bandGeom, brassMat);
  bottom_brass_band.name = "bottom_brass_band";
  bottom_brass_band.position.y = 0.43;
  bottom_base.add(bottom_brass_band);

  const bottom_wood_collarGeom = new THREE.CylinderGeometry(1.37, 1.37, 0.42, 64);
  const bottom_wood_collar = new THREE.Mesh(bottom_wood_collarGeom, woodMat);
  bottom_wood_collar.name = "bottom_wood_collar";
  bottom_wood_collar.position.y = 0.91;
  bottom_base.add(bottom_wood_collar);

  const bottom_lower_trimGeom = new THREE.TorusGeometry(1.35, 0.025, 8, 64);
  const bottom_lower_trim = new THREE.Mesh(bottom_lower_trimGeom, darkBrassMat);
  bottom_lower_trim.name = "bottom_lower_trim";
  bottom_lower_trim.rotation.x = Math.PI / 2;
  bottom_lower_trim.position.y = 0.18;
  bottom_base.add(bottom_lower_trim);

  const bottom_upper_trim = new THREE.Mesh(bottom_lower_trimGeom, darkBrassMat);
  bottom_upper_trim.name = "bottom_upper_trim";
  bottom_upper_trim.rotation.x = Math.PI / 2;
  bottom_upper_trim.position.y = 0.69;
  bottom_base.add(bottom_upper_trim);

  const bottom_top_rimGeom = new THREE.TorusGeometry(1.3, 0.045, 10, 64);
  const bottom_top_rim = new THREE.Mesh(bottom_top_rimGeom, darkWoodMat);
  bottom_top_rim.name = "bottom_top_rim";
  bottom_top_rim.rotation.x = Math.PI / 2;
  bottom_top_rim.position.y = 1.12;
  bottom_base.add(bottom_top_rim);

  const chamber = new THREE.Group();
  chamber.name = "chamber";
  root.add(chamber);

  const central_wood_columnGeom = new THREE.BoxGeometry(0.52, 3.35, 0.38);
  const central_wood_column = new THREE.Mesh(central_wood_columnGeom, woodMat);
  central_wood_column.name = "central_wood_column";
  central_wood_column.position.set(0, 2.76, -0.12);
  chamber.add(central_wood_column);

  const column_grainGeom = new THREE.BoxGeometry(0.014, 0.34, 0.008);
  const column_grain = new THREE.InstancedMesh(column_grainGeom, darkWoodMat, 12);
  column_grain.name = "column_grain";
  const column_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    column_grain_dummy.position.set(
      -0.2 + (i % 6) * 0.08,
      1.45 + Math.floor(i / 6) * 1.55 + (i % 3) * 0.22,
      0.075
    );
    column_grain_dummy.rotation.set(0, 0, ((i % 3) - 1) * 0.08);
    column_grain_dummy.scale.set(1, 0.65 + (i % 4) * 0.18, 1);
    column_grain_dummy.updateMatrix();
    column_grain.setMatrixAt(i, column_grain_dummy.matrix);
  }
  column_grain.instanceMatrix.needsUpdate = true;
  chamber.add(column_grain);

  const gemstoneGeom = new THREE.DodecahedronGeometry(1, 0);

  function createGem(name, material, x, y, z, sx, sy, sz, rx, ry, rz) {
    const gem = new THREE.Mesh(gemstoneGeom, material);
    gem.name = name;
    gem.position.set(x, y, z);
    gem.scale.set(sx, sy, sz);
    gem.rotation.set(rx, ry, rz);
    chamber.add(gem);
    return gem;
  }

  const upper_clear_gem = createGem(
    "upper_clear_gem", clearGemMat,
    -0.72, 4.08, 0.02, 0.31, 0.52, 0.25,
    0.2, -0.35, -0.3
  );
  const upper_ruby_gem = createGem(
    "upper_ruby_gem", rubyMat,
    0.78, 4.02, -0.08, 0.34, 0.4, 0.27,
    -0.2, 0.4, 0.25
  );
  const upper_emerald_gem = createGem(
    "upper_emerald_gem", emeraldMat,
    0.55, 3.78, 0.57, 0.48, 0.48, 0.3,
    0.25, -0.35, -0.2
  );
  const upper_left_green_gem = createGem(
    "upper_left_green_gem", greenGemMat,
    -0.7, 3.48, 0.48, 0.43, 0.48, 0.29,
    -0.25, 0.3, 0.35
  );
  const left_orange_gem = createGem(
    "left_orange_gem", orangeGemMat,
    -1.0, 3.18, -0.04, 0.31, 0.42, 0.25,
    0.3, -0.2, -0.45
  );
  const center_ruby_gem = createGem(
    "center_ruby_gem", rubyMat,
    -0.34, 3.17, 0.7, 0.48, 0.5, 0.3,
    -0.2, 0.35, -0.35
  );
  const center_amethyst_gem = createGem(
    "center_amethyst_gem", amethystMat,
    0.52, 3.18, 0.66, 0.55, 0.43, 0.31,
    0.25, -0.3, 0.18
  );
  const right_yellow_gem = createGem(
    "right_yellow_gem", citrineMat,
    0.98, 2.82, 0.02, 0.34, 0.43, 0.27,
    -0.25, 0.4, -0.2
  );
  const center_sapphire_gem = createGem(
    "center_sapphire_gem", sapphireMat,
    0.12, 2.78, 0.95, 0.48, 0.5, 0.3,
    0.18, -0.25, 0.12
  );
  const lower_clear_gem = createGem(
    "lower_clear_gem", clearGemMat,
    -0.52, 2.47, 0.76, 0.52, 0.4, 0.29,
    -0.3, 0.25, -0.55
  );
  const lower_left_green_gem = createGem(
    "lower_left_green_gem", greenGemMat,
    -0.78, 1.82, 0.42, 0.48, 0.52, 0.3,
    0.25, -0.35, 0.3
  );
  const lower_amber_gem = createGem(
    "lower_amber_gem", citrineMat,
    0.62, 2.02, 0.7, 0.52, 0.62, 0.31,
    -0.2, 0.35, -0.35
  );
  const lower_purple_gem = createGem(
    "lower_purple_gem", amethystMat,
    0.72, 1.34, -0.08, 0.46, 0.34, 0.28,
    0.3, -0.2, 0.2
  );
  const lower_gold_gem = createGem(
    "lower_gold_gem", citrineMat,
    -0.72, 1.3, -0.02, 0.32, 0.38, 0.25,
    -0.25, 0.4, 0.3
  );
  const left_pink_gem = createGem(
    "left_pink_gem", rubyMat,
    -0.98, 2.45, 0.05, 0.28, 0.42, 0.24,
    0.2, -0.3, -0.2
  );
  const right_pink_gem = createGem(
    "right_pink_gem", amethystMat,
    0.98, 2.5, -0.08, 0.31, 0.38, 0.25,
    -0.25, 0.3, 0.25
  );

  const glass_wallGeom = new THREE.CylinderGeometry(1.27, 1.27, 3.42, 64, 1, true);
  const glass_wall = new THREE.Mesh(glass_wallGeom, glassMat);
  glass_wall.name = "glass_wall";
  glass_wall.position.y = 2.82;
  chamber.add(glass_wall);

  const glass_highlightGeom = new THREE.PlaneGeometry(0.08, 2.7);
  const left_glass_highlight = new THREE.Mesh(glass_highlightGeom, glassHighlightMat);
  left_glass_highlight.name = "left_glass_highlight";
  const leftHighlightAngle = -0.62;
  left_glass_highlight.position.set(
    Math.sin(leftHighlightAngle) * 1.276,
    2.86,
    Math.cos(leftHighlightAngle) * 1.276
  );
  left_glass_highlight.rotation.y = leftHighlightAngle;
  chamber.add(left_glass_highlight);

  const right_glass_highlight = new THREE.Mesh(glass_highlightGeom, glassHighlightMat);
  right_glass_highlight.name = "right_glass_highlight";
  const rightHighlightAngle = 0.72;
  right_glass_highlight.position.set(
    Math.sin(rightHighlightAngle) * 1.276,
    2.95,
    Math.cos(rightHighlightAngle) * 1.276
  );
  right_glass_highlight.rotation.y = rightHighlightAngle;
  right_glass_highlight.scale.x = 0.55;
  chamber.add(right_glass_highlight);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const top_brass_bandGeom = new THREE.CylinderGeometry(1.4, 1.4, 0.5, 64);
  const top_brass_band = new THREE.Mesh(top_brass_bandGeom, brassMat);
  top_brass_band.name = "top_brass_band";
  top_brass_band.position.y = 4.62;
  top_assembly.add(top_brass_band);

  const top_band_lower_trimGeom = new THREE.TorusGeometry(1.36, 0.026, 8, 64);
  const top_band_lower_trim = new THREE.Mesh(top_band_lower_trimGeom, darkBrassMat);
  top_band_lower_trim.name = "top_band_lower_trim";
  top_band_lower_trim.rotation.x = Math.PI / 2;
  top_band_lower_trim.position.y = 4.37;
  top_assembly.add(top_band_lower_trim);

  const top_band_upper_trim = new THREE.Mesh(top_band_lower_trimGeom, darkBrassMat);
  top_band_upper_trim.name = "top_band_upper_trim";
  top_band_upper_trim.rotation.x = Math.PI / 2;
  top_band_upper_trim.position.y = 4.87;
  top_assembly.add(top_band_upper_trim);

  const top_band_screwGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.025, 16);
  const top_band_screw = new THREE.Mesh(top_band_screwGeom, darkBrassMat);
  top_band_screw.name = "top_band_screw";
  top_band_screw.rotation.x = Math.PI / 2;
  top_band_screw.position.set(0, 4.61, 1.414);
  top_assembly.add(top_band_screw);

  const top_lidGeom = new THREE.CylinderGeometry(1.39, 1.39, 1.0, 64);
  const top_lid = new THREE.Mesh(top_lidGeom, woodMat);
  top_lid.name = "top_lid";
  top_lid.position.y = 5.37;
  top_assembly.add(top_lid);

  const top_lid_lower_rimGeom = new THREE.TorusGeometry(1.34, 0.045, 10, 64);
  const top_lid_lower_rim = new THREE.Mesh(top_lid_lower_rimGeom, darkWoodMat);
  top_lid_lower_rim.name = "top_lid_lower_rim";
  top_lid_lower_rim.rotation.x = Math.PI / 2;
  top_lid_lower_rim.position.y = 4.89;
  top_assembly.add(top_lid_lower_rim);

  const top_lid_upper_rim = new THREE.Mesh(top_lid_lower_rimGeom, darkWoodMat);
  top_lid_upper_rim.name = "top_lid_upper_rim";
  top_lid_upper_rim.rotation.x = Math.PI / 2;
  top_lid_upper_rim.position.y = 5.85;
  top_assembly.add(top_lid_upper_rim);

  const lid_grainGeom = new THREE.BoxGeometry(0.014, 0.34, 0.008);
  const lid_grain = new THREE.InstancedMesh(lid_grainGeom, darkWoodMat, 18);
  lid_grain.name = "lid_grain";
  const lid_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = -1.15 + (i % 18) * (2.3 / 17);
    lid_grain_dummy.position.set(
      Math.sin(angle) * 1.396,
      5.08 + (i % 4) * 0.19,
      Math.cos(angle) * 1.396
    );
    lid_grain_dummy.rotation.set(0, angle, ((i % 3) - 1) * 0.08);
    lid_grain_dummy.scale.set(1, 0.55 + (i % 5) * 0.13, 1);
    lid_grain_dummy.updateMatrix();
    lid_grain.setMatrixAt(i, lid_grain_dummy.matrix);
  }
  lid_grain.instanceMatrix.needsUpdate = true;
  top_assembly.add(lid_grain);

  const lid_knob_stemGeom = new THREE.CylinderGeometry(0.13, 0.15, 0.12, 24);
  const lid_knob_stem = new THREE.Mesh(lid_knob_stemGeom, darkBrassMat);
  lid_knob_stem.name = "lid_knob_stem";
  lid_knob_stem.position.y = 5.94;
  top_assembly.add(lid_knob_stem);

  const lid_knobGeom = new THREE.SphereGeometry(0.31, 32, 16);
  const lid_knob = new THREE.Mesh(lid_knobGeom, brassMat);
  lid_knob.name = "lid_knob";
  lid_knob.position.y = 6.08;
  lid_knob.scale.set(1, 0.48, 1);
  top_assembly.add(lid_knob);

  const side_pin_stemGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.2, 16);
  const side_pin_capGeom = new THREE.SphereGeometry(0.14, 20, 12);

  const left_side_pin_stem = new THREE.Mesh(side_pin_stemGeom, darkBrassMat);
  left_side_pin_stem.name = "left_side_pin_stem";
  left_side_pin_stem.rotation.z = Math.PI / 2;
  left_side_pin_stem.position.set(-1.42, 5.35, 0.05);
  top_assembly.add(left_side_pin_stem);

  const left_side_pin = new THREE.Mesh(side_pin_capGeom, brassMat);
  left_side_pin.name = "left_side_pin";
  left_side_pin.position.set(-1.54, 5.35, 0.05);
  left_side_pin.scale.set(0.7, 1, 0.7);
  top_assembly.add(left_side_pin);

  const right_side_pin_stem = new THREE.Mesh(side_pin_stemGeom, darkBrassMat);
  right_side_pin_stem.name = "right_side_pin_stem";
  right_side_pin_stem.rotation.z = Math.PI / 2;
  right_side_pin_stem.position.set(1.42, 5.35, 0.05);
  top_assembly.add(right_side_pin_stem);

  const right_side_pin = new THREE.Mesh(side_pin_capGeom, brassMat);
  right_side_pin.name = "right_side_pin";
  right_side_pin.position.set(1.54, 5.35, 0.05);
  right_side_pin.scale.set(0.7, 1, 0.7);
  top_assembly.add(right_side_pin);

  const front_brass_rivet_stemGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 18);
  const front_brass_rivet_stem = new THREE.Mesh(front_brass_rivet_stemGeom, darkBrassMat);
  front_brass_rivet_stem.name = "front_brass_rivet_stem";
  front_brass_rivet_stem.rotation.x = Math.PI / 2;
  front_brass_rivet_stem.position.set(-0.58, 5.35, 1.39);
  top_assembly.add(front_brass_rivet_stem);

  const front_brass_rivetGeom = new THREE.SphereGeometry(0.13, 20, 12);
  const front_brass_rivet = new THREE.Mesh(front_brass_rivetGeom, brassMat);
  front_brass_rivet.name = "front_brass_rivet";
  front_brass_rivet.position.set(-0.58, 5.35, 1.43);
  front_brass_rivet.scale.set(1, 1, 0.55);
  top_assembly.add(front_brass_rivet);

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