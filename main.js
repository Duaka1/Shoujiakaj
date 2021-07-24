
//Tạo đối tượng dssv từ lớp đối tượng DanhSachSinhVien
var dssv = new DanhSachSinhVien();
/* var list =[]; */
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

//Lấy data từ localStorage ra ngoài table
getLocalStorage();  

function layDuLieuDauVao(isAdd){
    var _maSV = getEle("txtMaSV").value;
    var _tenSV = getEle("txtTenSV").value;
    var _email = getEle("txtEmail").value;
    var _matKhau = getEle("txtPass").value;
    var _ngaySinh = getEle("txtNgaySinh").value;
    var _khoaHoc = getEle("khSV").value;
    var _diemToan = getEle("txtDiemToan").value;
    var _diemLy = getEle("txtDiemLy").value;
    var _diemHoa = getEle("txtDiemHoa").value;

     //isValid là true => cho phép thêm sinh viên vào mảng
     var isValid = true;
     /*     Validation (Kiểm tra tính hợp lệ của dữ liệu đầu vào)
      */
     //Kiểm tra validation cho input maSV

     if(isAdd){
        isValid &= validation.kiemTraRong(_maSV, "divMaErr", "(*) Mã SV không được rỗng")
      && validation.kiemTraDoDaiKyTu(_maSV, "divMaErr", "(*) Độ dài ký tự từ 4 - 10",4,10)
      && validation.kiemTraMaSVTrung(_maSV, "divMaErr", "(*) Mã SV đã tồn tại", dssv.list);
     }
     
 
     isValid &= validation.kiemTraRong(_tenSV, "divTenErr", "(*) Tên SV không được rỗng") 
      && validation.kiemTraKyTuChuoi(_tenSV, "divTenErr","(*) Tên SV phải là chữ");
      
     isValid &= validation.kiemTraRong(_email, "divEmailErr", "(*) Email không  được rỗng")
      && validation.kiemTraEmail(_email, "divEmailErr","(*) Email không đúng định dạng");
 
     isValid &= validation.kiemTraRong(_matKhau, "divMatKhauErr", "(*) Mật khẩu không được rỗng")
      && validation.kiemTraMatKhau(_matKhau, "divMatKhauErr","(*) Mật khẩu không đúng định dạng");
 
     isValid &= validation.kiemTraRong(_ngaySinh, "divNgaySinhErr", "(*) Ngày Sinh không được rỗng")
     && validation.kiemTraNgaySinh(_ngaySinh, "divNgaySinhErr","(*) Ngày Sinh không đúng định dạng");
 
     isValid &= validation.kiemTraKhoaHoc("khSV", "divKHErr", "(*) Vui lòng chọn khóa học!");    
 
     isValid &= validation.kiemTraRong(_diemToan, "divToanErr", "(*) Điểm toán không được rỗng")
     && validation.kiemTraSo(_diemToan, "divToanErr", "(*) Điểm phải là một số");
 
     isValid &= validation.kiemTraRong(_diemLy, "divLyErr", "(*) Điểm lý không được rỗng")
     && validation.kiemTraSo(_diemToan, "divLyErr", "(*) Điểm phải là một số");
 
     isValid &= validation.kiemTraRong(_diemHoa, "divHoaErr", "(*) Điểm hóa không được rỗng")
     && validation.kiemTraSo(_diemToan, "divHoaErr", "(*) Điểm phải là một số");
 
 
 
 //Tạo đối tượng sinhVien từ lớp đối tượng SinhVien
     //Từ khóa new: tạo đối tượng từ lớp đối tượng
     if(isValid){
        var sinhVien = new SinhVien(
            _maSV,
            _tenSV,
            _email,
            _matKhau,
            _ngaySinh,
            _khoaHoc,
            _diemToan,
            _diemLy,
            _diemHoa
        );
        return sinhVien;
     }    
     return null;
}

/**
 * Thêm sinh viên
 */
// getEle("btnAdd").onclick = function () {
//     console.log(123);
// };

//callback function: tham số của 1 hàm, là 1 hàm khác
getEle("btnAdd").addEventListener("click", function(event) {
    event.preventDefault();
    var sinhVien = layDuLieuDauVao(true);
    
    //Kiểm tra ==> nếu nhưu thông tin hợp lệ => Add SV
    if (sinhVien) {       
        sinhVien.tinhDTB(); 
        dssv.themSinhVien(sinhVien);
        taoBang(dssv.list);
        //Lưu mảng list xuống localStorage
        setLocalStorage();
       
    }
});


  function taoBang(arr) {
    //reset tbody
    getEle("tbodySinhVien").innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        //Tạo dòng (tr)
        var tagTR = document.createElement("tr");

        //Tạo cột (td) - 6 cột
        var tagTD_MaSV = document.createElement("td");
        var tagTD_TenSV = document.createElement("td");
        var tagTD_Email = document.createElement("td");
        var tagTD_NgaySinh = document.createElement("td");
        var tagTD_KhoaHoc = document.createElement("td");
        var tagTD_DTB = document.createElement("td");
        var tagTD_Button_Edit = document.createElement("td")
        var tagTD_Button_Delete = document.createElement("td");
        

        //Tạo nội dung cho 6 cột
        tagTD_MaSV.innerHTML = arr[i].maSV;
        tagTD_TenSV.innerHTML = arr[i].tenSV;
        tagTD_Email.innerHTML = arr[i].email;
        tagTD_NgaySinh.innerHTML = arr[i].ngaySinh;
        tagTD_KhoaHoc.innerHTML = arr[i].khoaHoc;
        // //Thực thi phương thức tinhDTB()
        // /*  arr[i].tinhDTB(); */
        tagTD_DTB.innerHTML = arr[i].diemTB;
        tagTD_Button_Edit.innerHTML =  '<button onclick="suaSinhVien(\'' + arr[i].maSV  + '\')" class = "btn btn-info">Sửa</button>';
        tagTD_Button_Delete.innerHTML = '<button onclick="xoaSinhVien(\'' + arr[i].maSV  + '\')" class = "btn btn-danger">Xóa</button>';

        //appenchild 6 cột vào dòng
        tagTR.appendChild(tagTD_MaSV);
        tagTR.appendChild(tagTD_TenSV);
        tagTR.appendChild(tagTD_Email);
        tagTR.appendChild(tagTD_NgaySinh);
        tagTR.appendChild(tagTD_KhoaHoc);
        tagTR.appendChild(tagTD_DTB);
        tagTR.appendChild(tagTD_Button_Edit);
        tagTR.appendChild(tagTD_Button_Delete);

        //appenchild dong vao tbody
        getEle("tbodySinhVien").appendChild(tagTR);
    }   
}

//Xóa SV
function xoaSinhVien(maSV){
    dssv._xoaSinhVien(maSV); 
    taoBang(dssv.list);
    setLocalStorage();
}
 
//Sửa SV
function suaSinhVien(maSV){
    var sinhVien = dssv.layThongTinSinhVien(maSV);

    //Mở lại button btnUpdate
    getEle("btnUpdate").style.display = "inline-block";

    //Dom tới các thẻ input show ra value

    getEle("txtMaSV").value = sinhVien.maSV;
    getEle("txtMaSV").disabled = true; 
    getEle("txtTenSV").value = sinhVien.tenSV;
    getEle("txtEmail").value = sinhVien.email;
    getEle("txtPass").value = sinhVien.matKhau;
    getEle("txtNgaySinh").value = sinhVien.ngaySinh;
    getEle("khSV").value = sinhVien.khoaHoc;
    getEle("txtDiemToan").value = sinhVien.diemToan;
    getEle("txtDiemLy").value = sinhVien.diemLy;
    getEle("txtDiemHoa").value = sinhVien.diemHoa;  
}
    
    //Cập nhật sinh viên
    getEle("btnUpdate").addEventListener("click", function(){
        //Lấy thông tin mới nhất từ các thẻ input        
        var sinhVien = layDuLieuDauVao(false);
        sinhVien.tinhDTB(); 
        dssv.capNhatSinhVien(sinhVien);
        taoBang(dssv.list);
        setLocalStorage(); 
    });  

//Reset Form

getEle("btnReset").addEventListener("click", function(){
    //Dom tới các thẻ input gán value lại rỗng hết
    getEle("formSV").reset();
    getEle("btnUpdate").style.display = "none";
    getEle("txtMaSV").disabled = false;  

});

//Tìm kiếm sinh viên
getEle("txtSearch").addEventListener("keyup", function(){
    var keyWord = getEle("txtSearch").value;
    var mangTimKiem = dssv.timKiemSinhVien(keyWord);
    taoBang(mangTimKiem);
    
})

//Lưu vào setLocalStorage
function setLocalStorage(){
    // Chuyển kiểu JSON sang kiểu String
    var arrString = JSON.stringify(dssv.list);
    localStorage.setItem("DSSV", arrString);
};

function getLocalStorage(){
    // Chuyển kiểu string sang kiểu JSON
    if (localStorage.getItem("DSSV")){
        dssv.list = JSON.parse(localStorage.getItem("DSSV"));
        taoBang(dssv.list);
    }   
    
};


