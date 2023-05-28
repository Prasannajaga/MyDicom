import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/Apiservices';
export interface dicomMetaData {
  imageType:string
	SOPUID:string
	SOPInstanceUID:string
	StudyDate:string
	SeriesDate:string
	AcquistionDate:string
	ContentDate:string
	StudyTime:string
	SeriesTime:string
	AcquistionTime:string
	ContentTime:string
	AccessionNumberIS:string
	Modality:string
	Manufacturer:string
	InstitutionTime:string
	ReferringPhysicianName:string
	StudyDescription:string
	SeriesDescription:string
	ManufacturerModelName:string
	PatientName :string
	PatientOrientationCS:string
	PatientBirthDate :string
	PatientSex:string
	OtherPatientIDs:string
	PatientAge:string
	PatientWeight :string
	PregnancyStatus:string
	SliceThickness:string
	SpacingbetweenSlices:string
	SoftwareVersion:string
	ProtocolName:string
	StudyInstanceUID:string
	SeriesInstanceUID:string
	StudyID:string
	SeriesNumber:string
	AccessionNumberSH:string
	InstanceNumber:string
	PatientOrientation:string
	patientImagePosition:string
	patientImageOrientation :string
	FrameReferenceUID:string
	SampleperPixel:string
	PhotometricInteroretation:string
	Rows:string
	Columns:string
	PixelSpacing:string
	BitsAllocated:string
	BitsStored:string
	HighBit:string
	PixelRepresentation:string
	RescaleIntercept:string
	ReScaleSlope:string
	ReScaleType:string
	fileName:string
}

export const tableData = [
  "imageType",
  "sopuid",
  "sopinstanceUID",
  "studyDate",
  "seriesDate",
  "acquistionDate",
  "contentDate",
  "studyTime",
  "seriesTime",
  "acquistionTime",
  "contentTime",
  "accessionNumberIS",
  "modality",
  "manufacturer",
  "institutionTime",
  "referringPhysicianName",
  "studyDescription",
  "seriesDescription",
  "manufacturerModelName",
  "patientName",
  "patientOrientationCS",
  "patientBirthDate",
  "patientSex",
  "otherPatientIDs",
  "patientAge",
  "patientWeight",
  "pregnancyStatus",
  "sliceThickness",
  "spacingbetweenSlices",
  "softwareVersion",
  "protocolName",
  "studyInstanceUID",
  "seriesInstanceUID",
  "studyID",
  "seriesNumber",
  "accessionNumberSH",
  "instanceNumber",
  "patientOrientation",
  "patientImagePosition",
  "patientImageOrientation",
  "frameReferenceUID",
  "sampleperPixel",
  "photometricInteroretation",
  "rows",
  "columns",
  "pixelSpacing",
  "bitsAllocated",
  "bitsStored",
  "highBit",
  "pixelRepresentation",
  "rescaleIntercept",
  "reScaleSlope",
  "reScaleType",
  "fileName"
];

@Component({
  selector: 'app-view-all-dicom',
  templateUrl: './view-all-dicom.component.html',
  styleUrls: ['./view-all-dicom.component.css']
})
export class ViewAllDicomComponent implements OnInit {
  
  tableheader = tableData;
  tableDate$ : Array<dicomMetaData>;
  constructor(private Api: ApiService, private http: HttpClient) { }
  server = this.Api.serverUrl;

  ngOnInit() {
 alert()
    this.Api.getRequest("viewAll").subscribe((dicomMetaData: HttpResponse<any>) => {
      this.tableDate$ = dicomMetaData.body;
      this.tableDate$.forEach((element : dicomMetaData) => {         
           Object.entries(tableData).map(res=>{
            console.log( element[res[1]]);
             if(element[res[1]] == null || element[res[1]] == undefined || element[res[1]] == ""){
              element[res[1]] = "No data Found";
             } 
          });
      });
    });
  }
}
