import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-descarga',
  template: '<button #contentButton (click)="downloadPdf()">Descargar PDF</button>',
  styleUrls: ['./descarga.component.css']
})
export class DescargaComponent implements AfterViewInit {

  @ViewChild('contentButton', { static: false }) contentButton!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {

  }

  downloadPdf(): void {
    const pdf = new jsPDF();

    // Primera página 
    this.addFirstPage(pdf).then(() => {
      // Segunda página
      this.addHowAreYouPage(pdf);
      // Tercera página
      this.addTextAndImagesPage(pdf).then(() => {
        // Cuarta página
        this.addHowAreYouTextAndImagesPage(pdf).then(() => {
          // Descargar el PDF
          pdf.save('mi-archivo.pdf');
        });
      });
    });
  }

  addFirstPage(pdf: any): Promise<void> {
    return new Promise<void>((resolve) => {
      let pageNumber = 0;
      pdf.on('pageAdded', () => {
        pageNumber++;
        let bottom = pdf.page.margins.bottom;

        if (pageNumber > 1) {
        
          pdf.image('assets/logos/logo mapas-02.png', pdf.page.width / 4 - 100, 25, { fit: [70, 70], align: 'center' });

          pdf.font('Helvetica-Bold').fontSize(12);
          pdf.text('COTIZACIÓN DE IMÁGENES', pdf.page.width / 2 + 45, 42, { width: pdf.page.width / 3, align: 'right' });

          pdf
            .moveTo(50, 55)
            .lineTo(pdf.page.width - 50, 55)
            .stroke();
        }
        pdf.page.margins.bottom = 0;
        pdf
          .moveTo(50, pdf.page.height - 60)
          .lineTo(pdf.page.width - 50, pdf.page.height - 60)
          .stroke();

        pdf.font('Helvetica').fontSize(7);
        pdf.text(
          'www.procalculo.com - info@procalculo.com' + '\n' + 'PBX. + 57 (601) 745 1145' + '\n' + 'Calle 90 No. 13 A - 20 Piso 4' + '\n' + 'Bogotá - Colombia',
          0.5 * (pdf.page.width - 150),
          pdf.page.height - 55,
          {
            width: 150,
            align: 'center',
            lineBreak: false,
          },
        );

        const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        const todayString = today.toLocaleDateString('es-ES', options);
        pdf.text(
          'Fecha de generación: ' + todayString,
          50,
          pdf.page.height - 70,
          {
            width: pdf.page.width / 2,
            align: 'left',
            lineBreak: false,
          },
        );

        pdf.text(
          'Página ' + pageNumber,
          pdf.page.width - 150,
          pdf.page.height - 70,
          {
            width: 100,
            align: 'right',
            lineBreak: false,
          },
        );
        pdf.page.margins.bottom = bottom;
        
        resolve();
      });
    });
  }

  addHowAreYouPage(pdf: any): void {
    pdf.addPage();

    pdf.text('', 50, 70);
    pdf.fontSize(24);
    pdf.moveDown();
    pdf.font('Helvetica-Bold').fontSize(20);

    pdf.text('INFORMACIÓN TÉCNICA', {
      width: pdf.page.width - 100,
      align: 'center',
    });

    pdf.moveDown();

    
    const cotizacion = { usuario: { nombre: 'John', apellido: 'Doe', organizacion: 'ABC Corp', correo: 'john.doe@example.com' } };
    const imagenes = [
      { proveedor: 'Proveedor1', temporalidad: 'Temporalidad1', area: 'Area1', cobertura: 'Cobertura1', nubosidad: 'Nubosidad1', angulo: 'Angulo1' },
      
    ];

    const tableInfo = {
      headers: [
        { label: 'Nombre', property: 'nombre', width: 80, renderer: null },
        { label: 'Descripción', property: 'description', width: 150, renderer: null },
      ],
      datas: [
        { nombre: 'bold:Nombre:', description: `${cotizacion.usuario.nombre.toUpperCase()} ${cotizacion.usuario.apellido.toUpperCase()}` },
        { nombre: 'bold:Organización:', description: `${(!cotizacion.usuario.organizacion) ? "--" : cotizacion.usuario.organizacion}` },
        { nombre: 'bold:Correo:', description: `${cotizacion.usuario.correo}` },
      ],
    };

    pdf.table(tableInfo, {
      hideHeader: true,
      divider: {
        header: { disabled: true, width: 2, opacity: 1 },
        horizontal: { disabled: true, width: 0.5, opacity: 0.5 },
      },
      prepareHeader: () => pdf.font('Helvetica-Bold').fontSize(8),
      prepareRow: (row: any, indexColumn: any, indexRow: any, rectRow: any) => {
        pdf.font("Helvetica").fontSize(10);
        indexColumn === 0 && pdf.addBackground(rectRow, (indexRow % 2 ? 'white' : 'white'), 0.15);
    },
    });

    pdf.moveDown();

    pdf.font('Helvetica-Bold').fontSize(16);
    pdf.text('LOCALIZACIÓN GENERAL', {
      width: pdf.page.width - 100,
      align: 'center',
    });

    pdf.moveDown();

    const tableImages = {
      title: '',
      subtitle: 'Características generales:',
      headers: [
        { label: 'Proveedor', property: 'proveedor', valign: 'center', headerAlign: 'center', align: 'center' },
        { label: 'Temporalidad', property: 'temporalidad', valign: 'center', headerAlign: 'center', align: 'center' },
        { label: 'Área Imagen', property: 'area', valign: 'center', headerAlign: 'center', align: 'center' },
        { label: 'Cobertura', property: 'cobertura', valign: 'center', headerAlign: 'center', align: 'center' },
        { label: 'Nubosidad', property: 'nubosidad', valign: 'center', headerAlign: 'center', align: 'center' },
        { label: 'Ángulo Nadir', property: 'angulo', valign: 'center', headerAlign: 'center', align: 'center' },
      ],
      rows: imagenes,
    };

    pdf.moveDown();
    pdf.table(tableImages, {
      columnsSize: [60, 140, 80, 80, 70, 70],
    });
  }

  addTextAndImagesPage(pdf: any): Promise<void> {
    return new Promise<void>((resolve) => {
  
      pdf.addPage();
      pdf.text('...', pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() / 2, { align: 'center' });

      resolve();
    });
  }

  addHowAreYouTextAndImagesPage(pdf: any): Promise<void> {
    return new Promise<void>((resolve) => {
      pdf.addPage();

      pdf.font('Helvetica-Bold').fontSize(16);
      pdf.text('IMÁGENES MAXAR', {
        width: pdf.page.width - 100,
        align: 'center',
      });

      const textMaxar = 'Las imágenes se entregarán en el modo MULTIESPECTRAL, con resolución espectral de hasta 4 bandas1, organizadas de la siguiente forma: 3 ' +
        'bandas en el espectro visible (Azul, Verde y Rojo) y 1 banda en el Infrarrojo (infrarrojo cercano) y resolución espacial submétrica que va desde ' +
        'los 0.5 m hasta los 0.3 m gracias a la fusión entre la imagen espectral y la potente captura nativa de los sensores pancromáticos presentes en ' +
        'todos los satélites de la constelación MAXAR, la cual se compone de los satélites WorldView-3, WorldView-2 y GeoEye-1.' + '\n\n' +
        'Las imágenes se entregan corregidas radiométrica y geométricamente y con una ortorectificacion al vuelo que garantiza una precisión de ' +
        'localización absoluta de 10 m. Están listas para integrar en un flujo de trabajo GIS, con fines como la creación y revisión de bases de datos de ' +
        'cartografía o actualización de capas ya existentes.';

      this.addLine(pdf, 16, textMaxar, 'justify');

      resolve();
    });
  }

  addLine(pdf: any, size: number, texto: string, alineacion: string): void {
    pdf.moveDown();
    pdf.font('Helvetica').fontSize(size);
    pdf.text(texto, {
      align: alineacion,
    });
  }
}
