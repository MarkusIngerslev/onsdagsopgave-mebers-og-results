export function construct(list, container, itemRenderer) {
    const listRenderer = {
        container: document.querySelector(container),

        render() {
            this.container.innerHTML = "";
            for (const member of list) {
                let aktivStatus = "";
                if (member.active) {
                    aktivStatus = "aktiv";
                } else {
                    aktivStatus = "ikke aktiv";
                }

                let juniorEllerSenior = "";
                if (member.isJunior) {
                    juniorEllerSenior = "Junior";
                } else {
                    juniorEllerSenior = "Senior";
                }

                const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${aktivStatus}</td>
        <td>${member.birthday.toLocaleString("da", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })}</td>
        <td>${member.age}</td>
        <td>${juniorEllerSenior}</td>
      </tr>`;
                this.container.insertAdjacentHTML("beforeend", html);
            }
        },
    };

    return listRenderer;
}
