// ===== ##### Imports ##### ===== //
import { initTabs } from "./tabs.js";
import * as result from "./result.js";
import * as member from "./member.js";

// ===== ##### Global Varibles ##### ===== //
const resultEndpoint = "../data/results.json";
const memberEndpoint = "../data/members.json";

const fixedResults = [];
const fixedMembers = [];

// ===== ##### Start Program ##### ===== //d
window.addEventListener("load", initApp);

async function initApp() {
    initTabs();

    // byg arrays
    await buildResultsList();
    await buildMembersList();

    // vis data på siden
    displayResults(fixedResults);
    displayMembers(fixedMembers);
}

// ===== ##### Fetch data from json ##### ===== //
// fetch results
async function fetchResults() {
    const res = await fetch(`${resultEndpoint}`);
    const data = await res.json();
    return data;
}

// fetch members
async function fetchMembers() {
    const res = await fetch(`${memberEndpoint}`);
    const data = await res.json();
    return data;
}

// ===== ##### Build local array ##### ===== //
// lav array over results
async function buildResultsList() {
    const originalResults = await fetchResults();
    // console.log(originalResults);

    for (const jsonObj of originalResults) {
        const realObject = result.construct(jsonObj);
        realObject.timeMiliSec = realObject.getTime();
        // console.log(realObject);
        fixedResults.push(realObject);
    }
}

async function buildMembersList() {
    const originalMembers = await fetchMembers();
    // console.log(originalMembers);

    for (const jsonObj of originalMembers) {
        const realObject = member.construct(jsonObj);
        realObject.age = realObject.getAge();
        realObject.ageGroup = realObject.getJuniorSeniorStatus();
        // console.log(realObject);
        fixedMembers.push(realObject);
    }
}

// ===== ##### Show table data on site##### ===== //
// hvis results på hjemmesiden
function displayResults(results) {
    const table = document.querySelector("table#results tbody");
    table.innerHTML = "";

    // sorter tider efter hurtigts
    results.sort((a, b) => a.timeMiliSec - b.timeMiliSec);

    //byg forskellige resultater fra array
    for (const result of results) {
        // byg selve tabel
        const html = /*html*/ `
        <tr>
            <td>${formatDate(result)}</td>
            <td>${result._memberId}</td>
            <td>${disciplineType(result)}</td>
            <td>${competitionType(result)}</td>
            <td>${result._time}</td>
        </tr>`;
        table.insertAdjacentHTML("beforeend", html);
    }
}

// vis members på hjemmesiden
function displayMembers(members) {
    const table = document.querySelector("table#members tbody");

    table.innerHTML = "";
    for (const member of members) {
        const html = /*html*/ `
    <tr>
      <td>${member._name}</td>
      <td>${activeType(member)}</td>
      <td>${formatDate(member)}</td>
      <td>${member.age}</td>
      <td>${member.ageGroup}</td>
    </tr>`;

        table.insertAdjacentHTML("beforeend", html);
    }
}

// ===== ##### Help funktions to show data ##### ===== //
// Funktion til at ændre typen af resultType
function competitionType(data) {
    let resultType;
    if (data._resultType === "competition") {
        return (resultType = "Stævne");
    } else if (data._resultType === "training") {
        return (resultType = "Træning");
    }
}

// Funktion til at ændre disciplinen af discipline
function disciplineType(data) {
    let disciplineType;
    if (data._discipline === "butterfly") {
        return "Butterfly";
    } else if (data._discipline === "backstroke") {
        return "Ryg";
    } else if (data._discipline === "breaststroke") {
        return "Bryst";
    } else if (data._discipline === "crawl") {
        return "Crawl";
    } else if (data._discipline === "freestyle") {
        return "Freestyle";
    }
}

// Funktion til at ændre dato til rigtigt format
function formatDate(data) {
    // sætter det ønskede format for hvordan dato skal være
    const dateFormat = new Intl.DateTimeFormat("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Brug formatToParts for at få en liste over dele af datoen
    let dateObj;
    if (data._date) {
        dateObj = new Date(data._date);
    } else if (data._birthday) {
        dateObj = new Date(data._birthday);
    }

    const parts = dateFormat.formatToParts(dateObj);

    // sæt de forskellige dele af datoen til det rigtige format
    const formattedDate = `${parts[0].value}. ${parts[2].value} ${parts[4].value}`;

    return formattedDate;
}

function activeType(data) {
    if (data._active === true) {
        return "Aktiv";
    } else if (data._active === false) {
        return "Ikke aktive";
    }
}
