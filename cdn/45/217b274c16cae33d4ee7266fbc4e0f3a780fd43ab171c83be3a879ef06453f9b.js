export default function generate(THREE) {
  const root = new THREE.Group();
  const wooden_block = new THREE.Group();
  root.add(wooden_block);

  const width = 0.44;
  const depth = 0.34;
  const height = 3.0;
  const bottomRadius = 0.055;
  const topChamfer = 0.035;
  const bevel = 0.025;

  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  const front_left = new THREE.Vector3(-halfWidth + bevel, height, halfDepth);
  const front_right = new THREE.Vector3(halfWidth - bevel, height, halfDepth);
  const back_right = new THREE.Vector3(halfWidth - bevel, height, -halfDepth);
  const back_left = new THREE.Vector3(-halfWidth + bevel, height, -halfDepth);

  const front_slope = new THREE.Vector3().subVectors(front_left, front_right);
  const front_normal = new THREE.Vector3(-front_slope.y, front_slope.x, 0).normalize();
  const back_slope = new THREE.Vector3().subVectors(back_right, back_left);
  const back_normal = new THREE.Vector3(back_slope.y, -back_slope.x, 0).normalize();

  const front_edge_length = front_slope.length();
  const back_edge_length = back_slope.length();
  const front_edge_half = front_edge_length / 2;
  const back_edge_half = back_edge_length / 2;
  const front_midpoint = new THREE.Vector3().addVectors(front_left, front_right).multiplyScalar(0.5);
  const back_midpoint = new THREE.Vector3().addVectors(back_left, back_right).multiplyScalar(0.5);

  const textureWidth = 128;
  const textureHeight = 512;
  const textureData = new Uint8Array(textureWidth * textureHeight * 4);
  const tau = Math.PI * 2;

  for (let y = 0; y < textureHeight; y++) {
    const v = y / (textureHeight - 1);
    for (let x = 0; x < textureWidth; x++) {
      const u = x / (textureWidth - 1);
      const fineWave = 0.5 + 0.5 * Math.sin(
        tau * (u * 38 + 0.18 * Math.sin(v * tau * 5) + 0.08 * Math.sin(v * tau * 19))
      );
      const broadWave = 0.5 + 0.5 * Math.sin(
        tau * (u * 7 + 0.12 * Math.sin(v * tau * 1.7))
      );
      const fiberWave = 0.5 + 0.5 * Math.sin(
        tau * (u * 91 + 0.16 * Math.sin(v * tau * 31) + v * 0.7)
      );
      const pore = ((x * 37 + y * 19 + (x * y) % 23) % 101) < 2 ? 18 : 0;
      const value = Math.max(
        170,
        Math.min(255, 218 + fineWave * 17 + broadWave * 10 + fiberWave * 5 - pore)
      );
      const index = (y * textureWidth + x) * 4;
      textureData[index] = value;
      textureData[index + 1] = value;
      textureData[index + 2] = value;
      textureData[index + 3] = 255;
    }
  }

  const wood_texture = new THREE.DataTexture(
    textureData,
    textureWidth,
    textureHeight,
    THREE.RGBAFormat
  );
  wood_texture.wrapS = THREE.RepeatWrapping;
  wood_texture.wrapT = THREE.RepeatWrapping;
  wood_texture.repeat.set(1.15, 1.0);
  wood_texture.colorSpace = THREE.SRGBColorSpace;
  wood_texture.needsUpdate = true;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd9a06a,
    map: wood_texture,
    roughness: 0.6
  });

  const end_grainMat = new THREE.MeshStandardMaterial({
    color: 0xc99a6b,
    map: wood_texture,
    roughness: 0.65
  });

  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x9b6338,
    roughness: 0.75
  });

  const light_grainMat = new THREE.MeshStandardMaterial({
    color: 0xf0c48e,
    roughness: 0.7
  });

  const knotMat = new THREE.MeshStandardMaterial({
    color: 0x63391f,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const profile = [
    new THREE.Vector2(-halfWidth + bevel, halfDepth),
    new THREE.Vector2(halfWidth - bevel, halfDepth),
    new THREE.Vector2(halfWidth, halfDepth - bevel),
    new THREE.Vector2(halfWidth, -halfDepth + bevel),
    new THREE.Vector2(halfWidth - bevel, -halfDepth),
    new THREE.Vector2(-halfWidth + bevel, -halfDepth),
    new THREE.Vector2(-halfWidth, -halfDepth + bevel),
    new THREE.Vector2(-halfWidth, halfDepth - bevel)
  ];

  const positions = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i < profile.length; i++) {
    const p = profile[i];
    positions.push(p.x, 0, p.y);
    uvs.push(i / profile.length, 0);
  }
  for (let i = 0; i < profile.length; i++) {
    const p = profile[i];
    positions.push(p.x, height, p.y);
    uvs.push(i / profile.length, 1);
  }

  const capStart = positions.length / 3;
  for (let i = 0; i < profile.length; i++) {
    const p = profile[i];
    positions.push(p.x, height + topChamfer, p.y);
    uvs.push(p.x / width + 0.5, p.y / depth + 0.5);
  }

  const bottomStart = positions.length / 3;
  for (let i = 0; i < profile.length; i++) {
    const p = profile[i];
    positions.push(p.x, -bottomRadius, p.y);
    uvs.push(p.x / width + 0.5, p.y / depth + 0.5);
  }

  for (let i = 0; i < profile.length; i++) {
    const next = (i + 1) % profile.length;
    const lowerA = i;
    const lowerB = next;
    const upperA = profile.length + i;
    const upperB = profile.length + next;
    const capA = capStart + i;
    const capB = capStart + next;
    const bottomA = bottomStart + i;
    const bottomB = bottomStart + next;

    indices.push(lowerA, upperA, upperB, lowerA, upperB, lowerB);
    indices.push(bottomA, bottomB, capB, bottomA, capB, capA);
  }

  const centerIndex = positions.length / 3;
  positions.push(0, height + topChamfer, 0);
  uvs.push(0.5, 0.5);
  for (let i = 0; i < profile.length; i++) {
    const next = (i + 1) % profile.length;
    indices.push(centerIndex, capStart + next, capStart + i);
  }

  const bottomCenterIndex = positions.length / 3;
  positions.push(0, -bottomRadius, 0);
  uvs.push(0.5, 0.5);
  for (let i = 0; i < profile.length; i++) {
    const next = (i + 1) % profile.length;
    indices.push(bottomCenterIndex, bottomStart + i, bottomStart + next);
  }

  const bodyGeom = new THREE.BufferGeometry();
  bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  bodyGeom.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(uvs, 2)
  );
  bodyGeom.setIndex(indices);
  bodyGeom.computeVertexNormals();

  const body = new THREE.Mesh(bodyGeom, woodMat);
  wooden_block.add(body);

  const frontNormalOffset = front_normal.clone().multiplyScalar(0.003);
  const front_grainGeom = new THREE.BoxGeometry(0.004, 1, 0.002);
  const front_grain = new THREE.InstancedMesh(front_grainGeom, grainMat, 28);
  const front_grain_dummy = new THREE.Object3D();
  const frontTilt = Math.atan2(front_normal.x, front_normal.y);

  for (let i = 0; i < 28; i++) {
    const t = (i + 0.5) / 28;
    const length = 0.08 + ((i * 17) % 11) * 0.025;
    const y = 0.18 + (((i * 31) % 100) / 100) * (height - 0.45 - length);
    const x = -halfWidth + bevel + t * width +
      Math.sin(i * 2.17) * 0.004;

    front_grain_dummy.position.set(x, y, halfDepth + 0.002);
    front_grain_dummy.position.add(frontNormalOffset);
    front_grain_dummy.rotation.set(0, 0, frontTilt + Math.sin(i * 1.31) * 0.018);
    front_grain_dummy.scale.set(0.55 + (i % 4) * 0.18, length, 1);
    front_grain_dummy.updateMatrix();
    front_grain.setMatrixAt(i, front_grain_dummy.matrix);
  }
  front_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(front_grain);

  const side_grainGeom = new THREE.BoxGeometry(0.002, 1, 0.004);
  const side_grain = new THREE.InstancedMesh(side_grainGeom, grainMat, 24);
  const side_grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 24; i++) {
    const side = i < 12 ? -1 : 1;
    const j = i % 12;
    const length = 0.1 + ((j * 7) % 9) * 0.028;
    const y = 0.16 + (((j * 29 + side * 5) % 100) / 100) * (height - 0.4 - length);
    const z = -halfDepth + bevel +
      ((j + 0.5) / 12) * (depth - bevel * 2);

    side_grain_dummy.position.set(
      side * (halfWidth + 0.002),
      y,
      z + Math.sin(j * 1.9) * 0.003
    );
    side_grain_dummy.rotation.set(0, 0, Math.sin(j * 1.7) * 0.015);
    side_grain_dummy.scale.set(1, length, 0.6 + (j % 3) * 0.2);
    side_grain_dummy.updateMatrix();
    side_grain.setMatrixAt(i, side_grain_dummy.matrix);
  }
  side_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(side_grain);

  const front_highlight_grain = new THREE.InstancedMesh(
    front_grainGeom,
    light_grainMat,
    14
  );
  const front_highlight_dummy = new THREE.Object3D();

  for (let i = 0; i < 14; i++) {
    const t = (i + 0.35) / 14;
    const length = 0.07 + ((i * 13) % 8) * 0.025;
    const y = 0.22 + (((i * 43) % 100) / 100) * (height - 0.5 - length);
    const x = -halfWidth + bevel + t * width;

    front_highlight_dummy.position.set(x, y, halfDepth + 0.0025);
    front_highlight_dummy.position.add(frontNormalOffset);
    front_highlight_dummy.rotation.set(0, 0, frontTilt + Math.sin(i * 0.9) * 0.012);
    front_highlight_dummy.scale.set(0.45 + (i % 3) * 0.15, length, 1);
    front_highlight_dummy.updateMatrix();
    front_highlight_grain.setMatrixAt(i, front_highlight_dummy.matrix);
  }
  front_highlight_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(front_highlight_grain);

  const top_grainGeom = new THREE.BoxGeometry(1, 0.002, 0.003);
  const top_grain = new THREE.InstancedMesh(top_grainGeom, grainMat, 7);
  const top_grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 7; i++) {
    top_grain_dummy.position.set(
      -width * 0.32 + i * width * 0.105,
      height + topChamfer + 0.002,
      -depth * 0.34 + (i % 4) * depth * 0.22
    );
    top_grain_dummy.rotation.set(0, Math.sin(i * 1.4) * 0.08, 0);
    top_grain_dummy.scale.set(0.07 + (i % 4) * 0.025, 1, 1);
    top_grain_dummy.updateMatrix();
    top_grain.setMatrixAt(i, top_grain_dummy.matrix);
  }
  top_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(top_grain);

  const front_knotsGeom = new THREE.CircleGeometry(0.018, 16);
  const front_knots = new THREE.InstancedMesh(front_knotsGeom, knotMat, 3);
  const front_knot_dummy = new THREE.Object3D();
  const frontKnotData = [
    [-0.145, 2.35, 0.65, 1.45, -0.18],
    [-0.125, 2.08, 0.55, 1.25, 0.12],
    [-0.165, 1.72, 0.42, 0.95, -0.08]
  ];

  for (let i = 0; i < frontKnotData.length; i++) {
    const data = frontKnotData[i];
    front_knot_dummy.position.set(data[0], data[1], halfDepth + 0.004);
    front_knot_dummy.position.add(frontNormalOffset);
    front_knot_dummy.rotation.set(0, 0, frontTilt + data[4]);
    front_knot_dummy.scale.set(data[2], data[3], 1);
    front_knot_dummy.updateMatrix();
    front_knots.setMatrixAt(i, front_knot_dummy.matrix);
  }
  front_knots.instanceMatrix.needsUpdate = true;
  wooden_block.add(front_knots);

  const side_knotsGeom = new THREE.CircleGeometry(0.015, 14);
  const side_knots = new THREE.InstancedMesh(side_knotsGeom, knotMat, 4);
  const side_knot_dummy = new THREE.Object3D();
  const sideKnotData = [
    [-1, 2.25, 0.055, 0.65, 1.3],
    [-1, 1.45, -0.065, 0.5, 1.0],
    [1, 2.48, -0.045, 0.55, 1.1],
    [1, 1.1, 0.075, 0.45, 0.9]
  ];

  for (let i = 0; i < sideKnotData.length; i++) {
    const data = sideKnotData[i];
    side_knot_dummy.position.set(
      data[0] * (halfWidth + 0.003),
      data[1],
      data[2]
    );
    side_knot_dummy.rotation.set(0, data[0] * Math.PI / 2, 0);
    side_knot_dummy.scale.set(data[3], data[4], 1);
    side_knot_dummy.updateMatrix();
    side_knots.setMatrixAt(i, side_knot_dummy.matrix);
  }
  side_knots.instanceMatrix.needsUpdate = true;
  wooden_block.add(side_knots);

  const front_edge_grainGeom = new THREE.BoxGeometry(0.004, 1, 0.002);
  const front_edge_grain = new THREE.InstancedMesh(
    front_edge_grainGeom,
    grainMat,
    12
  );
  const front_edge_dummy = new THREE.Object3D();

  for (let i = 0; i < 12; i++) {
    const t = (i + 0.5) / 12;
    const length = 0.05 + (i % 5) * 0.018;
    const y = 0.24 + (((i * 23) % 100) / 100) * (height - 0.55 - length);

    front_edge_dummy.position.set(
      -halfWidth + bevel + t * width,
      y,
      halfDepth + 0.0025
    );
    front_edge_dummy.position.add(frontNormalOffset);
    front_edge_dummy.rotation.set(0, 0, frontTilt + Math.sin(i * 1.8) * 0.014);
    front_edge_dummy.scale.set(0.55 + (i % 3) * 0.18, length, 1);
    front_edge_dummy.updateMatrix();
    front_edge_grain.setMatrixAt(i, front_edge_dummy.matrix);
  }
  front_edge_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(front_edge_grain);

  const front_end_grainGeom = new THREE.BoxGeometry(1, 0.003, 0.003);
  const front_end_grain = new THREE.InstancedMesh(
    front_end_grainGeom,
    end_grainMat,
    10
  );
  const front_end_dummy = new THREE.Object3D();

  for (let i = 0; i < 10; i++) {
    const y = height - 0.012 - i * 0.018;
    const t = (y - height + topChamfer) / topChamfer;
    front_end_dummy.position.set(
      -halfWidth + bevel + t * width + Math.sin(i * 1.2) * 0.004,
      y,
      halfDepth + 0.003
    );
    front_end_dummy.rotation.set(0, 0, frontTilt + Math.sin(i * 0.7) * 0.025);
    front_end_dummy.scale.set(0.07 + (i % 4) * 0.018, 1, 1);
    front_end_dummy.updateMatrix();
    front_end_grain.setMatrixAt(i, front_end_dummy.matrix);
  }
  front_end_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(front_end_grain);

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