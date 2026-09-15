export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wine_glass";

  const glass_assembly = new THREE.Group();
  glass_assembly.name = "glass_assembly";
  root.add(glass_assembly);

  const wine_assembly = new THREE.Group();
  wine_assembly.name = "wine_assembly";
  root.add(wine_assembly);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 1.0,
    ior: 1.5,
    thickness: 0.025,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8c8c8,
    metalness: 0.0,
    roughness: 0.03,
    transmission: 0.95,
    ior: 1.5,
    thickness: 0.02,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });

  const wineMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6cf78,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.28,
    ior: 1.33,
    thickness: 0.35,
    attenuationColor: 0xe6cf78,
    attenuationDistance: 1.8,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const wine_surfaceMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0d98d,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.18,
    ior: 1.33,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const wine_meniscusMat = new THREE.MeshStandardMaterial({
    color: 0xc99f35,
    metalness: 0.0,
    roughness: 0.25,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });

  const baseProfile = [
    "0.000 0.000",
    "0.360 0.000",
    "0.680 0.008",
    "0.820 0.025",
    "0.860 0.045",
    "0.840 0.065",
    "0.720 0.085",
    "0.450 0.105",
    "0.280 0.130",
    "0.200 0.160",
    "0.000 0.170"
  ];
  const baseGeom = latheGeometry(THREE, baseProfile, 64);
  const base = new THREE.Mesh(baseGeom, glassMat);
  base.name = "base";
  base.renderOrder = 3;
  glass_assembly.add(base);

  const base_edgeGeom = new THREE.TorusGeometry(0.815, 0.014, 10, 64);
  const base_edge = new THREE.Mesh(base_edgeGeom, glass_edgeMat);
  base_edge.name = "base_edge";
  base_edge.rotation.x = Math.PI / 2;
  base_edge.position.y = 0.045;
  base_edge.renderOrder = 4;
  glass_assembly.add(base_edge);

  const base_inner_ringGeom = new THREE.TorusGeometry(0.205, 0.012, 8, 48);
  const base_inner_ring = new THREE.Mesh(base_inner_ringGeom, glass_edgeMat);
  base_inner_ring.name = "base_inner_ring";
  base_inner_ring.rotation.x = Math.PI / 2;
  base_inner_ring.position.y = 0.135;
  base_inner_ring.renderOrder = 4;
  glass_assembly.add(base_inner_ring);

  const stemProfile = [
    "0.000 0.100",
    "0.220 0.100",
    "0.205 0.135",
    "0.155 0.180",
    "0.105 0.235",
    "0.075 0.315",
    "0.060 0.430",
    "0.055 0.620",
    "0.055 1.270",
    "0.060 1.420",
    "0.080 1.535",
    "0.125 1.615",
    "0.180 1.675",
    "0.000 1.700"
  ];
  const stemGeom = latheGeometry(THREE, stemProfile, 48);
  const stem = new THREE.Mesh(stemGeom, glassMat);
  stem.name = "stem";
  stem.renderOrder = 3;
  glass_assembly.add(stem);

  const bowlProfile = [
    "0.100 1.580",
    "0.200 1.650",
    "0.360 1.780",
    "0.520 1.980",
    "0.640 2.220",
    "0.710 2.480",
    "0.740 2.720",
    "0.735 2.950",
    "0.700 3.200",
    "0.650 3.460",
    "0.590 3.720",
    "0.555 3.840",
    "0.525 3.840",
    "0.560 3.700",
    "0.620 3.440",
    "0.670 3.190",
    "0.700 2.940",
    "0.705 2.720",
    "0.675 2.500",
    "0.605 2.250",
    "0.485 2.020",
    "0.335 1.820",
    "0.180 1.690",
    "0.080 1.620",
    "0.100 1.580"
  ];
  const bowlGeom = latheGeometry(THREE, bowlProfile, 64);
  const bowl = new THREE.Mesh(bowlGeom, glassMat);
  bowl.name = "bowl";
  bowl.renderOrder = 3;
  glass_assembly.add(bowl);

  const rimGeom = new THREE.TorusGeometry(0.540, 0.012, 10, 64);
  const rim = new THREE.Mesh(rimGeom, glass_edgeMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 3.840;
  rim.renderOrder = 4;
  glass_assembly.add(rim);

  const wineProfile = [
    "0.000 1.670",
    "0.080 1.680",
    "0.180 1.720",
    "0.330 1.820",
    "0.480 1.990",
    "0.600 2.220",
    "0.680 2.470",
    "0.710 2.680",
    "0.705 2.730",
    "0.000 2.730"
  ];
  const wineGeom = latheGeometry(THREE, wineProfile, 64);
  const wine = new THREE.Mesh(wineGeom, wineMat);
  wine.name = "wine";
  wine.renderOrder = 1;
  wine_assembly.add(wine);

  const wine_surfaceGeom = new THREE.CylinderGeometry(0.705, 0.705, 0.008, 64);
  const wine_surface = new THREE.Mesh(wine_surfaceGeom, wine_surfaceMat);
  wine_surface.name = "wine_surface";
  wine_surface.position.y = 2.734;
  wine_surface.renderOrder = 2;
  wine_assembly.add(wine_surface);

  const wine_meniscusGeom = new THREE.TorusGeometry(0.697, 0.010, 8, 64);
  const wine_meniscus = new THREE.Mesh(wine_meniscusGeom, wine_meniscusMat);
  wine_meniscus.name = "wine_meniscus";
  wine_meniscus.rotation.x = Math.PI / 2;
  wine_meniscus.position.y = 2.739;
  wine_meniscus.renderOrder = 2;
  wine_assembly.add(wine_meniscus);

  fitToUnitCube(THREE, root);
  return root;
}

function latheGeometry(THREE, profile, segments) {
  const positions = [];
  const indices = [];
  const row = segments + 1;

  for (let i = 0; i < profile.length; i++) {
    const radius = parseFloat(profile[i].split(" ")[0]);
    const y = parseFloat(profile[i].split(" ")[1]);

    for (let j = 0; j <= segments; j++) {
      const angle = j / segments * Math.PI * 2;
      positions.push(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
    }
  }

  for (let i = 0; i < profile.length - 1; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * row + j;
      const b = a + 1;
      const c = (i + 1) * row + j;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}