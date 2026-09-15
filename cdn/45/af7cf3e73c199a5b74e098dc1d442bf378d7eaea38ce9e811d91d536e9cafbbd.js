export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_open_book";

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x5a2b1d,
    metalness: 0.0,
    roughness: 0.78,
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x2f160f,
    metalness: 0.0,
    roughness: 0.82,
  });
  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x8a4a2c,
    metalness: 0.0,
    roughness: 0.82,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e8,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xe4e0d4,
    metalness: 0.0,
    roughness: 0.92,
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0xc9c6bd,
    metalness: 0.0,
    roughness: 0.95,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x292827,
    metalness: 0.0,
    roughness: 0.9,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc9a43c,
    metalness: 0.65,
    roughness: 0.3,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x876721,
    metalness: 0.5,
    roughness: 0.42,
  });

  const coverW = 1.5;
  const coverH = 1.82;
  const coverD = 0.055;
  const pageW = 1.28;
  const pageH = 1.62;
  const pageD = 0.27;
  const openAngle = 0.24;

  const page_block = new THREE.Group();
  page_block.name = "page_block";
  root.add(page_block);

  const page_block_core = new THREE.Mesh(
    new THREE.BoxGeometry(pageW, pageH, pageD),
    pageEdgeMat
  );
  page_block_core.name = "page_block_core";
  page_block_core.position.set(0, 0, pageD * 0.5);
  page_block.add(page_block_core);

  const page_sheet = new THREE.Mesh(
    new THREE.BoxGeometry(pageW * 0.995, pageH * 0.995, 0.006),
    paperMat
  );
  page_sheet.name = "page_sheet";
  page_sheet.position.set(0.006, 0, pageD + 0.006);
  page_block.add(page_sheet);

  const page_edge_line_geom = new THREE.BoxGeometry(
    0.006,
    pageH * 0.965,
    0.0025
  );
  const page_edge_lines = new THREE.InstancedMesh(
    page_edge_line_geom,
    pageLineMat,
    28
  );
  page_edge_lines.name = "page_edge_lines";
  const page_edge_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const z = 0.012 + (i / 27) * pageD * 0.976;
    page_edge_dummy.position.set(pageW * 0.5 + 0.004, 0, z);
    page_edge_dummy.rotation.set(0, 0, 0);
    page_edge_dummy.scale.set(1, 1, 1);
    page_edge_dummy.updateMatrix();
    page_edge_lines.setMatrixAt(i, page_edge_dummy.matrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  page_block.add(page_edge_lines);

  const bottom_page_line_geom = new THREE.BoxGeometry(
    pageW * 0.97,
    0.005,
    0.0025
  );
  const bottom_page_lines = new THREE.InstancedMesh(
    bottom_page_line_geom,
    pageLineMat,
    18
  );
  bottom_page_lines.name = "bottom_page_lines";
  const bottom_page_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const z = 0.018 + (i / 17) * pageD * 0.96;
    bottom_page_dummy.position.set(
      0.004,
      -pageH * 0.5 - 0.002,
      z
    );
    bottom_page_dummy.rotation.set(0, 0, 0);
    bottom_page_dummy.scale.set(1, 1, 1);
    bottom_page_dummy.updateMatrix();
    bottom_page_lines.setMatrixAt(i, bottom_page_dummy.matrix);
  }
  bottom_page_lines.instanceMatrix.needsUpdate = true;
  page_block.add(bottom_page_lines);

  const text_line_count = 25;
  const text_word_count = 8;
  const text_instance_count = text_line_count * text_word_count;
  const text_stroke_geom = new THREE.BoxGeometry(1, 1, 1);
  const text_strokes = new THREE.InstancedMesh(
    text_stroke_geom,
    inkMat,
    text_instance_count
  );
  text_strokes.name = "text_strokes";
  const text_dummy = new THREE.Object3D();
  let text_index = 0;
  for (let line = 0; line < text_line_count; line++) {
    const y = 0.66 - line * 0.053;
    const line_indent =
      line % 7 === 0 ? 0.075 : line % 5 === 0 ? 0.035 : 0;
    for (let word = 0; word < text_word_count; word++) {
      const x = -0.52 + line_indent + word * 0.112;
      const length =
        0.042 + ((line * 3 + word * 5) % 6) * 0.009;
      text_dummy.position.set(x, y, pageD + 0.011);
      text_dummy.rotation.set(0, 0, 0);
      text_dummy.scale.set(length, 0.006, 0.003);
      text_dummy.updateMatrix();
      text_strokes.setMatrixAt(text_index, text_dummy.matrix);
      text_index++;
    }
  }
  text_strokes.instanceMatrix.needsUpdate = true;
  page_block.add(text_strokes);

  const page_margin_line = new THREE.Mesh(
    new THREE.BoxGeometry(0.005, pageH * 0.94, 0.003),
    pageLineMat
  );
  page_margin_line.name = "page_margin_line";
  page_margin_line.position.set(
    -pageW * 0.485,
    0,
    pageD + 0.01
  );
  page_block.add(page_margin_line);

  const front_cover = new THREE.Group();
  front_cover.name = "front_cover";
  front_cover.position.set(0, 0, 0.025);
  front_cover.rotation.y = -openAngle;
  root.add(front_cover);

  const front_cover_panel = new THREE.Mesh(
    new THREE.BoxGeometry(coverW, coverH, coverD),
    leatherMat
  );
  front_cover_panel.name = "front_cover_panel";
  front_cover_panel.position.set(0, 0, -coverD * 0.5);
  front_cover.add(front_cover_panel);

  const front_cover_top_rail = new THREE.Mesh(
    new THREE.BoxGeometry(coverW - 0.04, 0.105, 0.085),
    leatherMat
  );
  front_cover_top_rail.name = "front_cover_top_rail";
  front_cover_top_rail.position.set(0, coverH * 0.5 - 0.052, 0.025);
  front_cover.add(front_cover_top_rail);

  const front_cover_bottom_rail = new THREE.Mesh(
    new THREE.BoxGeometry(coverW - 0.04, 0.105, 0.085),
    leatherMat
  );
  front_cover_bottom_rail.name = "front_cover_bottom_rail";
  front_cover_bottom_rail.position.set(0, -coverH * 0.5 + 0.052, 0.025);
  front_cover.add(front_cover_bottom_rail);

  const front_cover_fore_rail = new THREE.Mesh(
    new THREE.BoxGeometry(0.105, coverH - 0.04, 0.085),
    leatherMat
  );
  front_cover_fore_rail.name = "front_cover_fore_rail";
  front_cover_fore_rail.position.set(
    coverW * 0.5 - 0.052,
    0,
    0.025
  );
  front_cover.add(front_cover_fore_rail);

  const front_cover_spine = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, coverH - 0.035, 0.11),
    leatherMat
  );
  front_cover_spine.name = "front_cover_spine";
  front_cover_spine.position.set(
    -coverW * 0.5 + 0.08,
    0,
    0.035
  );
  front_cover.add(front_cover_spine);

  const spine_rib_geom = new THREE.BoxGeometry(0.205, 0.035, 0.13);
  const spine_ribs = new THREE.InstancedMesh(
    spine_rib_geom,
    darkLeatherMat,
    5
  );
  spine_ribs.name = "spine_ribs";
  const spine_rib_dummy = new THREE.Object3D();
  const spine_rib_y = [-0.68, -0.34, 0, 0.34, 0.68];
  for (let i = 0; i < spine_rib_y.length; i++) {
    spine_rib_dummy.position.set(
      -coverW * 0.5 + 0.08,
      spine_rib_y[i],
      0.045
    );
    spine_rib_dummy.rotation.set(0, 0, 0);
    spine_rib_dummy.scale.set(1, 1, 1);
    spine_rib_dummy.updateMatrix();
    spine_ribs.setMatrixAt(i, spine_rib_dummy.matrix);
  }
  spine_ribs.instanceMatrix.needsUpdate = true;
  front_cover.add(spine_ribs);

  const spine_title_mark_geom = new THREE.BoxGeometry(1, 1, 1);
  const spine_title_marks = new THREE.InstancedMesh(
    spine_title_mark_geom,
    goldMat,
    14
  );
  spine_title_marks.name = "spine_title_marks";
  const spine_title_dummy = new THREE.Object3D();
  let spine_title_index = 0;
  for (let i = 0; i < 7; i++) {
    const y = 0.3 - i * 0.095;
    spine_title_dummy.position.set(
      -coverW * 0.5 + 0.08,
      y,
      0.104
    );
    spine_title_dummy.rotation.set(0, 0, 0);
    spine_title_dummy.scale.set(0.075, 0.012, 0.006);
    spine_title_dummy.updateMatrix();
    spine_title_marks.setMatrixAt(
      spine_title_index++,
      spine_title_dummy.matrix
    );

    spine_title_dummy.position.set(
      -coverW * 0.5 + 0.08,
      y - 0.027,
      0.104
    );
    spine_title_dummy.scale.set(
      0.012,
      i % 2 === 0 ? 0.058 : 0.045,
      0.006
    );
    spine_title_dummy.updateMatrix();
    spine_title_marks.setMatrixAt(
      spine_title_index++,
      spine_title_dummy.matrix
    );
  }
  spine_title_marks.instanceMatrix.needsUpdate = true;
  front_cover.add(spine_title_marks);

  const spine_ornament_top = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.25, 0.012),
    darkGoldMat
  );
  spine_ornament_top.name = "spine_ornament_top";
  spine_ornament_top.position.set(
    -coverW * 0.5 + 0.08,
    0.68,
    0.103
  );
  front_cover.add(spine_ornament_top);

  const spine_ornament_bottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.25, 0.012),
    darkGoldMat
  );
  spine_ornament_bottom.name = "spine_ornament_bottom";
  spine_ornament_bottom.position.set(
    -coverW * 0.5 + 0.08,
    -0.68,
    0.103
  );
  front_cover.add(spine_ornament_bottom);

  const spine_ornament_leaf_geom = new THREE.CircleGeometry(0.026, 12);
  const spine_ornament_leaves = new THREE.InstancedMesh(
    spine_ornament_leaf_geom,
    goldMat,
    12
  );
  spine_ornament_leaves.name = "spine_ornament_leaves";
  const spine_leaf_dummy = new THREE.Object3D();
  let spine_leaf_index = 0;
  for (const centerY of [-0.68, 0.68]) {
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      spine_leaf_dummy.position.set(
        -coverW * 0.5 + 0.08 + Math.cos(angle) * 0.045,
        centerY + Math.sin(angle) * 0.075,
        0.111
      );
      spine_leaf_dummy.rotation.set(0, 0, angle);
      spine_leaf_dummy.scale.set(0.55, 1.35, 1);
      spine_leaf_dummy.updateMatrix();
      spine_ornament_leaves.setMatrixAt(
        spine_leaf_index++,
        spine_leaf_dummy.matrix
      );
    }
  }
  spine_ornament_leaves.instanceMatrix.needsUpdate = true;
  front_cover.add(spine_ornament_leaves);

  const spine_ornament_center_geom = new THREE.CircleGeometry(0.025, 16);
  const spine_ornament_centers = new THREE.InstancedMesh(
    spine_ornament_center_geom,
    goldMat,
    2
  );
  spine_ornament_centers.name = "spine_ornament_centers";
  const spine_center_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    spine_center_dummy.position.set(
      -coverW * 0.5 + 0.08,
      i === 0 ? -0.68 : 0.68,
      0.113
    );
    spine_center_dummy.rotation.set(0, 0, 0);
    spine_center_dummy.scale.set(1, 1, 1);
    spine_center_dummy.updateMatrix();
    spine_ornament_centers.setMatrixAt(i, spine_center_dummy.matrix);
  }
  spine_ornament_centers.instanceMatrix.needsUpdate = true;
  front_cover.add(spine_ornament_centers);

  const cover_border_points = [];
  const border_x = coverW * 0.5 - 0.075;
  const border_y = coverH * 0.5 - 0.075;
  const border_z = 0.074;
  const border_radius = 0.055;
  const border_corners = [
    [border_x - border_radius, border_y - border_radius, 0],
    [-border_x + border_radius, border_y - border_radius, Math.PI * 0.5],
    [-border_x + border_radius, -border_y + border_radius, Math.PI],
    [border_x - border_radius, -border_y + border_radius, Math.PI * 1.5],
  ];
  for (let corner = 0; corner < border_corners.length; corner++) {
    const data = border_corners[corner];
    for (let i = 0; i < 5; i++) {
      const angle = data[2] + (i / 4) * Math.PI * 0.5;
      cover_border_points.push(
        new THREE.Vector3(
          data[0] + Math.cos(angle) * border_radius,
          data[1] + Math.sin(angle) * border_radius,
          border_z
        )
      );
    }
  }
  const cover_border_curve = new THREE.CatmullRomCurve3(
    cover_border_points,
    true,
    "centripetal"
  );
  const cover_border = new THREE.Mesh(
    new THREE.TubeGeometry(
      cover_border_curve,
      72,
      0.008,
      6,
      true
    ),
    darkLeatherMat
  );
  cover_border.name = "cover_border";
  front_cover.add(cover_border);

  const cover_stitch_geom = new THREE.BoxGeometry(1, 1, 1);
  const cover_stitches = new THREE.InstancedMesh(
    cover_stitch_geom,
    wornLeatherMat,
    72
  );
  cover_stitches.name = "cover_stitches";
  const cover_stitch_dummy = new THREE.Object3D();
  let stitch_index = 0;
  for (let i = 0; i < 18; i++) {
    const x = -0.61 + (i / 17) * 1.22;
    for (const y of [-border_y, border_y]) {
      cover_stitch_dummy.position.set(x, y, 0.081);
      cover_stitch_dummy.rotation.set(0, 0, 0);
      cover_stitch_dummy.scale.set(0.035, 0.006, 0.004);
      cover_stitch_dummy.updateMatrix();
      cover_stitches.setMatrixAt(
        stitch_index++,
        cover_stitch_dummy.matrix
      );
    }
  }
  for (let i = 0; i < 18; i++) {
    const y = -0.7 + (i / 17) * 1.4;
    for (const x of [-border_x, border_x]) {
      cover_stitch_dummy.position.set(x, y, 0.081);
      cover_stitch_dummy.rotation.set(0, 0, Math.PI * 0.5);
      cover_stitch_dummy.scale.set(0.035, 0.006, 0.004);
      cover_stitch_dummy.updateMatrix();
      cover_stitches.setMatrixAt(
        stitch_index++,
        cover_stitch_dummy.matrix
      );
    }
  }
  cover_stitches.instanceMatrix.needsUpdate = true;
  front_cover.add(cover_stitches);

  const corner_shape = new THREE.Shape();
  corner_shape.moveTo(0, 0);
  corner_shape.lineTo(0.22, 0);
  corner_shape.lineTo(0.185, 0.035);
  corner_shape.lineTo(0.155, 0.055);
  corner_shape.lineTo(0.125, 0.085);
  corner_shape.lineTo(0.09, 0.125);
  corner_shape.lineTo(0.055, 0.175);
  corner_shape.lineTo(0, 0.22);
  corner_shape.closePath();

  const corner_protector_geom = new THREE.ExtrudeGeometry(
    corner_shape,
    {
      depth: 0.012,
      steps: 1,
    }
  );
  const corner_protectors = new THREE.InstancedMesh(
    corner_protector_geom,
    goldMat,
    4
  );
  corner_protectors.name = "corner_protectors";
  const corner_dummy = new THREE.Object3D();
  const corner_positions = [
    [border_x, -border_y, 0],
    [-border_x, -border_y, -Math.PI * 0.5],
    [-border_x, border_y, Math.PI],
    [border_x, border_y, Math.PI * 0.5],
  ];
  for (let i = 0; i < corner_positions.length; i++) {
    corner_dummy.position.set(
      corner_positions[i][0],
      corner_positions[i][1],
      0.079
    );
    corner_dummy.rotation.set(0, 0, corner_positions[i][2]);
    corner_dummy.scale.set(1, 1, 1);
    corner_dummy.updateMatrix();
    corner_protectors.setMatrixAt(i, corner_dummy.matrix);
  }
  corner_protectors.instanceMatrix.needsUpdate = true;
  front_cover.add(corner_protectors);

  const corner_engraving_geom = new THREE.BoxGeometry(1, 1, 1);
  const corner_engravings = new THREE.InstancedMesh(
    corner_engraving_geom,
    darkGoldMat,
    12
  );
  corner_engravings.name = "corner_engravings";
  const corner_engraving_dummy = new THREE.Object3D();
  let engraving_index = 0;
  for (let c = 0; c < corner_positions.length; c++) {
    const rotation = corner_positions[c][2];
    const cosine = Math.cos(rotation);
    const sine = Math.sin(rotation);
    for (let i = 0; i < 3; i++) {
      const local_x = 0.045 + i * 0.047;
      const local_y = 0.035 + i * 0.025;
      const x =
        corner_positions[c][0] + local_x * cosine - local_y * sine;
      const y =
        corner_positions[c][1] + local_x * sine + local_y * cosine;
      corner_engraving_dummy.position.set(x, y, 0.095);
      corner_engraving_dummy.rotation.set(
        0,
        0,
        rotation + Math.PI * 0.25
      );
      corner_engraving_dummy.scale.set(0.052, 0.007, 0.004);
      corner_engraving_dummy.updateMatrix();
      corner_engravings.setMatrixAt(
        engraving_index++,
        corner_engraving_dummy.matrix
      );
    }
  }
  corner_engravings.instanceMatrix.needsUpdate = true;
  front_cover.add(corner_engravings);

  const back_cover = new THREE.Group();
  back_cover.name = "back_cover";
  back_cover.position.set(0, 0, 0.025);
  back_cover.rotation.y = openAngle;
  root.add(back_cover);

  const back_cover_panel = new THREE.Mesh(
    new THREE.BoxGeometry(coverW, coverH, coverD),
    leatherMat
  );
  back_cover_panel.name = "back_cover_panel";
  back_cover_panel.position.set(0, 0, -coverD * 0.5);
  back_cover.add(back_cover_panel);

  const back_cover_top_rail = new THREE.Mesh(
    new THREE.BoxGeometry(coverW - 0.04, 0.105, 0.085),
    leatherMat
  );
  back_cover_top_rail.name = "back_cover_top_rail";
  back_cover_top_rail.position.set(0, coverH * 0.5 - 0.052, 0.025);
  back_cover.add(back_cover_top_rail);

  const back_cover_bottom_rail = new THREE.Mesh(
    new THREE.BoxGeometry(coverW - 0.04, 0.105, 0.085),
    leatherMat
  );
  back_cover_bottom_rail.name = "back_cover_bottom_rail";
  back_cover_bottom_rail.position.set(0, -coverH * 0.5 + 0.052, 0.025);
  back_cover.add(back_cover_bottom_rail);

  const back_cover_fore_rail = new THREE.Mesh(
    new THREE.BoxGeometry(0.105, coverH - 0.04, 0.085),
    leatherMat
  );
  back_cover_fore_rail.name = "back_cover_fore_rail";
  back_cover_fore_rail.position.set(
    -coverW * 0.5 + 0.052,
    0,
    0.025
  );
  back_cover.add(back_cover_fore_rail);

  const back_cover_spine = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, coverH - 0.035, 0.11),
    leatherMat
  );
  back_cover_spine.name = "back_cover_spine";
  back_cover_spine.position.set(
    coverW * 0.5 - 0.08,
    0,
    0.035
  );
  back_cover.add(back_cover_spine);

  const back_spine_ribs = new THREE.InstancedMesh(
    spine_rib_geom,
    darkLeatherMat,
    5
  );
  back_spine_ribs.name = "back_spine_ribs";
  const back_spine_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < spine_rib_y.length; i++) {
    back_spine_rib_dummy.position.set(
      coverW * 0.5 - 0.08,
      spine_rib_y[i],
      0.045
    );
    back_spine_rib_dummy.rotation.set(0, 0, 0);
    back_spine_rib_dummy.scale.set(1, 1, 1);
    back_spine_rib_dummy.updateMatrix();
    back_spine_ribs.setMatrixAt(i, back_spine_rib_dummy.matrix);
  }
  back_spine_ribs.instanceMatrix.needsUpdate = true;
  back_cover.add(back_spine_ribs);

  const back_cover_border_points = [];
  for (let corner = 0; corner < border_corners.length; corner++) {
    const data = border_corners[corner];
    for (let i = 0; i < 5; i++) {
      const angle = data[2] + (i / 4) * Math.PI * 0.5;
      back_cover_border_points.push(
        new THREE.Vector3(
          data[0] + Math.cos(angle) * border_radius,
          data[1] + Math.sin(angle) * border_radius,
          border_z
        )
      );
    }
  }
  const back_cover_border_curve = new THREE.CatmullRomCurve3(
    back_cover_border_points,
    true,
    "centripetal"
  );
  const back_cover_border = new THREE.Mesh(
    new THREE.TubeGeometry(
      back_cover_border_curve,
      72,
      0.008,
      6,
      true
    ),
    darkLeatherMat
  );
  back_cover_border.name = "back_cover_border";
  back_cover.add(back_cover_border);

  const back_corner_protectors = new THREE.InstancedMesh(
    corner_protector_geom,
    goldMat,
    4
  );
  back_corner_protectors.name = "back_corner_protectors";
  const back_corner_dummy = new THREE.Object3D();
  for (let i = 0; i < corner_positions.length; i++) {
    back_corner_dummy.position.set(
      corner_positions[i][0],
      corner_positions[i][1],
      0.079
    );
    back_corner_dummy.rotation.set(
      0,
      0,
      corner_positions[i][2] + Math.PI
    );
    back_corner_dummy.scale.set(1, 1, 1);
    back_corner_dummy.updateMatrix();
    back_corner_protectors.setMatrixAt(i, back_corner_dummy.matrix);
  }
  back_corner_protectors.instanceMatrix.needsUpdate = true;
  back_cover.add(back_corner_protectors);

  const clasp_plate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.105, 0.105, 0.026, 24),
    goldMat
  );
  clasp_plate.name = "clasp_plate";
  clasp_plate.rotation.x = Math.PI * 0.5;
  clasp_plate.position.set(
    coverW * 0.5 - 0.08,
    -0.08,
    0.105
  );
  back_cover.add(clasp_plate);

  const clasp_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.083, 0.012, 8, 24),
    darkGoldMat
  );
  clasp_ring.name = "clasp_ring";
  clasp_ring.position.set(
    coverW * 0.5 - 0.08,
    -0.08,
    0.123
  );
  back_cover.add(clasp_ring);

  const clasp_tab = new THREE.Mesh(
    new THREE.BoxGeometry(0.27, 0.17, 0.065),
    leatherMat
  );
  clasp_tab.name = "clasp_tab";
  clasp_tab.position.set(
    coverW * 0.5 - 0.18,
    -0.08,
    0.15
  );
  back_cover.add(clasp_tab);

  const clasp_tab_round = new THREE.Mesh(
    new THREE.CylinderGeometry(0.083, 0.083, 0.065, 20),
    leatherMat
  );
  clasp_tab_round.name = "clasp_tab_round";
  clasp_tab_round.rotation.x = Math.PI * 0.5;
  clasp_tab_round.position.set(
    coverW * 0.5 - 0.315,
    -0.08,
    0.15
  );
  back_cover.add(clasp_tab_round);

  const clasp_button = new THREE.Mesh(
    new THREE.CylinderGeometry(0.047, 0.047, 0.022, 20),
    goldMat
  );
  clasp_button.name = "clasp_button";
  clasp_button.rotation.x = Math.PI * 0.5;
  clasp_button.position.set(
    coverW * 0.5 - 0.22,
    -0.08,
    0.19
  );
  back_cover.add(clasp_button);

  const clasp_button_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.037, 0.006, 6, 20),
    darkGoldMat
  );
  clasp_button_ring.name = "clasp_button_ring";
  clasp_button_ring.position.set(
    coverW * 0.5 - 0.22,
    -0.08,
    0.203
  );
  back_cover.add(clasp_button_ring);

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