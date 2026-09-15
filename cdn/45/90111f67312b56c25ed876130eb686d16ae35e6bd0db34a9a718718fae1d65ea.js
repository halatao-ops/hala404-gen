export default function generate(THREE) {
  const root = new THREE.Group();

  const textureSize = 64;
  const feltData = new Uint8Array(textureSize * textureSize * 4);
  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const i = (y * textureSize + x) * 4;
      const grain = (x * 17 + y * 31 + x * y * 7) % 29;
      const pore = (x * 13 + y * 19) % 23 === 0;
      const value = pore ? 105 + grain * 2 : 178 + grain * 2;
      feltData[i] = value;
      feltData[i + 1] = value;
      feltData[i + 2] = value;
      feltData[i + 3] = 255;
    }
  }
  const feltTexture = new THREE.DataTexture(
    feltData,
    textureSize,
    textureSize,
    THREE.RGBAFormat
  );
  feltTexture.wrapS = THREE.RepeatWrapping;
  feltTexture.wrapT = THREE.RepeatWrapping;
  feltTexture.repeat.set(4, 3);
  feltTexture.needsUpdate = true;

  const ball_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff742e,
    metalness: 0.0,
    roughness: 0.95,
    map: feltTexture,
    bumpMap: feltTexture,
    bumpScale: 0.012,
  });
  const yellow_bandMat = new THREE.MeshStandardMaterial({
    color: 0xfff238,
    metalness: 0.0,
    roughness: 0.95,
    map: feltTexture,
    bumpMap: feltTexture,
    bumpScale: 0.012,
  });
  const orange_fiberMat = new THREE.MeshStandardMaterial({
    color: 0xff9a55,
    metalness: 0.0,
    roughness: 0.98,
  });
  const yellow_fiberMat = new THREE.MeshStandardMaterial({
    color: 0xfff76a,
    metalness: 0.0,
    roughness: 0.98,
  });

  const ball_body = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    ball_bodyMat
  );
  root.add(ball_body);

  const bandNormal = new THREE.Vector3(0.72, 0.28, 0.63).normalize();
  const bandHalfWidth = 0.145;
  const bandRadius = 1.008;
  const bandPhiStart = Math.acos(bandNormal.y + bandHalfWidth);
  const bandPhiLength = Math.acos(bandNormal.y - bandHalfWidth) - bandPhiStart;

  const yellow_band = new THREE.Mesh(
    new THREE.SphereGeometry(
      bandRadius,
      128,
      24,
      0,
      Math.PI * 2,
      bandPhiStart,
      bandPhiLength
    ),
    yellow_bandMat
  );
  yellow_band.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    bandNormal
  );
  root.add(yellow_band);

  const fiberCount = 1800;
  const orangeFiberCount = 1450;
  const fiberDummy = new THREE.Object3D();
  const fiberUp = new THREE.Vector3(0, 1, 0);
  const fiberNormal = new THREE.Vector3();
  const goldenAngle = 2.399963229728653;

  const orange_fibers = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.0015, 0.0015, 0.026, 5),
    orange_fiberMat,
    orangeFiberCount
  );

  for (let i = 0; i < orangeFiberCount; i++) {
    const y = 1 - 2 * (i + 0.5) / orangeFiberCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle;
    fiberNormal.set(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    ).normalize();
    fiberDummy.position.copy(fiberNormal).multiplyScalar(1.006);
    fiberDummy.quaternion.setFromUnitVectors(fiberUp, fiberNormal);
    fiberDummy.scale.set(
      0.75 + (i % 5) * 0.08,
      0.65 + (i % 7) * 0.07,
      0.75 + (i % 3) * 0.08
    );
    fiberDummy.updateMatrix();
    orange_fibers.setMatrixAt(i, fiberDummy.matrix);
  }
  orange_fibers.instanceMatrix.needsUpdate = true;
  root.add(orange_fibers);

  const yellowFiberCount = fiberCount - orangeFiberCount;
  const yellow_fibers = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.0015, 0.0015, 0.024, 5),
    yellow_fiberMat,
    yellowFiberCount
  );

  for (let i = 0; i < yellowFiberCount; i++) {
    const t = (i + 0.5) / yellowFiberCount;
    const y = bandNormal.y - bandHalfWidth + bandHalfWidth * 2 * t;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + orangeFiberCount) * goldenAngle;
    fiberNormal.set(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    ).normalize();
    fiberDummy.position.copy(fiberNormal).multiplyScalar(1.012);
    fiberDummy.quaternion.setFromUnitVectors(fiberUp, fiberNormal);
    fiberDummy.scale.set(
      0.78 + (i % 4) * 0.09,
      0.68 + (i % 6) * 0.07,
      0.78 + (i % 3) * 0.08
    );
    fiberDummy.updateMatrix();
    yellow_fibers.setMatrixAt(i, fiberDummy.matrix);
  }
  yellow_fibers.instanceMatrix.needsUpdate = true;
  root.add(yellow_fibers);

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