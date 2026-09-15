export default function generate(THREE) {
  const root = new THREE.Group();

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2f2,
    metalness: 0.7,
    roughness: 0.18,
  });
  const darkChromeMat = new THREE.MeshStandardMaterial({
    color: 0x303436,
    metalness: 0.7,
    roughness: 0.22,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeed,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.92,
    thickness: 0.06,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassEdgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9d8d4,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.8,
    thickness: 0.1,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const globeRadius = 1.5;
  const globeCenter = new THREE.Vector3(0, 2.25, 0);

  const base_undersideGeom = new THREE.CylinderGeometry(1.02, 1.02, 0.035, 64);
  const base_underside = new THREE.Mesh(base_undersideGeom, darkChromeMat);
  base_underside.position.y = 0.025;
  root.add(base_underside);

  const base_plinthGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.09, 64);
  const base_plinth = new THREE.Mesh(base_plinthGeom, chromeMat);
  base_plinth.position.y = 0.08;
  root.add(base_plinth);

  const base_top_plateGeom = new THREE.CylinderGeometry(0.92, 0.96, 0.055, 64);
  const base_top_plate = new THREE.Mesh(base_top_plateGeom, chromeMat);
  base_top_plate.position.y = 0.145;
  root.add(base_top_plate);

  const base_outer_trimGeom = new THREE.TorusGeometry(0.96, 0.025, 10, 64);
  const base_outer_trim = new THREE.Mesh(base_outer_trimGeom, chromeMat);
  base_outer_trim.rotation.x = Math.PI / 2;
  base_outer_trim.position.y = 0.125;
  root.add(base_outer_trim);

  const base_inner_trimGeom = new THREE.TorusGeometry(0.84, 0.012, 8, 64);
  const base_inner_trim = new THREE.Mesh(base_inner_trimGeom, chromeMat);
  base_inner_trim.rotation.x = Math.PI / 2;
  base_inner_trim.position.y = 0.175;
  root.add(base_inner_trim);

  const pedestal_stemProfile = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.28, 0, 0),
    new THREE.Vector3(0.25, 0.055, 0),
    new THREE.Vector3(0.14, 0.105, 0),
    new THREE.Vector3(0.105, 0.22, 0),
    new THREE.Vector3(0.105, 0.36, 0),
    new THREE.Vector3(0.15, 0.44, 0),
    new THREE.Vector3(0.22, 0.48, 0),
    new THREE.Vector3(0, 0.48, 0),
  ];
  const pedestal_stemGeom = new THREE.LatheGeometry(pedestal_stemProfile);
  const pedestal_stem = new THREE.Mesh(pedestal_stemGeom, chromeMat);
  pedestal_stem.position.y = 0.17;
  root.add(pedestal_stem);

  const pedestal_collarGeom = new THREE.TorusGeometry(0.205, 0.025, 10, 48);
  const pedestal_collar = new THREE.Mesh(pedestal_collarGeom, chromeMat);
  pedestal_collar.rotation.x = Math.PI / 2;
  pedestal_collar.position.y = 0.635;
  root.add(pedestal_collar);

  const meridian_ringShape = new THREE.Shape();
  meridian_ringShape.absarc(0, 0, 1.67, 0, Math.PI * 2, false);
  const meridian_ringHole = new THREE.Path();
  meridian_ringHole.absarc(0, 0, 1.565, 0, Math.PI * 2, true);
  meridian_ringShape.holes.push(meridian_ringHole);

  const meridian_ringGeom = new THREE.ExtrudeGeometry(meridian_ringShape, {
    curveSegments: 96,
    steps: 1,
    depth: 0.075,
  });
  meridian_ringGeom.translate(0, 0, -0.0375);
  const meridian_ring = new THREE.Mesh(meridian_ringGeom, chromeMat);
  meridian_ring.position.copy(globeCenter);
  root.add(meridian_ring);

  const meridian_inner_trimGeom = new THREE.TorusGeometry(1.575, 0.014, 8, 96);
  const meridian_inner_trim = new THREE.Mesh(meridian_inner_trimGeom, darkChromeMat);
  meridian_inner_trim.position.set(0, globeCenter.y, 0.045);
  root.add(meridian_inner_trim);

  const glass_globeGeom = new THREE.SphereGeometry(globeRadius, 64, 32);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glassMat);
  glass_globe.position.copy(globeCenter);
  root.add(glass_globe);

  const glass_outlineGeom = new THREE.TorusGeometry(1.495, 0.022, 10, 96);
  const glass_outline = new THREE.Mesh(glass_outlineGeom, glassEdgeMat);
  glass_outline.position.set(0, globeCenter.y, 0.012);
  root.add(glass_outline);

  const glass_bottom_footGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.085, 48);
  const glass_bottom_foot = new THREE.Mesh(glass_bottom_footGeom, chromeMat);
  glass_bottom_foot.position.set(0, 0.79, 0);
  root.add(glass_bottom_foot);

  const glass_bottom_lensGeom = new THREE.CylinderGeometry(0.18, 0.2, 0.035, 48);
  const glass_bottom_lens = new THREE.Mesh(glass_bottom_lensGeom, glassEdgeMat);
  glass_bottom_lens.position.set(0, 0.845, 0);
  root.add(glass_bottom_lens);

  const axisStart = new THREE.Vector3(-1.08, 1.55, 0.16);
  const axisEnd = new THREE.Vector3(1.08, 3.0, 0.16);
  const axisDirection = new THREE.Vector3().subVectors(axisEnd, axisStart);
  const axisLength = axisDirection.length();
  axisDirection.normalize();

  const axisQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    axisDirection
  );

  const diagonal_axisGeom = new THREE.CylinderGeometry(0.045, 0.045, axisLength, 20);
  const diagonal_axis = new THREE.Mesh(diagonal_axisGeom, chromeMat);
  diagonal_axis.position.copy(axisStart).add(axisEnd).multiplyScalar(0.5);
  diagonal_axis.quaternion.copy(axisQuaternion);
  root.add(diagonal_axis);

  const axis_dark_inlayGeom = new THREE.CylinderGeometry(0.014, 0.014, axisLength * 0.96, 12);
  const axis_dark_inlay = new THREE.Mesh(axis_dark_inlayGeom, darkChromeMat);
  axis_dark_inlay.position.copy(diagonal_axis.position);
  axis_dark_inlay.position.z += 0.043;
  axis_dark_inlay.quaternion.copy(axisQuaternion);
  root.add(axis_dark_inlay);

  const axis_tipGeom = new THREE.ConeGeometry(0.075, 0.22, 20);
  const axis_tip = new THREE.Mesh(axis_tipGeom, chromeMat);
  axis_tip.position.copy(axisStart).addScaledVector(axisDirection, -0.11);
  axis_tip.quaternion.copy(axisQuaternion);
  root.add(axis_tip);

  const axis_tip_capGeom = new THREE.SphereGeometry(0.075, 20, 12);
  const axis_tip_cap = new THREE.Mesh(axis_tip_capGeom, chromeMat);
  axis_tip_cap.position.copy(axisStart).addScaledVector(axisDirection, -0.22);
  root.add(axis_tip_cap);

  const upperAxisPoint = axisStart.clone().addScaledVector(axisDirection, 0.82);

  const upper_axis_collarGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.06, 28);
  const upper_axis_collar = new THREE.Mesh(upper_axis_collarGeom, chromeMat);
  upper_axis_collar.position.copy(upperAxisPoint);
  upper_axis_collar.quaternion.copy(axisQuaternion);
  root.add(upper_axis_collar);

  const upper_axis_mountGeom = new THREE.CylinderGeometry(0.075, 0.11, 0.18, 28);
  const upper_axis_mount = new THREE.Mesh(upper_axis_mountGeom, chromeMat);
  upper_axis_mount.position.copy(upperAxisPoint).addScaledVector(axisDirection, 0.1);
  upper_axis_mount.quaternion.copy(axisQuaternion);
  root.add(upper_axis_mount);

  const upper_axis_ballGeom = new THREE.SphereGeometry(0.13, 28, 16);
  const upper_axis_ball = new THREE.Mesh(upper_axis_ballGeom, chromeMat);
  upper_axis_ball.position.copy(upperAxisPoint).addScaledVector(axisDirection, 0.23);
  root.add(upper_axis_ball);

  const center_pivotGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.09, 32);
  const center_pivot = new THREE.Mesh(center_pivotGeom, chromeMat);
  center_pivot.rotation.x = Math.PI / 2;
  center_pivot.position.set(0, globeCenter.y, 0.2);
  root.add(center_pivot);

  const center_pivot_ringGeom = new THREE.TorusGeometry(0.105, 0.018, 10, 36);
  const center_pivot_ring = new THREE.Mesh(center_pivot_ringGeom, darkChromeMat);
  center_pivot_ring.position.set(0, globeCenter.y, 0.252);
  root.add(center_pivot_ring);

  const center_pivot_capGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 28);
  const center_pivot_cap = new THREE.Mesh(center_pivot_capGeom, chromeMat);
  center_pivot_cap.rotation.x = Math.PI / 2;
  center_pivot_cap.position.set(0, globeCenter.y, 0.265);
  root.add(center_pivot_cap);

  const center_pivot_screwGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.018, 16);
  const center_pivot_screw = new THREE.Mesh(center_pivot_screwGeom, darkChromeMat);
  center_pivot_screw.rotation.x = Math.PI / 2;
  center_pivot_screw.position.set(0, globeCenter.y, 0.29);
  root.add(center_pivot_screw);

  const leftRingPoint = new THREE.Vector3(-1.57, 1.72, 0.055);
  const left_ring_finial_stemGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.22, 18);
  const left_ring_finial_stem = new THREE.Mesh(left_ring_finial_stemGeom, chromeMat);
  left_ring_finial_stem.position.set(leftRingPoint.x, leftRingPoint.y + 0.1, 0.055);
  root.add(left_ring_finial_stem);

  const left_ring_finialGeom = new THREE.SphereGeometry(0.115, 24, 14);
  const left_ring_finial = new THREE.Mesh(left_ring_finialGeom, chromeMat);
  left_ring_finial.position.set(leftRingPoint.x, leftRingPoint.y + 0.25, 0.055);
  root.add(left_ring_finial);

  const left_glass_mountGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.055, 24);
  const left_glass_mount = new THREE.Mesh(left_glass_mountGeom, chromeMat);
  left_glass_mount.rotation.z = Math.PI / 2;
  left_glass_mount.position.set(-1.49, 1.72, 0.08);
  root.add(left_glass_mount);

  const left_glass_mount_capGeom = new THREE.SphereGeometry(0.065, 20, 12);
  const left_glass_mount_cap = new THREE.Mesh(left_glass_mount_capGeom, chromeMat);
  left_glass_mount_cap.position.set(-1.535, 1.72, 0.08);
  root.add(left_glass_mount_cap);

  const glass_highlight_leftGeom = new THREE.CircleGeometry(0.34, 32);
  const glass_highlight_left = new THREE.Mesh(glass_highlight_leftGeom, highlightMat);
  const leftNormal = new THREE.Vector3(-0.42, 0.22, 0.88).normalize();
  glass_highlight_left.position.copy(globeCenter).addScaledVector(leftNormal, globeRadius + 0.006);
  glass_highlight_left.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    leftNormal
  );
  glass_highlight_left.scale.set(0.62, 1.45, 1);
  root.add(glass_highlight_left);

  const glass_highlight_lowerGeom = new THREE.CircleGeometry(0.28, 32);
  const glass_highlight_lower = new THREE.Mesh(glass_highlight_lowerGeom, highlightMat);
  const lowerNormal = new THREE.Vector3(0.42, -0.38, 0.82).normalize();
  glass_highlight_lower.position.copy(globeCenter).addScaledVector(lowerNormal, globeRadius + 0.006);
  glass_highlight_lower.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    lowerNormal
  );
  glass_highlight_lower.scale.set(1.25, 0.72, 1);
  root.add(glass_highlight_lower);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}