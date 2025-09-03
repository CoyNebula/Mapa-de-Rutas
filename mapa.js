  // === 1) Un solo mapa ===
    const map = L.map('map').setView([19.5426, -96.9103], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Capas de trabajo
    const routesLayer = L.layerGroup().addTo(map);
    const markersLayer = L.layerGroup().addTo(map);

    let routeSelected = null;

    // === 2) Define aquí tus rutas/circuitos (puntos aproximados) ===
    // El motor OSRM calculará el trazado real por carreteras entre estos puntos.
    // type: "line" (A→B) o "circuit" (cerrado volviendo al 1er punto)
    // points: [ [lat, lng], ... ]
    const ROUTES = [
      {
        id: 'Ruta 1',
        label: 'Plaza Americas-Avenida Xalapa x Americas',
        type: 'line',
        color: '#2563eb',
        points: [
          [19.51564177733534, -96.87964341594438],  // A
          [19.542461185124353, -96.92718338095398]   // B
        ],
        stops: [
          {coordenas: [19.51564177733534, -96.87964341594438], nombre: 'Plaza Americas' },
          {coordenas: [19.518645284869205, -96.88267412489412], nombre: 'Plaza Animas' },
          {coordenas: [19.523080821164264, -96.89493721402563], nombre: 'Palo Verde'},
          {coordenas: [19.529812234797678, -96.9004640888919], nombre: 'Agua Santa' },
          {coordenas: [19.53900134668526, -96.91817967831048], nombre: 'AV Americas'},
          {coordenas: [19.542572540214795, -96.92722192111118], nombre: 'AV Xalapa' }
        ]
      },

      {
        id: 'R2',
        label: 'Arco Sur - Rebsamen - Sauces - Avila Camacho - Americas - Pipila - Lázaro Cárdenas - Arco Sur',
        type: 'circuit',
        color: '#dc2626',
        points: [
          [19.50769177740882, -96.88080453125596],
          [19.515966048477335, -96.91152995601553],
          [19.524652584562027, -96.91647639923467],
          [19.525055677294624, -96.91932056822652],
          [19.51921530204498, -96.91842999029427],
          [19.521357622044306, -96.9241269532866],
          [19.524677120475513, -96.93190115728305],
          [19.53975642913451, -96.92692173385555],
          [19.542094279093522, -96.90866398504731]
        ],
        stops:  [
          {coordenas: [19.513223357574645, -96.87527117957768], nombre: 'Plaza Americas' },
          {coordenas: [19.518645284869205, -96.88267412489412], nombre: 'Plaza Animas' },
          {coordenas: [19.529798415578906, -96.90049022922783], nombre: 'Lazaro Cardenas'},
          {coordenas: [19.53894953924973, -96.90770404088695], nombre: 'Plaza Cristal'},
          {coordenas: [19.53664143413393, -96.9205629947842], nombre: 'AV 20 de Noviembre'},
          {coordenas: [19.539753681824852, -96.92710614986044], nombre: 'AV Manuel Avila Camacho'},
          {coordenas: [19.53030074818882, -96.9344936508514], nombre: 'Plaza Teatro'},
          {coordenas: [19.525326059707528, -96.93220292767133], nombre: 'C 1 de Mayo'},
          {coordenas: [19.522414066726004, -96.92697702720773], nombre: 'Parque Maria Enriqueta Camarillo y Roa'},
          {coordenas: [19.519150855741504, -96.9184970499106], nombre: 'Zona UV'},
          {coordenas: [19.52510931509443, -96.91936270413917], nombre: 'Parque Hidalgo'},
          {coordenas: [19.52614591373224, -96.91687013606271], nombre: 'C Diego Leño'},
          {coordenas: [19.524682541954284, -96.91647090965778], nombre: 'Los Berros'},
          {coordenas: [19.518430349123907, -96.91405630993428], nombre: 'AV Enrique Rebsamen 2'},
          {coordenas: [19.51410550880322, -96.90899859851167], nombre: 'Av Enrique Rebsamen'},
          {coordenas: [19.507456519474925, -96.89952835543674], nombre: 'Arco Sur'},
          {coordenas: [19.50540441976, -96.89361099201855], nombre: 'Arco Sur - Yanga'},
          {coordenas: [19.50769177740882, -96.88080453125596], nombre: 'Walmart Arco Sur' }
        ]
         
      },
      
      {
        id: 'R3',
        label: 'Sumidero - Nuevo Leon - Villa hermosa',
        type: 'line',
        color: '#16a34a',
        points: [
          [ 19.54399426672097, -96.93786449099738],
          [19.536637771704882, -96.92150052089963],
          [19.551416882840947, -96.91204699381684] 
      ],
        stops: [
          {coordenas: [19.54399426672097, -96.93786449099738], nombre: 'Martires 28 de Agosto' },
          {coordenas: [19.551416882840947, -96.91204699381684], nombre: 'Miguel Aleman' }
        ]

      },
      { 
        id: 'R4',
        label: 'Tecnica 72 - Calle Chiapas',
        type: 'line',
        color: '#16a34a',
        points: [
          [19.568853888639612, -96.92418859973648], 
          [19.532655194077744, -96.94519617825766] 
      ]

      },
      {
        id: 'R5',
        label: 'Circuito Precidentes - Rebsamen - Xalapa 2000 - Arco Sur - Trancas - Lazaro Cardenas - Ruiz Cortinez - Sauces - Velodromo',
        type: 'circuit',
        color: '#dc2626',
        points: [
          [19.512664058614753, -96.92143131220811],
          [19.517581781971284, -96.91326778014738],
          [19.512633693133274, -96.90403064211233],
          [19.5123075745803, -96.90134709542035],
          [19.508845983080796, -96.90046678955896],
          [19.50792216749318, -96.90109108598443],
          [19.505969735613295, -96.88931457708361],
          [19.506202839653035, -96.87766002085613],
          [19.508949015456373, -96.869331005883],
          [19.51319364291143, -96.87525019549395],
          [19.51866085245444, -96.88269399949301],
          [19.523078794577437, -96.89495315101081],
          [19.535503081133356, -96.9078147397299],
          [19.539105829157567, -96.90770522594677],
          [19.560150231704544, -96.92235519356504],
          [19.56260701272572, -96.92990612450068],
          [19.55922216151033, -96.93180259535171],
          [19.5357510770896, -96.93587132423885],
          [19.529052293430958, -96.93519823096221],
          [19.52229829918367, -96.933694001258]
        ]


      },
      {
      id: 'R-Espinal',
        label: 'Espinal ',
        type: 'line',
        color: '#16a34a',
        points: [
          [19.535781516967127, -96.920275834156],
          [19.602536473877706, -96.95834930904101],
          [19.626304005021606, -96.87246637011164] 
      ]
      


      },

    ];

    // === 3) Utilidades de UI ===
    const $stats = document.getElementById('stats');
    function setStats(html) { $stats.innerHTML = html; }
    function fmtKm(m) { return (m/1000).toFixed(2) + ' km'; }
    function fmtMin(s) { return Math.round(s/60) + ' min'; }

    // === 4) Dibujar ruta "encajada" a carreteras con OSRM ===
    // Acepta >=2 puntos. Si es circuito, cierra con el primero.
    async function drawRouted(pointsLatLng, isCircuit=false, color='#3388ff') {
      routesLayer.clearLayers();
      markersLayer.clearLayers();

      if (!pointsLatLng || pointsLatLng.length < 2) {
        setStats('<span class="pill">⚠️</span> Se necesitan al menos 2 puntos.');
        return;
      }

      // Cerrar circuito si aplica
      let pts = pointsLatLng.slice();
      if (isCircuit) pts.push(pointsLatLng[0]);

      // Leaflet usa [lat,lng], OSRM en URL usa lon,lat
      const coordsParam = pts.map(([lat,lng]) => `${lng},${lat}`).join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${coordsParam}?overview=full&geometries=geojson`;

      setStats('Calculando ruta por carretera…');
      let data;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('OSRM no disponible');
        data = await res.json();
      } catch (e) {
        setStats('<span class="pill">❌</span> No se pudo calcular la ruta (OSRM).');
        return;
      }

      if (!data.routes || !data.routes.length) {
        setStats('<span class="pill">⚠️</span> No se encontró ruta.');
        return;
      }

      const route = data.routes[0]; // mejor ruta
      const gj = { type:'Feature', geometry: route.geometry, properties:{} };

      // Dibuja línea y marcadores de inicio/fin
      const line = L.geoJSON(gj, { style:{ color, weight:5, opacity:.9 } }).addTo(routesLayer);
      L.marker(pts[0].slice().reverse().slice().reverse() && pointsLatLng[0]).addTo(markersLayer).bindPopup('Inicio');
      L.marker(pts[pts.length-1].slice().reverse().slice().reverse() && pointsLatLng[isCircuit ? 0 : pointsLatLng.length-1])
        .addTo(markersLayer)
        .bindPopup(isCircuit ? 'Cierre' : 'Fin');

      map.fitBounds(line.getBounds(), { padding:[20,20] });

      // Resumen distancia/tiempo
      setStats(
        `<span class="pill">Distancia: ${fmtKm(route.distance)}</span>` +
        `<span class="pill">Duración: ${fmtMin(route.duration)}</span>` +
        (isCircuit ? ` <span class="pill">Circuito</span>` : '')
      );
      
      //Dibuja paradas si existen
      if (routeSelected && Array.isArray(routeSelected.stops)){
        routeSelected.stops.forEach(stop => {
        L.circleMarker(stop.coordenas,{
          radius: 5,
          color: 'red',
          fillColor: 'yellow',
          fillOpacity: 1
        })
        .addTo(markersLayer)
        .bindPopup(stop.nombre || 'Parada');
        });
      }
    }

    // === 5) Crear botones según ROUTES ===
    const btns = document.getElementById('btns');
    ROUTES.forEach(route => {
      const b = document.createElement('button');
      b.id = route.id;
      b.textContent = route.label;
      b.addEventListener('click', () => {
        const isCircuit = route.type === 'circuit';
        routeSelected = route;
        drawRouted(route.points, isCircuit, route.color);
      });
      btns.appendChild(b);
    });

    // === 6) Utilidades Limpiar/Ajustar ===
    document.getElementById('clear').addEventListener('click', () => {
      routesLayer.clearLayers();
      markersLayer.clearLayers();
      routeSelected = null;
      setStats('<small class="muted">Limpio. Elige una ruta.</small>');
    });

    document.getElementById('fit').addEventListener('click', () => {
      const bounds = routesLayer.getBounds?.();
      if (bounds && bounds.isValid && bounds.isValid()) {
        map.fitBounds(bounds, { padding:[20,20] });
      } else {
        map.setView([19.5426, -96.9103], 14);
      }
    });