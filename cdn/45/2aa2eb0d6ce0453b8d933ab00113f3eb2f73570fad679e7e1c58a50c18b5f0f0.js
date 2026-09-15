export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_gemstone_ring";

  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0xb8864d,
    metalness: 0.6,
    roughness: 0.45,
  });
  const raisedBronzeMat = new THREE.MeshStandardMaterial({
    color: 0xd0a365,
    metalness: 0.6,
    roughness: 0.38,
  });
  const darkBronzeMat = new THREE.MeshStandardMaterial({
    color: 0x5b3b22,
    metalness: 0.45,
    roughness: 0.72,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x302117,
    metalness: 0.25,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    flatShading: true,
    metalness: 0.0,
    roughness: 0.18,
    side: THREE.DoubleSide,
  });
  const gemstoneEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x063b2c,
    metalness: 0.0,
    roughness: 0.35,
  });

  const ring_band = new THREE.Group();
  ring_band.name = "ring_band";
  root.add(ring_band);

  const band_sleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.19, 0.19, 0.9, 24),
    bronzeMat
  );
  band_sleeve.name = "band_sleeve";
  band_sleeve.rotation.z = Math.PI / 2;
  band_sleeve.position.set(-0.78, -0.04, -0.29);
  ring_band.add(band_sleeve);

  const band_end_caps = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.19, 20, 12),
    bronzeMat,
    2
  );
  band_end_caps.name = "band_end_caps";
  const bandCapDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    bandCapDummy.position.set(i === 0 ? -1.23 : -0.33, -0.04, -0.29);
    bandCapDummy.scale.set(0.55, 1, 1);
    bandCapDummy.updateMatrix();
    band_end_caps.setMatrixAt(i, bandCapDummy.matrix);
  }
  band_end_caps.instanceMatrix.needsUpdate = true;
  ring_band.add(band_end_caps);

  const band_patina = new THREE.Mesh(
    new THREE.CylinderGeometry(0.192, 0.192, 0.026, 24),
    patinaMat
  );
  band_patina.name = "band_patina";
  band_patina.rotation.z = Math.PI / 2;
  band_patina.position.set(-1.08, -0.04, -0.29);
  ring_band.add(band_patina);

  const band_front_join = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 14),
    bronzeMat
  );
  band_front_join.name = "band_front_join";
  band_front_join.scale.set(1.0, 0.88, 0.62);
  band_front_join.position.set(-0.43, -0.04, -0.1);
  ring_band.add(band_front_join);

  const bezel = new THREE.Group();
  bezel.name = "bezel";
  root.add(bezel);

  const bezel_backplate = new THREE.Mesh(
    new THREE.CylinderGeometry(1.03, 1.03, 0.22, 64),
    bronzeMat
  );
  bezel_backplate.name = "bezel_backplate";
  bezel_backplate.rotation.x = Math.PI / 2;
  bezel_backplate.position.z = -0.02;
  bezel.add(bezel_backplate);

  const bezel_front_plate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.99, 1.02, 0.12, 64),
    bronzeMat
  );
  bezel_front_plate.name = "bezel_front_plate";
  bezel_front_plate.rotation.x = Math.PI / 2;
  bezel_front_plate.position.z = 0.09;
  bezel.add(bezel_front_plate);

  const outer_edge = new THREE.Mesh(
    new THREE.TorusGeometry(0.985, 0.055, 12, 64),
    raisedBronzeMat
  );
  outer_edge.name = "outer_edge";
  outer_edge.position.z = 0.15;
  bezel.add(outer_edge);

  const outer_patina_line = new THREE.Mesh(
    new THREE.TorusGeometry(0.91, 0.018, 8, 64),
    darkBronzeMat
  );
  outer_patina_line.name = "outer_patina_line";
  outer_patina_line.position.z = 0.16;
  bezel.add(outer_patina_line);

  const ornament_inner_border = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.025, 10, 64),
    darkBronzeMat
  );
  ornament_inner_border.name = "ornament_inner_border";
  ornament_inner_border.position.z = 0.16;
  bezel.add(ornament_inner_border);

  const ornament_outer_border = new THREE.Mesh(
    new THREE.TorusGeometry(0.91, 0.022, 10, 64),
    darkBronzeMat
  );
  ornament_outer_border.name = "ornament_outer_border";
  ornament_outer_border.position.z = 0.16;
  bezel.add(ornament_outer_border);

  const ornament_bumps = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 12, 8),
    raisedBronzeMat,
    18
  );
  ornament_bumps.name = "ornament_bumps";
  const bumpDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    const radius = 0.805 + 0.012 * Math.sin(i * 1.7);
    const sx = 0.075 + 0.012 * Math.sin(i * 2.1);
    const sy = 0.095 + 0.014 * Math.cos(i * 1.4);
    bumpDummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.157
    );
    bumpDummy.rotation.set(0, 0, angle + Math.PI / 2);
    bumpDummy.scale.set(sx, sy, 0.025);
    bumpDummy.updateMatrix();
    ornament_bumps.setMatrixAt(i, bumpDummy.matrix);
  }
  ornament_bumps.instanceMatrix.needsUpdate = true;
  bezel.add(ornament_bumps);

  const patina_spots = new THREE.InstancedMesh(
    new THREE.CircleGeometry(1, 12),
    patinaMat,
    26
  );
  patina_spots.name = "patina_spots";
  const spotDummy = new THREE.Object3D();
  for (let i = 0; i < 26; i++) {
    const angle =
      (i / 26) * Math.PI * 2 + 0.07 * Math.sin(i * 2.3);
    const radius = 0.79 + 0.075 * ((i % 4) / 3);
    const sx = 0.026 + 0.018 * ((i % 5) / 4);
    const sy = 0.018 + 0.014 * (((i * 3) % 5) / 4);
    spotDummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.184
    );
    spotDummy.rotation.set(0, 0, angle + i * 0.31);
    spotDummy.scale.set(sx, sy, 1);
    spotDummy.updateMatrix();
    patina_spots.setMatrixAt(i, spotDummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  bezel.add(patina_spots);

  const gemstone_socket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.67, 0.1, 64),
    darkBronzeMat
  );
  gemstone_socket.name = "gemstone_socket";
  gemstone_socket.rotation.x = Math.PI / 2;
  gemstone_socket.position.z = 0.17;
  bezel.add(gemstone_socket);

  const gemstone_girdle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.075, 48),
    gemstoneEdgeMat
  );
  gemstone_girdle.name = "gemstone_girdle";
  gemstone_girdle.rotation.x = Math.PI / 2;
  gemstone_girdle.position.z = 0.225;
  bezel.add(gemstone_girdle);

  const inner_bezel_shadow = new THREE.Mesh(
    new THREE.TorusGeometry(0.615, 0.052, 12, 64),
    darkBronzeMat
  );
  inner_bezel_shadow.name = "inner_bezel_shadow";
  inner_bezel_shadow.position.z = 0.205;
  bezel.add(inner_bezel_shadow);

  const inner_bezel = new THREE.Mesh(
    new THREE.TorusGeometry(0.615, 0.036, 14, 64),
    raisedBronzeMat
  );
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.245;
  bezel.add(inner_bezel);

  const inner_bezel_highlight = new THREE.Mesh(
    new THREE.TorusGeometry(0.585, 0.012, 8, 64),
    raisedBronzeMat
  );
  inner_bezel_highlight.name = "inner_bezel_highlight";
  inner_bezel_highlight.position.z = 0.274;
  bezel.add(inner_bezel_highlight);

  const gemstonePositions = [];
  const gemstoneColors = [];
  const gemstonePalette = [
    new THREE.Color(0x03271f),
    new THREE.Color(0x064832),
    new THREE.Color(0x086b45),
    new THREE.Color(0x16865b),
    new THREE.Color(0x31a66f),
    new THREE.Color(0x5bc487),
    new THREE.Color(0x82cf9e),
    new THREE.Color(0xb0d9c5),
    new THREE.Color(0x245d48),
    new THREE.Color(0x0b352b),
    new THREE.Color(0x62766b),
    new THREE.Color(0x174c38),
  ];

  function addGemFacet(a, b, c, colorIndex) {
    gemstonePositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    const color = gemstonePalette[colorIndex % gemstonePalette.length];
    for (let i = 0; i < 3; i++) {
      gemstoneColors.push(color.r, color.g, color.b);
    }
  }

  const facetCount = 16;
  const table = [];
  const middle = [];
  const girdle = [];
  const back = [];

  for (let i = 0; i < facetCount; i++) {
    const angle = (i / facetCount) * Math.PI * 2;
    const shifted = angle + Math.PI / facetCount;
    table.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.22,
        Math.sin(angle) * 0.22,
        0.39
      )
    );
    middle.push(
      new THREE.Vector3(
        Math.cos(shifted) * 0.39,
        Math.sin(shifted) * 0.39,
        0.325
      )
    );
    girdle.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.55,
        Math.sin(angle) * 0.55,
        0.245
      )
    );
    back.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.55,
        Math.sin(angle) * 0.55,
        0.185
      )
    );
  }

  const tableCenter = new THREE.Vector3(0, 0, 0.397);
  const backCenter = new THREE.Vector3(0, 0, 0.175);

  for (let i = 0; i < facetCount; i++) {
    const j = (i + 1) % facetCount;

    addGemFacet(tableCenter, table[i], table[j], i % 7 + 4);

    if (i % 2 === 0) {
      addGemFacet(table[i], middle[i], middle[j], i * 3 + 2);
      addGemFacet(table[i], middle[j], table[j], i * 5 + 6);
    } else {
      addGemFacet(table[i], middle[i], table[j], i * 5 + 1);
      addGemFacet(middle[i], middle[j], table[j], i * 2 + 7);
    }

    addGemFacet(middle[i], girdle[i], girdle[j], i * 7 + 3);
    addGemFacet(middle[i], girdle[j], middle[j], i * 3 + 9);

    addGemFacet(girdle[i], back[i], back[j], i + 1);
    addGemFacet(girdle[i], back[j], girdle[j], i + 5);

    addGemFacet(backCenter, back[j], back[i], i % 3);
  }

  const gemstoneGeom = new THREE.BufferGeometry();
  gemstoneGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(gemstonePositions, 3)
  );
  gemstoneGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(gemstoneColors, 3)
  );
  gemstoneGeom.computeVertexNormals();

  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  bezel.add(gemstone);

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

  fitToUnitCube(THREE, root);
  return root;
}