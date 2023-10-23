## Procesos, hilos y corrutinas
● Un caso en el que usarías procesos para resolver un problema y por qué.

R//: Se pueden utilizar los procesos para generar varias instancias de un mismo servicio y aumentar la disponibilidad de este, ya que cuando un proceso quede bloqueado o se caiga, pueden seguir respondiendo los otros procesos, esto también mejora el rendimiento de un servicio ya que al haber más procesos trabajando a la vez, se pueden responder más solicitudes.

## Un caso en el que usarías threads para resolver un problema y por qué.

R//: Podemos utilizar los hilos cuando queremos procesar lotes de información de forma paralela, quizá en la generación de archivos de dispersión que van hacia un banco, en vez, de generar y enviar un archivo a la vez, podríamos procesar los archivos en hilos diferentes, así logramos que varios archivos puedan ser procesado y enviados al banco de forma paralela.

## Un caso en el que usarías corrutinas para resolver un problema y por qué.

R//: Las corrutinas son una forma ligera de trabajar el paralelismo, estas pueden ser utilizadas cuando queremos realizar varias peticiones a una API Http o la base de datos a la vez, son útiles en estos casos ya que no requieren del uso adicional de recursos del sistema operativo como sí lo hacen los hilos o los procesos.

## Optimización de recursos del sistema operativo

Si tuvieras 1.000.000 de elementos y tuvieras que consultar para cada uno de
ellos información en una API HTTP. ¿Cómo lo harías? Explicar.

R//: Al ser tantos elementos, es una buena idea procesarlos por lotes, y los elementos de lote ejecutarlos de manera paralela, también es muy útil aprovechar los diferentes núcleos del sistema operativo y ejecutar varios lotes en hilos diferentes. En cuanto a las consultas HTTP, seguramente muchas de las consultas que se van a realizar van a traer datos repetidos, por lo tanto, es buen enfoque poner en medio una capa de caché para poder acceder a la información que se repite más rápido. Por último, se puede hacer el uso de colas para no generar sobrecargas en el sistema e ir procesando los lotes de a poco.

## Análisis de complejidad

● Dados 4 algoritmos A, B, C y D que cumplen la misma funcionalidad, con
complejidades O(n^2), O(n^3), O(2^n) y O(n log n), respectivamente, ¿Cuál de los
algoritmos favorecerías y cuál descartarías en principio? Explicar por qué.

R//: 
### Prueba de algoritmo O(n^2)

- 1 elemento: $O(n^2) = 1^2 = 1$
- 6 elementos: $O(n^2) = 6^2 = 36$
- 10 elementos: $O(n^2) = 10 ^ 2 = 100$


### Prueba de algoritmo O(n^3)

- 1 elemento: $O(n^3) = 1^3 = 1$
- 6 elementos: $O(n^3) = 6^3 = 216$
- 10 elementos $O(n^3) = 10^3 = 1000$

### Prueba de algoritmo O(2^n)

- 1 elemento: $O(2^n) = 2^1 = 2$
- 6 elementos: $O(2^n) = 2^6 = 64$
- 10 elementos: $O(2^n) = 2^10 = 1024$

### Prueba de algoritmo O(n log n)

- 1 elemento: $O(n log n) = 1 log 1 = 1 * 0 = 0$
- 4 elementos: $O(n log n) = 4 log 4 = 4 * 2 = 8$
- 16 elementos: $O(n log n) = 16 log 16 = 16 * 4 = 64$

La conclusión es la siguiente: aunque con 6 elementos O(n^3) parecía el algoritmo menos eficiente, cuando llegamos a 10 elementos podemos notar que O(2^n) empieza a ser peor algoritmo, de todos los resultados, podemos observar que el algoritmo con complejidad exponencial va creciendo de manera desmedida cuando el número de elementos crece, lo cual lo hace el peor algoritmo de los cuatro.

En cuanto al algoritmo O(n log n) podemos notar que incluso con 6 elementos más que los otros algoritmos, dio mejores resultados, por lo tanto, es el algoritmo más eficiente.

Favorecería el algoritmo n log n, ya que es el mas eficiente de los algoritmos que se muestran allí.

## Asume que dispones de dos bases de datos para utilizar en diferentes problemas a resolver.

La primera llamada AlfaDB tiene una complejidad de O(1)
en consulta y O(n^2) en escritura. La segunda llamada BetaDB que tiene una
complejidad de O(log n) tanto para consulta, como para escritura. ¿Describe en
forma sucinta, qué casos de uso podrías atacar con cada una?

R//

AlfaB la pondría como base de datos de únicamente lectura, ya que tiene excelente capacidad de lectura pero mala capacidad de escritura, se podría utilizar para consulta de reportería y  datos estadísticos, también para una aplicación para visualizar logs.

BetaDB al tener buena escritura y lectura se podría utilizar como base de datos por defecto en un servicio o aplicación, la base de datos común que solemos usar en nuestros microservicios que termina siendo afectada ante las interacciones de un usuario.
