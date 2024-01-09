import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';

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
    let yPos = pdf.internal.pageSize.height - 0.7;

    lines.forEach((line) => {
      pdf.text(line, 3, yPos);
      yPos += 0.2; 
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
  }

  addThirdPage(pdf: jsPDF) {
    pdf.addPage();
    this.addHeaderToPdf(pdf);
    pdf.setFont('helvetica');
    pdf.setFontSize(15);
    pdf.text('IMÁGENES PLANET', pdf.internal.pageSize.width / 2, 1.3, { align: 'center' });
    pdf.setLineWidth(0.01);
    this.addFooter(pdf);
  }
  
  addFourthPage(pdf: jsPDF) {
    pdf.addPage();
    this.addHeaderToPdf(pdf);
    pdf.setFont('helvetica-bold');
    pdf.setFontSize(15);
    pdf.text('IMÁGENES MAXAR', pdf.internal.pageSize.width / 2, 1.3, { align: 'center' });
    pdf.setLineWidth(0.01);
    this.addFooter(pdf);
  }
  

  ngAfterViewInit() {
    
  }
}
