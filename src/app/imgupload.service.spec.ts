import { TestBed } from '@angular/core/testing';
import { ImguploadService } from './imgupload.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ImguploadService', () => {
  let service: ImguploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImguploadService]
    });

    service = TestBed.inject(ImguploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post data and return expected result', () => {
    const mockResponse = { data: 'some data' };
    const fd = new FormData();
    fd.append('key', 'value');

    service.imgupload(fd).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/uploads');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();  // Ensure that no unmatched requests are outstanding
  });
});