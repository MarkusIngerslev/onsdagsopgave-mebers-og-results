export const ResultRenderer = {
    render(result) {
        let name = "";
        if (result.member !== undefined) {
            name = result.member.name;
        } else {
            name = "-ukendt medlem-";
        }

        let træningEllerStævne = "";
        if (result.isTraining) {
            træningEllerStævne = "træning";
        } else {
            træningEllerStævne = "stævne";
        }

        const html = /*html*/ `
    <tr>
      <td>${result.date.toLocaleString("da", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
      })}</td>
      <td>${name}</td>
      <td>${disciplines[result.discipline]}</td>
      <td>${træningEllerStævne}</td>
      <td>${result.getTimeString()}</td>
    </tr>`;
        return html;
    },
};

const disciplines = {
    breaststroke: "bryst",
    butterfly: "butterfly",
    backstroke: "ryg",
    freestyle: "freestyle",
};
