

// Kiểm tra dữ liệu người dùng nhập vào
function isValidInput(number, number1, number2){
    return number< number1 || number > number2 ? false : true
}
function isValidAccount(string){
    var valid = string.match(/\d/g), // trả về mảng các chữ số trong chuỗi
    numberString = valid == null ? 0 : valid.length //trả về độ dài các chữ số trong chuỗi, trả về 0 nếu rỗng
    return isValidInput(numberString, 0, 6) && isValidInput(string.length, 1, 15) // tên tài khoản chỉ chứa 1-15 ký tự, và tối đa 6 ký tự số
}
function isValidName(name){
    var valid = /^[A-Za-zÀ-ỹ\s]+$/;
    return valid.test(name)
} 
function isValidEmail(email) {
    // Biểu thức chính quy phức tạp để kiểm tra định dạng email
    var valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return valid.test(email);
}
function isValidPassword(password) {
    // Kiểm tra ít nhất một ký tự số
    var hasNumber = /[0-9]/.test(password);
    // Kiểm tra ít nhất một ký tự in hoa
    var hasUpperCase = /[A-Z]/.test(password);
    // Kiểm tra ít nhất một ký tự đặc biệt
    var hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasNumber && hasUpperCase && hasSpecialCharacter && isValidInput(password.length, 6, 10);
}
function isValidDate(dateString) {
    // Kiểm tra định dạng dd/mm/yyyy
    var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regex.test(dateString)) {
        return false;
    }

    // Tách ngày, tháng, năm từ chuỗi
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Kiểm tra tính hợp lệ của ngày
    var date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}
function validateInput(index, input, checkValue, checkObject) {
    switch (index) {
        case 0:
            checkValue.textContent = isValidAccount(input.value) ? '' : checkObject.checkAccount;
            break;
        case 1:
            checkValue.textContent = isValidName(input.value) ? '' : checkObject.checkName;
            break;
        case 2:
            checkValue.textContent = isValidEmail(input.value) ? '' : checkObject.checkEmail;
            break;
        case 3:
            checkValue.textContent = isValidPassword(input.value) ? '' : checkObject.checkPass;
            break;
        case 4:
            checkValue.textContent = isValidDate(input.value) ? '' : checkObject.checkDay;
            break;
        case 5:
            checkValue.textContent = isValidInput(Number(input.value), 1000000, 20000000) ? '' : checkObject.checkBasicsalary;
            break;
        case 6:
            checkValue.textContent = input.value !== 'Chọn chức vụ' ? '' : checkObject.checkDuty;
            break;
        case 7:
            checkValue.textContent = isValidInput(Number(input.value), 8, 200) ? '' : checkObject.checkHourwork;
            break;
    }
}
function checkInput(id1, id2){
    //Lấy giá trị người dùng nhập vào ô input
    var userInput = document.querySelectorAll(id1),//ô input người dùng nhập vào
        checkInput = document.querySelectorAll(id2),// ô hiển thị cảnh báo khi người dùng nhập không đúng yêu cầu
        checkValid = false,
        checkObject = {
        checkAccount: 'Tên tài khoản từ 1-15 ký tự, chỉ chứa tối đa 4-6 ký tự số',
        checkName: 'Chỉ chứa các ký tự chữ',
        checkEmail: 'Phải đúng định dạng, không được để trống',
        checkPass: 'Mật khẩu từ 6-10 ký tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt',
        checkDay: 'Hãy chọn ngày bắt đầu làm việc',
        checkBasicsalary: 'Lương cơ bản từ 1 000 000 - 20 000 000 đồng',
        checkDuty: 'Chọn chức vụ của bạn',
        checkHourwork: 'Số giờ làm của bạn trong tháng (8-200 giờ)'
    };
    //kiểm tra ô input có nhập đúng yêu cầu không
    userInput.forEach((input, index) => {
        var checkValue = checkInput[index];
        validateInput(index, input, checkValue, checkObject);
        input.addEventListener('input', function () {
            validateInput(index, input, checkValue, checkObject);
        });
        staffCollect.forEach(staff =>{
            if (staff['tài khoản'] == userInput[0].value){
                checkInput[0].innerHTML = 'Tài khoản đã có người sủ dụng'
            }
            if (staff['Email'] == userInput[2].value){
                checkInput[2].innerHTML = 'Email đã có người sử dụng'
            }
        })
        checkValid = Array.from(checkInput).filter(checkValue => checkValue.innerHTML !== '').length == 0 ? true : false
    })
    return checkValid
}
/* Hàm chức năng */
function addStaff(index){
    return document.querySelectorAll('input')[index]
}
function totalSalary(){
    var duty = document.querySelector('#chucvu').value,
        basicSalary = Number(document.querySelectorAll('input')[7].value);
    switch(duty){
        case 'Nhân viên': return basicSalary*1;
        case 'Trưởng phòng': return basicSalary*2;
        case 'Sếp' : return basicSalary*3;
    }
}
function workTime(){
    var hour =  document.querySelectorAll('input')[8].value;
    if (hour>=192) return 'Nhân viên xuất sắc';
    else if (hour>=176) return 'Nhân viên giỏi';
    else if (hour>=160) return 'Nhân viên khá';
    else return 'Nhân viên trung bình';
}
//Hàm trả về vị trí các object thỏa mãn điều kiện lọc
function filterStaff(objects, targetObject) {//objects: mảng các đối tượng, targetObjects: đối tượng các điều kiện lọc
    var indexCollect = [],
        staffs = objects.filter((object) => {return (!targetObject['tài khoản']) &&
            (targetObject['Họ và tên'] === '' || object['Họ và tên'].includes(targetObject['Họ và tên'])) &&
               (targetObject['Email'] === '' || object['Email'].includes(targetObject['Email'])) &&
               (!targetObject['Ngày làm'])&&
               (targetObject['Chức vụ'] === '--Chức vụ--' || object['Chức vụ'] === targetObject['Chức vụ']) &&
               (!targetObject['Tổng lương'])&&
               (targetObject['Xếp loại'] === '--Xếp loại--' || object['Xếp loại'] === targetObject['Xếp loại']);
    });
    staffs.forEach(staff =>{
        indexCollect.push(objects.indexOf(staff))
    }); return indexCollect
}
var staffCollect =[],
    findObject ={},
    table = document.querySelector('#tableDanhSach'),
    rows=[],
    staffObject={}
document.querySelector('#btnThemNV').onclick = function(){
    document.querySelectorAll('.sp-thongbao').forEach(comment => {
        comment.style.display = 'block'
    })
    if(checkInput('.input-sm', '.sp-thongbao')){
            staffObject = {'tài khoản': addStaff(2).value,
            'Họ và tên': addStaff(3).value,
            'Email': addStaff(4).value,
            'Ngày làm': addStaff(6).value,
            'Chức vụ': document.querySelector('#chucvu').value,
            'Tổng lương': totalSalary(),
            'Xếp loại': workTime(),},
        mytr = document.createElement('tr');
        for(var key in staffObject){
            mytd = document.createElement('td');
            mytd.textContent=staffObject[key];
            mytr.appendChild(mytd)
            }
            table.appendChild(mytr);
            staffCollect.push(staffObject);
    } 
}
document.querySelector('.myTable thead th:last-child').onclick=function(){
    document.querySelector('.control__staff').classList.toggle('unlock')
}
//Tìm kiểm nhân viên theo xếp loại
document.querySelector('#btnTimNV').onclick = function() {
        findObject = {
                    'Họ và tên': document.querySelectorAll('input')[0].value,
                    'Email': document.querySelectorAll('input')[1].value,
                    'Chức vụ': document.querySelectorAll('select')[0].value,
                    'Xếp loại': document.querySelectorAll('select')[1].value
        },  
        filterIndex = filterStaff(staffCollect, findObject);
        rows=document.querySelectorAll('#tableDanhSach tr');
        rows.forEach((row, index) =>{
            row.style.display = filterIndex.includes(index) ? '' : 'none'
        })
       
}




