export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_cookbook";

  const bookW = 1.18;
  const bookH = 1.52;
  const bookD = 0.28;
  const coverT = 0.035;
  const frontSurfaceZ = bookD / 2 + coverT;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x5a3428,
    metalness: 0.0,
    roughness: 0.78
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x3d211d,
    metalness: 0.0,
    roughness: 0.82
  });
  const edgeLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x76503c,
    metalness: 0.0,
    roughness: 0.82
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xd8c7a3,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0x9f8c6d,
    metalness: 0.0,
    roughness: 0.9
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6bd68,
    metalness: 0.65,
    roughness: 0.3
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x9f843d,
    metalness: 0.5,
    roughness: 0.38
  });
  const grainMat = new THREE.LineBasicMaterial({
    color: 0x2f1715,
    transparent: true,
    opacity: 0.32
  });
  const wearMat = new THREE.LineBasicMaterial({
    color: 0xa47750,
    transparent: true,
    opacity: 0.55
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  const coverShape = roundedRectShape(bookW, bookH, 0.075);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: coverT,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });

  const front_cover = new THREE.Mesh(coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.z = bookD / 2;
  root.add(front_cover);

  const back_cover = new THREE.Mesh(coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.z = -bookD / 2 - coverT;
  root.add(back_cover);

  const page_block = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 1.40, 0.22),
    pageMat
  );
  page_block.name = "page_block";
  page_block.position.set(0.025, 0, 0);
  root.add(page_block);

  const spine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 1.46, 32),
    leatherMat
  );
  spine.name = "spine";
  spine.position.set(-0.56, 0, 0);
  spine.scale.set(0.62, 1, 1);
  root.add(spine);

  const hinge_ridge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 1.39, 14),
    edgeLeatherMat
  );
  hinge_ridge.name = "hinge_ridge";
  hinge_ridge.position.set(-0.49, 0, frontSurfaceZ - 0.004);
  root.add(hinge_ridge);

  const hinge_shadow = new THREE.Mesh(
    new THREE.CylinderGeometry(0.007, 0.007, 1.37, 10),
    darkLeatherMat
  );
  hinge_shadow.name = "hinge_shadow";
  hinge_shadow.position.set(-0.465, 0, frontSurfaceZ + 0.002);
  root.add(hinge_shadow);

  const pageLineGeom = new THREE.BoxGeometry(0.006, 0.0025, 0.205);
  const page_lines = new THREE.InstancedMesh(pageLineGeom, pageLineMat, 18);
  page_lines.name = "page_lines";
  const pageDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    pageDummy.position.set(0.568, -0.63 + i * 0.074, 0);
    pageDummy.updateMatrix();
    page_lines.setMatrixAt(i, pageDummy.matrix);
  }
  page_lines.instanceMatrix.needsUpdate = true;
  root.add(page_lines);

  const spineBandGeom = new THREE.TorusGeometry(0.145, 0.012, 8, 32);
  const spine_bands = new THREE.InstancedMesh(
    spineBandGeom,
    edgeLeatherMat,
    5
  );
  spine_bands.name = "spine_bands";
  const bandDummy = new THREE.Object3D();
  const bandY = [0.55, 0.25, -0.12, -0.45, -0.65];
  for (let i = 0; i < bandY.length; i++) {
    bandDummy.position.set(-0.56, bandY[i], 0);
    bandDummy.rotation.set(Math.PI / 2, 0, 0);
    bandDummy.scale.set(0.68, 1, 1);
    bandDummy.updateMatrix();
    spine_bands.setMatrixAt(i, bandDummy.matrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_bands);

  const spinePanelGeom = new THREE.PlaneGeometry(0.11, 0.17);
  const spine_panels = new THREE.InstancedMesh(
    spinePanelGeom,
    darkLeatherMat,
    3
  );
  spine_panels.name = "spine_panels";
  const panelDummy = new THREE.Object3D();
  const panelY = [0.40, 0.06, -0.55];
  for (let i = 0; i < panelY.length; i++) {
    panelDummy.position.set(-0.56, panelY[i], 0.164);
    panelDummy.rotation.set(0, 0, 0);
    panelDummy.scale.set(1, 1, 1);
    panelDummy.updateMatrix();
    spine_panels.setMatrixAt(i, panelDummy.matrix);
  }
  spine_panels.instanceMatrix.needsUpdate = true;
  root.add(spine_panels);

  const spineGoldGeom = new THREE.BoxGeometry(0.055, 0.006, 0.004);
  const spine_gold_marks = new THREE.InstancedMesh(
    spineGoldGeom,
    goldMat,
    12
  );
  spine_gold_marks.name = "spine_gold_marks";
  const markDummy = new THREE.Object3D();
  let markIndex = 0;
  for (let p = 0; p < panelY.length; p++) {
    for (let j = 0; j < 4; j++) {
      markDummy.position.set(
        -0.56,
        panelY[p] + 0.045 - j * 0.03,
        0.168
      );
      markDummy.rotation.set(0, 0, 0);
      markDummy.scale.set(1 - j * 0.12, 1, 1);
      markDummy.updateMatrix();
      spine_gold_marks.setMatrixAt(markIndex++, markDummy.matrix);
    }
  }
  spine_gold_marks.instanceMatrix.needsUpdate = true;
  root.add(spine_gold_marks);

  const front_decoration = new THREE.Group();
  front_decoration.name = "front_decoration";
  front_decoration.position.z = frontSurfaceZ + 0.006;
  root.add(front_decoration);

  const grainPositions = [];
  for (let i = 0; i < 150; i++) {
    const x = -0.50 + (((i * 37) % 149) / 148) * 1.0;
    const y = -0.69 + (((i * 61) % 151) / 150) * 1.38;
    const len = 0.012 + ((i * 17) % 13) * 0.002;
    const angle = (((i * 29) % 180) / 180) * Math.PI;
    const dx = Math.cos(angle) * len;
    const dy = Math.sin(angle) * len * 0.55;
    grainPositions.push(x - dx, y - dy, 0);
    grainPositions.push(x + dx, y + dy, 0);
  }
  const leather_grain = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute(grainPositions, 3)
    )
  );
  leather_grain.name = "leather_grain";
  front_decoration.add(leather_grain);

  const wearPositions = [];
  for (let i = 0; i < 42; i++) {
    const side = i % 4;
    const t = ((i * 19) % 43) / 42;
    const len = 0.018 + ((i * 7) % 9) * 0.003;
    if (side === 0) {
      const x = -0.50 + t;
      wearPositions.push(x, 0.716, 0.001, x + len, 0.708, 0.001);
    } else if (side === 1) {
      const x = -0.50 + t;
      wearPositions.push(x, -0.716, 0.001, x + len, -0.707, 0.001);
    } else if (side === 2) {
      const y = -0.66 + t * 1.32;
      wearPositions.push(0.558, y, 0.001, 0.548, y + len, 0.001);
    } else {
      const y = -0.66 + t * 1.32;
      wearPositions.push(-0.558, y, 0.001, -0.547, y + len, 0.001);
    }
  }
  const edge_wear = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute(wearPositions, 3)
    )
  );
  edge_wear.name = "edge_wear";
  front_decoration.add(edge_wear);

  function addRectFrame(name, w, h, t, mat, z) {
    const frame = new THREE.Group();
    frame.name = name;

    const horizontalGeom = new THREE.BoxGeometry(w, t, 0.004);
    const verticalGeom = new THREE.BoxGeometry(t, h, 0.004);

    const top = new THREE.Mesh(horizontalGeom, mat);
    top.position.set(0, h / 2, z);
    frame.add(top);

    const bottom = new THREE.Mesh(horizontalGeom, mat);
    bottom.position.set(0, -h / 2, z);
    frame.add(bottom);

    const left = new THREE.Mesh(verticalGeom, mat);
    left.position.set(-w / 2, 0, z);
    frame.add(left);

    const right = new THREE.Mesh(verticalGeom, mat);
    right.position.set(w / 2, 0, z);
    frame.add(right);

    front_decoration.add(frame);
    return frame;
  }

  const outer_gold_border = addRectFrame(
    "outer_gold_border",
    1.00,
    1.34,
    0.009,
    goldMat,
    0.003
  );
  const inner_gold_border = addRectFrame(
    "inner_gold_border",
    0.94,
    1.28,
    0.005,
    darkGoldMat,
    0.004
  );

  const borderDotGeom = new THREE.BoxGeometry(0.006, 0.014, 0.003);
  const border_dots = new THREE.InstancedMesh(
    borderDotGeom,
    goldMat,
    84
  );
  border_dots.name = "border_dots";
  const dotDummy = new THREE.Object3D();
  let dotIndex = 0;
  for (let i = 0; i < 24; i++) {
    const x = -0.43 + i * (0.86 / 23);
    for (const y of [-0.625, 0.625]) {
      dotDummy.position.set(x, y, 0.006);
      dotDummy.rotation.set(0, 0, 0);
      dotDummy.scale.set(1, 1, 1);
      dotDummy.updateMatrix();
      border_dots.setMatrixAt(dotIndex++, dotDummy.matrix);
    }
  }
  for (let i = 0; i < 18; i++) {
    const y = -0.55 + i * (1.10 / 17);
    for (const x of [-0.475, 0.475]) {
      dotDummy.position.set(x, y, 0.006);
      dotDummy.rotation.set(0, 0, Math.PI / 2);
      dotDummy.scale.set(1, 1, 1);
      dotDummy.updateMatrix();
      border_dots.setMatrixAt(dotIndex++, dotDummy.matrix);
    }
  }
  border_dots.instanceMatrix.needsUpdate = true;
  front_decoration.add(border_dots);

  const titleStrokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function glyphSegments(ch) {
    if (ch === "M") {
      return [
        [0, 0, 0, 1], [0, 1, 0.5, 0.48],
        [0.5, 0.48, 1, 1], [1, 1, 1, 0]
      ];
    }
    if (ch === "S") {
      return [
        [0.95, 0.92, 0.2, 0.98], [0.2, 0.98, 0.04, 0.78],
        [0.04, 0.78, 0.82, 0.55], [0.82, 0.55, 0.96, 0.35],
        [0.96, 0.35, 0.78, 0.08], [0.78, 0.08, 0.12, 0.04]
      ];
    }
    if (ch === "T") {
      return [[0, 1, 1, 1], [0.5, 1, 0.5, 0]];
    }
    if (ch === "O") {
      return [
        [0.2, 0.04, 0.8, 0.04], [0.8, 0.04, 0.98, 0.22],
        [0.98, 0.22, 0.98, 0.78], [0.98, 0.78, 0.8, 0.96],
        [0.8, 0.96, 0.2, 0.96], [0.2, 0.96, 0.02, 0.78],
        [0.02, 0.78, 0.02, 0.22], [0.02, 0.22, 0.2, 0.04]
      ];
    }
    if (ch === "R") {
      return [
        [0.05, 0, 0.05, 1], [0.05, 0.95, 0.72, 0.95],
        [0.72, 0.95, 0.95, 0.75], [0.95, 0.75, 0.72, 0.52],
        [0.72, 0.52, 0.05, 0.52], [0.55, 0.52, 1, 0]
      ];
    }
    if (ch === "C") {
      return [
        [0.92, 0.9, 0.22, 0.98], [0.22, 0.98, 0.04, 0.78],
        [0.04, 0.78, 0.04, 0.22], [0.04, 0.22, 0.22, 0.03],
        [0.22, 0.03, 0.9, 0.1]
      ];
    }
    if (ch === "N") {
      return [
        [0.05, 0, 0.05, 1], [0.05, 1, 0.95, 0],
        [0.95, 0, 0.95, 1]
      ];
    }
    if (ch === "K") {
      return [
        [0.05, 0, 0.05, 1], [0.05, 0.48, 0.95, 1],
        [0.05, 0.48, 0.95, 0]
      ];
    }
    if (ch === "I") {
      return [[0.05, 1, 0.95, 1], [0.5, 1, 0.5, 0], [0.05, 0, 0.95, 0]];
    }
    if (ch === "E") {
      return [
        [0.08, 0, 0.08, 1], [0.08, 0.95, 0.95, 0.95],
        [0.08, 0.5, 0.78, 0.5], [0.08, 0.05, 0.95, 0.05]
      ];
    }
    return [];
  }

  function createWord(name, text, height, totalWidth, baseline) {
    const word = new THREE.Group();
    word.name = name;
    const gap = 0.18;
    const glyphW = totalWidth / (text.length + (text.length - 1) * gap);
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      count += glyphSegments(text[i]).length;
    }

    const strokes = new THREE.InstancedMesh(
      titleStrokeGeom,
      goldMat,
      count
    );
    strokes.name = name + "_strokes";

    const dummy = new THREE.Object3D();
    const thickness = height * 0.085;
    let index = 0;

    for (let i = 0; i < text.length; i++) {
      const segments = glyphSegments(text[i]);
      const offsetX = -totalWidth / 2 + i * glyphW * (1 + gap);

      for (const seg of segments) {
        const x1 = offsetX + seg[0] * glyphW;
        const y1 = baseline + seg[1] * height;
        const x2 = offsetX + seg[2] * glyphW;
        const y2 = baseline + seg[3] * height;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);

        dummy.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.008);
        dummy.rotation.set(0, 0, Math.atan2(dy, dx));
        dummy.scale.set(length + thickness * 0.35, thickness, 0.005);
        dummy.updateMatrix();
        strokes.setMatrixAt(index++, dummy.matrix);
      }
    }

    strokes.instanceMatrix.needsUpdate = true;
    word.add(strokes);
    return word;
  }

  const title_top = createWord("MSTOR", "MSTOR", 0.19, 0.72, 0.29);
  front_decoration.add(title_top);

  const title_bottom = createWord("CRNOKIE", "CRNOKIE", 0.18, 0.86, 0.04);
  front_decoration.add(title_bottom);

  function addStroke(parent, name, x1, y1, x2, y2, width, mat, z) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const stroke = new THREE.Mesh(titleStrokeGeom, mat);
    stroke.name = name;
    stroke.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    stroke.rotation.z = Math.atan2(dy, dx);
    stroke.scale.set(length, width, 0.004);
    parent.add(stroke);
    return stroke;
  }

  function addCurve(parent, name, coords, width, mat, closed) {
    const points = [];
    for (const p of coords) {
      points.push(new THREE.Vector3(p[0], p[1], 0.008));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    const curveGeom = new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length * 4),
      width,
      6,
      false
    );
    const curveMesh = new THREE.Mesh(curveGeom, mat);
    curveMesh.name = name;
    parent.add(curveMesh);
    return curveMesh;
  }

  const corner_flourishes = new THREE.Group();
  corner_flourishes.name = "corner_flourishes";
  front_decoration.add(corner_flourishes);

  for (const side of [-1, 1]) {
    addCurve(
      corner_flourishes,
      side < 0 ? "left_upper_vine" : "right_upper_vine",
      [
        [side * 0.43, 0.57],
        [side * 0.405, 0.51],
        [side * 0.37, 0.45],
        [side * 0.31, 0.405]
      ],
      0.0032,
      goldMat,
      false
    );
    addCurve(
      corner_flourishes,
      side < 0 ? "left_upper_scroll" : "right_upper_scroll",
      [
        [side * 0.43, 0.57],
        [side * 0.36, 0.60],
        [side * 0.31, 0.575],
        [side * 0.33, 0.535],
        [side * 0.37, 0.545]
      ],
      0.0028,
      goldMat,
      false
    );
    addStroke(
      corner_flourishes,
      side < 0 ? "left_upper_leaf" : "right_upper_leaf",
      side * 0.39,
      0.49,
      side * 0.32,
      0.455,
      0.004,
      goldMat,
      0.008
    );
    addStroke(
      corner_flourishes,
      side < 0 ? "left_lower_leaf" : "right_lower_leaf",
      side * 0.35,
      0.445,
      side * 0.285,
      0.425,
      0.004,
      goldMat,
      0.008
    );
  }

  const leafGeom = new THREE.CircleGeometry(0.025, 16);
  const corner_leaves = new THREE.InstancedMesh(leafGeom, goldMat, 8);
  corner_leaves.name = "corner_leaves";
  const leafDummy = new THREE.Object3D();
  let leafIndex = 0;
  for (const side of [-1, 1]) {
    const leafData = [
      [side * 0.405, 0.535, -side * 0.7, 1.0],
      [side * 0.365, 0.485, side * 0.75, 0.85],
      [side * 0.325, 0.435, -side * 0.55, 0.75],
      [side * 0.385, 0.585, side * 1.05, 0.7]
    ];
    for (const leaf of leafData) {
      leafDummy.position.set(leaf[0], leaf[1], 0.009);
      leafDummy.rotation.set(0, 0, leaf[2]);
      leafDummy.scale.set(leaf[3], 0.38, 1);
      leafDummy.updateMatrix();
      corner_leaves.setMatrixAt(leafIndex++, leafDummy.matrix);
    }
  }
  corner_leaves.instanceMatrix.needsUpdate = true;
  corner_flourishes.add(corner_leaves);

  const ornamental_utensils = new THREE.Group();
  ornamental_utensils.name = "ornamental_utensils";
  front_decoration.add(ornamental_utensils);

  const left_spoon = new THREE.Group();
  left_spoon.name = "left_spoon";
  left_spoon.position.set(-0.31, -0.18, 0);
  left_spoon.rotation.z = -0.55;
  ornamental_utensils.add(left_spoon);

  addStroke(left_spoon, "left_spoon_handle", 0, -0.17, 0, 0.10, 0.012, goldMat, 0.008);
  addStroke(left_spoon, "left_spoon_handle_highlight", 0.004, -0.15, 0.004, 0.08, 0.003, darkGoldMat, 0.009);
  addCurve(left_spoon, "left_spoon_bowl", [
    [-0.045, 0.10], [-0.065, 0.16], [-0.045, 0.22],
    [0, 0.245], [0.045, 0.22], [0.065, 0.16], [0.045, 0.10]
  ], 0.0035, goldMat, true);
  for (let i = -2; i <= 2; i++) {
    addStroke(
      left_spoon,
      "left_spoon_bowl_line_" + i,
      i * 0.012,
      0.115,
      i * 0.018,
      0.205,
      0.0022,
      darkGoldMat,
      0.009
    );
  }

  const center_ladle = new THREE.Group();
  center_ladle.name = "center_ladle";
  center_ladle.position.set(-0.08, -0.20, 0);
  center_ladle.rotation.z = 0.18;
  ornamental_utensils.add(center_ladle);

  addStroke(center_ladle, "center_ladle_handle", 0, -0.19, 0, 0.07, 0.013, goldMat, 0.008);
  addCurve(center_ladle, "center_ladle_bowl", [
    [-0.075, 0.07], [-0.095, 0.15], [-0.075, 0.25],
    [-0.025, 0.30], [0.055, 0.285], [0.095, 0.21],
    [0.085, 0.12], [0.045, 0.07]
  ], 0.0038, goldMat, true);
  for (let i = -3; i <= 3; i++) {
    addStroke(
      center_ladle,
      "center_ladle_bowl_line_" + i,
      i * 0.018,
      0.095,
      i * 0.025,
      0.255,
      0.0022,
      darkGoldMat,
      0.009
    );
  }

  const top_chef_knife = new THREE.Group();
  top_chef_knife.name = "top_chef_knife";
  top_chef_knife.position.set(0.16, 0.02, 0);
  top_chef_knife.rotation.z = 0.28;
  ornamental_utensils.add(top_chef_knife);

  addStroke(top_chef_knife, "top_chef_blade", -0.17, 0, 0.07, 0, 0.012, goldMat, 0.008);
  addStroke(top_chef_knife, "top_chef_blade_highlight", -0.14, 0.012, 0.055, 0.012, 0.0025, darkGoldMat, 0.009);
  addStroke(top_chef_knife, "top_chef_handle", 0.07, 0, 0.22, 0, 0.018, goldMat, 0.008);
  addStroke(top_chef_knife, "top_chef_handle_inset", 0.085, 0.012, 0.205, 0.012, 0.003, darkGoldMat, 0.009);

  const right_carving_knife = new THREE.Group();
  right_carving_knife.name = "right_carving_knife";
  right_carving_knife.position.set(0.25, -0.12, 0);
  right_carving_knife.rotation.z = -0.62;
  ornamental_utensils.add(right_carving_knife);

  addStroke(right_carving_knife, "right_carving_blade", -0.12, 0, 0.08, 0, 0.010, goldMat, 0.008);
  addStroke(right_carving_knife, "right_carving_handle", 0.08, 0, 0.23, 0, 0.018, goldMat, 0.008);
  addCurve(right_carving_knife, "right_carving_guard", [
    [0.065, -0.025], [0.09, -0.035], [0.11, -0.015], [0.105, 0.025]
  ], 0.003, goldMat, false);

  const lower_knife = new THREE.Group();
  lower_knife.name = "lower_knife";
  lower_knife.position.set(0.08, -0.48, 0);
  lower_knife.rotation.z = -0.72;
  ornamental_utensils.add(lower_knife);

  addStroke(lower_knife, "lower_knife_blade", -0.18, 0, 0.08, 0, 0.013, goldMat, 0.008);
  addStroke(lower_knife, "lower_knife_handle", 0.08, 0, 0.24, 0, 0.019, goldMat, 0.008);
  addStroke(lower_knife, "lower_knife_bolster", 0.065, 0, 0.105, 0, 0.026, darkGoldMat, 0.009);

  const right_spatula = new THREE.Group();
  right_spatula.name = "right_spatula";
  right_spatula.position.set(0.39, -0.25, 0);
  right_spatula.rotation.z = -0.10;
  ornamental_utensils.add(right_spatula);

  addStroke(right_spatula, "right_spatula_handle", 0, -0.18, 0, 0.08, 0.018, goldMat, 0.008);
  addCurve(right_spatula, "right_spatula_head", [
    [-0.055, 0.08], [-0.075, 0.14], [-0.07, 0.29],
    [-0.045, 0.34], [0.045, 0.34], [0.07, 0.29],
    [0.075, 0.14], [0.055, 0.08]
  ], 0.0038, goldMat, true);
  for (let i = -2; i <= 2; i++) {
    addStroke(
      right_spatula,
      "right_spatula_slot_" + i,
      i * 0.022,
      0.11,
      i * 0.018,
      0.30,
      0.0025,
      darkGoldMat,
      0.009
    );
  }

  const bottom_fork = new THREE.Group();
  bottom_fork.name = "bottom_fork";
  bottom_fork.position.set(0.27, -0.51, 0);
  bottom_fork.rotation.z = 0.04;
  ornamental_utensils.add(bottom_fork);

  addStroke(bottom_fork, "bottom_fork_handle", 0, -0.12, 0, 0.08, 0.017, goldMat, 0.008);
  addStroke(bottom_fork, "bottom_fork tine_left", -0.035, 0.06, -0.035, 0.20, 0.004, goldMat, 0.008);
  addStroke(bottom_fork, "bottom_fork tine_center", 0, 0.06, 0, 0.21, 0.004, goldMat, 0.008);
  addStroke(bottom_fork, "bottom_fork tine_right", 0.035, 0.06, 0.035, 0.20, 0.004, goldMat, 0.008);

  const measuring_cup = new THREE.Group();
  measuring_cup.name = "measuring_cup";
  measuring_cup.position.set(0.40, -0.56, 0);
  ornamental_utensils.add(measuring_cup);

  addCurve(measuring_cup, "measuring_cup_body", [
    [-0.075, -0.07], [-0.065, 0.08], [0.065, 0.08], [0.075, -0.07]
  ], 0.0035, goldMat, false);
  addStroke(measuring_cup, "measuring_cup_rim", -0.07, 0.08, 0.07, 0.08, 0.005, goldMat, 0.008);
  addStroke(measuring_cup, "measuring_cup_base", -0.065, -0.07, 0.065, -0.07, 0.004, darkGoldMat, 0.008);
  addCurve(measuring_cup, "measuring_cup_handle", [
    [0.07, 0.055], [0.13, 0.055], [0.15, 0.015],
    [0.13, -0.035], [0.075, -0.04]
  ], 0.0035, goldMat, false);
  addStroke(measuring_cup, "measuring_cup_spout", -0.07, 0.055, -0.125, 0.075, 0.004, goldMat, 0.008);

  const basket = new THREE.Group();
  basket.name = "basket";
  basket.position.set(-0.29, -0.56, 0);
  basket.rotation.z = -0.18;
  ornamental_utensils.add(basket);

  addStroke(basket, "basket_top", -0.11, 0.08, 0.11, 0.08, 0.004, goldMat, 0.008);
  addStroke(basket, "basket_bottom", -0.075, -0.10, 0.075, -0.10, 0.004, goldMat, 0.008);
  addCurve(basket, "basket_left_side", [
    [-0.11, 0.08], [-0.095, 0.01], [-0.075, -0.10]
  ], 0.003, goldMat, false);
  addCurve(basket, "basket_right_side", [
    [0.11, 0.08], [0.095, 0.01], [0.075, -0.10]
  ], 0.003, goldMat, false);
  for (let i = -2; i <= 2; i++) {
    addStroke(
      basket,
      "basket_vertical_" + i,
      i * 0.035,
      0.075,
      i * 0.025,
      -0.095,
      0.0022,
      darkGoldMat,
      0.009
    );
  }
  for (let i = 0; i < 3; i++) {
    addStroke(
      basket,
      "basket_horizontal_" + i,
      -0.09 + i * 0.012,
      0.045 - i * 0.055,
      0.09 - i * 0.012,
      0.045 - i * 0.055,
      0.0022,
      darkGoldMat,
      0.009
    );
  }

  const small_spoon = new THREE.Group();
  small_spoon.name = "small_spoon";
  small_spoon.position.set(-0.43, -0.08, 0);
  small_spoon.rotation.z = -0.28;
  ornamental_utensils.add(small_spoon);

  addStroke(small_spoon, "small_spoon_handle", 0, -0.11, 0, 0.07, 0.009, goldMat, 0.008);
  addCurve(small_spoon, "small_spoon_bowl", [
    [-0.035, 0.07], [-0.045, 0.12], [-0.025, 0.16],
    [0.025, 0.16], [0.045, 0.12], [0.035, 0.07]
  ], 0.0028, goldMat, true);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}