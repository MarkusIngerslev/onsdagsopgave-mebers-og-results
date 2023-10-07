import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";
import * as ListRenderer from "./listRenderer.js";
import { MemberRenderer } from "./memberRenderer.js";
import { ResultRenderer } from "./resultRender.js";

window.addEventListener("load", initApp);

let members = [];
let results = [];

async function initApp() {
    initTabs();

    // load data-objects
    await buildMemberList();
    await buildResultList();

    // display lists
    const memberList = ListRenderer.construct(members, "table#members tbody", MemberRenderer);
    memberList.render();

    const resultList = ListRenderer.construct(results, "table#results tbody", ResultRenderer);
    resultList.render();
}

export function getMember(memberId) {
    return members.find((member) => member.id === memberId);
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
