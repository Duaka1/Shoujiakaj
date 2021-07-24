function DanhSachSinhVien() {
    this.list = [];

    this.themSinhVien = function (sv) {
        this.list.push(sv);
    };

    this._timViTri = function(maSV){
        var index = -1;
        for(var i = 0; i < this.list.length; i++){
            if(this.list[i].maSV == maSV){
                index = i;
                break;
            }
        }
        return index;
    };

    this._xoaSinhVien = function (maSV){     
        //Xoas SV
       var index = this._timViTri(maSV);
        if(index !== -1){
            this.list.splice(index, 1);
        }       
    };

    this.layThongTinSinhVien = function (maSV){ 
        //Lấy Vị trị
        var index = this._timViTri(maSV);
        if(index !== -1){
            return this.list[index];
        }
    };

    this.capNhatSinhVien = function (sinhVien){
        //Lấy vị trị
        var index = this._timViTri(sinhVien.maSV);

        if(index !== -1){
            this.list[index] = sinhVien;  
        }
    };

    // this.timKiemSinhVien = function(keywords){

    // }
}

DanhSachSinhVien.prototype.timKiemSinhVien = function(keyword){
    var mangTimKiem = [];
    for(var i=0; i<this.list.length; i++){
        if(this.list[i].tenSV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){                                                                                                                                                                                                                                                                                                             
            mangTimKiem.push(this.list[i]);
        }
    }
    return mangTimKiem;
};
