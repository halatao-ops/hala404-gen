export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "portable_volleyball_net";

  const court_group = new THREE.Group();
  court_group.name = "court_group";
  root.add(court_group);

  const net_group = new THREE.Group();
  net_group.name = "net_group";
  root.add(net_group);

  const court_width = 6.2;
  const court_length = 6.2;
  const court_thickness = 0.12;
  const line_width = 0.045;
  const line_height = 0.018;
  const line_y = court_thickness / 2 + line_height / 2;

  const post_x = 3.18;
  const post_bottom = -0.2;
  const post_top = 3.1;
  const post_height = post_top - post_bottom;
  const post_center_y = (post_top + post_bottom) / 2;

  const bottom_tape_y = 1.02;
  const top_tape_y = 2.42;
  const tape_height = 0.11;
  const tape_thickness = 0.055;
  const net_width = post_x * 2 - 0.18;
  const net_bottom_y = bottom_tape_y + tape_height / 2;
  const net_top_y = top_tape_y - tape_height / 2;
  const net_height = net_top_y - net_bottom_y;
  const net_center_y = (net_top_y + net_bottom_y) / 2;

  const court_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x151617,
    roughness: 0.8
  });
  const court_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    roughness: 0.8
  });
  const court_lineMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ef,
    roughness: 0.65
  });
  const postMat = new THREE.MeshStandardMaterial({
    color: 0x111212,
    metalness: 0.35,
    roughness: 0.5
  });
  const net_cordMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.15,
    roughness: 0.75
  });
  const top_tapeMat = new THREE.MeshStandardMaterial({
    color: 0xd8d9d6,
    roughness: 0.8
  });
  const bottom_tapeMat = new THREE.MeshStandardMaterial({
    color: 0xc9cbc8,
    roughness: 0.8
  });
  const tape_stitchMat = new THREE.MeshStandardMaterial({
    color: 0x9fa19e,
    roughness: 0.85
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0xbfc2c2,
    metalness: 0.5,
    roughness: 0.45
  });

  const court_surfaceGeom = new THREE.BoxGeometry(
    court_width,
    court_thickness,
    court_length
  );
  const court_surface = new THREE.Mesh(court_surfaceGeom, court_surfaceMat);
  court_surface.name = "court_surface";
  court_group.add(court_surface);

  const court_long_edgesGeom = new THREE.BoxGeometry(
    line_width,
    court_thickness + 0.025,
    court_length
  );
  const court_long_edges = new THREE.InstancedMesh(
    court_long_edgesGeom,
    court_edgeMat,
    2
  );
  court_long_edges.name = "court_long_edges";
  const edge_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    edge_dummy.position.set(
      (i === 0 ? -1 : 1) * (court_width / 2 - line_width / 2),
      0,
      0
    );
    edge_dummy.updateMatrix();
    court_long_edges.setMatrixAt(i, edge_dummy.matrix);
  }
  court_long_edges.instanceMatrix.needsUpdate = true;
  court_group.add(court_long_edges);

  const court_short_edgesGeom = new THREE.BoxGeometry(
    court_width,
    court_thickness + 0.025,
    line_width
  );
  const court_short_edges = new THREE.InstancedMesh(
    court_short_edgesGeom,
    court_edgeMat,
    2
  );
  court_short_edges.name = "court_short_edges";
  for (let i = 0; i < 2; i++) {
    edge_dummy.position.set(
      0,
      0,
      (i === 0 ? -1 : 1) * (court_length / 2 - line_width / 2)
    );
    edge_dummy.updateMatrix();
    court_short_edges.setMatrixAt(i, edge_dummy.matrix);
  }
  court_short_edges.instanceMatrix.needsUpdate = true;
  court_group.add(court_short_edges);

  const sidelineGeom = new THREE.BoxGeometry(
    line_width,
    line_height,
    court_length - line_width * 2
  );

  const left_sideline = new THREE.Mesh(sidelineGeom, court_lineMat);
  left_sideline.name = "left_sideline";
  left_sideline.position.set(
    -court_width / 2 + line_width / 2,
    line_y,
    0
  );
  court_group.add(left_sideline);

  const right_sideline = new THREE.Mesh(sidelineGeom, court_lineMat);
  right_sideline.name = "right_sideline";
  right_sideline.position.set(
    court_width / 2 - line_width / 2,
    line_y,
    0
  );
  court_group.add(right_sideline);

  const end_lineGeom = new THREE.BoxGeometry(
    court_width - line_width * 2,
    line_height,
    line_width
  );

  const near_end_line = new THREE.Mesh(end_lineGeom, court_lineMat);
  near_end_line.name = "near_end_line";
  near_end_line.position.set(
    0,
    line_y,
    court_length / 2 - line_width / 2
  );
  court_group.add(near_end_line);

  const far_end_line = new THREE.Mesh(end_lineGeom, court_lineMat);
  far_end_line.name = "far_end_line";
  far_end_line.position.set(
    0,
    line_y,
    -court_length / 2 + line_width / 2
  );
  court_group.add(far_end_line);

  const center_lineGeom = new THREE.BoxGeometry(
    line_width,
    line_height,
    court_length - line_width * 2
  );
  const center_line = new THREE.Mesh(center_lineGeom, court_lineMat);
  center_line.name = "center_line";
  center_line.position.set(0, line_y, 0);
  court_group.add(center_line);

  const attack_lineGeom = new THREE.BoxGeometry(
    court_width - line_width * 2,
    line_height,
    line_width
  );

  const near_attack_line = new THREE.Mesh(attack_lineGeom, court_lineMat);
  near_attack_line.name = "near_attack_line";
  near_attack_line.position.set(0, line_y, 1.8);
  court_group.add(near_attack_line);

  const far_attack_line = new THREE.Mesh(attack_lineGeom, court_lineMat);
  far_attack_line.name = "far_attack_line";
  far_attack_line.position.set(0, line_y, -1.8);
  court_group.add(far_attack_line);

  const postGeom = new THREE.BoxGeometry(0.14, post_height, 0.14);

  const left_post = new THREE.Mesh(postGeom, postMat);
  left_post.name = "left_post";
  left_post.position.set(-post_x, post_center_y, 0);
  root.add(left_post);

  const right_post = new THREE.Mesh(postGeom, postMat);
  right_post.name = "right_post";
  right_post.position.set(post_x, post_center_y, 0);
  root.add(right_post);

  const post_capsGeom = new THREE.BoxGeometry(0.16, 0.055, 0.16);
  const post_caps = new THREE.InstancedMesh(post_capsGeom, postMat, 2);
  post_caps.name = "post_caps";
  const post_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set((i === 0 ? -1 : 1) * post_x, post_top + 0.0275, 0);
    post_dummy.updateMatrix();
    post_caps.setMatrixAt(i, post_dummy.matrix);
  }
  post_caps.instanceMatrix.needsUpdate = true;
  root.add(post_caps);

  const post_feetGeom = new THREE.BoxGeometry(0.2, 0.05, 0.2);
  const post_feet = new THREE.InstancedMesh(post_feetGeom, postMat, 2);
  post_feet.name = "post_feet";
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set((i === 0 ? -1 : 1) * post_x, -0.175, 0);
    post_dummy.updateMatrix();
    post_feet.setMatrixAt(i, post_dummy.matrix);
  }
  post_feet.instanceMatrix.needsUpdate = true;
  root.add(post_feet);

  const net_side_railsGeom = new THREE.BoxGeometry(0.07, net_height, 0.07);
  const net_side_rails = new THREE.InstancedMesh(
    net_side_railsGeom,
    postMat,
    2
  );
  net_side_rails.name = "net_side_rails";
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set(
      (i === 0 ? -1 : 1) * (post_x - 0.075),
      net_center_y,
      0
    );
    post_dummy.updateMatrix();
    net_side_rails.setMatrixAt(i, post_dummy.matrix);
  }
  net_side_rails.instanceMatrix.needsUpdate = true;
  net_group.add(net_side_rails);

  const top_tapeGeom = new THREE.BoxGeometry(
    net_width + tape_thickness,
    tape_height,
    tape_thickness
  );
  const top_tape = new THREE.Mesh(top_tapeGeom, top_tapeMat);
  top_tape.name = "top_tape";
  top_tape.position.set(0, top_tape_y, 0);
  net_group.add(top_tape);

  const bottom_tapeGeom = new THREE.BoxGeometry(
    net_width + tape_thickness,
    tape_height,
    tape_thickness
  );
  const bottom_tape = new THREE.Mesh(bottom_tapeGeom, bottom_tapeMat);
  bottom_tape.name = "bottom_tape";
  bottom_tape.position.set(0, bottom_tape_y, 0);
  net_group.add(bottom_tape);

  const vertical_count = 33;
  const net_vertical_cordsGeom = new THREE.BoxGeometry(
    0.012,
    net_height,
    0.012
  );
  const net_vertical_cords = new THREE.InstancedMesh(
    net_vertical_cordsGeom,
    net_cordMat,
    vertical_count
  );
  net_vertical_cords.name = "net_vertical_cords";
  const net_dummy = new THREE.Object3D();
  for (let i = 0; i < vertical_count; i++) {
    const t = i / (vertical_count - 1);
    net_dummy.position.set(
      -net_width / 2 + t * net_width,
      net_center_y,
      0
    );
    net_dummy.updateMatrix();
    net_vertical_cords.setMatrixAt(i, net_dummy.matrix);
  }
  net_vertical_cords.instanceMatrix.needsUpdate = true;
  net_group.add(net_vertical_cords);

  const horizontal_count = 11;
  const net_horizontal_cordsGeom = new THREE.BoxGeometry(
    net_width,
    0.012,
    0.012
  );
  const net_horizontal_cords = new THREE.InstancedMesh(
    net_horizontal_cordsGeom,
    net_cordMat,
    horizontal_count
  );
  net_horizontal_cords.name = "net_horizontal_cords";
  for (let i = 0; i < horizontal_count; i++) {
    const t = i / (horizontal_count - 1);
    net_dummy.position.set(
      0,
      net_bottom_y + t * net_height,
      0
    );
    net_dummy.updateMatrix();
    net_horizontal_cords.setMatrixAt(i, net_dummy.matrix);
  }
  net_horizontal_cords.instanceMatrix.needsUpdate = true;
  net_group.add(net_horizontal_cords);

  const top_stitch_count = 32;
  const top_tape_stitchesGeom = new THREE.BoxGeometry(
    0.012,
    tape_height * 0.72,
    tape_thickness + 0.008
  );
  const top_tape_stitches = new THREE.InstancedMesh(
    top_tape_stitchesGeom,
    tape_stitchMat,
    top_stitch_count
  );
  top_tape_stitches.name = "top_tape_stitches";
  for (let i = 0; i < top_stitch_count; i++) {
    const t = (i + 0.5) / top_stitch_count;
    net_dummy.position.set(
      -net_width / 2 + t * net_width,
      top_tape_y,
      0
    );
    net_dummy.updateMatrix();
    top_tape_stitches.setMatrixAt(i, net_dummy.matrix);
  }
  top_tape_stitches.instanceMatrix.needsUpdate = true;
  net_group.add(top_tape_stitches);

  const bottom_stitch_count = 17;
  const bottom_tape_stitchesGeom = new THREE.BoxGeometry(
    0.01,
    tape_height * 0.68,
    tape_thickness + 0.008
  );
  const bottom_tape_stitches = new THREE.InstancedMesh(
    bottom_tape_stitchesGeom,
    tape_stitchMat,
    bottom_stitch_count
  );
  bottom_tape_stitches.name = "bottom_tape_stitches";
  for (let i = 0; i < bottom_stitch_count; i++) {
    const t = (i + 0.5) / bottom_stitch_count;
    net_dummy.position.set(
      -net_width / 2 + t * net_width,
      bottom_tape_y,
      0
    );
    net_dummy.updateMatrix();
    bottom_tape_stitches.setMatrixAt(i, net_dummy.matrix);
  }
  bottom_tape_stitches.instanceMatrix.needsUpdate = true;
  net_group.add(bottom_tape_stitches);

  const tension_cableGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    1,
    8
  );

  function makeCable(name, start, end) {
    const cable = new THREE.Mesh(tension_cableGeom, net_cordMat);
    cable.name = name;
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    cable.position.copy(start).add(end).multiplyScalar(0.5);
    cable.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    cable.scale.set(1, length, 1);
    root.add(cable);
    return cable;
  }

  const left_upper_tension_cable = makeCable(
    "left_upper_tension_cable",
    new THREE.Vector3(-post_x, 2.58, 0),
    new THREE.Vector3(-net_width / 2, top_tape_y, 0)
  );

  const left_lower_tension_cable = makeCable(
    "left_lower_tension_cable",
    new THREE.Vector3(-post_x, 0.88, 0),
    new THREE.Vector3(-net_width / 2, bottom_tape_y, 0)
  );

  const right_upper_tension_cable = makeCable(
    "right_upper_tension_cable",
    new THREE.Vector3(post_x, 2.58, 0),
    new THREE.Vector3(net_width / 2, top_tape_y, 0)
  );

  const right_lower_tension_cable = makeCable(
    "right_lower_tension_cable",
    new THREE.Vector3(post_x, 0.88, 0),
    new THREE.Vector3(net_width / 2, bottom_tape_y, 0)
  );

  const post_boltsGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.018, 12);
  const post_bolts = new THREE.InstancedMesh(post_boltsGeom, hardwareMat, 8);
  post_bolts.name = "post_bolts";
  const bolt_positions = [
    [-post_x, 2.58, 0.078],
    [-post_x, 0.88, 0.078],
    [-post_x, 0.68, 0.078],
    [-post_x, -0.08, 0.078],
    [post_x, 2.58, 0.078],
    [post_x, 0.88, 0.078],
    [post_x, 0.68, 0.078],
    [post_x, -0.08, 0.078]
  ];
  for (let i = 0; i < bolt_positions.length; i++) {
    const p = bolt_positions[i];
    net_dummy.position.set(p[0], p[1], p[2]);
    net_dummy.rotation.set(Math.PI / 2, 0, 0);
    net_dummy.updateMatrix();
    post_bolts.setMatrixAt(i, net_dummy.matrix);
  }
  post_bolts.instanceMatrix.needsUpdate = true;
  root.add(post_bolts);

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