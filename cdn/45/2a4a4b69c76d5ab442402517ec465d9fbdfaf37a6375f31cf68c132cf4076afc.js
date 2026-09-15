export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "square_plastic_bin";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x292b2c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x242627,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0x202223,
    metalness: 0.0,
    roughness: 0.8,
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x090a0a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0x181a1b,
    metalness: 0.0,
    roughness: 0.75,
  });

  function addRoundedContour(path, width, depth, radius, clockwise) {
    const hw = width / 2;
    const hd = depth / 2;
    const r = Math.min(radius, hw, hd);

    if (!clockwise) {
      path.moveTo(-hw + r, -hd);
      path.lineTo(hw - r, -hd);
      path.quadraticCurveTo(hw, -hd, hw, -hd + r);
      path.lineTo(hw, hd - r);
      path.quadraticCurveTo(hw, hd, hw - r, hd);
      path.lineTo(-hw + r, hd);
      path.quadraticCurveTo(-hw, hd, -hw, hd - r);
      path.lineTo(-hw, -hd + r);
      path.quadraticCurveTo(-hw, -hd, -hw + r, -hd);
    } else {
      path.moveTo(-hw + r, -hd);
      path.quadraticCurveTo(-hw, -hd, -hw, -hd + r);
      path.lineTo(-hw, hd - r);
      path.quadraticCurveTo(-hw, hd, -hw + r, hd);
      path.lineTo(hw - r, hd);
      path.quadraticCurveTo(hw, hd, hw, hd - r);
      path.lineTo(hw, -hd + r);
      path.quadraticCurveTo(hw, -hd, hw - r, -hd);
      path.lineTo(-hw + r, -hd);
    }
    path.closePath();
  }

  function createRoundedPrismGeometry(width, depth, height, radius, bevel) {
    const shape = new THREE.Shape();
    addRoundedContour(shape, width, depth, radius, false);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -height / 2);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function createRoundedRingGeometry(
    outerWidth,
    outerDepth,
    innerWidth,
    innerDepth,
    height,
    outerRadius,
    innerRadius,
    bevel
  ) {
    const shape = new THREE.Shape();
    addRoundedContour(shape, outerWidth, outerDepth, outerRadius, false);

    const hole = new THREE.Path();
    addRoundedContour(hole, innerWidth, innerDepth, innerRadius, true);
    shape.holes.push(hole);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -height / 2);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const body_shellGeom = createRoundedPrismGeometry(
    2.38, 2.18, 2.35, 0.17, 0.035
  );
  const body_shell = new THREE.Mesh(body_shellGeom, bodyMat);
  body_shell.name = "body_shell";
  body_shell.position.y = 1.55;
  body_group.add(body_shell);

  const bottom_baseGeom = createRoundedPrismGeometry(
    2.43, 2.23, 0.42, 0.18, 0.04
  );
  const bottom_base = new THREE.Mesh(bottom_baseGeom, rimMat);
  bottom_base.name = "bottom_base";
  bottom_base.position.y = 0.25;
  body_group.add(bottom_base);

  const bottom_transition_bandGeom = createRoundedPrismGeometry(
    2.44, 2.24, 0.07, 0.18, 0.018
  );
  const bottom_transition_band = new THREE.Mesh(
    bottom_transition_bandGeom,
    rimMat
  );
  bottom_transition_band.name = "bottom_transition_band";
  bottom_transition_band.position.y = 0.49;
  body_group.add(bottom_transition_band);

  const top_collarGeom = createRoundedPrismGeometry(
    2.45, 2.25, 0.25, 0.18, 0.035
  );
  const top_collar = new THREE.Mesh(top_collarGeom, rimMat);
  top_collar.name = "top_collar";
  top_collar.position.y = 2.76;
  body_group.add(top_collar);

  const top_rimGeom = createRoundedRingGeometry(
    2.58, 2.38, 2.12, 1.92, 0.25, 0.2, 0.12, 0.035
  );
  const top_rim = new THREE.Mesh(top_rimGeom, rimMat);
  top_rim.name = "top_rim";
  top_rim.position.y = 2.94;
  body_group.add(top_rim);

  const opening_floorGeom = createRoundedPrismGeometry(
    2.08, 1.88, 0.055, 0.1, 0.012
  );
  const opening_floor = new THREE.Mesh(opening_floorGeom, shadowMat);
  opening_floor.name = "opening_floor";
  opening_floor.position.y = 2.84;
  body_group.add(opening_floor);

  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  lid_group.position.set(0, 3.075, -0.035);
  lid_group.rotation.x = 0.055;
  root.add(lid_group);

  const lid_underlipGeom = createRoundedPrismGeometry(
    2.14, 1.94, 0.1, 0.11, 0.018
  );
  const lid_underlip = new THREE.Mesh(lid_underlipGeom, shadowMat);
  lid_underlip.name = "lid_underlip";
  lid_underlip.position.y = -0.07;
  lid_group.add(lid_underlip);

  const lid_panelGeom = createRoundedPrismGeometry(
    2.18, 1.98, 0.14, 0.12, 0.025
  );
  const lid_panel = new THREE.Mesh(lid_panelGeom, lidMat);
  lid_panel.name = "lid_panel";
  lid_group.add(lid_panel);

  const lid_inset_panelGeom = createRoundedPrismGeometry(
    1.98, 1.78, 0.018, 0.085, 0.006
  );
  const lid_inset_panel = new THREE.Mesh(lid_inset_panelGeom, bodyMat);
  lid_inset_panel.name = "lid_inset_panel";
  lid_inset_panel.position.y = 0.078;
  lid_group.add(lid_inset_panel);

  const lid_borderGeom = createRoundedRingGeometry(
    2.09, 1.89, 1.96, 1.76, 0.025, 0.105, 0.075, 0.006
  );
  const lid_border = new THREE.Mesh(lid_borderGeom, rimMat);
  lid_border.name = "lid_border";
  lid_border.position.y = 0.084;
  lid_group.add(lid_border);

  const lid_rivetsGeom = new THREE.CylinderGeometry(
    0.082, 0.092, 0.027, 20
  );
  const lid_rivets = new THREE.InstancedMesh(
    lid_rivetsGeom,
    rivetMat,
    4
  );
  lid_rivets.name = "lid_rivets";

  const rivet_positions = [
    [-0.82, 0.105, -0.72],
    [0.82, 0.105, -0.72],
    [-0.82, 0.105, 0.72],
    [0.82, 0.105, 0.72],
  ];
  const rivet_dummy = new THREE.Object3D();
  for (let i = 0; i < rivet_positions.length; i++) {
    const position = rivet_positions[i];
    rivet_dummy.position.set(position[0], position[1], position[2]);
    rivet_dummy.updateMatrix();
    lid_rivets.setMatrixAt(i, rivet_dummy.matrix);
  }
  lid_rivets.instanceMatrix.needsUpdate = true;
  lid_group.add(lid_rivets);

  const lid_center_dimpleGeom = new THREE.CylinderGeometry(
    0.052, 0.058, 0.012, 18
  );
  const lid_center_dimple = new THREE.Mesh(
    lid_center_dimpleGeom,
    rivetMat
  );
  lid_center_dimple.name = "lid_center_dimple";
  lid_center_dimple.position.set(0.12, 0.101, 0.02);
  lid_group.add(lid_center_dimple);

  const lid_hinge_mountsGeom = new THREE.BoxGeometry(0.17, 0.2, 0.12);
  const lid_hinge_mounts = new THREE.InstancedMesh(
    lid_hinge_mountsGeom,
    shadowMat,
    2
  );
  lid_hinge_mounts.name = "lid_hinge_mounts";

  const hinge_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    hinge_dummy.position.set(i === 0 ? -0.67 : 0.67, 2.96, -0.99);
    hinge_dummy.updateMatrix();
    lid_hinge_mounts.setMatrixAt(i, hinge_dummy.matrix);
  }
  lid_hinge_mounts.instanceMatrix.needsUpdate = true;
  root.add(lid_hinge_mounts);

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