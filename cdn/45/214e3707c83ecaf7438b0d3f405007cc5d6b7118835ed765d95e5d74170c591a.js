export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wingback_armchair";

  const upholstery = new THREE.Group();
  upholstery.name = "upholstery";
  root.add(upholstery);

  const wooden_frame = new THREE.Group();
  wooden_frame.name = "wooden_frame";
  root.add(wooden_frame);

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x0b3658,
    metalness: 0.0,
    roughness: 0.95
  });
  const velvetDarkMat = new THREE.MeshStandardMaterial({
    color: 0x062744,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x041b30,
    metalness: 0.0,
    roughness: 0.95
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x082b49,
    metalness: 0.0,
    roughness: 0.95
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x59301f,
    metalness: 0.2,
    roughness: 0.5
  });

  function makeTube(points, radius, material, closed = false) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const tubeGeo = new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length * 6),
      radius,
      8,
      closed
    );
    return new THREE.Mesh(tubeGeo, material);
  }

  const seat_baseGeom = new THREE.BoxGeometry(1.34, 0.22, 0.88);
  const seat_base = new THREE.Mesh(seat_baseGeom, velvetDarkMat);
  seat_base.name = "seat_base";
  seat_base.position.set(0, 0.54, 0.08);
  upholstery.add(seat_base);

  const front_apronGeom = new THREE.BoxGeometry(1.42, 0.22, 0.13);
  const front_apron = new THREE.Mesh(front_apronGeom, velvetMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.56, 0.53);
  upholstery.add(front_apron);

  const front_apron_roundingGeom = new THREE.CylinderGeometry(0.065, 0.065, 1.34, 20);
  const front_apron_rounding = new THREE.Mesh(front_apron_roundingGeom, velvetMat);
  front_apron_rounding.name = "front_apron_rounding";
  front_apron_rounding.rotation.z = Math.PI / 2;
  front_apron_rounding.position.set(0, 0.66, 0.54);
  upholstery.add(front_apron_rounding);

  const seat_cushionShape = new THREE.Shape();
  seat_cushionShape.moveTo(-0.58, -0.48);
  seat_cushionShape.quadraticCurveTo(-0.69, -0.48, -0.72, -0.37);
  seat_cushionShape.lineTo(-0.68, 0.38);
  seat_cushionShape.quadraticCurveTo(-0.67, 0.48, -0.57, 0.50);
  seat_cushionShape.lineTo(0.57, 0.50);
  seat_cushionShape.quadraticCurveTo(0.67, 0.48, 0.68, 0.38);
  seat_cushionShape.lineTo(0.72, -0.37);
  seat_cushionShape.quadraticCurveTo(0.69, -0.48, 0.58, -0.48);
  seat_cushionShape.closePath();

  const seat_cushionGeom = new THREE.ExtrudeGeometry(seat_cushionShape, {
    depth: 0.18,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3
  });
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, velvetMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.rotation.x = -Math.PI / 2;
  seat_cushion.position.set(0, 0.65, 0.08);
  upholstery.add(seat_cushion);

  const seat_pipingPoints = [
    new THREE.Vector3(-0.58, 0.845, 0.56),
    new THREE.Vector3(-0.68, 0.845, 0.48),
    new THREE.Vector3(-0.68, 0.845, -0.30),
    new THREE.Vector3(-0.58, 0.845, -0.39),
    new THREE.Vector3(0.58, 0.845, -0.39),
    new THREE.Vector3(0.68, 0.845, -0.30),
    new THREE.Vector3(0.68, 0.845, 0.48),
    new THREE.Vector3(0.58, 0.845, 0.56)
  ];
  const seat_piping = makeTube(seat_pipingPoints, 0.012, seamMat, true);
  seat_piping.name = "seat_piping";
  upholstery.add(seat_piping);

  const front_seat_piping = makeTube([
    new THREE.Vector3(-0.62, 0.675, 0.585),
    new THREE.Vector3(0.62, 0.675, 0.585)
  ], 0.011, seamMat);
  front_seat_piping.name = "front_seat_piping";
  upholstery.add(front_seat_piping);

  const backrestShape = new THREE.Shape();
  backrestShape.moveTo(-0.54, 0.58);
  backrestShape.lineTo(-0.59, 1.48);
  backrestShape.bezierCurveTo(-0.61, 1.82, -0.68, 2.20, -0.63, 2.38);
  backrestShape.bezierCurveTo(-0.58, 2.57, -0.31, 2.64, 0, 2.64);
  backrestShape.bezierCurveTo(0.31, 2.64, 0.58, 2.57, 0.63, 2.38);
  backrestShape.bezierCurveTo(0.68, 2.20, 0.61, 1.82, 0.59, 1.48);
  backrestShape.lineTo(0.54, 0.58);
  backrestShape.closePath();

  const backrestGeom = new THREE.ExtrudeGeometry(backrestShape, {
    depth: 0.18,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.045,
    bevelSegments: 3
  });
  const backrest = new THREE.Mesh(backrestGeom, velvetMat);
  backrest.name = "backrest";
  backrest.position.z = -0.50;
  upholstery.add(backrest);

  const back_cushionShape = new THREE.Shape();
  back_cushionShape.moveTo(-0.44, 0.68);
  back_cushionShape.lineTo(-0.49, 1.52);
  back_cushionShape.bezierCurveTo(-0.51, 1.86, -0.57, 2.18, -0.52, 2.34);
  back_cushionShape.bezierCurveTo(-0.47, 2.49, -0.25, 2.54, 0, 2.54);
  back_cushionShape.bezierCurveTo(0.25, 2.54, 0.47, 2.49, 0.52, 2.34);
  back_cushionShape.bezierCurveTo(0.57, 2.18, 0.51, 1.86, 0.49, 1.52);
  back_cushionShape.lineTo(0.44, 0.68);
  back_cushionShape.closePath();

  const back_cushionGeom = new THREE.ExtrudeGeometry(back_cushionShape, {
    depth: 0.075,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 3
  });
  const back_cushion = new THREE.Mesh(back_cushionGeom, velvetMat);
  back_cushion.name = "back_cushion";
  back_cushion.position.z = -0.30;
  upholstery.add(back_cushion);

  const wingShape = new THREE.Shape();
  wingShape.moveTo(-0.10, 0.70);
  wingShape.lineTo(-0.10, 1.62);
  wingShape.bezierCurveTo(-0.10, 1.96, -0.16, 2.29, -0.12, 2.43);
  wingShape.bezierCurveTo(-0.08, 2.56, 0.08, 2.60, 0.20, 2.54);
  wingShape.bezierCurveTo(0.31, 2.49, 0.34, 2.37, 0.31, 2.23);
  wingShape.bezierCurveTo(0.27, 2.03, 0.20, 1.82, 0.20, 1.58);
  wingShape.lineTo(0.20, 0.72);
  wingShape.closePath();

  const wingGeom = new THREE.ExtrudeGeometry(wingShape, {
    depth: 0.28,
    steps: 1,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3
  });

  const left_wing = new THREE.Mesh(wingGeom, velvetMat);
  left_wing.name = "left_wing";
  left_wing.position.set(-0.52, 0, -0.48);
  left_wing.rotation.y = 0.22;
  upholstery.add(left_wing);

  const right_wing = new THREE.Mesh(wingGeom, velvetMat);
  right_wing.name = "right_wing";
  right_wing.position.set(0.52, 0, -0.48);
  right_wing.rotation.y = -0.22;
  right_wing.scale.x = -1;
  upholstery.add(right_wing);

  const left_wing_roll = makeTube([
    new THREE.Vector3(-0.66, 0.76, -0.13),
    new THREE.Vector3(-0.68, 1.30, -0.11),
    new THREE.Vector3(-0.72, 1.82, -0.08),
    new THREE.Vector3(-0.75, 2.25, -0.04),
    new THREE.Vector3(-0.68, 2.48, -0.02),
    new THREE.Vector3(-0.55, 2.55, -0.03)
  ], 0.14, velvetMat);
  left_wing_roll.name = "left_wing_roll";
  upholstery.add(left_wing_roll);

  const right_wing_roll = makeTube([
    new THREE.Vector3(0.66, 0.76, -0.13),
    new THREE.Vector3(0.68, 1.30, -0.11),
    new THREE.Vector3(0.72, 1.82, -0.08),
    new THREE.Vector3(0.75, 2.25, -0.04),
    new THREE.Vector3(0.68, 2.48, -0.02),
    new THREE.Vector3(0.55, 2.55, -0.03)
  ], 0.14, velvetMat);
  right_wing_roll.name = "right_wing_roll";
  upholstery.add(right_wing_roll);

  const back_top_roll = makeTube([
    new THREE.Vector3(-0.55, 2.55, -0.03),
    new THREE.Vector3(-0.30, 2.62, -0.02),
    new THREE.Vector3(0, 2.65, -0.02),
    new THREE.Vector3(0.30, 2.62, -0.02),
    new THREE.Vector3(0.55, 2.55, -0.03)
  ], 0.13, velvetMat);
  back_top_roll.name = "back_top_roll";
  upholstery.add(back_top_roll);

  const left_arm_sideGeom = new THREE.BoxGeometry(0.25, 0.72, 0.78);
  const left_arm_side = new THREE.Mesh(left_arm_sideGeom, velvetDarkMat);
  left_arm_side.name = "left_arm_side";
  left_arm_side.position.set(-0.72, 0.91, 0.10);
  upholstery.add(left_arm_side);

  const right_arm_side = new THREE.Mesh(left_arm_sideGeom, velvetDarkMat);
  right_arm_side.name = "right_arm_side";
  right_arm_side.position.set(0.72, 0.91, 0.10);
  upholstery.add(right_arm_side);

  const arm_front_supportGeom = new THREE.CapsuleGeometry(0.105, 0.48, 8, 16);
  const left_arm_front_support = new THREE.Mesh(arm_front_supportGeom, velvetMat);
  left_arm_front_support.name = "left_arm_front_support";
  left_arm_front_support.position.set(-0.72, 0.94, 0.43);
  upholstery.add(left_arm_front_support);

  const right_arm_front_support = new THREE.Mesh(arm_front_supportGeom, velvetMat);
  right_arm_front_support.name = "right_arm_front_support";
  right_arm_front_support.position.set(0.72, 0.94, 0.43);
  upholstery.add(right_arm_front_support);

  const arm_rollGeom = new THREE.CapsuleGeometry(0.20, 0.55, 10, 20);
  const left_arm_roll = new THREE.Mesh(arm_rollGeom, velvetMat);
  left_arm_roll.name = "left_arm_roll";
  left_arm_roll.rotation.x = Math.PI / 2;
  left_arm_roll.position.set(-0.72, 1.31, 0.12);
  upholstery.add(left_arm_roll);

  const right_arm_roll = new THREE.Mesh(arm_rollGeom, velvetMat);
  right_arm_roll.name = "right_arm_roll";
  right_arm_roll.rotation.x = Math.PI / 2;
  right_arm_roll.position.set(0.72, 1.31, 0.12);
  upholstery.add(right_arm_roll);

  const arm_scrollGeom = new THREE.TorusGeometry(0.125, 0.055, 12, 28);
  const left_arm_scroll = new THREE.Mesh(arm_scrollGeom, velvetMat);
  left_arm_scroll.name = "left_arm_scroll";
  left_arm_scroll.position.set(-0.72, 1.31, 0.59);
  upholstery.add(left_arm_scroll);

  const right_arm_scroll = new THREE.Mesh(arm_scrollGeom, velvetMat);
  right_arm_scroll.name = "right_arm_scroll";
  right_arm_scroll.position.set(0.72, 1.31, 0.59);
  upholstery.add(right_arm_scroll);

  const arm_buttonGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 18);
  const left_arm_button = new THREE.Mesh(arm_buttonGeom, buttonMat);
  left_arm_button.name = "left_arm_button";
  left_arm_button.rotation.x = Math.PI / 2;
  left_arm_button.position.set(-0.72, 1.31, 0.651);
  upholstery.add(left_arm_button);

  const right_arm_button = new THREE.Mesh(arm_buttonGeom, buttonMat);
  right_arm_button.name = "right_arm_button";
  right_arm_button.rotation.x = Math.PI / 2;
  right_arm_button.position.set(0.72, 1.31, 0.651);
  upholstery.add(right_arm_button);

  const arm_pleatGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.075, 6);
  const arm_pleats = new THREE.InstancedMesh(arm_pleatGeom, seamMat, 16);
  arm_pleats.name = "arm_pleats";
  const pleat_dummy = new THREE.Object3D();
  let pleat_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      pleat_dummy.position.set(
        side * 0.72 + Math.cos(angle) * 0.105,
        1.31 + Math.sin(angle) * 0.105,
        0.653
      );
      pleat_dummy.rotation.set(0, 0, angle - Math.PI / 2);
      pleat_dummy.scale.set(1, 1, 1);
      pleat_dummy.updateMatrix();
      arm_pleats.setMatrixAt(pleat_index++, pleat_dummy.matrix);
    }
  }
  arm_pleats.instanceMatrix.needsUpdate = true;
  upholstery.add(arm_pleats);

  const tuft_rows = [
    { y: 2.22, xs: [-0.30, 0, 0.30] },
    { y: 1.86, xs: [-0.45, -0.15, 0.15, 0.45] },
    { y: 1.50, xs: [-0.30, 0, 0.30] },
    { y: 1.14, xs: [-0.45, -0.15, 0.15, 0.45] }
  ];
  let tuft_count = 0;
  for (const row of tuft_rows) tuft_count += row.xs.length;

  const tuft_dimpleGeom = new THREE.SphereGeometry(1, 18, 10);
  const tuft_dimples = new THREE.InstancedMesh(tuft_dimpleGeom, velvetDarkMat, tuft_count);
  tuft_dimples.name = "tuft_dimples";

  const tuft_buttonGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.018, 18);
  const tuft_buttons = new THREE.InstancedMesh(tuft_buttonGeom, buttonMat, tuft_count);
  tuft_buttons.name = "tuft_buttons";

  const tuft_dummy = new THREE.Object3D();
  let tuft_index = 0;
  for (const row of tuft_rows) {
    for (const x of row.xs) {
      tuft_dummy.position.set(x, row.y, -0.195);
      tuft_dummy.rotation.set(0, 0, 0);
      tuft_dummy.scale.set(0.105, 0.085, 0.018);
      tuft_dummy.updateMatrix();
      tuft_dimples.setMatrixAt(tuft_index, tuft_dummy.matrix);

      tuft_dummy.position.set(x, row.y, -0.164);
      tuft_dummy.rotation.set(Math.PI / 2, 0, 0);
      tuft_dummy.scale.set(1, 1, 1);
      tuft_dummy.updateMatrix();
      tuft_buttons.setMatrixAt(tuft_index, tuft_dummy.matrix);
      tuft_index++;
    }
  }
  tuft_dimples.instanceMatrix.needsUpdate = true;
  tuft_buttons.instanceMatrix.needsUpdate = true;
  upholstery.add(tuft_dimples);
  upholstery.add(tuft_buttons);

  const tuft_seams = new THREE.Group();
  tuft_seams.name = "tuft_seams";
  for (let r = 0; r < tuft_rows.length - 1; r++) {
    const upper = tuft_rows[r];
    const lower = tuft_rows[r + 1];
    for (const upper_x of upper.xs) {
      for (const lower_x of lower.xs) {
        if (Math.abs(upper_x - lower_x) <= 0.30) {
          const tuft_seam = makeTube([
            new THREE.Vector3(upper_x, upper.y, -0.174),
            new THREE.Vector3(
              (upper_x + lower_x) * 0.5,
              (upper.y + lower.y) * 0.5,
              -0.171
            ),
            new THREE.Vector3(lower_x, lower.y, -0.174)
          ], 0.008, seamMat);
          tuft_seams.add(tuft_seam);
        }
      }
    }
  }
  upholstery.add(tuft_seams);

  const back_vertical_seams = new THREE.Group();
  back_vertical_seams.name = "back_vertical_seams";
  for (const x of [-0.49, -0.25, 0.25, 0.49]) {
    const back_vertical_seam = makeTube([
      new THREE.Vector3(x, 0.73, -0.184),
      new THREE.Vector3(x * 1.02, 1.45, -0.181),
      new THREE.Vector3(x * 1.06, 2.18, -0.184),
      new THREE.Vector3(x * 0.92, 2.48, -0.19)
    ], 0.007, seamMat);
    back_vertical_seams.add(back_vertical_seam);
  }
  upholstery.add(back_vertical_seams);

  const back_side_piping = new THREE.Group();
  back_side_piping.name = "back_side_piping";
  for (const side of [-1, 1]) {
    const side_pipe = makeTube([
      new THREE.Vector3(side * 0.53, 0.66, -0.18),
      new THREE.Vector3(side * 0.57, 1.45, -0.17),
      new THREE.Vector3(side * 0.62, 2.12, -0.16),
      new THREE.Vector3(side * 0.55, 2.45, -0.15)
    ], 0.012, seamMat);
    back_side_piping.add(side_pipe);
  }
  upholstery.add(back_side_piping);

  const front_legShape = new THREE.Shape();
  front_legShape.moveTo(-0.075, 0.00);
  front_legShape.bezierCurveTo(-0.11, -0.18, -0.10, -0.38, -0.035, -0.58);
  front_legShape.bezierCurveTo(0.00, -0.68, 0.025, -0.76, 0.045, -0.82);
  front_legShape.bezierCurveTo(0.075, -0.90, 0.14, -0.91, 0.18, -0.86);
  front_legShape.bezierCurveTo(0.21, -0.82, 0.18, -0.77, 0.13, -0.74);
  front_legShape.bezierCurveTo(0.07, -0.69, 0.045, -0.61, 0.055, -0.52);
  front_legShape.bezierCurveTo(0.075, -0.30, 0.09, -0.12, 0.075, 0.00);
  front_legShape.closePath();

  const front_legGeom = new THREE.ExtrudeGeometry(front_legShape, {
    depth: 0.14,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2
  });

  const front_left_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-0.56, 0.48, 0.40);
  front_left_leg.scale.x = -1;
  wooden_frame.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(0.56, 0.48, 0.40);
  wooden_frame.add(front_right_leg);

  const rear_legGeom = new THREE.CylinderGeometry(0.075, 0.052, 0.58, 8);
  const rear_left_leg = new THREE.Mesh(rear_legGeom, woodMat);
  rear_left_leg.name = "rear_left_leg";
  rear_left_leg.position.set(-0.50, 0.20, -0.34);
  rear_left_leg.rotation.x = -0.08;
  rear_left_leg.rotation.z = -0.035;
  wooden_frame.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(rear_legGeom, woodMat);
  rear_right_leg.name = "rear_right_leg";
  rear_right_leg.position.set(0.50, 0.20, -0.34);
  rear_right_leg.rotation.x = -0.08;
  rear_right_leg.rotation.z = 0.035;
  wooden_frame.add(rear_right_leg);

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