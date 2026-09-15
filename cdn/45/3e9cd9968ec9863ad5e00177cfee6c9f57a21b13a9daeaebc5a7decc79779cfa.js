export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "starfruit";

  const fruit_assembly = new THREE.Group();
  fruit_assembly.name = "fruit_assembly";
  fruit_assembly.scale.x = 1.1;
  root.add(fruit_assembly);

  const fruit_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x789514,
    metalness: 0.0,
    roughness: 0.34
  });

  const front_faceMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2e600,
    metalness: 0.0,
    roughness: 0.22,
    clearcoat: 0.7,
    clearcoatRoughness: 0.16
  });

  const radial_ribsMat = new THREE.MeshStandardMaterial({
    color: 0xf2e600,
    metalness: 0.0,
    roughness: 0.28
  });

  const radial_groovesMat = new THREE.MeshStandardMaterial({
    color: 0x789514,
    metalness: 0.0,
    roughness: 0.4
  });

  const center_coreMat = new THREE.MeshStandardMaterial({
    color: 0x66751b,
    metalness: 0.0,
    roughness: 0.65
  });

  const center_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x343707,
    metalness: 0.0,
    roughness: 0.8
  });

  const center_fibersMat = new THREE.MeshStandardMaterial({
    color: 0xd7c76b,
    metalness: 0.0,
    roughness: 0.75
  });

  const skin_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xdde64a,
    metalness: 0.0,
    roughness: 0.32
  });

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0.00, 0.56);
  bodyShape.bezierCurveTo(0.05, 0.56, 0.12, 0.40, 0.18, 0.24);
  bodyShape.bezierCurveTo(0.20, 0.19, 0.22, 0.17, 0.27, 0.17);
  bodyShape.bezierCurveTo(0.34, 0.17, 0.44, 0.12, 0.51, 0.07);
  bodyShape.bezierCurveTo(0.54, 0.05, 0.54, 0.00, 0.51, -0.04);
  bodyShape.bezierCurveTo(0.45, -0.10, 0.35, -0.13, 0.28, -0.14);
  bodyShape.bezierCurveTo(0.24, -0.14, 0.22, -0.18, 0.20, -0.23);
  bodyShape.bezierCurveTo(0.16, -0.34, 0.08, -0.50, 0.03, -0.55);
  bodyShape.bezierCurveTo(0.01, -0.57, -0.01, -0.57, -0.03, -0.55);
  bodyShape.bezierCurveTo(-0.08, -0.50, -0.16, -0.34, -0.20, -0.23);
  bodyShape.bezierCurveTo(-0.22, -0.18, -0.24, -0.14, -0.28, -0.14);
  bodyShape.bezierCurveTo(-0.35, -0.13, -0.45, -0.10, -0.51, -0.04);
  bodyShape.bezierCurveTo(-0.54, 0.00, -0.54, 0.05, -0.51, 0.07);
  bodyShape.bezierCurveTo(-0.44, 0.12, -0.34, 0.17, -0.27, 0.17);
  bodyShape.bezierCurveTo(-0.22, 0.17, -0.20, 0.19, -0.18, 0.24);
  bodyShape.bezierCurveTo(-0.12, 0.40, -0.05, 0.56, 0.00, 0.56);
  bodyShape.closePath();

  const fruit_bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.08,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.022,
    bevelOffset: 0,
    bevelSegments: 4
  });
  fruit_bodyGeom.translate(0, 0, -0.04);

  const fruit_body = new THREE.Mesh(fruit_bodyGeom, fruit_bodyMat);
  fruit_body.name = "fruit_body";
  fruit_assembly.add(fruit_body);

  const front_faceGeom = new THREE.ShapeGeometry(bodyShape, 12);
  const front_face = new THREE.Mesh(front_faceGeom, front_faceMat);
  front_face.name = "front_face";
  front_face.scale.set(0.965, 0.965, 1);
  front_face.position.z = 0.067;
  fruit_assembly.add(front_face);

  const ribShape = new THREE.Shape();
  ribShape.moveTo(-0.006, 0.012);
  ribShape.bezierCurveTo(-0.010, 0.12, -0.012, 0.34, -0.008, 0.50);
  ribShape.quadraticCurveTo(0.000, 0.535, 0.008, 0.50);
  ribShape.bezierCurveTo(0.012, 0.34, 0.010, 0.12, 0.006, 0.012);
  ribShape.quadraticCurveTo(0.000, -0.004, -0.006, 0.012);
  ribShape.closePath();

  const radial_ribsGeom = new THREE.ExtrudeGeometry(ribShape, {
    depth: 0.004,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.0015,
    bevelSize: 0.0015,
    bevelSegments: 2
  });
  const radial_ribs = new THREE.InstancedMesh(
    radial_ribsGeom,
    radial_ribsMat,
    6
  );
  radial_ribs.name = "radial_ribs";

  const ribDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    ribDummy.position.set(0, 0, 0.069);
    ribDummy.rotation.set(0, 0, -i * Math.PI / 3);
    ribDummy.scale.set(1, 1, 1);
    ribDummy.updateMatrix();
    radial_ribs.setMatrixAt(i, ribDummy.matrix);
  }
  radial_ribs.instanceMatrix.needsUpdate = true;
  fruit_assembly.add(radial_ribs);

  const grooveShape = new THREE.Shape();
  grooveShape.moveTo(-0.003, 0.025);
  grooveShape.lineTo(-0.004, 0.49);
  grooveShape.quadraticCurveTo(0.000, 0.505, 0.004, 0.49);
  grooveShape.lineTo(0.003, 0.025);
  grooveShape.quadraticCurveTo(0.000, 0.015, -0.003, 0.025);
  grooveShape.closePath();

  const radial_groovesGeom = new THREE.ExtrudeGeometry(grooveShape, {
    depth: 0.002,
    steps: 1,
    bevelEnabled: false
  });
  const radial_grooves = new THREE.InstancedMesh(
    radial_groovesGeom,
    radial_groovesMat,
    6
  );
  radial_grooves.name = "radial_grooves";

  const grooveDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    grooveDummy.position.set(0, 0, 0.075);
    grooveDummy.rotation.set(
      0,
      0,
      -(Math.PI / 6 + i * Math.PI / 3)
    );
    grooveDummy.scale.set(1, 1, 1);
    grooveDummy.updateMatrix();
    radial_grooves.setMatrixAt(i, grooveDummy.matrix);
  }
  radial_grooves.instanceMatrix.needsUpdate = true;
  fruit_assembly.add(radial_grooves);

  const skin_specklesGeom = new THREE.CircleGeometry(0.006, 8);
  const speckleCount = 120;
  const skin_speckles = new THREE.InstancedMesh(
    skin_specklesGeom,
    skin_specklesMat,
    speckleCount
  );
  skin_speckles.name = "skin_speckles";

  const speckleDummy = new THREE.Object3D();
  for (let i = 0; i < speckleCount; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.065 + 0.39 * (((i * 37) % 101) / 100);
    const x = Math.sin(angle) * radius;
    const y = Math.cos(angle) * radius;
    const scale = 0.55 + ((i * 19) % 9) / 12;

    speckleDummy.position.set(x, y, 0.077);
    speckleDummy.rotation.set(0, 0, angle * 0.37);
    speckleDummy.scale.set(scale * 0.72, scale * 1.35, 1);
    speckleDummy.updateMatrix();
    skin_speckles.setMatrixAt(i, speckleDummy.matrix);
  }
  skin_speckles.instanceMatrix.needsUpdate = true;
  fruit_assembly.add(skin_speckles);

  const center_coreGeom = new THREE.CylinderGeometry(
    0.034,
    0.041,
    0.012,
    9
  );
  const center_core = new THREE.Mesh(center_coreGeom, center_coreMat);
  center_core.name = "center_core";
  center_core.rotation.x = Math.PI / 2;
  center_core.position.z = 0.079;
  fruit_assembly.add(center_core);

  const center_cavityGeom = new THREE.CylinderGeometry(
    0.017,
    0.021,
    0.008,
    7
  );
  const center_cavity = new THREE.Mesh(
    center_cavityGeom,
    center_cavityMat
  );
  center_cavity.name = "center_cavity";
  center_cavity.rotation.x = Math.PI / 2;
  center_cavity.position.z = 0.087;
  fruit_assembly.add(center_cavity);

  const center_fibersGeom = new THREE.SphereGeometry(0.007, 8, 6);
  const center_fibers = new THREE.InstancedMesh(
    center_fibersGeom,
    center_fibersMat,
    8
  );
  center_fibers.name = "center_fibers";

  const fiberDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2 + 0.18;
    const radius = i % 2 === 0 ? 0.025 : 0.018;
    const scale = 0.72 + (i % 3) * 0.14;

    fiberDummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.092
    );
    fiberDummy.rotation.set(0, 0, angle);
    fiberDummy.scale.set(scale, scale * 0.82, scale * 0.48);
    fiberDummy.updateMatrix();
    center_fibers.setMatrixAt(i, fiberDummy.matrix);
  }
  center_fibers.instanceMatrix.needsUpdate = true;
  fruit_assembly.add(center_fibers);

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