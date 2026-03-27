const mesaData = require('./src/data/mesas/mesas.json');
function sugerirMesas(personas, mesasDisponibles){
  const n = parseInt(personas);
  if (!n || n < 1) return [];
  const disponibles = mesasDisponibles.filter(m => m.status.detalle === 'disponible');
  if (disponibles.length === 0) return [];
  const sorted = [...disponibles].sort((a, b) => a.capacity - b.capacity);
  let mejor = [];
  let mejorTotal = Number.POSITIVE_INFINITY;
  const total = sorted.length;
  const maxMask = 1 << total;
  for (let mask = 1; mask < maxMask; mask++) {
    const subset = [];
    let sum = 0;
    for (let i = 0; i < total; i++) {
      if ((mask >> i) & 1) {
        subset.push(sorted[i]);
        sum += sorted[i].capacity;
      }
    }
    if (sum >= n && (sum < mejorTotal || (sum === mejorTotal && subset.length < mejor.length))) {
      mejor = subset;
      mejorTotal = sum;
    }
  }
  return mejor;
}
const interior = mesaData.filter(m => m.location.detalle === 'Interior');
console.log('Interior disponible:', interior.filter(m => m.status.detalle === 'disponible').map(m => `${m.name}(${m.capacity})`));
console.log('Sugerir 4:', sugerirMesas('4', interior).map(m => m.name));
console.log('Sugerir 2:', sugerirMesas('2', interior).map(m => m.name));
