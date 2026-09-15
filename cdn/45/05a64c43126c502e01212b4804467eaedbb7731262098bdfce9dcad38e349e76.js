export default function generate(THREE) {
  const root = new THREE.Group();

  const textureWidth = 128;
  const textureHeight = 512;
  const textureData = new Uint8Array(textureWidth * textureHeight * 4);

  for (let y = 0; y < textureHeight; y++) {
    for (let x = 0; x < textureWidth; x++) {
      const u = x / textureWidth;
      const v = y / textureHeight;
      const broad = Math.sin(u * Math.PI * 18 + Math.sin(v * Math.PI * 5) * 0.8);
      const fine = Math.sin(u * Math.PI * 72 + v * Math.PI * 2.5);
      const pores = Math.sin((x * 19 + y * 7) % 31) > 28 ? -18 : 0;
      const shade = Math.max(170, Math.min(255, Math.floor(232 + broad * 10 + fine * 4 + pores)));
      const index = (y * textureWidth + x) * 4;
      textureData[index] = shade;
      textureData[index + 1] = shade;
      textureData[index + 2] = shade;
      textureData[index + 3] = 255;
    }
  }

  const woodTexture = new THREE.DataTexture(
    textureData,
    textureWidth,
    textureHeight,
    THREE.RGBAFormat
  );
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.ClampToEdgeWrapping;
  woodTexture.needsUpdate = true;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd3a16b,
    map: woodTexture,
    metalness: 0.0,
    roughness: 0.48,
  });

  const profile = [
    { y: 0.00, r: 0.10 },
    { y: 0.03, r: 0.18 },
    { y: 0.08, r: 0.24 },
    { y: 0.14, r: 0.27 },
    { y: 0.21, r: 0.26 },
    { y: 0.29, r: 0.22 },
    { y: 0.38, r: 0.18 },
    { y: 0.52, r: 0.16 },
    { y: 0.85, r: 0.15 },
    { y: 1.30, r: 0.155 },
    { y: 1.80, r: 0.17 },
    { y: 2.30, r: 0.19 },
    { y: 2.80, r: 0.22 },
    { y: 3.30, r: 0.25 },
    { y: 3.80, r: 0.275 },
    { y: 4.30, r: 0.292 },
    { y: 4.75, r: 0.300 },
    { y: 5.02, r: 0.300 },
    { y: 5.10, r: 0.285 },
    { y: 5.17, r: 0.245 },
    { y: 5.23, r: 0.180 },
    { y: 5.27, r: 0.090 },
    { y: 5.29, r: 0.000 },
  ];

  const positions = [];
  const uvs = [];
  const indices = [];
  const radialSegments = 64;

  for (let i = 0; i < profile.length; i++) {
    const ring = profile[i];
    for (let j = 0; j <= radialSegments; j++) {
      const angle = j / radialSegments * Math.PI * 2;
      const x = Math.cos(angle) * ring.r;
      const z = Math.sin(angle) * ring.r;
      positions.push(x, ring.y, z);
      uvs.push(j / radialSegments, ring.y / 5.29);
    }
  }

  const ringStride = radialSegments + 1;
  for (let i = 0; i < profile.length - 1; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * ringStride + j;
      const b = a + 1;
      const c = (i + 1) * ringStride + j;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const wooden_bodyGeom = new THREE.BufferGeometry();
  wooden_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  wooden_bodyGeom.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(uvs, 2)
  );
  wooden_bodyGeom.setIndex(indices);
  wooden_bodyGeom.computeVertexNormals();

  const wooden_body = new THREE.Mesh(wooden_bodyGeom, woodMat);
  root.add(wooden_body);

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