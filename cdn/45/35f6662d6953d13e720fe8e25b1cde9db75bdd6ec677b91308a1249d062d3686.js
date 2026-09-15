export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "leather_lounge_chair";

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x292b2e,
    metalness: 0.0,
    roughness: 0.45,
  });
  const cushionMat = new THREE.MeshStandardMaterial({
    color: 0x303236,
    metalness: 0.0,
    roughness: 0.42,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.7,
  });

  function makeRoundedBoxGeometry(w, h, d, r) {
    const hw = w / 2;
    const hh = h / 2;
    const cr = Math.min(r, hw * 0.9, hh * 0.9);
    const shape = new THREE.Shape();

    shape.moveTo(-hw + cr, -hh);
    shape.lineTo(hw - cr, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + cr);
    shape.lineTo(hw, hh - cr);
    shape.quadraticCurveTo(hw, hh, hw - cr, hh);
    shape.lineTo(-hw + cr, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - cr);
    shape.lineTo(-hw, -hh + cr);
    shape.quadraticCurveTo(-hw, -hh, -hw + cr, -hh);
    shape.closePath();

    const bevel = Math.min(cr * 0.38, d * 0.22);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      curveSegments: 8,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -d / 2);
    return geometry;
  }

  function makeRoundedLoopXY(w, h, r, z) {
    const hw = w / 2;
    const hh = h / 2;
    const points = [
      new THREE.Vector3(-hw + r, -hh, z),
      new THREE.Vector3(hw - r, -hh, z),
      new THREE.Vector3(hw, -hh + r, z),
      new THREE.Vector3(hw, hh - r, z),
      new THREE.Vector3(hw - r, hh, z),
      new THREE.Vector3(-hw + r, hh, z),
      new THREE.Vector3(-hw, hh - r, z),
      new THREE.Vector3(-hw, -hh + r, z),
    ];
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  function makeRoundedLoopXZ(w, d, r, y) {
    const hw = w / 2;
    const hd = d / 2;
    const points = [
      new THREE.Vector3(-hw + r, y, -hd),
      new THREE.Vector3(hw - r, y, -hd),
      new THREE.Vector3(hw, y, -hd + r),
      new THREE.Vector3(hw, y, hd - r),
      new THREE.Vector3(hw - r, y, hd),
      new THREE.Vector3(-hw + r, y, hd),
      new THREE.Vector3(-hw, y, hd - r),
      new THREE.Vector3(-hw, y, -hd + r),
    ];
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const base_shell = new THREE.Group();
  base_shell.name = "base_shell";
  root.add(base_shell);

  const base_bodyGeom = makeRoundedBoxGeometry(2.02, 0.38, 2.92, 0.15);
  const base_body = new THREE.Mesh(base_bodyGeom, leatherMat);
  base_body.name = "base_body";
  base_body.position.set(0, 0.22, 0);
  base_shell.add(base_body);

  const front_apronGeom = makeRoundedBoxGeometry(1.98, 0.34, 0.16, 0.12);
  const front_apron = new THREE.Mesh(front_apronGeom, leatherMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.22, 1.43);
  base_shell.add(front_apron);

  const front_top_seamGeom = new THREE.TubeGeometry(
    makeRoundedLoopXZ(1.96, 2.88, 0.15, 0.425),
    64,
    0.011,
    6,
    true
  );
  const front_top_seam = new THREE.Mesh(front_top_seamGeom, seamMat);
  front_top_seam.name = "front_top_seam";
  base_shell.add(front_top_seam);

  const bottom_edge_seamGeom = new THREE.TubeGeometry(
    makeRoundedLoopXZ(1.98, 2.88, 0.14, 0.055),
    64,
    0.009,
    6,
    true
  );
  const bottom_edge_seam = new THREE.Mesh(bottom_edge_seamGeom, seamMat);
  bottom_edge_seam.name = "bottom_edge_seam";
  base_shell.add(bottom_edge_seam);

  const front_vertical_seamsGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.27,
    6
  );
  const front_vertical_seams = new THREE.InstancedMesh(
    front_vertical_seamsGeom,
    seamMat,
    2
  );
  front_vertical_seams.name = "front_vertical_seams";
  const front_seam_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    front_seam_dummy.position.set(i === 0 ? -0.93 : 0.93, 0.22, 1.525);
    front_seam_dummy.updateMatrix();
    front_vertical_seams.setMatrixAt(i, front_seam_dummy.matrix);
  }
  front_vertical_seams.instanceMatrix.needsUpdate = true;
  base_shell.add(front_vertical_seams);

  const side_bolsters = new THREE.Group();
  side_bolsters.name = "side_bolsters";
  root.add(side_bolsters);

  const side_bolsterGeom = makeRoundedBoxGeometry(0.42, 0.34, 2.16, 0.17);

  const left_side_bolster = new THREE.Mesh(side_bolsterGeom, leatherMat);
  left_side_bolster.name = "left_side_bolster";
  left_side_bolster.position.set(-0.81, 0.5, 0.38);
  side_bolsters.add(left_side_bolster);

  const right_side_bolster = new THREE.Mesh(side_bolsterGeom, leatherMat);
  right_side_bolster.name = "right_side_bolster";
  right_side_bolster.position.set(0.81, 0.5, 0.38);
  side_bolsters.add(right_side_bolster);

  const side_bolster_seamGeom = new THREE.TubeGeometry(
    makeRoundedLoopXZ(0.39, 2.1, 0.15, 0.675),
    48,
    0.009,
    6,
    true
  );

  const left_bolster_seam = new THREE.Mesh(
    side_bolster_seamGeom,
    seamMat
  );
  left_bolster_seam.name = "left_bolster_seam";
  left_bolster_seam.position.set(-0.81, 0, 0.38);
  side_bolsters.add(left_bolster_seam);

  const right_bolster_seam = new THREE.Mesh(
    side_bolster_seamGeom,
    seamMat
  );
  right_bolster_seam.name = "right_bolster_seam";
  right_bolster_seam.position.set(0.81, 0, 0.38);
  side_bolsters.add(right_bolster_seam);

  const side_wrinkleGeom = new THREE.CylinderGeometry(
    0.005,
    0.007,
    0.11,
    6
  );
  const side_bolster_wrinkles = new THREE.InstancedMesh(
    side_wrinkleGeom,
    seamMat,
    20
  );
  side_bolster_wrinkles.name = "side_bolster_wrinkles";
  const wrinkle_dummy = new THREE.Object3D();
  let wrinkle_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < 10; i++) {
      wrinkle_dummy.position.set(
        side * 0.81,
        0.682,
        -0.48 + i * 0.19
      );
      wrinkle_dummy.rotation.set(
        0,
        0,
        side * (0.08 + (i % 3) * 0.025)
      );
      wrinkle_dummy.scale.set(1, 0.72 + (i % 4) * 0.08, 1);
      wrinkle_dummy.updateMatrix();
      side_bolster_wrinkles.setMatrixAt(
        wrinkle_index++,
        wrinkle_dummy.matrix
      );
    }
  }
  side_bolster_wrinkles.instanceMatrix.needsUpdate = true;
  side_bolsters.add(side_bolster_wrinkles);

  const seat_cushionGeom = makeRoundedBoxGeometry(1.25, 0.22, 1.9, 0.16);
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, cushionMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, 0.51, 0.38);
  root.add(seat_cushion);

  const seat_top_seamGeom = new THREE.TubeGeometry(
    makeRoundedLoopXZ(1.2, 1.84, 0.15, 0.635),
    56,
    0.009,
    6,
    true
  );
  const seat_top_seam = new THREE.Mesh(seat_top_seamGeom, seamMat);
  seat_top_seam.name = "seat_top_seam";
  seat_top_seam.position.set(0, 0, 0.38);
  root.add(seat_top_seam);

  const seat_center_crease_points = [
    new THREE.Vector3(-0.015, 0.638, -0.28),
    new THREE.Vector3(0.025, 0.64, -0.08),
    new THREE.Vector3(-0.018, 0.639, 0.13),
    new THREE.Vector3(0.012, 0.637, 0.34),
  ];
  const seat_center_creaseGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      seat_center_crease_points,
      false,
      "centripetal"
    ),
    20,
    0.005,
    6,
    false
  );
  const seat_center_crease = new THREE.Mesh(
    seat_center_creaseGeom,
    seamMat
  );
  seat_center_crease.name = "seat_center_crease";
  root.add(seat_center_crease);

  const backrest = new THREE.Group();
  backrest.name = "backrest";
  backrest.position.set(0, 0.94, -1.05);
  backrest.rotation.x = -0.18;
  root.add(backrest);

  const back_shellGeom = makeRoundedBoxGeometry(1.96, 1.18, 0.2, 0.18);
  const back_shell = new THREE.Mesh(back_shellGeom, leatherMat);
  back_shell.name = "back_shell";
  back_shell.position.z = -0.08;
  backrest.add(back_shell);

  const back_cushionGeom = makeRoundedBoxGeometry(1.82, 1.05, 0.34, 0.2);
  const back_cushion = new THREE.Mesh(back_cushionGeom, cushionMat);
  back_cushion.name = "back_cushion";
  back_cushion.position.z = 0.08;
  backrest.add(back_cushion);

  const back_edge_pipingGeom = new THREE.TubeGeometry(
    makeRoundedLoopXY(1.77, 1.0, 0.19, 0.315),
    64,
    0.01,
    6,
    true
  );
  const back_edge_piping = new THREE.Mesh(
    back_edge_pipingGeom,
    seamMat
  );
  back_edge_piping.name = "back_edge_piping";
  backrest.add(back_edge_piping);

  const back_wrinkleGeom = new THREE.CylinderGeometry(
    0.005,
    0.008,
    0.14,
    6
  );
  const back_wrinkles = new THREE.InstancedMesh(
    back_wrinkleGeom,
    seamMat,
    8
  );
  back_wrinkles.name = "back_wrinkles";
  const back_wrinkle_dummy = new THREE.Object3D();

  for (let i = 0; i < 8; i++) {
    const side = i < 4 ? -1 : 1;
    const j = i % 4;
    back_wrinkle_dummy.position.set(
      side * (0.55 + j * 0.09),
      -0.34 + j * 0.22,
      0.322
    );
    back_wrinkle_dummy.rotation.set(
      0,
      0,
      side * (-0.22 + j * 0.11)
    );
    back_wrinkle_dummy.scale.set(
      1,
      0.7 + ((j + 1) % 3) * 0.12,
      1
    );
    back_wrinkle_dummy.updateMatrix();
    back_wrinkles.setMatrixAt(i, back_wrinkle_dummy.matrix);
  }
  back_wrinkles.instanceMatrix.needsUpdate = true;
  backrest.add(back_wrinkles);

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