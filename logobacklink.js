(function () {
    const attachedLogos = new WeakSet();

    const handleLogo = (logo) => {
        if (!attachedLogos.has(logo)) {
            attachedLogos.add(logo);

            setTimeout(() => {
                logo.addEventListener('click', () => {
                    const parentLink = document.querySelector('.parentName > bdi:nth-child(1) > a:nth-child(1)');
                    if (parentLink) {
                        const parentId = parentLink.dataset.id;
                        const serverId = parentLink.dataset.serverid;

                        if (parentId && serverId) {
                            const newUrl = `/web/index.html#/details?id=${parentId}&serverId=${serverId}`;
                            window.location.href = newUrl;
                        }
                    }
                });
            }, 1000);
        }
    };

    const observer2 = new MutationObserver(() => {
        document.querySelectorAll('.detailLogo').forEach(handleLogo);
    });

    observer2.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial check in case the element is already present
    document.querySelectorAll('.detailLogo').forEach(handleLogo);
})();
