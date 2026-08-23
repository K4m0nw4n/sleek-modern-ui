jQuery(() => {
    console.log('Sleek & Modern UI Extension Loaded!');

    // 1. ใส่ Class บันทึกไว้ที่ Body เพื่อระบุว่าใช้ UI ตัวใหม่
    $('body').addClass('sleek-ui-active');

    // 2. เพิ่มปุ่ม Zen Mode บน Right Nav Panel (สำหรับเปิด-ปิด Top Bar)
    if (!$('#zen-mode-toggle').length) {
        const zenBtn = `
            <div id="zen-mode-toggle" class="drawer-icon" title="Toggle Zen Mode (Hide Topbar)">
                <i class="fa-solid fa-expand"></i>
            </div>
        `;
        $('#right-nav-panel').prepend(zenBtn);

        $('#zen-mode-toggle').on('click', () => {
            $('#top-bar').slideToggle(200);
        });
    }

    // 3. สร้าง Quick Insert Toolbar เหนือช่องพิมพ์ข้อความ
    const $sendForm = $('#send_form');
    if ($sendForm.length && !$('#quick_insert_toolbar').length) {
        const $toolbar = $(`
            <div id="quick_insert_toolbar">
                <button class="quick_insert_btn" data-prefix='"' data-suffix='"'>"..."</button>
                <button class="quick_insert_btn" data-prefix='*' data-suffix='*'>*...</button>
                <button class="quick_insert_btn" data-prefix='(' data-suffix=')'> (...)</button>
            </div>
        `);

        $sendForm.prepend($toolbar);

        // ฟังก์ชันแทรกข้อความและจัดตำแหน่งเคอร์เซอร์ให้อยู่ตรงกลาง
        $toolbar.on('click', '.quick_insert_btn', function (e) {
            e.preventDefault();
            const prefix = $(this).data('prefix');
            const suffix = $(this).data('suffix');
            const textarea = document.getElementById('send_textarea');

            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            const selectedText = text.substring(start, end);

            // แทรกสัญลักษณ์ครอบข้อความที่เลือก หรือแทรกตรงตำแหน่งเคอร์เซอร์
            const replacement = prefix + selectedText + suffix;
            textarea.value = text.substring(0, start) + replacement + text.substring(end);

            // โฟกัสกลับมาที่ช่องพิมพ์ และย้ายเคอร์เซอร์ไปตรงกลางระหว่างเครื่องหมาย
            textarea.focus();
            const newCursorPos = start + prefix.length + selectedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);

            // แจ้ง Event ให้ระบบ SillyTavern รับรู้ว่ามีการเปลี่ยนแปลงข้อมูลในช่องพิมพ์
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        });
    }
});
