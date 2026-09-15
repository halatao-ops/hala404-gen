export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "copper_pan";

  const pan_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb86445,
    metalness: 0.6,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const interior_bowlMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.2,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0x151719,
    metalness: 0.3,
    roughness: 0.45,
  });

  const pan_bodyProfile = [
    new THREE.Vector3(0.00, -0.50, 0),
    new THREE.Vector3(0.80, -0.50, 0),
    new THREE.Vector3(1.10, -0.46, 0),
    new THREE.Vector3(1.35, -0.34, 0),
    new THREE.Vector3(1.53, -0.12, 0),
    new THREE.Vector3(1.62, 0.22, 0),
    new THREE.Vector3(1.64, 0.46, 0),
    new THREE.Vector3(1.62, 0.50, 0),
    new THREE.Vector3(1.55, 0.47, 0),
    new THREE.Vector3(1.52, 0.25, 0),
    new THREE.Vector3(1.43, -0.04, 0),
    new THREE.Vector3(1.25, -0.25, 0),
    new THREE.Vector3(1.00, -0.34, 0),
    new THREE.Vector3(0.00, -0.34, 0),
  ];
  const pan_bodyGeo = createLoftGeometry(THREE, pan_bodyProfile, 64, 2);
  const pan_body = new THREE.Mesh(pan_bodyGeo, pan_bodyMat);
  pan_body.name = "pan_body";
  root.add(pan_body);

  const interior_bowlProfile = [
    new THREE.Vector3(0.00, -0.318, 0),
    new THREE.Vector3(0.98, -0.318, 0),
    new THREE.Vector3(1.20, -0.285, 0),
    new THREE.Vector3(1.38, -0.185, 0),
    new THREE.Vector3(1.48, 0.035, 0),
    new THREE.Vector3(1.535, 0.315, 0),
    new THREE.Vector3(1.555, 0.445, 0),
  ];
  const interior_bowlGeo = createLoftGeometry(THREE, interior_bowlProfile, 64, 2);
  const interior_bowl = new THREE.Mesh(interior_bowlGeo, interior_bowlMat);
  interior_bowl.name = "interior_bowl";
  root.add(interior_bowl);

  const rimMat = interior_bowlMat;
  const rimGeo = new THREE.TorusGeometry(1.585, 0.045, 12, 64);
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.485;
  root.add(rim);

  const outer_rimMat = pan_bodyMat;
  const outer_rimGeom = new THREE.TorusGeometry(1.615, 0.027, 10, 64);
  const outer_rim = new THREE.Mesh(outer_rimGeom, outer_rimMat);
  outer_rim.name = "outer_rim";
  outer_rim.rotation.x = Math.PI / 2;
  outer_rim.position.y = 0.455;
  root.add(outer_rim);

  const side_bandMat = pan_bodyMat;
  const side_bandGeom = new THREE.TorusGeometry(1.565, 0.022, 8, 64);
  const side_band = new THREE.Mesh(side_bandGeom, side_bandMat);
  side_band.name = "side_band";
  side_band.rotation.x = Math.PI / 2;
  side_band.position.y = 0.285;
  root.add(side_band);

  const bottom_footMat = interior_bowlMat;
  const bottom_footGeom = new THREE.TorusGeometry(0.94, 0.035, 8, 48);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, bottom_footMat);
  bottom_foot.name = "bottom_foot";
  bottom_foot.rotation.x = Math.PI / 2;
  bottom_foot.position.y = -0.505;
  root.add(bottom_foot);

  const main_handleShape = createCapsuleShape(THREE, 1.84, 0.40);
  const main_handleHole = new THREE.Path();
  main_handleHole.absellipse(0.72, 0, 0.22, 0.09, 0, Math.PI * 2, false, 0);
  main_handleShape.holes.push(main_handleHole);

  const main_handleMat = pan_bodyMat;
  const main_handleGeom = createExtrudedShapeGeometry(THREE, main_handleShape, 0.16, 20);
  const main_handle = new THREE.Mesh(main_handleGeom, main_handleMat);
  main_handle.name = "main_handle";
  main_handle.rotation.x = -Math.PI / 2;
  main_handle.position.set(1.48, 0.30, 0);
  root.add(main_handle);

  const main_handle_mountMat = pan_bodyMat;
  const main_handle_mountGeom = new THREE.SphereGeometry(1, 24, 12);
  const main_handle_mount = new THREE.Mesh(main_handle_mountGeom, main_handle_mountMat);
  main_handle_mount.name = "main_handle_mount";
  main_handle_mount.scale.set(0.30, 0.23, 0.25);
  main_handle_mount.position.set(1.52, 0.27, 0);
  root.add(main_handle_mount);

  const helper_handleShape = createCapsuleShape(THREE, 1.02, 0.40);
  const helper_handleHole = new THREE.Path();
  helper_handleHole.absellipse(0.31, 0, 0.20, 0.09, 0, Math.PI * 2, false, 0);
  helper_handleShape.holes.push(helper_handleHole);

  const helper_handleMat = pan_bodyMat;
  const helper_handleGeom = createExtrudedShapeGeometry(THREE, helper_handleShape, 0.16, 16);
  const helper_handles = new THREE.InstancedMesh(helper_handleGeom, helper_handleMat, 2);
  helper_handles.name = "helper_handles";

  const helper_handle_dummy = new THREE.Object3D();
  const helper_handle_angles = [Math.PI, -Math.PI / 2];
  for (let i = 0; i < helper_handle_angles.length; i++) {
    const angle = helper_handle_angles[i];
    const baseX = Math.cos(angle);
    const baseZ = Math.sin(angle);
    helper_handle_dummy.position.set(baseX * 1.47, 0.30, baseZ * 1.47);
    helper_handle_dummy.rotation.set(-Math.PI / 2, -angle, 0);
    helper_handle_dummy.scale.set(1, 1, 1);
    helper_handle_dummy.updateMatrix();
    helper_handles.setMatrixAt(i, helper_handle_dummy.matrix);
  }
  helper_handles.instanceMatrix.needsUpdate = true;
  root.add(helper_handles);

  const helper_handle_mountsMat = pan_bodyMat;
  const helper_handle_mountsGeom = main_handle_mountGeom;
  const helper_handle_mounts = new THREE.InstancedMesh(
    helper_handle_mountsGeom,
    helper_handle_mountsMat,
    2
  );
  helper_handle_mounts.name = "helper_handle_mounts";

  const helper_mount_dummy = new THREE.Object3D();
  for (let i = 0; i < helper_handle_angles.length; i++) {
    const angle = helper_handle_angles[i];
    helper_mount_dummy.position.set(
      Math.cos(angle) * 1.52,
      0.27,
      Math.sin(angle) * 1.52
    );
    helper_mount_dummy.rotation.set(0, -angle, 0);
    helper_mount_dummy.scale.set(0.29, 0.23, 0.25);
    helper_mount_dummy.updateMatrix();
    helper_handle_mounts.setMatrixAt(i, helper_mount_dummy.matrix);
  }
  helper_handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(helper_handle_mounts);

  const rivetsGeom = new THREE.SphereGeometry(0.11, 20, 12);
  const rivets = new THREE.InstancedMesh(rivetsGeom, rivetMat, 2);
  rivets.name = "rivets";

  const rivet_dummy = new THREE.Object3D();
  const rivet_positions = [
    new THREE.Vector3(-1.425, 0.19, -0.43),
    new THREE.Vector3(1.425, 0.19, -0.43),
  ];
  for (let i = 0; i < rivet_positions.length; i++) {
    rivet_dummy.position.copy(rivet_positions[i]);
    rivet_dummy.rotation.set(0, 0, 0);
    rivet_dummy.scale.set(0.42, 1.0, 0.78);
    rivet_dummy.updateMatrix();
    rivets.setMatrixAt(i, rivet_dummy.matrix);
  }
  rivets.instanceMatrix.needsUpdate = true;
  root.add(rivets);

  fitToUnitCube(THREE, root);
  return root;
}

function createLoftGeometry(THREE, rings, segments, exponent) {
  const positions = [];
  const indices = [];
  const power = 2 / exponent;

  for (let r = 0; r < rings.length; r++) {
    const ring = rings[r];
    const centerY = ring.x === 0 ? ring.y : ring.y;
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const x = ring.x * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), power);
      const z = ring.z + ring.x * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), power);
      positions.push(x, centerY, z);
    }
  }

  for (let r = 0; r < rings.length - 1; r++) {
    const current = r * segments;
    const next = (r + 1) * segments;
    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      indices.push(
        current + i, current + j, next + j,
        current + i, next + j, next + i
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createCapsuleShape(THREE, length, width) {
  const radius = width / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-length / 2 + radius, -radius);
  shape.lineTo(length / 2 - radius, -radius);
  shape.absarc(length / 2 - radius, 0, radius, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(-length / 2 + radius, radius);
  shape.absarc(-length / 2 + radius, 0, radius, Math.PI / 2, Math.PI * 1.5, false);
  shape.closePath();
  return shape;
}

function createExtrudedShapeGeometry(THREE, shape, depth, curveSegments) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    steps: 1,
    curveSegments: curveSegments,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
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