export default function generate(THREE) {
  const root = new THREE.Group();
  const basketball = new THREE.Group();
  root.add(basketball);

  const textureSize = 256;
  const pebbleData = new Uint8Array(textureSize * textureSize * 4);
  const cellSize = 10;

  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const gridX = Math.floor(x / cellSize);
      const gridY = Math.floor(y / cellSize);
      let nearest = Infinity;
      let second = Infinity;

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const gx = gridX + ox;
          const gy = gridY + oy;
          const hashX = ((gx * 37 + gy * 61) % 17 + 17) % 17;
          const hashY = ((gx * 53 + gy * 29) % 19 + 19) % 19;
          const offsetX = ((hashX / 16) - 0.5) * 2.6;
          const offsetY = ((hashY / 18) - 0.5) * 2.6;
          const centerX = (gx + 0.5) * cellSize + offsetX;
          const centerY = (gy + 0.5) * cellSize + offsetY;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = dx * dx + dy * dy;

          if (distance < nearest) {
            second = nearest;
            nearest = distance;
          } else if (distance < second) {
            second = distance;
          }
        }
      }

      const edgeGap = Math.max(0, Math.min(1, (second - nearest) / 18));
      const pebble = Math.pow(edgeGap, 0.42);
      const fineVariation = 0.5 + 0.5 * Math.sin(x * 1.73 + y * 2.19);
      const value = Math.floor(58 + pebble * 176 + fineVariation * 10);
      const index = (y * textureSize + x) * 4;
      pebbleData[index] = value;
      pebbleData[index + 1] = value;
      pebbleData[index + 2] = value;
      pebbleData[index + 3] = 255;
    }
  }

  const pebbleTexture = new THREE.DataTexture(
    pebbleData,
    textureSize,
    textureSize,
    THREE.RGBAFormat
  );
  pebbleTexture.wrapS = THREE.RepeatWrapping;
  pebbleTexture.wrapT = THREE.RepeatWrapping;
  pebbleTexture.repeat.set(2, 1);
  pebbleTexture.minFilter = THREE.LinearFilter;
  pebbleTexture.magFilter = THREE.LinearFilter;
  pebbleTexture.needsUpdate = true;

  const ball_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf36b1d,
    metalness: 0.0,
    roughness: 0.72,
    bumpMap: pebbleTexture,
    bumpScale: 0.035
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8
  });

  const ball_bodyGeom = new THREE.SphereGeometry(1, 96, 64);
  const ball_body = new THREE.Mesh(ball_bodyGeom, ball_bodyMat);
  basketball.add(ball_body);

  const seamGeom = new THREE.TorusGeometry(0.988, 0.024, 12, 160);

  const horizontal_seam = new THREE.Mesh(seamGeom, seamMat);
  horizontal_seam.rotation.x = Math.PI / 2;
  basketball.add(horizontal_seam);

  const right_vertical_seam = new THREE.Mesh(seamGeom, seamMat);
  right_vertical_seam.rotation.y = -0.28;
  basketball.add(right_vertical_seam);

  const left_curved_seam = new THREE.Mesh(seamGeom, seamMat);
  left_curved_seam.rotation.set(0.08, 0.72, 0.16);
  basketball.add(left_curved_seam);

  basketball.rotation.z = -0.035;

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