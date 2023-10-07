export function construct(list, container, itemRenderer) {
    const listRenderer = {
        container: document.querySelector(container),
        itemRenderer: itemRenderer,
        render() {
            this.container.innerHTML = "";
            for (const member of list) {
                const html = this.itemRenderer.render(member);
                this.container.insertAdjacentHTML("beforeend", html);
            }
        },
    };

    return listRenderer;
}
