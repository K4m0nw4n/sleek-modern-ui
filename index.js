jQuery(() => {
    console.log('Sleek & Modern UI Extension Loaded!');

    // ใส่ Class บันทึกไว้ที่ Body เพื่อระบุว่าใช้ UI ตัวใหม่
    $('body').addClass('sleek-ui-active');

    // ตัวอย่าง: เพิ่มปุ่ม Toggle เพื่อพับเก็บ Top Bar เวลาต้องการอ่านแชทแบบเต็มจอ (Zen Mode)
    const zenBtn = `
        <div id="zen-mode-toggle" class="drawer-icon" title="Toggle Zen Mode (Hide Topbar)">
            <i class="fa-solid fa-expand"></i>
        </div>
    `;
    
    $('#right-nav-panel').prepend(zenBtn);

    $('#zen-mode-toggle').on('click', () => {
        $('#top-bar').slideToggle(200);
    });
});