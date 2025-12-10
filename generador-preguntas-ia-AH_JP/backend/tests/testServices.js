import {
    generarPreguntas,
    obtenerPreguntas,
    obtenerPreguntaPorId,
    eliminarPregunta,
    limpiarTema
} from '../services.js';

const testServices = async () => {
    console.log('🚀 Iniciando tests de servicios...');

    try {
        const TEMA_TEST = 'javascript';

        // 1. Limpiar tema
        console.log('\n1. Limpiando tema...');
        const resLimpiar = await limpiarTema(TEMA_TEST);
        console.log('   Resultado:', resLimpiar);

        // 2. Generar preguntas
        console.log('\n2. Generando preguntas...');
        // Generamos solo 1 pregunta para no saturar y ser rápidos
        const preguntasGeneradas = await generarPreguntas(TEMA_TEST, 1, 'variables');
        console.log('   Preguntas generadas:', preguntasGeneradas.length);
        console.log('   Ejemplo (primera):', preguntasGeneradas[0]);

        if (preguntasGeneradas.length === 0) {
            throw new Error('No se generaron preguntas');
        }

        const idPregunta = preguntasGeneradas[0].id;

        // 3. Obtener preguntas
        console.log('\n3. Obteniendo preguntas de la BD...');
        const preguntasDb = await obtenerPreguntas(TEMA_TEST);
        console.log('   Total en BD:', preguntasDb.length);

        // 4. Obtener por ID
        console.log(`\n4. Obteniendo pregunta por ID (${idPregunta})...`);
        const preguntaId = await obtenerPreguntaPorId(idPregunta);
        console.log('   Pregunta encontrada:', preguntaId ? 'SÍ' : 'NO');
        if (preguntaId) {
            console.log('   Datos:', preguntaId);
        }

        // 5. Eliminar pregunta
        console.log(`\n5. Eliminando pregunta (${idPregunta})...`);
        const resEliminar = await eliminarPregunta(idPregunta);
        console.log('   Resultado:', resEliminar);

        // 6. Validar eliminación
        console.log('\n6. Verificando eliminación...');
        const checkEliminada = await obtenerPreguntaPorId(idPregunta);
        console.log('   ¿Existe todavía?:', checkEliminada ? 'SÍ (Error)' : 'NO (Correcto)');


        console.log('\n✅ Tests finalizados correctamente.');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error en los tests:', error);
        process.exit(1);
    }
};

testServices();