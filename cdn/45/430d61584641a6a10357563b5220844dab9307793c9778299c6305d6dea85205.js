export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_globe_lantern";

  const dark_bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x3b271e,
    metalness: 0.6,
    roughness: 0.4,
  });
  const bronze_trimMat = new THREE.MeshStandardMaterial({
    color: 0x68422d,
    metalness: 0.6,
    roughness: 0.4,
  });
  const warm_metalMat = new THREE.MeshStandardMaterial({
    color: 0xa36b35,
    metalness: 0.6,
    roughness: 0.4,
  });
  const blackened_metalMat = new THREE.MeshStandardMaterial({
    color: 0x171311,
    metalness: 0.5,
    roughness: 0.45,
  });
  const glass_globeMat = new THREE.MeshPhysicalMaterial({
    color: 0xeee7d9,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 0.04,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.13,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const vent_holesMat = new THREE.MeshBasicMaterial({
    color: 0x070605,
    side: THREE.DoubleSide,
  });
  const vent_glowMat = new THREE.MeshBasicMaterial({
    color: 0xffb35c,
    side: THREE.DoubleSide,
  });
  const candle_glassMat = new THREE.MeshStandardMaterial({
    color: 0xf1d596,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });
  const candle_waxMat = new THREE.MeshStandardMaterial({
    color: 0xffe5a6,
    metalness: 0.0,
    roughness: 0.7,
  });
  const flame_outerMat = new THREE.MeshStandardMaterial({
    color: 0xffa332,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff8a1f,
    emissiveIntensity: 1.6,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });
  const flame_innerMat = new THREE.MeshBasicMaterial({
    color: 0xfff4c7,
    side: THREE.DoubleSide,
  });
  const flame_glowMat = new THREE.MeshBasicMaterial({
    color: 0xffb34f,
    transparent: true,
    opacity: 0.13,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const base_pedestalProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(1.04, 0.0),
    new THREE.Vector2(1.16, 0.045),
    new THREE.Vector2(1.22, 0.12),
    new THREE.Vector2(1.22, 0.18),
    new THREE.Vector2(1.15, 0.25),
    new THREE.Vector2(1.07, 0.31),
    new THREE.Vector2(1.03, 0.39),
    new THREE.Vector2(1.03, 0.67),
    new THREE.Vector2(1.08, 0.76),
    new THREE.Vector2(1.06, 0.84),
    new THREE.Vector2(0.96, 0.91),
    new THREE.Vector2(0.9, 0.95),
    new THREE.Vector2(0.9, 1.02),
    new THREE.Vector2(0.0, 1.02),
  ];
  const base_pedestalGeom = new THREE.LatheGeometry(base_pedestalProfile);
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, dark_bronzeMat);
  base_pedestal.name = "base_pedestal";
  base_assembly.add(base_pedestal);

  const base_bottom_trimGeom = new THREE.TorusGeometry(1.14, 0.045, 10, 64);
  const base_bottom_trim = new THREE.Mesh(base_bottom_trimGeom, bronze_trimMat);
  base_bottom_trim.name = "base_bottom_trim";
  base_bottom_trim.rotation.x = Math.PI / 2;
  base_bottom_trim.position.y = 0.15;
  base_assembly.add(base_bottom_trim);

  const base_middle_trimGeom = new THREE.TorusGeometry(1.035, 0.035, 10, 64);
  const base_middle_trim = new THREE.Mesh(base_middle_trimGeom, bronze_trimMat);
  base_middle_trim.name = "base_middle_trim";
  base_middle_trim.rotation.x = Math.PI / 2;
  base_middle_trim.position.y = 0.76;
  base_assembly.add(base_middle_trim);

  const base_top_trimGeom = new THREE.TorusGeometry(0.92, 0.035, 10, 64);
  const base_top_trim = new THREE.Mesh(base_top_trimGeom, bronze_trimMat);
  base_top_trim.name = "base_top_trim";
  base_top_trim.rotation.x = Math.PI / 2;
  base_top_trim.position.y = 0.94;
  base_assembly.add(base_top_trim);

  const lower_housingGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.38, 64);
  const lower_housing = new THREE.Mesh(lower_housingGeom, dark_bronzeMat);
  lower_housing.name = "lower_housing";
  lower_housing.position.y = 1.13;
  base_assembly.add(lower_housing);

  const lower_housing_bottom_bandGeom = new THREE.TorusGeometry(0.89, 0.045, 10, 64);
  const lower_housing_bottom_band = new THREE.Mesh(
    lower_housing_bottom_bandGeom,
    bronze_trimMat
  );
  lower_housing_bottom_band.name = "lower_housing_bottom_band";
  lower_housing_bottom_band.rotation.x = Math.PI / 2;
  lower_housing_bottom_band.position.y = 0.96;
  base_assembly.add(lower_housing_bottom_band);

  const lower_housing_top_bandGeom = new THREE.TorusGeometry(0.89, 0.04, 10, 64);
  const lower_housing_top_band = new THREE.Mesh(
    lower_housing_top_bandGeom,
    bronze_trimMat
  );
  lower_housing_top_band.name = "lower_housing_top_band";
  lower_housing_top_band.rotation.x = Math.PI / 2;
  lower_housing_top_band.position.y = 1.31;
  base_assembly.add(lower_housing_top_band);

  const lower_glass_plateGeom = new THREE.CylinderGeometry(0.8, 0.8, 0.045, 64);
  const lower_glass_plate = new THREE.Mesh(lower_glass_plateGeom, glass_globeMat);
  lower_glass_plate.name = "lower_glass_plate";
  lower_glass_plate.position.y = 1.34;
  base_assembly.add(lower_glass_plate);

  const lower_glass_rimGeom = new THREE.TorusGeometry(0.82, 0.035, 10, 64);
  const lower_glass_rim = new THREE.Mesh(lower_glass_rimGeom, warm_metalMat);
  lower_glass_rim.name = "lower_glass_rim";
  lower_glass_rim.rotation.x = Math.PI / 2;
  lower_glass_rim.position.y = 1.34;
  base_assembly.add(lower_glass_rim);

  const front_control_knobGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.11, 24);
  const front_control_knob = new THREE.Mesh(front_control_knobGeom, bronze_trimMat);
  front_control_knob.name = "front_control_knob";
  front_control_knob.rotation.x = Math.PI / 2;
  front_control_knob.position.set(0, 1.13, 0.94);
  base_assembly.add(front_control_knob);

  const front_control_faceGeom = new THREE.CylinderGeometry(0.115, 0.115, 0.025, 24);
  const front_control_face = new THREE.Mesh(front_control_faceGeom, dark_bronzeMat);
  front_control_face.name = "front_control_face";
  front_control_face.rotation.x = Math.PI / 2;
  front_control_face.position.set(0, 1.13, 1.005);
  base_assembly.add(front_control_face);

  const front_control_ridgesGeom = new THREE.BoxGeometry(0.018, 0.075, 0.025);
  const front_control_ridges = new THREE.InstancedMesh(
    front_control_ridgesGeom,
    blackened_metalMat,
    12
  );
  front_control_ridges.name = "front_control_ridges";
  const control_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    control_dummy.position.set(
      Math.sin(angle) * 0.105,
      1.13 + Math.cos(angle) * 0.105,
      1.025
    );
    control_dummy.rotation.set(0, 0, -angle);
    control_dummy.updateMatrix();
    front_control_ridges.setMatrixAt(i, control_dummy.matrix);
  }
  front_control_ridges.instanceMatrix.needsUpdate = true;
  base_assembly.add(front_control_ridges);

  const globe_assembly = new THREE.Group();
  globe_assembly.name = "globe_assembly";
  root.add(globe_assembly);

  const glass_globeGeom = new THREE.SphereGeometry(1.38, 64, 40);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glass_globeMat);
  glass_globe.name = "glass_globe";
  glass_globe.position.y = 2.56;
  glass_globe.scale.set(1.0, 1.03, 1.0);
  glass_globe.renderOrder = 3;
  globe_assembly.add(glass_globe);

  const glass_highlight_leftGeom = new THREE.CircleGeometry(0.28, 24);
  const glass_highlight_left = new THREE.Mesh(
    glass_highlight_leftGeom,
    glass_highlightMat
  );
  glass_highlight_left.name = "glass_highlight_left";
  glass_highlight_left.position.set(-0.67, 2.95, 1.19);
  glass_highlight_left.scale.set(0.42, 1.55, 1);
  glass_highlight_left.rotation.z = -0.18;
  glass_highlight_left.renderOrder = 4;
  globe_assembly.add(glass_highlight_left);

  const glass_highlight_rightGeom = new THREE.CircleGeometry(0.22, 24);
  const glass_highlight_right = new THREE.Mesh(
    glass_highlight_rightGeom,
    glass_highlightMat
  );
  glass_highlight_right.name = "glass_highlight_right";
  glass_highlight_right.position.set(0.73, 2.82, 1.17);
  glass_highlight_right.scale.set(0.34, 1.35, 1);
  glass_highlight_right.rotation.z = 0.2;
  glass_highlight_right.renderOrder = 4;
  globe_assembly.add(glass_highlight_right);

  const candle_assembly = new THREE.Group();
  candle_assembly.name = "candle_assembly";
  root.add(candle_assembly);

  const candle_holder_baseGeom = new THREE.CylinderGeometry(0.29, 0.34, 0.11, 40);
  const candle_holder_base = new THREE.Mesh(candle_holder_baseGeom, warm_metalMat);
  candle_holder_base.name = "candle_holder_base";
  candle_holder_base.position.y = 1.43;
  candle_assembly.add(candle_holder_base);

  const candle_holder_stemGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.18, 32);
  const candle_holder_stem = new THREE.Mesh(candle_holder_stemGeom, bronze_trimMat);
  candle_holder_stem.name = "candle_holder_stem";
  candle_holder_stem.position.y = 1.55;
  candle_assembly.add(candle_holder_stem);

  const candle_glassGeom = new THREE.CylinderGeometry(0.23, 0.25, 0.34, 40);
  const candle_glass = new THREE.Mesh(candle_glassGeom, candle_glassMat);
  candle_glass.name = "candle_glass";
  candle_glass.position.y = 1.76;
  candle_assembly.add(candle_glass);

  const candle_waxGeom = new THREE.CylinderGeometry(0.17, 0.18, 0.25, 32);
  const candle_wax = new THREE.Mesh(candle_waxGeom, candle_waxMat);
  candle_wax.name = "candle_wax";
  candle_wax.position.y = 1.73;
  candle_assembly.add(candle_wax);

  const candle_top_glassGeom = new THREE.TorusGeometry(0.215, 0.018, 8, 40);
  const candle_top_glass = new THREE.Mesh(candle_top_glassGeom, warm_metalMat);
  candle_top_glass.name = "candle_top_glass";
  candle_top_glass.rotation.x = Math.PI / 2;
  candle_top_glass.position.y = 1.93;
  candle_assembly.add(candle_top_glass);

  const candle_embossingGeom = new THREE.SphereGeometry(0.027, 10, 6);
  const candle_embossing = new THREE.InstancedMesh(
    candle_embossingGeom,
    warm_metalMat,
    12
  );
  candle_embossing.name = "candle_embossing";
  const emboss_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    emboss_dummy.position.set(
      Math.sin(angle) * 0.242,
      1.75 + (i % 2) * 0.055,
      Math.cos(angle) * 0.242
    );
    emboss_dummy.scale.set(0.8, 1.25, 0.55);
    emboss_dummy.updateMatrix();
    candle_embossing.setMatrixAt(i, emboss_dummy.matrix);
  }
  candle_embossing.instanceMatrix.needsUpdate = true;
  candle_assembly.add(candle_embossing);

  const wickGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.08, 10);
  const wick = new THREE.Mesh(wickGeom, blackened_metalMat);
  wick.name = "wick";
  wick.position.y = 1.94;
  candle_assembly.add(wick);

  const flame_outerProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.075, 0.025),
    new THREE.Vector2(0.13, 0.14),
    new THREE.Vector2(0.115, 0.29),
    new THREE.Vector2(0.075, 0.45),
    new THREE.Vector2(0.025, 0.58),
    new THREE.Vector2(0.0, 0.63),
  ];
  const flame_outerGeom = new THREE.LatheGeometry(flame_outerProfile);
  const flame_outer = new THREE.Mesh(flame_outerGeom, flame_outerMat);
  flame_outer.name = "flame_outer";
  flame_outer.position.y = 1.91;
  candle_assembly.add(flame_outer);

  const flame_innerProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.045, 0.02),
    new THREE.Vector2(0.07, 0.12),
    new THREE.Vector2(0.055, 0.25),
    new THREE.Vector2(0.018, 0.37),
    new THREE.Vector2(0.0, 0.41),
  ];
  const flame_innerGeom = new THREE.LatheGeometry(flame_innerProfile);
  const flame_inner = new THREE.Mesh(flame_innerGeom, flame_innerMat);
  flame_inner.name = "flame_inner";
  flame_inner.position.y = 1.92;
  candle_assembly.add(flame_inner);

  const flame_glowGeom = new THREE.SphereGeometry(0.34, 24, 16);
  const flame_glow = new THREE.Mesh(flame_glowGeom, flame_glowMat);
  flame_glow.name = "flame_glow";
  flame_glow.position.y = 2.2;
  flame_glow.scale.set(1.0, 1.35, 1.0);
  flame_glow.renderOrder = 2;
  candle_assembly.add(flame_glow);

  const cage_assembly = new THREE.Group();
  cage_assembly.name = "cage_assembly";
  root.add(cage_assembly);

  const cage_front_wireGeom = new THREE.TubeGeometry(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.69, 1.31, 0.5),
      new THREE.Vector3(-0.34, 1.88, 1.08),
      new THREE.Vector3(0.42, 2.8, 1.06),
      new THREE.Vector3(1.03, 3.69, 0.3)
    ),
    40,
    0.026,
    8,
    false
  );
  const cage_front_wire = new THREE.Mesh(cage_front_wireGeom, blackened_metalMat);
  cage_front_wire.name = "cage_front_wire";
  cage_assembly.add(cage_front_wire);

  const cage_rear_wireGeom = new THREE.TubeGeometry(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.69, 1.31, 0.5),
      new THREE.Vector3(0.34, 1.88, 1.08),
      new THREE.Vector3(-0.42, 2.8, 1.06),
      new THREE.Vector3(-1.03, 3.69, 0.3)
    ),
    40,
    0.026,
    8,
    false
  );
  const cage_rear_wire = new THREE.Mesh(cage_rear_wireGeom, blackened_metalMat);
  cage_rear_wire.name = "cage_rear_wire";
  cage_assembly.add(cage_rear_wire);

  const cage_left_wireGeom = new THREE.TubeGeometry(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.72, 1.31, -0.45),
      new THREE.Vector3(-1.18, 1.9, -0.15),
      new THREE.Vector3(-1.12, 3.18, -0.12),
      new THREE.Vector3(-0.98, 3.69, -0.32)
    ),
    40,
    0.026,
    8,
    false
  );
  const cage_left_wire = new THREE.Mesh(cage_left_wireGeom, blackened_metalMat);
  cage_left_wire.name = "cage_left_wire";
  cage_assembly.add(cage_left_wire);

  const cage_right_wireGeom = new THREE.TubeGeometry(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.72, 1.31, -0.45),
      new THREE.Vector3(1.18, 1.9, -0.15),
      new THREE.Vector3(1.12, 3.18, -0.12),
      new THREE.Vector3(0.98, 3.69, -0.32)
    ),
    40,
    0.026,
    8,
    false
  );
  const cage_right_wire = new THREE.Mesh(cage_right_wireGeom, blackened_metalMat);
  cage_right_wire.name = "cage_right_wire";
  cage_assembly.add(cage_right_wire);

  const cage_pivot_boltsGeom = new THREE.SphereGeometry(0.09, 16, 10);
  const cage_pivot_bolts = new THREE.InstancedMesh(
    cage_pivot_boltsGeom,
    blackened_metalMat,
    4
  );
  cage_pivot_bolts.name = "cage_pivot_bolts";
  const pivot_positions = [
    [-0.7, 1.31, 0.5],
    [0.7, 1.31, 0.5],
    [-1.03, 3.69, 0.3],
    [1.03, 3.69, 0.3],
  ];
  const pivot_dummy = new THREE.Object3D();
  for (let i = 0; i < pivot_positions.length; i++) {
    pivot_dummy.position.set(
      pivot_positions[i][0],
      pivot_positions[i][1],
      pivot_positions[i][2]
    );
    pivot_dummy.updateMatrix();
    cage_pivot_bolts.setMatrixAt(i, pivot_dummy.matrix);
  }
  cage_pivot_bolts.instanceMatrix.needsUpdate = true;
  cage_assembly.add(cage_pivot_bolts);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const upper_glass_plateGeom = new THREE.CylinderGeometry(0.84, 0.84, 0.045, 64);
  const upper_glass_plate = new THREE.Mesh(upper_glass_plateGeom, glass_globeMat);
  upper_glass_plate.name = "upper_glass_plate";
  upper_glass_plate.position.y = 3.78;
  top_assembly.add(upper_glass_plate);

  const upper_glass_rimGeom = new THREE.TorusGeometry(0.85, 0.035, 10, 64);
  const upper_glass_rim = new THREE.Mesh(upper_glass_rimGeom, warm_metalMat);
  upper_glass_rim.name = "upper_glass_rim";
  upper_glass_rim.rotation.x = Math.PI / 2;
  upper_glass_rim.position.y = 3.78;
  top_assembly.add(upper_glass_rim);

  const top_vent_bandGeom = new THREE.CylinderGeometry(0.78, 0.78, 0.5, 64);
  const top_vent_band = new THREE.Mesh(top_vent_bandGeom, dark_bronzeMat);
  top_vent_band.name = "top_vent_band";
  top_vent_band.position.y = 4.08;
  top_assembly.add(top_vent_band);

  const top_vent_lower_rimGeom = new THREE.TorusGeometry(0.82, 0.055, 10, 64);
  const top_vent_lower_rim = new THREE.Mesh(
    top_vent_lower_rimGeom,
    bronze_trimMat
  );
  top_vent_lower_rim.name = "top_vent_lower_rim";
  top_vent_lower_rim.rotation.x = Math.PI / 2;
  top_vent_lower_rim.position.y = 3.82;
  top_assembly.add(top_vent_lower_rim);

  const top_vent_upper_rimGeom = new THREE.TorusGeometry(0.79, 0.045, 10, 64);
  const top_vent_upper_rim = new THREE.Mesh(
    top_vent_upper_rimGeom,
    bronze_trimMat
  );
  top_vent_upper_rim.name = "top_vent_upper_rim";
  top_vent_upper_rim.rotation.x = Math.PI / 2;
  top_vent_upper_rim.position.y = 4.33;
  top_assembly.add(top_vent_upper_rim);

  const vent_holesGeom = new THREE.CircleGeometry(0.105, 20);
  const vent_holes = new THREE.InstancedMesh(vent_holesGeom, vent_holesMat, 12);
  vent_holes.name = "vent_holes";
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    vent_dummy.position.set(
      Math.sin(angle) * 0.787,
      4.08,
      Math.cos(angle) * 0.787
    );
    vent_dummy.rotation.set(0, angle, 0);
    vent_dummy.scale.set(0.72, 1.28, 1);
    vent_dummy.updateMatrix();
    vent_holes.setMatrixAt(i, vent_dummy.matrix);
  }
  vent_holes.instanceMatrix.needsUpdate = true;
  top_assembly.add(vent_holes);

  const vent_glowGeom = new THREE.CircleGeometry(0.052, 16);
  const vent_glow = new THREE.InstancedMesh(vent_glowGeom, vent_glowMat, 12);
  vent_glow.name = "vent_glow";
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    vent_dummy.position.set(
      Math.sin(angle) * 0.793,
      4.08,
      Math.cos(angle) * 0.793
    );
    vent_dummy.rotation.set(0, angle, 0);
    vent_dummy.scale.set(0.7, 1.18, 1);
    vent_dummy.updateMatrix();
    vent_glow.setMatrixAt(i, vent_dummy.matrix);
  }
  vent_glow.instanceMatrix.needsUpdate = true;
  top_assembly.add(vent_glow);

  const top_lidProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.78, 0.0),
    new THREE.Vector2(0.88, 0.025),
    new THREE.Vector2(0.92, 0.065),
    new THREE.Vector2(0.9, 0.105),
    new THREE.Vector2(0.78, 0.145),
    new THREE.Vector2(0.62, 0.225),
    new THREE.Vector2(0.38, 0.3),
    new THREE.Vector2(0.16, 0.34),
    new THREE.Vector2(0.0, 0.34),
  ];
  const top_lidGeom = new THREE.LatheGeometry(top_lidProfile);
  const top_lid = new THREE.Mesh(top_lidGeom, dark_bronzeMat);
  top_lid.name = "top_lid";
  top_lid.position.y = 4.32;
  top_assembly.add(top_lid);

  const top_lid_brimGeom = new THREE.TorusGeometry(0.88, 0.045, 10, 64);
  const top_lid_brim = new THREE.Mesh(top_lid_brimGeom, bronze_trimMat);
  top_lid_brim.name = "top_lid_brim";
  top_lid_brim.rotation.x = Math.PI / 2;
  top_lid_brim.position.y = 4.38;
  top_assembly.add(top_lid_brim);

  const hanger_mountGeom = new THREE.CylinderGeometry(0.15, 0.18, 0.055, 24);
  const hanger_mount = new THREE.Mesh(hanger_mountGeom, blackened_metalMat);
  hanger_mount.name = "hanger_mount";
  hanger_mount.position.y = 4.68;
  top_assembly.add(hanger_mount);

  const lower_hanger_ringGeom = new THREE.TorusGeometry(0.25, 0.045, 10, 48);
  const lower_hanger_ring = new THREE.Mesh(
    lower_hanger_ringGeom,
    blackened_metalMat
  );
  lower_hanger_ring.name = "lower_hanger_ring";
  lower_hanger_ring.position.y = 4.91;
  top_assembly.add(lower_hanger_ring);

  const upper_hanger_ringGeom = new THREE.TorusGeometry(0.22, 0.045, 10, 48);
  const upper_hanger_ring = new THREE.Mesh(
    upper_hanger_ringGeom,
    blackened_metalMat
  );
  upper_hanger_ring.name = "upper_hanger_ring";
  upper_hanger_ring.position.y = 5.29;
  top_assembly.add(upper_hanger_ring);

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