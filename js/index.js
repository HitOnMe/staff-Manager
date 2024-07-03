function addStaff(index1){
    return document.querySelectorAll('input')[index1].value
}
function totalSalary(){
    var duty = document.querySelector('#chucvu').value,
        basicSalary = Number(document.querySelectorAll('input')[6].value);
    switch(duty){
        case 'Nhân viên': return basicSalary*1;
        case 'Trưởng phòng': return basicSalary*2;
        case 'Sếp' : return basicSalary*3;
    }
}
function workTime(){
    var hour =  document.querySelectorAll('input')[7].value;
    if (hour>=192) return 'nhân viên xuất sắc';
    else if (hour>=176) return 'nhân viên giỏi';
    else if (hour>=160) return 'nhân viên khá';
    else return 'nhân viên trung bình';
}

var staffCollect =[],
    table = document.querySelector('#tableDanhSach')
document.querySelector('#btnCapNhat').onclick = function(){
    var staffObject = {'tài khoản': addStaff(1, 0),
                        'Họ và tên': addStaff(2, 1),
                        'Email': addStaff(3,2),
                        'Ngày làm': addStaff(5,3),
                        'Chức vụ': document.querySelector('#chucvu').value,
                        'Tổng lương': totalSalary(),
                        'Xếp loại': workTime()},
        table = document.querySelector('#tableDanhSach'),
        mytr = document.createElement('tr');
        for(var key in staffObject){
            mytd = document.createElement('td');
            mytd.textContent=staffObject[key];
            mytr.appendChild(mytd)
        }
    table.appendChild(mytr);
    staffCollect.push(staffObject);
}
document.querySelector('#btnTimNV').onclick = function() {
    var nameSearch = document.querySelector('#searchName').value,
        rows=document.querySelectorAll('#tableDanhSach tr');
    // Hiển thị các hàng tương ứng với kết quả tìm kiếm
    staffCollect.forEach((staff, index) => {
        var row = rows[index]
       row.style.display = (staff['Xếp loại'] !== nameSearch) ? 'none' : '';
    });
}
