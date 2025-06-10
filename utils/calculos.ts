export interface ResultadoCirculo {
    area: string;
    perimetro: string;
    diametro: string;
}

export interface ResultadoQuadrado {
    area: string;
    perimetro: string;
    diagonal: string;
}

export interface ResultadoTriangulo {
    area: string;
    perimetro: string;
    tipo: 'Equilátero' | 'Isósceles' | 'Escaleno';
}

export interface ResultadoElipse {
    area: string;
    perimetro: string;
    excentricidade: string;
}

export function calcularForma(
  tipo: 'circulo' | 'quadrado' | 'triangulo' | 'elipse',
  valores: number[]
): ResultadoCirculo | ResultadoQuadrado | ResultadoTriangulo | ResultadoElipse {
  switch (tipo) {
    case 'circulo':
      return calcularCirculo(valores[0]);
    case 'quadrado':
      return calcularQuadrado(valores[0]);
    case 'triangulo':
      return calcularTriangulo(valores[0], valores[1], valores[2]);
    case 'elipse':
      return calcularElipse(valores[0], valores[1]);
    default:
      throw new Error('Forma geométrica não suportada');
  }
}

function calcularCirculo(raio: number): ResultadoCirculo {
  const area = Math.PI * Math.pow(raio, 2);
  const perimetro = 2 * Math.PI * raio;
  const diametro = 2 * raio;

  return {
    area: area.toFixed(2),
    perimetro: perimetro.toFixed(2),
    diametro: diametro.toFixed(2),
  };
}

function calcularQuadrado(lado: number): ResultadoQuadrado {
  const area = Math.pow(lado, 2);
  const perimetro = 4 * lado;
  const diagonal = lado * Math.sqrt(2);

  return {
    area: area.toFixed(2),
    perimetro: perimetro.toFixed(2),
    diagonal: diagonal.toFixed(2),
  };
}

function calcularTriangulo(
  ladoA: number,
  ladoB: number,
  ladoC: number
): ResultadoTriangulo {

  let tipo: 'Equilátero' | 'Isósceles' | 'Escaleno' = 'Escaleno';
  if (ladoA === ladoB && ladoB === ladoC) {
    tipo = 'Equilátero';
  } else if (ladoA === ladoB || ladoA === ladoC || ladoB === ladoC) {
    tipo = 'Isósceles';
  }

  const semiPerimetro = (ladoA + ladoB + ladoC) / 2;
  const area = Math.sqrt(
    semiPerimetro *
      (semiPerimetro - ladoA) *
      (semiPerimetro - ladoB) *
      (semiPerimetro - ladoC)
  );

  return {
    area: area.toFixed(2),
    perimetro: (ladoA + ladoB + ladoC).toFixed(2),
    tipo,
  };
}

function calcularElipse(raioX: number, raioY: number): ResultadoElipse {
  const area = Math.PI * raioX * raioY;
  
  const h = Math.pow(raioX - raioY, 2) / Math.pow(raioX + raioY, 2);
  const perimetro = Math.PI * (raioX + raioY) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  
  const e = Math.sqrt(1 - Math.pow(Math.min(raioX, raioY) / Math.max(raioX, raioY), 2));

  return {
    area: area.toFixed(2),
    perimetro: perimetro.toFixed(2),
    excentricidade: e.toFixed(4),
  };
}