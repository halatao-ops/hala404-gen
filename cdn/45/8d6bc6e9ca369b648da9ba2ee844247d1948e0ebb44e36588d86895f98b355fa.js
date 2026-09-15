export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blue_basketball";

  const ballRadius = 1.0;
  const textureSize = 512;

  const pebbleTexture = createPebbleTexture(THREE, textureSize);
  const pebbleBumpTexture = createPebbleBumpTexture(THREE, textureSize);

  const ball_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0798f1,
    metalness: 0.0,
    roughness: 0.82,
    map: pebbleTexture,
    bumpMap: pebbleBumpTexture,
    bumpScale: 0.018,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x101820,
    metalness: 0.0,
    roughness: 0.8,
  });

  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x06243b,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const ball_bodyGeom = new THREE.SphereGeometry(ballRadius, 128, 80);
  const ball_body = new THREE.Mesh(ball_bodyGeom, ball_bodyMat);
  ball_body.name = "ball_body";
  root.add(ball_body);

  const seam_group = new THREE.Group();
  seam_group.name = "seam_group";
  root.add(seam_group);

  const seamGeom = new THREE.TorusGeometry(0.989, 0.018, 12, 160);

  const horizontal_seam = new THREE.Mesh(seamGeom, seamMat);
  horizontal_seam.name = "horizontal_seam";
  horizontal_seam.rotation.x = Math.PI / 2;
  seam_group.add(horizontal_seam);

  const upper_seam = new THREE.Mesh(seamGeom, seamMat);
  upper_seam.name = "upper_seam";
  setSeamOrientation(THREE, upper_seam, 0.34, -0.12, 0.933);
  seam_group.add(upper_seam);

  const lower_seam = new THREE.Mesh(seamGeom, seamMat);
  lower_seam.name = "lower_seam";
  setSeamOrientation(THREE, lower_seam, -0.34, -0.12, 0.933);
  seam_group.add(lower_seam);

  const side_seam = new THREE.Mesh(seamGeom, seamMat);
  side_seam.name = "side_seam";
  setSeamOrientation(THREE, side_seam, -0.72, 0.68, -0.08);
  seam_group.add(side_seam);

  const logo_group = new THREE.Group();
  logo_group.name = "logo_group";
  root.add(logo_group);

  const logoNormal = new THREE.Vector3(-0.48, -0.50, 0.72).normalize();
  const logoQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    logoNormal
  );

  const logo_ringGeom = new THREE.RingGeometry(0.031, 0.044, 24);
  const logo_ring = new THREE.Mesh(logo_ringGeom, logoMat);
  logo_ring.name = "logo_ring";
  logo_ring.position.copy(logoNormal).multiplyScalar(1.014);
  logo_ring.quaternion.copy(logoQuaternion);
  logo_ring.rotateZ(-0.28);
  logo_ring.scale.set(1.22, 0.82, 1);
  logo_group.add(logo_ring);

  const logo_barGeom = new THREE.PlaneGeometry(0.052, 0.009);
  const logo_bar = new THREE.Mesh(logo_barGeom, logoMat);
  logo_bar.name = "logo_bar";
  logo_bar.position.copy(logoNormal).multiplyScalar(1.016);
  logo_bar.quaternion.copy(logoQuaternion);
  logo_bar.rotateZ(-0.62);
  logo_group.add(logo_bar);

  fitToUnitCube(THREE, root);
  return root;
}

function setSeamOrientation(THREE, seam, nx, ny, nz) {
  const normal = new THREE.Vector3(nx, ny, nz).normalize();
  seam.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    normal
  );
}

function createPebbleTexture(THREE, size) {
  const data = new Uint8Array(size * size * 4);
  const cellSize = 5;
  const columns = size / cellSize;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gridX = Math.floor(x / cellSize);
      const gridY = Math.floor(y / cellSize);
      let nearest = 100;
      let secondNearest = 100;

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const rawGX = gridX + ox;
          const rawGY = gridY + oy;
          const wrappedGX = ((rawGX % columns) + columns) % columns;
          const wrappedGY = ((rawGY % columns) + columns) % columns;
          const offsetX =
            Math.sin(wrappedGX * 1.731 + wrappedGY * 0.913) * 1.02;
          const offsetY =
            Math.cos(wrappedGX * 0.847 - wrappedGY * 1.619) * 1.02;
          const centerX = rawGX * cellSize + cellSize * 0.5 + offsetX;
          const centerY = rawGY * cellSize + cellSize * 0.5 + offsetY;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < nearest) {
            secondNearest = nearest;
            nearest = distance;
          } else if (distance < secondNearest) {
            secondNearest = distance;
          }
        }
      }

      const separation = secondNearest - nearest;
      const falloff = Math.max(0, Math.min(1, separation / 1.35));
      const rounded = falloff * falloff * (3 - 2 * falloff);
      const value = Math.floor(78 + rounded * 170);
      const index = (y * size + x) * 4;

      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, size, size);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function createPebbleBumpTexture(THREE, size) {
  const data = new Uint8Array(size * size * 4);
  const cellSize = 5;
  const columns = size / cellSize;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gridX = Math.floor(x / cellSize);
      const gridY = Math.floor(y / cellSize);
      let nearest = 100;
      let secondNearest = 100;

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const rawGX = gridX + ox;
          const rawGY = gridY + oy;
          const wrappedGX = ((rawGX % columns) + columns) % columns;
          const wrappedGY = ((rawGY % columns) + columns) % columns;
          const offsetX =
            Math.sin(wrappedGX * 1.731 + wrappedGY * 0.913) * 1.02;
          const offsetY =
            Math.cos(wrappedGX * 0.847 - wrappedGY * 1.619) * 1.02;
          const centerX = rawGX * cellSize + cellSize * 0.5 + offsetX;
          const centerY = rawGY * cellSize + cellSize * 0.5 + offsetY;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < nearest) {
            secondNearest = nearest;
            nearest = distance;
          } else if (distance < secondNearest) {
            secondNearest = distance;
          }
        }
      }

      const separation = secondNearest - nearest;
      const falloff = Math.max(0, Math.min(1, separation / 1.35));
      const rounded = falloff * falloff * (3 - 2 * falloff);
      const value = Math.floor(90 + rounded * 165);
      const index = (y * size + x) * 4;

      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, size, size);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;
  return texture;
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