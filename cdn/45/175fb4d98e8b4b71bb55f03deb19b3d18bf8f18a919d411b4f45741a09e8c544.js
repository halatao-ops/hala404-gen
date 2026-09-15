export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "serrated_kitchen_shears";

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x4b182d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const handleHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x702a43,
    metalness: 0.0,
    roughness: 0.28,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x5b565d,
    metalness: 0.6,
    roughness: 0.4,
  });
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x77717a,
    metalness: 0.6,
    roughness: 0.4,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xc3c1c5,
    metalness: 0.5,
    roughness: 0.3,
  });
  const pivotMat = new THREE.MeshStandardMaterial({
    color: 0x918b92,
    metalness: 0.6,
    roughness: 0.3,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x171519,
    metalness: 0.2,
    roughness: 0.7,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x29262b,
    metalness: 0.2,
    roughness: 0.7,
  });

  function makeExtrudeGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 20,
      bevelEnabled: bevelSize > 0,
      bevelSegments: 3,
      bevelSize,
      bevelThickness,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeUpperHandleShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.12, 0.48);
    shape.bezierCurveTo(-0.34, 0.35, -0.53, 0.05, -0.68, -0.32);
    shape.bezierCurveTo(-0.83, -0.69, -0.99, -1.16, -1.08, -1.48);
    shape.bezierCurveTo(-1.13, -1.67, -1.03, -1.82, -0.88, -1.85);
    shape.bezierCurveTo(-0.70, -1.88, -0.61, -1.70, -0.57, -1.51);
    shape.bezierCurveTo(-0.49, -1.14, -0.34, -0.70, -0.14, -0.31);
    shape.bezierCurveTo(0.02, 0.01, 0.17, 0.29, 0.20, 0.40);
    shape.bezierCurveTo(0.22, 0.48, 0.08, 0.53, -0.12, 0.48);
    shape.closePath();
    return shape;
  }

  function makeLowerHandleShape() {
    const shape = new THREE.Shape();
    shape.moveTo(0.10, 0.43);
    shape.bezierCurveTo(0.31, 0.31, 0.51, 0.03, 0.67, -0.31);
    shape.bezierCurveTo(0.83, -0.66, 0.97, -1.10, 1.03, -1.43);
    shape.bezierCurveTo(1.08, -1.62, 0.99, -1.77, 0.85, -1.82);
    shape.bezierCurveTo(0.68, -1.86, 0.59, -1.68, 0.55, -1.49);
    shape.bezierCurveTo(0.47, -1.13, 0.34, -0.69, 0.15, -0.31);
    shape.bezierCurveTo(0.00, -0.02, -0.12, 0.28, -0.10, 0.36);
    shape.bezierCurveTo(-0.08, 0.44, 0.03, 0.48, 0.10, 0.43);
    shape.closePath();
    return shape;
  }

  function makeUpperBladeShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.08, 0.56);
    shape.bezierCurveTo(-0.31, 0.82, -0.70, 1.25, -1.12, 1.61);
    shape.bezierCurveTo(-1.25, 1.73, -1.34, 1.81, -1.39, 1.78);
    shape.bezierCurveTo(-1.43, 1.75, -1.40, 1.68, -1.35, 1.63);
    shape.bezierCurveTo(-1.10, 1.39, -0.82, 1.08, -0.58, 0.82);
    shape.lineTo(-0.38, 0.61);
    shape.lineTo(-0.18, 0.48);
    shape.closePath();
    return shape;
  }

  const upper_handleGeom = makeExtrudeGeometry(
    makeUpperHandleShape(),
    0.20,
    0.045,
    0.04
  );
  const upper_handle = new THREE.Mesh(upper_handleGeom, handleMat);
  upper_handle.name = "upper_handle";
  upper_handle.position.z = -0.045;
  root.add(upper_handle);

  const lower_handleGeom = makeExtrudeGeometry(
    makeLowerHandleShape(),
    0.20,
    0.045,
    0.04
  );
  const lower_handle = new THREE.Mesh(lower_handleGeom, handleMat);
  lower_handle.name = "lower_handle";
  lower_handle.position.z = 0.015;
  root.add(lower_handle);

  const upper_handle_ridgeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.08, 0.34, 0.105),
    new THREE.Vector3(-0.31, -0.10, 0.105),
    new THREE.Vector3(-0.56, -0.67, 0.105),
    new THREE.Vector3(-0.80, -1.25, 0.105),
    new THREE.Vector3(-0.91, -1.58, 0.105),
  ]);
  const upper_handle_ridgeGeom = new THREE.TubeGeometry(
    upper_handle_ridgeCurve,
    32,
    0.025,
    8,
    false
  );
  const upper_handle_ridge = new THREE.Mesh(
    upper_handle_ridgeGeom,
    handleHighlightMat
  );
  upper_handle_ridge.name = "upper_handle_ridge";
  root.add(upper_handle_ridge);

  const lower_handle_ridgeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.08, 0.29, 0.165),
    new THREE.Vector3(0.32, -0.12, 0.165),
    new THREE.Vector3(0.57, -0.66, 0.165),
    new THREE.Vector3(0.80, -1.22, 0.165),
    new THREE.Vector3(0.90, -1.57, 0.165),
  ]);
  const lower_handle_ridgeGeom = new THREE.TubeGeometry(
    lower_handle_ridgeCurve,
    32,
    0.025,
    8,
    false
  );
  const lower_handle_ridge = new THREE.Mesh(
    lower_handle_ridgeGeom,
    handleHighlightMat
  );
  lower_handle_ridge.name = "lower_handle_ridge";
  root.add(lower_handle_ridge);

  const upper_bladeGeom = makeExtrudeGeometry(
    makeUpperBladeShape(),
    0.08,
    0.012,
    0.012
  );
  const upper_blade = new THREE.Mesh(upper_bladeGeom, bladeMat);
  upper_blade.name = "upper_blade";
  upper_blade.position.z = -0.015;
  root.add(upper_blade);

  const upper_blade_edgeShape = new THREE.Shape();
  upper_blade_edgeShape.moveTo(-1.39, 1.78);
  upper_blade_edgeShape.bezierCurveTo(-1.34, 1.80, -1.25, 1.73, -1.12, 1.61);
  upper_blade_edgeShape.bezierCurveTo(-0.78, 1.30, -0.48, 0.96, -0.29, 0.73);
  upper_blade_edgeShape.lineTo(-0.39, 0.67);
  upper_blade_edgeShape.bezierCurveTo(-0.69, 1.05, -1.05, 1.43, -1.35, 1.68);
  upper_blade_edgeShape.closePath();
  const upper_blade_edgeGeom = makeExtrudeGeometry(
    upper_blade_edgeShape,
    0.018,
    0,
    0
  );
  const upper_blade_edge = new THREE.Mesh(upper_blade_edgeGeom, edgeMat);
  upper_blade_edge.name = "upper_blade_edge";
  upper_blade_edge.position.z = 0.045;
  root.add(upper_blade_edge);

  const upper_blade_spineCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.37, 1.70, 0.045),
    new THREE.Vector3(-1.08, 1.42, 0.045),
    new THREE.Vector3(-0.79, 1.13, 0.045),
    new THREE.Vector3(-0.57, 0.83, 0.045),
    new THREE.Vector3(-0.39, 0.62, 0.045),
  ]);
  const upper_blade_spineGeom = new THREE.TubeGeometry(
    upper_blade_spineCurve,
    28,
    0.012,
    6,
    false
  );
  const upper_blade_spine = new THREE.Mesh(
    upper_blade_spineGeom,
    engravingMat
  );
  upper_blade_spine.name = "upper_blade_spine";
  root.add(upper_blade_spine);

  const upper_blade_teethShape = new THREE.Shape();
  upper_blade_teethShape.moveTo(0, -0.026);
  upper_blade_teethShape.lineTo(0.078, 0);
  upper_blade_teethShape.lineTo(0, 0.026);
  upper_blade_teethShape.closePath();
  const upper_blade_teethGeom = makeExtrudeGeometry(
    upper_blade_teethShape,
    0.075,
    0,
    0
  );
  const upper_blade_teeth = new THREE.InstancedMesh(
    upper_blade_teethGeom,
    edgeMat,
    18
  );
  upper_blade_teeth.name = "upper_blade_teeth";
  const upper_tooth_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const t = i / 17;
    upper_tooth_dummy.position.set(
      -0.385 + 0.67 * t,
      0.615 + 0.59 * t,
      0.025
    );
    upper_tooth_dummy.rotation.set(0, 0, 2.27);
    upper_tooth_dummy.updateMatrix();
    upper_blade_teeth.setMatrixAt(i, upper_tooth_dummy.matrix);
  }
  upper_blade_teeth.instanceMatrix.needsUpdate = true;
  root.add(upper_blade_teeth);

  const upper_pivot_armShape = new THREE.Shape();
  upper_pivot_armShape.moveTo(-0.43, 0.31);
  upper_pivot_armShape.lineTo(-0.25, 0.68);
  upper_pivot_armShape.bezierCurveTo(-0.12, 0.91, 0.08, 1.02, 0.28, 0.98);
  upper_pivot_armShape.bezierCurveTo(0.47, 0.94, 0.56, 0.77, 0.58, 0.58);
  upper_pivot_armShape.lineTo(0.67, 0.12);
  upper_pivot_armShape.bezierCurveTo(0.55, 0.02, 0.39, -0.01, 0.24, 0.04);
  upper_pivot_armShape.lineTo(0.04, 0.14);
  upper_pivot_armShape.bezierCurveTo(-0.08, 0.20, -0.23, 0.23, -0.43, 0.31);
  upper_pivot_armShape.closePath();
  const upper_pivot_armGeom = makeExtrudeGeometry(
    upper_pivot_armShape,
    0.12,
    0.018,
    0.018
  );
  const upper_pivot_arm = new THREE.Mesh(upper_pivot_armGeom, metalMat);
  upper_pivot_arm.name = "upper_pivot_arm";
  upper_pivot_arm.position.z = 0.055;
  root.add(upper_pivot_arm);

  const lower_serrated_jawShape = new THREE.Shape();
  lower_serrated_jawShape.moveTo(0.04, 0.15);
  lower_serrated_jawShape.lineTo(0.24, 0.04);
  lower_serrated_jawShape.lineTo(0.58, -0.29);
  lower_serrated_jawShape.bezierCurveTo(0.64, -0.35, 0.68, -0.39, 0.72, -0.40);
  lower_serrated_jawShape.lineTo(0.57, -0.49);
  lower_serrated_jawShape.lineTo(0.20, -0.17);
  lower_serrated_jawShape.lineTo(0.02, -0.04);
  lower_serrated_jawShape.closePath();
  const lower_serrated_jawGeom = makeExtrudeGeometry(
    lower_serrated_jawShape,
    0.11,
    0.012,
    0.012
  );
  const lower_serrated_jaw = new THREE.Mesh(
    lower_serrated_jawGeom,
    metalMat
  );
  lower_serrated_jaw.name = "lower_serrated_jaw";
  lower_serrated_jaw.position.z = 0.075;
  root.add(lower_serrated_jaw);

  const lower_jaw_teethShape = new THREE.Shape();
  lower_jaw_teethShape.moveTo(-0.026, 0);
  lower_jaw_teethShape.lineTo(0.026, 0);
  lower_jaw_teethShape.lineTo(0, -0.072);
  lower_jaw_teethShape.closePath();
  const lower_jaw_teethGeom = makeExtrudeGeometry(
    lower_jaw_teethShape,
    0.105,
    0,
    0
  );
  const lower_jaw_teeth = new THREE.InstancedMesh(
    lower_jaw_teethGeom,
    darkMat,
    8
  );
  lower_jaw_teeth.name = "lower_jaw_teeth";
  const lower_tooth_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    lower_tooth_dummy.position.set(
      0.10 + 0.25 * t,
      0.075 - 0.25 * t,
      0.085
    );
    lower_tooth_dummy.rotation.set(0, 0, -0.77);
    lower_tooth_dummy.updateMatrix();
    lower_jaw_teeth.setMatrixAt(i, lower_tooth_dummy.matrix);
  }
  lower_jaw_teeth.instanceMatrix.needsUpdate = true;
  root.add(lower_jaw_teeth);

  const pivot_backplateGeom = new THREE.CylinderGeometry(
    0.255,
    0.255,
    0.055,
    32
  );
  const pivot_backplate = new THREE.Mesh(pivot_backplateGeom, darkMat);
  pivot_backplate.name = "pivot_backplate";
  pivot_backplate.rotation.x = Math.PI / 2;
  pivot_backplate.position.set(0.10, 0.58, 0.135);
  root.add(pivot_backplate);

  const pivot_boltGeom = new THREE.CylinderGeometry(
    0.215,
    0.215,
    0.075,
    32
  );
  const pivot_bolt = new THREE.Mesh(pivot_boltGeom, pivotMat);
  pivot_bolt.name = "pivot_bolt";
  pivot_bolt.rotation.x = Math.PI / 2;
  pivot_bolt.position.set(0.10, 0.58, 0.175);
  root.add(pivot_bolt);

  const pivot_bolt_ringGeom = new THREE.TorusGeometry(
    0.218,
    0.014,
    8,
    32
  );
  const pivot_bolt_ring = new THREE.Mesh(pivot_bolt_ringGeom, darkMat);
  pivot_bolt_ring.name = "pivot_bolt_ring";
  pivot_bolt_ring.position.set(0.10, 0.58, 0.215);
  root.add(pivot_bolt_ring);

  const handle_screwGeom = new THREE.CylinderGeometry(
    0.072,
    0.072,
    0.05,
    20
  );
  const handle_screw = new THREE.Mesh(handle_screwGeom, darkMat);
  handle_screw.name = "handle_screw";
  handle_screw.rotation.x = Math.PI / 2;
  handle_screw.position.set(0.39, 0.10, 0.185);
  root.add(handle_screw);

  const screw_slot_horizontalGeom = new THREE.BoxGeometry(
    0.092,
    0.014,
    0.012
  );
  const screw_slot_horizontal = new THREE.Mesh(
    screw_slot_horizontalGeom,
    engravingMat
  );
  screw_slot_horizontal.name = "screw_slot_horizontal";
  screw_slot_horizontal.position.set(0.39, 0.10, 0.215);
  screw_slot_horizontal.rotation.z = 0.68;
  root.add(screw_slot_horizontal);

  const screw_slot_verticalGeom = new THREE.BoxGeometry(
    0.014,
    0.092,
    0.012
  );
  const screw_slot_vertical = new THREE.Mesh(
    screw_slot_verticalGeom,
    engravingMat
  );
  screw_slot_vertical.name = "screw_slot_vertical";
  screw_slot_vertical.position.set(0.39, 0.10, 0.216);
  screw_slot_vertical.rotation.z = 0.68;
  root.add(screw_slot_vertical);

  const maker_mark_ringGeom = new THREE.TorusGeometry(
    0.052,
    0.007,
    6,
    20
  );
  const maker_mark_ring = new THREE.Mesh(
    maker_mark_ringGeom,
    engravingMat
  );
  maker_mark_ring.name = "maker_mark_ring";
  maker_mark_ring.position.set(-0.17, 0.34, 0.132);
  root.add(maker_mark_ring);

  const maker_mark_centerGeom = new THREE.CircleGeometry(0.014, 12);
  const maker_mark_center = new THREE.Mesh(
    maker_mark_centerGeom,
    engravingMat
  );
  maker_mark_center.name = "maker_mark_center";
  maker_mark_center.position.set(-0.17, 0.34, 0.133);
  root.add(maker_mark_center);

  const maker_mark_petalsGeom = new THREE.CircleGeometry(0.017, 10);
  const maker_mark_petals = new THREE.InstancedMesh(
    maker_mark_petalsGeom,
    engravingMat,
    4
  );
  maker_mark_petals.name = "maker_mark_petals";
  const petal_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    petal_dummy.position.set(
      -0.17 + Math.cos(angle) * 0.032,
      0.34 + Math.sin(angle) * 0.032,
      0.134
    );
    petal_dummy.rotation.set(0, 0, angle);
    petal_dummy.scale.set(1.25, 0.65, 1);
    petal_dummy.updateMatrix();
    maker_mark_petals.setMatrixAt(i, petal_dummy.matrix);
  }
  maker_mark_petals.instanceMatrix.needsUpdate = true;
  root.add(maker_mark_petals);

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