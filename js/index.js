function addStaff(index1, index2){
        document.querySelectorAll('#tableDanhSach tr td')[index2].innerHTML = document.querySelectorAll('input')[index1].value
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
document.querySelector('#btnCapNhat').onclick = function(){
    addStaff(1, 0)
    addStaff(2, 1)
    addStaff(3, 2)
    addStaff(5, 3)
    document.querySelectorAll('#tableDanhSach tr td')[4].innerHTML = document.querySelector('#chucvu').value
    document.querySelectorAll('#tableDanhSach tr td')[5].innerHTML =totalSalary();
    document.querySelectorAll('#tableDanhSach tr td')[6].innerHTML = workTime()
}