export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "spiral_notebook";

  const cover_assembly = new THREE.Group();
  cover_assembly.name = "cover_assembly";
  root.add(cover_assembly);

  const binding_assembly = new THREE.Group();
  binding_assembly.name = "binding_assembly";
  root.add(binding_assembly);

  const title_assembly = new THREE.Group();
  title_assembly.name = "title_assembly";
  root.add(title_assembly);

  const coverMat = new THREE.MeshStandardMaterial({
    color: 0x5b172b,
    metalness: 0.0,
    roughness: 0.9
  });
  const coverEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x43101f,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xd8d0bd,
    metalness: 0.0,
    roughness: 0.8
  });
  const page_lineMat = new THREE.MeshStandardMaterial({
    color: 0xaaa28f,
    metalness: 0.0,
    roughness: 0.8
  });
  const bindingMat = new THREE.MeshStandardMaterial({
    color: 0x171719,
    metalness: 0.5,
    roughness: 0.3
  });
  const binding_holesMat = new THREE.MeshStandardMaterial({
    color: 0x080809,
    metalness: 0.0,
    roughness: 0.8
  });
  const gold_titleMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.4
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  const page_blockShape = makeRoundedRectShape(0.96, 1.27, 0.025);
  const page_blockGeom = new THREE.ExtrudeGeometry(page_blockShape, {
    depth: 0.085,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2
  });
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.name = "page_block";
  page_block.position.set(0.035, 0, -0.0425);
  cover_assembly.add(page_block);

  const coverShape = makeRoundedRectShape(1.02, 1.38, 0.035);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: 0.025,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 3
  });

  const back_cover = new THREE.Mesh(coverGeom, coverMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0, 0, -0.083);
  cover_assembly.add(back_cover);

  const front_cover = new THREE.Mesh(coverGeom, coverMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0, 0, 0.05);
  cover_assembly.add(front_cover);

  const page_edge_linesGeom = new THREE.BoxGeometry(0.006, 0.003, 0.072);
  const page_edge_lines = new THREE.InstancedMesh(
    page_edge_linesGeom,
    page_lineMat,
    12
  );
  page_edge_lines.name = "page_edge_lines";
  const page_line_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    page_line_dummy.position.set(0.528, -0.55 + i * 0.1, 0);
    page_line_dummy.updateMatrix();
    page_edge_lines.setMatrixAt(i, page_line_dummy.matrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  cover_assembly.add(page_edge_lines);

  const spine_hingeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.29, 12);
  const spine_hinge = new THREE.Mesh(spine_hingeGeom, coverEdgeMat);
  spine_hinge.name = "spine_hinge";
  spine_hinge.position.set(-0.486, 0, 0.084);
  cover_assembly.add(spine_hinge);

  const binding_holesGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.007, 16);
  const binding_holes = new THREE.InstancedMesh(
    binding_holesGeom,
    binding_holesMat,
    11
  );
  binding_holes.name = "binding_holes";
  const hole_dummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    hole_dummy.position.set(-0.486, 0.55 - i * 0.11, 0.091);
    hole_dummy.rotation.set(Math.PI / 2, 0, 0);
    hole_dummy.updateMatrix();
    binding_holes.setMatrixAt(i, hole_dummy.matrix);
  }
  binding_holes.instanceMatrix.needsUpdate = true;
  binding_assembly.add(binding_holes);

  const spiral_bindingGeom = new THREE.TorusGeometry(0.085, 0.009, 10, 32);
  const spiral_binding = new THREE.InstancedMesh(
    spiral_bindingGeom,
    bindingMat,
    11
  );
  spiral_binding.name = "spiral_binding";
  const ring_dummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    ring_dummy.position.set(-0.565, 0.55 - i * 0.11, 0);
    ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    ring_dummy.updateMatrix();
    spiral_binding.setMatrixAt(i, ring_dummy.matrix);
  }
  spiral_binding.instanceMatrix.needsUpdate = true;
  binding_assembly.add(spiral_binding);

  const glyph_strokes = {
    H: [
      [0, 0, 0, 1], [1, 0, 1, 1], [0, 0.5, 1, 0.5]
    ],
    R: [
      [0, 0, 0, 1], [0, 1, 0.78, 1], [0.78, 1, 1, 0.82],
      [1, 0.82, 1, 0.58], [1, 0.58, 0.78, 0.5],
      [0, 0.5, 0.78, 0.5], [0.48, 0.5, 1, 0]
    ],
    E: [
      [0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.82, 0.5],
      [0, 0, 1, 0]
    ],
    I: [
      [0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0]
    ],
    M: [
      [0, 0, 0, 1], [0, 1, 0.5, 0.48],
      [0.5, 0.48, 1, 1], [1, 1, 1, 0]
    ],
    P: [
      [0, 0, 0, 1], [0, 1, 0.78, 1],
      [0.78, 1, 1, 0.82], [1, 0.82, 1, 0.58],
      [1, 0.58, 0.78, 0.5], [0, 0.5, 0.78, 0.5]
    ],
    C: [
      [1, 1, 0.2, 1], [0.2, 1, 0, 0.8],
      [0, 0.8, 0, 0.2], [0, 0.2, 0.2, 0],
      [0.2, 0, 1, 0]
    ],
    O: [
      [0.2, 1, 0.8, 1], [0.8, 1, 1, 0.8],
      [1, 0.8, 1, 0.2], [1, 0.2, 0.8, 0],
      [0.8, 0, 0.2, 0], [0.2, 0, 0, 0.2],
      [0, 0.2, 0, 0.8], [0, 0.8, 0.2, 1]
    ],
    A: [
      [0, 0, 0.5, 1], [0.5, 1, 1, 0],
      [0.2, 0.42, 0.8, 0.42]
    ],
    N: [
      [0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1]
    ],
    "/": [
      [0.08, 0, 0.92, 1]
    ]
  };

  const title_strokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function createStrokeText(text, height, stroke, spacing, material) {
    const charWidth = height * 0.58;
    const advance = charWidth + spacing;
    const totalWidth = text.length > 0
      ? (text.length - 1) * advance + charWidth
      : 0;
    const segments = [];

    for (let i = 0; i < text.length; i++) {
      const glyph = glyph_strokes[text[i]] || [];
      const offsetX = -totalWidth / 2 + i * advance;
      for (const segment of glyph) {
        segments.push([
          offsetX + segment[0] * charWidth,
          (segment[1] - 0.5) * height,
          offsetX + segment[2] * charWidth,
          (segment[3] - 0.5) * height
        ]);
      }
    }

    const text_mesh = new THREE.InstancedMesh(
      title_strokeGeom,
      material,
      segments.length
    );
    const stroke_dummy = new THREE.Object3D();

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const dx = segment[2] - segment[0];
      const dy = segment[3] - segment[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      stroke_dummy.position.set(
        (segment[0] + segment[2]) / 2,
        (segment[1] + segment[3]) / 2,
        0
      );
      stroke_dummy.rotation.set(0, 0, Math.atan2(dy, dx));
      stroke_dummy.scale.set(length + stroke * 0.35, stroke, 0.006);
      stroke_dummy.updateMatrix();
      text_mesh.setMatrixAt(i, stroke_dummy.matrix);
    }

    text_mesh.instanceMatrix.needsUpdate = true;
    return text_mesh;
  }

  const gold_title_line_one = createStrokeText(
    "HR/EIM",
    0.09,
    0.008,
    0.012,
    gold_titleMat
  );
  gold_title_line_one.name = "gold_title_line_one";
  gold_title_line_one.position.set(0.08, 0.18, 0.091);
  title_assembly.add(gold_title_line_one);

  const gold_title_line_two = createStrokeText(
    "PICEEROAN",
    0.09,
    0.008,
    0.008,
    gold_titleMat
  );
  gold_title_line_two.name = "gold_title_line_two";
  gold_title_line_two.position.set(0.08, 0.065, 0.091);
  title_assembly.add(gold_title_line_two);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}