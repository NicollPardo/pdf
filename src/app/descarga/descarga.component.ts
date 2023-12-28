
import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-descarga',
  template: '<button (click)="downloadPdf()">Descargar PDF</button>',
  styleUrls: ['./descarga.component.css']
})
export class DescargaComponent {

  constructor() {}

  downloadPdf(): void {
    const doc = new jsPDF({
      orientation: 'portrait', 
      unit: 'mm',
      format: 'letter' 
    });
    
    
    const textMaxar = 'Las imágenes se entregarán en el modo MULTIESPECTRAL, con resolución espectral de hasta 4 bandas1, organizadas de la siguiente forma: 3 ' +
      'bandas en el espectro visible (Azul, Verde y Rojo) y 1 banda en el Infrarrojo (infrarrojo cercano) y resolución espacial submétrica que va desde ' +
      'los 0.5 m hasta los 0.3 m gracias a la fusión entre la imagen espectral y la potente captura nativa de los sensores pancromáticos presentes en ' +
      'todos los satélites de la constelación MAXAR, la cual se compone de los satélites WorldView-3, WorldView-2 y GeoEye-1.' + '\n\n' +
      'Las imágenes se entregan corregidas radiométrica y geométricamente y con una ortorectificación al vuelo que garantiza una precisión de ' +
      'localización absoluta de 10 m. Están listas para integrar en un flujo de trabajo GIS, con fines como la creación y revisión de bases de datos de ' +
      'cartografía o actualización de capas ya existentes.';

    this.addLine(doc, 10, textMaxar, 'left');

    doc.save('mi-archivo.pdf');
  }

  addLine(doc: any, size: number, texto: string, alineacion: string): void {
    doc.setFontSize(size);
    doc.text(texto, 10, 10, { align: alineacion });
  }
}
