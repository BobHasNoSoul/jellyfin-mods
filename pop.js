document.addEventListener('DOMContentLoaded', async function() {
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '15px';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'flex-end';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .notification {
        background: #111;
        color: #ddd;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 18px;
        max-width: 350px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        word-break: break-word;
        font-family: Arial, sans-serif;
        position: relative;
        animation: fadeIn 0.5s ease forwards;
        opacity: 0;
        pointer-events: auto;
    }
    .notification .close-btn {
        position: absolute;
        top: -7px;
        right: 1px;
        cursor: pointer;
        font-size: 30px;
        color: #bbb;
    }
    `;
    document.head.appendChild(style);

    function createNotification(message, id) {
        const notif = document.createElement('div');
        notif.className = 'notification';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';

        closeBtn.onclick = () => {
            notif.remove();
            localStorage.setItem('notification_read_' + id, 'true');
        };

        notif.appendChild(closeBtn);

        const msg = document.createElement('div');
        msg.textContent = message;
        notif.appendChild(msg);

        container.appendChild(notif);

        // Auto-hide after 50 seconds
        setTimeout(() => {
            if (notif.parentNode) {
                notif.remove();
                localStorage.setItem('notification_read_' + id, 'true');
            }
        }, 50000);
    }

    try {
        const response = await fetch('/web/notification.txt', { cache: 'no-store' });
        if (!response.ok) return;

        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        lines.forEach((line, index) => {
            const parts = line.split('|');
            if (parts.length < 2) return;
            const id = parts[0].trim();
            const message = parts.slice(1).join('|').trim();

            if (!localStorage.getItem('notification_read_' + id)) {
                setTimeout(() => createNotification(message, id), index * 300);
            }
        });
    } catch (err) {
        console.error('Notification fetch failed:', err);
    }
});
