export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "portable_sports_goal";

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.65,
    roughness: 0.18,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0x34373a,
    metalness: 0.5,
    roughness: 0.22,
  });
  const netMat = new THREE.MeshStandardMaterial({
    color: 0x0b0c0d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x151719,
    metalness: 0.45,
    roughness: 0.35,
  });

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const net_group = new THREE.Group();
  net_group.name = "net_group";
  root.add(net_group);

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(hardware_group);

  const frameW = 2.5;
  const frameH = 1.82;
  const frameR = 0.2;
  const tubeR = 0.075;
  const baseY = 0.1;
  const frontZ = 0.34;
  const rearZ = -0.68;
  const netW = 2.2;
  const netBottom = 0.2;
  const netTop = 1.68;

  function makeRoundedRectangleCurve(w, h, r, z) {
    const curve = new THREE.CurvePath();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = 0;
    const y1 = h;

    curve.add(new THREE.LineCurve3(
      new THREE.Vector3(x0 + r, y1, z),
      new THREE.Vector3(x1 - r, y1, z)
    ));
    curve.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x1 - r, y1, z),
      new THREE.Vector3(x1, y1, z),
      new THREE.Vector3(x1, y1 - r, z)
    ));
    curve.add(new THREE.LineCurve3(
      new THREE.Vector3(x1, y1 - r, z),
      new THREE.Vector3(x1, y0 + r, z)
    ));
    curve.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x1, y0 + r, z),
      new THREE.Vector3(x1, y0, z),
      new THREE.Vector3(x1 - r, y0, z)
    ));
    curve.add(new THREE.LineCurve3(
      new THREE.Vector3(x1 - r, y0, z),
      new THREE.Vector3(x0 + r, y0, z)
    ));
    curve.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0 + r, y0, z),
      new THREE.Vector3(x0, y0, z),
      new THREE.Vector3(x0, y0 + r, z)
    ));
    curve.add(new THREE.LineCurve3(
      new THREE.Vector3(x0, y0 + r, z),
      new THREE.Vector3(x0, y1 - r, z)
    ));
    curve.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y1 - r, z),
      new THREE.Vector3(x0, y1, z),
      new THREE.Vector3(x0 + r, y1, z)
    ));
    return curve;
  }

  const front_goal_frameCurve = makeRoundedRectangleCurve(
    frameW,
    frameH,
    frameR,
    frontZ
  );
  const front_goal_frameGeo = new THREE.TubeGeometry(
    front_goal_frameCurve,
    112,
    tubeR,
    14,
    true
  );
  const front_goal_frame = new THREE.Mesh(front_goal_frameGeo, frameMat);
  front_goal_frame.name = "front_goal_frame";
  front_goal_frame.position.y = baseY;
  frame_group.add(front_goal_frame);

  const rear_base_frameCurve = makeRoundedRectangleCurve(
    frameW,
    1.18,
    0.18,
    rearZ
  );
  const rear_base_frameGeo = new THREE.TubeGeometry(
    rear_base_frameCurve,
    96,
    tubeR,
    14,
    true
  );
  const rear_base_frame = new THREE.Mesh(rear_base_frameGeo, frameMat);
  rear_base_frame.name = "rear_base_frame";
  rear_base_frame.rotation.x = Math.PI / 2;
  rear_base_frame.position.y = baseY;
  frame_group.add(rear_base_frame);

  const side_base_railsCurve = new THREE.LineCurve3(
    new THREE.Vector3(0, baseY, frontZ),
    new THREE.Vector3(0, baseY, rearZ)
  );
  const side_base_railsGeo = new THREE.TubeGeometry(
    side_base_railsCurve,
    8,
    tubeR,
    12,
    false
  );
  const side_base_rails = new THREE.InstancedMesh(
    side_base_railsGeo,
    frameMat,
    2
  );
  side_base_rails.name = "side_base_rails";

  const sideRailDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    sideRailDummy.position.set(i === 0 ? -frameW / 2 : frameW / 2, 0, 0);
    sideRailDummy.updateMatrix();
    side_base_rails.setMatrixAt(i, sideRailDummy.matrix);
  }
  side_base_rails.instanceMatrix.needsUpdate = true;
  frame_group.add(side_base_rails);

  const front_frame_highlightCurve = makeRoundedRectangleCurve(
    frameW - 0.09,
    frameH - 0.09,
    frameR - 0.025,
    frontZ + tubeR * 0.82
  );
  const front_frame_highlightGeo = new THREE.TubeGeometry(
    front_frame_highlightCurve,
    104,
    0.009,
    6,
    true
  );
  const front_frame_highlight = new THREE.Mesh(
    front_frame_highlightGeo,
    highlightMat
  );
  front_frame_highlight.name = "front_frame_highlight";
  front_frame_highlight.position.y = baseY + 0.012;
  frame_group.add(front_frame_highlight);

  const netColumns = 14;
  const netRows = 10;
  const netNodes = [];

  for (let row = 0; row <= netRows; row++) {
    const rowNodes = [];
    const v = row / netRows;
    for (let column = 0; column <= netColumns; column++) {
      const u = column / netColumns;
      const boundary =
        Math.sin(Math.PI * u) *
        Math.sin(Math.PI * v);
      const x =
        -netW / 2 +
        netW * u +
        boundary * 0.025 * Math.sin(column * 1.73 + row * 0.91);
      const y =
        netBottom +
        (netTop - netBottom) * v +
        boundary * 0.018 * Math.sin(column * 1.17 - row * 1.41);
      const z =
        frontZ -
        tubeR * 0.55 -
        boundary * 0.19 +
        boundary * 0.012 * Math.sin(column * 0.83 + row * 1.31);
      rowNodes.push(new THREE.Vector3(x, y, z));
    }
    netNodes.push(rowNodes);
  }

  const vertical_net_strands = new THREE.Group();
  vertical_net_strands.name = "vertical_net_strands";
  net_group.add(vertical_net_strands);

  const horizontal_net_strands = new THREE.Group();
  horizontal_net_strands.name = "horizontal_net_strands";
  net_group.add(horizontal_net_strands);

  for (let column = 0; column <= netColumns; column++) {
    const verticalPoints = [];
    for (let row = 0; row <= netRows; row++) {
      verticalPoints.push(netNodes[row][column].clone());
    }
    const vertical_net_strandCurve = new THREE.CatmullRomCurve3(
      verticalPoints,
      false,
      "centripetal"
    );
    const vertical_net_strandGeo = new THREE.TubeGeometry(
      vertical_net_strandCurve,
      36,
      0.008,
      5,
      false
    );
    const vertical_net_strand = new THREE.Mesh(
      vertical_net_strandGeo,
      netMat
    );
    vertical_net_strand.name = "vertical_net_strand_" + column;
    vertical_net_strands.add(vertical_net_strand);
  }

  for (let row = 0; row <= netRows; row++) {
    const horizontalPoints = [];
    for (let column = 0; column <= netColumns; column++) {
      horizontalPoints.push(netNodes[row][column].clone());
    }
    const horizontal_net_strandCurve = new THREE.CatmullRomCurve3(
      horizontalPoints,
      false,
      "centripetal"
    );
    const horizontal_net_strandGeo = new THREE.TubeGeometry(
      horizontal_net_strandCurve,
      42,
      0.008,
      5,
      false
    );
    const horizontal_net_strand = new THREE.Mesh(
      horizontal_net_strandGeo,
      netMat
    );
    horizontal_net_strand.name = "horizontal_net_strand_" + row;
    horizontal_net_strands.add(horizontal_net_strand);
  }

  const net_knotsGeo = new THREE.SphereGeometry(0.018, 7, 5);
  const net_knots = new THREE.InstancedMesh(
    net_knotsGeo,
    netMat,
    (netColumns + 1) * (netRows + 1)
  );
  net_knots.name = "net_knots";

  const knotDummy = new THREE.Object3D();
  let knotIndex = 0;
  for (let row = 0; row <= netRows; row++) {
    for (let column = 0; column <= netColumns; column++) {
      knotDummy.position.copy(netNodes[row][column]);
      knotDummy.updateMatrix();
      net_knots.setMatrixAt(knotIndex++, knotDummy.matrix);
    }
  }
  net_knots.instanceMatrix.needsUpdate = true;
  net_group.add(net_knots);

  const top_attachment_cords = new THREE.Group();
  top_attachment_cords.name = "top_attachment_cords";
  net_group.add(top_attachment_cords);

  const bottom_attachment_cords = new THREE.Group();
  bottom_attachment_cords.name = "bottom_attachment_cords";
  net_group.add(bottom_attachment_cords);

  const side_attachment_cords = new THREE.Group();
  side_attachment_cords.name = "side_attachment_cords";
  net_group.add(side_attachment_cords);

  const attachmentCount = 8;
  for (let i = 0; i < attachmentCount; i++) {
    const t = i / (attachmentCount - 1);
    const x = -netW / 2 + netW * t;
    const topStart = new THREE.Vector3(
      x,
      netTop,
      frontZ - tubeR * 0.55
    );
    const topEnd = new THREE.Vector3(
      x,
      baseY + frameH - tubeR * 0.72,
      frontZ
    );
    const top_attachment_cordCurve = new THREE.QuadraticBezierCurve3(
      topStart,
      new THREE.Vector3(
        x + (i % 2 === 0 ? 0.018 : -0.018),
        (topStart.y + topEnd.y) / 2,
        (topStart.z + topEnd.z) / 2
      ),
      topEnd
    );
    const top_attachment_cordGeo = new THREE.TubeGeometry(
      top_attachment_cordCurve,
      6,
      0.009,
      5,
      false
    );
    const top_attachment_cord = new THREE.Mesh(
      top_attachment_cordGeo,
      netMat
    );
    top_attachment_cord.name = "top_attachment_cord_" + i;
    top_attachment_cords.add(top_attachment_cord);

    const bottomStart = new THREE.Vector3(
      x,
      netBottom,
      frontZ - tubeR * 0.55
    );
    const bottomEnd = new THREE.Vector3(
      x,
      baseY + tubeR * 0.72,
      frontZ
    );
    const bottom_attachment_cordCurve = new THREE.QuadraticBezierCurve3(
      bottomStart,
      new THREE.Vector3(
        x + (i % 2 === 0 ? -0.014 : 0.014),
        (bottomStart.y + bottomEnd.y) / 2,
        (bottomStart.z + bottomEnd.z) / 2
      ),
      bottomEnd
    );
    const bottom_attachment_cordGeo = new THREE.TubeGeometry(
      bottom_attachment_cordCurve,
      6,
      0.009,
      5,
      false
    );
    const bottom_attachment_cord = new THREE.Mesh(
      bottom_attachment_cordGeo,
      netMat
    );
    bottom_attachment_cord.name = "bottom_attachment_cord_" + i;
    bottom_attachment_cords.add(bottom_attachment_cord);
  }

  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const y = 0.55 + i * 0.43;
      const sideStart = new THREE.Vector3(
        side * netW / 2,
        y,
        frontZ - tubeR * 0.55
      );
      const sideEnd = new THREE.Vector3(
        side * (frameW / 2 - tubeR * 0.68),
        y,
        frontZ
      );
      const side_attachment_cordCurve = new THREE.LineCurve3(
        sideStart,
        sideEnd
      );
      const side_attachment_cordGeo = new THREE.TubeGeometry(
        side_attachment_cordCurve,
        3,
        0.009,
        5,
        false
      );
      const side_attachment_cord = new THREE.Mesh(
        side_attachment_cordGeo,
        netMat
      );
      side_attachment_cord.name =
        (side < 0 ? "left" : "right") + "_attachment_cord_" + i;
      side_attachment_cords.add(side_attachment_cord);
    }
  }

  const frame_tie_wrapsGeom = new THREE.TorusGeometry(
    tubeR * 1.06,
    0.009,
    6,
    16
  );
  const frame_tie_wraps = new THREE.InstancedMesh(
    frame_tie_wrapsGeom,
    netMat,
    24
  );
  frame_tie_wraps.name = "frame_tie_wraps";

  const wrapDummy = new THREE.Object3D();
  let wrapIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      wrapDummy.position.set(
        side * frameW / 2,
        0.48 + i * 0.36,
        frontZ
      );
      wrapDummy.rotation.set(0, 0, 0);
      wrapDummy.updateMatrix();
      frame_tie_wraps.setMatrixAt(wrapIndex++, wrapDummy.matrix);
    }
    for (let i = 0; i < 4; i++) {
      wrapDummy.position.set(
        -netW / 2 + (netW * i) / 3,
        baseY + frameH,
        frontZ
      );
      wrapDummy.rotation.set(0, Math.PI / 2, 0);
      wrapDummy.updateMatrix();
      frame_tie_wraps.setMatrixAt(wrapIndex++, wrapDummy.matrix);
    }
    for (let i = 0; i < 4; i++) {
      wrapDummy.position.set(
        -netW / 2 + (netW * i) / 3,
        baseY,
        frontZ
      );
      wrapDummy.rotation.set(0, Math.PI / 2, 0);
      wrapDummy.updateMatrix();
      frame_tie_wraps.setMatrixAt(wrapIndex++, wrapDummy.matrix);
    }
  }
  frame_tie_wraps.instanceMatrix.needsUpdate = true;
  hardware_group.add(frame_tie_wraps);

  const frame_boltsGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.025,
    12
  );
  const frame_bolts = new THREE.InstancedMesh(
    frame_boltsGeom,
    hardwareMat,
    4
  );
  frame_bolts.name = "frame_bolts";

  const boltDummy = new THREE.Object3D();
  let boltIndex = 0;
  for (const side of [-1, 1]) {
    for (const y of [0.62, 1.18]) {
      boltDummy.position.set(
        side * (frameW / 2 + tubeR * 0.9),
        y,
        frontZ
      );
      boltDummy.rotation.set(0, 0, Math.PI / 2);
      boltDummy.updateMatrix();
      frame_bolts.setMatrixAt(boltIndex++, boltDummy.matrix);
    }
  }
  frame_bolts.instanceMatrix.needsUpdate = true;
  hardware_group.add(frame_bolts);

  const base_joint_capsGeom = new THREE.SphereGeometry(
    tubeR * 1.02,
    12,
    8
  );
  const base_joint_caps = new THREE.InstancedMesh(
    base_joint_capsGeom,
    frameMat,
    4
  );
  base_joint_caps.name = "base_joint_caps";

  const capDummy = new THREE.Object3D();
  let capIndex = 0;
  for (const x of [-frameW / 2, frameW / 2]) {
    for (const z of [frontZ, rearZ]) {
      capDummy.position.set(x, baseY, z);
      capDummy.updateMatrix();
      base_joint_caps.setMatrixAt(capIndex++, capDummy.matrix);
    }
  }
  base_joint_caps.instanceMatrix.needsUpdate = true;
  frame_group.add(base_joint_caps);

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