export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cardboard_carrot_crate";

  const crate = new THREE.Group();
  crate.name = "crate";
  root.add(crate);

  const produce = new THREE.Group();
  produce.name = "produce";
  root.add(produce);

  const crateW = 3.2;
  const crateD = 2.5;
  const wallH = 0.72;
  const wallT = 0.12;
  const floorT = 0.1;
  const wallY = floorT + wallH / 2;
  const wallTop = floorT + wallH;

  const cardboardMat = new THREE.MeshStandardMaterial({
    color: 0xb59672,
    metalness: 0.0,
    roughness: 0.9
  });
  const innerCardboardMat = new THREE.MeshStandardMaterial({
    color: 0x9b7858,
    metalness: 0.0,
    roughness: 0.9
  });
  const corrugatedMat = new THREE.MeshStandardMaterial({
    color: 0x684b34,
    metalness: 0.0,
    roughness: 0.95
  });
  const cutCardboardMat = new THREE.MeshStandardMaterial({
    color: 0xc5a77e,
    metalness: 0.0,
    roughness: 0.9
  });
  const carrotMat = new THREE.MeshStandardMaterial({
    color: 0xe87932,
    metalness: 0.0,
    roughness: 0.7
  });
  const carrotRidgeMat = new THREE.MeshStandardMaterial({
    color: 0xf29a55,
    metalness: 0.0,
    roughness: 0.75
  });
  const carrotMarkMat = new THREE.MeshStandardMaterial({
    color: 0x80614c,
    metalness: 0.0,
    roughness: 0.9
  });
  const collarMat = new THREE.MeshStandardMaterial({
    color: 0x465137,
    metalness: 0.0,
    roughness: 0.9
  });
  const stalkMat = new THREE.MeshStandardMaterial({
    color: 0x73964b,
    metalness: 0.0,
    roughness: 0.8
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x315f24,
    metalness: 0.0,
    roughness: 0.85
  });

  const crate_floor = new THREE.Mesh(
    new THREE.BoxGeometry(crateW, floorT, crateD),
    cardboardMat
  );
  crate_floor.name = "crate_floor";
  crate_floor.position.y = floorT / 2;
  crate.add(crate_floor);

  const inner_floor = new THREE.Mesh(
    new THREE.BoxGeometry(crateW - wallT * 2, 0.025, crateD - wallT * 2),
    innerCardboardMat
  );
  inner_floor.name = "inner_floor";
  inner_floor.position.y = floorT + 0.012;
  crate.add(inner_floor);

  const front_wall = new THREE.Mesh(
    new THREE.BoxGeometry(crateW, wallH, wallT),
    cardboardMat
  );
  front_wall.name = "front_wall";
  front_wall.position.set(0, wallY, crateD / 2 - wallT / 2);
  crate.add(front_wall);

  const back_wall = new THREE.Mesh(
    new THREE.BoxGeometry(crateW, wallH, wallT),
    cardboardMat
  );
  back_wall.name = "back_wall";
  back_wall.position.set(0, wallY, -crateD / 2 + wallT / 2);
  crate.add(back_wall);

  const left_wall = new THREE.Mesh(
    new THREE.BoxGeometry(wallT, wallH, crateD - wallT * 2),
    cardboardMat
  );
  left_wall.name = "left_wall";
  left_wall.position.set(-crateW / 2 + wallT / 2, wallY, 0);
  crate.add(left_wall);

  const right_wall = new THREE.Mesh(
    new THREE.BoxGeometry(wallT, wallH, crateD - wallT * 2),
    cardboardMat
  );
  right_wall.name = "right_wall";
  right_wall.position.set(crateW / 2 - wallT / 2, wallY, 0);
  crate.add(right_wall);

  const front_inner_liner = new THREE.Mesh(
    new THREE.BoxGeometry(crateW - wallT * 2, 0.58, 0.012),
    innerCardboardMat
  );
  front_inner_liner.name = "front_inner_liner";
  front_inner_liner.position.set(0, 0.42, crateD / 2 - wallT - 0.006);
  crate.add(front_inner_liner);

  const back_inner_liner = new THREE.Mesh(
    new THREE.BoxGeometry(crateW - wallT * 2, 0.58, 0.012),
    innerCardboardMat
  );
  back_inner_liner.name = "back_inner_liner";
  back_inner_liner.position.set(0, 0.42, -crateD / 2 + wallT + 0.006);
  crate.add(back_inner_liner);

  const left_inner_liner = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.58, crateD - wallT * 2),
    innerCardboardMat
  );
  left_inner_liner.name = "left_inner_liner";
  left_inner_liner.position.set(-crateW / 2 + wallT + 0.006, 0.42, 0);
  crate.add(left_inner_liner);

  const right_inner_liner = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.58, crateD - wallT * 2),
    innerCardboardMat
  );
  right_inner_liner.name = "right_inner_liner";
  right_inner_liner.position.set(crateW / 2 - wallT - 0.006, 0.42, 0);
  crate.add(right_inner_liner);

  const front_top_edge = new THREE.Mesh(
    new THREE.BoxGeometry(crateW, 0.025, wallT + 0.015),
    cutCardboardMat
  );
  front_top_edge.name = "front_top_edge";
  front_top_edge.position.set(0, wallTop + 0.006, crateD / 2 - wallT / 2);
  crate.add(front_top_edge);

  const back_top_edge = new THREE.Mesh(
    new THREE.BoxGeometry(crateW, 0.025, wallT + 0.015),
    cutCardboardMat
  );
  back_top_edge.name = "back_top_edge";
  back_top_edge.position.set(0, wallTop + 0.006, -crateD / 2 + wallT / 2);
  crate.add(back_top_edge);

  const left_top_edge = new THREE.Mesh(
    new THREE.BoxGeometry(wallT + 0.015, 0.025, crateD - wallT * 2),
    cutCardboardMat
  );
  left_top_edge.name = "left_top_edge";
  left_top_edge.position.set(-crateW / 2 + wallT / 2, wallTop + 0.006, 0);
  crate.add(left_top_edge);

  const right_top_edge = new THREE.Mesh(
    new THREE.BoxGeometry(wallT + 0.015, 0.025, crateD - wallT * 2),
    cutCardboardMat
  );
  right_top_edge.name = "right_top_edge";
  right_top_edge.position.set(crateW / 2 - wallT / 2, wallTop + 0.006, 0);
  crate.add(right_top_edge);

  const corner_seams = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.035, wallH * 0.96, 0.035),
    corrugatedMat,
    4
  );
  corner_seams.name = "corner_seams";
  const seamDummy = new THREE.Object3D();
  const seamPositions = [
    [-crateW / 2 + 0.02, wallY, -crateD / 2 + 0.02],
    [crateW / 2 - 0.02, wallY, -crateD / 2 + 0.02],
    [-crateW / 2 + 0.02, wallY, crateD / 2 - 0.02],
    [crateW / 2 - 0.02, wallY, crateD / 2 - 0.02]
  ];
  for (let i = 0; i < seamPositions.length; i++) {
    seamDummy.position.set(
      seamPositions[i][0],
      seamPositions[i][1],
      seamPositions[i][2]
    );
    seamDummy.updateMatrix();
    corner_seams.setMatrixAt(i, seamDummy.matrix);
  }
  corner_seams.instanceMatrix.needsUpdate = true;
  crate.add(corner_seams);

  const front_handle_cut = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.22, 0.018),
    corrugatedMat
  );
  front_handle_cut.name = "front_handle_cut";
  front_handle_cut.position.set(0.55, 0.34, crateD / 2 + 0.009);
  crate.add(front_handle_cut);

  const front_handle_inner = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.13, 0.012),
    innerCardboardMat
  );
  front_handle_inner.name = "front_handle_inner";
  front_handle_inner.position.set(0.55, 0.34, crateD / 2 + 0.021);
  crate.add(front_handle_inner);

  const front_handle_flap = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 0.055, 0.025),
    cutCardboardMat
  );
  front_handle_flap.name = "front_handle_flap";
  front_handle_flap.position.set(0.55, 0.235, crateD / 2 + 0.018);
  crate.add(front_handle_flap);

  const right_handle_cut = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, 0.2, 0.7),
    corrugatedMat
  );
  right_handle_cut.name = "right_handle_cut";
  right_handle_cut.position.set(crateW / 2 + 0.009, 0.34, 0.35);
  crate.add(right_handle_cut);

  const right_handle_inner = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.12, 0.56),
    innerCardboardMat
  );
  right_handle_inner.name = "right_handle_inner";
  right_handle_inner.position.set(crateW / 2 + 0.021, 0.34, 0.35);
  crate.add(right_handle_inner);

  const front_bottom_slot = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.09, 0.018),
    corrugatedMat
  );
  front_bottom_slot.name = "front_bottom_slot";
  front_bottom_slot.position.set(-0.62, 0.12, crateD / 2 + 0.01);
  crate.add(front_bottom_slot);

  const right_bottom_slot = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, 0.09, 0.52),
    corrugatedMat
  );
  right_bottom_slot.name = "right_bottom_slot";
  right_bottom_slot.position.set(crateW / 2 + 0.01, 0.12, -0.55);
  crate.add(right_bottom_slot);

  const carrotBodyGeo = new THREE.CylinderGeometry(
    0.19,
    0.018,
    1.55,
    18,
    8
  );
  carrotBodyGeo.computeVertexNormals();

  const carrotTipGeo = new THREE.ConeGeometry(0.026, 0.18, 10);
  const carrotCollarGeo = new THREE.CylinderGeometry(
    0.145,
    0.19,
    0.12,
    14
  );
  const carrotMarkGeo = new THREE.TorusGeometry(0.1, 0.006, 5, 18);

  const carrot_ridges = new THREE.Group();
  carrot_ridges.name = "carrot_ridges";
  const ridgeHeights = [0.22, 0.43, 0.64, 0.82];
  for (let i = 0; i < ridgeHeights.length; i++) {
    const h = ridgeHeights[i];
    const radius = 0.03 + h * 0.115;
    const ridge = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.008, 5, 18),
      carrotRidgeMat
    );
    ridge.position.y = h;
    ridge.rotation.x = Math.PI / 2;
    carrot_ridges.add(ridge);
  }

  function createCarrot(index) {
    const carrot = new THREE.Group();
    carrot.name = "carrot_" + index;

    const body = new THREE.Mesh(carrotBodyGeo, carrotMat);
    body.name = "carrot_body_" + index;
    body.position.y = 0.775;
    carrot.add(body);

    const tip = new THREE.Mesh(carrotTipGeo, carrotMat);
    tip.name = "carrot_tip_" + index;
    tip.position.y = 0.045;
    tip.rotation.z = Math.PI;
    carrot.add(tip);

    const collar = new THREE.Mesh(carrotCollarGeo, collarMat);
    collar.name = "carrot_collar_" + index;
    collar.position.y = 1.59;
    carrot.add(collar);

    const marks = new THREE.InstancedMesh(
      carrotMarkGeo,
      carrotMarkMat,
      4
    );
    marks.name = "carrot_surface_marks_" + index;
    const markDummy = new THREE.Object3D();
    for (let i = 0; i < 4; i++) {
      const h = 0.28 + i * 0.25 + (index % 3) * 0.018;
      const radius = 0.03 + h * 0.115;
      const scale = radius / 0.1;
      markDummy.position.set(0, h, 0);
      markDummy.rotation.set(Math.PI / 2, 0, 0);
      markDummy.scale.setScalar(scale);
      markDummy.updateMatrix();
      marks.setMatrixAt(i, markDummy.matrix);
    }
    marks.instanceMatrix.needsUpdate = true;
    carrot.add(marks);

    const ridges = carrot_ridges.clone();
    ridges.name = "carrot_visible_ridges_" + index;
    carrot.add(ridges);

    return carrot;
  }

  const carrot_0 = createCarrot(0);
  const carrot_1 = createCarrot(1);
  const carrot_2 = createCarrot(2);
  const carrot_3 = createCarrot(3);
  const carrot_4 = createCarrot(4);
  const carrot_5 = createCarrot(5);
  const carrot_6 = createCarrot(6);
  const carrot_7 = createCarrot(7);
  const carrot_8 = createCarrot(8);
  const carrot_9 = createCarrot(9);

  const carrotData = [
    [carrot_0, -1.28, 0.29, -1.12, 0.98, 1.04, -0.035],
    [carrot_1, -1.02, 0.3, -1.3, 1.0, 1.0, 0.025],
    [carrot_2, -0.75, 0.31, -1.46, 0.96, 1.06, -0.02],
    [carrot_3, -0.48, 0.3, -1.56, 0.99, 1.02, 0.03],
    [carrot_4, -0.2, 0.31, -1.43, 1.02, 1.05, -0.025],
    [carrot_5, 0.08, 0.3, -1.57, 0.98, 1.0, 0.02],
    [carrot_6, 0.36, 0.31, -1.45, 1.01, 1.05, -0.03],
    [carrot_7, 0.64, 0.3, -1.29, 0.97, 1.02, 0.025],
    [carrot_8, 0.9, 0.31, -1.12, 1.0, 1.06, -0.02],
    [carrot_9, 1.16, 0.3, -0.93, 0.96, 1.02, 0.03]
  ];

  const xAxis = new THREE.Vector3(1, 0, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3();
  const baseQuat = new THREE.Quaternion();
  const twistQuat = new THREE.Quaternion();

  function placeCarrot(data) {
    const carrot = data[0];
    direction.set(0, data[5], data[6]).normalize();
    baseQuat.setFromUnitVectors(yAxis, direction);
    twistQuat.setFromAxisAngle(yAxis, data[4]);
    carrot.quaternion.copy(baseQuat).multiply(twistQuat);
    carrot.position.set(data[1], data[2], data[3]);
    carrot.scale.set(data[4] * 0.96, data[5], data[4]);
    produce.add(carrot);
  }

  for (let i = 0; i < carrotData.length; i++) {
    placeCarrot(carrotData[i]);
  }

  const leafSprigGeo = new THREE.ConeGeometry(0.018, 0.22, 5);
  const foliageClusterGeo = new THREE.IcosahedronGeometry(0.045, 0);

  function createFoliage() {
    const foliage = new THREE.Group();
    const sprigCount = 18;
    const clusterCount = 18;

    const sprigs = new THREE.InstancedMesh(
      leafSprigGeo,
      leafMat,
      sprigCount
    );
    sprigs.name = "foliage_sprigs";

    const clusters = new THREE.InstancedMesh(
      foliageClusterGeo,
      leafMat,
      clusterCount
    );
    clusters.name = "foliage_clusters";

    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    const p0 = new THREE.Vector3();
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    const midpoint = new THREE.Vector3();
    const dir = new THREE.Vector3();

    for (let i = 0; i < sprigCount; i++) {
      const angle = i / sprigCount * Math.PI * 2;
      const ring = i % 3;
      const baseRadius = 0.045 + ring * 0.025;
      const reach = 0.25 + ring * 0.055;

      p0.set(
        Math.cos(angle) * baseRadius,
        0.025 + ring * 0.012,
        Math.sin(angle) * baseRadius
      );
      p1.set(
        Math.cos(angle + 0.18) * reach,
        0.16 + ring * 0.035,
        Math.sin(angle + 0.18) * reach
      );
      midpoint.copy(p0).add(p1).multiplyScalar(0.5);
      dir.copy(p1).sub(p0);
      const length = dir.length();
      dir.normalize();

      dummy.position.copy(midpoint);
      dummy.quaternion.setFromUnitVectors(up, dir);
      dummy.scale.set(1, length / 0.22, 1);
      dummy.updateMatrix();
      sprigs.setMatrixAt(i, dummy.matrix);
    }

    for (let i = 0; i < clusterCount; i++) {
      const angle = i / clusterCount * Math.PI * 2 + 0.09;
      const ring = i % 3;
      const radius = 0.18 + ring * 0.075;
      dummy.position.set(
        Math.cos(angle) * radius,
        0.14 + ring * 0.045,
        Math.sin(angle) * radius
      );
      dummy.quaternion.setFromAxisAngle(up, angle);
      dummy.scale.set(
        1.0 + ring * 0.18,
        0.55 + ring * 0.08,
        0.8 + ring * 0.12
      );
      dummy.updateMatrix();
      clusters.setMatrixAt(i, dummy.matrix);
    }

    sprigs.instanceMatrix.needsUpdate = true;
    clusters.instanceMatrix.needsUpdate = true;
    foliage.add(sprigs);
    foliage.add(clusters);
    return foliage;
  }

  function createStalkBundle(source, name) {
    const bundle = new THREE.Group();
    bundle.name = name;
    const stalkCount = 6;

    for (let i = 0; i < stalkCount; i++) {
      const angle = i / stalkCount * Math.PI * 2 + 0.18;
      const spread = 0.045 + (i % 3) * 0.025;
      const lift = (i % 2) * 0.035;
      const p0 = new THREE.Vector3(
        Math.cos(angle) * 0.025,
        0,
        Math.sin(angle) * 0.025
      );
      const p1 = new THREE.Vector3(
        Math.cos(angle) * spread,
        0.22 + lift,
        Math.sin(angle) * spread
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle + 0.18) * (0.18 + (i % 3) * 0.04),
        0.48 + (i % 3) * 0.045,
        Math.sin(angle + 0.18) * (0.18 + (i % 3) * 0.04)
      );
      const path = new THREE.CatmullRomCurve3(
        [p0, p1, p2],
        false,
        "centripetal"
      );
      const stalk = new THREE.Mesh(
        new THREE.TubeGeometry(path, 8, 0.018, 6, false),
        stalkMat
      );
      stalk.name = name + "_stalk_" + i;
      bundle.add(stalk);
    }

    const foliage = createFoliage();
    foliage.name = name + "_foliage";
    foliage.position.y = 0.43;
    bundle.add(foliage);
    source.add(bundle);
    return bundle;
  }

  const stalkBaseOffset = new THREE.Vector3(0, 0.06, -0.015);

  const stalks_0 = createStalkBundle(carrot_0, "stalks_0");
  stalks_0.position.copy(stalkBaseOffset).applyQuaternion(carrot_0.quaternion);
  stalks_0.position.add(carrot_0.position);

  const stalks_1 = createStalkBundle(carrot_1, "stalks_1");
  stalks_1.position.copy(stalkBaseOffset).applyQuaternion(carrot_1.quaternion);
  stalks_1.position.add(carrot_1.position);

  const stalks_2 = createStalkBundle(carrot_2, "stalks_2");
  stalks_2.position.copy(stalkBaseOffset).applyQuaternion(carrot_2.quaternion);
  stalks_2.position.add(carrot_2.position);

  const stalks_3 = createStalkBundle(carrot_3, "stalks_3");
  stalks_3.position.copy(stalkBaseOffset).applyQuaternion(carrot_3.quaternion);
  stalks_3.position.add(carrot_3.position);

  const stalks_4 = createStalkBundle(carrot_4, "stalks_4");
  stalks_4.position.copy(stalkBaseOffset).applyQuaternion(carrot_4.quaternion);
  stalks_4.position.add(carrot_4.position);

  const stalks_5 = createStalkBundle(carrot_5, "stalks_5");
  stalks_5.position.copy(stalkBaseOffset).applyQuaternion(carrot_5.quaternion);
  stalks_5.position.add(carrot_5.position);

  const stalks_6 = createStalkBundle(carrot_6, "stalks_6");
  stalks_6.position.copy(stalkBaseOffset).applyQuaternion(carrot_6.quaternion);
  stalks_6.position.add(carrot_6.position);

  const stalks_7 = createStalkBundle(carrot_7, "stalks_7");
  stalks_7.position.copy(stalkBaseOffset).applyQuaternion(carrot_7.quaternion);
  stalks_7.position.add(carrot_7.position);

  const stalks_8 = createStalkBundle(carrot_8, "stalks_8");
  stalks_8.position.copy(stalkBaseOffset).applyQuaternion(carrot_8.quaternion);
  stalks_8.position.add(carrot_8.position);

  const stalks_9 = createStalkBundle(carrot_9, "stalks_9");
  stalks_9.position.copy(stalkBaseOffset).applyQuaternion(carrot_9.quaternion);
  stalks_9.position.add(carrot_9.position);

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