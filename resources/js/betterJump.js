/** @format */
document.addEventListener("click", event => {
    const target = event.target;
    const aEl = target.closest("a");
    if (aEl) {
        event.preventDefault();
        NProgress.start();
        NProgress.set(0);
        const currentURL = window.location.href;
        const targetURL = aEl.href;
        if (currentURL === targetURL) {
            NProgress.done();
            return;
        }
        const splitedURL = targetURL.split("/");
        const fileName = splitedURL[splitedURL.length - 1];
        console.debug(fileName);
        fetch(`/api/content/${fileName}`)
            .then(res => res.json())
            .then(data => {
                const content = data.content;
                document.querySelector("#content div div").innerHTML = content;

                // 创建一个新的 URL，替换当前的 URL 但不刷新页面
                window.history.replaceState(
                    {},
                    "",
                    `${fileName}`
                );
                NProgress.done();
            });
    }
});
