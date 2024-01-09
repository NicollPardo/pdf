import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';import 'jspdf-autotable';
@Component({
  selector: 'app-descarga',
  template: '<button (click)="downloadPdf()">Descargar PDF</button>',
  styleUrls: ['./descarga.component.css']
})
export class DescargaComponent implements AfterViewInit {
  @ViewChild('contentButton', { static: true }) contentButton!: ElementRef;

  downloadPdf() {
    try {
      const pdf = this.createPdf();
      this.addContentToPdf(pdf);
      this.addFooter(pdf);
      pdf.addPage();
      this.addHeaderToPdf(pdf);
      this.addTechnicalInfoTitle(pdf, {
        nombre: '--',
        apellido: '--',
        organizacion: '--',
        correo: '--@procalculo.com',
      });
      this.addFooter(pdf);
      this.addThirdPage(pdf);
      this.addFourthPage(pdf);
      pdf.save('archivo.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }
  createPdf(): jsPDF {
    return new jsPDF({
      unit: 'in',
    });
  }
  
  addContentToPdf(pdf: jsPDF) {
    const logoPath = 'assets/logos/logo mapas-02.png';
    const imgWidth = 4;
    const imgHeight = 1;

    pdf.addImage(logoPath, 'PNG', 2, 2, imgWidth, imgHeight);

    pdf.setFont('helvetica-bold'); 
    pdf.setFontSize(18);
    pdf.text('COTIZACIÓN DE IMÁGENES', 2 + imgWidth / 2, 4 + imgHeight + 0.4, { align: 'center' });
    
    const currentDate = new Date().toLocaleDateString();
    pdf.setFont('helvetica'); 
    pdf.setFontSize(10);
    pdf.text(`Fecha de Generación: ${currentDate}`, 1, pdf.internal.pageSize.height - 1.0); // Ajustar la posición vertical
    const hrYPos = pdf.internal.pageSize.height - 0.9;
    pdf.setLineWidth(0.01);
    pdf.line(1, hrYPos, pdf.internal.pageSize.width - 0.6, hrYPos);
    pdf.text(`Página ${pdf.getNumberOfPages()}`, pdf.internal.pageSize.width - 1, pdf.internal.pageSize.height - 1.0, { align: 'right' });
  }

  addFooter(pdf: jsPDF) {
    const footerText =
      'www.procalculo.com - info@procalculo.com\n' +
      'PBX. + 57 (601) 745 1145\n' +
      'Calle 90 No. 13 A - 20 Piso 4\n' +
      'Bogotá - Colombia';
  
    pdf.setFontSize(10);
    const lines = footerText.split('\n');
    const lineHeight = 0.2; 
    const totalHeight = lines.length * lineHeight;
  
    let yPos = (pdf.internal.pageSize.height - totalHeight) / 1 + 0.1; 
  
    lines.forEach((line) => {
      const textWidth = pdf.getTextWidth(line);
      const xPos = (pdf.internal.pageSize.width - textWidth) / 2; 
      pdf.text(line, xPos, yPos);
      yPos += lineHeight;
    });
  }
  
    addHeaderToPdf(pdf: jsPDF) {
      const logoPath1 = 'assets/logos/logo mapas-02.png';
      const logoPath2 = 'assets/logos/procalculoLogoAzul.png'; 
      const imgWidth = 0.8;
      const imgHeight = 0.4;
      pdf.addImage(logoPath1, 'PNG', 1, 0.5, imgWidth, imgHeight);
      pdf.addImage(logoPath2, 'PNG', pdf.internal.pageSize.width - imgWidth - 1, 0.4, imgWidth, imgHeight);
  
      pdf.setFont('helvetica'); 
      pdf.setFontSize(9);
      pdf.text('COTIZACIÓN DE IMÁGENES', 6, 0.9); 
  
      const hrYPos = 1.0; 
      pdf.setLineWidth(0.01);
      pdf.line(1, hrYPos, pdf.internal.pageSize.width - 0.6, hrYPos);
  
  
      pdf.text(`Página ${pdf.getNumberOfPages()}`, pdf.internal.pageSize.width - 1, pdf.internal.pageSize.height - 1.0, { align: 'right' });
      const currentDate = new Date().toLocaleDateString();
      pdf.text(`Fecha de Generación: ${currentDate}`, 1, pdf.internal.pageSize.height - 1.0);
      pdf.line(1, 10.8, pdf.internal.pageSize.width - 0.6, 10.8);
    }

addTechnicalInfoTitle(pdf: jsPDF, usuario: any) {
  pdf.setFont('helvetica-bold'); 
  pdf.setFontSize(15);
  pdf.text('INFORMACIÓN TÉCNICA', pdf.internal.pageSize.width / 2, 1.3, { align: 'center' });
  pdf.setLineWidth(0.01);

  pdf.setFontSize(12);
  pdf.text(`Nombre: ${usuario.nombre} ${usuario.apellido}`, 1, 1.7);
  pdf.text(`Organización: ${(!usuario.organizacion) ? "--" : usuario.organizacion}`, 1, 2.0);
  pdf.text(`Correo: ${usuario.correo}`, 1, 2.3);

  pdf.setFontSize(13);
  pdf.text('LOCALIZACIÓN GENERAL', pdf.internal.pageSize.width / 2, 3, { align: 'center' });

  pdf.setFontSize(12);
  pdf.text('La siguiente sección muestra el cubrimiento de las imágenes ofrecidas sobre el área de interés:', 0.8, 3.5);

  pdf.setFontSize(10);
  pdf.text('Cobertura Total: NaN Km2', 1, 4.0);
  pdf.text('Cobertura Planet: Km2', 1, 4.3);
  pdf.text('Cobertura Maxar: Km2', 1, 4.6);
  pdf.text('AOI: 0 Km2', 1, 4.9);

  const spaceHeight = 0.5; 
  pdf.text('', 1, 4.9 + spaceHeight);

  const imgPath1 = 'assets/logos/logo mapas-02.png'; 
  const imgPath2 = 'assets/logos/procalculoLogoAzul.png'; 
  const imgWidth = 1.5;
  const imgHeight = 1.5; 

  pdf.addImage(imgPath1, 'PNG', 1, 4.9 + spaceHeight + 0.1, imgWidth, imgHeight);
  pdf.addImage(imgPath2, 'PNG', 2.5, 4.9 + spaceHeight + 0.1, imgWidth, imgHeight);


  const data = [
    ['Proveedor', 'Temporalidad', 'Área Imagen', 'Cobertura', 'Nubosidad', 'Ángulo Nadir'],
    ['Planet', '2022-04-16T14:35:41.083529Z', '11', '11', '0.05', '1'],
    ['Planet', '2022-04-16T14:35:38.78513Z', '12', '12', '0.02', '1'],
    ['Maxar', '2019-12-22T18:41:46.985191Z', '13', '13', '62.486557278389576', '50.31285966666667'],
    ['Maxar', '2021-08-02T18:33:36.212240Z', '14', '14', '62.15722505039171', '251.88978538461538'],
  ];

  ({
    head: [['Proveedor', 'Temporalidad', 'Área Imagen', 'Cobertura', 'Nubosidad', 'Ángulo Nadir']],
    body: data,
    startY: 1.5, 
    theme: 'grid', 
    styles: { fontSize: 10, cellPadding: 0.2, overflow: 'linebreak' },
    columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 70 }, 2: { cellWidth: 30 }, 3: { cellWidth: 30 }, 4: { cellWidth: 30 }, 5: { cellWidth: 30 } },
  });
}

 addThirdPage(pdf: jsPDF) {
      pdf.addPage();
      this.addHeaderToPdf(pdf);
      pdf.setFont('helvetica');
      pdf.setFontSize(15);
      pdf.text('IMÁGENES PLANET', pdf.internal.pageSize.width / 2, 1.3, { align: 'center' });
      pdf.setFontSize(11);
      pdf.text('Las imágenes se entregarán en el modo MULTIESPECTRAL, con resolución espectral de hasta 8 bandas1,', 0.6, 1.8);
      pdf.text('organizadas de la siguiente forma: 6 bandas en el espectro visible (Costal, Azul, Verde l, Verde,', 0.6, 2.0);
      pdf.text('Amarillo y Rojo) y 2 banda en el Infrarrojo (Red Edge e infrarrojo cercano) y resolución espacial de 3.125 mt', 0.6, 2.2);
      pdf.text('Las imágenes serán entregadas en el siguiente modo de procesamiento: ', 0.6, 2.4);
  
      pdf.text('Planetscope Scene – El producto PlanetScope Scene esta corregido radiométricamente,geométricamente, con', 0.6, 2.8);
      pdf.text('correcciones para el ángulo del sol y con corrección de color (usando una curva de color).Viene con', 0.6, 3.0);
      pdf.text('ortorectificación utilizando GCP y DEMs finos (30 m a 90 m posting) a <10 m RMSE de precisión', 0.6, 3.2);
      pdf.text('posicional. Las imágenes se ortorrectifican y se proyectan a una proyección UTM WGS84.', 0.6, 3.4);
  
  
      pdf.text('Este producto ha sido procesado para eliminar las distorsiones causadas por el terreno y puede ser', 0.6, 3.8);
      pdf.text('utilizado para propósitos de mapeo y visualización cartográfica. Esta corrección también elimina el', 0.6, 4.0);
      pdf.text('efecto de perspectiva en el suelo (noen edificios), la restauración de la geometría de un tiro vertical. Además,', 0.6, 4.2);
      pdf.text('se hace una corrección para el ángulo de sol.anetScope Scene es óptimo para un uso simple y directo de una', 0.6, 4.4);
      pdf.text('imagen. Se diseña y se hace visualmente atractivo para una amplia variedad de aplicaciones que requieren', 0.6, 4.6);
      pdf.text('con una geolocalización exacta y proyección cartográfica. El producto se puede utilizar y se ingiere', 0.6, 4.8);
      pdf.text('directamente en un Sistema de Información Geográfica.', 0.6, 5.0);
      const imgPath1 = 'ruta/imagen1.png';
      const imgPath2 = 'ruta/imagen2.png';
      
      const imgWidth = 50; 
      const imgHeight = 30;    

      
  pdf.text('Nubosidad: 0.05', 4, 5.5);
  pdf.text('Sensor: PSB.SD', 4, 5.7);
  pdf.text('Satélite: 242b', 4, 5.9);
  pdf.text('Id: 20220416_143541_08_242b', 4, 6.1);
  pdf.text('Ángulo Nadir: 1', 4, 6.3);
  pdf.text('2022-04-16T14:35:41.083529Z', 4, 6.5);

  pdf.text('Nubosidad: 0.02', 4, 6.9);
  pdf.text('Sensor: PSB.SD', 4, 7.1);
  pdf.text('Satélite: 242b', 4, 7.3);
  pdf.text('Id: 20220416_143538_78_242b', 4, 7.5);
  pdf.text('Ángulo Nadir: 1', 4, 7.7);
  pdf.text('2022-04-16T14:35:38.78513Z', 4, 7.9);

      pdf.setLineWidth(0.01);
      this.addFooter(pdf);
    }
    addFourthPage(pdf: jsPDF) {
      pdf.addPage();
      this.addHeaderToPdf(pdf);
      pdf.setFont('helvetica-bold');
      pdf.setFontSize(15);
      pdf.text('IMÁGENES MAXAR', pdf.internal.pageSize.width / 2, 1.3, { align: 'center' });
      pdf.setFontSize(11);
      pdf.text('Las imágenes se entregarán en el modo MULTIESPECTRAL, con resolución espectral de hasta 4 bandas1, organizadas', 0.6, 1.8);
      pdf.text('de la siguiente forma: 3 bandas en el espectro visible (Azul, Verde y Rojo) y 1 banda en el Infrarrojo (infrarrojo cercano) y', 0.6, 2.0);
      pdf.text('resolución espacial submétrica que va desde los 0.5 m hasta los 0.3 m gracias a la fusión entre la imagen espectral y la', 0.6, 2.2);
      pdf.text('potente captura nativa de los sensores pancromáticos presentes en todos los satélites de la constelación MAXAR, la cual', 0.6, 2.4);
      pdf.text('se compone de los satélites WorldView-3, WorldView-2 y GeoEye-1.', 0.6, 2.6);
  
      pdf.text('Las imágenes se entregan corregidas radiométrica y geométricamente y con una ortorectificacion al vuelo que garantiza', 0.6, 3.0);
      pdf.text('una precisión de localización absoluta de 10 m. Están listas para integrar en un flujo de trabajo GIS, con fines como la', 0.6, 3.2);
      pdf.text('creación y revisión de bases de datos de', 0.6, 3.4);
      const imgPath1 = 'ruta/imagen1.png';
      const imgPath2 = 'ruta/imagen2.png';
    
      const imgWidth = 50; 
      const imgHeight = 30; 
    
      pdf.text('Id: item.img.nubosidad', 0.6, 6.8);
      pdf.text('Id: 10200100929E7B00', 0.6, 7);
      pdf.text('Id: item.img.nubosidad', 3, 6.8);
      pdf.text('Id: 10200100B537E40', 3, 7);
      pdf.setLineWidth(0.01);
      this.addFooter(pdf);
      pdf.setFontSize(15);
  }
  ngAfterViewInit() {
  }
}
