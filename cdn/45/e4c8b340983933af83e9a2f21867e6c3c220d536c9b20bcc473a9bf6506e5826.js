export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bamboo_hammock_chair";

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0xc99a4a,
    metalness: 0.0,
    roughness: 0.62,
  });
  const bambooLightMat = new THREE.MeshStandardMaterial({
    color: 0xd9b66f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const bambooJointMat = new THREE.MeshStandardMaterial({
    color: 0x76502b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0xd8c6a2,
    metalness: 0.0,
    roughness: 0.95,
  });
  const ropeShadowMat = new THREE.MeshStandardMaterial({
    color: 0xb9a486,
    metalness: 0.0,
    roughness: 0.95,
  });
  const footMat = new THREE.MeshStandardMaterial({
    color: 0x3b2b1d,
    metalness: 0.0,
    roughness: 0.85,
  });

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const seat_group = new THREE.Group();
  seat_group.name = "seat_group";
  root.add(seat_group);

  const lashing_group = new THREE.Group();
  lashing_group.name = "lashing_group";
  root.add(lashing_group);

  const unitBambooGeom = new THREE.CylinderGeometry(0.94, 1.0, 1, 18, 1, false);
  const unitBandGeom = new THREE.CylinderGeometry(1, 1, 1, 18);
  const unitRopeGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const unitSphereGeom = new THREE.SphereGeometry(1, 16, 10);

  function addBambooPole(name, start, end, radius, material, bandPositions) {
    const pole = new THREE.Group();
    pole.name = name;

    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );

    const shaft = new THREE.Mesh(unitBambooGeom, material);
    shaft.name = name + "_shaft";
    shaft.position.copy(midpoint);
    shaft.quaternion.copy(quaternion);
    shaft.scale.set(radius, length, radius);
    pole.add(shaft);

    for (let i = 0; i < bandPositions.length; i++) {
      const t = bandPositions[i];
      const band = new THREE.Mesh(unitBandGeom, bambooJointMat);
      band.name = name + "_joint_" + i;
      band.position.lerpVectors(start, end, t);
      band.quaternion.copy(quaternion);
      band.scale.set(radius * 1.08, 0.026, radius * 1.08);
      pole.add(band);
    }

    frame_group.add(pole);
    return pole;
  }

  function addBandOnly(name, start, end, t, radius) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
    const band = new THREE.Mesh(unitBandGeom, bambooJointMat);
    band.name = name;
    band.position.lerpVectors(start, end, t);
    band.quaternion.copy(quaternion);
    band.scale.set(radius * 1.08, 0.027, radius * 1.08);
    frame_group.add(band);
    return band;
  }

  function addRopeLoop(name, position, axis, radius, turns, tubeRadius) {
    const loop = new THREE.Group();
    loop.name = name;

    const axisUnit = axis.clone().normalize();
    const reference = Math.abs(axisUnit.y) < 0.9
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
    const basisU = new THREE.Vector3().crossVectors(axisUnit, reference).normalize();
    const basisV = new THREE.Vector3().crossVectors(axisUnit, basisU).normalize();

    for (let turn = 0; turn < turns; turn++) {
      const points = [];
      const phase = turn / turns * Math.PI * 2;
      for (let i = 0; i < 18; i++) {
        const angle = i / 18 * Math.PI * 2;
        const point = position.clone()
          .addScaledVector(axisUnit, (turn - (turns - 1) * 0.5) * tubeRadius * 2.15)
          .addScaledVector(basisU, Math.cos(angle + phase) * radius)
          .addScaledVector(basisV, Math.sin(angle + phase) * radius);
        points.push(point);
      }
      const coilGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points, true, "centripetal"),
        28,
        tubeRadius,
        6,
        true
      );
      const coil = new THREE.Mesh(coilGeom, turn % 2 === 0 ? ropeMat : ropeShadowMat);
      coil.name = name + "_coil_" + turn;
      loop.add(coil);
    }

    lashing_group.add(loop);
    return loop;
  }

  function addRopeTail(name, start, bend, end) {
    const tailGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([start, bend, end], false, "centripetal"),
      16,
      0.014,
      7,
      false
    );
    const tail = new THREE.Mesh(tailGeom, ropeMat);
    tail.name = name;
    lashing_group.add(tail);
    return tail;
  }

  const frontLeftBottom = new THREE.Vector3(-0.84, 0.0, 0.48);
  const frontLeftTop = new THREE.Vector3(-0.78, 2.18, 0.34);
  const rearLeftBottom = new THREE.Vector3(-0.72, 0.0, -0.50);
  const rearLeftTop = new THREE.Vector3(-0.78, 2.18, 0.34);
  const frontRightBottom = new THREE.Vector3(0.84, 0.0, 0.48);
  const frontRightTop = new THREE.Vector3(0.78, 2.18, 0.34);
  const rearRightBottom = new THREE.Vector3(0.72, 0.0, -0.50);
  const rearRightTop = new THREE.Vector3(0.78, 2.18, 0.34);

  const front_left_leg = addBambooPole(
    "front_left_leg",
    frontLeftBottom,
    frontLeftTop,
    0.064,
    bambooMat,
    [0.025, 0.25, 0.50, 0.74, 0.975]
  );
  const rear_left_leg = addBambooPole(
    "rear_left_leg",
    rearLeftBottom,
    rearLeftTop,
    0.061,
    bambooMat,
    [0.025, 0.28, 0.52, 0.76, 0.975]
  );
  const front_right_leg = addBambooPole(
    "front_right_leg",
    frontRightBottom,
    frontRightTop,
    0.064,
    bambooMat,
    [0.025, 0.25, 0.50, 0.74, 0.975]
  );
  const rear_right_leg = addBambooPole(
    "rear_right_leg",
    rearRightBottom,
    rearRightTop,
    0.061,
    bambooMat,
    [0.025, 0.28, 0.52, 0.76, 0.975]
  );

  const top_crossbar_start = new THREE.Vector3(-0.96, 2.18, 0.34);
  const top_crossbar_end = new THREE.Vector3(0.96, 2.18, 0.34);
  const top_crossbar = addBambooPole(
    "top_crossbar",
    top_crossbar_start,
    top_crossbar_end,
    0.057,
    bambooLightMat,
    [0.18, 0.39, 0.61, 0.82]
  );

  const front_seat_rail_start = new THREE.Vector3(-0.82, 0.43, 0.43);
  const front_seat_rail_end = new THREE.Vector3(0.82, 0.43, 0.43);
  const front_seat_rail = addBambooPole(
    "front_seat_rail",
    front_seat_rail_start,
    front_seat_rail_end,
    0.055,
    bambooLightMat,
    [0.03, 0.24, 0.50, 0.76, 0.97]
  );

  const rear_seat_rail_start = new THREE.Vector3(-0.72, 0.43, -0.43);
  const rear_seat_rail_end = new THREE.Vector3(0.72, 0.43, -0.43);
  const rear_seat_rail = addBambooPole(
    "rear_seat_rail",
    rear_seat_rail_start,
    rear_seat_rail_end,
    0.052,
    bambooMat,
    [0.03, 0.33, 0.67, 0.97]
  );

  const left_seat_rail = addBambooPole(
    "left_seat_rail",
    new THREE.Vector3(-0.76, 0.43, -0.43),
    new THREE.Vector3(-0.76, 0.43, 0.43),
    0.049,
    bambooMat,
    [0.04, 0.50, 0.96]
  );
  const right_seat_rail = addBambooPole(
    "right_seat_rail",
    new THREE.Vector3(0.76, 0.43, -0.43),
    new THREE.Vector3(0.76, 0.43, 0.43),
    0.049,
    bambooMat,
    [0.04, 0.50, 0.96]
  );

  const left_top_extension = addBandOnly(
    "left_top_extension",
    frontLeftBottom,
    frontLeftTop,
    1.005,
    0.064
  );
  const right_top_extension = addBandOnly(
    "right_top_extension",
    frontRightBottom,
    frontRightTop,
    1.005,
    0.064
  );

  const foot_cap_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0)
  );
  const foot_caps = new THREE.InstancedMesh(unitSphereGeom, footMat, 4);
  foot_caps.name = "foot_caps";
  const footDummy = new THREE.Object3D();
  const footPositions = [frontLeftBottom, rearLeftBottom, frontRightBottom, rearRightBottom];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(footPositions[i].x, -0.012, footPositions[i].z);
    footDummy.quaternion.copy(foot_cap_quaternion);
    footDummy.scale.set(0.058, 0.014, 0.058);
    footDummy.updateMatrix();
    foot_caps.setMatrixAt(i, footDummy.matrix);
  }
  foot_caps.instanceMatrix.needsUpdate = true;
  frame_group.add(foot_caps);

  const woven_stripGeom = new THREE.BoxGeometry(1, 1, 1);
  const woven_stripMat = new THREE.MeshStandardMaterial({
    color: 0xd9bd82,
    metalness: 0.0,
    roughness: 0.9,
  });

  const seat_weave_x = new THREE.InstancedMesh(woven_stripGeom, woven_stripMat, 18);
  seat_weave_x.name = "seat_weave_x";
  const weaveDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const z = -0.36 + i * (0.72 / 17);
    const edge = Math.abs(z) / 0.36;
    const width = 1.38 - edge * 0.10;
    weaveDummy.position.set(0, 0.493 + (i % 2) * 0.006, z);
    weaveDummy.rotation.set(0, 0, 0);
    weaveDummy.scale.set(width, 0.014, 0.027);
    weaveDummy.updateMatrix();
    seat_weave_x.setMatrixAt(i, weaveDummy.matrix);
  }
  seat_weave_x.instanceMatrix.needsUpdate = true;
  seat_group.add(seat_weave_x);

  const seat_weave_z = new THREE.InstancedMesh(woven_stripGeom, woven_stripMat, 27);
  seat_weave_z.name = "seat_weave_z";
  for (let i = 0; i < 27; i++) {
    const x = -0.65 + i * (1.30 / 26);
    const edge = Math.abs(x) / 0.65;
    const depth = 0.78 - edge * 0.08;
    weaveDummy.position.set(x, 0.505 - (i % 2) * 0.006, 0);
    weaveDummy.rotation.set(0, 0, 0);
    weaveDummy.scale.set(0.027, 0.014, depth);
    weaveDummy.updateMatrix();
    seat_weave_z.setMatrixAt(i, weaveDummy.matrix);
  }
  seat_weave_z.instanceMatrix.needsUpdate = true;
  seat_group.add(seat_weave_z);

  const seat_binding_x = new THREE.InstancedMesh(woven_stripGeom, ropeMat, 4);
  seat_binding_x.name = "seat_binding_x";
  const bindingXPositions = [-0.36, -0.12, 0.12, 0.36];
  for (let i = 0; i < bindingXPositions.length; i++) {
    weaveDummy.position.set(0, 0.516, bindingXPositions[i]);
    weaveDummy.rotation.set(0, 0, 0);
    weaveDummy.scale.set(1.34, 0.018, 0.018);
    weaveDummy.updateMatrix();
    seat_binding_x.setMatrixAt(i, weaveDummy.matrix);
  }
  seat_binding_x.instanceMatrix.needsUpdate = true;
  seat_group.add(seat_binding_x);

  const seat_binding_z = new THREE.InstancedMesh(woven_stripGeom, ropeMat, 6);
  seat_binding_z.name = "seat_binding_z";
  const bindingZPositions = [-0.55, -0.30, -0.10, 0.10, 0.30, 0.55];
  for (let i = 0; i < bindingZPositions.length; i++) {
    weaveDummy.position.set(bindingZPositions[i], 0.519, 0);
    weaveDummy.rotation.set(0, 0, 0);
    weaveDummy.scale.set(0.018, 0.018, 0.76);
    weaveDummy.updateMatrix();
    seat_binding_z.setMatrixAt(i, weaveDummy.matrix);
  }
  seat_binding_z.instanceMatrix.needsUpdate = true;
  seat_group.add(seat_binding_z);

  const front_left_joint_lashing = addRopeLoop(
    "front_left_joint_lashing",
    new THREE.Vector3(-0.79, 0.43, 0.43),
    new THREE.Vector3(1, 0, 0),
    0.071,
    4,
    0.014
  );
  const front_right_joint_lashing = addRopeLoop(
    "front_right_joint_lashing",
    new THREE.Vector3(0.79, 0.43, 0.43),
    new THREE.Vector3(1, 0, 0),
    0.071,
    4,
    0.014
  );
  const rear_left_joint_lashing = addRopeLoop(
    "rear_left_joint_lashing",
    new THREE.Vector3(-0.72, 0.43, -0.43),
    new THREE.Vector3(1, 0, 0),
    0.068,
    3,
    0.013
  );
  const rear_right_joint_lashing = addRopeLoop(
    "rear_right_joint_lashing",
    new THREE.Vector3(0.72, 0.43, -0.43),
    new THREE.Vector3(1, 0, 0),
    0.068,
    3,
    0.013
  );

  const left_top_lashing = addRopeLoop(
    "left_top_lashing",
    new THREE.Vector3(-0.78, 2.18, 0.34),
    new THREE.Vector3(1, 0, 0),
    0.073,
    4,
    0.014
  );
  const right_top_lashing = addRopeLoop(
    "right_top_lashing",
    new THREE.Vector3(0.78, 2.18, 0.34),
    new THREE.Vector3(1, 0, 0),
    0.073,
    4,
    0.014
  );

  const left_top_cross_lashing = addRopeLoop(
    "left_top_cross_lashing",
    new THREE.Vector3(-0.78, 2.13, 0.35),
    new THREE.Vector3(0, 1, 0),
    0.071,
    3,
    0.013
  );
  const right_top_cross_lashing = addRopeLoop(
    "right_top_cross_lashing",
    new THREE.Vector3(0.78, 2.13, 0.35),
    new THREE.Vector3(0, 1, 0),
    0.071,
    3,
    0.013
  );

  const left_top_rope_tail = addRopeTail(
    "left_top_rope_tail",
    new THREE.Vector3(-0.81, 2.16, 0.39),
    new THREE.Vector3(-0.84, 2.08, 0.43),
    new THREE.Vector3(-0.82, 1.99, 0.42)
  );
  const right_top_rope_tail = addRopeTail(
    "right_top_rope_tail",
    new THREE.Vector3(0.81, 2.16, 0.39),
    new THREE.Vector3(0.84, 2.08, 0.43),
    new THREE.Vector3(0.82, 1.99, 0.42)
  );

  const front_left_seat_rope_tail = addRopeTail(
    "front_left_seat_rope_tail",
    new THREE.Vector3(-0.80, 0.45, 0.47),
    new THREE.Vector3(-0.86, 0.42, 0.49),
    new THREE.Vector3(-0.88, 0.36, 0.48)
  );
  const front_right_seat_rope_tail = addRopeTail(
    "front_right_seat_rope_tail",
    new THREE.Vector3(0.80, 0.45, 0.47),
    new THREE.Vector3(0.86, 0.42, 0.49),
    new THREE.Vector3(0.88, 0.36, 0.48)
  );

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