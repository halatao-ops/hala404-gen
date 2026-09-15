export default function generate(THREE) {
  const root = new THREE.Group();
  const book = new THREE.Group();
  root.add(book);

  const coverMat = new THREE.MeshStandardMaterial({
    color: 0xe7dcc3,
    metalness: 0.0,
    roughness: 0.9,
  });
  const coverEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xd7c8aa,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xd8cfbd,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xb9ad96,
    metalness: 0.0,
    roughness: 0.9,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4a63a,
    metalness: 0.6,
    roughness: 0.4,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  const coverShape = roundedRectShape(0.72, 1.0, 0.035);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.006,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  coverGeom.translate(0, 0, -0.009);

  const back_cover = new THREE.Mesh(coverGeom, coverMat);
  back_cover.position.set(0.008, 0, -0.064);
  book.add(back_cover);

  const pageShape = roundedRectShape(0.65, 0.92, 0.022);
  const pageGeom = new THREE.ExtrudeGeometry(pageShape, {
    depth: 0.094,
    steps: 1,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.003,
    bevelOffset: 0,
    bevelSegments: 2,
  });
  pageGeom.translate(0, 0, -0.047);

  const page_block = new THREE.Mesh(pageGeom, pageMat);
  page_block.position.set(0.012, -0.004, 0);
  book.add(page_block);

  const fore_edgeGeom = new THREE.BoxGeometry(0.012, 0.86, 0.088);
  const fore_edge = new THREE.Mesh(fore_edgeGeom, pageEdgeMat);
  fore_edge.position.set(0.339, -0.006, 0);
  book.add(fore_edge);

  const top_page_edgeGeom = new THREE.BoxGeometry(0.61, 0.01, 0.088);
  const top_page_edge = new THREE.Mesh(top_page_edgeGeom, pageEdgeMat);
  top_page_edge.position.set(0.012, 0.458, 0);
  book.add(top_page_edge);

  const bottom_page_edge = new THREE.Mesh(top_page_edgeGeom, pageEdgeMat);
  bottom_page_edge.position.set(0.012, -0.466, 0);
  book.add(bottom_page_edge);

  const pageLineGeom = new THREE.BoxGeometry(0.014, 0.0015, 0.084);
  const page_edge_lines = new THREE.InstancedMesh(pageLineGeom, pageMat, 12);
  const pageLineDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    pageLineDummy.position.set(0.346, -0.39 + i * 0.07, 0);
    pageLineDummy.updateMatrix();
    page_edge_lines.setMatrixAt(i, pageLineDummy.matrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  book.add(page_edge_lines);

  const front_cover = new THREE.Mesh(coverGeom, coverMat);
  front_cover.position.set(0, 0, 0.064);
  book.add(front_cover);

  const spineGeom = new THREE.CapsuleGeometry(0.038, 0.924, 8, 16);
  const spine = new THREE.Mesh(spineGeom, coverEdgeMat);
  spine.position.set(-0.354, 0, 0);
  spine.scale.set(1, 1, 2.05);
  book.add(spine);

  const hingeGeom = new THREE.CylinderGeometry(0.0055, 0.0055, 0.91, 12);
  const front_hinge = new THREE.Mesh(hingeGeom, coverEdgeMat);
  front_hinge.position.set(-0.319, 0, 0.078);
  book.add(front_hinge);

  const back_hinge = new THREE.Mesh(hingeGeom, coverEdgeMat);
  back_hinge.position.set(-0.311, 0, -0.078);
  book.add(back_hinge);

  const front_cover_border = new THREE.Group();
  const borderVerticalGeom = new THREE.CylinderGeometry(0.0035, 0.0035, 0.91, 10);
  const borderHorizontalGeom = new THREE.CylinderGeometry(0.0035, 0.0035, 0.64, 10);

  const border_left = new THREE.Mesh(borderVerticalGeom, coverEdgeMat);
  border_left.position.set(-0.326, 0, 0.079);
  front_cover_border.add(border_left);

  const border_right = new THREE.Mesh(borderVerticalGeom, coverEdgeMat);
  border_right.position.set(0.326, 0, 0.079);
  front_cover_border.add(border_right);

  const border_top = new THREE.Mesh(borderHorizontalGeom, coverEdgeMat);
  border_top.rotation.z = Math.PI / 2;
  border_top.position.set(0, 0.462, 0.079);
  front_cover_border.add(border_top);

  const border_bottom = new THREE.Mesh(borderHorizontalGeom, coverEdgeMat);
  border_bottom.rotation.z = Math.PI / 2;
  border_bottom.position.set(0, -0.462, 0.079);
  front_cover_border.add(border_bottom);

  book.add(front_cover_border);

  const glyphSegments = {
    P: [
      [0, 0, 0, 1], [0, 1, 0.72, 1],
      [0.72, 1, 0.72, 0.55], [0, 0.55, 0.72, 0.55],
    ],
    R: [
      [0, 0, 0, 1], [0, 1, 0.72, 1],
      [0.72, 1, 0.72, 0.55], [0, 0.55, 0.72, 0.55],
      [0.42, 0.55, 0.82, 0],
    ],
    N: [
      [0, 0, 0, 1], [0, 1, 0.82, 0],
      [0.82, 0, 0.82, 1],
    ],
    C: [
      [0.78, 1, 0.08, 1], [0.08, 1, 0, 0.88],
      [0, 0.88, 0, 0.12], [0, 0.12, 0.08, 0],
      [0.08, 0, 0.78, 0],
    ],
    T: [
      [0, 1, 0.86, 1], [0.43, 1, 0.43, 0],
    ],
    H: [
      [0, 0, 0, 1], [0.82, 0, 0.82, 1],
      [0, 0.52, 0.82, 0.52],
    ],
    O: [
      [0.1, 0, 0.72, 0], [0.72, 0, 0.82, 0.12],
      [0.82, 0.12, 0.82, 0.88], [0.82, 0.88, 0.72, 1],
      [0.72, 1, 0.1, 1], [0.1, 1, 0, 0.88],
      [0, 0.88, 0, 0.12], [0, 0.12, 0.1, 0],
    ],
    I: [
      [0, 1, 0.76, 1], [0.38, 1, 0.38, 0],
      [0, 0, 0.76, 0],
    ],
    E: [
      [0, 0, 0, 1], [0, 1, 0.78, 1],
      [0, 0.52, 0.68, 0.52], [0, 0, 0.78, 0],
    ],
    L: [
      [0, 1, 0, 0], [0, 0, 0.78, 0],
    ],
    A: [
      [0, 0, 0.1, 1], [0.1, 1, 0.72, 1],
      [0.72, 1, 0.82, 0], [0.05, 0.5, 0.77, 0.5],
    ],
    S: [
      [0.78, 1, 0.1, 1], [0.1, 1, 0, 0.88],
      [0, 0.88, 0, 0.56], [0, 0.56, 0.72, 0.56],
      [0.72, 0.56, 0.78, 0.1], [0.78, 0.1, 0.1, 0],
    ],
    D: [
      [0, 0, 0, 1], [0, 1, 0.62, 1],
      [0.62, 1, 0.8, 0.82], [0.8, 0.82, 0.8, 0.18],
      [0.8, 0.18, 0.62, 0], [0.62, 0, 0, 0],
    ],
  };

  const goldStrokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function createStrokeText(text, height, stroke, depth, material) {
    const charWidth = height * 0.58;
    const gap = height * 0.16;
    const totalWidth = text.length * charWidth + Math.max(0, text.length - 1) * gap;
    const segments = [];

    for (let i = 0; i < text.length; i++) {
      const glyph = glyphSegments[text[i]] || glyphSegments.I;
      const glyphLeft = -totalWidth / 2 + i * (charWidth + gap);
      for (const segment of glyph) {
        segments.push([
          glyphLeft + segment[0] * charWidth,
          (segment[1] - 0.5) * height,
          glyphLeft + segment[2] * charWidth,
          (segment[3] - 0.5) * height,
        ]);
      }
    }

    const textMesh = new THREE.InstancedMesh(
      goldStrokeGeom,
      material,
      segments.length
    );
    const dummy = new THREE.Object3D();

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const dx = segment[2] - segment[0];
      const dy = segment[3] - segment[1];
      const length = Math.sqrt(dx * dx + dy * dy);

      dummy.position.set(
        (segment[0] + segment[2]) / 2,
        (segment[1] + segment[3]) / 2,
        0
      );
      dummy.rotation.set(0, 0, Math.atan2(dy, dx));
      dummy.scale.set(length + stroke * 0.12, stroke, depth);
      dummy.updateMatrix();
      textMesh.setMatrixAt(i, dummy.matrix);
    }

    textMesh.instanceMatrix.needsUpdate = true;
    return textMesh;
  }

  const title_line_one = createStrokeText(
    "PRNCTHOT",
    0.075,
    0.006,
    0.004,
    goldMat
  );
  title_line_one.position.set(0.006, 0.255, 0.081);
  book.add(title_line_one);

  const title_line_two = createStrokeText(
    "PRNICETOTI",
    0.075,
    0.006,
    0.004,
    goldMat
  );
  title_line_two.position.set(0.006, 0.158, 0.081);
  book.add(title_line_two);

  const publisher_line = createStrokeText(
    "PERELLI ARE C SAON",
    0.027,
    0.0025,
    0.003,
    goldMat
  );
  publisher_line.position.set(0.008, -0.35, 0.081);
  book.add(publisher_line);

  book.rotation.set(0, 0.14, -0.025);

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