import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";

window.addEventListener("load", initApp);

let members = [];
let results = [];

async function initApp() {
    initTabs();

    // load data-objects
    await buildMemberList();
    await buildResultList();

    // display lists
    displayMemberList(members);
    displayResultList(results);
}

export function getMember(memberId) {
    return members.find((member) => member.id === memberId);
}

function displayMemberList(members) {
    const table = document.querySelector("table#members tbody");
    table.innerHTML = "";
    for (const member of members) {
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
        table.insertAdjacentHTML("beforeend", html);
    }
}

function displayResultList(results) {
    const table = document.querySelector("table#results tbody");
    table.innerHTML = "";

    const disciplines = {
        breaststroke: "bryst",
        butterfly: "butterfly",
        backstroke: "ryg",
        freestyle: "freestyle",
    };

    for (const result of results) {
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
        table.insertAdjacentHTML("beforeend", html);
    }
}

async function buildMemberList() {
    const originalData = await fetchMembers();
    members = originalData.map(member.construct);
}

async function buildResultList() {
    const originalData = await fetchResults();
    results = originalData.map(result.construct);
}

async function fetchMembers() {
    return await fetch("../data/members.json").then((resp) => resp.json());
}

async function fetchResults() {
    return await fetch("../data/results.json").then((resp) => resp.json());
}
