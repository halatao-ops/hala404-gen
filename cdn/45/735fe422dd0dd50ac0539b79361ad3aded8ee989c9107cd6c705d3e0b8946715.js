export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "leaf_with_dew";

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x3f7f24,
    metalness: 0.0,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const undersideMat = new THREE.MeshStandardMaterial({
    color: 0x6f941f,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x71920d,
    metalness: 0.0,
    roughness: 0.5,
  });
  const veinMat = new THREE.MeshStandardMaterial({
    color: 0x78952a,
    metalness: 0.0,
    roughness: 0.55,
  });
  const fineVeinMat = new THREE.MeshStandardMaterial({
    color: 0x668c2e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x789b22,
    metalness: 0.0,
    roughness: 0.5,
  });
  const dropletMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f7f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.72,
    thickness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    depthWrite: false,
  });
  const dropletCoreMat = new THREE.MeshBasicMaterial({
    color: 0xd9ffff,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  });

  const stemPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.46, -0.78, -0.025),
    new THREE.Vector3(-0.39, -0.61, -0.020),
    new THREE.Vector3(-0.31, -0.43, -0.015),
    new THREE.Vector3(-0.23, -0.25, -0.010),
    new THREE.Vector3(-0.15, -0.08, -0.005),
    new THREE.Vector3(-0.08, 0.07, 0.000),
    new THREE.Vector3(-0.02, 0.18, 0.005),
  ], false, "centripetal");

  const stemGeo = new THREE.TubeGeometry(stemPath, 40, 0.028, 12, false);
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.name = "stem";
  root.add(stem);

  const leaf_base = new THREE.Vector3(-0.02, 0.18, 0.005);
  const leaf_length = 0.92;
  const leaf_thickness = 0.014;

  function leafHalfWidth(u) {
    const arch = Math.pow(Math.max(0, Math.sin(Math.PI * u)), 0.68);
    return 0.008 + 0.235 * arch * (1 - 0.16 * u);
  }

  function leafCenterZ(u) {
    return 0.018 * Math.sin(Math.PI * u) - 0.012 * u;
  }

  function leafSurfaceY(u, v) {
    const half = leafHalfWidth(u);
    const transverse = Math.max(0, 1 - v * v);
    const curl = 0.018 * Math.pow(u, 4) * (1 - v * v);
    const edgeDrop = 0.006 * v * v;
    return 0.18 + 0.27 * Math.sin(Math.PI * 0.72 * u) + curl - edgeDrop;
  }

  function createLeafGeometry() {
    const longitudinal = 32;
    const transverse = 12;
    const columns = transverse + 1;
    const layerSize = (longitudinal + 1) * columns;
    const positions = [];
    const indices = [];

    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i <= longitudinal; i++) {
        const u = i / longitudinal;
        for (let j = 0; j <= transverse; j++) {
          const v = -1 + 2 * j / transverse;
          const x = leaf_base.x + leaf_length * u;
          const z = leafCenterZ(u) + v * leafHalfWidth(u);
          const topY = leafSurfaceY(u, v);
          positions.push(x, topY - layer * leaf_thickness, z);
        }
      }
    }

    for (let i = 0; i < longitudinal; i++) {
      for (let j = 0; j < transverse; j++) {
        const a = i * columns + j;
        const b = (i + 1) * columns + j;
        const c = (i + 1) * columns + j + 1;
        const d = i * columns + j + 1;
        indices.push(a, b, d, b, c, d);

        const ba = layerSize + a;
        const bb = layerSize + b;
        const bc = layerSize + c;
        const bd = layerSize + d;
        indices.push(ba, bd, bb, bb, bd, bc);
      }
    }

    for (let i = 0; i < longitudinal; i++) {
      const leftTopA = i * columns;
      const leftTopB = (i + 1) * columns;
      const leftBottomA = layerSize + leftTopA;
      const leftBottomB = layerSize + leftTopB;
      indices.push(leftTopA, leftBottomA, leftTopB);
      indices.push(leftTopB, leftBottomA, leftBottomB);

      const rightTopA = i * columns + transverse;
      const rightTopB = (i + 1) * columns + transverse;
      const rightBottomA = layerSize + rightTopA;
      const rightBottomB = layerSize + rightTopB;
      indices.push(rightTopA, rightTopB, rightBottomA);
      indices.push(rightTopB, rightBottomB, rightBottomA);
    }

    for (let j = 0; j < transverse; j++) {
      const baseTopA = j;
      const baseTopB = j + 1;
      const baseBottomA = layerSize + baseTopA;
      const baseBottomB = layerSize + baseTopB;
      indices.push(baseTopA, baseTopB, baseBottomA);
      indices.push(baseTopB, baseBottomB, baseBottomA);

      const tipTopA = longitudinal * columns + j;
      const tipTopB = tipTopA + 1;
      const tipBottomA = layerSize + tipTopA;
      const tipBottomB = tipBottomA + 1;
      indices.push(tipTopA, tipBottomA, tipTopB);
      indices.push(tipTopB, tipBottomA, tipBottomB);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const leaf_bladeGeom = createLeafGeometry();
  const leaf_blade = new THREE.Mesh(leaf_bladeGeom, leafMat);
  leaf_blade.name = "leaf_blade";
  root.add(leaf_blade);

  const leaf_undersideGeom = leaf_bladeGeom.clone();
  leaf_undersideGeom.translate(0, -leaf_thickness - 0.002, 0);
  const leaf_underside = new THREE.Mesh(leaf_undersideGeom, undersideMat);
  leaf_underside.name = "leaf_underside";
  root.add(leaf_underside);

  function createEdge(v) {
    const points = [];
    for (let i = 0; i <= 12; i++) {
      const u = 0.015 + 0.975 * i / 12;
      points.push(new THREE.Vector3(
        leaf_base.x + leaf_length * u,
        leafSurfaceY(u, v) + 0.001,
        leafCenterZ(u) + v * leafHalfWidth(u)
      ));
    }
    return new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, "centripetal"), 36, 0.0045, 7, false),
      edgeMat
    );
  }

  const front_edge = createEdge(1);
  front_edge.name = "front_edge";
  root.add(front_edge);

  const rear_edge = createEdge(-1);
  rear_edge.name = "rear_edge";
  root.add(rear_edge);

  const midribPoints = [];
  for (let i = 0; i <= 14; i++) {
    const u = 0.005 + 0.985 * i / 14;
    midribPoints.push(new THREE.Vector3(
      leaf_base.x + leaf_length * u,
      leafSurfaceY(u, 0) + 0.003,
      leafCenterZ(u)
    ));
  }
  const central_midribGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(midribPoints, false, "centripetal"),
    42,
    0.006,
    8,
    false
  );
  const central_midrib = new THREE.Mesh(central_midribGeom, veinMat);
  central_midrib.name = "central_midrib";
  root.add(central_midrib);

  const lateral_veins = new THREE.Group();
  lateral_veins.name = "lateral_veins";
  root.add(lateral_veins);

  for (let i = 0; i < 7; i++) {
    const startU = 0.13 + i * 0.105;
    for (const side of [-1, 1]) {
      const points = [];
      for (let j = 0; j <= 4; j++) {
        const t = j / 4;
        const u = Math.min(0.965, startU + 0.105 * t);
        const v = side * (0.025 + 0.88 * Math.pow(t, 0.82));
        points.push(new THREE.Vector3(
          leaf_base.x + leaf_length * u,
          leafSurfaceY(u, v) + 0.0025,
          leafCenterZ(u) + v * leafHalfWidth(u)
        ));
      }
      const vein = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, "centripetal"), 12, 0.0022, 6, false),
        fineVeinMat
      );
      lateral_veins.add(vein);
    }
  }

  const droplet_u = 0.56;
  const droplet_v = 0.18;
  const droplet_x = leaf_base.x + leaf_length * droplet_u;
  const droplet_z = leafCenterZ(droplet_u) + droplet_v * leafHalfWidth(droplet_u);
  const droplet_surface_y = leafSurfaceY(droplet_u, droplet_v);
  const droplet_y = droplet_surface_y + 0.034;

  const dew_dropletGeom = new THREE.SphereGeometry(0.043, 28, 18);
  const dew_droplet = new THREE.Mesh(dew_dropletGeom, dropletMat);
  dew_droplet.name = "dew_droplet";
  dew_droplet.position.set(droplet_x, droplet_y, droplet_z);
  dew_droplet.scale.set(1.0, 0.94, 1.0);
  dew_droplet.renderOrder = 2;
  root.add(dew_droplet);

  const dew_droplet_coreGeom = new THREE.SphereGeometry(0.037, 20, 12);
  const dew_droplet_core = new THREE.Mesh(dew_droplet_coreGeom, dropletCoreMat);
  dew_droplet_core.name = "dew_droplet_core";
  dew_droplet_core.position.copy(dew_droplet.position);
  dew_droplet_core.scale.set(1.0, 0.94, 1.0);
  dew_droplet_core.renderOrder = 1;
  root.add(dew_droplet_core);

  const dew_highlightGeom = new THREE.SphereGeometry(0.009, 12, 8);
  const dew_highlight = new THREE.Mesh(dew_highlightGeom, highlightMat);
  dew_highlight.name = "dew_highlight";
  dew_highlight.position.set(
    droplet_x - 0.014,
    droplet_y + 0.017,
    droplet_z + 0.038
  );
  dew_highlight.renderOrder = 3;
  root.add(dew_highlight);

  const dew_glintGeom = new THREE.SphereGeometry(0.004, 10, 6);
  const dew_glint = new THREE.Mesh(dew_glintGeom, highlightMat);
  dew_glint.name = "dew_glint";
  dew_glint.position.set(
    droplet_x + 0.012,
    droplet_y + 0.026,
    droplet_z + 0.032
  );
  dew_glint.renderOrder = 3;
  root.add(dew_glint);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 0.95 / maxDim : 1;
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