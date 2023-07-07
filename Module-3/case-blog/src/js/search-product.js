// Lấy tham chiếu đến phần tử input tìm kiếm
const searchInput = document.getElementById('search-card');
console.log(searchInput);

// Gắn sự kiện lắng nghe khi người dùng xóa nội dung
searchInput.addEventListener('input', function(event) {
    // Kiểm tra nếu nội dung đã được xóa hết
    console.log(event.target.value);
    if (event.target.value === '') {
        // Kiểm tra xem người dùng đã nhấn phím X để xóa
        if (event.inputType === 'deleteContentBackward') {
            // Kiểm tra xem người dùng đã nhấn Enter trước đó hay chưa
            const enterKeyPressed = event.keyCode === 13 || event.which === 13;
            if (!enterKeyPressed) {
                // Simulate pressing the Enter key
                const enterKeyEvent = new KeyboardEvent('keypress', { keyCode: 13, which: 13 });
                searchInput.dispatchEvent(enterKeyEvent);
            }
        }
    }
});

// Gửi yêu cầu tìm kiếm khi nhấn Enter
searchInput.addEventListener('keypress', function(event) {
    const enterKeyPressed = event.keyCode === 13 || event.which === 13;
    if (enterKeyPressed) {
        // Thực hiện xử lý tìm kiếm ở đây
        const keyword = searchInput.value;
        console.log('Searching for:', keyword);
        // Gửi yêu cầu tìm kiếm đến server hoặc thực hiện hành động mong muốn
    }
});