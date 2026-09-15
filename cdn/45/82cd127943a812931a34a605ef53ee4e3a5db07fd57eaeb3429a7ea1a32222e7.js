export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "suede_pouch";

  const textureSize = 96;
  const suedeData = new Uint8Array(textureSize * textureSize * 4);
  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const index = (y * textureSize + x) * 4;
      const grain = (x * 37 + y * 61 + x * y * 13) % 97;
      const fiber = (x * 11 + y * 7) % 23 === 0 ? 34 : 0;
      const value = Math.min(255, 104 + grain + fiber);
      suedeData[index] = value;
      suedeData[index + 1] = value;
      suedeData[index + 2] = value;
      suedeData[index + 3] = 255;
    }
  }

  const suedeTexture = new THREE.DataTexture(
    suedeData,
    textureSize,
    textureSize,
    THREE.RGBAFormat
  );
  suedeTexture.wrapS = THREE.RepeatWrapping;
  suedeTexture.wrapT = THREE.RepeatWrapping;
  suedeTexture.repeat.set(6, 6);
  suedeTexture.magFilter = THREE.LinearFilter;
  suedeTexture.minFilter = THREE.LinearMipmapLinearFilter;
  suedeTexture.generateMipmaps = true;
  suedeTexture.needsUpdate = true;

  const suedeMat = new THREE.MeshStandardMaterial({
    color: 0xc18458,
    map: suedeTexture,
    bumpMap: suedeTexture,
    bumpScale: 0.012,
    metalness: 0.0,
    roughness: 1.0,
    side: THREE.DoubleSide
  });
  const darkSuedeMat = new THREE.MeshStandardMaterial({
    color: 0x8f5534,
    map: suedeTexture,
    bumpMap: suedeTexture,
    bumpScale: 0.012,
    metalness: 0.0,
    roughness: 1.0,
    side: THREE.DoubleSide
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x3c2418,
    map: suedeTexture,
    bumpMap: suedeTexture,
    bumpScale: 0.009,
    metalness: 0.0,
    roughness: 1.0,
    side: THREE.DoubleSide
  });
  const threadMat = new THREE.MeshStandardMaterial({
    color: 0x4b2d1d,
    metalness: 0.0,
    roughness: 1.0
  });
  const snapMat = new THREE.MeshStandardMaterial({
    color: 0x77726e,
    metalness: 0.6,
    roughness: 0.4
  });
  const snapRimMat = new THREE.MeshStandardMaterial({
    color: 0x403b38,
    metalness: 0.6,
    roughness: 0.4
  });
  const fiberMat = new THREE.LineBasicMaterial({
    color: 0xd8a376,
    transparent: true,
    opacity: 0.32
  });

  function makeRoundedPanelGeometry(w, h, r, depth) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeFlapGeometry(w, h, depth) {
    const shape = new THREE.Shape();
    const hw = w / 2;
    const hh = h / 2;
    const topR = 0.15;
    const bottomR = 0.19;

    shape.moveTo(-hw + bottomR, -hh);
    shape.lineTo(hw - bottomR, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + bottomR);
    shape.lineTo(hw, hh - topR);
    shape.quadraticCurveTo(hw, hh, hw - topR, hh);
    shape.lineTo(-hw + topR, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - topR);
    shape.lineTo(-hw, -hh + bottomR);
    shape.quadraticCurveTo(-hw, -hh, -hw + bottomR, -hh);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.009,
      bevelSize: 0.009,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeSideGussetGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.25, 0.40);
    shape.quadraticCurveTo(-0.31, 0.35, -0.30, 0.22);
    shape.lineTo(-0.23, -0.36);
    shape.quadraticCurveTo(-0.21, -0.49, -0.08, -0.52);
    shape.lineTo(0.10, -0.52);
    shape.quadraticCurveTo(0.24, -0.49, 0.26, -0.35);
    shape.lineTo(0.29, 0.28);
    shape.quadraticCurveTo(0.29, 0.39, 0.18, 0.42);
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 10);
  }

  function makeSideFoldGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.24, 0.34);
    shape.quadraticCurveTo(-0.27, 0.27, -0.25, 0.15);
    shape.lineTo(-0.18, -0.37);
    shape.quadraticCurveTo(-0.16, -0.46, -0.05, -0.48);
    shape.lineTo(0.07, -0.47);
    shape.quadraticCurveTo(0.16, -0.44, 0.17, -0.34);
    shape.lineTo(0.20, 0.24);
    shape.quadraticCurveTo(0.20, 0.33, 0.12, 0.36);
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 8);
  }

  function makeFlapTrimGeometry(w, h, z) {
    const hw = w / 2;
    const hh = h / 2;
    const path = new THREE.CurvePath();

    path.add(new THREE.LineCurve3(
      new THREE.Vector3(-hw + 0.19, -hh, z),
      new THREE.Vector3(hw - 0.19, -hh, z)
    ));
    path.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(hw - 0.19, -hh, z),
      new THREE.Vector3(hw, -hh, z),
      new THREE.Vector3(hw, -hh + 0.19, z)
    ));
    path.add(new THREE.LineCurve3(
      new THREE.Vector3(hw, -hh + 0.19, z),
      new THREE.Vector3(hw, hh - 0.15, z)
    ));
    path.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(hw, hh - 0.15, z),
      new THREE.Vector3(hw, hh, z),
      new THREE.Vector3(hw - 0.15, hh, z)
    ));
    path.add(new THREE.LineCurve3(
      new THREE.Vector3(hw - 0.15, hh, z),
      new THREE.Vector3(-hw + 0.15, hh, z)
    ));
    path.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-hw + 0.15, hh, z),
      new THREE.Vector3(-hw, hh, z),
      new THREE.Vector3(-hw, hh - 0.15, z)
    ));
    path.add(new THREE.LineCurve3(
      new THREE.Vector3(-hw, hh - 0.15, z),
      new THREE.Vector3(-hw, -hh + 0.19, z)
    ));
    path.add(new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-hw, -hh + 0.19, z),
      new THREE.Vector3(-hw, -hh, z),
      new THREE.Vector3(-hw + 0.19, -hh, z)
    ));

    return new THREE.TubeGeometry(path, 96, 0.008, 6, true);
  }

  function makeSideSeamGeometry(side) {
    const x = side * 0.625;
    const points = [
      new THREE.Vector3(x, 0.31, 0.245),
      new THREE.Vector3(x, 0.08, 0.285),
      new THREE.Vector3(x, -0.20, 0.275),
      new THREE.Vector3(x, -0.40, 0.205),
      new THREE.Vector3(x, -0.47, 0.06),
      new THREE.Vector3(x, -0.42, -0.08),
      new THREE.Vector3(x, -0.20, -0.18),
      new THREE.Vector3(x, 0.10, -0.20),
      new THREE.Vector3(x, 0.31, -0.15)
    ];
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 72, 0.0055, 6, true);
  }

  function makeFlapFiberGeometry(w, h, count, z) {
    const positions = [];
    const hw = w / 2;
    const hh = h / 2;

    for (let i = 0; i < count; i++) {
      const u = ((i * 47) % 101) / 100;
      const v = ((i * 67 + 13) % 103) / 102;
      const x = -hw + 0.055 + u * (w - 0.11);
      const y = -hh + 0.055 + v * (h - 0.11);
      const angle = ((i * 29) % 31) / 31 * Math.PI;
      const length = 0.006 + (i % 5) * 0.0015;
      const dx = Math.cos(angle) * length;
      const dy = Math.sin(angle) * length;
      positions.push(x - dx, y - dy, z, x + dx, y + dy, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  function makeBodyFiberGeometry(w, h, r, count, z) {
    const positions = [];
    const hw = w / 2;
    const hh = h / 2;

    for (let i = 0; i < count; i++) {
      const u = ((i * 43 + 7) % 101) / 100;
      const v = ((i * 71 + 19) % 103) / 102;
      const x = -hw + r + u * (w - 2 * r);
      const y = -hh + r + v * (h - 2 * r);
      const angle = ((i * 23) % 37) / 37 * Math.PI;
      const length = 0.006 + (i % 4) * 0.0017;
      const dx = Math.cos(angle) * length;
      const dy = Math.sin(angle) * length;
      positions.push(x - dx, y - dy, z, x + dx, y + dy, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  const pouch_body = new THREE.Group();
  pouch_body.name = "pouch_body";
  root.add(pouch_body);

  const body_panelGeom = makeRoundedPanelGeometry(1.16, 0.88, 0.11, 0.40);
  const body_panel = new THREE.Mesh(body_panelGeom, suedeMat);
  body_panel.name = "body_panel";
  body_panel.position.set(0, -0.06, 0);
  pouch_body.add(body_panel);

  const rear_panelGeom = makeRoundedPanelGeometry(1.14, 0.86, 0.11, 0.055);
  const rear_panel = new THREE.Mesh(rear_panelGeom, darkSuedeMat);
  rear_panel.name = "rear_panel";
  rear_panel.position.set(0, -0.06, -0.205);
  pouch_body.add(rear_panel);

  const side_gussetGeom = makeSideGussetGeometry();

  const left_side_gusset = new THREE.Mesh(side_gussetGeom, darkSuedeMat);
  left_side_gusset.name = "left_side_gusset";
  left_side_gusset.rotation.y = -Math.PI / 2;
  left_side_gusset.position.set(-0.59, -0.06, 0);
  pouch_body.add(left_side_gusset);

  const right_side_gusset = new THREE.Mesh(side_gussetGeom, darkSuedeMat);
  right_side_gusset.name = "right_side_gusset";
  right_side_gusset.scale.x = -1;
  right_side_gusset.rotation.y = Math.PI / 2;
  right_side_gusset.position.set(0.59, -0.06, 0);
  pouch_body.add(right_side_gusset);

  const side_foldGeom = makeSideFoldGeometry();

  const left_side_fold = new THREE.Mesh(side_foldGeom, suedeMat);
  left_side_fold.name = "left_side_fold";
  left_side_fold.rotation.y = -Math.PI / 2;
  left_side_fold.position.set(-0.605, -0.06, 0);
  pouch_body.add(left_side_fold);

  const right_side_fold = new THREE.Mesh(side_foldGeom, suedeMat);
  right_side_fold.name = "right_side_fold";
  right_side_fold.scale.x = -1;
  right_side_fold.rotation.y = Math.PI / 2;
  right_side_fold.position.set(0.605, -0.06, 0);
  pouch_body.add(right_side_fold);

  const opening_shadowGeom = new THREE.CircleGeometry(1, 32);
  const opening_shadow = new THREE.Mesh(opening_shadowGeom, interiorMat);
  opening_shadow.name = "opening_shadow";
  opening_shadow.scale.set(0.49, 0.055, 1);
  opening_shadow.position.set(0, 0.385, 0.225);
  pouch_body.add(opening_shadow);

  const top_openingGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.96, 12);
  const top_opening = new THREE.Mesh(top_openingGeom, interiorMat);
  top_opening.name = "top_opening";
  top_opening.rotation.z = Math.PI / 2;
  top_opening.position.set(0, 0.385, 0.225);
  pouch_body.add(top_opening);

  const body_stitchingGeom = new THREE.CylinderGeometry(0.005, 0.005, 0.032, 6);
  const body_stitching = new THREE.InstancedMesh(
    body_stitchingGeom,
    threadMat,
    32
  );
  body_stitching.name = "body_stitching";
  const bodyStitchDummy = new THREE.Object3D();
  let bodyStitchIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < 16; i++) {
      bodyStitchDummy.position.set(side * 0.535, -0.37 + i * 0.045, 0.222);
      bodyStitchDummy.rotation.set(0, 0, 0);
      bodyStitchDummy.updateMatrix();
      body_stitching.setMatrixAt(bodyStitchIndex++, bodyStitchDummy.matrix);
    }
  }
  body_stitching.instanceMatrix.needsUpdate = true;
  pouch_body.add(body_stitching);

  const left_side_seamGeom = makeSideSeamGeometry(-1);
  const left_side_seam = new THREE.Mesh(left_side_seamGeom, threadMat);
  left_side_seam.name = "left_side_seam";
  pouch_body.add(left_side_seam);

  const right_side_seamGeom = makeSideSeamGeometry(1);
  const right_side_seam = new THREE.Mesh(right_side_seamGeom, threadMat);
  right_side_seam.name = "right_side_seam";
  pouch_body.add(right_side_seam);

  const body_fiberGeom = makeBodyFiberGeometry(1.16, 0.88, 0.11, 150, 0.219);
  const body_fiber = new THREE.LineSegments(body_fiberGeom, fiberMat);
  body_fiber.name = "body_fiber";
  body_fiber.position.y = -0.06;
  pouch_body.add(body_fiber);

  const closure = new THREE.Group();
  closure.name = "closure";
  root.add(closure);

  const flapW = 1.24;
  const flapH = 0.58;
  const flapDepth = 0.06;
  const flapCenterY = 0.29;

  const front_flapGeom = makeFlapGeometry(flapW, flapH, flapDepth);
  const front_flap = new THREE.Mesh(front_flapGeom, suedeMat);
  front_flap.name = "front_flap";
  front_flap.position.set(0, flapCenterY, 0.245);
  closure.add(front_flap);

  const flap_trimGeom = makeFlapTrimGeometry(flapW, flapH, 0.043);
  const flap_trim = new THREE.Mesh(flap_trimGeom, threadMat);
  flap_trim.name = "flap_trim";
  flap_trim.position.set(0, flapCenterY, 0.245);
  closure.add(flap_trim);

  const flap_stitchingGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    0.034,
    6
  );
  const flap_stitching = new THREE.InstancedMesh(
    flap_stitchingGeom,
    threadMat,
    38
  );
  flap_stitching.name = "flap_stitching";
  const flapStitchDummy = new THREE.Object3D();
  let flapStitchIndex = 0;
  const stitchHalfW = flapW / 2 - 0.055;
  const stitchHalfH = flapH / 2 - 0.055;

  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    const x = -stitchHalfW + 0.19 + t * (stitchHalfW * 2 - 0.38);
    flapStitchDummy.position.set(x, flapCenterY - stitchHalfH, 0.296);
    flapStitchDummy.rotation.set(0, 0, Math.PI / 2);
    flapStitchDummy.updateMatrix();
    flap_stitching.setMatrixAt(flapStitchIndex++, flapStitchDummy.matrix);
  }

  for (const side of [-1, 1]) {
    for (let i = 0; i < 12; i++) {
      const t = i / 11;
      const y = flapCenterY - stitchHalfH + 0.18 +
        t * (stitchHalfH * 2 - 0.30);
      flapStitchDummy.position.set(side * stitchHalfW, y, 0.296);
      flapStitchDummy.rotation.set(0, 0, 0);
      flapStitchDummy.updateMatrix();
      flap_stitching.setMatrixAt(flapStitchIndex++, flapStitchDummy.matrix);
    }
  }
  flap_stitching.instanceMatrix.needsUpdate = true;
  closure.add(flap_stitching);

  const flap_fiberGeom = makeFlapFiberGeometry(
    flapW,
    flapH,
    180,
    0.044
  );
  const flap_fiber = new THREE.LineSegments(flap_fiberGeom, fiberMat);
  flap_fiber.name = "flap_fiber";
  flap_fiber.position.set(0, flapCenterY, 0.245);
  closure.add(flap_fiber);

  const snap_baseGeom = new THREE.CylinderGeometry(0.098, 0.098, 0.018, 24);
  const snap_capGeom = new THREE.SphereGeometry(0.09, 24, 12);

  const upper_snap_base = new THREE.Mesh(snap_baseGeom, snapRimMat);
  upper_snap_base.name = "upper_snap_base";
  upper_snap_base.rotation.x = Math.PI / 2;
  upper_snap_base.position.set(0.16, 0.30, 0.298);
  closure.add(upper_snap_base);

  const upper_snap = new THREE.Mesh(snap_capGeom, snapMat);
  upper_snap.name = "upper_snap";
  upper_snap.scale.set(1, 1, 0.25);
  upper_snap.position.set(0.16, 0.30, 0.314);
  closure.add(upper_snap);

  const lower_snap_base = new THREE.Mesh(snap_baseGeom, snapRimMat);
  lower_snap_base.name = "lower_snap_base";
  lower_snap_base.rotation.x = Math.PI / 2;
  lower_snap_base.position.set(0.16, -0.015, 0.222);
  pouch_body.add(lower_snap_base);

  const lower_snap = new THREE.Mesh(snap_capGeom, snapMat);
  lower_snap.name = "lower_snap";
  lower_snap.scale.set(1, 1, 0.25);
  lower_snap.position.set(0.16, -0.015, 0.238);
  pouch_body.add(lower_snap);

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