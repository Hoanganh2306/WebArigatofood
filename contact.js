document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const contentInput = document.getElementById("content");
    const sendButton = document.getElementById("send");
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form (tránh refresh trang)

        const data = {
            name: nameInput.value,
            email: emailInput.value,
            content: contentInput.value,
        };

        await postGoogle(data);
    });

    async function postGoogle(data) {
        const formURL = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSf5RZgRwOXyFppufvoPmM_eXBs3d-hsdvsIxGbbkXARUiHt2g/formResponse?pli=1";
        const formData = new FormData();
        formData.append("entry.2097515203", data.name);
        formData.append("entry.1521955776", data.email);
        formData.append("entry.401693819", data.content);
    
        const response = await fetch(formURL, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to submit form data');
        }
    }

    sendButton.addEventListener("click", (e) => {
        e.preventDefault();

        const data = {
            name: nameInput.value,
            email: emailInput.value,
            content: contentInput.value,
        };

        postGoogle(data)
            .then(() => {
                // Hiển thị thông báo thành công
                alert("Đã gửi thành công, cảm ơn bạn đã đóng góp ý kiến!");

                // Làm mới trang sau khi gửi thành công
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
