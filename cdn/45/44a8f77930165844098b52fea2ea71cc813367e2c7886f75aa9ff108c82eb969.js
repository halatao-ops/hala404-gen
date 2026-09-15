export default function generate(THREE) {
  const root = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8a642,
    metalness: 0.6,
    roughness: 0.28,
  });
  const brightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf0c66a,
    metalness: 0.55,
    roughness: 0.24,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x9b6418,
    metalness: 0.5,
    roughness: 0.38,
  });
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.35,
    thickness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    ior: 2.4,
    flatShading: true,
  });
  const diamondTableMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.06,
  });
  const facetMat = new THREE.MeshStandardMaterial({
    color: 0xb8c7d8,
    metalness: 0.0,
    roughness: 0.12,
  });

  function roundedRectShape(w, h, r) {
    const x = -w / 2;
    const y = -h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function makeRoundedPlateGeometry(w, h, r, depth) {
    return new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: Math.min(depth * 0.28, 0.018),
      bevelSize: Math.min(r * 0.25, 0.025),
      bevelSegments: 3,
    });
  }

  function makeDiamondGeometry() {
    const positions = [];
    const segments = 12;
    const tableRadius = 0.052;
    const girdleRadius = 0.105;
    const tableZ = 0.052;
    const girdleZ = 0.0;
    const culetZ = -0.078;

    function addTriangle(a, b, c) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
    }

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const table0 = [Math.cos(a0) * tableRadius, Math.sin(a0) * tableRadius, tableZ];
      const table1 = [Math.cos(a1) * tableRadius, Math.sin(a1) * tableRadius, tableZ];
      const girdle0 = [Math.cos(a0) * girdleRadius, Math.sin(a0) * girdleRadius, girdleZ];
      const girdle1 = [Math.cos(a1) * girdleRadius, Math.sin(a1) * girdleRadius, girdleZ];
      const culet = [0, 0, culetZ];

      addTriangle([0, 0, tableZ], table0, table1);
      addTriangle(table0, girdle0, girdle1);
      addTriangle(table0, girdle1, table1);
      addTriangle(girdle0, culet, girdle1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    return geometry;
  }

  const diamondGeo = makeDiamondGeometry();
  const diamondTableGeo = new THREE.CylinderGeometry(0.052, 0.052, 0.008, 12);
  const facetLineGeo = new THREE.BoxGeometry(0.006, 0.09, 0.006);
  const settingBezelGeo = new THREE.TorusGeometry(0.098, 0.014, 8, 24);
  const prongGeo = new THREE.SphereGeometry(0.022, 10, 6);

  function createDiamondAssembly(size, withFacets) {
    const assembly = new THREE.Group();

    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.scale.setScalar(size);
    assembly.add(diamond);

    const diamond_table = new THREE.Mesh(diamondTableGeo, diamondTableMat);
    diamond_table.rotation.x = Math.PI / 2;
    diamond_table.position.z = 0.052 * size;
    diamond_table.scale.setScalar(size);
    assembly.add(diamond_table);

    const setting_bezel = new THREE.Mesh(settingBezelGeo, brightGoldMat);
    setting_bezel.position.z = -0.006;
    setting_bezel.scale.setScalar(size);
    assembly.add(setting_bezel);

    const prongs = new THREE.InstancedMesh(prongGeo, brightGoldMat, 4);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 4; i++) {
      const angle = Math.PI / 4 + i * Math.PI / 2;
      dummy.position.set(Math.cos(angle) * 0.098 * size, Math.sin(angle) * 0.098 * size, 0.012 * size);
      dummy.scale.setScalar(size);
      dummy.updateMatrix();
      prongs.setMatrixAt(i, dummy.matrix);
    }
    prongs.instanceMatrix.needsUpdate = true;
    assembly.add(prongs);

    if (withFacets) {
      const facet_lines = new THREE.InstancedMesh(facetLineGeo, facetMat, 4);
      for (let i = 0; i < 4; i++) {
        const angle = i * Math.PI / 2;
        dummy.position.set(Math.cos(angle) * 0.045 * size, Math.sin(angle) * 0.045 * size, 0.057 * size);
        dummy.rotation.set(0, 0, angle - Math.PI / 2);
        dummy.scale.setScalar(size);
        dummy.updateMatrix();
        facet_lines.setMatrixAt(i, dummy.matrix);
      }
      facet_lines.instanceMatrix.needsUpdate = true;
      assembly.add(facet_lines);
    }

    return assembly;
  }

  const left_cufflink = new THREE.Group();
  left_cufflink.position.set(-0.82, 0.02, -0.02);
  left_cufflink.rotation.set(-0.12, -0.18, 0.58);
  root.add(left_cufflink);

  const left_front_plate = new THREE.Mesh(makeRoundedPlateGeometry(0.46, 1.55, 0.12, 0.10), goldMat);
  left_front_plate.position.z = -0.05;
  left_cufflink.add(left_front_plate);

  const left_face_inset = new THREE.Mesh(makeRoundedPlateGeometry(0.31, 1.20, 0.07, 0.018), darkGoldMat);
  left_face_inset.position.z = 0.052;
  left_cufflink.add(left_face_inset);

  const left_upper_cap = new THREE.Mesh(makeRoundedPlateGeometry(0.54, 0.25, 0.09, 0.11), brightGoldMat);
  left_upper_cap.position.set(0, 0.66, 0.055);
  left_cufflink.add(left_upper_cap);

  const left_lower_cap = new THREE.Mesh(makeRoundedPlateGeometry(0.54, 0.27, 0.10, 0.11), brightGoldMat);
  left_lower_cap.position.set(0, -0.66, 0.055);
  left_cufflink.add(left_lower_cap);

  const left_side_rail_geom = new THREE.CylinderGeometry(0.035, 0.035, 1.18, 12);
  const left_side_rails = new THREE.InstancedMesh(left_side_rail_geom, brightGoldMat, 2);
  const railDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    railDummy.position.set(i === 0 ? -0.205 : 0.205, 0, 0.085);
    railDummy.updateMatrix();
    left_side_rails.setMatrixAt(i, railDummy.matrix);
  }
  left_side_rails.instanceMatrix.needsUpdate = true;
  left_cufflink.add(left_side_rails);

  const left_upper_diamond = createDiamondAssembly(0.92, true);
  left_upper_diamond.position.set(0, 0.43, 0.105);
  left_cufflink.add(left_upper_diamond);

  const left_lower_diamond = createDiamondAssembly(0.92, true);
  left_lower_diamond.position.set(0, -0.43, 0.105);
  left_cufflink.add(left_lower_diamond);

  const left_post_collar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.12, 24), brightGoldMat);
  left_post_collar.rotation.x = Math.PI / 2;
  left_post_collar.position.set(0, 0.42, -0.11);
  left_cufflink.add(left_post_collar);

  const left_post = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.78, 20), goldMat);
  left_post.rotation.x = Math.PI / 2;
  left_post.position.set(0, 0.42, -0.52);
  left_cufflink.add(left_post);

  const left_toggle = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.58, 8, 18), goldMat);
  left_toggle.position.set(0, 0.42, -0.96);
  left_toggle.rotation.z = Math.PI / 2;
  left_toggle.scale.z = 0.55;
  left_cufflink.add(left_toggle);

  const left_toggle_tip = new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 10), brightGoldMat);
  left_toggle_tip.position.set(0.47, 0.42, -0.96);
  left_toggle_tip.scale.set(0.75, 1.0, 0.55);
  left_cufflink.add(left_toggle_tip);

  const right_cufflink = new THREE.Group();
  right_cufflink.position.set(0.82, -0.02, 0.02);
  right_cufflink.rotation.set(0.12, 0.18, -0.58);
  root.add(right_cufflink);

  const right_front_plate = new THREE.Mesh(makeRoundedPlateGeometry(0.48, 1.62, 0.12, 0.10), goldMat);
  right_front_plate.position.z = -0.05;
  right_cufflink.add(right_front_plate);

  const right_face_inset = new THREE.Mesh(makeRoundedPlateGeometry(0.32, 1.27, 0.07, 0.018), darkGoldMat);
  right_face_inset.position.z = 0.052;
  right_cufflink.add(right_face_inset);

  const right_upper_cap = new THREE.Mesh(makeRoundedPlateGeometry(0.56, 0.26, 0.09, 0.11), brightGoldMat);
  right_upper_cap.position.set(0, 0.69, 0.055);
  right_cufflink.add(right_upper_cap);

  const right_lower_cap = new THREE.Mesh(makeRoundedPlateGeometry(0.56, 0.28, 0.10, 0.11), brightGoldMat);
  right_lower_cap.position.set(0, -0.69, 0.055);
  right_cufflink.add(right_lower_cap);

  const right_side_rail_geom = new THREE.CylinderGeometry(0.035, 0.035, 1.25, 12);
  const right_side_rails = new THREE.InstancedMesh(right_side_rail_geom, brightGoldMat, 2);
  for (let i = 0; i < 2; i++) {
    railDummy.position.set(i === 0 ? -0.215 : 0.215, 0, 0.085);
    railDummy.updateMatrix();
    right_side_rails.setMatrixAt(i, railDummy.matrix);
  }
  right_side_rails.instanceMatrix.needsUpdate = true;
  right_cufflink.add(right_side_rails);

  const right_diamond_1 = createDiamondAssembly(0.88, true);
  right_diamond_1.position.set(0, 0.50, 0.105);
  right_cufflink.add(right_diamond_1);

  const right_diamond_2 = createDiamondAssembly(0.88, true);
  right_diamond_2.position.set(0, 0.17, 0.105);
  right_cufflink.add(right_diamond_2);

  const right_diamond_3 = createDiamondAssembly(0.88, true);
  right_diamond_3.position.set(0, -0.17, 0.105);
  right_cufflink.add(right_diamond_3);

  const right_diamond_4 = createDiamondAssembly(0.88, true);
  right_diamond_4.position.set(0, -0.50, 0.105);
  right_cufflink.add(right_diamond_4);

  const right_post_collar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.12, 24), brightGoldMat);
  right_post_collar.rotation.x = Math.PI / 2;
  right_post_collar.position.set(0, 0.42, -0.11);
  right_cufflink.add(right_post_collar);

  const right_post = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.78, 20), goldMat);
  right_post.rotation.x = Math.PI / 2;
  right_post.position.set(0, 0.42, -0.52);
  right_cufflink.add(right_post);

  const right_toggle = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.58, 8, 18), goldMat);
  right_toggle.position.set(0, 0.42, -0.96);
  right_toggle.rotation.z = Math.PI / 2;
  right_toggle.scale.z = 0.55;
  right_cufflink.add(right_toggle);

  const right_toggle_tip = new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 10), brightGoldMat);
  right_toggle_tip.position.set(-0.47, 0.42, -0.96);
  right_toggle_tip.scale.set(0.75, 1.0, 0.55);
  right_cufflink.add(right_toggle_tip);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}