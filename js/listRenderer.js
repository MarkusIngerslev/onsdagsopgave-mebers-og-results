export function construct(list, container, itemRenderer) {
    const listRenderer = {
        container: document.querySelector(container),
        itemRenderer: itemRenderer,
        render() {
            this.container.innerHTML = "";
            for (const item of list) {
                const html = this.itemRenderer.render(item);
                this.container.insertAdjacentHTML("beforeend", html);
            }
        },
    };

    return listRenderer;
}
