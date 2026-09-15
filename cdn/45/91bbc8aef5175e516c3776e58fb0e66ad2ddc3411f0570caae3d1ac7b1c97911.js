export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rustic_wooden_shed";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  root.add(roof_group);

  const door_group = new THREE.Group();
  door_group.name = "door_group";
  root.add(door_group);

  const weathering_group = new THREE.Group();
  weathering_group.name = "weathering_group";
  root.add(weathering_group);

  const wood_baseMat = new THREE.MeshStandardMaterial({
    color: 0x896847,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_lightMat = new THREE.MeshStandardMaterial({
    color: 0xa4825c,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_midMat = new THREE.MeshStandardMaterial({
    color: 0x806044,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_darkMat = new THREE.MeshStandardMaterial({
    color: 0x654932,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_endMat = new THREE.MeshStandardMaterial({
    color: 0x735238,
    metalness: 0.0,
    roughness: 0.9
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x493527,
    metalness: 0.0,
    roughness: 0.95
  });
  const faded_woodMat = new THREE.MeshStandardMaterial({
    color: 0xc1a47a,
    metalness: 0.0,
    roughness: 0.9
  });
  const door_blueMat = new THREE.MeshStandardMaterial({
    color: 0x55a9b9,
    metalness: 0.0,
    roughness: 0.9
  });
  const door_blue_lightMat = new THREE.MeshStandardMaterial({
    color: 0x72bdc1,
    metalness: 0.0,
    roughness: 0.9
  });
  const door_blue_darkMat = new THREE.MeshStandardMaterial({
    color: 0x368b99,
    metalness: 0.0,
    roughness: 0.9
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x6b3f2e,
    metalness: 0.35,
    roughness: 0.8
  });
  const rust_darkMat = new THREE.MeshStandardMaterial({
    color: 0x40271f,
    metalness: 0.3,
    roughness: 0.85
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x1d120b,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });

  const body_width = 1.0;
  const body_depth = 0.78;
  const body_bottom = 0.12;
  const wall_height = 1.16;
  const wall_top = body_bottom + wall_height;
  const gable_height = 0.48;
  const roof_run = 0.62;
  const roof_rise = gable_height;
  const roof_depth = 1.02;
  const roof_thickness = 0.075;
  const roof_angle = Math.atan2(roof_rise, roof_run);
  const roof_slope_length = Math.sqrt(
    roof_run * roof_run + roof_rise * roof_rise
  );

  const base_plinthGeom = new THREE.BoxGeometry(1.14, 0.08, 0.92);
  const base_plinth = new THREE.Mesh(base_plinthGeom, wood_darkMat);
  base_plinth.name = "base_plinth";
  base_plinth.position.set(0, 0.04, 0);
  body_group.add(base_plinth);

  const front_base_trimGeom = new THREE.BoxGeometry(1.18, 0.08, 0.075);
  const front_base_trim = new THREE.Mesh(front_base_trimGeom, wood_midMat);
  front_base_trim.name = "front_base_trim";
  front_base_trim.position.set(0, 0.105, body_depth / 2 + 0.035);
  body_group.add(front_base_trim);

  const back_base_trim = new THREE.Mesh(front_base_trimGeom, wood_midMat);
  back_base_trim.name = "back_base_trim";
  back_base_trim.position.set(0, 0.105, -body_depth / 2 - 0.035);
  body_group.add(back_base_trim);

  const side_base_trimGeom = new THREE.BoxGeometry(0.075, 0.08, 0.92);
  const left_base_trim = new THREE.Mesh(side_base_trimGeom, wood_midMat);
  left_base_trim.name = "left_base_trim";
  left_base_trim.position.set(-body_width / 2 - 0.035, 0.105, 0);
  body_group.add(left_base_trim);

  const right_base_trim = new THREE.Mesh(side_base_trimGeom, wood_midMat);
  right_base_trim.name = "right_base_trim";
  right_base_trim.position.set(body_width / 2 + 0.035, 0.105, 0);
  body_group.add(right_base_trim);

  const front_wallGeom = new THREE.BoxGeometry(
    body_width,
    wall_height,
    0.055
  );
  const front_wall = new THREE.Mesh(front_wallGeom, wood_baseMat);
  front_wall.name = "front_wall";
  front_wall.position.set(
    0,
    body_bottom + wall_height / 2,
    body_depth / 2
  );
  body_group.add(front_wall);

  const back_wall = new THREE.Mesh(front_wallGeom, wood_midMat);
  back_wall.name = "back_wall";
  back_wall.position.set(
    0,
    body_bottom + wall_height / 2,
    -body_depth / 2
  );
  body_group.add(back_wall);

  const side_wallGeom = new THREE.BoxGeometry(
    0.055,
    wall_height,
    body_depth
  );
  const left_wall = new THREE.Mesh(side_wallGeom, wood_midMat);
  left_wall.name = "left_wall";
  left_wall.position.set(
    -body_width / 2,
    body_bottom + wall_height / 2,
    0
  );
  body_group.add(left_wall);

  const right_wall = new THREE.Mesh(side_wallGeom, wood_baseMat);
  right_wall.name = "right_wall";
  right_wall.position.set(
    body_width / 2,
    body_bottom + wall_height / 2,
    0
  );
  body_group.add(right_wall);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-body_width / 2, 0);
  gableShape.lineTo(body_width / 2, 0);
  gableShape.lineTo(0, gable_height);
  gableShape.closePath();

  const gableGeom = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.055,
    steps: 1
  });

  const front_gable = new THREE.Mesh(gableGeom, wood_lightMat);
  front_gable.name = "front_gable";
  front_gable.position.set(0, wall_top, body_depth / 2 - 0.0275);
  body_group.add(front_gable);

  const back_gable = new THREE.Mesh(gableGeom, wood_midMat);
  back_gable.name = "back_gable";
  back_gable.position.set(0, wall_top, -body_depth / 2 - 0.0275);
  back_gable.rotation.y = Math.PI;
  body_group.add(back_gable);

  const front_plank_faces = new THREE.Group();
  front_plank_faces.name = "front_plank_faces";
  body_group.add(front_plank_faces);

  const front_plank_count = 9;
  const front_plank_step = body_width / front_plank_count;
  const front_plankGeom = new THREE.BoxGeometry(
    front_plank_step - 0.008,
    wall_height - 0.03,
    0.014
  );
  const front_plank_mats = [
    wood_lightMat,
    wood_baseMat,
    wood_midMat,
    wood_lightMat,
    wood_darkMat,
    wood_baseMat,
    wood_midMat,
    wood_lightMat,
    wood_baseMat
  ];

  for (let i = 0; i < front_plank_count; i++) {
    const front_plank = new THREE.Mesh(
      front_plankGeom,
      front_plank_mats[i]
    );
    front_plank.name = "front_plank_" + i;
    front_plank.position.set(
      -body_width / 2 + front_plank_step * (i + 0.5),
      body_bottom + wall_height / 2,
      body_depth / 2 + 0.034
    );
    front_plank_faces.add(front_plank);
  }

  const side_plank_faces = new THREE.Group();
  side_plank_faces.name = "side_plank_faces";
  body_group.add(side_plank_faces);

  const side_plank_count = 8;
  const side_plank_step = body_depth / side_plank_count;
  const side_plankGeom = new THREE.BoxGeometry(
    0.014,
    wall_height - 0.03,
    side_plank_step - 0.008
  );

  for (const side of [-1, 1]) {
    for (let i = 0; i < side_plank_count; i++) {
      const side_plank = new THREE.Mesh(
        side_plankGeom,
        (i + (side > 0 ? 2 : 0)) % 3 === 0
          ? wood_lightMat
          : (i + 1) % 4 === 0
            ? wood_darkMat
            : wood_midMat
      );
      side_plank.name =
        (side < 0 ? "left" : "right") + "_side_plank_" + i;
      side_plank.position.set(
        side * (body_width / 2 + 0.034),
        body_bottom + wall_height / 2,
        -body_depth / 2 + side_plank_step * (i + 0.5)
      );
      side_plank_faces.add(side_plank);
    }
  }

  const gable_plank_faces = new THREE.Group();
  gable_plank_faces.name = "gable_plank_faces";
  body_group.add(gable_plank_faces);

  const gable_plank_count = 9;
  const gable_plank_step = body_width / gable_plank_count;
  const gable_plankGeom = new THREE.BoxGeometry(
    gable_plank_step - 0.008,
    1,
    0.014
  );

  for (let i = 0; i < gable_plank_count; i++) {
    const x = -body_width / 2 + gable_plank_step * (i + 0.5);
    const height =
      gable_height * (1 - Math.abs(x) / (body_width / 2));
    const gable_plank = new THREE.Mesh(
      gable_plankGeom,
      i % 3 === 0 ? wood_lightMat : i % 3 === 1 ? wood_baseMat : wood_midMat
    );
    gable_plank.name = "gable_plank_" + i;
    gable_plank.scale.y = Math.max(height - 0.012, 0.012);
    gable_plank.position.set(
      x,
      wall_top + height / 2,
      body_depth / 2 + 0.035
    );
    gable_plank_faces.add(gable_plank);
  }

  const corner_postGeom = new THREE.BoxGeometry(
    0.065,
    wall_height + 0.03,
    0.065
  );

  const front_left_corner_post = new THREE.Mesh(
    corner_postGeom,
    wood_darkMat
  );
  front_left_corner_post.name = "front_left_corner_post";
  front_left_corner_post.position.set(
    -body_width / 2 - 0.012,
    body_bottom + wall_height / 2,
    body_depth / 2 + 0.018
  );
  body_group.add(front_left_corner_post);

  const front_right_corner_post = new THREE.Mesh(
    corner_postGeom,
    wood_darkMat
  );
  front_right_corner_post.name = "front_right_corner_post";
  front_right_corner_post.position.set(
    body_width / 2 + 0.012,
    body_bottom + wall_height / 2,
    body_depth / 2 + 0.018
  );
  body_group.add(front_right_corner_post);

  const rear_left_corner_post = new THREE.Mesh(
    corner_postGeom,
    wood_darkMat
  );
  rear_left_corner_post.name = "rear_left_corner_post";
  rear_left_corner_post.position.set(
    -body_width / 2 - 0.012,
    body_bottom + wall_height / 2,
    -body_depth / 2 - 0.018
  );
  body_group.add(rear_left_corner_post);

  const rear_right_corner_post = new THREE.Mesh(
    corner_postGeom,
    wood_darkMat
  );
  rear_right_corner_post.name = "rear_right_corner_post";
  rear_right_corner_post.position.set(
    body_width / 2 + 0.012,
    body_bottom + wall_height / 2,
    -body_depth / 2 - 0.018
  );
  body_group.add(rear_right_corner_post);

  const roofGeom = new THREE.BoxGeometry(
    roof_slope_length,
    roof_thickness,
    roof_depth
  );

  const left_roof = new THREE.Mesh(roofGeom, wood_midMat);
  left_roof.name = "left_roof";
  left_roof.position.set(
    -roof_run / 2,
    wall_top + roof_rise / 2,
    0
  );
  left_roof.rotation.z = roof_angle;
  roof_group.add(left_roof);

  const right_roof = new THREE.Mesh(roofGeom, wood_baseMat);
  right_roof.name = "right_roof";
  right_roof.position.set(
    roof_run / 2,
    wall_top + roof_rise / 2,
    0
  );
  right_roof.rotation.z = -roof_angle;
  roof_group.add(right_roof);

  const roof_plank_faces = new THREE.Group();
  roof_plank_faces.name = "roof_plank_faces";
  roof_group.add(roof_plank_faces);

  const roof_plank_count = 11;
  const roof_plank_step = roof_depth / roof_plank_count;
  const roof_plankGeom = new THREE.BoxGeometry(
    roof_slope_length - 0.018,
    0.014,
    roof_plank_step - 0.008
  );

  for (const side of [-1, 1]) {
    const normal_x = side * Math.sin(roof_angle);
    const normal_y = Math.cos(roof_angle);
    const offset = roof_thickness / 2 + 0.008;

    for (let i = 0; i < roof_plank_count; i++) {
      const roof_plank = new THREE.Mesh(
        roof_plankGeom,
        (i + (side > 0 ? 1 : 0)) % 4 === 0
          ? wood_lightMat
          : (i + 1) % 5 === 0
            ? wood_darkMat
            : (i + 2) % 4 === 0
              ? wood_baseMat
              : wood_midMat
      );
      roof_plank.name =
        (side < 0 ? "left" : "right") + "_roof_plank_" + i;
      roof_plank.position.set(
        side * roof_run / 2 + normal_x * offset,
        wall_top + roof_rise / 2 + normal_y * offset,
        -roof_depth / 2 + roof_plank_step * (i + 0.5)
      );
      roof_plank.rotation.z = -side * roof_angle;
      roof_plank_faces.add(roof_plank);
    }
  }

  const roof_fasciaGeom = new THREE.BoxGeometry(
    roof_slope_length + 0.025,
    0.085,
    0.055
  );

  const left_roof_fascia = new THREE.Mesh(
    roof_fasciaGeom,
    wood_endMat
  );
  left_roof_fascia.name = "left_roof_fascia";
  left_roof_fascia.position.set(
    -roof_run / 2,
    wall_top + roof_rise / 2,
    roof_depth / 2 + 0.012
  );
  left_roof_fascia.rotation.z = roof_angle;
  roof_group.add(left_roof_fascia);

  const right_roof_fascia = new THREE.Mesh(
    roof_fasciaGeom,
    wood_endMat
  );
  right_roof_fascia.name = "right_roof_fascia";
  right_roof_fascia.position.set(
    roof_run / 2,
    wall_top + roof_rise / 2,
    roof_depth / 2 + 0.012
  );
  right_roof_fascia.rotation.z = -roof_angle;
  roof_group.add(right_roof_fascia);

  const eave_trimGeom = new THREE.BoxGeometry(
    0.075,
    0.075,
    roof_depth + 0.025
  );

  const left_eave_trim = new THREE.Mesh(eave_trimGeom, wood_darkMat);
  left_eave_trim.name = "left_eave_trim";
  left_eave_trim.position.set(-roof_run, wall_top - 0.006, 0);
  roof_group.add(left_eave_trim);

  const right_eave_trim = new THREE.Mesh(eave_trimGeom, wood_darkMat);
  right_eave_trim.name = "right_eave_trim";
  right_eave_trim.position.set(roof_run, wall_top - 0.006, 0);
  roof_group.add(right_eave_trim);

  const ridge_capGeom = new THREE.BoxGeometry(
    0.15,
    0.085,
    roof_depth + 0.07
  );
  const ridge_cap = new THREE.Mesh(ridge_capGeom, wood_endMat);
  ridge_cap.name = "ridge_cap";
  ridge_cap.position.set(0, wall_top + gable_height + 0.045, 0);
  roof_group.add(ridge_cap);

  const door_width = 0.54;
  const door_height = 0.82;
  const door_bottom = 0.15;
  const door_x = 0.13;
  const door_y = door_bottom + door_height / 2;

  const door_recessGeom = new THREE.BoxGeometry(
    door_width + 0.055,
    door_height + 0.055,
    0.018
  );
  const door_recess = new THREE.Mesh(door_recessGeom, holeMat);
  door_recess.name = "door_recess";
  door_recess.position.set(
    door_x,
    door_y,
    body_depth / 2 + 0.052
  );
  door_group.add(door_recess);

  const door_backingGeom = new THREE.BoxGeometry(
    door_width,
    door_height,
    0.028
  );
  const door_backing = new THREE.Mesh(door_backingGeom, wood_darkMat);
  door_backing.name = "door_backing";
  door_backing.position.set(
    door_x,
    door_y,
    body_depth / 2 + 0.071
  );
  door_group.add(door_backing);

  const door_plank_count = 5;
  const door_plank_step = door_width / door_plank_count;
  const door_plankGeom = new THREE.BoxGeometry(
    door_plank_step - 0.008,
    door_height - 0.018,
    0.026
  );
  const door_planks = new THREE.Group();
  door_planks.name = "door_planks";
  door_group.add(door_planks);

  const door_plank_mats = [
    door_blue_darkMat,
    door_blueMat,
    door_blue_lightMat,
    door_blueMat,
    door_blue_darkMat
  ];

  for (let i = 0; i < door_plank_count; i++) {
    const door_plank = new THREE.Mesh(
      door_plankGeom,
      door_plank_mats[i]
    );
    door_plank.name = "door_plank_" + i;
    door_plank.position.set(
      door_x - door_width / 2 + door_plank_step * (i + 0.5),
      door_y,
      body_depth / 2 + 0.093
    );
    door_planks.add(door_plank);
  }

  const door_jambGeom = new THREE.BoxGeometry(
    0.045,
    door_height + 0.06,
    0.05
  );

  const door_left_jamb = new THREE.Mesh(door_jambGeom, wood_darkMat);
  door_left_jamb.name = "door_left_jamb";
  door_left_jamb.position.set(
    door_x - door_width / 2 - 0.032,
    door_y,
    body_depth / 2 + 0.083
  );
  door_group.add(door_left_jamb);

  const door_right_jamb = new THREE.Mesh(door_jambGeom, wood_darkMat);
  door_right_jamb.name = "door_right_jamb";
  door_right_jamb.position.set(
    door_x + door_width / 2 + 0.032,
    door_y,
    body_depth / 2 + 0.083
  );
  door_group.add(door_right_jamb);

  const door_headerGeom = new THREE.BoxGeometry(
    door_width + 0.11,
    0.055,
    0.05
  );
  const door_header = new THREE.Mesh(door_headerGeom, wood_darkMat);
  door_header.name = "door_header";
  door_header.position.set(
    door_x,
    door_bottom + door_height + 0.032,
    body_depth / 2 + 0.083
  );
  door_group.add(door_header);

  const door_thresholdGeom = new THREE.BoxGeometry(
    door_width + 0.08,
    0.045,
    0.065
  );
  const door_threshold = new THREE.Mesh(
    door_thresholdGeom,
    wood_darkMat
  );
  door_threshold.name = "door_threshold";
  door_threshold.position.set(
    door_x,
    door_bottom - 0.018,
    body_depth / 2 + 0.085
  );
  door_group.add(door_threshold);

  const hinge_leafGeom = new THREE.BoxGeometry(
    0.19,
    0.055,
    0.018
  );
  const hinge_leaves = new THREE.InstancedMesh(
    hinge_leafGeom,
    rustMat,
    2
  );
  hinge_leaves.name = "hinge_leaves";

  const hinge_barrelGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.11,
    10
  );
  const hinge_barrels = new THREE.InstancedMesh(
    hinge_barrelGeom,
    rust_darkMat,
    2
  );
  hinge_barrels.name = "hinge_barrels";

  const hinge_y_positions = [0.39, 0.82];
  const hinge_dummy = new THREE.Object3D();

  for (let i = 0; i < hinge_y_positions.length; i++) {
    hinge_dummy.position.set(
      door_x - door_width / 2 + 0.075,
      hinge_y_positions[i],
      body_depth / 2 + 0.119
    );
    hinge_dummy.rotation.set(0, 0, 0);
    hinge_dummy.updateMatrix();
    hinge_leaves.setMatrixAt(i, hinge_dummy.matrix);

    hinge_dummy.position.set(
      door_x - door_width / 2 - 0.018,
      hinge_y_positions[i],
      body_depth / 2 + 0.126
    );
    hinge_dummy.updateMatrix();
    hinge_barrels.setMatrixAt(i, hinge_dummy.matrix);
  }
  hinge_leaves.instanceMatrix.needsUpdate = true;
  hinge_barrels.instanceMatrix.needsUpdate = true;
  door_group.add(hinge_leaves, hinge_barrels);

  const latch_plateGeom = new THREE.BoxGeometry(
    0.22,
    0.055,
    0.018
  );
  const latch_plate = new THREE.Mesh(latch_plateGeom, rustMat);
  latch_plate.name = "latch_plate";
  latch_plate.position.set(
    door_x + 0.08,
    0.61,
    body_depth / 2 + 0.122
  );
  door_group.add(latch_plate);

  const latch_pivotGeom = new THREE.CylinderGeometry(
    0.036,
    0.036,
    0.026,
    14
  );
  const latch_pivot = new THREE.Mesh(latch_pivotGeom, rust_darkMat);
  latch_pivot.name = "latch_pivot";
  latch_pivot.rotation.x = Math.PI / 2;
  latch_pivot.position.set(
    door_x + 0.18,
    0.61,
    body_depth / 2 + 0.139
  );
  door_group.add(latch_pivot);

  const latch_keeperGeom = new THREE.BoxGeometry(
    0.055,
    0.09,
    0.022
  );
  const latch_keeper = new THREE.Mesh(latch_keeperGeom, rust_darkMat);
  latch_keeper.name = "latch_keeper";
  latch_keeper.position.set(
    door_x + 0.205,
    0.55,
    body_depth / 2 + 0.13
  );
  door_group.add(latch_keeper);

  const latch_handle_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(
      door_x + 0.18,
      0.59,
      body_depth / 2 + 0.151
    ),
    new THREE.Vector3(
      door_x + 0.235,
      0.555,
      body_depth / 2 + 0.154
    ),
    new THREE.Vector3(
      door_x + 0.235,
      0.475,
      body_depth / 2 + 0.154
    ),
    new THREE.Vector3(
      door_x + 0.19,
      0.43,
      body_depth / 2 + 0.151
    )
  ]);
  const latch_handleGeom = new THREE.TubeGeometry(
    latch_handle_path,
    16,
    0.012,
    8,
    false
  );
  const latch_handle = new THREE.Mesh(latch_handleGeom, rustMat);
  latch_handle.name = "latch_handle";
  door_group.add(latch_handle);

  const rivetGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.014,
    10
  );
  const door_rivets = new THREE.InstancedMesh(
    rivetGeom,
    rust_darkMat,
    6
  );
  door_rivets.name = "door_rivets";

  const rivet_positions = [
    [door_x - door_width / 2 + 0.035, 0.39],
    [door_x - door_width / 2 + 0.17, 0.39],
    [door_x - door_width / 2 + 0.035, 0.82],
    [door_x - door_width / 2 + 0.17, 0.82],
    [door_x + 0.02, 0.61],
    [door_x + 0.14, 0.61]
  ];
  const rivet_dummy = new THREE.Object3D();

  for (let i = 0; i < rivet_positions.length; i++) {
    rivet_dummy.position.set(
      rivet_positions[i][0],
      rivet_positions[i][1],
      body_depth / 2 + 0.139
    );
    rivet_dummy.rotation.set(Math.PI / 2, 0, 0);
    rivet_dummy.updateMatrix();
    door_rivets.setMatrixAt(i, rivet_dummy.matrix);
  }
  door_rivets.instanceMatrix.needsUpdate = true;
  door_group.add(door_rivets);

  const entrance_holeGeom = new THREE.CircleGeometry(0.047, 18);
  const entrance_hole = new THREE.Mesh(entrance_holeGeom, holeMat);
  entrance_hole.name = "entrance_hole";
  entrance_hole.position.set(
    0.02,
    1.405,
    body_depth / 2 + 0.047
  );
  body_group.add(entrance_hole);

  const entrance_hole_rimGeom = new THREE.TorusGeometry(
    0.048,
    0.007,
    6,
    18
  );
  const entrance_hole_rim = new THREE.Mesh(
    entrance_hole_rimGeom,
    wood_darkMat
  );
  entrance_hole_rim.name = "entrance_hole_rim";
  entrance_hole_rim.position.set(
    0.02,
    1.405,
    body_depth / 2 + 0.05
  );
  body_group.add(entrance_hole_rim);

  const front_grainGeom = new THREE.BoxGeometry(
    0.006,
    1,
    0.004
  );
  const front_grain = new THREE.InstancedMesh(
    front_grainGeom,
    grainMat,
    30
  );
  front_grain.name = "front_grain";

  const front_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 30; i++) {
    const x = -0.46 + (((i * 37) % 100) / 100) * 0.92;
    const length = 0.18 + (((i * 19) % 65) / 100);
    const raw_y = 0.18 + (((i * 29) % 100) / 100) * 1.02;
    const y = Math.min(raw_y, wall_top + length / 2 - 0.02);
    front_grain_dummy.position.set(
      x,
      y,
      body_depth / 2 + 0.044
    );
    front_grain_dummy.rotation.set(
      0,
      0,
      ((i % 5) - 2) * 0.006
    );
    front_grain_dummy.scale.set(
      0.65 + (i % 3) * 0.2,
      length,
      1
    );
    front_grain_dummy.updateMatrix();
    front_grain.setMatrixAt(i, front_grain_dummy.matrix);
  }
  front_grain.instanceMatrix.needsUpdate = true;
  weathering_group.add(front_grain);

  const side_grainGeom = new THREE.BoxGeometry(
    0.004,
    1,
    0.007
  );
  const side_grain = new THREE.InstancedMesh(
    side_grainGeom,
    grainMat,
    32
  );
  side_grain.name = "side_grain";

  const side_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const side = i < 16 ? -1 : 1;
    const j = i % 16;
    const z = -0.34 + (((j * 31) % 100) / 100) * 0.68;
    const length = 0.2 + (((j * 23) % 60) / 100);
    const raw_y = 0.18 + (((j * 41) % 100) / 100) * 1.0;
    const y = Math.min(raw_y, wall_top + length / 2 - 0.02);
    side_grain_dummy.position.set(
      side * (body_width / 2 + 0.044),
      y,
      z
    );
    side_grain_dummy.rotation.set(
      ((j % 5) - 2) * 0.006,
      0,
      0
    );
    side_grain_dummy.scale.set(
      1,
      length,
      0.7 + (j % 3) * 0.2
    );
    side_grain_dummy.updateMatrix();
    side_grain.setMatrixAt(i, side_grain_dummy.matrix);
  }
  side_grain.instanceMatrix.needsUpdate = true;
  weathering_group.add(side_grain);

  const door_grainGeom = new THREE.BoxGeometry(
    0.005,
    1,
    0.004
  );
  const door_grain = new THREE.InstancedMesh(
    door_grainGeom,
    grainMat,
    15
  );
  door_grain.name = "door_grain";

  const door_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 15; i++) {
    const x =
      door_x -
      door_width / 2 +
      0.025 +
      (((i * 43) % 100) / 100) * (door_width - 0.05);
    const length = 0.12 + (((i * 17) % 50) / 100);
    const raw_y =
      door_bottom +
      0.03 +
      (((i * 31) % 100) / 100) * (door_height - 0.09);
    const y = Math.min(raw_y, door_bottom + door_height - length / 2);
    door_grain_dummy.position.set(
      x,
      y,
      body_depth / 2 + 0.109
    );
    door_grain_dummy.rotation.set(
      0,
      0,
      ((i % 5) - 2) * 0.008
    );
    door_grain_dummy.scale.set(
      0.7 + (i % 2) * 0.3,
      length,
      1
    );
    door_grain_dummy.updateMatrix();
    door_grain.setMatrixAt(i, door_grain_dummy.matrix);
  }
  door_grain.instanceMatrix.needsUpdate = true;
  weathering_group.add(door_grain);

  const roof_grainGeom = new THREE.BoxGeometry(
    1,
    0.004,
    0.006
  );
  const roof_grain = new THREE.InstancedMesh(
    roof_grainGeom,
    grainMat,
    28
  );
  roof_grain.name = "roof_grain";

  const roof_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const side = i < 14 ? -1 : 1;
    const j = i % 14;
    const normal_x = side * Math.sin(roof_angle);
    const normal_y = Math.cos(roof_angle);
    const offset = roof_thickness / 2 + 0.018;
    const x = side * roof_run / 2 + normal_x * offset;
    const y = wall_top + roof_rise / 2 + normal_y * offset;
    const z = -0.45 + (((j * 37) % 100) / 100) * 0.9;
    const length = 0.28 + (((j * 29) % 55) / 100);
    roof_grain_dummy.position.set(x, y, z);
    roof_grain_dummy.rotation.set(
      0,
      0,
      -side * roof_angle
    );
    roof_grain_dummy.scale.set(
      length,
      1,
      0.7 + (j % 3) * 0.2
    );
    roof_grain_dummy.updateMatrix();
    roof_grain.setMatrixAt(i, roof_grain_dummy.matrix);
  }
  roof_grain.instanceMatrix.needsUpdate = true;
  weathering_group.add(roof_grain);

  const roof_highlight_grain = new THREE.InstancedMesh(
    roof_grainGeom,
    faded_woodMat,
    16
  );
  roof_highlight_grain.name = "roof_highlight_grain";

  const roof_highlight_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const side = i < 8 ? -1 : 1;
    const j = i % 8;
    const normal_x = side * Math.sin(roof_angle);
    const normal_y = Math.cos(roof_angle);
    const offset = roof_thickness / 2 + 0.021;
    const z = -0.4 + (((j * 47 + 13) % 100) / 100) * 0.8;
    const x =
      side * roof_run / 2 +
      normal_x * offset +
      side * Math.cos(roof_angle) * (-0.18 + j * 0.05);
    const y =
      wall_top +
      roof_rise / 2 +
      normal_y * offset +
      -Math.sin(roof_angle) * (-0.18 + j * 0.05);
    roof_highlight_dummy.position.set(x, y, z);
    roof_highlight_dummy.rotation.set(
      0,
      0,
      -side * roof_angle
    );
    roof_highlight_dummy.scale.set(
      0.24 + (j % 4) * 0.07,
      1,
      0.55
    );
    roof_highlight_dummy.updateMatrix();
    roof_highlight_grain.setMatrixAt(
      i,
      roof_highlight_dummy.matrix
    );
  }
  roof_highlight_grain.instanceMatrix.needsUpdate = true;
  weathering_group.add(roof_highlight_grain);

  const door_wearGeom = new THREE.BoxGeometry(
    0.018,
    0.075,
    0.004
  );
  const door_wear = new THREE.InstancedMesh(
    door_wearGeom,
    wood_lightMat,
    12
  );
  door_wear.name = "door_wear";

  const door_wear_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const x =
      door_x -
      door_width / 2 +
      0.035 +
      (((i * 41) % 100) / 100) * (door_width - 0.07);
    const y =
      door_bottom +
      0.035 +
      (((i * 29) % 100) / 100) * (door_height - 0.11);
    door_wear_dummy.position.set(
      x,
      y,
      body_depth / 2 + 0.113
    );
    door_wear_dummy.rotation.set(
      0,
      0,
      ((i % 5) - 2) * 0.05
    );
    door_wear_dummy.scale.set(
      0.55 + (i % 3) * 0.25,
      0.55 + ((i * 7) % 5) * 0.18,
      1
    );
    door_wear_dummy.updateMatrix();
    door_wear.setMatrixAt(i, door_wear_dummy.matrix);
  }
  door_wear.instanceMatrix.needsUpdate = true;
  weathering_group.add(door_wear);

  const door_bottom_wearGeom = new THREE.BoxGeometry(
    0.055,
    0.12,
    0.004
  );
  const door_bottom_wear = new THREE.InstancedMesh(
    door_bottom_wearGeom,
    wood_midMat,
    6
  );
  door_bottom_wear.name = "door_bottom_wear";

  const door_bottom_wear_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const x =
      door_x -
      door_width / 2 +
      door_plank_step * (i + 0.5);
    const height_scale = 0.55 + ((i * 3) % 5) * 0.18;
    door_bottom_wear_dummy.position.set(
      x,
      door_bottom + 0.055 + (i % 2) * 0.018,
      body_depth / 2 + 0.114
    );
    door_bottom_wear_dummy.rotation.set(
      0,
      0,
      ((i % 3) - 1) * 0.035
    );
    door_bottom_wear_dummy.scale.set(
      0.7 + (i % 3) * 0.18,
      height_scale,
      1
    );
    door_bottom_wear_dummy.updateMatrix();
    door_bottom_wear.setMatrixAt(
      i,
      door_bottom_wear_dummy.matrix
    );
  }
  door_bottom_wear.instanceMatrix.needsUpdate = true;
  weathering_group.add(door_bottom_wear);

  const front_knotsGeom = new THREE.TorusGeometry(
    0.025,
    0.005,
    6,
    14
  );
  const front_knots = new THREE.InstancedMesh(
    front_knotsGeom,
    grainMat,
    5
  );
  front_knots.name = "front_knots";

  const front_knot_positions = [
    [-0.39, 0.55, 1.0, 1.4],
    [-0.31, 0.91, 0.8, 1.1],
    [0.43, 1.08, 0.7, 1.0],
    [-0.43, 1.27, 0.65, 0.9],
    [0.42, 0.28, 0.55, 0.8]
  ];
  const front_knot_dummy = new THREE.Object3D();

  for (let i = 0; i < front_knot_positions.length; i++) {
    const p = front_knot_positions[i];
    front_knot_dummy.position.set(
      p[0],
      p[1],
      body_depth / 2 + 0.049
    );
    front_knot_dummy.rotation.set(
      0,
      0,
      (i - 2) * 0.18
    );
    front_knot_dummy.scale.set(p[2], p[3], 1);
    front_knot_dummy.updateMatrix();
    front_knots.setMatrixAt(i, front_knot_dummy.matrix);
  }
  front_knots.instanceMatrix.needsUpdate = true;
  weathering_group.add(front_knots);

  const side_knots = new THREE.InstancedMesh(
    front_knotsGeom,
    grainMat,
    4
  );
  side_knots.name = "side_knots";

  const side_knot_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    side_knot_dummy.position.set(
      -body_width / 2 - 0.049,
      0.38 + i * 0.24,
      -0.22 + i * 0.13
    );
    side_knot_dummy.rotation.set(
      0,
      -Math.PI / 2,
      i * 0.2
    );
    side_knot_dummy.scale.set(
      0.7 + i * 0.08,
      1.0 + (i % 2) * 0.35,
      1
    );
    side_knot_dummy.updateMatrix();
    side_knots.setMatrixAt(i, side_knot_dummy.matrix);
  }
  side_knots.instanceMatrix.needsUpdate = true;
  weathering_group.add(side_knots);

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