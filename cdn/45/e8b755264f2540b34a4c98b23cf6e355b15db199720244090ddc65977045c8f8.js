export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_copper_kettle";

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb8734f,
    metalness: 0.6,
    roughness: 0.4,
  });
  const brightCopperMat = new THREE.MeshStandardMaterial({
    color: 0xcf855d,
    metalness: 0.6,
    roughness: 0.38,
  });
  const darkCopperMat = new THREE.MeshStandardMaterial({
    color: 0x673528,
    metalness: 0.5,
    roughness: 0.5,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x382923,
    metalness: 0.15,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const knobMat = new THREE.MeshStandardMaterial({
    color: 0x4b2b21,
    metalness: 0.2,
    roughness: 0.3,
  });
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xd8d2b8,
    metalness: 0.0,
    roughness: 0.45,
  });
  const greenGlazeMat = new THREE.MeshStandardMaterial({
    color: 0x286847,
    metalness: 0.0,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const lightGreenGlazeMat = new THREE.MeshStandardMaterial({
    color: 0x668e55,
    metalness: 0.0,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const leafVeinMat = new THREE.MeshStandardMaterial({
    color: 0xc8c9a9,
    metalness: 0.0,
    roughness: 0.55,
  });

  const body_assembly = new THREE.Group();
  body_assembly.name = "body_assembly";
  root.add(body_assembly);

  const bodyProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.78, 0.0),
    new THREE.Vector2(0.84, 0.018),
    new THREE.Vector2(0.86, 0.055),
    new THREE.Vector2(0.85, 0.105),
    new THREE.Vector2(0.82, 0.16),
    new THREE.Vector2(0.805, 0.34),
    new THREE.Vector2(0.785, 0.58),
    new THREE.Vector2(0.755, 0.82),
    new THREE.Vector2(0.715, 1.05),
    new THREE.Vector2(0.675, 1.25),
    new THREE.Vector2(0.645, 1.36),
    new THREE.Vector2(0.65, 1.405),
    new THREE.Vector2(0.0, 1.405),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile);
  const body = new THREE.Mesh(bodyGeom, copperMat);
  body.name = "body";
  body_assembly.add(body);

  const base_footGeom = new THREE.CylinderGeometry(0.85, 0.85, 0.035, 64);
  const base_foot = new THREE.Mesh(base_footGeom, darkCopperMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.018;
  body_assembly.add(base_foot);

  const bottom_rimGeom = new THREE.TorusGeometry(0.835, 0.027, 12, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, brightCopperMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.055;
  body_assembly.add(bottom_rim);

  const bottom_shadow_bandGeom = new THREE.TorusGeometry(0.825, 0.011, 8, 64);
  const bottom_shadow_band = new THREE.Mesh(bottom_shadow_bandGeom, darkCopperMat);
  bottom_shadow_band.name = "bottom_shadow_band";
  bottom_shadow_band.rotation.x = Math.PI / 2;
  bottom_shadow_band.position.y = 0.095;
  body_assembly.add(bottom_shadow_band);

  const upper_collarGeom = new THREE.CylinderGeometry(0.655, 0.665, 0.075, 64);
  const upper_collar = new THREE.Mesh(upper_collarGeom, brightCopperMat);
  upper_collar.name = "upper_collar";
  upper_collar.position.y = 1.39;
  body_assembly.add(upper_collar);

  const upper_rimGeom = new THREE.TorusGeometry(0.65, 0.025, 12, 64);
  const upper_rim = new THREE.Mesh(upper_rimGeom, brightCopperMat);
  upper_rim.name = "upper_rim";
  upper_rim.rotation.x = Math.PI / 2;
  upper_rim.position.y = 1.425;
  body_assembly.add(upper_rim);

  const lid_shadow_gapGeom = new THREE.TorusGeometry(0.645, 0.012, 8, 64);
  const lid_shadow_gap = new THREE.Mesh(lid_shadow_gapGeom, darkCopperMat);
  lid_shadow_gap.name = "lid_shadow_gap";
  lid_shadow_gap.rotation.x = Math.PI / 2;
  lid_shadow_gap.position.y = 1.445;
  body_assembly.add(lid_shadow_gap);

  const lid_assembly = new THREE.Group();
  lid_assembly.name = "lid_assembly";
  root.add(lid_assembly);

  const lid_skirtGeom = new THREE.CylinderGeometry(0.665, 0.68, 0.13, 64);
  const lid_skirt = new THREE.Mesh(lid_skirtGeom, copperMat);
  lid_skirt.name = "lid_skirt";
  lid_skirt.position.y = 1.505;
  lid_assembly.add(lid_skirt);

  const lid_lower_rimGeom = new THREE.TorusGeometry(0.665, 0.022, 10, 64);
  const lid_lower_rim = new THREE.Mesh(lid_lower_rimGeom, brightCopperMat);
  lid_lower_rim.name = "lid_lower_rim";
  lid_lower_rim.rotation.x = Math.PI / 2;
  lid_lower_rim.position.y = 1.45;
  lid_assembly.add(lid_lower_rim);

  const lid_domeProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.64, 0.0),
    new THREE.Vector2(0.68, 0.025),
    new THREE.Vector2(0.68, 0.065),
    new THREE.Vector2(0.65, 0.105),
    new THREE.Vector2(0.59, 0.145),
    new THREE.Vector2(0.50, 0.19),
    new THREE.Vector2(0.39, 0.225),
    new THREE.Vector2(0.27, 0.25),
    new THREE.Vector2(0.14, 0.268),
    new THREE.Vector2(0.0, 0.275),
  ];
  const lid_domeGeom = new THREE.LatheGeometry(lid_domeProfile);
  const lid_dome = new THREE.Mesh(lid_domeGeom, copperMat);
  lid_dome.name = "lid_dome";
  lid_dome.position.y = 1.55;
  lid_assembly.add(lid_dome);

  const lid_outer_rimGeom = new THREE.TorusGeometry(0.66, 0.021, 10, 64);
  const lid_outer_rim = new THREE.Mesh(lid_outer_rimGeom, brightCopperMat);
  lid_outer_rim.name = "lid_outer_rim";
  lid_outer_rim.rotation.x = Math.PI / 2;
  lid_outer_rim.position.y = 1.585;
  lid_assembly.add(lid_outer_rim);

  const knob_baseGeom = new THREE.CylinderGeometry(0.105, 0.12, 0.065, 32);
  const knob_base = new THREE.Mesh(knob_baseGeom, darkCopperMat);
  knob_base.name = "knob_base";
  knob_base.position.y = 1.84;
  lid_assembly.add(knob_base);

  const knob_stemGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.12, 32);
  const knob_stem = new THREE.Mesh(knob_stemGeom, knobMat);
  knob_stem.name = "knob_stem";
  knob_stem.position.y = 1.91;
  lid_assembly.add(knob_stem);

  const knobGeom = new THREE.SphereGeometry(1, 32, 20);
  const knob = new THREE.Mesh(knobGeom, knobMat);
  knob.name = "knob";
  knob.scale.set(0.15, 0.18, 0.15);
  knob.position.y = 2.06;
  lid_assembly.add(knob);

  const spout_assembly = new THREE.Group();
  spout_assembly.name = "spout_assembly";
  root.add(spout_assembly);

  const spoutPoints = [
    new THREE.Vector3(-0.66, 0.58, 0.0),
    new THREE.Vector3(-0.86, 0.58, 0.0),
    new THREE.Vector3(-1.01, 0.72, 0.0),
    new THREE.Vector3(-1.08, 0.96, 0.0),
    new THREE.Vector3(-1.10, 1.20, 0.0),
    new THREE.Vector3(-1.19, 1.42, 0.0),
    new THREE.Vector3(-1.37, 1.57, 0.0),
  ];
  const spoutRadii = [0.24, 0.225, 0.19, 0.155, 0.13, 0.13, 0.16];
  const spoutCurve = new THREE.CatmullRomCurve3(
    spoutPoints,
    false,
    "centripetal"
  );

  const spoutGeom = createTaperedTubeGeometry(
    THREE,
    spoutCurve,
    spoutRadii,
    48,
    18
  );
  const spout = new THREE.Mesh(spoutGeom, copperMat);
  spout.name = "spout";
  spout_assembly.add(spout);

  const spoutEnd = spoutCurve.getPoint(1);
  const spoutTangent = spoutCurve.getTangent(1).normalize();
  const spoutOrientation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutTangent
  );

  const spout_lipGeom = new THREE.TorusGeometry(0.148, 0.018, 10, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, brightCopperMat);
  spout_lip.name = "spout_lip";
  spout_lip.position.copy(spoutEnd);
  spout_lip.quaternion.copy(spoutOrientation);
  spout_assembly.add(spout_lip);

  const spout_openingGeom = new THREE.CircleGeometry(0.137, 40);
  const spout_opening = new THREE.Mesh(spout_openingGeom, patinaMat);
  spout_opening.name = "spout_opening";
  spout_opening.position
    .copy(spoutEnd)
    .add(spoutTangent.clone().multiplyScalar(0.006));
  spout_opening.quaternion.copy(spoutOrientation);
  spout_assembly.add(spout_opening);

  const spout_collarGeom = new THREE.TorusGeometry(0.218, 0.018, 10, 40);
  const spout_collar = new THREE.Mesh(spout_collarGeom, darkCopperMat);
  spout_collar.name = "spout_collar";
  spout_collar.position.set(-0.73, 0.58, 0.0);
  spout_collar.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(-1, 0, 0)
  );
  spout_assembly.add(spout_collar);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const handlePoints = [
    new THREE.Vector3(0.61, 1.29, -0.04),
    new THREE.Vector3(0.86, 1.47, -0.04),
    new THREE.Vector3(1.07, 1.72, -0.04),
    new THREE.Vector3(1.25, 1.84, -0.04),
    new THREE.Vector3(1.43, 1.79, -0.04),
    new THREE.Vector3(1.56, 1.60, -0.04),
    new THREE.Vector3(1.59, 1.34, -0.04),
    new THREE.Vector3(1.54, 1.08, -0.04),
    new THREE.Vector3(1.42, 0.83, -0.04),
    new THREE.Vector3(1.23, 0.61, -0.04),
    new THREE.Vector3(0.96, 0.43, -0.04),
    new THREE.Vector3(0.73, 0.36, -0.04),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal"
  );

  const handle_mountGeom = new THREE.CylinderGeometry(0.105, 0.135, 0.29, 24);

  const upperMountStart = new THREE.Vector3(0.56, 1.25, -0.04);
  const upperMountEnd = new THREE.Vector3(0.78, 1.43, -0.04);
  const upperMountDirection = upperMountEnd.clone().sub(upperMountStart);
  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, darkCopperMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position
    .copy(upperMountStart)
    .add(upperMountEnd)
    .multiplyScalar(0.5);
  upper_handle_mount.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    upperMountDirection.clone().normalize()
  );
  handle_assembly.add(upper_handle_mount);

  const lowerMountStart = new THREE.Vector3(0.61, 0.34, -0.04);
  const lowerMountEnd = new THREE.Vector3(0.82, 0.47, -0.04);
  const lowerMountDirection = lowerMountEnd.clone().sub(lowerMountStart);
  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, darkCopperMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position
    .copy(lowerMountStart)
    .add(lowerMountEnd)
    .multiplyScalar(0.5);
  lower_handle_mount.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    lowerMountDirection.clone().normalize()
  );
  handle_assembly.add(lower_handle_mount);

  const handle_coreGeom = new THREE.TubeGeometry(
    handleCurve,
    96,
    0.105,
    16,
    false
  );
  const handle_core = new THREE.Mesh(handle_coreGeom, ceramicMat);
  handle_core.name = "handle_core";
  handle_assembly.add(handle_core);

  const handle_borderGeom = new THREE.TubeGeometry(
    handleCurve,
    96,
    0.116,
    16,
    false
  );
  const handle_border = new THREE.Mesh(handle_borderGeom, greenGlazeMat);
  handle_border.name = "handle_border";
  handle_assembly.add(handle_border);

  const handle_inner_glazeGeom = new THREE.TubeGeometry(
    handleCurve,
    96,
    0.098,
    16,
    false
  );
  const handle_inner_glaze = new THREE.Mesh(
    handle_inner_glazeGeom,
    ceramicMat
  );
  handle_inner_glaze.name = "handle_inner_glaze";
  handle_assembly.add(handle_inner_glaze);

  const handle_leafGeom = new THREE.CircleGeometry(1, 16);
  const handle_leaf_count = 36;
  const handle_leaves = new THREE.InstancedMesh(
    handle_leafGeom,
    greenGlazeMat,
    handle_leaf_count
  );
  handle_leaves.name = "handle_leaves";

  const handle_leaf_inlays = new THREE.InstancedMesh(
    handle_leafGeom,
    lightGreenGlazeMat,
    handle_leaf_count
  );
  handle_leaf_inlays.name = "handle_leaf_inlays";

  const handle_leaf_veinGeom = new THREE.BoxGeometry(0.008, 0.09, 0.004);
  const handle_leaf_veins = new THREE.InstancedMesh(
    handle_leaf_veinGeom,
    leafVeinMat,
    handle_leaf_count
  );
  handle_leaf_veins.name = "handle_leaf_veins";

  const leafDummy = new THREE.Object3D();
  const inlayDummy = new THREE.Object3D();
  const veinDummy = new THREE.Object3D();
  const frontNormal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < handle_leaf_count; i++) {
    const t = 0.035 + (i / (handle_leaf_count - 1)) * 0.93;
    const point = handleCurve.getPoint(t);
    const tangent = handleCurve.getTangent(t).normalize();
    const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
    const alternating = i % 2 === 0 ? 1 : -1;
    const sideOffset = alternating * 0.027;
    const rotation =
      Math.atan2(tangent.y, tangent.x) -
      Math.PI / 2 +
      alternating * 0.58;

    const surfaceNormal = normal
      .clone()
      .multiplyScalar(sideOffset / 0.105)
      .add(frontNormal.clone().multiplyScalar(0.98))
      .normalize();
    const surfacePoint = point
      .clone()
      .add(normal.clone().multiplyScalar(sideOffset))
      .add(frontNormal.clone().multiplyScalar(0.106));

    leafDummy.position.copy(surfacePoint);
    leafDummy.quaternion.setFromUnitVectors(frontNormal, surfaceNormal);
    leafDummy.rotateZ(rotation);
    leafDummy.scale.set(0.038, 0.088, 1);
    leafDummy.updateMatrix();
    handle_leaves.setMatrixAt(i, leafDummy.matrix);

    inlayDummy.position
      .copy(surfacePoint)
      .add(surfaceNormal.clone().multiplyScalar(0.003));
    inlayDummy.quaternion.copy(leafDummy.quaternion);
    inlayDummy.scale.set(0.023, 0.066, 1);
    inlayDummy.updateMatrix();
    handle_leaf_inlays.setMatrixAt(i, inlayDummy.matrix);

    veinDummy.position
      .copy(surfacePoint)
      .add(surfaceNormal.clone().multiplyScalar(0.006));
    veinDummy.quaternion.copy(leafDummy.quaternion);
    veinDummy.updateMatrix();
    handle_leaf_veins.setMatrixAt(i, veinDummy.matrix);
  }

  handle_leaves.instanceMatrix.needsUpdate = true;
  handle_leaf_inlays.instanceMatrix.needsUpdate = true;
  handle_leaf_veins.instanceMatrix.needsUpdate = true;
  handle_assembly.add(handle_leaves);
  handle_assembly.add(handle_leaf_inlays);
  handle_assembly.add(handle_leaf_veins);

  const body_patina_count = 28;
  const body_patinaGeom = new THREE.CircleGeometry(1, 12);
  const body_patina = new THREE.InstancedMesh(
    body_patinaGeom,
    patinaMat,
    body_patina_count
  );
  body_patina.name = "body_patina";

  const patinaDummy = new THREE.Object3D();
  for (let i = 0; i < body_patina_count; i++) {
    const y = 0.16 + (((i * 11) % 29) / 28) * 1.12;
    const angle = -1.02 + (((i * 7) % 31) / 30) * 2.04;
    const radius = bodyRadiusAt(y) + 0.006;
    const normal = new THREE.Vector3(
      Math.sin(angle),
      0.12,
      Math.cos(angle)
    ).normalize();
    const position = new THREE.Vector3(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
    const size = 0.012 + (i % 5) * 0.006;

    patinaDummy.position.copy(position);
    patinaDummy.quaternion.setFromUnitVectors(frontNormal, normal);
    patinaDummy.rotateZ((i % 7) * 0.43);
    patinaDummy.scale.set(size * (1.0 + (i % 3) * 0.45), size, 1);
    patinaDummy.updateMatrix();
    body_patina.setMatrixAt(i, patinaDummy.matrix);
  }
  body_patina.instanceMatrix.needsUpdate = true;
  body_assembly.add(body_patina);

  const lid_patina_count = 12;
  const lid_patinaGeom = new THREE.CircleGeometry(1, 12);
  const lid_patina = new THREE.InstancedMesh(
    lid_patinaGeom,
    patinaMat,
    lid_patina_count
  );
  lid_patina.name = "lid_patina";

  const lidPatinaDummy = new THREE.Object3D();
  for (let i = 0; i < lid_patina_count; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.08 + (i % 5) * 0.075;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 1.827 - 0.22 * (radius / 0.68) * (radius / 0.68);
    const normal = new THREE.Vector3(
      Math.cos(angle) * 0.35,
      1,
      Math.sin(angle) * 0.35
    ).normalize();
    const size = 0.011 + (i % 4) * 0.005;

    lidPatinaDummy.position.set(x, y, z);
    lidPatinaDummy.quaternion.setFromUnitVectors(frontNormal, normal);
    lidPatinaDummy.rotateZ(angle * 0.7);
    lidPatinaDummy.scale.set(size * 1.5, size, 1);
    lidPatinaDummy.updateMatrix();
    lid_patina.setMatrixAt(i, lidPatinaDummy.matrix);
  }
  lid_patina.instanceMatrix.needsUpdate = true;
  lid_assembly.add(lid_patina);

  fitToUnitCube(THREE, root);
  return root;
}

function createTaperedTubeGeometry(
  THREE,
  curve,
  radii,
  lengthSegments,
  radialSegments
) {
  const positions = [];
  const indices = [];
  const reference = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i <= lengthSegments; i++) {
    const t = i / lengthSegments;
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();
    const normal = new THREE.Vector3()
      .crossVectors(tangent, reference)
      .normalize();
    const binormal = new THREE.Vector3()
      .crossVectors(tangent, normal)
      .normalize();

    const scaled = t * (radii.length - 1);
    const index0 = Math.min(Math.floor(scaled), radii.length - 2);
    const blend = scaled - index0;
    const radius = radii[index0] * (1 - blend) + radii[index0 + 1] * blend;

    for (let j = 0; j < radialSegments; j++) {
      const angle = (j / radialSegments) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      positions.push(
        point.x + normal.x * cos * radius + binormal.x * sin * radius,
        point.y + normal.y * cos * radius + binormal.y * sin * radius,
        point.z + normal.z * cos * radius + binormal.z * sin * radius
      );
    }
  }

  for (let i = 0; i < lengthSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const next = (j + 1) % radialSegments;
      const a = i * radialSegments + j;
      const b = i * radialSegments + next;
      const c = (i + 1) * radialSegments + next;
      const d = (i + 1) * radialSegments + j;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function bodyRadiusAt(y) {
  if (y < 0.12) return 0.85;
  if (y < 0.35) return 0.85 - ((y - 0.12) / 0.23) * 0.045;
  if (y < 0.82) return 0.805 - ((y - 0.35) / 0.47) * 0.05;
  if (y < 1.08) return 0.755 - ((y - 0.82) / 0.26) * 0.045;
  if (y < 1.34) return 0.71 - ((y - 1.08) / 0.26) * 0.055;
  return 0.65;
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