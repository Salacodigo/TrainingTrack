// Small DOM helpers shared by every component and view.

function byId(id){
    return document.getElementById(id);
}

function createElement(tag, { attributes = {}, classes = [], text = '' } = {}, children = []){
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    element.classList.add(...classes);
    if (text) element.textContent = text;
    children.forEach(child => element.appendChild(child));
    return element;
}

function clearElement(element){
    element.replaceChildren();
}

function showElement(element){
    element.classList.remove('hidden');
    element.classList.add('showing');
}

function hideElement(element){
    element.classList.remove('showing');
    element.classList.add('hidden');
}

export { byId, createElement, clearElement, showElement, hideElement };
