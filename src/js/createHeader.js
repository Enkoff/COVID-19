
export const root = document.querySelector('.root');

export default function createHeader() {

    const headerTitle = 'covid-19'.toUpperCase();

    const headerHtmlTemplate = `
        <header class="header">
                <div class="burger">
                    <span class="bm__lines"></span>
                </div>
                <h1 class="title">${headerTitle}</h1>
                <nav>
                    <ul>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>
                        <li>Link</li>
                    </ul>
                </nav>
            </div>
        </header>
    `
    root.insertAdjacentHTML('beforeend', headerHtmlTemplate);
}
