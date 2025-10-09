export// Base de datos de fútbol con equipos, jugadores, ligas y partidos
const dataAPI = {
  ligas: [
    {
      id: 1,
      nombre: "La Liga",
      pais: "España",
      temporada: "2024-25",
      equipos: 20
    },
    {
      id: 2,
      nombre: "Premier League",
      pais: "Inglaterra",
      temporada: "2024-25",
      equipos: 20
    },
    {
      id: 3,
      nombre: "Serie A",
      pais: "Italia",
      temporada: "2024-25",
      equipos: 20
    },
    {
      id: 4,
      nombre: "Bundesliga",
      pais: "Alemania",
      temporada: "2024-25",
      equipos: 18
    }
  ],
  
  equipos: [
    // La Liga
    {
      id: 1,
      nombre: "Real Madrid",
      ciudad: "Madrid",
      ligaId: 1,
      fundado: 1902,
      estadio: "Santiago Bernabéu",
      capacidad: 81044,
      entrenador: "Carlo Ancelotti",
      titulos: 35
    },
    {
      id: 2,
      nombre: "FC Barcelona",
      ciudad: "Barcelona",
      ligaId: 1,
      fundado: 1899,
      estadio: "Camp Nou",
      capacidad: 99354,
      entrenador: "Xavi Hernández",
      titulos: 27
    },
    {
      id: 3,
      nombre: "Atlético Madrid",
      ciudad: "Madrid",
      ligaId: 1,
      fundado: 1903,
      estadio: "Wanda Metropolitano",
      capacidad: 68456,
      entrenador: "Diego Simeone",
      titulos: 11
    },
    {
      id: 4,
      nombre: "Sevilla FC",
      ciudad: "Sevilla",
      ligaId: 1,
      fundado: 1890,
      estadio: "Ramón Sánchez-Pizjuán",
      capacidad: 43883,
      entrenador: "José Luis Mendilibar",
      titulos: 1
    },
    
    // Premier League
    {
      id: 5,
      nombre: "Manchester City",
      ciudad: "Manchester",
      ligaId: 2,
      fundado: 1880,
      estadio: "Etihad Stadium",
      capacidad: 55017,
      entrenador: "Pep Guardiola",
      titulos: 10
    },
    {
      id: 6,
      nombre: "Arsenal",
      ciudad: "Londres",
      ligaId: 2,
      fundado: 1886,
      estadio: "Emirates Stadium",
      capacidad: 60260,
      entrenador: "Mikel Arteta",
      titulos: 13
    },
    {
      id: 7,
      nombre: "Liverpool",
      ciudad: "Liverpool",
      ligaId: 2,
      fundado: 1892,
      estadio: "Anfield",
      capacidad: 53394,
      entrenador: "Jürgen Klopp",
      titulos: 19
    },
    {
      id: 8,
      nombre: "Chelsea",
      ciudad: "Londres",
      ligaId: 2,
      fundado: 1905,
      estadio: "Stamford Bridge",
      capacidad: 40341,
      entrenador: "Mauricio Pochettino",
      titulos: 6
    }
  ],
  
  jugadores: [
    // Real Madrid
    {
      id: 1,
      nombre: "Vinícius Jr.",
      apellidos: "de Oliveira Junior",
      equipoId: 1,
      posicion: "Extremo izquierdo",
      edad: 24,
      nacionalidad: "Brasil",
      dorsal: 7,
      goles: 15,
      asistencias: 8,
      valorMercado: 120000000
    },
    {
      id: 2,
      nombre: "Jude",
      apellidos: "Bellingham",
      equipoId: 1,
      posicion: "Centrocampista",
      edad: 21,
      nacionalidad: "Inglaterra",
      dorsal: 5,
      goles: 12,
      asistencias: 6,
      valorMercado: 150000000
    },
    {
      id: 3,
      nombre: "Karim",
      apellidos: "Benzema",
      equipoId: 1,
      posicion: "Delantero centro",
      edad: 36,
      nacionalidad: "Francia",
      dorsal: 9,
      goles: 18,
      asistencias: 4,
      valorMercado: 25000000
    },
    
    // FC Barcelona
    {
      id: 4,
      nombre: "Robert",
      apellidos: "Lewandowski",
      equipoId: 2,
      posicion: "Delantero centro",
      edad: 35,
      nacionalidad: "Polonia",
      dorsal: 9,
      goles: 22,
      asistencias: 3,
      valorMercado: 45000000
    },
    {
      id: 5,
      nombre: "Pedri",
      apellidos: "González López",
      equipoId: 2,
      posicion: "Centrocampista",
      edad: 21,
      nacionalidad: "España",
      dorsal: 8,
      goles: 4,
      asistencias: 12,
      valorMercado: 100000000
    },
    {
      id: 6,
      nombre: "Gavi",
      apellidos: "Páez Gavira",
      equipoId: 2,
      posicion: "Centrocampista",
      edad: 20,
      nacionalidad: "España",
      dorsal: 6,
      goles: 2,
      asistencias: 8,
      valorMercado: 90000000
    },
    
    // Manchester City
    {
      id: 7,
      nombre: "Erling",
      apellidos: "Haaland",
      equipoId: 5,
      posicion: "Delantero centro",
      edad: 24,
      nacionalidad: "Noruega",
      dorsal: 9,
      goles: 28,
      asistencias: 5,
      valorMercado: 180000000
    },
    {
      id: 8,
      nombre: "Kevin",
      apellidos: "De Bruyne",
      equipoId: 5,
      posicion: "Centrocampista",
      edad: 33,
      nacionalidad: "Bélgica",
      dorsal: 17,
      goles: 8,
      asistencias: 18,
      valorMercado: 80000000
    },
    
    // Arsenal
    {
      id: 9,
      nombre: "Bukayo",
      apellidos: "Saka",
      equipoId: 6,
      posicion: "Extremo derecho",
      edad: 23,
      nacionalidad: "Inglaterra",
      dorsal: 7,
      goles: 14,
      asistencias: 11,
      valorMercado: 130000000
    },
    {
      id: 10,
      nombre: "Martin",
      apellidos: "Ødegaard",
      equipoId: 6,
      posicion: "Centrocampista",
      edad: 25,
      nacionalidad: "Noruega",
      dorsal: 8,
      goles: 6,
      asistencias: 15,
      valorMercado: 100000000
    }
  ],
  
  partidos: [
    {
      id: 1,
      equipoLocal: 1,
      equipoVisitante: 2,
      fechaHora: "2024-10-26T21:00:00Z",
      estadio: "Santiago Bernabéu",
      ligaId: 1,
      jornada: 11,
      golesLocal: null,
      golesVisitante: null,
      estado: "programado"
    },
    {
      id: 2,
      equipoLocal: 3,
      equipoVisitante: 4,
      fechaHora: "2024-10-20T16:15:00Z",
      estadio: "Wanda Metropolitano",
      ligaId: 1,
      jornada: 10,
      golesLocal: 2,
      golesVisitante: 1,
      estado: "finalizado"
    },
    {
      id: 3,
      equipoLocal: 5,
      equipoVisitante: 6,
      fechaHora: "2024-10-15T17:30:00Z",
      estadio: "Etihad Stadium",
      ligaId: 2,
      jornada: 8,
      golesLocal: 3,
      golesVisitante: 1,
      estado: "finalizado"
    },
    {
      id: 4,
      equipoLocal: 7,
      equipoVisitante: 8,
      fechaHora: "2024-10-28T14:30:00Z",
      estadio: "Anfield",
      ligaId: 2,
      jornada: 9,
      golesLocal: null,
      golesVisitante: null,
      estado: "programado"
    }
  ],
  
  estadisticas: [
    // Tabla de posiciones La Liga
    {
      ligaId: 1,
      equipoId: 1,
      posicion: 1,
      puntos: 24,
      partidosJugados: 9,
      partidosGanados: 8,
      partidosEmpatados: 0,
      partidosPerdidos: 1,
      golesFavor: 21,
      golesContra: 7,
      diferenciaGoles: 14
    },
    {
      ligaId: 1,
      equipoId: 2,
      posicion: 2,
      puntos: 21,
      partidosJugados: 9,
      partidosGanados: 7,
      partidosEmpatados: 0,
      partidosPerdidos: 2,
      golesFavor: 25,
      golesContra: 10,
      diferenciaGoles: 15
    },
    {
      ligaId: 1,
      equipoId: 3,
      posicion: 3,
      puntos: 17,
      partidosJugados: 9,
      partidosGanados: 5,
      partidosEmpatados: 2,
      partidosPerdidos: 2,
      golesFavor: 13,
      golesContra: 8,
      diferenciaGoles: 5
    },
    
    // Tabla de posiciones Premier League
    {
      ligaId: 2,
      equipoId: 5,
      posicion: 1,
      puntos: 23,
      partidosJugados: 8,
      partidosGanados: 7,
      partidosEmpatados: 2,
      partidosPerdidos: 0,
      golesFavor: 22,
      golesContra: 6,
      diferenciaGoles: 16
    },
    {
      ligaId: 2,
      equipoId: 6,
      posicion: 2,
      puntos: 20,
      partidosJugados: 8,
      partidosGanados: 6,
      partidosEmpatados: 2,
      partidosPerdidos: 0,
      golesFavor: 18,
      golesContra: 8,
      diferenciaGoles: 10
    },
    {
      ligaId: 2,
      equipoId: 7,
      posicion: 3,
      puntos: 18,
      partidosJugados: 8,
      partidosGanados: 6,
      partidosEmpatados: 0,
      partidosPerdidos: 2,
      golesFavor: 17,
      golesContra: 9,
      diferenciaGoles: 8
    }
  ]
}

// Exportar la base de datos para su uso en otros módulos
export default { dataAPI }