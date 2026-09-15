export default function generate(THREE) {
  const root = new THREE.Group();
  const body_assembly = new THREE.Group();
  const hole_assembly = new THREE.Group();
  const decoration_assembly = new THREE.Group();
  root.add(body_assembly, hole_assembly, decoration_assembly);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xc98d35,
    metalness: 0.0,
    roughness: 0.6,
  });
  const endWoodMat = new THREE.MeshStandardMaterial({
    color: 0xa96d2d,
    metalness: 0.0,
    roughness: 0.65,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x92571f,
    metalness: 0.0,
    roughness: 0.75,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x5b3215,
    metalness: 0.0,
    roughness: 0.75,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x160b04,
    metalness: 0.0,
    roughness: 0.9,
  });
  const holeRimMat = new THREE.MeshStandardMaterial({
    color: 0x754216,
    metalness: 0.0,
    roughness: 0.75,
  });

  const lower_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.22, 0.00),
    new THREE.Vector2(0.34, 0.04),
    new THREE.Vector2(0.41, 0.13),
    new THREE.Vector2(0.44, 0.27),
    new THREE.Vector2(0.43, 0.42),
    new THREE.Vector2(0.39, 0.58),
    new THREE.Vector2(0.36, 0.78),
  ];
  const lower_footGeom = new THREE.LatheGeometry(lower_footProfile);
  const lower_foot = new THREE.Mesh(lower_footGeom, endWoodMat);
  body_assembly.add(lower_foot);

  const lower_bodyProfile = [
    new THREE.Vector2(0.36, 0.70),
    new THREE.Vector2(0.34, 0.88),
    new THREE.Vector2(0.31, 1.18),
    new THREE.Vector2(0.30, 1.55),
    new THREE.Vector2(0.31, 1.92),
    new THREE.Vector2(0.34, 2.20),
    new THREE.Vector2(0.38, 2.38),
    new THREE.Vector2(0.40, 2.48),
    new THREE.Vector2(0.39, 2.58),
    new THREE.Vector2(0.36, 2.72),
  ];
  const lower_bodyGeom = new THREE.LatheGeometry(lower_bodyProfile);
  const lower_body = new THREE.Mesh(lower_bodyGeom, woodMat);
  body_assembly.add(lower_body);

  const main_bodyProfile = [
    new THREE.Vector2(0.36, 2.60),
    new THREE.Vector2(0.35, 2.82),
    new THREE.Vector2(0.35, 3.35),
    new THREE.Vector2(0.36, 4.10),
    new THREE.Vector2(0.37, 4.90),
    new THREE.Vector2(0.38, 5.65),
    new THREE.Vector2(0.39, 6.25),
    new THREE.Vector2(0.40, 6.55),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile);
  const main_body = new THREE.Mesh(main_bodyGeom, woodMat);
  body_assembly.add(main_body);

  const upper_jointProfile = [
    new THREE.Vector2(0.39, 6.45),
    new THREE.Vector2(0.42, 6.52),
    new THREE.Vector2(0.43, 6.62),
    new THREE.Vector2(0.42, 6.75),
    new THREE.Vector2(0.40, 6.92),
    new THREE.Vector2(0.39, 7.08),
  ];
  const upper_jointGeom = new THREE.LatheGeometry(upper_jointProfile);
  const upper_joint = new THREE.Mesh(upper_jointGeom, woodMat);
  body_assembly.add(upper_joint);

  const upper_bodyProfile = [
    new THREE.Vector2(0.39, 7.00),
    new THREE.Vector2(0.38, 7.18),
    new THREE.Vector2(0.36, 7.48),
    new THREE.Vector2(0.34, 7.85),
    new THREE.Vector2(0.34, 8.20),
    new THREE.Vector2(0.35, 8.55),
    new THREE.Vector2(0.37, 8.90),
    new THREE.Vector2(0.40, 9.22),
    new THREE.Vector2(0.44, 9.48),
    new THREE.Vector2(0.47, 9.62),
  ];
  const upper_bodyGeom = new THREE.LatheGeometry(upper_bodyProfile);
  const upper_body = new THREE.Mesh(upper_bodyGeom, woodMat);
  body_assembly.add(upper_body);

  const top_capProfile = [
    new THREE.Vector2(0.46, 9.55),
    new THREE.Vector2(0.50, 9.59),
    new THREE.Vector2(0.53, 9.67),
    new THREE.Vector2(0.53, 9.75),
    new THREE.Vector2(0.50, 9.83),
    new THREE.Vector2(0.43, 9.89),
    new THREE.Vector2(0.00, 9.91),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile);
  const top_cap = new THREE.Mesh(top_capGeom, woodMat);
  body_assembly.add(top_cap);

  const grooveGeom = new THREE.TorusGeometry(1, 0.025, 8, 48);
  const grooveData = [
    [2.40, 0.392],
    [2.49, 0.397],
    [6.50, 0.417],
    [6.60, 0.427],
    [6.96, 0.396],
    [9.59, 0.500],
  ];
  const decorative_grooves = new THREE.InstancedMesh(
    grooveGeom,
    grooveMat,
    grooveData.length
  );
  const grooveDummy = new THREE.Object3D();
  for (let i = 0; i < grooveData.length; i++) {
    grooveDummy.position.set(0, grooveData[i][0], 0);
    grooveDummy.rotation.set(Math.PI / 2, 0, 0);
    grooveDummy.scale.setScalar(grooveData[i][1]);
    grooveDummy.updateMatrix();
    decorative_grooves.setMatrixAt(i, grooveDummy.matrix);
  }
  decorative_grooves.instanceMatrix.needsUpdate = true;
  decoration_assembly.add(decorative_grooves);

  const fingerHoleData = [
    [6.91, 0.397, 0.135],
    [5.35, 0.383, 0.145],
    [4.42, 0.374, 0.145],
    [3.48, 0.365, 0.142],
    [2.82, 0.355, 0.142],
  ];
  const finger_holesGeom = new THREE.CircleGeometry(1, 32);
  const finger_holes = new THREE.InstancedMesh(
    finger_holesGeom,
    holeMat,
    fingerHoleData.length
  );
  const fingerDummy = new THREE.Object3D();
  for (let i = 0; i < fingerHoleData.length; i++) {
    const y = fingerHoleData[i][0];
    const radius = fingerHoleData[i][1];
    const size = fingerHoleData[i][2];
    fingerDummy.position.set(0, y, radius + 0.009);
    fingerDummy.rotation.set(0, 0, 0);
    fingerDummy.scale.set(size, size, 1);
    fingerDummy.updateMatrix();
    finger_holes.setMatrixAt(i, fingerDummy.matrix);
  }
  finger_holes.instanceMatrix.needsUpdate = true;
  hole_assembly.add(finger_holes);

  const finger_hole_rimsGeom = new THREE.TorusGeometry(0.88, 0.12, 8, 28);
  const finger_hole_rims = new THREE.InstancedMesh(
    finger_hole_rimsGeom,
    holeRimMat,
    fingerHoleData.length
  );
  for (let i = 0; i < fingerHoleData.length; i++) {
    const y = fingerHoleData[i][0];
    const radius = fingerHoleData[i][1];
    const size = fingerHoleData[i][2];
    fingerDummy.position.set(0, y, radius + 0.012);
    fingerDummy.rotation.set(0, 0, 0);
    fingerDummy.scale.set(size, size, size);
    fingerDummy.updateMatrix();
    finger_hole_rims.setMatrixAt(i, fingerDummy.matrix);
  }
  finger_hole_rims.instanceMatrix.needsUpdate = true;
  hole_assembly.add(finger_hole_rims);

  function radiusAt(y) {
    if (y < 0.42) return 0.43;
    if (y < 1.55) return 0.31;
    if (y < 2.38) return 0.31 + (y - 1.55) * 0.085;
    if (y < 6.55) return 0.355 + (y - 2.38) * 0.011;
    if (y < 7.08) return 0.40;
    if (y < 8.20) return 0.39 - (y - 7.08) * 0.036;
    if (y < 9.58) return 0.35 + (y - 8.20) * 0.072;
    return 0.49;
  }

  const wood_grain = new THREE.Group();
  const grainCount = 14;
  for (let i = 0; i < grainCount; i++) {
    const baseAngle = (i / grainCount) * Math.PI * 2;
    const startY = 0.42 + (i % 3) * 0.08;
    const endY = 9.58 - (i % 4) * 0.07;
    const grainPoints = [];
    const pointCount = 10;
    for (let j = 0; j < pointCount; j++) {
      const t = j / (pointCount - 1);
      const y = startY + (endY - startY) * t;
      const angle =
        baseAngle +
        Math.sin(t * Math.PI * 2 + i * 0.73) * 0.012 +
        Math.sin(t * Math.PI * 5 + i * 0.31) * 0.004;
      const radius = radiusAt(y) + 0.004;
      grainPoints.push(
        new THREE.Vector3(
          Math.sin(angle) * radius,
          y,
          Math.cos(angle) * radius
        )
      );
    }
    const grainCurve = new THREE.CatmullRomCurve3(
      grainPoints,
      false,
      "centripetal"
    );
    const grainGeom = new THREE.TubeGeometry(
      grainCurve,
      36,
      0.0035,
      5,
      false
    );
    const grain = new THREE.Mesh(grainGeom, grainMat);
    wood_grain.add(grain);
  }
  decoration_assembly.add(wood_grain);

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